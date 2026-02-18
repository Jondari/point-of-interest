import { View, Text, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { POI, POI_CATEGORY_CONFIG } from '../types/poi';

interface POIMarkerProps {
  poi: POI;
  onPress: (poi: POI) => void;
  isSelected?: boolean;
}

export default function POIMarker({ poi, onPress, isSelected }: POIMarkerProps) {
  const config = POI_CATEGORY_CONFIG[poi.category];

  return (
    <Marker
      coordinate={{
        latitude: poi.latitude,
        longitude: poi.longitude,
      }}
      onPress={() => onPress(poi)}
      tracksViewChanges={false}
    >
      <View style={[styles.marker, isSelected && styles.markerSelected]}>
        <View
          style={[
            styles.markerInner,
            { backgroundColor: config.color },
            isSelected && styles.markerInnerSelected,
          ]}
        >
          <Text style={styles.emoji}>{config.emoji}</Text>
        </View>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerSelected: {
    transform: [{ scale: 1.2 }],
  },
  markerInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4A90D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  markerInnerSelected: {
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  emoji: {
    fontSize: 18,
  },
});
