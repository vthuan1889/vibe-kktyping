import Phaser from 'phaser';
import { getStoryConfig } from '../data/stories-config';
import { getStoryText } from '../data/stories-content';

/**
 * Manages story audio loading and playback
 * Lazy loads audio files to avoid bundle bloat
 */
export class StoryManager {
  private scene: Phaser.Scene;
  private currentAudio: Phaser.Sound.BaseSound | null = null;
  private isLoading = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Load and play story audio for a level
   * Falls back to TTS if audio file not available
   */
  async loadAndPlay(level: number, onComplete: () => void): Promise<void> {
    if (this.isLoading) return;
    this.isLoading = true;

    const config = getStoryConfig(level);
    const audioPath = `assets/audio/stories/level-${level}.mp3`;

    try {
      // Check if audio already loaded
      if (!this.scene.cache.audio.exists(config.audioKey)) {
        // Lazy load audio
        await new Promise<void>((resolve, reject) => {
          this.scene.load.audio(config.audioKey, audioPath);
          this.scene.load.once('complete', resolve);
          this.scene.load.once('loaderror', () => reject(new Error('Audio load failed')));
          this.scene.load.start();
        });
      }

      // Resume audio context if suspended (browser autoplay policy)
      const soundManager = this.scene.sound as Phaser.Sound.WebAudioSoundManager;
      if (soundManager.context?.state === 'suspended') {
        await soundManager.context.resume();
      }

      // Play audio
      this.currentAudio = this.scene.sound.add(config.audioKey);
      this.currentAudio.once('complete', () => {
        this.isLoading = false;
        onComplete();
      });
      this.currentAudio.play();

    } catch (error) {
      console.warn('Story audio not available, using TTS fallback:', error);
      this.fallbackToTTS(level, onComplete);
    }
  }

  /**
   * Fallback to browser TTS if audio file not available
   */
  private fallbackToTTS(level: number, onComplete: () => void): void {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      this.isLoading = false;
      onComplete();
      return;
    }

    const text = getStoryText(level);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.2;
    utterance.lang = 'en-US';

    utterance.onend = () => {
      this.isLoading = false;
      onComplete();
    };

    utterance.onerror = () => {
      this.isLoading = false;
      onComplete();
    };

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Stop current story playback
   */
  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.stop();
      this.currentAudio.destroy();
      this.currentAudio = null;
    }

    // Also stop TTS
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    this.isLoading = false;
  }

  /**
   * Check if story is currently playing
   */
  isPlaying(): boolean {
    return this.currentAudio?.isPlaying ?? false;
  }

  /**
   * Get story text for display
   */
  getStoryText(level: number): string {
    return getStoryText(level);
  }
}
