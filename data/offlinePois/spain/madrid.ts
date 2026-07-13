import type { OfflinePOI } from '../../../types/offlinePoi';
import { createSpanishPOI, type SpanishPOISeed } from './helpers';

const SOURCE = 'https://www.esmadrid.com/en/madrid-at-a-glance';
const CREDIT = 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md';

const seeds: SpanishPOISeed[] = [
  {
    id: 'madrid-royal-palace', cityId: 'madrid', category: 'historic', image: require('../../../assets/offline-pois/madrid/royal-palace.webp'), imageCredit: CREDIT,
    name: { fr: 'Palais royal de Madrid', en: 'Royal Palace of Madrid', zh: '马德里皇宫' }, address: { fr: 'Calle de Bailén, 28071 Madrid, Espagne', en: 'Calle de Bailén, 28071 Madrid, Spain', zh: 'Calle de Bailén, 28071 马德里, 西班牙' },
    description: { fr: 'Résidence officielle de la monarchie espagnole utilisée pour les cérémonies d’État, avec appartements historiques et armurerie.', en: 'The official residence of the Spanish monarchy used for state ceremonies, with historic apartments and a royal armoury.', zh: '西班牙君主的官邸，用于举行国家仪式，拥有历史悠久的公寓和皇家军械库。' },
    highlights: [{ fr: 'Salles d’apparat', en: 'State rooms', zh: '特等舱' }, { fr: 'Armurerie royale', en: 'Royal armoury', zh: '皇家军械库' }], suggestedDurationMinutes: 150, latitude: 40.4179, longitude: -3.7143, website: 'https://www.patrimonionacional.es/visita/palacio-real-de-madrid', sourceUrl: SOURCE,
  },
  {
    id: 'madrid-prado', cityId: 'madrid', category: 'museum', image: require('../../../assets/offline-pois/madrid/prado.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée du Prado', en: 'Prado Museum', zh: '普拉多博物馆' }, address: { fr: 'Calle de Ruiz de Alarcón 23, 28014 Madrid, Espagne', en: 'Calle de Ruiz de Alarcón 23, 28014 Madrid, Spain', zh: 'Calle de Ruiz de Alarcón 23, 28014 马德里, 西班牙' },
    description: { fr: 'Grand musée national consacré à la peinture européenne, particulièrement riche en œuvres de Velázquez, Goya, Rubens et Bosch.', en: 'A major national museum of European painting, especially rich in works by Velázquez, Goya, Rubens and Bosch.', zh: '欧洲绘画的主要国家博物馆，尤其藏有委拉斯开兹、戈雅、鲁本斯和博斯的作品。' },
    highlights: [{ fr: 'Les Ménines', en: 'Las Meninas', zh: '宫娥' }, { fr: 'Maîtres espagnols et flamands', en: 'Spanish and Flemish masters', zh: '西班牙和佛兰德斯大师' }], suggestedDurationMinutes: 180, latitude: 40.4138, longitude: -3.6921, website: 'https://www.museodelprado.es/en', sourceUrl: SOURCE,
  },
  {
    id: 'madrid-retiro', cityId: 'madrid', category: 'park', image: require('../../../assets/offline-pois/madrid/retiro.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc du Retiro', en: 'El Retiro Park', zh: '丽池公园' }, address: { fr: 'Plaza de la Independencia 7, 28001 Madrid, Espagne', en: 'Plaza de la Independencia 7, 28001 Madrid, Spain', zh: '独立广场 7, 28001 马德里, 西班牙' },
    description: { fr: 'Ancien jardin royal devenu grand parc urbain, intégré au Paysage de la lumière inscrit au patrimoine mondial.', en: 'A former royal garden turned major urban park, included in the World Heritage-listed Landscape of Light.', zh: '一个前皇家花园变成了主要的城市公园，被列入世界遗产名录的光之景观。' },
    highlights: [{ fr: 'Palais de Cristal', en: 'Crystal Palace', zh: '水晶宫' }, { fr: 'Grand bassin', en: 'Great Pond', zh: '大池塘' }], suggestedDurationMinutes: 150, latitude: 40.4153, longitude: -3.6844, sourceUrl: SOURCE,
  },
  {
    id: 'madrid-plaza-mayor', cityId: 'madrid', category: 'historic', image: require('../../../assets/offline-pois/madrid/plaza-mayor.webp'), imageCredit: CREDIT,
    name: { fr: 'Plaza Mayor', en: 'Plaza Mayor', zh: '马约尔广场' }, address: { fr: 'Plaza Mayor, 28012 Madrid, Espagne', en: 'Plaza Mayor, 28012 Madrid, Spain', zh: '马约尔广场，28012 马德里，西班牙' },
    description: { fr: 'Place à arcades du XVIIe siècle, cœur monumental du vieux Madrid et cadre de marchés et célébrations.', en: 'A 17th-century arcaded square, monumental heart of old Madrid and setting for markets and celebrations.', zh: '一座 17 世纪的拱廊广场，是旧马德里的不朽中心，也是集市和庆祝活动的场所。' },
    highlights: [{ fr: 'Casa de la Panadería', en: 'Casa de la Panadería', zh: '帕纳德里亚之家' }, { fr: 'Statue de Philippe III', en: 'Philip III statue', zh: '菲利普三世雕像' }], suggestedDurationMinutes: 60, latitude: 40.4155, longitude: -3.7074, sourceUrl: SOURCE,
  },
  {
    id: 'madrid-puerta-sol', cityId: 'madrid', category: 'landmark', image: require('../../../assets/offline-pois/madrid/puerta-sol.webp'), imageCredit: CREDIT,
    name: { fr: 'Puerta del Sol', en: 'Puerta del Sol', zh: '太阳门广场' }, address: { fr: 'Puerta del Sol, 28013 Madrid, Espagne', en: 'Puerta del Sol, 28013 Madrid, Spain', zh: '太阳门广场, 28013 马德里, 西班牙' },
    description: { fr: 'Place centrale animée réunissant le Kilomètre zéro, l’horloge de la Casa de Correos et le symbole de l’ours et de l’arbousier.', en: 'A lively central square containing Kilometre Zero, the Casa de Correos clock and the Bear and Strawberry Tree emblem.', zh: '热闹的中心广场，包含零公里、邮政之家时钟以及熊和草莓树标志。' },
    highlights: [{ fr: 'Kilomètre zéro', en: 'Kilometre Zero', zh: '零公里' }, { fr: 'Ours et arbousier', en: 'Bear and Strawberry Tree', zh: '熊和草莓树' }], suggestedDurationMinutes: 45, latitude: 40.4169, longitude: -3.7035, sourceUrl: SOURCE,
  },
  {
    id: 'madrid-reina-sofia', cityId: 'madrid', category: 'museum', image: require('../../../assets/offline-pois/madrid/reina-sofia.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée Reina Sofía', en: 'Reina Sofía Museum', zh: '索菲亚王后博物馆' }, address: { fr: 'Calle de Santa Isabel 52, 28012 Madrid, Espagne', en: 'Calle de Santa Isabel 52, 28012 Madrid, Spain', zh: 'Calle de Santa Isabel 52, 28012 马德里, 西班牙' },
    description: { fr: 'Musée national d’art moderne et contemporain espagnol, connu notamment pour Guernica de Pablo Picasso.', en: 'Spain’s national museum of modern and contemporary art, best known for Pablo Picasso’s Guernica.', zh: '西班牙国家现当代艺术博物馆，以巴勃罗·毕加索的《格尔尼卡》而闻名。' },
    highlights: [{ fr: 'Guernica de Picasso', en: 'Picasso’s Guernica', zh: '毕加索的格尔尼卡' }, { fr: 'Art espagnol du XXe siècle', en: '20th-century Spanish art', zh: '20世纪西班牙艺术' }], suggestedDurationMinutes: 150, latitude: 40.4086, longitude: -3.6944, website: 'https://www.museoreinasofia.es/en', sourceUrl: SOURCE,
  },
  {
    id: 'madrid-thyssen', cityId: 'madrid', category: 'museum', image: require('../../../assets/offline-pois/madrid/thyssen.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée Thyssen-Bornemisza', en: 'Thyssen-Bornemisza Museum', zh: '蒂森-博内米萨博物馆' }, address: { fr: 'Paseo del Prado 8, 28014 Madrid, Espagne', en: 'Paseo del Prado 8, 28014 Madrid, Spain', zh: '普拉多大道 8, 28014 马德里, 西班牙' },
    description: { fr: 'Collection retraçant l’histoire de la peinture occidentale du XIIIe au XXe siècle dans le palais de Villahermosa.', en: 'A collection tracing Western painting from the 13th to the 20th century in the Villahermosa Palace.', zh: '比亚埃尔莫萨宫收藏了 13 世纪至 20 世纪西方绘画的藏品。' },
    highlights: [{ fr: 'Parcours chronologique', en: 'Chronological collection', zh: '按时间顺序收藏' }, { fr: 'Palais de Villahermosa', en: 'Villahermosa Palace', zh: '比亚埃尔莫萨宫' }], suggestedDurationMinutes: 150, latitude: 40.416, longitude: -3.6947, website: 'https://www.museothyssen.org/en', sourceUrl: SOURCE,
  },
  {
    id: 'madrid-almudena', cityId: 'madrid', category: 'religious', image: require('../../../assets/offline-pois/madrid/almudena.webp'), imageCredit: CREDIT,
    name: { fr: 'Cathédrale de l’Almudena', en: 'Almudena Cathedral', zh: '阿尔穆德纳大教堂' }, address: { fr: 'Calle de Bailén 10, 28013 Madrid, Espagne', en: 'Calle de Bailén 10, 28013 Madrid, Spain', zh: 'Calle de Bailén 10, 28013 马德里, 西班牙' },
    description: { fr: 'Cathédrale de Madrid achevée au XXe siècle, associant façade néoclassique, crypte néoromane et intérieur contemporain.', en: 'Madrid’s cathedral, completed in the 20th century, combining a Neoclassical façade, Neo-Romanesque crypt and contemporary interior.', zh: '马德里大教堂，建于 20 世纪，结合了新古典主义外观、新罗马式地下室和现代内饰。' },
    highlights: [{ fr: 'Crypte néoromane', en: 'Neo-Romanesque crypt', zh: '新罗马式地窖' }, { fr: 'Vue depuis la coupole', en: 'View from the dome', zh: '从圆顶看去' }], suggestedDurationMinutes: 75, latitude: 40.4156, longitude: -3.7146, sourceUrl: SOURCE,
  },
  {
    id: 'madrid-debod', cityId: 'madrid', category: 'historic', image: require('../../../assets/offline-pois/madrid/debod.webp'), imageCredit: CREDIT,
    name: { fr: 'Temple de Debod', en: 'Temple of Debod', zh: '德波神庙' }, address: { fr: 'Calle de Ferraz 1, 28008 Madrid, Espagne', en: 'Calle de Ferraz 1, 28008 Madrid, Spain', zh: 'Calle de Ferraz 1, 28008 马德里, 西班牙' },
    description: { fr: 'Temple égyptien antique offert à l’Espagne et reconstruit dans un parc dominant l’ouest de Madrid.', en: 'An ancient Egyptian temple gifted to Spain and rebuilt in a park overlooking western Madrid.', zh: '一座古埃及神庙，被赠送给西班牙，并在俯瞰马德里西部的公园内重建。' },
    highlights: [{ fr: 'Architecture nubienne antique', en: 'Ancient Nubian architecture', zh: '古代努比亚建筑' }, { fr: 'Coucher de soleil', en: 'Sunset viewpoint', zh: '日落观景台' }], suggestedDurationMinutes: 60, latitude: 40.424, longitude: -3.7178, sourceUrl: SOURCE,
  },
  {
    id: 'madrid-bernabeu', cityId: 'madrid', category: 'landmark', image: require('../../../assets/offline-pois/madrid/bernabeu.webp'), imageCredit: CREDIT,
    name: { fr: 'Stade Santiago-Bernabéu', en: 'Santiago Bernabéu Stadium', zh: '伯纳乌球场' }, address: { fr: 'Avenida de Concha Espina 1, 28036 Madrid, Espagne', en: 'Avenida de Concha Espina 1, 28036 Madrid, Spain', zh: 'Avenida de Concha Espina 1, 28036 马德里, 西班牙' },
    description: { fr: 'Stade du Real Madrid modernisé, proposant musée, parcours de visite et vues sur l’enceinte sportive.', en: 'Real Madrid’s modernised stadium, offering a museum, visitor route and views over the arena.', zh: '皇家马德里的现代化体育场，设有博物馆、游客路线和体育场景观。' },
    highlights: [{ fr: 'Musée du Real Madrid', en: 'Real Madrid Museum', zh: '皇家马德里博物馆' }, { fr: 'Panorama du stade', en: 'Stadium panorama', zh: '球场全景' }], suggestedDurationMinutes: 120, latitude: 40.4531, longitude: -3.6883, website: 'https://www.realmadrid.com/en-US/bernabeu-stadium', sourceUrl: SOURCE,
  },
  {
    id: 'madrid-gran-via', cityId: 'madrid', category: 'landmark', image: require('../../../assets/offline-pois/madrid/gran-via.webp'), imageCredit: CREDIT,
    name: { fr: 'Gran Vía', en: 'Gran Vía', zh: '格兰大道' }, address: { fr: 'Gran Vía, 28013 Madrid, Espagne', en: 'Gran Vía, 28013 Madrid, Spain', zh: '格兰大道, 28013 马德里, 西班牙' },
    description: { fr: 'Grande avenue du centre connue pour ses façades du début du XXe siècle, ses théâtres et ses panoramas urbains.', en: 'A major central avenue known for early-20th-century façades, theatres and sweeping urban views.', zh: '一条主要的中央大道，以 20 世纪早期的外观、剧院和一览无余的城市景观而闻名。' },
    highlights: [{ fr: 'Édifice Metrópolis', en: 'Metrópolis Building', zh: '大都会大厦' }, { fr: 'Théâtres et architecture', en: 'Theatres and architecture', zh: '剧院和建筑' }], suggestedDurationMinutes: 90, latitude: 40.42, longitude: -3.7058, sourceUrl: SOURCE,
  },
  {
    id: 'madrid-san-miguel', cityId: 'madrid', category: 'historic', image: require('../../../assets/offline-pois/madrid/san-miguel.webp'), imageCredit: CREDIT,
    name: { fr: 'Marché de San Miguel', en: 'Mercado de San Miguel', zh: '圣米格尔市场' }, address: { fr: 'Plaza de San Miguel, 28005 Madrid, Espagne', en: 'Plaza de San Miguel, 28005 Madrid, Spain', zh: '圣米格尔广场, 28005 马德里, 西班牙' },
    description: { fr: 'Halle de verre et de fer transformée en marché gastronomique, à proximité immédiate de la Plaza Mayor.', en: 'A glass-and-iron market hall transformed into a food market beside Plaza Mayor.', zh: '马约尔广场旁边的玻璃铁制市场大厅改造成食品市场。' },
    highlights: [{ fr: 'Architecture métallique', en: 'Iron architecture', zh: '铁建筑' }, { fr: 'Cuisine espagnole', en: 'Spanish food stalls', zh: '西班牙小吃摊' }], suggestedDurationMinutes: 75, latitude: 40.4154, longitude: -3.7089, website: 'https://mercadodesanmiguel.es/', sourceUrl: SOURCE,
  },
  {
    id: 'madrid-sorolla', cityId: 'madrid', category: 'museum', image: require('../../../assets/offline-pois/madrid/sorolla.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée Sorolla', en: 'Sorolla Museum', zh: '索罗拉博物馆' }, address: { fr: 'Paseo del General Martínez Campos 37, 28010 Madrid, Espagne', en: 'Paseo del General Martínez Campos 37, 28010 Madrid, Spain', zh: '马丁内斯·坎波斯将军大道 37, 28010 马德里, 西班牙' },
    description: { fr: 'Maison-atelier du peintre Joaquín Sorolla conservant ses œuvres, ses collections et un jardin d’inspiration andalouse.', en: 'Painter Joaquín Sorolla’s home and studio, preserving his works, collections and Andalusian-inspired garden.', zh: '画家华金·索罗拉 (Joaquín Sorolla) 的家和工作室，保存着他的作品、收藏品和安达卢西亚风格的花园。' },
    highlights: [{ fr: 'Maison-atelier préservée', en: 'Preserved house and studio', zh: '保留房屋和工作室' }, { fr: 'Jardin de l’artiste', en: 'Artist’s garden', zh: '艺术家的花园' }], suggestedDurationMinutes: 90, latitude: 40.4356, longitude: -3.6925, website: 'https://www.cultura.gob.es/msorolla/en/home.html', sourceUrl: SOURCE,
  },
  {
    id: 'madrid-botanical-garden', cityId: 'madrid', category: 'park', image: require('../../../assets/offline-pois/madrid/botanical-garden.webp'), imageCredit: CREDIT,
    name: { fr: 'Jardin botanique royal', en: 'Royal Botanical Garden', zh: '皇家植物园' }, address: { fr: 'Plaza de Murillo 2, 28014 Madrid, Espagne', en: 'Plaza de Murillo 2, 28014 Madrid, Spain', zh: '穆里略广场 2, 28014 马德里, 西班牙' },
    description: { fr: 'Jardin scientifique historique organisé en terrasses, réunissant collections botaniques, serres et arbres remarquables.', en: 'A historic scientific garden arranged on terraces, with botanical collections, greenhouses and notable trees.', zh: '一座历史悠久的科学花园，布置在露台上，拥有植物收藏、温室和著名的树木。' },
    highlights: [{ fr: 'Terrasses botaniques', en: 'Botanical terraces', zh: '植物梯田' }, { fr: 'Serres historiques', en: 'Historic greenhouses', zh: '历史温室' }], suggestedDurationMinutes: 90, latitude: 40.4111, longitude: -3.6914, website: 'https://rjb.csic.es/en/', sourceUrl: SOURCE,
  },
  {
    id: 'madrid-puerta-alcala', cityId: 'madrid', category: 'landmark', image: require('../../../assets/offline-pois/madrid/puerta-alcala.webp'), imageCredit: CREDIT,
    name: { fr: 'Puerta de Alcalá', en: 'Puerta de Alcalá', zh: '阿尔卡拉门' }, address: { fr: 'Plaza de la Independencia, 28001 Madrid, Espagne', en: 'Plaza de la Independencia, 28001 Madrid, Spain', zh: '独立广场, 28001 马德里, 西班牙' },
    description: { fr: 'Porte monumentale néoclassique du XVIIIe siècle dressée à l’entrée du Retiro et devenue symbole de Madrid.', en: 'An 18th-century Neoclassical monumental gate standing at the entrance to El Retiro and now a symbol of Madrid.', zh: '一座 18 世纪新古典主义的纪念性大门矗立在丽池入口处，现在是马德里的象征。' },
    highlights: [{ fr: 'Cinq arches monumentales', en: 'Five monumental arches', zh: '五个巨大的拱门' }, { fr: 'Décor sculpté', en: 'Sculpted decoration', zh: '雕刻装饰' }], suggestedDurationMinutes: 30, latitude: 40.42, longitude: -3.6887, sourceUrl: SOURCE,
  },
];

export const MADRID_POIS: OfflinePOI[] = seeds.map(createSpanishPOI);
