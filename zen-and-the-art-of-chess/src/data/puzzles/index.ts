/**
 * PUZZLES INDEX
 * Export all puzzle data
 */

// Verified Lichess puzzles (the good data!)
export {
  verifiedPuzzles,
  getPuzzlesByTheme,
  getPuzzlesByThemes,
  getPuzzlesByDifficulty,
  forkPuzzles,
  pinPuzzles,
  skewerPuzzles,
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
} from './verified-puzzles';

// Re-export as the main puzzles array for backwards compatibility
export { verifiedPuzzles as puzzles } from './verified-puzzles';
export { verifiedPuzzles as allPuzzles } from './verified-puzzles';

// Converter utilities
export {
  convertLichessPuzzle,
  uciToSan,
  mapLichessThemes,
  validatePuzzle,
  convertPuzzles,
  ratingToDifficulty,
} from './lichessConverter';

export type { LichessPuzzleRaw, ConvertedPuzzle } from './lichessConverter';
