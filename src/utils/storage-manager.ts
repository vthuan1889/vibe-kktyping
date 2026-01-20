import { STORAGE_KEYS } from '../config/constants';

/**
 * Manages game progress and settings in LocalStorage
 */
export const StorageManager = {
  // Get current unlocked level (default: 1)
  getCurrentLevel(): number {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_LEVEL);
    return saved ? parseInt(saved, 10) : 1;
  },

  // Set current unlocked level
  setCurrentLevel(level: number): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_LEVEL, level.toString());
  },

  // Get stars for all levels
  getStarsPerLevel(): Record<number, number> {
    const saved = localStorage.getItem(STORAGE_KEYS.STARS_PER_LEVEL);
    return saved ? JSON.parse(saved) : {};
  },

  // Set stars for a specific level
  setLevelStars(level: number, stars: number): void {
    const allStars = this.getStarsPerLevel();
    allStars[level] = Math.max(allStars[level] || 0, stars); // Keep best score
    localStorage.setItem(STORAGE_KEYS.STARS_PER_LEVEL, JSON.stringify(allStars));
  },

  // Get sound enabled state
  getSoundEnabled(): boolean {
    const saved = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
    return saved !== 'false'; // Default true
  },

  // Set sound enabled state
  setSoundEnabled(enabled: boolean): void {
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, enabled.toString());
  },

  // Get music enabled state
  getMusicEnabled(): boolean {
    const saved = localStorage.getItem(STORAGE_KEYS.MUSIC_ENABLED);
    return saved !== 'false'; // Default true
  },

  // Set music enabled state
  setMusicEnabled(enabled: boolean): void {
    localStorage.setItem(STORAGE_KEYS.MUSIC_ENABLED, enabled.toString());
  },

  // Reset all progress (for testing)
  resetProgress(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_LEVEL);
    localStorage.removeItem(STORAGE_KEYS.STARS_PER_LEVEL);
  },
};
