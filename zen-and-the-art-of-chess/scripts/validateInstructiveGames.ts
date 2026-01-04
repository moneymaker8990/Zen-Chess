/**
 * Instructive Games Validation Script
 * Validates all instructive games by replaying each move sequence
 * Reports any failures with specific error details including FEN mismatches
 */

import { Chess } from 'chess.js';
import { allInstructiveGames, type InstructiveGame, type AnnotatedMove } from '../src/data/instructiveGames';

interface ValidationError {
  type: 'INVALID_MOVE' | 'FEN_MISMATCH' | 'INVALID_FEN' | 'MOVE_ERROR' | 'GAME_INCOMPLETE';
  moveIndex: number;
  move?: string;
  expectedFen?: string;
  actualFen?: string;
  storedFen?: string;
  error?: string;
  legalMoves?: string[];
}

interface GameValidationResult {
  gameId: string;
  dayNumber: number;
  title: string;
  valid: boolean;
  errors: ValidationError[];
  movesPlayed: number;
  totalMoves: number;
}

// Normalize move notation for chess.js
function normalizeMove(move: string): string {
  return move
    .replace(/0-0-0/g, 'O-O-O')  // Queenside castling
    .replace(/0-0/g, 'O-O')      // Kingside castling
    .replace(/[!?]+/g, '')       // Strip annotations
    .replace(/[+#]/g, '')        // Strip check/checkmate symbols (we'll add them back if needed)
    .trim();
}

// Try to find a matching legal move
function findMatchingMove(game: Chess, expectedMove: string): string | null {
  const legalMoves = game.moves({ verbose: false });
  const normalizedExpected = normalizeMove(expectedMove);
  
  // First try exact match
  if (legalMoves.includes(expectedMove)) {
    return expectedMove;
  }
  
  // Try normalized match
  const normalizedMatch = legalMoves.find(lm => normalizeMove(lm) === normalizedExpected);
  if (normalizedMatch) {
    return normalizedMatch;
  }
  
  // Try matching by destination square for piece moves
  if (/^[NBRQK]/.test(normalizedExpected)) {
    const destExpected = normalizedExpected.slice(-2);
    const pieceExpected = normalizedExpected[0];
    const matchingMove = legalMoves.find(lm => {
      const normalizedLegal = normalizeMove(lm);
      return normalizedLegal[0] === pieceExpected && normalizedLegal.slice(-2) === destExpected;
    });
    if (matchingMove) {
      return matchingMove;
    }
  }
  
  // Try matching by destination for pawn moves
  if (/^[a-h]/.test(normalizedExpected)) {
    const destExpected = normalizedExpected.slice(-2);
    const matchingMove = legalMoves.find(lm => {
      const normalizedLegal = normalizeMove(lm);
      return normalizedLegal.slice(-2) === destExpected && /^[a-h]/.test(normalizedLegal);
    });
    if (matchingMove) {
      return matchingMove;
    }
  }
  
  return null;
}

// Validate a single game
function validateGame(game: InstructiveGame): GameValidationResult {
  const errors: ValidationError[] = [];
  
  // Skip games with no moves
  if (game.moves.length === 0) {
    return {
      gameId: game.id,
      dayNumber: game.dayNumber,
      title: game.title,
      valid: true,
      errors: [],
      movesPlayed: 0,
      totalMoves: 0,
    };
  }
  
  // Start from initial position
  const chess = new Chess();
  
  // Play through each move
  for (let i = 0; i < game.moves.length; i++) {
    const annotatedMove = game.moves[i];
    const rawMove = annotatedMove.move;
    const storedFen = annotatedMove.fen;
    
    // Normalize the move
    const normalizedMove = normalizeMove(rawMove);
    
    try {
      // Try to make the move
      let moveResult = chess.move(normalizedMove);
      
      // If that failed, try to find a matching legal move
      if (!moveResult) {
        const matchingMove = findMatchingMove(chess, rawMove);
        if (matchingMove) {
          moveResult = chess.move(matchingMove);
        }
      }
      
      if (!moveResult) {
        // Move is invalid
        const legalMoves = chess.moves();
        errors.push({
          type: 'INVALID_MOVE',
          moveIndex: i,
          move: rawMove,
          expectedFen: chess.fen(),
          legalMoves: legalMoves.slice(0, 10),
        });
        // Stop here - can't continue with invalid position
        break;
      }
      
      // Get the FEN after the move
      const actualFen = chess.fen();
      
      // Compare with stored FEN - only compare the position (first 4 parts)
      // The position, active color, castling rights, and en passant square
      // Move counters can differ and are not critical
      const normalizeFenForComparison = (fen: string) => {
        const parts = fen.split(' ');
        // Only compare: position, active color, castling, en passant
        // Ignore halfmove clock and fullmove number
        return parts.slice(0, 4).join(' ');
      };
      
      const normalizedStored = normalizeFenForComparison(storedFen);
      const normalizedActual = normalizeFenForComparison(actualFen);
      
      if (normalizedStored !== normalizedActual) {
        // FEN mismatch - this is a critical error
        errors.push({
          type: 'FEN_MISMATCH',
          moveIndex: i,
          move: rawMove,
          storedFen: storedFen,
          actualFen: actualFen,
        });
      }
      
    } catch (e) {
      // Error making the move
      errors.push({
        type: 'MOVE_ERROR',
        moveIndex: i,
        move: rawMove,
        error: e instanceof Error ? e.message : String(e),
        expectedFen: chess.fen(),
      });
      // Stop here - can't continue with invalid position
      break;
    }
  }
  
  // Check if game is complete (should end in checkmate or draw)
  const isGameOver = chess.isGameOver();
  const isCheckmate = chess.isCheckmate();
  const isDraw = chess.isDraw();
  
  // If game has a result but isn't over, that's an issue
  if (game.result !== '1/2-1/2' && !isCheckmate && game.moves.length > 0) {
    // This might be okay if the game was resigned, but we'll note it
    // Actually, let's not flag this as an error - games can be incomplete in the data
  }
  
  return {
    gameId: game.id,
    dayNumber: game.dayNumber,
    title: game.title,
    valid: errors.length === 0,
    errors,
    movesPlayed: game.moves.length,
    totalMoves: game.moves.length,
  };
}

// Main validation function
async function main() {
  console.log('\n🔍 Validating All Instructive Games...\n');
  
  const gamesWithMoves = allInstructiveGames.filter(g => g.moves.length > 0);
  console.log(`Found ${gamesWithMoves.length} games with moves out of ${allInstructiveGames.length} total games\n`);
  
  const results: GameValidationResult[] = [];
  let totalErrors = 0;
  
  for (const game of gamesWithMoves) {
    const result = validateGame(game);
    results.push(result);
    
    if (!result.valid) {
      totalErrors += result.errors.length;
      console.log(`❌ Day ${result.dayNumber}: ${result.title}`);
      console.log(`   Game ID: ${result.gameId}`);
      console.log(`   Errors: ${result.errors.length}`);
      
      for (const error of result.errors) {
        console.log(`   - Move ${error.moveIndex + 1} (${error.move}): ${error.type}`);
        if (error.type === 'INVALID_MOVE') {
          console.log(`     Legal moves: ${error.legalMoves?.slice(0, 5).join(', ')}...`);
        } else if (error.type === 'FEN_MISMATCH') {
          console.log(`     Stored FEN: ${error.storedFen?.substring(0, 50)}...`);
          console.log(`     Actual FEN:  ${error.actualFen?.substring(0, 50)}...`);
        } else if (error.type === 'MOVE_ERROR') {
          console.log(`     Error: ${error.error}`);
        }
      }
      console.log('');
    }
  }
  
  // Summary
  const validGames = results.filter(r => r.valid).length;
  const invalidGames = results.filter(r => !r.valid).length;
  
  console.log('\n' + '='.repeat(60));
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total games with moves: ${gamesWithMoves.length}`);
  console.log(`✅ Valid games: ${validGames}`);
  console.log(`❌ Invalid games: ${invalidGames}`);
  console.log(`Total errors found: ${totalErrors}`);
  console.log('='.repeat(60) + '\n');
  
  // List all invalid games
  if (invalidGames > 0) {
    console.log('Invalid Games:');
    results
      .filter(r => !r.valid)
      .forEach(r => {
        console.log(`  - Day ${r.dayNumber}: ${r.title} (${r.errors.length} errors)`);
      });
    console.log('');
  }
  
  // Return non-zero exit code if there are errors
  if (totalErrors > 0) {
    process.exit(1);
  }
}

// Run the validation
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});


