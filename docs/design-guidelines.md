# Design Guidelines - Kaka's Adventure

## Brand Identity

**Game Name**: Kaka's Adventure
**Mascot**: Kaka the Mouse - cute, energetic, friendly
**Target Audience**: Kids aged 5-6 years old
**Tone**: Playful, encouraging, educational

## Color Palette

### Land Themes
| Land | Primary | Secondary | Accent |
|------|---------|-----------|--------|
| Cheese Factory (1-10) | `#FFD93D` | `#FF9F1C` | `#6C4E31` |
| Green Garden (11-20) | `#4CAF50` | `#81C784` | `#2E7D32` |
| Blue Ocean (21-30) | `#2196F3` | `#64B5F6` | `#0D47A1` |
| Candy Land (31-40) | `#E91E63` | `#F48FB1` | `#AD1457` |
| Space (41-50) | `#1A237E` | `#3F51B5` | `#7C4DFF` |

### UI Colors
| Purpose | Color | Hex |
|---------|-------|-----|
| Background | Cream | `#FFF8E7` |
| Text Dark | Charcoal | `#2D2D2D` |
| Success | Green | `#4CAF50` |
| Error | Red | `#F44336` |
| Button Primary | Orange | `#FF6B35` |
| Button Hover | Dark Orange | `#E55A2B` |

## Typography

### Fonts (Google Fonts)
- **Headings**: `Fredoka One` - playful, rounded, kid-friendly
- **Body/UI**: `Nunito` - clean, readable, friendly
- **Game Letters**: `Fredoka One` - large, clear

### Sizes
| Element | Size | Weight |
|---------|------|--------|
| Game Title | 72px | Bold |
| Level Numbers | 48px | Bold |
| Target Letter | 200px | Bold |
| Buttons | 32px | SemiBold |
| Instructions | 24px | Regular |

## Spacing & Layout

### Canvas
- Base Resolution: 1280×720 (16:9)
- Scales to fit screen maintaining aspect ratio

### Spacing Scale
- XS: 8px
- SM: 16px
- MD: 24px
- LG: 32px
- XL: 48px

### Button Sizes
- Large (Play): 200×80px
- Medium (Level): 80×80px
- Small (Mute/Fullscreen): 48×48px

## Components

### Buttons
- Rounded corners: 16px
- Shadow: 0 4px 0 (darker shade)
- Pressed: translateY(4px), no shadow
- Hover: scale(1.05)

### Level Buttons (Treasure Map)
- Size: 70×70px
- Locked: grayscale, opacity 0.5
- Unlocked: full color, glow on hover
- Stars: 5 small stars below (filled/empty)

### Virtual Keyboard
- Key size: 50×50px
- Gap: 4px
- Active key: glow + scale(1.1)
- Finger colors:
  - Pinky: `#FF6B6B` (red)
  - Ring: `#4ECDC4` (teal)
  - Middle: `#45B7D1` (blue)
  - Index: `#96CEB4` (green)
  - Thumb: `#FFEAA7` (yellow)

## Animations

### Timing
- Quick feedback: 100-200ms
- Scene transitions: 300-500ms
- Celebrations: 1000-2000ms

### Effects
- Correct answer: bounce + sparkles
- Wrong answer: shake + red flash
- Level complete: stars fly in, Kaka dances
- Button click: scale down then up

## Kaka the Mouse

### Character Design
- Round body, big ears, small limbs
- Expressive eyes (big, sparkly)
- Pink nose, whiskers
- Wears different outfits per land:
  - Cheese Factory: Chef hat
  - Garden: Gardener hat
  - Ocean: Scuba gear
  - Candy: Candy crown
  - Space: Astronaut helmet

### Animations
- Idle: subtle bounce/sway
- Correct: happy jump, eats cheese
- Wrong: confused face, shakes head
- Complete: victory dance

## Sound Design

### Music
- Tempo: 100-120 BPM
- Style: Cheerful, catchy loops
- Different theme per land

### SFX
- Correct: cheerful "ding" or pop
- Wrong: gentle "oops" (not punishing)
- Click: soft tap
- Complete: fanfare + applause

### Voice
- Female, warm, encouraging
- High energy but not overwhelming
- Clear pronunciation
