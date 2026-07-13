import type { OfflinePOI } from '../../../types/offlinePoi';
import { createSpanishPOI, type SpanishPOISeed } from './helpers';

const SOURCE = 'https://www.barcelonaturisme.com/wv3/en/';
const CREDIT = 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md';

const seeds: SpanishPOISeed[] = [
  {
    id: 'barcelona-sagrada-familia', cityId: 'barcelona', category: 'religious', image: require('../../../assets/offline-pois/barcelona/sagrada-familia.webp'), imageCredit: CREDIT,
    name: { fr: 'Sagrada Família', en: 'Sagrada Família', zh: '圣家堂' }, address: { fr: 'Carrer de Mallorca 401, 08013 Barcelone, Espagne', en: 'Carrer de Mallorca 401, 08013 Barcelona, Spain', zh: 'Carrer de Mallorca 401, 08013 巴塞罗那, 西班牙' },
    description: { fr: 'Basilique conçue par Antoni Gaudí, célèbre pour ses façades sculptées, ses tours et son intérieur inspiré d’une forêt.', en: 'A basilica designed by Antoni Gaudí, renowned for its sculpted façades, towers and forest-inspired interior.', zh: '由安东尼·高迪设计的大教堂，以其雕刻的外墙、塔楼和森林风格的内饰而闻名。' },
    highlights: [{ fr: 'Façades de la Nativité et de la Passion', en: 'Nativity and Passion façades', zh: '耶稣诞生和受难立面' }, { fr: 'Colonnes arborescentes', en: 'Tree-like columns', zh: '树状列' }], suggestedDurationMinutes: 150, latitude: 41.4036, longitude: 2.1744, website: 'https://sagradafamilia.org/en/', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-park-guell', cityId: 'barcelona', category: 'park', image: require('../../../assets/offline-pois/barcelona/park-guell.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc Güell', en: 'Park Güell', zh: '桂尔公园' }, address: { fr: 'Carrer d’Olot 5, 08024 Barcelone, Espagne', en: 'Carrer d’Olot 5, 08024 Barcelona, Spain', zh: 'Carrer d’Olot 5, 08024 巴塞罗那, 西班牙' },
    description: { fr: 'Parc paysager de Gaudí associant architecture organique, mosaïques colorées et vues sur Barcelone.', en: 'Gaudí’s landscaped park combining organic architecture, colourful mosaics and views over Barcelona.', zh: '高迪的景观公园结合了有机建筑、色彩缤纷的马赛克和巴塞罗那的景色。' },
    highlights: [{ fr: 'Escalier du Dragon', en: 'Dragon Stairway', zh: '龙之阶梯' }, { fr: 'Banc ondulé en mosaïque', en: 'Serpentine mosaic bench', zh: '蛇纹石马赛克长凳' }], suggestedDurationMinutes: 120, latitude: 41.4145, longitude: 2.1527, website: 'https://parkguell.barcelona/en', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-casa-batllo', cityId: 'barcelona', category: 'historic', image: require('../../../assets/offline-pois/barcelona/casa-batllo.webp'), imageCredit: CREDIT,
    name: { fr: 'Casa Batlló', en: 'Casa Batlló', zh: '巴特罗之家' }, address: { fr: 'Passeig de Gràcia 43, 08007 Barcelone, Espagne', en: 'Passeig de Gràcia 43, 08007 Barcelona, Spain', zh: 'Passeig de Gràcia 43, 08007 巴塞罗那, 西班牙' },
    description: { fr: 'Maison moderniste transformée par Gaudí, reconnaissable à sa façade ondulante, ses mosaïques et son toit évoquant un dragon.', en: 'A Modernista house transformed by Gaudí, recognisable by its undulating façade, mosaics and dragon-like roof.', zh: '由高迪改造的现代主义房屋，以其起伏的外观、马赛克和龙形屋顶而闻名。' },
    highlights: [{ fr: 'Façade en trencadís', en: 'Trencadís façade', zh: '特伦卡迪的外观' }, { fr: 'Toit du dragon', en: 'Dragon roof', zh: '龙顶' }], suggestedDurationMinutes: 90, latitude: 41.3917, longitude: 2.1649, website: 'https://www.casabatllo.es/en/', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-la-pedrera', cityId: 'barcelona', category: 'historic', image: require('../../../assets/offline-pois/barcelona/la-pedrera.webp'), imageCredit: CREDIT,
    name: { fr: 'Casa Milà — La Pedrera', en: 'Casa Milà — La Pedrera', zh: '米拉之家 — 米拉之家' }, address: { fr: 'Passeig de Gràcia 92, 08008 Barcelone, Espagne', en: 'Passeig de Gràcia 92, 08008 Barcelona, Spain', zh: 'Passeig de Gràcia 92, 08008 巴塞罗那, 西班牙' },
    description: { fr: 'Immeuble moderniste de Gaudí aux façades de pierre ondulées, cours intérieures et terrasse de cheminées sculpturales.', en: 'Gaudí’s Modernista apartment building with wave-like stone façades, inner courtyards and a rooftop of sculptural chimneys.', zh: '高迪的现代主义公寓楼拥有波浪状的石头外墙、内部庭院和雕塑烟囱的屋顶。' },
    highlights: [{ fr: 'Terrasse des guerriers', en: 'Warrior rooftop', zh: '战士屋顶' }, { fr: 'Cours intérieures', en: 'Inner courtyards', zh: '内部庭院' }], suggestedDurationMinutes: 90, latitude: 41.3954, longitude: 2.1619, website: 'https://www.lapedrera.com/en', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-gothic-quarter', cityId: 'barcelona', category: 'historic', image: require('../../../assets/offline-pois/barcelona/gothic-quarter.webp'), imageCredit: CREDIT,
    name: { fr: 'Quartier gothique', en: 'Gothic Quarter', zh: '哥特区' }, address: { fr: 'Plaça de Sant Jaume, 08002 Barcelone, Espagne', en: 'Plaça de Sant Jaume, 08002 Barcelona, Spain', zh: 'Plaça de Sant Jaume, 08002 巴塞罗那, 西班牙' },
    description: { fr: 'Cœur ancien de Barcelone, parcouru de ruelles médiévales, places historiques et vestiges de la cité romaine.', en: 'Barcelona’s old heart, crossed by medieval lanes, historic squares and remains of the Roman city.', zh: '巴塞罗那的古老心脏，中世纪的小巷、历史悠久的广场和罗马城市的遗迹穿过。' },
    highlights: [{ fr: 'Plaça del Rei', en: 'Plaça del Rei', zh: '国王广场' }, { fr: 'Ruelles médiévales', en: 'Medieval lanes', zh: '中世纪小巷' }], suggestedDurationMinutes: 150, latitude: 41.3827, longitude: 2.1769, sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-cathedral', cityId: 'barcelona', category: 'religious', image: require('../../../assets/offline-pois/barcelona/cathedral.webp'), imageCredit: CREDIT,
    name: { fr: 'Cathédrale de Barcelone', en: 'Barcelona Cathedral', zh: '巴塞罗那大教堂' }, address: { fr: 'Pla de la Seu, 08002 Barcelone, Espagne', en: 'Pla de la Seu, 08002 Barcelona, Spain', zh: 'Pla de la Seu, 08002 巴塞罗那, 西班牙' },
    description: { fr: 'Cathédrale gothique dédiée à sainte Eulalie, dotée d’un cloître planté de palmiers où vivent traditionnellement treize oies.', en: 'A Gothic cathedral dedicated to Saint Eulalia, with a palm-filled cloister traditionally home to thirteen geese.', zh: '一座献给圣尤拉莉亚的哥特式大教堂，有一个种满棕榈树的回廊，传统上是十三只鹅的家。' },
    highlights: [{ fr: 'Cloître gothique', en: 'Gothic cloister', zh: '哥特式回廊' }, { fr: 'Toits panoramiques', en: 'Panoramic rooftops', zh: '全景屋顶' }], suggestedDurationMinutes: 75, latitude: 41.3839, longitude: 2.1763, website: 'https://catedralbcn.org/en/', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-palau-musica', cityId: 'barcelona', category: 'landmark', image: require('../../../assets/offline-pois/barcelona/palau-musica.webp'), imageCredit: CREDIT,
    name: { fr: 'Palais de la musique catalane', en: 'Palau de la Música Catalana', zh: '加泰罗尼亚音乐宫' }, address: { fr: 'Carrer del Palau de la Música 4-6, 08003 Barcelone, Espagne', en: 'Carrer del Palau de la Música 4-6, 08003 Barcelona, Spain', zh: 'Carrer del Palau de la Música 4-6, 08003 巴塞罗那, 西班牙' },
    description: { fr: 'Salle de concert moderniste de Lluís Domènech i Montaner, riche en mosaïques, sculptures et lumière naturelle.', en: 'A Modernista concert hall by Lluís Domènech i Montaner, rich in mosaics, sculpture and natural light.', zh: 'Lluís Domènech i Montaner 设计的现代主义音乐厅，充满马赛克、雕塑和自然光。' },
    highlights: [{ fr: 'Verrière inversée', en: 'Inverted stained-glass skylight', zh: '倒置的彩色玻璃天窗' }, { fr: 'Décor moderniste', en: 'Modernista decoration', zh: '现代主义装饰' }], suggestedDurationMinutes: 75, latitude: 41.3876, longitude: 2.1753, website: 'https://www.palaumusica.cat/en', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-picasso-museum', cityId: 'barcelona', category: 'museum', image: require('../../../assets/offline-pois/barcelona/picasso-museum.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée Picasso de Barcelone', en: 'Picasso Museum Barcelona', zh: '巴塞罗那毕加索博物馆' }, address: { fr: 'Carrer de Montcada 15-23, 08003 Barcelone, Espagne', en: 'Carrer de Montcada 15-23, 08003 Barcelona, Spain', zh: 'Carrer de Montcada 15-23, 08003 巴塞罗那, 西班牙' },
    description: { fr: 'Musée installé dans cinq palais médiévaux, particulièrement riche sur les années de formation de Pablo Picasso.', en: 'A museum housed in five medieval palaces, especially rich in works from Pablo Picasso’s formative years.', zh: '博物馆位于五座中世纪宫殿内，尤其藏有巴勃罗·毕加索成长时期的丰富作品。' },
    highlights: [{ fr: 'Série des Ménines', en: 'Las Meninas series', zh: '宫娥系列' }, { fr: 'Palais de la rue Montcada', en: 'Montcada Street palaces', zh: '蒙卡达街宫殿' }], suggestedDurationMinutes: 120, latitude: 41.3853, longitude: 2.1809, website: 'https://museupicassobcn.cat/en', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-mnac', cityId: 'barcelona', category: 'museum', image: require('../../../assets/offline-pois/barcelona/mnac.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée national d’art de Catalogne', en: 'National Art Museum of Catalonia', zh: '加泰罗尼亚国家艺术博物馆' }, address: { fr: 'Palau Nacional, Parc de Montjuïc, 08038 Barcelone, Espagne', en: 'Palau Nacional, Parc de Montjuïc, 08038 Barcelona, Spain', zh: '国家宫，蒙特惠奇山公园，08038 巴塞罗那，西班牙' },
    description: { fr: 'Musée du Palau Nacional présentant mille ans d’art catalan, dont un ensemble majeur de peintures murales romanes.', en: 'A museum in the Palau Nacional presenting a thousand years of Catalan art, including a major collection of Romanesque murals.', zh: '帕劳国家博物馆展示一千年的加泰罗尼亚艺术，包括大量罗马式壁画收藏。' },
    highlights: [{ fr: 'Art roman catalan', en: 'Catalan Romanesque art', zh: '加泰罗尼亚罗马式艺术' }, { fr: 'Vue depuis Montjuïc', en: 'View from Montjuïc', zh: '蒙特惠奇山景观' }], suggestedDurationMinutes: 180, latitude: 41.3684, longitude: 2.1536, website: 'https://www.museunacional.cat/en', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-montjuic-castle', cityId: 'barcelona', category: 'historic', image: require('../../../assets/offline-pois/barcelona/montjuic-castle.webp'), imageCredit: CREDIT,
    name: { fr: 'Château de Montjuïc', en: 'Montjuïc Castle', zh: '蒙特惠奇山城堡' }, address: { fr: 'Carretera de Montjuïc 66, 08038 Barcelone, Espagne', en: 'Carretera de Montjuïc 66, 08038 Barcelona, Spain', zh: 'Carretera de Montjuïc 66, 08038 巴塞罗那, 西班牙' },
    description: { fr: 'Forteresse dominant le port au sommet de Montjuïc, retraçant plusieurs siècles d’histoire militaire et urbaine.', en: 'A fortress overlooking the harbour from Montjuïc, tracing several centuries of military and urban history.', zh: '从蒙特惠奇山俯瞰海港的堡垒，追溯了几个世纪的军事和城市历史。' },
    highlights: [{ fr: 'Remparts et bastions', en: 'Ramparts and bastions', zh: '城墙和堡垒' }, { fr: 'Panorama sur le port', en: 'Harbour panorama', zh: '港口全景' }], suggestedDurationMinutes: 120, latitude: 41.3632, longitude: 2.1661, sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-boqueria', cityId: 'barcelona', category: 'historic', image: require('../../../assets/offline-pois/barcelona/boqueria.webp'), imageCredit: CREDIT,
    name: { fr: 'Marché de la Boqueria', en: 'La Boqueria Market', zh: '波盖利亚市场' }, address: { fr: 'La Rambla 91, 08001 Barcelone, Espagne', en: 'La Rambla 91, 08001 Barcelona, Spain', zh: 'La Rambla 91, 08001 巴塞罗那, 西班牙' },
    description: { fr: 'Marché couvert historique de la Rambla réunissant étals de produits frais, spécialités catalanes et comptoirs de cuisine.', en: 'A historic covered market on La Rambla with fresh produce, Catalan specialities and food counters.', zh: '兰布拉大道上历史悠久的室内市场，出售新鲜农产品、加泰罗尼亚特色菜和食品柜台。' },
    highlights: [{ fr: 'Verrière métallique', en: 'Iron entrance canopy', zh: '铁制入口雨篷' }, { fr: 'Produits catalans', en: 'Catalan produce', zh: '加泰罗尼亚农产品' }], suggestedDurationMinutes: 75, latitude: 41.3817, longitude: 2.1716, website: 'https://www.boqueria.barcelona/home', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-santa-maria-mar', cityId: 'barcelona', category: 'religious', image: require('../../../assets/offline-pois/barcelona/santa-maria-mar.webp'), imageCredit: CREDIT,
    name: { fr: 'Basilique Sainte-Marie-de-la-Mer', en: 'Santa Maria del Mar', zh: '滨海圣母玛利亚' }, address: { fr: 'Plaça de Santa Maria 1, 08003 Barcelone, Espagne', en: 'Plaça de Santa Maria 1, 08003 Barcelona, Spain', zh: 'Plaça de Santa Maria 1, 08003 巴塞罗那, 西班牙' },
    description: { fr: 'Basilique gothique catalane du quartier de la Ribera, remarquable par l’unité de sa nef et la sobriété de ses volumes.', en: 'A Catalan Gothic basilica in La Ribera, notable for the unity of its nave and the restraint of its volumes.', zh: '位于拉里贝拉的加泰罗尼亚哥特式大教堂，以其中殿的统一和体量的限制而闻名。' },
    highlights: [{ fr: 'Grande nef gothique', en: 'Vast Gothic nave', zh: '巨大的哥特式中殿' }, { fr: 'Terrasses et tours', en: 'Terraces and towers', zh: '露台和塔楼' }], suggestedDurationMinutes: 60, latitude: 41.3839, longitude: 2.1821, sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-sant-pau', cityId: 'barcelona', category: 'historic', image: require('../../../assets/offline-pois/barcelona/sant-pau.webp'), imageCredit: CREDIT,
    name: { fr: 'Enceinte moderniste de Sant Pau', en: 'Sant Pau Art Nouveau Site', zh: 'Sant Pau 新艺术风格遗址' }, address: { fr: 'Carrer de Sant Antoni Maria Claret 167, 08025 Barcelone, Espagne', en: 'Carrer de Sant Antoni Maria Claret 167, 08025 Barcelona, Spain', zh: 'Carrer de Sant Antoni Maria Claret 167, 08025 巴塞罗那, 西班牙' },
    description: { fr: 'Ancien complexe hospitalier moderniste de Domènech i Montaner, composé de pavillons, jardins et galeries souterraines.', en: 'A former Modernista hospital complex by Domènech i Montaner, formed by pavilions, gardens and underground galleries.', zh: 'Domènech i Montaner 设计的前现代主义医院建筑群，由凉亭、花园和地下画廊组成。' },
    highlights: [{ fr: 'Pavillons modernistes', en: 'Modernista pavilions', zh: '现代主义展馆' }, { fr: 'Galeries souterraines', en: 'Underground galleries', zh: '地下画廊' }], suggestedDurationMinutes: 120, latitude: 41.4113, longitude: 2.1744, website: 'https://santpaubarcelona.org/en/', sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-barceloneta', cityId: 'barcelona', category: 'park', image: require('../../../assets/offline-pois/barcelona/barceloneta.webp'), imageCredit: CREDIT,
    name: { fr: 'Plage de la Barceloneta', en: 'Barceloneta Beach', zh: '巴塞罗那海滩' }, address: { fr: 'Passeig Marítim de la Barceloneta, 08003 Barcelone, Espagne', en: 'Passeig Marítim de la Barceloneta, 08003 Barcelona, Spain', zh: '巴塞罗那海洋大道, 08003 巴塞罗那, 西班牙' },
    description: { fr: 'Plage urbaine bordée d’une large promenade, proche de l’ancien quartier de pêcheurs de la Barceloneta.', en: 'An urban beach with a broad seafront promenade beside the former fishing district of Barceloneta.', zh: '城市海滩，位于巴塞罗那前钓鱼区旁边，拥有宽阔的海滨长廊。' },
    highlights: [{ fr: 'Promenade maritime', en: 'Seafront promenade', zh: '海滨长廊' }, { fr: 'Vue sur la Méditerranée', en: 'Mediterranean views', zh: '地中海景观' }], suggestedDurationMinutes: 120, latitude: 41.3784, longitude: 2.1925, sourceUrl: SOURCE,
  },
  {
    id: 'barcelona-miro-foundation', cityId: 'barcelona', category: 'museum', image: require('../../../assets/offline-pois/barcelona/miro-foundation.webp'), imageCredit: CREDIT,
    name: { fr: 'Fondation Joan Miró', en: 'Fundació Joan Miró', zh: '胡安·米罗基金会' }, address: { fr: 'Parc de Montjuïc, 08038 Barcelone, Espagne', en: 'Parc de Montjuïc, 08038 Barcelona, Spain', zh: '蒙特惠奇山公园, 08038 巴塞罗那, 西班牙' },
    description: { fr: 'Musée lumineux conçu par Josep Lluís Sert pour présenter l’œuvre de Joan Miró et soutenir la création contemporaine.', en: 'A light-filled museum designed by Josep Lluís Sert to present Joan Miró’s work and support contemporary creation.', zh: '由 Josep Lluís Sert 设计的光线充足的博物馆，展示胡安·米罗的作品并支持当代创作。' },
    highlights: [{ fr: 'Collection Joan Miró', en: 'Joan Miró collection', zh: '胡安·米罗系列' }, { fr: 'Architecture de Josep Lluís Sert', en: 'Josep Lluís Sert architecture', zh: '何塞普·路易斯·塞特建筑' }], suggestedDurationMinutes: 120, latitude: 41.3686, longitude: 2.1598, website: 'https://www.fmirobcn.org/en/', sourceUrl: SOURCE,
  },
];

export const BARCELONA_POIS: OfflinePOI[] = seeds.map(createSpanishPOI);
