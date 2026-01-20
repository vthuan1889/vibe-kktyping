import Phaser from 'phaser';
import { SCENES } from '../config/constants';

/**
 * BootScene - First scene that loads immediately
 * Initializes game settings and transitions to PreloadScene
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.BOOT });
  }

  create(): void {
    // Set game settings
    this.scale.fullscreenTarget = document.getElementById('game-container');

    // Go to preload scene
    this.scene.start(SCENES.PRELOAD);
  }
}
