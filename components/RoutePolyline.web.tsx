import { Polyline } from 'react-leaflet';
import { Route } from '../types/route';
import { colors } from '../constants/theme';

interface RoutePolylineProps {
  route: Route;
}

const MODE_COLORS: Record<string, string> = {
  walking: colors.secondary,
  driving: colors.primary,
};

export default function RoutePolyline({ route }: RoutePolylineProps) {
  const color = MODE_COLORS[route.mode] ?? colors.secondary;
  const positions = route.points.map(
    (p) => [p.latitude, p.longitude] as [number, number]
  );

  return (
    <Polyline
      positions={positions}
      pathOptions={{
        color,
        weight: 4,
        dashArray: route.mode === 'walking' ? '10, 5' : undefined,
      }}
    />
  );
}
