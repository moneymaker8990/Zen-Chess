#!/usr/bin/env npx ts-node
/**
 * Lichess Puzzle Import Script
 * 
 * Downloads and imports puzzles from Lichess database into Supabase.
 * 
 * Usage:
 *   npx ts-node scripts/import-lichess-puzzles.ts
 * 
 * Environment variables required:
 *   SUPABASE_URL - Your Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY - Service role key (not anon key!)
 * 
 * Options:
 *   --min-rating=800    Minimum puzzle rating (default: 600)
 *   --max-rating=2500   Maximum puzzle rating (default: 2800)
 *   --limit=50000       Maximum puzzles to import (default: 100000)
 *   --skip-download     Skip downloading, use existing CSV file
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import * as https from 'https';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// ============================================
// CONFIGURATION
// ============================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LICHESS_PUZZLE_URL = 'https://database.lichess.org/lichess_db_puzzle.csv.zst';
const LOCAL_CSV_PATH = path.join(__dirname, '../data/lichess_puzzles.csv');
const LOCAL_ZST_PATH = path.join(__dirname, '../data/lichess_puzzles.csv.zst');
const BATCH_SIZE = 1000;

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (name: string, defaultValue: string): string => {
  const arg = args.find(a => a.startsWith(`--${name}=`));
  return arg ? arg.split('=')[1] : defaultValue;
};

const MIN_RATING = parseInt(getArg('min-rating', '600'), 10);
const MAX_RATING = parseInt(getArg('max-rating', '2800'), 10);
const MAX_PUZZLES = parseInt(getArg('limit', '100000'), 10);
const SKIP_DOWNLOAD = args.includes('--skip-download');

// ============================================
// THEME MAPPING (Lichess -> Our themes)
// ============================================

const THEME_MAP: Record<string, string> = {
  'fork': 'fork',
  'pin': 'pin',
  'skewer': 'skewer',
  'discoveredAttack': 'discovery',
  'deflection': 'deflection',
  'decoy': 'decoy',
  'quietMove': 'quiet_move',
  'zwischenzug': 'zwischenzug',
  'backRankMate': 'back_rank',
  'mateIn1': 'mate_in_1',
  'mateIn2': 'mate_in_2',
  'mateIn3': 'mate_in_3',
  'mateIn4': 'mate_in_4',
  'mateIn5': 'mate_in_5',
  'sacrifice': 'sacrifice',
  'hangingPiece': 'hanging_piece',
  'trappedPiece': 'trapped_piece',
  'exposedKing': 'exposed_king',
  'doubleCheck': 'double_check',
  'promotion': 'promotion',
  'underPromotion': 'under_promotion',
  'castling': 'castling',
  'enPassant': 'en_passant',
  'attraction': 'attraction',
  'clearance': 'clearance',
  'interference': 'interference',
  'intermezzo': 'intermezzo',
  'xRayAttack': 'x_ray',
  'defensiveMove': 'defensive',
  'capturingDefender': 'removing_defender',
  'knightEndgame': 'knight_endgame',
  'bishopEndgame': 'bishop_endgame',
  'rookEndgame': 'rook_endgame',
  'queenEndgame': 'queen_endgame',
  'pawnEndgame': 'pawn_endgame',
  'queensideAttack': 'queenside_attack',
  'kingsideAttack': 'kingside_attack',
  'opening': 'opening',
  'middlegame': 'middlegame',
  'endgame': 'endgame',
  'short': 'short',
  'long': 'long',
  'veryLong': 'very_long',
  'oneMove': 'one_move',
  'crushing': 'crushing',
  'advantage': 'advantage',
  'equality': 'equality',
  'master': 'master',
  'masterVsMaster': 'master_vs_master',
  'superGM': 'super_gm',
};

function mapThemes(lichessThemes: string[]): string[] {
  return lichessThemes
    .map(t => THEME_MAP[t] || t.toLowerCase().replace(/([A-Z])/g, '_$1').toLowerCase())
    .filter(t => t.length > 0);
}

// ============================================
// DOWNLOAD FUNCTIONS
// ============================================

async function downloadFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`📥 Downloading from ${url}...`);
    console.log(`   This is a ~250MB file, it may take a few minutes.`);
    
    const file = fs.createWriteStream(destPath);
    let downloadedBytes = 0;
    
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          file.close();
          fs.unlinkSync(destPath);
          return downloadFile(redirectUrl, destPath).then(resolve).catch(reject);
        }
      }
      
      const totalBytes = parseInt(response.headers['content-length'] || '0', 10);
      
      response.on('data', (chunk) => {
        downloadedBytes += chunk.length;
        if (totalBytes > 0) {
          const percent = ((downloadedBytes / totalBytes) * 100).toFixed(1);
          process.stdout.write(`\r   Progress: ${percent}% (${(downloadedBytes / 1024 / 1024).toFixed(1)}MB)`);
        }
      });
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log('\n   ✅ Download complete!');
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function decompressZstd(zstPath: string, csvPath: string): Promise<void> {
  console.log('📦 Decompressing .zst file...');
  
  // Try using zstd command if available
  try {
    execSync(`zstd -d "${zstPath}" -o "${csvPath}" -f`, { stdio: 'inherit' });
    console.log('   ✅ Decompression complete!');
    return;
  } catch {
    console.log('   zstd not found, trying alternative method...');
  }
  
  // Fallback: suggest manual installation
  console.error(`
❌ Could not decompress the file. Please install zstd:

   Windows: winget install zstd
   macOS:   brew install zstd
   Linux:   apt-get install zstd

Then run this script again, or manually decompress:
   zstd -d "${zstPath}" -o "${csvPath}"
  `);
  process.exit(1);
}

// ============================================
// CSV PARSING
// ============================================

interface LichessPuzzle {
  id: string;
  fen: string;
  moves: string;
  rating: number;
  ratingDeviation: number;
  popularity: number;
  nbPlays: number;
  themes: string[];
  gameUrl: string;
  openingTags: string[];
}

function parseCsvLine(line: string): LichessPuzzle | null {
  // CSV format: PuzzleId,FEN,Moves,Rating,RatingDeviation,Popularity,NbPlays,Themes,GameUrl,OpeningTags
  const parts = line.split(',');
  if (parts.length < 9) return null;
  
  const [id, fen, moves, rating, ratingDev, popularity, nbPlays, themes, gameUrl, ...openingParts] = parts;
  
  const ratingNum = parseInt(rating, 10);
  if (isNaN(ratingNum) || ratingNum < MIN_RATING || ratingNum > MAX_RATING) {
    return null;
  }
  
  return {
    id,
    fen,
    moves,
    rating: ratingNum,
    ratingDeviation: parseInt(ratingDev, 10) || 75,
    popularity: parseInt(popularity, 10) || 0,
    nbPlays: parseInt(nbPlays, 10) || 0,
    themes: themes ? themes.split(' ').filter(t => t.length > 0) : [],
    gameUrl: gameUrl || '',
    openingTags: openingParts.join(',').split(' ').filter(t => t.length > 0),
  };
}

// ============================================
// SUPABASE IMPORT
// ============================================

async function importPuzzles(supabase: SupabaseClient): Promise<void> {
  console.log('\n📊 Starting puzzle import...');
  console.log(`   Rating range: ${MIN_RATING} - ${MAX_RATING}`);
  console.log(`   Max puzzles: ${MAX_PUZZLES.toLocaleString()}`);
  
  const fileStream = fs.createReadStream(LOCAL_CSV_PATH);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  
  let batch: LichessPuzzle[] = [];
  let totalImported = 0;
  let totalSkipped = 0;
  let lineNumber = 0;
  let isFirstLine = true;
  
  for await (const line of rl) {
    lineNumber++;
    
    // Skip header row
    if (isFirstLine) {
      isFirstLine = false;
      continue;
    }
    
    // Check if we've hit the limit
    if (totalImported >= MAX_PUZZLES) {
      console.log(`\n   Reached limit of ${MAX_PUZZLES.toLocaleString()} puzzles.`);
      break;
    }
    
    const puzzle = parseCsvLine(line);
    if (!puzzle) {
      totalSkipped++;
      continue;
    }
    
    batch.push(puzzle);
    
    // Insert batch when full
    if (batch.length >= BATCH_SIZE) {
      await insertBatch(supabase, batch);
      totalImported += batch.length;
      process.stdout.write(`\r   Imported: ${totalImported.toLocaleString()} puzzles (skipped: ${totalSkipped.toLocaleString()})`);
      batch = [];
    }
  }
  
  // Insert remaining puzzles
  if (batch.length > 0) {
    await insertBatch(supabase, batch);
    totalImported += batch.length;
  }
  
  console.log(`\n\n✅ Import complete!`);
  console.log(`   Total imported: ${totalImported.toLocaleString()}`);
  console.log(`   Total skipped: ${totalSkipped.toLocaleString()}`);
}

async function insertBatch(supabase: SupabaseClient, puzzles: LichessPuzzle[]): Promise<void> {
  const rows = puzzles.map(p => ({
    id: p.id,
    fen: p.fen,
    solution_moves: p.moves,
    rating: p.rating,
    rating_deviation: p.ratingDeviation,
    themes: mapThemes(p.themes),
    popularity: p.popularity,
    nb_plays: p.nbPlays,
    game_url: p.gameUrl || null,
    opening_tags: p.openingTags,
  }));
  
  const { error } = await supabase
    .from('puzzles')
    .upsert(rows, { onConflict: 'id', ignoreDuplicates: true });
  
  if (error) {
    console.error('\n❌ Error inserting batch:', error.message);
    throw error;
  }
}

// ============================================
// MAIN
// ============================================

async function main(): Promise<void> {
  console.log('🧩 Lichess Puzzle Importer');
  console.log('==========================\n');
  
  // Check environment variables
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error(`
❌ Missing environment variables!

Please set:
  SUPABASE_URL (or VITE_SUPABASE_URL) - Your Supabase project URL
  SUPABASE_SERVICE_ROLE_KEY - Service role key (not anon key!)

You can find these in your Supabase dashboard under Settings > API.

Example:
  export SUPABASE_URL="https://xxx.supabase.co"
  export SUPABASE_SERVICE_ROLE_KEY="eyJ..."
    `);
    process.exit(1);
  }
  
  // Create Supabase client with service role
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  
  // Ensure data directory exists
  const dataDir = path.dirname(LOCAL_CSV_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Download if needed
  if (!SKIP_DOWNLOAD || !fs.existsSync(LOCAL_CSV_PATH)) {
    if (!fs.existsSync(LOCAL_ZST_PATH)) {
      await downloadFile(LICHESS_PUZZLE_URL, LOCAL_ZST_PATH);
    }
    
    if (!fs.existsSync(LOCAL_CSV_PATH)) {
      await decompressZstd(LOCAL_ZST_PATH, LOCAL_CSV_PATH);
    }
  } else {
    console.log('📄 Using existing CSV file (--skip-download flag set)');
  }
  
  // Import puzzles
  await importPuzzles(supabase);
  
  console.log('\n🎉 All done!');
}

main().catch((err) => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});

