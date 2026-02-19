import React from 'react';
import { Circle } from 'react-native-maps';
import { HeatmapPoint, DangerZoneConfig } from '../types/dangerZone';

interface DangerHeatmapProps {
  points: HeatmapPoint[];
  config: DangerZoneConfig;
}

const HeatCircle = React.memo(function HeatCircle({
  point,
  config,
}: {
  point: HeatmapPoint;
  config: DangerZoneConfig;
}) {
  const alpha = Math.max(0.1, point.weight * config.opacity);

  return (
    <Circle
      center={{ latitude: point.latitude, longitude: point.longitude }}
      radius={config.radiusMeters}
      fillColor={`rgba(215, 48, 39, ${alpha})`}
      strokeWidth={0}
      strokeColor="transparent"
    />
  );
});

export default function DangerHeatmap({ points, config }: DangerHeatmapProps) {
  return (
    <>
      {points.map((point, i) => (
        <HeatCircle key={i} point={point} config={config} />
      ))}
    </>
  );
}
