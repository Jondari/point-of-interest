import type { OfflinePOI } from '../../../types/offlinePoi';
import { createSpanishPOI, type SpanishPOISeed } from './helpers';

const SOURCE = 'https://www.bilbaoturismo.net/BilbaoTurismo/en/tourists';
const CREDIT = 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md';

const seeds: SpanishPOISeed[] = [
  {
    id: 'bilbao-guggenheim', cityId: 'bilbao', category: 'museum', image: require('../../../assets/offline-pois/bilbao/guggenheim.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée Guggenheim Bilbao', en: 'Guggenheim Museum Bilbao' }, address: { fr: 'Avenida Abandoibarra 2, 48009 Bilbao, Espagne', en: 'Avenida Abandoibarra 2, 48009 Bilbao, Spain' },
    description: { fr: 'Musée d’art moderne et contemporain installé dans le bâtiment de titane dessiné par Frank Gehry au bord de la ria.', en: 'A modern and contemporary art museum housed in Frank Gehry’s titanium building beside the estuary.' },
    highlights: [{ fr: 'Architecture de Frank Gehry', en: 'Frank Gehry architecture' }, { fr: 'Puppy et Maman', en: 'Puppy and Maman' }], suggestedDurationMinutes: 180, latitude: 43.2687, longitude: -2.934, website: 'https://www.guggenheim-bilbao.eus/en', sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-casco-viejo', cityId: 'bilbao', category: 'historic', image: require('../../../assets/offline-pois/bilbao/casco-viejo.webp'), imageCredit: CREDIT,
    name: { fr: 'Casco Viejo — les Sept Rues', en: 'Casco Viejo — Seven Streets' }, address: { fr: 'Plaza Nueva, 48005 Bilbao, Espagne', en: 'Plaza Nueva, 48005 Bilbao, Spain' },
    description: { fr: 'Noyau médiéval de Bilbao organisé autour des Sept Rues, avec places, commerces historiques et nombreux bars à pintxos.', en: 'Bilbao’s medieval core centred on the Seven Streets, with squares, historic shops and numerous pintxo bars.' },
    highlights: [{ fr: 'Siete Calles', en: 'Seven Streets' }, { fr: 'Commerces et pintxos', en: 'Shops and pintxos' }], suggestedDurationMinutes: 150, latitude: 43.2569, longitude: -2.9236, sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-ribera-market', cityId: 'bilbao', category: 'historic', image: require('../../../assets/offline-pois/bilbao/ribera-market.webp'), imageCredit: CREDIT,
    name: { fr: 'Marché de la Ribera', en: 'Ribera Market' }, address: { fr: 'Erribera Kalea 22 bis, 48005 Bilbao, Espagne', en: 'Erribera Kalea 22 bis, 48005 Bilbao, Spain' },
    description: { fr: 'Grand marché couvert Art déco sur les berges de la ria, consacré aux produits frais et à la gastronomie basque.', en: 'A large Art Deco covered market on the estuary, devoted to fresh produce and Basque cuisine.' },
    highlights: [{ fr: 'Vitraux Art déco', en: 'Art Deco stained glass' }, { fr: 'Produits basques', en: 'Basque produce' }], suggestedDurationMinutes: 75, latitude: 43.2545, longitude: -2.9249, website: 'https://www.mercadodelaribera.biz/', sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-santiago-cathedral', cityId: 'bilbao', category: 'religious', image: require('../../../assets/offline-pois/bilbao/santiago-cathedral.webp'), imageCredit: CREDIT,
    name: { fr: 'Cathédrale de Santiago', en: 'Santiago Cathedral' }, address: { fr: 'Done Jakue Plazatxoa 1, 48005 Bilbao, Espagne', en: 'Done Jakue Plazatxoa 1, 48005 Bilbao, Spain' },
    description: { fr: 'Cathédrale gothique du Casco Viejo dédiée à saint Jacques, étape du chemin côtier de Saint-Jacques-de-Compostelle.', en: 'A Gothic cathedral in the old town dedicated to Saint James, on the coastal Camino de Santiago route.' },
    highlights: [{ fr: 'Cloître gothique', en: 'Gothic cloister' }, { fr: 'Puerta del Ángel', en: 'Puerta del Ángel' }], suggestedDurationMinutes: 60, latitude: 43.2568, longitude: -2.9239, sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-arriaga', cityId: 'bilbao', category: 'landmark', image: require('../../../assets/offline-pois/bilbao/arriaga.webp'), imageCredit: CREDIT,
    name: { fr: 'Théâtre Arriaga', en: 'Arriaga Theatre' }, address: { fr: 'Arriaga Plaza 1, 48005 Bilbao, Espagne', en: 'Arriaga Plaza 1, 48005 Bilbao, Spain' },
    description: { fr: 'Théâtre néobaroque de la fin du XIXe siècle portant le nom du compositeur bilbaïno Juan Crisóstomo de Arriaga.', en: 'A late-19th-century Neo-Baroque theatre named after Bilbao composer Juan Crisóstomo de Arriaga.' },
    highlights: [{ fr: 'Façade néobaroque', en: 'Neo-Baroque façade' }, { fr: 'Salle historique', en: 'Historic auditorium' }], suggestedDurationMinutes: 60, latitude: 43.2593, longitude: -2.925, website: 'https://www.teatroarriaga.eus/', sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-fine-arts', cityId: 'bilbao', category: 'museum', image: require('../../../assets/offline-pois/bilbao/fine-arts.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée des Beaux-Arts de Bilbao', en: 'Bilbao Fine Arts Museum' }, address: { fr: 'Museo Plaza 2, 48009 Bilbao, Espagne', en: 'Museo Plaza 2, 48009 Bilbao, Spain' },
    description: { fr: 'Musée réunissant art ancien, moderne, basque et européen, au sein du parc Doña Casilda.', en: 'A museum bringing together old, modern, Basque and European art within Doña Casilda Park.' },
    highlights: [{ fr: 'Art basque', en: 'Basque art' }, { fr: 'Maîtres européens', en: 'European masters' }], suggestedDurationMinutes: 150, latitude: 43.265, longitude: -2.9378, website: 'https://bilbaomuseoa.eus/en/', sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-azkuna-zentroa', cityId: 'bilbao', category: 'landmark', image: require('../../../assets/offline-pois/bilbao/azkuna-zentroa.webp'), imageCredit: CREDIT,
    name: { fr: 'Azkuna Zentroa — Alhóndiga', en: 'Azkuna Zentroa — Alhóndiga' }, address: { fr: 'Arriquíbar Plaza 4, 48010 Bilbao, Espagne', en: 'Arriquíbar Plaza 4, 48010 Bilbao, Spain' },
    description: { fr: 'Ancien entrepôt à vins transformé en centre culturel par Philippe Starck, célèbre pour ses colonnes monumentales variées.', en: 'A former wine warehouse transformed into a cultural centre by Philippe Starck, known for its varied monumental columns.' },
    highlights: [{ fr: '43 colonnes sculptées', en: '43 sculpted columns' }, { fr: 'Piscine suspendue', en: 'Suspended swimming pool' }], suggestedDurationMinutes: 90, latitude: 43.2595, longitude: -2.9369, website: 'https://www.azkunazentroa.eus/en/', sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-artxanda', cityId: 'bilbao', category: 'park', image: require('../../../assets/offline-pois/bilbao/artxanda.webp'), imageCredit: CREDIT,
    name: { fr: 'Mont Artxanda et funiculaire', en: 'Mount Artxanda and Funicular' }, address: { fr: 'Funikularreko Plaza, 48007 Bilbao, Espagne', en: 'Funikularreko Plaza, 48007 Bilbao, Spain' },
    description: { fr: 'Belvédère accessible en funiculaire offrant une vue étendue sur Bilbao, les collines et les méandres de la ria.', en: 'A viewpoint reached by funicular with broad views over Bilbao, the surrounding hills and the winding estuary.' },
    highlights: [{ fr: 'Funiculaire historique', en: 'Historic funicular' }, { fr: 'Panorama sur Bilbao', en: 'Bilbao panorama' }], suggestedDurationMinutes: 90, latitude: 43.2756, longitude: -2.9201, sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-zubizuri', cityId: 'bilbao', category: 'landmark', image: require('../../../assets/offline-pois/bilbao/zubizuri.webp'), imageCredit: CREDIT,
    name: { fr: 'Pont Zubizuri', en: 'Zubizuri Bridge' }, address: { fr: 'Zubizuri, 48001 Bilbao, Espagne', en: 'Zubizuri, 48001 Bilbao, Spain' },
    description: { fr: 'Passerelle piétonne blanche conçue par Santiago Calatrava, reliant les deux rives de la ria près du centre.', en: 'A white pedestrian bridge designed by Santiago Calatrava, linking the two banks of the estuary near the centre.' },
    highlights: [{ fr: 'Arc blanc emblématique', en: 'Iconic white arch' }, { fr: 'Promenade le long de la ria', en: 'Estuary promenade' }], suggestedDurationMinutes: 30, latitude: 43.2666, longitude: -2.9278, sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-san-mames', cityId: 'bilbao', category: 'landmark', image: require('../../../assets/offline-pois/bilbao/san-mames.webp'), imageCredit: CREDIT,
    name: { fr: 'Stade San Mamés', en: 'San Mamés Stadium' }, address: { fr: 'Rafael Moreno Pitxitxi Kalea, 48013 Bilbao, Espagne', en: 'Rafael Moreno Pitxitxi Kalea, 48013 Bilbao, Spain' },
    description: { fr: 'Stade de l’Athletic Club surnommé la Cathédrale, doté d’un musée consacré à l’histoire du club basque.', en: 'Athletic Club’s stadium, nicknamed the Cathedral, with a museum devoted to the Basque club’s history.' },
    highlights: [{ fr: 'Musée de l’Athletic Club', en: 'Athletic Club Museum' }, { fr: 'Architecture lumineuse', en: 'Illuminated architecture' }], suggestedDurationMinutes: 120, latitude: 43.2642, longitude: -2.9494, website: 'https://sanmames.athletic-club.eus/en/', sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-itsasmuseum', cityId: 'bilbao', category: 'museum', image: require('../../../assets/offline-pois/bilbao/itsasmuseum.webp'), imageCredit: CREDIT,
    name: { fr: 'Itsasmuseum Bilbao', en: 'Itsasmuseum Bilbao' }, address: { fr: 'Ramón de la Sota Kaia 1, 48013 Bilbao, Espagne', en: 'Ramón de la Sota Kaia 1, 48013 Bilbao, Spain' },
    description: { fr: 'Musée maritime installé sur les anciens quais d’Euskalduna, consacré à la ria, aux chantiers navals et à la culture maritime.', en: 'A maritime museum on the former Euskalduna docks, devoted to the estuary, shipyards and maritime culture.' },
    highlights: [{ fr: 'Docks historiques', en: 'Historic docks' }, { fr: 'Bateaux et patrimoine industriel', en: 'Boats and industrial heritage' }], suggestedDurationMinutes: 120, latitude: 43.2666, longitude: -2.9465, website: 'https://itsasmuseum.eus/en/', sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-dona-casilda', cityId: 'bilbao', category: 'park', image: require('../../../assets/offline-pois/bilbao/dona-casilda.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc Doña Casilda Iturrizar', en: 'Doña Casilda Iturrizar Park' }, address: { fr: 'Paseo de Don José Anselmo Clavé, 48009 Bilbao, Espagne', en: 'Paseo de Don José Anselmo Clavé, 48009 Bilbao, Spain' },
    description: { fr: 'Jardin urbain historique avec étang, pergola, fontaines et grands arbres au cœur de l’Ensanche.', en: 'A historic urban garden with a pond, pergola, fountains and mature trees in the heart of the Ensanche.' },
    highlights: [{ fr: 'Étang aux canards', en: 'Duck pond' }, { fr: 'Pergola et fontaines', en: 'Pergola and fountains' }], suggestedDurationMinutes: 75, latitude: 43.2654, longitude: -2.9402, sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-plaza-nueva', cityId: 'bilbao', category: 'historic', image: require('../../../assets/offline-pois/bilbao/plaza-nueva.webp'), imageCredit: CREDIT,
    name: { fr: 'Plaza Nueva', en: 'Plaza Nueva' }, address: { fr: 'Plaza Nueva, 48005 Bilbao, Espagne', en: 'Plaza Nueva, 48005 Bilbao, Spain' },
    description: { fr: 'Place néoclassique à arcades du Casco Viejo, entourée de cafés et connue pour son marché dominical.', en: 'A Neoclassical arcaded square in the old town, lined with cafés and known for its Sunday market.' },
    highlights: [{ fr: 'Arcades néoclassiques', en: 'Neoclassical arcades' }, { fr: 'Bars à pintxos', en: 'Pintxo bars' }], suggestedDurationMinutes: 60, latitude: 43.2592, longitude: -2.9228, sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-begona', cityId: 'bilbao', category: 'religious', image: require('../../../assets/offline-pois/bilbao/begona.webp'), imageCredit: CREDIT,
    name: { fr: 'Basilique de Begoña', en: 'Basilica of Begoña' }, address: { fr: 'Begoñako Andra Maria Kalea 38, 48006 Bilbao, Espagne', en: 'Begoñako Andra Maria Kalea 38, 48006 Bilbao, Spain' },
    description: { fr: 'Sanctuaire dominant la vieille ville, dédié à la Vierge de Begoña, patronne de Biscaye.', en: 'A sanctuary overlooking the old town, dedicated to the Virgin of Begoña, patron saint of Biscay.' },
    highlights: [{ fr: 'Vierge de Begoña', en: 'Virgin of Begoña' }, { fr: 'Vue sur la ville', en: 'View over the city' }], suggestedDurationMinutes: 60, latitude: 43.2589, longitude: -2.9139, sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-euskalduna', cityId: 'bilbao', category: 'landmark', image: require('../../../assets/offline-pois/bilbao/euskalduna.webp'), imageCredit: CREDIT,
    name: { fr: 'Palais Euskalduna', en: 'Euskalduna Conference Centre' }, address: { fr: 'Avenida Abandoibarra 4, 48011 Bilbao, Espagne', en: 'Avenida Abandoibarra 4, 48011 Bilbao, Spain' },
    description: { fr: 'Centre de congrès et de spectacles construit sur les anciens chantiers navals, évoquant un navire en construction.', en: 'A conference and performing arts centre built on former shipyards, evoking a vessel under construction.' },
    highlights: [{ fr: 'Architecture industrielle contemporaine', en: 'Contemporary industrial architecture' }, { fr: 'Berges réaménagées', en: 'Regenerated riverfront' }], suggestedDurationMinutes: 60, latitude: 43.267, longitude: -2.9448, website: 'https://www.euskaldunabilbao.com/en/', sourceUrl: SOURCE,
  },
];

export const BILBAO_POIS: OfflinePOI[] = seeds.map(createSpanishPOI);
