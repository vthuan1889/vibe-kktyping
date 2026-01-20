# Phase 5: Audio & Polish

## Overview

- **Priority**: Medium
- **Status**: Pending
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
│   └── cheese-factory.mp3
├── sfx/
│   ├── correct.mp3
│   ├── wrong.mp3
│   ├── click.mp3
│   └── complete.mp3
└── voice/
    ├── type-letter.mp3
    ├── great-job.mp3
    └── letters/
        ├── a.mp3
        ├── s.mp3
        └── ...
```

## Success Criteria

- [ ] Background music plays
- [ ] All SFX trigger correctly
- [ ] Voice prompts work
- [ ] Summary shows stars animation
- [ ] Game feels polished and fun

## Deployment

After this phase:
1. Run `npm run build`
2. Deploy `dist/` to GitHub Pages
3. Test on live URL
