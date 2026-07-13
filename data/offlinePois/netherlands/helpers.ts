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
      zh: seed.name.zh + '景观',
    },
    practicalInfo: [
      {
        fr: 'Vérifier les horaires, les restrictions d’accès et les réservations avant la visite.',
        en: 'Check opening hours, access restrictions and booking requirements before visiting.', zh: '参观前请检查开放时间、访问限制和预订要求。',
      },
      {
        fr: 'Adresse copiable pour préparer le trajet dans une application de navigation.',
        en: 'Copyable address for planning the route in a navigation app.', zh: '可复制地址，以便在导航应用中规划路线。',
      },
    ],
    openingHours: {
      fr: 'Horaires variables selon la saison ; consulter la source officielle.',
      en: 'Opening hours vary by season; check the official source.', zh: '开放时间因季节而异；检查官方来源。',
    },
    accessibility: {
      fr: 'Les conditions d’accessibilité varient selon les espaces ; vérifier avant la visite.',
      en: 'Accessibility varies between areas; check before visiting.', zh: '无障碍条件因区域而异，参观前请提前确认。',
    },
    lastUpdated: '2026-07-13',
  };
}
