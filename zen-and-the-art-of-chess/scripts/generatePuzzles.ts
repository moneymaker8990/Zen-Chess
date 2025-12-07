// scripts/generatePuzzles.ts
// Extracts tactical puzzles from master games based on game outcomes
// Usage: npx tsx scripts/generatePuzzles.ts

import fs from "fs";
import path from "path";
import { Chess } from "chess.js";

interface ChessPuzzle {
  id: string;
  fen: string;
  solution: string[];
  themes: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  title: string;
  explanation: string;
  source?: string;
}

// Famous tactical games with known combinations
const TACTICAL_GAMES = [
  // Tal's magical combinations
  {
    legend: "tal",
    gameFile: "legend-tal-games.json",
    description: "Mikhail Tal's tactical brilliancies"
  },
  // Kasparov's crushing attacks
  {
    legend: "kasparov", 
    gameFile: "legend-kasparov-games.json",
    description: "Garry Kasparov's powerful attacks"
  },
  // Fischer's precise tactics
  {
    legend: "fischer",
    gameFile: "legend-fischer-games.json", 
    description: "Bobby Fischer's clinical precision"
  },
  // Alekhine's combinations
  {
    legend: "alekhine",
    gameFile: "legend-alekhine-games.json",
    description: "Alexander Alekhine's artistic combinations"
  },
  // Morphy's romantic attacks
  {
    legend: "morphy",
    gameFile: "legend-morphy-games.json",
    description: "Paul Morphy's brilliant attacks"
  },
];

// Detect tactical themes based on position analysis
function detectThemes(chess: Chess, moveResult: any): string[] {
  const themes: string[] = [];
  const fen = chess.fen();
  
  // Check for checks
  if (chess.inCheck()) {
    themes.push("CHECK");
  }
  
  // Check for captures
  if (moveResult.captured) {
    themes.push("CAPTURE");
    
    // Check for piece value - sacrifice detection
    const pieceValues: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9 };
    const movingPiece = moveResult.piece;
    const capturedPiece = moveResult.captured;
    
    if (pieceValues[movingPiece] > pieceValues[capturedPiece] + 1) {
      themes.push("SACRIFICE");
    }
  }
  
  // Check for checkmate
  if (chess.isCheckmate()) {
    themes.push("MATE_PATTERN");
  }
  
  // Check for back rank patterns
  const toRank = moveResult.to[1];
  if ((toRank === '1' || toRank === '8') && chess.inCheck()) {
    themes.push("BACK_RANK");
  }
  
  // Check for knight moves (potential forks)
  if (moveResult.piece === 'n') {
    // Check if knight attacks multiple pieces
    const knightSquare = moveResult.to;
    const knightMoves = chess.moves({ square: knightSquare, verbose: true });
    const attacks = knightMoves.filter(m => m.captured);
    if (attacks.length >= 2) {
      themes.push("FORK");
    }
  }
  
  // Check for pin/skewer patterns (simplified)
  if (moveResult.piece === 'b' || moveResult.piece === 'r' || moveResult.piece === 'q') {
    themes.push("PIN");
  }
  
  // Default theme
  if (themes.length === 0) {
    themes.push("TACTICAL");
  }
  
  return themes;
}

function getDifficulty(moveCount: number, hasCheck: boolean, hasMate: boolean): 1 | 2 | 3 | 4 | 5 {
  if (hasMate && moveCount <= 2) return 2;
  if (hasMate && moveCount <= 3) return 3;
  if (hasMate) return 4;
  if (hasCheck && moveCount <= 2) return 2;
  if (moveCount <= 2) return 1;
  if (moveCount <= 3) return 3;
  if (moveCount <= 4) return 4;
  return 5;
}

function generateTitle(themes: string[], legend: string): string {
  if (themes.includes("MATE_PATTERN")) return `${legend}'s Checkmate`;
  if (themes.includes("FORK")) return `${legend}'s Fork`;
  if (themes.includes("SACRIFICE")) return `${legend}'s Sacrifice`;
  if (themes.includes("BACK_RANK")) return `Back Rank from ${legend}`;
  if (themes.includes("PIN")) return `${legend}'s Pin`;
  return `${legend}'s Tactic`;
}

function generateExplanation(themes: string[], moves: string[]): string {
  if (themes.includes("MATE_PATTERN")) {
    return `Find the forcing sequence that leads to checkmate in ${moves.length} moves.`;
  }
  if (themes.includes("SACRIFICE")) {
    return `A brilliant sacrifice leads to a winning position.`;
  }
  if (themes.includes("FORK")) {
    return `The knight attacks multiple pieces at once!`;
  }
  if (themes.includes("BACK_RANK")) {
    return `Exploit the weak back rank for a decisive blow.`;
  }
  return `Find the best continuation that wins material or creates a decisive advantage.`;
}

