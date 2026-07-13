import type { OfflinePOI } from '../../../types/offlinePoi';
import { createFrenchPOI, type FrenchPOISeed } from './helpers';

const SOURCE = 'https://www.marseille-tourisme.com/decouvrez-marseille/incontournables/';
const CREDIT = 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md';

const seeds: FrenchPOISeed[] = [
  {
    id: 'marseille-notre-dame-garde', cityId: 'marseille', category: 'religious', image: require('../../../assets/offline-pois/marseille/notre-dame-garde.webp'), imageCredit: CREDIT,
    name: { fr: 'Basilique Notre-Dame de la Garde', en: 'Basilica of Notre-Dame de la Garde' }, address: { fr: 'Rue Fort-du-Sanctuaire, 13006 Marseille, France', en: 'Rue Fort-du-Sanctuaire, 13006 Marseille, France' },
    description: { fr: 'Basilique romano-byzantine surnommée la Bonne Mère, dressée au-dessus de la ville et de la Méditerranée.', en: 'A Romano-Byzantine basilica known as the Good Mother, standing above the city and Mediterranean.' },
    highlights: [{ fr: 'Panorama à 360 degrés', en: '360-degree panorama' }, { fr: 'Mosaïques intérieures', en: 'Interior mosaics' }], suggestedDurationMinutes: 90, latitude: 43.284, longitude: 5.371, website: 'https://notredamedelagarde.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'marseille-vieux-port', cityId: 'marseille', category: 'historic', image: require('../../../assets/offline-pois/marseille/vieux-port.webp'), imageCredit: CREDIT,
    name: { fr: 'Vieux-Port', en: 'Old Port of Marseille' }, address: { fr: 'Quai des Belges, 13001 Marseille, France', en: 'Quai des Belges, 13001 Marseille, France' },
    description: { fr: 'Port historique et cœur vivant de Marseille, entouré de quais, marchés, cafés et monuments.', en: 'Marseille’s historic harbour and lively heart, surrounded by quays, markets, cafés and monuments.' },
    highlights: [{ fr: 'Ombrière du Vieux-Port', en: 'Vieux-Port canopy' }, { fr: 'Marché aux poissons', en: 'Fish market' }], suggestedDurationMinutes: 90, latitude: 43.296, longitude: 5.37, sourceUrl: SOURCE,
  },
  {
    id: 'marseille-mucem', cityId: 'marseille', category: 'museum', image: require('../../../assets/offline-pois/marseille/mucem.webp'), imageCredit: CREDIT,
    name: { fr: 'Mucem', en: 'Mucem' }, address: { fr: '1 esplanade du J4, 13002 Marseille, France', en: '1 Esplanade du J4, 13002 Marseille, France' },
    description: { fr: 'Musée consacré aux civilisations de l’Europe et de la Méditerranée, relié au fort Saint-Jean par une passerelle.', en: 'A museum devoted to European and Mediterranean civilisations, linked to Fort Saint-Jean by a footbridge.' },
    highlights: [{ fr: 'Résille de béton du J4', en: 'J4 concrete lattice' }, { fr: 'Expositions méditerranéennes', en: 'Mediterranean exhibitions' }], suggestedDurationMinutes: 180, latitude: 43.297, longitude: 5.361, website: 'https://www.mucem.org/', sourceUrl: SOURCE,
  },
  {
    id: 'marseille-calanques', cityId: 'marseille', category: 'park', image: require('../../../assets/offline-pois/marseille/calanques.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc national des Calanques', en: 'Calanques National Park' }, address: { fr: 'Route de la Gineste, 13009 Marseille, France', en: 'Route de la Gineste, 13009 Marseille, France' },
    description: { fr: 'Paysage protégé de falaises calcaires, criques turquoise et sentiers entre Marseille et Cassis.', en: 'A protected landscape of limestone cliffs, turquoise coves and trails between Marseille and Cassis.' },
    highlights: [{ fr: 'Criques et falaises', en: 'Coves and cliffs' }, { fr: 'Randonnées littorales', en: 'Coastal hikes' }], suggestedDurationMinutes: 240, latitude: 43.21, longitude: 5.444, website: 'https://www.calanques-parcnational.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'marseille-palais-longchamp', cityId: 'marseille', category: 'landmark', image: require('../../../assets/offline-pois/marseille/palais-longchamp.webp'), imageCredit: CREDIT,
    name: { fr: 'Palais Longchamp', en: 'Palais Longchamp' }, address: { fr: 'Boulevard Jardin-Zoologique, 13004 Marseille, France', en: 'Boulevard Jardin-Zoologique, 13004 Marseille, France' },
    description: { fr: 'Monument célébrant l’arrivée des eaux de la Durance, réunissant colonnade, fontaine, musées et jardins.', en: 'A monument celebrating the arrival of Durance water, combining a colonnade, fountain, museums and gardens.' },
    highlights: [{ fr: 'Fontaine monumentale', en: 'Monumental fountain' }, { fr: 'Musées et parc', en: 'Museums and park' }], suggestedDurationMinutes: 120, latitude: 43.304, longitude: 5.394, sourceUrl: SOURCE,
  },
  {
    id: 'marseille-panier', cityId: 'marseille', category: 'historic', image: require('../../../assets/offline-pois/marseille/panier.webp'), imageCredit: CREDIT,
    name: { fr: 'Quartier du Panier', en: 'Le Panier District' }, address: { fr: 'Place des Moulins, 13002 Marseille, France', en: 'Place des Moulins, 13002 Marseille, France' },
    description: { fr: 'Plus ancien quartier de Marseille, composé de ruelles en pente, petites places, ateliers et façades colorées.', en: 'Marseille’s oldest district, made up of sloping lanes, small squares, workshops and colourful façades.' },
    highlights: [{ fr: 'Ruelles historiques', en: 'Historic lanes' }, { fr: 'Art urbain et artisans', en: 'Street art and craftspeople' }], suggestedDurationMinutes: 120, latitude: 43.3, longitude: 5.367, sourceUrl: SOURCE,
  },
  {
    id: 'marseille-saint-victor', cityId: 'marseille', category: 'religious', image: require('../../../assets/offline-pois/marseille/saint-victor.webp'), imageCredit: CREDIT,
    name: { fr: 'Abbaye Saint-Victor', en: 'Abbey of Saint-Victor' }, address: { fr: 'Place Saint-Victor, 13007 Marseille, France', en: 'Place Saint-Victor, 13007 Marseille, France' },
    description: { fr: 'Ancienne abbaye fortifiée connue pour ses cryptes paléochrétiennes et son rôle dans l’histoire religieuse locale.', en: 'An ancient fortified abbey known for its early Christian crypts and role in local religious history.' },
    highlights: [{ fr: 'Cryptes antiques', en: 'Ancient crypts' }, { fr: 'Architecture fortifiée', en: 'Fortified architecture' }], suggestedDurationMinutes: 60, latitude: 43.29, longitude: 5.365, website: 'https://www.saintvictor.net/', sourceUrl: SOURCE,
  },
  {
    id: 'marseille-chateau-if', cityId: 'marseille', category: 'historic', image: require('../../../assets/offline-pois/marseille/chateau-if.webp'), imageCredit: CREDIT,
    name: { fr: 'Château d’If', en: 'Château d’If' }, address: { fr: 'Île d’If, archipel du Frioul, 13007 Marseille, France', en: 'Île d’If, Frioul Archipelago, 13007 Marseille, France' },
    description: { fr: 'Forteresse insulaire devenue prison, rendue célèbre par le roman Le Comte de Monte-Cristo.', en: 'An island fortress turned prison, made famous by the novel The Count of Monte Cristo.' },
    highlights: [{ fr: 'Cellules historiques', en: 'Historic prison cells' }, { fr: 'Vue sur la rade', en: 'View over the bay' }], suggestedDurationMinutes: 150, latitude: 43.279, longitude: 5.325, website: 'https://www.chateau-if.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'marseille-frioul', cityId: 'marseille', category: 'park', image: require('../../../assets/offline-pois/marseille/frioul.webp'), imageCredit: CREDIT,
    name: { fr: 'Îles du Frioul', en: 'Frioul Islands' }, address: { fr: 'Port du Frioul, 13007 Marseille, France', en: 'Port du Frioul, 13007 Marseille, France' },
    description: { fr: 'Archipel aux paysages rocheux, petites criques, sentiers et vestiges militaires accessible en bateau.', en: 'A boat-accessible archipelago of rocky landscapes, small coves, trails and military remains.' },
    highlights: [{ fr: 'Sentiers côtiers', en: 'Coastal trails' }, { fr: 'Criques et eaux claires', en: 'Coves and clear water' }], suggestedDurationMinutes: 240, latitude: 43.28, longitude: 5.305, sourceUrl: SOURCE,
  },
  {
    id: 'marseille-major', cityId: 'marseille', category: 'religious', image: require('../../../assets/offline-pois/marseille/major.webp'), imageCredit: CREDIT,
    name: { fr: 'Cathédrale de la Major', en: 'Marseille Cathedral' }, address: { fr: 'Place de la Major, 13002 Marseille, France', en: 'Place de la Major, 13002 Marseille, France' },
    description: { fr: 'Cathédrale monumentale du XIXe siècle mêlant pierre claire et sombre dans un style romano-byzantin.', en: 'A monumental 19th-century cathedral combining light and dark stone in a Romano-Byzantine style.' },
    highlights: [{ fr: 'Façade rayée', en: 'Striped façade' }, { fr: 'Coupoles et mosaïques', en: 'Domes and mosaics' }], suggestedDurationMinutes: 60, latitude: 43.299, longitude: 5.365, sourceUrl: SOURCE,
  },
  {
    id: 'marseille-cite-radieuse', cityId: 'marseille', category: 'landmark', image: require('../../../assets/offline-pois/marseille/cite-radieuse.webp'), imageCredit: CREDIT,
    name: { fr: 'Cité Radieuse – Le Corbusier', en: 'Cité Radieuse – Le Corbusier' }, address: { fr: '280 boulevard Michelet, 13008 Marseille, France', en: '280 Boulevard Michelet, 13008 Marseille, France' },
    description: { fr: 'Unité d’habitation moderniste de Le Corbusier, conçue comme une ville verticale et inscrite à l’UNESCO.', en: 'Le Corbusier’s modernist housing unit, designed as a vertical city and listed by UNESCO.' },
    highlights: [{ fr: 'Architecture moderniste', en: 'Modernist architecture' }, { fr: 'Toit-terrasse', en: 'Rooftop terrace' }], suggestedDurationMinutes: 75, latitude: 43.261, longitude: 5.396, sourceUrl: SOURCE,
  },
  {
    id: 'marseille-cosquer', cityId: 'marseille', category: 'museum', image: require('../../../assets/offline-pois/marseille/cosquer.webp'), imageCredit: CREDIT,
    name: { fr: 'Cosquer Méditerranée', en: 'Cosquer Méditerranée' }, address: { fr: 'Promenade Robert-Laffont, 13002 Marseille, France', en: 'Promenade Robert-Laffont, 13002 Marseille, France' },
    description: { fr: 'Restitution immersive de la grotte Cosquer et de ses œuvres préhistoriques aujourd’hui en partie submergées.', en: 'An immersive reconstruction of Cosquer Cave and its prehistoric art, now partly submerged.' },
    highlights: [{ fr: 'Réplique de la grotte', en: 'Cave replica' }, { fr: 'Art pariétal préhistorique', en: 'Prehistoric cave art' }], suggestedDurationMinutes: 120, latitude: 43.296, longitude: 5.362, website: 'https://www.grotte-cosquer.com/', sourceUrl: SOURCE,
  },
  {
    id: 'marseille-pharo', cityId: 'marseille', category: 'landmark', image: require('../../../assets/offline-pois/marseille/pharo.webp'), imageCredit: CREDIT,
    name: { fr: 'Palais du Pharo', en: 'Palais du Pharo' }, address: { fr: '58 boulevard Charles-Livon, 13007 Marseille, France', en: '58 Boulevard Charles-Livon, 13007 Marseille, France' },
    description: { fr: 'Ancienne résidence impériale entourée d’un jardin offrant une vue remarquable sur le Vieux-Port et le littoral.', en: 'A former imperial residence surrounded by gardens with remarkable views of the Old Port and coastline.' },
    highlights: [{ fr: 'Jardin panoramique', en: 'Panoramic garden' }, { fr: 'Vue sur l’entrée du port', en: 'View over the harbour entrance' }], suggestedDurationMinutes: 60, latitude: 43.294, longitude: 5.359, sourceUrl: SOURCE,
  },
  {
    id: 'marseille-fort-saint-jean', cityId: 'marseille', category: 'historic', image: require('../../../assets/offline-pois/marseille/fort-saint-jean.webp'), imageCredit: CREDIT,
    name: { fr: 'Fort Saint-Jean', en: 'Fort Saint-Jean' }, address: { fr: 'Promenade Louis-Braille, 13002 Marseille, France', en: 'Promenade Louis-Braille, 13002 Marseille, France' },
    description: { fr: 'Fort historique gardant l’entrée du Vieux-Port, intégré au Mucem et parcouru de jardins et passerelles.', en: 'A historic fort guarding the Old Port entrance, incorporated into Mucem with gardens and footbridges.' },
    highlights: [{ fr: 'Tours historiques', en: 'Historic towers' }, { fr: 'Passerelles vers le Mucem', en: 'Footbridges to Mucem' }], suggestedDurationMinutes: 90, latitude: 43.296, longitude: 5.362, sourceUrl: SOURCE,
  },
  {
    id: 'marseille-parc-borely', cityId: 'marseille', category: 'park', image: require('../../../assets/offline-pois/marseille/parc-borely.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc Borély', en: 'Parc Borély' }, address: { fr: 'Avenue du Parc-Borély, 13008 Marseille, France', en: 'Avenue du Parc-Borély, 13008 Marseille, France' },
    description: { fr: 'Vaste parc proche des plages comprenant jardin à la française, jardin anglais, lac et château.', en: 'A large park near the beaches with formal and English gardens, a lake and château.' },
    highlights: [{ fr: 'Jardins paysagers', en: 'Landscaped gardens' }, { fr: 'Lac et château Borély', en: 'Lake and Château Borély' }], suggestedDurationMinutes: 120, latitude: 43.26, longitude: 5.382, sourceUrl: SOURCE,
  },
];

export const MARSEILLE_POIS: OfflinePOI[] = seeds.map(createFrenchPOI);
