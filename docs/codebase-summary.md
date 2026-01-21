# Codebase Summary

**Generated:** 2026-01-21
**Total Files:** 28
**Total Tokens:** 31,870
**Lines of Code:** ~2,000 LOC

---

## Project Structure

```
vibe-kktyping/
├── .github/workflows/
│   └── deploy.yml              # GitHub Pages deployment workflow
├── docs/
│   ├── design-guidelines.md    # Brand, colors, typography specs
│   ├── tech-stack.md           # Technology overview
│   ├── PROMPT.md               # Original requirements
│   └── wireframes/             # HTML mockups (4 screens)
├── public/
│   └── assets/                 # Static assets (images, audio, fonts)
├── src/
│   ├── main.ts                 # Application entry point
│   ├── config/                 # Game configuration
│   │   ├── game-config.ts      # Phaser config and scene registration
│   │   └── constants.ts        # Colors, fonts, scene keys, storage keys
│   ├── data/                   # Game data and content
│   │   ├── level-data.ts       # Level content generator
│   │   └── lands-config.ts     # 5 lands configuration
│   ├── scenes/                 # Phaser scenes (6 total)
│   │   ├── BootScene.ts        # Initialize game
│   │   ├── PreloadScene.ts     # Load assets
│   │   ├── MenuScene.ts        # Main menu
│   │   ├── TreasureMapScene.ts # Level selection (50 levels)
│   │   ├── GameScene.ts        # Main gameplay
│   │   └── SummaryScene.ts     # Level completion screen
│   ├── components/             # Reusable game objects
│   └── utils/                  # Helper modules
│       ├── storage-manager.ts  # LocalStorage wrapper
│       └── audio-manager.ts    # Audio + TTS handler
├── index.html                  # Entry HTML
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite build configuration
```

---

## Core Modules Overview

### Entry Point
| File | Purpose | LOC |
|------|---------|-----|
| `src/main.ts` | Initializes Phaser game instance, handles window resize | ~10 |
| `index.html` | HTML container with game-container div | ~15 |

### Configuration (src/config/)
| File | Purpose | Key Exports |
|------|---------|-------------|
| `game-config.ts` | Phaser config with scene registration | `gameConfig` |
| `constants.ts` | Game-wide constants (colors, keys, fonts) | `COLORS`, `SCENES`, `STORAGE_KEYS`, `AUDIO` |

**Constants Defined:**
- Game dimensions: 1280×720 (16:9)
- 5 land color palettes (primary, secondary, accent)
- UI colors (background, text, success, error, buttons)
- Finger colors for virtual keyboard (levels 1-10)
- Scene keys for navigation
- LocalStorage keys for saving progress
- Font families (Fredoka One, Nunito)
- Audio asset keys (SFX, BGM per land)
- Transition timings

### Data (src/data/)
| File | Purpose | Key Functions |
|------|---------|---------------|
| `level-data.ts` | Generates level content dynamically | `getLevelConfig(level)` |
| `lands-config.ts` | Configuration for 5 themed lands | `getLandByLevel(level)`, `getLandById(id)` |
| `stories-config.ts` | Story metadata (title, duration, audio) | `getStoryConfig(level)` |
| `stories-content.ts` | Story text aggregator | `getStoryText(level)` |
| `stories/cheese-factory.ts` | Cheese Factory stories (levels 1-10) | `CHEESE_FACTORY_STORIES` |
| `stories/green-garden.ts` | Green Garden stories (levels 11-20) | `GREEN_GARDEN_STORIES` |
| `stories/blue-ocean.ts` | Blue Ocean stories (levels 21-30) | `BLUE_OCEAN_STORIES` |
| `stories/candy-land.ts` | Candy Land stories (levels 31-40) | `CANDY_LAND_STORIES` |
| `stories/space-adventure.ts` | Space Adventure stories (levels 41-50) | `SPACE_ADVENTURE_STORIES` |

