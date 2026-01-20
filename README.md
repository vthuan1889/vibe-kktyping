# Kaka's Adventure - Typing Game for Kids

An educational typing game for kids aged 5-6, featuring Kaka the Mouse as the mascot.

## Features

- 50 levels across 5 themed lands
- Virtual keyboard with finger guides (levels 1-10)
- Progress saving via LocalStorage
- Kid-friendly UI with animations

## Tech Stack

- **Phaser 3** - Game engine
- **TypeScript** - Type safety
- **Vite** - Build tool

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
├── components/       # Reusable game objects
├── data/             # Level data, word lists
└── utils/            # Helper functions
```

## Deploy to GitHub Pages

```bash
npm run build
# Upload dist/ folder to GitHub Pages
```
