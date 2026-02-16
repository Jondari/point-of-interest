import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Map from '../../components/Map';
import { useLocation } from '../../hooks/useLocation';
import { useAuth } from '../../hooks/useAuth';
import { changeLanguage } from '../../locales';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../constants/theme';

export default function MapScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { location, isLoading, errorMessage, refreshLocation } = useLocation();
  const { logout } = useAuth();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'fr' ? 'en' : 'fr';
    changeLanguage(nextLang);
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  if (isLoading) {
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
      />

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>{t('map.title')}</Text>
            <View style={styles.headerActions}>
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

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={refreshLocation}>
            <Text style={styles.controlButtonText}>📍</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    bottom: spacing.xl,
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
});
