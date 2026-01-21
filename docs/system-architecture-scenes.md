# System Architecture - Scenes

**Project:** Kaka's Adventure
**Version:** 1.0.0
**Last Updated:** 2026-01-21

---

## Overview

This document provides detailed specifications for all Phaser scenes in Kaka's Adventure. For high-level architecture, see **[System Architecture](./system-architecture.md)**.

---

## BootScene

**Purpose:** Initialize game systems before asset loading.

**Lifecycle:**
1. `create()`: Set scale mode, register fonts
2. Transition to PreloadScene

**Key Actions:**
- No assets loaded (instant initialization)
- Set up Phaser scale configuration
- Optionally register custom fonts (if not using Google Fonts CDN)

**Transitions:**
- → PreloadScene (automatic)

---

## PreloadScene

**Purpose:** Load all game assets (audio, images, fonts).

**Lifecycle:**
1. `preload()`: Load assets, show progress bar
2. `create()`: Transition to MenuScene

**Assets Loaded:**
- Audio: SFX (correct, wrong, click, complete)
- Audio: BGM (5 land themes)
- Images: Kaka sprites, backgrounds, UI elements
- Fonts: Fredoka One, Nunito (via Google Fonts CDN or preloaded)

**Progress Feedback:**
```typescript
this.load.on('progress', (value) => {
  progressBar.width = 400 * value; // Visual progress bar
});
```

**Transitions:**
- → MenuScene (automatic after load complete)

---

## MenuScene

**Purpose:** Main menu with Play button and controls.

**UI Elements:**
- Title: "Kaka's Adventure" (72px Fredoka One)
- Play button (large, orange, centered)
- Fullscreen toggle (top-right)
- Audio toggle (top-right)
- Kaka mascot (idle animation)

**User Interactions:**
- Click Play → Navigate to TreasureMapScene
- Click Fullscreen → Toggle fullscreen mode
- Click Audio → Toggle sound/music

**State:**
- Read `StorageManager.getSoundEnabled()` for initial audio button state

**Transitions:**
- → TreasureMapScene (on Play click)

---

## TreasureMapScene

**Purpose:** Level selection screen showing 50 levels in a winding path.

**UI Elements:**
- 50 level buttons (70×70px each)
- Winding path connecting levels (SVG or graphics)
- Land zone backgrounds (vertical gradient)
- Land labels with emojis (🧀, 🌿, 🌊, 🍬, 🚀)
- Kaka mascot positioned at current level
- Back button (top-left)
- Controls (fullscreen, audio)

**Data Loaded:**
- Current level: `StorageManager.getCurrentLevel()`
- Stars per level: `StorageManager.getStarsPerLevel()`

**Button States:**
1. **Locked** (level > currentLevel):
   - Grayscale filter
   - No click handler
   - Opacity 0.5
2. **Unlocked** (level ≤ currentLevel):
   - Full color
   - Click handler → Navigate to GameScene
   - Glow on hover
3. **Completed** (has stars):
   - Show stars (1-10 mini stars below button)
   - Full color

**User Interactions:**
- Click level button → Navigate to GameScene({ level: N })
- Click Back → Navigate to MenuScene

**Transitions:**
- → GameScene (on level click)
- → MenuScene (on back button)

---

## GameScene

**Purpose:** Main gameplay where users type letters/words.

**UI Layout:**
```
┌────────────────────────────────────────────────────┐
│ [Back] Level 5 ████████░░ 80%  [Pause][Sound][FS] │ Header
├────────────────────────────────────────────────────┤
│                                                    │
│  ┌────────┐            ┌───┐                      │
│  │ Kaka   │            │ F │ ← Target (200px)     │
│  │ (Idle) │            └───┘                      │
│  └────────┘                                        │
│  "Type F!"                                         │
│                          ┌──────────────┐          │
│                          │ Finger Guide │          │
│                          │ (Levels 1-10)│          │
│                          └──────────────┘          │
│                                                    │
├────────────────────────────────────────────────────┤
│ Virtual Keyboard (highlight next key)             │
│ [Q][W][E][R][T][Y][U][I][O][P]                    │
│  [A][S][D][F][G][H][J][K][L][;]                   │
│   [Z][X][C][V][B][N][M][,][.][/]                  │
└────────────────────────────────────────────────────┘
```

**State:**
```typescript
interface GameSceneState {
  level: number;
  content: string[];              // Target letters/words
  currentIndex: number;           // Progress through content
  typedCharacters: string[];
  mistakeCount: number;
  startTime: number;
  audioManager: AudioManager;
  landConfig: LandConfig;
  levelConfig: LevelConfig;
}
```

**Lifecycle:**
1. `init(data)`: Receive `{ level: number }`
2. `create()`:
   - Load level config: `getLevelConfig(this.level)`
   - Load land config: `getLandByLevel(this.level)`
   - Setup background (land theme)
   - Create target text (first letter/word)
   - Create virtual keyboard
   - Create Kaka mascot
   - Play background music
   - Speak initial guidance: "Let's help Kaka! Type F"
   - Register keyboard listener
3. `update()`:
   - Animate Kaka (idle bounce)
   - Animate target (subtle scale/rotation)
4. `shutdown()`:
   - Remove keyboard listeners
   - Stop background music

