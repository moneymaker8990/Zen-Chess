// ============================================
// GUESS THE MOVE - STUDY MODE
// Step through a legend's game, trying to guess their moves
// ============================================

import { Chess } from 'chess.js';
import { stockfish } from './stockfish';
import { getLegendGame } from './legendEngine';
import type { GuessMoveResult, GuessSessionSummary, LegendId } from '@/lib/legendTypes';

/**
 * Score a user's guess against the legend's actual move
 */
export async function scoreGuessMove(args: {
  fen: string;
  userMove: string;
  legendMove: string;
}): Promise<GuessMoveResult> {
  const { fen, userMove, legendMove } = args;

  const isExact = userMove.toLowerCase() === legendMove.toLowerCase();

  // Apply both moves to get resulting positions
  const chessUser = new Chess(fen);
  const chessLegend = new Chess(fen);

  // @ts-expect-error - sloppy option exists in chess.js but not in types
  const userMoveObj = chessUser.move(userMove, { sloppy: true });
  // @ts-expect-error - sloppy option exists in chess.js but not in types
  const legendMoveObj = chessLegend.move(legendMove, { sloppy: true });

  if (!userMoveObj || !legendMoveObj) {
    return {
      fen,
      userMove,
      legendMove,
      isExact: false,
      isTopEngineMatch: false,
      score: 0,
      comment: 'Invalid move',
      tags: ['invalid'],
    };
  }

  // Get evaluations for both positions
  const evalPromise = (fenPos: string): Promise<number> => {
    return new Promise((resolve) => {
      let resolved = false;
      stockfish.analyzePosition(fenPos, (eval_) => {
        if (!resolved) {
          resolved = true;
          // Convert mate scores to centipawns
          if (eval_.mate) {
            resolve(eval_.mate > 0 ? 10000 - eval_.mate * 10 : -10000 - Math.abs(eval_.mate) * 10);
          } else {
            resolve(eval_.score);
          }
        }
      }, 12);

      // Timeout after 2 seconds
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve(0);
        }
      }, 2000);
    });
  };

  const [evalUser, evalLegend] = await Promise.all([
    evalPromise(chessUser.fen()),
    evalPromise(chessLegend.fen()),
  ]);

  // Determine if we're evaluating from white or black's perspective
  const chess = new Chess(fen);
  const sideToMove = chess.turn();
  
  // Adjust evaluation based on side to move
  const adjustedEvalUser = sideToMove === 'w' ? evalUser : -evalUser;
  const adjustedEvalLegend = sideToMove === 'w' ? evalLegend : -evalLegend;

  // Calculate difference
  const delta = adjustedEvalLegend - adjustedEvalUser;

  // Score based on evaluation difference
  let score: number;
  const tags: string[] = [];

  if (isExact) {
    score = 100;
    tags.push('exact');
  } else if (Math.abs(delta) <= 10) {
    score = 90 + Math.floor((10 - Math.abs(delta)) / 10 * 5); // 90-95
    tags.push('equivalent');
  } else if (Math.abs(delta) <= 50) {
    score = 70 + Math.floor((50 - Math.abs(delta)) / 50 * 10); // 70-80
    tags.push('good');
  } else if (Math.abs(delta) <= 150) {
    score = 40 + Math.floor((150 - Math.abs(delta)) / 150 * 20); // 40-60
    tags.push('playable');
  } else {
    score = Math.max(0, 30 - Math.floor(Math.abs(delta) / 100)); // 0-30
    tags.push('blunder');
  }

  // Check if user move matches top engine move
  let isTopEngineMatch = false;
  try {
    const bestMove = await new Promise<string>((resolve) => {
      stockfish.getBestMove(chess.fen()).then(resolve);
    });
    isTopEngineMatch = userMove.toLowerCase() === bestMove.toLowerCase();
    if (isTopEngineMatch) {
      tags.push('engine-best');
    }
  } catch (err) {
    console.warn('Could not check engine move:', err);
  }

  // Additional tagging based on move characteristics
  const userSan = userMoveObj.san;
  const legendSan = legendMoveObj.san;

  // Check for tactical misses
  if (legendSan.includes('+') || legendSan.includes('x')) {
    if (!userSan.includes('+') && !userSan.includes('x')) {
      tags.push('missed-tactic');
    }
  }

  // Check for passivity
  if (delta > 100 && !userMoveObj.captured && !userMoveObj.san.includes('+')) {
    tags.push('too-passive');
  }

  // Check for weakening moves
  if (delta < -50 && (userMoveObj.san.includes('h') || userMoveObj.san.includes('a'))) {
    tags.push('weakening-pawn');
  }

  // Generate comment
  let comment: string;
  if (isExact) {
    comment = 'Perfect! You found the legend\'s move.';
  } else if (score >= 90) {
    comment = 'Excellent! Almost as good as the legend\'s move.';
  } else if (score >= 70) {
    comment = 'Good move, but not quite the legend\'s choice.';
  } else if (score >= 40) {
    comment = 'Playable, but the legend found something stronger.';
  } else {
    comment = 'This move misses the critical idea.';
  }

  return {
    fen,
    userMove,
    legendMove,
    isExact,
    isTopEngineMatch,
    score,
    comment,
    tags,
  };
}

