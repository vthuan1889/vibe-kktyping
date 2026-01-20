# PROMPT: DEVELOP AN EDUCATIONAL TYPING GAME "KAKA’S ADVENTURE"

## 1. Project Overview

* **Goal:** An interactive web-based typing game for kids aged 5-6.
* **Target Platform:** Desktop browsers (optimized for physical keyboards & Fullscreen).
* **Language:** 100% English (UI, instructions, and voice-over).
* **Mascot:** **Kaka the Mouse** (a cute, energetic original character).
* **Tech Stack:** Phaser.js (Game Engine), Web Speech API (Text-to-Speech), LocalStorage (Saving progress).

## 2. Level Structure & Difficulty Curve

The game consists of **50 Levels** divided into **5 Lands** (10 levels each).

* **Land 1 (Levels 1-10): Cheese Factory.** Yellow theme.
* *Content:* Single letters (Home row: F, J, D, K, S, L, A, ;).
* *Mechanic:* Method C (Show huge letter in center first + highlight virtual keyboard).


* **Land 2 (Levels 11-20): Green Garden.** Nature theme.
* *Content:* 2-3 letter words (Cat, Sun, Bee, Bug).


* **Land 3 (Levels 21-30): Blue Ocean.** Undersea theme.
* *Content:* 4-5 letter words (Fish, Ship, Shell, Water).


* **Land 4 (Levels 31-40): Sweet Candy Land.** Pink/Colorful theme.
* *Content:* Longer words (Candy, Sweet, Cake, Cookie).


* **Land 5 (Levels 41-50): Space Adventure.** Dark blue/Galaxy theme.
* *Content:* Simple science/space terms (Star, Moon, Earth, Sky).



## 3. Core Gameplay Mechanics

* **Winning Condition:** Must type a full row of words/letters to pass a level.
* **Interactive Kaka:** For each level, AI must design a unique animation for Kaka when the child types correctly (e.g., Lvl 1: Kaka eats cheese, Lvl 15: Kaka waters a flower, Lvl 45: Kaka floats in zero gravity).
* **Mistake Handling:** If a wrong key is pressed:
* Play a gentle "Oops!" sound.
* The target letter shakes in red.
* The game waits for the correct key before moving forward.


* **Virtual Keyboard:** Visible at the bottom.
* *Levels 1-10:* Highlight the next key and show which finger to use.
* *Levels 11-50:* Standard highlight only.



## 4. Scoring System (10-Star Scale)

* **Lvl 1-10 (Encouragement):** Always 10 stars upon completion.
* **Lvl 11-20 (Accuracy):** Start with 10 stars, deduct 1 star for each mistake.
* **Lvl 21-50 (Mastery):** Combined Speed + Accuracy. Fast and correct = 10 stars.

## 5. UI/UX Features

* **Treasure Map:** A level selection screen showing buttons 1-50. Locked levels are greyed out.
* **Controls:** Big, clear buttons for: Fullscreen, Mute/Unmute, Pause.
* **Progression:** When a level is cleared, show a "Summary Board" with 1-10 stars and a large "Next Level" button.
* **Land Milestones:** Every 10 levels, play a "Grand Celebration" with Kaka in a new costume (Scuba gear, Spacesuit, etc.) and a voiced story dialogue introducing the next land.

## 6. Audio & Voice Guidelines

* **Voice (AI-generated, Female, High-energy):**
* "Let's help Kaka! Type the letter/word: [Word]"
* "Great job!", "Awesome!", "Correct!"
* Repeat the word/letter sound after a successful typing.


* **Background Music:** Light, upbeat, loops according to the land's theme.

## 7. Technical Implementation Instructions

* Use `LocalStorage` to save the `currentUnlockedLevel` and `starsPerLevel`.
* Assets: Use placeholders from **Kenney.nl** or vibrant CSS-based shapes.
* Responsive Design: Ensure the canvas scales to fit the screen while maintaining aspect ratio.
* Input: Listen for `keydown` events.

**Task:** Please generate the complete HTML, CSS, and Phaser.js code for the **Game Skeleton**, the **Treasure Map (Levels 1-50)**, and the detailed logic for **Level 1 of the Cheese Factory**.

