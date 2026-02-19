import { writeFile, mkdir, readFile } from 'fs/promises';
import { createGunzip } from 'zlib';
import { Readable } from 'stream';
import { parse } from 'csv-parse';
import * as path from 'path';
import { fileURLToPath } from 'url';

// @ts-ignore
import simplify from '@turf/simplify';
// @ts-ignore
import centroid from '@turf/centroid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IDF_DEPARTMENTS = ['75', '77', '78', '91', '92', '93', '94', '95'];
const TARGET_YEAR = '2024';

const SSMSI_CSV_URL =
  'https://static.data.gouv.fr/resources/bases-statistiques-communale-departementale-et-regionale-de-la-delinquance-enregistree-par-la-police-et-la-gendarmerie-nationales/20250710-144817/donnee-data.gouv-2024-geographie2025-produit-le2025-06-04.csv.gz';

const GEO_API_URL =
  'https://geo.api.gouv.fr/communes?codeRegion=11&format=geojson&geometry=contour';

const PARIS_ARR_URL =
  'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/arrondissements/exports/geojson';

const QPV_ZIP_URL =
  'https://static.data.gouv.fr/resources/quartiers-prioritaires-de-la-politique-de-la-ville-qpv/20260115-204323/qpv-2024-geojson.zip';

const QRR_ZIP_URL =
  'https://www.data.gouv.fr/api/1/datasets/r/e94de15e-7e5d-4683-8882-9ff3b3ac9295';

const DATA_DIR = path.resolve(__dirname, '..', 'data');
const CRIME_OUTPUT = path.join(DATA_DIR, 'idf-crime-data.json');
const QPV_OUTPUT = path.join(DATA_DIR, 'qpv-idf.json');
const QRR_OUTPUT = path.join(DATA_DIR, 'qrr-idf.json');

// Mapping indicator names to stable IDs
const INDICATOR_MAP: Record<string, { id: string; labelKey: string }> = {
  'Cambriolages de logement': { id: 'burglary', labelKey: 'dangerZones.indicators.burglary' },
  'Destructions et dégradations volontaires': { id: 'vandalism', labelKey: 'dangerZones.indicators.vandalism' },
  'Escroqueries et fraudes aux moyens de paiement': { id: 'fraud', labelKey: 'dangerZones.indicators.fraud' },
  'Trafic de stupéfiants': { id: 'drug_trafficking', labelKey: 'dangerZones.indicators.drugTrafficking' },
  'Usage de stupéfiants': { id: 'drug_use', labelKey: 'dangerZones.indicators.drugUse' },
  'Usage de stupéfiants (AFD)': { id: 'drug_use_afd', labelKey: 'dangerZones.indicators.drugUseAfd' },
  'Violences physiques hors cadre familial': { id: 'physical_violence', labelKey: 'dangerZones.indicators.physicalViolence' },
  'Violences physiques intrafamiliales': { id: 'domestic_violence', labelKey: 'dangerZones.indicators.domesticViolence' },
  'Violences sexuelles': { id: 'sexual_violence', labelKey: 'dangerZones.indicators.sexualViolence' },
  'Vols avec armes': { id: 'armed_robbery', labelKey: 'dangerZones.indicators.armedRobbery' },
  "Vols d'accessoires sur véhicules": { id: 'vehicle_accessory_theft', labelKey: 'dangerZones.indicators.vehicleAccessoryTheft' },
  'Vols dans les véhicules': { id: 'theft_from_vehicles', labelKey: 'dangerZones.indicators.theftFromVehicles' },
  'Vols de véhicule': { id: 'vehicle_theft', labelKey: 'dangerZones.indicators.vehicleTheft' },
  'Vols sans violence contre des personnes': { id: 'theft_no_violence', labelKey: 'dangerZones.indicators.theftNoViolence' },
  'Vols violents sans arme': { id: 'violent_theft', labelKey: 'dangerZones.indicators.violentTheft' },
};

interface GeoFeature {
  type: string;
  properties: Record<string, any>;
  geometry: { type: string; coordinates: any };
}

interface GeoFeatureCollection {
  type: string;
  features: GeoFeature[];
}

// ── Crime data ──────────────────────────────────────────────────────

interface CommuneCrimeData {
  population: number;
  indicators: Record<string, number>;
}

