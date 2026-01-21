# Kaka's Adventure - Typing Game for Kids

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://vthuan1889.github.io/vibe-kktyping/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support-orange)](https://buymeacoffee.com/vthuan1889)

**[Play Now](https://vthuan1889.github.io/vibe-kktyping/)**

An educational typing game for kids aged 5-6, featuring Kaka the Mouse as the mascot. Learn keyboard fundamentals through 50 progressive levels across 5 themed lands.

---

## Features

- 🎮 **50 Levels** across 5 themed lands (Cheese Factory, Garden, Ocean, Candy, Space)
- ⌨️ **Virtual Keyboard** with finger guides for beginners (levels 1-10)
- 🎤 **Voice Guidance** using browser Text-to-Speech
- 🎵 **Background Music** for each land theme
- 💾 **Progress Saving** via LocalStorage (no account needed)
- ⭐ **Star Scoring** system (1-10 stars per level)
- 🎨 **Kid-Friendly UI** with animations and celebrations
- 🖥️ **Fullscreen Mode** for immersive gameplay

---

## Tech Stack

- **Phaser 3** - 2D game engine with WebGL/Canvas rendering
- **TypeScript** - Type-safe development
- **Vite** - Fast dev server and optimized builds
- **LocalStorage** - Client-side progress persistence
- **SpeechSynthesis API** - Browser-native voice guidance

Built with [ClaudeKit](https://claudekit.cc/?ref=VSP5VCLF)

---

## Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn
- Modern browser (Chrome 90+, Firefox 90+, Edge 90+, Safari 14+)

### Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Type check only
npm run typecheck

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Game Structure

### 5 Themed Lands (10 Levels Each)

| Land | Levels | Theme | Content Type | Scoring Mode |
|------|--------|-------|--------------|--------------|
| 🧀 **Cheese Factory** | 1-10 | Yellow/Orange | Single letters (F, J, D, K, S, L, A, ;) | Encouragement (always 10 stars) |
| 🌿 **Green Garden** | 11-20 | Nature/Green | Short words (CAT, SUN, BEE) | Accuracy (deduct 1 star per mistake) |
| 🌊 **Blue Ocean** | 21-30 | Underwater/Blue | Medium words (FISH, SHIP, SHELL) | Mastery (speed + accuracy) |
| 🍬 **Candy Land** | 31-40 | Colorful/Pink | Long words (CANDY, SWEET, CAKE) | Mastery (speed + accuracy) |
| 🚀 **Space** | 41-50 | Galaxy/Purple | Science words (STAR, MOON, EARTH) | Mastery (speed + accuracy) |

---

## Documentation

Comprehensive documentation is available in the `docs/` directory:

| Document | Description |
|----------|-------------|
| [Project Overview & PDR](docs/project-overview-pdr.md) | Vision, requirements, user flows, scoring system |
| [Codebase Summary](docs/codebase-summary.md) | File structure, module overview, dependencies |
| [Code Standards](docs/code-standards.md) | TypeScript conventions, naming, file organization |
| [System Architecture](docs/system-architecture.md) | Scene flow, data flow, component architecture |
| [Project Roadmap](docs/project-roadmap.md) | Development phases, milestones, future features |
| [Deployment Guide](docs/deployment-guide.md) | GitHub Pages setup, build process, troubleshooting |
| [Design Guidelines](docs/design-guidelines.md) | Colors, typography, spacing, animations |
| [Tech Stack](docs/tech-stack.md) | Technology choices and rationale |

---

## Project Structure

```
vibe-kktyping/
├── docs/                      # Documentation
├── public/                    # Static assets
│   └── assets/                # Audio, images, fonts
├── src/
│   ├── main.ts                # Application entry point
│   ├── config/                # Game configuration
│   │   ├── game-config.ts     # Phaser config
│   │   └── constants.ts       # App-wide constants
│   ├── data/                  # Game data
│   │   ├── level-data.ts      # Level content generator
│   │   └── lands-config.ts    # Land configurations
│   ├── scenes/                # Phaser scenes (6 total)
│   │   ├── BootScene.ts
│   │   ├── PreloadScene.ts
│   │   ├── MenuScene.ts
│   │   ├── TreasureMapScene.ts
│   │   ├── GameScene.ts
│   │   └── SummaryScene.ts
│   └── utils/                 # Helper modules
│       ├── storage-manager.ts # LocalStorage wrapper
│       └── audio-manager.ts   # Audio + TTS handler
├── index.html                 # Entry HTML
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
└── vite.config.ts             # Vite build config
```

---

## Deployment

### Automated (GitHub Actions)

Push a git tag to trigger deployment:

```bash
git tag v1.0.0
git push origin --tags
```

GitHub Actions will automatically:
1. Build the project (`npm run build`)
2. Deploy to GitHub Pages
3. Live site updates in ~2 minutes

**Live Site:** https://vthuan1889.github.io/vibe-kktyping/

See [Deployment Guide](docs/deployment-guide.md) for detailed instructions.

---

## Contributing

Contributions are welcome! Please read our guidelines:

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes following [Conventional Commits](https://conventionalcommits.org/)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Commit Convention

Use semantic commit messages:

| Type | Usage |
|------|-------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `style:` | Code formatting (no logic change) |
| `refactor:` | Code restructuring (no behavior change) |
| `test:` | Adding tests |
| `chore:` | Maintenance (deps, build config) |

**Example:**
```bash
git commit -m "feat: add virtual keyboard finger guides for levels 1-10"
```

### Code Standards

See [Code Standards](docs/code-standards.md) for detailed guidelines:
- TypeScript strict mode
- Maximum 200 LOC per file
- PascalCase for classes, camelCase for functions
- Comprehensive error handling

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**Copyright © 2026 vthuan1889**

---

## Credits

### Music (CC-BY Licensed)
All background music sourced from [OpenGameArt.org](https://opengameart.org):

1. **Mushroom Dance** by bart
2. **Feel Good Island**
3. **Cute March** by C418
4. **Gunma-chan Gambol** by Yubatake
5. **Happy Arcade Tune** by rezoner

### Tools & Frameworks
- [Phaser 3](https://phaser.io/) - Game engine
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Vite](https://vitejs.dev/) - Build tool
- [ClaudeKit](https://claudekit.cc/?ref=VSP5VCLF) - Development assistant

---

## Support

- 🐛 **Bug Reports:** [Open an Issue](https://github.com/vthuan1889/vibe-kktyping/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/vthuan1889/vibe-kktyping/discussions)
- ☕ **Support Development:** [Buy Me a Coffee](https://buymeacoffee.com/vthuan1889)

---

**Enjoy helping Kaka learn to type! 🐭⌨️**
