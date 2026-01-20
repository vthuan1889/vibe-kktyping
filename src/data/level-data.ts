export interface LevelConfig {
  level: number;
  content: string[];
  scoringMode: 'encouragement' | 'accuracy' | 'mastery';
}

// Home row keys for Level 1-10
const HOME_ROW_KEYS = ['F', 'J', 'D', 'K', 'S', 'L', 'A', ';'];

// Short words for Level 11-20
const SHORT_WORDS = [
  'CAT', 'SUN', 'BEE', 'BUG', 'DOG', 'HAT', 'BAT', 'RUN', 'FUN', 'HOP',
  'TOP', 'CUP', 'MOM', 'DAD', 'BIG', 'RED', 'YES', 'NO', 'GO', 'UP',
];

// Medium words for Level 21-30
const MEDIUM_WORDS = [
  'FISH', 'SHIP', 'SHELL', 'WATER', 'WAVE', 'BLUE', 'SWIM', 'DEEP',
  'CRAB', 'STAR', 'SAND', 'BOAT', 'SAIL', 'OCEAN', 'CORAL',
];

// Long words for Level 31-40
const LONG_WORDS = [
  'CANDY', 'SWEET', 'CAKE', 'COOKIE', 'SUGAR', 'CHOCOLATE', 'LOLLIPOP',
  'GUMMY', 'TREAT', 'DONUT', 'SPRINKLE', 'FROSTING',
];

// Science/Space words for Level 41-50
const SCIENCE_WORDS = [
  'STAR', 'MOON', 'EARTH', 'SKY', 'ROCKET', 'PLANET', 'SPACE', 'COMET',
  'ALIEN', 'ORBIT', 'GALAXY', 'NEBULA', 'ASTEROID', 'COSMIC',
];

/**
 * Generate level configuration
 */
export function getLevelConfig(level: number): LevelConfig {
  let content: string[] = [];
  let scoringMode: LevelConfig['scoringMode'] = 'encouragement';

  if (level <= 10) {
    // Land 1: Single letters
    content = shuffleArray([...HOME_ROW_KEYS]).slice(0, 8);
    scoringMode = 'encouragement';
  } else if (level <= 20) {
    // Land 2: Short words
    content = getRandomItems(SHORT_WORDS, 5);
    scoringMode = 'accuracy';
  } else if (level <= 30) {
    // Land 3: Medium words
    content = getRandomItems(MEDIUM_WORDS, 5);
    scoringMode = 'mastery';
  } else if (level <= 40) {
    // Land 4: Long words
    content = getRandomItems(LONG_WORDS, 4);
    scoringMode = 'mastery';
  } else {
    // Land 5: Science words
    content = getRandomItems(SCIENCE_WORDS, 4);
    scoringMode = 'mastery';
  }

  return { level, content, scoringMode };
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomItems<T>(array: T[], count: number): T[] {
  return shuffleArray(array).slice(0, count);
}
