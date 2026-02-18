import { useState, useCallback, useRef } from 'react';
import { Route, RoutePoint, TransportMode } from '../types/route';
import { fetchRoute } from '../services/osrmApi';

export interface RouteState {
  route: Route | null;
  isLoading: boolean;
  error: string | null;
  transportMode: TransportMode;
}

export function useRoute() {
  const [route, setRoute] = useState<Route | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transportMode, setTransportModeState] = useState<TransportMode>('walking');

  const lastFromRef = useRef<RoutePoint | null>(null);
  const lastToRef = useRef<RoutePoint | null>(null);

  const calculateRoute = useCallback(
    async (from: RoutePoint, to: RoutePoint, mode?: TransportMode) => {
      const activeMode = mode ?? transportMode;
      lastFromRef.current = from;
      lastToRef.current = to;

      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchRoute(from, to, activeMode);
        setRoute(result);
      } catch {
        setError('routes.fetchError');
        setRoute(null);
      } finally {
        setIsLoading(false);
      }
    },
    [transportMode]
  );

  const setTransportMode = useCallback(
    (mode: TransportMode) => {
      setTransportModeState(mode);
      if (lastFromRef.current && lastToRef.current) {
        calculateRoute(lastFromRef.current, lastToRef.current, mode);
      }
    },
    [calculateRoute]
  );

  const clearRoute = useCallback(() => {
    setRoute(null);
    setError(null);
    lastFromRef.current = null;
    lastToRef.current = null;
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    route,
    isLoading,
    error,
    transportMode,
    calculateRoute,
    setTransportMode,
    clearRoute,
    clearError,
  };
}
