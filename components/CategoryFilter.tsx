import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { POICategory, POI_CATEGORY_CONFIG } from '../types/poi';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../constants/theme';

interface CategoryFilterProps {
  selectedCategories: POICategory[];
  onToggleCategory: (category: POICategory) => void;
}

const CATEGORIES: POICategory[] = ['monument', 'museum', 'park', 'restaurant'];

export default function CategoryFilter({
  selectedCategories,
  onToggleCategory,
}: CategoryFilterProps) {
  const { t } = useTranslation();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map(category => {
        const config = POI_CATEGORY_CONFIG[category];
        const isSelected = selectedCategories.includes(category);

        return (
          <TouchableOpacity
            key={category}
            style={[
              styles.chip,
              isSelected && { backgroundColor: config.color },
            ]}
            onPress={() => onToggleCategory(category)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={t(config.labelKey)}
            accessibilityState={{ selected: isSelected }}
          >
            <Text style={styles.emoji}>{config.emoji}</Text>
            <Text
              style={[
                styles.label,
                isSelected && styles.labelSelected,
              ]}
            >
              {t(config.labelKey)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emoji: {
    fontSize: fontSize.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    color: colors.text,
  },
  labelSelected: {
    color: colors.white,
  },
});
