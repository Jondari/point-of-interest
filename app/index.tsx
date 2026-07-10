import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { changeLanguage } from '../locales';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { isAuthenticated, isLoading, loginAsGuest } = useAuth();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'fr' ? 'en' : 'fr';
    changeLanguage(nextLang);
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/(app)');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleGuestLogin = async () => {
    await loginAsGuest();
    router.replace('/(app)');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.languageRow}>
        <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
          <Text style={styles.langButtonText}>
            {i18n.language === 'fr' ? 'EN' : 'FR'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📍</Text>
          </View>
          <Text style={styles.title}>{t('login.title')}</Text>
          <Text style={styles.subtitle}>{t('login.subtitle')}</Text>
        </View>

        <View style={styles.features}>
          <FeatureItem
            emoji="🗺️"
            title={t('features.explore.title')}
            description={t('features.explore.description')}
          />
          <FeatureItem
            emoji="⭐"
            title={t('features.save.title')}
            description={t('features.save.description')}
          />
          <FeatureItem
            emoji="🧭"
            title={t('features.navigate.title')}
            description={t('features.navigate.description')}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.guestButton}
            onPress={handleGuestLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.guestButtonText}>{t('login.guestButton')}</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>{t('login.comingSoon')}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function FeatureItem({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureEmoji}>{emoji}</Text>
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.lg,
    color: colors.textLight,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  features: {
    gap: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  featureEmoji: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  footer: {
    paddingBottom: spacing.xl,
  },
  guestButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  guestButtonText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  footerText: {
    textAlign: 'center',
    color: colors.textLight,
    fontSize: fontSize.sm,
    marginTop: spacing.md,
  },
});
