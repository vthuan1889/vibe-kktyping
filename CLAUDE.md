# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Educational typing game for kids (ages 5-6) using Phaser 3 + TypeScript + Vite. 50 levels across 5 themed lands. Live at https://vthuan1889.github.io/vibe-kktyping/

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run typecheck    # TypeScript validation
npm run build        # tsc && vite build (production)
npm run preview      # Preview production build
```

**Deploy to GitHub Pages:**
```bash
git tag v1.x.x && git push origin --tags
```

## Architecture

### Scene Flow (Phaser)
```
BootScene → PreloadScene → MenuScene → TreasureMapScene → GameScene → SummaryScene
                              ↑               ↑              ↓            ↓
                              └───────────────┴──────────────┴────────────┘
```

### Key Modules

| Path | Purpose |
|------|---------|
| `src/config/constants.ts` | Colors, scene keys, storage keys, audio keys |
| `src/config/game-config.ts` | Phaser configuration, scene registration |
| `src/data/lands-config.ts` | 5 lands definition, `getLandByLevel()` helper |
| `src/data/level-data.ts` | Level content generator |
| `src/utils/storage-manager.ts` | LocalStorage wrapper for progress |
| `src/utils/audio-manager.ts` | Audio + TTS (SpeechSynthesis API) |

### Data Flow
- **Progress:** LocalStorage keys prefixed with `kaka_` (see `STORAGE_KEYS`)
- **Level data:** Generated from `level-data.ts` based on land content type
- **Audio:** Pre-loaded in PreloadScene, managed via AudioManager singleton

### Land Structure
| Land | Levels | Content Type |
|------|--------|--------------|
| Cheese Factory | 1-10 | Single letters (home row) |
| Green Garden | 11-20 | Short words (2-3 letters) |
| Blue Ocean | 21-30 | Medium words (4-5 letters) |
| Candy Land | 31-40 | Long words |
| Space Adventure | 41-50 | Science words |

## Code Conventions

- **TypeScript strict mode** enabled
- **Path alias:** `@/*` maps to `src/*`
- **Scene keys:** Use `SCENES` constant from `constants.ts`
- **Colors:** Use `COLORS` constant (hex numbers, not strings)
- **Max file size:** 200 LOC per file

## Documentation

Detailed docs in `docs/` directory:
- [System Architecture](docs/system-architecture.md) - Scene flow, data flow
- [Code Standards](docs/code-standards.md) - TypeScript conventions
- [Design Guidelines](docs/design-guidelines.md) - Colors, typography, spacing
