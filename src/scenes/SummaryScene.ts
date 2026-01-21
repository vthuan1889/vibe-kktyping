import Phaser from 'phaser';
import { SCENES, GAME_WIDTH, GAME_HEIGHT, COLORS, AUDIO, TRANSITION } from '../config/constants';
import { getLandByLevel } from '../data/lands-config';
import { getLevelConfig, LevelConfig } from '../data/level-data';
import { AudioManager } from '../utils/audio-manager';
import { StoryManager } from '../utils/story-manager';

/**
 * SummaryScene - Level completion screen with stars and story modal
 */
export class SummaryScene extends Phaser.Scene {
  private level = 1;
  private stars = 10;
  private mistakes = 0;
  private audio!: AudioManager;
  private storyManager!: StoryManager;
  private levelConfig!: LevelConfig;
  private skipTimer?: Phaser.Time.TimerEvent;
  private storyModalElements: Phaser.GameObjects.GameObject[] = [];
  private kakaAnimTween?: Phaser.Tweens.Tween;

  constructor() {
    super({ key: SCENES.SUMMARY });
  }

  init(data: { level?: number; stars?: number; mistakes?: number }): void {
    this.level = data.level || 1;
    this.stars = data.stars || 10;
    this.mistakes = data.mistakes || 0;
    this.levelConfig = getLevelConfig(this.level);
  }

  create(): void {
    const land = getLandByLevel(this.level);

    // Initialize managers
    this.audio = new AudioManager(this);
    this.storyManager = new StoryManager(this);

    // Fade in transition
    this.cameras.main.fadeIn(TRANSITION.FADE_IN, 0, 0, 0);

    this.createBackground(land.primary, land.secondary);
    this.createConfetti();
    this.createCard();
    this.createButtons();

    // Show story modal after stars animation (delay ~2s)
    if (this.audio.isSoundEnabled()) {
      this.time.delayedCall(2000, () => {
        this.showStoryModal();
      });
    }
  }

  shutdown(): void {
    // Cleanup on scene exit
    this.storyManager.stop();
    if (this.skipTimer) {
      this.skipTimer.destroy();
    }
  }

