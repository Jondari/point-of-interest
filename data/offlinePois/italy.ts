import type { OfflinePOI } from '../../types/offlinePoi';
import { FLORENCE_POIS } from './italy/florence';
import { NAPLES_POIS } from './italy/naples';
import { ROME_POIS } from './italy/rome';
import { VENICE_POIS } from './italy/venice';

export const ITALY_POIS: OfflinePOI[] = [
  ...ROME_POIS,
  ...FLORENCE_POIS,
  ...VENICE_POIS,
  ...NAPLES_POIS,
];
