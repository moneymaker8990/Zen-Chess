// ============================================
// ADDITIONAL POSITIONAL PATTERNS
// AI-generated with chess.js validation
// All patterns verified to have legal moves
// ============================================

import type { EnhancedPattern } from './enhancedPatterns';

const additionalPatterns: EnhancedPattern[] = [
  {
    id: 'outpost-e5-italian',
    category: 'OUTPOSTS',
    title: "The e5 Outpost in the Italian",
    subtitle: "Central knight domination",
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "In the Italian Game, White often fights for the e5 square. A knight on e5 is a powerful piece that dominates the center and attacks f7.",
    keyIdeas: [
      "Fight for control of central outpost squares",
      "Use piece exchanges to clear the path to outposts",
      "Coordinate pieces to support outpost placement",
      "Exploit weak squares in the opponent's position"
    ],
    mainLine: [
      {
        move: "d4",
        isMainLine: true,
        annotation: "!",
        explanation: "We challenge Black's central pawn structure and open lines for our pieces.",
        conceptTag: "Central Break"
      },
      {
        move: "exd4",
        isMainLine: true,
        annotation: "",
        explanation: "Black accepts the challenge and captures.",
        conceptTag: ""
      },
      {
        move: "Nxd4",
        isMainLine: true,
        annotation: "",
        explanation: "We recapture with the knight, heading toward the e5 outpost.",
        conceptTag: ""
      },
      {
        move: "Nxd4",
        isMainLine: true,
        annotation: "",
        explanation: "Black exchanges knights.",
        conceptTag: ""
      },
      {
        move: "Qxd4",
        isMainLine: true,
        annotation: "",
        explanation: "We recapture, and now our pieces eye the weakened dark squares.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles for king safety.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "!",
        explanation: "Developing with a plan - this knight can jump to e5 later, occupying the perfect outpost.",
        highlights: [
          "e5"
        ],
        conceptTag: "Development"
      }
    ],
    summary: "The e5 square in the Italian Game is a classic outpost. By controlling this square with pieces and preventing Black from challenging it with pawns, White gains a long-term positional advantage.",
    keyTakeaways: [
      "Central outposts like e5 are worth fighting for",
      "Use pawn breaks to open lines and create outposts",
      "Coordinate multiple pieces to control outpost squares",
      "Outposts near the enemy king are especially dangerous"
    ],
    
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Italian Game theory",
  }
];

export default additionalPatterns;