  private createBackground(primary: number, secondary: number): void {
    const bg = this.add.graphics();
    bg.fillGradientStyle(primary, primary, secondary, secondary, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  private createConfetti(): void {
    const colors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0x96ceb4, 0xffeaa7, 0xdfe6e9];

    for (let i = 0; i < 50; i++) {
      const x = Phaser.Math.Between(0, GAME_WIDTH);
      const y = Phaser.Math.Between(-100, -10);
      const size = Phaser.Math.Between(8, 16);
      const color = colors[Phaser.Math.Between(0, colors.length - 1)];

      const particle = this.add.circle(x, y, size, color);

      this.tweens.add({
        targets: particle,
        y: GAME_HEIGHT + 50,
        x: x + Phaser.Math.Between(-100, 100),
        rotation: Phaser.Math.Between(0, 10),
        duration: Phaser.Math.Between(2000, 4000),
        delay: Phaser.Math.Between(0, 1000),
        repeat: -1,
        onRepeat: () => {
          particle.y = -20;
          particle.x = Phaser.Math.Between(0, GAME_WIDTH);
        },
      });
    }
  }

  private createCard(): void {
    const centerX = GAME_WIDTH / 2;
    const cardY = GAME_HEIGHT / 2 - 30;

    // Card background
    const card = this.add.graphics();
    card.fillStyle(0xffffff, 1);
    card.fillRoundedRect(centerX - 250, cardY - 200, 500, 420, 30);
    card.lineStyle(4, 0xe0e0e0);
    card.strokeRoundedRect(centerX - 250, cardY - 200, 500, 420, 30);

    // Title
    this.add.text(centerX, cardY - 150, '🎉 Level Complete!', {
      fontFamily: 'Fredoka One',
      fontSize: '42px',
      color: '#FF6B35',
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(centerX, cardY - 100, 'You did amazing!', {
      fontFamily: 'Nunito',
      fontSize: '24px',
      color: '#666666',
    }).setOrigin(0.5);

    // Mascot
    const mascot = this.add.text(centerX, cardY - 20, '🐭', {
      fontSize: '80px',
    }).setOrigin(0.5);

    this.tweens.add({
      targets: mascot,
      y: cardY - 35,
      angle: 10,
      duration: 300,
      yoyo: true,
      repeat: -1,
    });

    // Stars
    this.createStars(centerX, cardY + 70);

    // Stats
    const statsY = cardY + 130;
    this.add.text(centerX - 80, statsY, `${this.levelConfig.content.length}`, {
      fontFamily: 'Fredoka One',
      fontSize: '32px',
      color: '#4CAF50',
    }).setOrigin(0.5);

    this.add.text(centerX - 80, statsY + 30, 'Letters', {
      fontFamily: 'Nunito',
      fontSize: '14px',
      color: '#999999',
    }).setOrigin(0.5);

    const accuracy = Math.max(0, 100 - this.mistakes * 10);
    this.add.text(centerX + 80, statsY, `${accuracy}%`, {
      fontFamily: 'Fredoka One',
      fontSize: '32px',
      color: '#4CAF50',
    }).setOrigin(0.5);

    this.add.text(centerX + 80, statsY + 30, 'Accuracy', {
      fontFamily: 'Nunito',
      fontSize: '14px',
      color: '#999999',
    }).setOrigin(0.5);
  }

  private createStars(centerX: number, y: number): void {
    const starCount = Math.min(this.stars, 10);
    const totalWidth = starCount * 45;
    const startX = centerX - totalWidth / 2 + 22;

    for (let i = 0; i < starCount; i++) {
      const star = this.add.text(startX + i * 45, y, '⭐', {
        fontSize: '40px',
      }).setOrigin(0.5).setScale(0).setAlpha(0);

      this.tweens.add({
        targets: star,
        scale: 1,
        alpha: 1,
        angle: 360,
        duration: 300,
        delay: 100 + i * 100,
        ease: 'Back.easeOut',
      });
    }
  }

  private showStoryModal(): void {
    const centerX = GAME_WIDTH / 2;
    const centerY = GAME_HEIGHT / 2;

    // Overlay
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.7);
    overlay.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    overlay.setDepth(100);
    overlay.setAlpha(0);

    // Modal card
    const modalBg = this.add.graphics();
    modalBg.fillStyle(0xffffff, 1);
    modalBg.fillRoundedRect(centerX - 220, centerY - 140, 440, 280, 24);
    modalBg.setDepth(101);
    modalBg.setAlpha(0);

    // Kaka speaking animation
    const kaka = this.add.text(centerX, centerY - 60, '🐭💬', {
      fontSize: '72px',
    }).setOrigin(0.5).setDepth(102).setAlpha(0);

    // Status text
    const statusText = this.add.text(centerX, centerY + 30, 'Loading story...', {
      fontFamily: 'Nunito',
      fontSize: '20px',
      color: '#666666',
    }).setOrigin(0.5).setDepth(102).setAlpha(0);

    // Skip button (hidden initially)
    const skipBtn = this.createSkipButton(centerX, centerY + 90);
    skipBtn.setDepth(102);
    skipBtn.setAlpha(0);

    // Store elements for cleanup
    this.storyModalElements = [overlay, modalBg, kaka, statusText, skipBtn];

    // Fade in animation
    this.tweens.add({
      targets: [overlay, modalBg, kaka, statusText],
      alpha: 1,
      duration: 300,
      ease: 'Power2',
    });

    // Kaka speaking animation
    this.kakaAnimTween = this.tweens.add({
      targets: kaka,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 400,
      yoyo: true,
      repeat: -1,
    });

    // Play story audio
    this.storyManager.loadAndPlay(this.level, () => {
      this.closeStoryModal();
    });

    statusText.setText('Kaka is telling a story...');

    // Show skip button after 15 seconds
    this.skipTimer = this.time.delayedCall(15000, () => {
      this.tweens.add({
        targets: skipBtn,
        alpha: 1,
        duration: 300,
      });
    });
  }

  private createSkipButton(x: number, y: number): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);

    const bg = this.add.graphics();
    bg.fillStyle(0xe8e8e8, 1);
    bg.fillRoundedRect(-55, -22, 110, 44, 12);

    const text = this.add.text(0, 0, 'Skip ⏭️', {
      fontFamily: 'Fredoka One',
      fontSize: '18px',
      color: '#666666',
    }).setOrigin(0.5);

    container.add([bg, text]);

    // Hit area
    const hitArea = this.add.rectangle(0, 0, 110, 44, 0x000000, 0);
    hitArea.setInteractive({ useHandCursor: true });
    hitArea.on('pointerup', () => {
      this.audio.playSfx(AUDIO.SFX.CLICK);
      this.closeStoryModal();
    });
    container.add(hitArea);

    return container;
  }

