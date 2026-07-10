import { CommuneRenderData, HeatmapPoint } from '../types/dangerZone';

export interface ViewportRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const VIEWPORT_MARGIN_RATIO = 0.5;

export function isPointWithinViewport(
  latitude: number,
  longitude: number,
  region: ViewportRegion,
  marginRatio: number = VIEWPORT_MARGIN_RATIO
): boolean {
  const latitudeRadius = Math.abs(region.latitudeDelta) * (0.5 + marginRatio);
  const longitudeRadius = Math.abs(region.longitudeDelta) * (0.5 + marginRatio);
  const rawLongitudeDistance = Math.abs(longitude - region.longitude);
  const longitudeDistance = Math.min(rawLongitudeDistance, 360 - rawLongitudeDistance);

  return (
    Math.abs(latitude - region.latitude) <= latitudeRadius &&
    longitudeDistance <= longitudeRadius
  );
}

export function filterCommunesByViewport(
  communes: CommuneRenderData[],
  region: ViewportRegion
): CommuneRenderData[] {
  return communes.filter((commune) =>
    isPointWithinViewport(commune.centerLat, commune.centerLon, region)
  );
}

export function filterHeatmapByViewport(
  points: HeatmapPoint[],
  region: ViewportRegion
): HeatmapPoint[] {
  return points.filter((point) =>
    isPointWithinViewport(point.latitude, point.longitude, region)
  );
}
