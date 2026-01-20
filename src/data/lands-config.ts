import { COLORS, AUDIO } from '../config/constants';

export interface LandConfig {
  id: number;
  name: string;
  emoji: string;
  levelStart: number;
  levelEnd: number;
  primary: number;
  secondary: number;
  accent: number;
  content: 'letters' | 'words-short' | 'words-medium' | 'words-long' | 'words-science';
  bgm: string;
}

export const LANDS_CONFIG: LandConfig[] = [
  {
    id: 1,
    name: 'Cheese Factory',
    emoji: '🧀',
    levelStart: 1,
    levelEnd: 10,
    primary: COLORS.CHEESE_FACTORY.primary,
    secondary: COLORS.CHEESE_FACTORY.secondary,
    accent: COLORS.CHEESE_FACTORY.accent,
    content: 'letters',
    bgm: AUDIO.BGM.CHEESE_FACTORY,
  },
  {
    id: 2,
    name: 'Green Garden',
    emoji: '🌿',
    levelStart: 11,
    levelEnd: 20,
    primary: COLORS.GREEN_GARDEN.primary,
    secondary: COLORS.GREEN_GARDEN.secondary,
    accent: COLORS.GREEN_GARDEN.accent,
    content: 'words-short',
    bgm: AUDIO.BGM.GREEN_GARDEN,
  },
  {
    id: 3,
    name: 'Blue Ocean',
    emoji: '🌊',
    levelStart: 21,
    levelEnd: 30,
    primary: COLORS.BLUE_OCEAN.primary,
    secondary: COLORS.BLUE_OCEAN.secondary,
    accent: COLORS.BLUE_OCEAN.accent,
    content: 'words-medium',
    bgm: AUDIO.BGM.BLUE_OCEAN,
  },
  {
    id: 4,
    name: 'Candy Land',
    emoji: '🍬',
    levelStart: 31,
    levelEnd: 40,
    primary: COLORS.CANDY_LAND.primary,
    secondary: COLORS.CANDY_LAND.secondary,
    accent: COLORS.CANDY_LAND.accent,
    content: 'words-long',
    bgm: AUDIO.BGM.CANDY_LAND,
  },
  {
    id: 5,
    name: 'Space Adventure',
    emoji: '🚀',
    levelStart: 41,
    levelEnd: 50,
    primary: COLORS.SPACE.primary,
    secondary: COLORS.SPACE.secondary,
    accent: COLORS.SPACE.accent,
    content: 'words-science',
    bgm: AUDIO.BGM.SPACE,
  },
];

/**
 * Get land configuration by level number
 */
export function getLandByLevel(level: number): LandConfig {
  const land = LANDS_CONFIG.find(
    (l) => level >= l.levelStart && level <= l.levelEnd
  );
  return land || LANDS_CONFIG[0];
}

/**
 * Get land configuration by land ID
 */
export function getLandById(id: number): LandConfig {
  return LANDS_CONFIG.find((l) => l.id === id) || LANDS_CONFIG[0];
}
