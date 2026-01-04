// ============================================
// PATTERN SCHEMA & VALIDATION
// Strict type definitions and validation for pattern data
// ============================================

import { Chess } from 'chess.js';

// ============================================
// SQUARE VALIDATION
// ============================================

const VALID_FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
const VALID_RANKS = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;

export type ChessFile = typeof VALID_FILES[number];
export type ChessRank = typeof VALID_RANKS[number];
export type ChessSquare = `${ChessFile}${ChessRank}`;

/**
 * Validates that a string is a valid chess square (a1-h8)
 */
export function isValidSquare(square: string): square is ChessSquare {
  if (typeof square !== 'string' || square.length !== 2) return false;
  const file = square[0] as ChessFile;
  const rank = square[1] as ChessRank;
  return VALID_FILES.includes(file) && VALID_RANKS.includes(rank);
}

// ============================================
// ARROW SCHEMA
// ============================================

export type ArrowColor = 'green' | 'red' | 'yellow' | 'blue' | 'primary' | string;

export interface PatternArrow {
  from: ChessSquare;
  to: ChessSquare;
  color?: ArrowColor;
}

export interface ArrowValidationError {
  type: 'invalid_from' | 'invalid_to' | 'same_square';
  arrow: { from: string; to: string; color?: string };
  message: string;
}

/**
 * Validates an arrow definition
 */
export function validateArrow(arrow: { from: string; to: string; color?: string }): ArrowValidationError | null {
  if (!isValidSquare(arrow.from)) {
    return {
      type: 'invalid_from',
      arrow,
      message: `Invalid 'from' square: "${arrow.from}" is not a valid chess square (a1-h8)`,
    };
  }
  if (!isValidSquare(arrow.to)) {
    return {
      type: 'invalid_to',
      arrow,
      message: `Invalid 'to' square: "${arrow.to}" is not a valid chess square (a1-h8)`,
    };
  }
  if (arrow.from === arrow.to) {
    return {
      type: 'same_square',
      arrow,
      message: `Arrow from "${arrow.from}" to "${arrow.to}" - cannot point to same square`,
    };
  }
  return null;
}

// ============================================
// MOVE STEP SCHEMA
// ============================================

export interface AnnotatedMoveStep {
  move: string;                    // SAN notation (e.g., "e4", "Nxf3+")
  isMainLine: boolean;
  annotation?: string;             // "!", "!!", "?", etc.
  explanation: string;
  arrows?: PatternArrow[];
  highlights?: ChessSquare[];
  alternativeMoves?: {
    move: string;
    evaluation: 'good' | 'better' | 'equal' | 'dubious' | 'bad';
    explanation: string;
  }[];
  conceptTag?: string;
}

export interface MoveValidationError {
  type: 'invalid_move' | 'illegal_move' | 'invalid_arrow' | 'invalid_highlight';
  moveIndex: number;
  move: string;
  details: string;
}

// ============================================
// PATTERN SCHEMA
// ============================================

export interface PatternSchema {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  fen: string;
  toMove: 'white' | 'black';
  introduction: string;
  keyIdeas: string[];
  mainLine: AnnotatedMoveStep[];
  summary: string;
  keyTakeaways: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedMinutes: number;
  source?: string;
  memoryTip?: string;
  practicePositions?: string[];
  playerExample?: {
    white: string;
    black: string;
    event?: string;
    year?: number;
  };
  themes?: string[];
}

// ============================================
// VALIDATION RESULT TYPES
// ============================================

export interface PatternValidationResult {
  valid: boolean;
  patternId: string;
  errors: PatternError[];
  warnings: PatternWarning[];
}

export interface PatternError {
  type: 'fen_invalid' | 'move_invalid' | 'move_illegal' | 'arrow_invalid' | 'highlight_invalid' | 'missing_field';
  location: string;
  message: string;
  details?: unknown;
}

export interface PatternWarning {
  type: 'empty_explanation' | 'orphan_arrow' | 'missing_takeaway';
  location: string;
  message: string;
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Validates that a FEN string is parseable
 */
export function validateFEN(fen: string): { valid: boolean; error?: string } {
  try {
    new Chess(fen);
    return { valid: true };
  } catch (error) {
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : 'Invalid FEN string' 
    };
  }
}

