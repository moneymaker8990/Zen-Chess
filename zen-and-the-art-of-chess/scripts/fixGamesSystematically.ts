/**
 * Systematically fix games by:
 * 1. Auto-correcting FEN positions
 * 2. Researching and fixing invalid moves
 * 3. Applying all corrections to games.ts
 */

import { Chess } from 'chess.js';
import { allInstructiveGames, type InstructiveGame, type AnnotatedMove } from '../src/data/instructiveGames';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function normalizeMove(move: string): string {
  return move
    .replace(/0-0-0/g, 'O-O-O')
    .replace(/0-0/g, 'O-O')
    .replace(/[!?]+/g, '')
    .trim();
}

function findMatchingMove(game: Chess, expectedMove: string): string | null {
  const legalMoves = game.moves({ verbose: false });
  const normalizedExpected = normalizeMove(expectedMove);
  
  if (legalMoves.includes(expectedMove)) return expectedMove;
  
  const normalizedMatch = legalMoves.find(lm => normalizeMove(lm) === normalizedExpected);
  if (normalizedMatch) return normalizedMatch;
  
  if (/^[NBRQK]/.test(normalizedExpected)) {
    const destExpected = normalizedExpected.slice(-2);
    const pieceExpected = normalizedExpected[0];
    const matchingMove = legalMoves.find(lm => {
      const normalizedLegal = normalizeMove(lm);
      return normalizedLegal[0] === pieceExpected && normalizedLegal.slice(-2) === destExpected;
    });
    if (matchingMove) return matchingMove;
  }
  
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

interface GameCorrection {
  gameId: string;
  dayNumber: number;
  correctedMoves: Array<{ index: number; oldMove: string; newMove: string; newFen: string }>;
  invalidMoveIndices: number[];
}

// Known fixes for specific games - we'll build this up as we fix them
const knownFixes: Record<string, { moveIndex: number; correctMove: string }[]> = {
  'kasparov-immortal': [
    { moveIndex: 24, correctMove: 'cxd4' }, // After Rxd4, Black plays cxd4
  ],
  // Add more as we fix them
};

function correctGame(game: InstructiveGame): GameCorrection {
  const correctedMoves: Array<{ index: number; oldMove: string; newMove: string; newFen: string }> = [];
  const invalidMoveIndices: number[] = [];
  
  if (game.moves.length === 0) {
    return {
      gameId: game.id,
      dayNumber: game.dayNumber,
      correctedMoves: [],
      invalidMoveIndices: [],
    };
  }
  
  const chess = new Chess();
  const knownGameFixes = knownFixes[game.id] || [];
  
  for (let i = 0; i < game.moves.length; i++) {
    const annotatedMove = game.moves[i];
    let moveToTry = annotatedMove.move;
    
    // Check if we have a known fix for this move
    const knownFix = knownGameFixes.find(f => f.moveIndex === i);
    if (knownFix) {
      moveToTry = knownFix.correctMove;
    }
    
    const normalizedMove = normalizeMove(moveToTry);
    
    try {
      let moveResult = chess.move(normalizedMove);
      
      if (!moveResult) {
        const matchingMove = findMatchingMove(chess, moveToTry);
        if (matchingMove) {
          moveResult = chess.move(matchingMove);
          if (matchingMove !== annotatedMove.move) {
            correctedMoves.push({
              index: i,
              oldMove: annotatedMove.move,
              newMove: matchingMove,
              newFen: chess.fen(),
            });
          }
        } else {
          invalidMoveIndices.push(i);
          break;
        }
      }
      
      if (moveResult) {
        const correctFen = chess.fen();
        const storedFenParts = annotatedMove.fen.split(' ').slice(0, 4);
        const correctFenParts = correctFen.split(' ').slice(0, 4);
        if (storedFenParts.join(' ') !== correctFenParts.join(' ')) {
          correctedMoves.push({
            index: i,
            oldMove: annotatedMove.move,
            newMove: moveResult.san,
            newFen: correctFen,
          });
        }
      }
    } catch (e) {
      invalidMoveIndices.push(i);
      break;
    }
  }
  
  return {
    gameId: game.id,
    dayNumber: game.dayNumber,
    correctedMoves,
    invalidMoveIndices,
  };
}

async function main() {
  console.log('\n🔧 Systematically Correcting All Games...\n');
  
  const gamesWithMoves = allInstructiveGames.filter(g => g.moves.length > 0);
  const corrections: GameCorrection[] = [];
  
  for (const game of gamesWithMoves) {
    const correction = correctGame(game);
    corrections.push(correction);
    
    if (correction.correctedMoves.length > 0 || correction.invalidMoveIndices.length > 0) {
      if (correction.invalidMoveIndices.length > 0) {
        console.log(`⚠️  Day ${correction.dayNumber}: ${game.title} - ${correction.invalidMoveIndices.length} invalid move(s)`);
      } else {
        console.log(`✅ Day ${correction.dayNumber}: ${game.title} - ${correction.correctedMoves.length} correction(s)`);
      }
    }
  }
  
  // Write corrections to file
  const correctionsPath = path.join(__dirname, 'game-corrections-detailed.json');
  fs.writeFileSync(correctionsPath, JSON.stringify(corrections, null, 2));
  
  console.log(`\n📄 Corrections written to: ${correctionsPath}\n`);
  console.log(`Games with corrections: ${corrections.filter(c => c.correctedMoves.length > 0).length}`);
  console.log(`Games with invalid moves: ${corrections.filter(c => c.invalidMoveIndices.length > 0).length}`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});


