import { useMemo, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import OfflinePOICard from '../../../components/OfflinePOICard';
import {
  getOfflineCities,
  searchOfflinePOIs,
} from '../../../services/offlinePoiService';
import {
  getLocalizedText,
  OfflineCityId,
  OfflinePOI,
  OfflinePOICategory,
  OFFLINE_POI_CATEGORY_CONFIG,
} from '../../../types/offlinePoi';
import { borderRadius, colors, fontSize, fontWeight, spacing } from '../../../constants/theme';

type CategoryFilter = OfflinePOICategory | 'all';

const CATEGORIES: CategoryFilter[] = [
  'all',
  'landmark',
  'museum',
  'park',
  'religious',
  'historic',
];

export default function OfflineDirectoryScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [cityId, setCityId] = useState<OfflineCityId>('paris');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const cities = getOfflineCities();

  const pois = useMemo(
    () =>
      searchOfflinePOIs(
        cityId,
        query,
        category === 'all' ? undefined : category
      ),
    [cityId, query, category]
  );

  const handleCityChange = (nextCityId: OfflineCityId) => {
    setCityId(nextCityId);
    setQuery('');
    setCategory('all');
  };

  const handlePOIPress = (poi: OfflinePOI) => {
    router.push({
      pathname: '/(app)/directory/[poiId]',
      params: { poiId: poi.id },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace('/(app)')}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel={t('directory.backHome')}
        >
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.title}>{t('directory.title')}</Text>
          <Text style={styles.offlineBadge}>{t('directory.offlineBadge')}</Text>
        </View>
      </View>

      <View style={styles.filters}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cityList}
        >
          {cities.map((city) => {
            const isSelected = city.id === cityId;
            const cityName = getLocalizedText(city.name, i18n.language);
            return (
              <TouchableOpacity
                key={city.id}
                style={[styles.cityChip, isSelected && styles.cityChipSelected]}
                onPress={() => handleCityChange(city.id)}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={`${cityName}, ${city.localName}`}
              >
                <Text style={[styles.cityText, isSelected && styles.cityTextSelected]}>
                  {cityName} · {city.localName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder={t('directory.searchPlaceholder')}
          placeholderTextColor={colors.textLight}
          returnKeyType="search"
          clearButtonMode="while-editing"
          accessibilityLabel={t('directory.searchPlaceholder')}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {CATEGORIES.map((item) => {
            const isSelected = item === category;
            const label =
              item === 'all'
                ? t('directory.categories.all')
                : t(OFFLINE_POI_CATEGORY_CONFIG[item].labelKey);
            return (
              <TouchableOpacity
                key={item}
                style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
                onPress={() => setCategory(item)}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextSelected,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={pois}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OfflinePOICard poi={item} onPress={handlePOIPress} />
        )}
        contentContainerStyle={styles.results}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <Text style={styles.resultCount} accessibilityLiveRegion="polite">
            {t('directory.resultCount', { count: pois.length })}
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji} accessible={false}>🔎</Text>
            <Text style={styles.emptyTitle}>{t('directory.noResultsTitle')}</Text>
            <Text style={styles.emptyText}>{t('directory.noResults')}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  backButtonText: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 34,
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  offlineBadge: {
    color: '#147D64',
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    marginTop: 2,
  },
  filters: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  cityList: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  cityChip: {
    minHeight: 44,
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
  },
  cityChipSelected: {
    backgroundColor: colors.text,
  },
  cityText: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  cityTextSelected: {
    color: colors.white,
  },
  searchInput: {
    minHeight: 48,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: fontSize.md,
    paddingHorizontal: spacing.md,
  },
  categoryList: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  categoryChip: {
    minHeight: 40,
    justifyContent: 'center',
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: '#D6DADB',
    paddingHorizontal: spacing.md,
  },
  categoryChipSelected: {
    borderColor: colors.text,
    backgroundColor: colors.text,
  },
  categoryText: {
    color: colors.text,
    fontSize: fontSize.sm,
  },
  categoryTextSelected: {
    color: colors.white,
    fontWeight: fontWeight.semibold,
  },
  results: {
    flexGrow: 1,
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  resultCount: {
    color: colors.textLight,
    fontSize: fontSize.sm,
    marginBottom: spacing.sm,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  emptyEmoji: {
    fontSize: 40,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginTop: spacing.md,
  },
  emptyText: {
    color: colors.textLight,
    fontSize: fontSize.sm,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