/**
 * Validates that a move is legal from a given position
 */
export function validateMove(fen: string, move: string): { valid: boolean; error?: string } {
  try {
    const game = new Chess(fen);
    const result = game.move(move);
    if (result) {
      return { valid: true };
    }
    return { valid: false, error: `Move "${move}" is not legal in this position` };
  } catch (error) {
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : `Invalid move: ${move}` 
    };
  }
}

/**
 * Validates an entire pattern's main line from start to finish
 */
export function validateMainLine(fen: string, mainLine: AnnotatedMoveStep[]): MoveValidationError[] {
  const errors: MoveValidationError[] = [];
  const game = new Chess(fen);
  
  for (let i = 0; i < mainLine.length; i++) {
    const step = mainLine[i];
    
    // Validate the move itself
    try {
      const result = game.move(step.move);
      if (!result) {
        errors.push({
          type: 'illegal_move',
          moveIndex: i,
          move: step.move,
          details: `Move "${step.move}" is not legal from position: ${game.fen()}`,
        });
        // Can't continue validation if a move fails
        break;
      }
    } catch (error) {
      errors.push({
        type: 'invalid_move',
        moveIndex: i,
        move: step.move,
        details: error instanceof Error ? error.message : 'Unknown move error',
      });
      break;
    }
    
    // Validate arrows
    if (step.arrows) {
      for (const arrow of step.arrows) {
        const arrowError = validateArrow(arrow);
        if (arrowError) {
          errors.push({
            type: 'invalid_arrow',
            moveIndex: i,
            move: step.move,
            details: arrowError.message,
          });
        }
      }
    }
    
    // Validate highlights
    if (step.highlights) {
      for (const square of step.highlights) {
        if (!isValidSquare(square)) {
          errors.push({
            type: 'invalid_highlight',
            moveIndex: i,
            move: step.move,
            details: `Invalid highlight square: "${square}"`,
          });
        }
      }
    }
  }
  
  return errors;
}

/**
 * Full pattern validation
 */
export function validatePattern(pattern: PatternSchema): PatternValidationResult {
  const errors: PatternError[] = [];
  const warnings: PatternWarning[] = [];
  
  // 1. Validate required fields
  if (!pattern.id) {
    errors.push({
      type: 'missing_field',
      location: 'pattern',
      message: 'Pattern is missing required field: id',
    });
  }
  
  if (!pattern.title) {
    errors.push({
      type: 'missing_field',
      location: 'pattern',
      message: 'Pattern is missing required field: title',
    });
  }
  
  if (!pattern.fen) {
    errors.push({
      type: 'missing_field',
      location: 'pattern',
      message: 'Pattern is missing required field: fen',
    });
  }
  
  // 2. Validate FEN
  if (pattern.fen) {
    const fenResult = validateFEN(pattern.fen);
    if (!fenResult.valid) {
      errors.push({
        type: 'fen_invalid',
        location: 'pattern.fen',
        message: `Invalid FEN: ${fenResult.error}`,
        details: pattern.fen,
      });
    }
  }
  
  // 3. Validate main line
  if (pattern.fen && pattern.mainLine && pattern.mainLine.length > 0) {
    const moveErrors = validateMainLine(pattern.fen, pattern.mainLine);
    for (const moveError of moveErrors) {
      if (moveError.type === 'illegal_move' || moveError.type === 'invalid_move') {
        errors.push({
          type: moveError.type === 'illegal_move' ? 'move_illegal' : 'move_invalid',
          location: `mainLine[${moveError.moveIndex}]`,
          message: moveError.details,
          details: { move: moveError.move, index: moveError.moveIndex },
        });
      } else if (moveError.type === 'invalid_arrow') {
        errors.push({
          type: 'arrow_invalid',
          location: `mainLine[${moveError.moveIndex}].arrows`,
          message: moveError.details,
        });
      } else if (moveError.type === 'invalid_highlight') {
        errors.push({
          type: 'highlight_invalid',
          location: `mainLine[${moveError.moveIndex}].highlights`,
          message: moveError.details,
        });
      }
    }
  }
  
  // 4. Validate practice positions
  if (pattern.practicePositions) {
    for (let i = 0; i < pattern.practicePositions.length; i++) {
      const fen = pattern.practicePositions[i];
      const fenResult = validateFEN(fen);
      if (!fenResult.valid) {
        errors.push({
          type: 'fen_invalid',
          location: `practicePositions[${i}]`,
          message: `Invalid practice position FEN: ${fenResult.error}`,
          details: fen,
        });
      }
    }
  }
  
  // 5. Generate warnings for potential issues
  if (pattern.mainLine) {
    for (let i = 0; i < pattern.mainLine.length; i++) {
      const step = pattern.mainLine[i];
      
      // Warn about empty explanations
      if (!step.explanation || step.explanation.trim().length < 10) {
        warnings.push({
          type: 'empty_explanation',
          location: `mainLine[${i}]`,
          message: `Move "${step.move}" has a very short or missing explanation`,
        });
      }
      
      // Warn about arrows without explanations
      if (step.arrows && step.arrows.length > 0 && !step.explanation) {
        warnings.push({
          type: 'orphan_arrow',
          location: `mainLine[${i}]`,
          message: `Move "${step.move}" has arrows but no explanation - arrows should be explained`,
        });
      }
    }
  }
  
  // Warn about missing takeaways
  if (!pattern.keyTakeaways || pattern.keyTakeaways.length === 0) {
    warnings.push({
      type: 'missing_takeaway',
      location: 'keyTakeaways',
      message: 'Pattern has no key takeaways - consider adding learning points',
    });
  }
  
  return {
    valid: errors.length === 0,
    patternId: pattern.id || 'unknown',
    errors,
    warnings,
  };
}

