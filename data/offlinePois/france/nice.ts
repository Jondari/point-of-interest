import type { OfflinePOI } from '../../../types/offlinePoi';
import { createFrenchPOI, type FrenchPOISeed } from './helpers';

const SOURCE = 'https://www.explorenicecotedazur.com/decouvrir/nice/';
const CREDIT = 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md';

const seeds: FrenchPOISeed[] = [
  {
    id: 'nice-promenade-anglais', cityId: 'nice', category: 'landmark', image: require('../../../assets/offline-pois/nice/promenade-anglais.webp'), imageCredit: CREDIT,
    name: { fr: 'Promenade des Anglais', en: 'Promenade des Anglais' }, address: { fr: 'Promenade des Anglais, 06000 Nice, France', en: 'Promenade des Anglais, 06000 Nice, France' },
    description: { fr: 'Célèbre avenue longeant la baie des Anges, ponctuée de chaises bleues, plages et façades Belle Époque.', en: 'The famous avenue along the Bay of Angels, lined with blue chairs, beaches and Belle Époque façades.' },
    highlights: [{ fr: 'Baie des Anges', en: 'Bay of Angels' }, { fr: 'Chaises bleues emblématiques', en: 'Iconic blue chairs' }], suggestedDurationMinutes: 120, latitude: 43.695, longitude: 7.265, sourceUrl: SOURCE,
  },
  {
    id: 'nice-colline-chateau', cityId: 'nice', category: 'park', image: require('../../../assets/offline-pois/nice/colline-chateau.webp'), imageCredit: CREDIT,
    name: { fr: 'Colline du Château', en: 'Castle Hill' }, address: { fr: 'Montée Lesage, 06300 Nice, France', en: 'Montée Lesage, 06300 Nice, France' },
    description: { fr: 'Parc élevé sur l’ancien site du château, offrant des vues sur le Vieux-Nice, le port et la baie.', en: 'A hilltop park on the former castle site, with views over Old Nice, the port and bay.' },
    highlights: [{ fr: 'Panorama sur la ville', en: 'City panorama' }, { fr: 'Cascade et vestiges', en: 'Waterfall and remains' }], suggestedDurationMinutes: 90, latitude: 43.697, longitude: 7.28, sourceUrl: SOURCE,
  },
  {
    id: 'nice-vieux-nice', cityId: 'nice', category: 'historic', image: require('../../../assets/offline-pois/nice/vieux-nice.webp'), imageCredit: CREDIT,
    name: { fr: 'Vieux-Nice', en: 'Old Nice' }, address: { fr: 'Place Rossetti, 06300 Nice, France', en: 'Place Rossetti, 06300 Nice, France' },
    description: { fr: 'Quartier historique aux ruelles étroites, façades colorées, églises baroques et commerces niçois.', en: 'A historic district of narrow lanes, colourful façades, Baroque churches and Niçois shops.' },
    highlights: [{ fr: 'Ruelles et placettes', en: 'Lanes and small squares' }, { fr: 'Architecture baroque', en: 'Baroque architecture' }], suggestedDurationMinutes: 150, latitude: 43.697, longitude: 7.277, sourceUrl: SOURCE,
  },
  {
    id: 'nice-place-massena', cityId: 'nice', category: 'landmark', image: require('../../../assets/offline-pois/nice/place-massena.webp'), imageCredit: CREDIT,
    name: { fr: 'Place Masséna', en: 'Place Masséna' }, address: { fr: 'Place Masséna, 06000 Nice, France', en: 'Place Masséna, 06000 Nice, France' },
    description: { fr: 'Grande place centrale reconnaissable à son dallage noir et blanc, ses façades rouges et ses œuvres contemporaines.', en: 'A major central square recognisable by its black-and-white paving, red façades and contemporary art.' },
    highlights: [{ fr: 'Fontaine du Soleil', en: 'Fountain of the Sun' }, { fr: 'Sculptures de Jaume Plensa', en: 'Jaume Plensa sculptures' }], suggestedDurationMinutes: 45, latitude: 43.697, longitude: 7.27, sourceUrl: SOURCE,
  },
  {
    id: 'nice-cours-saleya', cityId: 'nice', category: 'historic', image: require('../../../assets/offline-pois/nice/cours-saleya.webp'), imageCredit: CREDIT,
    name: { fr: 'Cours Saleya', en: 'Cours Saleya' }, address: { fr: 'Cours Saleya, 06300 Nice, France', en: 'Cours Saleya, 06300 Nice, France' },
    description: { fr: 'Place animée du Vieux-Nice accueillant marchés aux fleurs et produits, terrasses et façades colorées.', en: 'A lively Old Nice square hosting flower and produce markets, terraces and colourful façades.' },
    highlights: [{ fr: 'Marché aux fleurs', en: 'Flower market' }, { fr: 'Spécialités niçoises', en: 'Niçois specialities' }], suggestedDurationMinutes: 75, latitude: 43.696, longitude: 7.275, sourceUrl: SOURCE,
  },
  {
    id: 'nice-musee-matisse', cityId: 'nice', category: 'museum', image: require('../../../assets/offline-pois/nice/musee-matisse.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée Matisse', en: 'Matisse Museum' }, address: { fr: '164 avenue des Arènes-de-Cimiez, 06000 Nice, France', en: '164 Avenue des Arènes-de-Cimiez, 06000 Nice, France' },
    description: { fr: 'Musée consacré au parcours d’Henri Matisse, installé dans une villa génoise au cœur de Cimiez.', en: 'A museum devoted to Henri Matisse’s career, housed in a Genoese villa in the heart of Cimiez.' },
    highlights: [{ fr: 'Œuvres de toutes les périodes', en: 'Works from every period' }, { fr: 'Villa des Arènes', en: 'Villa des Arènes' }], suggestedDurationMinutes: 120, latitude: 43.719, longitude: 7.276, website: 'https://www.musee-matisse-nice.org/', sourceUrl: SOURCE,
  },
  {
    id: 'nice-musee-chagall', cityId: 'nice', category: 'museum', image: require('../../../assets/offline-pois/nice/musee-chagall.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée national Marc Chagall', en: 'Marc Chagall National Museum' }, address: { fr: 'Avenue du Docteur-Ménard, 06000 Nice, France', en: 'Avenue du Docteur-Ménard, 06000 Nice, France' },
    description: { fr: 'Musée conçu autour du Message Biblique de Marc Chagall, complété par vitraux, mosaïque et œuvres graphiques.', en: 'A museum centred on Marc Chagall’s Biblical Message, with stained glass, mosaic and graphic works.' },
    highlights: [{ fr: 'Cycle du Message Biblique', en: 'Biblical Message cycle' }, { fr: 'Vitraux de Chagall', en: 'Chagall stained glass' }], suggestedDurationMinutes: 120, latitude: 43.709, longitude: 7.269, website: 'https://musees-nationaux-alpesmaritimes.fr/chagall/', sourceUrl: SOURCE,
  },
  {
    id: 'nice-palais-lascaris', cityId: 'nice', category: 'museum', image: require('../../../assets/offline-pois/nice/palais-lascaris.webp'), imageCredit: CREDIT,
    name: { fr: 'Palais Lascaris', en: 'Palais Lascaris' }, address: { fr: '15 rue Droite, 06300 Nice, France', en: '15 Rue Droite, 06300 Nice, France' },
    description: { fr: 'Palais baroque du XVIIe siècle présentant décors historiques et collection d’instruments de musique anciens.', en: 'A 17th-century Baroque palace presenting historic interiors and a collection of early musical instruments.' },
    highlights: [{ fr: 'Décors baroques', en: 'Baroque interiors' }, { fr: 'Instruments de musique', en: 'Musical instruments' }], suggestedDurationMinutes: 90, latitude: 43.698, longitude: 7.278, sourceUrl: SOURCE,
  },
  {
    id: 'nice-sainte-reparate', cityId: 'nice', category: 'religious', image: require('../../../assets/offline-pois/nice/sainte-reparate.webp'), imageCredit: CREDIT,
    name: { fr: 'Cathédrale Sainte-Réparate', en: 'Nice Cathedral' }, address: { fr: '3 place Rossetti, 06300 Nice, France', en: '3 Place Rossetti, 06300 Nice, France' },
    description: { fr: 'Cathédrale baroque du Vieux-Nice dédiée à sainte Réparate, dotée d’une coupole en tuiles vernissées.', en: 'A Baroque cathedral in Old Nice dedicated to Saint Reparata, with a glazed-tile dome.' },
    highlights: [{ fr: 'Intérieur baroque', en: 'Baroque interior' }, { fr: 'Coupole colorée', en: 'Colourful dome' }], suggestedDurationMinutes: 45, latitude: 43.697, longitude: 7.276, sourceUrl: SOURCE,
  },
  {
    id: 'nice-cathedrale-russe', cityId: 'nice', category: 'religious', image: require('../../../assets/offline-pois/nice/cathedrale-russe.webp'), imageCredit: CREDIT,
    name: { fr: 'Cathédrale orthodoxe Saint-Nicolas', en: 'Saint Nicholas Orthodox Cathedral' }, address: { fr: 'Avenue Nicolas-II, 06000 Nice, France', en: 'Avenue Nicolas-II, 06000 Nice, France' },
    description: { fr: 'Édifice orthodoxe russe aux coupoles colorées, construit au début du XXe siècle pour la communauté russe.', en: 'A Russian Orthodox church with colourful domes, built in the early 20th century for the Russian community.' },
    highlights: [{ fr: 'Coupoles à bulbe', en: 'Onion domes' }, { fr: 'Icônes et boiseries', en: 'Icons and woodwork' }], suggestedDurationMinutes: 60, latitude: 43.703, longitude: 7.253, website: 'https://cathedrale-russe-nice.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'nice-monastere-cimiez', cityId: 'nice', category: 'religious', image: require('../../../assets/offline-pois/nice/monastere-cimiez.webp'), imageCredit: CREDIT,
    name: { fr: 'Monastère de Cimiez et ses jardins', en: 'Cimiez Monastery and Gardens' }, address: { fr: 'Place Jean-Paul-II, 06000 Nice, France', en: 'Place Jean-Paul-II, 06000 Nice, France' },
    description: { fr: 'Monastère franciscain entouré d’un jardin historique offrant des perspectives sur Nice et la Méditerranée.', en: 'A Franciscan monastery surrounded by a historic garden with views towards Nice and the Mediterranean.' },
    highlights: [{ fr: 'Jardin à l’italienne', en: 'Italian-style garden' }, { fr: 'Église et cloître', en: 'Church and cloister' }], suggestedDurationMinutes: 75, latitude: 43.72, longitude: 7.276, sourceUrl: SOURCE,
  },
  {
    id: 'nice-archeologie-cimiez', cityId: 'nice', category: 'historic', image: require('../../../assets/offline-pois/nice/archeologie-cimiez.webp'), imageCredit: CREDIT,
    name: { fr: 'Arènes et musée archéologique de Cimiez', en: 'Cimiez Arena and Archaeology Museum' }, address: { fr: '160 avenue des Arènes-de-Cimiez, 06000 Nice, France', en: '160 Avenue des Arènes-de-Cimiez, 06000 Nice, France' },
    description: { fr: 'Site de la ville romaine de Cemenelum avec amphithéâtre, thermes et collections archéologiques.', en: 'The site of the Roman city of Cemenelum, with an amphitheatre, baths and archaeological collections.' },
    highlights: [{ fr: 'Thermes romains', en: 'Roman baths' }, { fr: 'Amphithéâtre antique', en: 'Ancient amphitheatre' }], suggestedDurationMinutes: 120, latitude: 43.719, longitude: 7.276, sourceUrl: SOURCE,
  },
  {
    id: 'nice-promenade-paillon', cityId: 'nice', category: 'park', image: require('../../../assets/offline-pois/nice/promenade-paillon.webp'), imageCredit: CREDIT,
    name: { fr: 'Promenade du Paillon', en: 'Promenade du Paillon' }, address: { fr: 'Promenade du Paillon, 06000 Nice, France', en: 'Promenade du Paillon, 06000 Nice, France' },
    description: { fr: 'Coulée verte traversant le centre de Nice, dotée de jardins thématiques, jeux et miroir d’eau.', en: 'A green corridor through central Nice, with themed gardens, play areas and a water mirror.' },
    highlights: [{ fr: 'Miroir d’eau', en: 'Water mirror' }, { fr: 'Jardins urbains', en: 'Urban gardens' }], suggestedDurationMinutes: 75, latitude: 43.701, longitude: 7.275, sourceUrl: SOURCE,
  },
  {
    id: 'nice-parc-phoenix', cityId: 'nice', category: 'park', image: require('../../../assets/offline-pois/nice/parc-phoenix.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc Phoenix', en: 'Parc Phoenix' }, address: { fr: '405 promenade des Anglais, 06200 Nice, France', en: '405 Promenade des Anglais, 06200 Nice, France' },
    description: { fr: 'Parc botanique et zoologique regroupant serre tropicale, jardins thématiques, lac et animaux.', en: 'A botanical and zoological park with a tropical greenhouse, themed gardens, lake and animals.' },
    highlights: [{ fr: 'Grande serre tropicale', en: 'Large tropical greenhouse' }, { fr: 'Jardins et faune', en: 'Gardens and wildlife' }], suggestedDurationMinutes: 180, latitude: 43.668, longitude: 7.216, website: 'https://www.parc-phoenix.org/', sourceUrl: SOURCE,
  },
  {
    id: 'nice-port-lympia', cityId: 'nice', category: 'historic', image: require('../../../assets/offline-pois/nice/port-lympia.webp'), imageCredit: CREDIT,
    name: { fr: 'Port Lympia', en: 'Port Lympia' }, address: { fr: 'Quai des Deux-Emmanuel, 06300 Nice, France', en: 'Quai des Deux-Emmanuel, 06300 Nice, France' },
    description: { fr: 'Port historique bordé de façades colorées et de quais animés, entre le mont Boron et la vieille ville.', en: 'A historic harbour lined with colourful façades and lively quays, between Mont Boron and the old town.' },
    highlights: [{ fr: 'Pointus niçois', en: 'Traditional Niçois boats' }, { fr: 'Façades colorées', en: 'Colourful façades' }], suggestedDurationMinutes: 75, latitude: 43.699, longitude: 7.287, sourceUrl: SOURCE,
  },
];

export const NICE_POIS: OfflinePOI[] = seeds.map(createFrenchPOI);
