import Phaser from 'phaser';
import { StorageManager } from './storage-manager';

/**
 * Manages audio playback for the game
 */
export class AudioManager {
  private scene: Phaser.Scene;
  private bgMusic: Phaser.Sound.BaseSound | null = null;
  private soundEnabled: boolean;
  private musicEnabled: boolean;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.soundEnabled = StorageManager.getSoundEnabled();
    this.musicEnabled = StorageManager.getMusicEnabled();
  }

  // Play sound effect
  playSfx(key: string, config?: Phaser.Types.Sound.SoundConfig): void {
    if (!this.soundEnabled) return;

    try {
      this.scene.sound.play(key, config);
    } catch (e) {
      console.warn(`Failed to play sound: ${key}`);
    }
  }

  // Play background music
  playMusic(key: string, config?: Phaser.Types.Sound.SoundConfig): void {
    if (!this.musicEnabled) return;

    this.stopMusic();

    try {
      this.bgMusic = this.scene.sound.add(key, {
        loop: true,
        volume: 0.5,
        ...config,
      });
      this.bgMusic.play();
    } catch (e) {
      console.warn(`Failed to play music: ${key}`);
    }
  }

  // Stop background music
  stopMusic(): void {
    if (this.bgMusic) {
      this.bgMusic.stop();
      this.bgMusic.destroy();
      this.bgMusic = null;
    }
  }

  // Toggle sound effects
  toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    StorageManager.setSoundEnabled(this.soundEnabled);
    return this.soundEnabled;
  }

  // Toggle music
  toggleMusic(): boolean {
    this.musicEnabled = !this.musicEnabled;
    StorageManager.setMusicEnabled(this.musicEnabled);

    if (!this.musicEnabled) {
      this.stopMusic();
    }

    return this.musicEnabled;
  }

  // Get current states
  isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  isMusicEnabled(): boolean {
    return this.musicEnabled;
  }
}
