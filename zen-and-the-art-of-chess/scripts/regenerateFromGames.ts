// Script to regenerate opening-book and positions from existing games JSON
// This is useful when you have games JSON but need to regenerate the other files

import fs from 'fs';
import path from 'path';
import { Chess } from 'chess.js';
import type { LegendId } from '../src/lib/legendTypes';

type LegendGame = {
  id: string;
  legend: LegendId;
  event?: string;
  site?: string;
  date?: string;
  white: string;
  black: string;
  result: '1-0' | '0-1' | '1/2-1/2' | '*' | '?';
  eco?: string;
  round?: string;
  pgn: string;
};

type OpeningBookNode = {
  fen: string;
  move: string;
  count: number;
};

type LegendPosition = {
  fen: string;
  move: string;
  gameId: string;
  moveNumber: number;
  color: 'w' | 'b';
};

type LegendPositionIndex = Record<string, LegendPosition[]>;

const MAX_OPENING_FULLMOVE = 16;

const LEGEND_NAME_PATTERNS: Record<LegendId, string[]> = {
  fischer: ['Fischer', 'Robert James Fischer', 'Bobby Fischer'],
  capablanca: ['Capablanca', 'Jose Raul Capablanca', 'José Raúl Capablanca', 'Jose Raul Capablanca'],
  steinitz: ['Steinitz', 'Wilhelm Steinitz'],
};

function legendMatchesName(legend: LegendId, name: string | undefined): boolean {
  if (!name) return false;
  const patterns = LEGEND_NAME_PATTERNS[legend];
  const lower = name.toLowerCase();
  return patterns.some((p) => lower.includes(p.toLowerCase()));
}

function uciFromMove(move: any): string {
  const from = move.from;
  const to = move.to;
  const promo = move.promotion ? move.promotion : '';
  return from + to + promo;
}

function buildStructuresFromGames(
  games: LegendGame[],
  legend: LegendId
): {
  openingBook: OpeningBookNode[];
  positionIndex: LegendPositionIndex;
} {
  const openingMap = new Map<string, OpeningBookNode>();
  const positionIndex: LegendPositionIndex = {};

  games.forEach((game) => {
    const chess = new Chess();

    try {
      const pgnLoaded = chess.loadPgn(game.pgn, { sloppy: true });

      if (!pgnLoaded) {
        console.warn(`Failed to load PGN for game ${game.id}`);
        return;
      }

      const isLegendWhite = legendMatchesName(legend, game.white);
      const isLegendBlack = legendMatchesName(legend, game.black);

      if (!isLegendWhite && !isLegendBlack) {
        return;
      }

      const legendColor: 'w' | 'b' = isLegendWhite ? 'w' : 'b';

      const c = new Chess();
      c.loadPgn(game.pgn, { sloppy: true });
      const moveHistory = c.history({ verbose: true });

      const board = new Chess();

      for (const move of moveHistory) {
        const fenBefore = board.fen();
        const fullmove = board.fullMoveNumber;

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

        const sideToMove = board.turn();
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

        board.move(move);
      }
    } catch (err) {
      console.warn(`Error processing game ${game.id}:`, err);
    }
  });

  const openingBook: OpeningBookNode[] = Array.from(openingMap.values());
  openingBook.sort((a, b) => b.count - a.count);

  return { openingBook, positionIndex };
}

async function main() {
  const [, , legendArg, gamesJsonPath, outputDirArg] = process.argv;

  if (!legendArg || !gamesJsonPath) {
    console.error('Usage: tsx scripts/regenerateFromGames.ts <legendId> <games-json-path> [output-dir]');
    console.error('legendId one of: fischer, capablanca, steinitz');
    process.exit(1);
  }

  const legend = legendArg as LegendId;
  if (!['fischer', 'capablanca', 'steinitz'].includes(legend)) {
    console.error('Invalid legendId. Use: fischer, capablanca, steinitz');
    process.exit(1);
  }

  const resolvedInput = path.resolve(gamesJsonPath);
  const outputDir = outputDirArg ? path.resolve(outputDirArg) : path.dirname(resolvedInput);

  if (!fs.existsSync(resolvedInput)) {
    console.error(`Games JSON file not found: ${resolvedInput}`);
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Loading games for ${legend} from: ${resolvedInput}`);
  const games: LegendGame[] = JSON.parse(fs.readFileSync(resolvedInput, 'utf8'));
  console.log(`Loaded ${games.length} games for ${legend}.`);

  console.log('Building opening book and position index...');
  const { openingBook, positionIndex } = buildStructuresFromGames(games, legend);

  const bookOutPath = path.join(outputDir, `legend-${legend}-opening-book.json`);
  const posOutPath = path.join(outputDir, `legend-${legend}-positions.json`);

  fs.writeFileSync(bookOutPath, JSON.stringify(openingBook, null, 2), 'utf8');
  fs.writeFileSync(posOutPath, JSON.stringify(positionIndex, null, 2), 'utf8');

  console.log(`✅ Wrote opening book to: ${bookOutPath}`);
  console.log(`✅ Wrote positions to: ${posOutPath}`);
  console.log(`\n📊 Summary:`);
  console.log(`   Games: ${games.length}`);
  console.log(`   Opening book positions: ${openingBook.length}`);
  console.log(`   Unique positions for Guess-the-Move: ${Object.keys(positionIndex).length}`);
}

main().catch((err) => {
  console.error('Error in regenerateFromGames:', err);
  process.exit(1);
});




