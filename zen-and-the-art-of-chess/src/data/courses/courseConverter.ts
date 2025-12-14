/**
 * COURSE CONVERTER
 * Converts ChessPuzzle format to CourseVariation format
 * Validates all moves before conversion
 */

import { Chess } from 'chess.js';
import type { ChessPuzzle, PatternType } from '@/lib/types';
import type { CourseVariation, AnnotatedCourseMove } from './courseTypes';

// ============================================
// MOVE VALIDATION
// ============================================

/**
 * Validate that all moves in a puzzle are legal
 */
export function validatePuzzle(puzzle: ChessPuzzle): boolean {
  try {
    const game = new Chess(puzzle.fen);
    
    for (const move of puzzle.solution) {
      // Try the move directly
      let result = null;
      try {
        result = game.move(move);
      } catch {
        // Try without check symbols
        try {
          result = game.move(move.replace(/[+#]/, ''));
        } catch {
          return false;
        }
      }
      
      if (!result) return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

// ============================================
// THEME DESCRIPTIONS
// ============================================

const themeDescriptions: Record<PatternType, string> = {
  FORK: 'Fork',
  PIN: 'Pin',
  SKEWER: 'Skewer',
  DISCOVERY: 'Discovered Attack',
  DEFLECTION: 'Deflection',
  DECOY: 'Decoy',
  QUIET_MOVE: 'Quiet Move',
  ZWISCHENZUG: 'Zwischenzug',
  BACK_RANK: 'Back Rank',
  MATE_PATTERN: 'Checkmate Pattern',
  SACRIFICE: 'Sacrifice',
  CHECK: 'Check',
  CAPTURE: 'Capture',
  TACTICAL: 'Tactical',
};

const themeExplanations: Partial<Record<PatternType, string>> = {
  FORK: 'This move attacks two pieces at once - the opponent can only save one!',
  PIN: 'Pin the piece to a more valuable target behind it.',
  SKEWER: 'Attack the valuable piece - when it moves, capture what\'s behind.',
  DISCOVERY: 'Moving this piece reveals an attack from the piece behind.',
  DEFLECTION: 'Force the defender away from what it\'s protecting.',
  DECOY: 'Lure the opponent\'s piece to a vulnerable square.',
  QUIET_MOVE: 'Sometimes the strongest move is quiet - no check, no capture.',
  ZWISCHENZUG: 'The in-between move! Insert a stronger threat first.',
  BACK_RANK: 'The back rank is weak! Deliver checkmate.',
  MATE_PATTERN: 'Find the checkmate pattern.',
  SACRIFICE: 'Give up material now for a bigger gain.',
  CHECK: 'Check! The king must respond.',
  CAPTURE: 'Capture material while improving position.',
  TACTICAL: 'Use tactical vision to find the winning move.',
};

const themeTakeaways: Partial<Record<PatternType, string>> = {
  FORK: 'Look for squares where your piece can attack two targets at once.',
  PIN: 'Pinned pieces are paralyzed - pile up on them.',
  SKEWER: 'X-ray attacks work both ways - check then capture.',
  DISCOVERY: 'The moving piece can go anywhere - the real threat is behind.',
  DEFLECTION: 'Every defender has a weakness - find what lures it away.',
  DECOY: 'Sacrifice to drag pieces to wrong squares.',
  QUIET_MOVE: 'When no tactic works, find the move that improves everything.',
  ZWISCHENZUG: 'Before the obvious move, look for something stronger.',
  BACK_RANK: 'Always check for back rank weaknesses - yours and theirs.',
  MATE_PATTERN: 'Pattern recognition is key - know the patterns.',
  SACRIFICE: 'Don\'t fear giving up material for a winning attack.',
};

// ============================================
// PUZZLE TO COURSE VARIATION
// ============================================

/**
 * Convert a ChessPuzzle to a CourseVariation
 * Returns null if validation fails
 */
export function puzzleToCourseVariation(puzzle: ChessPuzzle): CourseVariation | null {
  // Validate first
  if (!validatePuzzle(puzzle)) {
    console.warn(`Skipping invalid puzzle ${puzzle.id}`);
    return null;
  }
  
  try {
    const game = new Chess(puzzle.fen);
    const toMove = game.turn() === 'w' ? 'white' : 'black';
    const primaryTheme = puzzle.themes[0];
    const themeName = themeDescriptions[primaryTheme] || 'Tactical';
    
    // Convert solution moves to annotated moves
    const moves: AnnotatedCourseMove[] = [];
    
    for (let i = 0; i < puzzle.solution.length; i++) {
      const moveSan = puzzle.solution[i];
      const isFirst = i === 0;
      const isLast = i === puzzle.solution.length - 1;
      const isUserMove = i % 2 === 0;
      
      // Make the move to validate
      let result = null;
      try {
        result = game.move(moveSan);
      } catch {
        result = game.move(moveSan.replace(/[+#]/, ''));
      }
      
      if (!result) {
        console.warn(`Invalid move ${moveSan} in puzzle ${puzzle.id}`);
        return null;
      }
      
      // Generate explanation
      let explanation = '';
      if (isFirst) {
        explanation = puzzle.explanation || themeExplanations[primaryTheme] || 'Find the best move.';
      } else if (isUserMove) {
        if (result.san.includes('#')) {
          explanation = 'Checkmate! The pattern is complete.';
        } else if (result.san.includes('+')) {
          explanation = 'Keep up the pressure with check!';
        } else if (result.captured) {
          explanation = 'Capture and continue the attack.';
        } else {
          explanation = `Continue the ${themeName.toLowerCase()}.`;
        }
      } else {
        // Opponent's response
        if (result.captured) {
          explanation = 'Opponent captures, but your combination continues...';
        } else if (result.san.includes('+')) {
          explanation = 'Opponent gives check, but you have a response...';
        } else {
          explanation = 'The best defense, but your attack continues.';
        }
      }
      
      moves.push({
        move: result.san,
        annotation: isUserMove && (isFirst || isLast) ? '!' : undefined,
        explanation,
      });
    }
    
    // Build concept string
    const concept = puzzle.themes.length > 1
      ? `${themeName} combined with ${puzzle.themes.slice(1).map(t => themeDescriptions[t] || t).join(', ')}`
      : themeName;
    
    // Build key takeaway
    const keyTakeaway = themeTakeaways[primaryTheme] || 'Practice this pattern to recognize it in your games.';
    
    return {
      id: `pz-${puzzle.id}`,
      title: puzzle.title || `${themeName} Pattern`,
      fen: puzzle.fen,
      toMove,
      moves,
      concept,
      keyTakeaway,
      difficulty: puzzle.difficulty,
    };
  } catch (e) {
    console.warn(`Error converting puzzle ${puzzle.id}:`, e);
    return null;
  }
}

/**
 * Batch convert puzzles, filtering out invalid ones
 */
export function puzzlesToVariations(puzzles: ChessPuzzle[]): CourseVariation[] {
  return puzzles
    .map(puzzleToCourseVariation)
    .filter((v): v is CourseVariation => v !== null);
}

/**
 * Convert puzzles filtered by themes
 */
export function puzzlesByThemeToVariations(
  puzzles: ChessPuzzle[],
  themes: PatternType[]
): CourseVariation[] {
  return puzzles
    .filter(p => p.themes.some(t => themes.includes(t)))
    .map(puzzleToCourseVariation)
    .filter((v): v is CourseVariation => v !== null);
}

/**
 * Get theme description
 */
export function getThemeDescription(theme: PatternType): string {
  return themeDescriptions[theme] || theme;
}

export default puzzleToCourseVariation;
