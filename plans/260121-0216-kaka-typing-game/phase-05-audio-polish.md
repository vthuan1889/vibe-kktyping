# Phase 5: Audio & Polish

## Overview

- **Priority**: Medium
- **Status**: ✅ Done
- **Description**: Add sound effects, music, and visual polish

## Requirements

### Audio
- Background music (Cheese Factory theme)
- Sound effects:
  - Correct key press
  - Wrong key press ("Oops!")
  - Level complete celebration
  - Button click
- Voice (placeholder or TTS):
  - "Type the letter: [X]"
  - "Great job!", "Awesome!", "Correct!"
  - Letter pronunciation after correct typing

### Visual Polish
- Smooth transitions between scenes
- Button hover/click animations
- Star animations on Summary
- Kaka idle animation
- Background for Cheese Factory (yellow theme)

## Implementation Steps

1. Add placeholder audio files
2. Implement audio playback in scenes
3. Add background music loop
4. Create SummaryScene with stars
5. Add celebration animation
6. Polish button interactions
7. Add Cheese Factory background
8. Test full game flow

## Files to Create/Update

- `src/scenes/SummaryScene.ts` (update)
- `src/utils/audio-manager.ts` (update)
- `public/assets/audio/` (add files)
- `public/assets/images/` (add files)

## Audio Files Needed

```
public/assets/audio/
├── bgm/
│   ├── cheese-factory.ogg (Mushroom Dance - CC-BY 3.0)
│   ├── green-garden.ogg (Feel Good Island - OGA-BY 3.0)
│   ├── blue-ocean.ogg (Cute March - CC-BY-SA 3.0)
│   ├── candy-land.ogg (Gunma-chan Gambol - CC-BY 4.0)
│   └── space.mp3 (Happy Arcade Tune - CC-BY 3.0)
├── sfx/
│   ├── correct.mp3
│   ├── wrong.mp3
│   ├── click.mp3
│   └── complete.mp3
└── voice/
    └── (Using Web Speech API TTS instead of pre-recorded)
```

## Success Criteria

- [x] Background music plays (5 different tracks per land)
- [x] All SFX trigger correctly
- [x] Voice prompts work (via Web Speech API)
- [x] Summary shows stars animation
- [x] Game feels polished and fun

## Deployment

After this phase:
1. Run `npm run build`
2. Deploy `dist/` to GitHub Pages
3. Test on live URL
