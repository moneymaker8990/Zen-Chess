import { Chess } from 'chess.js';
import type { AnnotatedMove } from '@/data/instructiveGames/types';
import { logger } from './logger';

/**
 * Parse a PGN string and convert it to annotated moves with FEN positions
 */
export function parsePgnToMoves(pgn: string): AnnotatedMove[] {
  const moves: AnnotatedMove[] = [];
  
  try {
    const chess = new Chess();
    
    // Extract just the moves from PGN (remove headers and comments)
    const movesSection = pgn.replace(/\[.*?\]\s*/g, '').trim();
    
    // Parse the PGN
    chess.loadPgn(pgn);
    
    // Get the move history
    const history = chess.history({ verbose: true });
    
    // Reset and replay to get FEN at each position
    chess.reset();
    
    for (const move of history) {
      chess.move(move);
      moves.push({
        move: move.san,
        fen: chess.fen(),
      });
    }
  } catch (error) {
    logger.warn('Failed to parse PGN:', error);
  }
  
  return moves;
}

/**
 * Parse a PGN string and extract metadata
 */
export function parsePgnMetadata(pgn: string): {
  event?: string;
  site?: string;
  date?: string;
  white?: string;
  black?: string;
  result?: string;
  eco?: string;
} {
  const metadata: Record<string, string> = {};
  const headerRegex = /\[(\w+)\s+"([^"]*)"\]/g;
  let match;
  
  while ((match = headerRegex.exec(pgn)) !== null) {
    metadata[match[1].toLowerCase()] = match[2];
  }
  
  return {
    event: metadata.event,
    site: metadata.site,
    date: metadata.date,
    white: metadata.white,
    black: metadata.black,
    result: metadata.result,
    eco: metadata.eco,
  };
}

/**
 * Load games from legend JSON file
 */
export interface LegendGame {
  id: string;
  legend: string;
  event: string;
  site: string;
  date: string;
  white: string;
  black: string;
  result: string;
  eco: string;
  pgn: string;
}

/**
 * Fetch legend games from the public data folder
 */
export async function fetchLegendGames(legendId: string): Promise<LegendGame[]> {
  try {
    const response = await fetch(`/data/legends/legend-${legendId}-games.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch legend games for ${legendId}`);
    }
    return await response.json();
  } catch (error) {
    logger.error('Error fetching legend games:', error);
    return [];
  }
}

/**
 * Find a legend game by players and approximate year
 */
export function findLegendGame(
  games: LegendGame[],
  whiteName: string,
  blackName: string,
  year?: number
): LegendGame | null {
  const normalizedWhite = whiteName.toLowerCase().split(' ').pop() || '';
  const normalizedBlack = blackName.toLowerCase().split(' ').pop() || '';
  
  // First try exact match
  let match = games.find(g => {
    const gWhite = g.white.toLowerCase();
    const gBlack = g.black.toLowerCase();
    return (gWhite.includes(normalizedWhite) && gBlack.includes(normalizedBlack)) ||
           (gWhite.includes(normalizedBlack) && gBlack.includes(normalizedWhite));
  });
  
  if (match && year) {
    // Try to find one from the same year
    const yearStr = String(year);
    const yearMatch = games.find(g => {
      const gWhite = g.white.toLowerCase();
      const gBlack = g.black.toLowerCase();
      const matchesPlayers = (gWhite.includes(normalizedWhite) && gBlack.includes(normalizedBlack)) ||
                             (gWhite.includes(normalizedBlack) && gBlack.includes(normalizedWhite));
      return matchesPlayers && g.date.includes(yearStr);
    });
    if (yearMatch) return yearMatch;
  }
  
  return match || null;
}

/**
 * All available legends
 */
export const LEGEND_IDS = [
  'morphy', 'steinitz', 'lasker', 'capablanca', 'alekhine',
  'botvinnik', 'tal', 'fischer', 'karpov', 'kasparov',
  'carlsen', 'spassky'
] as const;

export type LegendId = typeof LEGEND_IDS[number];

/**
 * Map player names to legend IDs
 */
export function getPlayerLegendId(playerName: string): LegendId | null {
  const name = playerName.toLowerCase();
  for (const legendId of LEGEND_IDS) {
    if (name.includes(legendId)) {
      return legendId;
    }
  }
  // Handle special cases
  if (name.includes('magnus')) return 'carlsen';
  if (name.includes('bobby')) return 'fischer';
  if (name.includes('josé') || name.includes('jose')) return 'capablanca';
  if (name.includes('mikhail') && name.includes('tal')) return 'tal';
  if (name.includes('mikhail') && name.includes('bot')) return 'botvinnik';
  if (name.includes('anatoly')) return 'karpov';
  if (name.includes('garry')) return 'kasparov';
  if (name.includes('emanuel')) return 'lasker';
  if (name.includes('wilhelm') || name.includes('steinitz')) return 'steinitz';
  if (name.includes('alexander') && name.includes('alekhine')) return 'alekhine';
  if (name.includes('boris')) return 'spassky';
  if (name.includes('paul') && name.includes('morphy')) return 'morphy';
  
  return null;
}







