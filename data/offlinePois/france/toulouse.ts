import type { OfflinePOI } from '../../../types/offlinePoi';
import { createFrenchPOI, type FrenchPOISeed } from './helpers';

const SOURCE = 'https://www.toulouse-tourisme.com/nos-incontournables/';
const CREDIT = 'Wikimedia Commons — attribution détaillée dans docs/image-attributions.md';

const seeds: FrenchPOISeed[] = [
  {
    id: 'toulouse-capitole', cityId: 'toulouse', category: 'landmark', image: require('../../../assets/offline-pois/toulouse/capitole.webp'), imageCredit: CREDIT,
    name: { fr: 'Place du Capitole', en: 'Place du Capitole' }, address: { fr: 'Place du Capitole, 31000 Toulouse, France', en: 'Place du Capitole, 31000 Toulouse, France' },
    description: { fr: 'Place emblématique de la ville rose, bordée par le Capitole qui abrite l’hôtel de ville et le théâtre.', en: 'The Pink City’s emblematic square, bordered by the Capitole housing City Hall and the theatre.' },
    highlights: [{ fr: 'Façade monumentale', en: 'Monumental façade' }, { fr: 'Salles historiques', en: 'Historic state rooms' }], suggestedDurationMinutes: 60, latitude: 43.6045, longitude: 1.444, sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-saint-sernin', cityId: 'toulouse', category: 'religious', image: require('../../../assets/offline-pois/toulouse/saint-sernin.webp'), imageCredit: CREDIT,
    name: { fr: 'Basilique Saint-Sernin', en: 'Basilica of Saint-Sernin' }, address: { fr: 'Place Saint-Sernin, 31000 Toulouse, France', en: 'Place Saint-Sernin, 31000 Toulouse, France' },
    description: { fr: 'Grande basilique romane en brique, étape majeure des chemins de Saint-Jacques-de-Compostelle.', en: 'A vast brick Romanesque basilica and a major stop on the Way of Saint James.' },
    highlights: [{ fr: 'Architecture romane', en: 'Romanesque architecture' }, { fr: 'Reliques et crypte', en: 'Relics and crypt' }], suggestedDurationMinutes: 60, latitude: 43.6084, longitude: 1.441, sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-jacobins', cityId: 'toulouse', category: 'religious', image: require('../../../assets/offline-pois/toulouse/jacobins.webp'), imageCredit: CREDIT,
    name: { fr: 'Couvent des Jacobins', en: 'Convent of the Jacobins' }, address: { fr: 'Place des Jacobins, 31000 Toulouse, France', en: 'Place des Jacobins, 31000 Toulouse, France' },
    description: { fr: 'Ensemble gothique méridional réputé pour son spectaculaire pilier en forme de palmier et son cloître.', en: 'A Southern Gothic complex famed for its spectacular palm-shaped column and cloister.' },
    highlights: [{ fr: 'Palmier de pierre', en: 'Stone palm column' }, { fr: 'Cloître médiéval', en: 'Medieval cloister' }], suggestedDurationMinutes: 75, latitude: 43.6039, longitude: 1.439, website: 'https://jacobins.toulouse.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-cite-espace', cityId: 'toulouse', category: 'museum', image: require('../../../assets/offline-pois/toulouse/cite-espace.webp'), imageCredit: CREDIT,
    name: { fr: 'Cité de l’espace', en: 'Cité de l’espace' }, address: { fr: 'Avenue Jean-Gonord, 31500 Toulouse, France', en: 'Avenue Jean-Gonord, 31500 Toulouse, France' },
    description: { fr: 'Parc scientifique consacré à l’exploration spatiale, avec engins grandeur nature, expositions et planétarium.', en: 'A science park dedicated to space exploration, with full-scale spacecraft, exhibitions and a planetarium.' },
    highlights: [{ fr: 'Fusée Ariane 5', en: 'Ariane 5 rocket' }, { fr: 'Station Mir et planétarium', en: 'Mir station and planetarium' }], suggestedDurationMinutes: 240, latitude: 43.586, longitude: 1.493, website: 'https://www.cite-espace.com/', sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-aeroscopia', cityId: 'toulouse', category: 'museum', image: require('../../../assets/offline-pois/toulouse/aeroscopia.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée Aeroscopia', en: 'Aeroscopia Museum' }, address: { fr: '1 allée André-Turcat, 31700 Blagnac, France', en: '1 Allée André-Turcat, 31700 Blagnac, France' },
    description: { fr: 'Musée aéronautique présentant notamment Concorde, Airbus A300B et Super Guppy.', en: 'An aviation museum featuring Concorde, the Airbus A300B and Super Guppy.' },
    highlights: [{ fr: 'Visite de Concorde', en: 'Concorde visit' }, { fr: 'Collection d’avions historiques', en: 'Historic aircraft collection' }], suggestedDurationMinutes: 180, latitude: 43.6602, longitude: 1.36, website: 'https://www.aeroscopia.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-augustins', cityId: 'toulouse', category: 'museum', image: require('../../../assets/offline-pois/toulouse/augustins.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée des Augustins', en: 'Musée des Augustins' }, address: { fr: '21 rue de Metz, 31000 Toulouse, France', en: '21 Rue de Metz, 31000 Toulouse, France' },
    description: { fr: 'Musée des beaux-arts dans un ancien couvent gothique, riche en sculptures médiévales et peintures européennes.', en: 'A fine arts museum in a former Gothic convent, rich in medieval sculpture and European paintings.' },
    highlights: [{ fr: 'Sculptures romanes', en: 'Romanesque sculpture' }, { fr: 'Cloître gothique', en: 'Gothic cloister' }], suggestedDurationMinutes: 120, latitude: 43.601, longitude: 1.446, website: 'https://www.augustins.org/', sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-saint-raymond', cityId: 'toulouse', category: 'museum', image: require('../../../assets/offline-pois/toulouse/saint-raymond.webp'), imageCredit: CREDIT,
    name: { fr: 'Musée Saint-Raymond', en: 'Musée Saint-Raymond' }, address: { fr: '1 ter place Saint-Sernin, 31000 Toulouse, France', en: '1 ter Place Saint-Sernin, 31000 Toulouse, France' },
    description: { fr: 'Musée d’archéologie présentant Toulouse antique et une remarquable collection de sculptures romaines.', en: 'An archaeology museum presenting ancient Toulouse and a remarkable collection of Roman sculpture.' },
    highlights: [{ fr: 'Toulouse romaine', en: 'Roman Toulouse' }, { fr: 'Sculptures de la villa de Chiragan', en: 'Sculptures from Chiragan villa' }], suggestedDurationMinutes: 90, latitude: 43.6085, longitude: 1.441, website: 'https://saintraymond.toulouse.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-museum', cityId: 'toulouse', category: 'museum', image: require('../../../assets/offline-pois/toulouse/museum.webp'), imageCredit: CREDIT,
    name: { fr: 'Muséum de Toulouse', en: 'Toulouse Natural History Museum' }, address: { fr: '35 allées Jules-Guesde, 31000 Toulouse, France', en: '35 Allées Jules-Guesde, 31000 Toulouse, France' },
    description: { fr: 'Muséum d’histoire naturelle consacré à la Terre, au vivant et aux relations entre humains et environnement.', en: 'A natural history museum devoted to Earth, life and relationships between humans and the environment.' },
    highlights: [{ fr: 'Galerie des squelettes', en: 'Skeleton gallery' }, { fr: 'Jardin botanique voisin', en: 'Adjacent botanical garden' }], suggestedDurationMinutes: 150, latitude: 43.594, longitude: 1.449, website: 'https://museum.toulouse-metropole.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-jardin-japonais', cityId: 'toulouse', category: 'park', image: require('../../../assets/offline-pois/toulouse/jardin-japonais.webp'), imageCredit: CREDIT,
    name: { fr: 'Jardin japonais Pierre-Baudis', en: 'Pierre-Baudis Japanese Garden' }, address: { fr: 'Boulevard Lascrosses, 31000 Toulouse, France', en: 'Boulevard Lascrosses, 31000 Toulouse, France' },
    description: { fr: 'Jardin paysager inspiré de Kyoto, organisé autour d’un étang, d’un pavillon de thé et d’un pont rouge.', en: 'A Kyoto-inspired landscape garden arranged around a pond, tea pavilion and red bridge.' },
    highlights: [{ fr: 'Pont rouge et étang', en: 'Red bridge and pond' }, { fr: 'Pavillon de thé', en: 'Tea pavilion' }], suggestedDurationMinutes: 60, latitude: 43.611, longitude: 1.433, sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-canal-midi', cityId: 'toulouse', category: 'historic', image: require('../../../assets/offline-pois/toulouse/canal-midi.webp'), imageCredit: CREDIT,
    name: { fr: 'Canal du Midi', en: 'Canal du Midi' }, address: { fr: 'Port Saint-Sauveur, 31000 Toulouse, France', en: 'Port Saint-Sauveur, 31000 Toulouse, France' },
    description: { fr: 'Canal historique classé par l’UNESCO, bordé de chemins propices à la marche et au vélo.', en: 'A UNESCO-listed historic canal, lined with paths suited to walking and cycling.' },
    highlights: [{ fr: 'Ouvrage de Pierre-Paul Riquet', en: 'Pierre-Paul Riquet’s engineering work' }, { fr: 'Promenade ombragée', en: 'Shaded walk' }], suggestedDurationMinutes: 90, latitude: 43.596, longitude: 1.458, sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-pont-neuf', cityId: 'toulouse', category: 'landmark', image: require('../../../assets/offline-pois/toulouse/pont-neuf.webp'), imageCredit: CREDIT,
    name: { fr: 'Pont-Neuf', en: 'Pont-Neuf' }, address: { fr: 'Pont-Neuf, 31000 Toulouse, France', en: 'Pont-Neuf, 31000 Toulouse, France' },
    description: { fr: 'Plus ancien pont conservé sur la Garonne à Toulouse, reconnaissable à ses arches irrégulières et dégueuloirs.', en: 'Toulouse’s oldest surviving bridge over the Garonne, recognised by its irregular arches and flood openings.' },
    highlights: [{ fr: 'Vue sur la Garonne', en: 'Garonne views' }, { fr: 'Architecture du XVIe siècle', en: '16th-century architecture' }], suggestedDurationMinutes: 30, latitude: 43.599, longitude: 1.439, sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-assezat', cityId: 'toulouse', category: 'museum', image: require('../../../assets/offline-pois/toulouse/assezat.webp'), imageCredit: CREDIT,
    name: { fr: 'Hôtel d’Assézat – Fondation Bemberg', en: 'Hôtel d’Assézat – Bemberg Foundation' }, address: { fr: 'Place d’Assézat, 31000 Toulouse, France', en: 'Place d’Assézat, 31000 Toulouse, France' },
    description: { fr: 'Hôtel particulier Renaissance abritant une collection de peintures, mobilier et objets d’art.', en: 'A Renaissance mansion housing a collection of paintings, furniture and decorative arts.' },
    highlights: [{ fr: 'Cour Renaissance', en: 'Renaissance courtyard' }, { fr: 'Collection Bonnard', en: 'Bonnard collection' }], suggestedDurationMinutes: 120, latitude: 43.5993, longitude: 1.443, website: 'https://www.fondation-bemberg.fr/', sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-saint-etienne', cityId: 'toulouse', category: 'religious', image: require('../../../assets/offline-pois/toulouse/saint-etienne.webp'), imageCredit: CREDIT,
    name: { fr: 'Cathédrale Saint-Étienne', en: 'Saint Stephen’s Cathedral' }, address: { fr: 'Place Saint-Étienne, 31000 Toulouse, France', en: 'Place Saint-Étienne, 31000 Toulouse, France' },
    description: { fr: 'Cathédrale singulière formée par la rencontre de plusieurs campagnes architecturales, du roman au gothique.', en: 'An unusual cathedral shaped by several building campaigns, from Romanesque to Gothic.' },
    highlights: [{ fr: 'Nef asymétrique', en: 'Asymmetrical nave' }, { fr: 'Vitraux et chapelles', en: 'Stained glass and chapels' }], suggestedDurationMinutes: 45, latitude: 43.6002, longitude: 1.45, sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-prairie-filtres', cityId: 'toulouse', category: 'park', image: require('../../../assets/offline-pois/toulouse/prairie-filtres.webp'), imageCredit: CREDIT,
    name: { fr: 'Prairie des Filtres', en: 'Prairie des Filtres' }, address: { fr: 'Cours Dillon, 31300 Toulouse, France', en: 'Cours Dillon, 31300 Toulouse, France' },
    description: { fr: 'Grand espace vert sur la rive gauche de la Garonne, apprécié pour les vues sur les quais et le Pont-Neuf.', en: 'A large green space on the Garonne’s left bank, valued for views of the embankments and Pont-Neuf.' },
    highlights: [{ fr: 'Berges de la Garonne', en: 'Garonne riverbank' }, { fr: 'Vue sur le centre historique', en: 'View of the historic centre' }], suggestedDurationMinutes: 60, latitude: 43.594, longitude: 1.435, sourceUrl: SOURCE,
  },
  {
    id: 'toulouse-halle-machine', cityId: 'toulouse', category: 'museum', image: require('../../../assets/offline-pois/toulouse/halle-machine.webp'), imageCredit: CREDIT,
    name: { fr: 'Halle de La Machine', en: 'Halle de La Machine' }, address: { fr: '3 avenue de l’Aérodrome-de-Montaudran, 31400 Toulouse, France', en: '3 Avenue de l’Aérodrome-de-Montaudran, 31400 Toulouse, France' },
    description: { fr: 'Lieu d’exposition vivant où de grandes machines de spectacle, dont le Minotaure, sont mises en mouvement.', en: 'A living exhibition venue where giant performance machines, including the Minotaur, are set in motion.' },
    highlights: [{ fr: 'Minotaure monumental', en: 'Monumental Minotaur' }, { fr: 'Machines en démonstration', en: 'Machines in demonstration' }], suggestedDurationMinutes: 150, latitude: 43.579, longitude: 1.491, website: 'https://www.halledelamachine.fr/', sourceUrl: SOURCE,
  },
];

export const TOULOUSE_POIS: OfflinePOI[] = seeds.map(createFrenchPOI);
