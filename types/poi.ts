export type POICategory = 'monument' | 'museum' | 'park' | 'restaurant';

export interface POI {
  id: string;
  name: string;
  category: POICategory;
  latitude: number;
  longitude: number;
  address?: string;
  openingHours?: string;
  phone?: string;
  website?: string;
  wikipedia?: string;
  description?: string;
  tags: Record<string, string>;
}

export interface POIFilters {
  categories: POICategory[];
  searchRadius: number;
}

export interface BoundingBox {
  south: number;
  west: number;
  north: number;
  east: number;
}

export const DEFAULT_POI_FILTERS: POIFilters = {
  categories: [],
  searchRadius: 5000,
};

export const POI_CATEGORY_CONFIG: Record<POICategory, { emoji: string; color: string; labelKey: string }> = {
  monument: { emoji: '🏛️', color: '#8B4513', labelKey: 'poi.categories.monument' },
  museum: { emoji: '🎨', color: '#4A90D9', labelKey: 'poi.categories.museum' },
  park: { emoji: '🌳', color: '#2ECC71', labelKey: 'poi.categories.park' },
  restaurant: { emoji: '🍽️', color: '#E74C3C', labelKey: 'poi.categories.restaurant' },
};
