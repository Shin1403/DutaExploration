import type { Game } from '../types/game';

export const GAMES: Game[] = [
  {
    id: 'genshin',
    name: 'Genshin Impact',
    shortName: 'Genshin',
    accent: '#8FA8FF',
    description: 'Explorasi region, Spiral Abyss, quest, dan build karakter.',
  },
  {
    id: 'hsr',
    name: 'Honkai: Star Rail',
    shortName: 'Star Rail',
    accent: '#B8C5FF',
    description: 'Exploration, endgame mode, dan story mission.',
  },
  {
    id: 'wuwa',
    name: 'Wuthering Waves',
    shortName: 'WuWa',
    accent: '#7DD6C2',
    description: 'Exploration dan layanan endgame Wuthering Waves.',
  },
];