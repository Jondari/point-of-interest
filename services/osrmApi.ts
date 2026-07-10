import { Route, RoutePoint, RouteStep, TransportMode } from '../types/route';
import { API_CONFIG, API_TIMEOUT } from '../constants/api';

interface OSRMGeometry {
  type: string;
  coordinates: [number, number][];
}

interface OSRMManeuver {
  instruction?: string;
  type: string;
  modifier?: string;
}

interface OSRMStep {
  distance: number;
  duration: number;
  name: string;
  maneuver: OSRMManeuver;
}

interface OSRMLeg {
  distance: number;
  duration: number;
  steps: OSRMStep[];
}

interface OSRMRoute {
  geometry: OSRMGeometry;
  legs: OSRMLeg[];
  distance: number;
  duration: number;
}

interface OSRMResponse {
  code: string;
  routes: OSRMRoute[];
}

function getBaseUrl(mode: TransportMode): string {
  switch (mode) {
    case 'driving':
      return API_CONFIG.OSRM_CAR_URL;
    case 'walking':
    default:
      return API_CONFIG.OSRM_FOOT_URL;
  }
}

function parseSteps(legs: OSRMLeg[]): RouteStep[] {
  return legs.flatMap(leg =>
    leg.steps.map(step => ({
      instruction: step.maneuver.instruction || step.name || step.maneuver.type,
      distance: step.distance,
      duration: step.duration,
      maneuver: step.maneuver.type,
    }))
  );
}

function parseGeometry(geometry: OSRMGeometry): RoutePoint[] {
  return geometry.coordinates.map(([lon, lat]) => ({
    latitude: lat,
    longitude: lon,
  }));
}

export async function fetchRoute(
  from: RoutePoint,
  to: RoutePoint,
  mode: TransportMode,
  signal?: AbortSignal
): Promise<Route> {
  const baseUrl = getBaseUrl(mode);
  const coordinates = `${from.longitude},${from.latitude};${to.longitude},${to.latitude}`;
  const url = `${baseUrl}/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=true`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
  const handleExternalAbort = () => controller.abort();

  if (signal?.aborted) {
    controller.abort();
  } else {
    signal?.addEventListener('abort', handleExternalAbort, { once: true });
  }

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`OSRM API error: ${response.status}`);
    }

    const data: OSRMResponse = await response.json();

    if (data.code !== 'Ok' || data.routes.length === 0) {
      throw new Error('No route found');
    }

    const osrmRoute = data.routes[0];

    return {
      points: parseGeometry(osrmRoute.geometry),
      steps: parseSteps(osrmRoute.legs),
      totalDistance: osrmRoute.distance,
      totalDuration: osrmRoute.duration,
      mode,
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(signal?.aborted ? 'Request cancelled' : 'Request timeout');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener('abort', handleExternalAbort);
  }
}
