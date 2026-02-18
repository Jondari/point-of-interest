import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { POI, POI_CATEGORY_CONFIG } from '../types/poi';

interface POIMarkerProps {
  poi: POI;
  onPress: (poi: POI) => void;
  isSelected?: boolean;
}

function createPOIIcon(poi: POI, isSelected: boolean) {
  const config = POI_CATEGORY_CONFIG[poi.category];
  const size = isSelected ? 44 : 36;
  const borderColor = isSelected ? '#FFD700' : 'white';
  const borderWidth = isSelected ? 3 : 2;

  return L.divIcon({
    className: 'poi-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${config.color};
        border: ${borderWidth}px solid ${borderColor};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        font-size: ${isSelected ? 22 : 18}px;
        cursor: pointer;
      ">${config.emoji}</div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function POIMarker({ poi, onPress, isSelected = false }: POIMarkerProps) {
  return (
    <Marker
      position={[poi.latitude, poi.longitude]}
      icon={createPOIIcon(poi, isSelected)}
      eventHandlers={{
        click: () => onPress(poi),
      }}
    />
  );
}
