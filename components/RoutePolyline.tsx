import { Polyline } from 'react-native-maps';
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

  return (
    <Polyline
      coordinates={route.points}
      strokeColor={color}
      strokeWidth={4}
      lineDashPattern={route.mode === 'walking' ? [10, 5] : undefined}
    />
  );
}