**Level Configuration:**
- Levels 1-10: Home row letters (F, J, D, K, S, L, A, ;)
- Levels 11-20: Short words (CAT, SUN, BEE, etc.)
- Levels 21-30: Medium words (FISH, SHIP, SHELL, etc.)
- Levels 31-40: Long words (CANDY, SWEET, CAKE, etc.)
- Levels 41-50: Science words (STAR, MOON, EARTH, etc.)

**Land Configuration:**
- Cheese Factory (1-10): Yellow theme, letters
- Green Garden (11-20): Nature theme, short words
- Blue Ocean (21-30): Undersea theme, medium words
- Candy Land (31-40): Pink theme, long words
- Space Adventure (41-50): Galaxy theme, science words

### Utilities (src/utils/)
| File | Purpose | Key Methods |
|------|---------|-------------|
| `storage-manager.ts` | LocalStorage wrapper for progress | `getCurrentLevel()`, `setLevelStars()`, `getStarsPerLevel()` |
| `audio-manager.ts` | Audio playback and TTS voice guidance | `speak()`, `playSfx()`, `playMusic()`, `toggleAll()` |

**Storage Manager:**
- Saves current unlocked level
- Stores stars per level (keeps best score)
- Persists sound/music enabled states
- Reset progress for testing

**Audio Manager:**
- Browser TTS (SpeechSynthesis API)
- Voice guidance with configurable rate/pitch
- Letter pronunciation (handles semicolon)
- Encouragement phrases (Great job!, Awesome!, etc.)
- Background music per land
- Sound effects (correct, wrong, click, complete)
- Handles browser autoplay policy
- Toggle controls for sound/music

---

## Scenes Architecture

### Scene Flow
```
BootScene → PreloadScene → MenuScene → TreasureMapScene → GameScene → SummaryScene
                                ↑                              ↓           ↓
                                └──────────────────────────────┴───────────┘
```

### Scene Descriptions

| Scene | File | Purpose | Key Features |
|-------|------|---------|--------------|
| Boot | `BootScene.ts` | Initialize game systems | Setup scale mode, register fonts |
| Preload | `PreloadScene.ts` | Load all assets | Audio files, images, fonts with progress bar |
| Menu | `MenuScene.ts` | Main menu screen | Play button, fullscreen, audio controls |
| Treasure Map | `TreasureMapScene.ts` | Level selection (50 levels) | Locked/unlocked states, stars display, land zones |
| Game | `GameScene.ts` | Main gameplay | Typing mechanics, virtual keyboard, Kaka animations |
| Summary | `SummaryScene.ts` | Level completion | Star rating (1-10), stats, next level button |

### GameScene Mechanics (~500 LOC)
**Core Features:**
- Target letter/word display (200px font)
- Keyboard input handling (keydown events)
- Virtual keyboard visualization
- Finger guide (levels 1-10 only)
- Active key highlighting
- Mistake handling (shake animation, red flash)
- Progress tracking (letters typed, accuracy)
- Scoring system (encouragement/accuracy/mastery)
- Kaka mascot animations per level
- Voice guidance via AudioManager

**Scoring Modes:**
- Encouragement (Lvl 1-10): Always 10 stars
- Accuracy (Lvl 11-20): Deduct 1 star per mistake
- Mastery (Lvl 21-50): Speed + accuracy combined

### TreasureMapScene Features (~400 LOC)
**Core Features:**
- 50 level buttons in winding path
- Visual states: locked (grayscale), unlocked (full color), completed (stars)
- Land zone backgrounds (gradient from 5 lands)
- Kaka positioned at current level
- Land labels with emojis
- Milestone trophies every 10 levels
- Back button to menu
- Audio/fullscreen controls

---

## Key Dependencies

### Production
| Package | Version | Purpose |
|---------|---------|---------|
| `phaser` | ^3.80.1 | Game engine (WebGL/Canvas rendering) |

### Development
| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^5.3.3 | Type-safe development |
| `vite` | ^5.4.0 | Fast dev server, optimized builds |

### Browser APIs Used
- **LocalStorage**: Save progress, settings
- **SpeechSynthesis**: Text-to-Speech voice guidance
- **Keyboard Events**: keydown for typing input
- **Fullscreen API**: Fullscreen game mode

