import Phaser from 'phaser';
import { SCENES, GAME_WIDTH, GAME_HEIGHT, AUDIO, TRANSITION } from '../config/constants';
import { LandConfig, getLandByLevel } from '../data/lands-config';
import { StorageManager } from '../utils/storage-manager';
import { AudioManager } from '../utils/audio-manager';

/**
 * TreasureMapScene - Level selection with winding path
 */
export class TreasureMapScene extends Phaser.Scene {
  private currentLevel = 1;
  private starsPerLevel: Record<number, number> = {};
  private levelNodes: Phaser.GameObjects.Container[] = [];
  private audio!: AudioManager;

  constructor() {
    super({ key: SCENES.TREASURE_MAP });
  }

  create(): void {
    this.currentLevel = StorageManager.getCurrentLevel();
    this.starsPerLevel = StorageManager.getStarsPerLevel();
    this.audio = new AudioManager(this);

    // Fade in transition
    this.cameras.main.fadeIn(TRANSITION.FADE_IN, 0, 0, 0);

    this.createBackground();
    this.createPath();
    this.createLevelNodes();
    this.createLandLabels();
    this.createHeader();
    this.createMascot();
  }

  private createBackground(): void {
    // Vertical gradient through all lands
    const bg = this.add.graphics();

    // Draw gradient manually with rectangles
    const colors = [
      { y: 0, color: 0x1a237e },      // Space (top)
      { y: 108, color: 0x3949ab },
      { y: 180, color: 0xe91e63 },    // Candy
      { y: 252, color: 0xf48fb1 },
      { y: 324, color: 0x2196f3 },    // Ocean
      { y: 396, color: 0x64b5f6 },
      { y: 468, color: 0x4caf50 },    // Garden
      { y: 540, color: 0x81c784 },
      { y: 612, color: 0xffd93d },    // Cheese (bottom)
      { y: 720, color: 0xff9f1c },
    ];

    for (let i = 0; i < colors.length - 1; i++) {
      const height = colors[i + 1].y - colors[i].y;
      bg.fillGradientStyle(colors[i].color, colors[i].color, colors[i + 1].color, colors[i + 1].color, 1);
      bg.fillRect(0, colors[i].y, GAME_WIDTH, height);
    }

    // Add decorations
    this.createDecorations();
  }

  private createDecorations(): void {
    // Space stars
    for (let i = 0; i < 15; i++) {
      const star = this.add.text(
        Phaser.Math.Between(50, GAME_WIDTH - 50),
        Phaser.Math.Between(20, 120),
        ['⭐', '✨', '🌟'][Phaser.Math.Between(0, 2)],
        { fontSize: '16px' }
      ).setAlpha(0.7);

      this.tweens.add({
        targets: star,
        alpha: 0.3,
        duration: Phaser.Math.Between(1000, 2000),
        yoyo: true,
        repeat: -1,
      });
    }

    // Zone decorations
    const decos = [
      { emoji: '🧀', y: 650, side: 'left' },
      { emoji: '🏭', y: 670, side: 'right' },
      { emoji: '🌻', y: 520, side: 'left' },
      { emoji: '🌳', y: 500, side: 'right' },
      { emoji: '🐠', y: 380, side: 'left' },
      { emoji: '🐚', y: 350, side: 'right' },
      { emoji: '🍬', y: 230, side: 'left' },
      { emoji: '🍭', y: 200, side: 'right' },
      { emoji: '🚀', y: 80, side: 'left' },
      { emoji: '🛸', y: 60, side: 'right' },
    ];

    decos.forEach((d) => {
      this.add.text(
        d.side === 'left' ? 30 : GAME_WIDTH - 60,
        d.y,
        d.emoji,
        { fontSize: '35px' }
      ).setAlpha(0.7);
    });
  }

  private createPath(): void {
    const graphics = this.add.graphics();

    // Outer path (white glow)
    graphics.lineStyle(24, 0xffffff, 0.5);
    this.drawWindingPath(graphics);

    // Inner path (tan/sand color)
    graphics.lineStyle(14, 0xf5deb3, 1);
    this.drawWindingPath(graphics);

    // Dashed overlay
    graphics.lineStyle(8, 0xdeb887, 0.6);
    this.drawWindingPath(graphics);
  }

