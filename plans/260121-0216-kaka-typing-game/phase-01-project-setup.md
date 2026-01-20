# Phase 1: Project Setup

## Overview

- **Priority**: High
- **Status**: Pending
- **Description**: Initialize Phaser 3 + TypeScript + Vite project

## Requirements

### Functional
- Vite dev server runs successfully
- TypeScript compiles without errors
- Phaser 3 game canvas renders

### Non-functional
- Fast HMR (Hot Module Replacement)
- Clean folder structure
- ESLint/Prettier configured

## Implementation Steps

1. Initialize npm project
2. Install dependencies:
   - `phaser@^3.80`
   - `typescript@^5.0`
   - `vite@^5.0`
3. Create `vite.config.ts`
4. Create `tsconfig.json`
5. Create folder structure:
   ```
   src/
   ├── main.ts
   ├── config/
   ├── scenes/
   ├── components/
   ├── data/
   └── utils/
   public/
   └── assets/
   ```
6. Create basic `index.html`
7. Create `src/main.ts` with Phaser config
8. Create `BootScene.ts` - basic test scene
9. Run dev server and verify

## Files to Create

- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `index.html`
- `src/main.ts`
- `src/config/game-config.ts`
- `src/scenes/BootScene.ts`

## Success Criteria

- [ ] `npm run dev` starts server
- [ ] Browser shows Phaser canvas
- [ ] No TypeScript errors
- [ ] Hot reload works

## Next Steps

→ Phase 2: Game Skeleton
