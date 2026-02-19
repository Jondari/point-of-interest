import { useMemo } from 'react';
import { GeoJSON } from 'react-leaflet';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import type { Layer, PathOptions } from 'leaflet';
import { CommuneRenderData } from '../types/dangerZone';

interface DangerChoroplethProps {
  communes: CommuneRenderData[];
  opacity: number;
}

export default function DangerChoropleth({ communes, opacity }: DangerChoroplethProps) {
  const featureCollection = useMemo<FeatureCollection>(() => ({
    type: 'FeatureCollection',
    features: communes.map((c) => ({
      type: 'Feature' as const,
      properties: {
        fillColor: c.fillColor,
        nomCommune: c.nomCommune,
        crimeRate: c.crimeRate,
      },
      geometry: c.geometry as unknown as Geometry,
    })),
  }), [communes]);

  const style = (feature?: Feature): PathOptions => ({
    fillColor: feature?.properties?.fillColor ?? '#gray',
    fillOpacity: opacity,
    color: '#555',
    weight: 0.5,
    opacity: 0.6,
  });

  const onEachFeature = (feature: Feature, layer: Layer) => {
    if (feature.properties) {
      const { nomCommune, crimeRate } = feature.properties;
      layer.bindTooltip(`${nomCommune}: ${crimeRate}/1000 hab.`);
    }
  };

  return (
    <GeoJSON
      key="danger-choropleth"
      data={featureCollection}
      style={style}
      onEachFeature={onEachFeature}
    />
  );
}
