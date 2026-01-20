// ============================================
// LICHESS OPENING EXPLORER API
// On-demand opening data for positions not in local database
// ============================================
//
// API Documentation: https://lichess.org/api#tag/Opening-Explorer
// Endpoint: https://explorer.lichess.ovh/masters
//
// USAGE:
// - Call when local database doesn't have a position
// - Returns master game statistics and popular moves
// - Rate limited: be respectful, cache results
// ============================================

import { logger } from './logger';

export interface LichessOpeningMove {
  uci: string;       // e.g., "e2e4"
  san: string;       // e.g., "e4"
  averageRating: number;
  white: number;     // White wins
  draws: number;
  black: number;     // Black wins
}

export interface LichessOpeningResponse {
  opening: {
    eco: string;
    name: string;
  } | null;
  white: number;
  draws: number;
  black: number;
  moves: LichessOpeningMove[];
  topGames?: Array<{
    id: string;
    white: { name: string; rating: number };
    black: { name: string; rating: number };
    winner: 'white' | 'black' | null;
    year: number;
  }>;
}

// Cache for API responses
const openingCache = new Map<string, { data: LichessOpeningResponse; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

/**
 * Fetch opening data from Lichess Masters database
 * @param fen - Position FEN string
 * @returns Opening data including moves and statistics
 */
export async function fetchLichessOpening(fen: string): Promise<LichessOpeningResponse | null> {
  // Check cache first
  const cached = openingCache.get(fen);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const encodedFen = encodeURIComponent(fen);
    const url = `https://explorer.lichess.ovh/masters?fen=${encodedFen}&topGames=3`;

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        logger.warn('Lichess API rate limited');
      }
      return null;
    }

    const data: LichessOpeningResponse = await response.json();

    // Cache the result
    openingCache.set(fen, { data, timestamp: Date.now() });

    return data;
  } catch (error) {
    logger.error('Failed to fetch Lichess opening:', error);
    return null;
  }
}

/**
 * Get the best move for a position from Lichess data
 * @param fen - Position FEN string
 * @returns Best move in SAN notation, or null if not found
 */
export async function getLichessBestMove(fen: string): Promise<string | null> {
  const data = await fetchLichessOpening(fen);
  if (!data || data.moves.length === 0) {
    return null;
  }

  // Return the most popular move
  return data.moves[0].san;
}

/**
 * Get opening name from Lichess database
 * @param fen - Position FEN string
 * @returns Opening name and ECO code, or null if not found
 */
export async function getLichessOpeningName(
  fen: string
): Promise<{ name: string; eco: string } | null> {
  const data = await fetchLichessOpening(fen);
  if (!data || !data.opening) {
    return null;
  }

  return {
    name: data.opening.name,
    eco: data.opening.eco,
  };
}

/**
 * Check if a position is in Lichess opening book
 * @param fen - Position FEN string
 * @returns True if position has data in masters database
 */
export async function isInLichessBook(fen: string): Promise<boolean> {
  const data = await fetchLichessOpening(fen);
  return data !== null && data.moves.length > 0;
}

/**
 * Clear the opening cache
 */
export function clearOpeningCache(): void {
  openingCache.clear();
}

export default {
  fetchLichessOpening,
  getLichessBestMove,
  getLichessOpeningName,
  isInLichessBook,
  clearOpeningCache,
};
