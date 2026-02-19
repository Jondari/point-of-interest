import { useMemo } from 'react';
import { GeoJSON } from 'react-leaflet';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import type { Layer, PathOptions } from 'leaflet';
import { QRRFeature } from '../types/dangerZone';

interface QRROverlayProps {
  features: QRRFeature[];
}

export default function QRROverlay({ features }: QRROverlayProps) {
  const featureCollection = useMemo<FeatureCollection>(
    () => ({
      type: 'FeatureCollection',
      features: features.map((f) => ({
        type: 'Feature' as const,
        properties: { nom: f.nom, commune: f.commune, code: f.code },
        geometry: f.geometry as unknown as Geometry,
      })),
    }),
    [features]
  );

  const style = (): PathOptions => ({
    fillColor: '#9C27B0',
    fillOpacity: 0.2,
    color: '#9C27B0',
    weight: 1.5,
    opacity: 0.8,
  });

  const onEachFeature = (feature: Feature, layer: Layer) => {
    if (feature.properties) {
      const { nom, commune } = feature.properties;
      layer.bindTooltip(`QRR: ${nom} (${commune})`);
    }
  };

  return (
    <GeoJSON
      key="qrr-overlay"
      data={featureCollection}
      style={style}
      onEachFeature={onEachFeature}
    />
  );
}
