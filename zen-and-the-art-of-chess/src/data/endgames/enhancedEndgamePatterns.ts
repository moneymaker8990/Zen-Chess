// ============================================
// ENHANCED ENDGAME PATTERNS - MOVETRAINER FORMAT
// Comprehensive endgame training with full annotations
// ============================================

import type { PatternType } from '@/lib/types';

export type EndgameCategory =
  | 'KING_PAWN'
  | 'ROOK_ENDGAMES'
  | 'MINOR_PIECE'
  | 'QUEEN_ENDGAMES'
  | 'PRACTICAL';

// Each move in the line has annotations
export interface AnnotatedMove {
  move: string;
  isMainLine: boolean;
  annotation: string;
  explanation: string;
  arrows?: Array<{
    from: string;
    to: string;
    color?: string;
  }>;
  highlights?: string[];
  alternativeMoves?: {
    move: string;
    evaluation: string;
    explanation: string;
  }[];
  conceptTag?: string;
}

export interface EnhancedEndgamePattern {
  id: string;
  category: EndgameCategory;
  title: string;
  subtitle?: string;
  fen: string;
  toMove: 'white' | 'black';
  introduction: string;
  keyIdeas: string[];
  mainLine: AnnotatedMove[];
  variations?: {
    afterMove: number;
    moves: AnnotatedMove[];
  }[];
  summary: string;
  keyTakeaways: string[];
  memoryTip?: string;
  practicePositions?: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedMinutes: number;
  source?: string;
  playerExample?: {
    white: string;
    black: string;
    event?: string;
    year?: number;
  };
  themes?: PatternType[];
}

// ============================================
// CATEGORY METADATA
// ============================================

export const endgameCategoryInfo: Record<EndgameCategory, {
  name: string;
  description: string;
  icon: string;
  masterQuote?: { text: string; author: string };
}> = {
  KING_PAWN: {
    name: 'King & Pawn Endgames',
    description: 'The foundation of all endgames. Master opposition, key squares, and pawn races to convert advantages and save draws.',
    icon: '♔',
    masterQuote: {
      text: 'Pawn endings are to chess what putting is to golf.',
      author: 'Cecil Purdy'
    },
  },
  ROOK_ENDGAMES: {
    name: 'Rook Endgames',
    description: 'The most common endings in chess. Learn Lucena, Philidor, and practical rook technique to win won games and draw lost ones.',
    icon: '♖',
    masterQuote: {
      text: 'All rook endings are drawn.',
      author: 'Tartakower (tongue-in-cheek)'
    },
  },
  MINOR_PIECE: {
    name: 'Minor Piece Endgames',
    description: 'Bishop vs knight, same-color bishops, and opposite-color bishops. Learn when each piece dominates.',
    icon: '♗',
    masterQuote: {
      text: 'A bishop is stronger than a knight in an endgame with pawns on both sides.',
      author: 'Siegbert Tarrasch'
    },
  },
  QUEEN_ENDGAMES: {
    name: 'Queen Endgames',
    description: 'Complex and treacherous. Master perpetual check, stalemate traps, and queen vs pawn races.',
    icon: '♕',
    masterQuote: {
      text: 'In queen endings, the king is a strong piece.',
      author: 'Mikhail Botvinnik'
    },
  },
  PRACTICAL: {
    name: 'Practical Endgames',
    description: 'Real-game situations combining multiple themes. Apply your knowledge to convert advantages and save half-points.',
    icon: '♚',
    masterQuote: {
      text: 'In the endgame, the king is a fighting piece. Use it!',
      author: 'Wilhelm Steinitz'
    },
  },
};

// ============================================
// CATEGORY VISUAL STYLES
// ============================================

export const ENDGAME_CATEGORY_STYLES: Record<EndgameCategory, {
  gradient: string;
  accent: string;
  bgGlow: string;
}> = {
  KING_PAWN: {
    gradient: 'from-amber-500 to-yellow-600',
    accent: '#f59e0b',
    bgGlow: 'rgba(245, 158, 11, 0.15)',
  },
  ROOK_ENDGAMES: {
    gradient: 'from-blue-500 to-indigo-600',
    accent: '#3b82f6',
    bgGlow: 'rgba(59, 130, 246, 0.15)',
  },
  MINOR_PIECE: {
    gradient: 'from-emerald-500 to-teal-600',
    accent: '#10b981',
    bgGlow: 'rgba(16, 185, 129, 0.15)',
  },
  QUEEN_ENDGAMES: {
    gradient: 'from-purple-500 to-violet-600',
    accent: '#8b5cf6',
    bgGlow: 'rgba(139, 92, 246, 0.15)',
  },
  PRACTICAL: {
    gradient: 'from-rose-500 to-pink-600',
    accent: '#f43f5e',
    bgGlow: 'rgba(244, 63, 94, 0.15)',
  },
};

// ============================================
// KING & PAWN ENDGAME PATTERNS
// ============================================

