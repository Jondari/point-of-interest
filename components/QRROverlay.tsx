import React from 'react';
import { Polygon } from 'react-native-maps';
import { QRRFeature } from '../types/dangerZone';

interface QRROverlayProps {
  features: QRRFeature[];
}

function geoJsonToCoords(ring: number[][]): { latitude: number; longitude: number }[] {
  return ring.map(([lon, lat]) => ({ latitude: lat, longitude: lon }));
}

const QRRPolygon = React.memo(function QRRPolygon({ feature }: { feature: QRRFeature }) {
  const { geometry } = feature;

  if (geometry.type === 'Polygon') {
    const coords = geometry.coordinates as number[][][];
    return (
      <Polygon
        coordinates={geoJsonToCoords(coords[0])}
        holes={coords.slice(1).map(geoJsonToCoords)}
        fillColor="rgba(156, 39, 176, 0.2)"
        strokeColor="rgba(156, 39, 176, 0.8)"
        strokeWidth={1.5}
      />
    );
  }

  if (geometry.type === 'MultiPolygon') {
    const multiCoords = geometry.coordinates as number[][][][];
    return (
      <>
        {multiCoords.map((polygon, i) => (
          <Polygon
            key={i}
            coordinates={geoJsonToCoords(polygon[0])}
            holes={polygon.slice(1).map(geoJsonToCoords)}
            fillColor="rgba(156, 39, 176, 0.2)"
            strokeColor="rgba(156, 39, 176, 0.8)"
            strokeWidth={1.5}
          />
        ))}
      </>
    );
  }

  return null;
});

export default function QRROverlay({ features }: QRROverlayProps) {
  return (
    <>
      {features.map((feature, i) => (
        <QRRPolygon key={feature.code || i} feature={feature} />
      ))}
    </>
  );
}
