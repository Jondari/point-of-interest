import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  getLocalizedText,
  OfflinePOI,
  OFFLINE_POI_CATEGORY_CONFIG,
} from '../types/offlinePoi';
import { borderRadius, colors, fontSize, fontWeight, spacing } from '../constants/theme';

interface OfflinePOICardProps {
  poi: OfflinePOI;
  onPress: (poi: OfflinePOI) => void;
}

export default function OfflinePOICard({ poi, onPress }: OfflinePOICardProps) {
  const { t, i18n } = useTranslation();
  const category = OFFLINE_POI_CATEGORY_CONFIG[poi.category];
  const name = getLocalizedText(poi.name, i18n.language);
  const description = getLocalizedText(poi.description, i18n.language);
  const address = getLocalizedText(poi.address, i18n.language);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(poi)}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${t(category.labelKey)}, ${address}`}
      accessibilityHint={t('directory.openDetails')}
    >
      {poi.image ? (
        <Image
          source={poi.image}
          style={styles.image}
          resizeMode="cover"
          accessibilityLabel={
            poi.imageAlt ? getLocalizedText(poi.imageAlt, i18n.language) : name
          }
        />
      ) : (
        <View style={styles.imageFallback} accessible={false}>
          <Text style={styles.fallbackEmoji}>{category.emoji}</Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.categoryRow}>
          <Text style={styles.categoryEmoji} accessible={false}>
            {category.emoji}
          </Text>
          <Text style={styles.category}>{t(category.labelKey)}</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        {poi.localName && poi.localName !== name && (
          <Text style={styles.localName} numberOfLines={1}>
            {poi.localName}
          </Text>
        )}
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
        <Text style={styles.address} numberOfLines={2}>
          {address}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
  },
  imageFallback: {
    width: '100%',
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  fallbackEmoji: {
    fontSize: 48,
  },
  content: {
    padding: spacing.md,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  categoryEmoji: {
    fontSize: fontSize.sm,
  },
  category: {
    color: colors.primary,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    textTransform: 'uppercase',
  },
  name: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  localName: {
    color: colors.textLight,
    fontSize: fontSize.md,
    marginTop: 2,
  },
  description: {
    color: colors.textLight,
    fontSize: fontSize.sm,
    lineHeight: 20,
    marginTop: spacing.sm,
  },
  address: {
    color: colors.text,
    fontSize: fontSize.sm,
    marginTop: spacing.sm,
  },
});