  private drawWindingPath(graphics: Phaser.GameObjects.Graphics): void {
    const path = new Phaser.Curves.Path(100, 665);

    // Row 1: Land 1 - Cheese Factory (bottom, left to right)
    path.splineTo([
      new Phaser.Math.Vector2(250, 655),
      new Phaser.Math.Vector2(400, 660),
      new Phaser.Math.Vector2(550, 665),
      new Phaser.Math.Vector2(700, 660),
      new Phaser.Math.Vector2(850, 655),
      new Phaser.Math.Vector2(1000, 660),
      new Phaser.Math.Vector2(1150, 645),
    ]);

    // Turn up to Land 2
    path.splineTo([
      new Phaser.Math.Vector2(1180, 590),
      new Phaser.Math.Vector2(1150, 540),
    ]);

    // Row 2: Land 2 - Green Garden (right to left)
    path.splineTo([
      new Phaser.Math.Vector2(1000, 535),
      new Phaser.Math.Vector2(850, 540),
      new Phaser.Math.Vector2(700, 535),
      new Phaser.Math.Vector2(550, 540),
      new Phaser.Math.Vector2(400, 535),
      new Phaser.Math.Vector2(250, 530),
      new Phaser.Math.Vector2(100, 505),
    ]);

    // Turn up to Land 3
    path.splineTo([
      new Phaser.Math.Vector2(80, 450),
      new Phaser.Math.Vector2(100, 400),
    ]);

    // Row 3: Land 3 - Blue Ocean (left to right)
    path.splineTo([
      new Phaser.Math.Vector2(250, 395),
      new Phaser.Math.Vector2(400, 400),
      new Phaser.Math.Vector2(550, 395),
      new Phaser.Math.Vector2(700, 390),
      new Phaser.Math.Vector2(850, 395),
      new Phaser.Math.Vector2(1000, 390),
      new Phaser.Math.Vector2(1150, 375),
    ]);

    // Turn up to Land 4
    path.splineTo([
      new Phaser.Math.Vector2(1180, 320),
      new Phaser.Math.Vector2(1150, 270),
    ]);

    // Row 4: Land 4 - Candy Land (right to left)
    path.splineTo([
      new Phaser.Math.Vector2(1000, 265),
      new Phaser.Math.Vector2(850, 270),
      new Phaser.Math.Vector2(700, 265),
      new Phaser.Math.Vector2(550, 260),
      new Phaser.Math.Vector2(400, 265),
      new Phaser.Math.Vector2(250, 260),
      new Phaser.Math.Vector2(100, 235),
    ]);

    // Turn up to Land 5
    path.splineTo([
      new Phaser.Math.Vector2(80, 180),
      new Phaser.Math.Vector2(100, 135),
    ]);

    // Row 5: Land 5 - Space (left to right, top)
    path.splineTo([
      new Phaser.Math.Vector2(250, 140),
      new Phaser.Math.Vector2(400, 145),
      new Phaser.Math.Vector2(550, 140),
      new Phaser.Math.Vector2(700, 135),
      new Phaser.Math.Vector2(850, 140),
      new Phaser.Math.Vector2(1000, 135),
      new Phaser.Math.Vector2(1150, 115),
    ]);

    path.draw(graphics);
  }

  private createLevelNodes(): void {
    // Level positions along the winding path
    const levelPositions = this.getLevelPositions();

    for (let level = 1; level <= 50; level++) {
      const pos = levelPositions[level - 1];
      const isUnlocked = level <= this.currentLevel;
      const isCurrent = level === this.currentLevel;
      const stars = this.starsPerLevel[level] || 0;
      const land = getLandByLevel(level);

      const node = this.createLevelNode(pos.x, pos.y, level, isUnlocked, isCurrent, stars, land);
      this.levelNodes.push(node);
    }
  }

  private getLevelPositions(): { x: number; y: number }[] {
    const positions: { x: number; y: number }[] = [];

    // Land 1: Levels 1-10 (bottom, left to right)
    const row1Y = 660;
    for (let i = 0; i < 10; i++) {
      positions.push({ x: 100 + i * 115, y: row1Y - Math.sin(i * 0.5) * 10 });
    }

    // Land 2: Levels 11-20 (right to left)
    const row2Y = 535;
    for (let i = 0; i < 10; i++) {
      positions.push({ x: 1150 - i * 115, y: row2Y + Math.sin(i * 0.5) * 8 });
    }

    // Land 3: Levels 21-30 (left to right)
    const row3Y = 395;
    for (let i = 0; i < 10; i++) {
      positions.push({ x: 100 + i * 115, y: row3Y - Math.sin(i * 0.5) * 8 });
    }

    // Land 4: Levels 31-40 (right to left)
    const row4Y = 265;
    for (let i = 0; i < 10; i++) {
      positions.push({ x: 1150 - i * 115, y: row4Y - Math.sin(i * 0.5) * 8 });
    }

    // Land 5: Levels 41-50 (left to right, top)
    const row5Y = 140;
    for (let i = 0; i < 10; i++) {
      positions.push({ x: 100 + i * 115, y: row5Y - Math.sin(i * 0.5) * 8 });
    }

    return positions;
  }

