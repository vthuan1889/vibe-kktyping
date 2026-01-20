# Phase 2: Game Skeleton

## Overview

- **Priority**: High
- **Status**: Pending
- **Description**: Create core scene flow and game structure

## Requirements

### Scene Flow
```
BootScene → PreloadScene → MenuScene → TreasureMapScene → GameScene → SummaryScene
                                ↑                              ↓
                                └──────────────────────────────┘
```

### Functional
- All scenes load correctly
- Scene transitions work
- Basic UI elements render

## Implementation Steps

1. Create `PreloadScene.ts` - load all assets
2. Create `MenuScene.ts`:
   - Game title "Kaka's Adventure"
   - Play button
   - Fullscreen toggle
   - Mute/Unmute button
3. Create `GameScene.ts` - placeholder
4. Create `SummaryScene.ts` - placeholder
5. Implement scene transitions
6. Add fullscreen functionality
7. Add audio manager (mute state)

## Files to Create

- `src/scenes/PreloadScene.ts`
- `src/scenes/MenuScene.ts`
- `src/scenes/GameScene.ts`
- `src/scenes/SummaryScene.ts`
- `src/utils/audio-manager.ts`
- `src/config/constants.ts`

## Success Criteria

- [ ] All scenes accessible
- [ ] Fullscreen works
- [ ] Mute toggle works
- [ ] Clean scene transitions

## Next Steps

→ Phase 3: Treasure Map (parallel)
→ Phase 4: Level 1 Gameplay (parallel)
