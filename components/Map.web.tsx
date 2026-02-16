import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { colors } from '../constants/theme';

interface MapProps {
  latitude: number;
  longitude: number;
  showUserLocation?: boolean;
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

export default function Map({ latitude, longitude, showUserLocation = true }: MapProps) {
  return (
    <View style={styles.container}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController latitude={latitude} longitude={longitude} />
        {showUserLocation && (
          <Marker position={[latitude, longitude]} icon={userIcon} />
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
