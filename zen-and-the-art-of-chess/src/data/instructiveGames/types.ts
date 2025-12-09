// ============================================
// INSTRUCTIVE GAMES - TYPE DEFINITIONS
// ============================================

export interface AnnotatedMove {
  move: string;           // The move in algebraic notation
  fen: string;            // Position after this move
  comment?: string;       // Detailed commentary on the move
  isKeyMove?: boolean;    // Highlight as a critical moment
  alternatives?: {        // Other moves considered
    move: string;
    comment: string;
  }[];
  evaluation?: string;    // Position evaluation (+=, +/-, etc.)
}

export interface InstructiveGame {
  id: string;
  dayNumber: number;      // 1-365, ties to daily curriculum
  
  // Game metadata
  white: string;
  black: string;
  year: number;
  event: string;
  result: '1-0' | '0-1' | '1/2-1/2';
  
  // Opening info
  opening: string;
  eco: string;
  
  // The game with annotations
  moves: AnnotatedMove[];
  
  // Educational content
  title: string;          // e.g., "The Immortal Game"
  themes: string[];       // e.g., ["Sacrifice", "King hunt", "Development"]
  whyInstructive: string; // Deep explanation of why this game matters
  keyLessons: string[];   // 3-5 takeaways
  historicalContext?: string;
  
  // Difficulty
  difficulty: 1 | 2 | 3 | 4 | 5;
  
  // Categories
  era: 'romantic' | 'classical' | 'hypermodern' | 'soviet' | 'modern' | 'contemporary';
  category: 'tactical' | 'positional' | 'endgame' | 'attack' | 'defense' | 'strategy';
}

export type Era = InstructiveGame['era'];
export type Category = InstructiveGame['category'];











