/**
 * Apply fixes to instructive games
 * - Fixes FEN positions by replaying moves
 * - Attempts to fix invalid moves by trying alternative notations
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

// Try to fix a move by checking all legal moves
function tryToFixMove(game: Chess, expectedMove: string): { fixed: boolean; move?: string } {
  const legalMoves = game.moves({ verbose: true });
  const normalizedExpected = normalizeMove(expectedMove);
  
  // Extract destination square
  const destMatch = normalizedExpected.match(/([a-h][1-8])/);
  if (!destMatch) return { fixed: false };
  
  const destSquare = destMatch[1];
  
  // Try to find a move to that square
  const matchingMove = legalMoves.find(m => m.to === destSquare);
  if (matchingMove) {
    return { fixed: true, move: matchingMove.san };
  }
  
  return { fixed: false };
}

interface GameFix {
  gameId: string;
  dayNumber: number;
  correctedMoves: Array<{ index: number; move: string; fen: string }>;
  invalidMoves: Array<{ index: number; move: string; position: string; legalMoves: string[] }>;
}

function fixGame(game: InstructiveGame): GameFix {
  const correctedMoves: Array<{ index: number; move: string; fen: string }> = [];
  const invalidMoves: Array<{ index: number; move: string; position: string; legalMoves: string[] }> = [];
  
  if (game.moves.length === 0) {
    return {
      gameId: game.id,
      dayNumber: game.dayNumber,
      correctedMoves: [],
      invalidMoves: [],
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
        } else {
          // Try to fix it
          const fixAttempt = tryToFixMove(chess, rawMove);
          if (fixAttempt.fixed && fixAttempt.move) {
            moveResult = chess.move(fixAttempt.move);
            correctedMoves.push({
              index: i,
              move: fixAttempt.move,
              fen: chess.fen(),
            });
            continue;
          } else {
            // Invalid move
            invalidMoves.push({
              index: i,
              move: rawMove,
              position: chess.fen(),
              legalMoves: chess.moves().slice(0, 10),
            });
            break;
          }
        }
      }
      
      if (moveResult) {
        const correctFen = chess.fen();
        correctedMoves.push({
          index: i,
          move: moveResult.san,
          fen: correctFen,
        });
      }
    } catch (e) {
      invalidMoves.push({
        index: i,
        move: rawMove,
        position: chess.fen(),
        legalMoves: chess.moves().slice(0, 10),
      });
      break;
    }
  }
  
  return {
    gameId: game.id,
    dayNumber: game.dayNumber,
    correctedMoves,
    invalidMoves,
  };
}

async function main() {
  console.log('\n🔧 Applying fixes to all instructive games...\n');
  
  const gamesWithMoves = allInstructiveGames.filter(g => g.moves.length > 0);
  const allFixes: GameFix[] = [];
  
  for (const game of gamesWithMoves) {
    const fix = fixGame(game);
    allFixes.push(fix);
    
    if (fix.invalidMoves.length > 0) {
      console.log(`⚠️  Day ${fix.dayNumber}: ${game.title} - ${fix.invalidMoves.length} invalid move(s)`);
    } else if (fix.correctedMoves.length > 0) {
      console.log(`✅ Day ${fix.dayNumber}: ${game.title} - ${fix.correctedMoves.length} moves corrected`);
    }
  }
  
  // Write fixes to JSON
  const jsonPath = path.join(__dirname, 'game-fixes.json');
  fs.writeFileSync(jsonPath, JSON.stringify(allFixes, null, 2));
  console.log(`\n📄 Fixes written to: ${jsonPath}\n`);
  
  const gamesWithInvalidMoves = allFixes.filter(f => f.invalidMoves.length > 0);
  console.log(`Games needing manual fix: ${gamesWithInvalidMoves.length}`);
  console.log(`Games with FEN corrections: ${allFixes.filter(f => f.invalidMoves.length === 0 && f.correctedMoves.length > 0).length}`);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});


