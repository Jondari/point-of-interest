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
import { useLocation } from '../../hooks/useLocation';
import { useAuth } from '../../hooks/useAuth';
import { usePOI } from '../../hooks/usePOI';
import { useRoute } from '../../hooks/useRoute';
import { useDangerZones } from '../../hooks/useDangerZones';
import { DEFAULT_DANGER_ZONE_CONFIG } from '../../types/dangerZone';
import { changeLanguage } from '../../locales';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../constants/theme';
import { POI } from '../../types/poi';
import { RoutePoint } from '../../types/route';

const ARRIVAL_THRESHOLD_METERS = 30;

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
  const { t, i18n } = useTranslation();
  const { location, isLoading: locationLoading, errorMessage, refreshLocation, startWatching, stopWatching } = useLocation();
  const routeDestinationRef = useRef<RoutePoint | null>(null);
  const { logout } = useAuth();
  const {
    pois,
    isLoading: poisLoading,
    filters,
    selectedPOI,
    fetchPOIs,
    toggleCategory,
    selectPOI,
  } = usePOI();
  const {
    isVisible: dangerVisible,
    renderMode: dangerRenderMode,
    communeData,
    heatmapPoints,
    toggleVisibility: toggleDangerVisibility,
    toggleRenderMode: toggleDangerRenderMode,
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
      fetchPOIs(location.latitude, location.longitude);
    }
  }, [location, filters.categories, fetchPOIs]);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'fr' ? 'en' : 'fr';
    changeLanguage(nextLang);
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  const handlePOIPress = useCallback((poi: POI) => {
    selectPOI(poi);
  }, [selectPOI]);

  const handleClosePOI = useCallback(() => {
    selectPOI(null);
  }, [selectPOI]);

  const handleNavigateToPOI = useCallback((poi: POI) => {
    if (!location) return;
    const from: RoutePoint = { latitude: location.latitude, longitude: location.longitude };
    const to: RoutePoint = { latitude: poi.latitude, longitude: poi.longitude };
    routeDestinationRef.current = to;
    calculateRoute(from, to);
    selectPOI(null);
    startWatching();
  }, [location, calculateRoute, selectPOI, startWatching]);

  const handleClearRoute = useCallback(() => {
    clearRoute();
    routeDestinationRef.current = null;
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
    calculateRoute(from, dest);
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRegionChange = useCallback(
    (region: { latitude: number; longitude: number }) => {
      fetchPOIs(region.latitude, region.longitude);
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
          <TouchableOpacity style={styles.retryButton} onPress={refreshLocation}>
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
          communeData,
          heatmapPoints,
          config: DEFAULT_DANGER_ZONE_CONFIG,
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
                <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
                  <Text style={styles.langButtonText}>
                    {i18n.language === 'fr' ? 'EN' : 'FR'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                  <Text style={styles.logoutButtonText}>{t('map.logout')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <CategoryFilter
            selectedCategories={filters.categories}
            onToggleCategory={toggleCategory}
          />
        </View>

        <View style={styles.controls}>
          {route && (
            <TouchableOpacity style={styles.controlButton} onPress={handleClearRoute}>
              <Text style={styles.controlButtonText}>✕</Text>
            </TouchableOpacity>
          )}
          <DangerZoneToggle
            isVisible={dangerVisible}
            renderMode={dangerRenderMode}
            onToggleVisibility={toggleDangerVisibility}
            onToggleMode={toggleDangerRenderMode}
          />
          <TouchableOpacity style={styles.controlButton} onPress={refreshLocation}>
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

      {(route || routeLoading) && (
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
