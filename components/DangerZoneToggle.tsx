import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DangerRenderMode, IndicatorMeta } from '../types/dangerZone';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../constants/theme';

interface DangerZoneToggleProps {
  isVisible: boolean;
  renderMode: DangerRenderMode;
  onToggleVisibility: () => void;
  onToggleMode: () => void;
  showQPV: boolean;
  showQRR: boolean;
  onToggleQPV: () => void;
  onToggleQRR: () => void;
  selectedIndicator: string;
  availableIndicators: IndicatorMeta[];
  onSelectIndicator: (id: string) => void;
}

export default function DangerZoneToggle({
  isVisible,
  renderMode,
  onToggleVisibility,
  onToggleMode,
  showQPV,
  showQRR,
  onToggleQPV,
  onToggleQRR,
  selectedIndicator,
  availableIndicators,
  onSelectIndicator,
}: DangerZoneToggleProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isVisible && styles.buttonActive]}
        onPress={onToggleVisibility}
        accessibilityRole="switch"
        accessibilityLabel={t('dangerZones.toggle')}
        accessibilityState={{ checked: isVisible }}
      >
        <Text style={styles.buttonText}>⚠️</Text>
      </TouchableOpacity>

      {isVisible && (
        <TouchableOpacity
          style={styles.button}
          onPress={onToggleMode}
          accessibilityRole="button"
          accessibilityLabel={t(
            renderMode === 'choropleth'
              ? 'dangerZones.heatmap'
              : 'dangerZones.choropleth'
          )}
        >
          <Text style={styles.modeText}>
            {renderMode === 'choropleth' ? '🗺️' : '🔥'}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.labelButton, showQPV && styles.labelButtonActiveBlue]}
        onPress={onToggleQPV}
        accessibilityRole="switch"
        accessibilityLabel={t('dangerZones.qpvLabel')}
        accessibilityState={{ checked: showQPV }}
      >
        <Text style={[styles.labelText, showQPV && styles.labelTextActive]}>QPV</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.labelButton, showQRR && styles.labelButtonActivePurple]}
        onPress={onToggleQRR}
        accessibilityRole="switch"
        accessibilityLabel={t('dangerZones.qrrLabel')}
        accessibilityState={{ checked: showQRR }}
      >
        <Text style={[styles.labelText, showQRR && styles.labelTextActive]}>QRR</Text>
      </TouchableOpacity>

      {isVisible && (
        <ScrollView
          style={styles.indicatorList}
          contentContainerStyle={styles.indicatorListContent}
          showsVerticalScrollIndicator={false}
        >
          {availableIndicators.map((ind) => (
            <TouchableOpacity
              key={ind.id}
              style={[
                styles.indicatorChip,
                selectedIndicator === ind.id && styles.indicatorChipActive,
              ]}
              onPress={() => onSelectIndicator(ind.id)}
              accessibilityRole="button"
              accessibilityLabel={t(ind.labelKey)}
              accessibilityState={{ selected: selectedIndicator === ind.id }}
            >
              <Text
                style={[
                  styles.indicatorChipText,
                  selectedIndicator === ind.id && styles.indicatorChipTextActive,
                ]}
                numberOfLines={1}
              >
                {t(ind.labelKey)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    alignItems: 'center',
  },
  button: {
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
  buttonActive: {
    backgroundColor: colors.error,
  },
  buttonText: {
    fontSize: 24,
  },
  modeText: {
    fontSize: 20,
  },
  labelButton: {
    width: 48,
    height: 32,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  labelButtonActiveBlue: {
    backgroundColor: '#2196F3',
  },
  labelButtonActivePurple: {
    backgroundColor: '#9C27B0',
  },
  labelText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.textLight,
  },
  labelTextActive: {
    color: colors.white,
  },
  indicatorList: {
    maxHeight: 200,
    width: 120,
  },
  indicatorListContent: {
    gap: 4,
  },
  indicatorChip: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,
    paddingVertical: 4,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  indicatorChipActive: {
    backgroundColor: colors.primary,
  },
  indicatorChipText: {
    fontSize: 10,
    color: colors.textLight,
  },
  indicatorChipTextActive: {
    color: colors.white,
    fontWeight: fontWeight.semibold,
  },
});
