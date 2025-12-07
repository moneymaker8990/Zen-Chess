// ============================================
// CENTRALIZED MOVE VALIDATION
// Ensures moves are valid before execution
// ============================================

import { Chess, Square } from 'chess.js';
import { logger } from './logger';

export interface MoveValidationResult {
  valid: boolean;
  move?: ReturnType<Chess['move']>;
  error?: string;
}

/**
 * Validate and execute a move, returning detailed result
 */
export function validateAndExecuteMove(
  game: Chess,
  from: Square,
  to: Square,
  promotion?: string
): MoveValidationResult {
  try {
    // Check if the game is already over
    if (game.isGameOver()) {
      return { valid: false, error: 'Game is already over' };
    }

    // Check if from square has a piece
    const piece = game.get(from);
    if (!piece) {
      return { valid: false, error: 'No piece on source square' };
    }

    // Check if it's the right color's turn
    if (piece.color !== game.turn()) {
      return { valid: false, error: 'Not your turn' };
    }

    // Try to make the move
    const move = game.move({
      from,
      to,
      promotion: promotion || 'q', // Default to queen for pawn promotion
    });

    if (!move) {
      return { valid: false, error: 'Invalid move' };
    }

    return { valid: true, move };
  } catch (err) {
    return { 
      valid: false, 
      error: err instanceof Error ? err.message : 'Unknown error' 
    };
  }
}

/**
 * Parse UCI move notation (e.g., "e2e4" or "e7e8q") to from/to/promotion
 */
export function parseUciMove(uci: string): { from: Square; to: Square; promotion?: string } | null {
  if (uci.length < 4 || uci.length > 5) {
    return null;
  }

  const from = uci.slice(0, 2) as Square;
  const to = uci.slice(2, 4) as Square;
  const promotion = uci.length > 4 ? uci[4] : undefined;

  // Validate squares
  const files = 'abcdefgh';
  const ranks = '12345678';
  
  if (!files.includes(from[0]) || !ranks.includes(from[1])) {
    return null;
  }
  if (!files.includes(to[0]) || !ranks.includes(to[1])) {
    return null;
  }
  if (promotion && !['q', 'r', 'b', 'n'].includes(promotion)) {
    return null;
  }

  return { from, to, promotion };
}

/**
 * Validate UCI move against a position without executing it
 */
export function isValidUciMove(fen: string, uci: string): boolean {
  const parsed = parseUciMove(uci);
  if (!parsed) return false;

  try {
    const game = new Chess(fen);
    const moves = game.moves({ verbose: true });
    
    return moves.some(m => 
      m.from === parsed.from && 
      m.to === parsed.to &&
      (!parsed.promotion || m.promotion === parsed.promotion)
    );
  } catch {
    return false;
  }
}

/**
 * Get all legal moves for the current position
 */
export function getLegalMoves(game: Chess): Array<{ from: Square; to: Square; san: string }> {
  return game.moves({ verbose: true }).map(m => ({
    from: m.from as Square,
    to: m.to as Square,
    san: m.san,
  }));
}

/**
 * Check if a square has a piece that can move
 */
export function canMoveFrom(game: Chess, square: Square): boolean {
  const piece = game.get(square);
  if (!piece) return false;
  if (piece.color !== game.turn()) return false;
  
  const moves = game.moves({ square, verbose: true });
  return moves.length > 0;
}

/**
 * Safely execute an engine move (UCI format) on a game
 * Returns new Chess instance with move made, or null if invalid
 */
export function executeEngineMove(fen: string, uci: string): Chess | null {
  const parsed = parseUciMove(uci);
  if (!parsed) {
    logger.warn('Invalid UCI move format:', uci);
    return null;
  }

  try {
    const game = new Chess(fen);
    const result = game.move({
      from: parsed.from,
      to: parsed.to,
      promotion: parsed.promotion,
    });

    if (!result) {
      logger.warn('Engine move was not legal:', uci, 'in position', fen);
      return null;
    }

    return game;
  } catch (err) {
    logger.error('Error executing engine move:', err);
    return null;
  }
}

/**
 * Validate FEN string
 */
export function isValidFen(fen: string): boolean {
  try {
    new Chess(fen);
    return true;
  } catch {
    return false;
  }
}




