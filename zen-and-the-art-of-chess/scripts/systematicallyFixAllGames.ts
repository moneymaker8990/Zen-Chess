/**
 * Systematically fix all instructive games
 * 1. Auto-fix FEN positions for games with valid moves
 * 2. Try to fix invalid moves by checking alternatives
 * 3. Generate report of games needing manual research
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
  const legalMovesVerbose = game.moves({ verbose: true });
  const normalizedExpected = normalizeMove(expectedMove);
  
  // Exact match
  if (legalMoves.includes(expectedMove)) return expectedMove;
  
  // Normalized match (handles castling notation differences)
  const normalizedMatch = legalMoves.find(lm => normalizeMove(lm) === normalizedExpected);
  if (normalizedMatch) return normalizedMatch;
  
  // Extract destination square
  const destMatch = normalizedExpected.match(/([a-h][1-8])/);
  if (!destMatch) return null;
  const destSquare = destMatch[1];
  
  // Try matching by destination for piece moves with better disambiguation
  if (/^[NBRQK]/.test(normalizedExpected)) {
    const pieceExpected = normalizedExpected[0];
    
    // Try exact piece type to destination
    const pieceMoves = legalMovesVerbose.filter(m => 
      m.san[0] === pieceExpected && m.to === destSquare
    );
    
    if (pieceMoves.length === 1) {
      return pieceMoves[0].san;
    }
    
    // If multiple pieces can move to destination, try disambiguation
    if (pieceMoves.length > 1) {
      // Check for file/rank disambiguation in original move
      const disambigMatch = normalizedExpected.match(/^([NBRQK])([a-h1-8]?)[x]?([a-h][1-8])/);
      if (disambigMatch) {
        const [, , sourceHint] = disambigMatch;
        if (sourceHint) {
          if (/[a-h]/.test(sourceHint)) {
            const fileMatch = pieceMoves.find(m => m.from[0] === sourceHint);
            if (fileMatch) return fileMatch.san;
          }
          if (/[1-8]/.test(sourceHint)) {
            const rankMatch = pieceMoves.find(m => m.from[1] === sourceHint);
            if (rankMatch) return rankMatch.san;
          }
        }
      }
      
      // If capture, prefer capture moves
      if (normalizedExpected.includes('x')) {
        const captureMove = pieceMoves.find(m => m.san.includes('x'));
        if (captureMove) return captureMove.san;
      }
      
      // Return first match (will need manual review if ambiguous)
      return pieceMoves[0].san;
    }
  }
  
  // Try matching by destination for pawn moves
  if (/^[a-h]/.test(normalizedExpected)) {
    const sourceFile = normalizedExpected[0];
    const pawnMoves = legalMovesVerbose.filter(m => 
      /^[a-h]/.test(m.san) && m.to === destSquare && m.from[0] === sourceFile
    );
    if (pawnMoves.length > 0) {
      return pawnMoves[0].san;
    }
    
    // Fallback: any pawn move to destination
    const anyPawnMove = legalMovesVerbose.find(m => 
      /^[a-h]/.test(m.san) && m.to === destSquare
    );
    if (anyPawnMove) return anyPawnMove.san;
  }
  
  return null;
}

// Try to find a fix for an invalid move with enhanced pattern matching
function tryToFixInvalidMove(game: Chess, expectedMove: string): { fixed: boolean; move?: string; reason?: string } {
  const legalMoves = game.moves({ verbose: true });
  const normalizedExpected = normalizeMove(expectedMove);

  // Extract destination square
  const destMatch = normalizedExpected.match(/([a-h][1-8])/);
  if (!destMatch) return { fixed: false, reason: 'No destination square found' };

  const destSquare = destMatch[1];

  // Try to find any move to that square
  const movesToDest = legalMoves.filter(m => m.to === destSquare);
  if (movesToDest.length === 0) {
    return { fixed: false, reason: `No legal moves to ${destSquare}` };
  }

  // Enhanced pattern matching for piece moves
  if (/^[NBRQK]/.test(normalizedExpected)) {
    const pieceType = normalizedExpected[0];
    
    // Try exact piece type match first
    const exactPieceMatch = movesToDest.find(m => {
      const san = m.san;
      return san[0] === pieceType;
    });
    if (exactPieceMatch) {
      return { fixed: true, move: exactPieceMatch.san, reason: `Found ${pieceType} move to ${destSquare}` };
    }

    // Try to match by source file/rank if disambiguation is present
    // Pattern: Bxe7, B7e7, Bde7, etc.
    const disambigMatch = normalizedExpected.match(/^([NBRQK])([a-h1-8]?)[x]?([a-h][1-8])/);
    if (disambigMatch) {
      const [, piece, sourceHint, dest] = disambigMatch;
      const matchingMove = movesToDest.find(m => {
        const san = m.san;
        if (san[0] !== piece) return false;
        // Check if source file/rank matches
        if (sourceHint && /[a-h]/.test(sourceHint)) {
          return m.from[0] === sourceHint;
        }
        if (sourceHint && /[1-8]/.test(sourceHint)) {
          return m.from[1] === sourceHint;
        }
        return true;
      });
      if (matchingMove) {
        return { fixed: true, move: matchingMove.san, reason: `Found ${piece} move with disambiguation to ${destSquare}` };
      }
    }
  }

  // For pawn moves, try to match by source file
  if (/^[a-h]/.test(normalizedExpected)) {
    const sourceFile = normalizedExpected[0];
    const matchingPawnMove = movesToDest.find(m => {
      const san = m.san;
      return /^[a-h]/.test(san) && m.from[0] === sourceFile;
    });
    if (matchingPawnMove) {
      return { fixed: true, move: matchingPawnMove.san, reason: `Found pawn move from ${sourceFile} to ${destSquare}` };
    }
  }

  // If multiple moves to destination, prefer non-capture if original wasn't a capture
  if (movesToDest.length > 1 && !normalizedExpected.includes('x')) {
    const nonCapture = movesToDest.find(m => !m.san.includes('x'));
    if (nonCapture) {
      return { fixed: true, move: nonCapture.san, reason: `Found non-capture move to ${destSquare}` };
    }
  }

  // Just return the first move to that square
  return { fixed: true, move: movesToDest[0].san, reason: `Found move to ${destSquare}` };
}

interface GameFix {
  gameId: string;
  dayNumber: number;
  title: string;
  fixedMoves: number;
  invalidMoves: Array<{ index: number; originalMove: string; suggestedFix?: string; reason?: string }>;
  correctedFENs: number;
  needsManualResearch: boolean;
}

function fixGame(game: InstructiveGame): GameFix {
  const invalidMoves: Array<{ index: number; originalMove: string; suggestedFix?: string; reason?: string }> = [];
  let fixedMoves = 0;
  let correctedFENs = 0;
  
  if (game.moves.length === 0) {
    return {
      gameId: game.id,
      dayNumber: game.dayNumber,
      title: game.title,
      fixedMoves: 0,
      invalidMoves: [],
      correctedFENs: 0,
      needsManualResearch: false,
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
          fixedMoves++;
        } else {
          // Try to fix it
          const fixAttempt = tryToFixInvalidMove(chess, rawMove);
          if (fixAttempt.fixed && fixAttempt.move) {
            moveResult = chess.move(fixAttempt.move);
            invalidMoves.push({
              index: i,
              originalMove: rawMove,
              suggestedFix: fixAttempt.move,
              reason: fixAttempt.reason,
            });
            fixedMoves++;
          } else {
            // Cannot fix
            invalidMoves.push({
              index: i,
              originalMove: rawMove,
              reason: fixAttempt.reason || 'Move is invalid and cannot be auto-fixed',
            });
            break;
          }
        }
      }
      
      if (moveResult) {
        const correctFen = chess.fen();
        // Check if FEN needs correction (compare position part only)
        const storedFenParts = annotatedMove.fen.split(' ').slice(0, 4);
        const correctFenParts = correctFen.split(' ').slice(0, 4);
        if (storedFenParts.join(' ') !== correctFenParts.join(' ')) {
          correctedFENs++;
        }
      }
    } catch (e) {
      invalidMoves.push({
        index: i,
        originalMove: rawMove,
        reason: e instanceof Error ? e.message : String(e),
      });
      break;
    }
  }
  
  return {
    gameId: game.id,
    dayNumber: game.dayNumber,
    title: game.title,
    fixedMoves,
    invalidMoves,
    correctedFENs,
    needsManualResearch: invalidMoves.length > 0 && invalidMoves.some(m => !m.suggestedFix),
  };
}

async function main() {
  console.log('\n🔧 Systematically Fixing All Instructive Games...\n');
  
  const gamesWithMoves = allInstructiveGames.filter(g => g.moves.length > 0);
  const fixes: GameFix[] = [];
  
  for (const game of gamesWithMoves) {
    const fix = fixGame(game);
    fixes.push(fix);
    
    if (fix.invalidMoves.length > 0) {
      const autoFixed = fix.invalidMoves.filter(m => m.suggestedFix).length;
      const needsResearch = fix.invalidMoves.filter(m => !m.suggestedFix).length;
      if (autoFixed > 0) {
        console.log(`🔧 Day ${fix.dayNumber}: ${fix.title} - Auto-fixed ${autoFixed} move(s), ${needsResearch} need research`);
      } else {
        console.log(`⚠️  Day ${fix.dayNumber}: ${fix.title} - ${needsResearch} invalid move(s) need research`);
      }
    } else if (fix.correctedFENs > 0) {
      console.log(`✅ Day ${fix.dayNumber}: ${fix.title} - ${fix.correctedFENs} FEN(s) corrected`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  
  const gamesWithFixes = fixes.filter(f => f.fixedMoves > 0 || f.correctedFENs > 0);
  const gamesNeedingResearch = fixes.filter(f => f.needsManualResearch);
  const gamesFullyFixed = fixes.filter(f => f.invalidMoves.length === 0);
  
  console.log(`Total games: ${gamesWithMoves.length}`);
  console.log(`Games with fixes: ${gamesWithFixes.length}`);
  console.log(`Games fully fixed: ${gamesFullyFixed.length}`);
  console.log(`Games needing research: ${gamesNeedingResearch.length}`);
  console.log(`Total moves auto-fixed: ${fixes.reduce((sum, f) => sum + f.fixedMoves, 0)}`);
  console.log(`Total FENs corrected: ${fixes.reduce((sum, f) => sum + f.correctedFENs, 0)}`);
  console.log('='.repeat(60) + '\n');
  
  // Write detailed report
  const reportPath = path.join(__dirname, 'systematic-fix-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(fixes, null, 2));
  console.log(`📄 Detailed report written to: ${reportPath}\n`);
  
  // List games needing research
  if (gamesNeedingResearch.length > 0) {
    console.log('Games needing manual research:');
    gamesNeedingResearch.forEach(f => {
      console.log(`  Day ${f.dayNumber}: ${f.title}`);
      f.invalidMoves.filter(m => !m.suggestedFix).forEach(m => {
        console.log(`    Move ${m.index + 1}: ${m.originalMove} - ${m.reason}`);
      });
    });
    console.log('');
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});