**Keyboard Handling:**
```typescript
this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
  const expected = this.content[this.currentIndex].toUpperCase();
  const typed = event.key.toUpperCase();

  if (typed === expected) {
    // Correct input
    this.audioManager.playSfx(AUDIO.SFX.CORRECT);
    this.audioManager.speakCorrect(typed);
    this.animateKakaHappy();
    this.currentIndex++;

    if (this.currentIndex >= this.content.length) {
      this.completeLevel(); // All content typed
    } else {
      this.updateTarget(); // Show next letter/word
    }
  } else {
    // Wrong input
    this.audioManager.playSfx(AUDIO.SFX.WRONG);
    this.shakeTarget();
    this.animateKakaConfused();
    this.mistakeCount++;
  }
});
```

**Virtual Keyboard:**
- Render QWERTY layout (3 rows)
- Highlight next expected key (glow + scale animation)
- Show finger guide color (levels 1-10 only)

**Scoring:**
```typescript
calculateStars(): number {
  const { scoringMode } = this.levelConfig;

  if (scoringMode === 'encouragement') {
    return 10; // Always perfect
  }

  if (scoringMode === 'accuracy') {
    return Math.max(1, 10 - this.mistakeCount);
  }

  // Mastery mode (speed + accuracy)
  const timeElapsed = Date.now() - this.startTime;
  const accuracy = (this.content.length - this.mistakeCount) / this.content.length;
  const speedScore = calculateSpeedScore(timeElapsed, this.content.length);
  return Math.round(accuracy * 5 + speedScore * 5);
}
```

**Level Completion:**
```typescript
completeLevel(): void {
  const stars = this.calculateStars();
  StorageManager.setLevelStars(this.level, stars);
  StorageManager.setCurrentLevel(this.level + 1); // Unlock next

  this.audioManager.playSfx(AUDIO.SFX.COMPLETE);
  this.audioManager.speakEncouragement();

  this.cameras.main.fadeOut(300);
  this.time.delayedCall(300, () => {
    this.scene.start(SCENES.SUMMARY, { level: this.level, stars });
  });
}
```

**Transitions:**
- → SummaryScene (on level complete)
- → TreasureMapScene (on back button)

---

## SummaryScene

**Purpose:** Show level results with stars and stats.

**UI Layout:**
```
┌────────────────────────────────────────────────────┐
│                                                    │
│           ┌──────────────────────┐                 │
│           │  Level Complete!     │                 │
│           │                      │                 │
│           │   ┌────────┐         │                 │
│           │   │ Kaka   │         │                 │
│           │   │(Happy) │         │                 │
│           │   └────────┘         │                 │
│           │                      │                 │
│           │  ★ ★ ★ ★ ★           │ (10 stars)      │
│           │  ★ ★ ★ ★ ★           │                 │
│           │                      │                 │
│           │  Letters Typed: 8    │                 │
│           │  Accuracy: 100%      │                 │
│           │                      │                 │
│           │ [Map] [Next Level]   │                 │
│           └──────────────────────┘                 │
│                                                    │
└────────────────────────────────────────────────────┘
```

**State:**
```typescript
interface SummarySceneData {
  level: number;
  stars: number; // 1-10
}
```

**Lifecycle:**
1. `init(data)`: Receive `{ level: number, stars: number }`
2. `create()`:
   - Show white card overlay
   - Display "Level Complete!" title
   - Animate Kaka (victory dance)
   - Animate stars (staggered pop-in, 100ms delay each)
   - Show stats (letters typed, accuracy %)
   - Show buttons: "Map", "Next Level"
3. `shutdown()`: Clean up animations

**Star Animation:**
```typescript
const starDelay = 100; // ms between each star
for (let i = 0; i < this.stars; i++) {
  this.time.delayedCall(i * starDelay, () => {
    const star = this.add.image(x, y, 'star').setScale(0);
    this.tweens.add({
      targets: star,
      scale: 1,
      duration: 200,
      ease: 'Back.easeOut',
    });
    this.audioManager.playSfx(AUDIO.SFX.CLICK);
  });
}
```

**User Interactions:**
- Click "Map" → Navigate to TreasureMapScene
- Click "Next Level" → Navigate to GameScene({ level: this.level + 1 })

**Milestone Check:**
If `level % 10 === 0` (land completed):
- Show grand celebration animation
- Display Kaka in new costume
- Play voice dialogue: "Great job! You completed the Cheese Factory! Let's explore the Green Garden next!"
- Extra confetti/particle effects

**Transitions:**
- → TreasureMapScene (on Map click)
- → GameScene (on Next Level click)

---

## Error Handling Strategy

### Graceful Degradation

**Audio Failures:**
```typescript
try {
  this.scene.sound.play(key);
} catch (e) {
  console.warn('Failed to play sound:', e);
  // Continue without audio (visual feedback still works)
}
```

**LocalStorage Failures:**
```typescript
try {
  const data = JSON.parse(localStorage.getItem(key));
  return data || defaultValue;
} catch (e) {
  console.warn('Failed to parse LocalStorage:', e);
  return defaultValue; // Fallback to defaults
}
```

**Asset Loading Failures:**
- Phaser logs warnings but continues
- Use placeholders for missing assets (colored rectangles)

### User-Facing Errors

**Principle:** Never show technical errors to kids.

**Approach:**
- Silent failures with visual fallbacks
- No error modals or alerts
- Optional parent-facing debug console messages

---

**Document Version:** 1.0
**Last Updated:** 2026-01-21
**Maintained By:** vthuan1889
