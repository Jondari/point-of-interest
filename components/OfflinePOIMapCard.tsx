import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  getLocalizedText,
  OfflinePOI,
  OFFLINE_POI_CATEGORY_CONFIG,
} from '../types/offlinePoi';
import { OfflinePOIGroup } from '../utils/offlinePoiMap';
import { borderRadius, colors, fontSize, fontWeight, spacing } from '../constants/theme';

interface OfflinePOIMapCardProps {
  group: OfflinePOIGroup;
  selectedPOI: OfflinePOI | null;
  onSelectPOI: (poi: OfflinePOI) => void;
  onClose: () => void;
  onOpenDetails: (poi: OfflinePOI) => void;
  onNavigate: (poi: OfflinePOI) => void;
}

export default function OfflinePOIMapCard({
  group,
  selectedPOI,
  onSelectPOI,
  onClose,
  onOpenDetails,
  onNavigate,
}: OfflinePOIMapCardProps) {
  const { t, i18n } = useTranslation();
  const displayedPOI = selectedPOI ?? (group.pois.length === 1 ? group.pois[0] : null);

  if (!displayedPOI) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.groupTitle}>
            {t('directory.sameLocationCount', { count: group.pois.length })}
          </Text>
          <CloseButton onPress={onClose} />
        </View>
        <ScrollView style={styles.groupList} showsVerticalScrollIndicator={false}>
          {group.pois.map((poi) => {
            const config = OFFLINE_POI_CATEGORY_CONFIG[poi.category];
            return (
              <TouchableOpacity
                key={poi.id}
                style={styles.groupRow}
                onPress={() => onSelectPOI(poi)}
                accessibilityRole="button"
                accessibilityLabel={getLocalizedText(poi.name, i18n.language)}
              >
                <Text style={styles.groupEmoji}>{config.emoji}</Text>
                <View style={styles.groupText}>
                  <Text style={styles.groupName}>
                    {getLocalizedText(poi.name, i18n.language)}
                  </Text>
                  <Text style={styles.category}>{t(config.labelKey)}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  const config = OFFLINE_POI_CATEGORY_CONFIG[displayedPOI.category];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.category}>{t(config.labelKey)}</Text>
          <Text style={styles.name}>
            {getLocalizedText(displayedPOI.name, i18n.language)}
          </Text>
        </View>
        <CloseButton onPress={onClose} />
      </View>
      <Text style={styles.address} numberOfLines={2}>
        {getLocalizedText(displayedPOI.address, i18n.language)}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => onOpenDetails(displayedPOI)}
          accessibilityRole="button"
        >
          <Text style={styles.secondaryButtonText}>{t('directory.openDetails')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => onNavigate(displayedPOI)}
          accessibilityRole="button"
        >
          <Text style={styles.primaryButtonText}>{t('poi.navigate')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CloseButton({ onPress }: { onPress: () => void }) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={styles.closeButton}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t('common.close')}
    >
      <Text style={styles.closeText}>✕</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 310,
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  titleBlock: {
    flex: 1,
  },
  category: {
    color: '#147D64',
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
  },
  name: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginTop: spacing.xs,
  },
  address: {
    color: colors.textLight,
    fontSize: fontSize.sm,
    lineHeight: 20,
    marginTop: spacing.sm,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
  },
  closeText: {
    color: colors.textLight,
    fontSize: fontSize.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  primaryButton: {
    flex: 1,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    textAlign: 'center',
  },
  groupTitle: {
    flex: 1,
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  groupList: {
    marginTop: spacing.sm,
  },
  groupRow: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.surface,
    gap: spacing.sm,
  },
  groupEmoji: {
    fontSize: 22,
  },
  groupText: {
    flex: 1,
  },
  groupName: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  chevron: {
    color: colors.textLight,
    fontSize: 26,
  },
});
