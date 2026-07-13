import type { OfflinePOI } from '../../../types/offlinePoi';
import { createSpanishPOI, type SpanishPOISeed } from './helpers';

const SOURCE = 'https://www.hellocanaryislands.com/';
const CREDIT = 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md';

const seeds: SpanishPOISeed[] = [
  {
    id: 'canary-islands-teide', cityId: 'canary-islands', category: 'park', image: require('../../../assets/offline-pois/canary-islands/teide.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc national du Teide — Tenerife', en: 'Teide National Park — Tenerife' }, address: { fr: 'Parque Nacional del Teide, 38300 La Orotava, Tenerife, Espagne', en: 'Teide National Park, 38300 La Orotava, Tenerife, Spain' },
    description: { fr: 'Paysage volcanique dominé par le Teide, plus haut sommet d’Espagne, avec caldeira, coulées de lave et formations rocheuses.', en: 'A volcanic landscape dominated by Mount Teide, Spain’s highest peak, with a caldera, lava flows and rock formations.' },
    highlights: [{ fr: 'Pico del Teide', en: 'Mount Teide' }, { fr: 'Roques de García', en: 'Roques de García' }], suggestedDurationMinutes: 300, latitude: 28.2724, longitude: -16.6425, website: 'https://www.reservasparquesnacionales.es/real/ParquesNac/index.aspx', sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-timanfaya', cityId: 'canary-islands', category: 'park', image: require('../../../assets/offline-pois/canary-islands/timanfaya.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc national de Timanfaya — Lanzarote', en: 'Timanfaya National Park — Lanzarote' }, address: { fr: 'Carretera de las Montañas del Fuego, 35560 Tinajo, Lanzarote, Espagne', en: 'Carretera de las Montañas del Fuego, 35560 Tinajo, Lanzarote, Spain' },
    description: { fr: 'Étendue volcanique née des éruptions du XVIIIe siècle, parcourue de cratères, champs de lave et anomalies géothermiques.', en: 'A volcanic expanse formed by 18th-century eruptions, with craters, lava fields and geothermal activity.' },
    highlights: [{ fr: 'Montañas del Fuego', en: 'Montañas del Fuego' }, { fr: 'Démonstrations géothermiques', en: 'Geothermal demonstrations' }], suggestedDurationMinutes: 180, latitude: 29.005, longitude: -13.7537, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-maspalomas', cityId: 'canary-islands', category: 'park', image: require('../../../assets/offline-pois/canary-islands/maspalomas.webp'), imageCredit: CREDIT,
    name: { fr: 'Dunes de Maspalomas — Grande Canarie', en: 'Maspalomas Dunes — Gran Canaria' }, address: { fr: 'Reserva Natural Especial de las Dunas de Maspalomas, 35100 San Bartolomé de Tirajana, Grande Canarie, Espagne', en: 'Maspalomas Dunes Special Nature Reserve, 35100 San Bartolomé de Tirajana, Gran Canaria, Spain' },
    description: { fr: 'Réserve littorale réunissant dunes mobiles, palmeraie, lagune et plage au sud de Grande Canarie.', en: 'A coastal reserve combining shifting dunes, a palm grove, lagoon and beach in southern Gran Canaria.' },
    highlights: [{ fr: 'Champ de dunes', en: 'Dune field' }, { fr: 'Lagune de la Charca', en: 'La Charca lagoon' }], suggestedDurationMinutes: 150, latitude: 27.7415, longitude: -15.5851, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-garajonay', cityId: 'canary-islands', category: 'park', image: require('../../../assets/offline-pois/canary-islands/garajonay.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc national de Garajonay — La Gomera', en: 'Garajonay National Park — La Gomera' }, address: { fr: 'GM-2, 38830 Agulo, La Gomera, Espagne', en: 'GM-2, 38830 Agulo, La Gomera, Spain' },
    description: { fr: 'Parc montagneux protégeant une forêt humide de lauriers, vestige des forêts subtropicales anciennes de Macaronésie.', en: 'A mountain park protecting humid laurel forest, a remnant of Macaronesia’s ancient subtropical forests.' },
    highlights: [{ fr: 'Forêt de laurisylve', en: 'Laurel forest' }, { fr: 'Sentiers brumeux', en: 'Misty trails' }], suggestedDurationMinutes: 240, latitude: 28.1263, longitude: -17.2372, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-caldera-taburiente', cityId: 'canary-islands', category: 'park', image: require('../../../assets/offline-pois/canary-islands/caldera-taburiente.webp'), imageCredit: CREDIT,
    name: { fr: 'Caldera de Taburiente — La Palma', en: 'Caldera de Taburiente — La Palma' }, address: { fr: 'Parque Nacional de la Caldera de Taburiente, 38758 El Paso, La Palma, Espagne', en: 'Caldera de Taburiente National Park, 38758 El Paso, La Palma, Spain' },
    description: { fr: 'Immense dépression volcanique entaillée de ravins, couverte de pins canariens et parcourue de sentiers exigeants.', en: 'A vast volcanic depression cut by ravines, covered with Canary Island pines and crossed by demanding trails.' },
    highlights: [{ fr: 'Belvédère de La Cumbrecita', en: 'La Cumbrecita viewpoint' }, { fr: 'Cascada de Colores', en: 'Cascada de Colores' }], suggestedDurationMinutes: 300, latitude: 28.729, longitude: -17.869, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-jameos-agua', cityId: 'canary-islands', category: 'landmark', image: require('../../../assets/offline-pois/canary-islands/jameos-agua.webp'), imageCredit: CREDIT,
    name: { fr: 'Jameos del Agua — Lanzarote', en: 'Jameos del Agua — Lanzarote' }, address: { fr: 'Carretera Arrecife-Orzola, 35542 Haría, Lanzarote, Espagne', en: 'Carretera Arrecife-Orzola, 35542 Haría, Lanzarote, Spain' },
    description: { fr: 'Centre artistique de César Manrique intégré à un tunnel volcanique, avec lac souterrain, jardins et auditorium.', en: 'César Manrique’s arts centre integrated into a volcanic tunnel, with an underground lake, gardens and auditorium.' },
    highlights: [{ fr: 'Lac volcanique souterrain', en: 'Underground volcanic lake' }, { fr: 'Intervention de César Manrique', en: 'César Manrique design' }], suggestedDurationMinutes: 120, latitude: 29.1579, longitude: -13.4327, website: 'https://cactlanzarote.com/en/centre/jameos-del-agua/', sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-cueva-verdes', cityId: 'canary-islands', category: 'historic', image: require('../../../assets/offline-pois/canary-islands/cueva-verdes.webp'), imageCredit: CREDIT,
    name: { fr: 'Cueva de los Verdes — Lanzarote', en: 'Cueva de los Verdes — Lanzarote' }, address: { fr: 'LZ-204, 35542 Haría, Lanzarote, Espagne', en: 'LZ-204, 35542 Haría, Lanzarote, Spain' },
    description: { fr: 'Section aménagée d’un long tunnel de lave formé par le volcan de La Corona, visitable avec un guide.', en: 'An accessible section of a long lava tube formed by La Corona volcano and visited with a guide.' },
    highlights: [{ fr: 'Galeries de lave', en: 'Lava galleries' }, { fr: 'Jeux de lumière et surprise optique', en: 'Lighting and optical surprise' }], suggestedDurationMinutes: 75, latitude: 29.1612, longitude: -13.438, website: 'https://cactlanzarote.com/en/centre/cueva-de-los-verdes/', sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-roque-nublo', cityId: 'canary-islands', category: 'park', image: require('../../../assets/offline-pois/canary-islands/roque-nublo.webp'), imageCredit: CREDIT,
    name: { fr: 'Roque Nublo — Grande Canarie', en: 'Roque Nublo — Gran Canaria' }, address: { fr: 'GC-600, 35369 Tejeda, Grande Canarie, Espagne', en: 'GC-600, 35369 Tejeda, Gran Canaria, Spain' },
    description: { fr: 'Monolithe volcanique emblématique du centre montagneux de Grande Canarie, accessible par un sentier panoramique.', en: 'An emblematic volcanic monolith in mountainous central Gran Canaria, reached by a panoramic trail.' },
    highlights: [{ fr: 'Monolithe volcanique', en: 'Volcanic monolith' }, { fr: 'Vues sur les sommets', en: 'Mountain views' }], suggestedDurationMinutes: 150, latitude: 27.9707, longitude: -15.6127, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-vegueta', cityId: 'canary-islands', category: 'historic', image: require('../../../assets/offline-pois/canary-islands/vegueta.webp'), imageCredit: CREDIT,
    name: { fr: 'Vegueta — Las Palmas de Grande Canarie', en: 'Vegueta — Las Palmas de Gran Canaria' }, address: { fr: 'Plaza de Santa Ana, 35001 Las Palmas de Grande Canarie, Espagne', en: 'Plaza de Santa Ana, 35001 Las Palmas de Gran Canaria, Spain' },
    description: { fr: 'Quartier fondateur de Las Palmas, regroupant cathédrale, maisons historiques, places pavées et musées.', en: 'The founding district of Las Palmas, bringing together the cathedral, historic houses, paved squares and museums.' },
    highlights: [{ fr: 'Place et cathédrale Santa Ana', en: 'Santa Ana square and cathedral' }, { fr: 'Casa de Colón', en: 'Casa de Colón' }], suggestedDurationMinutes: 150, latitude: 28.1006, longitude: -15.4155, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-las-canteras', cityId: 'canary-islands', category: 'park', image: require('../../../assets/offline-pois/canary-islands/las-canteras.webp'), imageCredit: CREDIT,
    name: { fr: 'Plage de Las Canteras — Grande Canarie', en: 'Las Canteras Beach — Gran Canaria' }, address: { fr: 'Paseo de Las Canteras, 35010 Las Palmas de Grande Canarie, Espagne', en: 'Paseo de Las Canteras, 35010 Las Palmas de Gran Canaria, Spain' },
    description: { fr: 'Longue plage urbaine protégée en partie par une barrière rocheuse naturelle appelée La Barra.', en: 'A long urban beach partly sheltered by a natural offshore reef known as La Barra.' },
    highlights: [{ fr: 'Récif de La Barra', en: 'La Barra reef' }, { fr: 'Promenade littorale', en: 'Seafront promenade' }], suggestedDurationMinutes: 150, latitude: 28.1397, longitude: -15.435, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-corralejo', cityId: 'canary-islands', category: 'park', image: require('../../../assets/offline-pois/canary-islands/corralejo.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc naturel de Corralejo — Fuerteventura', en: 'Corralejo Natural Park — Fuerteventura' }, address: { fr: 'FV-1a, 35660 La Oliva, Fuerteventura, Espagne', en: 'FV-1a, 35660 La Oliva, Fuerteventura, Spain' },
    description: { fr: 'Vaste ensemble de dunes claires et de plages face aux îles de Lobos et Lanzarote, au nord de Fuerteventura.', en: 'A broad expanse of pale dunes and beaches facing Lobos and Lanzarote in northern Fuerteventura.' },
    highlights: [{ fr: 'Dunes côtières', en: 'Coastal dunes' }, { fr: 'Vue sur l’île de Lobos', en: 'View of Lobos Island' }], suggestedDurationMinutes: 180, latitude: 28.7058, longitude: -13.8423, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-betancuria', cityId: 'canary-islands', category: 'historic', image: require('../../../assets/offline-pois/canary-islands/betancuria.webp'), imageCredit: CREDIT,
    name: { fr: 'Betancuria — Fuerteventura', en: 'Betancuria — Fuerteventura' }, address: { fr: 'Plaza de Santa María, 35637 Betancuria, Fuerteventura, Espagne', en: 'Plaza de Santa María, 35637 Betancuria, Fuerteventura, Spain' },
    description: { fr: 'Ancienne capitale insulaire nichée dans une vallée, connue pour son église, ses maisons blanches et ses musées.', en: 'The island’s former capital set in a valley, known for its church, whitewashed houses and museums.' },
    highlights: [{ fr: 'Église Santa María', en: 'Santa María Church' }, { fr: 'Centre historique blanc', en: 'Whitewashed historic centre' }], suggestedDurationMinutes: 120, latitude: 28.4245, longitude: -14.0561, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-mirador-rio', cityId: 'canary-islands', category: 'landmark', image: require('../../../assets/offline-pois/canary-islands/mirador-rio.webp'), imageCredit: CREDIT,
    name: { fr: 'Mirador del Río — Lanzarote', en: 'Mirador del Río — Lanzarote' }, address: { fr: 'Carretera de Ye, 35541 Haría, Lanzarote, Espagne', en: 'Carretera de Ye, 35541 Haría, Lanzarote, Spain' },
    description: { fr: 'Belvédère conçu par César Manrique et intégré à la falaise de Famara, face à La Graciosa et à l’archipel Chinijo.', en: 'A viewpoint designed by César Manrique and integrated into the Famara cliffs, facing La Graciosa and the Chinijo Archipelago.' },
    highlights: [{ fr: 'Vue sur La Graciosa', en: 'View of La Graciosa' }, { fr: 'Architecture intégrée à la roche', en: 'Rock-integrated architecture' }], suggestedDurationMinutes: 75, latitude: 29.2147, longitude: -13.4812, website: 'https://cactlanzarote.com/en/centre/mirador-del-rio/', sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-roque-muchachos', cityId: 'canary-islands', category: 'landmark', image: require('../../../assets/offline-pois/canary-islands/roque-muchachos.webp'), imageCredit: CREDIT,
    name: { fr: 'Roque de los Muchachos — La Palma', en: 'Roque de los Muchachos — La Palma' }, address: { fr: 'LP-4, 38728 Garafía, La Palma, Espagne', en: 'LP-4, 38728 Garafía, La Palma, Spain' },
    description: { fr: 'Point culminant de La Palma, bordé d’observatoires astronomiques et dominant la Caldera de Taburiente.', en: 'La Palma’s highest point, lined with astronomical observatories and overlooking Caldera de Taburiente.' },
    highlights: [{ fr: 'Observatoire astrophysique', en: 'Astrophysical observatory' }, { fr: 'Panorama au-dessus des nuages', en: 'Above-the-clouds panorama' }], suggestedDurationMinutes: 180, latitude: 28.754, longitude: -17.885, website: 'https://www.iac.es/en/observatorios-de-canarias/roque-de-los-muchachos-observatory', sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-mirador-pena', cityId: 'canary-islands', category: 'landmark', image: require('../../../assets/offline-pois/canary-islands/mirador-pena.webp'), imageCredit: CREDIT,
    name: { fr: 'Mirador de la Peña — El Hierro', en: 'Mirador de la Peña — El Hierro' }, address: { fr: 'HI-10, 38916 Guarazoca, El Hierro, Espagne', en: 'HI-10, 38916 Guarazoca, El Hierro, Spain' },
    description: { fr: 'Belvédère de César Manrique posé au-dessus de la vallée d’El Golfo, combinant architecture insulaire et panorama océanique.', en: 'A César Manrique viewpoint above the El Golfo valley, combining island architecture with an ocean panorama.' },
    highlights: [{ fr: 'Vue sur El Golfo', en: 'View over El Golfo' }, { fr: 'Architecture de César Manrique', en: 'César Manrique architecture' }], suggestedDurationMinutes: 75, latitude: 27.8056, longitude: -17.9794, sourceUrl: SOURCE,
  },
];

export const CANARY_ISLANDS_POIS: OfflinePOI[] = seeds.map(createSpanishPOI);
