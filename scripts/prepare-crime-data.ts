import { writeFile, mkdir } from 'fs/promises';
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

const OUTPUT_PATH = path.resolve(__dirname, '..', 'data', 'idf-crime-data.json');

interface GeoFeature {
  type: string;
  properties: {
    code: string;
    nom: string;
    codeDepartement: string;
    population?: number;
  };
  geometry: { type: string; coordinates: any };
}

interface GeoFeatureCollection {
  type: string;
  features: GeoFeature[];
}

async function downloadAndParseCrimeCSV(): Promise<Map<string, { totalCrimes: number; population: number }>> {
  console.log('Downloading and streaming SSMSI CSV...');
  const response = await fetch(SSMSI_CSV_URL);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const communeMap = new Map<string, { totalCrimes: number; population: number }>();

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

    const existing = communeMap.get(code);
    if (existing) {
      existing.totalCrimes += nombre;
    } else {
      const pop = parseInt(row.insee_pop, 10) || 0;
      communeMap.set(code, { totalCrimes: nombre, population: pop });
    }
  }

  console.log(`  ${communeMap.size} IDF communes with crime data for ${TARGET_YEAR}`);
  return communeMap;
}

async function downloadJson(url: string): Promise<GeoFeatureCollection> {
  console.log('Downloading GeoJSON communes IDF...');
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json() as GeoFeatureCollection;
  console.log(`  ${data.features.length} communes loaded`);
  return data;
}

function processGeoJson(
  geojson: GeoFeatureCollection,
  crimeData: Map<string, { totalCrimes: number; population: number }>
) {
  console.log('Processing geometries...');

  const communes = [];

  for (const feature of geojson.features) {
    const code = feature.properties.code;
    const crime = crimeData.get(code);

    const simplified = simplify(feature as any, { tolerance: 0.001, highQuality: false });
    const center = centroid(simplified as any);

    const population = crime?.population || feature.properties.population || 0;
    const totalCrimes = crime?.totalCrimes || 0;
    const crimeRate = population > 0 ? (totalCrimes / population) * 1000 : 0;

    communes.push({
      codeCommune: code,
      nomCommune: feature.properties.nom,
      department: feature.properties.codeDepartement,
      population,
      totalCrimes,
      crimeRate: Math.round(crimeRate * 100) / 100,
      centerLat: center.geometry.coordinates[1],
      centerLon: center.geometry.coordinates[0],
      geometry: simplified.geometry,
    });
  }

  console.log(`  ${communes.length} communes processed`);
  return communes;
}

async function main() {
  console.log('=== Preparing IDF crime data ===\n');

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });

  const [crimeData, geojson] = await Promise.all([
    downloadAndParseCrimeCSV(),
    downloadJson(GEO_API_URL),
  ]);

  const communes = processGeoJson(geojson, crimeData);

  const dataset = {
    generatedAt: new Date().toISOString(),
    year: parseInt(TARGET_YEAR, 10),
    communes,
  };

  await writeFile(OUTPUT_PATH, JSON.stringify(dataset));
  const { stat } = await import('fs/promises');
  const fileStats = await stat(OUTPUT_PATH);
  console.log(`\nOutput: ${OUTPUT_PATH}`);
  console.log(`Size: ${(fileStats.size / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Communes: ${communes.length}`);
  console.log('Done!');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
