import React from 'react';
import { Polygon } from 'react-native-maps';
import { CommuneRenderData } from '../types/dangerZone';

interface DangerChoroplethProps {
  communes: CommuneRenderData[];
  opacity: number;
}

function geoJsonToCoords(ring: number[][]): { latitude: number; longitude: number }[] {
  return ring.map(([lon, lat]) => ({ latitude: lat, longitude: lon }));
}

function hexToRgba(color: string, alpha: number): string {
  return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
}

const CommunePolygon = React.memo(function CommunePolygon({
  commune,
  opacity,
}: {
  commune: CommuneRenderData;
  opacity: number;
}) {
  const { geometry, fillColor } = commune;

  if (geometry.type === 'Polygon') {
    const coords = geometry.coordinates as number[][][];
    return (
      <Polygon
        coordinates={geoJsonToCoords(coords[0])}
        holes={coords.slice(1).map(geoJsonToCoords)}
        fillColor={hexToRgba(fillColor, opacity)}
        strokeColor={hexToRgba(fillColor, 0.8)}
        strokeWidth={0.5}
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
            fillColor={hexToRgba(fillColor, opacity)}
            strokeColor={hexToRgba(fillColor, 0.8)}
            strokeWidth={0.5}
          />
        ))}
      </>
    );
  }

  return null;
});

export default function DangerChoropleth({ communes, opacity }: DangerChoroplethProps) {
  return (
    <>
      {communes.map((commune) => (
        <CommunePolygon key={commune.codeCommune} commune={commune} opacity={opacity} />
      ))}
    </>
  );
}
