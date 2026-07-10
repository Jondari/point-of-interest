import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { POI, POI_CATEGORY_CONFIG } from '../types/poi';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../constants/theme';

interface POICardProps {
  poi: POI;
  onClose: () => void;
  onNavigate?: (poi: POI) => void;
}

export default function POICard({ poi, onClose, onNavigate }: POICardProps) {
  const { t } = useTranslation();
  const config = POI_CATEGORY_CONFIG[poi.category];

  const handleWebsite = () => {
    if (poi.website) {
      Linking.openURL(poi.website);
    }
  };

  const handlePhone = () => {
    if (poi.phone) {
      Linking.openURL(`tel:${poi.phone}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={[styles.categoryBadge, { backgroundColor: config.color }]}>
            <Text style={styles.categoryEmoji}>{config.emoji}</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.name} numberOfLines={2}>
              {poi.name}
            </Text>
            <Text style={styles.category}>{t(config.labelKey)}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={t('common.close')}
        >
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      {poi.address && (
        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>📍</Text>
          <Text style={styles.infoText}>{poi.address}</Text>
        </View>
      )}

      {poi.openingHours && (
        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>🕐</Text>
          <Text style={styles.infoText}>{poi.openingHours}</Text>
        </View>
      )}

      {poi.phone && (
        <TouchableOpacity
          style={styles.infoRow}
          onPress={handlePhone}
          accessibilityRole="link"
          accessibilityLabel={`${t('poi.call')} ${poi.phone}`}
        >
          <Text style={styles.infoIcon}>📞</Text>
          <Text style={[styles.infoText, styles.link]}>{poi.phone}</Text>
        </TouchableOpacity>
      )}

      {poi.website && (
        <TouchableOpacity
          style={styles.infoRow}
          onPress={handleWebsite}
          accessibilityRole="link"
          accessibilityLabel={t('poi.openWebsite')}
        >
          <Text style={styles.infoIcon}>🌐</Text>
          <Text style={[styles.infoText, styles.link]} numberOfLines={1}>
            {poi.website}
          </Text>
        </TouchableOpacity>
      )}

      {onNavigate && (
        <TouchableOpacity
          style={styles.navigateButton}
          onPress={() => onNavigate(poi)}
          accessibilityRole="button"
          accessibilityLabel={t('poi.navigate')}
        >
          <Text style={styles.navigateButtonText}>{t('poi.navigate')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  category: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  closeButton: {
    padding: spacing.xs,
  },
  closeText: {
    fontSize: fontSize.lg,
    color: colors.textLight,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  infoIcon: {
    fontSize: fontSize.md,
    marginRight: spacing.sm,
    width: 24,
  },
  infoText: {
    fontSize: fontSize.sm,
    color: colors.text,
    flex: 1,
  },
  link: {
    color: colors.primary,
  },
  navigateButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  navigateButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
});
