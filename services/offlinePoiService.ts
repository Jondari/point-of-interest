import { OFFLINE_CITIES, OFFLINE_POIS } from '../data/offlinePois';
import {
  OfflineCity,
  OfflineCityId,
  OfflinePOI,
  OfflinePOICategory,
} from '../types/offlinePoi';

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim();
}

function getSearchableText(poi: OfflinePOI): string {
  return normalize(
    [
      poi.name.fr,
      poi.name.en,
      poi.localName,
      poi.transliteration,
      poi.address.fr,
      poi.address.en,
      poi.localAddress,
      poi.description.fr,
      poi.description.en,
      poi.category,
    ]
      .filter(Boolean)
      .join(' ')
  );
}

export function getOfflineCities(): OfflineCity[] {
  return OFFLINE_CITIES;
}

export function getOfflinePOIs(cityId: OfflineCityId): OfflinePOI[] {
  return OFFLINE_POIS.filter((poi) => poi.cityId === cityId);
}

export function getOfflinePOI(poiId: string): OfflinePOI | undefined {
  return OFFLINE_POIS.find((poi) => poi.id === poiId);
}

export function searchOfflinePOIs(
  cityId: OfflineCityId,
  query: string,
  category?: OfflinePOICategory
): OfflinePOI[] {
  const normalizedQuery = normalize(query);

  return getOfflinePOIs(cityId).filter((poi) => {
    const matchesCategory = !category || poi.category === category;
    const matchesQuery = !normalizedQuery || getSearchableText(poi).includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });
}
