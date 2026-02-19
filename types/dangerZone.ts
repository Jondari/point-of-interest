export interface CommuneGeometry {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: number[][][] | number[][][][];
}

export interface IndicatorMeta {
  id: string;
  labelKey: string;
}

export interface CommuneFeature {
  codeCommune: string;
  nomCommune: string;
  department: string;
  population: number;
  indicators: Record<string, number>;
  centerLat: number;
  centerLon: number;
  geometry: CommuneGeometry;
}

export interface IDFCrimeDataset {
  generatedAt: string;
  year: number;
  availableIndicators: IndicatorMeta[];
  communes: CommuneFeature[];
}

export interface CommuneRenderData extends CommuneFeature {
  fillColor: string;
  normalizedRate: number;
  crimeRate: number;
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

export interface QPVFeature {
  code: string;
  nom: string;
  commune: string;
  geometry: CommuneGeometry;
}

export interface QRRFeature {
  code: string;
  nom: string;
  commune: string;
  geometry: CommuneGeometry;
}
