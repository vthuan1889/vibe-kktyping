import Phaser from 'phaser';
import { SCENES, GAME_WIDTH, GAME_HEIGHT, COLORS, AUDIO } from '../config/constants';

/**
 * PreloadScene - Loads all game assets with progress bar
 */
export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.PRELOAD });
  }

  preload(): void {
    this.createLoadingBar();

    // Load audio assets
    this.load.audio(AUDIO.SFX.CORRECT, 'assets/audio/sfx/correct.mp3');
    this.load.audio(AUDIO.SFX.WRONG, 'assets/audio/sfx/wrong.mp3');
    this.load.audio(AUDIO.SFX.CLICK, 'assets/audio/sfx/click.mp3');
    this.load.audio(AUDIO.SFX.COMPLETE, 'assets/audio/sfx/complete.mp3');
    this.load.audio(AUDIO.BGM.CHEESE_FACTORY, 'assets/audio/bgm/cheese-factory.ogg');
    this.load.audio(AUDIO.BGM.GREEN_GARDEN, 'assets/audio/bgm/green-garden.ogg');
    this.load.audio(AUDIO.BGM.BLUE_OCEAN, 'assets/audio/bgm/blue-ocean.ogg');
    this.load.audio(AUDIO.BGM.CANDY_LAND, 'assets/audio/bgm/candy-land.ogg');
    this.load.audio(AUDIO.BGM.SPACE, 'assets/audio/bgm/space.mp3');
  }

  private createLoadingBar(): void {
    const centerX = GAME_WIDTH / 2;
    const centerY = GAME_HEIGHT / 2;

    // Background
    const bg = this.add.graphics();
    bg.fillGradientStyle(COLORS.CHEESE_FACTORY.primary, COLORS.CHEESE_FACTORY.primary,
                          COLORS.CHEESE_FACTORY.secondary, COLORS.CHEESE_FACTORY.secondary, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Loading text
    this.add.text(centerX, centerY - 60, '🐭 Kaka\'s Adventure', {
      fontFamily: 'Fredoka One',
      fontSize: '48px',
      color: '#6C4E31',
    }).setOrigin(0.5);

    // Progress bar background
    const barBg = this.add.graphics();
    barBg.fillStyle(0x000000, 0.3);
    barBg.fillRoundedRect(centerX - 200, centerY + 20, 400, 30, 15);

    // Progress bar
    const progressBar = this.add.graphics();

    // Loading text
    const loadingText = this.add.text(centerX, centerY + 70, 'Loading...', {
      fontFamily: 'Nunito',
      fontSize: '20px',
      color: '#6C4E31',
    }).setOrigin(0.5);

    // Update progress bar
    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(COLORS.SUCCESS, 1);
      progressBar.fillRoundedRect(centerX - 195, centerY + 25, 390 * value, 20, 10);
      loadingText.setText(`Loading... ${Math.round(value * 100)}%`);
    });

    this.load.on('complete', () => {
      loadingText.setText('Ready!');
    });
  }

  create(): void {
    // Small delay before menu for polish
    this.time.delayedCall(500, () => {
      this.scene.start(SCENES.MENU);
    });
  }
}
