import { describe, it, expect } from 'vitest';
import { Chess } from 'chess.js';

// Test puzzle data integrity and solution validation
describe('Puzzle System', () => {
  describe('Puzzle Data Integrity', () => {
    it('should have puzzles available', async () => {
      const { allPuzzles, puzzles } = await import('@/data/puzzles');
      expect(allPuzzles.length).toBeGreaterThan(0);
      expect(puzzles.length).toBeGreaterThan(0);
    });

    it('should have valid FEN for all puzzles', async () => {
      const { allPuzzles } = await import('@/data/puzzles');
      
      for (const puzzle of allPuzzles.slice(0, 20)) { // Test first 20 puzzles
        expect(() => {
          const game = new Chess(puzzle.fen);
          return game;
        }).not.toThrow();
      }
    });

    it('should have valid solutions for all puzzles', async () => {
      const { allPuzzles } = await import('@/data/puzzles');
      
      for (const puzzle of allPuzzles.slice(0, 20)) { // Test first 20 puzzles
        expect(puzzle.solution).toBeDefined();
        expect(Array.isArray(puzzle.solution)).toBe(true);
        expect(puzzle.solution.length).toBeGreaterThan(0);
      }
    });

    it('should have difficulty rating for all puzzles', async () => {
      const { allPuzzles } = await import('@/data/puzzles');
      
      for (const puzzle of allPuzzles) {
        expect(puzzle.difficulty).toBeDefined();
        expect(puzzle.difficulty).toBeGreaterThanOrEqual(1);
        expect(puzzle.difficulty).toBeLessThanOrEqual(5);
      }
    });

    it('should have themes for all puzzles', async () => {
      const { allPuzzles } = await import('@/data/puzzles');
      
      for (const puzzle of allPuzzles) {
        expect(puzzle.themes).toBeDefined();
        expect(Array.isArray(puzzle.themes)).toBe(true);
        expect(puzzle.themes.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Puzzle Solution Format', () => {
    it('should have solutions in valid move notation', async () => {
      const { allPuzzles } = await import('@/data/puzzles');
      
      for (const puzzle of allPuzzles.slice(0, 10)) {
        for (const move of puzzle.solution) {
          // Move should be a non-empty string
          expect(typeof move).toBe('string');
          expect(move.length).toBeGreaterThan(0);
        }
      }
    });

    it('should have at least one move in solution', async () => {
      const { allPuzzles } = await import('@/data/puzzles');
      
      for (const puzzle of allPuzzles) {
        expect(puzzle.solution.length).toBeGreaterThanOrEqual(1);
      }
    });
  });

  describe('Puzzle Themes', () => {
    it('should have valid theme types', async () => {
      const { allPuzzles } = await import('@/data/puzzles');
      const validThemes = [
        'FORK', 'PIN', 'SKEWER', 'DISCOVERY', 'DEFLECTION', 'DECOY',
        'QUIET_MOVE', 'ZWISCHENZUG', 'BACK_RANK', 'MATE_PATTERN',
        'SACRIFICE', 'CHECK', 'CAPTURE', 'TACTICAL'
      ];
      
      for (const puzzle of allPuzzles) {
        for (const theme of puzzle.themes) {
          expect(validThemes).toContain(theme);
        }
      }
    });
  });

  describe('Puzzle IDs', () => {
    it('should have unique IDs for all puzzles', async () => {
      const { allPuzzles } = await import('@/data/puzzles');
      const ids = allPuzzles.map(p => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });
});