const kingPawnPatterns: EnhancedEndgamePattern[] = [
  {
    id: 'kp-opposition-basic',
    category: 'KING_PAWN',
    title: 'Basic Opposition',
    subtitle: 'The Foundation of King Endings',
    fen: '8/8/8/4k3/8/4K3/4P3/8 w - - 0 1',
    toMove: 'white',
    introduction: 'Opposition is when two kings face each other with one square between them. The player NOT to move has the opposition and the advantage.',
    keyIdeas: [
      'The side with opposition can force the opponent aside',
      'Opposition controls key squares',
      'Whoever must move loses ground',
    ],
    mainLine: [
      {
        move: 'Ke4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Taking the opposition! Now Black must give way.',
        arrows: [{ from: 'e3', to: 'e4', color: 'green' }],
        highlights: ['e4', 'e5'],
        conceptTag: 'Opposition',
      },
      {
        move: 'Kd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black steps aside. If Kf6, then Kd5 with the same idea.',
        arrows: [{ from: 'e5', to: 'd6', color: 'blue' }],
      },
      {
        move: 'Kf5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Outflanking! White gains ground by going around the black king.',
        arrows: [{ from: 'e4', to: 'f5', color: 'green' }],
        conceptTag: 'Outflanking',
      },
      {
        move: 'Ke7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to stay in front of the pawn.',
      },
      {
        move: 'Ke5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Taking opposition again. This is the pattern - keep taking opposition to make progress.',
        highlights: ['e5', 'e7'],
      },
      {
        move: 'Kd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Forced to give way again.',
      },
      {
        move: 'Kf6',
        isMainLine: true,
        annotation: '',
        explanation: 'Now Ke6 controls the queening square.',
      },
      {
        move: 'Ke8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black defends e8.',
      },
      {
        move: 'Ke6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Opposition once more. The pawn will queen.',
        highlights: ['e6', 'e8'],
      },
    ],
    summary: 'Opposition is the key to king and pawn endgames. The player NOT to move controls the position. Use opposition to outflank the enemy king and shepherd your pawn to promotion.',
    keyTakeaways: [
      'Opposition = kings face each other, one square apart',
      'The side NOT to move has the advantage',
      'Use opposition to outflank the defending king',
    ],
    memoryTip: 'Think "NOT to move = GOT the opposition"',
    difficulty: 2,
    estimatedMinutes: 5,
    source: 'Classical endgame theory',
  },
  {
    id: 'kp-key-squares',
    category: 'KING_PAWN',
    title: 'Key Squares',
    subtitle: 'The Squares That Win the Game',
    fen: '8/8/8/8/3k4/8/3PK3/8 w - - 0 1',
    toMove: 'white',
    introduction: 'Key squares are the squares in front of a pawn. If the attacking king reaches a key square, the pawn will promote.',
    keyIdeas: [
      'Each pawn has specific key squares',
      'Reaching a key square guarantees promotion',
      'Key squares are 2-3 ranks ahead of the pawn',
    ],
    mainLine: [
      {
        move: 'Ke3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Heading for the key squares d5, e5, or f5. From any of these, the pawn promotes.',
        arrows: [{ from: 'e2', to: 'e5', color: 'green' }, { from: 'e2', to: 'd5', color: 'green' }],
        highlights: ['d5', 'e5', 'f5'],
        conceptTag: 'Key Squares',
      },
      {
        move: 'Ke5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black occupies one key square, trying to prevent White.',
      },
      {
        move: 'Kd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Triangulation - White maneuvers to gain opposition.',
      },
      {
        move: 'Kd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Staying on the key squares.',
      },
      {
        move: 'Ke3',
        isMainLine: true,
        annotation: '',
        explanation: 'Now White has the opposition.',
        highlights: ['e3', 'e5'],
      },
      {
        move: 'Ke5',
        isMainLine: true,
        annotation: '',
        explanation: 'Forced.',
      },
      {
        move: 'Kf3',
        isMainLine: true,
        annotation: '',
        explanation: 'Approaching f5.',
      },
      {
        move: 'Kf5',
        isMainLine: true,
        annotation: '',
        explanation: 'Blocking.',
      },
      {
        move: 'Ke3',
        isMainLine: true,
        annotation: '',
        explanation: 'White gains opposition and will reach a key square.',
      },
    ],
    summary: 'Key squares are the control points in pawn endgames. For a d-pawn, key squares are c5, d5, e5 (one rank ahead) and c6, d6, e6 (two ranks ahead). Occupy them to guarantee promotion.',
    keyTakeaways: [
      'Key squares are in front of the pawn',
      'King on key square = pawn promotes',
      'Use opposition to reach key squares',
    ],
    memoryTip: 'Key squares are like goalkeeping - occupy them to score!',
    difficulty: 2,
    estimatedMinutes: 6,
  },
  {
    id: 'kp-outside-passed-pawn',
    category: 'KING_PAWN',
    title: 'Outside Passed Pawn',
    subtitle: 'The Decoy Technique',
    fen: '8/8/1p2k3/1P6/5K2/8/8/8 w - - 0 1',
    toMove: 'white',
    introduction: 'An outside passed pawn is far from the main action. It acts as a decoy, pulling the enemy king away while your king captures elsewhere.',
    keyIdeas: [
      'Outside passed pawns decoy the enemy king',
      'Create a distraction on one side',
      'Attack on the other side',
    ],
    mainLine: [
      {
        move: 'Ke4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Centralizing. The b5 pawn will distract Black\'s king.',
        arrows: [{ from: 'f4', to: 'e4', color: 'green' }],
        conceptTag: 'Centralization',
      },
      {
        move: 'Kd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must watch the pawn.',
      },
      {
        move: 'Kd4',
        isMainLine: true,
        annotation: '',
        explanation: 'Opposition.',
        highlights: ['d4', 'd6'],
      },
      {
        move: 'Kc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Going after the pawn.',
      },
      {
        move: 'Kc5',
        isMainLine: true,
        annotation: '!',
        explanation: 'White keeps the opposition and pressure.',
      },
      {
        move: 'Kb7',
        isMainLine: true,
        annotation: '',
        explanation: 'Now Black will capture the pawn.',
      },
      {
        move: 'Kxb6',
        isMainLine: true,
        annotation: '',
        explanation: 'But White captures Black\'s pawn first - and wins the race!',
        conceptTag: 'Decoy',
      },
    ],
    summary: 'Outside passed pawns win by decoy. Force the enemy king to chase your pawn while your king invades elsewhere. The side with more space between pawns wins these races.',
    keyTakeaways: [
      'Outside passed pawn = decoy',
      'Lure enemy king, then invade',
      'Space between pawns determines the winner',
    ],
    memoryTip: 'Outside pawn = outside distraction!',
    difficulty: 3,
    estimatedMinutes: 5,
  },
  {
    id: 'kp-square-rule',
    category: 'KING_PAWN',
    title: 'The Square Rule',
    subtitle: 'Can the King Catch the Pawn?',
    fen: '8/8/8/p7/8/8/6K1/8 w - - 0 1',
    toMove: 'white',
    introduction: 'The square rule answers: can the king catch a passed pawn? Draw a square from the pawn to the promotion square - if the king can enter, it catches the pawn.',
    keyIdeas: [
      'Draw a mental square from pawn to promotion square',
      'If king enters the square, it catches the pawn',
      'Quick calculation for pawn races',
    ],
    mainLine: [
      {
        move: 'Kf3',
        isMainLine: true,
        annotation: '!',
        explanation: 'White enters the square! The square goes from a5 to a1 to e1 to e5 to a5. White is inside.',
        highlights: ['a5', 'a1', 'e1', 'e5'],
        arrows: [{ from: 'g2', to: 'f3', color: 'green' }],
        conceptTag: 'Square Rule',
      },
      {
        move: 'a4',
        isMainLine: true,
        annotation: '',
        explanation: 'Pawn advances. The square shrinks.',
      },
      {
        move: 'Ke3',
        isMainLine: true,
        annotation: '',
        explanation: 'King stays in the new square (a4-a1-d1-d4-a4).',
      },
      {
        move: 'a3',
        isMainLine: true,
        annotation: '',
        explanation: 'Pawn pushes on.',
      },
      {
        move: 'Kd3',
        isMainLine: true,
        annotation: '',
        explanation: 'Still inside the square.',
      },
      {
        move: 'a2',
        isMainLine: true,
        annotation: '',
        explanation: 'One more step.',
      },
      {
        move: 'Kc2',
        isMainLine: true,
        annotation: '',
        explanation: 'Caught! The pawn cannot queen.',
      },
    ],
    summary: 'The square rule is essential for pawn race calculation. Mentally draw a square from the pawn through the promotion square. If the defending king can step inside (on their move), they catch the pawn.',
    keyTakeaways: [
      'Draw square: pawn to promotion square',
      'King inside square = pawn caught',
      'King outside square = pawn queens',
    ],
    memoryTip: 'Inside the square = safe and square!',
    difficulty: 1,
    estimatedMinutes: 4,
  },
  {
    id: 'kp-triangulation',
    category: 'KING_PAWN',
    title: 'Triangulation',
    subtitle: 'Losing a Tempo to Win',
    fen: '8/8/3k4/3P4/3K4/8/8/8 w - - 0 1',
    toMove: 'white',
    introduction: 'Triangulation is a king maneuver that loses a tempo (takes 3 moves instead of 1) to transfer the move to the opponent at a crucial moment.',
    keyIdeas: [
      'Use three moves to reach an adjacent square',
      'Transfer the move to opponent',
      'Force them into zugzwang',
    ],
    mainLine: [
      {
        move: 'Kc4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Start of triangulation. White will go Kc4-Kb5-Kc5, reaching c5 with Black to move.',
        arrows: [{ from: 'd4', to: 'c4', color: 'green' }, { from: 'c4', to: 'b5', color: 'yellow' }, { from: 'b5', to: 'c5', color: 'yellow' }],
        conceptTag: 'Triangulation',
      },
      {
        move: 'Kc7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black waits.',
      },
      {
        move: 'Kb5',
        isMainLine: true,
        annotation: '',
        explanation: 'Continuing the triangle.',
      },
      {
        move: 'Kd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must stay near the pawn.',
      },
      {
        move: 'Kc5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Triangle complete! Same position as before, but now BLACK to move. This is zugzwang.',
        highlights: ['c5', 'd7'],
      },
      {
        move: 'Kd8',
        isMainLine: true,
        annotation: '',
        explanation: 'Forced to retreat.',
      },
      {
        move: 'Kd6',
        isMainLine: true,
        annotation: '!',
        explanation: 'White takes opposition and the pawn promotes.',
        highlights: ['d6', 'd8'],
      },
    ],
    summary: 'Triangulation transfers the move to your opponent. By taking three moves to go one square, you reach the same position with the opponent to move - often putting them in zugzwang.',
    keyTakeaways: [
      'Three squares forming a triangle',
      'Use when you need opponent to move first',
      'Often leads to zugzwang',
    ],
    memoryTip: 'Triangle = Transfer the move!',
    difficulty: 3,
    estimatedMinutes: 6,
  },
];

// ============================================
// ROOK ENDGAME PATTERNS
// ============================================

