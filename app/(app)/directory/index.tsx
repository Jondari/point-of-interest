import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import OfflineCountryCard from '../../../components/OfflineCountryCard';
import {
  getOfflineCities,
  getOfflineCountries,
} from '../../../services/offlinePoiService';
import { OfflineCountry } from '../../../types/offlinePoi';
import { borderRadius, colors, fontSize, fontWeight, spacing } from '../../../constants/theme';

export default function OfflineDirectoryScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const countries = getOfflineCountries();

  const handleCountryPress = (country: OfflineCountry) => {
    router.push({
      pathname: '/(app)/directory/country/[countryId]',
      params: { countryId: country.id },
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

      <Text style={styles.instructions}>{t('directory.selectCountry')}</Text>

      <FlatList
        data={countries}
        keyExtractor={(country) => country.id}
        renderItem={({ item }) => (
          <OfflineCountryCard
            country={item}
            destinationCount={getOfflineCities(item.id).length}
            onPress={handleCountryPress}
          />
        )}
        contentContainerStyle={styles.countryList}
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
  instructions: {
    color: colors.textLight,
    fontSize: fontSize.md,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  countryList: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
});
