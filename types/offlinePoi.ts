import type { ImageSourcePropType } from 'react-native';

export const OFFLINE_COUNTRY_IDS = [
  'france',
  'china',
  'spain',
  'italy',
  'netherlands',
  'germany',
  'greece',
] as const;

export type OfflineCountryId = typeof OFFLINE_COUNTRY_IDS[number];

export const OFFLINE_CITY_IDS = [
  'paris',
  'lyon',
  'toulouse',
  'marseille',
  'cannes',
  'nice',
  'beijing',
  'madrid',
  'barcelona',
  'bilbao',
  'canary-islands',
  'rome',
  'florence',
  'venice',
  'naples',
  'amsterdam',
  'berlin',
  'frankfurt',
  'athens',
  'qingdao',
  'xian',
  'chengdu',
  'shanghai',
  'chongqing',
] as const;

export type OfflineCityId = typeof OFFLINE_CITY_IDS[number];

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

export interface OfflineCountry {
  id: OfflineCountryId;
  name: LocalizedText;
  flagEmoji: string;
}

export interface OfflineCity {
  id: OfflineCityId;
  countryId: OfflineCountryId;
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

export function isOfflineCountryId(value: string): value is OfflineCountryId {
  return (OFFLINE_COUNTRY_IDS as readonly string[]).includes(value);
}

export function isOfflineCityId(value: string): value is OfflineCityId {
  return (OFFLINE_CITY_IDS as readonly string[]).includes(value);
}