const rookEndgamePatterns: EnhancedEndgamePattern[] = [
  {
    id: 're-lucena-position',
    category: 'ROOK_ENDGAMES',
    title: 'The Lucena Position',
    subtitle: 'Building a Bridge',
    fen: '1K6/5R2/8/8/8/2k5/4r3/8 w - - 0 1',
    toMove: 'white',
    introduction: 'The Lucena position is the most important winning position in rook endgames. White builds a "bridge" with the rook to shelter the king from checks.',
    keyIdeas: [
      'Cut off enemy king with rook',
      'Build a bridge to block checks',
      'Systematic winning technique',
    ],
    mainLine: [
      {
        move: 'Rf4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The key move! Rook goes to the 4th rank to later provide a bridge for the king.',
        arrows: [{ from: 'f7', to: 'f4', color: 'green' }],
        conceptTag: 'Bridge Building',
      },
      {
        move: 'Re1',
        isMainLine: true,
        annotation: '',
        explanation: 'Black prepares to check from behind.',
      },
      {
        move: 'Kc7',
        isMainLine: true,
        annotation: '',
        explanation: 'King steps aside, making room for the pawn.',
      },
      {
        move: 'Rc1+',
        isMainLine: true,
        annotation: '',
        explanation: 'Check!',
      },
      {
        move: 'Kb6',
        isMainLine: true,
        annotation: '',
        explanation: 'King advances despite the check.',
      },
      {
        move: 'Rb1+',
        isMainLine: true,
        annotation: '',
        explanation: 'Another check.',
      },
      {
        move: 'Kb5',
        isMainLine: true,
        annotation: '',
        explanation: 'One more step...',
      },
      {
        move: 'Rc1',
        isMainLine: true,
        annotation: '',
        explanation: 'Black positions for more checks.',
      },
      {
        move: 'Rb4',
        isMainLine: true,
        annotation: '!!',
        explanation: 'The bridge is complete! Now on any check, Rb4 blocks and the pawn will queen.',
        arrows: [{ from: 'f4', to: 'b4', color: 'green' }],
        highlights: ['b4'],
        conceptTag: 'Bridge Complete',
      },
    ],
    summary: 'The Lucena position wins by "building a bridge" - placing the rook on the 4th rank to block checks. This is the winning technique every chess player must know.',
    keyTakeaways: [
      'Rook to 4th rank first',
      'King shelters behind the rook',
      'Bridge blocks all checks',
    ],
    memoryTip: 'Lucena = Ladder up, bridge over!',
    difficulty: 3,
    estimatedMinutes: 7,
    source: 'Luis Ramirez de Lucena, 1497',
  },
  {
    id: 're-philidor-position',
    category: 'ROOK_ENDGAMES',
    title: 'The Philidor Position',
    subtitle: 'The Drawing Technique',
    fen: '4k3/R7/8/4PK2/8/8/5r2/8 b - - 0 1',
    toMove: 'black',
    introduction: 'The Philidor position shows how to draw when defending. Keep your rook on the 3rd rank to prevent the enemy king from advancing, then switch to checks from behind.',
    keyIdeas: [
      'Rook on 3rd rank cuts off enemy king',
      'When pawn advances to 6th, check from behind',
      'Passive defense then active checks',
    ],
    mainLine: [
      {
        move: 'Rf6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Philidor\'s defense! Rook stays on the 6th rank (3rd from Black\'s view) to prevent White\'s king from advancing.',
        arrows: [{ from: 'f2', to: 'f6', color: 'green' }],
        conceptTag: 'Philidor Defense',
      },
      {
        move: 'Ke6',
        isMainLine: true,
        annotation: '',
        explanation: 'White tries to bring the king forward.',
      },
      {
        move: 'Re6+',
        isMainLine: true,
        annotation: '!',
        explanation: 'Check forces the king back.',
        arrows: [{ from: 'f6', to: 'e6', color: 'green' }],
      },
      {
        move: 'Kf5',
        isMainLine: true,
        annotation: '',
        explanation: 'King retreats.',
      },
      {
        move: 'Rf6+',
        isMainLine: true,
        annotation: '',
        explanation: 'Back to the 6th rank - the defensive wall.',
      },
      {
        move: 'e6',
        isMainLine: true,
        annotation: '',
        explanation: 'White pushes the pawn.',
      },
      {
        move: 'Rf1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Now the rook goes behind to deliver checks! This is the Philidor switch.',
        arrows: [{ from: 'f6', to: 'f1', color: 'green' }],
        conceptTag: 'Checking Distance',
      },
      {
        move: 'Kg6',
        isMainLine: true,
        annotation: '',
        explanation: 'King tries to escape.',
      },
      {
        move: 'Rg1+',
        isMainLine: true,
        annotation: '',
        explanation: 'Endless checks! The game is drawn.',
      },
    ],
    summary: 'The Philidor position is the key defensive technique. Hold the rook on the 6th rank (from defender\'s view) until the pawn reaches the 6th, then switch to rear checks for a perpetual.',
    keyTakeaways: [
      'Rook on 6th rank blocks the king',
      'When pawn reaches 6th, go behind for checks',
      'Maintain checking distance',
    ],
    memoryTip: 'Philidor = Position on 6th, then Perpetual!',
    difficulty: 3,
    estimatedMinutes: 7,
    source: 'Francois-Andre Philidor, 1777',
  },
  {
    id: 're-rook-behind-pawn',
    category: 'ROOK_ENDGAMES',
    title: 'Rook Behind Passed Pawn',
    subtitle: 'Tarrasch\'s Rule',
    fen: '8/8/8/8/r7/P7/R4K2/5k2 w - - 0 1',
    toMove: 'white',
    introduction: 'Tarrasch\'s rule: place rooks behind passed pawns - your own or your opponent\'s. The rook gains space as the pawn advances.',
    keyIdeas: [
      'Rook behind pawn gains scope',
      'Applies to both attack and defense',
      'The pawn shields the rook\'s activity',
    ],
    mainLine: [
      {
        move: 'a4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The pawn advances and White\'s rook activity increases. Black\'s rook becomes passive.',
        arrows: [{ from: 'a3', to: 'a4', color: 'green' }, { from: 'a2', to: 'a8', color: 'yellow' }],
        conceptTag: 'Tarrasch Rule',
      },
      {
        move: 'Ra8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black goes behind - but too late.',
      },
      {
        move: 'a5',
        isMainLine: true,
        annotation: '',
        explanation: 'Pawn marches.',
      },
      {
        move: 'Ke1',
        isMainLine: true,
        annotation: '',
        explanation: 'King tries to help.',
      },
      {
        move: 'Kg3',
        isMainLine: true,
        annotation: '',
        explanation: 'White\'s king heads over to support.',
      },
      {
        move: 'Kd1',
        isMainLine: true,
        annotation: '',
        explanation: 'Approaching.',
      },
      {
        move: 'a6',
        isMainLine: true,
        annotation: '',
        explanation: 'Pawn on 6th rank.',
      },
      {
        move: 'Kc2',
        isMainLine: true,
        annotation: '',
        explanation: 'Getting closer.',
      },
      {
        move: 'a7',
        isMainLine: true,
        annotation: '!',
        explanation: 'The pawn is one step from queening, supported by the rook from behind.',
        highlights: ['a7', 'a2'],
      },
    ],
    summary: 'Tarrasch\'s rule is fundamental: rooks belong behind passed pawns. Your rook gains freedom as the pawn advances, while the enemy rook becomes passive trying to stop it.',
    keyTakeaways: [
      'Rook behind = increasing activity',
      'Applies to both sides of the board',
      'The pawn acts as a shield and battering ram',
    ],
    memoryTip: 'Tarrasch = Trail behind the pawn!',
    difficulty: 2,
    estimatedMinutes: 5,
    source: 'Siegbert Tarrasch',
  },
  {
    id: 're-active-defense',
    category: 'ROOK_ENDGAMES',
    title: 'Active Rook Defense',
    subtitle: 'Activity Over Material',
    fen: '8/1R6/p4pk1/P7/5P2/6PK/8/3r4 b - - 0 1',
    toMove: 'black',
    introduction: 'In rook endgames, activity is paramount. An active rook attacking pawns is often worth more than a passive rook defending.',
    keyIdeas: [
      'Active rook can attack multiple weaknesses',
      'Passive defense usually loses',
      'Create counterplay with your rook',
    ],
    mainLine: [
      {
        move: 'Rd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Active defense! The rook attacks the g3 pawn rather than passively defending a6.',
        arrows: [{ from: 'd1', to: 'd3', color: 'green' }],
        conceptTag: 'Active Defense',
      },
      {
        move: 'Rb6',
        isMainLine: true,
        annotation: '',
        explanation: 'White attacks the a6 pawn.',
      },
      {
        move: 'Rxg3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Black ignores the threat and takes a pawn. The rook is actively placed.',
        highlights: ['g3'],
      },
      {
        move: 'Rxa6',
        isMainLine: true,
        annotation: '',
        explanation: 'White captures.',
      },
      {
        move: 'Ra3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Attacking the a-pawn from behind. Now Black has excellent drawing chances.',
        arrows: [{ from: 'g3', to: 'a3', color: 'green' }],
      },
    ],
    summary: 'Rook activity is the principle of rook endgames. An active rook attacking weaknesses compensates for material. Never let your rook become passive.',
    keyTakeaways: [
      'Activity > material in rook endings',
      'Attack weaknesses, don\'t defend passively',
      'Create threats to draw attention',
    ],
    memoryTip: 'Active rook = Alive; Passive rook = Painful',
    difficulty: 3,
    estimatedMinutes: 6,
  },
  {
    id: 're-7th-rank',
    category: 'ROOK_ENDGAMES',
    title: 'Rook on the 7th Rank',
    subtitle: 'The Pig on the 7th',
    fen: '6k1/1R6/8/8/8/6r1/PP3K2/8 w - - 0 1',
    toMove: 'white',
    introduction: 'A rook on the 7th rank (the "pig") dominates by attacking pawns and confining the enemy king to the back rank.',
    keyIdeas: [
      '7th rank rook attacks pawns horizontally',
      'Confines enemy king to back rank',
      'Can lead to back-rank threats',
    ],
    mainLine: [
      {
        move: 'a4',
        isMainLine: true,
        annotation: '',
        explanation: 'Advancing the pawn while the rook dominates the 7th rank.',
        arrows: [{ from: 'b7', to: 'f7', color: 'green' }, { from: 'b7', to: 'a7', color: 'green' }],
        highlights: ['b7'],
        conceptTag: '7th Rank Dominance',
      },
      {
        move: 'Ra3',
        isMainLine: true,
        annotation: '',
        explanation: 'Black tries to attack from behind.',
      },
      {
        move: 'a5',
        isMainLine: true,
        annotation: '',
        explanation: 'Pawn advances safely.',
      },
      {
        move: 'Kf8',
        isMainLine: true,
        annotation: '',
        explanation: 'King tries to escape the back rank.',
      },
      {
        move: 'Ra7',
        isMainLine: true,
        annotation: '!',
        explanation: 'Rook stays on 7th rank - maximum activity.',
      },
      {
        move: 'Ra2+',
        isMainLine: true,
        annotation: '',
        explanation: 'Check.',
      },
      {
        move: 'Ke3',
        isMainLine: true,
        annotation: '',
        explanation: 'King escapes.',
      },
      {
        move: 'Rxb2',
        isMainLine: true,
        annotation: '',
        explanation: 'Black captures.',
      },
      {
        move: 'a6',
        isMainLine: true,
        annotation: '!',
        explanation: 'The a-pawn is unstoppable with the rook supporting from the 7th.',
        highlights: ['a6', 'a7'],
      },
    ],
    summary: 'The rook on the 7th rank is one of the most powerful positions in chess. It attacks undefended pawns, restricts the enemy king, and supports your own pawns\' advance.',
    keyTakeaways: [
      '7th rank = maximum rook power',
      'Attack pawns, confine king',
      'Coordinate with pawn advances',
    ],
    memoryTip: '7th rank rook = Seventh heaven!',
    difficulty: 2,
    estimatedMinutes: 5,
  },
];

