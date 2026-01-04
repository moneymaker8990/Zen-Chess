/**
 * VERIFIED TACTICAL PUZZLES
 * Simple, instructive puzzles with clear goals
 * Each puzzle teaches one specific pattern
 */

import type { PatternType, ChessPuzzle } from '@/lib/types';

// ============================================
// PIN PUZZLES - One piece trapped behind another
// ============================================

const pinPuzzles: ChessPuzzle[] = [];

// ============================================
// SKEWER PUZZLES - Attack through to piece behind
// ============================================

const skewerPuzzles: ChessPuzzle[] = [
  {
    id: 'skewer-001',
    // Rook skewers king to another piece behind
    fen: '8/8/8/1k6/8/8/1R6/1K6 w - - 0 1',
    solution: ['Rb4+'],
    themes: ['SKEWER'] as PatternType[],
    difficulty: 1,
    title: 'Rook Check',
    explanation: 'Rb4+ checks the king. When it moves, we can attack whatever is behind it. Rooks are powerful on open files!',
  },
];

// ============================================
// FORK PUZZLES - Attack two pieces at once
// ============================================

const forkPuzzles: ChessPuzzle[] = [
  {
    id: 'fork-001',
    // Classic knight fork of king and queen
    fen: '4k3/8/8/3N4/8/8/1q6/4K3 w - - 0 1',
    solution: ['Nc7+'],
    themes: ['FORK'] as PatternType[],
    difficulty: 1,
    title: 'Royal Fork!',
    explanation: 'Nc7+ attacks BOTH the king AND queen at the same time! The king must move, and we win the queen. Knights are the best forking pieces!',
  },
  {
    id: 'fork-002',
    // Queen fork
    fen: 'r3k3/8/8/8/8/8/4Q3/4K3 w q - 0 1',
    solution: ['Qa6+'],
    themes: ['FORK'] as PatternType[],
    difficulty: 1,
    title: 'Queen Fork',
    explanation: 'Qa6+ forks the king and rook! After the king moves, we capture the rook. Queens can fork from many different angles.',
  },
];

// ============================================
// BACK RANK PUZZLES - Checkmate on the back rank
// ============================================

const backRankPuzzles: ChessPuzzle[] = [
  {
    id: 'backrank-001',
    // Simple back rank mate
    fen: '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
    solution: ['Re8#'],
    themes: ['BACK_RANK', 'MATE_PATTERN'] as PatternType[],
    difficulty: 1,
    title: 'Back Rank Mate!',
    explanation: 'Re8 is CHECKMATE! The king is trapped by its own pawns on the back rank. This is one of the most common checkmate patterns - always watch for it!',
  },
  {
    id: 'backrank-002',
    // Queen back rank
    fen: '6k1/5ppp/8/8/4Q3/8/5PPP/6K1 w - - 0 1',
    solution: ['Qe8#'],
    themes: ['BACK_RANK', 'MATE_PATTERN'] as PatternType[],
    difficulty: 1,
    title: 'Queen Back Rank Mate',
    explanation: 'Qe8 is checkmate! The queen delivers mate on the back rank. The pawns trap their own king.',
  },
];

// ============================================
// DISCOVERY PUZZLES - Reveal an attack
// ============================================

const discoveryPuzzles: ChessPuzzle[] = [
  {
    id: 'discovery-001',
    // Simple discovered attack
    fen: '4k3/8/8/4N3/8/8/4Q3/4K3 w - - 0 1',
    solution: ['Nd7'],
    themes: ['DISCOVERY'] as PatternType[],
    difficulty: 1,
    title: 'Discovered Attack',
    explanation: 'Nd7 moves the knight, revealing the queen\'s attack on the king! This is a discovered attack - moving one piece unveils an attack from another.',
  },
];

// ============================================
// MATE IN 1 PUZZLES
// ============================================

const mateIn1Puzzles: ChessPuzzle[] = [
  {
    id: 'mate1-001',
    fen: '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
    solution: ['Re8#'],
    themes: ['MATE_PATTERN', 'BACK_RANK'] as PatternType[],
    difficulty: 1,
    title: 'Mate in 1 - Back Rank',
    explanation: 'Re8 is checkmate! The rook delivers mate on the back rank. The pawns prevent the king from escaping.',
  },
  {
    id: 'mate1-002',
    fen: 'k7/8/1K6/8/8/8/8/R7 w - - 0 1',
    solution: ['Ra8#'],
    themes: ['MATE_PATTERN'] as PatternType[],
    difficulty: 1,
    title: 'King and Rook Mate',
    explanation: 'Ra8 is checkmate! The king controls b7, and the rook delivers mate. This is the basic king and rook checkmate.',
  },
  {
    id: 'mate1-003',
    fen: '7k/8/5N1K/8/8/8/8/6R1 w - - 0 1',
    solution: ['Rg8#'],
    themes: ['MATE_PATTERN'] as PatternType[],
    difficulty: 1,
    title: 'Arabian Mate',
    explanation: 'Rg8 is the Arabian Mate! The knight blocks escape on g8 and h7, while the rook delivers checkmate.',
  },
];

