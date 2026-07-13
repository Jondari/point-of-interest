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
      zh: seed.name.zh + '景观',
    },
    practicalInfo: [
      {
        fr: 'Vérifier les horaires, les restrictions d’accès et les réservations avant la visite.',
        en: 'Check opening hours, access restrictions and booking requirements before visiting.', zh: '参观前请检查开放时间、访问限制和预订要求。',
      },
      {
        fr: 'Prévoir de l’eau, une protection solaire et des chaussures adaptées aux sols irréguliers.',
        en: 'Bring water, sun protection and footwear suitable for uneven surfaces.', zh: '带上水、防晒霜和适合不平坦表面的鞋子。',
      },
    ],
    openingHours: {
      fr: 'Horaires variables selon la saison ; consulter la source officielle.',
      en: 'Opening hours vary by season; check the official source.', zh: '开放时间因季节而异；检查官方来源。',
    },
    accessibility: {
      fr: 'Les conditions d’accessibilité varient selon les vestiges et les dénivelés ; vérifier avant la visite.',
      en: 'Accessibility varies due to ruins and gradients; check before visiting.', zh: '无障碍条件因遗址和坡度而异，参观前请提前确认。',
    },
    lastUpdated: '2026-07-13',
  };
}
