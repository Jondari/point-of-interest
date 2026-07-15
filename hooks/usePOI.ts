import { useState, useEffect, useCallback, useRef } from 'react';
import { POI, POIFilters, POICategory, DEFAULT_POI_FILTERS } from '../types/poi';
import {
  fetchPOIs,
  getBoundingBoxFromRegion,
  OverpassApiError,
} from '../services/overpassApi';
import { poiStore } from '../stores/poiStore';

const POI_DEBOUNCE_MS = 400;

function getPOIFetchErrorKey(error: unknown): string {
  if (!(error instanceof OverpassApiError)) {
    return 'poi.fetchError';
  }

  switch (error.status) {
    case 406:
      return 'poi.clientRejectedError';
    case 429:
      return 'poi.rateLimitError';
    case 504:
      return 'poi.gatewayTimeoutError';
    default:
      return 'poi.fetchError';
  }
}

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
  const pendingFetchRef = useRef<string | null>(null);
  const requestIdRef = useRef(0);
  const requestControllerRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    loadFilters();
  }, []);

  const loadFilters = async () => {
    const savedFilters = await poiStore.getFilters();
    setState(prev => ({ ...prev, filters: savedFilters }));
  };

  const fetchPOIsForLocation = useCallback(
    (latitude: number, longitude: number) => {
      const fetchKey = `${latitude.toFixed(3)}-${longitude.toFixed(3)}-${state.filters.categories.join(',')}`;

      if (
        lastFetchRef.current === fetchKey ||
        pendingFetchRef.current === fetchKey
      ) {
        return;
      }

      requestIdRef.current += 1;
      requestControllerRef.current?.abort();

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      pendingFetchRef.current = fetchKey;
      const requestId = requestIdRef.current;

      debounceRef.current = setTimeout(async () => {
        const controller = new AbortController();
        requestControllerRef.current = controller;
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        const bbox = getBoundingBoxFromRegion(
          latitude,
          longitude,
          state.filters.searchRadius
        );

        try {
          const pois = await fetchPOIs(
            bbox,
            state.filters.categories,
            controller.signal
          );

          if (requestId !== requestIdRef.current) return;

          lastFetchRef.current = fetchKey;
          setState(prev => ({
            ...prev,
            pois,
            isLoading: false,
          }));
        } catch (error) {
          if (requestId !== requestIdRef.current || controller.signal.aborted) {
            return;
          }

          setState(prev => ({
            ...prev,
            isLoading: false,
            error: getPOIFetchErrorKey(error),
          }));
        } finally {
          if (requestId === requestIdRef.current) {
            requestControllerRef.current = null;
            pendingFetchRef.current = null;
          }
        }
      }, POI_DEBOUNCE_MS);
    },
    [state.filters.categories, state.filters.searchRadius]
  );

  const setFilters = useCallback(async (newFilters: Partial<POIFilters>) => {
    const updatedFilters = { ...state.filters, ...newFilters };
    requestIdRef.current += 1;
    requestControllerRef.current?.abort();
    requestControllerRef.current = null;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    lastFetchRef.current = null;
    pendingFetchRef.current = null;
    await poiStore.setFilters(updatedFilters);
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

  useEffect(() => {
    return () => {
      requestIdRef.current += 1;
      requestControllerRef.current?.abort();
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
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
