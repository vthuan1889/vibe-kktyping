// Game dimensions - 16:9 aspect ratio
export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

// Colors from design guidelines
export const COLORS = {
  // Land themes
  CHEESE_FACTORY: { primary: 0xffd93d, secondary: 0xff9f1c, accent: 0x6c4e31 },
  GREEN_GARDEN: { primary: 0x4caf50, secondary: 0x81c784, accent: 0x2e7d32 },
  BLUE_OCEAN: { primary: 0x2196f3, secondary: 0x64b5f6, accent: 0x0d47a1 },
  CANDY_LAND: { primary: 0xe91e63, secondary: 0xf48fb1, accent: 0xad1457 },
  SPACE: { primary: 0x1a237e, secondary: 0x3f51b5, accent: 0x7c4dff },

  // UI colors
  BACKGROUND: 0xfff8e7,
  TEXT_DARK: 0x2d2d2d,
  SUCCESS: 0x4caf50,
  ERROR: 0xf44336,
  BUTTON_PRIMARY: 0xff6b35,
  BUTTON_HOVER: 0xe55a2b,
  WHITE: 0xffffff,
};

// Finger colors for virtual keyboard (Levels 1-10)
export const FINGER_COLORS = {
  PINKY: 0xff6b6b,
  RING: 0x4ecdc4,
  MIDDLE: 0x45b7d1,
  INDEX: 0x96ceb4,
  THUMB: 0xffeaa7,
};

// Scene keys
export const SCENES = {
  BOOT: 'BootScene',
  PRELOAD: 'PreloadScene',
  MENU: 'MenuScene',
  TREASURE_MAP: 'TreasureMapScene',
  GAME: 'GameScene',
  SUMMARY: 'SummaryScene',
} as const;

// Storage keys for LocalStorage
export const STORAGE_KEYS = {
  CURRENT_LEVEL: 'kaka_current_level',
  STARS_PER_LEVEL: 'kaka_stars',
  SOUND_ENABLED: 'kaka_sound',
  MUSIC_ENABLED: 'kaka_music',
} as const;

// Typography
export const FONTS = {
  HEADING: 'Fredoka One',
  BODY: 'Nunito',
} as const;

// Audio keys
export const AUDIO = {
  SFX: {
    CORRECT: 'sfx-correct',
    WRONG: 'sfx-wrong',
    CLICK: 'sfx-click',
    COMPLETE: 'sfx-complete',
  },
  BGM: {
    CHEESE_FACTORY: 'bgm-cheese-factory',
    GREEN_GARDEN: 'bgm-green-garden',
    BLUE_OCEAN: 'bgm-blue-ocean',
    CANDY_LAND: 'bgm-candy-land',
    SPACE: 'bgm-space',
  },
} as const;

/**
 * Get story audio key for a level
 */
export const getStoryAudioKey = (level: number): string => `story-level-${level}`;

// Scene transition timing
export const TRANSITION = {
  FADE_IN: 300,
  FADE_OUT: 200,
} as const;
