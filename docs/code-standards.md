# Code Standards

**Project:** Kaka's Adventure
**Language:** TypeScript
**Framework:** Phaser 3
**Last Updated:** 2026-01-21

---

## File Organization

### Directory Structure

```
src/
├── main.ts                 # Application entry point
├── config/                 # Configuration files
│   ├── game-config.ts     # Phaser game configuration
│   └── constants.ts       # App-wide constants
├── data/                   # Static data and content
│   ├── level-data.ts      # Level content generator
│   └── lands-config.ts    # Land configurations
├── scenes/                 # Phaser scene classes
│   ├── BootScene.ts
│   ├── PreloadScene.ts
│   ├── MenuScene.ts
│   ├── TreasureMapScene.ts
│   ├── GameScene.ts
│   └── SummaryScene.ts
├── components/             # Reusable game objects (future)
│   └── [Button.ts, VirtualKeyboard.ts, etc.]
└── utils/                  # Helper functions and managers
    ├── storage-manager.ts # LocalStorage wrapper
    └── audio-manager.ts   # Audio and TTS manager
```

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Scenes** | PascalCase + "Scene" suffix | `MenuScene.ts` |
| **Components** | PascalCase | `Button.ts`, `VirtualKeyboard.ts` |
| **Utilities** | kebab-case | `storage-manager.ts`, `audio-manager.ts` |
| **Data** | kebab-case | `level-data.ts`, `lands-config.ts` |
| **Config** | kebab-case | `game-config.ts`, `constants.ts` |
| **Interfaces** | PascalCase | `LevelConfig`, `LandConfig` |

**Rationale:** Files are kebab-case for readability in filesystem; classes/types are PascalCase per TypeScript conventions.

---

## TypeScript Standards

### Strict Mode
**Rule:** Enable all strict mode flags in `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**Rationale:** Catch type errors at compile time, reduce runtime bugs.

### Type Annotations

#### Explicit Return Types (Functions)
```typescript
// ✅ Good
function getLevelConfig(level: number): LevelConfig {
  // ...
}

// ❌ Bad (implicit return type)
function getLevelConfig(level: number) {
  // ...
}
```

#### Interface-First Design
```typescript
// ✅ Good - Define interfaces for data structures
export interface LevelConfig {
  level: number;
  content: string[];
  scoringMode: 'encouragement' | 'accuracy' | 'mastery';
}

// ❌ Bad - Using inline types repeatedly
function getLevel(level: number): { level: number; content: string[] } {
  // ...
}
```

#### Avoid `any`
```typescript
// ✅ Good - Use specific types or generics
function shuffleArray<T>(array: T[]): T[] {
  // ...
}

