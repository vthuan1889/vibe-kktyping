# Project Overview & Product Development Requirements

**Project Name:** Kaka's Adventure - Typing Game for Kids
**Version:** 1.0.0
**Target Audience:** Children aged 5-6 years old
**Platform:** Desktop browsers with physical keyboards
**License:** MIT

---

## Executive Summary

Kaka's Adventure is an educational typing game designed to teach young children (ages 5-6) keyboard fundamentals through an engaging, story-driven adventure. Players help Kaka the Mouse journey through 5 themed lands, spanning 50 progressive levels that introduce letters and words in a developmentally appropriate sequence.

The game leverages browser-based technologies (Phaser 3, TypeScript, Web Speech API) to deliver a polished, zero-install experience with visual feedback, voice guidance, and kid-friendly animations that encourage mastery without punishment.

---

## Product Vision

### Mission Statement
Empower young learners to develop typing confidence and keyboard familiarity through playful, structured practice that adapts to their skill level.

### Core Values
1. **Encouragement over Punishment**: Mistakes are learning opportunities, not failures
2. **Progressive Mastery**: Start with single keys, build to full words
3. **Engaging Storytelling**: Each land tells a story with Kaka as the guide
4. **Accessibility**: Free, web-based, no account required
5. **Privacy-First**: All progress stored locally (no data collection)

### Success Metrics
- **Engagement**: Average session length >10 minutes
- **Progression**: 70% of players complete first 10 levels
- **Retention**: 40% return within 7 days
- **Learning**: Measurable improvement in typing accuracy by level 20

---

## Target Audience

### Primary Users
- **Age**: 5-6 years old (kindergarten/1st grade)
- **Skills**: Learning alphabet, basic reading
- **Experience**: Little to no typing experience
- **Environment**: Home or classroom with adult supervision

### Secondary Users (Facilitators)
- **Parents**: Seeking educational screen time activities
- **Teachers**: Classroom typing instruction tool
- **Homeschoolers**: Structured typing curriculum supplement

### User Needs
| User Type | Primary Need | Solution |
|-----------|-------------|----------|
| Child | Fun, rewarding experience | Kaka mascot, animations, celebrations |
| Child | Clear instructions | Voice guidance, visual keyboard |
| Parent | Educational value | Progressive curriculum, skill tracking |
| Parent | Safety/Privacy | No ads, no data collection, no chat |
| Teacher | Easy deployment | Browser-based, no install, shareable URL |

---

## Product Requirements

### Functional Requirements

#### FR1: Level Progression System
- **FR1.1**: 50 levels organized into 5 themed lands (10 levels each)
- **FR1.2**: Levels unlock sequentially (must complete previous level)
- **FR1.3**: Level content dynamically generated per difficulty tier
- **FR1.4**: Save progress to LocalStorage (current level + stars)
- **FR1.5**: Display treasure map with locked/unlocked/completed states

#### FR2: Typing Mechanics
- **FR2.1**: Accept keyboard input via keydown events
- **FR2.2**: Display target letter/word prominently (200px font)
- **FR2.3**: Validate typed character against expected input
- **FR2.4**: Advance to next character/word on correct input
- **FR2.5**: Shake/flash red on wrong input (do not advance)
- **FR2.6**: Complete level when all content typed correctly

#### FR3: Virtual Keyboard Visualization
- **FR3.1**: Display full QWERTY keyboard at bottom of screen
- **FR3.2**: Highlight next expected key (levels 1-50)
- **FR3.3**: Show finger guide colors (levels 1-10 only)
- **FR3.4**: Animate active key (scale + glow effect)

#### FR4: Scoring System
- **FR4.1**: Encouragement mode (levels 1-10): Always award 10 stars
- **FR4.2**: Accuracy mode (levels 11-20): Deduct 1 star per mistake
- **FR4.3**: Mastery mode (levels 21-50): Factor speed + accuracy
- **FR4.4**: Store best score per level (never decrease stars)
- **FR4.5**: Display stars (1-10) on summary screen and treasure map

#### FR5: Audio & Voice Guidance
- **FR5.1**: Text-to-Speech (browser SpeechSynthesis API)
- **FR5.2**: Speak target letter/word at level start
- **FR5.3**: Speak encouragement on correct input ("Great job!")
- **FR5.4**: Speak letter name after typing (reinforcement)
- **FR5.5**: Play background music per land theme (looping)
- **FR5.6**: Play sound effects (correct, wrong, click, complete)
- **FR5.7**: Toggle controls for sound effects and music independently

#### FR6: User Interface
- **FR6.1**: Main menu with Play button, fullscreen toggle, audio controls
- **FR6.2**: Treasure map with 50 level buttons + land labels
- **FR6.3**: Gameplay screen with target, Kaka mascot, keyboard, controls
- **FR6.4**: Summary screen with stars, stats (accuracy), next level button
- **FR6.5**: Responsive scaling (maintain 16:9 aspect ratio)
- **FR6.6**: Fullscreen mode support

