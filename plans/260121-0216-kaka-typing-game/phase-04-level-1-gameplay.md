# Phase 4: Level 1 Gameplay (Cheese Factory)

## Overview

- **Priority**: High
- **Status**: Pending
- **Description**: First playable level - single letter typing

## Requirements

### Level 1 Specifics (from PROMPT.md)
- Content: Single letters (Home row: F, J, D, K, S, L, A, ;)
- Method C: Show huge letter in center + highlight virtual keyboard
- Always 10 stars on completion (encouragement mode)

### Gameplay Flow
1. Show target letter (large, centered)
2. Highlight key on virtual keyboard
3. Show finger indicator (which finger to use)
4. Wait for keypress
5. If correct: play success sound, Kaka animation, next letter
6. If wrong: "Oops!" sound, letter shakes red, wait for correct key
7. Complete full row → Summary screen

### Virtual Keyboard
- QWERTY layout
- Highlight active key
- Show finger colors for Levels 1-10

## Implementation Steps

1. Update `GameScene.ts` for Level 1
2. Create `VirtualKeyboard.ts` component
3. Create `TargetLetter.ts` component
4. Implement keyboard input handler
5. Add correct/wrong feedback animations
6. Create Kaka sprite placeholder
7. Add Kaka "eat cheese" animation
8. Implement level completion logic
9. Transition to SummaryScene

## Files to Create/Update

- `src/scenes/GameScene.ts` (update)
- `src/components/VirtualKeyboard.ts`
- `src/components/TargetLetter.ts`
- `src/components/KakaSprite.ts`
- `src/data/level-data.ts`
- `src/utils/keyboard-handler.ts`

## Level Data Structure

```typescript
interface LevelConfig {
  level: number;
  land: number;
  content: string[];  // ['F', 'J', 'D', 'K', ...]
  scoringMode: 'encouragement' | 'accuracy' | 'mastery';
}
```

## Success Criteria

- [ ] Letter displays large in center
- [ ] Virtual keyboard shows and highlights
- [ ] Correct key advances game
- [ ] Wrong key shows error feedback
- [ ] Kaka animation plays on correct
- [ ] Level completes after full row
- [ ] Always 10 stars for Level 1

## Next Steps

→ Phase 5: Audio & Polish