// ============================================
// BATCH VALIDATION
// ============================================

export interface ValidationReport {
  totalPatterns: number;
  validPatterns: number;
  invalidPatterns: number;
  totalErrors: number;
  totalWarnings: number;
  results: PatternValidationResult[];
}

/**
 * Validates all patterns and returns a comprehensive report
 */
export function validateAllPatterns(patterns: PatternSchema[]): ValidationReport {
  const results = patterns.map(validatePattern);
  
  return {
    totalPatterns: patterns.length,
    validPatterns: results.filter(r => r.valid).length,
    invalidPatterns: results.filter(r => !r.valid).length,
    totalErrors: results.reduce((sum, r) => sum + r.errors.length, 0),
    totalWarnings: results.reduce((sum, r) => sum + r.warnings.length, 0),
    results,
  };
}

/**
 * Formats a validation report for console output
 */
export function formatValidationReport(report: ValidationReport): string {
  const lines: string[] = [
    '═══════════════════════════════════════════════',
    '        PATTERN VALIDATION REPORT',
    '═══════════════════════════════════════════════',
    '',
    `Total patterns:  ${report.totalPatterns}`,
    `Valid:           ${report.validPatterns} ✓`,
    `Invalid:         ${report.invalidPatterns} ✗`,
    `Total errors:    ${report.totalErrors}`,
    `Total warnings:  ${report.totalWarnings}`,
    '',
  ];
  
  // Add details for invalid patterns
  const invalidResults = report.results.filter(r => !r.valid);
  if (invalidResults.length > 0) {
    lines.push('─────────────────────────────────────────────');
    lines.push('ERRORS:');
    lines.push('');
    
    for (const result of invalidResults) {
      lines.push(`Pattern: ${result.patternId}`);
      for (const error of result.errors) {
        lines.push(`  ✗ [${error.type}] ${error.location}: ${error.message}`);
      }
      lines.push('');
    }
  }
  
  // Add warnings summary
  const resultsWithWarnings = report.results.filter(r => r.warnings.length > 0);
  if (resultsWithWarnings.length > 0) {
    lines.push('─────────────────────────────────────────────');
    lines.push('WARNINGS:');
    lines.push('');
    
    for (const result of resultsWithWarnings) {
      lines.push(`Pattern: ${result.patternId}`);
      for (const warning of result.warnings) {
        lines.push(`  ⚠ [${warning.type}] ${warning.location}: ${warning.message}`);
      }
      lines.push('');
    }
  }
  
  lines.push('═══════════════════════════════════════════════');
  
  return lines.join('\n');
}

export default {
  isValidSquare,
  validateArrow,
  validateFEN,
  validateMove,
  validateMainLine,
  validatePattern,
  validateAllPatterns,
  formatValidationReport,
};



