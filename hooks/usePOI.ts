import { useState, useEffect, useCallback, useRef } from 'react';
import { POI, POIFilters, POICategory, DEFAULT_POI_FILTERS } from '../types/poi';
import { fetchPOIs, getBoundingBoxFromRegion } from '../services/overpassApi';
import { poiStore } from '../stores/poiStore';

export interface POIState {
  pois: POI[];
  isLoading: boolean;
  error: string | null;
  filters: POIFilters;
  selectedPOI: POI | null;
}

export function usePOI() {
  const [state, setState] = useState<POIState>({
    pois: [],
    isLoading: false,
    error: null,
    filters: DEFAULT_POI_FILTERS,
    selectedPOI: null,
  });

  const lastFetchRef = useRef<string | null>(null);

  useEffect(() => {
    loadFilters();
  }, []);

  const loadFilters = async () => {
    const savedFilters = await poiStore.getFilters();
    setState(prev => ({ ...prev, filters: savedFilters }));
  };

  const fetchPOIsForLocation = useCallback(
    async (latitude: number, longitude: number) => {
      const fetchKey = `${latitude.toFixed(3)}-${longitude.toFixed(3)}-${state.filters.categories.join(',')}`;

      if (lastFetchRef.current === fetchKey) {
        return;
      }

      setState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        const bbox = getBoundingBoxFromRegion(
          latitude,
          longitude,
          state.filters.searchRadius
        );

        const pois = await fetchPOIs(bbox, state.filters.categories);
        lastFetchRef.current = fetchKey;

        setState(prev => ({
          ...prev,
          pois,
          isLoading: false,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'poi.fetchError',
        }));
      }
    },
    [state.filters]
  );

  const setFilters = useCallback(async (newFilters: Partial<POIFilters>) => {
    const updatedFilters = { ...state.filters, ...newFilters };
    await poiStore.setFilters(updatedFilters);
    lastFetchRef.current = null;
    setState(prev => ({ ...prev, filters: updatedFilters }));
  }, [state.filters]);

  const toggleCategory = useCallback(async (category: POICategory) => {
    const currentCategories = state.filters.categories;
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];

    await setFilters({ categories: newCategories });
  }, [state.filters.categories, setFilters]);

  const selectPOI = useCallback((poi: POI | null) => {
    setState(prev => ({ ...prev, selectedPOI: poi }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    pois: state.pois,
    isLoading: state.isLoading,
    error: state.error,
    filters: state.filters,
    selectedPOI: state.selectedPOI,
    fetchPOIs: fetchPOIsForLocation,
    setFilters,
    toggleCategory,
    selectPOI,
    clearError,
  };
}
