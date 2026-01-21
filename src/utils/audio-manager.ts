import Phaser from 'phaser';
import { StorageManager } from './storage-manager';

/**
 * Manages audio playback for the game including TTS voice
 */
export class AudioManager {
  private scene: Phaser.Scene;
  private bgMusic: Phaser.Sound.BaseSound | null = null;
  private soundEnabled: boolean;
  private musicEnabled: boolean;
  private synth: SpeechSynthesis | null = null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.soundEnabled = StorageManager.getSoundEnabled();
    this.musicEnabled = StorageManager.getMusicEnabled();

    // Initialize speech synthesis if available
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      this.synth = window.speechSynthesis;
    }
  }

  // Speak text using browser TTS
  speak(text: string, rate: number = 0.8): void {
    if (!this.soundEnabled || !this.synth) return;

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1.2; // Slightly higher pitch for kid-friendly voice
    utterance.volume = 1;
    utterance.lang = 'en-US';

    this.synth.speak(utterance);
  }

  // Speak letter for typing guidance
  speakLetter(letter: string): void {
    if (!this.soundEnabled || !this.synth) return;

    // Handle special characters
    const letterText = letter === ';' ? 'semicolon' : letter.toUpperCase();
    this.speak(`Type ${letterText}`, 0.9);
  }

  // Speak encouragement phrases
  speakEncouragement(): void {
    if (!this.soundEnabled || !this.synth) return;

    const phrases = ['Great job!', 'Awesome!', 'Well done!', 'Perfect!', 'Excellent!'];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    this.speak(phrase, 0.9);
  }

  // Speak correct letter after typing
  speakCorrect(letter: string): void {
    if (!this.soundEnabled || !this.synth) return;

    const letterText = letter === ';' ? 'semicolon' : letter.toUpperCase();
    this.speak(letterText, 0.9);
  }

  // Resume audio context if suspended (browser autoplay policy)
  private resumeAudioContext(): void {
    const soundManager = this.scene.sound as Phaser.Sound.WebAudioSoundManager;
    if (soundManager.context?.state === 'suspended') {
      soundManager.context.resume();
    }
  }

  // Play sound effect
  playSfx(key: string, config?: Phaser.Types.Sound.SoundConfig): void {
    if (!this.soundEnabled) return;

    try {
      this.resumeAudioContext();
      this.scene.sound.play(key, config);
    } catch (e) {
      console.warn(`Failed to play sound: ${key}`);
    }
  }

  // Play background music (handles browser autoplay policy)
  playMusic(key: string, config?: Phaser.Types.Sound.SoundConfig): void {
    if (!this.musicEnabled) return;

    this.stopMusic();

    try {
      this.resumeAudioContext();

      this.bgMusic = this.scene.sound.add(key, {
        loop: true,
        volume: 1,
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

  // Toggle all audio (sound effects + music)
  toggleAll(): boolean {
    const newState = !this.soundEnabled;

    this.soundEnabled = newState;
    this.musicEnabled = newState;
    StorageManager.setSoundEnabled(newState);
    StorageManager.setMusicEnabled(newState);

    if (!newState) {
      this.stopMusic();
    }

    return newState;
  }

  // Check if all audio is enabled
  isAllEnabled(): boolean {
    return this.soundEnabled && this.musicEnabled;
  }

  // Get current states
  isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  isMusicEnabled(): boolean {
    return this.musicEnabled;
  }
}
