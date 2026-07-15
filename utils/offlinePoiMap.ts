import { OfflinePOI } from '../types/offlinePoi';

export interface OfflinePOIGroup {
  id: string;
  latitude: number;
  longitude: number;
  pois: OfflinePOI[];
}

export interface OfflinePOIMapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export function groupOfflinePOIsByCoordinates(
  pois: OfflinePOI[]
): OfflinePOIGroup[] {
  const groups = new Map<string, OfflinePOIGroup>();

  pois.forEach((poi) => {
    const key = `${poi.latitude}:${poi.longitude}`;
    const existingGroup = groups.get(key);

    if (existingGroup) {
      existingGroup.pois.push(poi);
      return;
    }

    groups.set(key, {
      id: key,
      latitude: poi.latitude,
      longitude: poi.longitude,
      pois: [poi],
    });
  });

  return Array.from(groups.values());
}

export function getOfflinePOIMapRegion(
  pois: OfflinePOI[]
): OfflinePOIMapRegion | null {
  if (pois.length === 0) {
    return null;
  }

  const latitudes = pois.map((poi) => poi.latitude);
  const longitudes = pois.map((poi) => poi.longitude);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);

  return {
    latitude: (minLatitude + maxLatitude) / 2,
    longitude: (minLongitude + maxLongitude) / 2,
    latitudeDelta: Math.max((maxLatitude - minLatitude) * 1.3, 0.02),
    longitudeDelta: Math.max((maxLongitude - minLongitude) * 1.3, 0.02),
  };
}