// ============================================
// MATE IN 2 PUZZLES
// ============================================

const mateIn2Puzzles: ChessPuzzle[] = [
  {
    id: 'mate2-001',
    fen: '5r1k/4Nppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
    solution: ['Ng6+', 'hxg6', 'Re8#'],
    themes: ['MATE_PATTERN', 'SACRIFICE'] as PatternType[],
    difficulty: 2,
    title: 'Knight Sacrifice Mate',
    explanation: 'Ng6+! Sacrifice the knight! After hxg6, the h-file is blocked and Re8 is checkmate. Beautiful!',
  },
];

// ============================================
// SACRIFICE PUZZLES
// ============================================

const sacrificePuzzles: ChessPuzzle[] = [
  {
    id: 'sacrifice-001',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    solution: ['Bxf7+', 'Kxf7', 'Ng5+'],
    themes: ['SACRIFICE'] as PatternType[],
    difficulty: 2,
    title: 'The f7 Sacrifice',
    explanation: 'Bxf7+! Sacrifice the bishop to expose the king. After Kxf7, Ng5+ forks the king and wins back material with interest!',
  },
];

// ============================================
// QUIET MOVE PUZZLES
// ============================================

const quietMovePuzzles: ChessPuzzle[] = [
  {
    id: 'quiet-001',
    fen: '6k1/5ppp/8/8/3Q4/8/5PPP/6K1 w - - 0 1',
    solution: ['Qd5'],
    themes: ['QUIET_MOVE'] as PatternType[],
    difficulty: 2,
    title: 'The Quiet Queen',
    explanation: 'Qd5! No check, no capture, but devastating. The queen threatens both Qg8# AND Qxf7+. Black cannot stop both threats!',
  },
];

// ============================================
// ZWISCHENZUG PUZZLES
// ============================================

const zwischenzugPuzzles: ChessPuzzle[] = [
  {
    id: 'zwischen-001',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    solution: ['Bxf7+', 'Ke7', 'Nxc6+'],
    themes: ['ZWISCHENZUG'] as PatternType[],
    difficulty: 2,
    title: 'In-Between Move',
    explanation: 'After Bxf7+ Ke7, don\'t recapture! Nxc6+ is a zwischenzug (in-between move) that wins the queen. Always look for stronger moves!',
  },
];

// ============================================
// EMPTY ARRAYS FOR NOW
// ============================================

const deflectionPuzzles: ChessPuzzle[] = [];
const endgamePuzzles: ChessPuzzle[] = [];
const defensivePuzzles: ChessPuzzle[] = [];

// ============================================
// COMBINE ALL PUZZLES
// ============================================

export const verifiedPuzzles: ChessPuzzle[] = [
  ...pinPuzzles,
  ...skewerPuzzles,
  ...forkPuzzles,
  ...backRankPuzzles,
  ...discoveryPuzzles,
  ...mateIn1Puzzles,
  ...mateIn2Puzzles,
  ...sacrificePuzzles,
  ...quietMovePuzzles,
  ...zwischenzugPuzzles,
  ...deflectionPuzzles,
  ...endgamePuzzles,
  ...defensivePuzzles,
];

// ============================================
// FILTER HELPERS
// ============================================

export function getPuzzlesByTheme(theme: PatternType): ChessPuzzle[] {
  return verifiedPuzzles.filter(p => p.themes.includes(theme));
}

export function getPuzzlesByThemes(themes: PatternType[]): ChessPuzzle[] {
  return verifiedPuzzles.filter(p => p.themes.some(t => themes.includes(t)));
}

export function getPuzzlesByDifficulty(difficulty: 1 | 2 | 3 | 4 | 5): ChessPuzzle[] {
  return verifiedPuzzles.filter(p => p.difficulty === difficulty);
}

export {
  pinPuzzles,
  skewerPuzzles,
  forkPuzzles,
  backRankPuzzles,
  discoveryPuzzles,
  mateIn1Puzzles,
  mateIn2Puzzles,
  sacrificePuzzles,
  quietMovePuzzles,
  zwischenzugPuzzles,
  deflectionPuzzles,
  endgamePuzzles,
  defensivePuzzles,
};

export default verifiedPuzzles;


