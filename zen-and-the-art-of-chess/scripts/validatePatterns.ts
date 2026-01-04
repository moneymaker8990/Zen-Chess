/**
 * Pattern Validation Script
 * Validates all positional patterns by replaying each move sequence
 * Reports any failures with specific error details
 */

import { Chess } from 'chess.js';
import { enhancedPatterns, type EnhancedPattern, type AnnotatedMove } from '../src/data/positional/enhancedPatterns';

interface ValidationError {
  type: 'INVALID_MOVE' | 'INVALID_FEN' | 'MOVE_ERROR' | 'INCOMPLETE_SEQUENCE';
  moveIndex: number;
  move?: string;
  expectedFen?: string;
  error?: string;
  legalMoves?: string[];
}

interface PatternValidationResult {
  patternId: string;
  patternTitle: string;
  category: string;
  valid: boolean;
  errors: ValidationError[];
  movesPlayed: number;
  totalMoves: number;
}

// Normalize move notation for chess.js
function normalizeMove(move: string): string {
  return move
    .replace(/0-0-0/g, 'O-O-O')  // Queenside castling
    .replace(/0-0/g, 'O-O')       // Kingside castling
    .replace(/[!?]+/g, '')       // Strip annotations
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
  if (legalMoves.includes(normalizedExpected)) {
    return normalizedExpected;
  }
  
  // Try match without check/checkmate symbols
  const withoutCheck = expectedMove.replace(/[+#]/g, '');
  if (legalMoves.includes(withoutCheck)) {
    return withoutCheck;
  }
  
  // Try normalized without check
  const normalizedWithoutCheck = normalizedExpected.replace(/[+#]/g, '');
  if (legalMoves.includes(normalizedWithoutCheck)) {
    return normalizedWithoutCheck;
  }
  
  // Try to find by piece and destination
  const verboseMoves = game.moves({ verbose: true });
  for (const legalMove of verboseMoves) {
    const legalSan = legalMove.san.replace(/[+#]/g, '');
    const expectedSan = expectedMove.replace(/[+#]/g, '').trim();
    
    if (legalSan === expectedSan || legalSan === normalizedWithoutCheck) {
      return legalMove.san;
    }
  }
  
  return null;
}

// Validate a single pattern
function validatePattern(pattern: EnhancedPattern): PatternValidationResult {
  const result: PatternValidationResult = {
    patternId: pattern.id,
    patternTitle: pattern.title,
    category: pattern.category,
    valid: true,
    errors: [],
    movesPlayed: 0,
    totalMoves: pattern.mainLine.length,
  };

  // Validate starting FEN
  let game: Chess;
  try {
    game = new Chess(pattern.fen);
  } catch (error) {
    result.valid = false;
    result.errors.push({
      type: 'INVALID_FEN',
      moveIndex: -1,
      error: `Invalid starting FEN: ${error instanceof Error ? error.message : 'Unknown error'}`,
      expectedFen: pattern.fen,
    });
    return result;
  }

  // Validate each move in sequence
  for (let i = 0; i < pattern.mainLine.length; i++) {
    const annotatedMove = pattern.mainLine[i];
    const rawMove = annotatedMove.move;
    
    // Skip if move is empty
    if (!rawMove || rawMove.trim() === '') {
      result.errors.push({
        type: 'INCOMPLETE_SEQUENCE',
        moveIndex: i,
        move: rawMove || '(empty)',
        error: 'Move is empty',
        expectedFen: game.fen(),
      });
      result.valid = false;
      break;
    }

    // Normalize the move
    const normalizedMove = normalizeMove(rawMove);
    
    try {
      // Try to make the move
      let moveResult = game.move(normalizedMove);
      
      // If that failed, try to find a matching legal move
      if (!moveResult) {
        const matchingMove = findMatchingMove(game, rawMove);
        if (matchingMove) {
          moveResult = game.move(matchingMove);
        }
      }
      
      if (!moveResult) {
        // Move is invalid
        const legalMoves = game.moves();
        result.valid = false;
        result.errors.push({
          type: 'INVALID_MOVE',
          moveIndex: i,
          move: rawMove,
          error: 'Move is not legal from current position',
          expectedFen: game.fen(),
          legalMoves: legalMoves.slice(0, 20), // Limit to first 20 for readability
        });
        // Stop here - can't continue with invalid position
        break;
      }
      
      // Move succeeded
      result.movesPlayed++;
      
    } catch (err) {
      result.valid = false;
      result.errors.push({
        type: 'MOVE_ERROR',
        moveIndex: i,
        move: rawMove,
        error: err instanceof Error ? err.message : 'Unknown error',
        expectedFen: game.fen(),
        legalMoves: game.moves().slice(0, 20),
      });
      break;
    }
  }

  return result;
}

// Main validation function
function validateAllPatterns() {
  console.log('Validating all positional patterns...\n');
  
  const results = enhancedPatterns.map(validatePattern);
  const validPatterns = results.filter(r => r.valid);
  const invalidPatterns = results.filter(r => !r.valid);
  
  // Summary by category
  const categoryStats: Record<string, { total: number; valid: number; invalid: number }> = {};
  
  results.forEach(result => {
    if (!categoryStats[result.category]) {
      categoryStats[result.category] = { total: 0, valid: 0, invalid: 0 };
    }
    categoryStats[result.category].total++;
    if (result.valid) {
      categoryStats[result.category].valid++;
    } else {
      categoryStats[result.category].invalid++;
    }
  });
  
  // Print summary
  console.log('='.repeat(60));
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total patterns: ${enhancedPatterns.length}`);
  console.log(`Valid patterns: ${validPatterns.length}`);
  console.log(`Invalid patterns: ${invalidPatterns.length}`);
  console.log(`\nSuccess rate: ${((validPatterns.length / enhancedPatterns.length) * 100).toFixed(1)}%\n`);
  
  // Print category breakdown
  console.log('Category Breakdown:');
  console.log('-'.repeat(60));
  Object.entries(categoryStats)
    .sort((a, b) => b[1].invalid - a[1].invalid) // Sort by invalid count
    .forEach(([category, stats]) => {
      const status = stats.invalid === 0 ? '✓' : '✗';
      console.log(`${status} ${category.padEnd(25)} ${stats.valid}/${stats.total} valid (${stats.invalid} broken)`);
    });
  
  // Print detailed errors for invalid patterns
  if (invalidPatterns.length > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('DETAILED ERRORS');
    console.log('='.repeat(60));
    
    invalidPatterns.forEach(result => {
      console.log(`\n❌ ${result.patternTitle} (${result.patternId})`);
      console.log(`   Category: ${result.category}`);
      console.log(`   Moves played: ${result.movesPlayed}/${result.totalMoves}`);
      
      result.errors.forEach(err => {
        console.log(`   Error at move ${err.moveIndex + 1}: ${err.move || 'N/A'}`);
        console.log(`   Type: ${err.type}`);
        console.log(`   Error: ${err.error}`);
        if (err.legalMoves && err.legalMoves.length > 0) {
          console.log(`   Legal moves: ${err.legalMoves.slice(0, 10).join(', ')}${err.legalMoves.length > 10 ? '...' : ''}`);
        }
      });
    });
  }
  
  // Return results for programmatic use
  return {
    total: enhancedPatterns.length,
    valid: validPatterns.length,
    invalid: invalidPatterns.length,
    results,
    categoryStats,
  };
}

// Run validation if script is executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('validatePatterns')) {
  validateAllPatterns();
}

export { validatePattern, validateAllPatterns, type PatternValidationResult, type ValidationError };

