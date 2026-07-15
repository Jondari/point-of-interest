import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import { colors, fontSize, fontWeight } from '../constants/theme';
import { POICluster } from '../utils/mapViewport';

interface Props {
  cluster: POICluster;
  onPress: (cluster: POICluster) => void;
}

export default function POIClusterMarker({ cluster, onPress }: Props) {
  const { t } = useTranslation();
  const [tracksViewChanges, setTracksViewChanges] = useState(
    Platform.OS === 'android'
  );

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    setTracksViewChanges(true);
    const timeoutId = setTimeout(
      () => setTracksViewChanges(false),
      250
    );

    return () => clearTimeout(timeoutId);
  }, [cluster.count]);

  return (
    <Marker
      coordinate={{
        latitude: cluster.latitude,
        longitude: cluster.longitude,
      }}
      title={t('poi.clusterLabel', { count: cluster.count })}
      tracksViewChanges={tracksViewChanges}
      onPress={() => onPress(cluster)}
    >
      <View style={styles.cluster}>
        <Text style={styles.count}>{cluster.count}</Text>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  cluster: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.white,
    elevation: 5,
  },
  count: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
});