/**
 * Create a guess session from a game
 */
export async function createGuessSessionFromGame(
  legend: LegendId,
  gameId: string
): Promise<{
  game: any;
  positions: Array<{ fen: string; move: string; moveNumber: number }>;
} | null> {
  const game = await getLegendGame(legend, gameId);
  if (!game) return null;

  try {
    // Clean the PGN first to remove problematic characters
    const cleanedPgn = game.pgn
      .split('\n')
      .filter((line: string) => line.trim() && !line.trim().startsWith('%'))
      .join('\n');
    
    const chess = new Chess();
    // @ts-expect-error - sloppy option exists in chess.js but not in types
    chess.loadPgn(cleanedPgn, { sloppy: true });

    const moveHistory = chess.history({ verbose: true });
    
    if (moveHistory.length === 0) {
      throw new Error('No moves found in PGN');
    }
    
    const positions: Array<{ fen: string; move: string; moveNumber: number }> = [];

    // Determine legend's color using the same pattern matching as the parser
    const legendLower = legend.toLowerCase();
    const whiteLower = game.white.toLowerCase();
    
    const isLegendWhite = 
      whiteLower.includes(legendLower) ||
      (legendLower === 'fischer' && (whiteLower.includes('fischer') || whiteLower.includes('bobby'))) ||
      (legendLower === 'capablanca' && (whiteLower.includes('capablanca') || whiteLower.includes('jose') || whiteLower.includes('josé'))) ||
      (legendLower === 'steinitz' && whiteLower.includes('steinitz'));

    // Reset and replay moves
    const board = new Chess();
    for (const move of moveHistory) {
      const fenBefore = board.fen();
      const sideToMove = board.turn();
      
      // Only include positions where legend is to move
      const isLegendTurn = (isLegendWhite && sideToMove === 'w') ||
                           (!isLegendWhite && sideToMove === 'b');

      if (isLegendTurn) {
        const moveUci = `${move.from}${move.to}${move.promotion || ''}`;
        positions.push({
          fen: fenBefore,
          move: moveUci,
          moveNumber: board.moveNumber(),
        });
      }

      board.move(move);
    }

    if (positions.length === 0) {
      console.warn(`No legend positions found in game ${gameId} - legend may not be in this game`);
      return null;
    }

    return { game, positions };
  } catch (error) {
    console.warn(`Failed to load PGN for game ${gameId}, trying move-by-move parsing:`, error);
    // Try parsing move by move, skipping invalid moves
    try {
      const cleanedPgn = game.pgn
        .split('\n')
        .filter((line: string) => line.trim() && !line.trim().startsWith('%'))
        .join('\n');
      
      // Extract just the moves line
      const pgnLines = cleanedPgn.split('\n');
      const movesLine = pgnLines
        .filter((line: string) => !line.startsWith('[') && line.trim())
        .join(' ')
        .replace(/\{.*?\}/g, '') // Remove comments
        .replace(/\(.*?\)/g, '') // Remove variations
        .replace(/\$\d+/g, '') // Remove NAG codes
        .trim();
      
      // Parse moves one by one
      const board = new Chess();
      const validMoves: any[] = [];
      
      // Extract move tokens (handles "1. e4 e5 2. Nf3" format)
      const moveTokens = movesLine
        .replace(/(\d+)\./g, '') // Remove move numbers
        .split(/\s+/)
        .filter((token: string) => {
          const trimmed = token.trim();
          return trimmed && 
                 !trimmed.match(/^(1-0|0-1|1\/2-1\/2|\*|\?)$/) && // Not results
                 !trimmed.match(/^\{/) && // Not comments
                 !trimmed.match(/^\(/); // Not variations
        });
      
      // Try to apply each move
      let consecutiveFailures = 0;
      const maxConsecutiveFailures = 3; // Stop if 3 moves in a row fail
      
      /**
       * Try to disambiguate an ambiguous move by checking which piece can legally move
       */
      const tryDisambiguateMove = (moveStr: string, currentBoard: Chess): any | null => {
        // Pattern: R, N, B, Q, K followed by optional disambiguation (file/rank) and target square
        const piecePattern = /^([RNBQK])([a-h]?[1-8]?)([a-h][1-8])(=?[RNBQ]?)$/;
        const match = moveStr.match(piecePattern);
        
        if (!match) return null;
        
        const [, pieceType, disambiguation, targetSquare, promotion] = match;
        const target = targetSquare as any;
        
        // Get all legal moves for the current position
        const legalMoves = currentBoard.moves({ verbose: true });
        
        // Find all moves that match: same piece type, same target square
        const candidateMoves = legalMoves.filter(m => 
          m.piece === pieceType.toLowerCase() && 
          m.to === target
        );
        
        // If disambiguation is provided, use it
        if (disambiguation) {
          if (disambiguation.length === 1) {
            // File disambiguation (e.g., "Rad8")
            const file = disambiguation;
            const matching = candidateMoves.find(m => m.from.startsWith(file));
            if (matching) {
              try {
                return currentBoard.move({
                  from: matching.from as any,
                  to: matching.to as any,
                  promotion: promotion ? promotion[1] as any : undefined,
                });
              } catch {
                return null;
              }
            }
          } else if (disambiguation.length === 2) {
            // Full disambiguation (e.g., "R1d8")
            const from = disambiguation as any;
            const matching = candidateMoves.find(m => m.from === from);
            if (matching) {
              try {
                return currentBoard.move({
                  from: matching.from as any,
                  to: matching.to as any,
                  promotion: promotion ? promotion[1] as any : undefined,
                });
              } catch {
                return null;
              }
            }
          }
        }
        
        // If no disambiguation or disambiguation didn't work, try the first candidate
        if (candidateMoves.length === 1) {
          const move = candidateMoves[0];
          try {
            return currentBoard.move({
              from: move.from as any,
              to: move.to as any,
              promotion: promotion ? promotion[1] as any : undefined,
            });
          } catch {
            return null;
          }
        }
        
        // Multiple candidates but no disambiguation - can't resolve
        return null;
      };
      
      for (const moveToken of moveTokens) {
        try {
          // @ts-expect-error - sloppy option exists in chess.js but not in types
          let move = board.move(moveToken, { sloppy: true });
          if (move) {
            validMoves.push(move);
            consecutiveFailures = 0; // Reset counter on success
          } else {
            // Try disambiguation
            const disambiguatedMove = tryDisambiguateMove(moveToken, board);
            if (disambiguatedMove) {
              validMoves.push(disambiguatedMove);
              consecutiveFailures = 0;
            } else {
              consecutiveFailures++;
            }
          }
        } catch (moveError) {
          // Try disambiguation before giving up
          const disambiguatedMove = tryDisambiguateMove(moveToken, board);
          if (disambiguatedMove) {
            validMoves.push(disambiguatedMove);
            consecutiveFailures = 0;
          } else {
            consecutiveFailures++;
            console.warn(`Skipping invalid move "${moveToken}" in game ${gameId}`);
            
            // Stop if too many consecutive failures or game is over
            if (consecutiveFailures >= maxConsecutiveFailures || board.isGameOver()) {
              console.warn(`Stopping parsing after ${consecutiveFailures} consecutive failures in game ${gameId}`);
              break;
            }
          }
        }
      }
      
      if (validMoves.length === 0) {
        console.error(`Could not parse any valid moves from PGN for game ${gameId}`);
        return null;
      }
      
      // Now build positions from valid moves
      const positions: Array<{ fen: string; move: string; moveNumber: number }> = [];
      const isLegendWhite = game.white.toLowerCase().includes(legend.toLowerCase()) ||
                            game.white.toLowerCase().includes('fischer') ||
                            game.white.toLowerCase().includes('capablanca') ||
                            game.white.toLowerCase().includes('steinitz');

      const board2 = new Chess();
      for (const move of validMoves) {
        const fenBefore = board2.fen();
        const sideToMove = board2.turn();
        
        const isLegendTurn = (isLegendWhite && sideToMove === 'w') ||
                             (!isLegendWhite && sideToMove === 'b');

        if (isLegendTurn) {
          const moveUci = `${move.from}${move.to}${move.promotion || ''}`;
          positions.push({
            fen: fenBefore,
            move: moveUci,
            moveNumber: board2.moveNumber(),
          });
        }

        board2.move(move);
      }

      if (positions.length === 0) {
        console.warn(`No legend positions found in game ${gameId} after move-by-move parsing`);
        return null;
      }

      return { game, positions };
    } catch (parseError) {
      console.error(`Failed to parse PGN for game ${gameId} with move-by-move parsing:`, parseError);
      return null;
    }
  }
}

/**
 * Generate session summary with weakness tags
 */
export function generateSessionSummary(
  legend: LegendId,
  gameId: string,
  results: GuessMoveResult[]
): GuessSessionSummary {
  const totalScore = results.length > 0
    ? results.reduce((sum, r) => sum + r.score, 0) / results.length
    : 0;

  // Aggregate tags
  const tagCounts = new Map<string, number>();
  for (const result of results) {
    for (const tag of result.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }
  }

  // Convert to weakness tags (filter out positive ones)
  const weaknessTags: string[] = [];
  const negativeTags = ['missed-tactic', 'too-passive', 'weakening-pawn', 'blunder'];
  
  for (const [tag, count] of tagCounts.entries()) {
    if (negativeTags.includes(tag) && count >= 2) {
      weaknessTags.push(tag);
    }
  }

  return {
    legend,
    gameId,
    totalScore: Math.round(totalScore),
    movesGuessed: results,
    detectedWeaknessTags: weaknessTags,
  };
}

/**
 * Generate a study note from a guess session
 */
export function generateStudyNote(summary: GuessSessionSummary): string {
  const legendName = summary.legend.charAt(0).toUpperCase() + summary.legend.slice(1);
  
  let noteText = `## Guess-the-Move Session: ${legendName}\n\n`;
  noteText += `Game ID: ${summary.gameId}\n`;
  noteText += `Score: ${summary.totalScore}/100\n\n`;

  if (summary.detectedWeaknessTags.length > 0) {
    noteText += `### Detected Weaknesses:\n\n`;
    for (const tag of summary.detectedWeaknessTags) {
      noteText += `- ${tag.replace(/-/g, ' ')}\n`;
    }
    noteText += '\n';
  }

  noteText += `### Move Breakdown:\n\n`;
  
  const exactCount = summary.movesGuessed.filter(r => r.isExact).length;
  const goodCount = summary.movesGuessed.filter(r => r.score >= 70).length;
  const poorCount = summary.movesGuessed.filter(r => r.score < 40).length;

  noteText += `- Exact matches: ${exactCount}/${summary.movesGuessed.length}\n`;
  noteText += `- Good moves (70+): ${goodCount}/${summary.movesGuessed.length}\n`;
  noteText += `- Poor moves (<40): ${poorCount}/${summary.movesGuessed.length}\n`;

  return noteText;
}

