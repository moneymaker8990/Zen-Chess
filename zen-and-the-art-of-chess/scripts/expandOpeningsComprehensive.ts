// scripts/expandOpeningsComprehensive.ts
// Generates comprehensive opening lines to match/exceed Chessreps
// Target: At least as many lines as Chessreps for each opening

import fs from "fs";
import path from "path";
import { Chess } from "chess.js";
import * as pgnParser from "@mliebelt/pgn-parser";

interface OpeningLine {
  id: string;
  name: string;
  variation: string;
  eco: string;
  moves: string[];
  fen: string;
  description: string;
  keyIdeas: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  category: 'e4' | 'd4' | 'c4' | 'nf3' | 'other';
}

// Chessreps targets (we want to match or exceed these)
const OPENING_TARGETS: { 
  files: string[]; 
  name: string; 
  eco: string; 
  category: OpeningLine['category']; 
  target: number;
  description: string;
  keyIdeas: string[];
}[] = [
  // ITALIAN GAME - Target: 22+
  { files: ["GiuocoPiano.pgn", "TwoKnights.pgn"], name: "Italian Game", eco: "C50", category: "e4", target: 25, description: "Classical development with Bc4. Control the center and prepare attacks.", keyIdeas: ["Central control", "Piece development", "Kingside attack"] },
  
  // RUY LOPEZ - Target: 55+
  { files: ["RuyLopezMarshall.pgn", "RuyLopezBreyer.pgn", "RuyLopezChigorin.pgn", "RuyLopezBerlin.pgn", "RuyLopezOpen.pgn", "RuyLopezExchange.pgn", "RuyLopezClassical.pgn", "RuyLopezModSteinitz.pgn", "RuyLopezAntiMarshall.pgn", "RuyLopezArchangelsk.pgn", "RuyLopezFlohr-Zaitsev.pgn"], name: "Ruy Lopez", eco: "C60", category: "e4", target: 60, description: "The Spanish torture. Relentless pressure over 50+ moves.", keyIdeas: ["Long-term pressure", "a4-a5 expansion", "Central control"] },
  
  // SICILIAN - Target: 38+ (we have 41)
  { files: ["SicilianNajdorf6Bg5.pgn", "SicilianNajdorf6Be3.pgn", "SicilianNajdorf6Be2.pgn", "SicilianNajdorf6Bc4.pgn", "SicilianDragonYugoslav.pgn", "SicilianSveshnikov.pgn", "SicilianTaimanovMain.pgn", "SicilianAccelDragon.pgn", "SicilianScheveningen.pgn", "SicilianKan5Nc3.pgn", "SicilianRichter-Rauzer.pgn", "SicilianClassicalSozin.pgn"], name: "Sicilian Defense", eco: "B20", category: "e4", target: 45, description: "Black's fighting response to 1.e4. Asymmetric warfare.", keyIdeas: ["Counterattack", "Pawn breaks", "Dynamic play"] },
  
  // FRENCH - Target: 26
  { files: ["FrWinawerMain.pgn", "FrenchClassical.pgn", "FrenchAdvance.pgn", "FrenchMacCutcheon.pgn", "FrenchBurn.pgn", "FrTarrasch3c5.pgn", "FrenchRubinstein.pgn", "FrenchSteinitz.pgn"], name: "French Defense", eco: "C00", category: "e4", target: 30, description: "Solid fortress with counterattacking chances.", keyIdeas: ["c5 break", "Light square play", "Pawn chains"] },
  
  // CARO-KANN - Target: 28
  { files: ["Caro-KannClassic.pgn", "Caro-KannAdv.pgn", "Caro-KannPan-Bot.pgn", "Caro-Kann4Nd7.pgn", "Caro-Kann4Nf6.pgn", "Caro-KannEx.pgn"], name: "Caro-Kann Defense", eco: "B10", category: "e4", target: 30, description: "Solid as granite. Develop the bishop before playing e6.", keyIdeas: ["Solid structure", "Bishop development", "Endgame focus"] },
  
  // QUEEN'S GAMBIT - Target: 36
  { files: ["QGDOrthoMain.pgn", "QGAMain.pgn", "SemiSlavMeran.pgn", "SemiSlavBotvinnik.pgn", "SlavMain.pgn", "QGDExchange.pgn", "QGD5Bf4.pgn"], name: "Queen's Gambit", eco: "D00", category: "d4", target: 40, description: "Classical chess at its finest. Control the center.", keyIdeas: ["Central control", "Minority attack", "IQP play"] },
  
  // KING'S INDIAN - Target: 35
  { files: ["KIDClassical.pgn", "KIDSaemisch.pgn", "KIDFianchetto.pgn", "KID4pawns.pgn", "KIDAverbakh.pgn", "KIDPetrosian.pgn"], name: "King's Indian Defense", eco: "E60", category: "d4", target: 40, description: "Let White build a center, then blow it up.", keyIdeas: ["f5 break", "Kingside attack", "Piece activity"] },
  
  // LONDON - Target: 28
  { files: ["London2e6.pgn", "London2g6.pgn"], name: "London System", eco: "D02", category: "d4", target: 30, description: "Solid and reliable. Bf4, e3, Nf3, Be2, castle.", keyIdeas: ["Solid structure", "e4 break", "Kingside play"] },
  
  // SCOTCH - Target: 27
  { files: ["Scotch4Bc5.pgn", "Scotch4Nf6.pgn", "ScotchGambit.pgn", "ScotchOther4.pgn"], name: "Scotch Game", eco: "C45", category: "e4", target: 30, description: "Open the center early. Active piece play.", keyIdeas: ["Open center", "Piece activity", "Development lead"] },
  
  // CATALAN - Target: 20
  { files: ["CatalanOpen.pgn", "CatalanClosed.pgn", "Catalan3Bb4.pgn", "Catalan3c5.pgn"], name: "Catalan Opening", eco: "E00", category: "d4", target: 25, description: "Fianchetto pressure on the long diagonal.", keyIdeas: ["Long diagonal", "Queenside pressure", "Endgame edge"] },
  
  // NIMZO-INDIAN - Target: 25
  { files: ["NimzoCl4O-O.pgn", "NimzoRub4O-O.pgn", "NimzoSaemisch.pgn", "Nimzo4Nf3.pgn", "NimzoLeningrad.pgn", "NimzoCl4c5.pgn"], name: "Nimzo-Indian Defense", eco: "E20", category: "d4", target: 30, description: "Pin the knight, control e4. Perfect balance.", keyIdeas: ["e4 control", "Doubled pawns", "Flexibility"] },
  
  // GRUNFELD - Target: 20
  { files: ["GrunfeldExchange.pgn", "GrunfeldFianchetto.pgn", "Grunfeld4Nf3.pgn", "GrunfeldOther.pgn"], name: "Grünfeld Defense", eco: "D70", category: "d4", target: 25, description: "Hypermodern destruction. Attack White's center.", keyIdeas: ["Center pressure", "Dragon bishop", "Queenside play"] },
  
  // VIENNA - Target: 33
  { files: ["Vienna.pgn"], name: "Vienna Game", eco: "C25", category: "e4", target: 35, description: "Delay Nf3 to play f4. Aggressive and surprising.", keyIdeas: ["f4 advance", "Piece activity", "Tactical shots"] },
  
  // KING'S GAMBIT - Target: 22
  { files: ["KingsGambit.pgn"], name: "King's Gambit", eco: "C30", category: "e4", target: 25, description: "Sacrifice f2-f4 for rapid development and attack.", keyIdeas: ["Rapid development", "Open f-file", "King hunt"] },
  
  // ENGLISH - Target: 17 (we have 23)
  { files: ["EnglishSymMain.pgn", "EnglishSicRevClosed.pgn", "EnglishSymFourKnights.pgn", "English1e6Main.pgn", "EnglishSicRevBremen.pgn"], name: "English Opening", eco: "A10", category: "c4", target: 25, description: "Flexible flank opening. Transpose or stay unique.", keyIdeas: ["Flexibility", "d4/e4 breaks", "Positional play"] },
  
  // RÉTI - Target: 15
  { files: ["Reti2c4.pgn", "Reti2b3.pgn"], name: "Réti Opening", eco: "A04", category: "nf3", target: 20, description: "Hypermodern control from afar.", keyIdeas: ["Fianchetto", "Central control", "Flexibility"] },
  
  // PETROV - New
  { files: ["PetroffMain.pgn", "PetroffOther3.pgn"], name: "Petrov Defense", eco: "C42", category: "e4", target: 15, description: "Symmetrical and solid. Neutralize White's initiative.", keyIdeas: ["Symmetry", "Solid structure", "Simplification"] },
  
  // SCANDINAVIAN - New
  { files: ["Scand3Qd6-Qd8.pgn", "Scand2Qxd5-3Qa5.pgn"], name: "Scandinavian Defense", eco: "B01", category: "e4", target: 15, description: "Strike back immediately with ...d5!", keyIdeas: ["Early queen", "Solid setup", "Counterplay"] },
  
  // ALEKHINE - New
  { files: ["AlekhineModern.pgn", "Alekhine4Pawns.pgn", "AlekhineExchange.pgn"], name: "Alekhine Defense", eco: "B02", category: "e4", target: 15, description: "Provoke White's pawns forward, then strike back.", keyIdeas: ["Hypermodern", "Pawn hunting", "Counterattack"] },
  
  // PIRC/MODERN - New
  { files: ["PircClassical.pgn", "PircAustrian.pgn", "Modern3Nc3-d6.pgn"], name: "Pirc Defense", eco: "B07", category: "e4", target: 15, description: "Fianchetto and flexible pawn structure.", keyIdeas: ["Fianchetto", "Flexibility", "Counterplay"] },
  
  // BENONI - New
  { files: ["ModernBenoni6e4.pgn", "ModernBenoni6Nf3.pgn", "BenkoGambit.pgn"], name: "Modern Benoni", eco: "A60", category: "d4", target: 15, description: "Asymmetric structure with queenside pressure.", keyIdeas: ["a6-b5 expansion", "e5 break", "Piece activity"] },
  
  // DUTCH - New
  { files: ["DutchLeningrad.pgn", "DutchClassical.pgn"], name: "Dutch Defense", eco: "A80", category: "d4", target: 15, description: "Fight for e4 with ...f5 from move one.", keyIdeas: ["e4 control", "Kingside attack", "Dynamic play"] },
  
  // QUEEN'S INDIAN - New
  { files: ["QID4g3-Ba6.pgn", "QID4a3.pgn", "QID4Nc3.pgn"], name: "Queen's Indian Defense", eco: "E12", category: "d4", target: 15, description: "Fianchetto the queen's bishop. Solid and flexible.", keyIdeas: ["b7 fianchetto", "e4 control", "Solid play"] },
  
  // BOGO-INDIAN - New
  { files: ["Bogo4Bd2.pgn", "Bogo4Nbd2.pgn"], name: "Bogo-Indian Defense", eco: "E11", category: "d4", target: 10, description: "Flexible system after 1.d4 Nf6 2.c4 e6 3.Nf3 Bb4+.", keyIdeas: ["Flexibility", "Solid structure", "Transpositions"] },
];

