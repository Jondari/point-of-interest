import AsyncStorage from '@react-native-async-storage/async-storage';
import { POIFilters, DEFAULT_POI_FILTERS } from '../types/poi';

const POI_FILTERS_KEY = 'poi_filters';
const POI_FAVORITES_KEY = 'poi_favorites';

export const poiStore = {
  async getFilters(): Promise<POIFilters> {
    try {
      const value = await AsyncStorage.getItem(POI_FILTERS_KEY);
      if (value) {
        return JSON.parse(value);
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
        return JSON.parse(value);
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
