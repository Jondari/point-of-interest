import { useRef, useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { colors } from '../constants/theme';
import { POI } from '../types/poi';
import { Route } from '../types/route';
import { CommuneRenderData, HeatmapPoint, DangerZoneConfig, DangerRenderMode, QPVFeature, QRRFeature } from '../types/dangerZone';
import POIMarker from './POIMarker';
import RoutePolyline from './RoutePolyline';
import DangerChoropleth from './DangerChoropleth';
import DangerHeatmap from './DangerHeatmap';
import QPVOverlay from './QPVOverlay';
import QRROverlay from './QRROverlay';
import { filterCommunesByViewport, filterHeatmapByViewport } from '../utils/mapViewport';

interface MapProps {
  latitude: number;
  longitude: number;
  showUserLocation?: boolean;
  onMapReady?: () => void;
  pois?: POI[];
  selectedPOI?: POI | null;
  onPOIPress?: (poi: POI) => void;
  onRegionChangeComplete?: (region: Region) => void;
  route?: Route | null;
  dangerZoneProps?: {
    isVisible: boolean;
    renderMode: DangerRenderMode;
    selectedIndicator: string;
    communeData: CommuneRenderData[];
    heatmapPoints: HeatmapPoint[];
    config: DangerZoneConfig;
    qpvData?: QPVFeature[];
    qrrData?: QRRFeature[];
    showQPV?: boolean;
    showQRR?: boolean;
  };
}

export default function Map({
  latitude,
  longitude,
  showUserLocation = true,
  onMapReady,
  pois = [],
  selectedPOI,
  onPOIPress,
  onRegionChangeComplete,
  route = null,
  dangerZoneProps,
}: MapProps) {
  const mapRef = useRef<MapView>(null);
  const [visibleRegion, setVisibleRegion] = useState<Region>({
    latitude,
    longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const visibleCommunes = useMemo(
    () => filterCommunesByViewport(dangerZoneProps?.communeData ?? [], visibleRegion),
    [dangerZoneProps?.communeData, visibleRegion]
  );
  const visibleHeatmapPoints = useMemo(
    () => filterHeatmapByViewport(dangerZoneProps?.heatmapPoints ?? [], visibleRegion),
    [dangerZoneProps?.heatmapPoints, visibleRegion]
  );

  const handleRegionChangeComplete = useCallback(
    (region: Region) => {
      setVisibleRegion(region);
      onRegionChangeComplete?.(region);
    },
    [onRegionChangeComplete]
  );

  const handlePOIPress = useCallback(
    (poi: POI) => {
      onPOIPress?.(poi);
      mapRef.current?.animateToRegion(
        {
          latitude: poi.latitude,
          longitude: poi.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        300
      );
    },
    [onPOIPress]
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        onMapReady={onMapReady}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation={false}
        showsMyLocationButton={false}
      >
        {dangerZoneProps?.isVisible && dangerZoneProps.renderMode === 'choropleth' && (
          <DangerChoropleth
            communes={visibleCommunes}
            opacity={dangerZoneProps.config.opacity}
          />
        )}
        {dangerZoneProps?.isVisible && dangerZoneProps.renderMode === 'heatmap' && (
          <DangerHeatmap
            points={visibleHeatmapPoints}
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
          <Marker
            coordinate={{ latitude, longitude }}
            title="Vous êtes ici"
            pinColor={colors.primary}
            zIndex={1000}
          >
            <View style={styles.userMarker}>
              <View style={styles.userMarkerInner} />
            </View>
          </Marker>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  userMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  userMarkerInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
});
