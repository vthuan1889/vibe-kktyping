/**
 * Background and decorative element configuration per land
 */

export const BACKGROUND_ASSETS: Record<string, string> = {
  'bg-cheese-factory': 'assets/images/backgrounds/cheese-factory.png',
  'bg-green-garden': 'assets/images/backgrounds/green-garden.png',
  'bg-blue-ocean': 'assets/images/backgrounds/blue-ocean.png',
  'bg-candy-land': 'assets/images/backgrounds/candy-land.png',
  'bg-space-adventure': 'assets/images/backgrounds/space-adventure.png',
};

export const DECORATIVE_ELEMENTS: Record<string, string[]> = {
  'cheese-factory': ['🧀', '🔧', '⚙️', '🐭', '🏭'],
  'green-garden': ['🦋', '🌸', '🐝', '🌻', '🌱'],
  'blue-ocean': ['🐠', '🐚', '🦀', '🐙', '🌊'],
  'candy-land': ['🍭', '🍪', '🧁', '🍬', '🎂'],
  'space-adventure': ['⭐', '🌙', '🪐', '🚀', '🛸'],
};

export const SPARKLE_EMOJIS = ['✨', '⭐', '💫'];

/**
 * Get decorative elements for a land by name
 */
export function getDecorativeElements(landName: string): string[] {
  const key = landName.toLowerCase().replace(/\s+/g, '-');
  return DECORATIVE_ELEMENTS[key] || ['✨'];
}
