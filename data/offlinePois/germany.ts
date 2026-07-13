import type { OfflinePOI } from '../../types/offlinePoi';
import { BERLIN_POIS } from './germany/berlin';
import { FRANKFURT_POIS } from './germany/frankfurt';

export const GERMANY_POIS: OfflinePOI[] = [
  ...BERLIN_POIS,
  ...FRANKFURT_POIS,
];
