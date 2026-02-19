import { IDFCrimeDataset, CommuneRenderData, HeatmapPoint } from '../types/dangerZone';
import idfData from '../data/idf-crime-data.json';

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

let cachedRenderData: CommuneRenderData[] | null = null;

export function getCommuneRenderData(): CommuneRenderData[] {
  if (cachedRenderData) return cachedRenderData;

  const rates = dataset.communes.map((c) => c.crimeRate).filter((r) => r > 0);
  const maxRate = Math.max(...rates);
  const minRate = Math.min(...rates);
  const range = maxRate - minRate || 1;

  cachedRenderData = dataset.communes.map((commune) => {
    const normalizedRate = commune.crimeRate > 0 ? (commune.crimeRate - minRate) / range : 0;
    return {
      ...commune,
      fillColor: interpolateColor(normalizedRate),
      normalizedRate,
    };
  });

  return cachedRenderData;
}

let cachedHeatmapPoints: HeatmapPoint[] | null = null;

export function getHeatmapPoints(): HeatmapPoint[] {
  if (cachedHeatmapPoints) return cachedHeatmapPoints;

  const renderData = getCommuneRenderData();
  cachedHeatmapPoints = renderData.map((c) => ({
    latitude: c.centerLat,
    longitude: c.centerLon,
    weight: c.normalizedRate,
  }));

  return cachedHeatmapPoints;
}

export function getDataYear(): number {
  return dataset.year;
}
