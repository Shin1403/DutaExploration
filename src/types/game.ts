/** Identifier game yang stabil — jangan diubah sembarangan. */
export type GameId = 'genshin' | 'hsr' | 'wuwa';

export interface Game {
  id: GameId;
  name: string;
  shortName: string;
  /** Warna aksen khas game, dipakai untuk dekorasi tab aktif. */
  accent: string;
  description: string;
}