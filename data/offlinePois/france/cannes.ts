import type { OfflinePOI } from '../../../types/offlinePoi';
import { createFrenchPOI, type FrenchPOISeed } from './helpers';

const SOURCE = 'https://www.cannes-france.com/decouvrir-visiter/incontournables/';
const CREDIT = 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md';

const seeds: FrenchPOISeed[] = [
  {
    id: 'cannes-palais-festivals', cityId: 'cannes', category: 'landmark', image: require('../../../assets/offline-pois/cannes/palais-festivals.webp'), imageCredit: CREDIT,
    name: { fr: 'Palais des Festivals et des Congrès', en: 'Palais des Festivals et des Congrès' }, address: { fr: '1 boulevard de la Croisette, 06400 Cannes, France', en: '1 Boulevard de la Croisette, 06400 Cannes, France' },
    description: { fr: 'Lieu emblématique du Festival de Cannes, connu pour son tapis rouge et ses marches face au port.', en: 'The emblematic home of the Cannes Film Festival, known for its red carpet and steps facing the harbour.' },
    highlights: [{ fr: 'Marches du Festival', en: 'Festival steps' }, { fr: 'Chemin des étoiles', en: 'Path of the Stars' }], suggestedDurationMinutes: 45, latitude: 43.551, longitude: 7.018, website: 'https://www.palaisdesfestivals.com/', sourceUrl: SOURCE,
  },
  {
    id: 'cannes-croisette', cityId: 'cannes', category: 'landmark', image: require('../../../assets/offline-pois/cannes/croisette.webp'), imageCredit: CREDIT,
    name: { fr: 'Boulevard de la Croisette', en: 'Boulevard de la Croisette' }, address: { fr: 'Boulevard de la Croisette, 06400 Cannes, France', en: 'Boulevard de la Croisette, 06400 Cannes, France' },
    description: { fr: 'Promenade littorale bordée de plages, palmiers, grands hôtels et boutiques, face à la baie de Cannes.', en: 'A seafront promenade lined with beaches, palms, grand hotels and shops facing Cannes Bay.' },
    highlights: [{ fr: 'Promenade en bord de mer', en: 'Seafront walk' }, { fr: 'Hôtels historiques', en: 'Historic hotels' }], suggestedDurationMinutes: 120, latitude: 43.55, longitude: 7.028, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-suquet', cityId: 'cannes', category: 'historic', image: require('../../../assets/offline-pois/cannes/suquet.webp'), imageCredit: CREDIT,
    name: { fr: 'Le Suquet', en: 'Le Suquet' }, address: { fr: 'Rue Saint-Antoine, 06400 Cannes, France', en: 'Rue Saint-Antoine, 06400 Cannes, France' },
    description: { fr: 'Quartier ancien de Cannes aux ruelles en pente, maisons colorées et points de vue sur le port et la baie.', en: 'Cannes’ old quarter, with sloping lanes, colourful houses and views over the harbour and bay.' },
    highlights: [{ fr: 'Ruelles du vieux Cannes', en: 'Old Cannes lanes' }, { fr: 'Panorama depuis la colline', en: 'Hilltop panorama' }], suggestedDurationMinutes: 90, latitude: 43.551, longitude: 7.009, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-marche-forville', cityId: 'cannes', category: 'historic', image: require('../../../assets/offline-pois/cannes/marche-forville.webp'), imageCredit: CREDIT,
    name: { fr: 'Marché Forville', en: 'Forville Market' }, address: { fr: '6 rue du Marché-Forville, 06400 Cannes, France', en: '6 Rue du Marché-Forville, 06400 Cannes, France' },
    description: { fr: 'Marché couvert animé proposant produits provençaux, fleurs, poissons et spécialités locales.', en: 'A lively covered market offering Provençal produce, flowers, fish and local specialities.' },
    highlights: [{ fr: 'Produits méditerranéens', en: 'Mediterranean produce' }, { fr: 'Ambiance locale', en: 'Local atmosphere' }], suggestedDurationMinutes: 60, latitude: 43.552, longitude: 7.01, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-sainte-marguerite', cityId: 'cannes', category: 'park', image: require('../../../assets/offline-pois/cannes/sainte-marguerite.webp'), imageCredit: CREDIT,
    name: { fr: 'Île Sainte-Marguerite', en: 'Sainte-Marguerite Island' }, address: { fr: 'Île Sainte-Marguerite, 06400 Cannes, France', en: 'Sainte-Marguerite Island, 06400 Cannes, France' },
    description: { fr: 'Plus grande île de Lérins, couverte de forêts et parcourue de sentiers longeant criques et étangs.', en: 'The largest Lérins island, covered in forest with trails along coves and lagoons.' },
    highlights: [{ fr: 'Sentiers forestiers', en: 'Forest trails' }, { fr: 'Criques et étang du Batéguier', en: 'Coves and Batéguier lagoon' }], suggestedDurationMinutes: 240, latitude: 43.523, longitude: 7.045, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-fort-royal', cityId: 'cannes', category: 'museum', image: require('../../../assets/offline-pois/cannes/fort-royal.webp'), imageCredit: CREDIT,
    name: { fr: 'Fort Royal – Musée du Masque de fer', en: 'Fort Royal – Museum of the Man in the Iron Mask' }, address: { fr: 'Fort Royal, île Sainte-Marguerite, 06400 Cannes, France', en: 'Fort Royal, Sainte-Marguerite Island, 06400 Cannes, France' },
    description: { fr: 'Fort insulaire abritant l’ancienne prison du mystérieux Masque de fer et un musée maritime.', en: 'An island fort containing the former prison of the mysterious Man in the Iron Mask and a maritime museum.' },
    highlights: [{ fr: 'Cellule du Masque de fer', en: 'Man in the Iron Mask cell' }, { fr: 'Vestiges archéologiques', en: 'Archaeological remains' }], suggestedDurationMinutes: 120, latitude: 43.5235, longitude: 7.039, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-saint-honorat', cityId: 'cannes', category: 'park', image: require('../../../assets/offline-pois/cannes/saint-honorat.webp'), imageCredit: CREDIT,
    name: { fr: 'Île Saint-Honorat', en: 'Saint-Honorat Island' }, address: { fr: 'Île Saint-Honorat, 06400 Cannes, France', en: 'Saint-Honorat Island, 06400 Cannes, France' },
    description: { fr: 'Petite île paisible occupée par des moines, entre pins, vignes, chapelles et rivages rocheux.', en: 'A peaceful small island inhabited by monks, with pines, vineyards, chapels and rocky shores.' },
    highlights: [{ fr: 'Vignobles monastiques', en: 'Monastic vineyards' }, { fr: 'Promenade autour de l’île', en: 'Walk around the island' }], suggestedDurationMinutes: 240, latitude: 43.509, longitude: 7.047, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-abbaye-lerins', cityId: 'cannes', category: 'religious', image: require('../../../assets/offline-pois/cannes/abbaye-lerins.webp'), imageCredit: CREDIT,
    name: { fr: 'Abbaye de Lérins', en: 'Lérins Abbey' }, address: { fr: 'Abbaye de Lérins, île Saint-Honorat, 06400 Cannes, France', en: 'Lérins Abbey, Saint-Honorat Island, 06400 Cannes, France' },
    description: { fr: 'Monastère cistercien toujours actif, héritier d’une présence monastique remontant au Ve siècle.', en: 'An active Cistercian monastery continuing a monastic presence dating back to the 5th century.' },
    highlights: [{ fr: 'Église abbatiale', en: 'Abbey church' }, { fr: 'Cloître et vie monastique', en: 'Cloister and monastic life' }], suggestedDurationMinutes: 75, latitude: 43.507, longitude: 7.045, website: 'https://www.abbayedelerins.com/', sourceUrl: SOURCE,
  },
  {
    id: 'cannes-musee-explorations', cityId: 'cannes', category: 'museum', image: require('../../../assets/offline-pois/cannes/musee-explorations.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée des Explorations du Monde', en: 'Museum of World Explorations' }, address: { fr: 'Place de la Castre, 06400 Cannes, France', en: 'Place de la Castre, 06400 Cannes, France' },
    description: { fr: 'Musée installé dans le château médiéval du Suquet, consacré aux arts du monde, antiquités et paysages de Cannes.', en: 'A museum in Le Suquet’s medieval castle devoted to world arts, antiquities and Cannes landscapes.' },
    highlights: [{ fr: 'Collections extra-européennes', en: 'Non-European collections' }, { fr: 'Vue depuis la tour', en: 'View from the tower' }], suggestedDurationMinutes: 120, latitude: 43.5515, longitude: 7.0094, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-notre-dame-esperance', cityId: 'cannes', category: 'religious', image: require('../../../assets/offline-pois/cannes/notre-dame-esperance.webp'), imageCredit: CREDIT,
    name: { fr: 'Église Notre-Dame-d’Espérance', en: 'Church of Notre-Dame-d’Espérance' }, address: { fr: 'Place de la Castre, 06400 Cannes, France', en: 'Place de la Castre, 06400 Cannes, France' },
    description: { fr: 'Église gothique provençale au sommet du Suquet, dominant la ville et la baie.', en: 'A Provençal Gothic church at the top of Le Suquet, overlooking the city and bay.' },
    highlights: [{ fr: 'Architecture gothique provençale', en: 'Provençal Gothic architecture' }, { fr: 'Vue sur Cannes', en: 'View over Cannes' }], suggestedDurationMinutes: 45, latitude: 43.5515, longitude: 7.009, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-vieux-port', cityId: 'cannes', category: 'historic', image: require('../../../assets/offline-pois/cannes/vieux-port.webp'), imageCredit: CREDIT,
    name: { fr: 'Vieux-Port de Cannes', en: 'Old Port of Cannes' }, address: { fr: 'Quai Saint-Pierre, 06400 Cannes, France', en: 'Quai Saint-Pierre, 06400 Cannes, France' },
    description: { fr: 'Port historique au pied du Suquet, associant bateaux de pêche, yachts et vues sur le front de mer.', en: 'The historic harbour below Le Suquet, combining fishing boats, yachts and waterfront views.' },
    highlights: [{ fr: 'Quai Saint-Pierre', en: 'Quai Saint-Pierre' }, { fr: 'Vue sur le Suquet', en: 'View of Le Suquet' }], suggestedDurationMinutes: 60, latitude: 43.55, longitude: 7.012, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-ecomusee-sous-marin', cityId: 'cannes', category: 'museum', image: require('../../../assets/offline-pois/cannes/ecomusee-sous-marin.webp'), imageCredit: CREDIT,
    name: { fr: 'Écomusée sous-marin', en: 'Underwater Ecomuseum' }, address: { fr: 'Anse de la Batterie, île Sainte-Marguerite, 06400 Cannes, France', en: 'Anse de la Batterie, Sainte-Marguerite Island, 06400 Cannes, France' },
    description: { fr: 'Parcours subaquatique gratuit composé de six visages monumentaux immergés près du rivage.', en: 'A free underwater trail of six monumental faces submerged near the shore.' },
    highlights: [{ fr: 'Sculptures de Jason deCaires Taylor', en: 'Sculptures by Jason deCaires Taylor' }, { fr: 'Découverte en masque et tuba', en: 'Snorkelling discovery' }], suggestedDurationMinutes: 90, latitude: 43.52, longitude: 7.048, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-croix-gardes', cityId: 'cannes', category: 'park', image: require('../../../assets/offline-pois/cannes/croix-gardes.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc naturel forestier de la Croix-des-Gardes', en: 'Croix-des-Gardes Natural Forest Park' }, address: { fr: '166 boulevard Leader, 06400 Cannes, France', en: '166 Boulevard Leader, 06400 Cannes, France' },
    description: { fr: 'Grand espace naturel sur les hauteurs, sillonné de sentiers et ponctué de belvédères sur la baie.', en: 'A large natural area on the heights, crossed by trails and dotted with viewpoints over the bay.' },
    highlights: [{ fr: 'Sentiers de randonnée', en: 'Hiking trails' }, { fr: 'Panoramas sur les îles', en: 'Views over the islands' }], suggestedDurationMinutes: 120, latitude: 43.556, longitude: 6.993, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-villa-rothschild', cityId: 'cannes', category: 'historic', image: require('../../../assets/offline-pois/cannes/villa-rothschild.webp'), imageCredit: CREDIT,
    name: { fr: 'Villa Rothschild — Médiathèque Noailles', en: 'Villa Rothschild — Noailles Media Library' }, address: { fr: '1 avenue Jean de Noailles, 06400 Cannes, France', en: '1 Avenue Jean de Noailles, 06400 Cannes, France' },
    description: { fr: 'Villa néoclassique du XIXe siècle devenue médiathèque, entourée d’un jardin historique sur les hauteurs de Cannes.', en: 'A 19th-century Neoclassical villa converted into a media library, surrounded by a historic garden on the heights of Cannes.' },
    highlights: [{ fr: 'Façade néoclassique', en: 'Neoclassical façade' }, { fr: 'Jardin historique', en: 'Historic garden' }], suggestedDurationMinutes: 75, latitude: 43.5516, longitude: 7.0025, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-malmaison', cityId: 'cannes', category: 'museum', image: require('../../../assets/offline-pois/cannes/malmaison.webp'), imageCredit: CREDIT,
    name: { fr: 'La Malmaison', en: 'La Malmaison' }, address: { fr: '47 boulevard de la Croisette, 06400 Cannes, France', en: '47 Boulevard de la Croisette, 06400 Cannes, France' },
    description: { fr: 'Centre d’art contemporain installé dans l’ancien pavillon d’un grand hôtel de la Croisette.', en: 'A contemporary art centre housed in the former pavilion of a grand Croisette hotel.' },
    highlights: [{ fr: 'Expositions temporaires', en: 'Temporary exhibitions' }, { fr: 'Bâtiment historique de la Croisette', en: 'Historic Croisette building' }], suggestedDurationMinutes: 90, latitude: 43.552, longitude: 7.024, sourceUrl: SOURCE,
  },
];

export const CANNES_POIS: OfflinePOI[] = seeds.map(createFrenchPOI);
