import { describe, it, expect } from 'vitest';
import { Chess } from 'chess.js';

// Unit tests for chess move validation logic
describe('Chess Move Validation', () => {
  describe('Starting Position', () => {
    it('should allow e4 as first move', () => {
      const game = new Chess();
      const move = game.move('e4');
      expect(move).not.toBeNull();
      expect(move?.san).toBe('e4');
    });

    it('should throw on invalid e5 as first move for white', () => {
      const game = new Chess();
      // chess.js throws on invalid moves, not returns null
      expect(() => game.move('e5')).toThrow();
    });

    it('should allow Nf3 as first move', () => {
      const game = new Chess();
      const move = game.move('Nf3');
      expect(move).not.toBeNull();
    });

    it('should have correct turn indicator', () => {
      const game = new Chess();
      expect(game.turn()).toBe('w');
      game.move('e4');
      expect(game.turn()).toBe('b');
    });
  });

  describe('Legal Move Detection', () => {
    it('should detect all legal moves from starting position', () => {
      const game = new Chess();
      const moves = game.moves();
      expect(moves.length).toBe(20); // 16 pawn moves + 4 knight moves
    });

    it('should throw on illegal bishop move through pawns', () => {
      const game = new Chess();
      // Bishop cannot move through pawns - chess.js throws
      expect(() => game.move('Bc4')).toThrow();
    });

    it('should allow castling when legal', () => {
      const game = new Chess();
      // Setup position for castling
      game.move('e4');
      game.move('e5');
      game.move('Nf3');
      game.move('Nc6');
      game.move('Bc4');
      game.move('Bc5');
      // Now O-O should be legal
      const castle = game.move('O-O');
      expect(castle).not.toBeNull();
      expect(castle?.san).toBe('O-O');
    });
  });

  describe('Check Detection', () => {
    it('should detect checkmate in scholars mate', () => {
      // Scholars mate setup
      const game = new Chess();
      game.move('e4');
      game.move('e5');
      game.move('Qh5');
      game.move('Nc6');
      game.move('Bc4');
      game.move('Nf6');
      game.move('Qxf7');
      expect(game.isCheckmate()).toBe(true);
    });

    it('should detect king is in check', () => {
      // Position where black king is in check from white queen on h5 attacking f7
      const fen = 'rnbqkb1r/pppp1ppp/5n2/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR w KQkq - 4 3';
      const game = new Chess(fen);
      // Make the checking move
      game.move('Qxf7');
      expect(game.inCheck()).toBe(true);
    });
  });

  describe('Special Moves', () => {
    it('should handle pawn promotion', () => {
      const fen = '8/P7/8/8/8/8/8/4K2k w - - 0 1';
      const game = new Chess(fen);
      const promotion = game.move({ from: 'a7', to: 'a8', promotion: 'q' });
      expect(promotion).not.toBeNull();
      // May include check symbol
      expect(promotion?.san).toContain('a8=Q');
    });

    it('should handle en passant', () => {
      const fen = 'rnbqkbnr/ppp1pppp/8/3pP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 3';
      const game = new Chess(fen);
      const enPassant = game.move('exd6');
      expect(enPassant).not.toBeNull();
      expect(enPassant?.flags).toContain('e'); // en passant flag
    });
  });

  describe('Game End Conditions', () => {
    it('should detect stalemate position', () => {
      // Known stalemate position - black king trapped
      const fen = '7k/5Q2/6K1/8/8/8/8/8 b - - 0 1';
      const game = new Chess(fen);
      expect(game.isStalemate()).toBe(true);
      expect(game.isDraw()).toBe(true);
    });

    it('should detect insufficient material', () => {
      // King vs King
      const fen = 'k7/8/1K6/8/8/8/8/8 w - - 0 1';
      const game = new Chess(fen);
      expect(game.isInsufficientMaterial()).toBe(true);
    });

    it('should detect checkmate position', () => {
      // Back rank mate position - king trapped behind pawns
      const fen = '6k1/5ppp/8/8/8/8/8/R3K3 w Q - 0 1';
      const game = new Chess(fen);
      game.move('Ra8');
      expect(game.isCheckmate()).toBe(true);
    });
  });
});

describe('FEN Parsing', () => {
  it('should parse standard starting FEN', () => {
    const game = new Chess();
    expect(game.fen()).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  });

  it('should load custom FEN correctly', () => {
    const customFen = 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4';
    const game = new Chess(customFen);
    expect(game.fen()).toBe(customFen);
    expect(game.turn()).toBe('w');
  });

  it('should throw on invalid FEN', () => {
    expect(() => new Chess('invalid fen string')).toThrow();
  });
});
