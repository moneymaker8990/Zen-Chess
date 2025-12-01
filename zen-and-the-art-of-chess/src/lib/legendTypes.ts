// ============================================
// PLAY THE GREATS - TYPE DEFINITIONS
// ============================================

export type LegendId = 
  | "fischer" 
  | "capablanca" 
  | "steinitz" 
  | "alekhine" 
  | "spassky"
  | "kasparov"
  | "karpov"
  | "tal"
  | "botvinnik"
  | "morphy"
  | "carlsen"
  | "lasker";

export type LegendStyle = {
  name: string;
  description: string;
  tagline: string;
  styleTags: string[];
  aggressiveness: number;       // 0-1, higher = prefers sharp attacks
  simplifyBias: number;         // 0-1, higher = prefers exchanges, endgames
  kingSafetyBias: number;       // 0-1, how much it cares about king cover
  materialism: number;          // 0-1, lower = more willing to sacrifice
};

export const LEGEND_STYLES: Record<LegendId, LegendStyle> = {
  fischer: {
    name: "Bobby Fischer",
    tagline: "Razor-sharp initiative, universal strength.",
    description: "Dynamic, principled, attacks built on sound prep.",
    styleTags: ["attacking", "dynamic", "opening prep", "king hunts"],
    aggressiveness: 0.8,
    simplifyBias: 0.3,
    kingSafetyBias: 0.7,
    materialism: 0.6,
  },
  capablanca: {
    name: "José Raúl Capablanca",
    tagline: "Endgame machine, crystal-clear simplicity.",
    description: "Simplicity, clarity, and endgame dominance.",
    styleTags: ["endgames", "clarity", "simplicity", "small advantages"],
    aggressiveness: 0.4,
    simplifyBias: 0.9,
    kingSafetyBias: 0.8,
    materialism: 0.9,
  },
  steinitz: {
    name: "Wilhelm Steinitz",
    tagline: "Positional foundations, defense then counterattack.",
    description: "Accumulate advantages, defend then counter.",
    styleTags: ["positional", "accumulating advantage", "defensive ideas"],
    aggressiveness: 0.5,
    simplifyBias: 0.7,
    kingSafetyBias: 0.9,
    materialism: 0.8,
  },
  alekhine: {
    name: "Alexander Alekhine",
    tagline: "Tactical brilliance, dynamic attacking genius.",
    description: "Creative, aggressive, master of complex positions and combinations.",
    styleTags: ["attacking", "tactical", "complex positions", "brilliant combinations"],
    aggressiveness: 0.9,
    simplifyBias: 0.3,
    kingSafetyBias: 0.5,
    materialism: 0.5,
  },
  spassky: {
    name: "Boris Spassky",
    tagline: "Universal style, positional and tactical mastery.",
    description: "Versatile, adaptable, strong in all phases of the game.",
    styleTags: ["universal", "versatile", "positional", "tactical"],
    aggressiveness: 0.6,
    simplifyBias: 0.6,
    kingSafetyBias: 0.7,
    materialism: 0.7,
  },
  kasparov: {
    name: "Garry Kasparov",
    tagline: "Ferocious preparation, relentless pressure.",
    description: "Dominating attacks backed by legendary opening preparation and iron will.",
    styleTags: ["attacking", "preparation", "dynamic", "psychological pressure"],
    aggressiveness: 0.9,
    simplifyBias: 0.2,
    kingSafetyBias: 0.6,
    materialism: 0.5,
  },
  karpov: {
    name: "Anatoly Karpov",
    tagline: "Boa constrictor, prophylaxis personified.",
    description: "Subtle positional pressure, slowly squeezing opponents into zugzwang.",
    styleTags: ["positional", "prophylaxis", "endgames", "technique"],
    aggressiveness: 0.3,
    simplifyBias: 0.7,
    kingSafetyBias: 0.9,
    materialism: 0.9,
  },
  tal: {
    name: "Mikhail Tal",
    tagline: "The Magician from Riga, sacrificial wizard.",
    description: "Dazzling sacrifices and complications that confuse even engines.",
    styleTags: ["tactical", "sacrifices", "complications", "attacking"],
    aggressiveness: 1.0,
    simplifyBias: 0.1,
    kingSafetyBias: 0.3,
    materialism: 0.2,
  },
  botvinnik: {
    name: "Mikhail Botvinnik",
    tagline: "The Patriarch, scientific chess mastery.",
    description: "Deep preparation, systematic analysis, and iron discipline.",
    styleTags: ["scientific", "preparation", "strategic", "disciplined"],
    aggressiveness: 0.5,
    simplifyBias: 0.5,
    kingSafetyBias: 0.8,
    materialism: 0.7,
  },
  morphy: {
    name: "Paul Morphy",
    tagline: "Pride and sorrow of chess, romantic genius.",
    description: "Lightning development, open lines, and breathtaking attacks.",
    styleTags: ["romantic", "development", "open games", "attacking"],
    aggressiveness: 0.85,
    simplifyBias: 0.3,
    kingSafetyBias: 0.5,
    materialism: 0.4,
  },
  carlsen: {
    name: "Magnus Carlsen",
    tagline: "Universal perfection, endgame sorcerer.",
    description: "Unmatched versatility, grinding down any advantage to victory.",
    styleTags: ["universal", "endgames", "technique", "grinding"],
    aggressiveness: 0.5,
    simplifyBias: 0.6,
    kingSafetyBias: 0.8,
    materialism: 0.7,
  },
  lasker: {
    name: "Emanuel Lasker",
    tagline: "27-year reign, psychological warrior.",
    description: "Pragmatic fighter who played the opponent, not just the board.",
    styleTags: ["psychological", "practical", "fighting", "endgames"],
    aggressiveness: 0.6,
    simplifyBias: 0.5,
    kingSafetyBias: 0.7,
    materialism: 0.6,
  },
};

export type LegendGame = {
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

export type OpeningBookNode = {
  fen: string;
  move: string;  // UCI
  count: number; // frequency in legend's games
};

export type LegendPosition = {
  fen: string;
  move: string;      // UCI - the move the legend actually played
  gameId: string;
  moveNumber: number;
  color: "w" | "b";
};

export type LegendPositionIndex = Record<string, LegendPosition[]>;

// ============================================
// GUESS THE MOVE TYPES
// ============================================

export type GuessMoveResult = {
  fen: string;
  userMove: string;
  legendMove: string;
  isExact: boolean;
  isTopEngineMatch: boolean;
  score: number;                // 0-100 for this move
  comment?: string;             // brief textual feedback
  tags: string[];               // "missed tactics", "too passive", etc.
};

export type GuessSessionSummary = {
  legend: LegendId;
  gameId: string;
  totalScore: number;           // aggregate
  movesGuessed: GuessMoveResult[];
  detectedWeaknessTags: string[];
};

export type StudyNote = {
  id: string;
  type: "guess-the-move";
  legend: LegendId;
  gameId: string;
  createdAt: string;
  summaryText: string;
  weaknessTags: string[];
  linkToSessionId: string;
};