---

## Asset Organization

### Audio Assets
```
public/assets/audio/
├── sfx/
│   ├── correct.mp3      # Correct key press
│   ├── wrong.mp3        # Wrong key press
│   ├── click.mp3        # UI button click
│   └── complete.mp3     # Level complete fanfare
├── bgm/
│   ├── cheese-factory.mp3
│   ├── green-garden.mp3
│   ├── blue-ocean.mp3
│   ├── candy-land.mp3
│   └── space.mp3
└── voice/               # (Optional) Pre-recorded TTS
```

### Visual Assets
```
public/assets/images/
├── kaka/                # Mascot sprites
│   ├── idle.png
│   ├── happy.png
│   ├── confused.png
│   └── costumes/        # Per-land outfits
└── backgrounds/         # Land backgrounds
```

### Fonts (Google Fonts)
- **Fredoka One**: Headings, game letters (playful, rounded)
- **Nunito**: Body text, UI elements (clean, readable)

---

## Build Configuration

### TypeScript (tsconfig.json)
- Target: ES2020
- Module: ESNext
- Strict mode: enabled
- Path alias: `@/*` → `src/*`
- No unused locals/parameters enforcement

### Vite (vite.config.ts)
- Base path: `/vibe-kktyping/` (GitHub Pages)
- Output: `dist/assets/`
- Minifier: esbuild
- Dev server: localhost:3000 (auto-open)

### NPM Scripts
```bash
npm run dev       # Start dev server (Vite)
npm run build     # Type-check + build for production
npm run preview   # Preview production build
npm run typecheck # TypeScript validation only
```

---

## State Management

### LocalStorage Schema
```typescript
{
  "kaka_current_level": "15",           // Current unlocked level
  "kaka_stars": {                       // Stars per level
    "1": 10,
    "2": 10,
    "15": 8
  },
  "kaka_sound": "true",                 // Sound effects enabled
  "kaka_music": "true"                  // Background music enabled
}
```

### In-Memory State (per scene)
- Current level number
- Target content (letters/words)
- Typed characters buffer
- Mistake counter
- Time elapsed (for mastery scoring)
- Audio manager instance

---

## Design System

### Color Palette
| Category | Name | Hex | Usage |
|----------|------|-----|-------|
| Land 1 | Cheese Primary | #FFD93D | Cheese Factory primary |
| Land 2 | Green Primary | #4CAF50 | Green Garden primary |
| Land 3 | Blue Primary | #2196F3 | Blue Ocean primary |
| Land 4 | Candy Primary | #E91E63 | Candy Land primary |
| Land 5 | Space Primary | #1A237E | Space Adventure primary |
| UI | Background | #FFF8E7 | Main background (cream) |
| UI | Text Dark | #2D2D2D | Primary text (charcoal) |
| UI | Success | #4CAF50 | Correct feedback |
| UI | Error | #F44336 | Wrong feedback |
| UI | Button Primary | #FF6B35 | Action buttons (orange) |

### Typography Scale
| Element | Font | Size | Weight |
|---------|------|------|--------|
| Game Title | Fredoka One | 72px | Bold |
| Level Number | Fredoka One | 48px | Bold |
| Target Letter/Word | Fredoka One | 200px | Bold |
| Buttons | Nunito | 32px | SemiBold |
| Instructions | Nunito | 24px | Regular |

### Spacing Scale
- XS: 8px
- SM: 16px
- MD: 24px
- LG: 32px
- XL: 48px

### Animation Timing
- Quick feedback: 100-200ms (button press, key highlight)
- Scene transitions: 300-500ms (fade in/out)
- Celebrations: 1000-2000ms (level complete, star animation)

---

## Deployment

### GitHub Actions Workflow
- File: `.github/workflows/deploy.yml`
- Trigger: Push tags (`v*`) or manual dispatch
- Steps:
  1. Checkout code
  2. Setup Node.js 20 with npm cache
  3. Install dependencies (`npm ci`)
  4. Build project (`npm run build`)
  5. Upload `dist/` artifact
  6. Deploy to GitHub Pages

