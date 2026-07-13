import type { OfflinePOI } from '../../../types/offlinePoi';
import { createSpanishPOI, type SpanishPOISeed } from './helpers';

const SOURCE = 'https://www.barcelonaturisme.com/wv3/en/';
const CREDIT = 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md';

const seeds: SpanishPOISeed[] = [
  {
    id: 'barcelona-sagrada-familia', cityId: 'barcelona', category: 'religious', image: require('../../../assets/offline-pois/barcelona/sagrada-familia.webp'), imageCredit: CREDIT,
    name: { fr: 'Sagrada Família', en: 'Sagrada Família' }, address: { fr: 'Carrer de Mallorca 401, 08013 Barcelone, Espagne', en: 'Carrer de Mallorca 401, 08013 Barcelona, Spain' },
    description: { fr: 'Basilique conçue par Antoni Gaudí, célèbre pour ses façades sculptées, ses tours et son intérieur inspiré d’une forêt.', en: 'A basilica designed by Antoni Gaudí, renowned for its sculpted façades, towers and forest-inspired interior.' },
    highlights: [{ fr: 'Façades de la Nativité et de la Passion', en: 'Nativity and Passion façades' }, { fr: 'Colonnes arborescentes', en: 'Tree-like columns' }], suggestedDurationMinutes: 150, latitude: 41.4036, longitude: 2.1744, website: 'https://sagradafamilia.org/en/', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-park-guell', cityId: 'barcelona', category: 'park', image: require('../../../assets/offline-pois/barcelona/park-guell.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc Güell', en: 'Park Güell' }, address: { fr: 'Carrer d’Olot 5, 08024 Barcelone, Espagne', en: 'Carrer d’Olot 5, 08024 Barcelona, Spain' },
    description: { fr: 'Parc paysager de Gaudí associant architecture organique, mosaïques colorées et vues sur Barcelone.', en: 'Gaudí’s landscaped park combining organic architecture, colourful mosaics and views over Barcelona.' },
    highlights: [{ fr: 'Escalier du Dragon', en: 'Dragon Stairway' }, { fr: 'Banc ondulé en mosaïque', en: 'Serpentine mosaic bench' }], suggestedDurationMinutes: 120, latitude: 41.4145, longitude: 2.1527, website: 'https://parkguell.barcelona/en', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-casa-batllo', cityId: 'barcelona', category: 'historic', image: require('../../../assets/offline-pois/barcelona/casa-batllo.webp'), imageCredit: CREDIT,
    name: { fr: 'Casa Batlló', en: 'Casa Batlló' }, address: { fr: 'Passeig de Gràcia 43, 08007 Barcelone, Espagne', en: 'Passeig de Gràcia 43, 08007 Barcelona, Spain' },
    description: { fr: 'Maison moderniste transformée par Gaudí, reconnaissable à sa façade ondulante, ses mosaïques et son toit évoquant un dragon.', en: 'A Modernista house transformed by Gaudí, recognisable by its undulating façade, mosaics and dragon-like roof.' },
    highlights: [{ fr: 'Façade en trencadís', en: 'Trencadís façade' }, { fr: 'Toit du dragon', en: 'Dragon roof' }], suggestedDurationMinutes: 90, latitude: 41.3917, longitude: 2.1649, website: 'https://www.casabatllo.es/en/', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-la-pedrera', cityId: 'barcelona', category: 'historic', image: require('../../../assets/offline-pois/barcelona/la-pedrera.webp'), imageCredit: CREDIT,
    name: { fr: 'Casa Milà — La Pedrera', en: 'Casa Milà — La Pedrera' }, address: { fr: 'Passeig de Gràcia 92, 08008 Barcelone, Espagne', en: 'Passeig de Gràcia 92, 08008 Barcelona, Spain' },
    description: { fr: 'Immeuble moderniste de Gaudí aux façades de pierre ondulées, cours intérieures et terrasse de cheminées sculpturales.', en: 'Gaudí’s Modernista apartment building with wave-like stone façades, inner courtyards and a rooftop of sculptural chimneys.' },
    highlights: [{ fr: 'Terrasse des guerriers', en: 'Warrior rooftop' }, { fr: 'Cours intérieures', en: 'Inner courtyards' }], suggestedDurationMinutes: 90, latitude: 41.3954, longitude: 2.1619, website: 'https://www.lapedrera.com/en', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-gothic-quarter', cityId: 'barcelona', category: 'historic', image: require('../../../assets/offline-pois/barcelona/gothic-quarter.webp'), imageCredit: CREDIT,
    name: { fr: 'Quartier gothique', en: 'Gothic Quarter' }, address: { fr: 'Plaça de Sant Jaume, 08002 Barcelone, Espagne', en: 'Plaça de Sant Jaume, 08002 Barcelona, Spain' },
    description: { fr: 'Cœur ancien de Barcelone, parcouru de ruelles médiévales, places historiques et vestiges de la cité romaine.', en: 'Barcelona’s old heart, crossed by medieval lanes, historic squares and remains of the Roman city.' },
    highlights: [{ fr: 'Plaça del Rei', en: 'Plaça del Rei' }, { fr: 'Ruelles médiévales', en: 'Medieval lanes' }], suggestedDurationMinutes: 150, latitude: 41.3827, longitude: 2.1769, sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-cathedral', cityId: 'barcelona', category: 'religious', image: require('../../../assets/offline-pois/barcelona/cathedral.webp'), imageCredit: CREDIT,
    name: { fr: 'Cathédrale de Barcelone', en: 'Barcelona Cathedral' }, address: { fr: 'Pla de la Seu, 08002 Barcelone, Espagne', en: 'Pla de la Seu, 08002 Barcelona, Spain' },
    description: { fr: 'Cathédrale gothique dédiée à sainte Eulalie, dotée d’un cloître planté de palmiers où vivent traditionnellement treize oies.', en: 'A Gothic cathedral dedicated to Saint Eulalia, with a palm-filled cloister traditionally home to thirteen geese.' },
    highlights: [{ fr: 'Cloître gothique', en: 'Gothic cloister' }, { fr: 'Toits panoramiques', en: 'Panoramic rooftops' }], suggestedDurationMinutes: 75, latitude: 41.3839, longitude: 2.1763, website: 'https://catedralbcn.org/en/', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-palau-musica', cityId: 'barcelona', category: 'landmark', image: require('../../../assets/offline-pois/barcelona/palau-musica.webp'), imageCredit: CREDIT,
    name: { fr: 'Palais de la musique catalane', en: 'Palau de la Música Catalana' }, address: { fr: 'Carrer del Palau de la Música 4-6, 08003 Barcelone, Espagne', en: 'Carrer del Palau de la Música 4-6, 08003 Barcelona, Spain' },
    description: { fr: 'Salle de concert moderniste de Lluís Domènech i Montaner, riche en mosaïques, sculptures et lumière naturelle.', en: 'A Modernista concert hall by Lluís Domènech i Montaner, rich in mosaics, sculpture and natural light.' },
    highlights: [{ fr: 'Verrière inversée', en: 'Inverted stained-glass skylight' }, { fr: 'Décor moderniste', en: 'Modernista decoration' }], suggestedDurationMinutes: 75, latitude: 41.3876, longitude: 2.1753, website: 'https://www.palaumusica.cat/en', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-picasso-museum', cityId: 'barcelona', category: 'museum', image: require('../../../assets/offline-pois/barcelona/picasso-museum.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée Picasso de Barcelone', en: 'Picasso Museum Barcelona' }, address: { fr: 'Carrer de Montcada 15-23, 08003 Barcelone, Espagne', en: 'Carrer de Montcada 15-23, 08003 Barcelona, Spain' },
    description: { fr: 'Musée installé dans cinq palais médiévaux, particulièrement riche sur les années de formation de Pablo Picasso.', en: 'A museum housed in five medieval palaces, especially rich in works from Pablo Picasso’s formative years.' },
    highlights: [{ fr: 'Série des Ménines', en: 'Las Meninas series' }, { fr: 'Palais de la rue Montcada', en: 'Montcada Street palaces' }], suggestedDurationMinutes: 120, latitude: 41.3853, longitude: 2.1809, website: 'https://museupicassobcn.cat/en', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-mnac', cityId: 'barcelona', category: 'museum', image: require('../../../assets/offline-pois/barcelona/mnac.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée national d’art de Catalogne', en: 'National Art Museum of Catalonia' }, address: { fr: 'Palau Nacional, Parc de Montjuïc, 08038 Barcelone, Espagne', en: 'Palau Nacional, Parc de Montjuïc, 08038 Barcelona, Spain' },
    description: { fr: 'Musée du Palau Nacional présentant mille ans d’art catalan, dont un ensemble majeur de peintures murales romanes.', en: 'A museum in the Palau Nacional presenting a thousand years of Catalan art, including a major collection of Romanesque murals.' },
    highlights: [{ fr: 'Art roman catalan', en: 'Catalan Romanesque art' }, { fr: 'Vue depuis Montjuïc', en: 'View from Montjuïc' }], suggestedDurationMinutes: 180, latitude: 41.3684, longitude: 2.1536, website: 'https://www.museunacional.cat/en', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-montjuic-castle', cityId: 'barcelona', category: 'historic', image: require('../../../assets/offline-pois/barcelona/montjuic-castle.webp'), imageCredit: CREDIT,
    name: { fr: 'Château de Montjuïc', en: 'Montjuïc Castle' }, address: { fr: 'Carretera de Montjuïc 66, 08038 Barcelone, Espagne', en: 'Carretera de Montjuïc 66, 08038 Barcelona, Spain' },
    description: { fr: 'Forteresse dominant le port au sommet de Montjuïc, retraçant plusieurs siècles d’histoire militaire et urbaine.', en: 'A fortress overlooking the harbour from Montjuïc, tracing several centuries of military and urban history.' },
    highlights: [{ fr: 'Remparts et bastions', en: 'Ramparts and bastions' }, { fr: 'Panorama sur le port', en: 'Harbour panorama' }], suggestedDurationMinutes: 120, latitude: 41.3632, longitude: 2.1661, sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-boqueria', cityId: 'barcelona', category: 'historic', image: require('../../../assets/offline-pois/barcelona/boqueria.webp'), imageCredit: CREDIT,
    name: { fr: 'Marché de la Boqueria', en: 'La Boqueria Market' }, address: { fr: 'La Rambla 91, 08001 Barcelone, Espagne', en: 'La Rambla 91, 08001 Barcelona, Spain' },
    description: { fr: 'Marché couvert historique de la Rambla réunissant étals de produits frais, spécialités catalanes et comptoirs de cuisine.', en: 'A historic covered market on La Rambla with fresh produce, Catalan specialities and food counters.' },
    highlights: [{ fr: 'Verrière métallique', en: 'Iron entrance canopy' }, { fr: 'Produits catalans', en: 'Catalan produce' }], suggestedDurationMinutes: 75, latitude: 41.3817, longitude: 2.1716, website: 'https://www.boqueria.barcelona/home', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-santa-maria-mar', cityId: 'barcelona', category: 'religious', image: require('../../../assets/offline-pois/barcelona/santa-maria-mar.webp'), imageCredit: CREDIT,
    name: { fr: 'Basilique Sainte-Marie-de-la-Mer', en: 'Santa Maria del Mar' }, address: { fr: 'Plaça de Santa Maria 1, 08003 Barcelone, Espagne', en: 'Plaça de Santa Maria 1, 08003 Barcelona, Spain' },
    description: { fr: 'Basilique gothique catalane du quartier de la Ribera, remarquable par l’unité de sa nef et la sobriété de ses volumes.', en: 'A Catalan Gothic basilica in La Ribera, notable for the unity of its nave and the restraint of its volumes.' },
    highlights: [{ fr: 'Grande nef gothique', en: 'Vast Gothic nave' }, { fr: 'Terrasses et tours', en: 'Terraces and towers' }], suggestedDurationMinutes: 60, latitude: 41.3839, longitude: 2.1821, sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-sant-pau', cityId: 'barcelona', category: 'historic', image: require('../../../assets/offline-pois/barcelona/sant-pau.webp'), imageCredit: CREDIT,
    name: { fr: 'Enceinte moderniste de Sant Pau', en: 'Sant Pau Art Nouveau Site' }, address: { fr: 'Carrer de Sant Antoni Maria Claret 167, 08025 Barcelone, Espagne', en: 'Carrer de Sant Antoni Maria Claret 167, 08025 Barcelona, Spain' },
    description: { fr: 'Ancien complexe hospitalier moderniste de Domènech i Montaner, composé de pavillons, jardins et galeries souterraines.', en: 'A former Modernista hospital complex by Domènech i Montaner, formed by pavilions, gardens and underground galleries.' },
    highlights: [{ fr: 'Pavillons modernistes', en: 'Modernista pavilions' }, { fr: 'Galeries souterraines', en: 'Underground galleries' }], suggestedDurationMinutes: 120, latitude: 41.4113, longitude: 2.1744, website: 'https://santpaubarcelona.org/en/', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-barceloneta', cityId: 'barcelona', category: 'park', image: require('../../../assets/offline-pois/barcelona/barceloneta.webp'), imageCredit: CREDIT,
    name: { fr: 'Plage de la Barceloneta', en: 'Barceloneta Beach' }, address: { fr: 'Passeig Marítim de la Barceloneta, 08003 Barcelone, Espagne', en: 'Passeig Marítim de la Barceloneta, 08003 Barcelona, Spain' },
    description: { fr: 'Plage urbaine bordée d’une large promenade, proche de l’ancien quartier de pêcheurs de la Barceloneta.', en: 'An urban beach with a broad seafront promenade beside the former fishing district of Barceloneta.' },
    highlights: [{ fr: 'Promenade maritime', en: 'Seafront promenade' }, { fr: 'Vue sur la Méditerranée', en: 'Mediterranean views' }], suggestedDurationMinutes: 120, latitude: 41.3784, longitude: 2.1925, sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-miro-foundation', cityId: 'barcelona', category: 'museum', image: require('../../../assets/offline-pois/barcelona/miro-foundation.webp'), imageCredit: CREDIT,
    name: { fr: 'Fondation Joan Miró', en: 'Fundació Joan Miró' }, address: { fr: 'Parc de Montjuïc, 08038 Barcelone, Espagne', en: 'Parc de Montjuïc, 08038 Barcelona, Spain' },
    description: { fr: 'Musée lumineux conçu par Josep Lluís Sert pour présenter l’œuvre de Joan Miró et soutenir la création contemporaine.', en: 'A light-filled museum designed by Josep Lluís Sert to present Joan Miró’s work and support contemporary creation.' },
    highlights: [{ fr: 'Collection Joan Miró', en: 'Joan Miró collection' }, { fr: 'Architecture de Josep Lluís Sert', en: 'Josep Lluís Sert architecture' }], suggestedDurationMinutes: 120, latitude: 41.3686, longitude: 2.1598, website: 'https://www.fmirobcn.org/en/', sourceUrl: SOURCE,
  },
];

export const BARCELONA_POIS: OfflinePOI[] = seeds.map(createSpanishPOI);
