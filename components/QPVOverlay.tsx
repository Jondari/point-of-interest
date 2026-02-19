import React from 'react';
import { Polygon } from 'react-native-maps';
import { QPVFeature } from '../types/dangerZone';

interface QPVOverlayProps {
  features: QPVFeature[];
}

function geoJsonToCoords(ring: number[][]): { latitude: number; longitude: number }[] {
  return ring.map(([lon, lat]) => ({ latitude: lat, longitude: lon }));
}

const QPVPolygon = React.memo(function QPVPolygon({ feature }: { feature: QPVFeature }) {
  const { geometry } = feature;

  if (geometry.type === 'Polygon') {
    const coords = geometry.coordinates as number[][][];
    return (
      <Polygon
        coordinates={geoJsonToCoords(coords[0])}
        holes={coords.slice(1).map(geoJsonToCoords)}
        fillColor="rgba(33, 150, 243, 0.2)"
        strokeColor="rgba(33, 150, 243, 0.8)"
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
            fillColor="rgba(33, 150, 243, 0.2)"
            strokeColor="rgba(33, 150, 243, 0.8)"
            strokeWidth={1.5}
          />
        ))}
      </>
    );
  }

  return null;
});

export default function QPVOverlay({ features }: QPVOverlayProps) {
  return (
    <>
      {features.map((feature) => (
        <QPVPolygon key={feature.code} feature={feature} />
      ))}
    </>
  );
}
