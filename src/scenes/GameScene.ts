import Phaser from 'phaser';
import { SCENES, GAME_WIDTH, GAME_HEIGHT, COLORS, FINGER_COLORS } from '../config/constants';
import { getLevelConfig, LevelConfig } from '../data/level-data';
import { getLandByLevel } from '../data/lands-config';
import { StorageManager } from '../utils/storage-manager';

/**
 * GameScene - Main typing gameplay
 */
export class GameScene extends Phaser.Scene {
  private level = 1;
  private levelConfig!: LevelConfig;
  private currentIndex = 0;
  private mistakes = 0;
  private targetText!: Phaser.GameObjects.Text;
  private targetTextOriginalX = 0; // Store original X position
  private progressBar!: Phaser.GameObjects.Graphics;
  private keyboardKeys: Map<string, Phaser.GameObjects.Container> = new Map();
  private mascot!: Phaser.GameObjects.Text;
  private isShaking = false; // Prevent multiple shake animations

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
    const land = getLandByLevel(this.level);

    this.createBackground(land.primary, land.secondary);
    this.createHeader();
    this.createMascot();
    this.createTargetLetter();
    this.createVirtualKeyboard();
    this.highlightCurrentKey();

    // Setup keyboard input
    this.input.keyboard?.on('keydown', this.handleKeyPress, this);
  }

  private createBackground(primary: number, secondary: number): void {
    const bg = this.add.graphics();
    bg.fillGradientStyle(primary, primary, secondary, secondary, 1);
    bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Add decorative circles
    for (let i = 0; i < 15; i++) {
      const x = Phaser.Math.Between(50, GAME_WIDTH - 50);
      const y = Phaser.Math.Between(100, 400);
      const r = Phaser.Math.Between(10, 30);
      this.add.circle(x, y, r, 0xffffff, 0.15);
    }
  }

  private createHeader(): void {
    const land = getLandByLevel(this.level);

    // Level info badge
    const levelBadge = this.add.graphics();
    levelBadge.fillStyle(0xffffff, 0.9);
    levelBadge.fillRoundedRect(25, 15, 130, 40, 20);

    this.add.text(90, 35, `${land.emoji} Level ${this.level}`, {
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
      this.scene.start(SCENES.TREASURE_MAP);
    });
    this.createControlButton(GAME_WIDTH - 90, 35, '🔊', () => {});
    this.createControlButton(GAME_WIDTH - 40, 35, '⛶', () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });
  }

  private createControlButton(x: number, y: number, icon: string, onClick: () => void): void {
    const bg = this.add.graphics();
    bg.fillStyle(0xffffff, 0.9);
    bg.fillRoundedRect(x - 20, y - 20, 40, 40, 10);

    this.add.text(x, y, icon, { fontSize: '18px' }).setOrigin(0.5);

    const hitArea = this.add.rectangle(x, y, 40, 40, 0x000000, 0);
    hitArea.setInteractive({ useHandCursor: true });
    hitArea.on('pointerup', onClick);
  }

  private createMascot(): void {
    // Mascot on the left side
    this.add.circle(130, 250, 70, 0xffffff, 0.9);

    this.mascot = this.add.text(130, 250, '🐭', {
      fontSize: '80px',
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
    const centerX = GAME_WIDTH / 2 + 100;
    const centerY = 220;

    // Instruction
    this.add.text(centerX, centerY - 120, 'Press the key:', {
      fontFamily: 'Nunito',
      fontSize: '28px',
      color: '#ffffff',
    }).setOrigin(0.5).setShadow(2, 2, '#000000', 4);

    // Target letter (large)
    this.targetText = this.add.text(centerX, centerY, this.getCurrentTarget(), {
      fontFamily: 'Fredoka One',
      fontSize: '180px',
      color: '#ffffff',
    }).setOrigin(0.5).setShadow(4, 4, 'rgba(0,0,0,0.3)', 8);

    // Store original X position for shake animation reset
    this.targetTextOriginalX = centerX;

    // Bounce animation
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

    // QWERTY layout
    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ];

    // Finger mapping for home row
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
      // Calculate row offset for QWERTY staggered layout
      // Row 0 (QWERTY): no offset
      // Row 1 (ASDF): offset by half a key width
      // Row 2 (ZXCV): offset by 1 key width (to align Z under S-D area)
      const rowOffsets = [0, 28, 56];
      const rowOffset = rowOffsets[rowIndex];

      // Calculate startX based on row 0 width to keep alignment
      const row0Width = 10 * (keySize + gap) - gap;
      const startX = (GAME_WIDTH - row0Width) / 2 + rowOffset;

      row.forEach((key, keyIndex) => {
        const x = startX + keyIndex * (keySize + gap) + keySize / 2;
        const y = startY + rowIndex * (keySize + gap);

        const container = this.add.container(x, y);

        // Key background
        const keyBg = this.add.graphics();
        keyBg.fillStyle(0xf0f0f0, 1);
        keyBg.fillRoundedRect(-keySize / 2, -keySize / 2, keySize, keySize, 8);

        // Key shadow
        keyBg.fillStyle(0xcccccc, 1);
        keyBg.fillRoundedRect(-keySize / 2, -keySize / 2 + 4, keySize, keySize, 8);

        // Key surface
        keyBg.fillStyle(0xf5f5f5, 1);
        keyBg.fillRoundedRect(-keySize / 2, -keySize / 2, keySize, keySize - 4, 8);

        // Finger indicator (only for levels 1-10)
        if (this.level <= 10 && fingerMap[key]) {
          keyBg.fillStyle(fingerMap[key], 1);
          keyBg.fillRoundedRect(-keySize / 2 + 5, keySize / 2 - 10, keySize - 10, 6, 3);
        }

        // Key label
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

    // Reset all keys
    this.keyboardKeys.forEach((container, _key) => {
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

    // Highlight active key
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

      // Pulse animation
      this.tweens.add({
        targets: activeContainer,
        scale: 1.15,
        duration: 400,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });

      // Glow effect
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
          this.completeLevel();
        } else {
          this.targetText.setText(this.getCurrentTarget());
          this.highlightCurrentKey();
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

    // Prevent multiple shake animations from stacking
    if (this.isShaking) return;
    this.isShaking = true;

    // Shake animation on target letter - always use original position
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
        // Reset to exact original position
        this.targetText.x = this.targetTextOriginalX;
        this.targetText.setTint(0xffffff);
        this.isShaking = false;
      },
    });

    // Mascot confused animation
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
    // Calculate stars
    let stars = 10;

    if (this.levelConfig.scoringMode === 'accuracy') {
      stars = Math.max(0, 10 - this.mistakes);
    } else if (this.levelConfig.scoringMode === 'mastery') {
      // Could factor in time here too
      stars = Math.max(0, 10 - this.mistakes * 2);
    }
    // 'encouragement' mode always gives 10 stars

    // Save progress
    StorageManager.setLevelStars(this.level, stars);

    if (this.level < 50) {
      const currentUnlocked = StorageManager.getCurrentLevel();
      if (this.level >= currentUnlocked) {
        StorageManager.setCurrentLevel(this.level + 1);
      }
    }

    // Go to summary
    this.scene.start(SCENES.SUMMARY, {
      level: this.level,
      stars,
      mistakes: this.mistakes,
    });
  }
}
