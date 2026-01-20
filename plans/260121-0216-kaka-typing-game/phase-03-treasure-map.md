# Phase 3: Treasure Map

## Overview

- **Priority**: High
- **Status**: Pending
- **Description**: Level selection screen with 50 level buttons

## Requirements

### Functional
- Display 50 level buttons (5 rows × 10 cols)
- Show 5 lands with distinct colors:
  - Land 1 (1-10): Yellow - Cheese Factory
  - Land 2 (11-20): Green - Green Garden
  - Land 3 (21-30): Blue - Blue Ocean
  - Land 4 (31-40): Pink - Candy Land
  - Land 5 (41-50): Dark Blue - Space
- Locked levels greyed out
- Show stars (0-10) for completed levels
- Click unlocked level → start game

### Data Structure
```typescript
interface GameProgress {
  currentUnlockedLevel: number;
  starsPerLevel: Record<number, number>;
}
```

## Implementation Steps

1. Create `TreasureMapScene.ts`
2. Design level button component
3. Implement 5×10 grid layout
4. Add land backgrounds/colors
5. Create `storage-manager.ts` for LocalStorage
6. Load/save progress
7. Add click handlers
8. Add back button to menu

## Files to Create

- `src/scenes/TreasureMapScene.ts`
- `src/components/LevelButton.ts`
- `src/utils/storage-manager.ts`
- `src/data/lands-config.ts`

## Success Criteria

- [ ] 50 buttons display correctly
- [ ] Colors match land themes
- [ ] Locked/unlocked states work
- [ ] Stars display correctly
- [ ] Progress persists after refresh

## Next Steps

→ Phase 4: Level 1 Gameplay
