import { CHEESE_FACTORY_STORIES } from './stories/cheese-factory';
import { GREEN_GARDEN_STORIES } from './stories/green-garden';
import { BLUE_OCEAN_STORIES } from './stories/blue-ocean';
import { CANDY_LAND_STORIES } from './stories/candy-land';
import { SPACE_ADVENTURE_STORIES } from './stories/space-adventure';

const MIN_LEVEL = 1;
const MAX_LEVEL = 50;

/**
 * Get story text for a specific level
 * @throws Error if level is out of valid range (1-50)
 */
export const getStoryText = (level: number): string => {
  if (level < MIN_LEVEL || level > MAX_LEVEL) {
    throw new Error(`Invalid level: ${level}. Must be between ${MIN_LEVEL} and ${MAX_LEVEL}.`);
  }

  let story: string | undefined;

  if (level <= 10) {
    story = CHEESE_FACTORY_STORIES[level];
  } else if (level <= 20) {
    story = GREEN_GARDEN_STORIES[level];
  } else if (level <= 30) {
    story = BLUE_OCEAN_STORIES[level];
  } else if (level <= 40) {
    story = CANDY_LAND_STORIES[level];
  } else {
    story = SPACE_ADVENTURE_STORIES[level];
  }

  if (!story) {
    throw new Error(`Story not found for level ${level}.`);
  }

  return story;
};
