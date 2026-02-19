import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DangerRenderMode } from '../types/dangerZone';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../constants/theme';

interface DangerZoneToggleProps {
  isVisible: boolean;
  renderMode: DangerRenderMode;
  onToggleVisibility: () => void;
  onToggleMode: () => void;
}

export default function DangerZoneToggle({
  isVisible,
  renderMode,
  onToggleVisibility,
  onToggleMode,
}: DangerZoneToggleProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isVisible && styles.buttonActive]}
        onPress={onToggleVisibility}
      >
        <Text style={styles.buttonText}>⚠️</Text>
      </TouchableOpacity>

      {isVisible && (
        <TouchableOpacity style={styles.button} onPress={onToggleMode}>
          <Text style={styles.modeText}>
            {renderMode === 'choropleth' ? '🗺️' : '🔥'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
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
});
