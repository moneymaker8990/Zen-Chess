// scripts/generateOpeningsFromPGN.ts
// Generates opening lines from PGN Mentor opening files
// Usage: npx tsx scripts/generateOpeningsFromPGN.ts

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

// Opening files to process with their metadata
const OPENING_FILES: { file: string; name: string; category: OpeningLine['category']; eco: string; description: string; keyIdeas: string[] }[] = [
  // Sicilian Variations
  { file: "SicilianNajdorf6Bg5.pgn", name: "Sicilian Defense", eco: "B96", category: "e4", description: "The poisoned pawn variation, extremely sharp and theoretical.", keyIdeas: ["Dynamic counterplay", "King safety decisions", "Central tension"] },
  { file: "SicilianNajdorf6Be3.pgn", name: "Sicilian Defense", eco: "B90", category: "e4", description: "English Attack setup with opposite-side castling.", keyIdeas: ["Opposite-side attacks", "f3-g4-h4 pawn storm", "Queenside counterplay"] },
  { file: "SicilianDragonYugoslav.pgn", name: "Sicilian Defense", eco: "B77", category: "e4", description: "The Yugoslav Attack against the Dragon - mutual king hunts.", keyIdeas: ["h4-h5 pawn storm", "Exchange sacrifice on c3", "Timing of attacks"] },
  { file: "SicilianSveshnikov.pgn", name: "Sicilian Defense", eco: "B33", category: "e4", description: "Black accepts a backward d6 pawn for active piece play.", keyIdeas: ["d5 outpost control", "f5 break", "Piece activity over structure"] },
  { file: "SicilianTaimanovMain.pgn", name: "Sicilian Defense", eco: "B48", category: "e4", description: "Flexible system with ...a6 and ...Qc7.", keyIdeas: ["Flexible pawn structure", "b5 expansion", "Central control"] },
  { file: "SicilianAccelDragon.pgn", name: "Sicilian Defense", eco: "B36", category: "e4", description: "Accelerated Dragon with early ...g6.", keyIdeas: ["Maroczy Bind prevention", "Dragon bishop power", "d5 control"] },
  { file: "SicilianRichter-Rauzer.pgn", name: "Sicilian Defense", eco: "B60", category: "e4", description: "White develops Bg5 early for pressure.", keyIdeas: ["Pressure on d6", "f4 advance", "Piece coordination"] },
  { file: "SicilianScheveningen.pgn", name: "Sicilian Defense", eco: "B84", category: "e4", description: "Small center with e6-d6, rich strategic play.", keyIdeas: ["e5 break", "Keres Attack defense", "Piece maneuvering"] },
  
  // French Defense
  { file: "FrWinawerMain.pgn", name: "French Defense", eco: "C18", category: "e4", description: "Main line Winawer with structural imbalances.", keyIdeas: ["Pawn structure play", "Light square control", "King safety"] },
  { file: "FrenchClassical.pgn", name: "French Defense", eco: "C14", category: "e4", description: "Classical French with solid development.", keyIdeas: ["Central tension", "f6 break", "Piece coordination"] },
  { file: "FrenchAdvance.pgn", name: "French Defense", eco: "C02", category: "e4", description: "Space advantage for White, counterplay for Black.", keyIdeas: ["c5 break", "f6 undermining", "Piece maneuvering"] },
  { file: "FrenchMacCutcheon.pgn", name: "French Defense", eco: "C12", category: "e4", description: "Sharp variation with Bb4 and Bg5 trade.", keyIdeas: ["King position choices", "Pawn structure", "Dynamic play"] },
  
  // Caro-Kann
  { file: "Caro-KannClassic.pgn", name: "Caro-Kann Defense", eco: "B18", category: "e4", description: "Classical Caro-Kann with Bf5 development.", keyIdeas: ["Solid structure", "e6-Nd7 setup", "Endgame orientation"] },
  { file: "Caro-KannAdv.pgn", name: "Caro-Kann Defense", eco: "B12", category: "e4", description: "Advance variation with pawn chains.", keyIdeas: ["c5 break", "Piece maneuvering", "Pawn chain attacks"] },
  { file: "Caro-KannPan-Bot.pgn", name: "Caro-Kann Defense", eco: "B17", category: "e4", description: "Panov-Botvinnik Attack with IQP.", keyIdeas: ["IQP dynamics", "Piece activity", "Endgame transition"] },
  
  // Ruy Lopez
  { file: "RuyLopezMarshall.pgn", name: "Ruy Lopez", eco: "C89", category: "e4", description: "Marshall Attack gambit for Black.", keyIdeas: ["Piece activity compensation", "Attack on White's king", "Dynamic play"] },
  { file: "RuyLopezBreyer.pgn", name: "Ruy Lopez", eco: "C94", category: "e4", description: "Breyer variation with Nb8-d7 maneuver.", keyIdeas: ["Knight regrouping", "Central control", "Long-term maneuvering"] },
  { file: "RuyLopezChigorin.pgn", name: "Ruy Lopez", eco: "C98", category: "e4", description: "Chigorin variation, main battleground.", keyIdeas: ["Central tension", "f5 break", "Pawn structure"] },
  { file: "RuyLopezBerlin.pgn", name: "Ruy Lopez", eco: "C67", category: "e4", description: "Berlin Defense leading to endgame.", keyIdeas: ["Early simplification", "King activity", "Endgame technique"] },
  { file: "RuyLopezOpen.pgn", name: "Ruy Lopez", eco: "C80", category: "e4", description: "Open variation with early d4 break.", keyIdeas: ["Central control", "Piece activity", "Open lines"] },
  
  // Queen's Gambit & d4 systems
  { file: "QGDOrthoMain.pgn", name: "Queen's Gambit Declined", eco: "D63", category: "d4", description: "Orthodox Defense main line.", keyIdeas: ["Minority attack", "Carlsbad structure", "Central control"] },
  { file: "SemiSlavMeran.pgn", name: "Semi-Slav Defense", eco: "D47", category: "d4", description: "Meran variation with active piece play.", keyIdeas: ["b5 expansion", "Central tension", "Dynamic play"] },
  { file: "SemiSlavBotvinnik.pgn", name: "Semi-Slav Defense", eco: "D44", category: "d4", description: "Botvinnik variation - extremely sharp.", keyIdeas: ["Pawn sacrifice", "King safety", "Piece activity"] },
  { file: "SlavMain.pgn", name: "Slav Defense", eco: "D17", category: "d4", description: "Main Slav with Bf5 development.", keyIdeas: ["Light square control", "Central tension", "Solid structure"] },
  { file: "QGAMain.pgn", name: "Queen's Gambit Accepted", eco: "D27", category: "d4", description: "Main line QGA with active development.", keyIdeas: ["Early ...b5", "Active piece play", "Central control"] },
  
  // King's Indian
  { file: "KIDClassical.pgn", name: "King's Indian Defense", eco: "E98", category: "d4", description: "Classical King's Indian main line.", keyIdeas: ["f5 pawn storm", "g5-g4 attack", "Opposite flank attacks"] },
  { file: "KIDSaemisch.pgn", name: "King's Indian Defense", eco: "E81", category: "d4", description: "Sämisch variation with f3.", keyIdeas: ["f4 push", "Central control", "Positional play"] },
  { file: "KIDFianchetto.pgn", name: "King's Indian Defense", eco: "E62", category: "d4", description: "Fianchetto system with g3.", keyIdeas: ["Positional approach", "Central tension", "Long-term maneuvering"] },
  { file: "KID4pawns.pgn", name: "King's Indian Defense", eco: "E77", category: "d4", description: "Four Pawns Attack - aggressive.", keyIdeas: ["Central space", "f5 break", "Counterattack"] },
  
  // Nimzo-Indian
  { file: "NimzoCl4O-O.pgn", name: "Nimzo-Indian Defense", eco: "E53", category: "d4", description: "Classical Nimzo with 4...O-O.", keyIdeas: ["Central control", "e4 square", "Bishop pair compensation"] },
  { file: "NimzoRub4O-O.pgn", name: "Nimzo-Indian Defense", eco: "E46", category: "d4", description: "Rubinstein with e3 setup.", keyIdeas: ["Flexible structure", "Doubled c-pawns", "Piece play"] },
  { file: "NimzoSaemisch.pgn", name: "Nimzo-Indian Defense", eco: "E29", category: "d4", description: "Sämisch variation with a3.", keyIdeas: ["Bishop pair", "Central control", "f3-e4 plan"] },
  
  // Grünfeld
  { file: "GrunfeldExchange.pgn", name: "Grünfeld Defense", eco: "D85", category: "d4", description: "Exchange variation with big center.", keyIdeas: ["Pressure on d4", "Queenside activity", "Dragon bishop"] },
  { file: "GrunfeldFianchetto.pgn", name: "Grünfeld Defense", eco: "D78", category: "d4", description: "Fianchetto variation.", keyIdeas: ["Positional approach", "c4 control", "Long-term play"] },
  
  // Catalan
  { file: "CatalanOpen.pgn", name: "Catalan Opening", eco: "E04", category: "d4", description: "Open Catalan with dxc4.", keyIdeas: ["Long diagonal pressure", "a4 break", "Piece activity"] },
  { file: "CatalanClosed.pgn", name: "Catalan Opening", eco: "E06", category: "d4", description: "Closed Catalan with solid structure.", keyIdeas: ["Long diagonal", "Central control", "Strategic maneuvering"] },
  
  // English Opening
  { file: "EnglishSymMain.pgn", name: "English Opening", eco: "A34", category: "c4", description: "Symmetrical English main lines.", keyIdeas: ["Central flexibility", "d4 or e4 breaks", "Hedgehog formations"] },
  { file: "EnglishSicRevClosed.pgn", name: "English Opening", eco: "A25", category: "c4", description: "Closed Sicilian Reversed.", keyIdeas: ["Kingside expansion", "f4 advance", "Positional play"] },
  { file: "EnglishSymFourKnights.pgn", name: "English Opening", eco: "A35", category: "c4", description: "Four Knights English.", keyIdeas: ["Symmetrical play", "Small advantages", "Flexibility"] },
  
  // Italian & Giuoco Piano
  { file: "GiuocoPiano.pgn", name: "Italian Game", eco: "C54", category: "e4", description: "Classical Italian with d3 systems.", keyIdeas: ["Slow buildup", "Central control", "Pawn breaks"] },
  { file: "TwoKnights.pgn", name: "Italian Game", eco: "C57", category: "e4", description: "Two Knights Defense with Ng5.", keyIdeas: ["Tactical complications", "f7 attacks", "Piece activity"] },
  
  // Petroff
  { file: "PetroffMain.pgn", name: "Petrov Defense", eco: "C42", category: "e4", description: "Main line Petroff - solid and drawish.", keyIdeas: ["Symmetry", "Endgame focus", "Solid structure"] },
  
  // Scotch
  { file: "Scotch4Bc5.pgn", name: "Scotch Game", eco: "C45", category: "e4", description: "Classical Scotch with 4...Bc5.", keyIdeas: ["Open center", "Piece activity", "Development"] },
  
  // London System
  { file: "London2e6.pgn", name: "London System", eco: "D02", category: "d4", description: "London with ...e6 setup.", keyIdeas: ["Solid development", "Bf4-e3 maneuver", "Central control"] },
  
  // Réti
  { file: "RetiKIA.pgn", name: "Réti Opening", eco: "A07", category: "nf3", description: "King's Indian Attack setup.", keyIdeas: ["Flexible formation", "e4 break", "Kingside pressure"] },
  { file: "Reti2c4.pgn", name: "Réti Opening", eco: "A09", category: "nf3", description: "Réti with c4 transpositions.", keyIdeas: ["Flexible setup", "Central control", "Various transpositions"] },
];

