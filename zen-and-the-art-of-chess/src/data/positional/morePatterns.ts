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
  },

  {
    id: 'pawn-structure-pawn-chain',
    category: 'PAWN_STRUCTURE',
    title: "The Pawn Chain",
    subtitle: "Building a strong pawn structure",
    fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 0 5',
    toMove: 'black',
    introduction: "A pawn chain is a diagonal formation of pawns. Understanding pawn chains is crucial - attack the base, not the head.",
    keyIdeas: [
      "Identify the pawn chain structure",
      "Attack the base of opponent pawn chains",
      "Defend your own pawn chain base",
      "Use pawn breaks to undermine chains"
    ],
    mainLine: [
      {
        move: "c5",
        isMainLine: true,
        annotation: "!",
        explanation: "Black attacks the base of White's pawn chain (d4). This is the correct strategic approach.",
        highlights: [
          "d4"
        ],
        conceptTag: "Pawn Chain"
      },
      {
        move: "e3",
        isMainLine: true,
        annotation: "",
        explanation: "White solidifies the center.",
        conceptTag: ""
      },
      {
        move: "Nc6",
        isMainLine: true,
        annotation: "",
        explanation: "Developing and increasing pressure on d4.",
        conceptTag: "Development"
      },
      {
        move: "Be2",
        isMainLine: true,
        annotation: "",
        explanation: "White develops, preparing to castle.",
        conceptTag: ""
      }
    ],
    summary: "Pawn chains define the structure of the position. Remember: attack the base, not the head of the chain. The base is the most vulnerable point.",
    keyTakeaways: [
      "Pawn chains form diagonal structures",
      "Attack the base of enemy pawn chains",
      "The base is weaker than the head",
      "Use pawn breaks strategically"
    ],
    memoryTip: "Attack the base, not the head!",
    difficulty: 2,
    estimatedMinutes: 4,
    source: "Nimzowitsch pawn chain theory",
  },

  {
    id: 'knight-centralization',
    category: 'KNIGHT_PLACEMENT',
    title: "Centralizing the Knight",
    subtitle: "Maximum control from the center",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/3P1N2/PPP2PPP/RNBQKB1R w KQkq - 0 5',
    toMove: 'white',
    introduction: "A centralized knight controls the most squares. From e4 or d5, a knight can reach 8 squares, compared to only 2 from a corner.",
    keyIdeas: [
      "Place knights in the center when possible",
      "Knights control maximum squares from center",
      "Use knights to control key squares",
      "Centralized knights support attacks"
    ],
    mainLine: [
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "",
        explanation: "Developing the knight toward the center.",
        conceptTag: "Development"
      },
      {
        move: "Bb4",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops with tempo.",
        conceptTag: ""
      },
      {
        move: "Bd2",
        isMainLine: true,
        annotation: "",
        explanation: "We break the pin.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      },
      {
        move: "Nd5",
        isMainLine: true,
        annotation: "!",
        explanation: "Our knight reaches the ideal central square d5, controlling key squares and pressuring Black's position.",
        highlights: [
          "d5"
        ],
        arrows: [
          {
            from: "d5",
            to: "b4",
            color: "green"
          },
          {
            from: "d5",
            to: "f6",
            color: "green"
          }
        ],
        conceptTag: "Centralization"
      }
    ],
    summary: "Central knights are powerful knights. A knight on d5 or e4 controls many squares and supports both attack and defense.",
    keyTakeaways: [
      "Central knights control the most squares",
      "Aim for d5, e5, d4, or e4 squares",
      "A knight on the rim is dim",
      "Central knights support all plans"
    ],
    memoryTip: "Center knights = maximum might!",
    difficulty: 2,
    estimatedMinutes: 4,
    source: "Classical principles",
  },

  {
    id: 'centralization-piece-activity',
    category: 'CENTRALIZATION',
    title: "Centralizing Your Pieces",
    subtitle: "Controlling the center with pieces",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/3P1N2/PPP2PPP/RNBQKB1R w KQkq - 0 5',
    toMove: 'white',
    introduction: "Centralized pieces have maximum influence over the board. From the center, pieces can quickly reach any part of the board.",
    keyIdeas: [
      "Place pieces on central squares",
      "Control the center with pieces, not just pawns",
      "Centralized pieces have maximum mobility",
      "Use central control to launch attacks"
    ],
    mainLine: [
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "",
        explanation: "Centralizing the knight.",
        conceptTag: "Centralization"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops actively.",
        conceptTag: ""
      },
      {
        move: "Be2",
        isMainLine: true,
        annotation: "",
        explanation: "We develop, preparing to castle.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "We castle as well.",
        conceptTag: "King Safety"
      }
    ],
    summary: "Central piece placement provides maximum flexibility and control. Well-placed central pieces can influence the entire board.",
    keyTakeaways: [
      "Centralized pieces are more active",
      "Control the center with both pawns and pieces",
      "Central control enables flank attacks",
      "Flexibility comes from central placement"
    ],
    
    difficulty: 2,
    estimatedMinutes: 4,
    source: "Central control principles",
  },

  {
    id: 'king-activity-endgame',
    category: 'KING_ACTIVITY',
    title: "The Active King in Endgames",
    subtitle: "King as a fighting piece",
    fen: '8/5pk1/5p2/4p3/4P3/5P2/5PK1/8 w - - 0 1',
    toMove: 'white',
    introduction: "In the endgame, the king transforms from a piece to protect into a powerful fighting unit. An active king is often the difference between a draw and a win.",
    keyIdeas: [
      "Activate your king in endgames",
      "Kings should move toward the center",
      "Use your king to attack enemy pawns",
      "King activity is crucial in pawn endgames"
    ],
    mainLine: [
      {
        move: "Kf1",
        isMainLine: true,
        annotation: "",
        explanation: "Activating the king, heading toward the center.",
        conceptTag: "King Activity"
      },
      {
        move: "Kf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates their king as well.",
        conceptTag: ""
      },
      {
        move: "Ke2",
        isMainLine: true,
        annotation: "",
        explanation: "Continuing toward the center.",
        conceptTag: ""
      },
      {
        move: "Ke7",
        isMainLine: true,
        annotation: "",
        explanation: "Both kings march forward.",
        conceptTag: ""
      },
      {
        move: "Kd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Our king reaches a central square, ready to support our pawns or attack Black's pawns.",
        highlights: [
          "d3"
        ],
        conceptTag: "Centralization"
      }
    ],
    summary: "In endgames, activate your king immediately. A centralized, active king can make the difference between winning and drawing.",
    keyTakeaways: [
      "Kings are strong in the endgame",
      "Centralize your king when the queens are off",
      "Use the king to attack and defend",
      "King activity often decides endgames"
    ],
    memoryTip: "In the endgame, the king is king!",
    difficulty: 2,
    estimatedMinutes: 4,
    source: "Endgame principles",
  },

  {
    id: 'prophylaxis-preventing-breaks',
    category: 'PROPHYLAXIS',
    title: "Preventing Pawn Breaks",
    subtitle: "Stopping opponent plans",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "Prophylaxis means preventing your opponent's plans. In this position, we need to stop Black's ...d5 break.",
    keyIdeas: [
      "Identify opponent threats before they happen",
      "Prevent key pawn breaks",
      "Control critical squares prophylactically",
      "Think: \"What does my opponent want to do?\""
    ],
    mainLine: [
      {
        move: "d4",
        isMainLine: true,
        annotation: "!",
        explanation: "This move controls d5 and e5, preventing Black's pawn breaks. Classic prophylaxis!",
        highlights: [
          "d5",
          "e5"
        ],
        conceptTag: "Prophylaxis"
      },
      {
        move: "exd4",
        isMainLine: true,
        annotation: "",
        explanation: "Black captures.",
        conceptTag: ""
      },
      {
        move: "Nxd4",
        isMainLine: true,
        annotation: "",
        explanation: "We recapture, maintaining central control.",
        conceptTag: ""
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      }
    ],
    summary: "Prophylaxis is about prevention. Before making your move, ask: \"What does my opponent want to do?\" Then stop it!",
    keyTakeaways: [
      "Think about opponent's plans first",
      "Prevent key pawn breaks",
      "Control critical squares",
      "Prophylaxis > Immediate action"
    ],
    memoryTip: "Prevention is better than cure!",
    difficulty: 3,
    estimatedMinutes: 5,
    source: "Aron Nimzowitsch principles",
  }
];

export default additionalPatterns;
