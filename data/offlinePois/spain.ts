import type { OfflinePOI } from '../../types/offlinePoi';
import { BARCELONA_POIS } from './spain/barcelona';
import { BILBAO_POIS } from './spain/bilbao';
import { CANARY_ISLANDS_POIS } from './spain/canaryIslands';
import { MADRID_POIS } from './spain/madrid';

export const SPAIN_POIS: OfflinePOI[] = [
  ...MADRID_POIS,
  ...BARCELONA_POIS,
  ...BILBAO_POIS,
  ...CANARY_ISLANDS_POIS,
];