#### FR7: Mascot Animations
- **FR7.1**: Kaka idle animation (subtle bounce)
- **FR7.2**: Kaka happy animation (correct input)
- **FR7.3**: Kaka confused animation (wrong input)
- **FR7.4**: Kaka victory animation (level complete)
- **FR7.5**: Unique costume per land (chef hat, scuba gear, spacesuit, etc.)

#### FR8: Milestone Celebrations
- **FR8.1**: Grand celebration every 10 levels (land completion)
- **FR8.2**: Display Kaka in new costume
- **FR8.3**: Play voice dialogue introducing next land
- **FR8.4**: Confetti/particle effects

---

### Non-Functional Requirements

#### NFR1: Performance
- **NFR1.1**: Initial load time <3 seconds (on broadband)
- **NFR1.2**: Scene transitions <500ms
- **NFR1.3**: Input latency <100ms (key press to visual feedback)
- **NFR1.4**: Smooth 60 FPS animations on modern hardware

#### NFR2: Compatibility
- **NFR2.1**: Chrome 90+ (primary target)
- **NFR2.2**: Firefox 90+ (full support)
- **NFR2.3**: Edge 90+ (full support)
- **NFR2.4**: Safari 14+ (limited TTS voices, but functional)
- **NFR2.5**: Desktop only (requires physical keyboard)

#### NFR3: Accessibility
- **NFR3.1**: Large, high-contrast text (WCAG AA)
- **NFR3.2**: Colorblind-friendly color choices
- **NFR3.3**: Voice guidance for auditory learners
- **NFR3.4**: Clear visual feedback for deaf/hard-of-hearing users

#### NFR4: Usability (Kid-Friendly)
- **NFR4.1**: Maximum 2 clicks to start playing
- **NFR4.2**: No text-heavy instructions (rely on voice + visuals)
- **NFR4.3**: Large touch targets (buttons 80×80px minimum)
- **NFR4.4**: Forgiving error handling (no game-over states)
- **NFR4.5**: Consistent UI controls across all screens

#### NFR5: Privacy & Security
- **NFR5.1**: No user accounts or login required
- **NFR5.2**: No data sent to external servers
- **NFR5.3**: LocalStorage only (GDPR/COPPA compliant)
- **NFR5.4**: No third-party analytics or tracking
- **NFR5.5**: No ads or external links

#### NFR6: Maintainability
- **NFR6.1**: TypeScript strict mode (type safety)
- **NFR6.2**: Maximum 200 LOC per file
- **NFR6.3**: Single responsibility per module
- **NFR6.4**: Comprehensive code documentation
- **NFR6.5**: Conventional commit messages

#### NFR7: Deployment
- **NFR7.1**: Zero-downtime deployments (GitHub Pages)
- **NFR7.2**: Automated CI/CD via GitHub Actions
- **NFR7.3**: Semantic versioning (git tags)
- **NFR7.4**: Production builds minified (esbuild)

---

## Game Design

### Level Structure

#### Land 1: Cheese Factory (Levels 1-10)
- **Theme**: Yellow/orange, cheese patterns
- **Content**: Home row keys (F, J, D, K, S, L, A, ;)
- **Scoring**: Encouragement (always 10 stars)
- **Mechanic**: Virtual keyboard + finger guide
- **Goal**: Familiarize with home row finger placement

#### Land 2: Green Garden (Levels 11-20)
- **Theme**: Green, nature elements
- **Content**: 2-3 letter words (CAT, SUN, BEE, BUG)
- **Scoring**: Accuracy (deduct 1 star per mistake)
- **Mechanic**: Virtual keyboard (no finger guide)
- **Goal**: Build muscle memory for common words

#### Land 3: Blue Ocean (Levels 21-30)
- **Theme**: Blue, underwater elements
- **Content**: 4-5 letter words (FISH, SHIP, SHELL, WATER)
- **Scoring**: Mastery (speed + accuracy)
- **Mechanic**: Virtual keyboard
- **Goal**: Increase typing speed

#### Land 4: Candy Land (Levels 31-40)
- **Theme**: Pink/colorful, candy elements
- **Content**: Longer words (CANDY, SWEET, CAKE, COOKIE)
- **Scoring**: Mastery (speed + accuracy)
- **Mechanic**: Virtual keyboard
- **Goal**: Handle complex words

#### Land 5: Space Adventure (Levels 41-50)
- **Theme**: Dark blue/galaxy, space elements
- **Content**: Science words (STAR, MOON, EARTH, ROCKET)
- **Scoring**: Mastery (speed + accuracy)
- **Mechanic**: Virtual keyboard
- **Goal**: Master specialized vocabulary

