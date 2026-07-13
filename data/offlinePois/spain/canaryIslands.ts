import type { OfflinePOI } from '../../../types/offlinePoi';
import { createSpanishPOI, type SpanishPOISeed } from './helpers';

const SOURCE = 'https://www.hellocanaryislands.com/';
const CREDIT = 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md';

const seeds: SpanishPOISeed[] = [
  {
    id: 'canary-islands-teide', cityId: 'canary-islands', category: 'park', image: require('../../../assets/offline-pois/canary-islands/teide.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc national du Teide — Tenerife', en: 'Teide National Park — Tenerife', zh: '泰德国家公园 — 特内里费岛' }, address: { fr: 'Parque Nacional del Teide, 38300 La Orotava, Tenerife, Espagne', en: 'Teide National Park, 38300 La Orotava, Tenerife, Spain', zh: '泰德国家公园, 38300 拉奥罗塔瓦, 特内里费岛, 西班牙' },
    description: { fr: 'Paysage volcanique dominé par le Teide, plus haut sommet d’Espagne, avec caldeira, coulées de lave et formations rocheuses.', en: 'A volcanic landscape dominated by Mount Teide, Spain’s highest peak, with a caldera, lava flows and rock formations.', zh: '以西班牙最高峰泰德山为主的火山景观，有火山口、熔岩流和岩层。' },
    highlights: [{ fr: 'Pico del Teide', en: 'Mount Teide', zh: '泰德山' }, { fr: 'Roques de García', en: 'Roques de García', zh: '罗克斯·德·加西亚' }], suggestedDurationMinutes: 300, latitude: 28.2724, longitude: -16.6425, website: 'https://www.reservasparquesnacionales.es/real/ParquesNac/index.aspx', sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-timanfaya', cityId: 'canary-islands', category: 'park', image: require('../../../assets/offline-pois/canary-islands/timanfaya.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc national de Timanfaya — Lanzarote', en: 'Timanfaya National Park — Lanzarote', zh: '蒂曼法亚国家公园 — 兰萨罗特岛' }, address: { fr: 'Carretera de las Montañas del Fuego, 35560 Tinajo, Lanzarote, Espagne', en: 'Carretera de las Montañas del Fuego, 35560 Tinajo, Lanzarote, Spain', zh: 'Carretera de las Montañas del Fuego, 35560 蒂纳霍, 兰萨罗特岛, 西班牙' },
    description: { fr: 'Étendue volcanique née des éruptions du XVIIIe siècle, parcourue de cratères, champs de lave et anomalies géothermiques.', en: 'A volcanic expanse formed by 18th-century eruptions, with craters, lava fields and geothermal activity.', zh: '由 18 世纪喷发形成的广阔火山区，有火山口、熔岩场和地热活动。' },
    highlights: [{ fr: 'Montañas del Fuego', en: 'Montañas del Fuego', zh: '火地岛山' }, { fr: 'Démonstrations géothermiques', en: 'Geothermal demonstrations', zh: '地热示范' }], suggestedDurationMinutes: 180, latitude: 29.005, longitude: -13.7537, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-maspalomas', cityId: 'canary-islands', category: 'park', image: require('../../../assets/offline-pois/canary-islands/maspalomas.webp'), imageCredit: CREDIT,
    name: { fr: 'Dunes de Maspalomas — Grande Canarie', en: 'Maspalomas Dunes — Gran Canaria', zh: '马斯帕洛马斯沙丘 — 大加那利岛' }, address: { fr: 'Reserva Natural Especial de las Dunas de Maspalomas, 35100 San Bartolomé de Tirajana, Grande Canarie, Espagne', en: 'Maspalomas Dunes Special Nature Reserve, 35100 San Bartolomé de Tirajana, Gran Canaria, Spain', zh: '马斯帕洛马斯沙丘特别自然保护区, 35100 圣巴托洛梅德蒂拉哈纳, 大加那利岛, 西班牙' },
    description: { fr: 'Réserve littorale réunissant dunes mobiles, palmeraie, lagune et plage au sud de Grande Canarie.', en: 'A coastal reserve combining shifting dunes, a palm grove, lagoon and beach in southern Gran Canaria.', zh: '大加那利岛南部的沿海保护区，由流动沙丘、棕榈树林、泻湖和海滩组成。' },
    highlights: [{ fr: 'Champ de dunes', en: 'Dune field', zh: '沙丘场' }, { fr: 'Lagune de la Charca', en: 'La Charca lagoon', zh: '拉查卡泻湖' }], suggestedDurationMinutes: 150, latitude: 27.7415, longitude: -15.5851, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-garajonay', cityId: 'canary-islands', category: 'park', image: require('../../../assets/offline-pois/canary-islands/garajonay.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc national de Garajonay — La Gomera', en: 'Garajonay National Park — La Gomera', zh: '加拉霍奈国家公园 — 戈梅拉岛' }, address: { fr: 'GM-2, 38830 Agulo, La Gomera, Espagne', en: 'GM-2, 38830 Agulo, La Gomera, Spain', zh: 'GM-2, 38830 阿古洛, 戈梅拉岛, 西班牙' },
    description: { fr: 'Parc montagneux protégeant une forêt humide de lauriers, vestige des forêts subtropicales anciennes de Macaronésie.', en: 'A mountain park protecting humid laurel forest, a remnant of Macaronesia’s ancient subtropical forests.', zh: '一座山地公园，保护潮湿的月桂林，这是马卡罗尼西亚古老亚热带森林的残余。' },
    highlights: [{ fr: 'Forêt de laurisylve', en: 'Laurel forest', zh: '月桂树森林' }, { fr: 'Sentiers brumeux', en: 'Misty trails', zh: '迷雾小径' }], suggestedDurationMinutes: 240, latitude: 28.1263, longitude: -17.2372, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-caldera-taburiente', cityId: 'canary-islands', category: 'park', image: require('../../../assets/offline-pois/canary-islands/caldera-taburiente.webp'), imageCredit: CREDIT,
    name: { fr: 'Caldera de Taburiente — La Palma', en: 'Caldera de Taburiente — La Palma', zh: '塔布里恩特火山口 — 拉帕尔马' }, address: { fr: 'Parque Nacional de la Caldera de Taburiente, 38758 El Paso, La Palma, Espagne', en: 'Caldera de Taburiente National Park, 38758 El Paso, La Palma, Spain', zh: 'Caldera de Taburiente National Park, 38758 埃尔帕索, 拉帕尔马, 西班牙' },
    description: { fr: 'Immense dépression volcanique entaillée de ravins, couverte de pins canariens et parcourue de sentiers exigeants.', en: 'A vast volcanic depression cut by ravines, covered with Canary Island pines and crossed by demanding trails.', zh: '一片巨大的火山洼地，被沟壑切割，覆盖着加那利群岛的松树，并有艰巨的小径穿过。' },
    highlights: [{ fr: 'Belvédère de La Cumbrecita', en: 'La Cumbrecita viewpoint', zh: 'La Cumbrecita 观点' }, { fr: 'Cascada de Colores', en: 'Cascada de Colores', zh: '色彩瀑布' }], suggestedDurationMinutes: 300, latitude: 28.729, longitude: -17.869, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-jameos-agua', cityId: 'canary-islands', category: 'landmark', image: require('../../../assets/offline-pois/canary-islands/jameos-agua.webp'), imageCredit: CREDIT,
    name: { fr: 'Jameos del Agua — Lanzarote', en: 'Jameos del Agua — Lanzarote', zh: 'Jameos del Agua — 兰萨罗特岛' }, address: { fr: 'Carretera Arrecife-Orzola, 35542 Haría, Lanzarote, Espagne', en: 'Carretera Arrecife-Orzola, 35542 Haría, Lanzarote, Spain', zh: 'Carretera Arrecife-Orzola, 35542 Haría, 兰萨罗特岛, 西班牙' },
    description: { fr: 'Centre artistique de César Manrique intégré à un tunnel volcanique, avec lac souterrain, jardins et auditorium.', en: 'César Manrique’s arts centre integrated into a volcanic tunnel, with an underground lake, gardens and auditorium.', zh: '塞萨尔·曼里克 (César Manrique) 的艺术中心融入了火山隧道，设有地下湖、花园和礼堂。' },
    highlights: [{ fr: 'Lac volcanique souterrain', en: 'Underground volcanic lake', zh: '地下火山湖' }, { fr: 'Intervention de César Manrique', en: 'César Manrique design', zh: '塞萨尔·曼里克设计' }], suggestedDurationMinutes: 120, latitude: 29.1579, longitude: -13.4327, website: 'https://cactlanzarote.com/en/centre/jameos-del-agua/', sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-cueva-verdes', cityId: 'canary-islands', category: 'historic', image: require('../../../assets/offline-pois/canary-islands/cueva-verdes.webp'), imageCredit: CREDIT,
    name: { fr: 'Cueva de los Verdes — Lanzarote', en: 'Cueva de los Verdes — Lanzarote', zh: 'Cueva de los Verdes — 兰萨罗特岛' }, address: { fr: 'LZ-204, 35542 Haría, Lanzarote, Espagne', en: 'LZ-204, 35542 Haría, Lanzarote, Spain', zh: 'LZ-204, 35542 哈里亚, 兰萨罗特岛, 西班牙' },
    description: { fr: 'Section aménagée d’un long tunnel de lave formé par le volcan de La Corona, visitable avec un guide.', en: 'An accessible section of a long lava tube formed by La Corona volcano and visited with a guide.', zh: '由拉科罗纳火山形成的长熔岩管的可进入部分，并在导游的陪同下参观。' },
    highlights: [{ fr: 'Galeries de lave', en: 'Lava galleries', zh: '熔岩画廊' }, { fr: 'Jeux de lumière et surprise optique', en: 'Lighting and optical surprise', zh: '灯光和光学惊喜' }], suggestedDurationMinutes: 75, latitude: 29.1612, longitude: -13.438, website: 'https://cactlanzarote.com/en/centre/cueva-de-los-verdes/', sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-roque-nublo', cityId: 'canary-islands', category: 'park', image: require('../../../assets/offline-pois/canary-islands/roque-nublo.webp'), imageCredit: CREDIT,
    name: { fr: 'Roque Nublo — Grande Canarie', en: 'Roque Nublo — Gran Canaria', zh: '罗克·努布洛 — 大加那利岛' }, address: { fr: 'GC-600, 35369 Tejeda, Grande Canarie, Espagne', en: 'GC-600, 35369 Tejeda, Gran Canaria, Spain', zh: 'GC-600, 35369 特赫达, 大加那利岛, 西班牙' },
    description: { fr: 'Monolithe volcanique emblématique du centre montagneux de Grande Canarie, accessible par un sentier panoramique.', en: 'An emblematic volcanic monolith in mountainous central Gran Canaria, reached by a panoramic trail.', zh: '大加那利岛中部山区的标志性火山巨石，可通过全景小径到达。' },
    highlights: [{ fr: 'Monolithe volcanique', en: 'Volcanic monolith', zh: '火山巨石' }, { fr: 'Vues sur les sommets', en: 'Mountain views', zh: '山景' }], suggestedDurationMinutes: 150, latitude: 27.9707, longitude: -15.6127, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-vegueta', cityId: 'canary-islands', category: 'historic', image: require('../../../assets/offline-pois/canary-islands/vegueta.webp'), imageCredit: CREDIT,
    name: { fr: 'Vegueta — Las Palmas de Grande Canarie', en: 'Vegueta — Las Palmas de Gran Canaria', zh: '贝格塔 — 大加那利岛拉斯帕尔马斯' }, address: { fr: 'Plaza de Santa Ana, 35001 Las Palmas de Grande Canarie, Espagne', en: 'Plaza de Santa Ana, 35001 Las Palmas de Gran Canaria, Spain', zh: '圣安娜广场, 35001 大加那利岛拉斯帕尔马斯, 西班牙' },
    description: { fr: 'Quartier fondateur de Las Palmas, regroupant cathédrale, maisons historiques, places pavées et musées.', en: 'The founding district of Las Palmas, bringing together the cathedral, historic houses, paved squares and museums.', zh: '拉斯帕尔马斯的创始区，汇集了大教堂、历史悠久的房屋、铺砌的广场和博物馆。' },
    highlights: [{ fr: 'Place et cathédrale Santa Ana', en: 'Santa Ana square and cathedral', zh: '圣安娜广场和大教堂' }, { fr: 'Casa de Colón', en: 'Casa de Colón', zh: '哥伦布之家' }], suggestedDurationMinutes: 150, latitude: 28.1006, longitude: -15.4155, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-las-canteras', cityId: 'canary-islands', category: 'park', image: require('../../../assets/offline-pois/canary-islands/las-canteras.webp'), imageCredit: CREDIT,
    name: { fr: 'Plage de Las Canteras — Grande Canarie', en: 'Las Canteras Beach — Gran Canaria', zh: '拉斯坎特拉斯海滩 — 大加那利岛' }, address: { fr: 'Paseo de Las Canteras, 35010 Las Palmas de Grande Canarie, Espagne', en: 'Paseo de Las Canteras, 35010 Las Palmas de Gran Canaria, Spain', zh: '拉斯坎特拉斯大道, 35010 大加那利岛拉斯帕尔马斯, 西班牙' },
    description: { fr: 'Longue plage urbaine protégée en partie par une barrière rocheuse naturelle appelée La Barra.', en: 'A long urban beach partly sheltered by a natural offshore reef known as La Barra.', zh: '一个长长的城市海滩，部分被称为拉巴拉的天然近海珊瑚礁所遮蔽。' },
    highlights: [{ fr: 'Récif de La Barra', en: 'La Barra reef', zh: '拉巴拉礁' }, { fr: 'Promenade littorale', en: 'Seafront promenade', zh: '海滨长廊' }], suggestedDurationMinutes: 150, latitude: 28.1397, longitude: -15.435, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-corralejo', cityId: 'canary-islands', category: 'park', image: require('../../../assets/offline-pois/canary-islands/corralejo.webp'), imageCredit: CREDIT,
    name: { fr: 'Parc naturel de Corralejo — Fuerteventura', en: 'Corralejo Natural Park — Fuerteventura', zh: '科拉莱霍自然公园 — 富埃特文图拉岛' }, address: { fr: 'FV-1a, 35660 La Oliva, Fuerteventura, Espagne', en: 'FV-1a, 35660 La Oliva, Fuerteventura, Spain', zh: 'FV-1a, 35660 拉奥利瓦, 富埃特文图拉岛, 西班牙' },
    description: { fr: 'Vaste ensemble de dunes claires et de plages face aux îles de Lobos et Lanzarote, au nord de Fuerteventura.', en: 'A broad expanse of pale dunes and beaches facing Lobos and Lanzarote in northern Fuerteventura.', zh: '富埃特文图拉岛北部面向洛博斯岛和兰萨罗特岛的广阔的苍白沙丘和海滩。' },
    highlights: [{ fr: 'Dunes côtières', en: 'Coastal dunes', zh: '海岸沙丘' }, { fr: 'Vue sur l’île de Lobos', en: 'View of Lobos Island', zh: '罗伯斯岛景观' }], suggestedDurationMinutes: 180, latitude: 28.7058, longitude: -13.8423, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-betancuria', cityId: 'canary-islands', category: 'historic', image: require('../../../assets/offline-pois/canary-islands/betancuria.webp'), imageCredit: CREDIT,
    name: { fr: 'Betancuria — Fuerteventura', en: 'Betancuria — Fuerteventura', zh: '贝坦库里亚 — 富埃特文图拉岛' }, address: { fr: 'Plaza de Santa María, 35637 Betancuria, Fuerteventura, Espagne', en: 'Plaza de Santa María, 35637 Betancuria, Fuerteventura, Spain', zh: '圣玛丽亚广场, 35637 贝坦库里亚, 富埃特文图拉岛, 西班牙' },
    description: { fr: 'Ancienne capitale insulaire nichée dans une vallée, connue pour son église, ses maisons blanches et ses musées.', en: 'The island’s former capital set in a valley, known for its church, whitewashed houses and museums.', zh: '该岛的前首都坐落在山谷中，以其教堂、粉刷成白色的房屋和博物馆而闻名。' },
    highlights: [{ fr: 'Église Santa María', en: 'Santa María Church', zh: '圣玛丽亚教堂' }, { fr: 'Centre historique blanc', en: 'Whitewashed historic centre', zh: '粉刷成白色的历史中心' }], suggestedDurationMinutes: 120, latitude: 28.4245, longitude: -14.0561, sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-mirador-rio', cityId: 'canary-islands', category: 'landmark', image: require('../../../assets/offline-pois/canary-islands/mirador-rio.webp'), imageCredit: CREDIT,
    name: { fr: 'Mirador del Río — Lanzarote', en: 'Mirador del Río — Lanzarote', zh: 'Mirador del Río — 兰萨罗特岛' }, address: { fr: 'Carretera de Ye, 35541 Haría, Lanzarote, Espagne', en: 'Carretera de Ye, 35541 Haría, Lanzarote, Spain', zh: 'Carretera de Ye, 35541 Haría, 兰萨罗特岛, 西班牙' },
    description: { fr: 'Belvédère conçu par César Manrique et intégré à la falaise de Famara, face à La Graciosa et à l’archipel Chinijo.', en: 'A viewpoint designed by César Manrique and integrated into the Famara cliffs, facing La Graciosa and the Chinijo Archipelago.', zh: '由塞萨尔·曼里克 (César Manrique) 设计的观景点，融入法马拉悬崖，面向拉格拉西奥萨 (La Graciosa) 和奇尼霍群岛 (Chinijo Archipelago)。' },
    highlights: [{ fr: 'Vue sur La Graciosa', en: 'View of La Graciosa', zh: '格拉西奥萨景观' }, { fr: 'Architecture intégrée à la roche', en: 'Rock-integrated architecture', zh: '岩石一体化架构' }], suggestedDurationMinutes: 75, latitude: 29.2147, longitude: -13.4812, website: 'https://cactlanzarote.com/en/centre/mirador-del-rio/', sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-roque-muchachos', cityId: 'canary-islands', category: 'landmark', image: require('../../../assets/offline-pois/canary-islands/roque-muchachos.webp'), imageCredit: CREDIT,
    name: { fr: 'Roque de los Muchachos — La Palma', en: 'Roque de los Muchachos — La Palma', zh: 'Roque de los Muchachos — 拉帕尔马' }, address: { fr: 'LP-4, 38728 Garafía, La Palma, Espagne', en: 'LP-4, 38728 Garafía, La Palma, Spain', zh: 'LP-4, 38728 加拉菲亚, 拉帕尔马, 西班牙' },
    description: { fr: 'Point culminant de La Palma, bordé d’observatoires astronomiques et dominant la Caldera de Taburiente.', en: 'La Palma’s highest point, lined with astronomical observatories and overlooking Caldera de Taburiente.', zh: '拉帕尔马岛的最高点，两旁排列着天文台，俯瞰卡尔德拉德塔布里恩特 (Caldera de Taburiente)。' },
    highlights: [{ fr: 'Observatoire astrophysique', en: 'Astrophysical observatory', zh: '天体物理观测站' }, { fr: 'Panorama au-dessus des nuages', en: 'Above-the-clouds panorama', zh: '云端全景' }], suggestedDurationMinutes: 180, latitude: 28.754, longitude: -17.885, website: 'https://www.iac.es/en/observatorios-de-canarias/roque-de-los-muchachos-observatory', sourceUrl: SOURCE,
  },
  {
    id: 'canary-islands-mirador-pena', cityId: 'canary-islands', category: 'landmark', image: require('../../../assets/offline-pois/canary-islands/mirador-pena.webp'), imageCredit: CREDIT,
    name: { fr: 'Mirador de la Peña — El Hierro', en: 'Mirador de la Peña — El Hierro', zh: 'Mirador de la Peña — El Hierro' }, address: { fr: 'HI-10, 38916 Guarazoca, El Hierro, Espagne', en: 'HI-10, 38916 Guarazoca, El Hierro, Spain', zh: 'HI-10, 38916 瓜拉索卡, 埃尔耶罗, 西班牙' },
    description: { fr: 'Belvédère de César Manrique posé au-dessus de la vallée d’El Golfo, combinant architecture insulaire et panorama océanique.', en: 'A César Manrique viewpoint above the El Golfo valley, combining island architecture with an ocean panorama.', zh: 'El Golfo 山谷上方的 César Manrique 观景台，将岛屿建筑与海洋全景融为一体。' },
    highlights: [{ fr: 'Vue sur El Golfo', en: 'View over El Golfo', zh: '俯瞰埃尔戈尔福' }, { fr: 'Architecture de César Manrique', en: 'César Manrique architecture', zh: '塞萨尔·曼里克建筑' }], suggestedDurationMinutes: 75, latitude: 27.8056, longitude: -17.9794, sourceUrl: SOURCE,
  },
];

export const CANARY_ISLANDS_POIS: OfflinePOI[] = seeds.map(createSpanishPOI);
