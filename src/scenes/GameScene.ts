import Phaser from 'phaser';
import { SCENES, GAME_WIDTH, GAME_HEIGHT, COLORS, FINGER_COLORS, AUDIO, TRANSITION } from '../config/constants';
import { getLevelConfig, LevelConfig } from '../data/level-data';
import { getLandByLevel, LandConfig } from '../data/lands-config';
import { StorageManager } from '../utils/storage-manager';
import { AudioManager } from '../utils/audio-manager';
import { getDecorativeElements, SPARKLE_EMOJIS } from '../config/background-config';

/**
 * GameScene - Main typing gameplay with themed visuals
 */
export class GameScene extends Phaser.Scene {
  private level = 1;
  private levelConfig!: LevelConfig;
  private currentIndex = 0;
  private mistakes = 0;
  private targetText!: Phaser.GameObjects.Text;
  private targetTextOriginalX = 0;
  private progressBar!: Phaser.GameObjects.Graphics;
  private keyboardKeys: Map<string, Phaser.GameObjects.Container> = new Map();
  private mascot!: Phaser.GameObjects.Text;
  private isShaking = false;
  private audio!: AudioManager;
  private land!: LandConfig;

  constructor() {
    super({ key: SCENES.GAME });
  }

  init(data: { level?: number }): void {
    this.level = data.level || 1;
    this.currentIndex = 0;
    this.mistakes = 0;
  }

  create(): void {
    this.levelConfig = getLevelConfig(this.level);
    this.land = getLandByLevel(this.level);

    // Initialize audio
    this.audio = new AudioManager(this);
    this.audio.playMusic(this.land.bgm);

    // Fade in transition
    this.cameras.main.fadeIn(TRANSITION.FADE_IN, 0, 0, 0);

    this.createBackground();
    this.createFloatingDecorations();
    this.createHeader();
    this.createMascot();
    this.createTargetLetter();
    this.createVirtualKeyboard();
    this.highlightCurrentKey();

    // Speak first letter after scene fades in
    this.cameras.main.once('camerafadeincomplete', () => {
      this.audio.speakLetter(this.getCurrentTarget());
    });

    // Setup keyboard input
    this.input.keyboard?.on('keydown', this.handleKeyPress, this);
  }

  shutdown(): void {
    // Cleanup all tweens to prevent memory leaks
    this.tweens.killAll();
    this.input.keyboard?.off('keydown', this.handleKeyPress, this);
  }

