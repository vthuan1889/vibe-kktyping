# Kaka's Adventure - Typing Game for Kids

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://vthuan1889.github.io/vibe-kktyping/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-Support-orange)](https://buymeacoffee.com/vthuan1889)

**[Play Now](https://vthuan1889.github.io/vibe-kktyping/)**

An educational typing game for kids aged 5-6, featuring Kaka the Mouse as the mascot.

## Features

- 50 levels across 5 themed lands
- Virtual keyboard with finger guides (levels 1-10)
- Voice guidance using Text-to-Speech
- Background music for each land theme
- Progress saving via LocalStorage
- Kid-friendly UI with animations

## Tech Stack

- **Phaser 3** - Game engine
- **TypeScript** - Type safety
- **Vite** - Build tool

Built with [ClaudeKit](https://claudekit.cc/?ref=VSP5VCLF)

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## Game Structure

- **Land 1 (1-10)**: Cheese Factory - Single letters
- **Land 2 (11-20)**: Green Garden - Short words
- **Land 3 (21-30)**: Blue Ocean - Medium words
- **Land 4 (31-40)**: Candy Land - Long words
- **Land 5 (41-50)**: Space - Science words

## Development

```
src/
├── main.ts           # Entry point
├── config/           # Game config, constants
├── scenes/           # Phaser scenes
├── data/             # Level data, word lists
└── utils/            # Helper functions
```

## Deploy

Push a tag to trigger GitHub Actions deployment:

```bash
git tag v1.0.0
git push origin --tags
```

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Commit Convention

Use [Conventional Commits](https://conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

### Music (CC-BY licensed)
- Mushroom Dance by bart (OpenGameArt)
- Feel Good Island (OpenGameArt)
- Cute March by C418 (OpenGameArt)
- Gunma-chan Gambol by Yubatake (OpenGameArt)
- Happy Arcade Tune by rezoner (OpenGameArt)
