// ============================================
// CHESS-SPECIFIC TYPE DEFINITIONS
// ============================================
// Centralized types for chess moves, positions, and game data
// These types complement chess.js types and provide strong typing
// for the application's chess-related logic.

import type { Square, Move as ChessJsMove, PieceSymbol, Color } from 'chess.js';

// Re-export chess.js types for convenience
export type { Square, PieceSymbol, Color };

// ============================================
// MOVE TYPES
// ============================================

/**
 * A verbose move object from chess.js
 * This is what chess.history({ verbose: true }) returns
 */
export interface VerboseMove {
  from: Square;
  to: Square;
  color: Color;
  piece: PieceSymbol;
  san: string;
  flags: string;
  lan?: string;
  before?: string;
  after?: string;
  captured?: PieceSymbol;
  promotion?: PieceSymbol;
}

/**
 * A simple move object for making moves
 */
export interface SimpleMoveObject {
  from: Square;
  to: Square;
  promotion?: PieceSymbol;
}

/**
 * Move in UCI format (e.g., "e2e4", "e7e8q")
 */
export type UCIMove = string;

/**
 * Move in SAN format (e.g., "e4", "Nf3", "O-O")
 */
export type SANMove = string;

// ============================================
// GAME DATA TYPES
// ============================================

/**
 * Standard game result notation
 */
export type GameResultString = '1-0' | '0-1' | '1/2-1/2' | '*' | '?';

/**
 * Player color
 */
export type PlayerColor = 'w' | 'b';

/**
 * Orientation for board display
 */
export type BoardOrientation = 'white' | 'black';

/**
 * A stored chess game with metadata
 * Used for legend games, instructive games, etc.
 */
export interface StoredChessGame {
  id: string;
  event?: string;
  site?: string;
  date?: string;
  round?: string;
  white: string;
  black: string;
  result: GameResultString;
  eco?: string;
  pgn: string;
  // Optional metadata
  whiteElo?: number;
  blackElo?: number;
  timeControl?: string;
  annotator?: string;
}

/**
 * A chess game with parsed moves
 */
export interface ParsedChessGame extends StoredChessGame {
  moves: VerboseMove[];
  positions: string[]; // FEN strings at each position
}

// ============================================
// POSITION TYPES
// ============================================

/**
 * A position with a move to be played
 * Used for puzzle positions, training positions, etc.
 */
export interface ChessPosition {
  fen: string;
  move?: UCIMove;
  moveNumber?: number;
}

/**
 * Square highlighting style for the board
 */
export interface SquareStyle {
  backgroundColor?: string;
  background?: string;
  borderRadius?: string;
  boxShadow?: string;
  opacity?: number;
}

/**
 * Arrow definition for board arrows
 */
export type BoardArrow = [Square, Square];

// ============================================
// ENGINE TYPES
// ============================================

/**
 * Engine evaluation result
 */
export interface EngineEvalResult {
  depth: number;
  score: number;
  mate?: number;
  pv?: string[];
  bestMove?: string;
}

/**
 * Engine candidate move with features
 * Used by humanized stockfish and legend engine
 */
export interface EngineCandidateMove {
  move: string;
  scoreCp: number;
  features: EngineMoveFeatures;
}

/**
 * Features extracted from a move for style analysis
 */
export interface EngineMoveFeatures {
  isCapture: boolean;
  isCheck: boolean;
  changesMaterial: number;
  kingExposureChange: number;
  simplifies: boolean;
}

// ============================================
// DATABASE RECORD TYPES
// ============================================

/**
 * Generic database record with common fields
 */
export interface DatabaseRecord {
  id: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Player profile from database
 */
export interface PlayerProfile extends DatabaseRecord {
  username: string;
  display_name?: string;
  avatar_url?: string;
  rating?: number;
}

/**
 * A game record from the database
 */
export interface DatabaseGameRecord extends DatabaseRecord {
  white_player_id: string | null;
  black_player_id: string | null;
  white_player?: PlayerProfile;
  black_player?: PlayerProfile;
  status: 'waiting' | 'active' | 'completed' | 'abandoned';
  result?: 'white_wins' | 'black_wins' | 'draw' | null;
  termination?: string | null;
  winner_id?: string | null;
  fen: string;
  pgn?: string;
  moves?: unknown[];
  move_count?: number;
  turn?: PlayerColor;
  time_control_type?: string;
  initial_time_seconds?: number;
  increment_seconds?: number;
  white_time_remaining_ms?: number;
  black_time_remaining_ms?: number;
  last_move_at?: string;
  draw_offer_from?: string | null;
  rematch_game_id?: string | null;
  rematch_offered_by?: string | null;
  is_rated?: boolean;
  white_rating_before?: number;
  black_rating_before?: number;
  white_rating_after?: number;
  black_rating_after?: number;
  invite_code?: string;
  started_at?: string;
  ended_at?: string;
}

// ============================================
// PUZZLE TYPES
// ============================================

/**
 * Raw puzzle data from Lichess format
 */
export interface LichessPuzzleRaw {
  id: string;
  fen: string;
  moves: string; // Space-separated UCI moves
  rating: number;
  ratingDeviation: number;
  popularity: number;
  nbPlays: number;
  themes: string; // Space-separated theme names
  gameUrl?: string;
  openingTags?: string;
}

/**
 * Parsed puzzle with move array
 */
export interface ParsedPuzzle {
  id: string;
  fen: string;
  moves: string[]; // Array of UCI moves
  rating: number;
  ratingDeviation: number;
  popularity: number;
  nbPlays: number;
  themes: string[];
}

// ============================================
// UTILITY TYPES
// ============================================

/**
 * Type guard to check if a value is a valid Square
 */
export function isValidSquare(value: string): value is Square {
  return /^[a-h][1-8]$/.test(value);
}

/**
 * Type guard to check if a value is a valid UCI move
 */
export function isValidUCIMove(value: string): boolean {
  // Basic UCI format: e2e4, e7e8q (with promotion)
  return /^[a-h][1-8][a-h][1-8][qrbn]?$/.test(value);
}

/**
 * Convert a verbose move to UCI format
 */
export function moveToUCI(move: VerboseMove | SimpleMoveObject): UCIMove {
  const promo = 'promotion' in move && move.promotion ? move.promotion : '';
  return `${move.from}${move.to}${promo}`;
}

/**
 * Parse a UCI move string into components
 */
export function parseUCIMove(uci: UCIMove): SimpleMoveObject | null {
  if (!isValidUCIMove(uci)) return null;

  const from = uci.slice(0, 2) as Square;
  const to = uci.slice(2, 4) as Square;
  const promotion = uci.length === 5 ? uci[4] as PieceSymbol : undefined;

  return { from, to, promotion };
}
