import type { OfflinePOI } from '../../../types/offlinePoi';
import { createSpanishPOI, type SpanishPOISeed } from './helpers';

const SOURCE = 'https://www.bilbaoturismo.net/BilbaoTurismo/en/tourists';
const CREDIT = 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md';

const seeds: SpanishPOISeed[] = [
  {
    id: 'bilbao-guggenheim', cityId: 'bilbao', category: 'museum', image: require('../../../assets/offline-pois/bilbao/guggenheim.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée Guggenheim Bilbao', en: 'Guggenheim Museum Bilbao', zh: '毕尔巴鄂古根海姆博物馆' }, address: { fr: 'Avenida Abandoibarra 2, 48009 Bilbao, Espagne', en: 'Avenida Abandoibarra 2, 48009 Bilbao, Spain', zh: 'Avenida Abandoibarra 2, 48009 毕尔巴鄂, 西班牙' },
    description: { fr: 'Musée d’art moderne et contemporain installé dans le bâtiment de titane dessiné par Frank Gehry au bord de la ria.', en: 'A modern and contemporary art museum housed in Frank Gehry’s titanium building beside the estuary.', zh: '一座现当代艺术博物馆，位于河口旁弗兰克·盖里的钛金属建筑内。' },
    highlights: [{ fr: 'Architecture de Frank Gehry', en: 'Frank Gehry architecture', zh: '弗兰克·盖里建筑' }, { fr: 'Puppy et Maman', en: 'Puppy and Maman', zh: '小狗和妈妈' }], suggestedDurationMinutes: 180, latitude: 43.2687, longitude: -2.934, website: 'https://www.guggenheim-bilbao.eus/en', sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-casco-viejo', cityId: 'bilbao', category: 'historic', image: require('../../../assets/offline-pois/bilbao/casco-viejo.webp'), imageCredit: CREDIT,
    name: { fr: 'Casco Viejo — les Sept Rues', en: 'Casco Viejo — Seven Streets', zh: '老城区 — 七街' }, address: { fr: 'Plaza Nueva, 48005 Bilbao, Espagne', en: 'Plaza Nueva, 48005 Bilbao, Spain', zh: '新广场, 48005 毕尔巴鄂, 西班牙' },
    description: { fr: 'Noyau médiéval de Bilbao organisé autour des Sept Rues, avec places, commerces historiques et nombreux bars à pintxos.', en: 'Bilbao’s medieval core centred on the Seven Streets, with squares, historic shops and numerous pintxo bars.', zh: '毕尔巴鄂的中世纪核心以七街为中心，拥有广场、历史悠久的商店和众多的 pintxo 酒吧。' },
    highlights: [{ fr: 'Siete Calles', en: 'Seven Streets', zh: '七街' }, { fr: 'Commerces et pintxos', en: 'Shops and pintxos', zh: '商店和 pintxos' }], suggestedDurationMinutes: 150, latitude: 43.2569, longitude: -2.9236, sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-ribera-market', cityId: 'bilbao', category: 'historic', image: require('../../../assets/offline-pois/bilbao/ribera-market.webp'), imageCredit: CREDIT,
    name: { fr: 'Marché de la Ribera', en: 'Ribera Market', zh: '里贝拉市场' }, address: { fr: 'Erribera Kalea 22 bis, 48005 Bilbao, Espagne', en: 'Erribera Kalea 22 bis, 48005 Bilbao, Spain', zh: 'Erribera Kalea 22 bis, 48005 毕尔巴鄂, 西班牙' },
    description: { fr: 'Grand marché couvert Art déco sur les berges de la ria, consacré aux produits frais et à la gastronomie basque.', en: 'A large Art Deco covered market on the estuary, devoted to fresh produce and Basque cuisine.', zh: '位于河口的大型装饰艺术风格室内市场，专门出售新鲜农产品和巴斯克美食。' },
    highlights: [{ fr: 'Vitraux Art déco', en: 'Art Deco stained glass', zh: '装饰艺术彩色玻璃' }, { fr: 'Produits basques', en: 'Basque produce', zh: '巴斯克农产品' }], suggestedDurationMinutes: 75, latitude: 43.2545, longitude: -2.9249, website: 'https://www.mercadodelaribera.biz/', sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-santiago-cathedral', cityId: 'bilbao', category: 'religious', image: require('../../../assets/offline-pois/bilbao/santiago-cathedral.webp'), imageCredit: CREDIT,
    name: { fr: 'Cathédrale de Santiago', en: 'Santiago Cathedral', zh: '圣地亚哥大教堂' }, address: { fr: 'Done Jakue Plazatxoa 1, 48005 Bilbao, Espagne', en: 'Done Jakue Plazatxoa 1, 48005 Bilbao, Spain', zh: '完成 Jakue Plazatxoa 1, 48005 毕尔巴鄂, 西班牙' },
    description: { fr: 'Cathédrale gothique du Casco Viejo dédiée à saint Jacques, étape du chemin côtier de Saint-Jacques-de-Compostelle.', en: 'A Gothic cathedral in the old town dedicated to Saint James, on the coastal Camino de Santiago route.', zh: '老城区的一座哥特式大教堂，供奉圣詹姆斯，位于圣地亚哥卡米诺沿海路线上。' },
    highlights: [{ fr: 'Cloître gothique', en: 'Gothic cloister', zh: '哥特式回廊' }, { fr: 'Puerta del Ángel', en: 'Puerta del Ángel', zh: '天使门' }], suggestedDurationMinutes: 60, latitude: 43.2568, longitude: -2.9239, sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-arriaga', cityId: 'bilbao', category: 'landmark', image: require('../../../assets/offline-pois/bilbao/arriaga.webp'), imageCredit: CREDIT,
    name: { fr: 'Théâtre Arriaga', en: 'Arriaga Theatre', zh: '阿里亚加剧院' }, address: { fr: 'Arriaga Plaza 1, 48005 Bilbao, Espagne', en: 'Arriaga Plaza 1, 48005 Bilbao, Spain', zh: 'Arriaga Plaza 1, 48005 毕尔巴鄂, 西班牙' },
    description: { fr: 'Théâtre néobaroque de la fin du XIXe siècle portant le nom du compositeur bilbaïno Juan Crisóstomo de Arriaga.', en: 'A late-19th-century Neo-Baroque theatre named after Bilbao composer Juan Crisóstomo de Arriaga.', zh: '一座 19 世纪末的新巴洛克剧院，以毕尔巴鄂作曲家胡安·克里索斯托莫·德·阿里亚加 (Juan Crisóstomo de Arriaga) 的名字命名。' },
    highlights: [{ fr: 'Façade néobaroque', en: 'Neo-Baroque façade', zh: '新巴洛克风格的外观' }, { fr: 'Salle historique', en: 'Historic auditorium', zh: '历史悠久的礼堂' }], suggestedDurationMinutes: 60, latitude: 43.2593, longitude: -2.925, website: 'https://www.teatroarriaga.eus/', sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-fine-arts', cityId: 'bilbao', category: 'museum', image: require('../../../assets/offline-pois/bilbao/fine-arts.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée des Beaux-Arts de Bilbao', en: 'Bilbao Fine Arts Museum', zh: '毕尔巴鄂美术馆' }, address: { fr: 'Museo Plaza 2, 48009 Bilbao, Espagne', en: 'Museo Plaza 2, 48009 Bilbao, Spain', zh: '博物馆广场 2, 48009 毕尔巴鄂, 西班牙' },
    description: { fr: 'Musée réunissant art ancien, moderne, basque et européen, au sein du parc Doña Casilda.', en: 'A museum bringing together old, modern, Basque and European art within Doña Casilda Park.', zh: 'Doña Casilda 公园内的博物馆汇集了古代、现代、巴斯克和欧洲艺术。' },
    highlights: [{ fr: 'Art basque', en: 'Basque art', zh: '巴斯克艺术' }, { fr: 'Maîtres européens', en: 'European masters', zh: '欧洲大师' }], suggestedDurationMinutes: 150, latitude: 43.265, longitude: -2.9378, website: 'https://bilbaomuseoa.eus/en/', sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-azkuna-zentroa', cityId: 'bilbao', category: 'landmark', image: require('../../../assets/offline-pois/bilbao/azkuna-zentroa.webp'), imageCredit: CREDIT,
    name: { fr: 'Azkuna Zentroa — Alhóndiga', en: 'Azkuna Zentroa — Alhóndiga', zh: 'Azkuna Zentroa — Alhóndiga' }, address: { fr: 'Arriquíbar Plaza 4, 48010 Bilbao, Espagne', en: 'Arriquíbar Plaza 4, 48010 Bilbao, Spain', zh: 'Arriquíbar Plaza 4, 48010 毕尔巴鄂, 西班牙' },
    description: { fr: 'Ancien entrepôt à vins transformé en centre culturel par Philippe Starck, célèbre pour ses colonnes monumentales variées.', en: 'A former wine warehouse transformed into a cultural centre by Philippe Starck, known for its varied monumental columns.', zh: '菲利普·斯塔克 (Philippe Starck) 将一座前葡萄酒仓库改造成文化中心，以其各种纪念柱而闻名。' },
    highlights: [{ fr: '43 colonnes sculptées', en: '43 sculpted columns', zh: '43 根雕刻柱' }, { fr: 'Piscine suspendue', en: 'Suspended swimming pool', zh: '悬浮泳池' }], suggestedDurationMinutes: 90, latitude: 43.2595, longitude: -2.9369, website: 'https://www.azkunazentroa.eus/en/', sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-artxanda', cityId: 'bilbao', category: 'park', image: require('../../../assets/offline-pois/bilbao/artxanda.webp'), imageCredit: CREDIT,
    name: { fr: 'Mont Artxanda et funiculaire', en: 'Mount Artxanda and Funicular', zh: 'Artxanda 山和缆车' }, address: { fr: 'Funikularreko Plaza, 48007 Bilbao, Espagne', en: 'Funikularreko Plaza, 48007 Bilbao, Spain', zh: 'Funikularreko Plaza, 48007 毕尔巴鄂, 西班牙' },
    description: { fr: 'Belvédère accessible en funiculaire offrant une vue étendue sur Bilbao, les collines et les méandres de la ria.', en: 'A viewpoint reached by funicular with broad views over Bilbao, the surrounding hills and the winding estuary.', zh: '乘坐缆车到达的观景点，可以看到毕尔巴鄂、周围的山丘和蜿蜒的河口的广阔景色。' },
    highlights: [{ fr: 'Funiculaire historique', en: 'Historic funicular', zh: '历史悠久的缆车' }, { fr: 'Panorama sur Bilbao', en: 'Bilbao panorama', zh: '毕尔巴鄂全景' }], suggestedDurationMinutes: 90, latitude: 43.2756, longitude: -2.9201, sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-zubizuri', cityId: 'bilbao', category: 'landmark', image: require('../../../assets/offline-pois/bilbao/zubizuri.webp'), imageCredit: CREDIT,
    name: { fr: 'Pont Zubizuri', en: 'Zubizuri Bridge', zh: '祖毕祖里桥' }, address: { fr: 'Zubizuri, 48001 Bilbao, Espagne', en: 'Zubizuri, 48001 Bilbao, Spain', zh: '祖毕祖里, 48001 毕尔巴鄂, 西班牙' },
    description: { fr: 'Passerelle piétonne blanche conçue par Santiago Calatrava, reliant les deux rives de la ria près du centre.', en: 'A white pedestrian bridge designed by Santiago Calatrava, linking the two banks of the estuary near the centre.', zh: '圣地亚哥·卡拉特拉瓦设计的白色人行桥，连接中心附近的河口两岸。' },
    highlights: [{ fr: 'Arc blanc emblématique', en: 'Iconic white arch', zh: '标志性的白色拱门' }, { fr: 'Promenade le long de la ria', en: 'Estuary promenade', zh: '河口长廊' }], suggestedDurationMinutes: 30, latitude: 43.2666, longitude: -2.9278, sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-san-mames', cityId: 'bilbao', category: 'landmark', image: require('../../../assets/offline-pois/bilbao/san-mames.webp'), imageCredit: CREDIT,
    name: { fr: 'Stade San Mamés', en: 'San Mamés Stadium', zh: '圣马梅斯体育场' }, address: { fr: 'Rafael Moreno Pitxitxi Kalea, 48013 Bilbao, Espagne', en: 'Rafael Moreno Pitxitxi Kalea, 48013 Bilbao, Spain', zh: '拉斐尔·莫雷诺·皮特西西·卡利亚, 48013 毕尔巴鄂, 西班牙' },
    description: { fr: 'Stade de l’Athletic Club surnommé la Cathédrale, doté d’un musée consacré à l’histoire du club basque.', en: 'Athletic Club’s stadium, nicknamed the Cathedral, with a museum devoted to the Basque club’s history.', zh: '竞技俱乐部的体育场，绰号“大教堂”，设有专门展示巴斯克俱乐部历史的博物馆。' },
    highlights: [{ fr: 'Musée de l’Athletic Club', en: 'Athletic Club Museum', zh: '运动俱乐部博物馆' }, { fr: 'Architecture lumineuse', en: 'Illuminated architecture', zh: '照明建筑' }], suggestedDurationMinutes: 120, latitude: 43.2642, longitude: -2.9494, website: 'https://sanmames.athletic-club.eus/en/', sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-itsasmuseum', cityId: 'bilbao', category: 'museum', image: require('../../../assets/offline-pois/bilbao/itsasmuseum.webp'), imageCredit: CREDIT,
    name: { fr: 'Itsasmuseum Bilbao', en: 'Itsasmuseum Bilbao', zh: '毕尔巴鄂Itsasmuseum' }, address: { fr: 'Ramón de la Sota Kaia 1, 48013 Bilbao, Espagne', en: 'Ramón de la Sota Kaia 1, 48013 Bilbao, Spain', zh: 'Ramón de la Sota Kaia 1, 48013 毕尔巴鄂, 西班牙' },
    description: { fr: 'Musée maritime installé sur les anciens quais d’Euskalduna, consacré à la ria, aux chantiers navals et à la culture maritime.', en: 'A maritime museum on the former Euskalduna docks, devoted to the estuary, shipyards and maritime culture.', zh: '位于前尤斯卡杜纳码头的海事博物馆，专门展示河口、造船厂和海洋文化。' },
    highlights: [{ fr: 'Docks historiques', en: 'Historic docks', zh: '历史悠久的码头' }, { fr: 'Bateaux et patrimoine industriel', en: 'Boats and industrial heritage', zh: '船只和工业遗产' }], suggestedDurationMinutes: 120, latitude: 43.2666, longitude: -2.9465, website: 'https://itsasmuseum.eus/en/', sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-dona-casilda', cityId: 'bilbao', category: 'park', image: require('../../../assets/offline-pois/bilbao/dona-casilda.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc Doña Casilda Iturrizar', en: 'Doña Casilda Iturrizar Park', zh: '多纳·卡西尔达·伊图里扎公园' }, address: { fr: 'Paseo de Don José Anselmo Clavé, 48009 Bilbao, Espagne', en: 'Paseo de Don José Anselmo Clavé, 48009 Bilbao, Spain', zh: 'Paseo de Don José Anselmo Clavé, 48009 毕尔巴鄂, 西班牙' },
    description: { fr: 'Jardin urbain historique avec étang, pergola, fontaines et grands arbres au cœur de l’Ensanche.', en: 'A historic urban garden with a pond, pergola, fountains and mature trees in the heart of the Ensanche.', zh: '一个历史悠久的城市花园，位于 Ensanche 中心，有池塘、凉棚、喷泉和成熟的树木。' },
    highlights: [{ fr: 'Étang aux canards', en: 'Duck pond', zh: '鸭池' }, { fr: 'Pergola et fontaines', en: 'Pergola and fountains', zh: '凉棚和喷泉' }], suggestedDurationMinutes: 75, latitude: 43.2654, longitude: -2.9402, sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-plaza-nueva', cityId: 'bilbao', category: 'historic', image: require('../../../assets/offline-pois/bilbao/plaza-nueva.webp'), imageCredit: CREDIT,
    name: { fr: 'Plaza Nueva', en: 'Plaza Nueva', zh: '新广场' }, address: { fr: 'Plaza Nueva, 48005 Bilbao, Espagne', en: 'Plaza Nueva, 48005 Bilbao, Spain', zh: '新广场, 48005 毕尔巴鄂, 西班牙' },
    description: { fr: 'Place néoclassique à arcades du Casco Viejo, entourée de cafés et connue pour son marché dominical.', en: 'A Neoclassical arcaded square in the old town, lined with cafés and known for its Sunday market.', zh: '老城区的新古典主义拱廊广场，两旁咖啡馆林立，以其周日市场而闻名。' },
    highlights: [{ fr: 'Arcades néoclassiques', en: 'Neoclassical arcades', zh: '新古典主义拱廊' }, { fr: 'Bars à pintxos', en: 'Pintxo bars', zh: 'Pintxo 酒吧' }], suggestedDurationMinutes: 60, latitude: 43.2592, longitude: -2.9228, sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-begona', cityId: 'bilbao', category: 'religious', image: require('../../../assets/offline-pois/bilbao/begona.webp'), imageCredit: CREDIT,
    name: { fr: 'Basilique de Begoña', en: 'Basilica of Begoña', zh: '贝戈尼亚大教堂' }, address: { fr: 'Begoñako Andra Maria Kalea 38, 48006 Bilbao, Espagne', en: 'Begoñako Andra Maria Kalea 38, 48006 Bilbao, Spain', zh: 'Begoñako Andra Maria Kalea 38, 48006 毕尔巴鄂, 西班牙' },
    description: { fr: 'Sanctuaire dominant la vieille ville, dédié à la Vierge de Begoña, patronne de Biscaye.', en: 'A sanctuary overlooking the old town, dedicated to the Virgin of Begoña, patron saint of Biscay.', zh: '俯瞰老城区的圣所，供奉比斯开岛的守护神贝戈尼亚圣母。' },
    highlights: [{ fr: 'Vierge de Begoña', en: 'Virgin of Begoña', zh: '贝戈尼亚圣母' }, { fr: 'Vue sur la ville', en: 'View over the city', zh: '俯瞰城市' }], suggestedDurationMinutes: 60, latitude: 43.2589, longitude: -2.9139, sourceUrl: SOURCE,
  },
  {
    id: 'bilbao-euskalduna', cityId: 'bilbao', category: 'landmark', image: require('../../../assets/offline-pois/bilbao/euskalduna.webp'), imageCredit: CREDIT,
    name: { fr: 'Palais Euskalduna', en: 'Euskalduna Conference Centre', zh: '尤斯卡杜纳会议中心' }, address: { fr: 'Avenida Abandoibarra 4, 48011 Bilbao, Espagne', en: 'Avenida Abandoibarra 4, 48011 Bilbao, Spain', zh: 'Avenida Abandoibarra 4, 48011 毕尔巴鄂, 西班牙' },
    description: { fr: 'Centre de congrès et de spectacles construit sur les anciens chantiers navals, évoquant un navire en construction.', en: 'A conference and performing arts centre built on former shipyards, evoking a vessel under construction.', zh: '一个会议和表演艺术中心，建在前造船厂的基础上，让人想起一艘正在建造的船只。' },
    highlights: [{ fr: 'Architecture industrielle contemporaine', en: 'Contemporary industrial architecture', zh: '当代工业建筑' }, { fr: 'Berges réaménagées', en: 'Regenerated riverfront', zh: '河滨再生' }], suggestedDurationMinutes: 60, latitude: 43.267, longitude: -2.9448, website: 'https://www.euskaldunabilbao.com/en/', sourceUrl: SOURCE,
  },
];

export const BILBAO_POIS: OfflinePOI[] = seeds.map(createSpanishPOI);
