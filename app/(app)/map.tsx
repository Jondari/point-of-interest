import { useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Map from '../../components/Map';
import CategoryFilter from '../../components/CategoryFilter';
import POICard from '../../components/POICard';
import TransportModeSelector from '../../components/TransportModeSelector';
import RouteDirections from '../../components/RouteDirections';
import DangerZoneToggle from '../../components/DangerZoneToggle';
import LanguageSelector from '../../components/LanguageSelector';
import { useLocation } from '../../hooks/useLocation';
import { useAuth } from '../../hooks/useAuth';
import { usePOI } from '../../hooks/usePOI';
import { useRoute } from '../../hooks/useRoute';
import { useDangerZones } from '../../hooks/useDangerZones';
import { DEFAULT_DANGER_ZONE_CONFIG } from '../../types/dangerZone';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../constants/theme';
import { MapRegion, POI } from '../../types/poi';
import { RoutePoint } from '../../types/route';

const ARRIVAL_THRESHOLD_METERS = 30;
const ROUTE_RECALCULATION_THRESHOLD_METERS = 50;
const DEFAULT_MAP_REGION_DELTA = 0.02;

function getDistanceMeters(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 6371000;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function MapScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { location, isLoading: locationLoading, errorMessage, refreshLocation, startWatching, stopWatching } = useLocation();
  const routeDestinationRef = useRef<RoutePoint | null>(null);
  const lastRouteOriginRef = useRef<RoutePoint | null>(null);
  const mapRegionRef = useRef<MapRegion | null>(null);
  const { logout } = useAuth();
  const {
    pois,
    isLoading: poisLoading,
    isTruncated: poiResultsLimited,
    filters,
    selectedPOI,
    fetchPOIs,
    toggleCategory,
    selectPOI,
    error: poiError,
    clearError: clearPOIError,
  } = usePOI();
  const {
    isVisible: dangerVisible,
    renderMode: dangerRenderMode,
    selectedIndicator,
    showQPV,
    showQRR,
    communeData,
    heatmapPoints,
    availableIndicators,
    qpvData,
    qrrData,
    isLoading: dangerLayerLoading,
    error: dangerLayerError,
    toggleVisibility: toggleDangerVisibility,
    toggleRenderMode: toggleDangerRenderMode,
    setIndicator,
    toggleQPV,
    toggleQRR,
    clearError: clearDangerLayerError,
  } = useDangerZones();
  const {
    route,
    isLoading: routeLoading,
    error: routeError,
    transportMode,
    calculateRoute,
    setTransportMode,
    clearRoute,
  } = useRoute();

  useEffect(() => {
    if (location) {
      const region = mapRegionRef.current ?? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: DEFAULT_MAP_REGION_DELTA,
        longitudeDelta: DEFAULT_MAP_REGION_DELTA,
      };

      mapRegionRef.current = region;
      fetchPOIs(region);
    }
  }, [location, filters.categories, fetchPOIs]);

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  const handleHome = () => {
    handleClearRoute();
    router.replace('/(app)');
  };

  const handlePOIPress = useCallback((poi: POI) => {
    selectPOI(poi);
  }, [selectPOI]);

  const handleClosePOI = useCallback(() => {
    selectPOI(null);
  }, [selectPOI]);

  const handleNavigateToPOI = useCallback(async (poi: POI) => {
    if (!location) return;
    const from: RoutePoint = { latitude: location.latitude, longitude: location.longitude };
    const to: RoutePoint = { latitude: poi.latitude, longitude: poi.longitude };
    routeDestinationRef.current = to;
    lastRouteOriginRef.current = from;
    selectPOI(null);
    const result = await calculateRoute(from, to);
    if (result && routeDestinationRef.current === to) {
      await startWatching();
    }
  }, [location, calculateRoute, selectPOI, startWatching]);

  const handleClearRoute = useCallback(() => {
    clearRoute();
    routeDestinationRef.current = null;
    lastRouteOriginRef.current = null;
    stopWatching();
  }, [clearRoute, stopWatching]);

  // Recalculate route when position updates, stop when arrived
  useEffect(() => {
    if (!route || !location || !routeDestinationRef.current) return;

    const dest = routeDestinationRef.current;
    const distanceToDestination = getDistanceMeters(
      location.latitude, location.longitude,
      dest.latitude, dest.longitude
    );

    if (distanceToDestination < ARRIVAL_THRESHOLD_METERS) {
      handleClearRoute();
      return;
    }

    const from: RoutePoint = { latitude: location.latitude, longitude: location.longitude };
    const lastOrigin = lastRouteOriginRef.current;
    if (lastOrigin) {
      const distanceSinceLastRoute = getDistanceMeters(
        lastOrigin.latitude,
        lastOrigin.longitude,
        from.latitude,
        from.longitude
      );

      if (distanceSinceLastRoute < ROUTE_RECALCULATION_THRESHOLD_METERS) {
        return;
      }
    }

    lastRouteOriginRef.current = from;
    calculateRoute(from, dest);
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (routeError) {
      stopWatching();
    }
  }, [routeError, stopWatching]);

  const handleRegionChange = useCallback(
    (region: MapRegion) => {
      mapRegionRef.current = region;
      fetchPOIs(region);
    },
    [fetchPOIs]
  );

  if (locationLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>{t('map.loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (errorMessage || !location) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>📍</Text>
          <Text style={styles.errorTitle}>{t('map.errorTitle')}</Text>
          <Text style={styles.errorMessage}>
            {errorMessage ? t(errorMessage) : t('map.errorMessage')}
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={refreshLocation}
            accessibilityRole="button"
            accessibilityLabel={t('map.retry')}
          >
            <Text style={styles.retryButtonText}>{t('map.retry')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Map
        latitude={location.latitude}
        longitude={location.longitude}
        showUserLocation={true}
        pois={pois}
        selectedPOI={selectedPOI}
        onPOIPress={handlePOIPress}
        onRegionChangeComplete={handleRegionChange}
        route={route}
        dangerZoneProps={{
          isVisible: dangerVisible,
          renderMode: dangerRenderMode,
          selectedIndicator,
          communeData,
          heatmapPoints,
          config: DEFAULT_DANGER_ZONE_CONFIG,
          qpvData,
          qrrData,
          showQPV,
          showQRR,
        }}
      />

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <View style={styles.topSection}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>{t('map.title')}</Text>
              <View style={styles.headerActions}>
                {poisLoading && (
                  <ActivityIndicator size="small" color={colors.primary} />
                )}
                <TouchableOpacity
                  style={styles.langButton}
                  onPress={handleHome}
                  accessibilityRole="button"
                  accessibilityLabel={t('map.home')}
                >
                  <Text style={styles.langButtonText}>{t('map.home')}</Text>
                </TouchableOpacity>
                <LanguageSelector />
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={handleLogout}
                  accessibilityRole="button"
                  accessibilityLabel={t('map.logout')}
                >
                  <Text style={styles.logoutButtonText}>{t('map.logout')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <CategoryFilter
            selectedCategories={filters.categories}
            onToggleCategory={toggleCategory}
          />
          {poiError && (
            <TouchableOpacity
              style={styles.poiErrorBanner}
              onPress={clearPOIError}
              accessibilityRole="button"
              accessibilityLabel={`${t(poiError)}. ${t('common.dismiss')}`}
            >
              <Text style={styles.poiErrorText}>{t(poiError)}</Text>
              <Text style={styles.poiErrorClose}>✕</Text>
            </TouchableOpacity>
          )}
          {poiResultsLimited && !poiError && (
            <View
              style={styles.poiLimitBanner}
              pointerEvents="none"
              accessibilityLiveRegion="polite"
            >
              <Text style={styles.poiLimitText}>
                {t('poi.resultsLimited', { count: pois.length })}
              </Text>
            </View>
          )}
          {dangerLayerError && (
            <TouchableOpacity
              style={styles.poiErrorBanner}
              onPress={clearDangerLayerError}
              accessibilityRole="button"
              accessibilityLabel={`${t(dangerLayerError)}. ${t('common.dismiss')}`}
            >
              <Text style={styles.poiErrorText}>{t(dangerLayerError)}</Text>
              <Text style={styles.poiErrorClose}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.controls}>
          {(route || routeLoading || routeError) && (
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleClearRoute}
              accessibilityRole="button"
              accessibilityLabel={t('routes.clear')}
            >
              <Text style={styles.controlButtonText}>✕</Text>
            </TouchableOpacity>
          )}
          <DangerZoneToggle
            isVisible={dangerVisible}
            renderMode={dangerRenderMode}
            onToggleVisibility={toggleDangerVisibility}
            onToggleMode={toggleDangerRenderMode}
            showQPV={showQPV}
            showQRR={showQRR}
            onToggleQPV={toggleQPV}
            onToggleQRR={toggleQRR}
            selectedIndicator={selectedIndicator}
            availableIndicators={availableIndicators}
            onSelectIndicator={setIndicator}
          />
          {dangerLayerLoading && (
            <ActivityIndicator size="small" color={colors.primary} />
          )}
          <TouchableOpacity
            style={styles.controlButton}
            onPress={refreshLocation}
            accessibilityRole="button"
            accessibilityLabel={t('map.refreshLocation')}
          >
            <Text style={styles.controlButtonText}>📍</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {selectedPOI && !route && (
        <View style={styles.poiCardContainer}>
          <POICard
            poi={selectedPOI}
            onClose={handleClosePOI}
            onNavigate={handleNavigateToPOI}
          />
        </View>
      )}

      {(route || routeLoading || routeError) && (
        <View style={styles.routePanelContainer}>
          <TransportModeSelector
            selectedMode={transportMode}
            onSelectMode={setTransportMode}
            disabled={routeLoading}
          />
          {routeLoading && (
            <ActivityIndicator size="small" color={colors.primary} />
          )}
          {routeError && (
            <Text style={styles.routeError}>{t(routeError)}</Text>
          )}
          {route && (
            <RouteDirections route={route} onClose={handleClearRoute} />
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: colors.textLight,
  },
  poiErrorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FDECEC',
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  poiErrorText: {
    flex: 1,
    color: colors.error,
    fontSize: fontSize.sm,
  },
  poiErrorClose: {
    color: colors.error,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginLeft: spacing.sm,
  },
  poiLimitBanner: {
    backgroundColor: '#FFF4E5',
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  poiLimitText: {
    color: colors.text,
    fontSize: fontSize.sm,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  errorTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  errorMessage: {
    fontSize: fontSize.md,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },
  retryButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    pointerEvents: 'box-none',
  },
  topSection: {
    pointerEvents: 'box-none',
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  langButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  langButtonText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  logoutButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  logoutButtonText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  controls: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.xl + 150,
    gap: spacing.sm,
  },
  controlButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  controlButtonText: {
    fontSize: 24,
  },
  poiCardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  routePanelContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  routeError: {
    color: colors.error,
    fontSize: fontSize.sm,
    textAlign: 'center',
    paddingVertical: spacing.sm,
  },
});
