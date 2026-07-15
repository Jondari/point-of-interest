import { CommuneRenderData, HeatmapPoint } from '../types/dangerZone';
import { MapRegion, POI } from '../types/poi';

export type ViewportRegion = MapRegion;

const VIEWPORT_MARGIN_RATIO = 0.5;
const POI_VIEWPORT_MARGIN_RATIO = 0.25;

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

function getDistanceFromViewportCenter(
  poi: POI,
  region: ViewportRegion
): number {
  const latitudeDistance = poi.latitude - region.latitude;
  const rawLongitudeDistance = Math.abs(poi.longitude - region.longitude);
  const longitudeDistance =
    Math.min(rawLongitudeDistance, 360 - rawLongitudeDistance) *
    Math.cos(region.latitude * (Math.PI / 180));

  return (
    latitudeDistance * latitudeDistance +
    longitudeDistance * longitudeDistance
  );
}

export function selectPOIsForViewport(
  pois: POI[],
  region: ViewportRegion,
  limit: number
): POI[] {
  if (limit <= 0) {
    return [];
  }

  return pois
    .filter((poi) =>
      isPointWithinViewport(
        poi.latitude,
        poi.longitude,
        region,
        POI_VIEWPORT_MARGIN_RATIO
      )
    )
    .map((poi, index) => ({
      poi,
      index,
      distance: getDistanceFromViewportCenter(poi, region),
    }))
    .sort(
      (left, right) =>
        left.distance - right.distance || left.index - right.index
    )
    .slice(0, limit)
    .map(({ poi }) => poi);
}
