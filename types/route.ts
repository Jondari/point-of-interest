export type TransportMode = 'walking' | 'driving' | 'transit';

export interface RoutePoint {
  latitude: number;
  longitude: number;
}

export interface RouteStep {
  instruction: string;
  distance: number;
  duration: number;
  maneuver?: string;
  mode?: string;
  lineName?: string;
  lineColor?: string;
}

export interface Route {
  points: RoutePoint[];
  steps: RouteStep[];
  totalDistance: number;
  totalDuration: number;
  mode: TransportMode;
}

export interface TransitRoute extends Route {
  departureTime: string;
  arrivalTime: string;
  transfers: number;
}

export const TRANSPORT_MODE_CONFIG: Record<TransportMode, { emoji: string; labelKey: string }> = {
  walking: { emoji: '🚶', labelKey: 'routes.walking' },
  driving: { emoji: '🚗', labelKey: 'routes.driving' },
  transit: { emoji: '🚇', labelKey: 'routes.transit' },
};