// ============================================
// MINOR PIECE ENDGAME PATTERNS
// ============================================

const minorPiecePatterns: EnhancedEndgamePattern[] = [
  {
    id: 'mp-bishop-vs-knight-open',
    category: 'MINOR_PIECE',
    title: 'Bishop vs Knight: Open Position',
    subtitle: 'When the Bishop Dominates',
    fen: '8/5pk1/4p2p/3pP3/3P4/4B1P1/5PKP/1n6 w - - 0 1',
    toMove: 'white',
    introduction: 'In open positions with pawns on both flanks, the bishop is usually superior to the knight. The bishop can control both sides while the knight needs many moves to transfer.',
    keyIdeas: [
      'Bishop works on both flanks',
      'Knight is slow to transfer',
      'Create threats on opposite sides',
    ],
    mainLine: [
      {
        move: 'Bd2',
        isMainLine: true,
        annotation: '!',
        explanation: 'The bishop prepares to go to both flanks. Watch how the knight struggles to cover everything.',
        arrows: [{ from: 'e3', to: 'd2', color: 'green' }, { from: 'd2', to: 'a5', color: 'yellow' }, { from: 'd2', to: 'h6', color: 'yellow' }],
        conceptTag: 'Two Flanks',
      },
      {
        move: 'Nc3',
        isMainLine: true,
        annotation: '',
        explanation: 'Knight centralizes.',
      },
      {
        move: 'Ba5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Bishop goes queenside. The knight must follow.',
        arrows: [{ from: 'd2', to: 'a5', color: 'green' }],
      },
      {
        move: 'Nb5',
        isMainLine: true,
        annotation: '',
        explanation: 'Knight tries to reach queenside.',
      },
      {
        move: 'Bd8',
        isMainLine: true,
        annotation: '!',
        explanation: 'Now the bishop eyes the kingside h4 square. Two fronts!',
        arrows: [{ from: 'a5', to: 'd8', color: 'green' }, { from: 'd8', to: 'h4', color: 'yellow' }],
      },
      {
        move: 'Nd6',
        isMainLine: true,
        annotation: '',
        explanation: 'Knight returns to center.',
      },
      {
        move: 'Bh4',
        isMainLine: true,
        annotation: '',
        explanation: 'Threatening h5-h6 ideas. The knight cannot be everywhere.',
        conceptTag: 'Principle of Two Weaknesses',
      },
    ],
    summary: 'In open positions, the bishop dominates by attacking on both flanks simultaneously. The knight\'s short-range nature means it can\'t cover both sides, leading to a gradual collapse.',
    keyTakeaways: [
      'Bishop excels when pawns are on both sides',
      'Knight struggles with long-range threats',
      'Create the principle of two weaknesses',
    ],
    memoryTip: 'Bishop = Binoculars (sees both sides)',
    difficulty: 3,
    estimatedMinutes: 6,
  },
  {
    id: 'mp-knight-vs-bishop-closed',
    category: 'MINOR_PIECE',
    title: 'Knight vs Bishop: Closed Position',
    subtitle: 'When the Knight Shines',
    fen: '8/p2bk1p1/1p1pp2p/1Pp1Pp2/2P2P2/3N2P1/P6P/4K3 w - - 0 1',
    toMove: 'white',
    introduction: 'In closed positions with fixed pawns, knights can outperform bishops. The knight can jump over pawns to strong outposts.',
    keyIdeas: [
      'Fixed pawns block the bishop',
      'Knight finds outposts among the pawns',
      'Knight can attack from inside enemy territory',
    ],
    mainLine: [
      {
        move: 'Ne1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Heading for the perfect outpost via f3-h4 or e2-g3.',
        arrows: [{ from: 'd3', to: 'e1', color: 'green' }, { from: 'e1', to: 'g2', color: 'yellow' }],
        conceptTag: 'Knight Maneuver',
      },
      {
        move: 'Bc8',
        isMainLine: true,
        annotation: '',
        explanation: 'The bishop has no good squares - blocked by its own pawns.',
        highlights: ['d7', 'e6', 'd6'],
      },
      {
        move: 'Ng2',
        isMainLine: true,
        annotation: '',
        explanation: 'Knight hops along.',
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '',
        explanation: 'Bishop shuffles.',
      },
      {
        move: 'Nh4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Powerful post! The knight eyes f5, g6, and threatens to invade.',
        arrows: [{ from: 'h4', to: 'f5', color: 'green' }, { from: 'h4', to: 'g6', color: 'green' }],
        highlights: ['h4'],
        conceptTag: 'Outpost',
      },
      {
        move: 'Ke8',
        isMainLine: true,
        annotation: '',
        explanation: 'King tries to help.',
      },
      {
        move: 'Nf5',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight dominates from within Black\'s position. The bishop can only watch.',
        highlights: ['f5'],
      },
    ],
    summary: 'In closed positions with blocked pawn chains, the knight dominates. It can find outposts among the pawns while the bishop is stuck behind its own pieces.',
    keyTakeaways: [
      'Blocked pawns = bad for bishops',
      'Knights love outposts in closed positions',
      'A knight on an outpost can dominate',
    ],
    memoryTip: 'Closed = Knight, Open = Bishop',
    difficulty: 3,
    estimatedMinutes: 6,
  },
  {
    id: 'mp-opposite-color-bishops',
    category: 'MINOR_PIECE',
    title: 'Opposite-Color Bishops',
    subtitle: 'The Drawing Tendency and Attacking Power',
    fen: '6k1/6p1/4B2p/8/1p6/1b6/6PP/6K1 w - - 0 1',
    toMove: 'white',
    introduction: 'Opposite-color bishop endgames often draw even with an extra pawn. But in the middlegame, they favor the attacker because the defender\'s bishop can\'t help.',
    keyIdeas: [
      'Extra pawn often not enough to win',
      'Defending bishop controls wrong color',
      'Fortress positions are common',
    ],
    mainLine: [
      {
        move: 'Bf7',
        isMainLine: true,
        annotation: '',
        explanation: 'White tries to advance with the bishop.',
        arrows: [{ from: 'e6', to: 'f7', color: 'green' }],
      },
      {
        move: 'Bc2',
        isMainLine: true,
        annotation: '!',
        explanation: 'Black\'s bishop controls the light squares but White\'s pawns are on dark squares! Perfect defense.',
        highlights: ['g2', 'h2'],
        conceptTag: 'Wrong Color',
      },
      {
        move: 'g3',
        isMainLine: true,
        annotation: '',
        explanation: 'Pushing a pawn.',
      },
      {
        move: 'Bd3',
        isMainLine: true,
        annotation: '',
        explanation: 'Bishop stays active.',
      },
      {
        move: 'Kg2',
        isMainLine: true,
        annotation: '',
        explanation: 'King advances.',
      },
      {
        move: 'Bc4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading bishops would make it easier but the bishops can\'t trade - they\'re on opposite colors!',
        arrows: [{ from: 'd3', to: 'c4', color: 'green' }],
        conceptTag: 'Drawing Mechanism',
      },
      {
        move: 'Bd5',
        isMainLine: true,
        annotation: '',
        explanation: 'White maneuvers but cannot make progress.',
      },
      {
        move: 'Kf8',
        isMainLine: true,
        annotation: '',
        explanation: 'King waits. This is a fortress - White cannot win.',
      },
    ],
    summary: 'Opposite-color bishops create unique dynamics. In endgames, they tend to draw because bishops can\'t help attack the opponent\'s pawns. But in middlegames, the attacker has a permanent advantage.',
    keyTakeaways: [
      'OCB endgames favor defender',
      'Bishops control different squares',
      'Fortresses are common',
    ],
    memoryTip: 'Opposite Colors = Often draws',
    difficulty: 3,
    estimatedMinutes: 6,
  },
  {
    id: 'mp-same-color-bishops',
    category: 'MINOR_PIECE',
    title: 'Same-Color Bishops',
    subtitle: 'The More Active Bishop Wins',
    fen: '8/5pk1/4p1pp/3bP3/8/5B2/5PPP/6K1 w - - 0 1',
    toMove: 'white',
    introduction: 'In same-color bishop endgames, activity and pawn structure matter. The more active bishop combined with better pawn structure usually wins.',
    keyIdeas: [
      'Active bishop > passive bishop',
      'Attack enemy pawns on same color as bishops',
      'Bad bishop = blocked by own pawns',
    ],
    mainLine: [
      {
        move: 'Bd1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Heading to a4 to attack the weak e6 pawn from the side.',
        arrows: [{ from: 'f3', to: 'd1', color: 'green' }, { from: 'd1', to: 'a4', color: 'yellow' }],
        conceptTag: 'Active vs Passive',
      },
      {
        move: 'Bc4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black\'s bishop is more limited.',
      },
      {
        move: 'Ba4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Now the bishop attacks e6 and can retreat to safety. Note Black\'s bishop is blocked by e6.',
        arrows: [{ from: 'd1', to: 'a4', color: 'green' }],
        highlights: ['e6'],
      },
      {
        move: 'Bb5',
        isMainLine: true,
        annotation: '',
        explanation: 'Trying to trade.',
      },
      {
        move: 'Bd7',
        isMainLine: true,
        annotation: '!',
        explanation: 'Avoiding the trade. White\'s bishop is superior.',
      },
      {
        move: 'Kf8',
        isMainLine: true,
        annotation: '',
        explanation: 'King guards.',
      },
      {
        move: 'Kf1',
        isMainLine: true,
        annotation: '',
        explanation: 'King activates. Black\'s bad bishop means a difficult defense.',
        conceptTag: 'Bad Bishop',
      },
    ],
    summary: 'Same-color bishop endings are about activity. The bishop that can attack enemy pawns while the opponent\'s is blocked by their own pawns gains a decisive advantage.',
    keyTakeaways: [
      'More active bishop wins',
      'Bad bishop = pawns on same color',
      'Target pawns on the bishop\'s color',
    ],
    memoryTip: 'Same Color = Same competition for activity',
    difficulty: 3,
    estimatedMinutes: 5,
  },
  {
    id: 'mp-two-bishops',
    category: 'MINOR_PIECE',
    title: 'The Two Bishops',
    subtitle: 'Bishop Pair Dominance',
    fen: '5k2/5ppp/8/4p3/8/4BB2/5PPP/6K1 w - - 0 1',
    toMove: 'white',
    introduction: 'The two bishops (bishop pair) are generally stronger than bishop+knight or two knights. They control both colors and coordinate beautifully in open positions.',
    keyIdeas: [
      'Bishops control both color complexes',
      'Bishops coordinate for devastating attacks',
      'Open positions amplify bishop pair advantage',
    ],
    mainLine: [
      {
        move: 'Bc5+',
        isMainLine: true,
        annotation: '!',
        explanation: 'One bishop attacks, the other supports. They work in tandem.',
        arrows: [{ from: 'e3', to: 'c5', color: 'green' }],
        conceptTag: 'Bishop Coordination',
      },
      {
        move: 'Ke8',
        isMainLine: true,
        annotation: '',
        explanation: 'King escapes.',
      },
      {
        move: 'Bd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Now both bishops are active, controlling key squares. Black has no good pawn moves.',
        arrows: [{ from: 'f3', to: 'd5', color: 'green' }],
        highlights: ['c5', 'd5'],
      },
      {
        move: 'Kd7',
        isMainLine: true,
        annotation: '',
        explanation: 'King tries to centralize.',
      },
      {
        move: 'Bb6',
        isMainLine: true,
        annotation: '',
        explanation: 'Bishops dominate the board.',
      },
      {
        move: 'Ke7',
        isMainLine: true,
        annotation: '',
        explanation: 'Black is paralyzed.',
      },
      {
        move: 'Kf1',
        isMainLine: true,
        annotation: '',
        explanation: 'White activates the king while bishops maintain the bind.',
        conceptTag: 'Bishop Pair Bind',
      },
    ],
    summary: 'The two bishops dominate in open positions. They control both color complexes, cutting the enemy king and pawns from key squares. Keep the position open to maximize their power.',
    keyTakeaways: [
      'Bishop pair = control of all colors',
      'Keep position open for bishops',
      'Bishops coordinate to create decisive threats',
    ],
    memoryTip: 'Two Bishops = Two colors = Total control',
    difficulty: 2,
    estimatedMinutes: 5,
  },
];

