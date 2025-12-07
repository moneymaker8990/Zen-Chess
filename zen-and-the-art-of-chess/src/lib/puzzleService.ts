// ============================================
// PUZZLE SERVICE
// Chess.com-style adaptive puzzle system
// ============================================

import { supabase, isSupabaseConfigured } from './supabase';
import { logger } from './logger';
import type { DbPuzzle, UserPuzzleRating } from './database.types';

// ============================================
// TYPES
// ============================================

export interface PuzzleWithMeta {
  id: string;
  fen: string;
  solutionMoves: string[];  // Array of UCI moves
  rating: number;
  themes: string[];
  popularity?: number;
}

export interface UserPuzzleData {
  rating: number;
  highestRating: number;
  lowestRating: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  currentStreak: number;
  bestStreak: number;
  lastThemes: string[];
}

export interface PuzzleResult {
  puzzleId: string;
  solved: boolean;
  timeTakenMs?: number;
  hintsUsed?: number;
  mode?: 'rated' | 'streak' | 'rush' | 'daily' | 'custom';
}

export interface RatingUpdate {
  newRating: number;
  ratingChange: number;
  newStreak: number;
}

// ============================================
// CONSTANTS
// ============================================

const K_FACTOR = 32;  // Elo K-factor
const DEFAULT_RATING = 1000;
const RATING_RANGE = 200;  // ±200 from user rating
const HISTORY_LIMIT = 100;  // Don't repeat last 100 puzzles
const THEME_VARIETY_LIMIT = 3;  // Don't show same theme 3x in a row

// ============================================
// ELO CALCULATION
// ============================================

/**
 * Calculate Elo rating change using standard formula
 */
export function calculateEloChange(
  userRating: number,
  puzzleRating: number,
  solved: boolean
): number {
  const expected = 1 / (1 + Math.pow(10, (puzzleRating - userRating) / 400));
  const actual = solved ? 1 : 0;
  return Math.round(K_FACTOR * (actual - expected));
}

/**
 * Calculate new rating after a puzzle attempt
 */
export function calculateNewRating(
  userRating: number,
  puzzleRating: number,
  solved: boolean
): number {
  const change = calculateEloChange(userRating, puzzleRating, solved);
  return Math.max(100, userRating + change);  // Minimum rating is 100
}

// ============================================
// SUPABASE FUNCTIONS (for logged-in users)
// ============================================

/**
 * Get user's puzzle rating from Supabase
 */
export async function getUserPuzzleRating(userId: string): Promise<UserPuzzleData | null> {
  if (!isSupabaseConfigured) return null;
  
  try {
    const { data, error } = await supabase
      .from('user_puzzle_ratings')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No record found, create one
        return await createUserPuzzleRating(userId);
      }
      throw error;
    }
    
    return {
      rating: data.rating,
      highestRating: data.highest_rating,
      lowestRating: data.lowest_rating,
      gamesPlayed: data.games_played,
      wins: data.wins,
      losses: data.losses,
      currentStreak: data.current_streak,
      bestStreak: data.best_streak,
      lastThemes: data.last_themes || [],
    };
  } catch (err) {
    logger.error('Failed to get user puzzle rating:', err);
    return null;
  }
}

/**
 * Create initial puzzle rating for a user
 */
async function createUserPuzzleRating(userId: string): Promise<UserPuzzleData | null> {
  if (!isSupabaseConfigured) return null;
  
  try {
    const { data, error } = await supabase
      .from('user_puzzle_ratings')
      .insert({ user_id: userId })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      rating: data.rating,
      highestRating: data.highest_rating,
      lowestRating: data.lowest_rating,
      gamesPlayed: data.games_played,
      wins: data.wins,
      losses: data.losses,
      currentStreak: data.current_streak,
      bestStreak: data.best_streak,
      lastThemes: data.last_themes || [],
    };
  } catch (err) {
    logger.error('Failed to create user puzzle rating:', err);
    return null;
  }
}

/**
 * Get recent puzzle IDs to exclude from selection
 */
async function getRecentPuzzleIds(userId: string): Promise<string[]> {
  if (!isSupabaseConfigured) return [];
  
  try {
    const { data, error } = await supabase.rpc('get_recent_puzzle_ids', {
      p_user_id: userId,
      p_limit: HISTORY_LIMIT,
    });
    
    if (error) throw error;
    return data || [];
  } catch (err) {
    logger.error('Failed to get recent puzzle IDs:', err);
    return [];
  }
}

/**
 * Get next puzzle from Supabase for logged-in user
 */
