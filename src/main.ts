import Phaser from 'phaser';
import { gameConfig } from './config/game-config';

// Initialize the Phaser game
const game = new Phaser.Game(gameConfig);

// Handle window resize for better fullscreen support
window.addEventListener('resize', () => {
  game.scale.refresh();
});
