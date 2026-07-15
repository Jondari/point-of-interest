import { CommuneRenderData, HeatmapPoint } from '../types/dangerZone';
import { MapRegion, POI } from '../types/poi';

export type ViewportRegion = MapRegion;

export interface POICluster {
  latitude: number;
  longitude: number;
  count: number;
  pois: POI[];
}

export type POIMapItem =
  | { type: 'poi'; id: string; poi: POI }
  | { type: 'cluster'; id: string; cluster: POICluster };

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

export function createPOIMapItemsForViewport(
  pois: POI[],
  region: ViewportRegion,
  limit: number
): POIMapItem[] {
  if (limit <= 0) return [];

  const visiblePOIs = selectPOIsForViewport(pois, region, pois.length);

  if (visiblePOIs.length <= limit) {
    return visiblePOIs.map(poi => ({
      type: 'poi',
      id: `poi-${poi.id}`,
      poi,
    }));
  }

  const gridSize = Math.max(1, Math.floor(Math.sqrt(limit)));
  const latitudeSpan = Math.max(
    Math.abs(region.latitudeDelta) * 1.5,
    Number.EPSILON
  );
  const longitudeSpan = Math.max(
    Math.abs(region.longitudeDelta) * 1.5,
    Number.EPSILON
  );
  const south = region.latitude - latitudeSpan / 2;
  const west = region.longitude - longitudeSpan / 2;
  const groups = new Map<string, POI[]>();

  for (const poi of visiblePOIs) {
    const row = Math.min(
      gridSize - 1,
      Math.max(
        0,
        Math.floor(((poi.latitude - south) / latitudeSpan) * gridSize)
      )
    );
    const column = Math.min(
      gridSize - 1,
      Math.max(
        0,
        Math.floor(((poi.longitude - west) / longitudeSpan) * gridSize)
      )
    );
    const key = `${row}-${column}`;
    const group = groups.get(key) ?? [];
    group.push(poi);
    groups.set(key, group);
  }

  return [...groups.entries()].map(([key, group]) => {
    if (group.length === 1) {
      return {
        type: 'poi' as const,
        id: `poi-${group[0].id}`,
        poi: group[0],
      };
    }

    return {
      type: 'cluster' as const,
      id: `cluster-${key}`,
      cluster: {
        latitude:
          group.reduce((sum, poi) => sum + poi.latitude, 0) / group.length,
        longitude:
          group.reduce((sum, poi) => sum + poi.longitude, 0) / group.length,
        count: group.length,
        pois: group,
      },
    };
  });
}

export function getRegionForPOICluster(
  cluster: POICluster
): MapRegion {
  const latitudes = cluster.pois.map(poi => poi.latitude);
  const longitudes = cluster.pois.map(poi => poi.longitude);
  const south = Math.min(...latitudes);
  const north = Math.max(...latitudes);
  const west = Math.min(...longitudes);
  const east = Math.max(...longitudes);

  return {
    latitude: (south + north) / 2,
    longitude: (west + east) / 2,
    latitudeDelta: Math.max((north - south) * 1.5, 0.005),
    longitudeDelta: Math.max((east - west) * 1.5, 0.005),
  };
}
