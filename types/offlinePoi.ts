import type { ImageSourcePropType } from 'react-native';

export type OfflineCityId = 'paris' | 'beijing';

export type OfflinePOICategory =
  | 'landmark'
  | 'museum'
  | 'park'
  | 'religious'
  | 'historic';

export interface LocalizedText {
  fr: string;
  en: string;
}

export interface OfflineCity {
  id: OfflineCityId;
  name: LocalizedText;
  localName: string;
  country: LocalizedText;
}

export interface OfflinePOI {
  id: string;
  cityId: OfflineCityId;
  category: OfflinePOICategory;
  image?: ImageSourcePropType;
  imageAlt?: LocalizedText;
  imageCredit?: string;
  name: LocalizedText;
  localName?: string;
  transliteration?: string;
  address: LocalizedText;
  localAddress?: string;
  description: LocalizedText;
  highlights: LocalizedText[];
  practicalInfo?: LocalizedText[];
  openingHours?: LocalizedText;
  price?: LocalizedText;
  accessibility?: LocalizedText;
  suggestedDurationMinutes?: number;
  latitude: number;
  longitude: number;
  phone?: string;
  website?: string;
  sourceUrl?: string;
  lastUpdated: string;
}

export const OFFLINE_POI_CATEGORY_CONFIG: Record<
  OfflinePOICategory,
  { emoji: string; labelKey: string }
> = {
  landmark: { emoji: '🏛️', labelKey: 'directory.categories.landmark' },
  museum: { emoji: '🖼️', labelKey: 'directory.categories.museum' },
  park: { emoji: '🌳', labelKey: 'directory.categories.park' },
  religious: { emoji: '⛩️', labelKey: 'directory.categories.religious' },
  historic: { emoji: '🏯', labelKey: 'directory.categories.historic' },
};

export function getLocalizedText(text: LocalizedText, language: string): string {
  return language.startsWith('en') ? text.en : text.fr;
}