async function downloadAndParseCrimeCSV(): Promise<Map<string, CommuneCrimeData>> {
  console.log('Downloading and streaming SSMSI CSV...');
  const response = await fetch(SSMSI_CSV_URL);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const communeMap = new Map<string, CommuneCrimeData>();

  const parser = parse({
    columns: true,
    delimiter: ';',
    quote: '"',
    skip_empty_lines: true,
  });

  const gunzip = createGunzip();
  const readable = Readable.fromWeb(response.body as any);
  readable.pipe(gunzip).pipe(parser);

  for await (const row of parser) {
    if (row.annee !== TARGET_YEAR) continue;
    if (row.est_diffuse !== 'diff') continue;

    const code = row.CODGEO_2025;
    const dep = code.substring(0, 2);
    if (!IDF_DEPARTMENTS.includes(dep)) continue;

    const nombre = parseInt(row.nombre, 10);
    if (isNaN(nombre)) continue;

    const indicatorName = row.indicateur;
    const mapped = INDICATOR_MAP[indicatorName];
    if (!mapped) continue;

    const existing = communeMap.get(code);
    if (existing) {
      existing.indicators[mapped.id] = (existing.indicators[mapped.id] || 0) + nombre;
      existing.indicators.all = (existing.indicators.all || 0) + nombre;
    } else {
      const pop = parseInt(row.insee_pop, 10) || 0;
      communeMap.set(code, {
        population: pop,
        indicators: { [mapped.id]: nombre, all: nombre },
      });
    }
  }

  console.log(`  ${communeMap.size} IDF communes/arrondissements with crime data`);
  return communeMap;
}

// ── GeoJSON downloads ───────────────────────────────────────────────