function getMoveListFromPgn(pgn: string, maxMoves: number = 20): string[] {
  const chess = new Chess();
  try {
    chess.loadPgn(pgn, { sloppy: true });
    const history = chess.history();
    return history.slice(0, maxMoves);
  } catch {
    return [];
  }
}

function extractVariation(pgn: string): string {
  const openingMatch = pgn.match(/\[Opening\s+"([^"]+)"\]/);
  const variationMatch = pgn.match(/\[Variation\s+"([^"]+)"\]/);
  const ecoMatch = pgn.match(/\[ECO\s+"([^"]+)"\]/);
  
  if (variationMatch) return variationMatch[1];
  if (openingMatch) return openingMatch[1];
  return ecoMatch ? ecoMatch[1] : "Main Line";
}

function getDifficulty(moves: string[]): 1 | 2 | 3 | 4 | 5 {
  const len = moves.length;
  if (len <= 10) return 1;
  if (len <= 14) return 2;
  if (len <= 18) return 3;
  if (len <= 22) return 4;
  return 5;
}

async function main() {
  const pgnDir = path.resolve("./pgnmentor-pgns");
  const outputFile = path.resolve("./src/data/openings/comprehensive-openings.ts");
  
  const allOpenings: OpeningLine[] = [];
  let idCounter = 1000;
  
  for (const openingDef of OPENING_TARGETS) {
    let linesForOpening = 0;
    const seenVariations = new Set<string>();
    
    console.log(`\nProcessing ${openingDef.name} (target: ${openingDef.target})...`);
    
    for (const file of openingDef.files) {
      if (linesForOpening >= openingDef.target) break;
      
      const filePath = path.join(pgnDir, file);
      if (!fs.existsSync(filePath)) {
        console.log(`  Skipping ${file} - not found`);
        continue;
      }
      
      const pgnContent = fs.readFileSync(filePath, "utf8");
      
      try {
        const parsedGames = pgnParser.parse(pgnContent);
        const games = pgnContent.split(/(?=\[Event)/).filter(g => g.trim().length > 50);
        
        // Process more games from each file
        const maxGamesPerFile = Math.ceil((openingDef.target - linesForOpening) / openingDef.files.length) + 5;
        let gamesProcessed = 0;
        
        for (let i = 0; i < parsedGames.length && gamesProcessed < maxGamesPerFile && linesForOpening < openingDef.target; i++) {
          const gamePgn = games[i] || "";
          const moves = getMoveListFromPgn(gamePgn);
          
          if (moves.length < 10) continue;
          
          // Create unique key from first 12 moves
          const variationKey = moves.slice(0, 12).join(" ");
          if (seenVariations.has(variationKey)) continue;
          seenVariations.add(variationKey);
          
          const variation = extractVariation(gamePgn);
          
          // Get final FEN
          const board = new Chess();
          for (const move of moves) {
            try { board.move(move); } catch { break; }
          }
          
          const opening: OpeningLine = {
            id: `comp-${idCounter++}`,
            name: openingDef.name,
            variation: variation,
            eco: openingDef.eco,
            moves: moves,
            fen: board.fen(),
            description: openingDef.description,
            keyIdeas: openingDef.keyIdeas,
            difficulty: getDifficulty(moves),
            category: openingDef.category,
          };
          
          allOpenings.push(opening);
          linesForOpening++;
          gamesProcessed++;
        }
        
        console.log(`  ${file}: +${gamesProcessed} lines`);
      } catch (err) {
        console.log(`  Error processing ${file}`);
      }
    }
    
    console.log(`  Total for ${openingDef.name}: ${linesForOpening} lines ${linesForOpening >= openingDef.target ? '✓' : '(need more)'}`);
  }
  
  // Generate TypeScript file
  const tsContent = `// ============================================
// COMPREHENSIVE OPENING LINES DATABASE
// Generated to match/exceed Chessreps coverage
// ============================================

import type { OpeningLine } from './index';

export const comprehensiveOpenings: OpeningLine[] = ${JSON.stringify(allOpenings, null, 2)};

export default comprehensiveOpenings;
`;
  
  fs.writeFileSync(outputFile, tsContent, "utf8");
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`📊 SUMMARY`);
  console.log(`${'='.repeat(50)}`);
  console.log(`Total lines generated: ${allOpenings.length}`);
  console.log(`Output: ${outputFile}`);
  
  // Summary by opening
  const counts: Record<string, number> = {};
  allOpenings.forEach(o => {
    counts[o.name] = (counts[o.name] || 0) + 1;
  });
  
  console.log(`\nLines per opening:`);
  Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([name, count]) => {
    const target = OPENING_TARGETS.find(t => t.name === name)?.target || 0;
    const status = count >= target ? '✅' : '⚠️';
    console.log(`  ${status} ${name}: ${count} (target: ${target})`);
  });
}

main().catch(console.error);








