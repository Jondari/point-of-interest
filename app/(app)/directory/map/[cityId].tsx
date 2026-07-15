import { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Map from '../../../../components/Map';
import OfflinePOIMapCard from '../../../../components/OfflinePOIMapCard';
import RouteDirections from '../../../../components/RouteDirections';
import TransportModeSelector from '../../../../components/TransportModeSelector';
import { useLocation } from '../../../../hooks/useLocation';
import { useRoute } from '../../../../hooks/useRoute';
import {
  getOfflineCity,
  getOfflinePOI,
  getOfflinePOIs,
} from '../../../../services/offlinePoiService';
import { isOfflineCityId, OfflinePOI } from '../../../../types/offlinePoi';
import {
  getOfflinePOIMapRegion,
  groupOfflinePOIsByCoordinates,
  OfflinePOIGroup,
} from '../../../../utils/offlinePoiMap';
import { borderRadius, colors, fontSize, fontWeight, spacing } from '../../../../constants/theme';

export default function OfflinePOIMapScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const params = useLocalSearchParams<{
    cityId?: string | string[];
    poiId?: string | string[];
  }>();
  const cityIdParam = Array.isArray(params.cityId) ? params.cityId[0] : params.cityId;
  const poiIdParam = Array.isArray(params.poiId) ? params.poiId[0] : params.poiId;
  const cityId = cityIdParam && isOfflineCityId(cityIdParam) ? cityIdParam : null;
  const city = cityId ? getOfflineCity(cityId) : undefined;
  const pois = useMemo(() => cityId ? getOfflinePOIs(cityId) : [], [cityId]);
  const initialPOI = useMemo(() => {
    const poi = poiIdParam ? getOfflinePOI(poiIdParam) : undefined;
    return poi?.cityId === cityId ? poi : null;
  }, [cityId, poiIdParam]);
  const groups = useMemo(() => groupOfflinePOIsByCoordinates(pois), [pois]);
  const initialGroup = useMemo(
    () => initialPOI
      ? groups.find((group) => group.pois.some((poi) => poi.id === initialPOI.id)) ?? null
      : null,
    [groups, initialPOI]
  );
  const [selectedGroup, setSelectedGroup] = useState<OfflinePOIGroup | null>(initialGroup);
  const [selectedPOI, setSelectedPOI] = useState<OfflinePOI | null>(initialPOI);
  const {
    location,
    isLoading: locationLoading,
    errorMessage: locationError,
    permissionStatus,
    requestPermission,
    getCurrentLocation,
    clearError: clearLocationError,
  } = useLocation({ autoInitialize: false });
  const {
    route,
    isLoading: routeLoading,
    error: routeError,
    transportMode,
    calculateRoute,
    setTransportMode,
    clearRoute,
  } = useRoute();
  const region = useMemo(() => getOfflinePOIMapRegion(pois), [pois]);

  if (!city || !region || pois.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorTitle}>{t('directory.mapNotFound')}</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.back()}>
          <Text style={styles.primaryButtonText}>{t('directory.back')}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleGroupPress = (group: OfflinePOIGroup) => {
    clearRoute();
    clearLocationError();
    setSelectedGroup(group);
    setSelectedPOI(group.pois.length === 1 ? group.pois[0] : null);
  };

  const handleCloseCard = () => {
    setSelectedGroup(null);
    setSelectedPOI(null);
  };

  const handleOpenDetails = (poi: OfflinePOI) => {
    router.push({
      pathname: '/(app)/directory/[poiId]',
      params: { poiId: poi.id },
    });
  };

  const handleNavigate = async (poi: OfflinePOI) => {
    clearLocationError();
    const hasPermission = permissionStatus === 'granted'
      ? true
      : await requestPermission();

    if (!hasPermission) {
      return;
    }

    const origin = location ?? await getCurrentLocation();
    if (!origin) {
      return;
    }

    await calculateRoute(origin, {
      latitude: poi.latitude,
      longitude: poi.longitude,
    });
  };

  const handleClearRoute = () => {
    clearRoute();
    clearLocationError();
  };

  const cityName = i18n.language.startsWith('zh')
    ? city.name.zh
    : i18n.language.startsWith('en') ? city.name.en : city.name.fr;
  const mapLatitude = location?.latitude ?? region.latitude;
  const mapLongitude = location?.longitude ?? region.longitude;

  return (
    <View style={styles.container}>
      <Map
        latitude={mapLatitude}
        longitude={mapLongitude}
        showUserLocation={Boolean(location)}
        offlinePois={pois}
        selectedOfflinePOI={selectedPOI}
        onOfflinePOIGroupPress={handleGroupPress}
        route={route}
      />

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel={t('directory.back')}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>{t('directory.guideMapTitle')}</Text>
            <Text style={styles.headerSubtitle}>{cityName}</Text>
          </View>
        </View>
      </SafeAreaView>

      {selectedGroup &&
        !route &&
        !routeLoading &&
        !routeError &&
        !locationLoading &&
        !locationError && (
        <View style={styles.bottomPanel}>
          <OfflinePOIMapCard
            group={selectedGroup}
            selectedPOI={selectedPOI}
            onSelectPOI={setSelectedPOI}
            onClose={handleCloseCard}
            onOpenDetails={handleOpenDetails}
            onNavigate={handleNavigate}
          />
        </View>
      )}

      {(route || routeLoading || routeError || locationLoading || locationError) && (
        <View style={styles.routePanel}>
          <TransportModeSelector
            selectedMode={transportMode}
            onSelectMode={setTransportMode}
            disabled={routeLoading || locationLoading}
          />
          {(routeLoading || locationLoading) && (
            <View style={styles.loadingRow}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.loadingText}>
                {locationLoading ? t('map.loading') : t('routes.calculating')}
              </Text>
            </View>
          )}
          {(locationError || routeError) && (
            <View style={styles.routeErrorRow}>
              <Text style={styles.routeError}>
                {t(locationError ?? routeError ?? 'routes.fetchError')}
              </Text>
              <TouchableOpacity onPress={handleClearRoute} accessibilityRole="button">
                <Text style={styles.dismissText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
          {route && <RouteDirections route={route} onClose={handleClearRoute} />}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  errorTitle: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
  },
  primaryButton: {
    minHeight: 48,
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'box-none',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    maxWidth: '90%',
    margin: spacing.md,
    padding: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    gap: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
  },
  backButtonText: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 32,
  },
  headerText: {
    flexShrink: 1,
    paddingRight: spacing.sm,
  },
  headerTitle: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  headerSubtitle: {
    color: '#147D64',
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  bottomPanel: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
  },
  routePanel: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    maxHeight: 360,
    padding: spacing.md,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  loadingText: {
    color: colors.textLight,
    fontSize: fontSize.sm,
  },
  routeErrorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  routeError: {
    flex: 1,
    color: colors.error,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  dismissText: {
    color: colors.error,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
});
