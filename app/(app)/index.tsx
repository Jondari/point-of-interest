import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import LanguageSelector from '../../components/LanguageSelector';
import { borderRadius, colors, fontSize, fontWeight, spacing } from '../../constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerActions}>
          <LanguageSelector />
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.headerButton}
            accessibilityRole="button"
          >
            <Text style={styles.headerButtonText}>{t('map.logout')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.intro}>
          <Text style={styles.eyebrow}>{t('home.eyebrow')}</Text>
          <Text style={styles.title}>{t('home.title')}</Text>
          <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
        </View>

        <View style={styles.modeList}>
          <ModeCard
            emoji="📚"
            title={t('home.directoryTitle')}
            description={t('home.directoryDescription')}
            action={t('home.openDirectory')}
            badge={t('home.offlineBadge')}
            onPress={() => router.push('/(app)/directory')}
          />
          <ModeCard
            emoji="🗺️"
            title={t('home.mapTitle')}
            description={t('home.mapDescription')}
            action={t('home.openMap')}
            onPress={() => router.push('/(app)/map')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ModeCard({
  emoji,
  title,
  description,
  action,
  badge,
  onPress,
}: {
  emoji: string;
  title: string;
  description: string;
  action: string;
  badge?: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.modeCard}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${description}`}
    >
      <View style={styles.modeTopRow}>
        <View style={styles.modeIcon} accessible={false}>
          <Text style={styles.modeEmoji}>{emoji}</Text>
        </View>
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <Text style={styles.modeTitle}>{title}</Text>
      <Text style={styles.modeDescription}>{description}</Text>
      <Text style={styles.modeAction}>{action} →</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  headerButton: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  headerButtonText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  intro: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
  },
  subtitle: {
    color: colors.textLight,
    fontSize: fontSize.lg,
    lineHeight: 26,
    marginTop: spacing.sm,
  },
  modeList: {
    gap: spacing.lg,
  },
  modeCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    minHeight: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  modeTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  modeIcon: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  modeEmoji: {
    fontSize: 32,
  },
  badge: {
    backgroundColor: '#E8F8F5',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeText: {
    color: '#147D64',
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
  },
  modeTitle: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginTop: spacing.lg,
  },
  modeDescription: {
    color: colors.textLight,
    fontSize: fontSize.md,
    lineHeight: 23,
    marginTop: spacing.sm,
  },
  modeAction: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginTop: spacing.lg,
  },
});
