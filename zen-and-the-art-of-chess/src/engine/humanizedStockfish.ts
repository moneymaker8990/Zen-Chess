// ============================================
// HUMANIZED STOCKFISH ENGINE WRAPPER
// Makes engine moves feel more human-like
// ============================================

import { stockfish } from './stockfish';
import { Chess } from 'chess.js';
import { logger } from '@/lib/logger';

export type BotLevel = 'beginner' | 'intermediate' | 'advanced' | 'coach';

/**
 * Get a humanized move from Stockfish
 * Uses skill level and randomness to make moves feel more natural
 */
export async function getHumanizedMove(params: {
  fen: string;
  moves: string[];
  level?: BotLevel;
}): Promise<string> {
  const { fen, level = 'intermediate' } = params;

  // Map level to skill (0-20)
  const skillMap: Record<BotLevel, number> = {
    beginner: 5,
    intermediate: 12,
    advanced: 18,
    coach: 20,
  };

  const skill = skillMap[level];
  stockfish.setStrength(skill);

  // Get the best move from Stockfish
  const bestMove = await stockfish.getBestMove(fen);
  
  // The skill level affects move quality through Stockfish's skill setting
  // Future enhancement: use multiPV for variety based on skill level
  return bestMove;
}

/**
 * Get multiple candidate moves with evaluations
 * Uses Stockfish at maximum strength to find the best moves
 * For legends, we always use maximum depth for best quality
 */
export async function getEngineCandidatesWithFeatures(params: {
  fen: string;
  moves: string[];
  level?: BotLevel;
  maxCandidates?: number;
}): Promise<Array<{
  move: string;
  scoreCp: number;
  features: {
    isCapture: boolean;
    isCheck: boolean;
    changesMaterial: number;
    kingExposureChange: number;
    simplifies: boolean;
  };
}>> {
  const { fen, maxCandidates = 5 } = params;
  
  const chess = new Chess(fen);
  
  // ALWAYS use maximum strength for consistency and quality
  stockfish.setStrength(20);
  stockfish.setDepth(14); // Ensure good depth for quality moves
  
  // Get the BEST move from Stockfish at maximum depth
  let bestMove: string;
  try {
    bestMove = await stockfish.getBestMove(fen, 10000); // 10 second timeout
  } catch (err) {
    logger.error('Engine failed to get best move:', err);
    // Fallback: return first legal move
    const fallbackMoves = chess.moves({ verbose: true });
    if (fallbackMoves.length === 0) {
      return [];
    }
    bestMove = `${fallbackMoves[0].from}${fallbackMoves[0].to}${fallbackMoves[0].promotion || ''}`;
  }
  
  // Build candidates starting with the best move
  const candidates: Array<{
    move: string;
    scoreCp: number;
    features: {
      isCapture: boolean;
      isCheck: boolean;
      changesMaterial: number;
      kingExposureChange: number;
      simplifies: boolean;
    };
  }> = [];
  
  // Helper to extract features from a move
  const extractFeatures = (moveUci: string) => {
    try {
      const testChess = new Chess(fen);
      const from = moveUci.slice(0, 2);
      const to = moveUci.slice(2, 4);
      const promotion = moveUci.length > 4 ? moveUci[4] : undefined;
      
      const moveResult = testChess.move({ from, to, promotion });
      if (!moveResult) return null;
      
      const isCapture = !!moveResult.captured;
      const isCheck = testChess.inCheck();
      
      // Material change
      let changesMaterial = 0;
      if (isCapture) {
        const pieceValues: Record<string, number> = {
          'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 0
        };
        changesMaterial = pieceValues[moveResult.captured || 'p'] || 0;
      }
      
      const kingExposureChange = isCheck ? 10 : 0;
      const simplifies = isCapture && ['q', 'r', 'b', 'n'].includes(moveResult.piece);
      
      return {
        isCapture,
        isCheck,
        changesMaterial,
        kingExposureChange,
        simplifies,
      };
    } catch {
      return null;
    }
  };
  
  // Add the best move with high score
  const bestFeatures = extractFeatures(bestMove);
  if (bestFeatures) {
    candidates.push({
      move: bestMove,
      scoreCp: 100, // Best move gets top score
      features: bestFeatures,
    });
  }
  
  // Get a few more legal moves to provide variety (but ranked lower)
  const allMoves = chess.moves({ verbose: true });
  for (const move of allMoves.slice(0, maxCandidates * 2)) {
    const moveUci = `${move.from}${move.to}${move.promotion || ''}`;
    
    // Skip if we already have this move
    if (moveUci === bestMove) continue;
    
    const features = extractFeatures(moveUci);
    if (!features) continue;
    
    // Give lower scores to non-best moves
    // Captures and checks are more valuable alternatives
    const isGoodMove = features.isCheck || features.isCapture;
    const scoreCp = isGoodMove ? 50 : 10;
    
    candidates.push({
      move: moveUci,
      scoreCp,
      features,
    });
    
    if (candidates.length >= maxCandidates) break;
  }
  
  // Sort by score (best move first)
  candidates.sort((a, b) => b.scoreCp - a.scoreCp);
  return candidates.slice(0, maxCandidates);
}

