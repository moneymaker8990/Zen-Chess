/**
 * Comprehensive Move Validation Tests
 * Phase 4: Chess Board & Puzzle Engine Hardening
 */

import { describe, it, expect } from 'vitest';
import { Chess } from 'chess.js';
import {
  validateAndExecuteMove,
  parseUciMove,
  isValidUciMove,
  getLegalMoves,
  canMoveFrom,
  executeEngineMove,
  isValidFen,
} from '@/lib/moveValidation';

describe('Move Validation System', () => {
  // ============================================
  // validateAndExecuteMove Tests
  // ============================================
  describe('validateAndExecuteMove', () => {
    it('should execute valid pawn moves', () => {
      const game = new Chess();
      const result = validateAndExecuteMove(game, 'e2', 'e4');
      
      expect(result.valid).toBe(true);
      expect(result.move).toBeDefined();
      expect(result.move?.san).toBe('e4');
    });

    it('should reject moves from empty squares', () => {
      const game = new Chess();
      const result = validateAndExecuteMove(game, 'e4', 'e5');
      
      expect(result.valid).toBe(false);
      expect(result.error).toBe('No piece on source square');
    });

    it('should reject moves when wrong color tries to move', () => {
      const game = new Chess();
      const result = validateAndExecuteMove(game, 'e7', 'e5');
      
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Not your turn');
    });

    it('should reject illegal moves', () => {
      const game = new Chess();
      const result = validateAndExecuteMove(game, 'e2', 'e5'); // Can't move 3 squares
      
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid move');
    });

    it('should reject moves when game is over', () => {
      // Fool's mate position
      const game = new Chess('rnb1kbnr/pppp1ppp/4p3/8/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3');
      expect(game.isCheckmate()).toBe(true);
      
      const result = validateAndExecuteMove(game, 'e2', 'e4');
      
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Game is already over');
    });

    it('should handle pawn promotion with default queen', () => {
      // Valid FEN with both kings
      const game = new Chess('8/P7/8/8/8/k7/8/K7 w - - 0 1');
      const result = validateAndExecuteMove(game, 'a7', 'a8');
      
      expect(result.valid).toBe(true);
      expect(result.move?.san).toMatch(/^a8=Q/);
    });

    it('should handle pawn promotion with specified piece', () => {
      // Valid FEN with both kings
      const game = new Chess('8/P7/8/8/8/k7/8/K7 w - - 0 1');
      const result = validateAndExecuteMove(game, 'a7', 'a8', 'n');
      
      expect(result.valid).toBe(true);
      expect(result.move?.san).toMatch(/^a8=N/);
    });

    it('should handle castling moves', () => {
      const game = new Chess('r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1');
      const result = validateAndExecuteMove(game, 'e1', 'g1');
      
      expect(result.valid).toBe(true);
      expect(result.move?.san).toBe('O-O');
    });

    it('should handle en passant capture', () => {
      const game = new Chess('rnbqkbnr/pppp1ppp/8/4pP2/8/8/PPPPP1PP/RNBQKBNR w KQkq e6 0 3');
      const result = validateAndExecuteMove(game, 'f5', 'e6');
      
      expect(result.valid).toBe(true);
      expect(result.move?.san).toBe('fxe6');
    });
  });

  // ============================================
  // parseUciMove Tests
  // ============================================
  describe('parseUciMove', () => {
    it('should parse basic UCI moves', () => {
      const result = parseUciMove('e2e4');
      
      expect(result).toEqual({ from: 'e2', to: 'e4', promotion: undefined });
    });

    it('should parse UCI moves with promotion', () => {
      const result = parseUciMove('e7e8q');
      
      expect(result).toEqual({ from: 'e7', to: 'e8', promotion: 'q' });
    });

    it('should parse knight promotion', () => {
      const result = parseUciMove('a7a8n');
      
      expect(result).toEqual({ from: 'a7', to: 'a8', promotion: 'n' });
    });

    it('should reject invalid UCI format (too short)', () => {
      expect(parseUciMove('e2')).toBeNull();
    });

    it('should reject invalid UCI format (too long)', () => {
      expect(parseUciMove('e2e4qq')).toBeNull();
    });

    it('should reject invalid files', () => {
      expect(parseUciMove('i2e4')).toBeNull();
      expect(parseUciMove('e2j4')).toBeNull();
    });

    it('should reject invalid ranks', () => {
      expect(parseUciMove('e0e4')).toBeNull();
      expect(parseUciMove('e2e9')).toBeNull();
    });

    it('should reject invalid promotion pieces', () => {
      expect(parseUciMove('e7e8k')).toBeNull(); // King
      expect(parseUciMove('e7e8p')).toBeNull(); // Pawn
    });

    it('should accept all valid promotion pieces', () => {
      expect(parseUciMove('e7e8q')?.promotion).toBe('q');
      expect(parseUciMove('e7e8r')?.promotion).toBe('r');
      expect(parseUciMove('e7e8b')?.promotion).toBe('b');
      expect(parseUciMove('e7e8n')?.promotion).toBe('n');
    });
  });

  // ============================================
  // isValidUciMove Tests
  // ============================================
  describe('isValidUciMove', () => {
    const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

    it('should return true for legal moves', () => {
      expect(isValidUciMove(startingFen, 'e2e4')).toBe(true);
      expect(isValidUciMove(startingFen, 'g1f3')).toBe(true);
    });

    it('should return false for illegal moves', () => {
      expect(isValidUciMove(startingFen, 'e2e5')).toBe(false); // Too far
      expect(isValidUciMove(startingFen, 'e7e5')).toBe(false); // Wrong color
    });

    it('should return false for invalid UCI format', () => {
      expect(isValidUciMove(startingFen, 'invalid')).toBe(false);
    });

    it('should return false for invalid FEN', () => {
      expect(isValidUciMove('invalid fen', 'e2e4')).toBe(false);
    });

    it('should validate promotion moves correctly', () => {
      // Valid FEN with both kings
      const promotionFen = '8/P7/8/8/8/k7/8/K7 w - - 0 1';
      expect(isValidUciMove(promotionFen, 'a7a8q')).toBe(true);
      expect(isValidUciMove(promotionFen, 'a7a8n')).toBe(true);
    });
  });

  // ============================================
  // getLegalMoves Tests
  // ============================================
  describe('getLegalMoves', () => {
    it('should return all legal moves from starting position', () => {
      const game = new Chess();
      const moves = getLegalMoves(game);
      
      // 20 moves from starting position (16 pawn + 4 knight)
      expect(moves).toHaveLength(20);
    });

    it('should return moves with correct format', () => {
      const game = new Chess();
      const moves = getLegalMoves(game);
      
      const e4Move = moves.find(m => m.san === 'e4');
      expect(e4Move).toBeDefined();
      expect(e4Move?.from).toBe('e2');
      expect(e4Move?.to).toBe('e4');
    });

    it('should return empty array when checkmated', () => {
      const game = new Chess('rnb1kbnr/pppp1ppp/4p3/8/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3');
      const moves = getLegalMoves(game);
      
      expect(moves).toHaveLength(0);
    });

    it('should return limited moves when in check', () => {
      // Position where black king is in check from queen on h5
      const game = new Chess('rnbqkbnr/pppp1ppp/8/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR b KQkq - 1 2');
      const moves = getLegalMoves(game);
      
      // Black must respond to check - limited moves available
      expect(moves.length).toBeGreaterThan(0);
      expect(moves.length).toBeLessThan(30);
    });
  });

  // ============================================
  // canMoveFrom Tests
  // ============================================
  describe('canMoveFrom', () => {
    it('should return true for piece that can move', () => {
      const game = new Chess();
      expect(canMoveFrom(game, 'e2')).toBe(true); // Pawn can move
      expect(canMoveFrom(game, 'g1')).toBe(true); // Knight can move
    });

    it('should return false for empty square', () => {
      const game = new Chess();
      expect(canMoveFrom(game, 'e4')).toBe(false);
    });

    it('should return false for opponent piece', () => {
      const game = new Chess();
      expect(canMoveFrom(game, 'e7')).toBe(false); // Black's turn is not white
    });

    it('should return false for blocked piece', () => {
      const game = new Chess();
      expect(canMoveFrom(game, 'a1')).toBe(false); // Rook blocked
      expect(canMoveFrom(game, 'd1')).toBe(false); // Queen blocked
    });

    it('should correctly handle pinned pieces', () => {
      // Position where knight is absolutely pinned (can't move at all because it would expose king to check)
      // This is a rook pin where the knight cannot capture the rook
      const game = new Chess('8/8/8/8/r2N3k/8/8/K7 w - - 0 1');
      // The knight on d4 is pinned by the rook on a4
      expect(canMoveFrom(game, 'd4')).toBe(false); // Knight absolutely pinned
    });
  });

  // ============================================
  // executeEngineMove Tests
  // ============================================
  describe('executeEngineMove', () => {
    const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

    it('should execute valid engine move', () => {
      const result = executeEngineMove(startingFen, 'e2e4');
      
      expect(result).not.toBeNull();
      // Check that the pawn moved to e4 (4P3 in FEN means pawn on e4)
      expect(result?.fen()).toContain('4P3');
    });

    it('should return null for invalid move', () => {
      const result = executeEngineMove(startingFen, 'e2e5');
      
      expect(result).toBeNull();
    });

    it('should return null for invalid UCI format', () => {
      const result = executeEngineMove(startingFen, 'invalid');
      
      expect(result).toBeNull();
    });

    it('should handle promotion correctly', () => {
      // Valid FEN with both kings
      const promotionFen = '8/P7/8/8/8/k7/8/K7 w - - 0 1';
      const result = executeEngineMove(promotionFen, 'a7a8q');
      
      expect(result).not.toBeNull();
      expect(result?.fen()).toContain('Q');
    });
  });

  // ============================================
  // isValidFen Tests
  // ============================================
  describe('isValidFen', () => {
    it('should return true for valid FEN strings', () => {
      expect(isValidFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')).toBe(true);
      // Note: chess.js requires both kings for a valid FEN
      expect(isValidFen('4k3/8/8/8/8/8/8/4K3 w - - 0 1')).toBe(true); // Minimal valid board
    });

    it('should return false for invalid FEN strings', () => {
      expect(isValidFen('')).toBe(false);
      expect(isValidFen('invalid')).toBe(false);
      expect(isValidFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP w KQkq - 0 1')).toBe(false); // Missing rank
    });

    it('should return false for FEN with invalid pieces', () => {
      expect(isValidFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNX w KQkq - 0 1')).toBe(false);
    });
  });

  // ============================================
  // Edge Cases
  // ============================================
  describe('Edge Cases', () => {
    it('should handle stalemate position', () => {
      // Classic stalemate: black king trapped by white queen
      // Position: black king on a8, white queen on b6, white king on c1
      const game = new Chess('k7/8/1Q6/8/8/8/8/2K5 b - - 0 1');
      
      // Verify it's actually stalemate (black has no legal moves but is not in check)
      expect(game.isStalemate()).toBe(true);
      
      const moves = getLegalMoves(game);
      expect(moves).toHaveLength(0);
    });

    it('should handle insufficient material', () => {
      const game = new Chess('8/8/8/8/8/8/k7/K7 w - - 0 1');
      expect(game.isInsufficientMaterial()).toBe(true);
    });

    it('should handle threefold repetition', () => {
      const game = new Chess();
      // Create threefold repetition
      game.move('Nf3'); game.move('Nf6');
      game.move('Ng1'); game.move('Ng8');
      game.move('Nf3'); game.move('Nf6');
      game.move('Ng1'); game.move('Ng8');
      game.move('Nf3'); game.move('Nf6');
      
      expect(game.isThreefoldRepetition()).toBe(true);
    });

    it('should handle fifty-move rule', () => {
      const game = new Chess('8/8/8/8/8/8/8/4K2k w - - 99 200');
      game.move('Kf2');
      
      expect(game.isDraw()).toBe(true);
    });
  });
});

