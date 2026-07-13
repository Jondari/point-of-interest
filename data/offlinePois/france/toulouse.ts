import type { OfflinePOI } from '../../../types/offlinePoi';
import { createFrenchPOI, type FrenchPOISeed } from './helpers';

const SOURCE = 'https://www.toulouse-tourisme.com/nos-incontournables/';
const CREDIT = 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md';

const seeds: FrenchPOISeed[] = [
  {
    id: 'toulouse-capitole', cityId: 'toulouse', category: 'landmark', image: require('../../../assets/offline-pois/toulouse/capitole.webp'), imageCredit: CREDIT,
    name: { fr: 'Place du Capitole', en: 'Place du Capitole', zh: '卡皮托勒广场' }, address: { fr: 'Place du Capitole, 31000 Toulouse, France', en: 'Place du Capitole, 31000 Toulouse, France', zh: '卡皮托勒广场, 31000 图卢兹, 法国' },
    description: { fr: 'Place emblématique de la ville rose, bordée par le Capitole qui abrite l’hôtel de ville et le théâtre.', en: 'The Pink City’s emblematic square, bordered by the Capitole housing City Hall and the theatre.', zh: '粉红之城的标志性广场，毗邻国会大厦、市政厅和剧院。' },
    highlights: [{ fr: 'Façade monumentale', en: 'Monumental façade', zh: '巨大的外观' }, { fr: 'Salles historiques', en: 'Historic state rooms', zh: '历史悠久的客房' }], suggestedDurationMinutes: 60, latitude: 43.6045, longitude: 1.444, sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-saint-sernin', cityId: 'toulouse', category: 'religious', image: require('../../../assets/offline-pois/toulouse/saint-sernin.webp'), imageCredit: CREDIT,
    name: { fr: 'Basilique Saint-Sernin', en: 'Basilica of Saint-Sernin', zh: '圣塞尔宁大教堂' }, address: { fr: 'Place Saint-Sernin, 31000 Toulouse, France', en: 'Place Saint-Sernin, 31000 Toulouse, France', zh: '圣瑟宁广场, 31000 图卢兹, 法国' },
    description: { fr: 'Grande basilique romane en brique, étape majeure des chemins de Saint-Jacques-de-Compostelle.', en: 'A vast brick Romanesque basilica and a major stop on the Way of Saint James.', zh: '一座巨大的砖砌罗马式大教堂，也是圣詹姆斯之路上的一个主要站点。' },
    highlights: [{ fr: 'Architecture romane', en: 'Romanesque architecture', zh: '罗马式建筑' }, { fr: 'Reliques et crypte', en: 'Relics and crypt', zh: '遗迹和地窖' }], suggestedDurationMinutes: 60, latitude: 43.6084, longitude: 1.441, sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-jacobins', cityId: 'toulouse', category: 'religious', image: require('../../../assets/offline-pois/toulouse/jacobins.webp'), imageCredit: CREDIT,
    name: { fr: 'Couvent des Jacobins', en: 'Convent of the Jacobins', zh: '雅各宾派修道院' }, address: { fr: 'Place des Jacobins, 31000 Toulouse, France', en: 'Place des Jacobins, 31000 Toulouse, France', zh: '雅各宾广场, 31000 图卢兹, 法国' },
    description: { fr: 'Ensemble gothique méridional réputé pour son spectaculaire pilier en forme de palmier et son cloître.', en: 'A Southern Gothic complex famed for its spectacular palm-shaped column and cloister.', zh: '一座南方哥特式建筑群，以其壮观的棕榈形圆柱和回廊而闻名。' },
    highlights: [{ fr: 'Palmier de pierre', en: 'Stone palm column', zh: '石掌柱' }, { fr: 'Cloître médiéval', en: 'Medieval cloister', zh: '中世纪回廊' }], suggestedDurationMinutes: 75, latitude: 43.6039, longitude: 1.439, website: 'https://jacobins.toulouse.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-cite-espace', cityId: 'toulouse', category: 'museum', image: require('../../../assets/offline-pois/toulouse/cite-espace.webp'), imageCredit: CREDIT,
    name: { fr: 'Cité de l’espace', en: 'Cité de l’espace', zh: '太空城' }, address: { fr: 'Avenue Jean-Gonord, 31500 Toulouse, France', en: 'Avenue Jean-Gonord, 31500 Toulouse, France', zh: 'Jean-Gonord 大街, 31500 图卢兹, 法国' },
    description: { fr: 'Parc scientifique consacré à l’exploration spatiale, avec engins grandeur nature, expositions et planétarium.', en: 'A science park dedicated to space exploration, with full-scale spacecraft, exhibitions and a planetarium.', zh: '一个致力于太空探索的科学园，拥有全尺寸航天器、展览和天文馆。' },
    highlights: [{ fr: 'Fusée Ariane 5', en: 'Ariane 5 rocket', zh: '阿丽亚娜5号火箭' }, { fr: 'Station Mir et planétarium', en: 'Mir station and planetarium', zh: '和平号空间站和天文馆' }], suggestedDurationMinutes: 240, latitude: 43.586, longitude: 1.493, website: 'https://www.cite-espace.com/', sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-aeroscopia', cityId: 'toulouse', category: 'museum', image: require('../../../assets/offline-pois/toulouse/aeroscopia.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée Aeroscopia', en: 'Aeroscopia Museum', zh: '航空博物馆' }, address: { fr: '1 allée André-Turcat, 31700 Blagnac, France', en: '1 Allée André-Turcat, 31700 Blagnac, France', zh: '1 Allée André-Turcat, 31700 布拉尼亚克, 法国' },
    description: { fr: 'Musée aéronautique présentant notamment Concorde, Airbus A300B et Super Guppy.', en: 'An aviation museum featuring Concorde, the Airbus A300B and Super Guppy.', zh: '航空博物馆，展示协和式飞机、空客 A300B 和超级孔雀鱼。' },
    highlights: [{ fr: 'Visite de Concorde', en: 'Concorde visit', zh: '协和式飞机访问' }, { fr: 'Collection d’avions historiques', en: 'Historic aircraft collection', zh: '历史飞机收藏' }], suggestedDurationMinutes: 180, latitude: 43.6602, longitude: 1.36, website: 'https://www.aeroscopia.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-augustins', cityId: 'toulouse', category: 'museum', image: require('../../../assets/offline-pois/toulouse/augustins.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée des Augustins', en: 'Musée des Augustins', zh: '奥古斯丁博物馆' }, address: { fr: '21 rue de Metz, 31000 Toulouse, France', en: '21 Rue de Metz, 31000 Toulouse, France', zh: '21 Rue de Metz, 31000 图卢兹, 法国' },
    description: { fr: 'Musée des beaux-arts dans un ancien couvent gothique, riche en sculptures médiévales et peintures européennes.', en: 'A fine arts museum in a former Gothic convent, rich in medieval sculpture and European paintings.', zh: '一座位于前哥特式修道院内的美术博物馆，藏有丰富的中世纪雕塑和欧洲绘画。' },
    highlights: [{ fr: 'Sculptures romanes', en: 'Romanesque sculpture', zh: '罗马式雕塑' }, { fr: 'Cloître gothique', en: 'Gothic cloister', zh: '哥特式回廊' }], suggestedDurationMinutes: 120, latitude: 43.601, longitude: 1.446, website: 'https://www.augustins.org/', sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-saint-raymond', cityId: 'toulouse', category: 'museum', image: require('../../../assets/offline-pois/toulouse/saint-raymond.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée Saint-Raymond', en: 'Musée Saint-Raymond', zh: '圣雷蒙博物馆' }, address: { fr: '1 ter place Saint-Sernin, 31000 Toulouse, France', en: '1 ter Place Saint-Sernin, 31000 Toulouse, France', zh: '1 ter Place Saint-Sernin, 31000 图卢兹, 法国' },
    description: { fr: 'Musée d’archéologie présentant Toulouse antique et une remarquable collection de sculptures romaines.', en: 'An archaeology museum presenting ancient Toulouse and a remarkable collection of Roman sculpture.', zh: '考古博物馆展示古代图卢兹和大量罗马雕塑收藏。' },
    highlights: [{ fr: 'Toulouse romaine', en: 'Roman Toulouse', zh: '罗马图卢兹' }, { fr: 'Sculptures de la villa de Chiragan', en: 'Sculptures from Chiragan villa', zh: 'Chiragan别墅的雕塑' }], suggestedDurationMinutes: 90, latitude: 43.6085, longitude: 1.441, website: 'https://saintraymond.toulouse.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-museum', cityId: 'toulouse', category: 'museum', image: require('../../../assets/offline-pois/toulouse/museum.webp'), imageCredit: CREDIT,
    name: { fr: 'Muséum de Toulouse', en: 'Toulouse Natural History Museum', zh: '图卢兹自然历史博物馆' }, address: { fr: '35 allées Jules-Guesde, 31000 Toulouse, France', en: '35 Allées Jules-Guesde, 31000 Toulouse, France', zh: '35 Allées Jules-Guesde, 31000 图卢兹, 法国' },
    description: { fr: 'Muséum d’histoire naturelle consacré à la Terre, au vivant et aux relations entre humains et environnement.', en: 'A natural history museum devoted to Earth, life and relationships between humans and the environment.', zh: '一个致力于地球、生命以及人类与环境之间关系的自然历史博物馆。' },
    highlights: [{ fr: 'Galerie des squelettes', en: 'Skeleton gallery', zh: '骨架画廊' }, { fr: 'Jardin botanique voisin', en: 'Adjacent botanical garden', zh: '毗邻植物园' }], suggestedDurationMinutes: 150, latitude: 43.594, longitude: 1.449, website: 'https://museum.toulouse-metropole.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-jardin-japonais', cityId: 'toulouse', category: 'park', image: require('../../../assets/offline-pois/toulouse/jardin-japonais.webp'), imageCredit: CREDIT,
    name: { fr: 'Jardin japonais Pierre-Baudis', en: 'Pierre-Baudis Japanese Garden', zh: '皮埃尔·鲍迪日本花园' }, address: { fr: 'Boulevard Lascrosses, 31000 Toulouse, France', en: 'Boulevard Lascrosses, 31000 Toulouse, France', zh: 'Boulevard Lascrosses, 31000 图卢兹, 法国' },
    description: { fr: 'Jardin paysager inspiré de Kyoto, organisé autour d’un étang, d’un pavillon de thé et d’un pont rouge.', en: 'A Kyoto-inspired landscape garden arranged around a pond, tea pavilion and red bridge.', zh: '一个京都风格的景观花园，围绕着池塘、茶亭和红桥布置。' },
    highlights: [{ fr: 'Pont rouge et étang', en: 'Red bridge and pond', zh: '红桥和池塘' }, { fr: 'Pavillon de thé', en: 'Tea pavilion', zh: '茶亭' }], suggestedDurationMinutes: 60, latitude: 43.611, longitude: 1.433, sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-canal-midi', cityId: 'toulouse', category: 'historic', image: require('../../../assets/offline-pois/toulouse/canal-midi.webp'), imageCredit: CREDIT,
    name: { fr: 'Canal du Midi', en: 'Canal du Midi', zh: '米迪运河' }, address: { fr: 'Port Saint-Sauveur, 31000 Toulouse, France', en: 'Port Saint-Sauveur, 31000 Toulouse, France', zh: '圣索沃尔港, 31000 图卢兹, 法国' },
    description: { fr: 'Canal historique classé par l’UNESCO, bordé de chemins propices à la marche et au vélo.', en: 'A UNESCO-listed historic canal, lined with paths suited to walking and cycling.', zh: '一条被联合国教科文组织列为世界遗产的历史运河，两旁布满了适合步行和骑自行车的小径。' },
    highlights: [{ fr: 'Ouvrage de Pierre-Paul Riquet', en: 'Pierre-Paul Riquet’s engineering work', zh: 'Pierre-Paul Riquet 的工程工作' }, { fr: 'Promenade ombragée', en: 'Shaded walk', zh: '荫蔽步行' }], suggestedDurationMinutes: 90, latitude: 43.596, longitude: 1.458, sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-pont-neuf', cityId: 'toulouse', category: 'landmark', image: require('../../../assets/offline-pois/toulouse/pont-neuf.webp'), imageCredit: CREDIT,
    name: { fr: 'Pont-Neuf', en: 'Pont-Neuf', zh: '新桥' }, address: { fr: 'Pont-Neuf, 31000 Toulouse, France', en: 'Pont-Neuf, 31000 Toulouse, France', zh: '新桥, 31000 图卢兹, 法国' },
    description: { fr: 'Plus ancien pont conservé sur la Garonne à Toulouse, reconnaissable à ses arches irrégulières et dégueuloirs.', en: 'Toulouse’s oldest surviving bridge over the Garonne, recognised by its irregular arches and flood openings.', zh: '图卢兹加龙河上现存最古老的桥梁，以其不规则的拱门和防洪口而闻名。' },
    highlights: [{ fr: 'Vue sur la Garonne', en: 'Garonne views', zh: '加龙省意见' }, { fr: 'Architecture du XVIe siècle', en: '16th-century architecture', zh: '16世纪的建筑' }], suggestedDurationMinutes: 30, latitude: 43.599, longitude: 1.439, sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-assezat', cityId: 'toulouse', category: 'museum', image: require('../../../assets/offline-pois/toulouse/assezat.webp'), imageCredit: CREDIT,
    name: { fr: 'Hôtel d’Assézat – Fondation Bemberg', en: 'Hôtel d’Assézat – Bemberg Foundation', zh: 'Hôtel d’Assézat – Bemberg 基金会' }, address: { fr: 'Place d’Assézat, 31000 Toulouse, France', en: 'Place d’Assézat, 31000 Toulouse, France', zh: 'Place d’Assézat, 31000 图卢兹, 法国' },
    description: { fr: 'Hôtel particulier Renaissance abritant une collection de peintures, mobilier et objets d’art.', en: 'A Renaissance mansion housing a collection of paintings, furniture and decorative arts.', zh: '一座文艺复兴时期的宅邸，收藏有绘画、家具和装饰艺术品。' },
    highlights: [{ fr: 'Cour Renaissance', en: 'Renaissance courtyard', zh: '文艺复兴庭院' }, { fr: 'Collection Bonnard', en: 'Bonnard collection', zh: '博纳德收藏' }], suggestedDurationMinutes: 120, latitude: 43.5993, longitude: 1.443, website: 'https://www.fondation-bemberg.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-saint-etienne', cityId: 'toulouse', category: 'religious', image: require('../../../assets/offline-pois/toulouse/saint-etienne.webp'), imageCredit: CREDIT,
    name: { fr: 'Cathédrale Saint-Étienne', en: 'Saint Stephen’s Cathedral', zh: '圣史蒂芬大教堂' }, address: { fr: 'Place Saint-Étienne, 31000 Toulouse, France', en: 'Place Saint-Étienne, 31000 Toulouse, France', zh: '圣艾蒂安广场, 31000 图卢兹, 法国' },
    description: { fr: 'Cathédrale singulière formée par la rencontre de plusieurs campagnes architecturales, du roman au gothique.', en: 'An unusual cathedral shaped by several building campaigns, from Romanesque to Gothic.', zh: '一座不寻常的大教堂，经过多次建筑活动而形成，从罗马式到哥特式。' },
    highlights: [{ fr: 'Nef asymétrique', en: 'Asymmetrical nave', zh: '不对称中殿' }, { fr: 'Vitraux et chapelles', en: 'Stained glass and chapels', zh: '彩色玻璃和教堂' }], suggestedDurationMinutes: 45, latitude: 43.6002, longitude: 1.45, sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-prairie-filtres', cityId: 'toulouse', category: 'park', image: require('../../../assets/offline-pois/toulouse/prairie-filtres.webp'), imageCredit: CREDIT,
    name: { fr: 'Prairie des Filtres', en: 'Prairie des Filtres', zh: '过滤草原' }, address: { fr: 'Cours Dillon, 31300 Toulouse, France', en: 'Cours Dillon, 31300 Toulouse, France', zh: '狄龙大道, 31300 图卢兹, 法国' },
    description: { fr: 'Grand espace vert sur la rive gauche de la Garonne, apprécié pour les vues sur les quais et le Pont-Neuf.', en: 'A large green space on the Garonne’s left bank, valued for views of the embankments and Pont-Neuf.', zh: '加龙河左岸的一大片绿地，因河堤和新桥的景观而受到重视。' },
    highlights: [{ fr: 'Berges de la Garonne', en: 'Garonne riverbank', zh: '加龙河岸' }, { fr: 'Vue sur le centre historique', en: 'View of the historic centre', zh: '历史中心景观' }], suggestedDurationMinutes: 60, latitude: 43.594, longitude: 1.435, sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-halle-machine', cityId: 'toulouse', category: 'museum', image: require('../../../assets/offline-pois/toulouse/halle-machine.webp'), imageCredit: CREDIT,
    name: { fr: 'Halle de La Machine', en: 'Halle de La Machine', zh: '哈勒德拉机器' }, address: { fr: '3 avenue de l’Aérodrome-de-Montaudran, 31400 Toulouse, France', en: '3 Avenue de l’Aérodrome-de-Montaudran, 31400 Toulouse, France', zh: '3 Avenue de l’Aérodrome-de-Montaudran, 31400 图卢兹, 法国' },
    description: { fr: 'Lieu d’exposition vivant où de grandes machines de spectacle, dont le Minotaure, sont mises en mouvement.', en: 'A living exhibition venue where giant performance machines, including the Minotaur, are set in motion.', zh: '一个生动的展览场地，包括牛头怪在内的巨型表演机器开始运转。' },
    highlights: [{ fr: 'Minotaure monumental', en: 'Monumental Minotaur', zh: '巨大的牛头怪' }, { fr: 'Machines en démonstration', en: 'Machines in demonstration', zh: '演示中的机器' }], suggestedDurationMinutes: 150, latitude: 43.579, longitude: 1.491, website: 'https://www.halledelamachine.fr/', sourceUrl: SOURCE,
  },
];

export const TOULOUSE_POIS: OfflinePOI[] = seeds.map(createFrenchPOI);
