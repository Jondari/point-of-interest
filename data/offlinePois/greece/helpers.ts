import type {
  LocalizedText,
  OfflineCityId,
  OfflinePOI,
  OfflinePOICategory,
} from '../../../types/offlinePoi';

export interface GreekPOISeed {
  id: string;
  cityId: Extract<OfflineCityId, 'athens'>;
  category: OfflinePOICategory;
  image: OfflinePOI['image'];
  imageCredit: string;
  name: LocalizedText;
  localName?: string;
  transliteration?: string;
  address: LocalizedText;
  localAddress?: string;
  description: LocalizedText;
  highlights: LocalizedText[];
  suggestedDurationMinutes: number;
  latitude: number;
  longitude: number;
  website?: string;
  sourceUrl: string;
}

export function createGreekPOI(seed: GreekPOISeed): OfflinePOI {
  return {
    ...seed,
    imageAlt: {
      fr: 'Vue de ' + seed.name.fr,
      en: 'View of ' + seed.name.en,
    },
    practicalInfo: [
      {
        fr: 'Vérifier les horaires, les restrictions d’accès et les réservations avant la visite.',
        en: 'Check opening hours, access restrictions and booking requirements before visiting.',
      },
      {
        fr: 'Prévoir de l’eau, une protection solaire et des chaussures adaptées aux sols irréguliers.',
        en: 'Bring water, sun protection and footwear suitable for uneven surfaces.',
      },
    ],
    openingHours: {
      fr: 'Horaires variables selon la saison ; consulter la source officielle.',
      en: 'Opening hours vary by season; check the official source.',
    },
    accessibility: {
      fr: 'Les conditions d’accessibilité varient selon les vestiges et les dénivelés ; vérifier avant la visite.',
      en: 'Accessibility varies due to ruins and gradients; check before visiting.',
    },
    lastUpdated: '2026-07-13',
  };
}
