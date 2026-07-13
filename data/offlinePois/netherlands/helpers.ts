import type {
  LocalizedText,
  OfflineCityId,
  OfflinePOI,
  OfflinePOICategory,
} from '../../../types/offlinePoi';

export interface DutchPOISeed {
  id: string;
  cityId: Extract<OfflineCityId, 'amsterdam'>;
  category: OfflinePOICategory;
  image: OfflinePOI['image'];
  imageCredit: string;
  name: LocalizedText;
  address: LocalizedText;
  description: LocalizedText;
  highlights: LocalizedText[];
  suggestedDurationMinutes: number;
  latitude: number;
  longitude: number;
  website?: string;
  sourceUrl: string;
}

export function createDutchPOI(seed: DutchPOISeed): OfflinePOI {
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
        fr: 'Adresse copiable pour préparer le trajet dans une application de navigation.',
        en: 'Copyable address for planning the route in a navigation app.',
      },
    ],
    openingHours: {
      fr: 'Horaires variables selon la saison ; consulter la source officielle.',
      en: 'Opening hours vary by season; check the official source.',
    },
    accessibility: {
      fr: 'Les conditions d’accessibilité varient selon les espaces ; vérifier avant la visite.',
      en: 'Accessibility varies between areas; check before visiting.',
    },
    lastUpdated: '2026-07-13',
  };
}
