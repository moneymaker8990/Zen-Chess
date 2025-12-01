// scripts/parseLegendPGNs.ts
//
// Usage (example from project root):
// npx tsx scripts/parseLegendPGNs.ts fischer ./data/legends/fischer.pgn ./data/legends
//
// This will generate:
//  - ./data/legends/legend-fischer-games.json
//  - ./data/legends/legend-fischer-opening-book.json
//  - ./data/legends/legend-fischer-positions.json
//
// Dependencies:
//   npm install chess.js pgn-parser

import fs from "fs";
import path from "path";
import { Chess } from "chess.js";
import * as pgnParser from "@mliebelt/pgn-parser";

type LegendId = "fischer" | "capablanca" | "steinitz" | "alekhine" | "spassky" | "kasparov" | "karpov" | "tal" | "botvinnik" | "morphy" | "carlsen" | "lasker";

type LegendGame = {
  id: string;
  legend: LegendId;
  event?: string;
  site?: string;
  date?: string;
  white: string;
  black: string;
  result: "1-0" | "0-1" | "1/2-1/2" | "*" | "?";
  eco?: string;
  round?: string;
  pgn: string;
};

type LegendPosition = {
  fen: string;
  move: string; // UCI
  gameId: string;
  moveNumber: number; // fullmove number from chess.js
  color: "w" | "b";   // legend's color
};

type OpeningBookNode = {
  fen: string;
  move: string;  // UCI
  count: number; // how often this move was played from this FEN
};

type LegendPositionIndex = Record<string, LegendPosition[]>; // key: fen

// --- CONFIG --- //

// How deep to consider "opening" moves (in full moves).
const MAX_OPENING_FULLMOVE = 16;

// Rough mapping of legend names to header matching patterns.
const LEGEND_NAME_PATTERNS: Record<LegendId, string[]> = {
  fischer: ["Fischer", "Robert James Fischer", "Bobby Fischer", "Robert J Fischer"],
  capablanca: ["Capablanca", "Jose Raul Capablanca", "José Raúl Capablanca", "Jose Raul Capablanca"],
  steinitz: ["Steinitz", "Wilhelm Steinitz"],
  alekhine: ["Alekhine", "Alexander Alekhine", "Aleksandr Alekhine"],
  spassky: ["Spassky", "Boris Spassky", "Boris V Spassky"],
  kasparov: ["Kasparov", "Garry Kasparov", "Gary Kasparov", "Garri Kasparov"],
  karpov: ["Karpov", "Anatoly Karpov", "Anatoli Karpov"],
  tal: ["Tal,", "Mikhail Tal", "Mihail Tal", "Tal, M", "Tal, Mikhail"],
  botvinnik: ["Botvinnik", "Mikhail Botvinnik", "Michail Botvinnik"],
  morphy: ["Morphy", "Paul Morphy"],
  carlsen: ["Carlsen", "Magnus Carlsen"],
  lasker: ["Lasker, E", "Emanuel Lasker", "Lasker, Emanuel", "Em Lasker"],
};

function legendMatchesName(legend: LegendId, name: string | undefined): boolean {
  if (!name) return false;
  const patterns = LEGEND_NAME_PATTERNS[legend];
  const lower = name.toLowerCase();
  return patterns.some((p) => lower.includes(p.toLowerCase()));
}

// --- PGN → structured data --- //

