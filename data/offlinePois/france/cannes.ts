import type { OfflinePOI } from '../../../types/offlinePoi';
import { createFrenchPOI, type FrenchPOISeed } from './helpers';

const SOURCE = 'https://www.cannes-france.com/decouvrir-visiter/incontournables/';
const CREDIT = 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md';

const seeds: FrenchPOISeed[] = [
  {
    id: 'cannes-palais-festivals', cityId: 'cannes', category: 'landmark', image: require('../../../assets/offline-pois/cannes/palais-festivals.webp'), imageCredit: CREDIT,
    name: { fr: 'Palais des Festivals et des Congrès', en: 'Palais des Festivals et des Congrès', zh: '节庆宫和会议中心' }, address: { fr: '1 boulevard de la Croisette, 06400 Cannes, France', en: '1 Boulevard de la Croisette, 06400 Cannes, France', zh: '1 Boulevard de la Croisette, 06400 戛纳, 法国' },
    description: { fr: 'Lieu emblématique du Festival de Cannes, connu pour son tapis rouge et ses marches face au port.', en: 'The emblematic home of the Cannes Film Festival, known for its red carpet and steps facing the harbour.', zh: '戛纳电影节的标志性举办地，以其红地毯和面向海港的台阶而闻名。' },
    highlights: [{ fr: 'Marches du Festival', en: 'Festival steps', zh: '节日步骤' }, { fr: 'Chemin des étoiles', en: 'Path of the Stars', zh: '星辰之路' }], suggestedDurationMinutes: 45, latitude: 43.551, longitude: 7.018, website: 'https://www.palaisdesfestivals.com/', sourceUrl: SOURCE,
  },
  {
    id: 'cannes-croisette', cityId: 'cannes', category: 'landmark', image: require('../../../assets/offline-pois/cannes/croisette.webp'), imageCredit: CREDIT,
    name: { fr: 'Boulevard de la Croisette', en: 'Boulevard de la Croisette', zh: '十字大道' }, address: { fr: 'Boulevard de la Croisette, 06400 Cannes, France', en: 'Boulevard de la Croisette, 06400 Cannes, France', zh: 'Boulevard de la Croisette, 06400 戛纳, 法国' },
    description: { fr: 'Promenade littorale bordée de plages, palmiers, grands hôtels et boutiques, face à la baie de Cannes.', en: 'A seafront promenade lined with beaches, palms, grand hotels and shops facing Cannes Bay.', zh: '海滨长廊，两旁是海滩、棕榈树、豪华酒店和面向戛纳湾的商店。' },
    highlights: [{ fr: 'Promenade en bord de mer', en: 'Seafront walk', zh: '海滨漫步' }, { fr: 'Hôtels historiques', en: 'Historic hotels', zh: '历史酒店' }], suggestedDurationMinutes: 120, latitude: 43.55, longitude: 7.028, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-suquet', cityId: 'cannes', category: 'historic', image: require('../../../assets/offline-pois/cannes/suquet.webp'), imageCredit: CREDIT,
    name: { fr: 'Le Suquet', en: 'Le Suquet', zh: '勒苏盖' }, address: { fr: 'Rue Saint-Antoine, 06400 Cannes, France', en: 'Rue Saint-Antoine, 06400 Cannes, France', zh: '圣安东尼街, 06400 戛纳, 法国' },
    description: { fr: 'Quartier ancien de Cannes aux ruelles en pente, maisons colorées et points de vue sur le port et la baie.', en: 'Cannes’ old quarter, with sloping lanes, colourful houses and views over the harbour and bay.', zh: '戛纳的老城区，拥有倾斜的小巷、色彩缤纷的房屋以及海港和海湾的景色。' },
    highlights: [{ fr: 'Ruelles du vieux Cannes', en: 'Old Cannes lanes', zh: '戛纳老巷' }, { fr: 'Panorama depuis la colline', en: 'Hilltop panorama', zh: '山顶全景' }], suggestedDurationMinutes: 90, latitude: 43.551, longitude: 7.009, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-marche-forville', cityId: 'cannes', category: 'historic', image: require('../../../assets/offline-pois/cannes/marche-forville.webp'), imageCredit: CREDIT,
    name: { fr: 'Marché Forville', en: 'Forville Market', zh: '福维尔市场' }, address: { fr: '6 rue du Marché-Forville, 06400 Cannes, France', en: '6 Rue du Marché-Forville, 06400 Cannes, France', zh: '6 Rue du Marché-Forville, 06400 戛纳, 法国' },
    description: { fr: 'Marché couvert animé proposant produits provençaux, fleurs, poissons et spécialités locales.', en: 'A lively covered market offering Provençal produce, flowers, fish and local specialities.', zh: '热闹的室内市场，提供普罗旺斯农产品、鲜花、鱼类和当地特色产品。' },
    highlights: [{ fr: 'Produits méditerranéens', en: 'Mediterranean produce', zh: '地中海农产品' }, { fr: 'Ambiance locale', en: 'Local atmosphere', zh: '当地气氛' }], suggestedDurationMinutes: 60, latitude: 43.552, longitude: 7.01, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-sainte-marguerite', cityId: 'cannes', category: 'park', image: require('../../../assets/offline-pois/cannes/sainte-marguerite.webp'), imageCredit: CREDIT,
    name: { fr: 'Île Sainte-Marguerite', en: 'Sainte-Marguerite Island', zh: '圣玛格丽特岛' }, address: { fr: 'Île Sainte-Marguerite, 06400 Cannes, France', en: 'Sainte-Marguerite Island, 06400 Cannes, France', zh: '圣玛格丽特岛, 06400 戛纳, 法国' },
    description: { fr: 'Plus grande île de Lérins, couverte de forêts et parcourue de sentiers longeant criques et étangs.', en: 'The largest Lérins island, covered in forest with trails along coves and lagoons.', zh: '最大的莱兰岛，森林覆盖，沿海湾和泻湖设有小径。' },
    highlights: [{ fr: 'Sentiers forestiers', en: 'Forest trails', zh: '森林小径' }, { fr: 'Criques et étang du Batéguier', en: 'Coves and Batéguier lagoon', zh: '海湾和巴特吉耶泻湖' }], suggestedDurationMinutes: 240, latitude: 43.523, longitude: 7.045, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-fort-royal', cityId: 'cannes', category: 'museum', image: require('../../../assets/offline-pois/cannes/fort-royal.webp'), imageCredit: CREDIT,
    name: { fr: 'Fort Royal – Musée du Masque de fer', en: 'Fort Royal – Museum of the Man in the Iron Mask', zh: '皇家堡 – 铁面人博物馆' }, address: { fr: 'Fort Royal, île Sainte-Marguerite, 06400 Cannes, France', en: 'Fort Royal, Sainte-Marguerite Island, 06400 Cannes, France', zh: '皇家堡，圣玛格丽特岛，06400 戛纳，法国' },
    description: { fr: 'Fort insulaire abritant l’ancienne prison du mystérieux Masque de fer et un musée maritime.', en: 'An island fort containing the former prison of the mysterious Man in the Iron Mask and a maritime museum.', zh: '一座岛屿堡垒，内有神秘铁面人的前监狱和海事博物馆。' },
    highlights: [{ fr: 'Cellule du Masque de fer', en: 'Man in the Iron Mask cell', zh: '铁面牢房中的人' }, { fr: 'Vestiges archéologiques', en: 'Archaeological remains', zh: '考古遗迹' }], suggestedDurationMinutes: 120, latitude: 43.5235, longitude: 7.039, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-saint-honorat', cityId: 'cannes', category: 'park', image: require('../../../assets/offline-pois/cannes/saint-honorat.webp'), imageCredit: CREDIT,
    name: { fr: 'Île Saint-Honorat', en: 'Saint-Honorat Island', zh: '圣奥诺拉岛' }, address: { fr: 'Île Saint-Honorat, 06400 Cannes, France', en: 'Saint-Honorat Island, 06400 Cannes, France', zh: '圣奥诺拉岛, 06400 戛纳, 法国' },
    description: { fr: 'Petite île paisible occupée par des moines, entre pins, vignes, chapelles et rivages rocheux.', en: 'A peaceful small island inhabited by monks, with pines, vineyards, chapels and rocky shores.', zh: '一座宁静的小岛，居住着僧侣，岛上有松树、葡萄园、教堂和岩石海岸。' },
    highlights: [{ fr: 'Vignobles monastiques', en: 'Monastic vineyards', zh: '修道院葡萄园' }, { fr: 'Promenade autour de l’île', en: 'Walk around the island', zh: '环岛漫步' }], suggestedDurationMinutes: 240, latitude: 43.509, longitude: 7.047, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-abbaye-lerins', cityId: 'cannes', category: 'religious', image: require('../../../assets/offline-pois/cannes/abbaye-lerins.webp'), imageCredit: CREDIT,
    name: { fr: 'Abbaye de Lérins', en: 'Lérins Abbey', zh: '莱兰修道院' }, address: { fr: 'Abbaye de Lérins, île Saint-Honorat, 06400 Cannes, France', en: 'Lérins Abbey, Saint-Honorat Island, 06400 Cannes, France', zh: '莱兰修道院，圣奥诺拉岛，06400 戛纳，法国' },
    description: { fr: 'Monastère cistercien toujours actif, héritier d’une présence monastique remontant au Ve siècle.', en: 'An active Cistercian monastery continuing a monastic presence dating back to the 5th century.', zh: '一座活跃的西多会修道院，其修道院的存在可以追溯到 5 世纪。' },
    highlights: [{ fr: 'Église abbatiale', en: 'Abbey church', zh: '修道院教堂' }, { fr: 'Cloître et vie monastique', en: 'Cloister and monastic life', zh: '回廊和修道院生活' }], suggestedDurationMinutes: 75, latitude: 43.507, longitude: 7.045, website: 'https://www.abbayedelerins.com/', sourceUrl: SOURCE,
  },
  {
    id: 'cannes-musee-explorations', cityId: 'cannes', category: 'museum', image: require('../../../assets/offline-pois/cannes/musee-explorations.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée des Explorations du Monde', en: 'Museum of World Explorations', zh: '世界探索博物馆' }, address: { fr: 'Place de la Castre, 06400 Cannes, France', en: 'Place de la Castre, 06400 Cannes, France', zh: '卡斯特广场, 06400 戛纳, 法国' },
    description: { fr: 'Musée installé dans le château médiéval du Suquet, consacré aux arts du monde, antiquités et paysages de Cannes.', en: 'A museum in Le Suquet’s medieval castle devoted to world arts, antiquities and Cannes landscapes.', zh: '位于勒苏盖中世纪城堡的博物馆，专门展示世界艺术、古董和戛纳风景。' },
    highlights: [{ fr: 'Collections extra-européennes', en: 'Non-European collections', zh: '非欧洲收藏' }, { fr: 'Vue depuis la tour', en: 'View from the tower', zh: '从塔楼看去' }], suggestedDurationMinutes: 120, latitude: 43.5515, longitude: 7.0094, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-notre-dame-esperance', cityId: 'cannes', category: 'religious', image: require('../../../assets/offline-pois/cannes/notre-dame-esperance.webp'), imageCredit: CREDIT,
    name: { fr: 'Église Notre-Dame-d’Espérance', en: 'Church of Notre-Dame-d’Espérance', zh: '埃斯佩朗斯圣母教堂' }, address: { fr: 'Place de la Castre, 06400 Cannes, France', en: 'Place de la Castre, 06400 Cannes, France', zh: '卡斯特广场, 06400 戛纳, 法国' },
    description: { fr: 'Église gothique provençale au sommet du Suquet, dominant la ville et la baie.', en: 'A Provençal Gothic church at the top of Le Suquet, overlooking the city and bay.', zh: '一座普罗旺斯哥特式教堂，位于苏盖岛山顶，俯瞰城市和海湾。' },
    highlights: [{ fr: 'Architecture gothique provençale', en: 'Provençal Gothic architecture', zh: '普罗旺斯哥特式建筑' }, { fr: 'Vue sur Cannes', en: 'View over Cannes', zh: '俯瞰戛纳' }], suggestedDurationMinutes: 45, latitude: 43.5515, longitude: 7.009, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-vieux-port', cityId: 'cannes', category: 'historic', image: require('../../../assets/offline-pois/cannes/vieux-port.webp'), imageCredit: CREDIT,
    name: { fr: 'Vieux-Port de Cannes', en: 'Old Port of Cannes', zh: '戛纳旧港' }, address: { fr: 'Quai Saint-Pierre, 06400 Cannes, France', en: 'Quai Saint-Pierre, 06400 Cannes, France', zh: 'Quai Saint-Pierre, 06400 戛纳, 法国' },
    description: { fr: 'Port historique au pied du Suquet, associant bateaux de pêche, yachts et vues sur le front de mer.', en: 'The historic harbour below Le Suquet, combining fishing boats, yachts and waterfront views.', zh: '苏盖岛下方历史悠久的港口，汇集了渔船、游艇和海滨景观。' },
    highlights: [{ fr: 'Quai Saint-Pierre', en: 'Quai Saint-Pierre', zh: '圣皮埃尔码头' }, { fr: 'Vue sur le Suquet', en: 'View of Le Suquet', zh: '苏给岛景观' }], suggestedDurationMinutes: 60, latitude: 43.55, longitude: 7.012, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-ecomusee-sous-marin', cityId: 'cannes', category: 'museum', image: require('../../../assets/offline-pois/cannes/ecomusee-sous-marin.webp'), imageCredit: CREDIT,
    name: { fr: 'Écomusée sous-marin', en: 'Underwater Ecomuseum', zh: '水下生态博物馆' }, address: { fr: 'Anse de la Batterie, île Sainte-Marguerite, 06400 Cannes, France', en: 'Anse de la Batterie, Sainte-Marguerite Island, 06400 Cannes, France', zh: 'Anse de la Batterie, 圣玛格丽特岛, 06400 戛纳, 法国' },
    description: { fr: 'Parcours subaquatique gratuit composé de six visages monumentaux immergés près du rivage.', en: 'A free underwater trail of six monumental faces submerged near the shore.', zh: '一条自由的水下小径，由六个巨大的面孔淹没在海岸附近。' },
    highlights: [{ fr: 'Sculptures de Jason deCaires Taylor', en: 'Sculptures by Jason deCaires Taylor', zh: 'Jason deCaires Taylor 的雕塑' }, { fr: 'Découverte en masque et tuba', en: 'Snorkelling discovery', zh: '浮潜发现' }], suggestedDurationMinutes: 90, latitude: 43.52, longitude: 7.048, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-croix-gardes', cityId: 'cannes', category: 'park', image: require('../../../assets/offline-pois/cannes/croix-gardes.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc naturel forestier de la Croix-des-Gardes', en: 'Croix-des-Gardes Natural Forest Park', zh: 'Croix-des-Gardes自然森林公园' }, address: { fr: '166 boulevard Leader, 06400 Cannes, France', en: '166 Boulevard Leader, 06400 Cannes, France', zh: '166 Boulevard Leader, 06400 戛纳, 法国' },
    description: { fr: 'Grand espace naturel sur les hauteurs, sillonné de sentiers et ponctué de belvédères sur la baie.', en: 'A large natural area on the heights, crossed by trails and dotted with viewpoints over the bay.', zh: '高处的一大片自然区域，小径穿过，海湾上的观景点星罗棋布。' },
    highlights: [{ fr: 'Sentiers de randonnée', en: 'Hiking trails', zh: '远足径' }, { fr: 'Panoramas sur les îles', en: 'Views over the islands', zh: '岛屿景观' }], suggestedDurationMinutes: 120, latitude: 43.556, longitude: 6.993, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-villa-rothschild', cityId: 'cannes', category: 'historic', image: require('../../../assets/offline-pois/cannes/villa-rothschild.webp'), imageCredit: CREDIT,
    name: { fr: 'Villa Rothschild — Médiathèque Noailles', en: 'Villa Rothschild — Noailles Media Library', zh: '罗斯柴尔德别墅 — 诺阿耶媒体图书馆' }, address: { fr: '1 avenue Jean de Noailles, 06400 Cannes, France', en: '1 Avenue Jean de Noailles, 06400 Cannes, France', zh: '1 Avenue Jean de Noailles, 06400 戛纳, 法国' },
    description: { fr: 'Villa néoclassique du XIXe siècle devenue médiathèque, entourée d’un jardin historique sur les hauteurs de Cannes.', en: 'A 19th-century Neoclassical villa converted into a media library, surrounded by a historic garden on the heights of Cannes.', zh: '一座 19 世纪的新古典主义别墅改建为媒体图书馆，周围环绕着戛纳高地历史悠久的花园。' },
    highlights: [{ fr: 'Façade néoclassique', en: 'Neoclassical façade', zh: '新古典主义外观' }, { fr: 'Jardin historique', en: 'Historic garden', zh: '历史花园' }], suggestedDurationMinutes: 75, latitude: 43.5516, longitude: 7.0025, sourceUrl: SOURCE,
  },
  {
    id: 'cannes-malmaison', cityId: 'cannes', category: 'museum', image: require('../../../assets/offline-pois/cannes/malmaison.webp'), imageCredit: CREDIT,
    name: { fr: 'La Malmaison', en: 'La Malmaison', zh: '拉马尔梅松' }, address: { fr: '47 boulevard de la Croisette, 06400 Cannes, France', en: '47 Boulevard de la Croisette, 06400 Cannes, France', zh: '47 Boulevard de la Croisette, 06400 戛纳, 法国' },
    description: { fr: 'Centre d’art contemporain installé dans l’ancien pavillon d’un grand hôtel de la Croisette.', en: 'A contemporary art centre housed in the former pavilion of a grand Croisette hotel.', zh: '当代艺术中心，位于海滨大道一家豪华酒店的前凉亭内。' },
    highlights: [{ fr: 'Expositions temporaires', en: 'Temporary exhibitions', zh: '临时展览' }, { fr: 'Bâtiment historique de la Croisette', en: 'Historic Croisette building', zh: '历史悠久的海滨大道建筑' }], suggestedDurationMinutes: 90, latitude: 43.552, longitude: 7.024, sourceUrl: SOURCE,
  },
];

export const CANNES_POIS: OfflinePOI[] = seeds.map(createFrenchPOI);
