import { getStoryAudioKey } from '../config/constants';

export interface StoryConfig {
  level: number;
  title: string;
  duration: number; // seconds
  audioKey: string;
}

/**
 * Get story duration based on level progression
 * Levels 1-10: 30s, 11-20: 35s, 21-30: 40s, 31-40: 50s, 41-50: 60s
 */
const getDuration = (level: number): number => {
  if (level <= 10) return 30;
  if (level <= 20) return 35;
  if (level <= 30) return 40;
  if (level <= 40) return 50;
  return 60;
};

/**
 * Get story title based on level and land
 */
const getTitle = (level: number): string => {
  if (level <= 10) return `Cheese Factory Adventure ${level}`;
  if (level <= 20) return `Green Garden Tale ${level - 10}`;
  if (level <= 30) return `Blue Ocean Story ${level - 20}`;
  if (level <= 40) return `Candy Land Journey ${level - 30}`;
  return `Space Adventure ${level - 40}`;
};

const MIN_LEVEL = 1;
const MAX_LEVEL = 50;

/**
 * Get story configuration for a specific level
 * @throws Error if level is out of valid range (1-50)
 */
export const getStoryConfig = (level: number): StoryConfig => {
  if (level < MIN_LEVEL || level > MAX_LEVEL) {
    throw new Error(`Invalid level: ${level}. Must be between ${MIN_LEVEL} and ${MAX_LEVEL}.`);
  }
  return {
    level,
    title: getTitle(level),
    duration: getDuration(level),
    audioKey: getStoryAudioKey(level),
  };
};