  private createBackground(): void {
    // Use background image if loaded, otherwise fallback to gradient
    if (this.textures.exists(this.land.backgroundKey)) {
      const bg = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, this.land.backgroundKey);
      bg.setDisplaySize(GAME_WIDTH, GAME_HEIGHT);
    } else {
      // Gradient fallback
      const bg = this.add.graphics();
      bg.fillGradientStyle(this.land.primary, this.land.primary, this.land.secondary, this.land.secondary, 1);
      bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }
  }

  private createFloatingDecorations(): void {
    const elements = getDecorativeElements(this.land.name);

    for (let i = 0; i < 12; i++) {
      const emoji = elements[i % elements.length];
      const x = Phaser.Math.Between(50, GAME_WIDTH - 50);
      const y = Phaser.Math.Between(80, 380);
      const size = Phaser.Math.Between(22, 36);

      const decoration = this.add.text(x, y, emoji, {
        fontSize: `${size}px`,
      }).setAlpha(0.25);

      // Gentle floating animation
      this.tweens.add({
        targets: decoration,
        y: y - Phaser.Math.Between(10, 20),
        duration: Phaser.Math.Between(2500, 4000),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: Phaser.Math.Between(0, 1000),
      });
    }
  }

  private createSparkles(x: number, y: number): void {
    for (let i = 0; i < 5; i++) {
      const sparkle = this.add.text(
        x + Phaser.Math.Between(-35, 35),
        y + Phaser.Math.Between(-35, 35),
        SPARKLE_EMOJIS[i % SPARKLE_EMOJIS.length],
        { fontSize: '24px' }
      );

      this.tweens.add({
        targets: sparkle,
        y: sparkle.y - 50,
        alpha: 0,
        scale: 0.5,
        duration: 500,
        onComplete: () => sparkle.destroy(),
      });
    }
  }

  private createHeader(): void {
    // Level info badge
    const levelBadge = this.add.graphics();
    levelBadge.fillStyle(0xffffff, 0.9);
    levelBadge.fillRoundedRect(25, 15, 130, 40, 20);

    this.add.text(90, 35, `${this.land.emoji} Level ${this.level}`, {
      fontFamily: 'Fredoka One',
      fontSize: '18px',
      color: '#333333',
    }).setOrigin(0.5);

    // Progress bar
    const progressBg = this.add.graphics();
    progressBg.fillStyle(0x000000, 0.2);
    progressBg.fillRoundedRect(GAME_WIDTH / 2 - 150, 20, 300, 25, 12);

    this.progressBar = this.add.graphics();
    this.updateProgressBar();

    // Control buttons
    this.createControlButton(GAME_WIDTH - 140, 35, '⏸', () => {
      this.audio.stopMusic();
      this.cameras.main.fadeOut(TRANSITION.FADE_OUT, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start(SCENES.TREASURE_MAP);
      });
    });
    const soundBtn = this.createControlButton(GAME_WIDTH - 90, 35, this.audio.isAllEnabled() ? '🔊' : '🔇', () => {
      const enabled = this.audio.toggleAll();
      soundBtn.setText(enabled ? '🔊' : '🔇');
    });
    this.createControlButton(GAME_WIDTH - 40, 35, '⛶', () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });
  }

  private createControlButton(x: number, y: number, icon: string, onClick: () => void): Phaser.GameObjects.Text {
    const container = this.add.container(x, y);

    const bg = this.add.graphics();
    bg.fillStyle(0x333333, 0.8);
    bg.fillRoundedRect(-22, -22, 44, 44, 10);

    const iconText = this.add.text(0, 0, icon, {
      fontSize: '22px',
    }).setOrigin(0.5).setShadow(1, 1, '#000000', 2);

    container.add([bg, iconText]);

    const hitArea = this.add.rectangle(x, y, 44, 44, 0x000000, 0);
    hitArea.setInteractive({ useHandCursor: true });

    hitArea.on('pointerover', () => {
      this.tweens.add({
        targets: container,
        scale: 1.1,
        duration: 100,
      });
    });

    hitArea.on('pointerout', () => {
      this.tweens.add({
        targets: container,
        scale: 1,
        duration: 100,
      });
    });

    hitArea.on('pointerup', onClick);

    return iconText;
  }

  private createMascot(): void {
    // Mascot with land-specific character
    this.add.circle(130, 250, 70, 0xffffff, 0.9);

    const mascotEmoji = this.land.characterEmoji || '🐭';
    this.mascot = this.add.text(130, 250, mascotEmoji, {
      fontSize: '70px',
    }).setOrigin(0.5);

    // Speech bubble
    const bubble = this.add.graphics();
    bubble.fillStyle(0xffffff, 1);
    bubble.fillRoundedRect(60, 140, 140, 45, 15);

    this.add.text(130, 162, 'Type the letter!', {
      fontFamily: 'Nunito',
      fontSize: '14px',
      color: '#333333',
    }).setOrigin(0.5);

    // Idle animation
    this.tweens.add({
      targets: this.mascot,
      angle: 5,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  private createTargetLetter(): void {
    const centerX = GAME_WIDTH / 2;
    const centerY = 220;

    this.add.text(centerX, centerY - 120, 'Press the key:', {
      fontFamily: 'Nunito',
      fontSize: '28px',
      color: '#ffffff',
    }).setOrigin(0.5).setShadow(2, 2, '#000000', 4);

    this.targetText = this.add.text(centerX, centerY, this.getCurrentTarget(), {
      fontFamily: 'Fredoka One',
      fontSize: '180px',
      color: '#ffffff',
    }).setOrigin(0.5).setShadow(4, 4, 'rgba(0,0,0,0.3)', 8);

    this.targetTextOriginalX = centerX;

    this.tweens.add({
      targets: this.targetText,
      y: centerY - 15,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  private createVirtualKeyboard(): void {
    const startY = 480;
    const keySize = 50;
    const gap = 6;

    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ];

    const fingerMap: Record<string, number> = {
      'A': FINGER_COLORS.PINKY, 'Q': FINGER_COLORS.PINKY, 'Z': FINGER_COLORS.PINKY,
      'S': FINGER_COLORS.RING, 'W': FINGER_COLORS.RING, 'X': FINGER_COLORS.RING,
      'D': FINGER_COLORS.MIDDLE, 'E': FINGER_COLORS.MIDDLE, 'C': FINGER_COLORS.MIDDLE,
      'F': FINGER_COLORS.INDEX, 'R': FINGER_COLORS.INDEX, 'V': FINGER_COLORS.INDEX,
      'G': FINGER_COLORS.INDEX, 'T': FINGER_COLORS.INDEX, 'B': FINGER_COLORS.INDEX,
      'H': FINGER_COLORS.INDEX, 'Y': FINGER_COLORS.INDEX, 'N': FINGER_COLORS.INDEX,
      'J': FINGER_COLORS.INDEX, 'U': FINGER_COLORS.INDEX, 'M': FINGER_COLORS.INDEX,
      'K': FINGER_COLORS.MIDDLE, 'I': FINGER_COLORS.MIDDLE,
      'L': FINGER_COLORS.RING, 'O': FINGER_COLORS.RING,
      ';': FINGER_COLORS.PINKY, 'P': FINGER_COLORS.PINKY,
    };

    rows.forEach((row, rowIndex) => {
      const rowOffsets = [0, 28, 56];
      const rowOffset = rowOffsets[rowIndex];
      const row0Width = 10 * (keySize + gap) - gap;
      const startX = (GAME_WIDTH - row0Width) / 2 + rowOffset;

      row.forEach((key, keyIndex) => {
        const x = startX + keyIndex * (keySize + gap) + keySize / 2;
        const y = startY + rowIndex * (keySize + gap);

        const container = this.add.container(x, y);

        const keyBg = this.add.graphics();
        keyBg.fillStyle(0xf0f0f0, 1);
        keyBg.fillRoundedRect(-keySize / 2, -keySize / 2, keySize, keySize, 8);
        keyBg.fillStyle(0xcccccc, 1);
        keyBg.fillRoundedRect(-keySize / 2, -keySize / 2 + 4, keySize, keySize, 8);
        keyBg.fillStyle(0xf5f5f5, 1);
        keyBg.fillRoundedRect(-keySize / 2, -keySize / 2, keySize, keySize - 4, 8);

        if (this.level <= 10 && fingerMap[key]) {
          keyBg.fillStyle(fingerMap[key], 1);
          keyBg.fillRoundedRect(-keySize / 2 + 5, keySize / 2 - 10, keySize - 10, 6, 3);
        }

        const label = this.add.text(0, -2, key, {
          fontFamily: 'Fredoka One',
          fontSize: '20px',
          color: '#333333',
        }).setOrigin(0.5);

        container.add([keyBg, label]);
        this.keyboardKeys.set(key, container);
      });
    });
  }

  private highlightCurrentKey(): void {
    const currentKey = this.getCurrentTarget().toUpperCase();

    this.keyboardKeys.forEach((container) => {
      const keyBg = container.first as Phaser.GameObjects.Graphics;
      keyBg.clear();

      const keySize = 50;
      keyBg.fillStyle(0xf0f0f0, 1);
      keyBg.fillRoundedRect(-keySize / 2, -keySize / 2, keySize, keySize, 8);
      keyBg.fillStyle(0xcccccc, 1);
      keyBg.fillRoundedRect(-keySize / 2, -keySize / 2 + 4, keySize, keySize, 8);
      keyBg.fillStyle(0xf5f5f5, 1);
      keyBg.fillRoundedRect(-keySize / 2, -keySize / 2, keySize, keySize - 4, 8);

      container.setScale(1);
    });

    const activeContainer = this.keyboardKeys.get(currentKey);
    if (activeContainer) {
      const keyBg = activeContainer.first as Phaser.GameObjects.Graphics;
      const keySize = 50;

      keyBg.clear();
      keyBg.fillStyle(COLORS.SUCCESS, 1);
      keyBg.fillRoundedRect(-keySize / 2, -keySize / 2, keySize, keySize, 8);
      keyBg.fillStyle(0x388e3c, 1);
      keyBg.fillRoundedRect(-keySize / 2, -keySize / 2 + 4, keySize, keySize, 8);
      keyBg.fillStyle(COLORS.SUCCESS, 1);
      keyBg.fillRoundedRect(-keySize / 2, -keySize / 2, keySize, keySize - 4, 8);

      this.tweens.add({
        targets: activeContainer,
        scale: 1.15,
        duration: 400,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });

      activeContainer.setDepth(10);
    }
  }

  private getCurrentTarget(): string {
    return this.levelConfig.content[this.currentIndex] || '';
  }

  private handleKeyPress(event: KeyboardEvent): void {
    const pressedKey = event.key.toUpperCase();
    const targetKey = this.getCurrentTarget().toUpperCase();

    if (pressedKey === targetKey) {
      this.handleCorrectKey();
    } else {
      this.handleWrongKey();
    }
  }

  private handleCorrectKey(): void {
    this.audio.playSfx(AUDIO.SFX.CORRECT);

    // Add sparkle effect
    this.createSparkles(this.targetText.x, this.targetText.y);

    // Success animation on target letter
    this.tweens.add({
      targets: this.targetText,
      scale: 1.2,
      duration: 100,
      yoyo: true,
      onComplete: () => {
        this.currentIndex++;
        this.updateProgressBar();

        if (this.currentIndex >= this.levelConfig.content.length) {
          this.audio.speakEncouragement();
          this.completeLevel();
        } else {
          this.targetText.setText(this.getCurrentTarget());
          this.highlightCurrentKey();
          this.time.delayedCall(300, () => {
            this.audio.speakLetter(this.getCurrentTarget());
          });
        }
      },
    });

    // Mascot happy animation
    this.tweens.add({
      targets: this.mascot,
      y: this.mascot.y - 20,
      duration: 150,
      yoyo: true,
    });
  }

  private handleWrongKey(): void {
    this.mistakes++;
    this.audio.playSfx(AUDIO.SFX.WRONG);

    if (this.isShaking) return;
    this.isShaking = true;

    this.tweens.add({
      targets: this.targetText,
      x: this.targetTextOriginalX + 15,
      duration: 50,
      yoyo: true,
      repeat: 3,
      onStart: () => {
        this.targetText.setTint(0xff0000);
      },
      onComplete: () => {
        this.targetText.x = this.targetTextOriginalX;
        this.targetText.setTint(0xffffff);
        this.isShaking = false;
      },
    });

    this.tweens.add({
      targets: this.mascot,
      angle: -15,
      duration: 100,
      yoyo: true,
    });
  }

  private updateProgressBar(): void {
    const progress = this.currentIndex / this.levelConfig.content.length;

    this.progressBar.clear();
    this.progressBar.fillStyle(COLORS.SUCCESS, 1);
    this.progressBar.fillRoundedRect(
      GAME_WIDTH / 2 - 145,
      23,
      290 * progress,
      19,
      9
    );
  }

  private completeLevel(): void {
    this.audio.playSfx(AUDIO.SFX.COMPLETE);
    this.audio.stopMusic();

    let stars = 10;

    if (this.levelConfig.scoringMode === 'accuracy') {
      stars = Math.max(0, 10 - this.mistakes);
    } else if (this.levelConfig.scoringMode === 'mastery') {
      stars = Math.max(0, 10 - this.mistakes * 2);
    }

    StorageManager.setLevelStars(this.level, stars);

    if (this.level < 50) {
      const currentUnlocked = StorageManager.getCurrentLevel();
      if (this.level >= currentUnlocked) {
        StorageManager.setCurrentLevel(this.level + 1);
      }
    }

    this.cameras.main.fadeOut(TRANSITION.FADE_OUT, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start(SCENES.SUMMARY, {
        level: this.level,
        stars,
        mistakes: this.mistakes,
      });
    });
  }
}
