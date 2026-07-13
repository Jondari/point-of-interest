import type { OfflinePOI } from '../../types/offlinePoi';
import { CHENGDU_POIS } from './china/chengdu';
import { CHONGQING_POIS } from './china/chongqing';
import { QINGDAO_POIS } from './china/qingdao';
import { SHANGHAI_POIS } from './china/shanghai';
import { XIAN_POIS } from './china/xian';

export const CHINA_POIS: OfflinePOI[] = [
  ...QINGDAO_POIS,
  ...XIAN_POIS,
  ...CHENGDU_POIS,
  ...SHANGHAI_POIS,
  ...CHONGQING_POIS,
];