// ❌ Bad - Using 'any' loses type safety
function shuffleArray(array: any[]): any[] {
  // ...
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Variables** | camelCase | `currentLevel`, `mistakeCount` |
| **Constants** | UPPER_SNAKE_CASE | `GAME_WIDTH`, `SCENES` |
| **Functions** | camelCase | `getLevelConfig()`, `playMusic()` |
| **Classes** | PascalCase | `AudioManager`, `StorageManager` |
| **Interfaces** | PascalCase | `LevelConfig`, `LandConfig` |
| **Enums** | PascalCase (keys UPPER_SNAKE_CASE) | `SCENES.BOOT`, `AUDIO.BGM.CHEESE_FACTORY` |
| **Type Aliases** | PascalCase | `ScoringMode`, `SceneKey` |

### Import Organization

**Order:**
1. External libraries (Phaser, third-party)
2. Internal modules (config, data, utils)
3. Type-only imports

```typescript
// ✅ Good
import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from './constants';
import { BootScene } from '../scenes/BootScene';
import type { LevelConfig } from '../data/level-data';

// ❌ Bad - Mixed order
import { BootScene } from '../scenes/BootScene';
import Phaser from 'phaser';
import { GAME_WIDTH } from './constants';
```

### Path Aliases

**Rule:** Use `@/*` alias for clean imports (configured in `tsconfig.json`)

```typescript
// ✅ Good
import { COLORS } from '@/config/constants';
import { AudioManager } from '@/utils/audio-manager';

// ❌ Bad - Relative paths get messy
import { COLORS } from '../../../config/constants';
```

**Config:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Code Style

### Line Length
**Rule:** Maximum 100 characters per line (soft limit)

**Rationale:** Readability on laptop screens, side-by-side diffs.

### Indentation
**Rule:** 2 spaces (no tabs)

```typescript
// ✅ Good
if (condition) {
  doSomething();
}

// ❌ Bad - 4 spaces or tabs
if (condition) {
    doSomething();
}
```

### Semicolons
**Rule:** Always use semicolons

```typescript
// ✅ Good
const level = 1;
doSomething();

// ❌ Bad
const level = 1
doSomething()
```

### Quotes
**Rule:** Single quotes for strings, template literals for interpolation

```typescript
// ✅ Good
const message = 'Hello';
const greeting = `Welcome, ${name}!`;

// ❌ Bad - Inconsistent quotes
const message = "Hello";
const greeting = 'Welcome, ' + name + '!';
```

### Object/Array Formatting

```typescript
// ✅ Good - Multiline for readability
const config = {
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: 'game-container',
};

// ✅ Good - Single line for short objects
const point = { x: 10, y: 20 };

// ❌ Bad - Inconsistent formatting
const config = { width: GAME_WIDTH,
  height: GAME_HEIGHT, parent: 'game-container' };
```

### Function Parameters

```typescript
// ✅ Good - Multiline if >3 params
function createButton(
  x: number,
  y: number,
  text: string,
  callback: () => void
): void {
  // ...
}

// ✅ Good - Single line if ≤3 params
function playSound(key: string, volume: number): void {
  // ...
}
```

---

## File Size Management

### Maximum Lines per File
**Rule:** 200 LOC per file (strict limit)

**Rationale:** Improves readability, encourages modular design, better for LLMs.

### When to Split Files

**Scenario 1: Scene >200 LOC**
```
scenes/
├── GameScene.ts              # Main scene class (150 LOC)
└── game-scene/
    ├── keyboard-handler.ts   # Extract keyboard logic
    └── scoring-handler.ts    # Extract scoring logic
```

**Scenario 2: Large Constants File**
```
config/
├── constants.ts              # Core constants only
├── colors.ts                 # Extract color definitions
└── audio-keys.ts             # Extract audio asset keys
```

### Composition Over Inheritance
```typescript
// ✅ Good - Composition with helper classes
class GameScene extends Phaser.Scene {
  private audioManager: AudioManager;
  private keyboardHandler: KeyboardHandler;

  create() {
    this.audioManager = new AudioManager(this);
    this.keyboardHandler = new KeyboardHandler(this);
  }
}

// ❌ Bad - Monolithic scene class (500+ LOC)
class GameScene extends Phaser.Scene {
  // All keyboard, audio, scoring logic inline
}
```

---

## Comments & Documentation

### JSDoc for Public APIs

```typescript
/**
 * Get land configuration by level number
 * @param level - Level number (1-50)
 * @returns Land configuration object
 */
export function getLandByLevel(level: number): LandConfig {
  // ...
}
```

### Inline Comments for Complex Logic

```typescript
// ✅ Good - Explain non-obvious logic
// Handle semicolon specially since TTS pronounces it wrong
const letterText = letter === ';' ? 'semicolon' : letter.toUpperCase();

// ❌ Bad - Obvious comment
// Set level to 1
const level = 1;
```

### TODO Comments Format

```typescript
// TODO(vthuan1889): Add particle effects for star animation
// FIXME: Audio context sometimes stays suspended on iOS Safari
```

---

## Constants Management

### Centralized Constants
**Rule:** All magic numbers/strings go in `constants.ts`

```typescript
// ✅ Good
export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

// Scene code
new Phaser.Game({ width: GAME_WIDTH, height: GAME_HEIGHT });

// ❌ Bad - Magic numbers scattered
new Phaser.Game({ width: 1280, height: 720 });
```

### Const Assertions for Object Literals

```typescript
// ✅ Good - Readonly, prevents mutations
export const SCENES = {
  BOOT: 'BootScene',
  PRELOAD: 'PreloadScene',
  MENU: 'MenuScene',
} as const;

// ❌ Bad - Mutable object
export const SCENES = {
  BOOT: 'BootScene',
  PRELOAD: 'PreloadScene',
};
```

### Nested Constants for Grouping

```typescript
// ✅ Good - Grouped by category
export const AUDIO = {
  SFX: {
    CORRECT: 'sfx-correct',
    WRONG: 'sfx-wrong',
  },
  BGM: {
    CHEESE_FACTORY: 'bgm-cheese-factory',
    GREEN_GARDEN: 'bgm-green-garden',
  },
} as const;

// ❌ Bad - Flat namespace
export const SFX_CORRECT = 'sfx-correct';
export const BGM_CHEESE_FACTORY = 'bgm-cheese-factory';
```

---

## Best Practices

### 1. Single Responsibility Principle
Each file, class, function should do one thing well.

```typescript
// ✅ Good - StorageManager handles only LocalStorage
export const StorageManager = {
  getCurrentLevel(): number { /* ... */ },
  setCurrentLevel(level: number): void { /* ... */ },
};

// ❌ Bad - StorageManager doing audio logic too
export const StorageManager = {
  playSound(key: string): void { /* ... */ }, // Wrong responsibility
};
```

### 2. DRY (Don't Repeat Yourself)
Extract repeated logic into functions/utilities.

```typescript
// ✅ Good - Reusable shuffle function
function shuffleArray<T>(array: T[]): T[] { /* ... */ }
const shuffled1 = shuffleArray(HOME_ROW_KEYS);
const shuffled2 = shuffleArray(SHORT_WORDS);

// ❌ Bad - Copy-paste shuffle logic
const shuffled1 = [...HOME_ROW_KEYS].sort(() => Math.random() - 0.5);
const shuffled2 = [...SHORT_WORDS].sort(() => Math.random() - 0.5);
```

### 3. YAGNI (You Aren't Gonna Need It)
Don't add features/abstractions until needed.

```typescript
// ✅ Good - Simple, direct implementation
const currentLevel = StorageManager.getCurrentLevel();

// ❌ Bad - Over-engineered abstraction for future use
class LevelRepository {
  private cache: Map<string, number>;
  private observers: Observer[];
  // Complex caching/observer pattern not needed yet
}
```

### 4. Favor Immutability
Avoid mutating data; create new objects instead.

```typescript
// ✅ Good - Return new array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]; // Copy first
  // shuffle logic
  return shuffled;
}

// ❌ Bad - Mutate original array
function shuffleArray<T>(array: T[]): T[] {
  // shuffle logic directly on 'array'
  return array;
}
```

### 5. Explicit Over Implicit
Be explicit about types, return values, and side effects.

```typescript
// ✅ Good - Clear return type
function toggleSound(): boolean {
  this.soundEnabled = !this.soundEnabled;
  return this.soundEnabled;
}

// ❌ Bad - Unclear return
function toggleSound() {
  this.soundEnabled = !this.soundEnabled;
}
```

---

## Anti-Patterns to Avoid

### 1. God Objects
Avoid classes with too many responsibilities.

```typescript
// ❌ Bad - GameManager does everything
class GameManager {
  loadAssets() { /* ... */ }
  handleInput() { /* ... */ }
  playAudio() { /* ... */ }
  saveProgress() { /* ... */ }
  renderUI() { /* ... */ }
}

// ✅ Good - Separate concerns
class AssetLoader { /* ... */ }
class InputHandler { /* ... */ }
class AudioManager { /* ... */ }
class StorageManager { /* ... */ }
```

### 2. Magic Numbers/Strings

```typescript
// ❌ Bad
this.add.text(640, 360, 'Hello');

// ✅ Good
this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'Hello');
```

### 3. Inconsistent Naming

```typescript
// ❌ Bad - Inconsistent verb tenses
getCurrentLevel()
setLevel()
gettingStars()

// ✅ Good - Consistent verb forms
getCurrentLevel()
setCurrentLevel()
getStarsPerLevel()
```

### 4. Deep Nesting

```typescript
// ❌ Bad - Hard to read
if (condition1) {
  if (condition2) {
    if (condition3) {
      doSomething();
    }
  }
}

// ✅ Good - Early returns
if (!condition1) return;
if (!condition2) return;
if (!condition3) return;
doSomething();
```

---

## Additional Standards

For Phaser-specific patterns, error handling, performance optimization, testing, and git commit standards, see:

**[Code Standards - Phaser & Best Practices](./code-standards-phaser.md)**

---

## References

### Internal Documentation
- `docs/design-guidelines.md` - Visual design standards
- `docs/system-architecture.md` - Architecture diagrams
- `docs/code-standards-phaser.md` - Phaser-specific standards
- `README.md` - Quick start guide

### External Resources
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Phaser 3 API Docs](https://newdocs.phaser.io/docs/3.80.1)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [YAGNI Principle](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)

---

**Document Version:** 1.0
**Last Updated:** 2026-01-21
**Maintained By:** vthuan1889
