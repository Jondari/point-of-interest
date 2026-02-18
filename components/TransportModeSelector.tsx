import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TransportMode, TRANSPORT_MODE_CONFIG } from '../types/route';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../constants/theme';

interface TransportModeSelectorProps {
  selectedMode: TransportMode;
  onSelectMode: (mode: TransportMode) => void;
  disabled?: boolean;
}

const AVAILABLE_MODES: TransportMode[] = ['walking', 'driving'];

export default function TransportModeSelector({
  selectedMode,
  onSelectMode,
  disabled = false,
}: TransportModeSelectorProps) {
  const { t } = useTranslation();

  return (
    <View style={[styles.container, disabled && styles.disabled]}>
      {AVAILABLE_MODES.map((mode) => {
        const config = TRANSPORT_MODE_CONFIG[mode];
        const isActive = mode === selectedMode;

        return (
          <TouchableOpacity
            key={mode}
            style={[styles.chip, isActive && styles.chipActive]}
            onPress={() => onSelectMode(mode)}
            disabled={disabled}
          >
            <Text style={styles.emoji}>{config.emoji}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {t(config.labelKey)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    gap: spacing.xs,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  emoji: {
    fontSize: fontSize.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  labelActive: {
    color: colors.white,
    fontWeight: fontWeight.semibold,
  },
});
