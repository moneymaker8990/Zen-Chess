/**
 * Lichess Puzzle Converter
 * Converts Lichess puzzle format to our app's ChessPuzzle format
 * Validates all moves are legal using chess.js
 */

import { Chess } from 'chess.js';
import type { PatternType } from '@/lib/types';
import { logger } from '@/lib/logger';

// Theme mapping from Lichess to our PatternType
export const LICHESS_TO_PATTERN: Record<string, PatternType> = {
  'fork': 'FORK',
  'pin': 'PIN',
  'skewer': 'SKEWER',
  'discoveredAttack': 'DISCOVERY',
  'deflection': 'DEFLECTION',
  'attraction': 'DECOY',
  'quietMove': 'QUIET_MOVE',
  'intermezzo': 'ZWISCHENZUG',
  'backRankMate': 'BACK_RANK',
  'mateIn1': 'MATE_PATTERN',
  'mateIn2': 'MATE_PATTERN',
  'mateIn3': 'MATE_PATTERN',
  'mateIn4': 'MATE_PATTERN',
  'mateIn5': 'MATE_PATTERN',
  'smotheredMate': 'MATE_PATTERN',
  'sacrifice': 'SACRIFICE',
  'xRayAttack': 'SKEWER',
  'doubleCheck': 'DISCOVERY',
};

export interface LichessPuzzleRaw {
  id: string;
  fen: string;
  moves: string; // UCI format, space-separated
  themes: string[];
  rating?: number;
}

export interface ConvertedPuzzle {
  id: string;
  fen: string;
  solution: string[];
  themes: PatternType[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  title?: string;
  explanation?: string;
}

/**
 * Convert UCI move notation to SAN using chess.js
 */
export function uciToSan(game: Chess, uci: string): string | null {
  try {
    const from = uci.substring(0, 2);
    const to = uci.substring(2, 4);
    const promotion = uci.length > 4 ? uci[4] : undefined;
    
    const move = game.move({ from, to, promotion });
    if (!move) return null;
    return move.san;
  } catch {
    return null;
  }
}

/**
 * Convert rating to difficulty (1-5)
 */
export function ratingToDifficulty(rating: number): 1 | 2 | 3 | 4 | 5 {
  if (rating < 1000) return 1;
  if (rating < 1400) return 2;
  if (rating < 1800) return 3;
  if (rating < 2200) return 4;
  return 5;
}

/**
 * Map Lichess themes to our PatternType
 */
export function mapLichessThemes(lichessThemes: string[]): PatternType[] {
  const mapped = new Set<PatternType>();
  for (const theme of lichessThemes) {
    const pattern = LICHESS_TO_PATTERN[theme];
    if (pattern) {
      mapped.add(pattern);
    }
  }
  // Default to TACTICAL if no themes matched
  if (mapped.size === 0) {
    mapped.add('TACTICAL');
  }
  return Array.from(mapped);
}

/**
 * Convert a Lichess puzzle (with UCI moves) to our format (with SAN moves)
 * Returns null if any move is invalid
 */
export function convertLichessPuzzle(puzzle: LichessPuzzleRaw): ConvertedPuzzle | null {
  try {
    const game = new Chess(puzzle.fen);
    const uciMoves = puzzle.moves.split(' ').filter(m => m.length > 0);
    const sanMoves: string[] = [];
    
    if (uciMoves.length < 1) return null;
    
    // In Lichess format, the first move is the opponent's move that sets up the puzzle
    // We need to play that move first, then the solution starts
    const setupMove = uciToSan(game, uciMoves[0]);
    if (!setupMove) {
      logger.warn(`Invalid setup move in puzzle ${puzzle.id}`);
      return null;
    }
    
    // Store the position after the setup move (this is the puzzle starting position)
    const puzzleFen = game.fen();
    
    // Now convert the remaining moves (the actual solution)
    for (let i = 1; i < uciMoves.length; i++) {
      const san = uciToSan(game, uciMoves[i]);
      if (!san) {
        logger.warn(`Invalid move ${uciMoves[i]} in puzzle ${puzzle.id}`);
        return null;
      }
      sanMoves.push(san);
    }
    
    if (sanMoves.length === 0) return null;
    
    return {
      id: puzzle.id,
      fen: puzzleFen,
      solution: sanMoves,
      themes: mapLichessThemes(puzzle.themes),
      difficulty: ratingToDifficulty(puzzle.rating || 1500),
      title: generatePuzzleTitle(puzzle.themes),
      explanation: generateExplanation(puzzle.themes),
    };
  } catch (e) {
    logger.warn(`Error converting puzzle ${puzzle.id}:`, e);
    return null;
  }
}

/**
 * Generate a title based on themes
 */
function generatePuzzleTitle(themes: string[]): string {
  const themeNames: Record<string, string> = {
    'fork': 'Fork',
    'pin': 'Pin',
    'skewer': 'Skewer',
    'discoveredAttack': 'Discovered Attack',
    'deflection': 'Deflection',
    'attraction': 'Attraction',
    'quietMove': 'Quiet Move',
    'intermezzo': 'Zwischenzug',
    'backRankMate': 'Back Rank Mate',
    'mateIn1': 'Mate in 1',
    'mateIn2': 'Mate in 2',
    'mateIn3': 'Mate in 3',
    'sacrifice': 'Sacrifice',
    'smotheredMate': 'Smothered Mate',
  };
  
  for (const theme of themes) {
    if (themeNames[theme]) {
      return themeNames[theme];
    }
  }
  return 'Tactical Puzzle';
}

/**
 * Generate an explanation based on themes
 */
function generateExplanation(themes: string[]): string {
  const explanations: Record<string, string> = {
    'fork': 'Attack two pieces at once - the opponent can only save one!',
    'pin': 'Pin the piece to a more valuable target behind it.',
    'skewer': 'Attack the valuable piece - when it moves, capture what\'s behind.',
    'discoveredAttack': 'Move one piece to reveal an attack from the piece behind.',
    'deflection': 'Force the defender away from what it\'s protecting.',
    'attraction': 'Lure the piece to a vulnerable square.',
    'quietMove': 'The strongest move is sometimes quiet - no check, no capture.',
    'intermezzo': 'The in-between move - insert a stronger threat first!',
    'backRankMate': 'The back rank is weak! Deliver checkmate.',
    'mateIn1': 'Find checkmate in one move.',
    'mateIn2': 'Find the forcing sequence to checkmate in two moves.',
    'mateIn3': 'Calculate the checkmate in three moves.',
    'sacrifice': 'Give up material now for a bigger gain.',
    'smotheredMate': 'The king is smothered by its own pieces - knight delivers mate!',
  };
  
  for (const theme of themes) {
    if (explanations[theme]) {
      return explanations[theme];
    }
  }
  return 'Find the best move in this position.';
}

/**
 * Validate a puzzle has legal moves
 */
export function validatePuzzle(fen: string, solution: string[]): boolean {
  try {
    const game = new Chess(fen);
    
    for (const move of solution) {
      // Try the move
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

/**
 * Batch convert puzzles, filtering out invalid ones
 */
export function convertPuzzles(puzzles: LichessPuzzleRaw[]): ConvertedPuzzle[] {
  const converted: ConvertedPuzzle[] = [];
  
  for (const puzzle of puzzles) {
    const result = convertLichessPuzzle(puzzle);
    if (result) {
      converted.push(result);
    }
  }
  
  return converted;
}


