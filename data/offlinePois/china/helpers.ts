import type {
  LocalizedText,
  OfflineCityId,
  OfflinePOI,
  OfflinePOICategory,
} from '../../../types/offlinePoi';

export interface ChinesePOISeed {
  id: string;
  cityId: Extract<OfflineCityId, 'qingdao' | 'xian' | 'chengdu' | 'shanghai' | 'chongqing'>;
  category: OfflinePOICategory;
  image: OfflinePOI['image'];
  name: LocalizedText;
  localName: string;
  transliteration: string;
  address: LocalizedText;
  localAddress: string;
  description: LocalizedText;
  highlights: LocalizedText[];
  suggestedDurationMinutes: number;
  latitude: number;
  longitude: number;
  website?: string;
  sourceUrl: string;
}

export function createChinesePOI(seed: ChinesePOISeed): OfflinePOI {
  return {
    ...seed,
    imageCredit: 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md',
    imageAlt: {
      fr: `Vue de ${seed.name.fr}`,
      en: `View of ${seed.name.en}`,
    },
    practicalInfo: [
      {
        fr: 'Vérifier les horaires, les fermetures temporaires et les modalités de réservation avant la visite.',
        en: 'Check opening hours, temporary closures and booking requirements before visiting.',
      },
      {
        fr: 'Conserver le nom et l’adresse en chinois pour les transports et les applications locales.',
        en: 'Keep the Chinese name and address handy for transport and local apps.',
      },
    ],
    openingHours: {
      fr: 'Horaires variables ; consulter la source officielle avant le déplacement.',
      en: 'Opening hours vary; check the official source before travelling.',
    },
    accessibility: {
      fr: 'L’accessibilité varie selon les bâtiments, les marches et les dénivelés ; vérifier avant la visite.',
      en: 'Accessibility varies due to buildings, steps and gradients; check before visiting.',
    },
    lastUpdated: '2026-07-13',
  };
}
