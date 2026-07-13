import type { OfflinePOI } from '../../../types/offlinePoi';
import { createSpanishPOI, type SpanishPOISeed } from './helpers';

const SOURCE = 'https://www.esmadrid.com/en/madrid-at-a-glance';
const CREDIT = 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md';

const seeds: SpanishPOISeed[] = [
  {
    id: 'madrid-royal-palace', cityId: 'madrid', category: 'historic', image: require('../../../assets/offline-pois/madrid/royal-palace.webp'), imageCredit: CREDIT,
    name: { fr: 'Palais royal de Madrid', en: 'Royal Palace of Madrid' }, address: { fr: 'Calle de Bailén, 28071 Madrid, Espagne', en: 'Calle de Bailén, 28071 Madrid, Spain' },
    description: { fr: 'Résidence officielle de la monarchie espagnole utilisée pour les cérémonies d’État, avec appartements historiques et armurerie.', en: 'The official residence of the Spanish monarchy used for state ceremonies, with historic apartments and a royal armoury.' },
    highlights: [{ fr: 'Salles d’apparat', en: 'State rooms' }, { fr: 'Armurerie royale', en: 'Royal armoury' }], suggestedDurationMinutes: 150, latitude: 40.4179, longitude: -3.7143, website: 'https://www.patrimonionacional.es/visita/palacio-real-de-madrid', sourceUrl: SOURCE,
  },
  {
    id: 'madrid-prado', cityId: 'madrid', category: 'museum', image: require('../../../assets/offline-pois/madrid/prado.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée du Prado', en: 'Prado Museum' }, address: { fr: 'Calle de Ruiz de Alarcón 23, 28014 Madrid, Espagne', en: 'Calle de Ruiz de Alarcón 23, 28014 Madrid, Spain' },
    description: { fr: 'Grand musée national consacré à la peinture européenne, particulièrement riche en œuvres de Velázquez, Goya, Rubens et Bosch.', en: 'A major national museum of European painting, especially rich in works by Velázquez, Goya, Rubens and Bosch.' },
    highlights: [{ fr: 'Les Ménines', en: 'Las Meninas' }, { fr: 'Maîtres espagnols et flamands', en: 'Spanish and Flemish masters' }], suggestedDurationMinutes: 180, latitude: 40.4138, longitude: -3.6921, website: 'https://www.museodelprado.es/en', sourceUrl: SOURCE,
  },
  {
    id: 'madrid-retiro', cityId: 'madrid', category: 'park', image: require('../../../assets/offline-pois/madrid/retiro.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc du Retiro', en: 'El Retiro Park' }, address: { fr: 'Plaza de la Independencia 7, 28001 Madrid, Espagne', en: 'Plaza de la Independencia 7, 28001 Madrid, Spain' },
    description: { fr: 'Ancien jardin royal devenu grand parc urbain, intégré au Paysage de la lumière inscrit au patrimoine mondial.', en: 'A former royal garden turned major urban park, included in the World Heritage-listed Landscape of Light.' },
    highlights: [{ fr: 'Palais de Cristal', en: 'Crystal Palace' }, { fr: 'Grand bassin', en: 'Great Pond' }], suggestedDurationMinutes: 150, latitude: 40.4153, longitude: -3.6844, sourceUrl: SOURCE,
  },
  {
    id: 'madrid-plaza-mayor', cityId: 'madrid', category: 'historic', image: require('../../../assets/offline-pois/madrid/plaza-mayor.webp'), imageCredit: CREDIT,
    name: { fr: 'Plaza Mayor', en: 'Plaza Mayor' }, address: { fr: 'Plaza Mayor, 28012 Madrid, Espagne', en: 'Plaza Mayor, 28012 Madrid, Spain' },
    description: { fr: 'Place à arcades du XVIIe siècle, cœur monumental du vieux Madrid et cadre de marchés et célébrations.', en: 'A 17th-century arcaded square, monumental heart of old Madrid and setting for markets and celebrations.' },
    highlights: [{ fr: 'Casa de la Panadería', en: 'Casa de la Panadería' }, { fr: 'Statue de Philippe III', en: 'Philip III statue' }], suggestedDurationMinutes: 60, latitude: 40.4155, longitude: -3.7074, sourceUrl: SOURCE,
  },
  {
    id: 'madrid-puerta-sol', cityId: 'madrid', category: 'landmark', image: require('../../../assets/offline-pois/madrid/puerta-sol.webp'), imageCredit: CREDIT,
    name: { fr: 'Puerta del Sol', en: 'Puerta del Sol' }, address: { fr: 'Puerta del Sol, 28013 Madrid, Espagne', en: 'Puerta del Sol, 28013 Madrid, Spain' },
    description: { fr: 'Place centrale animée réunissant le Kilomètre zéro, l’horloge de la Casa de Correos et le symbole de l’ours et de l’arbousier.', en: 'A lively central square containing Kilometre Zero, the Casa de Correos clock and the Bear and Strawberry Tree emblem.' },
    highlights: [{ fr: 'Kilomètre zéro', en: 'Kilometre Zero' }, { fr: 'Ours et arbousier', en: 'Bear and Strawberry Tree' }], suggestedDurationMinutes: 45, latitude: 40.4169, longitude: -3.7035, sourceUrl: SOURCE,
  },
  {
    id: 'madrid-reina-sofia', cityId: 'madrid', category: 'museum', image: require('../../../assets/offline-pois/madrid/reina-sofia.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée Reina Sofía', en: 'Reina Sofía Museum' }, address: { fr: 'Calle de Santa Isabel 52, 28012 Madrid, Espagne', en: 'Calle de Santa Isabel 52, 28012 Madrid, Spain' },
    description: { fr: 'Musée national d’art moderne et contemporain espagnol, connu notamment pour Guernica de Pablo Picasso.', en: 'Spain’s national museum of modern and contemporary art, best known for Pablo Picasso’s Guernica.' },
    highlights: [{ fr: 'Guernica de Picasso', en: 'Picasso’s Guernica' }, { fr: 'Art espagnol du XXe siècle', en: '20th-century Spanish art' }], suggestedDurationMinutes: 150, latitude: 40.4086, longitude: -3.6944, website: 'https://www.museoreinasofia.es/en', sourceUrl: SOURCE,
  },
  {
    id: 'madrid-thyssen', cityId: 'madrid', category: 'museum', image: require('../../../assets/offline-pois/madrid/thyssen.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée Thyssen-Bornemisza', en: 'Thyssen-Bornemisza Museum' }, address: { fr: 'Paseo del Prado 8, 28014 Madrid, Espagne', en: 'Paseo del Prado 8, 28014 Madrid, Spain' },
    description: { fr: 'Collection retraçant l’histoire de la peinture occidentale du XIIIe au XXe siècle dans le palais de Villahermosa.', en: 'A collection tracing Western painting from the 13th to the 20th century in the Villahermosa Palace.' },
    highlights: [{ fr: 'Parcours chronologique', en: 'Chronological collection' }, { fr: 'Palais de Villahermosa', en: 'Villahermosa Palace' }], suggestedDurationMinutes: 150, latitude: 40.416, longitude: -3.6947, website: 'https://www.museothyssen.org/en', sourceUrl: SOURCE,
  },
  {
    id: 'madrid-almudena', cityId: 'madrid', category: 'religious', image: require('../../../assets/offline-pois/madrid/almudena.webp'), imageCredit: CREDIT,
    name: { fr: 'Cathédrale de l’Almudena', en: 'Almudena Cathedral' }, address: { fr: 'Calle de Bailén 10, 28013 Madrid, Espagne', en: 'Calle de Bailén 10, 28013 Madrid, Spain' },
    description: { fr: 'Cathédrale de Madrid achevée au XXe siècle, associant façade néoclassique, crypte néoromane et intérieur contemporain.', en: 'Madrid’s cathedral, completed in the 20th century, combining a Neoclassical façade, Neo-Romanesque crypt and contemporary interior.' },
    highlights: [{ fr: 'Crypte néoromane', en: 'Neo-Romanesque crypt' }, { fr: 'Vue depuis la coupole', en: 'View from the dome' }], suggestedDurationMinutes: 75, latitude: 40.4156, longitude: -3.7146, sourceUrl: SOURCE,
  },
  {
    id: 'madrid-debod', cityId: 'madrid', category: 'historic', image: require('../../../assets/offline-pois/madrid/debod.webp'), imageCredit: CREDIT,
    name: { fr: 'Temple de Debod', en: 'Temple of Debod' }, address: { fr: 'Calle de Ferraz 1, 28008 Madrid, Espagne', en: 'Calle de Ferraz 1, 28008 Madrid, Spain' },
    description: { fr: 'Temple égyptien antique offert à l’Espagne et reconstruit dans un parc dominant l’ouest de Madrid.', en: 'An ancient Egyptian temple gifted to Spain and rebuilt in a park overlooking western Madrid.' },
    highlights: [{ fr: 'Architecture nubienne antique', en: 'Ancient Nubian architecture' }, { fr: 'Coucher de soleil', en: 'Sunset viewpoint' }], suggestedDurationMinutes: 60, latitude: 40.424, longitude: -3.7178, sourceUrl: SOURCE,
  },
  {
    id: 'madrid-bernabeu', cityId: 'madrid', category: 'landmark', image: require('../../../assets/offline-pois/madrid/bernabeu.webp'), imageCredit: CREDIT,
    name: { fr: 'Stade Santiago-Bernabéu', en: 'Santiago Bernabéu Stadium' }, address: { fr: 'Avenida de Concha Espina 1, 28036 Madrid, Espagne', en: 'Avenida de Concha Espina 1, 28036 Madrid, Spain' },
    description: { fr: 'Stade du Real Madrid modernisé, proposant musée, parcours de visite et vues sur l’enceinte sportive.', en: 'Real Madrid’s modernised stadium, offering a museum, visitor route and views over the arena.' },
    highlights: [{ fr: 'Musée du Real Madrid', en: 'Real Madrid Museum' }, { fr: 'Panorama du stade', en: 'Stadium panorama' }], suggestedDurationMinutes: 120, latitude: 40.4531, longitude: -3.6883, website: 'https://www.realmadrid.com/en-US/bernabeu-stadium', sourceUrl: SOURCE,
  },
  {
    id: 'madrid-gran-via', cityId: 'madrid', category: 'landmark', image: require('../../../assets/offline-pois/madrid/gran-via.webp'), imageCredit: CREDIT,
    name: { fr: 'Gran Vía', en: 'Gran Vía' }, address: { fr: 'Gran Vía, 28013 Madrid, Espagne', en: 'Gran Vía, 28013 Madrid, Spain' },
    description: { fr: 'Grande avenue du centre connue pour ses façades du début du XXe siècle, ses théâtres et ses panoramas urbains.', en: 'A major central avenue known for early-20th-century façades, theatres and sweeping urban views.' },
    highlights: [{ fr: 'Édifice Metrópolis', en: 'Metrópolis Building' }, { fr: 'Théâtres et architecture', en: 'Theatres and architecture' }], suggestedDurationMinutes: 90, latitude: 40.42, longitude: -3.7058, sourceUrl: SOURCE,
  },
  {
    id: 'madrid-san-miguel', cityId: 'madrid', category: 'historic', image: require('../../../assets/offline-pois/madrid/san-miguel.webp'), imageCredit: CREDIT,
    name: { fr: 'Marché de San Miguel', en: 'Mercado de San Miguel' }, address: { fr: 'Plaza de San Miguel, 28005 Madrid, Espagne', en: 'Plaza de San Miguel, 28005 Madrid, Spain' },
    description: { fr: 'Halle de verre et de fer transformée en marché gastronomique, à proximité immédiate de la Plaza Mayor.', en: 'A glass-and-iron market hall transformed into a food market beside Plaza Mayor.' },
    highlights: [{ fr: 'Architecture métallique', en: 'Iron architecture' }, { fr: 'Cuisine espagnole', en: 'Spanish food stalls' }], suggestedDurationMinutes: 75, latitude: 40.4154, longitude: -3.7089, website: 'https://mercadodesanmiguel.es/', sourceUrl: SOURCE,
  },
  {
    id: 'madrid-sorolla', cityId: 'madrid', category: 'museum', image: require('../../../assets/offline-pois/madrid/sorolla.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée Sorolla', en: 'Sorolla Museum' }, address: { fr: 'Paseo del General Martínez Campos 37, 28010 Madrid, Espagne', en: 'Paseo del General Martínez Campos 37, 28010 Madrid, Spain' },
    description: { fr: 'Maison-atelier du peintre Joaquín Sorolla conservant ses œuvres, ses collections et un jardin d’inspiration andalouse.', en: 'Painter Joaquín Sorolla’s home and studio, preserving his works, collections and Andalusian-inspired garden.' },
    highlights: [{ fr: 'Maison-atelier préservée', en: 'Preserved house and studio' }, { fr: 'Jardin de l’artiste', en: 'Artist’s garden' }], suggestedDurationMinutes: 90, latitude: 40.4356, longitude: -3.6925, website: 'https://www.cultura.gob.es/msorolla/en/home.html', sourceUrl: SOURCE,
  },
  {
    id: 'madrid-botanical-garden', cityId: 'madrid', category: 'park', image: require('../../../assets/offline-pois/madrid/botanical-garden.webp'), imageCredit: CREDIT,
    name: { fr: 'Jardin botanique royal', en: 'Royal Botanical Garden' }, address: { fr: 'Plaza de Murillo 2, 28014 Madrid, Espagne', en: 'Plaza de Murillo 2, 28014 Madrid, Spain' },
    description: { fr: 'Jardin scientifique historique organisé en terrasses, réunissant collections botaniques, serres et arbres remarquables.', en: 'A historic scientific garden arranged on terraces, with botanical collections, greenhouses and notable trees.' },
    highlights: [{ fr: 'Terrasses botaniques', en: 'Botanical terraces' }, { fr: 'Serres historiques', en: 'Historic greenhouses' }], suggestedDurationMinutes: 90, latitude: 40.4111, longitude: -3.6914, website: 'https://rjb.csic.es/en/', sourceUrl: SOURCE,
  },
  {
    id: 'madrid-puerta-alcala', cityId: 'madrid', category: 'landmark', image: require('../../../assets/offline-pois/madrid/puerta-alcala.webp'), imageCredit: CREDIT,
    name: { fr: 'Puerta de Alcalá', en: 'Puerta de Alcalá' }, address: { fr: 'Plaza de la Independencia, 28001 Madrid, Espagne', en: 'Plaza de la Independencia, 28001 Madrid, Spain' },
    description: { fr: 'Porte monumentale néoclassique du XVIIIe siècle dressée à l’entrée du Retiro et devenue symbole de Madrid.', en: 'An 18th-century Neoclassical monumental gate standing at the entrance to El Retiro and now a symbol of Madrid.' },
    highlights: [{ fr: 'Cinq arches monumentales', en: 'Five monumental arches' }, { fr: 'Décor sculpté', en: 'Sculpted decoration' }], suggestedDurationMinutes: 30, latitude: 40.42, longitude: -3.6887, sourceUrl: SOURCE,
  },
];

export const MADRID_POIS: OfflinePOI[] = seeds.map(createSpanishPOI);