// ============================================
// QUEEN ENDGAME PATTERNS
// ============================================

const queenEndgamePatterns: EnhancedEndgamePattern[] = [
  {
    id: 'qe-queen-vs-pawn-7th',
    category: 'QUEEN_ENDGAMES',
    title: 'Queen vs Pawn on 7th',
    subtitle: 'The Winning Technique',
    fen: '8/1P6/8/8/8/5K2/q7/7k w - - 0 1',
    toMove: 'white',
    introduction: 'Queen vs pawn on 7th rank - usually the queen wins, but the technique requires precision. The key is bringing the king closer using checks.',
    keyIdeas: [
      'Queen pins pawn and checks king',
      'King approaches during check sequences',
      'Position queen to force king block',
    ],
    mainLine: [
      {
        move: 'Ke3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Centralizing the king. The plan is to approach while using the queen to control.',
        arrows: [{ from: 'f3', to: 'e3', color: 'green' }],
        conceptTag: 'King Approach',
      },
      {
        move: 'Qa1',
        isMainLine: true,
        annotation: '',
        explanation: 'Threatening to queen.',
      },
      {
        move: 'Qd5+',
        isMainLine: true,
        annotation: '!',
        explanation: 'Check! After the king moves, we check again, always gaining ground.',
        arrows: [{ from: 'g8', to: 'd5', color: 'green' }],
      },
      {
        move: 'Ka2',
        isMainLine: true,
        annotation: '',
        explanation: 'King supports the pawn.',
      },
      {
        move: 'Qd2+',
        isMainLine: true,
        annotation: '',
        explanation: 'Another check.',
      },
      {
        move: 'Ka1',
        isMainLine: true,
        annotation: '',
        explanation: 'Forced behind pawn.',
      },
      {
        move: 'Kd3',
        isMainLine: true,
        annotation: '!',
        explanation: 'King advances while Black is forced to block with the king.',
        arrows: [{ from: 'e3', to: 'd3', color: 'green' }],
      },
      {
        move: 'b8=Q',
        isMainLine: true,
        annotation: '',
        explanation: 'No choice but to promote.',
      },
      {
        move: 'Qd1#',
        isMainLine: true,
        annotation: '!',
        explanation: 'Checkmate! The queen delivers the final blow.',
        highlights: ['d1'],
      },
    ],
    summary: 'Queen vs pawn on 7th requires systematic checks to approach with the king. Force the enemy king to block, then advance your king. Most positions win, but bishop and rook pawns can draw.',
    keyTakeaways: [
      'Use checks to advance king',
      'Force king to block pawn',
      'Central pawns lose; bishop/rook pawns may draw',
    ],
    memoryTip: 'Check, approach, repeat until checkmate!',
    difficulty: 3,
    estimatedMinutes: 6,
  },
  {
    id: 'qe-perpetual-check',
    category: 'QUEEN_ENDGAMES',
    title: 'Perpetual Check',
    subtitle: 'The Saving Resource',
    fen: '5k2/5p2/5Pp1/4q2p/7P/8/5Q2/6K1 b - - 0 1',
    toMove: 'black',
    introduction: 'Perpetual check is the great equalizer in queen endgames. Even in lost positions, the queen\'s mobility can often generate endless checks.',
    keyIdeas: [
      'Queen mobility enables perpetual',
      'King exposure = perpetual risk',
      'Calculate safe zones for the king',
    ],
    mainLine: [
      {
        move: 'Qe1+',
        isMainLine: true,
        annotation: '!',
        explanation: 'Starting the perpetual! The white king has no shelter.',
        arrows: [{ from: 'e5', to: 'e1', color: 'green' }],
        conceptTag: 'Perpetual Check',
      },
      {
        move: 'Kh2',
        isMainLine: true,
        annotation: '',
        explanation: 'Only square.',
      },
      {
        move: 'Qe5+',
        isMainLine: true,
        annotation: '',
        explanation: 'Check!',
      },
      {
        move: 'Kg1',
        isMainLine: true,
        annotation: '',
        explanation: 'Back to g1.',
      },
      {
        move: 'Qe1+',
        isMainLine: true,
        annotation: '',
        explanation: 'Check again!',
      },
      {
        move: 'Kh2',
        isMainLine: true,
        annotation: '',
        explanation: 'The king goes in circles.',
      },
      {
        move: 'Qe5+',
        isMainLine: true,
        annotation: '=',
        explanation: 'Draw by perpetual check. The game is saved!',
        highlights: ['g1', 'h2'],
        conceptTag: 'Drawing Resource',
      },
    ],
    summary: 'Perpetual check is the queen\'s superpower. When down material, always look for perpetual patterns. An exposed king without shelter is vulnerable to endless checks.',
    keyTakeaways: [
      'Exposed king = perpetual danger',
      'Queen can check from multiple directions',
      'Calculate if king can escape',
    ],
    memoryTip: 'Perpetual = Perseverance pays off',
    difficulty: 2,
    estimatedMinutes: 4,
  },
  {
    id: 'qe-stalemate-trap',
    category: 'QUEEN_ENDGAMES',
    title: 'Stalemate Traps',
    subtitle: 'The Last Defense',
    fen: '8/8/8/1K6/8/1Q6/p7/k7 w - - 0 1',
    toMove: 'white',
    introduction: 'Stalemate is a crucial defensive resource in queen endings. The queen\'s power can backfire by trapping the enemy king with no legal moves.',
    keyIdeas: [
      'Stalemate when king has no moves',
      'Queen can accidentally stalemate',
      'King in corner = stalemate risk',
    ],
    mainLine: [
      {
        move: 'Qb1+',
        isMainLine: true,
        annotation: '??',
        explanation: 'Blunder! This allows stalemate.',
        arrows: [{ from: 'b3', to: 'b1', color: 'red' }],
        conceptTag: 'Stalemate Trap',
      },
      {
        move: 'Ka2',
        isMainLine: true,
        annotation: '',
        explanation: 'Only move. Now what?',
      },
      {
        move: 'Qxa1',
        isMainLine: true,
        annotation: '??',
        explanation: 'Stalemate! Black has no legal moves but is not in check. Draw!',
        highlights: ['a1', 'a2'],
      },
    ],
    variations: [
      {
        afterMove: 0,
        moves: [
          {
            move: 'Qd1',
            isMainLine: false,
            annotation: '!',
            explanation: 'The correct approach! Avoid checks that lead to stalemate.',
            arrows: [{ from: 'b3', to: 'd1', color: 'green' }],
          },
          {
            move: 'Kb2',
            isMainLine: false,
            annotation: '',
            explanation: 'King moves.',
          },
          {
            move: 'Qd2+',
            isMainLine: false,
            annotation: '!',
            explanation: 'Now check is safe. The queen will capture the pawn with check.',
            arrows: [{ from: 'd1', to: 'd2', color: 'green' }],
          },
        ],
      },
    ],
    summary: 'Stalemate traps lurk in queen endgames. When the enemy king is in a corner, be careful not to accidentally stalemate. Always ensure the king has at least one legal move.',
    keyTakeaways: [
      'Corner king = stalemate danger',
      'Check that king has moves',
      'Give air to avoid stalemate',
    ],
    memoryTip: 'Before checkmating, check for stalemate!',
    difficulty: 2,
    estimatedMinutes: 4,
  },
  {
    id: 'qe-queen-centralization',
    category: 'QUEEN_ENDGAMES',
    title: 'Central Queen',
    subtitle: 'Dominating from the Center',
    fen: '8/p4pk1/6p1/8/3Q4/8/PP3PPP/6K1 w - - 0 1',
    toMove: 'white',
    introduction: 'In queen endgames, a centralized queen controls the entire board. It can switch between attack and defense, hitting multiple targets.',
    keyIdeas: [
      'Central queen controls all directions',
      'Can attack and defend simultaneously',
      'Creates multiple threats',
    ],
    mainLine: [
      {
        move: 'Qd7',
        isMainLine: true,
        annotation: '!',
        explanation: 'Maximum centralization. The queen attacks the a7 pawn and watches White\'s pawns.',
        arrows: [{ from: 'd4', to: 'd7', color: 'green' }, { from: 'd7', to: 'a7', color: 'yellow' }, { from: 'd7', to: 'f7', color: 'yellow' }],
        highlights: ['d7'],
        conceptTag: 'Centralization',
      },
      {
        move: 'Kf6',
        isMainLine: true,
        annotation: '',
        explanation: 'King activates.',
      },
      {
        move: 'Qxa7',
        isMainLine: true,
        annotation: '',
        explanation: 'Won a pawn while maintaining control.',
      },
      {
        move: 'Ke5',
        isMainLine: true,
        annotation: '',
        explanation: 'King approaches.',
      },
      {
        move: 'Qa5+',
        isMainLine: true,
        annotation: '!',
        explanation: 'Check forces the king back, and now White pushes pawns.',
        arrows: [{ from: 'a7', to: 'a5', color: 'green' }],
      },
    ],
    summary: 'The centralized queen is immensely powerful. From the center, it can attack enemy pawns, give checks, and support your own pawns. Centralization is usually the first priority in queen endings.',
    keyTakeaways: [
      'Central queen = maximum power',
      'Attack and defend from center',
      'Flexibility to switch between tasks',
    ],
    memoryTip: 'Queen in center = Queen supreme',
    difficulty: 2,
    estimatedMinutes: 5,
  },
  {
    id: 'qe-king-shelter',
    category: 'QUEEN_ENDGAMES',
    title: 'King Safety in Queen Endings',
    subtitle: 'Finding Shelter',
    fen: '4q3/8/8/3pk3/8/8/PP3PPP/4Q1K1 w - - 0 1',
    toMove: 'white',
    introduction: 'In queen endgames, king safety is paramount. A well-sheltered king can support winning attempts while avoiding perpetual check.',
    keyIdeas: [
      'Pawn shelter protects from checks',
      'Avoid exposed king positions',
      'King safety before aggression',
    ],
    mainLine: [
      {
        move: 'h3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Creating a safe shelter at h2. The king will have a haven.',
        arrows: [{ from: 'h2', to: 'h3', color: 'green' }],
        highlights: ['g2', 'h3'],
        conceptTag: 'King Shelter',
      },
      {
        move: 'Qe4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black centralizes.',
      },
      {
        move: 'Kh2',
        isMainLine: true,
        annotation: '!',
        explanation: 'King tucks in safely. Now White can push pawns without perpetual worries.',
        highlights: ['h2'],
      },
      {
        move: 'Qe2',
        isMainLine: true,
        annotation: '',
        explanation: 'Trying to check.',
      },
      {
        move: 'Qb4+',
        isMainLine: true,
        annotation: '!',
        explanation: 'Counter-check! White takes the initiative.',
        arrows: [{ from: 'e1', to: 'b4', color: 'green' }],
      },
      {
        move: 'Ke6',
        isMainLine: true,
        annotation: '',
        explanation: 'King escapes.',
      },
      {
        move: 'a4',
        isMainLine: true,
        annotation: '',
        explanation: 'White advances pawns with a safe king.',
        conceptTag: 'Safe Advancement',
      },
    ],
    summary: 'In queen endings, ensure your king is safe before launching attacks. A shelter of pawns prevents perpetual checks and lets you focus on winning.',
    keyTakeaways: [
      'Pawn shelter stops perpetuals',
      'Safe king enables aggression',
      'Build shelter before advancing',
    ],
    memoryTip: 'Shelter your king, then strike!',
    difficulty: 3,
    estimatedMinutes: 5,
  },
];