  private createLevelNode(
    x: number, y: number, level: number,
    isUnlocked: boolean, isCurrent: boolean, stars: number,
    land: LandConfig
  ): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);

    // Node background
    const bgColor = isUnlocked ? 0xffffff : 0xcccccc;
    const borderColor = isCurrent ? 0xff6b35 : (isUnlocked ? land.primary : 0x999999);

    const circle = this.add.circle(0, 0, 28, bgColor);
    circle.setStrokeStyle(4, borderColor);

    // Level number
    const text = this.add.text(0, 0, level.toString(), {
      fontFamily: 'Fredoka One',
      fontSize: '18px',
      color: isUnlocked ? '#333333' : '#999999',
    }).setOrigin(0.5);

    container.add([circle, text]);

    // Stars for completed levels
    if (stars > 0) {
      const starsText = this.add.text(0, 32, '⭐'.repeat(Math.min(stars, 5)), {
        fontSize: '8px',
      }).setOrigin(0.5);
      container.add(starsText);
    }

    // Current level pulse animation
    if (isCurrent) {
      this.tweens.add({
        targets: circle,
        scaleX: 1.15,
        scaleY: 1.15,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }

    // Interactivity for unlocked levels
    if (isUnlocked) {
      circle.setInteractive({ useHandCursor: true });

      circle.on('pointerover', () => {
        this.tweens.add({
          targets: container,
          scale: 1.2,
          duration: 100,
        });
      });

      circle.on('pointerout', () => {
        this.tweens.add({
          targets: container,
          scale: 1,
          duration: 100,
        });
      });

      circle.on('pointerup', () => {
        this.startLevel(level);
      });
    }

    return container;
  }

  private createLandLabels(): void {
    const labels = [
      { text: '🧀 Cheese Factory', x: GAME_WIDTH / 2, y: GAME_HEIGHT - 30 },
      { text: '🌿 Green Garden', x: GAME_WIDTH - 120, y: 555 },
      { text: '🌊 Blue Ocean', x: 100, y: 420 },
      { text: '🍬 Candy Land', x: GAME_WIDTH - 100, y: 290 },
      { text: '🚀 Space Adventure', x: GAME_WIDTH / 2, y: 85 },
    ];

    labels.forEach((label) => {
      const bg = this.add.graphics();
      const textObj = this.add.text(label.x, label.y, label.text, {
        fontFamily: 'Fredoka One',
        fontSize: '16px',
        color: '#ffffff',
      }).setOrigin(0.5);

      const bounds = textObj.getBounds();
      bg.fillStyle(0x000000, 0.3);
      bg.fillRoundedRect(bounds.x - 10, bounds.y - 5, bounds.width + 20, bounds.height + 10, 15);
    });
  }

  private createHeader(): void {
    // Header gradient overlay
    const headerBg = this.add.graphics();
    headerBg.fillGradientStyle(0x000000, 0x000000, 0x000000, 0x000000, 0.4, 0.4, 0, 0);
    headerBg.fillRect(0, 0, GAME_WIDTH, 70);

    // Back button
    this.createIconButton(40, 35, '←', () => {
      this.audio.playSfx(AUDIO.SFX.CLICK);
      this.cameras.main.fadeOut(TRANSITION.FADE_OUT, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start(SCENES.MENU);
      });
    });

    // Title
    this.add.text(GAME_WIDTH / 2, 35, "🗺️ Kaka's Treasure Map", {
      fontFamily: 'Fredoka One',
      fontSize: '28px',
      color: '#ffffff',
    }).setOrigin(0.5).setShadow(2, 2, '#000000', 4);

    // Control buttons
    this.createIconButton(GAME_WIDTH - 80, 35, '⛶', () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });

    // Sound toggle button (toggles all audio including music)
    const soundBtn = this.createIconButton(GAME_WIDTH - 35, 35, this.audio.isAllEnabled() ? '🔊' : '🔇', () => {
      const enabled = this.audio.toggleAll();
      soundBtn.setText(enabled ? '🔊' : '🔇');
    });
  }

  private createIconButton(x: number, y: number, icon: string, onClick: () => void): Phaser.GameObjects.Text {
    // Container for proper scaling from center
    const container = this.add.container(x, y);

    // Button background (dark semi-transparent)
    const bg = this.add.graphics();
    bg.fillStyle(0x333333, 0.8);
    bg.fillRoundedRect(-22, -22, 44, 44, 10);

    // Icon with shadow
    const iconText = this.add.text(0, 0, icon, {
      fontSize: '22px',
    }).setOrigin(0.5).setShadow(1, 1, '#000000', 2);

    container.add([bg, iconText]);

    // Hit area
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
    // Position mascot near current level
    const positions = this.getLevelPositions();
    const currentPos = positions[this.currentLevel - 1];

    const mascot = this.add.text(currentPos.x - 35, currentPos.y - 55, '🐭', {
      fontSize: '40px',
    });

    this.tweens.add({
      targets: mascot,
      y: mascot.y - 10,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  private startLevel(level: number): void {
    this.audio.playSfx(AUDIO.SFX.CLICK);
    this.cameras.main.fadeOut(TRANSITION.FADE_OUT, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start(SCENES.GAME, { level });
    });
  }
}