function parsePgnFileToGames(
  legend: LegendId,
  pgnContent: string
): LegendGame[] {
  // Use @mliebelt/pgn-parser to get structured game data
  // @ts-ignore - pgn-parser typings are loose
  const parsedGames = pgnParser.parse(pgnContent);

  // Split raw PGN content into individual games for PGN string extraction
  // Use the pattern that works: split before each [Event tag
  const rawGameStrings = pgnContent
    .split(/(?=\[Event)/)
    .map(g => g.trim())
    .filter(g => g.length > 0 && g.startsWith('['));
  
  // For each game, extract just that game (remove any trailing content from next game)
  const cleanGameStrings = rawGameStrings.map((gameStr, idx) => {
    if (idx < rawGameStrings.length - 1) {
      // This isn't the last game - remove anything after the result
      const resultMatch = gameStr.match(/(1-0|0-1|1\/2-1\/2|\*)\s*$/m);
      if (resultMatch) {
        const endIndex = resultMatch.index! + resultMatch[0].length;
        return gameStr.substring(0, endIndex).trim();
      }
    }
    return gameStr.trim();
  });

  console.log(`Split PGN into ${rawGameStrings.length} raw game strings`);
  console.log(`Parsed ${parsedGames.length} games with pgn-parser`);

  const games: LegendGame[] = [];

  parsedGames.forEach((g: any, idx: number) => {
    const tags: Record<string, string> = {};
    if (Array.isArray(g.headers)) {
      g.headers.forEach((h: any) => {
        tags[h.name] = h.value;
      });
    }

    // Extract headers - try from parsed object first, then from PGN string
    let event = tags["Event"];
    let site = tags["Site"];
    let date = tags["Date"];
    let white = tags["White"] ?? "";
    let black = tags["Black"] ?? "";
    let result = (tags["Result"] as LegendGame["result"]) ?? "?";
    let eco = tags["ECO"];
    let round = tags["Round"];
    
    // If headers are missing, try to extract from PGN string directly
    const gamePgnRaw = cleanGameStrings[idx] || extractGamePgnFromIndex(pgnContent, idx) || '';
    
    if (!white || white === "Unknown" || !black || black === "Unknown") {
      // Extract from PGN string using regex
      const whiteMatch = gamePgnRaw.match(/\[White\s+"([^"]+)"\]/);
      const blackMatch = gamePgnRaw.match(/\[Black\s+"([^"]+)"\]/);
      if (whiteMatch) white = whiteMatch[1];
      if (blackMatch) black = blackMatch[1];
    }
    
    if (!event) {
      const eventMatch = gamePgnRaw.match(/\[Event\s+"([^"]+)"\]/);
      if (eventMatch) event = eventMatch[1];
    }
    
    if (!date) {
      const dateMatch = gamePgnRaw.match(/\[Date\s+"([^"]+)"\]/);
      if (dateMatch) date = dateMatch[1];
    }
    
    if (!site) {
      const siteMatch = gamePgnRaw.match(/\[Site\s+"([^"]+)"\]/);
      if (siteMatch) site = siteMatch[1];
    }
    
    if (result === "?") {
      const resultMatch = gamePgnRaw.match(/\[Result\s+"([^"]+)"\]/);
      if (resultMatch) result = resultMatch[1] as LegendGame["result"];
    }
    
    if (!eco) {
      const ecoMatch = gamePgnRaw.match(/\[ECO\s+"([^"]+)"\]/);
      if (ecoMatch) eco = ecoMatch[1];
    }
    
    // Fallback to "Unknown" if still empty
    white = white || "Unknown";
    black = black || "Unknown";

    // Get PGN string from the properly split games
    let gamePgn: string;
    if (cleanGameStrings[idx] && typeof cleanGameStrings[idx] === 'string' && cleanGameStrings[idx].length > 10) {
      gamePgn = cleanGameStrings[idx];
    } else {
      // Fallback to extraction method
      gamePgn = extractGamePgnFromIndex(pgnContent, idx);
    }
    
    // Final validation - ensure we have a valid PGN string
    if (!gamePgn || gamePgn === '[object Object]' || typeof gamePgn !== 'string' || gamePgn.length < 10) {
      // Last resort: try extraction again
      gamePgn = extractGamePgnFromIndex(pgnContent, idx) || '';
    }

    const id = `${legend}-${idx.toString().padStart(4, "0")}`;

    games.push({
      id,
      legend,
      event,
      site,
      date,
      white,
      black,
      result,
      eco,
      round,
      pgn: gamePgn || '', // Store empty string rather than invalid object
    });
  });

  return games;
}

// Extract game PGN string from original content by index
function extractGamePgnFromIndex(pgnContent: string, index: number): string {
  // Use the working pattern: split before each [Event tag
  const games = pgnContent
    .split(/(?=\[Event)/)
    .map(g => g.trim())
    .filter(g => g.length > 10 && g.startsWith('['));

  if (games[index]) {
    // Clean up: remove trailing content from next game
    let gameStr = games[index];
    if (index < games.length - 1) {
      // Not the last game - remove anything after result
      const resultMatch = gameStr.match(/(1-0|0-1|1\/2-1\/2|\*)\s*$/m);
      if (resultMatch) {
        const endIndex = resultMatch.index! + resultMatch[0].length;
        gameStr = gameStr.substring(0, endIndex).trim();
      }
    }
    return gameStr;
  }
  
  return "";
}

// --- Build opening book + position index --- //

function uciFromMove(move: any): string {
  const from = move.from;
  const to = move.to;
  const promo = move.promotion ? move.promotion : "";
  return from + to + promo;
}

function buildStructuresFromGames(
  games: LegendGame[],
  legend: LegendId
): {
  openingBook: OpeningBookNode[];
  positionIndex: LegendPositionIndex;
} {
  const openingMap = new Map<string, OpeningBookNode>(); // key: fen + "|" + move
  const positionIndex: LegendPositionIndex = {};

  games.forEach((game) => {
    const chess = new Chess();

    try {
      chess.loadPgn(game.pgn, { sloppy: true });
      
      // Check if moves were actually loaded (not just the return value)
      const moveHistory = chess.history({ verbose: true });
      if (moveHistory.length === 0) {
        console.warn(`No moves found in PGN for game ${game.id}`);
        return;
      }

      // Determine which color the legend is in this game
      const isLegendWhite = legendMatchesName(legend, game.white);
      const isLegendBlack = legendMatchesName(legend, game.black);

      // If legend not found in this game, skip this game entirely
      if (!isLegendWhite && !isLegendBlack) {
        return; // Skip games where legend isn't present
      }

      const legendColor: "w" | "b" = isLegendWhite ? "w" : "b";

      // Reset board and reapply moves one by one to extract positions
      const board = new Chess();
      
      // Track stats for debugging
      let processedMoves = 0;
      let openingPositionsAdded = 0;

      for (const move of moveHistory) {
        const fenBefore = board.fen();
        const fullmove = board.fullMoveNumber;
        const sideToMove = board.turn(); // 'w' or 'b'

        try {
          // For opening book: consider ALL moves in first 16 moves (both sides)
          if (fullmove <= MAX_OPENING_FULLMOVE) {
            const uci = uciFromMove(move);
            const key = `${fenBefore}|${uci}`;
            const existing = openingMap.get(key);
            if (existing) {
              existing.count += 1;
            } else {
              openingMap.set(key, {
                fen: fenBefore,
                move: uci,
                count: 1,
              });
            }
          }

          // For Guess-the-Move index:
          // We care about positions where the legend is about to move
          if (sideToMove === legendColor) {
            const legendMoveUci = uciFromMove(move);
            const pos: LegendPosition = {
              fen: fenBefore,
              move: legendMoveUci,
              gameId: game.id,
              moveNumber: fullmove,
              color: legendColor,
            };

            if (!positionIndex[fenBefore]) {
              positionIndex[fenBefore] = [];
            }
            positionIndex[fenBefore].push(pos);
          }

          // Apply the move to the board for next step
          board.move(move);
        } catch (moveError) {
          // If move application fails, skip this move but continue
          console.warn(`Failed to apply move in game ${game.id} at move ${fullmove}:`, moveError);
          break; // Stop processing this game if moves fail
        }
      }
    } catch (err) {
      console.warn(`Error processing game ${game.id}:`, err);
    }
  });

  const openingBook: OpeningBookNode[] = Array.from(openingMap.values());

  // Sort opening book by frequency descending
  openingBook.sort((a, b) => b.count - a.count);

  return { openingBook, positionIndex };
}

// --- Main CLI entry --- //

async function main() {
  const [, , legendArg, inputPgnPath, outputDirArg] = process.argv;
  if (!legendArg || !inputPgnPath) {
    console.error(
      "Usage: tsx scripts/parseLegendPGNs.ts <legendId> <input-pgn-path> [output-dir]"
    );
    console.error(
      "legendId one of: fischer, capablanca, steinitz, alekhine, spassky"
    );
    process.exit(1);
  }

  const legend = legendArg as LegendId;
  const validLegends = ["fischer", "capablanca", "steinitz", "alekhine", "spassky", "kasparov", "karpov", "tal", "botvinnik", "morphy", "carlsen", "lasker"];
  if (!validLegends.includes(legend)) {
    console.error(`Invalid legendId. Use one of: ${validLegends.join(", ")}`);
    process.exit(1);
  }

  const resolvedInput = path.resolve(inputPgnPath);
  const outputDir =
    outputDirArg ? path.resolve(outputDirArg) : path.dirname(resolvedInput);

  if (!fs.existsSync(resolvedInput)) {
    console.error(`Input PGN file not found: ${resolvedInput}`);
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const rawPgn = fs.readFileSync(resolvedInput, "utf8");
  console.log(
    `Parsing PGN for legend '${legend}' from: ${resolvedInput}`
  );

  const games = parsePgnFileToGames(legend, rawPgn);
  console.log(`Parsed ${games.length} games for ${legend}.`);

  const { openingBook, positionIndex } = buildStructuresFromGames(
    games,
    legend
  );

  // Write outputs
  const gamesOutPath = path.join(
    outputDir,
    `legend-${legend}-games.json`
  );
  const bookOutPath = path.join(
    outputDir,
    `legend-${legend}-opening-book.json`
  );
  const posOutPath = path.join(
    outputDir,
    `legend-${legend}-positions.json`
  );

  fs.writeFileSync(gamesOutPath, JSON.stringify(games, null, 2), "utf8");
  fs.writeFileSync(bookOutPath, JSON.stringify(openingBook, null, 2), "utf8");
  fs.writeFileSync(posOutPath, JSON.stringify(positionIndex, null, 2), "utf8");

  console.log(`✅ Wrote games to: ${gamesOutPath}`);
  console.log(`✅ Wrote opening book to: ${bookOutPath}`);
  console.log(`✅ Wrote positions to: ${posOutPath}`);
  console.log(`\n📊 Summary:`);
  console.log(`   Games: ${games.length}`);
  console.log(`   Opening book positions: ${openingBook.length}`);
  console.log(`   Unique positions for Guess-the-Move: ${Object.keys(positionIndex).length}`);
}

main().catch((err) => {
  console.error("Error in parseLegendPGNs:", err);
  process.exit(1);
});