// ============================================
// PRACTICAL ENDGAME PATTERNS
// ============================================

const practicalEndgamePatterns: EnhancedEndgamePattern[] = [
  {
    id: 'pe-king-activity',
    category: 'PRACTICAL',
    title: 'King Activation',
    subtitle: 'The King is a Fighting Piece',
    fen: 'r7/p4pkp/1p4p1/8/1PP5/P4P2/5KPP/R7 w - - 0 1',
    toMove: 'white',
    introduction: 'In the endgame, the king transforms from a piece needing protection to an active fighter. Centralizing the king is often the first priority.',
    keyIdeas: [
      'King becomes strong in endgames',
      'Centralize the king early',
      'King supports pawn advances',
    ],
    mainLine: [
      {
        move: 'Ke3',
        isMainLine: true,
        annotation: '!',
        explanation: 'The king begins its march to the center. It will support the pawns and attack weaknesses.',
        arrows: [{ from: 'f2', to: 'e3', color: 'green' }, { from: 'e3', to: 'd4', color: 'yellow' }],
        conceptTag: 'King Activation',
      },
      {
        move: 'Ra4',
        isMainLine: true,
        annotation: '',
        explanation: 'Rook attacks pawns.',
      },
      {
        move: 'Kd4',
        isMainLine: true,
        annotation: '!',
        explanation: 'Centralized! The king is now a powerful piece, attacking b6 and supporting c5.',
        highlights: ['d4'],
      },
      {
        move: 'Ra1',
        isMainLine: true,
        annotation: '',
        explanation: 'Rook retreats.',
      },
      {
        move: 'c5',
        isMainLine: true,
        annotation: '!',
        explanation: 'Pushing with the king\'s support. The active king makes all the difference.',
        arrows: [{ from: 'c4', to: 'c5', color: 'green' }],
        conceptTag: 'Supported Advance',
      },
    ],
    summary: 'In the endgame, activate your king immediately. A centralized king controls key squares, supports pawn advances, and can attack enemy weaknesses. Don\'t leave it passive!',
    keyTakeaways: [
      'Activate king in endgames',
      'Centralized king controls both flanks',
      'King supports pawn pushes',
    ],
    memoryTip: 'Endgame king = Enlightened king',
    difficulty: 2,
    estimatedMinutes: 5,
  },
  {
    id: 'pe-passed-pawn-creation',
    category: 'PRACTICAL',
    title: 'Creating Passed Pawns',
    subtitle: 'A Pawn\'s Dream',
    fen: '8/pp3k2/8/PPP5/8/5K2/8/8 w - - 0 1',
    toMove: 'white',
    introduction: 'Creating a passed pawn is often the key to winning endgames. Pawn breaks and sacrifices can create unstoppable passers.',
    keyIdeas: [
      'Pawn majority creates passed pawns',
      'Pawn sacrifices can create passers',
      'Passed pawn must be pushed',
    ],
    mainLine: [
      {
        move: 'b6',
        isMainLine: true,
        annotation: '!',
        explanation: 'The breakthrough! This creates a passed pawn by force.',
        arrows: [{ from: 'b5', to: 'b6', color: 'green' }],
        conceptTag: 'Breakthrough',
      },
      {
        move: 'axb6',
        isMainLine: true,
        annotation: '',
        explanation: 'If Kb6, then a6! wins.',
        alternativeMoves: [
          {
            move: 'a6',
            evaluation: 'equal',
            explanation: 'Closes the position but White plays c6 and still breaks through.',
          },
        ],
      },
      {
        move: 'c6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Another sacrifice to create a passed pawn.',
        arrows: [{ from: 'c5', to: 'c6', color: 'green' }],
      },
      {
        move: 'bxc6',
        isMainLine: true,
        annotation: '',
        explanation: 'Forced.',
      },
      {
        move: 'a6',
        isMainLine: true,
        annotation: '!',
        explanation: 'The passed pawn is unstoppable. It will queen.',
        highlights: ['a6'],
        conceptTag: 'Passed Pawn',
      },
    ],
    summary: 'Pawn majorities should create passed pawns. The breakthrough sacrifice (giving up pawns to create a passer) is a fundamental technique. A passed pawn is a criminal that must be arrested!',
    keyTakeaways: [
      'Pawn majority = potential passed pawn',
      'Sacrifices can create passed pawns',
      'Push passed pawns!',
    ],
    memoryTip: 'Breakthrough = Break through to victory',
    difficulty: 2,
    estimatedMinutes: 5,
  },
  {
    id: 'pe-trade-when-ahead',
    category: 'PRACTICAL',
    title: 'Exchanges When Ahead',
    subtitle: 'Simplify to Win',
    fen: 'r3r1k1/pp3ppp/2p5/8/3N4/5N2/PPP2PPP/R3R1K1 w - - 0 1',
    toMove: 'white',
    introduction: 'When ahead in material, simplification increases your advantage. Trading pieces makes your extra material count more.',
    keyIdeas: [
      'Extra piece is bigger with fewer pieces',
      'Trade pieces, not pawns',
      'Simplify to a won endgame',
    ],
    mainLine: [
      {
        move: 'Rxe8+',
        isMainLine: true,
        annotation: '!',
        explanation: 'Trading a pair of rooks. With fewer pieces, the extra knight dominates.',
        arrows: [{ from: 'e1', to: 'e8', color: 'green' }],
        conceptTag: 'Simplification',
      },
      {
        move: 'Rxe8',
        isMainLine: true,
        annotation: '',
        explanation: 'Forced recapture.',
      },
      {
        move: 'Re1',
        isMainLine: true,
        annotation: '!',
        explanation: 'Offering another trade. Black cannot avoid simplification.',
        arrows: [{ from: 'a1', to: 'e1', color: 'green' }],
      },
      {
        move: 'Rxe1+',
        isMainLine: true,
        annotation: '',
        explanation: 'Forced.',
      },
      {
        move: 'Nxe1',
        isMainLine: true,
        annotation: '',
        explanation: 'Now White has two knights vs zero! The win is simple.',
        highlights: ['d4', 'e1'],
        conceptTag: 'Technical Win',
      },
    ],
    summary: 'When ahead in material, seek trades! Each exchange increases the relative value of your extra material. Trade pieces (not pawns) and head to a winning endgame.',
    keyTakeaways: [
      'Ahead in material = seek trades',
      'Trade pieces, keep pawns',
      'Fewer pieces = bigger relative advantage',
    ],
    memoryTip: 'More material? More trades!',
    difficulty: 2,
    estimatedMinutes: 5,
  },
  {
    id: 'pe-defense-when-behind',
    category: 'PRACTICAL',
    title: 'Defense When Behind',
    subtitle: 'Fighting Chances',
    fen: '8/5pk1/6pp/8/8/2N2PP1/r4P1P/6K1 w - - 0 1',
    toMove: 'white',
    introduction: 'When down material, avoid trades and create complications. Counterattack, create threats, and make your opponent work for the win.',
    keyIdeas: [
      'Avoid trades when behind',
      'Create counterplay',
      'Complicate the position',
    ],
    mainLine: [
      {
        move: 'Ne4',
        isMainLine: true,
        annotation: '!',
        explanation: 'The knight becomes active, creating threats and complications.',
        arrows: [{ from: 'c3', to: 'e4', color: 'green' }],
        conceptTag: 'Active Defense',
      },
      {
        move: 'Ra1+',
        isMainLine: true,
        annotation: '',
        explanation: 'Check.',
      },
      {
        move: 'Kh2',
        isMainLine: true,
        annotation: '',
        explanation: 'Escaping.',
      },
      {
        move: 'Ra4',
        isMainLine: true,
        annotation: '',
        explanation: 'Attacking the knight.',
      },
      {
        move: 'Nf6+',
        isMainLine: true,
        annotation: '!',
        explanation: 'Counterattack! The knight creates threats against Black\'s king.',
        arrows: [{ from: 'e4', to: 'f6', color: 'green' }],
        conceptTag: 'Counterattack',
      },
      {
        move: 'Kf8',
        isMainLine: true,
        annotation: '',
        explanation: 'Avoiding trouble.',
      },
      {
        move: 'Nd7+',
        isMainLine: true,
        annotation: '',
        explanation: 'Perpetual threat keeps White in the game.',
      },
    ],
    summary: 'When down material, fight back! Avoid exchanges, create active pieces, and look for counterplay. Make your opponent prove they can win.',
    keyTakeaways: [
      'Avoid trades when behind',
      'Seek counterattacking chances',
      'Activity compensates for material',
    ],
    memoryTip: 'Down material? Don\'t go down without a fight!',
    difficulty: 3,
    estimatedMinutes: 5,
  },
  {
    id: 'pe-converting-advantage',
    category: 'PRACTICAL',
    title: 'Converting an Advantage',
    subtitle: 'Technique vs Resistance',
    fen: '8/p4pkp/1p4p1/2p5/2P5/1P3PP1/P5KP/R7 w - - 0 1',
    toMove: 'white',
    introduction: 'Converting a small advantage requires patience and technique. Improve your position gradually, create weaknesses, and don\'t rush.',
    keyIdeas: [
      'Improve pieces to optimal squares',
      'Create weaknesses before attacking',
      'Patient maneuvering',
    ],
    mainLine: [
      {
        move: 'Kf2',
        isMainLine: true,
        annotation: '!',
        explanation: 'No rush. The king activates, preparing to support the rook invasion.',
        arrows: [{ from: 'g2', to: 'f2', color: 'green' }],
        conceptTag: 'Improvement',
      },
      {
        move: 'Ke6',
        isMainLine: true,
        annotation: '',
        explanation: 'Black centralizes too.',
      },
      {
        move: 'Ke3',
        isMainLine: true,
        annotation: '',
        explanation: 'King marches.',
      },
      {
        move: 'Ke5',
        isMainLine: true,
        annotation: '',
        explanation: 'Counter-centralization.',
      },
      {
        move: 'Ra6',
        isMainLine: true,
        annotation: '!',
        explanation: 'Rook activates to attack the weak pawns on the 6th rank.',
        arrows: [{ from: 'a1', to: 'a6', color: 'green' }],
        highlights: ['a7', 'b6'],
        conceptTag: 'Creating Targets',
      },
      {
        move: 'Kd4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black attacks c4.',
      },
      {
        move: 'Rxa7',
        isMainLine: true,
        annotation: '!',
        explanation: 'Won a pawn! Patient maneuvering paid off.',
        highlights: ['a7'],
      },
    ],
    summary: 'Converting an advantage requires technique: improve all your pieces, create targets in the enemy position, and only then attack. Patience is key.',
    keyTakeaways: [
      'Improve pieces before attacking',
      'Create targets before attacking them',
      'Patience wins endgames',
    ],
    memoryTip: 'Converting = Calm, Calculated, Certain',
    difficulty: 3,
    estimatedMinutes: 6,
  },
];

