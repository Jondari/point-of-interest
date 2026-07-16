import type { OfflinePOI } from '../../../types/offlinePoi';
import { createFrenchPOI, type FrenchPOISeed } from './helpers';

const SOURCE = 'https://www.marseille-tourisme.com/decouvrez-marseille/incontournables/';
const CREDIT = 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md';

const seeds: FrenchPOISeed[] = [
  {
    id: 'marseille-notre-dame-garde', cityId: 'marseille', category: 'religious', image: require('../../../assets/offline-pois/marseille/notre-dame-garde.webp'), imageCredit: CREDIT,
    name: { fr: 'Basilique Notre-Dame de la Garde', en: 'Basilica of Notre-Dame de la Garde', zh: '拉加德圣母大教堂' }, address: { fr: 'Rue Fort-du-Sanctuaire, 13006 Marseille, France', en: 'Rue Fort-du-Sanctuaire, 13006 Marseille, France', zh: 'Rue Fort-du-Sanctuaire, 13006 马赛, 法国' },
    description: { fr: 'Basilique romano-byzantine surnommée la Bonne Mère, dressée au-dessus de la ville et de la Méditerranée.', en: 'A Romano-Byzantine basilica known as the Good Mother, standing above the city and Mediterranean.', zh: '一座罗马拜占庭式大教堂，被称为“好母亲”，矗立在城市和地中海之上。' },
    highlights: [{ fr: 'Panorama à 360 degrés', en: '360-degree panorama', zh: '360度全景' }, { fr: 'Mosaïques intérieures', en: 'Interior mosaics', zh: '室内马赛克' }], suggestedDurationMinutes: 90, latitude: 43.284, longitude: 5.371, website: 'https://notredamedelagarde.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'marseille-vieux-port', cityId: 'marseille', category: 'historic', image: require('../../../assets/offline-pois/marseille/vieux-port.webp'), imageCredit: CREDIT,
    name: { fr: 'Vieux-Port', en: 'Old Port of Marseille', zh: '马赛旧港' }, address: { fr: 'Quai des Belges, 13001 Marseille, France', en: 'Quai des Belges, 13001 Marseille, France', zh: 'Quai des Belges, 13001 马赛, 法国' },
    description: { fr: 'Port historique et cœur vivant de Marseille, entouré de quais, marchés, cafés et monuments.', en: 'Marseille’s historic harbour and lively heart, surrounded by quays, markets, cafés and monuments.', zh: '马赛历史悠久的港口和热闹的市中心，周围有码头、市场、咖啡馆和纪念碑。' },
    highlights: [{ fr: 'Ombrière du Vieux-Port', en: 'Vieux-Port canopy', zh: '老港口天篷' }, { fr: 'Marché aux poissons', en: 'Fish market', zh: '鱼市' }], suggestedDurationMinutes: 90, latitude: 43.296, longitude: 5.37, sourceUrl: SOURCE,
  },
  {
    id: 'marseille-mucem', cityId: 'marseille', category: 'museum', image: require('../../../assets/offline-pois/marseille/mucem.webp'), imageCredit: CREDIT,
    name: { fr: 'Mucem', en: 'Mucem', zh: '穆塞姆' }, address: { fr: '1 esplanade du J4, 13002 Marseille, France', en: '1 Esplanade du J4, 13002 Marseille, France', zh: '1 Esplanade du J4, 13002 马赛, 法国' },
    description: { fr: 'Musée consacré aux civilisations de l’Europe et de la Méditerranée, relié au fort Saint-Jean par une passerelle.', en: 'A museum devoted to European and Mediterranean civilisations, linked to Fort Saint-Jean by a footbridge.', zh: '一座致力于欧洲和地中海文明的博物馆，通过人行天桥与圣让堡相连。' },
    highlights: [{ fr: 'Résille de béton du J4', en: 'J4 concrete lattice', zh: 'J4混凝土格子' }, { fr: 'Expositions méditerranéennes', en: 'Mediterranean exhibitions', zh: '地中海展览' }], suggestedDurationMinutes: 180, latitude: 43.297, longitude: 5.361, website: 'https://www.mucem.org/', sourceUrl: SOURCE,
  },
  {
    id: 'marseille-calanques', cityId: 'marseille', category: 'park', image: require('../../../assets/offline-pois/marseille/calanques.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc national des Calanques', en: 'Calanques National Park', zh: '卡朗格国家公园' }, address: { fr: 'Route de la Gineste, 13009 Marseille, France', en: 'Route de la Gineste, 13009 Marseille, France', zh: 'Route de la Gineste, 13009 马赛, 法国' },
    description: { fr: 'Paysage protégé de falaises calcaires, criques turquoise et sentiers entre Marseille et Cassis.', en: 'A protected landscape of limestone cliffs, turquoise coves and trails between Marseille and Cassis.', zh: '马赛和卡西斯之间的石灰岩悬崖、绿松石海湾和小径的受保护景观。' },
    highlights: [{ fr: 'Criques et falaises', en: 'Coves and cliffs', zh: '海湾和悬崖' }, { fr: 'Randonnées littorales', en: 'Coastal hikes', zh: '沿海徒步' }], suggestedDurationMinutes: 240, latitude: 43.21, longitude: 5.444, website: 'https://www.calanques-parcnational.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'marseille-palais-longchamp', cityId: 'marseille', category: 'landmark', image: require('../../../assets/offline-pois/marseille/palais-longchamp.webp'), imageCredit: CREDIT,
    name: { fr: 'Palais Longchamp', en: 'Palais Longchamp', zh: '隆尚宫' }, address: { fr: 'Boulevard Jardin-Zoologique, 13004 Marseille, France', en: 'Boulevard Jardin-Zoologique, 13004 Marseille, France', zh: 'Boulevard Jardin-Zoologique, 13004 马赛, 法国' },
    description: { fr: 'Monument célébrant l’arrivée des eaux de la Durance, réunissant colonnade, fontaine, musées et jardins.', en: 'A monument celebrating the arrival of Durance water, combining a colonnade, fountain, museums and gardens.', zh: '一座庆祝杜兰斯水到来的纪念碑，结合了柱廊、喷泉、博物馆和花园。' },
    highlights: [{ fr: 'Fontaine monumentale', en: 'Monumental fountain', zh: '纪念喷泉' }, { fr: 'Musées et parc', en: 'Museums and park', zh: '博物馆和公园' }], suggestedDurationMinutes: 120, latitude: 43.304, longitude: 5.394, sourceUrl: SOURCE,
  },
  {
    id: 'marseille-panier', cityId: 'marseille', category: 'historic', image: require('../../../assets/offline-pois/marseille/panier.webp'), imageCredit: CREDIT,
    name: { fr: 'Quartier du Panier', en: 'Le Panier District', zh: '勒帕尼尔区' }, address: { fr: 'Place des Moulins, 13002 Marseille, France', en: 'Place des Moulins, 13002 Marseille, France', zh: '穆兰广场, 13002 马赛, 法国' },
    description: { fr: 'Plus ancien quartier de Marseille, composé de ruelles en pente, petites places, ateliers et façades colorées.', en: 'Marseille’s oldest district, made up of sloping lanes, small squares, workshops and colourful façades.', zh: '马赛最古老的地区，由倾斜的小巷、小广场、作坊和色彩缤纷的外墙组成。' },
    highlights: [{ fr: 'Ruelles historiques', en: 'Historic lanes', zh: '历史悠久的小巷' }, { fr: 'Art urbain et artisans', en: 'Street art and craftspeople', zh: '街头艺术和手工艺人' }], suggestedDurationMinutes: 120, latitude: 43.3, longitude: 5.367, sourceUrl: SOURCE,
  },
  {
    id: 'marseille-saint-victor', cityId: 'marseille', category: 'religious', image: require('../../../assets/offline-pois/marseille/saint-victor.webp'), imageCredit: CREDIT,
    name: { fr: 'Abbaye Saint-Victor', en: 'Abbey of Saint-Victor', zh: '圣维克多修道院' }, address: { fr: 'Place Saint-Victor, 13007 Marseille, France', en: 'Place Saint-Victor, 13007 Marseille, France', zh: '圣维克多广场, 13007 马赛, 法国' },
    description: { fr: 'Ancienne abbaye fortifiée connue pour ses cryptes paléochrétiennes et son rôle dans l’histoire religieuse locale.', en: 'An ancient fortified abbey known for its early Christian crypts and role in local religious history.', zh: '一座古老的加固修道院，以其早期基督教墓穴和在当地宗教历史中的作用而闻名。' },
    highlights: [{ fr: 'Cryptes antiques', en: 'Ancient crypts', zh: '古代墓穴' }, { fr: 'Architecture fortifiée', en: 'Fortified architecture', zh: '强化架构' }], suggestedDurationMinutes: 60, latitude: 43.29, longitude: 5.365, website: 'https://www.saintvictor.net/', sourceUrl: SOURCE,
  },
  {
    id: 'marseille-chateau-if', cityId: 'marseille', category: 'historic', image: require('../../../assets/offline-pois/marseille/chateau-if.webp'), imageCredit: CREDIT,
    name: { fr: 'Château d’If', en: 'Château d’If', zh: '伊夫堡' }, address: { fr: 'Île d’If, archipel du Frioul, 13007 Marseille, France', en: 'Île d’If, Frioul Archipelago, 13007 Marseille, France', zh: '伊夫岛, 弗里乌尔群岛, 13007 马赛, 法国' },
    description: { fr: 'Forteresse insulaire devenue prison, rendue célèbre par le roman Le Comte de Monte-Cristo.', en: 'An island fortress turned prison, made famous by the novel The Count of Monte Cristo.', zh: '一座岛屿堡垒变成了监狱，因小说《基督山伯爵》而闻名。' },
    highlights: [{ fr: 'Cellules historiques', en: 'Historic prison cells', zh: '历史悠久的牢房' }, { fr: 'Vue sur la rade', en: 'View over the bay', zh: '海湾景观' }], suggestedDurationMinutes: 150, latitude: 43.279, longitude: 5.325, website: 'https://www.chateau-if.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'marseille-frioul', cityId: 'marseille', category: 'park', image: require('../../../assets/offline-pois/marseille/frioul.webp'), imageCredit: CREDIT,
    name: { fr: 'Îles du Frioul', en: 'Frioul Islands', zh: '弗里乌尔群岛' }, address: { fr: 'Port du Frioul, 13007 Marseille, France', en: 'Port du Frioul, 13007 Marseille, France', zh: '弗里乌尔港, 13007 马赛, 法国' },
    description: { fr: 'Archipel aux paysages rocheux, petites criques, sentiers et vestiges militaires accessible en bateau.', en: 'A boat-accessible archipelago of rocky landscapes, small coves, trails and military remains.', zh: '可以乘船到达的群岛，有岩石景观、小海湾、小径和军事遗迹。' },
    highlights: [{ fr: 'Sentiers côtiers', en: 'Coastal trails', zh: '沿海步道' }, { fr: 'Criques et eaux claires', en: 'Coves and clear water', zh: '海湾和清澈的海水' }], suggestedDurationMinutes: 240, latitude: 43.28, longitude: 5.305, sourceUrl: SOURCE,
  },
  {
    id: 'marseille-major', cityId: 'marseille', category: 'religious', image: require('../../../assets/offline-pois/marseille/major.webp'), imageCredit: CREDIT,
    name: { fr: 'Cathédrale de la Major', en: 'Marseille Cathedral', zh: '马赛大教堂' }, address: { fr: 'Place de la Major, 13002 Marseille, France', en: 'Place de la Major, 13002 Marseille, France', zh: '梅杰广场, 13002 马赛, 法国' },
    description: { fr: 'Cathédrale monumentale du XIXe siècle mêlant pierre claire et sombre dans un style romano-byzantin.', en: 'A monumental 19th-century cathedral combining light and dark stone in a Romano-Byzantine style.', zh: '一座宏伟的 19 世纪大教堂，采用罗马拜占庭风格，将浅色和深色石头结合在一起。' },
    highlights: [{ fr: 'Façade rayée', en: 'Striped façade', zh: '条纹外观' }, { fr: 'Coupoles et mosaïques', en: 'Domes and mosaics', zh: '圆顶和马赛克' }], suggestedDurationMinutes: 60, latitude: 43.299, longitude: 5.365, sourceUrl: SOURCE,
  },
  {
    id: 'marseille-cite-radieuse', cityId: 'marseille', category: 'landmark', image: require('../../../assets/offline-pois/marseille/cite-radieuse.webp'), imageCredit: CREDIT,
    name: { fr: 'Cité Radieuse – Le Corbusier', en: 'Cité Radieuse – Le Corbusier', zh: '光辉城 – 勒·柯布西耶' }, address: { fr: '280 boulevard Michelet, 13008 Marseille, France', en: '280 Boulevard Michelet, 13008 Marseille, France', zh: '280 Boulevard Michelet, 13008 马赛, 法国' },
    description: { fr: 'Unité d’habitation moderniste de Le Corbusier, conçue comme une ville verticale et inscrite à l’UNESCO.', en: 'Le Corbusier’s modernist housing unit, designed as a vertical city and listed by UNESCO.', zh: '勒·柯布西耶的现代主义住宅单元，设计为垂直城市，并被联合国教科文组织列为世界遗产。' },
    highlights: [{ fr: 'Architecture moderniste', en: 'Modernist architecture', zh: '现代主义建筑' }, { fr: 'Toit-terrasse', en: 'Rooftop terrace', zh: '屋顶露台' }], suggestedDurationMinutes: 75, latitude: 43.261, longitude: 5.396, sourceUrl: SOURCE,
  },
  {
    id: 'marseille-cosquer', cityId: 'marseille', category: 'museum', image: require('../../../assets/offline-pois/marseille/cosquer.webp'), imageCredit: CREDIT,
    name: { fr: 'Cosquer Méditerranée', en: 'Cosquer Méditerranée', zh: '地中海科斯克' }, address: { fr: 'Promenade Robert-Laffont, 13002 Marseille, France', en: 'Promenade Robert-Laffont, 13002 Marseille, France', zh: '罗伯特-拉丰长廊, 13002 马赛, 法国' },
    description: { fr: 'Restitution immersive de la grotte Cosquer et de ses œuvres préhistoriques aujourd’hui en partie submergées.', en: 'An immersive reconstruction of Cosquer Cave and its prehistoric art, now partly submerged.', zh: '科斯克洞穴及其史前艺术的沉浸式重建，现已部分淹没。' },
    highlights: [{ fr: 'Réplique de la grotte', en: 'Cave replica', zh: '洞穴复制品' }, { fr: 'Art pariétal préhistorique', en: 'Prehistoric cave art', zh: '史前洞穴艺术' }], suggestedDurationMinutes: 120, latitude: 43.2970701, longitude: 5.3620720, website: 'https://www.grotte-cosquer.com/', sourceUrl: SOURCE,
  },
  {
    id: 'marseille-pharo', cityId: 'marseille', category: 'landmark', image: require('../../../assets/offline-pois/marseille/pharo.webp'), imageCredit: CREDIT,
    name: { fr: 'Palais du Pharo', en: 'Palais du Pharo', zh: '法罗宫' }, address: { fr: '58 boulevard Charles-Livon, 13007 Marseille, France', en: '58 Boulevard Charles-Livon, 13007 Marseille, France', zh: '58 Boulevard Charles-Livon, 13007 马赛, 法国' },
    description: { fr: 'Ancienne résidence impériale entourée d’un jardin offrant une vue remarquable sur le Vieux-Port et le littoral.', en: 'A former imperial residence surrounded by gardens with remarkable views of the Old Port and coastline.', zh: '一座前皇家住所，周围环绕着花园，享有旧港和海岸线的壮丽景色。' },
    highlights: [{ fr: 'Jardin panoramique', en: 'Panoramic garden', zh: '全景花园' }, { fr: 'Vue sur l’entrée du port', en: 'View over the harbour entrance', zh: '俯瞰港口入口' }], suggestedDurationMinutes: 60, latitude: 43.294, longitude: 5.359, sourceUrl: SOURCE,
  },
  {
    id: 'marseille-fort-saint-jean', cityId: 'marseille', category: 'historic', image: require('../../../assets/offline-pois/marseille/fort-saint-jean.webp'), imageCredit: CREDIT,
    name: { fr: 'Fort Saint-Jean', en: 'Fort Saint-Jean', zh: '圣让堡' }, address: { fr: 'Promenade Louis-Braille, 13002 Marseille, France', en: 'Promenade Louis-Braille, 13002 Marseille, France', zh: 'Promenade Louis-Braille, 13002 马赛, 法国' },
    description: { fr: 'Fort historique gardant l’entrée du Vieux-Port, intégré au Mucem et parcouru de jardins et passerelles.', en: 'A historic fort guarding the Old Port entrance, incorporated into Mucem with gardens and footbridges.', zh: '一座历史悠久的堡垒，守卫着旧港入口，并入 Mucem，设有花园和人行桥。' },
    highlights: [{ fr: 'Tours historiques', en: 'Historic towers', zh: '历史塔楼' }, { fr: 'Passerelles vers le Mucem', en: 'Footbridges to Mucem', zh: '通往 Mucem 的人行天桥' }], suggestedDurationMinutes: 90, latitude: 43.2954540, longitude: 5.3618104, sourceUrl: SOURCE,
  },
  {
    id: 'marseille-parc-borely', cityId: 'marseille', category: 'park', image: require('../../../assets/offline-pois/marseille/parc-borely.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc Borély', en: 'Parc Borély', zh: '博雷利公园' }, address: { fr: 'Avenue du Parc-Borély, 13008 Marseille, France', en: 'Avenue du Parc-Borély, 13008 Marseille, France', zh: 'Avenue du Parc-Borély, 13008 马赛, 法国' },
    description: { fr: 'Vaste parc proche des plages comprenant jardin à la française, jardin anglais, lac et château.', en: 'A large park near the beaches with formal and English gardens, a lake and château.', zh: '靠近海滩的大型公园，拥有正式的英式花园、湖泊和城堡。' },
    highlights: [{ fr: 'Jardins paysagers', en: 'Landscaped gardens', zh: '园景花园' }, { fr: 'Lac et château Borély', en: 'Lake and Château Borély', zh: '博雷利湖和城堡' }], suggestedDurationMinutes: 120, latitude: 43.26, longitude: 5.382, sourceUrl: SOURCE,
  },
];

export const MARSEILLE_POIS: OfflinePOI[] = seeds.map(createFrenchPOI);
