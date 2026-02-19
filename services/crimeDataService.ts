import {
  IDFCrimeDataset,
  CommuneRenderData,
  HeatmapPoint,
  IndicatorMeta,
  QPVFeature,
  QRRFeature,
} from '../types/dangerZone';
import idfData from '../data/idf-crime-data.json';
import qpvData from '../data/qpv-idf.json';
import qrrData from '../data/qrr-idf.json';

const dataset = idfData as unknown as IDFCrimeDataset;

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

const renderDataCache = new Map<string, CommuneRenderData[]>();
const heatmapCache = new Map<string, HeatmapPoint[]>();

export function getCommuneRenderData(indicatorId: string = 'all'): CommuneRenderData[] {
  const cached = renderDataCache.get(indicatorId);
  if (cached) return cached;

  const withRates = dataset.communes.map((commune) => {
    const value = commune.indicators[indicatorId] || 0;
    const crimeRate = commune.population > 0 ? (value / commune.population) * 1000 : 0;
    return { commune, crimeRate };
  });

  const rates = withRates.map((c) => c.crimeRate).filter((r) => r > 0);
  const maxRate = Math.max(...rates, 1);
  const minRate = Math.min(...rates, 0);
  const range = maxRate - minRate || 1;

  const result: CommuneRenderData[] = withRates.map(({ commune, crimeRate }) => {
    const normalizedRate = crimeRate > 0 ? (crimeRate - minRate) / range : 0;
    return {
      ...commune,
      crimeRate: Math.round(crimeRate * 100) / 100,
      fillColor: interpolateColor(normalizedRate),
      normalizedRate,
    };
  });

  renderDataCache.set(indicatorId, result);
  return result;
}

export function getHeatmapPoints(indicatorId: string = 'all'): HeatmapPoint[] {
  const cached = heatmapCache.get(indicatorId);
  if (cached) return cached;

  const renderData = getCommuneRenderData(indicatorId);
  const result = renderData.map((c) => ({
    latitude: c.centerLat,
    longitude: c.centerLon,
    weight: c.normalizedRate,
  }));

  heatmapCache.set(indicatorId, result);
  return result;
}

export function getAvailableIndicators(): IndicatorMeta[] {
  return dataset.availableIndicators;
}

export function getDataYear(): number {
  return dataset.year;
}

export function getQPVData(): QPVFeature[] {
  const features = (qpvData as any).features || [];
  return features.map((f: any) => ({
    code: f.properties.code,
    nom: f.properties.nom,
    commune: f.properties.commune,
    geometry: f.geometry,
  }));
}

export function getQRRData(): QRRFeature[] {
  const features = (qrrData as any).features || [];
  return features.map((f: any) => ({
    code: f.properties.code,
    nom: f.properties.nom,
    commune: f.properties.commune,
    geometry: f.geometry,
  }));
}
