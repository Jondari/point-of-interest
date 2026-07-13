import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getLocalizedText, OfflineCountry } from '../types/offlinePoi';
import { borderRadius, colors, fontSize, fontWeight, spacing } from '../constants/theme';

interface OfflineCountryCardProps {
  country: OfflineCountry;
  destinationCount: number;
  onPress: (country: OfflineCountry) => void;
}

export default function OfflineCountryCard({
  country,
  destinationCount,
  onPress,
}: OfflineCountryCardProps) {
  const { t, i18n } = useTranslation();
  const countryName = getLocalizedText(country.name, i18n.language);
  const destinationLabel = t('directory.destinationCount', {
    count: destinationCount,
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(country)}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={`${countryName}, ${destinationLabel}`}
      accessibilityHint={t('directory.openCountry')}
    >
      <Text style={styles.flag} accessible={false}>
        {country.flagEmoji}
      </Text>
      <View style={styles.content}>
        <Text style={styles.name}>{countryName}</Text>
        <Text style={styles.count}>{destinationLabel}</Text>
      </View>
      <Text style={styles.chevron} accessible={false}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 112,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  flag: {
    fontSize: 48,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  count: {
    color: colors.textLight,
    fontSize: fontSize.sm,
  },
  chevron: {
    color: colors.primary,
    fontSize: 36,
    lineHeight: 38,
  },
});