### Scoring Algorithms

#### Encouragement Mode (Levels 1-10)
```typescript
stars = 10; // Always perfect score
```

#### Accuracy Mode (Levels 11-20)
```typescript
stars = Math.max(1, 10 - mistakeCount);
```

#### Mastery Mode (Levels 21-50)
```typescript
accuracyScore = (correctCount / totalCount) * 5;
speedScore = calculateSpeedScore(timeElapsed, targetTime);
stars = Math.round(accuracyScore + speedScore);
```

---

## User Flows

### First-Time User Flow
1. Land on MenuScene (auto-loads if first visit)
2. See Play button + Kaka mascot introduction
3. Click Play → Navigate to TreasureMapScene
4. See Level 1 unlocked, all others locked
5. Click Level 1 → Navigate to GameScene
6. Hear voice guidance: "Let's help Kaka! Type F"
7. See virtual keyboard highlight F key (left index finger color)
8. Type F → Hear "Great job! F" → Target advances
9. Complete all 8 letters → Navigate to SummaryScene
10. See 10 stars + "Next Level" button
11. Click Next Level → Return to TreasureMapScene (Level 2 unlocked)

### Returning User Flow
1. Land on MenuScene
2. Click Play → Navigate to TreasureMapScene
3. See progress (e.g., Levels 1-14 unlocked, stars displayed)
4. Kaka positioned at Level 14
5. Click Level 14 → Navigate to GameScene
6. Resume from current level

### Level Completion Flow
1. Type all target content correctly
2. Fade out GameScene
3. Play completion sound
4. Navigate to SummaryScene
5. Animate stars (1-10 based on performance)
6. Display stats (letters typed, accuracy %)
7. Show two buttons: "Map" (return to selection) or "Next Level" (continue)
8. If land completed (level 10/20/30/40/50), show milestone celebration
9. Update LocalStorage (unlock next level, save stars)

---

## Technical Architecture

### Tech Stack Rationale

| Technology | Rationale |
|------------|-----------|
| **Phaser 3** | Industry-standard 2D game engine, WebGL/Canvas rendering, rich animation system |
| **TypeScript** | Type safety reduces bugs, better IDE support, maintainability for educational project |
| **Vite** | Fast dev server (<100ms HMR), optimized production builds, simple config |
| **LocalStorage** | No backend needed, instant saves, privacy-friendly, 5MB sufficient for progress data |
| **SpeechSynthesis** | Browser-native TTS, zero dependencies, adjustable rate/pitch, kid-friendly voices |

### Data Model

#### Level Progress
```typescript
interface LevelProgress {
  currentLevel: number;           // 1-50
  starsPerLevel: Record<number, number>; // { 1: 10, 2: 10, 3: 8 }
}
```

#### Game State
```typescript
interface GameState {
  level: number;
  content: string[];              // ['F', 'J', 'D', ...]
  currentIndex: number;
  typedCharacters: string[];
  mistakeCount: number;
  startTime: number;
  scoringMode: 'encouragement' | 'accuracy' | 'mastery';
}
```

#### Land Configuration
```typescript
interface LandConfig {
  id: number;
  name: string;
  emoji: string;
  levelStart: number;
  levelEnd: number;
  primary: number;
  secondary: number;
  accent: number;
  content: 'letters' | 'words-short' | 'words-medium' | 'words-long' | 'words-science';
  bgm: string;
}
```

---

## Assumptions & Constraints

### Assumptions
1. Users have a physical keyboard (not virtual/touch)
2. Users have broadband internet (initial asset load)
3. Users have JavaScript enabled
4. Users have audio capability (speakers/headphones)
5. Adult supervision available for technical issues

### Constraints
1. **Browser Dependency**: No native mobile app (web-only)
2. **TTS Quality**: Varies by browser/OS (no custom voices)
3. **Offline**: Requires one online session to cache assets
4. **Scalability**: No backend means no cross-device sync
5. **Localization**: English-only (internationalization out of scope)

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Browser TTS unavailable | Low | High | Fallback to silent mode + visual-only feedback |
| LocalStorage quota exceeded | Very Low | Medium | Implement data cleanup (keep last 50 levels only) |
| Audio autoplay blocked | Medium | Medium | Require user interaction (click Play) to resume context |
| Performance on low-end devices | Low | Medium | Test on Intel Celeron, optimize sprite sheets |
| Kids bypass levels (cheating) | Low | Low | Acceptable; learning tool, not competitive game |

---

## Success Criteria

### MVP (Minimum Viable Product)
- [ ] 50 playable levels across 5 lands
- [ ] LocalStorage saves progress
- [ ] Virtual keyboard with finger guides (levels 1-10)
- [ ] Text-to-Speech voice guidance
- [ ] Background music per land
- [ ] Star scoring system (1-10)
- [ ] Fullscreen mode
- [ ] Audio toggle controls
- [ ] Deployed to GitHub Pages

