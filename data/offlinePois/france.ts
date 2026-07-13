import type { OfflinePOI } from '../../types/offlinePoi';
import { CANNES_POIS } from './france/cannes';
import { LYON_POIS } from './france/lyon';
import { MARSEILLE_POIS } from './france/marseille';
import { NICE_POIS } from './france/nice';
import { TOULOUSE_POIS } from './france/toulouse';

export const FRANCE_POIS: OfflinePOI[] = [
  ...LYON_POIS,
  ...TOULOUSE_POIS,
  ...MARSEILLE_POIS,
  ...CANNES_POIS,
  ...NICE_POIS,
];
