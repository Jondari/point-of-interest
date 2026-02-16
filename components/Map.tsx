import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { UrlTile, Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { colors } from '../constants/theme';

interface MapProps {
  latitude: number;
  longitude: number;
  showUserLocation?: boolean;
  onMapReady?: () => void;
}

export default function Map({
  latitude,
  longitude,
  showUserLocation = true,
  onMapReady,
}: MapProps) {
  const mapRef = useRef<MapView>(null);

  const centerOnUser = () => {
    mapRef.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      500
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onMapReady={onMapReady}
        showsUserLocation={false}
        showsMyLocationButton={false}
      >
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
        {showUserLocation && (
          <Marker
            coordinate={{ latitude, longitude }}
            title="Vous êtes ici"
            pinColor={colors.primary}
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

Map.centerOnUser = () => {};

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