function extractVariationFromGame(pgn: string): string {
  const ecoMatch = pgn.match(/\[ECO\s+"([^"]+)"\]/);
  const openingMatch = pgn.match(/\[Opening\s+"([^"]+)"\]/);
  const variationMatch = pgn.match(/\[Variation\s+"([^"]+)"\]/);
  
  if (variationMatch) return variationMatch[1];
  if (openingMatch) return openingMatch[1];
  return ecoMatch ? ecoMatch[1] : "Main Line";
}

function getMoveListFromPgn(pgn: string): string[] {
  const chess = new Chess();
  try {
    chess.loadPgn(pgn, { sloppy: true });
    const history = chess.history();
    // Return first 15-20 moves (30-40 half-moves) for opening lines
    return history.slice(0, 20);
  } catch {
    return [];
  }
}

function getDifficulty(moves: string[]): 1 | 2 | 3 | 4 | 5 {
  const len = moves.length;
  if (len <= 8) return 1;
  if (len <= 12) return 2;
  if (len <= 16) return 3;
  if (len <= 20) return 4;
  return 5;
}

async function main() {
  const pgnDir = path.resolve("./pgnmentor-pgns");
  const outputFile = path.resolve("./src/data/openings/expanded-openings.ts");
  
  const expandedOpenings: OpeningLine[] = [];
  let idCounter = 100;
  
  for (const openingDef of OPENING_FILES) {
    const filePath = path.join(pgnDir, openingDef.file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${openingDef.file} - not found`);
      continue;
    }
    
    const pgnContent = fs.readFileSync(filePath, "utf8");
    
    try {
      const parsedGames = pgnParser.parse(pgnContent);
      
      // Take first 3 unique games from each file
      const processedVariations = new Set<string>();
      let gamesProcessed = 0;
      
      for (const game of parsedGames) {
        if (gamesProcessed >= 3) break;
        
        // Get PGN string from original content
        const gameIndex = parsedGames.indexOf(game);
        const games = pgnContent.split(/(?=\[Event)/).filter(g => g.trim().length > 10);
        const gamePgn = games[gameIndex] || "";
        
        const moves = getMoveListFromPgn(gamePgn);
        if (moves.length < 8) continue;
        
        const variation = extractVariationFromGame(gamePgn);
        const variationKey = moves.slice(0, 10).join(" ");
        
        if (processedVariations.has(variationKey)) continue;
        processedVariations.add(variationKey);
        
        // Get final FEN
        const chess = new Chess();
        try {
          chess.loadPgn(gamePgn, { sloppy: true });
        } catch {
          continue;
        }
        
        // Reset and play just our selected moves
        const board = new Chess();
        for (const move of moves) {
          try {
            board.move(move);
          } catch {
            break;
          }
        }
        
        const opening: OpeningLine = {
          id: `expanded-${idCounter++}`,
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
        
        expandedOpenings.push(opening);
        gamesProcessed++;
      }
      
      console.log(`✅ Processed ${openingDef.file}: ${gamesProcessed} variations`);
    } catch (err) {
      console.error(`Error processing ${openingDef.file}:`, err);
    }
  }
  
  // Generate TypeScript file
  const tsContent = `// ============================================
// EXPANDED OPENING LINES DATABASE
// Generated from PGN Mentor master games
// ============================================

import type { OpeningLine } from './index';

export const expandedOpenings: OpeningLine[] = ${JSON.stringify(expandedOpenings, null, 2)};

export default expandedOpenings;
`;
  
  fs.writeFileSync(outputFile, tsContent, "utf8");
  
  console.log(`\n📊 Summary:`);
  console.log(`   Total openings generated: ${expandedOpenings.length}`);
  console.log(`   Output: ${outputFile}`);
}

main().catch(console.error);