  private closeStoryModal(): void {
    // Stop audio
    this.storyManager.stop();

    // Stop kaka animation tween
    if (this.kakaAnimTween) {
      this.kakaAnimTween.stop();
      this.kakaAnimTween = undefined;
    }

    // Clear timer
    if (this.skipTimer) {
      this.skipTimer.destroy();
      this.skipTimer = undefined;
    }

    // Check if modal elements still exist before animating
    if (this.storyModalElements.length === 0) return;

    // Fade out and destroy elements
    this.tweens.add({
      targets: this.storyModalElements,
      alpha: 0,
      duration: 200,
      onComplete: () => {
        this.storyModalElements.forEach((el) => el.destroy());
        this.storyModalElements = [];
      },
    });
  }

  private createButtons(): void {
    const centerX = GAME_WIDTH / 2;
    const buttonY = GAME_HEIGHT - 100;

    // Map button
    this.createButton(centerX - 120, buttonY, '🗺️ Map', 0xe0e0e0, 0xbdbdbd, () => {
      this.cameras.main.fadeOut(TRANSITION.FADE_OUT, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start(SCENES.TREASURE_MAP);
      });
    });

    // Next Level button
    if (this.level < 50) {
      this.createButton(centerX + 80, buttonY, 'Next ➡️', COLORS.BUTTON_PRIMARY, 0xc74b1a, () => {
        this.cameras.main.fadeOut(TRANSITION.FADE_OUT, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this.scene.start(SCENES.GAME, { level: this.level + 1 });
        });
      });
    }
  }

  private createButton(
    x: number, y: number, text: string,
    bgColor: number, shadowColor: number,
    onClick: () => void
  ): void {
    const width = 160;
    const height = 55;

    // Shadow
    const shadow = this.add.graphics();
    shadow.fillStyle(shadowColor, 1);
    shadow.fillRoundedRect(x - width / 2, y - height / 2 + 5, width, height, 16);

    // Background
    const bg = this.add.graphics();
    bg.fillStyle(bgColor, 1);
    bg.fillRoundedRect(x - width / 2, y - height / 2, width, height, 16);

    // Text
    this.add.text(x, y, text, {
      fontFamily: 'Fredoka One',
      fontSize: '22px',
      color: bgColor === COLORS.BUTTON_PRIMARY ? '#ffffff' : '#666666',
    }).setOrigin(0.5);

    // Hit area
    const hitArea = this.add.rectangle(x, y, width, height, 0x000000, 0);
    hitArea.setInteractive({ useHandCursor: true });

    hitArea.on('pointerdown', () => {
      bg.y = 5;
      shadow.setAlpha(0);
    });

    hitArea.on('pointerup', () => {
      bg.y = 0;
      shadow.setAlpha(1);
      this.audio.playSfx(AUDIO.SFX.CLICK);
      onClick();
    });

    hitArea.on('pointerout', () => {
      bg.y = 0;
      shadow.setAlpha(1);
    });
  }
}
