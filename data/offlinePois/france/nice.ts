import type { OfflinePOI } from '../../../types/offlinePoi';
import { createFrenchPOI, type FrenchPOISeed } from './helpers';

const SOURCE = 'https://www.explorenicecotedazur.com/decouvrir/nice/';
const CREDIT = 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md';

const seeds: FrenchPOISeed[] = [
  {
    id: 'nice-promenade-anglais', cityId: 'nice', category: 'landmark', image: require('../../../assets/offline-pois/nice/promenade-anglais.webp'), imageCredit: CREDIT,
    name: { fr: 'Promenade des Anglais', en: 'Promenade des Anglais', zh: '英国大道' }, address: { fr: 'Promenade des Anglais, 06000 Nice, France', en: 'Promenade des Anglais, 06000 Nice, France', zh: '英国大道，06000 尼斯，法国' },
    description: { fr: 'Célèbre avenue longeant la baie des Anges, ponctuée de chaises bleues, plages et façades Belle Époque.', en: 'The famous avenue along the Bay of Angels, lined with blue chairs, beaches and Belle Époque façades.', zh: '天使湾沿岸的著名大道，两旁排列着蓝色椅子、海滩和美好年代风格的外观。' },
    highlights: [{ fr: 'Baie des Anges', en: 'Bay of Angels', zh: '天使湾' }, { fr: 'Chaises bleues emblématiques', en: 'Iconic blue chairs', zh: '标志性的蓝色椅子' }], suggestedDurationMinutes: 120, latitude: 43.695, longitude: 7.265, sourceUrl: SOURCE,
  },
  {
    id: 'nice-colline-chateau', cityId: 'nice', category: 'park', image: require('../../../assets/offline-pois/nice/colline-chateau.webp'), imageCredit: CREDIT,
    name: { fr: 'Colline du Château', en: 'Castle Hill', zh: '城堡山' }, address: { fr: 'Montée Lesage, 06300 Nice, France', en: 'Montée Lesage, 06300 Nice, France', zh: 'Montée Lesage, 06300 尼斯, 法国' },
    description: { fr: 'Parc élevé sur l’ancien site du château, offrant des vues sur le Vieux-Nice, le port et la baie.', en: 'A hilltop park on the former castle site, with views over Old Nice, the port and bay.', zh: '位于前城堡遗址上的山顶公园，可欣赏旧尼斯、港口和海湾的景色。' },
    highlights: [{ fr: 'Panorama sur la ville', en: 'City panorama', zh: '城市全景' }, { fr: 'Cascade et vestiges', en: 'Waterfall and remains', zh: '瀑布和遗迹' }], suggestedDurationMinutes: 90, latitude: 43.697, longitude: 7.28, sourceUrl: SOURCE,
  },
  {
    id: 'nice-vieux-nice', cityId: 'nice', category: 'historic', image: require('../../../assets/offline-pois/nice/vieux-nice.webp'), imageCredit: CREDIT,
    name: { fr: 'Vieux-Nice', en: 'Old Nice', zh: '老尼斯' }, address: { fr: 'Place Rossetti, 06300 Nice, France', en: 'Place Rossetti, 06300 Nice, France', zh: '罗塞蒂广场, 06300 尼斯, 法国' },
    description: { fr: 'Quartier historique aux ruelles étroites, façades colorées, églises baroques et commerces niçois.', en: 'A historic district of narrow lanes, colourful façades, Baroque churches and Niçois shops.', zh: '历史悠久的街区，拥有狭窄的小巷、色彩缤纷的外墙、巴洛克式教堂和尼索瓦商店。' },
    highlights: [{ fr: 'Ruelles et placettes', en: 'Lanes and small squares', zh: '巷子和小广场' }, { fr: 'Architecture baroque', en: 'Baroque architecture', zh: '巴洛克建筑' }], suggestedDurationMinutes: 150, latitude: 43.697, longitude: 7.277, sourceUrl: SOURCE,
  },
  {
    id: 'nice-place-massena', cityId: 'nice', category: 'landmark', image: require('../../../assets/offline-pois/nice/place-massena.webp'), imageCredit: CREDIT,
    name: { fr: 'Place Masséna', en: 'Place Masséna', zh: '马塞纳广场' }, address: { fr: 'Place Masséna, 06000 Nice, France', en: 'Place Masséna, 06000 Nice, France', zh: '马塞纳广场, 06000 尼斯, 法国' },
    description: { fr: 'Grande place centrale reconnaissable à son dallage noir et blanc, ses façades rouges et ses œuvres contemporaines.', en: 'A major central square recognisable by its black-and-white paving, red façades and contemporary art.', zh: '一个主要的中心广场，以其黑白铺路、红色外墙和当代艺术而闻名。' },
    highlights: [{ fr: 'Fontaine du Soleil', en: 'Fountain of the Sun', zh: '太阳喷泉' }, { fr: 'Sculptures de Jaume Plensa', en: 'Jaume Plensa sculptures', zh: 'Jaume Plensa 雕塑' }], suggestedDurationMinutes: 45, latitude: 43.697, longitude: 7.27, sourceUrl: SOURCE,
  },
  {
    id: 'nice-cours-saleya', cityId: 'nice', category: 'historic', image: require('../../../assets/offline-pois/nice/cours-saleya.webp'), imageCredit: CREDIT,
    name: { fr: 'Cours Saleya', en: 'Cours Saleya', zh: '萨勒亚大道' }, address: { fr: 'Cours Saleya, 06300 Nice, France', en: 'Cours Saleya, 06300 Nice, France', zh: '萨勒亚大道, 06300 尼斯, 法国' },
    description: { fr: 'Place animée du Vieux-Nice accueillant marchés aux fleurs et produits, terrasses et façades colorées.', en: 'A lively Old Nice square hosting flower and produce markets, terraces and colourful façades.', zh: '热闹的老尼斯广场，设有鲜花和农产品市场、露台和色彩缤纷的外墙。' },
    highlights: [{ fr: 'Marché aux fleurs', en: 'Flower market', zh: '花卉市场' }, { fr: 'Spécialités niçoises', en: 'Niçois specialities', zh: '尼索瓦特色菜' }], suggestedDurationMinutes: 75, latitude: 43.696, longitude: 7.275, sourceUrl: SOURCE,
  },
  {
    id: 'nice-musee-matisse', cityId: 'nice', category: 'museum', image: require('../../../assets/offline-pois/nice/musee-matisse.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée Matisse', en: 'Matisse Museum', zh: '马蒂斯博物馆' }, address: { fr: '164 avenue des Arènes-de-Cimiez, 06000 Nice, France', en: '164 Avenue des Arènes-de-Cimiez, 06000 Nice, France', zh: '164 Avenue des Arènes-de-Cimiez, 06000 尼斯, 法国' },
    description: { fr: 'Musée consacré au parcours d’Henri Matisse, installé dans une villa génoise au cœur de Cimiez.', en: 'A museum devoted to Henri Matisse’s career, housed in a Genoese villa in the heart of Cimiez.', zh: '一座致力于亨利·马蒂斯职业生涯的博物馆，位于西米耶中心的一栋热那亚别墅内。' },
    highlights: [{ fr: 'Œuvres de toutes les périodes', en: 'Works from every period', zh: '各个时期的作品' }, { fr: 'Villa des Arènes', en: 'Villa des Arènes', zh: '竞技场别墅' }], suggestedDurationMinutes: 120, latitude: 43.719, longitude: 7.276, website: 'https://www.musee-matisse-nice.org/', sourceUrl: SOURCE,
  },
  {
    id: 'nice-musee-chagall', cityId: 'nice', category: 'museum', image: require('../../../assets/offline-pois/nice/musee-chagall.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée national Marc Chagall', en: 'Marc Chagall National Museum', zh: '马克·夏加尔国家博物馆' }, address: { fr: 'Avenue du Docteur-Ménard, 06000 Nice, France', en: 'Avenue du Docteur-Ménard, 06000 Nice, France', zh: '梅纳德博士大道，06000 尼斯，法国' },
    description: { fr: 'Musée conçu autour du Message Biblique de Marc Chagall, complété par vitraux, mosaïque et œuvres graphiques.', en: 'A museum centred on Marc Chagall’s Biblical Message, with stained glass, mosaic and graphic works.', zh: '以马克·夏加尔的圣经讯息为中心的博物馆，有彩色玻璃、马赛克和图形作品。' },
    highlights: [{ fr: 'Cycle du Message Biblique', en: 'Biblical Message cycle', zh: '圣经信息周期' }, { fr: 'Vitraux de Chagall', en: 'Chagall stained glass', zh: '夏加尔彩色玻璃' }], suggestedDurationMinutes: 120, latitude: 43.709, longitude: 7.269, website: 'https://musees-nationaux-alpesmaritimes.fr/chagall/', sourceUrl: SOURCE,
  },
  {
    id: 'nice-palais-lascaris', cityId: 'nice', category: 'museum', image: require('../../../assets/offline-pois/nice/palais-lascaris.webp'), imageCredit: CREDIT,
    name: { fr: 'Palais Lascaris', en: 'Palais Lascaris', zh: '拉斯卡里斯宫' }, address: { fr: '15 rue Droite, 06300 Nice, France', en: '15 Rue Droite, 06300 Nice, France', zh: '15 Rue Droite, 06300 尼斯, 法国' },
    description: { fr: 'Palais baroque du XVIIe siècle présentant décors historiques et collection d’instruments de musique anciens.', en: 'A 17th-century Baroque palace presenting historic interiors and a collection of early musical instruments.', zh: '一座 17 世纪的巴洛克式宫殿，拥有历史悠久的内饰和一系列早期乐器。' },
    highlights: [{ fr: 'Décors baroques', en: 'Baroque interiors', zh: '巴洛克风格的内饰' }, { fr: 'Instruments de musique', en: 'Musical instruments', zh: '乐器' }], suggestedDurationMinutes: 90, latitude: 43.698, longitude: 7.278, sourceUrl: SOURCE,
  },
  {
    id: 'nice-sainte-reparate', cityId: 'nice', category: 'religious', image: require('../../../assets/offline-pois/nice/sainte-reparate.webp'), imageCredit: CREDIT,
    name: { fr: 'Cathédrale Sainte-Réparate', en: 'Nice Cathedral', zh: '尼斯大教堂' }, address: { fr: '3 place Rossetti, 06300 Nice, France', en: '3 Place Rossetti, 06300 Nice, France', zh: '3 Place Rossetti, 06300 尼斯, 法国' },
    description: { fr: 'Cathédrale baroque du Vieux-Nice dédiée à sainte Réparate, dotée d’une coupole en tuiles vernissées.', en: 'A Baroque cathedral in Old Nice dedicated to Saint Reparata, with a glazed-tile dome.', zh: '尼斯旧城的一座巴洛克式大教堂，供奉圣雷帕拉塔，有琉璃瓦圆顶。' },
    highlights: [{ fr: 'Intérieur baroque', en: 'Baroque interior', zh: '巴洛克风格的内饰' }, { fr: 'Coupole colorée', en: 'Colourful dome', zh: '彩色圆顶' }], suggestedDurationMinutes: 45, latitude: 43.697, longitude: 7.276, sourceUrl: SOURCE,
  },
  {
    id: 'nice-cathedrale-russe', cityId: 'nice', category: 'religious', image: require('../../../assets/offline-pois/nice/cathedrale-russe.webp'), imageCredit: CREDIT,
    name: { fr: 'Cathédrale orthodoxe Saint-Nicolas', en: 'Saint Nicholas Orthodox Cathedral', zh: '圣尼古拉东正教大教堂' }, address: { fr: 'Avenue Nicolas-II, 06000 Nice, France', en: 'Avenue Nicolas-II, 06000 Nice, France', zh: '尼古拉斯二世大道，06000 尼斯，法国' },
    description: { fr: 'Édifice orthodoxe russe aux coupoles colorées, construit au début du XXe siècle pour la communauté russe.', en: 'A Russian Orthodox church with colourful domes, built in the early 20th century for the Russian community.', zh: '一座拥有彩色圆顶的俄罗斯东正教教堂，建于 20 世纪初，为俄罗斯社区服务。' },
    highlights: [{ fr: 'Coupoles à bulbe', en: 'Onion domes', zh: '洋葱圆顶' }, { fr: 'Icônes et boiseries', en: 'Icons and woodwork', zh: '图标和木制品' }], suggestedDurationMinutes: 60, latitude: 43.703, longitude: 7.253, website: 'https://cathedrale-russe-nice.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'nice-monastere-cimiez', cityId: 'nice', category: 'religious', image: require('../../../assets/offline-pois/nice/monastere-cimiez.webp'), imageCredit: CREDIT,
    name: { fr: 'Monastère de Cimiez et ses jardins', en: 'Cimiez Monastery and Gardens', zh: '西米耶修道院和花园' }, address: { fr: 'Place Jean-Paul-II, 06000 Nice, France', en: 'Place Jean-Paul-II, 06000 Nice, France', zh: '让·保罗二世广场，06000 尼斯，法国' },
    description: { fr: 'Monastère franciscain entouré d’un jardin historique offrant des perspectives sur Nice et la Méditerranée.', en: 'A Franciscan monastery surrounded by a historic garden with views towards Nice and the Mediterranean.', zh: '一座方济会修道院，周围环绕着历史悠久的花园，可欣赏尼斯和地中海的景色。' },
    highlights: [{ fr: 'Jardin à l’italienne', en: 'Italian-style garden', zh: '意式花园' }, { fr: 'Église et cloître', en: 'Church and cloister', zh: '教堂和回廊' }], suggestedDurationMinutes: 75, latitude: 43.72, longitude: 7.276, sourceUrl: SOURCE,
  },
  {
    id: 'nice-archeologie-cimiez', cityId: 'nice', category: 'historic', image: require('../../../assets/offline-pois/nice/archeologie-cimiez.webp'), imageCredit: CREDIT,
    name: { fr: 'Arènes et musée archéologique de Cimiez', en: 'Cimiez Arena and Archaeology Museum', zh: '西米耶竞技场和考古博物馆' }, address: { fr: '160 avenue des Arènes-de-Cimiez, 06000 Nice, France', en: '160 Avenue des Arènes-de-Cimiez, 06000 Nice, France', zh: '160 Avenue des Arènes-de-Cimiez, 06000 尼斯, 法国' },
    description: { fr: 'Site de la ville romaine de Cemenelum avec amphithéâtre, thermes et collections archéologiques.', en: 'The site of the Roman city of Cemenelum, with an amphitheatre, baths and archaeological collections.', zh: '罗马城市塞梅内勒姆遗址，拥有圆形剧场、浴室和考古收藏品。' },
    highlights: [{ fr: 'Thermes romains', en: 'Roman baths', zh: '罗马浴场' }, { fr: 'Amphithéâtre antique', en: 'Ancient amphitheatre', zh: '古代圆形剧场' }], suggestedDurationMinutes: 120, latitude: 43.719, longitude: 7.276, sourceUrl: SOURCE,
  },
  {
    id: 'nice-promenade-paillon', cityId: 'nice', category: 'park', image: require('../../../assets/offline-pois/nice/promenade-paillon.webp'), imageCredit: CREDIT,
    name: { fr: 'Promenade du Paillon', en: 'Promenade du Paillon', zh: '帕永长廊' }, address: { fr: 'Promenade du Paillon, 06000 Nice, France', en: 'Promenade du Paillon, 06000 Nice, France', zh: 'Promenade du Paillon, 06000 尼斯, 法国' },
    description: { fr: 'Coulée verte traversant le centre de Nice, dotée de jardins thématiques, jeux et miroir d’eau.', en: 'A green corridor through central Nice, with themed gardens, play areas and a water mirror.', zh: '穿过尼斯市中心的绿色走廊，设有主题花园、游乐区和水镜。' },
    highlights: [{ fr: 'Miroir d’eau', en: 'Water mirror', zh: '水镜' }, { fr: 'Jardins urbains', en: 'Urban gardens', zh: '城市花园' }], suggestedDurationMinutes: 75, latitude: 43.701, longitude: 7.275, sourceUrl: SOURCE,
  },
  {
    id: 'nice-parc-phoenix', cityId: 'nice', category: 'park', image: require('../../../assets/offline-pois/nice/parc-phoenix.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc Phoenix', en: 'Parc Phoenix', zh: '凤凰公园' }, address: { fr: '405 promenade des Anglais, 06200 Nice, France', en: '405 Promenade des Anglais, 06200 Nice, France', zh: '405 Promenade des Anglais, 06200 尼斯, 法国' },
    description: { fr: 'Parc botanique et zoologique regroupant serre tropicale, jardins thématiques, lac et animaux.', en: 'A botanical and zoological park with a tropical greenhouse, themed gardens, lake and animals.', zh: '一个动植物公园，设有热带温室、主题花园、湖泊和动物。' },
    highlights: [{ fr: 'Grande serre tropicale', en: 'Large tropical greenhouse', zh: '大型热带温室' }, { fr: 'Jardins et faune', en: 'Gardens and wildlife', zh: '花园和野生动物' }], suggestedDurationMinutes: 180, latitude: 43.668, longitude: 7.216, website: 'https://www.parc-phoenix.org/', sourceUrl: SOURCE,
  },
  {
    id: 'nice-port-lympia', cityId: 'nice', category: 'historic', image: require('../../../assets/offline-pois/nice/port-lympia.webp'), imageCredit: CREDIT,
    name: { fr: 'Port Lympia', en: 'Port Lympia', zh: '林匹亚港' }, address: { fr: 'Quai des Deux-Emmanuel, 06300 Nice, France', en: 'Quai des Deux-Emmanuel, 06300 Nice, France', zh: 'Quai des Deux-Emmanuel, 06300 尼斯, 法国' },
    description: { fr: 'Port historique bordé de façades colorées et de quais animés, entre le mont Boron et la vieille ville.', en: 'A historic harbour lined with colourful façades and lively quays, between Mont Boron and the old town.', zh: '历史悠久的港口，位于博隆山和老城区之间，两旁是色彩缤纷的外墙和热闹的码头。' },
    highlights: [{ fr: 'Pointus niçois', en: 'Traditional Niçois boats', zh: '传统尼索瓦船' }, { fr: 'Façades colorées', en: 'Colourful façades', zh: '色彩缤纷的外墙' }], suggestedDurationMinutes: 75, latitude: 43.699, longitude: 7.287, sourceUrl: SOURCE,
  },
];

export const NICE_POIS: OfflinePOI[] = seeds.map(createFrenchPOI);
