/**
 * ElevenLabs Story Audio Generator
 *
 * Generates 50 story audio files using ElevenLabs API.
 * Usage: npx ts-node scripts/generate-story-audio.ts [--dry-run] [--level N]
 */
import { ElevenLabsClient } from './utils/elevenlabs-client';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Configuration
const OUTPUT_DIR = path.join(__dirname, '../public/assets/audio/stories');
const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; // Rachel voice - child-friendly
const RATE_LIMIT_MS = 1000; // 1 second between requests
const TOTAL_LEVELS = 50;

// Parse CLI arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const levelIndex = args.indexOf('--level');
const singleLevel = levelIndex !== -1 ? parseInt(args[levelIndex + 1], 10) : null;

// Story data - inline to avoid module resolution issues in scripts
const STORIES: Record<number, string> = {};

// Import stories dynamically
async function loadStories(): Promise<void> {
  const { getStoryText } = await import('../src/data/stories-content');
  for (let i = 1; i <= TOTAL_LEVELS; i++) {
    STORIES[i] = getStoryText(i);
  }
}

async function main(): Promise<void> {
  console.log('='.repeat(50));
  console.log('ElevenLabs Story Audio Generator');
  console.log('='.repeat(50));

  // Check API key
  const apiKey = process.env.API_elevenlabs;
  if (!apiKey) {
    console.error('ERROR: Missing API_elevenlabs in .env');
    console.error('Add your ElevenLabs API key to .env file');
    process.exit(1);
  }

  // Load story content
  console.log('Loading story content...');
  await loadStories();
  console.log(`Loaded ${Object.keys(STORIES).length} stories`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}`);
  }

  if (isDryRun) {
    console.log('\n[DRY RUN MODE] No audio will be generated\n');
  }

  const client = new ElevenLabsClient({ apiKey, voiceId: VOICE_ID });

  // Determine levels to process
  const levels = singleLevel
    ? [singleLevel]
    : Array.from({ length: TOTAL_LEVELS }, (_, i) => i + 1);

  let generated = 0;
  let skipped = 0;
  let errors = 0;

  for (const level of levels) {
    const outputPath = path.join(OUTPUT_DIR, `level-${level}.mp3`);
    const text = STORIES[level];

    if (!text) {
      console.error(`[${level}/${TOTAL_LEVELS}] ERROR: No story text found`);
      errors++;
      continue;
    }

    // Skip if file exists (resume capability)
    if (fs.existsSync(outputPath)) {
      console.log(`[${level}/${TOTAL_LEVELS}] SKIP (exists): level-${level}.mp3`);
      skipped++;
      continue;
    }

    console.log(`[${level}/${TOTAL_LEVELS}] Generating: level-${level}.mp3 (${text.length} chars)`);

    if (isDryRun) {
      console.log(`[${level}/${TOTAL_LEVELS}] DRY RUN: Would generate audio`);
      generated++;
      continue;
    }

    try {
      await client.generateAudio(text, outputPath);
      console.log(`[${level}/${TOTAL_LEVELS}] DONE: level-${level}.mp3`);
      generated++;
    } catch (error) {
      console.error(`[${level}/${TOTAL_LEVELS}] ERROR:`, error);
      errors++;
    }

    // Rate limiting
    if (level !== levels[levels.length - 1]) {
      await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('SUMMARY');
  console.log('='.repeat(50));
  console.log(`Generated: ${generated}`);
  console.log(`Skipped:   ${skipped}`);
  console.log(`Errors:    ${errors}`);
  console.log(`Output:    ${OUTPUT_DIR}`);
}

main().catch(console.error);