### Post-MVP Enhancements
- [ ] Custom TTS voice recordings (higher quality)
- [ ] Kaka sprite animations (replace placeholders)
- [ ] Land-specific backgrounds (illustrated, not gradients)
- [ ] Particle effects (confetti, sparkles)
- [ ] Leaderboard (local, no backend)
- [ ] Export progress report (PDF for parents)

---

## Out of Scope (v1.0)

The following features are intentionally excluded from the initial release:
1. **Multiplayer/Social**: No racing, friend challenges, or chat
2. **User Accounts**: No registration, login, or cloud saves
3. **Mobile Touch**: No virtual keyboard for tablets/phones
4. **Custom Levels**: No user-generated content (future v2.0)
5. **Analytics**: No usage tracking, A/B testing, or heatmaps
6. **Monetization**: No ads, in-app purchases, or premium tiers
7. **Internationalization**: English-only (no translation framework)

---

## Acceptance Criteria

### Definition of Done (DoD) for Each Feature
1. **Code**: TypeScript strict mode passes, no console errors
2. **Testing**: Manual testing on Chrome, Firefox, Edge, Safari
3. **Documentation**: Updated in-code comments + README
4. **Design**: Matches wireframes and design guidelines
5. **Performance**: 60 FPS on test device (2020 laptop)
6. **Accessibility**: WCAG AA contrast ratio, keyboard navigable
7. **Deployment**: Successfully builds and deploys to GitHub Pages

### User Acceptance Testing (UAT) Checklist
- [ ] Child can complete Level 1 without adult help
- [ ] Virtual keyboard finger guide is clear and accurate
- [ ] Voice guidance is audible and understandable
- [ ] Mistakes do not frustrate (gentle feedback)
- [ ] Celebrations feel rewarding (stars, sounds, animations)
- [ ] Progress saves and loads correctly across sessions
- [ ] Fullscreen mode works on Windows/macOS
- [ ] Audio toggle mutes both SFX and music

---

## Dependencies & Integrations

### External Dependencies
| Dependency | Type | Purpose | Fallback |
|------------|------|---------|----------|
| Google Fonts (Fredoka One, Nunito) | CDN | Typography | System fonts (Arial, sans-serif) |
| OpenGameArt music files | Asset | Background music | Silent mode |
| Browser SpeechSynthesis | Browser API | Voice guidance | Visual-only feedback |
| LocalStorage | Browser API | Save progress | Session-only mode |

### Internal Module Dependencies
```
MenuScene → TreasureMapScene → GameScene → SummaryScene
                  ↓                 ↓            ↓
            StorageManager    AudioManager   LevelData
                                              LandsConfig
```

---

## Roadmap

### Phase 1: Foundation (Completed)
- [x] Project setup (Vite, TypeScript, Phaser)
- [x] Design guidelines and wireframes
- [x] Configuration system (constants, game config)
- [x] Data structures (levels, lands)

### Phase 2: Core Gameplay (In Progress)
- [x] Scene architecture (6 scenes)
- [x] Level progression logic
- [x] Typing mechanics (input validation)
- [x] Virtual keyboard visualization
- [x] Audio manager (SFX, BGM, TTS)
- [x] LocalStorage integration
- [ ] Kaka sprite animations (placeholders active)

### Phase 3: Polish & Assets (Pending)
- [ ] High-quality audio assets (SFX, music)
- [ ] Custom Kaka sprite sheets
- [ ] Land-specific backgrounds
- [ ] Particle effects (confetti, sparkles)
- [ ] Milestone celebrations (land transitions)

### Phase 4: Testing & Deployment (Pending)
- [ ] Cross-browser testing
- [ ] User acceptance testing with kids
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] GitHub Pages deployment

### Phase 5: Post-Launch (Future)
- [ ] Analytics integration (privacy-friendly)
- [ ] Custom level editor (v2.0)
- [ ] Internationalization framework (v2.0)
- [ ] Mobile touch support (v3.0)

---

## Glossary

| Term | Definition |
|------|------------|
| **Home Row** | Middle row of QWERTY keyboard (A-S-D-F-J-K-L-;) where fingers rest |
| **Kaka** | The mouse mascot character guiding players through the game |
| **Land** | Thematic zone containing 10 levels (5 lands total) |
| **Mastery Mode** | Scoring mode combining speed and accuracy (levels 21-50) |
| **Treasure Map** | Level selection screen showing all 50 levels in a winding path |
| **TTS** | Text-to-Speech, browser API for voice synthesis |
| **Virtual Keyboard** | On-screen representation of physical keyboard with visual guides |

---

**Document Version:** 1.0
**Last Updated:** 2026-01-21
**Owner:** vthuan1889
**Status:** Active Development
