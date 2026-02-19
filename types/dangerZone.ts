export interface CommuneGeometry {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: number[][][] | number[][][][];
}

export interface CommuneFeature {
  codeCommune: string;
  nomCommune: string;
  department: string;
  population: number;
  totalCrimes: number;
  crimeRate: number;
  centerLat: number;
  centerLon: number;
  geometry: CommuneGeometry;
}

export interface IDFCrimeDataset {
  generatedAt: string;
  year: number;
  communes: CommuneFeature[];
}

export interface CommuneRenderData extends CommuneFeature {
  fillColor: string;
  normalizedRate: number;
}

export interface HeatmapPoint {
  latitude: number;
  longitude: number;
  weight: number;
}

export interface DangerZoneConfig {
  maxIntensity: number;
  radiusMeters: number;
  opacity: number;
}

export const DEFAULT_DANGER_ZONE_CONFIG: DangerZoneConfig = {
  maxIntensity: 1,
  radiusMeters: 4000,
  opacity: 0.6,
};

export type DangerRenderMode = 'choropleth' | 'heatmap';