export async function getNextPuzzleFromSupabase(
  userId: string,
  userRating: number,
  excludeThemes: string[] = []
): Promise<PuzzleWithMeta | null> {
  if (!isSupabaseConfigured) return null;
  
  try {
    // First try using the database function
    const { data, error } = await supabase.rpc('get_next_puzzle', {
      p_user_id: userId,
      p_user_rating: userRating,
      p_rating_range: RATING_RANGE,
      p_excluded_themes: excludeThemes,
    });
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      const puzzle = data[0];
      return {
        id: puzzle.id,
        fen: puzzle.fen,
        solutionMoves: puzzle.solution_moves.split(' '),
        rating: puzzle.rating,
        themes: puzzle.themes || [],
        popularity: puzzle.popularity,
      };
    }
    
    // Fallback: Get a random puzzle in rating range without exclusions
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('puzzles')
      .select('id, fen, solution_moves, rating, themes, popularity')
      .gte('rating', userRating - RATING_RANGE * 2)
      .lte('rating', userRating + RATING_RANGE * 2)
      .limit(1);
    
    if (fallbackError) throw fallbackError;
    
    if (fallbackData && fallbackData.length > 0) {
      const puzzle = fallbackData[0];
      return {
        id: puzzle.id,
        fen: puzzle.fen,
        solutionMoves: puzzle.solution_moves.split(' '),
        rating: puzzle.rating,
        themes: puzzle.themes || [],
        popularity: puzzle.popularity,
      };
    }
    
    return null;
  } catch (err) {
    logger.error('Failed to get next puzzle from Supabase:', err);
    return null;
  }
}

/**
 * Submit puzzle result to Supabase
 */
export async function submitPuzzleResultToSupabase(
  userId: string,
  result: PuzzleResult
): Promise<RatingUpdate | null> {
  if (!isSupabaseConfigured) return null;
  
  try {
    const { data, error } = await supabase.rpc('record_puzzle_attempt', {
      p_user_id: userId,
      p_puzzle_id: result.puzzleId,
      p_solved: result.solved,
      p_time_taken_ms: result.timeTakenMs || null,
      p_hints_used: result.hintsUsed || 0,
      p_mode: result.mode || 'rated',
    });
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      return {
        newRating: data[0].new_rating,
        ratingChange: data[0].rating_change,
        newStreak: data[0].new_streak,
      };
    }
    
    return null;
  } catch (err) {
    logger.error('Failed to submit puzzle result:', err);
    return null;
  }
}

// ============================================
// LOCAL STORAGE FUNCTIONS (for anonymous users)
// ============================================

const LOCAL_STORAGE_KEY = 'zenChess_puzzleData_v2';

interface LocalPuzzleData {
  rating: number;
  highestRating: number;
  lowestRating: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  currentStreak: number;
  bestStreak: number;
  lastThemes: string[];
  recentPuzzleIds: string[];  // Last 200 puzzle IDs
  lastUpdated: string;
}

const DEFAULT_LOCAL_DATA: LocalPuzzleData = {
  rating: DEFAULT_RATING,
  highestRating: DEFAULT_RATING,
  lowestRating: DEFAULT_RATING,
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  currentStreak: 0,
  bestStreak: 0,
  lastThemes: [],
  recentPuzzleIds: [],
  lastUpdated: new Date().toISOString(),
};

/**
 * Get puzzle data from localStorage
 */
export function getLocalPuzzleData(): LocalPuzzleData {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_LOCAL_DATA, ...JSON.parse(stored) };
    }
  } catch (err) {
    logger.error('Failed to load local puzzle data:', err);
  }
  return { ...DEFAULT_LOCAL_DATA };
}

/**
 * Save puzzle data to localStorage
 */
