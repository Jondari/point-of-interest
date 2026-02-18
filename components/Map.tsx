import { useRef, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { UrlTile, Marker, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { colors } from '../constants/theme';
import { POI } from '../types/poi';
import POIMarker from './POIMarker';

interface MapProps {
  latitude: number;
  longitude: number;
  showUserLocation?: boolean;
  onMapReady?: () => void;
  pois?: POI[];
  selectedPOI?: POI | null;
  onPOIPress?: (poi: POI) => void;
  onRegionChangeComplete?: (region: Region) => void;
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
}: MapProps) {
  const mapRef = useRef<MapView>(null);

  const handleRegionChangeComplete = useCallback(
    (region: Region) => {
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
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />

        {pois.map(poi => (
          <POIMarker
            key={poi.id}
            poi={poi}
            onPress={handlePOIPress}
            isSelected={selectedPOI?.id === poi.id}
          />
        ))}

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
