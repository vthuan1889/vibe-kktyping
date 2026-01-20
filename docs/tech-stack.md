# Tech Stack - Kaka's Adventure Typing Game

## Core Stack

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Game Engine | Phaser 3 | ^3.80 | 2D game rendering, animations, audio |
| Language | TypeScript | ^5.0 | Type safety, maintainability |
| Build Tool | Vite | ^5.0 | Fast dev server, GitHub Pages deploy |
| Storage | LocalStorage | Native | Save progress, stars per level |

## Audio Strategy

| Type | Approach |
|------|----------|
| Voice/TTS | Pre-generated audio files (ElevenLabs or similar) |
| Sound Effects | Kenney.nl free assets or custom |
| Background Music | Royalty-free looping tracks per land |

## Deployment

- **Target**: GitHub Pages (static hosting)
- **Build**: `vite build` → `dist/` folder
- **CI/CD**: GitHub Actions (optional)

## Browser Support

- Chrome 90+ (primary)
- Firefox 90+
- Edge 90+
- Safari 14+ (limited Web Speech API support)

## Project Structure

```
src/
├── main.ts              # Entry point
├── config/              # Game config, constants
├── scenes/              # Phaser scenes
│   ├── BootScene.ts
│   ├── PreloadScene.ts
│   ├── MenuScene.ts
│   ├── TreasureMapScene.ts
│   ├── GameScene.ts
│   └── SummaryScene.ts
├── components/          # Reusable game objects
├── data/                # Level data, word lists
├── utils/               # Helper functions
└── assets/              # Images, audio, fonts
```
