import {
  IDFCrimeDataset,
  CommuneRenderData,
  HeatmapPoint,
  IndicatorMeta,
  QPVFeature,
  QRRFeature,
} from '../types/dangerZone';

let datasetPromise: Promise<IDFCrimeDataset> | null = null;
let qpvDataPromise: Promise<QPVFeature[]> | null = null;
let qrrDataPromise: Promise<QRRFeature[]> | null = null;

function loadDataset(): Promise<IDFCrimeDataset> {
  if (!datasetPromise) {
    datasetPromise = import('../data/idf-crime-data.json').then(
      (module) => module.default as unknown as IDFCrimeDataset
    );
  }

  return datasetPromise;
}

const COLOR_STOPS: [number, [number, number, number]][] = [
  [0.0, [26, 152, 80]],
  [0.25, [145, 207, 96]],
  [0.5, [254, 224, 139]],
  [0.75, [252, 141, 89]],
  [1.0, [215, 48, 39]],
];

function interpolateColor(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));

  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    const [start, startColor] = COLOR_STOPS[i];
    const [end, endColor] = COLOR_STOPS[i + 1];

    if (clamped >= start && clamped <= end) {
      const ratio = (clamped - start) / (end - start);
      const r = Math.round(startColor[0] + ratio * (endColor[0] - startColor[0]));
      const g = Math.round(startColor[1] + ratio * (endColor[1] - startColor[1]));
      const b = Math.round(startColor[2] + ratio * (endColor[2] - startColor[2]));
      return `rgb(${r}, ${g}, ${b})`;
    }
  }

  return 'rgb(215, 48, 39)';
}

const renderDataCache = new Map<string, Promise<CommuneRenderData[]>>();
const heatmapCache = new Map<string, Promise<HeatmapPoint[]>>();

export function getCommuneRenderData(indicatorId: string = 'all'): Promise<CommuneRenderData[]> {
  const cached = renderDataCache.get(indicatorId);
  if (cached) return cached;

  const resultPromise = loadDataset().then((dataset) => {
    const withRates = dataset.communes.map((commune) => {
      const value = commune.indicators[indicatorId] || 0;
      const crimeRate = commune.population > 0 ? (value / commune.population) * 1000 : 0;
      return { commune, crimeRate };
    });

    const rates = withRates.map((c) => c.crimeRate).filter((r) => r > 0);
    const maxRate = Math.max(...rates, 1);
    const minRate = Math.min(...rates, 0);
    const range = maxRate - minRate || 1;

    return withRates.map(({ commune, crimeRate }) => {
      const normalizedRate = crimeRate > 0 ? (crimeRate - minRate) / range : 0;
      return {
        ...commune,
        crimeRate: Math.round(crimeRate * 100) / 100,
        fillColor: interpolateColor(normalizedRate),
        normalizedRate,
      };
    });
  });

  renderDataCache.set(indicatorId, resultPromise);
  return resultPromise;
}

export function getHeatmapPoints(indicatorId: string = 'all'): Promise<HeatmapPoint[]> {
  const cached = heatmapCache.get(indicatorId);
  if (cached) return cached;

  const resultPromise = getCommuneRenderData(indicatorId).then((renderData) =>
    renderData.map((commune) => ({
      latitude: commune.centerLat,
      longitude: commune.centerLon,
      weight: commune.normalizedRate,
    }))
  );

  heatmapCache.set(indicatorId, resultPromise);
  return resultPromise;
}

export async function getAvailableIndicators(): Promise<IndicatorMeta[]> {
  const dataset = await loadDataset();
  return dataset.availableIndicators;
}

export async function getDataYear(): Promise<number> {
  const dataset = await loadDataset();
  return dataset.year;
}

export function getQPVData(): Promise<QPVFeature[]> {
  if (!qpvDataPromise) {
    qpvDataPromise = import('../data/qpv-idf.json').then((module) => {
      const features = (module.default as any).features || [];
      return features.map((feature: any) => ({
        code: feature.properties.code,
        nom: feature.properties.nom,
        commune: feature.properties.commune,
        geometry: feature.geometry,
      }));
    });
  }

  return qpvDataPromise;
}

export function getQRRData(): Promise<QRRFeature[]> {
  if (!qrrDataPromise) {
    qrrDataPromise = import('../data/qrr-idf.json').then((module) => {
      const features = (module.default as any).features || [];
      return features.map((feature: any) => ({
        code: feature.properties.code,
        nom: feature.properties.nom,
        commune: feature.properties.commune,
        geometry: feature.geometry,
      }));
    });
  }

  return qrrDataPromise;
}
