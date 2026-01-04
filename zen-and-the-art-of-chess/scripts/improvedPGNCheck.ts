/**
 * Improved PGN checker that properly parses PGN files and matches games
 */

import { allInstructiveGames } from '../src/data/instructiveGames';
import { Chess } from 'chess.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ParsedPGNGame {
  metadata: Record<string, string>;
  moves: string[];
  moveText: string;
}

function parsePGNContent(content: string): ParsedPGNGame[] {
  const games: ParsedPGNGame[] = [];
  
  // Split by double newlines (game separator)
  const gameBlocks = content.split(/\n\n(?=\[Event)/);
  
  for (const block of gameBlocks) {
    if (!block.trim()) continue;
    
    const metadata: Record<string, string> = {};
    const metadataMatches = block.matchAll(/\[(\w+)\s+"([^"]+)"/g);
    
    for (const match of metadataMatches) {
      metadata[match[1].toLowerCase()] = match[2];
    }
    
    // Extract move text - remove metadata and comments
    let moveText = block
      .replace(/\[.*?\]/g, '') // Remove metadata
      .replace(/\{[^}]*\}/g, '') // Remove comments
      .replace(/\$[0-9]+/g, '') // Remove NAGs
      .trim();
    
    // Parse moves - handle numbered moves like "1. e4 e5 2. Nf3 Nc6"
    const moves: string[] = [];
    const moveRegex = /(\d+)\.\s*([^\s]+(?:\s+[^\s]+)?)/g;
    let match;
    
    while ((match = moveRegex.exec(moveText)) !== null) {
      const movePair = match[2].trim().split(/\s+/);
      moves.push(...movePair.filter(m => m && !m.match(/^(1-0|0-1|1\/2-1\/2|\*)$/)));
    }
    
    // Also try simpler pattern if the above didn't work
    if (moves.length === 0) {
      const simpleMoves = moveText
        .split(/\s+/)
        .filter(m => m && !m.match(/^\d+\./) && !m.match(/^(1-0|0-1|1\/2-1\/2|\*)$/));
      moves.push(...simpleMoves);
    }
    
    if (moves.length > 0) {
      games.push({ metadata, moves, moveText });
    }
  }
  
  return games;
}

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[.,]/g, '')
    .split(/\s+/)
    .filter(n => n.length > 0)
    .join(' ');
}

function namesMatch(name1: string, name2: string): boolean {
  const n1 = normalizeName(name1);
  const n2 = normalizeName(name2);
  
  // Check if one contains the other or they share significant parts
  const n1Parts = n1.split(/\s+/);
  const n2Parts = n2.split(/\s+/);
  
  // Check if last names match
  if (n1Parts.length > 0 && n2Parts.length > 0) {
    if (n1Parts[n1Parts.length - 1] === n2Parts[n2Parts.length - 1]) {
      return true;
    }
  }
  
  // Check if one is contained in the other
  return n1.includes(n2) || n2.includes(n1);
}