async function extractPuzzlesFromGames(
  gamesPath: string,
  legend: string,
  maxPuzzles: number = 20
): Promise<ChessPuzzle[]> {
  if (!fs.existsSync(gamesPath)) {
    console.log(`Skipping ${gamesPath} - not found`);
    return [];
  }
  
  const games = JSON.parse(fs.readFileSync(gamesPath, "utf8"));
  const puzzles: ChessPuzzle[] = [];
  let puzzleId = 0;
  
  // Focus on decisive games where the legend won
  const winningGames = games.filter((g: any) => {
    const isWhite = g.white?.toLowerCase().includes(legend);
    const isBlack = g.black?.toLowerCase().includes(legend);
    const won = (isWhite && g.result === "1-0") || (isBlack && g.result === "0-1");
    return won && g.pgn && g.pgn.length > 50;
  });
  
  console.log(`Found ${winningGames.length} winning games for ${legend}`);
  
  // Sample games randomly
  const shuffled = winningGames.sort(() => Math.random() - 0.5);
  const sampled = shuffled.slice(0, Math.min(100, shuffled.length));
  
  for (const game of sampled) {
    if (puzzles.length >= maxPuzzles) break;
    
    try {
      const chess = new Chess();
      chess.loadPgn(game.pgn, { sloppy: true });
      
      const history = chess.history({ verbose: true });
      if (history.length < 20) continue; // Skip short games
      
      // Look for critical moments in the game (moves 15-40)
      const board = new Chess();
      
      for (let i = 0; i < history.length && puzzles.length < maxPuzzles; i++) {
        const move = history[i];
        
        // Focus on middle/endgame positions
        if (i < 28 || i > 80) {
          board.move(move);
          continue;
        }
        
        // Check if this is a critical moment
        const isLegendTurn = (
          (game.white?.toLowerCase().includes(legend) && board.turn() === 'w') ||
          (game.black?.toLowerCase().includes(legend) && board.turn() === 'b')
        );
        
        if (!isLegendTurn) {
          board.move(move);
          continue;
        }
        
        // Save position before the move
        const puzzleFen = board.fen();
        
        // Play the move and check if it's tactically interesting
        const result = board.move(move);
        if (!result) continue;
        
        const themes = detectThemes(board, result);
        
        // Only include tactical positions
        const isTactical = themes.some(t => 
          ["SACRIFICE", "FORK", "MATE_PATTERN", "BACK_RANK", "CHECK"].includes(t)
        );
        
        if (!isTactical) continue;
        
        // Try to find a 2-3 move sequence
        const solution: string[] = [history[i].san];
        
        // Add opponent's likely response and follow-up if available
        if (i + 1 < history.length) {
          solution.push(history[i + 1].san);
          if (i + 2 < history.length) {
            solution.push(history[i + 2].san);
          }
        }
        
        // Check if solution leads to checkmate
        const testBoard = new Chess(puzzleFen);
        let leadsMate = false;
        for (const san of solution) {
          try {
            testBoard.move(san);
            if (testBoard.isCheckmate()) {
              leadsMate = true;
              break;
            }
          } catch {
            break;
          }
        }
        
        const hasCheck = themes.includes("CHECK");
        const legendName = legend.charAt(0).toUpperCase() + legend.slice(1);
        
        const puzzle: ChessPuzzle = {
          id: `${legend}-puzzle-${String(puzzleId++).padStart(3, "0")}`,
          fen: puzzleFen,
          solution,
          themes,
          difficulty: getDifficulty(solution.length, hasCheck, leadsMate),
          title: generateTitle(themes, legendName),
          explanation: generateExplanation(themes, solution),
          source: `${game.white} vs ${game.black}, ${game.event || "Unknown"} ${game.date || ""}`
        };
        
        puzzles.push(puzzle);
      }
    } catch (err) {
      // Skip problematic games
      continue;
    }
  }
  
  return puzzles;
}

async function main() {
  const legendsDir = path.resolve("./public/data/legends");
  const outputFile = path.resolve("./src/data/puzzles/master-puzzles.ts");
  
  const allPuzzles: ChessPuzzle[] = [];
  
  for (const config of TACTICAL_GAMES) {
    const gamesPath = path.join(legendsDir, config.gameFile);
    console.log(`\nExtracting puzzles from ${config.legend}...`);
    
    const puzzles = await extractPuzzlesFromGames(gamesPath, config.legend, 25);
    console.log(`  Generated ${puzzles.length} puzzles`);
    
    allPuzzles.push(...puzzles);
  }
  
  // Generate TypeScript file
  const tsContent = `// ============================================
// MASTER GAME PUZZLES
// Tactical positions from legendary games
// Auto-generated from PGN analysis
// ============================================

import type { ChessPuzzle } from '@/lib/types';

export const masterPuzzles: ChessPuzzle[] = ${JSON.stringify(allPuzzles, null, 2)};

export default masterPuzzles;
`;
  
  fs.writeFileSync(outputFile, tsContent, "utf8");
  
  console.log(`\n📊 Summary:`);
  console.log(`   Total puzzles generated: ${allPuzzles.length}`);
  console.log(`   Output: ${outputFile}`);
}

main().catch(console.error);








