/**
 * Systematically check and fix games against PGN sources
 * 1. Check PGN files in codebase
 * 2. Search for PGNs online if not found
 * 3. Compare and fix discrepancies
 */

import { allInstructiveGames } from '../src/data/instructiveGames';
import { Chess } from 'chess.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PGNMatch {
  gameId: string;
  dayNumber: number;
  title: string;
  pgnMoves: string[];
  discrepancies: Array<{
    moveIndex: number;
    storedMove: string;
    pgnMove: string;
    correctFen: string;
  }>;
}

function parsePGNFile(filePath: string): Array<{ metadata: Record<string, string>; moves: string[] }> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const games: Array<{ metadata: Record<string, string>; moves: string[] }> = [];
  
  // Simple PGN parser - looks for [Event...] blocks and move sequences
  const gameBlocks = content.split(/\n\n(?=\[Event)/);
  
  for (const block of gameBlocks) {
    const metadata: Record<string, string> = {};
    const metadataLines = block.match(/\[(\w+)\s+"([^"]+)"/g) || [];
    
    for (const line of metadataLines) {
      const match = line.match(/\[(\w+)\s+"([^"]+)"/);
      if (match) {
        metadata[match[1].toLowerCase()] = match[2];
      }
    }
    
    // Extract moves - remove comments and annotations
    const moveText = block.replace(/\[.*?\]/g, '').replace(/\{[^}]*\}/g, '');
    const moves = moveText
      .match(/\d+\.\s*([^\s]+(?:\s+[^\s]+)?)/g)
      ?.flatMap(m => {
        const parts = m.replace(/^\d+\.\s*/, '').split(/\s+/);
        return parts.filter(p => p && !p.match(/^\d+\./));
      })
      .filter(m => m && !m.match(/^1-0|0-1|1\/2-1\/2$/)) || [];
    
    if (moves.length > 0) {
      games.push({ metadata, moves });
    }
  }
  
  return games;
}

function findPGNInCodebase(game: typeof allInstructiveGames[0]): string[] | null {
  const pgnDir = path.join(__dirname, '../data/pgns');
  if (!fs.existsSync(pgnDir)) return null;
  
  const pgnFiles = fs.readdirSync(pgnDir, { recursive: true })
    .filter(f => typeof f === 'string' && f.endsWith('.pgn'))
    .map(f => path.join(pgnDir, f));
  
  for (const pgnFile of pgnFiles) {
    try {
      const games = parsePGNFile(pgnFile);
      for (const pgnGame of games) {
        // Try to match by players and year
        const whiteMatch = pgnGame.metadata.white?.toLowerCase().includes(game.white.toLowerCase().split(' ')[0]);
        const blackMatch = pgnGame.metadata.black?.toLowerCase().includes(game.black.toLowerCase().split(' ')[0]);
        const yearMatch = pgnGame.metadata.date?.includes(game.year.toString());
        
        if (whiteMatch && blackMatch && yearMatch) {
          // Check if opening matches
          if (pgnGame.moves.length >= 4) {
            const storedOpening = game.moves.slice(0, 4).map(m => m.move).join(' ');
            const pgnOpening = pgnGame.moves.slice(0, 4).join(' ');
            if (storedOpening === pgnOpening) {
              return pgnGame.moves;
            }
          }
        }
      }
    } catch (e) {
      // Skip files that can't be parsed
    }
  }
  
  return null;
}

function compareGameWithPGN(game: typeof allInstructiveGames[0], pgnMoves: string[]): PGNMatch | null {
  const chess = new Chess();
  const discrepancies: PGNMatch['discrepancies'] = [];
  
  const minMoves = Math.min(game.moves.length, pgnMoves.length);
  
  for (let i = 0; i < minMoves; i++) {
    const storedMove = game.moves[i].move;
    const pgnMove = pgnMoves[i];
    
    try {
      const result = chess.move(storedMove);
      if (!result) {
        // Stored move is invalid, try PGN move
        chess.undo();
        const pgnResult = chess.move(pgnMove);
        discrepancies.push({
          moveIndex: i,
          storedMove,
          pgnMove,
          correctFen: chess.fen(),
        });
        continue;
      }
      
      // Both moves work, check if they're the same
      if (storedMove !== pgnMove) {
        // Check if they lead to the same position
        const storedFen = chess.fen();
        chess.undo();
        const pgnResult = chess.move(pgnMove);
        const pgnFen = chess.fen();
        
        // Compare FENs (first 4 parts)
        const storedFenParts = storedFen.split(' ').slice(0, 4);
        const pgnFenParts = pgnFen.split(' ').slice(0, 4);
        
        if (storedFenParts.join(' ') !== pgnFenParts.join(' ')) {
          discrepancies.push({
            moveIndex: i,
            storedMove,
            pgnMove,
            correctFen: pgnFen,
          });
        }
      }
    } catch (e) {
      // Stored move failed, try PGN move
      try {
        const pgnResult = chess.move(pgnMove);
        discrepancies.push({
          moveIndex: i,
          storedMove,
          pgnMove,
          correctFen: chess.fen(),
        });
      } catch (e2) {
        // Both failed - this is a problem
        return null;
      }
    }
  }
  
  if (discrepancies.length === 0 && game.moves.length === pgnMoves.length) {
    return null; // Perfect match
  }
  
  return {
    gameId: game.id,
    dayNumber: game.dayNumber,
    title: game.title,
    pgnMoves,
    discrepancies,
  };
}

async function main() {
  console.log('\n🔍 Systematic PGN Check and Fix\n');
  console.log('='.repeat(80));
  
  const gamesNeedingFix: PGNMatch[] = [];
  const gamesWithPGN: Array<{ game: typeof allInstructiveGames[0]; pgnMoves: string[] }> = [];
  
  // First, try to find PGNs in codebase
  console.log('\n📂 Checking PGN files in codebase...\n');
  
  for (const game of allInstructiveGames) {
    if (game.moves.length === 0) continue;
    
    const pgnMoves = findPGNInCodebase(game);
    if (pgnMoves) {
      gamesWithPGN.push({ game, pgnMoves });
      const match = compareGameWithPGN(game, pgnMoves);
      if (match && match.discrepancies.length > 0) {
        gamesNeedingFix.push(match);
      }
    }
  }
  
  console.log(`Found ${gamesWithPGN.length} games with PGNs in codebase`);
  console.log(`Found ${gamesNeedingFix.length} games with discrepancies\n`);
  
  // Show games that need fixing
  if (gamesNeedingFix.length > 0) {
    console.log('Games needing fixes:\n');
    gamesNeedingFix.forEach(match => {
      console.log(`Day ${match.dayNumber}: ${match.title}`);
      console.log(`  Discrepancies: ${match.discrepancies.length}`);
      match.discrepancies.slice(0, 5).forEach(d => {
        console.log(`    Move ${d.moveIndex + 1}: "${d.storedMove}" → "${d.pgnMove}"`);
      });
      if (match.discrepancies.length > 5) {
        console.log(`    ... and ${match.discrepancies.length - 5} more`);
      }
      console.log('');
    });
  }
  
  // Write report
  const outputPath = path.join(__dirname, 'pgn-fix-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(gamesNeedingFix, null, 2));
  
  console.log(`\n📄 Report written to: ${outputPath}\n`);
  console.log('Next: Fix games based on PGN discrepancies');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});


