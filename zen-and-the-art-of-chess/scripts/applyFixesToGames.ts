/**
 * Apply fixes from game-fixes.json to games.ts
 * Updates FEN positions and fixes moves where possible
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface GameFix {
  gameId: string;
  dayNumber: number;
  correctedMoves: Array<{ index: number; move: string; fen: string }>;
  invalidMoves: Array<{ index: number; move: string; position: string; legalMoves: string[] }>;
}

// Read the fixes
const fixesPath = path.join(__dirname, 'game-fixes.json');
const fixes: GameFix[] = JSON.parse(readFileSync(fixesPath, 'utf-8'));

// Read the games file
const gamesPath = path.join(__dirname, '../src/data/instructiveGames/games.ts');
let gamesContent = readFileSync(gamesPath, 'utf-8');

console.log(`\n🔧 Applying fixes to games.ts...\n`);

let totalFixes = 0;
let gamesFixed = 0;

// Apply fixes for each game
for (const fix of fixes) {
  if (fix.correctedMoves.length === 0 && fix.invalidMoves.length === 0) {
    continue;
  }
  
  // Find the game in the file by day number
  const dayPattern = new RegExp(
    `(// ==========================================\\s*// DAY ${fix.dayNumber}[\\s\\S]*?moves: \\[)([\\s\\S]*?)(\\],)`,
    'm'
  );
  
  const match = gamesContent.match(dayPattern);
  if (!match) {
    console.log(`⚠️  Could not find Day ${fix.dayNumber} in games.ts`);
    continue;
  }
  
  const movesSection = match[2];
  const moveLines = movesContent.split(/\n/);
  
  // Apply FEN corrections
  for (const correction of fix.correctedMoves) {
    const moveIndex = correction.index;
    // Find the move line - it should have the move and fen
    const moveLinePattern = new RegExp(
      `(\\s*\\{ move: ['"]${fix.correctedMoves[moveIndex]?.move.replace(/[+.#]/g, '\\$&')}['"], fen: ['"])([^'"]+)(['"],)`,
      'm'
    );
    
    // Actually, let's use a simpler approach - replace FENs by matching the move
    const oldMove = fix.correctedMoves.find(m => m.index === moveIndex);
    if (oldMove) {
      const oldFenPattern = new RegExp(
        `(\\{ move: ['"]${oldMove.move.replace(/[+.#()]/g, '\\$&')}['"], fen: ['"])([^'"]+)(['"])`,
        'g'
      );
      const newFen = oldMove.fen;
      const replacement = `$1${newFen}$3`;
      
      if (gamesContent.match(oldFenPattern)) {
        gamesContent = gamesContent.replace(oldFenPattern, replacement);
        totalFixes++;
      }
    }
  }
  
  // Update moves that were fixed
  for (const correction of fix.correctedMoves) {
    if (correction.move !== fix.invalidMoves.find(m => m.index === correction.index)?.move) {
      // The move was corrected, update it
      const moveUpdatePattern = new RegExp(
        `(\\{ move: ['"])([^'"]+)(['"], fen: ['"]${correction.fen.replace(/[+.#()]/g, '\\$&')}['"])`,
        'g'
      );
      const newMove = correction.move;
      const replacement = `$1${newMove}$3`;
      
      if (gamesContent.match(moveUpdatePattern)) {
        gamesContent = gamesContent.replace(moveUpdatePattern, replacement);
      }
    }
  }
  
  if (fix.correctedMoves.length > 0 && fix.invalidMoves.length === 0) {
    gamesFixed++;
    console.log(`✅ Day ${fix.dayNumber}: Fixed ${fix.correctedMoves.length} FEN positions`);
  }
}

// Write the updated file
writeFileSync(gamesPath, gamesContent, 'utf-8');

console.log(`\n📊 Summary:`);
console.log(`   Games fixed: ${gamesFixed}`);
console.log(`   Total FEN corrections: ${totalFixes}`);
console.log(`\n✅ Updated ${gamesPath}\n`);


