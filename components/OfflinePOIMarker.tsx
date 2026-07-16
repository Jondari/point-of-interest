import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { OFFLINE_POI_CATEGORY_CONFIG } from '../types/offlinePoi';
import { OfflinePOIGroup } from '../utils/offlinePoiMap';

const ANDROID_TRACKING_DURATION_MS = 250;

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
  const [tracksViewChanges, setTracksViewChanges] = useState(
    Platform.OS === 'android'
  );

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    setTracksViewChanges(true);
    const timeoutId = setTimeout(
      () => setTracksViewChanges(false),
      ANDROID_TRACKING_DURATION_MS
    );

    return () => clearTimeout(timeoutId);
  }, [group.pois.length, isSelected]);

  return (
    <Marker
      coordinate={{ latitude: group.latitude, longitude: group.longitude }}
      onPress={() => onPress(group)}
      tracksViewChanges={tracksViewChanges}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <View style={styles.markerCanvas}>
        <View style={[styles.marker, isSelected && styles.markerSelected]}>
          <Text style={isGroup ? styles.count : styles.emoji}>
            {isGroup ? group.pois.length : config.emoji}
          </Text>
        </View>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  markerCanvas: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#147D64',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  markerSelected: {
    borderWidth: 3,
    borderColor: '#FFD700',
    transform: [{ scale: 1.15 }],
  },
  emoji: {
    fontSize: 19,
  },
  count: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
});