### Deploy Command
```bash
git tag v1.0.0
git push origin --tags
```

### Live Demo
https://vthuan1889.github.io/vibe-kktyping/

---

## Code Quality Standards

### TypeScript Conventions
- Strict type checking enabled
- Explicit return types for functions
- Interface-first design for data structures
- No `any` types (use generics)
- Path aliases for clean imports (`@/config`, `@/scenes`)

### File Organization
- Max 200 LOC per file (maintainability)
- Single responsibility per module
- Clear naming: kebab-case files, PascalCase classes
- Group related constants in single file

### Error Handling
- Try-catch for audio operations (browser policy)
- Fallbacks for missing assets
- LocalStorage error tolerance (JSON.parse)
- Console warnings for non-critical failures

---

## Testing Strategy

### Manual Testing Checklist
- [ ] All 50 levels load correctly
- [ ] LocalStorage saves/loads progress
- [ ] Audio plays (SFX, BGM, TTS)
- [ ] Fullscreen mode works
- [ ] Virtual keyboard highlights (levels 1-10)
- [ ] Star scoring per mode (encouragement/accuracy/mastery)
- [ ] Scene transitions smooth
- [ ] Browser compatibility (Chrome, Firefox, Edge, Safari)

### Browser Compatibility Notes
- Chrome 90+: Full support (primary target)
- Firefox 90+: Full support
- Edge 90+: Full support
- Safari 14+: Limited TTS voice options (WebKit quirks)

---

## Performance Considerations

### Asset Loading
- Preload all assets in PreloadScene
- Show loading progress bar
- Lazy load future: Large sprite sheets

### Audio Optimization
- Use MP3 format (broad support, small size)
- Loop background music efficiently
- Cancel previous TTS before new speech
- Handle suspended audio context (autoplay policy)

### Rendering
- Canvas scale mode: FIT (maintains aspect ratio)
- Auto-center both axes
- Single game instance (no memory leaks)
- Destroy unused sounds after scene change

---

## Known Limitations

1. **TTS Voice Quality**: Varies by browser/OS (no custom voice actors)
2. **Mobile Support**: Requires physical keyboard (not touch-optimized)
3. **Offline Mode**: Assets must be loaded once (no service worker yet)
4. **Accessibility**: No screen reader support (visual game)

---

## Future Enhancement Ideas

1. **Multiplayer Mode**: Race against friends
2. **Custom Levels**: User-created word lists
3. **Achievements System**: Badges for milestones
4. **Analytics**: Track typing speed progress
5. **Progressive Web App**: Offline play, install prompt
6. **Internationalization**: Support multiple languages
7. **Adaptive Difficulty**: Auto-adjust based on performance

---

## File Size Summary

### Top 5 Files by Token Count
1. `docs/wireframes/02-treasure-map.html` - 4,384 tokens (13.8%)
2. `src/scenes/GameScene.ts` - 4,150 tokens (13%)
3. `src/scenes/TreasureMapScene.ts` - 4,107 tokens (12.9%)
4. `docs/wireframes/03-gameplay.html` - 2,393 tokens (7.5%)
5. `src/scenes/SummaryScene.ts` - 2,012 tokens (6.3%)

### Total Codebase
- **28 files** processed by repomix
- **31,870 tokens** total
- **106,784 characters**
- **~2,000 lines of code** (estimated)

---

## License & Credits

### License
MIT License (Copyright 2026 vthuan1889)

### Music Credits (CC-BY)
1. Mushroom Dance by bart (OpenGameArt)
2. Feel Good Island (OpenGameArt)
3. Cute March by C418 (OpenGameArt)
4. Gunma-chan Gambol by Yubatake (OpenGameArt)
5. Happy Arcade Tune by rezoner (OpenGameArt)

### Tools
- Built with [ClaudeKit](https://claudekit.cc/?ref=VSP5VCLF)
- Powered by Phaser 3, TypeScript, Vite
- Deployed via GitHub Actions

---

**Last Updated:** 2026-01-21
**Maintainer:** vthuan1889
**Repository:** https://github.com/vthuan1889/vibe-kktyping
