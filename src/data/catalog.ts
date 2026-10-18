import type { CatalogMap } from '../utils/catalog';
import { genshinCatalog } from './genshin';
import { hsrCatalog } from './honkaiStarRail';
import { wuwaCatalog } from './wutheringWaves';

export const CATALOGS: CatalogMap = {
  genshin: genshinCatalog,
  hsr: hsrCatalog,
  wuwa: wuwaCatalog,
};