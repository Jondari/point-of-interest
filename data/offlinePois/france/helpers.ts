import type {
  LocalizedText,
  OfflineCityId,
  OfflinePOI,
  OfflinePOICategory,
} from '../../../types/offlinePoi';

export interface FrenchPOISeed {
  id: string;
  cityId: Extract<OfflineCityId, 'lyon' | 'toulouse' | 'marseille' | 'cannes' | 'nice'>;
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

export function createFrenchPOI(seed: FrenchPOISeed): OfflinePOI {
  return {
    ...seed,
    imageAlt: {
      fr: 'Vue de ' + seed.name.fr,
      en: 'View of ' + seed.name.en,
    },
    practicalInfo: [
      {
        fr: 'Vérifier les horaires et les éventuelles réservations avant la visite.',
        en: 'Check opening hours and any booking requirements before visiting.',
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
