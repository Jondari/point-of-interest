export interface CrimeData {
  latitude: number;
  longitude: number;
  intensity: number;
  type: string;
  year: number;
  district?: string;
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
  radiusMeters: 500,
  opacity: 0.6,
};
