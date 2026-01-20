import Phaser from 'phaser';
import { SCENES, GAME_WIDTH, GAME_HEIGHT, COLORS } from '../config/constants';
import { StorageManager } from '../utils/storage-manager';

/**
 * MenuScene - Main menu with Play button and controls
 */
export class MenuScene extends Phaser.Scene {
  private soundEnabled = true;

  constructor() {
    super({ key: SCENES.MENU });
  }

  create(): void {
    this.soundEnabled = StorageManager.getSoundEnabled();

    this.createBackground();
    this.createTitle();
    this.createMascot();
    this.createPlayButton();
    this.createControlButtons();
  }

  private createBackground(): void {
    // Gradient background (Cheese Factory theme for menu)
    const bg = this.add.graphics();
    bg.fillGradientStyle(
      COLORS.CHEESE_FACTORY.primary, COLORS.CHEESE_FACTORY.primary,
      COLORS.CHEESE_FACTORY.secondary, COLORS.CHEESE_FACTORY.secondary, 1
    );
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Cheese hole pattern
    for (let i = 0; i < 20; i++) {
      const x = Phaser.Math.Between(50, GAME_WIDTH - 50);
      const y = Phaser.Math.Between(50, GAME_HEIGHT - 50);
      const size = Phaser.Math.Between(15, 40);

      this.add.circle(x, y, size, 0xffffff, 0.2);
    }
  }

  private createTitle(): void {
    const centerX = GAME_WIDTH / 2;

    // Title with shadow
    this.add.text(centerX + 4, 104, "Kaka's Adventure", {
      fontFamily: 'Fredoka One',
      fontSize: '72px',
      color: '#00000033',
    }).setOrigin(0.5);

    this.add.text(centerX, 100, "Kaka's Adventure", {
      fontFamily: 'Fredoka One',
      fontSize: '72px',
      color: '#6C4E31',
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(centerX, 170, 'A Typing Adventure for Kids!', {
      fontFamily: 'Nunito',
      fontSize: '24px',
      color: '#6C4E31',
    }).setOrigin(0.5);
  }

  private createMascot(): void {
    const centerX = GAME_WIDTH / 2;
    const centerY = GAME_HEIGHT / 2 - 30;

    // Mascot circle background
    const mascotBg = this.add.circle(centerX, centerY, 100, 0xf5e6d3);
    mascotBg.setStrokeStyle(6, 0xd4c4b0);

    // Mascot emoji (placeholder - will replace with sprite)
    const mascot = this.add.text(centerX, centerY, '🐭', {
      fontSize: '100px',
    }).setOrigin(0.5);

    // Bounce animation
    this.tweens.add({
      targets: mascot,
      y: centerY - 15,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  private createPlayButton(): void {
    const centerX = GAME_WIDTH / 2;
    const buttonY = GAME_HEIGHT - 150;

    // Button shadow
    const shadowGraphics = this.add.graphics();
    shadowGraphics.fillStyle(0xc74b1a, 1);
    shadowGraphics.fillRoundedRect(centerX - 100, buttonY - 35 + 6, 200, 70, 20);

    // Button background
    const buttonGraphics = this.add.graphics();
    buttonGraphics.fillStyle(COLORS.BUTTON_PRIMARY, 1);
    buttonGraphics.fillRoundedRect(centerX - 100, buttonY - 35, 200, 70, 20);

    // Button text
    this.add.text(centerX, buttonY, '▶ PLAY', {
      fontFamily: 'Fredoka One',
      fontSize: '36px',
      color: '#ffffff',
    }).setOrigin(0.5);

    // Make button interactive
    const hitArea = this.add.rectangle(centerX, buttonY, 200, 70, 0x000000, 0);
    hitArea.setInteractive({ useHandCursor: true });

    hitArea.on('pointerover', () => {
      buttonGraphics.clear();
      buttonGraphics.fillStyle(COLORS.BUTTON_HOVER, 1);
      buttonGraphics.fillRoundedRect(centerX - 100, buttonY - 35, 200, 70, 20);
    });

    hitArea.on('pointerout', () => {
      buttonGraphics.clear();
      buttonGraphics.fillStyle(COLORS.BUTTON_PRIMARY, 1);
      buttonGraphics.fillRoundedRect(centerX - 100, buttonY - 35, 200, 70, 20);
    });

    hitArea.on('pointerdown', () => {
      // Press animation
      buttonGraphics.setPosition(0, 6);
      shadowGraphics.setAlpha(0);
    });

    hitArea.on('pointerup', () => {
      buttonGraphics.setPosition(0, 0);
      shadowGraphics.setAlpha(1);
      this.scene.start(SCENES.TREASURE_MAP);
    });
  }

  private createControlButtons(): void {
    const startX = GAME_WIDTH - 130;
    const startY = 30;

    // Fullscreen button
    this.createIconButton(startX, startY, '⛶', () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });

    // Sound toggle button
    const soundBtn = this.createIconButton(startX + 60, startY, this.soundEnabled ? '🔊' : '🔇', () => {
      this.soundEnabled = !this.soundEnabled;
      StorageManager.setSoundEnabled(this.soundEnabled);
      soundBtn.setText(this.soundEnabled ? '🔊' : '🔇');
    });
  }

  private createIconButton(x: number, y: number, icon: string, onClick: () => void): Phaser.GameObjects.Text {
    // Button background
    const bg = this.add.graphics();
    bg.fillStyle(0xffffff, 0.9);
    bg.fillRoundedRect(x - 25, y - 25, 50, 50, 12);
    bg.lineStyle(2, 0x000000, 0.1);
    bg.strokeRoundedRect(x - 25, y - 25, 50, 50, 12);

    // Icon
    const iconText = this.add.text(x, y, icon, {
      fontSize: '24px',
    }).setOrigin(0.5);

    // Hit area
    const hitArea = this.add.rectangle(x, y, 50, 50, 0x000000, 0);
    hitArea.setInteractive({ useHandCursor: true });

    hitArea.on('pointerover', () => {
      this.tweens.add({
        targets: [bg, iconText],
        scale: 1.1,
        duration: 100,
      });
    });

    hitArea.on('pointerout', () => {
      this.tweens.add({
        targets: [bg, iconText],
        scale: 1,
        duration: 100,
      });
    });

    hitArea.on('pointerup', onClick);

    return iconText;
  }
}
