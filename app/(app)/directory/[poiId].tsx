import { useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as Clipboard from 'expo-clipboard';
import { getOfflinePOI } from '../../../services/offlinePoiService';
import {
  getLocalizedText,
  OFFLINE_POI_CATEGORY_CONFIG,
} from '../../../types/offlinePoi';
import { borderRadius, colors, fontSize, fontWeight, spacing } from '../../../constants/theme';

export default function OfflinePOIDetailScreen() {
  const router = useRouter();
  const { poiId } = useLocalSearchParams<{ poiId?: string | string[] }>();
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = Array.isArray(poiId) ? poiId[0] : poiId;
  const poi = id ? getOfflinePOI(id) : undefined;

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
    };
  }, []);

  if (!poi) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>{t('directory.notFound')}</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.back()}>
            <Text style={styles.primaryButtonText}>{t('directory.back')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const category = OFFLINE_POI_CATEGORY_CONFIG[poi.category];
  const name = getLocalizedText(poi.name, i18n.language);
  const address = getLocalizedText(poi.address, i18n.language);
  const description = getLocalizedText(poi.description, i18n.language);

  const copyAddress = async () => {
    const addressToCopy = poi.localAddress
      ? `${address}\n${poi.localAddress}`
      : address;
    await Clipboard.setStringAsync(addressToCopy);
    setCopied(true);
    AccessibilityInfo.announceForAccessibility(t('directory.addressCopied'));
    if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
    copiedTimeoutRef.current = setTimeout(() => setCopied(false), 2500);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel={t('directory.back')}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>
        </View>

        {poi.image ? (
          <Image
            source={poi.image}
            style={styles.heroImage}
            resizeMode="cover"
            accessibilityLabel={
              poi.imageAlt ? getLocalizedText(poi.imageAlt, i18n.language) : name
            }
          />
        ) : (
          <View style={styles.heroFallback} accessible={false}>
            <Text style={styles.heroEmoji}>{category.emoji}</Text>
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.category}>{t(category.labelKey)}</Text>
          <Text style={styles.name}>{name}</Text>
          {poi.localName && (
            <Text style={styles.localName}>
              {poi.localName}
              {poi.transliteration ? ` · ${poi.transliteration}` : ''}
            </Text>
          )}

          <View style={styles.addressCard}>
            <View style={styles.addressContent}>
              <Text style={styles.sectionLabel}>{t('directory.address')}</Text>
              <Text style={styles.address}>{address}</Text>
              {poi.localAddress && <Text style={styles.localAddress}>{poi.localAddress}</Text>}
            </View>
            <TouchableOpacity
              style={[styles.copyButton, copied && styles.copyButtonSuccess]}
              onPress={copyAddress}
              accessibilityRole="button"
              accessibilityLabel={t('directory.copyAddress')}
            >
              <Text style={styles.copyButtonText}>
                {copied ? t('directory.copied') : t('directory.copy')}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>{description}</Text>

          <DetailSection title={t('directory.highlights')}>
            {poi.highlights.map((highlight, index) => (
              <Bullet key={index} text={getLocalizedText(highlight, i18n.language)} />
            ))}
          </DetailSection>

          {poi.practicalInfo && poi.practicalInfo.length > 0 && (
            <DetailSection title={t('directory.practicalInfo')}>
              {poi.practicalInfo.map((info, index) => (
                <Bullet key={index} text={getLocalizedText(info, i18n.language)} />
              ))}
            </DetailSection>
          )}

          <View style={styles.factGrid}>
            {poi.openingHours && (
              <Fact
                label={t('directory.openingHours')}
                value={getLocalizedText(poi.openingHours, i18n.language)}
              />
            )}
            {poi.price && (
              <Fact label={t('directory.price')} value={getLocalizedText(poi.price, i18n.language)} />
            )}
            {poi.accessibility && (
              <Fact
                label={t('directory.accessibility')}
                value={getLocalizedText(poi.accessibility, i18n.language)}
              />
            )}
            {poi.suggestedDurationMinutes && (
              <Fact
                label={t('directory.suggestedDuration')}
                value={t('directory.durationMinutes', {
                  count: poi.suggestedDurationMinutes,
                })}
              />
            )}
          </View>

          {poi.website && (
            <View style={styles.metaSection}>
              <Text style={styles.sectionLabel}>{t('directory.website')}</Text>
              <Text style={styles.website} selectable>{poi.website}</Text>
            </View>
          )}

          <View style={styles.sourceSection}>
            <Text style={styles.sourceText}>
              {t('directory.lastUpdated', { date: poi.lastUpdated })}
            </Text>
            {poi.sourceUrl && (
              <Text style={styles.sourceText} selectable>
                {t('directory.source')}: {poi.sourceUrl}
              </Text>
            )}
            {poi.imageCredit && <Text style={styles.sourceText}>{poi.imageCredit}</Text>}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.fact}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <Text style={styles.factValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingBottom: spacing.xxl,
  },
  header: {
    position: 'absolute',
    zIndex: 2,
    top: spacing.sm,
    left: spacing.md,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.94)',
  },
  backButtonText: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 34,
  },
  heroImage: {
    width: '100%',
    height: 280,
  },
  heroFallback: {
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  heroEmoji: {
    fontSize: 72,
  },
  content: {
    padding: spacing.lg,
  },
  category: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    textTransform: 'uppercase',
  },
  name: {
    color: colors.text,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    marginTop: spacing.xs,
  },
  localName: {
    color: colors.textLight,
    fontSize: fontSize.lg,
    marginTop: spacing.xs,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  addressContent: {
    flex: 1,
  },
  sectionLabel: {
    color: colors.textLight,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
  },
  address: {
    color: colors.text,
    fontSize: fontSize.md,
    lineHeight: 22,
    marginTop: spacing.xs,
  },
  localAddress: {
    color: colors.textLight,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  copyButton: {
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    backgroundColor: colors.text,
    paddingHorizontal: spacing.md,
  },
  copyButtonSuccess: {
    backgroundColor: '#147D64',
  },
  copyButtonText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  description: {
    color: colors.text,
    fontSize: fontSize.md,
    lineHeight: 25,
    marginTop: spacing.lg,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.sm,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  bullet: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  bulletText: {
    flex: 1,
    color: colors.text,
    fontSize: fontSize.md,
    lineHeight: 22,
  },
  factGrid: {
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  fact: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  factValue: {
    color: colors.text,
    fontSize: fontSize.sm,
    lineHeight: 21,
    marginTop: spacing.xs,
  },
  metaSection: {
    marginTop: spacing.xl,
  },
  website: {
    color: colors.text,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  sourceSection: {
    borderTopWidth: 1,
    borderTopColor: colors.surface,
    marginTop: spacing.xl,
    paddingTop: spacing.md,
    gap: spacing.xs,
  },
  sourceText: {
    color: colors.textLight,
    fontSize: fontSize.xs,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  notFoundTitle: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
  },
  primaryButton: {
    minHeight: 48,
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    backgroundColor: colors.text,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
});