function findMatchingPGNGame(game: typeof allInstructiveGames[0], pgnGames: ParsedPGNGame[]): ParsedPGNGame | null {
  for (const pgnGame of pgnGames) {
    const whiteMatch = namesMatch(pgnGame.metadata.white || '', game.white);
    const blackMatch = namesMatch(pgnGame.metadata.black || '', game.black);
    
    if (whiteMatch && blackMatch) {
      // Check year
      const pgnYear = pgnGame.metadata.date?.match(/\d{4}/)?.[0];
      if (pgnYear && pgnYear === game.year.toString()) {
        // Check opening moves match
        if (pgnGame.moves.length >= 4 && game.moves.length >= 4) {
          const storedOpening = game.moves.slice(0, 4).map(m => m.move);
          const pgnOpening = pgnGame.moves.slice(0, 4);
          
          // Normalize moves for comparison
          const normalizeMove = (m: string) => m.replace(/[!?+#]/g, '').trim();
          const storedNorm = storedOpening.map(normalizeMove);
          const pgnNorm = pgnOpening.map(normalizeMove);
          
          if (storedNorm.join(' ') === pgnNorm.join(' ')) {
            return pgnGame;
          }
        }
      }
    }
  }
  
  return null;
}

async function main() {
  console.log('\n🔍 Improved PGN Check\n');
  console.log('='.repeat(80));
  
  // Read all PGN files
  const pgnDir = path.join(__dirname, '../data/pgns');
  const allPGNGames: ParsedPGNGame[] = [];
  
  if (fs.existsSync(pgnDir)) {
    const pgnFiles = fs.readdirSync(pgnDir, { recursive: true })
      .filter(f => typeof f === 'string' && f.endsWith('.pgn'))
      .map(f => path.join(pgnDir, f));
    
    console.log(`Found ${pgnFiles.length} PGN files\n`);
    
    for (const pgnFile of pgnFiles) {
      try {
        const content = fs.readFileSync(pgnFile, 'utf-8');
        const games = parsePGNContent(content);
        allPGNGames.push(...games);
        console.log(`  ${path.basename(pgnFile)}: ${games.length} games`);
      } catch (e) {
        console.log(`  ${path.basename(pgnFile)}: Error - ${e}`);
      }
    }
  }
  
  console.log(`\nTotal PGN games loaded: ${allPGNGames.length}\n`);
  
  // Match games
  const matches: Array<{
    game: typeof allInstructiveGames[0];
    pgnGame: ParsedPGNGame;
  }> = [];
  
  for (const game of allInstructiveGames) {
    if (game.moves.length === 0) continue;
    
    const pgnMatch = findMatchingPGNGame(game, allPGNGames);
    if (pgnMatch) {
      matches.push({ game, pgnGame: pgnMatch });
    }
  }
  
  console.log(`Found ${matches.length} matching games\n`);
  
  // Compare and find discrepancies
  const discrepancies: Array<{
    gameId: string;
    dayNumber: number;
    title: string;
    discrepancies: Array<{ moveIndex: number; storedMove: string; pgnMove: string }>;
  }> = [];
  
  for (const { game, pgnGame } of matches) {
    const chess = new Chess();
    const gameDiscrepancies: Array<{ moveIndex: number; storedMove: string; pgnMove: string }> = [];
    
    const minMoves = Math.min(game.moves.length, pgnGame.moves.length);
    
    for (let i = 0; i < minMoves; i++) {
      const storedMove = game.moves[i].move;
      const pgnMove = pgnGame.moves[i];
      
      try {
        const storedResult = chess.move(storedMove);
        if (!storedResult) {
          // Try PGN move
          chess.undo();
          const pgnResult = chess.move(pgnMove);
          gameDiscrepancies.push({ moveIndex: i, storedMove, pgnMove });
          continue;
        }
        
        // Check if moves are different but lead to same position
        if (storedMove !== pgnMove) {
          const storedFen = chess.fen();
          chess.undo();
          const pgnResult = chess.move(pgnMove);
          const pgnFen = chess.fen();
          
          const storedFenParts = storedFen.split(' ').slice(0, 4);
          const pgnFenParts = pgnFen.split(' ').slice(0, 4);
          
          if (storedFenParts.join(' ') !== pgnFenParts.join(' ')) {
            gameDiscrepancies.push({ moveIndex: i, storedMove, pgnMove });
          }
        }
      } catch (e) {
        // Stored move failed
        try {
          const pgnResult = chess.move(pgnMove);
          gameDiscrepancies.push({ moveIndex: i, storedMove, pgnMove });
        } catch (e2) {
          // Both failed - skip
        }
      }
    }
    
    if (gameDiscrepancies.length > 0) {
      discrepancies.push({
        gameId: game.id,
        dayNumber: game.dayNumber,
        title: game.title,
        discrepancies: gameDiscrepancies,
      });
    }
  }
  
  console.log(`Games with discrepancies: ${discrepancies.length}\n`);
  
  if (discrepancies.length > 0) {
    discrepancies.forEach(d => {
      console.log(`Day ${d.dayNumber}: ${d.title}`);
      console.log(`  Discrepancies: ${d.discrepancies.length}`);
      d.discrepancies.slice(0, 3).forEach(dis => {
        console.log(`    Move ${dis.moveIndex + 1}: "${dis.storedMove}" → "${dis.pgnMove}"`);
      });
      if (d.discrepancies.length > 3) {
        console.log(`    ... and ${d.discrepancies.length - 3} more`);
      }
      console.log('');
    });
  }
  
  // Write report
  const outputPath = path.join(__dirname, 'pgn-discrepancies.json');
  fs.writeFileSync(outputPath, JSON.stringify(discrepancies, null, 2));
  console.log(`\n📄 Report written to: ${outputPath}\n`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});