// ============================================
// EXPORT ALL PATTERNS
// ============================================

export const enhancedEndgamePatterns: EnhancedEndgamePattern[] = [
  ...kingPawnPatterns,
  ...rookEndgamePatterns,
  ...minorPiecePatterns,
  ...queenEndgamePatterns,
  ...practicalEndgamePatterns,
];

// Helper functions
export function getEndgamePatternsByCategory(category: EndgameCategory): EnhancedEndgamePattern[] {
  return enhancedEndgamePatterns.filter(p => p.category === category);
}

export function getAllEndgameCategories(): EndgameCategory[] {
  return ['KING_PAWN', 'ROOK_ENDGAMES', 'MINOR_PIECE', 'QUEEN_ENDGAMES', 'PRACTICAL'];
}

export function getEndgameCategoryStats(category: EndgameCategory): { total: number; avgDifficulty: number; totalMinutes: number } {
  const patterns = getEndgamePatternsByCategory(category);
  const avgDifficulty = patterns.reduce((sum, p) => sum + p.difficulty, 0) / patterns.length || 0;
  const totalMinutes = patterns.reduce((sum, p) => sum + p.estimatedMinutes, 0);
  return { total: patterns.length, avgDifficulty: Math.round(avgDifficulty * 10) / 10, totalMinutes };
}
