import { useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { colors } from '../constants/theme';
import { POI } from '../types/poi';
import { Route } from '../types/route';
import { CommuneRenderData, HeatmapPoint, DangerZoneConfig, DangerRenderMode, QPVFeature, QRRFeature } from '../types/dangerZone';
import POIMarker from './POIMarker.web';
import RoutePolyline from './RoutePolyline.web';
import DangerChoropleth from './DangerChoropleth.web';
import DangerHeatmap from './DangerHeatmap.web';
import QPVOverlay from './QPVOverlay.web';
import QRROverlay from './QRROverlay.web';

interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface MapProps {
  latitude: number;
  longitude: number;
  showUserLocation?: boolean;
  pois?: POI[];
  selectedPOI?: POI | null;
  onPOIPress?: (poi: POI) => void;
  onRegionChangeComplete?: (region: MapRegion) => void;
  route?: Route | null;
  dangerZoneProps?: {
    isVisible: boolean;
    renderMode: DangerRenderMode;
    communeData: CommuneRenderData[];
    heatmapPoints: HeatmapPoint[];
    config: DangerZoneConfig;
    qpvData?: QPVFeature[];
    qrrData?: QRRFeature[];
    showQPV?: boolean;
    showQRR?: boolean;
  };
}

const userIcon = L.divIcon({
  className: 'user-marker',
  html: `<div style="
    width: 24px;
    height: 24px;
    background-color: ${colors.primary};
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    z-index: 1000;
  "></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function MapController({ latitude, longitude }: { latitude: number; longitude: number }) {
  const map = useMap();
  const initialRef = useRef(true);

  useEffect(() => {
    if (initialRef.current) {
      map.setView([latitude, longitude], 15);
      initialRef.current = false;
    }
  }, [map, latitude, longitude]);

  return null;
}

function MapEventHandler({
  onRegionChangeComplete,
}: {
  onRegionChangeComplete?: (region: MapRegion) => void;
}) {
  const map = useMapEvents({
    moveend: () => {
      if (onRegionChangeComplete) {
        const center = map.getCenter();
        const bounds = map.getBounds();
        const latDelta = bounds.getNorth() - bounds.getSouth();
        const lonDelta = bounds.getEast() - bounds.getWest();

        onRegionChangeComplete({
          latitude: center.lat,
          longitude: center.lng,
          latitudeDelta: latDelta,
          longitudeDelta: lonDelta,
        });
      }
    },
  });

  return null;
}

export default function Map({
  latitude,
  longitude,
  showUserLocation = true,
  pois = [],
  selectedPOI,
  onPOIPress,
  onRegionChangeComplete,
  route = null,
  dangerZoneProps,
}: MapProps) {
  const handlePOIPress = useCallback(
    (poi: POI) => {
      onPOIPress?.(poi);
    },
    [onPOIPress]
  );

  return (
    <View style={styles.container}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <ZoomControl position="bottomleft" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController latitude={latitude} longitude={longitude} />
        <MapEventHandler onRegionChangeComplete={onRegionChangeComplete} />

        {dangerZoneProps?.isVisible && dangerZoneProps.renderMode === 'choropleth' && (
          <DangerChoropleth
            communes={dangerZoneProps.communeData}
            opacity={dangerZoneProps.config.opacity}
          />
        )}
        {dangerZoneProps?.isVisible && dangerZoneProps.renderMode === 'heatmap' && (
          <DangerHeatmap
            points={dangerZoneProps.heatmapPoints}
            config={dangerZoneProps.config}
          />
        )}

        {dangerZoneProps?.showQPV && dangerZoneProps.qpvData && (
          <QPVOverlay features={dangerZoneProps.qpvData} />
        )}
        {dangerZoneProps?.showQRR && dangerZoneProps.qrrData && (
          <QRROverlay features={dangerZoneProps.qrrData} />
        )}

        {pois.map(poi => (
          <POIMarker
            key={poi.id}
            poi={poi}
            onPress={handlePOIPress}
            isSelected={selectedPOI?.id === poi.id}
          />
        ))}

        {route && <RoutePolyline route={route} />}

        {showUserLocation && (
          <Marker position={[latitude, longitude]} icon={userIcon} zIndexOffset={1000} />
        )}
      </MapContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