export function saveLocalPuzzleData(data: Partial<LocalPuzzleData>): void {
  try {
    const current = getLocalPuzzleData();
    const updated = {
      ...current,
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    logger.error('Failed to save local puzzle data:', err);
  }
}

/**
 * Record a puzzle attempt locally
 */
export function recordLocalPuzzleAttempt(
  puzzleId: string,
  puzzleRating: number,
  solved: boolean,
  mode: string = 'rated'
): RatingUpdate {
  const data = getLocalPuzzleData();
  
  // Calculate rating change (only for rated mode)
  let ratingChange = 0;
  let newRating = data.rating;
  
  if (mode === 'rated') {
    ratingChange = calculateEloChange(data.rating, puzzleRating, solved);
    newRating = Math.max(100, data.rating + ratingChange);
  }
  
  // Update streak
  const newStreak = solved ? data.currentStreak + 1 : 0;
  const newBestStreak = Math.max(data.bestStreak, newStreak);
  
  // Add puzzle to recent list (keep last 200)
  const recentPuzzleIds = [puzzleId, ...data.recentPuzzleIds.filter(id => id !== puzzleId)].slice(0, 200);
  
  // Save updated data
  saveLocalPuzzleData({
    rating: newRating,
    highestRating: Math.max(data.highestRating, newRating),
    lowestRating: Math.min(data.lowestRating, newRating),
    gamesPlayed: data.gamesPlayed + 1,
    wins: data.wins + (solved ? 1 : 0),
    losses: data.losses + (solved ? 0 : 1),
    currentStreak: newStreak,
    bestStreak: newBestStreak,
    recentPuzzleIds,
  });
  
  return {
    newRating,
    ratingChange,
    newStreak,
  };
}

/**
 * Update last seen themes (for variety enforcement)
 */
export function updateLastThemes(themes: string[]): void {
  const data = getLocalPuzzleData();
  const primaryTheme = themes[0] || '';
  const lastThemes = [primaryTheme, ...data.lastThemes].slice(0, 5);
  saveLocalPuzzleData({ lastThemes });
}

/**
 * Check if a theme has been seen too many times recently
 */
export function isThemeOverused(theme: string, lastThemes: string[]): boolean {
  const count = lastThemes.filter(t => t === theme).length;
  return count >= THEME_VARIETY_LIMIT;
}

// ============================================
// UNIFIED API (works with or without Supabase)
// ============================================

/**
 * Get user's puzzle stats (from Supabase if logged in, localStorage otherwise)
 */
export async function getPuzzleStats(userId?: string): Promise<UserPuzzleData> {
  // Try Supabase first if user is logged in
  if (userId && isSupabaseConfigured) {
    const supabaseData = await getUserPuzzleRating(userId);
    if (supabaseData) return supabaseData;
  }
  
  // Fall back to localStorage
  const localData = getLocalPuzzleData();
  return {
    rating: localData.rating,
    highestRating: localData.highestRating,
    lowestRating: localData.lowestRating,
    gamesPlayed: localData.gamesPlayed,
    wins: localData.wins,
    losses: localData.losses,
    currentStreak: localData.currentStreak,
    bestStreak: localData.bestStreak,
    lastThemes: localData.lastThemes,
  };
}

/**
 * Submit a puzzle result (to Supabase if logged in, localStorage otherwise)
 */
export async function submitPuzzleResult(
  result: PuzzleResult & { puzzleRating: number },
  userId?: string
): Promise<RatingUpdate> {
  // Try Supabase first if user is logged in
  if (userId && isSupabaseConfigured) {
    const supabaseResult = await submitPuzzleResultToSupabase(userId, result);
    if (supabaseResult) {
      // Also update localStorage for offline access
      recordLocalPuzzleAttempt(result.puzzleId, result.puzzleRating, result.solved, result.mode);
      return supabaseResult;
    }
  }
  
  // Fall back to localStorage
  return recordLocalPuzzleAttempt(
    result.puzzleId,
    result.puzzleRating,
    result.solved,
    result.mode
  );
}

// ============================================
// THEME LABELS (for display)
// ============================================

export const PUZZLE_THEME_LABELS: Record<string, string> = {
  'fork': 'Fork',
  'pin': 'Pin',
  'skewer': 'Skewer',
  'discovery': 'Discovery',
  'deflection': 'Deflection',
  'decoy': 'Decoy',
  'quiet_move': 'Quiet Move',
  'zwischenzug': 'Zwischenzug',
  'back_rank': 'Back Rank',
  'mate_in_1': 'Mate in 1',
  'mate_in_2': 'Mate in 2',
  'mate_in_3': 'Mate in 3',
  'mate_in_4': 'Mate in 4',
  'mate_in_5': 'Mate in 5',
  'sacrifice': 'Sacrifice',
  'hanging_piece': 'Hanging Piece',
  'trapped_piece': 'Trapped Piece',
  'exposed_king': 'Exposed King',
  'double_check': 'Double Check',
  'promotion': 'Promotion',
  'under_promotion': 'Underpromotion',
  'castling': 'Castling',
  'en_passant': 'En Passant',
  'attraction': 'Attraction',
  'clearance': 'Clearance',
  'interference': 'Interference',
  'intermezzo': 'Intermezzo',
  'x_ray': 'X-Ray Attack',
  'defensive': 'Defensive Move',
  'removing_defender': 'Removing Defender',
  'knight_endgame': 'Knight Endgame',
  'bishop_endgame': 'Bishop Endgame',
  'rook_endgame': 'Rook Endgame',
  'queen_endgame': 'Queen Endgame',
  'pawn_endgame': 'Pawn Endgame',
  'queenside_attack': 'Queenside Attack',
  'kingside_attack': 'Kingside Attack',
  'opening': 'Opening',
  'middlegame': 'Middlegame',
  'endgame': 'Endgame',
  'short': 'Short',
  'long': 'Long',
  'very_long': 'Very Long',
  'one_move': 'One Move',
  'crushing': 'Crushing',
  'advantage': 'Advantage',
  'equality': 'Equality',
  'master': 'Master Level',
  'master_vs_master': 'Master vs Master',
  'super_gm': 'Super GM',
  // Legacy theme labels from old system
  'FORK': 'Fork',
  'PIN': 'Pin',
  'SKEWER': 'Skewer',
  'DISCOVERY': 'Discovery',
  'DEFLECTION': 'Deflection',
  'DECOY': 'Decoy',
  'QUIET_MOVE': 'Quiet Move',
  'ZWISCHENZUG': 'Zwischenzug',
  'BACK_RANK': 'Back Rank',
  'MATE_PATTERN': 'Checkmate',
  'SACRIFICE': 'Sacrifice',
  'CHECK': 'Check',
  'CAPTURE': 'Capture',
  'TACTICAL': 'Tactical',
};

/**
 * Get human-readable label for a theme
 */
export function getThemeLabel(theme: string): string {
  return PUZZLE_THEME_LABELS[theme] || theme.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

