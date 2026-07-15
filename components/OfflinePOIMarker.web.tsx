import { useMemo } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { OFFLINE_POI_CATEGORY_CONFIG } from '../types/offlinePoi';
import { OfflinePOIGroup } from '../utils/offlinePoiMap';

interface OfflinePOIMarkerProps {
  group: OfflinePOIGroup;
  isSelected?: boolean;
  onPress: (group: OfflinePOIGroup) => void;
}

export default function OfflinePOIMarker({
  group,
  isSelected = false,
  onPress,
}: OfflinePOIMarkerProps) {
  const firstPOI = group.pois[0];
  const config = OFFLINE_POI_CATEGORY_CONFIG[firstPOI.category];
  const isGroup = group.pois.length > 1;
  const icon = useMemo(() => {
    const size = isSelected ? 46 : 40;
    const borderColor = isSelected ? '#FFD700' : 'white';
    const borderWidth = isSelected ? 3 : 2;

    return L.divIcon({
      className: 'offline-poi-marker',
      html: `<div style="
        width: ${size}px;
        height: ${size}px;
        background-color: #147D64;
        border: ${borderWidth}px solid ${borderColor};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        color: white;
        font-size: ${isGroup ? 15 : 19}px;
        font-weight: 700;
        cursor: pointer;
      ">${isGroup ? group.pois.length : config.emoji}</div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  }, [config.emoji, group.pois.length, isGroup, isSelected]);

  return (
    <Marker
      position={[group.latitude, group.longitude]}
      icon={icon}
      eventHandlers={{ click: () => onPress(group) }}
    />
  );
}