async function downloadJson(url: string, label: string): Promise<GeoFeatureCollection> {
  console.log(`Downloading ${label}...`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${label}`);
  const data = (await response.json()) as GeoFeatureCollection;
  console.log(`  ${data.features.length} features loaded`);
  return data;
}

// ── QPV processing ──────────────────────────────────────────────────

async function downloadAndProcessQPV(): Promise<GeoFeatureCollection> {
  console.log('Downloading QPV ZIP...');
  const response = await fetch(QPV_ZIP_URL);
  if (!response.ok) throw new Error(`HTTP ${response.status} for QPV`);
  const buffer = Buffer.from(await response.arrayBuffer());

  const JSZip = (await import('jszip')).default;
  const zip = await JSZip.loadAsync(buffer);

  // Use the WGS84 file (not Lambert 93)
  const geojsonFile = Object.keys(zip.files).find(
    (name) => name.includes('WGS84') && name.endsWith('.geojson')
  );
  if (!geojsonFile) throw new Error('No WGS84 GeoJSON found in QPV ZIP');

  console.log(`  Extracting ${geojsonFile}...`);
  const content = await zip.files[geojsonFile].async('string');
  const geojson = JSON.parse(content) as GeoFeatureCollection;
  console.log(`  ${geojson.features.length} QPV features total`);

  // Filter IDF departments using insee_dep field
  const idfFeatures = geojson.features.filter((f) => {
    const dep = f.properties.insee_dep || '';
    return IDF_DEPARTMENTS.includes(dep);
  });

  console.log(`  ${idfFeatures.length} QPV features in IDF`);

  // Simplify and format
  const features = idfFeatures.map((f) => {
    const simplified = simplify(f as any, { tolerance: 0.0005, highQuality: false });
    return {
      type: 'Feature' as const,
      properties: {
        code: f.properties.code_qp || '',
        nom: f.properties.lib_qp || '',
        commune: f.properties.lib_com || '',
      },
      geometry: simplified.geometry,
    };
  });

  return { type: 'FeatureCollection', features };
}

// ── QRR processing ──────────────────────────────────────────────────

async function downloadAndProcessQRR(): Promise<GeoFeatureCollection> {
  console.log('Downloading QRR ZIP...');
  const response = await fetch(QRR_ZIP_URL);
  if (!response.ok) throw new Error(`HTTP ${response.status} for QRR`);
  const buffer = Buffer.from(await response.arrayBuffer());

  // shpjs reads ZIP shapefiles and returns GeoJSON
  const shp = (await import('shpjs')).default;
  const geojson = (await shp(buffer)) as GeoFeatureCollection | GeoFeatureCollection[];

  // shpjs can return array if multiple layers
  const collection = Array.isArray(geojson) ? geojson[0] : geojson;
  console.log(`  ${collection.features.length} QRR features total`);

  // Filter IDF — QRR properties may vary, try common field names
  const idfFeatures = collection.features.filter((f) => {
    const props = f.properties;
    const dep =
      props.dep || props.code_dep || props.DEP || props.departement || '';
    if (IDF_DEPARTMENTS.includes(String(dep))) return true;
    // Fallback: check commune code
    const commune = props.code_commune || props.INSEE_COM || '';
    if (commune && IDF_DEPARTMENTS.includes(String(commune).substring(0, 2)))
      return true;
    return false;
  });

  console.log(`  ${idfFeatures.length} QRR features in IDF`);

  const features = idfFeatures.map((f) => {
    const simplified = simplify(f as any, { tolerance: 0.0005, highQuality: false });
    const props = f.properties;
    return {
      type: 'Feature' as const,
      properties: {
        code: props.code || props.CODE || props.id || '',
        nom: props.nom || props.NOM || props.libelle || props.LIBELLE || '',
        commune: props.commune || props.COMMUNE || props.nom_com || '',
      },
      geometry: simplified.geometry,
    };
  });

  return { type: 'FeatureCollection', features };
}

// ── Main processing ─────────────────────────────────────────────────

function processGeoJson(
  communesGeo: GeoFeatureCollection,
  parisArrGeo: GeoFeatureCollection,
  crimeData: Map<string, CommuneCrimeData>
) {
  console.log('Processing geometries...');

  const communes = [];

  // Process IDF communes (excluding Paris 75056)
  for (const feature of communesGeo.features) {
    const code = feature.properties.code;
    if (code === '75056') continue; // Skip Paris — replaced by arrondissements

    const crime = crimeData.get(code);
    const simplified = simplify(feature as any, { tolerance: 0.001, highQuality: false });
    const center = centroid(simplified as any);

    const population = crime?.population || feature.properties.population || 0;
    const indicators = crime?.indicators || { all: 0 };

    communes.push({
      codeCommune: code,
      nomCommune: feature.properties.nom,
      department: feature.properties.codeDepartement,
      population,
      indicators,
      centerLat: center.geometry.coordinates[1],
      centerLon: center.geometry.coordinates[0],
      geometry: simplified.geometry,
    });
  }

  // Process Paris arrondissements (Paris Open Data format)
  for (const feature of parisArrGeo.features) {
    const props = feature.properties;
    // Paris Open Data uses c_arinsee for INSEE code (e.g. 75104)
    const code = String(props.c_arinsee);
    const crime = crimeData.get(code);

    const simplified = simplify(feature as any, { tolerance: 0.0005, highQuality: false });
    const center = centroid(simplified as any);

    const population = crime?.population || 0;
    const indicators = crime?.indicators || { all: 0 };
    const nom = props.l_ar || `Paris ${props.c_ar}e`;

    communes.push({
      codeCommune: code,
      nomCommune: nom,
      department: '75',
      population,
      indicators,
      centerLat: center.geometry.coordinates[1],
      centerLon: center.geometry.coordinates[0],
      geometry: simplified.geometry,
    });
  }

  console.log(`  ${communes.length} communes/arrondissements processed`);
  return communes;
}

async function main() {
  console.log('=== Preparing IDF crime data (Phase 3b) ===\n');

  await mkdir(DATA_DIR, { recursive: true });

  // Download all data in parallel
  const [crimeData, communesGeo, parisArrGeo] = await Promise.all([
    downloadAndParseCrimeCSV(),
    downloadJson(GEO_API_URL, 'GeoJSON communes IDF'),
    downloadJson(PARIS_ARR_URL, 'Paris arrondissements GeoJSON'),
  ]);

  // Process crime + geography
  const communes = processGeoJson(communesGeo, parisArrGeo, crimeData);

  const availableIndicators = [
    { id: 'all', labelKey: 'dangerZones.indicators.all' },
    ...Object.values(INDICATOR_MAP),
  ];

  const dataset = {
    generatedAt: new Date().toISOString(),
    year: parseInt(TARGET_YEAR, 10),
    availableIndicators,
    communes,
  };

  await writeFile(CRIME_OUTPUT, JSON.stringify(dataset));
  const { stat } = await import('fs/promises');
  let fileStats = await stat(CRIME_OUTPUT);
  console.log(`\nCrime data: ${CRIME_OUTPUT}`);
  console.log(`  Size: ${(fileStats.size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Communes: ${communes.length}`);

  // QPV
  try {
    const qpv = await downloadAndProcessQPV();
    await writeFile(QPV_OUTPUT, JSON.stringify(qpv));
    fileStats = await stat(QPV_OUTPUT);
    console.log(`\nQPV data: ${QPV_OUTPUT}`);
    console.log(`  Size: ${(fileStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Features: ${qpv.features.length}`);
  } catch (err) {
    console.error('\nQPV download/processing failed:', err);
  }

  // QRR
  try {
    const qrr = await downloadAndProcessQRR();
    await writeFile(QRR_OUTPUT, JSON.stringify(qrr));
    fileStats = await stat(QRR_OUTPUT);
    console.log(`\nQRR data: ${QRR_OUTPUT}`);
    console.log(`  Size: ${(fileStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Features: ${qrr.features.length}`);
  } catch (err) {
    console.error('\nQRR download/processing failed:', err);
  }

  console.log('\nDone!');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
