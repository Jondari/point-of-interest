import AsyncStorage from '@react-native-async-storage/async-storage';
import { POICategory, POIFilters, DEFAULT_POI_FILTERS } from '../types/poi';

const POI_FILTERS_KEY = 'poi_filters';
const POI_FAVORITES_KEY = 'poi_favorites';
const POI_CATEGORIES: ReadonlySet<string> = new Set<POICategory>([
  'monument',
  'museum',
  'park',
  'restaurant',
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isPOIFilters(value: unknown): value is POIFilters {
  if (!isRecord(value)) return false;

  const { categories, searchRadius } = value;
  return (
    Array.isArray(categories) &&
    categories.every(
      (category) => typeof category === 'string' && POI_CATEGORIES.has(category)
    ) &&
    typeof searchRadius === 'number' &&
    Number.isFinite(searchRadius) &&
    searchRadius > 0
  );
}

function isFavoriteList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((id) => typeof id === 'string');
}

export const poiStore = {
  async getFilters(): Promise<POIFilters> {
    try {
      const value = await AsyncStorage.getItem(POI_FILTERS_KEY);
      if (value) {
        const parsed: unknown = JSON.parse(value);
        if (isPOIFilters(parsed)) return parsed;
      }
      return DEFAULT_POI_FILTERS;
    } catch {
      return DEFAULT_POI_FILTERS;
    }
  },

  async setFilters(filters: POIFilters): Promise<void> {
    await AsyncStorage.setItem(POI_FILTERS_KEY, JSON.stringify(filters));
  },

  async getFavorites(): Promise<string[]> {
    try {
      const value = await AsyncStorage.getItem(POI_FAVORITES_KEY);
      if (value) {
        const parsed: unknown = JSON.parse(value);
        if (isFavoriteList(parsed)) return parsed;
      }
      return [];
    } catch {
      return [];
    }
  },

  async addFavorite(poiId: string): Promise<void> {
    const favorites = await this.getFavorites();
    if (!favorites.includes(poiId)) {
      favorites.push(poiId);
      await AsyncStorage.setItem(POI_FAVORITES_KEY, JSON.stringify(favorites));
    }
  },

  async removeFavorite(poiId: string): Promise<void> {
    const favorites = await this.getFavorites();
    const updated = favorites.filter(id => id !== poiId);
    await AsyncStorage.setItem(POI_FAVORITES_KEY, JSON.stringify(updated));
  },

  async isFavorite(poiId: string): Promise<boolean> {
    const favorites = await this.getFavorites();
    return favorites.includes(poiId);
  },
};
