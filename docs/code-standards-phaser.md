# Code Standards - Phaser & Best Practices

**Project:** Kaka's Adventure
**Language:** TypeScript
**Framework:** Phaser 3
**Last Updated:** 2026-01-21

---

## Overview

This document covers Phaser-specific patterns, error handling, performance optimization, testing, and git standards. For core TypeScript conventions, see **[Code Standards](./code-standards.md)**.

---

## Phaser-Specific Standards

### Scene Lifecycle Methods Order

```typescript
class ExampleScene extends Phaser.Scene {
  // 1. Properties
  private property: string;

  // 2. Constructor
  constructor() {
    super({ key: SCENES.EXAMPLE });
  }

  // 3. Lifecycle methods (in order)
  init(data: any): void { /* ... */ }
  preload(): void { /* ... */ }
  create(): void { /* ... */ }
  update(time: number, delta: number): void { /* ... */ }
  shutdown(): void { /* ... */ }

  // 4. Custom methods
  private handleSomething(): void { /* ... */ }
}
```

### Scene Key Constants
**Rule:** Never hardcode scene keys; use `SCENES` constants

```typescript
// ✅ Good
this.scene.start(SCENES.GAME, { level: 1 });

// ❌ Bad
this.scene.start('GameScene', { level: 1 });
```

### Asset Key Constants
**Rule:** Use `AUDIO` constants for all audio assets

```typescript
// ✅ Good
this.sound.play(AUDIO.SFX.CORRECT);
this.audioManager.playMusic(AUDIO.BGM.CHEESE_FACTORY);

// ❌ Bad
this.sound.play('sfx-correct');
this.audioManager.playMusic('bgm-cheese-factory');
```

### Scene Data Passing

```typescript
// ✅ Good - Type-safe data passing
interface GameSceneData {
  level: number;
}

class GameScene extends Phaser.Scene {
  init(data: GameSceneData): void {
    this.currentLevel = data.level;
  }
}

this.scene.start(SCENES.GAME, { level: 5 });

// ❌ Bad - Untyped data
this.scene.start(SCENES.GAME, { lvl: 5 }); // Typo risk
```

---

## Error Handling

### Try-Catch for External APIs

```typescript
// ✅ Good - Handle browser API failures
try {
  this.resumeAudioContext();
  this.scene.sound.play(key, config);
} catch (e) {
  console.warn(`Failed to play sound: ${key}`, e);
}

// ❌ Bad - Unhandled errors crash game
this.scene.sound.play(key, config);
```

### LocalStorage Error Tolerance

```typescript
// ✅ Good - Fallback to default value
getStarsPerLevel(): Record<number, number> {
  const saved = localStorage.getItem(STORAGE_KEYS.STARS_PER_LEVEL);
  try {
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    console.warn('Failed to parse stars data, resetting', e);
    return {};
  }
}

// ❌ Bad - JSON.parse can throw
return JSON.parse(saved);
```

### Defensive Null Checks

```typescript
// ✅ Good - Check before using
if (this.bgMusic) {
  this.bgMusic.stop();
  this.bgMusic.destroy();
}

// ❌ Bad - Potential null reference error
this.bgMusic.stop();
```

---

## Performance Standards

### Asset Optimization
- Audio files: MP3 format, ≤128kbps
- Images: PNG for transparency, JPEG for photos, ≤500KB
- Fonts: Subset Google Fonts (Latin charset only)

### Rendering Optimization
```typescript
// ✅ Good - Reuse objects
this.targetText.setText(newText);

// ❌ Bad - Create/destroy each frame
this.targetText.destroy();
this.targetText = this.add.text(x, y, newText);
```

### Memory Management
```typescript
// ✅ Good - Clean up in shutdown()
shutdown(): void {
  this.audioManager.stopMusic();
  this.input.keyboard?.removeAllListeners();
}

// ❌ Bad - Memory leaks from listeners
// No cleanup
```

---

## Testing Standards

### Manual Testing Checklist (Per Feature)
- [ ] Functionality works as expected
- [ ] No console errors or warnings
- [ ] TypeScript compiles without errors
- [ ] Works in Chrome, Firefox, Edge
- [ ] Works in fullscreen mode
- [ ] Audio plays correctly
- [ ] LocalStorage saves/loads data
- [ ] Responsive to window resize

### Browser Testing Matrix
| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | Primary |
| Firefox | 90+ | Secondary |
| Edge | 90+ | Secondary |
| Safari | 14+ | Limited (TTS quirks) |

---

## Git Commit Standards

### Conventional Commits
**Format:** `<type>(<scope>): <subject>`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code formatting (no logic change)
- `refactor`: Code restructuring (no behavior change)
- `test`: Adding tests
- `chore`: Maintenance (deps, build config)

**Examples:**
```bash
feat(game): add virtual keyboard finger guides for levels 1-10
fix(audio): handle suspended audio context on Safari
docs(readme): add deployment instructions
refactor(scenes): split GameScene into smaller modules
```

**Rules:**
- Subject line ≤50 characters
- Body optional (wrap at 72 chars)
- Reference issues if applicable (`Closes #42`)

---

## Code Review Checklist

### Before Submitting Code
- [ ] TypeScript compiles without errors (`npm run typecheck`)
- [ ] Code follows style guide (indentation, naming, comments)
- [ ] No hardcoded values (use constants)
- [ ] Error handling for external APIs
- [ ] File size ≤200 LOC (split if needed)
- [ ] Manual testing completed
- [ ] Git commit follows conventional format

### Reviewer Checklist
- [ ] Logic is correct and efficient
- [ ] Type safety maintained (no `any`)
- [ ] Edge cases handled
- [ ] Consistent with existing codebase
- [ ] Documentation updated if needed
- [ ] No security vulnerabilities (XSS, injection)

---

## Tools & Automation

### Recommended VS Code Extensions
- **ESLint**: Linting (if configured)
- **Prettier**: Code formatting
- **TypeScript Importer**: Auto-import suggestions
- **Path Intellisense**: Path autocomplete
- **GitLens**: Git history and blame

### Linting Configuration (Future)
Currently no ESLint, but recommended config:

```json
{
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "max-len": ["warn", { "code": 100 }],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
}
```

---

**Document Version:** 1.0
**Last Updated:** 2026-01-21
**Maintained By:** vthuan1889
