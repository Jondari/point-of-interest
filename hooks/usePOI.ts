import { useState, useEffect, useCallback, useRef } from 'react';
import {
  POI,
  POIFilters,
  POICategory,
  BoundingBox,
  MapRegion,
  DEFAULT_POI_FILTERS,
} from '../types/poi';
import {
  fetchPOIs,
  getBoundingBoxFromRegion,
  isBoundingBoxContained,
  OverpassApiError,
} from '../services/overpassApi';
import { poiStore } from '../stores/poiStore';

const POI_DEBOUNCE_MS = 400;

interface POIFetchCoverage {
  bbox: BoundingBox;
  categoriesKey: string;
}

function getCategoriesKey(categories: POICategory[]): string {
  return [...categories].sort().join(',');
}

function canReuseCoverage(
  coverage: POIFetchCoverage | null,
  requestedViewport: BoundingBox,
  categoriesKey: string
): boolean {
  return (
    coverage?.categoriesKey === categoriesKey &&
    isBoundingBoxContained(requestedViewport, coverage.bbox)
  );
}

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
  isTruncated: boolean;
  error: string | null;
  filters: POIFilters;
  selectedPOI: POI | null;
}

export function usePOI() {
  const [state, setState] = useState<POIState>({
    pois: [],
    isLoading: false,
    isTruncated: false,
    error: null,
    filters: DEFAULT_POI_FILTERS,
    selectedPOI: null,
  });

  const lastCoverageRef = useRef<POIFetchCoverage | null>(null);
  const pendingCoverageRef = useRef<POIFetchCoverage | null>(null);
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

  const fetchPOIsForRegion = useCallback(
    (region: MapRegion) => {
      const requestedViewport = getBoundingBoxFromRegion(
        region,
        state.filters.searchRadius,
        0
      );
      const queryBoundingBox = getBoundingBoxFromRegion(
        region,
        state.filters.searchRadius
      );
      const categoriesKey = getCategoriesKey(state.filters.categories);
      const coverage: POIFetchCoverage = {
        bbox: queryBoundingBox,
        categoriesKey,
      };

      const canReuseLastCoverage = canReuseCoverage(
        lastCoverageRef.current,
        requestedViewport,
        categoriesKey
      );
      const canReusePendingCoverage = canReuseCoverage(
        pendingCoverageRef.current,
        requestedViewport,
        categoriesKey
      );

      if (canReuseLastCoverage && canReusePendingCoverage) {
        return;
      }

      if (canReuseLastCoverage) {
        requestIdRef.current += 1;
        requestControllerRef.current?.abort();
        requestControllerRef.current = null;

        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
          debounceRef.current = null;
        }

        pendingCoverageRef.current = null;
        setState(prev => ({ ...prev, isLoading: false, error: null }));
        return;
      }

      if (canReusePendingCoverage) return;

      requestIdRef.current += 1;
      requestControllerRef.current?.abort();

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }

      pendingCoverageRef.current = coverage;
      const requestId = requestIdRef.current;

      debounceRef.current = setTimeout(async () => {
        debounceRef.current = null;
        const controller = new AbortController();
        requestControllerRef.current = controller;
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
          const result = await fetchPOIs(
            queryBoundingBox,
            state.filters.categories,
            controller.signal
          );

          if (requestId !== requestIdRef.current) return;

          lastCoverageRef.current = coverage;
          setState(prev => ({
            ...prev,
            pois: result.pois,
            isTruncated: result.isTruncated,
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
            pendingCoverageRef.current = null;
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
    lastCoverageRef.current = null;
    pendingCoverageRef.current = null;
    await poiStore.setFilters(updatedFilters);
    setState(prev => ({
      ...prev,
      filters: updatedFilters,
      isTruncated: false,
    }));
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
    isTruncated: state.isTruncated,
    error: state.error,
    filters: state.filters,
    selectedPOI: state.selectedPOI,
    fetchPOIs: fetchPOIsForRegion,
    setFilters,
    toggleCategory,
    selectPOI,
    clearError,
  };
}
