/**
 * Comprehensive Fix Script for Instructive Games
 * - Replays moves to generate correct FENs
 * - Identifies invalid moves that need manual fixing
 * - Outputs corrected game data
 */

import { Chess } from 'chess.js';
import { allInstructiveGames, type InstructiveGame, type AnnotatedMove } from '../src/data/instructiveGames';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface FixResult {
  gameId: string;
  dayNumber: number;
  title: string;
  fixed: boolean;
  errors: string[];
  correctedMoves: AnnotatedMove[];
  needsManualFix: boolean;
}

// Normalize move notation
function normalizeMove(move: string): string {
  return move
    .replace(/0-0-0/g, 'O-O-O')
    .replace(/0-0/g, 'O-O')
    .replace(/[!?]+/g, '')
    .trim();
}

// Try to find matching legal move
function findMatchingMove(game: Chess, expectedMove: string): string | null {
  const legalMoves = game.moves({ verbose: false });
  const normalizedExpected = normalizeMove(expectedMove);
  
  if (legalMoves.includes(expectedMove)) return expectedMove;
  
  const normalizedMatch = legalMoves.find(lm => normalizeMove(lm) === normalizedExpected);
  if (normalizedMatch) return normalizedMatch;
  
  // Try matching by destination for piece moves
  if (/^[NBRQK]/.test(normalizedExpected)) {
    const destExpected = normalizedExpected.slice(-2);
    const pieceExpected = normalizedExpected[0];
    const matchingMove = legalMoves.find(lm => {
      const normalizedLegal = normalizeMove(lm);
      return normalizedLegal[0] === pieceExpected && normalizedLegal.slice(-2) === destExpected;
    });
    if (matchingMove) return matchingMove;
  }
  
  // Try matching by destination for pawn moves
  if (/^[a-h]/.test(normalizedExpected)) {
    const destExpected = normalizedExpected.slice(-2);
    const matchingMove = legalMoves.find(lm => {
      const normalizedLegal = normalizeMove(lm);
      return normalizedLegal.slice(-2) === destExpected && /^[a-h]/.test(normalizedLegal);
    });
    if (matchingMove) return matchingMove;
  }
  
  return null;
}

// Fix a single game
function fixGame(game: InstructiveGame): FixResult {
  const errors: string[] = [];
  const correctedMoves: AnnotatedMove[] = [];
  let needsManualFix = false;
  
  if (game.moves.length === 0) {
    return {
      gameId: game.id,
      dayNumber: game.dayNumber,
      title: game.title,
      fixed: true,
      errors: [],
      correctedMoves: [],
      needsManualFix: false,
    };
  }
  
  const chess = new Chess();
  
  for (let i = 0; i < game.moves.length; i++) {
    const annotatedMove = game.moves[i];
    const rawMove = annotatedMove.move;
    const normalizedMove = normalizeMove(rawMove);
    
    try {
      let moveResult = chess.move(normalizedMove);
      
      if (!moveResult) {
        const matchingMove = findMatchingMove(chess, rawMove);
        if (matchingMove) {
          moveResult = chess.move(matchingMove);
        }
      }
      
      if (!moveResult) {
        // Invalid move - cannot continue
        errors.push(`Move ${i + 1} (${rawMove}) is invalid. Position: ${chess.fen()}`);
        needsManualFix = true;
        // Keep the original move but mark it as needing fix
        correctedMoves.push({
          ...annotatedMove,
          fen: chess.fen(), // Use current position even though move failed
        });
        break;
      }
      
      // Generate correct FEN
      const correctFen = chess.fen();
      
      // Update the move with correct FEN
      correctedMoves.push({
        ...annotatedMove,
        fen: correctFen,
      });
      
    } catch (e) {
      errors.push(`Move ${i + 1} (${rawMove}) error: ${e instanceof Error ? e.message : String(e)}`);
      needsManualFix = true;
      correctedMoves.push({
        ...annotatedMove,
        fen: chess.fen(),
      });
      break;
    }
  }
  
  return {
    gameId: game.id,
    dayNumber: game.dayNumber,
    title: game.title,
    fixed: !needsManualFix && errors.length === 0,
    errors,
    correctedMoves,
    needsManualFix,
  };
}

// Main function
async function main() {
  console.log('\n🔧 Fixing All Instructive Games...\n');
  
  const gamesWithMoves = allInstructiveGames.filter(g => g.moves.length > 0);
  console.log(`Found ${gamesWithMoves.length} games with moves\n`);
  
  const results: FixResult[] = [];
  const gamesNeedingManualFix: FixResult[] = [];
  
  for (const game of gamesWithMoves) {
    const result = fixGame(game);
    results.push(result);
    
    if (result.needsManualFix) {
      gamesNeedingManualFix.push(result);
      console.log(`⚠️  Day ${result.dayNumber}: ${result.title} - NEEDS MANUAL FIX`);
      result.errors.forEach(err => console.log(`   ${err}`));
    } else if (result.correctedMoves.length > 0) {
      console.log(`✅ Day ${result.dayNumber}: ${result.title} - FENs corrected`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total games: ${gamesWithMoves.length}`);
  console.log(`Games needing manual fix: ${gamesNeedingManualFix.length}`);
  console.log(`Games with FEN corrections: ${results.filter(r => !r.needsManualFix && r.correctedMoves.length > 0).length}`);
  console.log('='.repeat(60) + '\n');
  
  // Generate output file with corrected games
  const output: string[] = [];
  output.push('// This file contains corrected FEN positions for instructive games');
  output.push('// Games needing manual fix are marked with NEEDS_MANUAL_FIX');
  output.push('');
  
  for (const result of results) {
    if (result.needsManualFix) {
      output.push(`// DAY ${result.dayNumber}: ${result.title} - NEEDS MANUAL FIX`);
      output.push(`// Errors: ${result.errors.join('; ')}`);
      output.push('');
    } else if (result.correctedMoves.length > 0) {
      output.push(`// DAY ${result.dayNumber}: ${result.title} - FENs corrected`);
      output.push(`// Corrected ${result.correctedMoves.length} FEN positions`);
      output.push('');
    }
  }
  
  // Write detailed report
  const reportPath = path.join(__dirname, 'game-fix-report.txt');
  fs.writeFileSync(reportPath, output.join('\n'));
  console.log(`📄 Detailed report written to: ${reportPath}\n`);
  
  // Write JSON with all corrections for programmatic application
  const jsonPath = path.join(__dirname, 'game-corrections.json');
  const corrections = results.map(r => ({
    gameId: r.gameId,
    dayNumber: r.dayNumber,
    title: r.title,
    needsManualFix: r.needsManualFix,
    errors: r.errors,
    correctedMoves: r.correctedMoves.map(m => ({
      move: m.move,
      fen: m.fen,
    })),
  }));
  fs.writeFileSync(jsonPath, JSON.stringify(corrections, null, 2));
  console.log(`📄 Corrections JSON written to: ${jsonPath}\n`);
  
  if (gamesNeedingManualFix.length > 0) {
    console.log('⚠️  Games requiring manual fix:');
    gamesNeedingManualFix.forEach(r => {
      console.log(`   Day ${r.dayNumber}: ${r.title}`);
    });
    console.log('');
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});


