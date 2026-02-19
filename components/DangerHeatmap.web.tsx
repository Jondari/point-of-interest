import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import { HeatmapPoint, DangerZoneConfig } from '../types/dangerZone';

interface DangerHeatmapProps {
  points: HeatmapPoint[];
  config: DangerZoneConfig;
}

export default function DangerHeatmap({ points, config }: DangerHeatmapProps) {
  const map = useMap();

  useEffect(() => {
    const heatData = points.map(
      (p) => [p.latitude, p.longitude, p.weight] as [number, number, number]
    );

    const layer = (L as any).heatLayer(heatData, {
      radius: 30,
      blur: 20,
      maxZoom: 12,
      max: config.maxIntensity,
      gradient: {
        0.0: '#1a9850',
        0.25: '#91cf60',
        0.5: '#fee08b',
        0.75: '#fc8d59',
        1.0: '#d73027',
      },
    });

    layer.addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, points, config]);

  return null;
}
