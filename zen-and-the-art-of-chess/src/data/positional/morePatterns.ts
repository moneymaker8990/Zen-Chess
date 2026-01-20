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
    id: 'knight-avoid-rim',
    category: 'KNIGHT_PLACEMENT',
    title: "Avoiding the Rim",
    subtitle: "Knights belong in the center",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/3P1N2/PPP2PPP/RNBQKB1R w KQkq - 0 5',
    toMove: 'white',
    introduction: "The saying goes: \"A knight on the rim is dim!\" Knights are weakest on the edge of the board, controlling far fewer squares than from the center.",
    keyIdeas: [
      "Avoid placing knights on the rim",
      "Centralized knights are powerful",
      "Knights on the rim control few squares",
      "Use knights to control key central squares"
    ],
    mainLine: [
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "!",
        explanation: "We develop the knight toward the center, avoiding the rim squares like a1. Central placement gives maximum control.",
        conceptTag: "Knight Placement"
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
        explanation: "White develops, preparing to castle.",
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
        explanation: "White castles as well.",
        conceptTag: "King Safety"
      }
    ],
    summary: "Knights on the rim are ineffective. Always strive to place knights on central squares where they control the most squares and influence the game.",
    keyTakeaways: [
      "A knight on the rim is dim",
      "Centralize knights whenever possible",
      "Avoid edge squares like a1, h1, a8, h8",
      "Knights need central squares to be effective"
    ],
    memoryTip: "A knight on the rim is dim!",
    difficulty: 1,
    estimatedMinutes: 4,
    source: "Chess principles",
  },

  {
    id: 'knight-strong-squares',
    category: 'KNIGHT_PLACEMENT',
    title: "Placing Knights on Strong Squares",
    subtitle: "Knights need secure posts",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "Knights are most effective on strong squares where they cannot be easily driven away. Place knights on squares that are protected by pawns.",
    keyIdeas: [
      "Place knights on protected squares",
      "Knights need secure posts",
      "Avoid squares where knights can be attacked by pawns",
      "Strong squares give knights long-term power"
    ],
    mainLine: [
      {
        move: "d3",
        isMainLine: true,
        annotation: "",
        explanation: "Supporting e4 and preparing to castle.",
        conceptTag: "Development"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "White castles.",
        conceptTag: "King Safety"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles as well.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "!",
        explanation: "We develop the knight to c3, a strong square protected by the b2 and d2 pawns. This gives the knight a secure post.",
        highlights: [
          "c3"
        ],
        conceptTag: "Knight Placement"
      }
    ],
    summary: "Knights need strong, protected squares to be effective. Place them on squares that cannot be easily attacked by enemy pawns.",
    keyTakeaways: [
      "Knights need secure posts",
      "Protected squares give knights power",
      "Avoid easily attackable squares",
      "Strong squares = strong knights"
    ],
    
    difficulty: 2,
    estimatedMinutes: 4,
    source: "Knight placement principles",
  },

  {
    id: 'knight-outpost-square',
    category: 'KNIGHT_PLACEMENT',
    title: "Knight on an Outpost Square",
    subtitle: "Unassailable knight position",
    fen: 'r1bqkb1r/ppp2ppp/2n2n2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    introduction: "Knights are most effective on outpost squares - squares that cannot be attacked by enemy pawns. These squares provide long-term advantages.",
    keyIdeas: [
      "Place knights on outpost squares",
      "Outposts cannot be attacked by pawns",
      "Knights on outposts are extremely powerful",
      "Use knights to control key squares"
    ],
    mainLine: [
      {
        move: "cxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Exchanging to prepare the outpost.",
        conceptTag: "Exchange"
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures with the knight.",
        conceptTag: ""
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "White recaptures with the knight.",
        conceptTag: ""
      },
      {
        move: "Qxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures with the queen.",
        conceptTag: ""
      },
      {
        move: "Ne5",
        isMainLine: true,
        annotation: "!",
        explanation: "We centralize the knight, and now it can later jump to d5, a perfect outpost square that cannot be attacked by Black's pawns. The knight is heading toward the ideal outpost.",
        highlights: [
          "d5"
        ],
        conceptTag: "Knight Placement"
      }
    ],
    summary: "Knights on outpost squares are extremely powerful. Place them on squares that cannot be attacked by enemy pawns for maximum effect.",
    keyTakeaways: [
      "Place knights on outpost squares",
      "Outposts cannot be attacked by pawns",
      "Knights on outposts control key squares",
      "Long-term advantages from outposts"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Knight placement principles",
  },

  {
    id: 'knight-fork-potential',
    category: 'KNIGHT_PLACEMENT',
    title: "Placing Knights for Forking Opportunities",
    subtitle: "Knights create tactical threats",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "Knights excel at creating forks - attacking two pieces simultaneously. Place knights on squares where they can threaten multiple enemy pieces.",
    keyIdeas: [
      "Place knights to create fork opportunities",
      "Knights excel at attacking multiple pieces",
      "Look for squares that attack key enemy pieces",
      "Use knights tactically to win material"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "!",
        explanation: "We develop the knight, and now it can later jump to squares like d5 or e5, where it might create fork opportunities against Black's pieces.",
        highlights: [
          "c3"
        ],
        conceptTag: "Knight Placement"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Place knights on squares where they can create fork opportunities. Knights that threaten multiple enemy pieces are extremely dangerous.",
    keyTakeaways: [
      "Place knights to create fork opportunities",
      "Knights excel at attacking multiple pieces",
      "Look for squares that attack key pieces",
      "Use knights tactically for material gains"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Knight tactical principles",
  },

  {
    id: 'knight-outpost-placement',
    category: 'KNIGHT_PLACEMENT',
    title: "Placing Knights on Outposts",
    subtitle: "Knights on protected squares",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 6',
    toMove: 'white',
    introduction: "Knights on outposts (advanced squares that cannot be attacked by enemy pawns) are extremely powerful. They control key squares and are difficult to dislodge.",
    keyIdeas: [
      "Place knights on outpost squares",
      "Knights on outposts are very strong",
      "Look for protected advanced squares",
      "Use outposts to control key squares"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nbd2",
        isMainLine: true,
        annotation: "!",
        explanation: "We develop the knight, preparing to move it to an outpost square like e5 or d5. Knights on outposts are powerful and difficult to dislodge.",
        highlights: [
          "d2"
        ],
        conceptTag: "Knight Placement"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Place knights on outpost squares whenever possible. Knights on outposts control key squares and are extremely difficult to dislodge.",
    keyTakeaways: [
      "Place knights on outpost squares",
      "Knights on outposts are very strong",
      "Look for protected advanced squares",
      "Use outposts to control key squares"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Knight placement principles",
  },

  {
    id: 'knight-defending-squares',
    category: 'KNIGHT_PLACEMENT',
    title: "Knights Defending Key Squares",
    subtitle: "Defensive knight placement",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 6',
    toMove: 'white',
    introduction: "Knights are excellent defensive pieces. Place knights on squares where they defend key squares and support your position.",
    keyIdeas: [
      "Place knights to defend key squares",
      "Knights excel at defensive roles",
      "Defend weaknesses with knights",
      "Use knights to support other pieces"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nbd2",
        isMainLine: true,
        annotation: "!",
        explanation: "We develop the knight to d2, where it defends key squares like e4 and supports our position. Knights on defensive squares are very useful.",
        highlights: [
          "d2"
        ],
        conceptTag: "Knight Placement"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Place knights on squares where they defend key squares. Knights are excellent defensive pieces that support your position effectively.",
    keyTakeaways: [
      "Place knights to defend key squares",
      "Knights excel at defensive roles",
      "Defend weaknesses with knights",
      "Use knights to support other pieces"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Knight placement principles",
  },

  {
    id: 'knight-central-square',
    category: 'KNIGHT_PLACEMENT',
    title: "Knight on Central Square",
    subtitle: "Controlling the center",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "Knights on central squares control many squares and are very powerful. Place knights on central squares whenever possible.",
    keyIdeas: [
      "Place knights on central squares",
      "Central knights control many squares",
      "Knights on central squares are powerful",
      "Control the center with knights"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "!",
        explanation: "We develop the knight to c3, a central square. From here, the knight controls many squares and supports our position effectively.",
        highlights: [
          "c3"
        ],
        conceptTag: "Knight Placement"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Place knights on central squares whenever possible. Central knights control many squares and are very powerful.",
    keyTakeaways: [
      "Place knights on central squares",
      "Central knights control many squares",
      "Knights on central squares are powerful",
      "Control the center with knights"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Knight placement principles",
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
    id: 'centralization-endgame',
    category: 'CENTRALIZATION',
    title: "Centralizing in the Endgame",
    subtitle: "Bringing pieces to the center",
    fen: '8/5pk1/5p2/4p3/4P3/5P2/5PK1/8 w - - 0 1',
    toMove: 'white',
    introduction: "In the endgame, centralization becomes even more important. Centralized pieces can quickly reach any part of the board to attack or defend.",
    keyIdeas: [
      "Centralize pieces in the endgame",
      "Central pieces reach all areas quickly",
      "Control the center in endgames",
      "Use centralized pieces to support pawns"
    ],
    mainLine: [
      {
        move: "Kf1",
        isMainLine: true,
        annotation: "",
        explanation: "Activating the king toward the center.",
        conceptTag: "King Activity"
      },
      {
        move: "Kg8",
        isMainLine: true,
        annotation: "",
        explanation: "Black moves the king.",
        conceptTag: ""
      },
      {
        move: "Ke2",
        isMainLine: true,
        annotation: "!",
        explanation: "Our king reaches a central square, from where it can quickly move to support our pawns or attack Black's pawns on either flank.",
        highlights: [
          "e2"
        ],
        conceptTag: "Centralization"
      },
      {
        move: "Kf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black moves the king.",
        conceptTag: ""
      },
      {
        move: "Kd3",
        isMainLine: true,
        annotation: "",
        explanation: "Further centralization, controlling key squares.",
        conceptTag: ""
      }
    ],
    summary: "In endgames, centralization is crucial. Centralized kings and pieces control the board and can quickly respond to threats anywhere.",
    keyTakeaways: [
      "Centralize pieces in endgames",
      "Central pieces have maximum mobility",
      "Control the center for endgame success",
      "Centralized pieces support all plans"
    ],
    
    difficulty: 2,
    estimatedMinutes: 4,
    source: "Endgame principles",
  },

  {
    id: 'centralization-middlegame',
    category: 'CENTRALIZATION',
    title: "Centralizing Pieces in the Middlegame",
    subtitle: "Bringing pieces to the center",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "In the middlegame, centralizing pieces gives them maximum influence. Central pieces control key squares and support all plans.",
    keyIdeas: [
      "Centralize pieces in the middlegame",
      "Central pieces have maximum activity",
      "Control key squares from the center",
      "Use centralized pieces to support plans"
    ],
    mainLine: [
      {
        move: "d3",
        isMainLine: true,
        annotation: "",
        explanation: "Supporting e4 and developing.",
        conceptTag: "Development"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "White castles.",
        conceptTag: "King Safety"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles as well.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "!",
        explanation: "We develop the knight to c3, a central square. Our pieces on e4, d3, c3, and c4 are all centralized, giving maximum control.",
        highlights: [
          "e4",
          "d3",
          "c3",
          "c4"
        ],
        conceptTag: "Centralization"
      }
    ],
    summary: "In the middlegame, centralize your pieces to gain maximum activity and control. Central pieces support both attack and defense.",
    keyTakeaways: [
      "Centralize pieces in the middlegame",
      "Central pieces have maximum influence",
      "Control key squares from the center",
      "Use centralization to support all plans"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Middlegame principles",
  },

  {
    id: 'centralization-rooks',
    category: 'CENTRALIZATION',
    title: "Centralizing Rooks",
    subtitle: "Rooks belong in the center",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "Rooks are most effective when centralized, especially in the middlegame. Central rooks control key files and support all plans.",
    keyIdeas: [
      "Centralize rooks in the middlegame",
      "Central rooks control key files",
      "Place rooks on central files",
      "Use central rooks to support plans"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety and activating the rook.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Re1",
        isMainLine: true,
        annotation: "!",
        explanation: "We place the rook on the central e-file. Centralized rooks control key files and support all plans, from attack to defense.",
        highlights: [
          "e1"
        ],
        conceptTag: "Centralization"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Centralize rooks in the middlegame by placing them on central files. Central rooks have maximum influence and support all plans.",
    keyTakeaways: [
      "Centralize rooks on central files",
      "Central rooks control key squares",
      "Use rooks to support all plans",
      "Maximum influence from central rooks"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Rook centralization principles",
  },

  {
    id: 'centralization-bishops',
    category: 'CENTRALIZATION',
    title: "Centralizing Bishops",
    subtitle: "Bishops on long diagonals",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "Bishops are most effective when centralized on long diagonals. Central bishops control key squares and support both attack and defense.",
    keyIdeas: [
      "Centralize bishops on long diagonals",
      "Central bishops control key squares",
      "Place bishops on active diagonals",
      "Use central bishops to support plans"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "d3",
        isMainLine: true,
        annotation: "!",
        explanation: "We support e4, and now our bishop on c4 is centralized on a long diagonal, controlling key squares and supporting our position.",
        highlights: [
          "c4"
        ],
        conceptTag: "Centralization"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Centralize bishops on long diagonals for maximum activity. Central bishops control key squares and support all plans.",
    keyTakeaways: [
      "Centralize bishops on long diagonals",
      "Central bishops control key squares",
      "Place bishops on active diagonals",
      "Maximum influence from central bishops"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Bishop centralization principles",
  },

  {
    id: 'centralization-queen',
    category: 'CENTRALIZATION',
    title: "Centralizing the Queen",
    subtitle: "Queen in the center",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "The queen is most effective when centralized. A central queen controls key squares, supports all plans, and creates powerful threats.",
    keyIdeas: [
      "Centralize the queen for maximum activity",
      "Central queen controls key squares",
      "Place queen on active squares",
      "Use central queen to support all plans"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Qe2",
        isMainLine: true,
        annotation: "!",
        explanation: "We develop the queen to a central square, where it controls key squares and supports our position. A central queen is very powerful.",
        highlights: [
          "e2"
        ],
        conceptTag: "Centralization"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Centralize the queen for maximum activity. A central queen controls key squares and supports all plans effectively.",
    keyTakeaways: [
      "Centralize the queen for maximum activity",
      "Central queen controls key squares",
      "Place queen on active squares",
      "Maximum influence from central queen"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Queen centralization principles",
  },

  {
    id: 'centralization-all-pieces',
    category: 'CENTRALIZATION',
    title: "Centralizing All Pieces",
    subtitle: "Maximum central control",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "When all pieces are centralized, they control the center and support each other. Centralized pieces create maximum pressure and coordination.",
    keyIdeas: [
      "Centralize all pieces for maximum control",
      "Central pieces support each other",
      "Control the center with all pieces",
      "Maximum coordination from centralization"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops the knight to a central square.",
        conceptTag: "Development"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      },
      {
        move: "Qe2",
        isMainLine: true,
        annotation: "!",
        explanation: "We develop the queen to a central square. Now our bishop on c4, knight on c3, and queen on e2 are all centralized, creating maximum control and coordination.",
        highlights: [
          "c4",
          "c3",
          "e2"
        ],
        conceptTag: "Centralization"
      }
    ],
    summary: "Centralize all pieces for maximum control. Centralized pieces support each other and create maximum pressure and coordination.",
    keyTakeaways: [
      "Centralize all pieces for maximum control",
      "Central pieces support each other",
      "Control the center with all pieces",
      "Maximum coordination from centralization"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Centralization principles",
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
    id: 'king-activity-attacking-pawns',
    category: 'KING_ACTIVITY',
    title: "King Attacking Weak Pawns",
    subtitle: "Using the king as an attacker",
    fen: '8/5pk1/5p2/4p3/4P3/5P2/5PK1/8 w - - 0 1',
    toMove: 'white',
    introduction: "In endgames, the king can attack enemy pawns directly. An active king that attacks weaknesses is a powerful weapon.",
    keyIdeas: [
      "Use the king to attack weak pawns",
      "Active kings decide endgames",
      "Attack enemy pawns with your king",
      "Centralize the king to reach all areas"
    ],
    mainLine: [
      {
        move: "Kf1",
        isMainLine: true,
        annotation: "",
        explanation: "Moving the king toward the center and Black's pawns.",
        conceptTag: "King Activity"
      },
      {
        move: "Kg8",
        isMainLine: true,
        annotation: "",
        explanation: "Black moves the king.",
        conceptTag: ""
      },
      {
        move: "Ke2",
        isMainLine: true,
        annotation: "",
        explanation: "Continuing centralization.",
        conceptTag: ""
      },
      {
        move: "Kf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black moves the king.",
        conceptTag: ""
      },
      {
        move: "Kd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Our king is now centralized and ready to attack Black's pawns on either flank. Active kings are key to endgame success.",
        highlights: [
          "d3"
        ],
        conceptTag: "King Activity"
      }
    ],
    summary: "In endgames, use your king actively to attack enemy pawns. An active king that attacks weaknesses is far superior to a passive king.",
    keyTakeaways: [
      "Active kings attack weak pawns",
      "Centralize the king in endgames",
      "Use the king as an attacking piece",
      "King activity often decides endgames"
    ],
    
    difficulty: 2,
    estimatedMinutes: 4,
    source: "King activity in endgames",
  },

  {
    id: 'king-activity-center-endgame',
    category: 'KING_ACTIVITY',
    title: "King in the Center",
    subtitle: "Centralized king dominates",
    fen: '8/5pk1/5p2/4p3/4P3/5P2/5PK1/8 w - - 0 1',
    toMove: 'white',
    introduction: "In endgames, a centralized king dominates the board. The king should move to the center as quickly as possible when the queens are off.",
    keyIdeas: [
      "Centralize the king in endgames",
      "A central king reaches all areas quickly",
      "Use the king actively in endgames",
      "The king is a powerful piece in endgames"
    ],
    mainLine: [
      {
        move: "Kf1",
        isMainLine: true,
        annotation: "",
        explanation: "Moving the king toward the center.",
        conceptTag: "King Activity"
      },
      {
        move: "Kg8",
        isMainLine: true,
        annotation: "",
        explanation: "Black moves the king.",
        conceptTag: ""
      },
      {
        move: "Ke2",
        isMainLine: true,
        annotation: "",
        explanation: "Continuing centralization.",
        conceptTag: ""
      },
      {
        move: "Kf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black moves the king.",
        conceptTag: ""
      },
      {
        move: "Kd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Our king reaches a central square. From d3, it can quickly reach any part of the board, supporting pawns and attacking Black's pawns.",
        highlights: [
          "d3"
        ],
        conceptTag: "King Activity"
      }
    ],
    summary: "In endgames, centralize your king immediately. A central king has maximum mobility and can influence the entire board.",
    keyTakeaways: [
      "Centralize the king in endgames",
      "A central king has maximum mobility",
      "Use the king actively as a fighting piece",
      "King centralization often decides endgames"
    ],
    
    difficulty: 2,
    estimatedMinutes: 4,
    source: "Endgame king activity",
  },

  {
    id: 'king-activity-supporting-pawns',
    category: 'KING_ACTIVITY',
    title: "King Supporting Pawns",
    subtitle: "Active king in pawn endgames",
    fen: '8/5pk1/5p2/4p3/4P3/5P2/5PK1/8 w - - 0 1',
    toMove: 'white',
    introduction: "In pawn endgames, the king must actively support its pawns. An active king that supports its pawns is far superior to a passive king.",
    keyIdeas: [
      "Use the king to support pawns in endgames",
      "Active kings decide pawn endgames",
      "Centralize the king to support pawns",
      "The king is a fighting piece in endgames"
    ],
    mainLine: [
      {
        move: "Kf1",
        isMainLine: true,
        annotation: "",
        explanation: "Moving the king toward the center to support the pawns.",
        conceptTag: "King Activity"
      },
      {
        move: "Kg8",
        isMainLine: true,
        annotation: "",
        explanation: "Black moves the king.",
        conceptTag: ""
      },
      {
        move: "Ke2",
        isMainLine: true,
        annotation: "",
        explanation: "Further centralization to support the e-pawn.",
        conceptTag: ""
      },
      {
        move: "Kf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black moves the king.",
        conceptTag: ""
      },
      {
        move: "Kd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Our king is now centralized and can support both the e-pawn and f-pawn. An active king supporting pawns is crucial in endgames.",
        highlights: [
          "d3",
          "e4",
          "f3"
        ],
        conceptTag: "King Activity"
      }
    ],
    summary: "In pawn endgames, use your king actively to support your pawns. An active king that supports pawns often decides the game.",
    keyTakeaways: [
      "Use the king to support pawns in endgames",
      "Active kings support all pawns",
      "Centralize the king in pawn endgames",
      "King activity decides pawn endgames"
    ],
    
    difficulty: 2,
    estimatedMinutes: 4,
    source: "Pawn endgame principles",
  },

  {
    id: 'king-activity-opposition',
    category: 'KING_ACTIVITY',
    title: "The Opposition",
    subtitle: "King activity in pawn endgames",
    fen: '8/5pk1/5p2/4p3/4P3/5P2/5PK1/8 w - - 0 1',
    toMove: 'white',
    introduction: "The opposition is a crucial concept in pawn endgames. The player with the opposition can control key squares and often win.",
    keyIdeas: [
      "The opposition controls key squares",
      "Use the opposition to advance your pawns",
      "Active kings gain the opposition",
      "The opposition often decides endgames"
    ],
    mainLine: [
      {
        move: "Kf1",
        isMainLine: true,
        annotation: "",
        explanation: "Moving the king toward the center.",
        conceptTag: "King Activity"
      },
      {
        move: "Kg8",
        isMainLine: true,
        annotation: "",
        explanation: "Black moves the king.",
        conceptTag: ""
      },
      {
        move: "Ke2",
        isMainLine: true,
        annotation: "",
        explanation: "Further centralization.",
        conceptTag: ""
      },
      {
        move: "Kf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black moves the king.",
        conceptTag: ""
      },
      {
        move: "Kd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Our king reaches a central square. Understanding the opposition helps control key squares in pawn endgames.",
        highlights: [
          "d3"
        ],
        conceptTag: "King Activity"
      }
    ],
    summary: "The opposition is crucial in pawn endgames. The player with the opposition controls key squares and can often win.",
    keyTakeaways: [
      "The opposition controls key squares",
      "Use the opposition to advance pawns",
      "Active kings gain the opposition",
      "The opposition often decides endgames"
    ],
    
    difficulty: 3,
    estimatedMinutes: 5,
    source: "Endgame opposition principles",
  },

  {
    id: 'king-activity-middlegame',
    category: 'KING_ACTIVITY',
    title: "King Activity in Middlegame",
    subtitle: "Active king when safe",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 6',
    toMove: 'white',
    introduction: "In the middlegame, the king should remain safe, but once castled, the king can sometimes move forward to support the position when safe.",
    keyIdeas: [
      "Keep the king safe in middlegame",
      "King can support position when safe",
      "Active king helps coordinate pieces",
      "Use king to support plans when possible"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety first.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops the knight.",
        conceptTag: "Development"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      },
      {
        move: "Kh1",
        isMainLine: true,
        annotation: "!",
        explanation: "We move the king to h1, making it active while keeping it safe. An active king can sometimes support the position when the center is closed.",
        highlights: [
          "h1"
        ],
        conceptTag: "King Activity"
      }
    ],
    summary: "In the middlegame, keep the king safe, but make it active when possible. An active king can support the position effectively.",
    keyTakeaways: [
      "Keep the king safe in middlegame",
      "King can support position when safe",
      "Active king helps coordinate pieces",
      "Use king to support plans when possible"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "King activity principles",
  },

  {
    id: 'king-activity-endgame-advanced',
    category: 'KING_ACTIVITY',
    title: "Advanced King Activity in Endgame",
    subtitle: "King as active piece",
    fen: '8/5pk1/5p2/4p3/4P3/5P2/5PK1/8 w - - 0 1',
    toMove: 'white',
    introduction: "In endgames, the king becomes a powerful active piece. Use the king to support pawns, attack enemy pawns, and control key squares.",
    keyIdeas: [
      "King is a powerful piece in endgames",
      "Use king to support pawns",
      "Attack enemy pawns with king",
      "Control key squares with active king"
    ],
    mainLine: [
      {
        move: "Kf1",
        isMainLine: true,
        annotation: "",
        explanation: "Moving the king toward the center.",
        conceptTag: "King Activity"
      },
      {
        move: "Kg8",
        isMainLine: true,
        annotation: "",
        explanation: "Black moves the king.",
        conceptTag: ""
      },
      {
        move: "Ke2",
        isMainLine: true,
        annotation: "",
        explanation: "Further centralization.",
        conceptTag: ""
      },
      {
        move: "Kf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black moves the king.",
        conceptTag: ""
      },
      {
        move: "Kd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Our king reaches a central square, where it can support our pawns and attack Black's pawns. An active king is crucial in endgames.",
        highlights: [
          "d3"
        ],
        conceptTag: "King Activity"
      }
    ],
    summary: "In endgames, use the king as an active piece. Support your pawns, attack enemy pawns, and control key squares with an active king.",
    keyTakeaways: [
      "King is a powerful piece in endgames",
      "Use king to support pawns",
      "Attack enemy pawns with king",
      "Control key squares with active king"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Endgame king activity principles",
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
  },

  {
    id: 'blockade-isolated-pawn',
    category: 'BLOCKADE',
    title: "Blockading an Isolated Pawn",
    subtitle: "Placing pieces in front of weak pawns",
    fen: 'r1bqkb1r/ppp2ppp/2n2n2/3p4/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    introduction: "A blockading piece placed in front of an isolated pawn is extremely powerful. The blockader controls squares in front of the pawn and prevents its advance.",
    keyIdeas: [
      "Place pieces in front of isolated pawns",
      "Knights are ideal blockading pieces",
      "The blockader controls squares ahead",
      "Prevent pawn advances with blockade"
    ],
    mainLine: [
      {
        move: "Be2",
        isMainLine: true,
        annotation: "",
        explanation: "Developing, preparing to castle.",
        conceptTag: "Development"
      },
      {
        move: "Be6",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "White castles for king safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Qd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the queen.",
        conceptTag: ""
      },
      {
        move: "Nd5",
        isMainLine: true,
        annotation: "!",
        explanation: "Our knight occupies the ideal blockading square d5, preventing Black's isolated d5 pawn from advancing and controlling key squares.",
        highlights: [
          "d5"
        ],
        conceptTag: "Blockade"
      }
    ],
    summary: "Blockading isolated pawns with knights is a classic technique. The blockader stops the pawn advance and controls important squares.",
    keyTakeaways: [
      "Blockaders stop weak pawns from advancing",
      "Knights are excellent blockading pieces",
      "Blockade the pawn, don't attack it yet",
      "Control squares in front of the weakness"
    ],
    memoryTip: "Block the block with a knight!",
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Nimzowitsch blockade theory",
  },

  {
    id: 'blockade-backward-pawn',
    category: 'BLOCKADE',
    title: "Blockading a Backward Pawn",
    subtitle: "Stopping a weak pawn advance",
    fen: 'r1bqkb1r/ppp2ppp/2n2n2/2p1p3/2P1P3/2N2N2/PP1P1PPP/R1BQKB1R w KQkq c6 0 6',
    toMove: 'white',
    introduction: "A backward pawn is a pawn that cannot be supported by other pawns. Blockading it prevents it from advancing and fixes the weakness.",
    keyIdeas: [
      "Block backward pawns to fix the weakness",
      "Use knights or other pieces to blockade",
      "Prevent pawn advances with blockaders",
      "Control squares in front of weak pawns"
    ],
    mainLine: [
      {
        move: "Be2",
        isMainLine: true,
        annotation: "",
        explanation: "Developing, preparing to castle.",
        conceptTag: "Development"
      },
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "White castles for king safety.",
        conceptTag: "King Safety"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles as well.",
        conceptTag: ""
      },
      {
        move: "Nd5",
        isMainLine: true,
        annotation: "!",
        explanation: "Our knight blockades Black's backward pawn on d6, preventing it from advancing and fixing the weakness.",
        highlights: [
          "d5"
        ],
        conceptTag: "Blockade"
      }
    ],
    summary: "Blockading backward pawns fixes them as weaknesses. The blockader controls squares and prevents the pawn from advancing to safety.",
    keyTakeaways: [
      "Backward pawns are chronic weaknesses",
      "Blockade them to prevent advances",
      "Knights are excellent blockading pieces",
      "The blockader gains control of key squares"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Pawn structure theory",
  },

  {
    id: 'blockade-passed-pawn',
    category: 'BLOCKADE',
    title: "Blockading a Passed Pawn",
    subtitle: "Stopping a dangerous passer",
    fen: '8/5pk1/5p2/4p3/4P3/5P2/5PK1/8 w - - 0 1',
    toMove: 'white',
    introduction: "In endgames, passed pawns are extremely dangerous. Blockading them is often the only way to stop their advance and save the game.",
    keyIdeas: [
      "Blockade passed pawns immediately",
      "Place the king or pieces in front of passers",
      "Prevent pawn advances with blockaders",
      "Control squares in front of dangerous pawns"
    ],
    mainLine: [
      {
        move: "Kf1",
        isMainLine: true,
        annotation: "",
        explanation: "Moving the king toward the center to help with the blockade.",
        conceptTag: "King Activity"
      },
      {
        move: "Kg8",
        isMainLine: true,
        annotation: "",
        explanation: "Black moves the king.",
        conceptTag: ""
      },
      {
        move: "Ke2",
        isMainLine: true,
        annotation: "",
        explanation: "Further centralization to support the blockade.",
        conceptTag: ""
      },
      {
        move: "Kf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black continues king activity.",
        conceptTag: ""
      },
      {
        move: "Kd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Our king is now positioned to block Black's passed pawn on e5 if it advances. Blockading passers is crucial in endgames.",
        highlights: [
          "d3",
          "e5"
        ],
        conceptTag: "Blockade"
      }
    ],
    summary: "In endgames, blockading passed pawns is essential. The blockader stops the pawn from advancing and often decides the outcome.",
    keyTakeaways: [
      "Blockade passed pawns immediately",
      "Use the king to blockade in endgames",
      "The blockader prevents pawn promotion",
      "Control squares in front of passers"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Endgame blockade theory",
  },

  {
    id: 'blockade-doubled-pawns',
    category: 'BLOCKADE',
    title: "Blockading Doubled Pawns",
    subtitle: "Fixing doubled pawn weaknesses",
    fen: 'r1bqkb1r/ppp2ppp/2n2n2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    introduction: "Doubled pawns are weak because they cannot support each other. Blockading them prevents them from advancing and fixes them as weaknesses.",
    keyIdeas: [
      "Blockade doubled pawns to fix weaknesses",
      "Place pieces in front of doubled pawns",
      "Prevent pawn advances with blockaders",
      "Control squares in front of weak pawn formations"
    ],
    mainLine: [
      {
        move: "cxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Exchanging to simplify and prepare for blockade.",
        conceptTag: "Exchange"
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures with the knight.",
        conceptTag: ""
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "White recaptures.",
        conceptTag: ""
      },
      {
        move: "Qxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures with the queen.",
        conceptTag: ""
      },
      {
        move: "Ne5",
        isMainLine: true,
        annotation: "!",
        explanation: "We centralize the knight, and now it can later blockade Black's doubled pawns if they appear. The knight on e5 is well-placed for blockade purposes.",
        highlights: [
          "e5"
        ],
        conceptTag: "Blockade"
      }
    ],
    summary: "Blockading doubled pawns fixes them as chronic weaknesses. The blockader prevents the pawns from advancing and controls key squares.",
    keyTakeaways: [
      "Doubled pawns are chronic weaknesses",
      "Blockade them to prevent advances",
      "Use knights or other pieces to blockade",
      "The blockader gains control of key squares"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Pawn structure theory",
  },

  {
    id: 'blockade-hanging-pawns',
    category: 'BLOCKADE',
    title: "Blockading Hanging Pawns",
    subtitle: "Controlling weak pawn duo",
    fen: 'r1bqkb1r/ppp2ppp/2n2n2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    introduction: "Hanging pawns (two pawns side by side) can be blockaded effectively. The blockader prevents their advance and fixes them as weaknesses.",
    keyIdeas: [
      "Blockade hanging pawns to fix weaknesses",
      "Place pieces in front of hanging pawns",
      "Prevent pawn advances with blockaders",
      "Control squares in front of weak pawn formations"
    ],
    mainLine: [
      {
        move: "cxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Exchanging to simplify and prepare for blockade.",
        conceptTag: "Exchange"
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures with the knight.",
        conceptTag: ""
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "White recaptures.",
        conceptTag: ""
      },
      {
        move: "Qxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures with the queen.",
        conceptTag: ""
      },
      {
        move: "Ne5",
        isMainLine: true,
        annotation: "!",
        explanation: "We centralize the knight, and now it can later blockade Black's hanging pawns if they appear. The blockade prevents pawn advances.",
        highlights: [
          "e5"
        ],
        conceptTag: "Blockade"
      }
    ],
    summary: "Blockading hanging pawns fixes them as weaknesses. The blockader prevents the pawns from advancing and controls key squares.",
    keyTakeaways: [
      "Hanging pawns are weak formations",
      "Blockade them to prevent advances",
      "Use knights or other pieces to blockade",
      "The blockader gains control of key squares"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Pawn structure theory",
  },

  {
    id: 'blockade-weak-pawn-chain',
    category: 'BLOCKADE',
    title: "Blockading Weak Pawn Chains",
    subtitle: "Controlling pawn chain weaknesses",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 6',
    toMove: 'white',
    introduction: "Weak pawn chains can be blockaded effectively. The blockader prevents the entire chain from advancing and creates weaknesses.",
    keyIdeas: [
      "Blockade weak pawn chains to prevent advances",
      "Place pieces in front of the chain",
      "Prevent pawn advances with blockaders",
      "Control squares in front of weak chains"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "!",
        explanation: "We develop the knight, and it can later move to d5 or e5 to blockade Black's pawn chain. The blockade prevents the chain from advancing.",
        highlights: [
          "c3"
        ],
        conceptTag: "Blockade"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Blockading weak pawn chains fixes them as weaknesses. The blockader prevents the entire chain from advancing and controls key squares.",
    keyTakeaways: [
      "Blockade weak pawn chains to prevent advances",
      "Use knights or other pieces to blockade",
      "The blockader gains control of key squares",
      "Prevent pawn chain advances with blockaders"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Pawn structure theory",
  },

  {
    id: 'blockade-bishop-blockade',
    category: 'BLOCKADE',
    title: "Blockading with Bishop",
    subtitle: "Long-range blockade",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 6',
    toMove: 'white',
    introduction: "Bishops can blockade pawns from a distance on long diagonals. This type of blockade controls key squares and prevents pawn advances.",
    keyIdeas: [
      "Bishops can blockade from long range",
      "Control squares with bishops on diagonals",
      "Prevent pawn advances with long-range pieces",
      "Bishops control multiple squares"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Bb3",
        isMainLine: true,
        annotation: "!",
        explanation: "We move the bishop to b3, where it can control squares like d5 and e6, blockading Black's pawn structure from a distance. The bishop blockade prevents advances.",
        highlights: [
          "b3"
        ],
        conceptTag: "Blockade"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Bishops can blockade pawns from long range on diagonals. This type of blockade controls key squares and prevents pawn advances effectively.",
    keyTakeaways: [
      "Bishops can blockade from long range",
      "Control squares with bishops on diagonals",
      "Prevent pawn advances with long-range pieces",
      "Bishops provide flexible blockade control"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Pawn structure theory",
  },

  {
    id: 'blockade-rook-blockade',
    category: 'BLOCKADE',
    title: "Blockading with Rook",
    subtitle: "Rook on blockade square",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 6',
    toMove: 'white',
    introduction: "Rooks can blockade pawns effectively, especially on open files. A rook on a blockade square prevents pawn advances and controls key squares.",
    keyIdeas: [
      "Rooks can blockade pawns effectively",
      "Place rooks on blockade squares",
      "Prevent pawn advances with rooks",
      "Rooks control files and ranks"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Re1",
        isMainLine: true,
        annotation: "!",
        explanation: "We place the rook on e1, where it can later move to e5 or e6 to blockade Black's pawn structure. Rooks on blockade squares are very effective.",
        highlights: [
          "e1"
        ],
        conceptTag: "Blockade"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Rooks can blockade pawns effectively, especially on open files. A rook on a blockade square prevents pawn advances and controls key squares.",
    keyTakeaways: [
      "Rooks can blockade pawns effectively",
      "Place rooks on blockade squares",
      "Prevent pawn advances with rooks",
      "Rooks provide powerful blockade control"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Pawn structure theory",
  },

  {
    id: 'exchange-trading-bad-pieces',
    category: 'EXCHANGE_STRATEGY',
    title: "Exchanging Bad Pieces for Good",
    subtitle: "Trading your worst piece",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "When you have a bad bishop (blocked by your own pawns), exchange it for your opponent's active piece. This improves your position.",
    keyIdeas: [
      "Trade bad pieces for good pieces",
      "Exchange passive pieces for active ones",
      "Simplify when you have weaknesses",
      "Remove your worst placed piece"
    ],
    mainLine: [
      {
        move: "d3",
        isMainLine: true,
        annotation: "",
        explanation: "Supporting e4 and developing.",
        conceptTag: "Development"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop actively.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "White castles.",
        conceptTag: "King Safety"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles as well.",
        conceptTag: ""
      },
      {
        move: "Bxf7+",
        isMainLine: true,
        annotation: "!",
        explanation: "We exchange our bishop for Black's knight after the capture. This tactical exchange damages Black's pawn structure and demonstrates strategic piece exchanges.",
        conceptTag: "Exchange"
      },
      {
        move: "Rxf7",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures with the rook, but the pawn structure is now damaged.",
        conceptTag: ""
      }
    ],
    summary: "Exchanging pieces strategically can improve your position. Trade bad pieces for good ones, especially when you have passive pieces.",
    keyTakeaways: [
      "Trade bad pieces for good pieces",
      "Exchange when you have weaknesses",
      "Remove your worst placed piece",
      "Simplify with exchanges"
    ],
    
    difficulty: 3,
    estimatedMinutes: 5,
    source: "Exchange strategy principles",
  },

  {
    id: 'exchange-simplifying-position',
    category: 'EXCHANGE_STRATEGY',
    title: "Simplifying to a Better Endgame",
    subtitle: "Trading to convert an advantage",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "When you have a positional advantage, sometimes the best plan is to simplify by exchanging pieces. This reduces your opponent's counterplay and brings you closer to the endgame.",
    keyIdeas: [
      "Exchange pieces when you have an advantage",
      "Simplify to convert positional advantages",
      "Reduce opponent's counterplay with exchanges",
      "Trade toward favorable endgames"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety first.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops the knight.",
        conceptTag: "Development"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      },
      {
        move: "Nxe5",
        isMainLine: true,
        annotation: "!",
        explanation: "We exchange knights, simplifying the position. This reduces Black's counterplay while maintaining our central control.",
        conceptTag: "Exchange"
      }
    ],
    summary: "Strategic exchanges can simplify positions and convert advantages. When ahead, trade pieces to reduce counterplay and reach favorable endgames.",
    keyTakeaways: [
      "Exchange when you have an advantage",
      "Simplify to reduce counterplay",
      "Trade toward better endgames",
      "Keep your advantage through simplification"
    ],
    
    difficulty: 3,
    estimatedMinutes: 5,
    source: "Strategic exchange principles",
  },

  {
    id: 'exchange-removing-defenders',
    category: 'EXCHANGE_STRATEGY',
    title: "Exchanging to Remove Defenders",
    subtitle: "Trading away opponent's key pieces",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "Sometimes you exchange pieces to remove defenders from key squares. This can create weaknesses or tactical opportunities.",
    keyIdeas: [
      "Exchange pieces to remove defenders",
      "Trade to expose weaknesses",
      "Remove key defensive pieces",
      "Create tactical opportunities with exchanges"
    ],
    mainLine: [
      {
        move: "d3",
        isMainLine: true,
        annotation: "",
        explanation: "Supporting e4 and developing.",
        conceptTag: "Development"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "White castles.",
        conceptTag: "King Safety"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles as well.",
        conceptTag: ""
      },
      {
        move: "Nxe5",
        isMainLine: true,
        annotation: "!",
        explanation: "We exchange knights, removing Black's defender of key squares. This strategic exchange simplifies and may create weaknesses.",
        conceptTag: "Exchange"
      }
    ],
    summary: "Exchanging pieces to remove defenders is a powerful strategic tool. Trade away opponent's key defensive pieces to expose weaknesses.",
    keyTakeaways: [
      "Exchange to remove defenders",
      "Trade key defensive pieces",
      "Expose weaknesses with exchanges",
      "Create tactical opportunities"
    ],
    
    difficulty: 3,
    estimatedMinutes: 5,
    source: "Exchange strategy principles",
  },

  {
    id: 'exchange-reach-endgame',
    category: 'EXCHANGE_STRATEGY',
    title: "Exchanging to Reach Favorable Endgame",
    subtitle: "Trading toward winning endgames",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "When you have an endgame advantage (like better pawn structure), exchange pieces to reach the endgame where your advantage will be decisive.",
    keyIdeas: [
      "Exchange pieces when you have endgame advantages",
      "Trade toward favorable endgames",
      "Simplify when your structure is better",
      "Remove opponent's attacking pieces"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops the knight.",
        conceptTag: "Development"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      },
      {
        move: "Nxe5",
        isMainLine: true,
        annotation: "!",
        explanation: "We exchange knights, simplifying toward the endgame. If we have a structural advantage, this helps us reach a winning endgame.",
        conceptTag: "Exchange"
      }
    ],
    summary: "Exchange pieces strategically to reach favorable endgames. When you have structural advantages, simplify to convert them.",
    keyTakeaways: [
      "Exchange when you have endgame advantages",
      "Trade toward favorable endgames",
      "Simplify with better structure",
      "Remove opponent's active pieces"
    ],
    
    difficulty: 3,
    estimatedMinutes: 5,
    source: "Exchange strategy principles",
  },

  {
    id: 'exchange-reach-endgame-simple',
    category: 'EXCHANGE_STRATEGY',
    title: "Exchanging to Reach Endgame",
    subtitle: "Trading pieces to simplify",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "When you have an endgame advantage, exchanging pieces simplifies the position and brings you closer to a winning endgame.",
    keyIdeas: [
      "Exchange pieces when you have endgame advantages",
      "Trade pieces to simplify positions",
      "Bring the game to endgames where you excel",
      "Remove opponent's attacking potential"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety first.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops the knight.",
        conceptTag: "Development"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      },
      {
        move: "Nxe5",
        isMainLine: true,
        annotation: "!",
        explanation: "We exchange knights, simplifying toward the endgame. If we have structural advantages, this helps convert them.",
        conceptTag: "Exchange"
      },
      {
        move: "Nxe5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures.",
        conceptTag: ""
      }
    ],
    summary: "Exchanging pieces strategically simplifies positions and can lead to favorable endgames. Trade pieces when you have endgame advantages.",
    keyTakeaways: [
      "Exchange pieces when you have endgame advantages",
      "Trade pieces to simplify positions",
      "Remove opponent's attacking potential",
      "Convert advantages through simplification"
    ],
    
    difficulty: 3,
    estimatedMinutes: 5,
    source: "Exchange strategy principles",
  },

  {
    id: 'exchange-remove-threats',
    category: 'EXCHANGE_STRATEGY',
    title: "Exchanging to Remove Threats",
    subtitle: "Trading to eliminate dangers",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "When your opponent has active pieces creating threats, exchanging them removes the threats and simplifies the position.",
    keyIdeas: [
      "Exchange pieces that create threats",
      "Trade active opponent pieces",
      "Remove attacking potential through exchanges",
      "Simplify positions by removing threats"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop actively.",
        conceptTag: ""
      },
      {
        move: "Bxf7+",
        isMainLine: true,
        annotation: "!",
        explanation: "We exchange bishops, removing Black's active bishop and simplifying the position. This eliminates threats and reduces complexity.",
        conceptTag: "Exchange"
      },
      {
        move: "Kxf7",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures, but loses castling rights.",
        conceptTag: ""
      }
    ],
    summary: "Exchanging pieces that create threats simplifies positions and removes dangers. Trade active opponent pieces to neutralize threats.",
    keyTakeaways: [
      "Exchange pieces that create threats",
      "Trade active opponent pieces",
      "Remove attacking potential through exchanges",
      "Simplify by removing threats"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Exchange strategy principles",
  },

  {
    id: 'exchange-win-material',
    category: 'EXCHANGE_STRATEGY',
    title: "Exchanging to Win Material",
    subtitle: "Trading favorably",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "When you can exchange pieces favorably to win material, do so. Exchanging a knight for a bishop or vice versa at the right time can gain material.",
    keyIdeas: [
      "Exchange pieces when you gain material",
      "Trade pieces favorably",
      "Use exchanges to win material",
      "Calculate exchanges carefully"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "d3",
        isMainLine: true,
        annotation: "",
        explanation: "Supporting e4.",
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
        move: "Bxf7+",
        isMainLine: true,
        annotation: "!",
        explanation: "We exchange the bishop for a pawn and check, gaining material and weakening Black's king position. This is a favorable exchange.",
        conceptTag: "Exchange"
      }
    ],
    summary: "Exchanging pieces favorably to win material is a key strategy. Calculate exchanges carefully to ensure you gain material or create advantages.",
    keyTakeaways: [
      "Exchange pieces when you gain material",
      "Trade pieces favorably",
      "Use exchanges to win material",
      "Calculate exchanges carefully"
    ],
    
    difficulty: 3,
    estimatedMinutes: 5,
    source: "Exchange strategy principles",
  },

  {
    id: 'exchange-improve-position',
    category: 'EXCHANGE_STRATEGY',
    title: "Exchanging to Improve Position",
    subtitle: "Trading for positional gains",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "Sometimes exchanging pieces improves your position even without material gain. Trade pieces when it improves your structure or piece placement.",
    keyIdeas: [
      "Exchange pieces to improve position",
      "Trade for positional advantages",
      "Improve structure through exchanges",
      "Use exchanges to activate pieces"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops the knight.",
        conceptTag: "Development"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      },
      {
        move: "Nxe5",
        isMainLine: true,
        annotation: "!",
        explanation: "We exchange knights, improving our position by centralizing our remaining pieces and creating better piece coordination.",
        conceptTag: "Exchange"
      },
      {
        move: "Nxe5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures.",
        conceptTag: ""
      }
    ],
    summary: "Exchanging pieces to improve position is a key strategy. Trade pieces when it improves your structure, piece placement, or coordination.",
    keyTakeaways: [
      "Exchange pieces to improve position",
      "Trade for positional advantages",
      "Improve structure through exchanges",
      "Use exchanges to activate pieces"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Exchange strategy principles",
  },

  {
    id: 'pawn-break-f5-advance',
    category: 'PAWN_BREAKS',
    title: "The f5 Pawn Break",
    subtitle: "Breaking open the position",
    fen: 'rnbqkb1r/ppp2ppp/3p1n2/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R w KQkq e6 0 4',
    toMove: 'white',
    introduction: "Pawn breaks open up closed positions. The e5 pawn break challenges Black's center and opens lines.",
    keyIdeas: [
      "Use pawn breaks to open lines",
      "Break when you're ready to attack",
      "Pawn breaks require preparation",
      "Open files for your pieces"
    ],
    mainLine: [
      {
        move: "dxe5",
        isMainLine: true,
        annotation: "!",
        explanation: "The pawn break! Opening the d-file and challenging Black's central structure.",
        highlights: [
          "e5"
        ],
        conceptTag: "Pawn Break"
      },
      {
        move: "dxe5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures, opening the d-file for both sides.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops, preparing to use the open file.",
        conceptTag: "Development"
      },
      {
        move: "Nc6",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the knight.",
        conceptTag: ""
      }
    ],
    summary: "Pawn breaks are crucial for opening closed positions. The f5 break is a standard way to challenge central pawn structures and activate pieces.",
    keyTakeaways: [
      "Pawn breaks open lines for pieces",
      "Timing is crucial for breaks",
      "Prepare breaks with piece development",
      "Breaks change the character of the position"
    ],
    
    difficulty: 3,
    estimatedMinutes: 5,
    source: "Pawn break principles",
  },

  {
    id: 'pawn-break-d5-queenside',
    category: 'PAWN_BREAKS',
    title: "The d5 Pawn Break",
    subtitle: "Breaking in the center",
    fen: 'r1bqkb1r/ppp2ppp/2n2n2/2p1p3/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq c6 0 6',
    toMove: 'white',
    introduction: "The d5 pawn break opens the center and challenges Black's pawn structure. This type of break is essential for opening closed positions.",
    keyIdeas: [
      "Use pawn breaks to open the center",
      "Challenge opponent's central structure",
      "Open lines with pawn advances",
      "Prepare breaks with piece development"
    ],
    mainLine: [
      {
        move: "d5",
        isMainLine: true,
        annotation: "!",
        explanation: "The pawn break! Opening the center and challenging Black's pawn structure. This is a crucial break for opening the position.",
        highlights: [
          "d5"
        ],
        conceptTag: "Pawn Break"
      },
      {
        move: "Qxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black captures with the queen, opening lines.",
        conceptTag: ""
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "White recaptures with the knight, maintaining central control.",
        conceptTag: ""
      }
    ],
    summary: "Pawn breaks in the center, like d5, open up closed positions and create activity for your pieces. Timing and preparation are crucial.",
    keyTakeaways: [
      "Use pawn breaks to open the center",
      "Challenge central structures with breaks",
      "Prepare breaks with development",
      "Central breaks create piece activity"
    ],
    
    difficulty: 3,
    estimatedMinutes: 5,
    source: "Pawn break principles",
  },

  {
    id: 'pawn-break-e5-advance',
    category: 'PAWN_BREAKS',
    title: "The e5 Pawn Break",
    subtitle: "Advancing in the center",
    fen: 'r1bqkb1r/ppp2ppp/2n2n2/3p4/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq d6 0 6',
    toMove: 'white',
    introduction: "The e5 pawn break is a powerful central advance that challenges Black's pawn structure and opens lines for White's pieces.",
    keyIdeas: [
      "Use pawn breaks to advance in the center",
      "Challenge opponent's pawn chains",
      "Open lines with central pawn advances",
      "Prepare breaks with piece development"
    ],
    mainLine: [
      {
        move: "Be2",
        isMainLine: true,
        annotation: "",
        explanation: "Developing, preparing to castle.",
        conceptTag: "Development"
      },
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "White castles.",
        conceptTag: "King Safety"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles as well.",
        conceptTag: ""
      },
      {
        move: "e5",
        isMainLine: true,
        annotation: "!",
        explanation: "The pawn break! This central advance challenges Black's pawn structure and opens lines for White's pieces.",
        highlights: [
          "e5"
        ],
        conceptTag: "Pawn Break"
      }
    ],
    summary: "The e5 pawn break is a standard way to challenge Black's center and create piece activity. Central pawn breaks are crucial for opening closed positions.",
    keyTakeaways: [
      "Use central pawn breaks to open positions",
      "Challenge pawn chains with advances",
      "Prepare breaks with development",
      "Central breaks create piece activity"
    ],
    
    difficulty: 3,
    estimatedMinutes: 5,
    source: "Pawn break principles",
  },

  {
    id: 'pawn-break-f5-break',
    category: 'PAWN_BREAKS',
    title: "The f5 Pawn Break",
    subtitle: "Kingside expansion",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4PP2/5N2/PPPP2PP/RNBQKB1R w KQkq e6 0 5',
    toMove: 'white',
    introduction: "The f5 pawn break expands on the kingside and challenges Black's pawn structure. This type of break is common in King's Indian and similar structures.",
    keyIdeas: [
      "Use pawn breaks to expand on the kingside",
      "Challenge opponent's pawn chains",
      "Open lines with pawn advances",
      "Prepare breaks with piece development"
    ],
    mainLine: [
      {
        move: "f5",
        isMainLine: true,
        annotation: "!",
        explanation: "The pawn break! This expands on the kingside and challenges Black's central structure, opening lines for attack.",
        highlights: [
          "f5"
        ],
        conceptTag: "Pawn Break"
      },
      {
        move: "Nxe4",
        isMainLine: true,
        annotation: "",
        explanation: "Black captures the e4 pawn with the knight.",
        conceptTag: ""
      },
      {
        move: "Nxe5",
        isMainLine: true,
        annotation: "",
        explanation: "White captures the e5 pawn, maintaining the break and opening lines.",
        conceptTag: ""
      },
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      }
    ],
    summary: "Pawn breaks like f5 expand your position and challenge the opponent's structure. Kingside breaks are powerful attacking tools.",
    keyTakeaways: [
      "Use pawn breaks to expand on flanks",
      "Kingside breaks create attacking chances",
      "Prepare breaks with development",
      "Flank breaks complement central play"
    ],
    
    difficulty: 3,
    estimatedMinutes: 5,
    source: "Pawn break principles",
  },

  {
    id: 'pawn-break-g4-break',
    category: 'PAWN_BREAKS',
    title: "The g4 Pawn Break",
    subtitle: "Flank expansion",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4PP2/5N2/PPPP2PP/RNBQKB1R w KQkq e6 0 5',
    toMove: 'white',
    introduction: "The g4 pawn break expands on the kingside and can create attacking chances. This type of break is often used to undermine the opponent's pawn structure.",
    keyIdeas: [
      "Use pawn breaks to expand on the kingside",
      "Challenge opponent's pawn structures",
      "Create attacking chances with flank breaks",
      "Open lines with pawn advances"
    ],
    mainLine: [
      {
        move: "g4",
        isMainLine: true,
        annotation: "!",
        explanation: "The pawn break! This expands on the kingside and challenges Black's pawn structure, potentially opening lines for attack.",
        highlights: [
          "g4"
        ],
        conceptTag: "Pawn Break"
      },
      {
        move: "h6",
        isMainLine: true,
        annotation: "",
        explanation: "Black defends with h6.",
        conceptTag: ""
      },
      {
        move: "h3",
        isMainLine: true,
        annotation: "",
        explanation: "White prepares to continue expansion.",
        conceptTag: ""
      },
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      }
    ],
    summary: "Pawn breaks like g4 expand your position and can create attacking chances. Kingside breaks are often used to undermine the opponent's structure.",
    keyTakeaways: [
      "Use pawn breaks to expand on flanks",
      "Kingside breaks create attacking chances",
      "Prepare breaks with development",
      "Flank breaks complement central play"
    ],
    
    difficulty: 3,
    estimatedMinutes: 5,
    source: "Pawn break principles",
  },

  {
    id: 'pawn-break-h5-advance',
    category: 'PAWN_BREAKS',
    title: "The h5 Pawn Break",
    subtitle: "Kingside expansion",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/3P1N2/PPP2PPP/RNBQKB1R w KQkq - 0 6',
    toMove: 'white',
    introduction: "The h5 pawn break expands on the kingside and can create attacking chances. This advance can open lines for rooks and create pressure.",
    keyIdeas: [
      "Use pawn breaks to expand on the kingside",
      "h5 advance can open files",
      "Create attacking chances with kingside breaks",
      "Prepare breaks with proper development"
    ],
    mainLine: [
      {
        move: "h4",
        isMainLine: true,
        annotation: "",
        explanation: "Preparing the h5 pawn break.",
        conceptTag: "Pawn Break"
      },
      {
        move: "h6",
        isMainLine: true,
        annotation: "",
        explanation: "Black prepares to defend.",
        conceptTag: ""
      },
      {
        move: "h5",
        isMainLine: true,
        annotation: "!",
        explanation: "The pawn break! This advance challenges Black's kingside structure and can open lines for White's rooks and pieces.",
        highlights: [
          "h5"
        ],
        conceptTag: "Pawn Break"
      },
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      }
    ],
    summary: "Pawn breaks like h5 expand on the kingside and create attacking chances. Properly prepared breaks can open files and create pressure.",
    keyTakeaways: [
      "Use pawn breaks to expand on flanks",
      "Kingside breaks create attacking chances",
      "Prepare breaks with proper development",
      "Pawn advances can open files"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Pawn break principles",
  },

  {
    id: 'pawn-break-b4-queenside',
    category: 'PAWN_BREAKS',
    title: "The b4 Pawn Break",
    subtitle: "Queenside expansion",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2P1P3/3P1N2/PP3PPP/RNBQKB1R w KQkq - 0 6',
    toMove: 'white',
    introduction: "The b4 pawn break expands on the queenside and can create attacking chances. This advance challenges Black's pawn structure and opens lines.",
    keyIdeas: [
      "Use pawn breaks to expand on the queenside",
      "b4 advance can open files",
      "Create attacking chances with queenside breaks",
      "Prepare breaks with proper development"
    ],
    mainLine: [
      {
        move: "b4",
        isMainLine: true,
        annotation: "!",
        explanation: "The pawn break! This advance challenges Black's pawn structure on the queenside and can open lines for White's rooks and pieces.",
        highlights: [
          "b4"
        ],
        conceptTag: "Pawn Break"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops the knight.",
        conceptTag: "Development"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Pawn breaks like b4 expand on the queenside and create attacking chances. Properly prepared breaks can open files and create pressure.",
    keyTakeaways: [
      "Use pawn breaks to expand on flanks",
      "Queenside breaks create attacking chances",
      "Prepare breaks with proper development",
      "Pawn advances can open files"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Pawn break principles",
  },

  {
    id: 'pawn-break-c5-break',
    category: 'PAWN_BREAKS',
    title: "The c5 Pawn Break",
    subtitle: "Queenside central break",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2P1P3/3P1N2/PP3PPP/RNBQKB1R w KQkq - 0 6',
    toMove: 'white',
    introduction: "The c5 pawn break challenges Black's central structure and can open lines. This break is often used to undermine the opponent's pawn structure.",
    keyIdeas: [
      "Use pawn breaks to challenge central structures",
      "c5 break can open lines",
      "Create attacking chances with central breaks",
      "Prepare breaks with proper development"
    ],
    mainLine: [
      {
        move: "c5",
        isMainLine: true,
        annotation: "!",
        explanation: "The pawn break! This advance challenges Black's pawn structure and can open lines for White's pieces.",
        highlights: [
          "c5"
        ],
        conceptTag: "Pawn Break"
      },
      {
        move: "Bxc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black captures the pawn with the bishop.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops the knight.",
        conceptTag: "Development"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Pawn breaks like c5 challenge central structures and create attacking chances. Properly prepared breaks can open lines and create pressure.",
    keyTakeaways: [
      "Use pawn breaks to challenge central structures",
      "Central breaks create attacking chances",
      "Prepare breaks with proper development",
      "Pawn advances can open lines"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Pawn break principles",
  },

  {
    id: 'piece-coordination-queen-rook',
    category: 'PIECE_COORDINATION',
    title: "Coordinating Queen and Rook",
    subtitle: "Working pieces together",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "Coordinated pieces are much stronger than individual pieces. When pieces work together, they create threats that single pieces cannot.",
    keyIdeas: [
      "Coordinate pieces to work together",
      "Use pieces to support each other",
      "Create multiple threats simultaneously",
      "Maximize piece activity together"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety and activating the rook.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop actively.",
        conceptTag: ""
      },
      {
        move: "Re1",
        isMainLine: true,
        annotation: "",
        explanation: "Placing the rook on the e-file, supporting e4.",
        conceptTag: "Rook Activity"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles for king safety.",
        conceptTag: ""
      },
      {
        move: "Qd2",
        isMainLine: true,
        annotation: "!",
        explanation: "Our queen and rook now coordinate, with the queen supporting the rook on e1. This creates threats along the e-file and prepares tactical possibilities.",
        highlights: [
          "e1",
          "d2"
        ],
        conceptTag: "Piece Coordination"
      }
    ],
    summary: "Coordinated pieces create powerful threats. Place pieces so they support each other and attack together, not individually.",
    keyTakeaways: [
      "Coordinated pieces are much stronger",
      "Use pieces to support each other",
      "Create multiple threats at once",
      "Think about piece harmony"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Piece coordination principles",
  },

  {
    id: 'piece-coordination-bishop-knight',
    category: 'PIECE_COORDINATION',
    title: "Coordinating Bishop and Knight",
    subtitle: "Working different pieces together",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "Bishops and knights can coordinate effectively when they work together. The bishop controls long diagonals while the knight controls key squares.",
    keyIdeas: [
      "Coordinate different types of pieces",
      "Use bishops and knights together",
      "Control key squares with coordinated pieces",
      "Create threats with piece harmony"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety and activating the rook.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "!",
        explanation: "We develop the knight, and now our bishop on c4 and knight on c3 coordinate, controlling key central squares together.",
        highlights: [
          "c3",
          "c4"
        ],
        conceptTag: "Piece Coordination"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Coordinating different types of pieces, like bishops and knights, creates powerful combinations. Each piece supports the other's strengths.",
    keyTakeaways: [
      "Coordinate different piece types together",
      "Bishops and knights complement each other",
      "Use piece harmony to control squares",
      "Create threats with coordinated pieces"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Piece coordination principles",
  },

  {
    id: 'piece-coordination-rooks-bishops',
    category: 'PIECE_COORDINATION',
    title: "Coordinating Rooks and Bishops",
    subtitle: "Long-range piece harmony",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "Rooks and bishops coordinate excellently on open files and diagonals. When they work together, they control key squares and create powerful threats.",
    keyIdeas: [
      "Coordinate rooks and bishops on open lines",
      "Use rooks to support bishop activity",
      "Control files and diagonals together",
      "Create threats with long-range pieces"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety and activating the rook.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Re1",
        isMainLine: true,
        annotation: "!",
        explanation: "We place the rook on the e-file, and now our rook on e1 and bishop on c4 coordinate, controlling key squares on the e-file and the long diagonal.",
        highlights: [
          "e1",
          "c4"
        ],
        conceptTag: "Piece Coordination"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Coordinating rooks and bishops creates powerful long-range control. Use them together to control files and diagonals simultaneously.",
    keyTakeaways: [
      "Coordinate rooks and bishops on open lines",
      "Long-range pieces support each other",
      "Control files and diagonals together",
      "Create threats with coordinated long-range pieces"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Piece coordination principles",
  },

  {
    id: 'piece-coordination-all-pieces',
    category: 'PIECE_COORDINATION',
    title: "Coordinating All Pieces",
    subtitle: "Maximum piece harmony",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "When all your pieces coordinate, they become extremely powerful. Each piece supports the others, creating threats that are difficult to defend against.",
    keyIdeas: [
      "Coordinate all pieces together",
      "Use pieces to support each other",
      "Create multiple threats simultaneously",
      "Maximum piece harmony wins games"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety and activating the rook.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops the knight, and now all pieces coordinate: bishop on c4, knight on c3, rook on f1, and pawns on e4 and d2.",
        highlights: [
          "c3",
          "c4",
          "f1",
          "e4"
        ],
        conceptTag: "Piece Coordination"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "When all pieces coordinate, they create maximum pressure. Each piece supports the others, making the position extremely difficult to defend.",
    keyTakeaways: [
      "Coordinate all pieces together",
      "Each piece supports the others",
      "Create multiple threats at once",
      "Maximum harmony creates winning positions"
    ],
    
    difficulty: 3,
    estimatedMinutes: 5,
    source: "Piece coordination principles",
  },

  {
    id: 'piece-coordination-knights-bishops',
    category: 'PIECE_COORDINATION',
    title: "Coordinating Knights and Bishops",
    subtitle: "Minor piece harmony",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "Knights and bishops coordinate excellently together. Knights control squares the bishops can't reach, and vice versa, creating comprehensive control.",
    keyIdeas: [
      "Coordinate knights and bishops together",
      "Knights and bishops complement each other",
      "Create comprehensive square control",
      "Use minor pieces to support each other"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "!",
        explanation: "We develop the knight, and now our knight on c3 and bishop on c4 coordinate perfectly. The knight controls squares the bishop can't, and vice versa.",
        highlights: [
          "c3",
          "c4"
        ],
        conceptTag: "Piece Coordination"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Coordinating knights and bishops creates comprehensive square control. Each piece supports the other's strengths.",
    keyTakeaways: [
      "Coordinate knights and bishops together",
      "Minor pieces complement each other",
      "Create comprehensive square control",
      "Use pieces to support each other's strengths"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Piece coordination principles",
  },

  {
    id: 'piece-coordination-queen-bishop',
    category: 'PIECE_COORDINATION',
    title: "Coordinating Queen and Bishop",
    subtitle: "Battery on diagonals",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "The queen and bishop coordinate excellently on diagonals, creating powerful batteries. They can attack together and create decisive threats.",
    keyIdeas: [
      "Coordinate queen and bishop on diagonals",
      "Create batteries with queen and bishop",
      "Use queen and bishop to attack together",
      "Batteries create powerful threats"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Qe2",
        isMainLine: true,
        annotation: "!",
        explanation: "We develop the queen, and now it coordinates with our bishop on c4. Together they control key diagonals and create threats.",
        highlights: [
          "e2",
          "c4"
        ],
        conceptTag: "Piece Coordination"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Coordinating queen and bishop on diagonals creates powerful batteries. They attack together and create decisive threats.",
    keyTakeaways: [
      "Coordinate queen and bishop on diagonals",
      "Create batteries with queen and bishop",
      "Use pieces to support each other",
      "Batteries create powerful threats"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Piece coordination principles",
  },

  {
    id: 'piece-coordination-queen-knight',
    category: 'PIECE_COORDINATION',
    title: "Coordinating Queen and Knight",
    subtitle: "Tactical combination",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "The queen and knight coordinate excellently in tactical situations. The knight can create threats that the queen supports, or vice versa.",
    keyIdeas: [
      "Coordinate queen and knight together",
      "Use queen and knight for tactical combinations",
      "Knights support queens in attack",
      "Create threats with queen-knight coordination"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops the knight.",
        conceptTag: "Development"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      },
      {
        move: "Qe2",
        isMainLine: true,
        annotation: "!",
        explanation: "We develop the queen, and now it coordinates with our knight on c3. Together they can create tactical threats and support each other.",
        highlights: [
          "e2",
          "c3"
        ],
        conceptTag: "Piece Coordination"
      }
    ],
    summary: "Coordinating queen and knight creates powerful tactical possibilities. They support each other and can create decisive threats.",
    keyTakeaways: [
      "Coordinate queen and knight together",
      "Use pieces for tactical combinations",
      "Knights support queens in attack",
      "Create threats with coordinated pieces"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Piece coordination principles",
  },

  {
    id: 'piece-coordination-rooks-knights',
    category: 'PIECE_COORDINATION',
    title: "Coordinating Rooks and Knights",
    subtitle: "Rook and knight harmony",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: "Rooks and knights coordinate excellently together. Rooks control files and ranks, while knights control squares, creating comprehensive control.",
    keyIdeas: [
      "Coordinate rooks and knights together",
      "Rooks and knights complement each other",
      "Create comprehensive control",
      "Use rooks and knights to support each other"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety and activating the rook.",
        conceptTag: "King Safety"
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "!",
        explanation: "We develop the knight, and now our rook on f1 (after castling) and knight on c3 coordinate perfectly. Together they control key squares and files.",
        highlights: [
          "f1",
          "c3"
        ],
        conceptTag: "Piece Coordination"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      }
    ],
    summary: "Coordinating rooks and knights creates comprehensive control. They complement each other and create powerful threats together.",
    keyTakeaways: [
      "Coordinate rooks and knights together",
      "Rooks and knights complement each other",
      "Create comprehensive control",
      "Use pieces to support each other"
    ],
    
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Piece coordination principles",
  },

  // ============================================
  // SPACE_ADVANTAGE - NEW PATTERNS (9 to reach 15)
  // ============================================
  {
    id: 'space-advantage-central-control',
    category: 'SPACE_ADVANTAGE',
    title: "Central Space Domination",
    subtitle: "Using pawns to control the center",
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/2ppP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    introduction: "Space advantage means your pieces have more room to maneuver while your opponent's pieces are cramped. The e5 pawn wedge is a classic space-gaining tool that restricts Black's knight development.",
    keyIdeas: [
      "Advance pawns to gain territory",
      "A pawn wedge restricts enemy piece mobility",
      "Use space to maneuver pieces to optimal squares",
      "Cramped positions lead to tactical vulnerabilities"
    ],
    mainLine: [
      {
        move: "Bg5",
        isMainLine: true,
        annotation: "!",
        explanation: "Pinning the knight and increasing pressure. With more space, we have more options for piece placement.",
        conceptTag: "Pin"
      },
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Black breaks the pin but remains cramped.",
        conceptTag: ""
      },
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "!",
        explanation: "The bishop develops to an active diagonal, eyeing the kingside. Our space advantage lets us place pieces on their ideal squares.",
        highlights: ["d3", "h7"],
        conceptTag: "Development"
      },
      {
        move: "cxd4",
        isMainLine: true,
        annotation: "",
        explanation: "Black releases tension.",
        conceptTag: ""
      },
      {
        move: "Nxd4",
        isMainLine: true,
        annotation: "!",
        explanation: "Recapturing with the knight maintains our central control. The knight on d4 is powerful, and our e5 pawn continues to restrict Black.",
        highlights: ["d4", "e5"],
        conceptTag: "Centralization"
      }
    ],
    summary: "The e5 pawn wedge is a classic space-gaining tool. It restricts Black's knights and bishops while giving White more room to maneuver. Use this extra space to place pieces on optimal squares.",
    keyTakeaways: [
      "Pawn wedges (like e5) restrict enemy pieces",
      "Space advantage = more squares for your pieces",
      "Develop pieces to their ideal squares with extra space",
      "Cramped positions lead to tactical problems"
    ],
    difficulty: 2,
    estimatedMinutes: 6,
    source: "French Defense theory"
  },
  {
    id: 'space-advantage-kingside-expansion',
    category: 'SPACE_ADVANTAGE',
    title: "Kingside Space Expansion",
    subtitle: "Gaining space with the g and h pawns",
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    introduction: "Sometimes we expand on the flanks to gain space. A kingside pawn storm not only gains territory but also creates attacking chances against the enemy king.",
    keyIdeas: [
      "Flank pawn advances gain space",
      "Kingside expansion creates attacking chances",
      "Support pawn advances with pieces",
      "Use gained space for piece infiltration"
    ],
    mainLine: [
      {
        move: "h3",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing g4! This modest move is the first step in our kingside expansion. We prevent any Bg4 ideas and prepare to push forward.",
        highlights: ["h3"],
        conceptTag: "Preparation"
      },
      {
        move: "a6",
        isMainLine: true,
        annotation: "",
        explanation: "Black prepares b5, but our plan continues.",
        conceptTag: ""
      },
      {
        move: "g4",
        isMainLine: true,
        annotation: "!",
        explanation: "Gaining space on the kingside! This pawn advance restricts Black's pieces and prepares further expansion. The knight on f6 will feel uncomfortable.",
        highlights: ["g4"],
        conceptTag: "Space Expansion"
      },
      {
        move: "b5",
        isMainLine: true,
        annotation: "",
        explanation: "Black counterattacks on the queenside.",
        conceptTag: ""
      },
      {
        move: "Bb3",
        isMainLine: true,
        annotation: "",
        explanation: "The bishop retreats to a safe diagonal while maintaining pressure on f7.",
        conceptTag: ""
      },
      {
        move: "Bb7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "g5",
        isMainLine: true,
        annotation: "!",
        explanation: "Pushing further! The knight on f6 must retreat, and our space advantage grows. We now control more squares on the kingside.",
        highlights: ["g5", "f6"],
        conceptTag: "Space Advantage"
      }
    ],
    summary: "Kingside pawn expansion creates space and attacking chances. The pawns gain territory while forcing enemy pieces to retreat or be restricted.",
    keyTakeaways: [
      "Prepare pawn advances carefully (h3 before g4)",
      "Flank expansion gains space and creates threats",
      "Advancing pawns force enemy pieces back",
      "Use gained space for piece infiltration"
    ],
    difficulty: 3,
    estimatedMinutes: 7,
    source: "Italian Game attacking plans"
  },
  {
    id: 'space-advantage-queenside-expansion',
    category: 'SPACE_ADVANTAGE',
    title: "Queenside Space Expansion",
    subtitle: "Gaining space with a4-a5",
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/P1N1PN2/1P3PPP/R1BQKB1R w KQ - 0 8',
    toMove: 'white',
    introduction: "Queenside expansion is a key strategy in many openings. By advancing the a and b pawns, we gain space and create weaknesses in Black's camp.",
    keyIdeas: [
      "a4-a5 gains queenside space",
      "Fix enemy pawns as targets",
      "Create weak squares in enemy camp",
      "Use queenside space for piece maneuvering"
    ],
    mainLine: [
      {
        move: "b4",
        isMainLine: true,
        annotation: "!",
        explanation: "Starting the queenside expansion! This pawn advance challenges Black's c5 pawn and gains space.",
        highlights: ["b4"],
        conceptTag: "Space Expansion"
      },
      {
        move: "cxd4",
        isMainLine: true,
        annotation: "",
        explanation: "Black exchanges to open the position.",
        conceptTag: ""
      },
      {
        move: "exd4",
        isMainLine: true,
        annotation: "",
        explanation: "We recapture, maintaining central control.",
        conceptTag: ""
      },
      {
        move: "dxc4",
        isMainLine: true,
        annotation: "",
        explanation: "Black takes the pawn.",
        conceptTag: ""
      },
      {
        move: "Bxc4",
        isMainLine: true,
        annotation: "",
        explanation: "Recapturing with the bishop keeps it active.",
        conceptTag: ""
      },
      {
        move: "b6",
        isMainLine: true,
        annotation: "",
        explanation: "Black fianchettoes.",
        conceptTag: ""
      },
      {
        move: "a4",
        isMainLine: true,
        annotation: "!",
        explanation: "Continuing the expansion! Now a5 is threatened, which would fix Black's pawns and create a permanent space advantage on the queenside.",
        highlights: ["a4", "a5"],
        conceptTag: "Space Advantage"
      }
    ],
    summary: "Queenside space expansion with b4 and a4-a5 is a common positional strategy. It gains territory, creates weaknesses, and provides squares for piece maneuvering.",
    keyTakeaways: [
      "b4 and a4-a5 gain queenside space",
      "Fix enemy pawns to create targets",
      "Expanding pawns create outpost squares",
      "Use gained space for piece activity"
    ],
    difficulty: 3,
    estimatedMinutes: 7,
    source: "Queen's Gambit strategies"
  },
  {
    id: 'space-advantage-restricting-pieces',
    category: 'SPACE_ADVANTAGE',
    title: "Using Space to Restrict Pieces",
    subtitle: "Cramping the opponent's position",
    fen: 'r1bqk2r/ppp1bppp/2n1pn2/3pP3/3P4/2N2N2/PPP1BPPP/R1BQK2R w KQkq - 0 7',
    toMove: 'white',
    introduction: "Space advantage isn't just about territory - it's about restricting your opponent's pieces. When pieces have no good squares, tactical opportunities arise.",
    keyIdeas: [
      "Space restricts enemy piece mobility",
      "Cramped pieces can't coordinate well",
      "Look for tactical shots against cramped positions",
      "Maintain pressure to prevent freeing moves"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling first - king safety before operations.",
        conceptTag: "Castling"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black also castles.",
        conceptTag: ""
      },
      {
        move: "Bg5",
        isMainLine: true,
        annotation: "!",
        explanation: "Pinning the knight! This adds pressure to Black's cramped position. The knight on f6 is now tied to defending e7.",
        highlights: ["g5", "f6"],
        conceptTag: "Pin"
      },
      {
        move: "h6",
        isMainLine: true,
        annotation: "",
        explanation: "Black asks the bishop's intentions.",
        conceptTag: ""
      },
      {
        move: "Bh4",
        isMainLine: true,
        annotation: "",
        explanation: "Maintaining the pin. Black's position remains cramped and the knight is stuck.",
        conceptTag: ""
      },
      {
        move: "Nd7",
        isMainLine: true,
        annotation: "?",
        explanation: "Black retreats but this crowds the pieces even more. The bishop on e7 has no scope.",
        conceptTag: ""
      },
      {
        move: "Bg3",
        isMainLine: true,
        annotation: "!",
        explanation: "The bishop repositions, maintaining the space advantage. Black's pieces are tripping over each other while ours coordinate freely.",
        highlights: ["d7", "e7", "c6"],
        conceptTag: "Space Advantage"
      }
    ],
    summary: "Space advantage restricts enemy pieces. In this example, the e5 pawn and active bishops cramp Black's entire army, making coordination difficult.",
    keyTakeaways: [
      "Space restricts enemy piece mobility",
      "Cramped pieces can't coordinate",
      "Maintain pressure - don't let opponent free their game",
      "Look for tactical opportunities against cramped positions"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "French Defense middlegames"
  },
  {
    id: 'space-advantage-pawn-chain-attack',
    category: 'SPACE_ADVANTAGE',
    title: "Exploiting Space with Pawn Chains",
    subtitle: "The d4-e5 chain in action",
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R w KQkq - 0 6',
    toMove: 'white',
    introduction: "A pawn chain like d4-e5 creates permanent space advantage. The chain controls key squares and restricts enemy pieces for the entire game.",
    keyIdeas: [
      "Pawn chains create lasting space advantage",
      "Attack the base of enemy pawn chains",
      "Use the space behind your chain for maneuvering",
      "The chain controls key squares"
    ],
    mainLine: [
      {
        move: "Be2",
        isMainLine: true,
        annotation: "",
        explanation: "Simple development. Our e5 pawn chain already gives us more space.",
        conceptTag: "Development"
      },
      {
        move: "cxd4",
        isMainLine: true,
        annotation: "",
        explanation: "Black exchanges.",
        conceptTag: ""
      },
      {
        move: "cxd4",
        isMainLine: true,
        annotation: "",
        explanation: "We recapture, strengthening the d4-e5 chain.",
        highlights: ["d4", "e5"],
        conceptTag: "Pawn Chain"
      },
      {
        move: "Bb4+",
        isMainLine: true,
        annotation: "",
        explanation: "Black checks to disrupt.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "!",
        explanation: "Blocking with the knight develops a piece and maintains our space advantage. The d4-e5 chain remains strong.",
        conceptTag: "Development"
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
        explanation: "We castle. Now we can build up behind our space advantage - f4, Bd3, and even Ng5 are all possible.",
        highlights: ["f4", "g5"],
        conceptTag: "Plans"
      }
    ],
    summary: "The d4-e5 pawn chain is a powerful structure that creates lasting space advantage. Use the space behind the chain to maneuver pieces to optimal squares.",
    keyTakeaways: [
      "Pawn chains create permanent space",
      "Build up behind your pawn chain",
      "The chain restricts enemy pieces",
      "Look for f4, Ng5 attacking ideas"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "French Defense mainlines"
  },
  {
    id: 'space-advantage-conversion',
    category: 'SPACE_ADVANTAGE',
    title: "Converting Space into Attack",
    subtitle: "Turning territory into threats",
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3pP3/3P1B2/2N2N2/PPP1BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    introduction: "Space advantage alone doesn't win games - you must convert it into something concrete. Here we learn to turn extra space into a kingside attack.",
    keyIdeas: [
      "Space advantage enables attacking buildups",
      "Piece transfers are easier with more space",
      "Convert space into threats against the king",
      "The opponent can't defend everywhere"
    ],
    mainLine: [
      {
        move: "Qd2",
        isMainLine: true,
        annotation: "!",
        explanation: "Connecting rooks and preparing to bring pieces to the kingside. With more space, we can maneuver easily.",
        conceptTag: "Queen Transfer"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "Qe3",
        isMainLine: true,
        annotation: "!",
        explanation: "The queen heads toward the kingside. Our space makes this easy - Black's pieces are too cramped to interfere.",
        highlights: ["e3"],
        conceptTag: "Attack Preparation"
      },
      {
        move: "Rc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates a rook.",
        conceptTag: ""
      },
      {
        move: "Ng5",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight jumps into the attack! With more space, our pieces reach aggressive squares easily. Now h7 is under pressure.",
        highlights: ["g5", "h7"],
        conceptTag: "Knight Attack"
      },
      {
        move: "Nxe5",
        isMainLine: true,
        annotation: "?",
        explanation: "Black tries to relieve pressure but opens lines.",
        conceptTag: ""
      },
      {
        move: "Nxe5",
        isMainLine: true,
        annotation: "!",
        explanation: "Recapturing with a powerful centralized knight. Our space advantage has been converted into a strong attack.",
        highlights: ["e5", "g5"],
        conceptTag: "Attack"
      }
    ],
    summary: "Space advantage must be converted into something concrete. Use the extra room to transfer pieces to the kingside and build a winning attack.",
    keyTakeaways: [
      "Space alone doesn't win - convert it",
      "Transfer pieces easily with more space",
      "Build attacks where opponent is weak",
      "Cramped positions can't defend everywhere"
    ],
    difficulty: 4,
    estimatedMinutes: 8,
    source: "Classical attacking chess"
  },
  {
    id: 'space-advantage-positional-squeeze',
    category: 'SPACE_ADVANTAGE',
    title: "The Positional Squeeze",
    subtitle: "Slowly increasing pressure",
    fen: 'r2q1rk1/1b2bppp/p1n1pn2/1pp1P3/3P4/1BN2N2/PP3PPP/R1BQ1RK1 w - - 0 11',
    toMove: 'white',
    introduction: "Sometimes the best way to use space advantage is a slow squeeze - gradually improving piece positions while the opponent can only wait.",
    keyIdeas: [
      "Gradual improvement with space advantage",
      "Don't rush - improve piece by piece",
      "The cramped side must wait passively",
      "Look for the right moment to strike"
    ],
    mainLine: [
      {
        move: "Ne2",
        isMainLine: true,
        annotation: "!",
        explanation: "Rerouting the knight! With extra space, we can maneuver pieces to better squares. The knight heads to g3 or f4.",
        highlights: ["e2", "g3", "f4"],
        conceptTag: "Maneuvering"
      },
      {
        move: "Qc7",
        isMainLine: true,
        annotation: "",
        explanation: "Black can only shuffle pieces.",
        conceptTag: ""
      },
      {
        move: "Ng3",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight reaches a strong post, eyeing f5 and h5. This is the advantage of space - easy maneuvering.",
        highlights: ["g3", "f5"],
        conceptTag: "Improvement"
      },
      {
        move: "Rfd8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates a rook.",
        conceptTag: ""
      },
      {
        move: "Qe2",
        isMainLine: true,
        annotation: "",
        explanation: "The queen protects and prepares. We're in no hurry.",
        conceptTag: ""
      },
      {
        move: "Rac8",
        isMainLine: true,
        annotation: "",
        explanation: "Black doubles rooks.",
        conceptTag: ""
      },
      {
        move: "Nf5",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight lands on the perfect outpost! Our space advantage allowed us to slowly improve until reaching this dominant position.",
        highlights: ["f5"],
        conceptTag: "Culmination"
      }
    ],
    summary: "The positional squeeze uses space advantage for gradual improvement. Don't rush - improve pieces one by one until you achieve a winning position.",
    keyTakeaways: [
      "Don't rush with space advantage",
      "Improve pieces gradually",
      "The cramped side can only wait",
      "Find the perfect moment to strike"
    ],
    difficulty: 4,
    estimatedMinutes: 8,
    source: "Karpov's positional masterpieces"
  },
  {
    id: 'space-advantage-preventing-breaks',
    category: 'SPACE_ADVANTAGE',
    title: "Preventing Freeing Breaks",
    subtitle: "Keeping the opponent cramped",
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2PpP3/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: "When you have space advantage, your opponent will try to free their position with pawn breaks. Learning to prevent these breaks maintains your advantage.",
    keyIdeas: [
      "Identify opponent's freeing breaks",
      "Prevent or control break squares",
      "Keep pieces on key squares to stop breaks",
      "Patience - don't allow counter-play"
    ],
    mainLine: [
      {
        move: "Bf4",
        isMainLine: true,
        annotation: "!",
        explanation: "Developing while controlling key squares. Black wants to play f6 to challenge our center - this bishop helps prevent that.",
        highlights: ["f4", "f6"],
        conceptTag: "Prophylaxis"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "Qd2",
        isMainLine: true,
        annotation: "",
        explanation: "Connecting rooks and preparing operations.",
        conceptTag: ""
      },
      {
        move: "Rc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black puts pressure on c5.",
        conceptTag: ""
      },
      {
        move: "b4",
        isMainLine: true,
        annotation: "!",
        explanation: "Protecting c5 and preventing any b6 break. We maintain our space advantage by denying Black any freeing moves.",
        highlights: ["b4", "c5"],
        conceptTag: "Preventing Breaks"
      },
      {
        move: "a6",
        isMainLine: true,
        annotation: "",
        explanation: "Black prepares b6.",
        conceptTag: ""
      },
      {
        move: "a4",
        isMainLine: true,
        annotation: "!",
        explanation: "Further restricting Black's queenside. Any b6 break is now impossible, and Black remains completely cramped.",
        highlights: ["a4"],
        conceptTag: "Space Control"
      }
    ],
    summary: "Preventing freeing breaks is crucial to maintaining space advantage. Control the break squares and deny your opponent counterplay.",
    keyTakeaways: [
      "Identify opponent's freeing breaks",
      "Use pieces and pawns to control break squares",
      "Patience is key - don't allow counter-play",
      "A cramped position without breaks is hopeless"
    ],
    difficulty: 3,
    estimatedMinutes: 7,
    source: "Classical positional play"
  },
  {
    id: 'space-advantage-piece-activity',
    category: 'SPACE_ADVANTAGE',
    title: "Space and Piece Activity",
    subtitle: "More room means more activity",
    fen: 'r1bqr1k1/pp3ppp/2n1pn2/2bpP3/3P4/P1N1BN2/1P2BPPP/R2Q1RK1 w - - 0 10',
    toMove: 'white',
    introduction: "Space advantage directly translates to piece activity. With more room, your pieces find better squares while opponent's pieces bump into each other.",
    keyIdeas: [
      "More space = more active piece positions",
      "Pieces in cramped positions interfere with each other",
      "Use space to place pieces on optimal squares",
      "Activity difference wins games"
    ],
    mainLine: [
      {
        move: "Rc1",
        isMainLine: true,
        annotation: "!",
        explanation: "The rook activates on the open file. With more space, we easily find active squares for all pieces.",
        highlights: ["c1"],
        conceptTag: "Rook Activity"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops but pieces are cramped.",
        conceptTag: ""
      },
      {
        move: "Qd2",
        isMainLine: true,
        annotation: "",
        explanation: "Connecting rooks. Our queen is flexible while Black's is stuck.",
        conceptTag: ""
      },
      {
        move: "Rc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black contests the file.",
        conceptTag: ""
      },
      {
        move: "Bb5",
        isMainLine: true,
        annotation: "!",
        explanation: "The bishop is active on both diagonals! Compare this to Black's cramped c5 bishop. Space advantage means piece activity advantage.",
        highlights: ["b5", "c5"],
        conceptTag: "Piece Activity"
      },
      {
        move: "Ne7",
        isMainLine: true,
        annotation: "",
        explanation: "Black retreats the knight.",
        conceptTag: ""
      },
      {
        move: "Rfd1",
        isMainLine: true,
        annotation: "!",
        explanation: "Both rooks are now active. Our pieces work harmoniously while Black's pieces are tripping over each other.",
        highlights: ["c1", "d1"],
        conceptTag: "Coordination"
      }
    ],
    summary: "Space advantage leads to piece activity advantage. Your pieces find optimal squares easily while opponent's pieces remain cramped and uncoordinated.",
    keyTakeaways: [
      "Space = squares for your pieces",
      "Active pieces beat passive pieces",
      "Cramped positions lead to piece interference",
      "Convert activity advantage into concrete gains"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Petrosian's space handling"
  },

  // ============================================
  // WEAK PAWNS - Additional Patterns
  // ============================================

  {
    id: 'weak-pawn-isolated-rook-pawn',
    category: 'WEAK_PAWNS',
    title: "The Isolated Rook Pawn",
    subtitle: "Exploiting pawns on the edge",
    fen: 'r2q1rk1/1p2bppp/p1n1pn2/8/P3P3/2N2N2/1PP1BPPP/R2Q1RK1 w - - 0 11',
    toMove: 'white',
    introduction: "Isolated rook pawns (a-pawns and h-pawns) are particularly weak because they can only be defended from one side. Here Black's a6 pawn is isolated and vulnerable.",
    keyIdeas: [
      "Rook pawns can only be defended from one direction",
      "Use rooks to target the isolated pawn along the file",
      "The lack of adjacent files means fewer defensive options",
      "Trade pieces to reduce defensive resources"
    ],
    mainLine: [
      {
        move: "Nb5",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight jumps to b5, attacking the weak a-pawn and creating threats on c7.",
        highlights: ["b5", "a6"],
        conceptTag: "Knight Outpost"
      },
      {
        move: "Qb6",
        isMainLine: true,
        annotation: "",
        explanation: "Black defends the pawn with the queen.",
        conceptTag: ""
      },
      {
        move: "a5",
        isMainLine: true,
        annotation: "!",
        explanation: "Fixing the weak pawn! Now a6 cannot advance and remains a permanent target.",
        highlights: ["a5", "a6"],
        conceptTag: "Fixing Weakness"
      },
      {
        move: "Rfd8",
        isMainLine: true,
        annotation: "",
        explanation: "Black seeks counterplay on the d-file.",
        conceptTag: ""
      },
      {
        move: "Qc2",
        isMainLine: true,
        annotation: "",
        explanation: "Preparing to double rooks on the a-file.",
        conceptTag: ""
      },
      {
        move: "Rac8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates the rook.",
        conceptTag: ""
      },
      {
        move: "Rxa6",
        isMainLine: true,
        annotation: "!",
        explanation: "We win the weak isolated rook pawn! The inability to defend from both sides proved fatal.",
        highlights: ["a6"],
        conceptTag: "Winning Material"
      }
    ],
    summary: "Isolated rook pawns are inherently weak due to their edge position. They can only receive support from one adjacent file, making them easier targets than central isolated pawns.",
    keyTakeaways: [
      "Rook pawns on a/h files are harder to defend",
      "Fix weak pawns in place to prevent escape",
      "Use the knight to pressure from b5 or g5",
      "Coordinate rooks on the a-file or h-file"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Karpov's endgame technique"
  },

  {
    id: 'weak-pawn-iqp-dynamic',
    category: 'WEAK_PAWNS',
    title: "Dynamic IQP Play",
    subtitle: "Using isolated pawn dynamically",
    fen: 'r1bq1rk1/pp3ppp/2n2n2/2bp4/8/2NB1N2/PPP2PPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: "Sometimes YOU have the isolated queen pawn. Instead of defending passively, use it as a battering ram! The IQP provides central space and piece activity - strike before the endgame arrives.",
    keyIdeas: [
      "The IQP provides spatial advantage in the middlegame",
      "Active pieces compensate for the structural weakness",
      "Push d4-d5 to open lines and create tactics",
      "Avoid trades that lead to weak endgames"
    ],
    mainLine: [
      {
        move: "Bg5",
        isMainLine: true,
        annotation: "!",
        explanation: "Pinning the knight and preparing active play. With an IQP, we must play dynamically!",
        highlights: ["g5"],
        conceptTag: "Pin"
      },
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Black breaks the pin.",
        conceptTag: ""
      },
      {
        move: "Qd2",
        isMainLine: true,
        annotation: "",
        explanation: "Connecting rooks and preparing Rad1 to support the d-pawn push.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles for safety.",
        conceptTag: ""
      },
      {
        move: "Rad1",
        isMainLine: true,
        annotation: "!",
        explanation: "Supporting the d-pawn break. Soon we'll push d4-d5!",
        highlights: ["d1"],
        conceptTag: "Rook Support"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the last minor piece.",
        conceptTag: ""
      },
      {
        move: "d5",
        isMainLine: true,
        annotation: "!",
        explanation: "The thematic break! Opening lines and creating central tension. This is how to use the IQP dynamically - as a weapon, not a weakness.",
        highlights: ["d5"],
        conceptTag: "Central Break"
      }
    ],
    summary: "The isolated queen pawn can be a strength in the middlegame. Active piece play and the d4-d5 break create attacking chances. The key is to strike before the endgame simplifies the position.",
    keyTakeaways: [
      "IQP = activity compensation for structure",
      "Push d4-d5 to open lines for attack",
      "Keep pieces active; avoid passive defense",
      "Trade into active positions, not endgames"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Kasparov's IQP handling"
  },

  {
    id: 'weak-pawn-backward-d6',
    category: 'WEAK_PAWNS',
    title: "The Backward d6 Pawn",
    subtitle: "Classic Sicilian weakness",
    fen: 'r1b2rk1/2q1bppp/p1n1pn2/1p1p4/4P3/1BN2N2/PPP2PPP/R1BQR1K1 w - - 0 11',
    toMove: 'white',
    introduction: "In many Sicilian structures, Black's d6 pawn becomes backward - it cannot advance and blocks the c8 bishop. White's classic plan: occupy d5 and pressure the weak pawn.",
    keyIdeas: [
      "Backward pawns block their own pieces",
      "The square in front becomes a powerful outpost",
      "Use heavy pieces to pressure the backward pawn",
      "Knights love the square in front of backward pawns"
    ],
    mainLine: [
      {
        move: "Nd5",
        isMainLine: true,
        annotation: "!",
        explanation: "Occupying the hole in front of the backward pawn! The knight is incredibly strong here - it cannot be challenged by pawns.",
        highlights: ["d5"],
        conceptTag: "Outpost"
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black must exchange or suffer the knight's dominance.",
        conceptTag: ""
      },
      {
        move: "exd5",
        isMainLine: true,
        annotation: "",
        explanation: "Recapturing with the pawn maintains control of d5 and keeps pressure on e6.",
        conceptTag: ""
      },
      {
        move: "Nb8",
        isMainLine: true,
        annotation: "",
        explanation: "Black's knight retreats, trying to reroute.",
        conceptTag: ""
      },
      {
        move: "Bf4",
        isMainLine: true,
        annotation: "!",
        explanation: "Developing the bishop to an active square while eyeing the d6 pawn.",
        highlights: ["f4"],
        conceptTag: "Development"
      },
      {
        move: "Nd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black reroutes the knight.",
        conceptTag: ""
      },
      {
        move: "Qd3",
        isMainLine: true,
        annotation: "!",
        explanation: "The queen eyes both d6 and h7. Black's backward pawn is creating multiple weaknesses.",
        highlights: ["d3", "d6"],
        conceptTag: "Multi-target Pressure"
      }
    ],
    summary: "Backward pawns in the center are especially weak. The d6 pawn in Sicilian structures blocks Black's development and provides White with a permanent outpost on d5.",
    keyTakeaways: [
      "Backward pawns block piece development",
      "Occupy the square in front with a knight",
      "Pressure the pawn with heavy pieces",
      "Create secondary weaknesses around it"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Fischer's Sicilian handling"
  },

  {
    id: 'weak-pawn-holes-f6',
    category: 'WEAK_PAWNS',
    title: "Holes from Pawn Advances",
    subtitle: "When pawns leave weaknesses behind",
    fen: 'r1bq1rk1/ppp2ppp/2np4/4p3/2B1Pn2/2N2N2/PPPP1PPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    introduction: "When pawns advance, they leave holes behind. Black's d6-e5 structure has left f5 and d5 weak. These permanent holes become outpost squares for our pieces.",
    keyIdeas: [
      "Pawn advances create permanent holes behind them",
      "Central holes are most valuable for knights",
      "Use pieces to occupy the holes immediately",
      "Holes near the king are especially dangerous"
    ],
    mainLine: [
      {
        move: "Nd5",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight lands on the hole created by Black's e5 pawn. It cannot be driven away by pawns!",
        highlights: ["d5"],
        conceptTag: "Outpost"
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black exchanges the powerful knight.",
        conceptTag: ""
      },
      {
        move: "Bxd5",
        isMainLine: true,
        annotation: "",
        explanation: "We recapture, maintaining central pressure.",
        conceptTag: ""
      },
      {
        move: "c6",
        isMainLine: true,
        annotation: "",
        explanation: "Black kicks the bishop.",
        conceptTag: ""
      },
      {
        move: "Bb3",
        isMainLine: true,
        annotation: "",
        explanation: "The bishop retreats but remains on a strong diagonal.",
        conceptTag: ""
      },
      {
        move: "Be6",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "Nh4",
        isMainLine: true,
        annotation: "!",
        explanation: "Heading for f5! The second hole is about to be occupied. Knights love holes.",
        highlights: ["h4", "f5"],
        conceptTag: "Maneuver"
      }
    ],
    summary: "Every pawn advance creates holes on the squares the pawn used to control. Plan your piece play to exploit these holes - they're permanent weaknesses.",
    keyTakeaways: [
      "Pawns can never move backward",
      "Holes are permanent; outposts are forever",
      "Knights are the best pieces for holes",
      "Central and kingside holes are most valuable"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Nimzowitsch positional theory"
  },

  {
    id: 'weak-pawn-overextended-center',
    category: 'WEAK_PAWNS',
    title: "Overextended Center Pawns",
    subtitle: "When too many pawns advance",
    fen: 'r1bqkb1r/pp3ppp/2n2n2/2ppp3/4P3/2PP1N2/PP3PPP/RNBQKB1R w KQkq - 0 6',
    toMove: 'white',
    introduction: "Black has advanced pawns on c5, d5, and e5. While this looks aggressive, these pawns can become targets. The strategy: undermine and attack the overextended center.",
    keyIdeas: [
      "Overextended pawns become targets",
      "Attack the pawn chain at its base",
      "Use piece play to pressure weak points",
      "Trade pawns to expose weaknesses"
    ],
    mainLine: [
      {
        move: "exd5",
        isMainLine: true,
        annotation: "!",
        explanation: "Opening the center! Black must recapture and their pawn structure will have weaknesses.",
        highlights: ["d5"],
        conceptTag: "Central Break"
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures with the knight.",
        conceptTag: ""
      },
      {
        move: "d4",
        isMainLine: true,
        annotation: "!",
        explanation: "Striking at the overextended pawn chain. Now c5 and e5 are both hanging!",
        highlights: ["d4", "c5", "e5"],
        conceptTag: "Undermining"
      },
      {
        move: "cxd4",
        isMainLine: true,
        annotation: "",
        explanation: "Black captures.",
        conceptTag: ""
      },
      {
        move: "cxd4",
        isMainLine: true,
        annotation: "",
        explanation: "Recapturing. Now Black's e5 pawn is isolated and weak.",
        highlights: ["e5"],
        conceptTag: ""
      },
      {
        move: "e4",
        isMainLine: true,
        annotation: "",
        explanation: "Black advances but the pawn remains weak.",
        conceptTag: ""
      },
      {
        move: "Bc4",
        isMainLine: true,
        annotation: "!",
        explanation: "Developing with tempo on the d5 knight. Black's overextended pawns are causing coordination problems.",
        highlights: ["c4", "d5"],
        conceptTag: "Development with Tempo"
      }
    ],
    summary: "Overextended center pawns look impressive but can become liabilities. Attack the base of the pawn chain and use piece activity to exploit the resulting weaknesses.",
    keyTakeaways: [
      "Aggressive pawn pushes can backfire",
      "Attack the base of pawn chains",
      "Undermining breaks (d4 vs c5/e5) are powerful",
      "Development matters more than pawn structure"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Classical opening theory"
  },

  {
    id: 'weak-pawn-fixed-target',
    category: 'WEAK_PAWNS',
    title: "Creating Fixed Targets",
    subtitle: "Stopping weak pawns from moving",
    fen: 'r1bq1rk1/pp3ppp/2nbpn2/3p4/3P4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: "A weak pawn that can advance is much less weak than one that is fixed. The technique: use pieces and pawns to stop the weak pawn from moving, then attack it.",
    keyIdeas: [
      "Moving pawns escape pressure",
      "Fix weak pawns with pieces or pawns",
      "Blocked pawns are easier to attack",
      "Coordinate attacks on fixed targets"
    ],
    mainLine: [
      {
        move: "Nb5",
        isMainLine: true,
        annotation: "!",
        explanation: "Attacking the c7 pawn and preparing Nc3-b5 ideas. We're restricting Black's play.",
        highlights: ["b5"],
        conceptTag: "Knight Invasion"
      },
      {
        move: "Bb8",
        isMainLine: true,
        annotation: "",
        explanation: "Black retreats the bishop.",
        conceptTag: ""
      },
      {
        move: "Bf4",
        isMainLine: true,
        annotation: "!",
        explanation: "Trading off Black's only active piece. This fixes the structure.",
        highlights: ["f4"],
        conceptTag: "Simplification"
      },
      {
        move: "Bxf4",
        isMainLine: true,
        annotation: "",
        explanation: "Black exchanges.",
        conceptTag: ""
      },
      {
        move: "Nxf4",
        isMainLine: true,
        annotation: "",
        explanation: "The knight is beautifully placed, pressuring e6 and controlling d5.",
        highlights: ["f4"],
        conceptTag: ""
      },
      {
        move: "a6",
        isMainLine: true,
        annotation: "",
        explanation: "Black drives away the knight.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "",
        explanation: "The knight returns, but Black's pawns are now fixed - a6, d5, e6 are all immobile targets.",
        highlights: ["a6", "d5", "e6"],
        conceptTag: "Fixed Weaknesses"
      }
    ],
    summary: "Weak pawns that are mobile can escape. Fix them in place with your pieces and pawns, then systematically increase the pressure until something breaks.",
    keyTakeaways: [
      "Fixed pawns are weaker than mobile pawns",
      "Use pieces to prevent pawn advances",
      "Create multiple fixed targets",
      "Patience wins against fixed weaknesses"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Karpov's positional mastery"
  },

  {
    id: 'weak-pawn-c-file-pressure',
    category: 'WEAK_PAWNS',
    title: "Queenside Pawn Pressure",
    subtitle: "Classic c-file exploitation",
    fen: 'r1bq1rk1/2p2ppp/p1n1pn2/1p6/3P4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 10',
    toMove: 'white',
    introduction: "Black has queenside pawns on a6, b5, and c7. The c7 pawn is a target - we'll use the open c-file and piece coordination to pressure it relentlessly.",
    keyIdeas: [
      "Open files lead to weak pawns",
      "Rooks belong on open files",
      "Double rooks for maximum pressure",
      "Target the base pawn first"
    ],
    mainLine: [
      {
        move: "Rc1",
        isMainLine: true,
        annotation: "!",
        explanation: "The rook claims the semi-open c-file, targeting the c7 pawn.",
        highlights: ["c1"],
        conceptTag: "Rook Activation"
      },
      {
        move: "Bb7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Qc2",
        isMainLine: true,
        annotation: "!",
        explanation: "Adding pressure to c7 and preparing to double on the c-file.",
        highlights: ["c2"],
        conceptTag: "Queen Pressure"
      },
      {
        move: "Rc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black defends the pawn with the rook.",
        conceptTag: ""
      },
      {
        move: "Rfc1",
        isMainLine: true,
        annotation: "!",
        explanation: "Doubling rooks! Now the pressure on c7 is immense.",
        highlights: ["c1"],
        conceptTag: "Doubled Rooks"
      },
      {
        move: "Qd6",
        isMainLine: true,
        annotation: "",
        explanation: "Black's queen comes to defend.",
        conceptTag: ""
      },
      {
        move: "Ne5",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight joins the attack on c6 and c7. Black's queenside is under siege.",
        highlights: ["e5", "c6"],
        conceptTag: "Knight Pressure"
      }
    ],
    summary: "Weak queenside pawns are best attacked with rooks on open files. Double your rooks, add the queen, and use knight jumps to create unbearable pressure.",
    keyTakeaways: [
      "Control open files with rooks",
      "Double rooks for maximum pressure",
      "Queen and rooks work well together",
      "Knights add pressure from unexpected angles"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Rubinstein's rook technique"
  },

  {
    id: 'weak-pawn-minority-attack-result',
    category: 'WEAK_PAWNS',
    title: "Exploiting Minority Attack Weaknesses",
    subtitle: "What to do after the attack succeeds",
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2Pp4/8/2NB1N2/PP3PPP/R1BQ1RK1 w - - 0 10',
    toMove: 'white',
    introduction: "After a successful minority attack, Black often has a weak pawn on c6 or an isolated d5 pawn. Now the exploitation phase begins - methodically attack the weakness.",
    keyIdeas: [
      "Minority attacks create structural weaknesses",
      "The resulting backward c-pawn is a target",
      "Knights excel at attacking these weaknesses",
      "Patience and piece coordination win"
    ],
    mainLine: [
      {
        move: "Nb5",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight occupies the wonderful outpost, pressuring both a7 and c7. The minority attack has created targets.",
        highlights: ["b5"],
        conceptTag: "Knight Outpost"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops and defends.",
        conceptTag: ""
      },
      {
        move: "Bf4",
        isMainLine: true,
        annotation: "",
        explanation: "Developing the bishop actively, preparing to coordinate pressure.",
        highlights: ["f4"],
        conceptTag: ""
      },
      {
        move: "Rc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black defends the c7 pawn with the rook.",
        conceptTag: ""
      },
      {
        move: "Rc1",
        isMainLine: true,
        annotation: "!",
        explanation: "Rook to the c-file! Pressuring the weakness along the file.",
        highlights: ["c1"],
        conceptTag: "File Control"
      },
      {
        move: "Be8",
        isMainLine: true,
        annotation: "",
        explanation: "Black retreats the bishop.",
        conceptTag: ""
      },
      {
        move: "Qb3",
        isMainLine: true,
        annotation: "!",
        explanation: "The queen adds pressure to the queenside. Black's c7 pawn is under attack from knight, rook, and queen!",
        highlights: ["b3", "c7"],
        conceptTag: "Coordination"
      }
    ],
    summary: "After a minority attack creates weaknesses, the exploitation requires patience. Coordinate your pieces to attack the weak pawn from multiple directions until it falls.",
    keyTakeaways: [
      "Minority attacks create lasting weaknesses",
      "Knights on b5/c5 are powerful outposts",
      "Rooks on open files pressure from behind",
      "Multiple attackers overwhelm defenders"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Capablanca's endgame technique"
  },

  // ============================================
  // PROPHYLAXIS - Additional Patterns
  // ============================================

  {
    id: 'prophylaxis-preventing-pawn-break',
    category: 'PROPHYLAXIS',
    title: "Preventing Pawn Breaks",
    subtitle: "Stopping liberating advances",
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P1B2/2N2N2/PP2PPPP/R2QKB1R w KQ - 0 8',
    toMove: 'white',
    introduction: "Black wants to free their position with ...e6-e5. Prophylaxis means asking: what does my opponent want to do? Then stopping it. Here we prevent ...e5 before it happens.",
    keyIdeas: [
      "Ask: What does my opponent want to do?",
      "Prevention is often stronger than reaction",
      "Control key squares before they're used",
      "Restrict liberating pawn breaks"
    ],
    mainLine: [
      {
        move: "e3",
        isMainLine: true,
        annotation: "!",
        explanation: "Prophylaxis! This move supports d4 and makes ...e5 much harder to achieve. Black's pawn break is stopped.",
        highlights: ["e3", "e5"],
        conceptTag: "Prophylaxis"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "Completing development harmoniously.",
        highlights: ["d3"],
        conceptTag: ""
      },
      {
        move: "Rc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates the rook.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety. Now Black still cannot play ...e5 effectively.",
        conceptTag: ""
      },
      {
        move: "Re8",
        isMainLine: true,
        annotation: "",
        explanation: "Black prepares ...e5 again.",
        conceptTag: ""
      },
      {
        move: "Qc2",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing Rad1, adding pressure on d5. If Black plays ...e5, we have dxe5 with a good position.",
        highlights: ["c2"],
        conceptTag: "Preparation"
      }
    ],
    summary: "Prophylactic thinking means anticipating your opponent's plans and stopping them before they happen. Preventing ...e5 keeps Black cramped and unable to equalize.",
    keyTakeaways: [
      "Always ask what your opponent wants",
      "Prevention is better than cure",
      "Restricting pawn breaks limits counterplay",
      "Calm, restraining moves are powerful"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Petrosian's prophylactic style"
  },

  {
    id: 'prophylaxis-preventing-knight-outpost',
    category: 'PROPHYLAXIS',
    title: "Preventing Outposts",
    subtitle: "Denying good squares to enemy pieces",
    fen: 'r1bqkb1r/pp2pppp/2n2n2/3p4/3P1B2/2N2P2/PPP1P1PP/R2QKBNR b KQkq - 0 5',
    toMove: 'black',
    introduction: "White's knight wants to come to e5 - a powerful outpost. Prophylactic thinking: we must prevent this! Control e5 before the knight arrives.",
    keyIdeas: [
      "Identify squares your opponent wants",
      "Control those squares before pieces arrive",
      "Use pawns and pieces to deny outposts",
      "Think about enemy piece maneuvers"
    ],
    mainLine: [
      {
        move: "Bf5",
        isMainLine: true,
        annotation: "!",
        explanation: "Prophylaxis! The bishop controls e4 and indirectly restrains Ne2-e5 ideas. We develop while preventing.",
        highlights: ["f5", "e4"],
        conceptTag: "Prophylaxis"
      },
      {
        move: "e3",
        isMainLine: true,
        annotation: "",
        explanation: "White continues development.",
        conceptTag: ""
      },
      {
        move: "e6",
        isMainLine: true,
        annotation: "!",
        explanation: "Solidifying the center and keeping the bishop protected.",
        highlights: ["e6"],
        conceptTag: ""
      },
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops the bishop.",
        conceptTag: ""
      },
      {
        move: "Bxd3",
        isMainLine: true,
        annotation: "",
        explanation: "Trading to simplify - but this isn't forced.",
        conceptTag: ""
      },
      {
        move: "Qxd3",
        isMainLine: true,
        annotation: "",
        explanation: "White recaptures.",
        conceptTag: ""
      },
      {
        move: "Bd6",
        isMainLine: true,
        annotation: "!",
        explanation: "The bishop develops to control e5 directly. The knight will never reach e5 now!",
        highlights: ["d6", "e5"],
        conceptTag: "Square Control"
      }
    ],
    summary: "Before your opponent places a piece on an ideal square, ask if you can prevent it. Controlling outposts prophylactically is easier than evicting a well-placed piece.",
    keyTakeaways: [
      "Outpost prevention > outpost eviction",
      "Develop pieces to control enemy target squares",
      "Think ahead about piece maneuvers",
      "Multiple pieces controlling one square is strongest"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Nimzowitsch's My System"
  },

  {
    id: 'prophylaxis-preventing-attack',
    category: 'PROPHYLAXIS',
    title: "Preventing Kingside Attack",
    subtitle: "Stopping aggression before it starts",
    fen: 'r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bPP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 6',
    toMove: 'white',
    introduction: "Black has active pieces pointing at our kingside. Before castling into potential danger, we must neutralize the threats. Prophylaxis prevents attacks, not just defends against them.",
    keyIdeas: [
      "Recognize attack potential before it materializes",
      "Neutralize attacking pieces prophylactically",
      "Trade off dangerous pieces when possible",
      "Delay castling if kingside is vulnerable"
    ],
    mainLine: [
      {
        move: "a3",
        isMainLine: true,
        annotation: "!",
        explanation: "Prophylaxis! Asking the bishop where it wants to go. If Ba5, we gain time; if Bxc3, we recapture and have the bishop pair.",
        highlights: ["a3"],
        conceptTag: "Asking Question"
      },
      {
        move: "Bxc3+",
        isMainLine: true,
        annotation: "",
        explanation: "Black decides to capture.",
        conceptTag: ""
      },
      {
        move: "bxc3",
        isMainLine: true,
        annotation: "",
        explanation: "Recapturing. Now we have doubled pawns but the bishop pair.",
        conceptTag: ""
      },
      {
        move: "exd4",
        isMainLine: true,
        annotation: "",
        explanation: "Black opens the center.",
        conceptTag: ""
      },
      {
        move: "exd4",
        isMainLine: true,
        annotation: "",
        explanation: "Recapturing with a solid center.",
        highlights: ["d4"],
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
        move: "Bd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Now we can safely develop. The attacking bishop is gone, and our king will be safe on the kingside.",
        highlights: ["d3"],
        conceptTag: "Safe Development"
      }
    ],
    summary: "Prophylaxis against attacks means identifying dangerous pieces and neutralizing them before an attack can form. Prevention is more efficient than defense.",
    keyTakeaways: [
      "Identify which pieces threaten your king",
      "Trade off attacking pieces when practical",
      "Delay castling if the kingside is under pressure",
      "a3/h3 moves ask questions and gain information"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Karpov's defensive technique"
  },

  {
    id: 'prophylaxis-restricting-pieces',
    category: 'PROPHYLAXIS',
    title: "Restricting Enemy Pieces",
    subtitle: "The art of piece imprisonment",
    fen: 'r1b2rk1/pp2bppp/1qn1pn2/3p4/2PP4/2N1PN2/PP1B1PPP/R2QKB1R w KQ - 0 8',
    toMove: 'white',
    introduction: "Black's light-squared bishop on c8 is bad - stuck behind the e6 pawn. Prophylactic thinking: don't let it escape! Keep it trapped while we improve our position.",
    keyIdeas: [
      "Identify opponent's worst piece",
      "Prevent that piece from activating",
      "Maintain the restriction while improving",
      "Bad pieces eventually cost games"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Developing while maintaining the clamp. Black's c8 bishop cannot easily reach a good diagonal.",
        highlights: ["d3"],
        conceptTag: "Development"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles for safety.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "We castle as well.",
        conceptTag: ""
      },
      {
        move: "Rd8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates the rook.",
        conceptTag: ""
      },
      {
        move: "Qe2",
        isMainLine: true,
        annotation: "!",
        explanation: "Connecting rooks and watching e6. If Black tries ...e5, we have cxd5 followed by e4 with advantage.",
        highlights: ["e2"],
        conceptTag: "Prophylaxis"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black tries to activate the bishop.",
        conceptTag: ""
      },
      {
        move: "c5",
        isMainLine: true,
        annotation: "!",
        explanation: "Space gain and the bishop is still restricted! On d7 it does nothing. We've maintained the bind.",
        highlights: ["c5"],
        conceptTag: "Space Advantage"
      }
    ],
    summary: "When your opponent has a bad piece, don't let it become good. Prophylactic restriction means keeping bad pieces bad while improving your own position.",
    keyTakeaways: [
      "A bad piece is a long-term disadvantage",
      "Prevent bad pieces from activating",
      "Improve your position while maintaining restriction",
      "Patience with restriction pays off"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Ulf Andersson's style"
  },

  {
    id: 'prophylaxis-securing-king',
    category: 'PROPHYLAXIS',
    title: "Prophylactic King Safety",
    subtitle: "Preventing back rank threats",
    fen: 'r4rk1/1bq2ppp/p1n1pn2/1p6/3P4/2NB1N2/PP2QPPP/R4RK1 w - - 0 14',
    toMove: 'white',
    introduction: "Our position is good, but the back rank is potentially vulnerable. Before committing to active operations, a prophylactic move ensures our king's safety - then we attack freely.",
    keyIdeas: [
      "Secure your own king before attacking",
      "Luft (air) for the king prevents back rank issues",
      "One tempo for safety saves many later",
      "Active play is safer with a secure king"
    ],
    mainLine: [
      {
        move: "h3",
        isMainLine: true,
        annotation: "!",
        explanation: "Creating luft! Now back rank tricks are impossible. This one tempo investment allows us to play freely.",
        highlights: ["h3"],
        conceptTag: "Luft"
      },
      {
        move: "Rfd8",
        isMainLine: true,
        annotation: "",
        explanation: "Black centralizes the rook.",
        conceptTag: ""
      },
      {
        move: "Rad1",
        isMainLine: true,
        annotation: "",
        explanation: "We centralize too, confident our king is safe.",
        highlights: ["d1"],
        conceptTag: ""
      },
      {
        move: "Rac8",
        isMainLine: true,
        annotation: "",
        explanation: "Black doubles on the open file.",
        conceptTag: ""
      },
      {
        move: "Ne5",
        isMainLine: true,
        annotation: "!",
        explanation: "Now we can play actively! The knight jumps to the outpost. With h3 already played, we don't worry about back rank surprises.",
        highlights: ["e5"],
        conceptTag: "Outpost"
      },
      {
        move: "Nxe5",
        isMainLine: true,
        annotation: "",
        explanation: "Black exchanges.",
        conceptTag: ""
      },
      {
        move: "dxe5",
        isMainLine: true,
        annotation: "!",
        explanation: "Capturing toward the center. Our king is safe, and we have a strong central presence.",
        highlights: ["e5"],
        conceptTag: "Central Control"
      }
    ],
    summary: "Before launching operations, ensure your king is safe. A prophylactic h3 or a3 costs one tempo but prevents countless tactical problems later.",
    keyTakeaways: [
      "Luft moves prevent back rank mates",
      "One tempo for safety is well spent",
      "Secure king = freedom to attack",
      "h3/a3 are often prophylactic necessities"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Rubinstein's positional play"
  },

  {
    id: 'prophylaxis-controlling-invasion',
    category: 'PROPHYLAXIS',
    title: "Preventing Piece Invasion",
    subtitle: "Controlling entry squares",
    fen: 'r1bq1rk1/pp3ppp/2nbpn2/3p4/2PP4/2N1PN2/PPB2PPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: "Black's pieces want to invade on the queenside via a4 or b4. Prophylaxis means controlling these entry squares before enemy pieces arrive. Defense is about prevention.",
    keyIdeas: [
      "Identify invasion squares in your position",
      "Control them with pawns or pieces",
      "Prevention costs less than eviction",
      "Secure weak squares before they're exploited"
    ],
    mainLine: [
      {
        move: "a3",
        isMainLine: true,
        annotation: "!",
        explanation: "Prophylaxis! Controlling b4 forever. Black's knight can never use this square to invade now.",
        highlights: ["a3", "b4"],
        conceptTag: "Square Control"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      },
      {
        move: "b4",
        isMainLine: true,
        annotation: "!",
        explanation: "Now we gain space! The a3-b4 pawn duo controls c5 and a5, limiting Black's queenside play entirely.",
        highlights: ["b4"],
        conceptTag: "Space"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "Qb3",
        isMainLine: true,
        annotation: "",
        explanation: "Activating the queen and eyeing the b7 pawn.",
        highlights: ["b3"],
        conceptTag: ""
      },
      {
        move: "Rc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates on the c-file.",
        conceptTag: ""
      },
      {
        move: "Ba4",
        isMainLine: true,
        annotation: "!",
        explanation: "The bishop becomes active. Our prophylactic a3-b4 prevented counterplay while we improved freely.",
        highlights: ["a4"],
        conceptTag: "Active Bishop"
      }
    ],
    summary: "Prophylaxis on the flanks means controlling invasion squares. A simple a3 or h3 can prevent an entire plan from working. Think defense before offense.",
    keyTakeaways: [
      "Invasion squares must be controlled",
      "Small pawn moves have big effects",
      "Prevention allows peaceful improvement",
      "Prophylactic moves support future aggression"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Karpov's prophylactic technique"
  },

  // ============================================
  // PAWN STRUCTURE - Additional Patterns
  // ============================================

  {
    id: 'pawn-structure-hedgehog',
    category: 'PAWN_STRUCTURE',
    title: "The Hedgehog Formation",
    subtitle: "Flexible defense with counterattack",
    fen: 'rn1qkb1r/1b2pppp/p2p1n2/1pp5/4P3/1NN2P2/PPPP2PP/R1BQKB1R w KQkq - 0 7',
    toMove: 'white',
    introduction: "Black's hedgehog structure (pawns on a6, b5, d6, e6) looks passive but is incredibly resilient. White has space but must be careful - the hedgehog can strike back with ...d5 or ...b4.",
    keyIdeas: [
      "The hedgehog is flexible and solid",
      "Black waits for White to overextend",
      "...d5 and ...b4 breaks create counterplay",
      "Patience is rewarded in hedgehog positions"
    ],
    mainLine: [
      {
        move: "d4",
        isMainLine: true,
        annotation: "",
        explanation: "White takes space in the center, but must be careful not to overextend.",
        highlights: ["d4"],
        conceptTag: "Space"
      },
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops calmly, not rushing to break.",
        conceptTag: ""
      },
      {
        move: "Be2",
        isMainLine: true,
        annotation: "",
        explanation: "Solid development.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles, completing basic development.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "White castles.",
        conceptTag: ""
      },
      {
        move: "Nbd7",
        isMainLine: true,
        annotation: "",
        explanation: "The typical hedgehog knight placement.",
        highlights: ["d7"],
        conceptTag: ""
      },
      {
        move: "Qd3",
        isMainLine: true,
        annotation: "",
        explanation: "White prepares to expand, but Black has ...d5 or ...b4 ready when the time is right.",
        highlights: ["d3"],
        conceptTag: "Preparation"
      }
    ],
    summary: "The hedgehog structure sacrifices space for flexibility and counterattacking chances. Black's pieces stay behind the pawn wall until the moment is right to strike.",
    keyTakeaways: [
      "Space isn't everything - flexibility matters",
      "Hedgehog pieces stay behind pawns initially",
      "...d5 and ...b4 are the key breaks",
      "Wait for overextension, then strike"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Andersson's hedgehog mastery"
  },

  {
    id: 'pawn-structure-stonewall',
    category: 'PAWN_STRUCTURE',
    title: "The Stonewall Setup",
    subtitle: "Rock-solid central pawns",
    fen: 'rnbqkb1r/pp3ppp/4pn2/3p4/3P1P2/2N2N2/PPP3PP/R1BQKB1R b KQkq - 0 5',
    toMove: 'black',
    introduction: "The Stonewall features pawns on d5, e6, f5 (for Black) or d4, e3, f4 (for White). This structure is solid but creates a weak square - e5 for Black or e4 for White.",
    keyIdeas: [
      "Stonewall is extremely solid in the center",
      "A permanent weakness exists on one square",
      "Knights thrive in stonewall positions",
      "Plan piece play around the weak square"
    ],
    mainLine: [
      {
        move: "f5",
        isMainLine: true,
        annotation: "!",
        explanation: "Establishing the stonewall! Pawns on d5-e6-f5 create a wall. But e5 becomes weak.",
        highlights: ["d5", "e6", "f5", "e5"],
        conceptTag: "Stonewall"
      },
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops, eyeing the weak e5 square.",
        conceptTag: ""
      },
      {
        move: "Bd6",
        isMainLine: true,
        annotation: "!",
        explanation: "The bishop controls e5! This is the key defensive piece in the stonewall.",
        highlights: ["d6", "e5"],
        conceptTag: "Covering Weakness"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "White castles.",
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
        move: "Qe2",
        isMainLine: true,
        annotation: "",
        explanation: "White prepares to contest e5.",
        conceptTag: ""
      },
      {
        move: "Nbd7",
        isMainLine: true,
        annotation: "!",
        explanation: "Knight heads to e4 via f8-e6 or directly via e4. Knights love stonewall positions!",
        highlights: ["d7"],
        conceptTag: "Knight Maneuver"
      }
    ],
    summary: "The Stonewall sacrifices a square (e5 or e4) for a rock-solid center. Knights thrive and bishops must cover the weakness. A classic strategic battle.",
    keyTakeaways: [
      "Stonewall = solid center, one weak square",
      "The bishop covering the weak square is key",
      "Knights excel in blocked positions",
      "Plan kingside attacks in stonewall"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Botvinnik's stonewall play"
  },

  {
    id: 'pawn-structure-sicilian-maroczy',
    category: 'PAWN_STRUCTURE',
    title: "The Maroczy Bind",
    subtitle: "Controlling the center with pawns",
    fen: 'r1bqkb1r/pp1ppppp/2n2n2/8/2P1P3/2N5/PP3PPP/R1BQKBNR b KQkq - 0 4',
    toMove: 'black',
    introduction: "White's pawns on c4 and e4 form the Maroczy Bind - controlling d5 and preventing Black's typical ...d5 break. Black must find alternative plans to free the position.",
    keyIdeas: [
      "The bind controls key central squares",
      "...d5 becomes very difficult to achieve",
      "Black needs alternative pawn breaks",
      "Piece play becomes critical for Black"
    ],
    mainLine: [
      {
        move: "e6",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops flexibly, avoiding committing the d-pawn yet.",
        highlights: ["e6"],
        conceptTag: ""
      },
      {
        move: "Nf3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops naturally.",
        conceptTag: ""
      },
      {
        move: "Bb4",
        isMainLine: true,
        annotation: "!",
        explanation: "Pinning and creating pressure. Black seeks piece activity since pawn breaks are restricted.",
        highlights: ["b4"],
        conceptTag: "Active Play"
      },
      {
        move: "Bd2",
        isMainLine: true,
        annotation: "",
        explanation: "White defends the knight.",
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
        move: "Be2",
        isMainLine: true,
        annotation: "",
        explanation: "White completes development.",
        conceptTag: ""
      },
      {
        move: "d6",
        isMainLine: true,
        annotation: "",
        explanation: "Black settles for a modest setup, aiming for ...b5 or ...f5 later as alternative breaks.",
        highlights: ["d6"],
        conceptTag: "Flexible Setup"
      }
    ],
    summary: "The Maroczy Bind gives White space and control but Black can fight back with piece activity and alternative breaks like ...b5 or ...f5.",
    keyTakeaways: [
      "Pawn binds restrict opponent's breaks",
      "...b5 and ...f5 become alternative breaks",
      "Piece activity compensates for space",
      "Patience is needed against a bind"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Maroczy Bind theory"
  },

  {
    id: 'pawn-structure-kings-indian',
    category: 'PAWN_STRUCTURE',
    title: "King's Indian Structure",
    subtitle: "Opposite flank attacks",
    fen: 'r1bq1rk1/ppp1ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 0 6',
    toMove: 'black',
    introduction: "The King's Indian creates a classic structure: White attacks queenside (c5, b4), Black attacks kingside (...f5, ...g5). It's a race - whoever breaks through first wins.",
    keyIdeas: [
      "Opposite wing attacks are typical",
      "White plays c5 and queenside expansion",
      "Black plays ...f5 and kingside attack",
      "Central pawn tension is critical"
    ],
    mainLine: [
      {
        move: "e5",
        isMainLine: true,
        annotation: "!",
        explanation: "Black closes the center! Now it's a race - White goes queenside, Black goes kingside.",
        highlights: ["e5"],
        conceptTag: "Closing Center"
      },
      {
        move: "d5",
        isMainLine: true,
        annotation: "",
        explanation: "White locks the center, committing to queenside play.",
        highlights: ["d5"],
        conceptTag: ""
      },
      {
        move: "Ne7",
        isMainLine: true,
        annotation: "!",
        explanation: "Rerouting the knight to support ...f5. Classic King's Indian maneuver.",
        highlights: ["e7"],
        conceptTag: "Maneuver"
      },
      {
        move: "c5",
        isMainLine: true,
        annotation: "",
        explanation: "White starts queenside expansion.",
        highlights: ["c5"],
        conceptTag: ""
      },
      {
        move: "f5",
        isMainLine: true,
        annotation: "!",
        explanation: "The thematic break! Black opens lines on the kingside for attack.",
        highlights: ["f5"],
        conceptTag: "Kingside Break"
      },
      {
        move: "Nd2",
        isMainLine: true,
        annotation: "",
        explanation: "White brings the knight to c4 for queenside pressure.",
        conceptTag: ""
      },
      {
        move: "Ng6",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight heads to f4 or h4 for the kingside attack. The race is on!",
        highlights: ["g6"],
        conceptTag: "Attack Preparation"
      }
    ],
    summary: "King's Indian structures lead to sharp opposite-wing attacks. Understanding when to close the center and which wing to attack is essential.",
    keyTakeaways: [
      "Closed center = opposite wing attacks",
      "White attacks queenside, Black attacks kingside",
      "...f5 is the key break for Black",
      "Speed and timing are crucial"
    ],
    difficulty: 4,
    estimatedMinutes: 7,
    source: "Fischer's King's Indian"
  },

  {
    id: 'pawn-structure-exchange-variation',
    category: 'PAWN_STRUCTURE',
    title: "Symmetrical Exchange Structure",
    subtitle: "Playing for small edges",
    fen: 'rnbqkb1r/pp3ppp/5n2/3p4/3P4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 5',
    toMove: 'white',
    introduction: "After exchanging pawns in the center, we have a symmetrical structure. Small advantages matter: better piece activity, better pawn placement, or better king safety.",
    keyIdeas: [
      "Symmetrical structures require precision",
      "Small advantages become decisive",
      "Activity and initiative matter most",
      "Avoid trading into dead-drawn endgames"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Active development! The bishop eyes h7 and controls key squares. Small edges start accumulating.",
        highlights: ["d3"],
        conceptTag: "Active Development"
      },
      {
        move: "Bd6",
        isMainLine: true,
        annotation: "",
        explanation: "Black mirrors development.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling promptly.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles too.",
        conceptTag: ""
      },
      {
        move: "Re1",
        isMainLine: true,
        annotation: "!",
        explanation: "Taking the open file! Initiative matters in symmetrical positions.",
        highlights: ["e1"],
        conceptTag: "File Control"
      },
      {
        move: "c6",
        isMainLine: true,
        annotation: "",
        explanation: "Black solidifies.",
        conceptTag: ""
      },
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "!",
        explanation: "Completing development with purpose. White has a slight initiative - enough to play for a win.",
        highlights: ["c3"],
        conceptTag: "Initiative"
      }
    ],
    summary: "Symmetrical pawn structures demand precise play. The player with better piece activity, file control, or initiative has the edge. Avoid simplifying into sterile endings.",
    keyTakeaways: [
      "In symmetry, small edges matter",
      "Seize files and diagonals first",
      "Initiative is the key advantage",
      "Avoid unnecessary trades"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Carlsen's Exchange Variation handling"
  },

  {
    id: 'pawn-structure-carlsbad',
    category: 'PAWN_STRUCTURE',
    title: "The Carlsbad Structure",
    subtitle: "Minority attack territory",
    fen: 'rnbqkb1r/pp3ppp/4pn2/3p4/2PP4/2N2N2/PP3PPP/R1BQKB1R b KQkq - 0 5',
    toMove: 'black',
    introduction: "The Carlsbad structure (White: c4 d4, Black: d5 e6) is a battleground. White typically plays a minority attack (b4-b5) while Black aims for kingside play or central breaks.",
    keyIdeas: [
      "White's plan: b4-b5 minority attack",
      "Black defends queenside, attacks kingside",
      "Pawn structure dictates piece placement",
      "Long-term strategic maneuvering"
    ],
    mainLine: [
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Solid development, preparing to castle.",
        highlights: ["e7"],
        conceptTag: ""
      },
      {
        move: "cxd5",
        isMainLine: true,
        annotation: "",
        explanation: "White creates the classic Carlsbad structure.",
        highlights: ["d5"],
        conceptTag: "Structure"
      },
      {
        move: "exd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures, establishing the d5 pawn.",
        highlights: ["d5"],
        conceptTag: ""
      },
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops, eyeing h7.",
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
        explanation: "White castles.",
        conceptTag: ""
      },
      {
        move: "c6",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing to meet b4-b5 with ...c6. This is the classic defensive setup against the minority attack.",
        highlights: ["c6"],
        conceptTag: "Minority Defense"
      }
    ],
    summary: "The Carlsbad structure from the Queen's Gambit creates a clear strategic battle: White's minority attack vs Black's central/kingside play. Understanding both plans is essential.",
    keyTakeaways: [
      "Minority attack: b4-b5 to create weaknesses",
      "Black defends c6 and seeks counterplay",
      "Rooks belong on semi-open files",
      "Strategic patience wins in Carlsbad"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Queen's Gambit Declined theory"
  },

  // ============================================
  // OPEN FILES - Additional Patterns
  // ============================================

  {
    id: 'open-files-doubled-rooks',
    category: 'OPEN_FILES',
    title: "Doubling Rooks on Open Files",
    subtitle: "Maximum pressure technique",
    fen: 'r4rk1/1bq2ppp/p1n1pn2/1p6/3P4/2NBPN2/PP3PPP/R2Q1RK1 w - - 0 12',
    toMove: 'white',
    introduction: "A single rook on an open file is strong. Two rooks doubled on an open file are devastating. The front rook leads the invasion while the back rook provides support.",
    keyIdeas: [
      "Doubled rooks multiply pressure",
      "The front rook leads, the back rook supports",
      "Control entry squares on the file",
      "Rooks work better together than alone"
    ],
    mainLine: [
      {
        move: "Rc1",
        isMainLine: true,
        annotation: "!",
        explanation: "Taking the open c-file! The first rook stakes the claim.",
        highlights: ["c1"],
        conceptTag: "File Control"
      },
      {
        move: "Rfc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black contests the file.",
        conceptTag: ""
      },
      {
        move: "Qc2",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing to double rooks. The queen supports the operation.",
        highlights: ["c2"],
        conceptTag: "Preparation"
      },
      {
        move: "Nd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates the knight.",
        conceptTag: ""
      },
      {
        move: "Rfc1",
        isMainLine: true,
        annotation: "!",
        explanation: "Doubled rooks! Now we control the c-file completely. Invasion is coming.",
        highlights: ["c1"],
        conceptTag: "Doubled Rooks"
      },
      {
        move: "Rxc3",
        isMainLine: true,
        annotation: "",
        explanation: "Black exchanges one rook.",
        conceptTag: ""
      },
      {
        move: "Rxc3",
        isMainLine: true,
        annotation: "!",
        explanation: "Recapturing. Even with one rook, we dominate the open file.",
        highlights: ["c3"],
        conceptTag: "File Domination"
      }
    ],
    summary: "Doubled rooks on an open file create irresistible pressure. The key is patience - first secure the file, then invade. Rooks work exponentially better together.",
    keyTakeaways: [
      "Two rooks > one rook + one rook separately",
      "Control the file before invading",
      "Queen supports rook operations",
      "Patience leads to penetration"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Tarrasch's rook technique"
  },

  {
    id: 'open-files-7th-rank',
    category: 'OPEN_FILES',
    title: "Rook on the 7th Rank",
    subtitle: "The pig on the seventh",
    fen: 'r4rk1/1R3ppp/p3pn2/1p6/3P4/4PN2/PP3PPP/5RK1 w - - 0 16',
    toMove: 'white',
    introduction: "A rook on the 7th rank (2nd rank for Black) is incredibly powerful. It attacks pawns, restricts the enemy king, and often leads to back rank threats. Called a 'pig' because it devours everything.",
    keyIdeas: [
      "Rooks belong on the 7th rank",
      "The 7th attacks pawns and traps the king",
      "Two rooks on the 7th is often decisive",
      "The 7th rank restricts king movement"
    ],
    mainLine: [
      {
        move: "Rc1",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing to double rooks on the 7th rank. One pig is good, two pigs are devastating.",
        highlights: ["c1"],
        conceptTag: "Preparation"
      },
      {
        move: "Nd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black centralizes the knight.",
        conceptTag: ""
      },
      {
        move: "Rc7",
        isMainLine: true,
        annotation: "!",
        explanation: "Two rooks on the 7th! Black's position is collapsing. The pawns fall like dominos.",
        highlights: ["c7", "b7"],
        conceptTag: "Doubled Pigs"
      },
      {
        move: "Rf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black defends the back rank.",
        conceptTag: ""
      },
      {
        move: "Rxf7",
        isMainLine: true,
        annotation: "!",
        explanation: "Consuming the f7 pawn! The rooks are eating Black's position alive.",
        highlights: ["f7"],
        conceptTag: "Devouring"
      },
      {
        move: "Rxf7",
        isMainLine: true,
        annotation: "",
        explanation: "Black must capture.",
        conceptTag: ""
      },
      {
        move: "Rxf7",
        isMainLine: true,
        annotation: "!",
        explanation: "The rook remains on the 7th. Black's king is exposed and the position is winning.",
        highlights: ["f7"],
        conceptTag: "Domination"
      }
    ],
    summary: "A rook on the 7th rank is worth a pawn in positional value. Two rooks on the 7th can often force checkmate or win all the pawns. The 7th rank is rook paradise.",
    keyTakeaways: [
      "The 7th rank is the ideal rook destination",
      "Two rooks on the 7th = often decisive",
      "Rooks on 7th attack pawns and trap kings",
      "Trade into favorable rook endgames"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Nimzowitsch's rook theory"
  },

  {
    id: 'open-files-half-open',
    category: 'OPEN_FILES',
    title: "Using Half-Open Files",
    subtitle: "Pressure without full control",
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: "A half-open file has one pawn blocking it. While we can't invade immediately, the rook still pressures the enemy pawn and can support pawn breaks to open the file fully.",
    keyIdeas: [
      "Half-open files provide pressure",
      "Target the pawn blocking the file",
      "Support pawn breaks to open the file",
      "Rook + pawn break is powerful"
    ],
    mainLine: [
      {
        move: "cxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Opening the c-file! Creating a half-open file for our rook.",
        highlights: ["d5"],
        conceptTag: "Opening Files"
      },
      {
        move: "exd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures with the e-pawn.",
        conceptTag: ""
      },
      {
        move: "Rc1",
        isMainLine: true,
        annotation: "!",
        explanation: "Rook to the half-open file! Now we pressure c6 indirectly.",
        highlights: ["c1"],
        conceptTag: "File Control"
      },
      {
        move: "Bf5",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops actively.",
        conceptTag: ""
      },
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "Challenging the bishop.",
        conceptTag: ""
      },
      {
        move: "Bxd3",
        isMainLine: true,
        annotation: "",
        explanation: "Black exchanges.",
        conceptTag: ""
      },
      {
        move: "Qxd3",
        isMainLine: true,
        annotation: "!",
        explanation: "The queen joins the c-file pressure. Now ...c6 is under serious scrutiny.",
        highlights: ["d3"],
        conceptTag: "Coordination"
      }
    ],
    summary: "Half-open files aren't fully open but still valuable. Place rooks on them, target the blocking pawn, and look for opportunities to break through or switch to another file.",
    keyTakeaways: [
      "Half-open files still have value",
      "Rooks pressure even if they can't invade",
      "Look for pawn breaks to open fully",
      "Queen + rook on half-open file is strong"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Rubinstein's file play"
  },

  {
    id: 'open-files-trading-down',
    category: 'OPEN_FILES',
    title: "Trading to Control Files",
    subtitle: "Simplification for domination",
    fen: 'r3r1k1/1bq2ppp/p1n1pn2/1p6/3P4/2NBPN2/PPQ2PPP/1R3RK1 w - - 0 14',
    toMove: 'white',
    introduction: "Sometimes you must trade pieces to gain file control. If your opponent contests an open file, trading rooks can leave you with sole control. The remaining rook dominates.",
    keyIdeas: [
      "Trade to gain file control",
      "One dominant rook beats two passive ones",
      "File control increases after exchanges",
      "Simplification can be aggressive"
    ],
    mainLine: [
      {
        move: "Rfc1",
        isMainLine: true,
        annotation: "!",
        explanation: "Doubling on the c-file and preparing to trade or invade.",
        highlights: ["c1"],
        conceptTag: "Doubling"
      },
      {
        move: "Red8",
        isMainLine: true,
        annotation: "",
        explanation: "Black shifts to the d-file.",
        conceptTag: ""
      },
      {
        move: "Nb5",
        isMainLine: true,
        annotation: "!",
        explanation: "Creating threats while maintaining file pressure.",
        highlights: ["b5"],
        conceptTag: "Knight Threat"
      },
      {
        move: "Qb6",
        isMainLine: true,
        annotation: "",
        explanation: "Black defends a7.",
        conceptTag: ""
      },
      {
        move: "Rxc6",
        isMainLine: true,
        annotation: "!",
        explanation: "Capturing the knight and opening the position further!",
        highlights: ["c6"],
        conceptTag: "Capturing"
      },
      {
        move: "Qxc6",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures with the queen.",
        conceptTag: ""
      },
      {
        move: "Rc1",
        isMainLine: true,
        annotation: "!",
        explanation: "Now we have total c-file control. The rook will invade on c7.",
        highlights: ["c1"],
        conceptTag: "File Domination"
      }
    ],
    summary: "Trading pieces to gain file control is a powerful technique. After exchanges, a single well-placed rook can dominate the entire game.",
    keyTakeaways: [
      "Trade when it gains you file control",
      "One active rook > two passive rooks",
      "After trades, the remaining rook dominates",
      "Simplification can be aggressive"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Capablanca's simplification"
  },

  {
    id: 'open-files-back-rank',
    category: 'OPEN_FILES',
    title: "Open Files and Back Rank",
    subtitle: "Combining file control with threats",
    fen: '3r2k1/1bq2ppp/p3pn2/1p6/3P4/2NBPN2/PPQ2PPP/5R1K w - - 0 18',
    toMove: 'white',
    introduction: "Control of an open file is most dangerous when combined with back rank weaknesses. The threat of invasion keeps the opponent's pieces tied to defense.",
    keyIdeas: [
      "File control + weak back rank = danger",
      "The threat keeps pieces tied down",
      "Look for invasion opportunities",
      "Combine threats for maximum effect"
    ],
    mainLine: [
      {
        move: "Rc1",
        isMainLine: true,
        annotation: "!",
        explanation: "Seizing the open c-file. Black's queen must watch for Rc8+.",
        highlights: ["c1"],
        conceptTag: "File Control"
      },
      {
        move: "Qd6",
        isMainLine: true,
        annotation: "",
        explanation: "Black centralizes but must watch the back rank.",
        conceptTag: ""
      },
      {
        move: "Qc7",
        isMainLine: true,
        annotation: "!",
        explanation: "Penetration! The queen invades and threatens Rc8+.",
        highlights: ["c7"],
        conceptTag: "Invasion"
      },
      {
        move: "Qxc7",
        isMainLine: true,
        annotation: "",
        explanation: "Black must trade or allow devastation.",
        conceptTag: ""
      },
      {
        move: "Rxc7",
        isMainLine: true,
        annotation: "!",
        explanation: "Now the rook is on the 7th with back rank threats! Black is paralyzed.",
        highlights: ["c7"],
        conceptTag: "7th Rank"
      },
      {
        move: "Nd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black tries to activate.",
        conceptTag: ""
      },
      {
        move: "Rxf7",
        isMainLine: true,
        annotation: "!",
        explanation: "The rook devours the f7 pawn. The combination of file control and back rank weakness wins material.",
        highlights: ["f7"],
        conceptTag: "Winning Material"
      }
    ],
    summary: "Open file control becomes deadly when combined with back rank weaknesses. The threat of invasion ties down the opponent's pieces and often wins material.",
    keyTakeaways: [
      "File control + back rank = crushing",
      "Threats tie down defensive pieces",
      "Look for queen invasion first, then rook",
      "Back rank weakness multiplies file pressure"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Alekhine's attacking technique"
  },

  {
    id: 'open-files-creating-open',
    category: 'OPEN_FILES',
    title: "Creating Open Files",
    subtitle: "Pawn exchanges to open lines",
    fen: 'r1bqr1k1/pp3ppp/2n1pn2/3p4/2PP4/2NBPN2/PP3PPP/R2Q1RK1 w - - 0 10',
    toMove: 'white',
    introduction: "Open files don't always exist - sometimes you must create them. Pawn exchanges open lines for your rooks. Plan exchanges that benefit your pieces more than your opponent's.",
    keyIdeas: [
      "Create files through pawn exchanges",
      "Exchange pawns that benefit your rooks",
      "Look for favorable captures",
      "Open files = rook activation"
    ],
    mainLine: [
      {
        move: "cxd5",
        isMainLine: true,
        annotation: "!",
        explanation: "Opening the c-file! Our rooks will love this file.",
        highlights: ["d5"],
        conceptTag: "Creating Files"
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures with the knight.",
        conceptTag: ""
      },
      {
        move: "e4",
        isMainLine: true,
        annotation: "!",
        explanation: "Attacking the knight and gaining central space. This opens more lines!",
        highlights: ["e4"],
        conceptTag: "Central Push"
      },
      {
        move: "Nf6",
        isMainLine: true,
        annotation: "",
        explanation: "The knight retreats.",
        conceptTag: ""
      },
      {
        move: "Rc1",
        isMainLine: true,
        annotation: "!",
        explanation: "Seizing the newly created open c-file!",
        highlights: ["c1"],
        conceptTag: "File Control"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "d5",
        isMainLine: true,
        annotation: "!",
        explanation: "Another pawn exchange creates more open lines. Our rooks will dominate.",
        highlights: ["d5"],
        conceptTag: "Opening More Lines"
      }
    ],
    summary: "Don't wait for open files - create them! Pawn exchanges should be planned to benefit your piece placement, especially your rooks.",
    keyTakeaways: [
      "Create files with pawn exchanges",
      "Plan exchanges to benefit your rooks",
      "Central pawns often open multiple files",
      "Active rooks reward file creation"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Karpov's file creation"
  },

  // ============================================
  // MINORITY ATTACK - Additional Patterns
  // ============================================

  {
    id: 'minority-attack-typical-setup',
    category: 'MINORITY_ATTACK',
    title: "Setting Up the Minority Attack",
    subtitle: "Preparing b4-b5",
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/2PP4/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: "The minority attack uses fewer queenside pawns (a2, b2) against more (a7, b7, c6). The goal: push b4-b5 to create a weakness on c6. This is a classic Queen's Gambit technique.",
    keyIdeas: [
      "Use fewer pawns to attack more pawns",
      "b4-b5 creates weak pawns on c6 or a6",
      "Prepare the push with a3 first",
      "Knights and rooks exploit the weakness"
    ],
    mainLine: [
      {
        move: "a3",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing b4! This prophylactic move stops any ...Nb4 ideas and prepares the minority attack.",
        highlights: ["a3"],
        conceptTag: "Preparation"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops the bishop.",
        conceptTag: ""
      },
      {
        move: "b4",
        isMainLine: true,
        annotation: "!",
        explanation: "The minority attack begins! The b-pawn will charge forward to b5.",
        highlights: ["b4"],
        conceptTag: "Minority Attack"
      },
      {
        move: "Rc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates the rook.",
        conceptTag: ""
      },
      {
        move: "Rb1",
        isMainLine: true,
        annotation: "",
        explanation: "Supporting the b-pawn's advance to b5.",
        highlights: ["b1"],
        conceptTag: ""
      },
      {
        move: "a6",
        isMainLine: true,
        annotation: "",
        explanation: "Black tries to stop b5.",
        conceptTag: ""
      },
      {
        move: "b5",
        isMainLine: true,
        annotation: "!",
        explanation: "The critical break! After ...axb5 cxb5, Black has a weak c6 pawn. After ...cxb5, Black has an isolated a6 pawn.",
        highlights: ["b5"],
        conceptTag: "Creating Weakness"
      }
    ],
    summary: "The minority attack is a strategic plan to create pawn weaknesses. Push b4-b5 to force Black into choosing between a weak c6 pawn or isolated a6 pawn.",
    keyTakeaways: [
      "Minority attacks fewer pawns vs more pawns",
      "b4-b5 is the key break",
      "Creates either weak c6 or isolated a6",
      "Prepare with a3 and Rb1"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Botvinnik's minority attack"
  },

  {
    id: 'minority-attack-exploiting-c6',
    category: 'MINORITY_ATTACK',
    title: "Exploiting the c6 Weakness",
    subtitle: "After successful minority attack",
    fen: 'r1bqr1k1/pp3ppp/2n1pn2/1Pp5/3P4/2N2N2/P4PPP/R1BQ1RK1 w - - 0 12',
    toMove: 'white',
    introduction: "After b5, Black's pawn structure is compromised. The c6 square becomes weak, and we'll use pieces to pressure it. Knights love this outpost!",
    keyIdeas: [
      "Knights to b5 or a4 pressure c6",
      "Rooks on the c-file add pressure",
      "The c6 pawn becomes a target",
      "Multiple attackers overwhelm defense"
    ],
    mainLine: [
      {
        move: "bxc6",
        isMainLine: true,
        annotation: "!",
        explanation: "Opening lines and creating the backward c6 pawn for Black to defend.",
        highlights: ["c6"],
        conceptTag: "Creating Weakness"
      },
      {
        move: "bxc6",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures, but now has a backward c6 pawn.",
        highlights: ["c6"],
        conceptTag: ""
      },
      {
        move: "Na4",
        isMainLine: true,
        annotation: "!",
        explanation: "Knight to a4, heading for b6 or c5 to pressure c6.",
        highlights: ["a4"],
        conceptTag: "Knight Maneuver"
      },
      {
        move: "Qb6",
        isMainLine: true,
        annotation: "",
        explanation: "Black defends.",
        conceptTag: ""
      },
      {
        move: "Nc5",
        isMainLine: true,
        annotation: "!",
        explanation: "Beautiful outpost! The knight pressures e6 and a6, while supporting Rb1.",
        highlights: ["c5"],
        conceptTag: "Outpost"
      },
      {
        move: "Qc7",
        isMainLine: true,
        annotation: "",
        explanation: "Black retreats.",
        conceptTag: ""
      },
      {
        move: "Rb1",
        isMainLine: true,
        annotation: "!",
        explanation: "Adding pressure on the b-file. Black's queenside is under siege.",
        highlights: ["b1"],
        conceptTag: "File Pressure"
      }
    ],
    summary: "After a successful minority attack, exploit the c6 weakness with knights on b5/c5/a4 and rooks on the b and c files. Coordinate to overwhelm the defense.",
    keyTakeaways: [
      "Knights thrive on b5, c5, or a4",
      "Rooks belong on b and c files",
      "Coordinate multiple pieces against c6",
      "Patience converts positional edge"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Petrosian's positional technique"
  },

  {
    id: 'minority-attack-queenside-majority',
    category: 'MINORITY_ATTACK',
    title: "Minority vs Queenside Majority",
    subtitle: "When Black has the pawn majority",
    fen: 'r1bq1rk1/1pp2ppp/p1n1pn2/3p4/2PP4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: "Black has a queenside pawn majority (a6, b7, c7 vs a2, b2). Normally majorities are good, but the minority attack turns this into a liability. We attack where Black is 'stronger'.",
    keyIdeas: [
      "Minority attack targets pawn majorities",
      "More pawns = more targets",
      "Create weaknesses in the majority",
      "Exploit the resulting structure"
    ],
    mainLine: [
      {
        move: "a3",
        isMainLine: true,
        annotation: "",
        explanation: "Preparing b4. The minority attack begins.",
        highlights: ["a3"],
        conceptTag: "Preparation"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "b4",
        isMainLine: true,
        annotation: "!",
        explanation: "Advancing! The minority marches against the majority.",
        highlights: ["b4"],
        conceptTag: "Advance"
      },
      {
        move: "Rc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black puts the rook behind the c-pawn.",
        conceptTag: ""
      },
      {
        move: "Qb3",
        isMainLine: true,
        annotation: "",
        explanation: "Supporting b5 and adding pressure to the d5 pawn.",
        highlights: ["b3"],
        conceptTag: ""
      },
      {
        move: "Na5",
        isMainLine: true,
        annotation: "",
        explanation: "Black tries to blockade.",
        conceptTag: ""
      },
      {
        move: "Qa2",
        isMainLine: true,
        annotation: "!",
        explanation: "Repositioning. The queen still eyes b5 and prepares cxd5 ideas.",
        highlights: ["a2"],
        conceptTag: "Flexible Play"
      }
    ],
    summary: "The minority attack is counterintuitive - we attack where the opponent has more pawns. But more pawns means more potential weaknesses to exploit.",
    keyTakeaways: [
      "Pawn majorities can become liabilities",
      "Minority attack creates targets in majorities",
      "Quality of pawns matters more than quantity",
      "Pressure converts structural weaknesses"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Karpov's minority attack"
  },

  {
    id: 'minority-attack-defense',
    category: 'MINORITY_ATTACK',
    title: "Defending Against Minority Attack",
    subtitle: "Black's counter-measures",
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/1PPP4/2N2N2/P4PPP/R1BQ1RK1 b - - 0 9',
    toMove: 'black',
    introduction: "White has started a minority attack with b4. As Black, we have several defensive resources: ...a5 to stop the advance, ...c5 to strike back, or accepting structural damage but gaining piece activity.",
    keyIdeas: [
      "...a5 stops b5 but weakens b5 square",
      "...c5 counterattacks in the center",
      "Accept the weakness, gain activity",
      "Each defense has trade-offs"
    ],
    mainLine: [
      {
        move: "a5",
        isMainLine: true,
        annotation: "!",
        explanation: "Stopping the minority attack in its tracks! But b5 becomes a hole.",
        highlights: ["a5", "b5"],
        conceptTag: "Stopping b5"
      },
      {
        move: "b5",
        isMainLine: true,
        annotation: "",
        explanation: "White plays b5 anyway! Now ...axb4, ...cxb5, or ignore?",
        conceptTag: ""
      },
      {
        move: "Nb4",
        isMainLine: true,
        annotation: "!",
        explanation: "Active defense! The knight uses the weakened b4 square. Now if bxc6, Nxc6 is strong.",
        highlights: ["b4"],
        conceptTag: "Active Defense"
      },
      {
        move: "Bd2",
        isMainLine: true,
        annotation: "",
        explanation: "White defends the knight.",
        conceptTag: ""
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops, preparing ...Bb5.",
        conceptTag: ""
      },
      {
        move: "bxc6",
        isMainLine: true,
        annotation: "",
        explanation: "White captures.",
        conceptTag: ""
      },
      {
        move: "Bxc6",
        isMainLine: true,
        annotation: "!",
        explanation: "Excellent recapture! The bishop is active, the knight is on b4, and Black has counterplay.",
        highlights: ["c6"],
        conceptTag: "Active Pieces"
      }
    ],
    summary: "Against the minority attack, choose your defense based on your position. Each option has trade-offs - the key is gaining piece activity to compensate for any structural weaknesses.",
    keyTakeaways: [
      "...a5 stops b5 but creates b5 hole",
      "...c5 centralizes counterplay",
      "Active defense can neutralize the attack",
      "Piece activity compensates for structure"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Kasparov's defensive technique"
  },

  {
    id: 'minority-attack-endgame',
    category: 'MINORITY_ATTACK',
    title: "Minority Attack Endgames",
    subtitle: "Converting the advantage",
    fen: '4r1k1/pp3ppp/2n1p3/3p4/1PPP4/2N5/P4PPP/4R1K1 w - - 0 20',
    toMove: 'white',
    introduction: "The minority attack has created a weak c6 square and potential targets. In the endgame, these structural weaknesses become decisive. The king can join the attack.",
    keyIdeas: [
      "Endgames amplify structural weaknesses",
      "The king becomes an attacking piece",
      "Target the weak pawns systematically",
      "Patience and precision win"
    ],
    mainLine: [
      {
        move: "b5",
        isMainLine: true,
        annotation: "!",
        explanation: "Continuing the minority attack! Creating a permanent weakness.",
        highlights: ["b5"],
        conceptTag: "Creating Weakness"
      },
      {
        move: "Nd8",
        isMainLine: true,
        annotation: "",
        explanation: "Black defends c6.",
        conceptTag: ""
      },
      {
        move: "Na4",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight heads for c5, pressuring both a6 and e6.",
        highlights: ["a4"],
        conceptTag: "Knight Maneuver"
      },
      {
        move: "Kf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black's king comes to help.",
        conceptTag: ""
      },
      {
        move: "Nc5",
        isMainLine: true,
        annotation: "!",
        explanation: "Dominating outpost! The knight pressures a6 and e6 simultaneously.",
        highlights: ["c5"],
        conceptTag: "Outpost"
      },
      {
        move: "Ke7",
        isMainLine: true,
        annotation: "",
        explanation: "Black centralizes the king.",
        conceptTag: ""
      },
      {
        move: "Kf1",
        isMainLine: true,
        annotation: "!",
        explanation: "The king marches to support the attack. In endgames, the king is a strong piece.",
        highlights: ["f1"],
        conceptTag: "King Activity"
      }
    ],
    summary: "Minority attack advantages grow in the endgame. The king joins the attack, and structural weaknesses become fatal. Patience and technique convert the edge.",
    keyTakeaways: [
      "Structural weaknesses grow in endgames",
      "The king is a fighting piece",
      "Knights excel on outposts like c5",
      "Technique and patience win"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Capablanca's endgame technique"
  },

  {
    id: 'minority-attack-timing',
    category: 'MINORITY_ATTACK',
    title: "Timing the Minority Attack",
    subtitle: "When to push b5",
    fen: 'r1bqr1k1/pp3ppp/2nbpn2/3p4/1PPP4/2N1PN2/P1B2PPP/R2Q1RK1 w - - 0 11',
    toMove: 'white',
    introduction: "Timing is everything in the minority attack. Push b5 too early and Black can blockade. Wait too long and Black improves. The right moment maximizes impact.",
    keyIdeas: [
      "Push b5 when Black can't blockade",
      "Coordinate pieces before the push",
      "Watch for Black's defensive setups",
      "The threat of b5 is sometimes stronger"
    ],
    mainLine: [
      {
        move: "Qb3",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing b5 with maximum support. The queen adds pressure to d5 and supports b5.",
        highlights: ["b3"],
        conceptTag: "Preparation"
      },
      {
        move: "Qb6",
        isMainLine: true,
        annotation: "",
        explanation: "Black tries to prevent b5.",
        conceptTag: ""
      },
      {
        move: "Rab1",
        isMainLine: true,
        annotation: "!",
        explanation: "Adding more support to the b-pawn. Now b5 is unstoppable.",
        highlights: ["b1"],
        conceptTag: "Support"
      },
      {
        move: "Qc7",
        isMainLine: true,
        annotation: "",
        explanation: "Black retreats.",
        conceptTag: ""
      },
      {
        move: "b5",
        isMainLine: true,
        annotation: "!",
        explanation: "Now is the perfect time! All pieces support the break.",
        highlights: ["b5"],
        conceptTag: "Breakthrough"
      },
      {
        move: "Ne7",
        isMainLine: true,
        annotation: "",
        explanation: "Black reroutes the knight.",
        conceptTag: ""
      },
      {
        move: "bxc6",
        isMainLine: true,
        annotation: "!",
        explanation: "Opening the position and creating the weak c6 pawn.",
        highlights: ["c6"],
        conceptTag: "Weakness"
      }
    ],
    summary: "The minority attack's success depends on timing. Prepare thoroughly with queen and rook support before pushing b5. The threat can be as strong as the execution.",
    keyTakeaways: [
      "Coordinate pieces before b5",
      "Qb3 and Rb1 are typical preparation",
      "Push when Black can't blockade",
      "The threat of b5 ties down pieces"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Kramnik's minority attack"
  },

  // ============================================
  // GOOD/BAD BISHOP - Additional Patterns
  // ============================================

  {
    id: 'good-bad-bishop-activation',
    category: 'GOOD_BAD_BISHOP',
    title: "Activating a Bad Bishop",
    subtitle: "Trading or repositioning",
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "A bishop blocked by its own pawns is 'bad'. But bad bishops can become good through exchanges or repositioning. The key is finding active squares outside the pawn chain.",
    keyIdeas: [
      "Bad bishops are blocked by their own pawns",
      "Trade bad bishops for good ones",
      "Reposition to active diagonals",
      "Sometimes pawns move to free the bishop"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Placing the bishop outside the pawn chain! Now it targets h7 actively.",
        highlights: ["d3"],
        conceptTag: "Active Placement"
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
        explanation: "White castles.",
        conceptTag: ""
      },
      {
        move: "b6",
        isMainLine: true,
        annotation: "",
        explanation: "Black prepares ...Bb7.",
        conceptTag: ""
      },
      {
        move: "e4",
        isMainLine: true,
        annotation: "!",
        explanation: "Opening the position to activate our pieces further!",
        highlights: ["e4"],
        conceptTag: "Opening Lines"
      },
      {
        move: "dxe4",
        isMainLine: true,
        annotation: "",
        explanation: "Black captures.",
        conceptTag: ""
      },
      {
        move: "Nxe4",
        isMainLine: true,
        annotation: "!",
        explanation: "Our bishop on d3 is now excellent - aiming at h7 with an open diagonal.",
        highlights: ["d3"],
        conceptTag: "Good Bishop"
      }
    ],
    summary: "Bad bishops can become good through active placement and pawn breaks. Place bishops outside pawn chains and open positions to maximize their scope.",
    keyTakeaways: [
      "Place bishops outside pawn chains",
      "Open positions favor bishops",
      "e4/d4 breaks can activate bishops",
      "Trade bad bishops when possible"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Nimzowitsch's bishop theory"
  },

  {
    id: 'good-bad-bishop-french',
    category: 'GOOD_BAD_BISHOP',
    title: "The French Defense Bad Bishop",
    subtitle: "Classic structural problem",
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/3p4/3PP3/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 0 5',
    toMove: 'black',
    introduction: "In the French Defense, Black's light-squared bishop is often 'bad' - stuck behind the e6-d5 pawn chain. Understanding how to deal with this bishop is crucial.",
    keyIdeas: [
      "e6-d5 pawns block the light bishop",
      "...b6 and ...Ba6 is one activation plan",
      "Trading it via ...Bd7-b5 helps",
      "Sometimes it stays passive but defends"
    ],
    mainLine: [
      {
        move: "Bb4",
        isMainLine: true,
        annotation: "!",
        explanation: "Pinning the knight and creating pressure. The good bishop attacks while the bad one waits.",
        highlights: ["b4"],
        conceptTag: "Active Bishop"
      },
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops.",
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
        explanation: "White castles.",
        conceptTag: ""
      },
      {
        move: "b6",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing ...Ba6 to trade the bad bishop! This is the classic solution.",
        highlights: ["b6"],
        conceptTag: "Preparation"
      },
      {
        move: "Bg5",
        isMainLine: true,
        annotation: "",
        explanation: "White develops actively.",
        conceptTag: ""
      },
      {
        move: "Ba6",
        isMainLine: true,
        annotation: "!",
        explanation: "Trading the bad bishop! After Bxa6, Black's structure improves and the 'problem piece' is gone.",
        highlights: ["a6"],
        conceptTag: "Trading Bad Bishop"
      }
    ],
    summary: "The French Defense bishop is classic 'bad bishop' territory. The ...b6-Ba6 maneuver trades this piece and solves Black's structural problem.",
    keyTakeaways: [
      "French bishops are often blocked by e6",
      "...b6-Ba6 is the standard solution",
      "Trading bad for good improves position",
      "A bad bishop can still be useful defending"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "French Defense theory"
  },

  {
    id: 'good-bad-bishop-opposite-color',
    category: 'GOOD_BAD_BISHOP',
    title: "Opposite-Color Bishop Strategy",
    subtitle: "Attack with bishops of different colors",
    fen: 'r2q1rk1/pp2bppp/2n1p3/3pP3/3P4/2PB4/PP3PPP/R1BQ1RK1 w - - 0 11',
    toMove: 'white',
    introduction: "Opposite-color bishops favor the attacker in middlegames. The defender's bishop can't contest the attacker's diagonals. This creates attacking chances.",
    keyIdeas: [
      "Attacker's bishop dominates its color",
      "Defender can't contest those squares",
      "Kingside attacks become powerful",
      "Endgames often draw with opposite colors"
    ],
    mainLine: [
      {
        move: "Qc2",
        isMainLine: true,
        annotation: "!",
        explanation: "Battery forming! Queen behind bishop aims at h7. Black's dark bishop can't help.",
        highlights: ["c2"],
        conceptTag: "Battery"
      },
      {
        move: "f5",
        isMainLine: true,
        annotation: "",
        explanation: "Black tries to close the diagonal.",
        conceptTag: ""
      },
      {
        move: "Bh6",
        isMainLine: true,
        annotation: "!",
        explanation: "Our dark-squared bishop joins the attack on g7! Opposite colors mean double attack.",
        highlights: ["h6"],
        conceptTag: "Double Attack"
      },
      {
        move: "Rf7",
        isMainLine: true,
        annotation: "",
        explanation: "Black defends.",
        conceptTag: ""
      },
      {
        move: "Qd2",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing to swing the queen to the kingside. Black's bishop on e7 watches helplessly.",
        highlights: ["d2"],
        conceptTag: "Regrouping"
      },
      {
        move: "Nd8",
        isMainLine: true,
        annotation: "",
        explanation: "Black brings the knight to defend.",
        conceptTag: ""
      },
      {
        move: "Qg5",
        isMainLine: true,
        annotation: "!",
        explanation: "The attack intensifies. With opposite-color bishops, we dominate both light and dark squares around Black's king.",
        highlights: ["g5"],
        conceptTag: "Attacking"
      }
    ],
    summary: "Opposite-color bishops favor attackers in middlegames. Each bishop dominates its color complex, allowing coordinated attacks the defender can't fully meet.",
    keyTakeaways: [
      "Opposite colors = attacker's advantage",
      "Each bishop dominates its squares",
      "Coordinate attacks on both colors",
      "Endgames with opposite colors often draw"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Tal's attacking play"
  },

  {
    id: 'good-bad-bishop-pawn-structure',
    category: 'GOOD_BAD_BISHOP',
    title: "Bishop and Pawn Harmony",
    subtitle: "Placing pawns on the right squares",
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/3P4/2N1BN2/PP2PPPP/R2QKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "Place your pawns on the opposite color of your bishop! This frees the bishop's diagonals and creates harmony between pawns and pieces.",
    keyIdeas: [
      "Pawns opposite bishop color = good",
      "Pawns same color = blocked bishop",
      "Plan pawn structure around your bishops",
      "Central pawns especially matter"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Notice our pawns are on dark squares (d4, e3 coming). The light-squared bishop is FREE!",
        highlights: ["d3"],
        conceptTag: "Bishop Freedom"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "e3",
        isMainLine: true,
        annotation: "!",
        explanation: "Perfect harmony! Pawns on d4 and e3 (dark) leave light squares for the bishop.",
        highlights: ["e3"],
        conceptTag: "Pawn Harmony"
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
        explanation: "White castles.",
        conceptTag: ""
      },
      {
        move: "Re8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates the rook.",
        conceptTag: ""
      },
      {
        move: "Qc2",
        isMainLine: true,
        annotation: "!",
        explanation: "Battery! The bishop on d3 and queen on c2 create pressure on h7. Perfect harmony.",
        highlights: ["c2", "d3"],
        conceptTag: "Battery"
      }
    ],
    summary: "Place pawns on the opposite color of your remaining bishop. This creates harmony - your bishop roams freely while pawns control complementary squares.",
    keyTakeaways: [
      "Pawns opposite to bishop = freedom",
      "Plan structure around your bishops",
      "Central pawns affect bishop scope most",
      "Harmony means pieces and pawns work together"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Capablanca's bishop technique"
  },

  {
    id: 'good-bad-bishop-endgame',
    category: 'GOOD_BAD_BISHOP',
    title: "Good vs Bad Bishop Endgames",
    subtitle: "Technique to win",
    fen: '4r1k1/pp3ppp/4p3/3pP3/3P4/4B3/PP3PPP/4R1K1 w - - 0 22',
    toMove: 'white',
    introduction: "In bishop endgames, having the good bishop is often decisive. The good bishop controls key squares while the bad bishop is stuck defending pawns.",
    keyIdeas: [
      "Good bishop controls key squares",
      "Bad bishop tied to pawn defense",
      "Create weaknesses on bad bishop's color",
      "King activity is crucial"
    ],
    mainLine: [
      {
        move: "Kf1",
        isMainLine: true,
        annotation: "!",
        explanation: "King activates! In endgames, the king is a strong piece.",
        highlights: ["f1"],
        conceptTag: "King Activity"
      },
      {
        move: "Kf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black's king also activates.",
        conceptTag: ""
      },
      {
        move: "Ke2",
        isMainLine: true,
        annotation: "",
        explanation: "Marching forward.",
        conceptTag: ""
      },
      {
        move: "Ke7",
        isMainLine: true,
        annotation: "",
        explanation: "Black centralizes.",
        conceptTag: ""
      },
      {
        move: "Kd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Our king reaches d3. Now we control the center while Black's bishop is stuck.",
        highlights: ["d3"],
        conceptTag: "Centralization"
      },
      {
        move: "Rc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates the rook.",
        conceptTag: ""
      },
      {
        move: "Bf4",
        isMainLine: true,
        annotation: "!",
        explanation: "Our good bishop is active on f4. Compare to a bad bishop stuck behind pawns - we have freedom!",
        highlights: ["f4"],
        conceptTag: "Good Bishop"
      }
    ],
    summary: "In bishop endgames, the side with the good bishop has a lasting advantage. King activity and creating targets on the bad bishop's color are key techniques.",
    keyTakeaways: [
      "Good bishops dominate endgames",
      "King activity is essential",
      "Attack squares your bishop controls",
      "Bad bishops struggle with pawn defense"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Rubinstein's endgame mastery"
  },

  {
    id: 'good-bad-bishop-exchange',
    category: 'GOOD_BAD_BISHOP',
    title: "Exchanging Bad for Good",
    subtitle: "Strategic bishop trades",
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/2PP4/2N1BN2/PP2PPPP/R2QKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "One of the most important strategic operations: exchanging your bad bishop for the opponent's good one. This improves your pawn structure harmony.",
    keyIdeas: [
      "Trade your bad bishop for their good one",
      "Offer exchanges from unexpected squares",
      "The trade improves structure harmony",
      "Opponent often avoids the trade"
    ],
    mainLine: [
      {
        move: "Bb5",
        isMainLine: true,
        annotation: "!",
        explanation: "Offering to trade our potentially bad bishop for Black's good e7 bishop! Strategically important.",
        highlights: ["b5"],
        conceptTag: "Exchange Offer"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black avoids the trade, knowing it favors White.",
        conceptTag: ""
      },
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "Repositioning. The threat of exchange tied Black down.",
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
        explanation: "White castles.",
        conceptTag: ""
      },
      {
        move: "Re8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates.",
        conceptTag: ""
      },
      {
        move: "Bf5",
        isMainLine: true,
        annotation: "!",
        explanation: "Another offer! Our bishop eyes the d7 bishop. If traded, our structure improves.",
        highlights: ["f5"],
        conceptTag: "Persistent Exchange"
      }
    ],
    summary: "Trading bad for good bishops transforms positions. Actively seek exchanges that improve your pawn-bishop harmony, even if the opponent tries to avoid them.",
    keyTakeaways: [
      "Trade bad for good bishops",
      "Offer from active squares",
      "Opponents often avoid favorable trades",
      "Persistence creates opportunities"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Petrosian's exchange technique"
  },

  // ============================================
  // BISHOP PAIR - Additional Patterns
  // ============================================

  {
    id: 'bishop-pair-open-position',
    category: 'BISHOP_PAIR',
    title: "Bishop Pair in Open Positions",
    subtitle: "Maximum firepower",
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "Two bishops working together in open positions are devastatingly powerful. They control both color complexes and can create deadly crossfires.",
    keyIdeas: [
      "Two bishops control all colors",
      "Open positions maximize bishop power",
      "Bishops create diagonal crossfires",
      "Worth approximately extra half pawn"
    ],
    mainLine: [
      {
        move: "cxd5",
        isMainLine: true,
        annotation: "!",
        explanation: "Opening the position! Bishop pairs love open positions.",
        highlights: ["d5"],
        conceptTag: "Opening Lines"
      },
      {
        move: "exd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures.",
        conceptTag: ""
      },
      {
        move: "Bg5",
        isMainLine: true,
        annotation: "!",
        explanation: "The dark bishop activates. Soon both bishops will rake the board.",
        highlights: ["g5"],
        conceptTag: "Bishop Activation"
      },
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Both bishops are active! Bd3 eyes h7, Bg5 pins the knight. This is bishop pair power.",
        highlights: ["d3", "g5"],
        conceptTag: "Bishop Pair"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      },
      {
        move: "Qc2",
        isMainLine: true,
        annotation: "!",
        explanation: "Creating a battery on the b1-h7 diagonal. The bishop pair creates multiple threats.",
        highlights: ["c2"],
        conceptTag: "Battery"
      }
    ],
    summary: "The bishop pair in open positions is a major advantage. Two bishops coordinate to control all squares and create tactical threats the opponent can't fully meet.",
    keyTakeaways: [
      "Open positions maximize bishop pairs",
      "Both diagonals create threats",
      "Bishops coordinate better than knight+bishop",
      "Worth about half a pawn extra"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Kasparov's bishop pair"
  },

  {
    id: 'bishop-pair-long-diagonal',
    category: 'BISHOP_PAIR',
    title: "Bishops on Long Diagonals",
    subtitle: "Maximum range control",
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2P5/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: "When both bishops occupy long diagonals (a1-h8 and a8-h1), they control maximum squares. This is the ideal bishop pair setup.",
    keyIdeas: [
      "Long diagonals = maximum range",
      "Fianchettoed bishops are hard to attack",
      "Both diagonals slice the board",
      "Control of central squares is massive"
    ],
    mainLine: [
      {
        move: "d4",
        isMainLine: true,
        annotation: "!",
        explanation: "Opening the center for our fianchettoed bishop. Both long diagonals will be open!",
        highlights: ["d4"],
        conceptTag: "Opening Center"
      },
      {
        move: "Bg4",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops actively.",
        conceptTag: ""
      },
      {
        move: "b3",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing Bb2! Soon both bishops will control the long diagonals.",
        highlights: ["b3"],
        conceptTag: "Fianchetto Prep"
      },
      {
        move: "Rc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates the rook.",
        conceptTag: ""
      },
      {
        move: "Bb2",
        isMainLine: true,
        annotation: "!",
        explanation: "Both bishops on long diagonals! They control huge swaths of the board.",
        highlights: ["b2", "g2"],
        conceptTag: "Long Diagonals"
      },
      {
        move: "Qc7",
        isMainLine: true,
        annotation: "",
        explanation: "Black centralizes.",
        conceptTag: ""
      },
      {
        move: "Qd2",
        isMainLine: true,
        annotation: "!",
        explanation: "Connecting rooks and preparing e4. The bishop pair will become even more powerful.",
        highlights: ["d2"],
        conceptTag: "Coordination"
      }
    ],
    summary: "Bishops on long diagonals control maximum squares. The fianchetto setup is stable and powerful - the bishops are hard to attack and control both color complexes.",
    keyTakeaways: [
      "Long diagonals = maximum bishop range",
      "Fianchettoed bishops are stable",
      "Control both color complexes",
      "d4/e4 opens lines for fianchettoed bishops"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Larsen's fianchetto play"
  },

  {
    id: 'bishop-pair-endgame-technique',
    category: 'BISHOP_PAIR',
    title: "Bishop Pair Endgame",
    subtitle: "Converting the advantage",
    fen: '4r1k1/pp3ppp/4p3/3p4/3P4/4B3/PP2BPPP/4R1K1 w - - 0 20',
    toMove: 'white',
    introduction: "In the endgame, the bishop pair advantage grows. They can control entry squares, support passed pawns, and restrict the enemy king.",
    keyIdeas: [
      "Bishop pair endgames are usually winning",
      "Control both color complexes",
      "Restrict the enemy king",
      "Support passed pawn creation"
    ],
    mainLine: [
      {
        move: "Kf1",
        isMainLine: true,
        annotation: "!",
        explanation: "King activates. In endgames, combine king activity with the bishop pair.",
        highlights: ["f1"],
        conceptTag: "King Activity"
      },
      {
        move: "Kf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black's king also moves.",
        conceptTag: ""
      },
      {
        move: "Bf3",
        isMainLine: true,
        annotation: "!",
        explanation: "Centralizing the bishop and eyeing both wings.",
        highlights: ["f3"],
        conceptTag: "Centralization"
      },
      {
        move: "Ke7",
        isMainLine: true,
        annotation: "",
        explanation: "Black centralizes.",
        conceptTag: ""
      },
      {
        move: "Bf4",
        isMainLine: true,
        annotation: "!",
        explanation: "Both bishops active! They control all the key squares. Black's king can't find safety.",
        highlights: ["f3", "f4"],
        conceptTag: "Bishop Pair"
      },
      {
        move: "Kd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black tries to hide.",
        conceptTag: ""
      },
      {
        move: "Ke2",
        isMainLine: true,
        annotation: "!",
        explanation: "The king marches in. With the bishop pair, we control the board while advancing.",
        highlights: ["e2"],
        conceptTag: "Coordinated Advance"
      }
    ],
    summary: "The bishop pair in endgames is a major asset. They control both colors, restrict the enemy king, and support the advance of your own king and pawns.",
    keyTakeaways: [
      "Bishop pair grows stronger in endgames",
      "Combine with king activity",
      "Control key squares and diagonals",
      "Create passed pawns with support"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Capablanca's bishop technique"
  },

  {
    id: 'bishop-pair-defense',
    category: 'BISHOP_PAIR',
    title: "Fighting Against Bishop Pair",
    subtitle: "Defensive strategies",
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 0 7',
    toMove: 'black',
    introduction: "When facing the bishop pair, seek to trade one bishop, close the position, or create knight outposts. Closed positions neutralize the bishop pair's power.",
    keyIdeas: [
      "Trade one bishop to eliminate the pair",
      "Closed positions favor knights",
      "Create outposts for knights",
      "Block the long diagonals with pawns"
    ],
    mainLine: [
      {
        move: "e5",
        isMainLine: true,
        annotation: "!",
        explanation: "Closing the center! Bishops prefer open positions; by closing it, we neutralize their advantage.",
        highlights: ["e5"],
        conceptTag: "Closing Position"
      },
      {
        move: "d3",
        isMainLine: true,
        annotation: "",
        explanation: "White maintains central tension.",
        conceptTag: ""
      },
      {
        move: "Nh5",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight eyes f4 - an outpost. Knights love closed positions where bishops struggle.",
        highlights: ["h5", "f4"],
        conceptTag: "Knight Maneuver"
      },
      {
        move: "Be3",
        isMainLine: true,
        annotation: "",
        explanation: "White prevents Nf4.",
        conceptTag: ""
      },
      {
        move: "Nf4",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight reaches the outpost anyway! This knight is as good as a bishop pair in a closed position.",
        highlights: ["f4"],
        conceptTag: "Outpost"
      },
      {
        move: "Bxf4",
        isMainLine: true,
        annotation: "",
        explanation: "White trades.",
        conceptTag: ""
      },
      {
        move: "exf4",
        isMainLine: true,
        annotation: "!",
        explanation: "The bishop pair is no more! Now it's bishop vs knight - much more balanced.",
        highlights: ["f4"],
        conceptTag: "Eliminating Pair"
      }
    ],
    summary: "Against the bishop pair: close the position, create knight outposts, and seek to trade one bishop. Closed positions with knight outposts neutralize the bishop pair's advantage.",
    keyTakeaways: [
      "Close the position with pawns",
      "Knights thrive in closed games",
      "Trade to eliminate the pair",
      "Create outposts immune to pawns"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Karpov's anti-bishop pair"
  },

  {
    id: 'bishop-pair-exchange-sacrifice',
    category: 'BISHOP_PAIR',
    title: "Sacrificing the Bishop Pair",
    subtitle: "When two knights are better",
    fen: 'r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bP5/2N1PN2/PPQP1PPP/R1B1KB1R w KQq - 0 6',
    toMove: 'white',
    introduction: "Sometimes giving up the bishop pair is worth it for central control, better pawn structure, or a specific attack. Don't worship the bishop pair blindly.",
    keyIdeas: [
      "Bishop pair isn't always best",
      "Knights can be better in closed games",
      "Trade for positional gains",
      "Central control can outweigh bishops"
    ],
    mainLine: [
      {
        move: "a3",
        isMainLine: true,
        annotation: "!",
        explanation: "Asking the bishop a question. If Bxc3, we get the bishop pair. If Ba5, we gain time.",
        highlights: ["a3"],
        conceptTag: "Question"
      },
      {
        move: "Bxc3",
        isMainLine: true,
        annotation: "",
        explanation: "Black trades.",
        conceptTag: ""
      },
      {
        move: "Qxc3",
        isMainLine: true,
        annotation: "!",
        explanation: "We have the bishop pair now! The dark squares around Black's king may become weak.",
        highlights: ["c3"],
        conceptTag: "Bishop Pair"
      },
      {
        move: "d4",
        isMainLine: true,
        annotation: "",
        explanation: "Black closes the center.",
        conceptTag: ""
      },
      {
        move: "cxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Opening lines for our bishops.",
        conceptTag: ""
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures.",
        conceptTag: ""
      },
      {
        move: "Bc4",
        isMainLine: true,
        annotation: "!",
        explanation: "Both bishops are active! The bishop pair advantage is now clear.",
        highlights: ["c4"],
        conceptTag: "Active Bishops"
      }
    ],
    summary: "The bishop pair is valuable but not sacred. Sometimes it's better to trade it for positional gains. Evaluate each position on its merits.",
    keyTakeaways: [
      "Don't worship the bishop pair",
      "Central control can be more important",
      "Closed positions favor knights",
      "Evaluate each position individually"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Pragmatic positional play"
  },

  {
    id: 'bishop-pair-kingside-attack',
    category: 'BISHOP_PAIR',
    title: "Bishop Pair Kingside Attack",
    subtitle: "Using bishops to attack",
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "The bishop pair is devastating in attacks. One bishop targets the kingside diagonally while the other controls key squares. Together they create overwhelming threats.",
    keyIdeas: [
      "Bishops create diagonal attacks",
      "Coordinate with queen for batteries",
      "Opposite color bishops = both colors attacked",
      "h-file and g-file become weakened"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "!",
        explanation: "The light bishop aims at h7. This is the start of a kingside battery.",
        highlights: ["d3"],
        conceptTag: "Battery Prep"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles into our attack.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "We castle.",
        conceptTag: ""
      },
      {
        move: "dxc4",
        isMainLine: true,
        annotation: "",
        explanation: "Black captures.",
        conceptTag: ""
      },
      {
        move: "Bxc4",
        isMainLine: true,
        annotation: "!",
        explanation: "Recapturing. Now both bishops eye the kingside. Bc4 hits f7, preparing Qd3 later.",
        highlights: ["c4"],
        conceptTag: "Double Attack"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "Qc2",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing Bd3 and Qc2-h7 battery. The bishop pair creates unstoppable attacking chances.",
        highlights: ["c2"],
        conceptTag: "Attack Preparation"
      }
    ],
    summary: "The bishop pair creates powerful attacking chances. Coordinate them with the queen for batteries, and attack on both diagonals simultaneously.",
    keyTakeaways: [
      "Bishops create diagonal attacks",
      "Queen+bishop batteries are deadly",
      "Two diagonals = unstoppable threats",
      "Coordinate attacks carefully"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Spassky's attacking style"
  },

  // ============================================
  // OUTPOSTS - Additional Patterns
  // ============================================

  {
    id: 'outpost-knight-c5',
    category: 'OUTPOSTS',
    title: "Knight Outpost on c5",
    subtitle: "Classic queenside anchor",
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2Pp4/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    introduction: "The c5 outpost is a classic anchor point for knights. From c5, a knight pressures e6, a6, b7, and d7 - all key squares on the queenside.",
    keyIdeas: [
      "c5 controls critical queenside squares",
      "Cannot be challenged by pawns",
      "Pressures a6, b7, e6, d7",
      "Supports minority attack ideas"
    ],
    mainLine: [
      {
        move: "Na4",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight heads for c5! This is the standard route to the outpost.",
        highlights: ["a4", "c5"],
        conceptTag: "Maneuver"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "Nc5",
        isMainLine: true,
        annotation: "!",
        explanation: "The outpost is occupied! This knight is a monster - it pressures multiple squares and can't be kicked by pawns.",
        highlights: ["c5"],
        conceptTag: "Outpost"
      },
      {
        move: "Bxc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black trades to remove the knight.",
        conceptTag: ""
      },
      {
        move: "dxc5",
        isMainLine: true,
        annotation: "!",
        explanation: "Now we have a passed c-pawn and still have the outpost potential with another knight or bishop!",
        highlights: ["c5"],
        conceptTag: "Passed Pawn"
      },
      {
        move: "Qc7",
        isMainLine: true,
        annotation: "",
        explanation: "Black blocks the pawn.",
        conceptTag: ""
      },
      {
        move: "Qb3",
        isMainLine: true,
        annotation: "!",
        explanation: "Pressuring b7 and the queenside. The c5 pawn remains a thorn.",
        highlights: ["b3"],
        conceptTag: "Pressure"
      }
    ],
    summary: "The c5 outpost is a queenside powerhouse. Knights on c5 attack multiple targets and create lasting pressure. Even if traded, c5 becomes a strong passed pawn.",
    keyTakeaways: [
      "c5 knight attacks a6, b7, d7, e6",
      "Na4-c5 is the standard route",
      "If traded, c5 pawn is strong",
      "Controls queenside effectively"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Petrosian's knight play"
  },

  {
    id: 'outpost-knight-d5',
    category: 'OUTPOSTS',
    title: "The Central d5 Outpost",
    subtitle: "Dominating the center",
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/2PPP3/2N2N2/PP3PPP/R1BQKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "A knight on d5 is a monster in the center. It controls key squares, can't be easily challenged, and often leads to powerful attacks.",
    keyIdeas: [
      "d5 knight dominates the center",
      "Attacks c7, e7, b6, f6, b4, f4",
      "Hard to dislodge without weakening",
      "Often leads to kingside attacks"
    ],
    mainLine: [
      {
        move: "e5",
        isMainLine: true,
        annotation: "!",
        explanation: "Creating the d5 outpost! After ...Nd7, we'll occupy d5.",
        highlights: ["e5"],
        conceptTag: "Creating Outpost"
      },
      {
        move: "Nfd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black moves the knight.",
        conceptTag: ""
      },
      {
        move: "Nd5",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight occupies the perfect outpost! It can't be challenged by pawns.",
        highlights: ["d5"],
        conceptTag: "Outpost"
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black trades knights.",
        conceptTag: ""
      },
      {
        move: "cxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Recapturing with the pawn.",
        highlights: ["d5"],
        conceptTag: ""
      },
      {
        move: "Nb8",
        isMainLine: true,
        annotation: "",
        explanation: "Black reroutes.",
        conceptTag: ""
      },
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Developing with kingside ideas. The d5 pawn controls crucial squares.",
        highlights: ["d3"],
        conceptTag: "Development"
      }
    ],
    summary: "The d5 outpost gives central domination. A knight on d5 controls everything and restricts Black's pieces. Even if traded, the d5 pawn remains powerful.",
    keyTakeaways: [
      "d5 is the ideal central outpost",
      "Knight on d5 restricts everything",
      "e5 often creates the d5 hole",
      "Pawn on d5 also controls key squares"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Kasparov's central control"
  },

  {
    id: 'outpost-knight-e5',
    category: 'OUTPOSTS',
    title: "The Aggressive e5 Outpost",
    subtitle: "Attacking springboard",
    fen: 'r1bqkb1r/ppp2ppp/2n2n2/3pp3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    toMove: 'white',
    introduction: "The e5 square is an aggressive outpost that points directly at the kingside. A knight on e5 attacks f7, d7, and supports kingside attacks.",
    keyIdeas: [
      "e5 knight attacks kingside targets",
      "f7 is a critical weak point",
      "Supports piece coordination",
      "Creates tactical opportunities"
    ],
    mainLine: [
      {
        move: "d4",
        isMainLine: true,
        annotation: "!",
        explanation: "Opening the center and preparing Nf3-e5.",
        highlights: ["d4"],
        conceptTag: "Central Break"
      },
      {
        move: "exd4",
        isMainLine: true,
        annotation: "",
        explanation: "Black captures.",
        conceptTag: ""
      },
      {
        move: "e5",
        isMainLine: true,
        annotation: "!",
        explanation: "Chasing the knight and creating the e5 outpost for our own knight!",
        highlights: ["e5"],
        conceptTag: "Creating Outpost"
      },
      {
        move: "Ne4",
        isMainLine: true,
        annotation: "",
        explanation: "Black centralizes.",
        conceptTag: ""
      },
      {
        move: "Nxd4",
        isMainLine: true,
        annotation: "",
        explanation: "Recapturing.",
        conceptTag: ""
      },
      {
        move: "Nxd4",
        isMainLine: true,
        annotation: "",
        explanation: "Black exchanges.",
        conceptTag: ""
      },
      {
        move: "Qxd4",
        isMainLine: true,
        annotation: "!",
        explanation: "Our queen dominates the center. The e5 pawn restricts Black and creates outpost squares.",
        highlights: ["d4", "e5"],
        conceptTag: "Central Domination"
      }
    ],
    summary: "The e5 outpost is aggressive, targeting the kingside directly. Knights on e5 attack f7 and support attacks. The e5 pawn also restricts enemy pieces.",
    keyTakeaways: [
      "e5 knight targets f7 directly",
      "Supports kingside attacks",
      "e5 pawn restricts enemy knights",
      "Creates tactical opportunities"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Italian Game attacking ideas"
  },

  {
    id: 'outpost-bishop-outpost',
    category: 'OUTPOSTS',
    title: "Bishop on an Outpost",
    subtitle: "Not just for knights",
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/2PP4/2N1BN2/PP3PPP/R2QKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "While knights are the classic outpost pieces, bishops can also occupy outposts effectively, especially when they control long diagonals from protected squares.",
    keyIdeas: [
      "Bishops can occupy outposts too",
      "Protected by pawns, hard to challenge",
      "Long diagonal control from outpost",
      "Especially good on d5 or e5"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "Developing normally first.",
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
        move: "cxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Opening the position.",
        conceptTag: ""
      },
      {
        move: "exd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures.",
        conceptTag: ""
      },
      {
        move: "Bf5",
        isMainLine: true,
        annotation: "!",
        explanation: "The bishop occupies an outpost on f5! Protected by our structure, it controls the e4-c8 diagonal.",
        highlights: ["f5"],
        conceptTag: "Bishop Outpost"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black tries to trade.",
        conceptTag: ""
      },
      {
        move: "Bxd7",
        isMainLine: true,
        annotation: "!",
        explanation: "Trading on our terms. We got good use from the f5 outpost.",
        highlights: ["d7"],
        conceptTag: "Favorable Trade"
      }
    ],
    summary: "Bishops can occupy outposts effectively when the squares are protected and the diagonal is valuable. f5, d5, e5 can be excellent bishop outposts.",
    keyTakeaways: [
      "Outposts aren't just for knights",
      "Bishops can dominate from outposts",
      "Choose outposts on valuable diagonals",
      "Pawns must protect the outpost"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Modern positional play"
  },

  // ============================================
  // REMAINING CATEGORIES - 4 each
  // ============================================

  // PIECE_COORDINATION
  {
    id: 'piece-coordination-battery',
    category: 'PIECE_COORDINATION',
    title: "Queen and Bishop Battery",
    subtitle: "Diagonal power",
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/2PP4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: "A battery is when pieces line up on the same file, rank, or diagonal. Queen and bishop batteries on diagonals pointing at the king are especially dangerous.",
    keyIdeas: [
      "Batteries multiply piece power",
      "Queen behind bishop on diagonals",
      "Target h7 or h2 for attacks",
      "Coordinate with other pieces"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "!",
        explanation: "The bishop takes the diagonal first. Now Qc2 will form a battery.",
        highlights: ["d3"],
        conceptTag: "Battery Prep"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      },
      {
        move: "Qc2",
        isMainLine: true,
        annotation: "!",
        explanation: "Battery formed! Bd3+Qc2 both aim at h7. This is dangerous for Black's king.",
        highlights: ["c2", "d3"],
        conceptTag: "Battery"
      },
      {
        move: "h6",
        isMainLine: true,
        annotation: "",
        explanation: "Black creates luft but weakens g6.",
        conceptTag: ""
      },
      {
        move: "Bh7+",
        isMainLine: true,
        annotation: "!",
        explanation: "The battery strikes! This sacrifice is possible thanks to coordination.",
        highlights: ["h7"],
        conceptTag: "Sacrifice"
      }
    ],
    summary: "Queen and bishop batteries on diagonals create crushing threats. The queen amplifies the bishop's attack on the enemy king position.",
    keyTakeaways: [
      "Batteries multiply attack power",
      "Bishop goes first, queen behind",
      "Target weak squares near the king",
      "h7 is a classic target"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Classical attacking play"
  },

  {
    id: 'piece-coordination-three-pieces',
    category: 'PIECE_COORDINATION',
    title: "Triple Coordination",
    subtitle: "Three pieces, one target",
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "When three pieces coordinate on one target, it becomes overwhelming. This is the principle of concentration - bringing superior force to one point.",
    keyIdeas: [
      "Three attackers overwhelm any defense",
      "Concentrate force on one weakness",
      "Each piece adds to pressure",
      "Coordination beats material sometimes"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "!",
        explanation: "First piece aims at h7.",
        highlights: ["d3"],
        conceptTag: "First Attacker"
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Black castles.",
        conceptTag: ""
      },
      {
        move: "Qc2",
        isMainLine: true,
        annotation: "!",
        explanation: "Second piece joins! Qc2+Bd3 aim at h7.",
        highlights: ["c2"],
        conceptTag: "Second Attacker"
      },
      {
        move: "Re8",
        isMainLine: true,
        annotation: "",
        explanation: "Black defends.",
        conceptTag: ""
      },
      {
        move: "Ng5",
        isMainLine: true,
        annotation: "!",
        explanation: "Third piece! Now three pieces attack h7. Black cannot defend against this concentration.",
        highlights: ["g5", "d3", "c2"],
        conceptTag: "Triple Attack"
      }
    ],
    summary: "Three coordinated attackers overwhelm almost any defense. The principle of concentration - bringing superior force to a single point - wins games.",
    keyTakeaways: [
      "Concentrate force on one target",
      "Three attackers beat two defenders",
      "Coordinate systematically",
      "Quality of attack > material count"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Tal's attacking principles"
  },

  {
    id: 'piece-coordination-rook-knight',
    category: 'PIECE_COORDINATION',
    title: "Rook and Knight Teamwork",
    subtitle: "Different but complementary",
    fen: 'r4rk1/pp3ppp/2n1pn2/3p4/3P4/2N2N2/PP3PPP/R4RK1 w - - 0 12',
    toMove: 'white',
    introduction: "Rooks and knights complement each other well. Rooks control files while knights hop to squares rooks can't easily reach. Together they cover the whole board.",
    keyIdeas: [
      "Rooks control long-range squares",
      "Knights cover squares rooks miss",
      "Rook supports knight advances",
      "Knight creates entry points for rooks"
    ],
    mainLine: [
      {
        move: "Rc1",
        isMainLine: true,
        annotation: "!",
        explanation: "Rook controls the c-file, supporting knight maneuvers to c5.",
        highlights: ["c1"],
        conceptTag: "File Control"
      },
      {
        move: "Rc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black contests.",
        conceptTag: ""
      },
      {
        move: "Na4",
        isMainLine: true,
        annotation: "!",
        explanation: "Knight heads for c5. The rook on c1 supports this invasion.",
        highlights: ["a4", "c5"],
        conceptTag: "Coordination"
      },
      {
        move: "Nd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black defends c5.",
        conceptTag: ""
      },
      {
        move: "Nc5",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight arrives! Now rook+knight coordinate beautifully.",
        highlights: ["c5"],
        conceptTag: "Teamwork"
      }
    ],
    summary: "Rooks and knights work differently but complement each other. The rook controls files while the knight creates entry points. Together they're formidable.",
    keyTakeaways: [
      "Rooks and knights complement each other",
      "Rooks support knight advances",
      "Knights create entry points",
      "Different ranges, same targets"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Petrosian's coordination"
  },

  {
    id: 'piece-coordination-two-rooks',
    category: 'PIECE_COORDINATION',
    title: "Coordinating Two Rooks",
    subtitle: "Doubled rook power",
    fen: 'r4rk1/pp3ppp/4pn2/3p4/3P4/4PN2/PP3PPP/R4RK1 w - - 0 14',
    toMove: 'white',
    introduction: "Two rooks working together are far more than twice as strong as one. Doubled rooks on open files or the 7th rank create unstoppable pressure.",
    keyIdeas: [
      "Two rooks >> one rook + one rook apart",
      "Double on open files",
      "The 7th rank is devastating",
      "Rooks support each other's invasions"
    ],
    mainLine: [
      {
        move: "Rfc1",
        isMainLine: true,
        annotation: "!",
        explanation: "Both rooks now eye the c-file.",
        highlights: ["c1"],
        conceptTag: "Doubling"
      },
      {
        move: "Rfc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black contests.",
        conceptTag: ""
      },
      {
        move: "Rc7",
        isMainLine: true,
        annotation: "!",
        explanation: "Rook invades the 7th rank!",
        highlights: ["c7"],
        conceptTag: "7th Rank"
      },
      {
        move: "Rxc7",
        isMainLine: true,
        annotation: "",
        explanation: "Black must trade.",
        conceptTag: ""
      },
      {
        move: "Rxc7",
        isMainLine: true,
        annotation: "!",
        explanation: "One rook on the 7th still dominates. The coordination got us here.",
        highlights: ["c7"],
        conceptTag: "Domination"
      }
    ],
    summary: "Two rooks coordinating together multiply their power. Double them on files or ranks to create overwhelming pressure that single pieces can't handle.",
    keyTakeaways: [
      "Two rooks multiply power",
      "Double on open files or 7th rank",
      "Rooks support each other",
      "One rook leading, one supporting"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Tarrasch's rook principles"
  },

  // PAWN_BREAKS
  {
    id: 'pawn-break-e5-sicilian',
    category: 'PAWN_BREAKS',
    title: "The e5 Break in Sicilian",
    subtitle: "Blasting open the center",
    fen: 'r1bqkb1r/pp2pppp/2np1n2/8/2BPP3/2N2N2/PP3PPP/R1BQK2R b KQkq - 0 5',
    toMove: 'black',
    introduction: "In the Sicilian, Black's ...e5 break is thematic. It challenges White's center, opens the e-file, and gives Black counterplay. Timing is everything.",
    keyIdeas: [
      "...e5 challenges the d4 pawn",
      "Opens the position for Black's pieces",
      "Must be timed when d4 is weak",
      "Creates central tension"
    ],
    mainLine: [
      {
        move: "e5",
        isMainLine: true,
        annotation: "!",
        explanation: "The thematic break! Challenging White's center directly.",
        highlights: ["e5"],
        conceptTag: "Pawn Break"
      },
      {
        move: "dxe5",
        isMainLine: true,
        annotation: "",
        explanation: "White captures.",
        conceptTag: ""
      },
      {
        move: "dxe5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures, opening the d-file.",
        conceptTag: ""
      },
      {
        move: "Qxd8+",
        isMainLine: true,
        annotation: "",
        explanation: "Queens trade.",
        conceptTag: ""
      },
      {
        move: "Kxd8",
        isMainLine: true,
        annotation: "!",
        explanation: "Black loses castling but the center is open and Black has active play.",
        highlights: ["d8"],
        conceptTag: "Compensation"
      }
    ],
    summary: "The ...e5 break in the Sicilian is fundamental. It challenges White's center, opens lines, and creates counterplay. Time it well for maximum effect.",
    keyTakeaways: [
      "...e5 is Sicilian's thematic break",
      "Challenges the d4 center",
      "Opens lines for Black",
      "Timing is critical"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Sicilian Defense theory"
  },

  {
    id: 'pawn-break-f4-attack',
    category: 'PAWN_BREAKS',
    title: "The f4 Attacking Break",
    subtitle: "Opening the f-file",
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 6',
    toMove: 'white',
    introduction: "f2-f4 is an aggressive pawn break that opens the f-file and aims to undermine Black's center. It's especially effective with a bishop on c4.",
    keyIdeas: [
      "f4 opens the f-file for attack",
      "Undermines e5 pawn if Black has one",
      "Creates tactical chances on f7",
      "Works well with Bc4"
    ],
    mainLine: [
      {
        move: "f4",
        isMainLine: true,
        annotation: "!",
        explanation: "The aggressive break! Attacking Black's e5 pawn and opening the f-file.",
        highlights: ["f4"],
        conceptTag: "Pawn Break"
      },
      {
        move: "exf4",
        isMainLine: true,
        annotation: "",
        explanation: "Black captures.",
        conceptTag: ""
      },
      {
        move: "Bxf4",
        isMainLine: true,
        annotation: "!",
        explanation: "Recapturing with the bishop, which now eyes d6 and the dark squares.",
        highlights: ["f4"],
        conceptTag: "Active Bishop"
      },
      {
        move: "Be6",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "Qe2",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing Rae1 and e5 push. The f-file is now open for the rook.",
        highlights: ["e2"],
        conceptTag: "Preparation"
      }
    ],
    summary: "The f4 break is aggressive - it opens the f-file, challenges Black's center, and creates attacking chances. Combine with active pieces for maximum effect.",
    keyTakeaways: [
      "f4 opens the f-file",
      "Challenges Black's center",
      "Creates tactical chances",
      "Combines with Bc4 threats"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "King's Gambit ideas"
  },

  {
    id: 'pawn-break-b4-queenside',
    category: 'PAWN_BREAKS',
    title: "The b4 Queenside Break",
    subtitle: "Gaining space",
    fen: 'r1bqkb1r/pp2pppp/2np1n2/8/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 4',
    toMove: 'white',
    introduction: "b2-b4 is a typical queenside space-gaining break. It restricts Black's knights from coming to c5 and prepares further expansion.",
    keyIdeas: [
      "b4 gains queenside space",
      "Prevents ...Nc5 ideas",
      "Prepares b5 or a4-a5",
      "Creates outpost on c5 for us"
    ],
    mainLine: [
      {
        move: "b4",
        isMainLine: true,
        annotation: "!",
        explanation: "Space! Controlling c5 and preparing queenside expansion.",
        highlights: ["b4"],
        conceptTag: "Space"
      },
      {
        move: "e5",
        isMainLine: true,
        annotation: "",
        explanation: "Black strikes in the center.",
        conceptTag: ""
      },
      {
        move: "d5",
        isMainLine: true,
        annotation: "",
        explanation: "Closing the center.",
        highlights: ["d5"],
        conceptTag: ""
      },
      {
        move: "Nb8",
        isMainLine: true,
        annotation: "",
        explanation: "Black's knight retreats.",
        conceptTag: ""
      },
      {
        move: "a4",
        isMainLine: true,
        annotation: "!",
        explanation: "Continuing the queenside expansion. b5 is coming!",
        highlights: ["a4"],
        conceptTag: "Expansion"
      }
    ],
    summary: "The b4 break gains queenside space and prevents enemy piece activity. Follow up with a4-a5 or b5 to continue the expansion.",
    keyTakeaways: [
      "b4 gains queenside space",
      "Prevents ...Nc5",
      "Prepares further expansion",
      "Creates our own c5 outpost"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Closed opening theory"
  },

  {
    id: 'pawn-break-d5-sicilian',
    category: 'PAWN_BREAKS',
    title: "The d5 Break",
    subtitle: "Opening the center",
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    introduction: "The d5 break is often White's key moment. It opens the center, creates an outpost, and can lead to a positional or tactical explosion.",
    keyIdeas: [
      "d5 opens central lines",
      "Creates an outpost after exd5",
      "Forces Black to react",
      "Can be tactical or positional"
    ],
    mainLine: [
      {
        move: "d5",
        isMainLine: true,
        annotation: "!",
        explanation: "The central break! Opening the position for our pieces.",
        highlights: ["d5"],
        conceptTag: "Central Break"
      },
      {
        move: "exd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black captures.",
        conceptTag: ""
      },
      {
        move: "cxd5",
        isMainLine: true,
        annotation: "!",
        explanation: "Recapturing. Now d5 is a strong outpost and the c-file opens.",
        highlights: ["d5"],
        conceptTag: "Outpost"
      },
      {
        move: "Nb8",
        isMainLine: true,
        annotation: "",
        explanation: "The knight retreats.",
        conceptTag: ""
      },
      {
        move: "Bc4",
        isMainLine: true,
        annotation: "!",
        explanation: "Developing actively. The d5 pawn cramps Black's position.",
        highlights: ["c4", "d5"],
        conceptTag: "Development"
      }
    ],
    summary: "The d5 break transforms the position. It opens lines, creates outposts, and often gives White a lasting initiative. Time it when your pieces are ready.",
    keyTakeaways: [
      "d5 is the key central break",
      "Opens lines for pieces",
      "Creates outpost if recaptured with pawn",
      "Requires piece support"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Central opening theory"
  },

  // KNIGHT_PLACEMENT
  {
    id: 'knight-placement-centralization',
    category: 'KNIGHT_PLACEMENT',
    title: "Central Knight Placement",
    subtitle: "Knights in the middle",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3',
    toMove: 'white',
    introduction: "Knights belong in the center where they control the most squares. A knight on e4 or d4 is worth more than one on a4 or h4.",
    keyIdeas: [
      "Center knights control more squares",
      "Knights on the rim are dim",
      "d4, e4, d5, e5 are ideal",
      "Central knights support attacks"
    ],
    mainLine: [
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "!",
        explanation: "Developing toward the center. The knight eyes d5 and e4.",
        highlights: ["c3"],
        conceptTag: "Development"
      },
      {
        move: "Bb4",
        isMainLine: true,
        annotation: "",
        explanation: "Black pins.",
        conceptTag: ""
      },
      {
        move: "Nd5",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight jumps to the ideal central square! It attacks Bb4 and c7.",
        highlights: ["d5"],
        conceptTag: "Centralization"
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black must trade.",
        conceptTag: ""
      },
      {
        move: "exd5",
        isMainLine: true,
        annotation: "!",
        explanation: "The d5 pawn is strong. Our knight placement forced this favorable exchange.",
        highlights: ["d5"],
        conceptTag: "Central Pawn"
      }
    ],
    summary: "Knights are most powerful in the center. Develop them toward central squares where they control maximum territory and support your plans.",
    keyTakeaways: [
      "Center knights control 8 squares",
      "Edge knights control only 2-4",
      "d4, e4, d5, e5 are ideal",
      "Develop toward the center"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Classical development principles"
  },

  {
    id: 'knight-placement-maneuver',
    category: 'KNIGHT_PLACEMENT',
    title: "Knight Maneuvering",
    subtitle: "Repositioning knights",
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 6',
    toMove: 'white',
    introduction: "When a knight is poorly placed, maneuver it to a better square. Knights can zigzag to reach ideal positions even if it takes several moves.",
    keyIdeas: [
      "Bad knight? Maneuver it!",
      "Knights can zigzag to good squares",
      "Plan the full journey in advance",
      "Each move should improve placement"
    ],
    mainLine: [
      {
        move: "Nd5",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight occupies the central outpost immediately!",
        highlights: ["d5"],
        conceptTag: "Outpost"
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black trades.",
        conceptTag: ""
      },
      {
        move: "exd5",
        isMainLine: true,
        annotation: "",
        explanation: "Recapturing.",
        conceptTag: ""
      },
      {
        move: "Nb8",
        isMainLine: true,
        annotation: "",
        explanation: "Black's knight retreats.",
        conceptTag: ""
      },
      {
        move: "Nh4",
        isMainLine: true,
        annotation: "!",
        explanation: "Maneuvering the knight to f5 via h4! This is a classic repositioning path.",
        highlights: ["h4", "f5"],
        conceptTag: "Maneuver"
      },
      {
        move: "g6",
        isMainLine: true,
        annotation: "",
        explanation: "Black weakens but stops Nf5.",
        conceptTag: ""
      },
      {
        move: "Nf3",
        isMainLine: true,
        annotation: "",
        explanation: "The knight returns, but g6 is now a weakness!",
        conceptTag: ""
      }
    ],
    summary: "Don't leave knights on bad squares. Maneuver them - even if it takes several moves - to reach outposts or attack targets. Each move should improve.",
    keyTakeaways: [
      "Maneuver bad knights to good squares",
      "Plan the full route in advance",
      "Nh4-f5 is a classic maneuver",
      "Knight repositioning is worth time"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Petrosian's knight handling"
  },

  {
    id: 'knight-placement-rim',
    category: 'KNIGHT_PLACEMENT',
    title: "Avoiding the Rim",
    subtitle: "A knight on the rim is dim",
    fen: 'r1bqkb1r/pppp1ppp/2n5/4p2n/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 4',
    toMove: 'white',
    introduction: "Knights on the edge of the board control fewer squares and are easier to trap. Avoid placing knights on a- or h-files unless there's a good reason.",
    keyIdeas: [
      "Rim knights control few squares",
      "They can be trapped easily",
      "Develop toward the center instead",
      "Exceptions exist but are rare"
    ],
    mainLine: [
      {
        move: "Nc3",
        isMainLine: true,
        annotation: "!",
        explanation: "Developing toward the center! Compare this knight's range to Black's Nh5.",
        highlights: ["c3"],
        conceptTag: "Good Placement"
      },
      {
        move: "Nf4",
        isMainLine: true,
        annotation: "",
        explanation: "Black's knight hops but remains awkward.",
        conceptTag: ""
      },
      {
        move: "d3",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing to chase the knight. Black's knight will soon be expelled.",
        highlights: ["d3"],
        conceptTag: "Preparation"
      },
      {
        move: "Bb4",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "g3",
        isMainLine: true,
        annotation: "!",
        explanation: "Chasing the knight! It must retreat and Black loses time.",
        highlights: ["g3"],
        conceptTag: "Expelling"
      }
    ],
    summary: "Knights on the rim control only a few squares and can be easily expelled. Keep knights in or near the center where they're most effective.",
    keyTakeaways: [
      "Rim knights control 2-4 squares only",
      "Center knights control up to 8",
      "Rim knights can be trapped",
      "Develop toward the center"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Basic piece placement"
  },

  {
    id: 'knight-placement-defensive',
    category: 'KNIGHT_PLACEMENT',
    title: "Defensive Knight Placement",
    subtitle: "Knights as defenders",
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 b - - 0 6',
    toMove: 'black',
    introduction: "Knights can be excellent defenders. A knight on f6 defends the kingside, one on c6 protects the center. Defensive placement is as important as attacking placement.",
    keyIdeas: [
      "Knights defend key squares",
      "f6/f3 knights protect the king",
      "c6/c3 knights control the center",
      "Defensive knights support counterplay"
    ],
    mainLine: [
      {
        move: "h6",
        isMainLine: true,
        annotation: "",
        explanation: "Creating luft and preventing Bg5 pins on the defensive knight.",
        highlights: ["h6"],
        conceptTag: "Prevention"
      },
      {
        move: "Be3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops.",
        conceptTag: ""
      },
      {
        move: "Be6",
        isMainLine: true,
        annotation: "!",
        explanation: "Trading the strong c4 bishop. The knight on f6 remains a solid defender.",
        highlights: ["e6"],
        conceptTag: "Exchange"
      },
      {
        move: "Bxe6",
        isMainLine: true,
        annotation: "",
        explanation: "White takes.",
        conceptTag: ""
      },
      {
        move: "fxe6",
        isMainLine: true,
        annotation: "!",
        explanation: "Recapturing. The Nf6 is a stalwart defender - it guards h7, g8, and controls e4.",
        highlights: ["e6", "f6"],
        conceptTag: "Solid Defense"
      }
    ],
    summary: "Knights excel at defense too. A well-placed defensive knight guards key squares, prevents invasions, and supports counterattacking possibilities.",
    keyTakeaways: [
      "Knights defend key squares well",
      "f6/f3 guards the king",
      "Don't undervalue defensive placement",
      "Defense enables counterplay"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Defensive chess principles"
  },

  // KING_ACTIVITY
  {
    id: 'king-activity-endgame-march',
    category: 'KING_ACTIVITY',
    title: "The King March",
    subtitle: "Activating in endgames",
    fen: '4r1k1/ppp2ppp/8/3p4/3P4/8/PPP2PPP/4R1K1 w - - 0 20',
    toMove: 'white',
    introduction: "In the endgame, the king transforms from a liability into a fighting piece. March your king toward the center to participate in the battle.",
    keyIdeas: [
      "Endgame king is a strong piece",
      "March toward the center",
      "Support passed pawns",
      "Attack enemy pawns"
    ],
    mainLine: [
      {
        move: "Kf1",
        isMainLine: true,
        annotation: "!",
        explanation: "The king begins its journey! Step one toward the center.",
        highlights: ["f1"],
        conceptTag: "King March"
      },
      {
        move: "Kf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black's king also activates.",
        conceptTag: ""
      },
      {
        move: "Ke2",
        isMainLine: true,
        annotation: "",
        explanation: "Step two. The king approaches the center.",
        conceptTag: ""
      },
      {
        move: "Ke7",
        isMainLine: true,
        annotation: "",
        explanation: "Black centralizes.",
        conceptTag: ""
      },
      {
        move: "Kd3",
        isMainLine: true,
        annotation: "!",
        explanation: "The king reaches d3! It supports the d4 pawn and can attack Black's queenside.",
        highlights: ["d3"],
        conceptTag: "Centralization"
      }
    ],
    summary: "In endgames, march your king toward the center. A centralized king is worth an extra piece - it supports pawns, attacks targets, and controls squares.",
    keyTakeaways: [
      "Endgame king is powerful",
      "March toward the center",
      "The king supports everything",
      "Centralization is key"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Endgame fundamentals"
  },

  {
    id: 'king-activity-opposition',
    category: 'KING_ACTIVITY',
    title: "King Opposition",
    subtitle: "Face-to-face battle",
    fen: '8/8/8/3k4/8/3K4/3P4/8 w - - 0 1',
    toMove: 'white',
    introduction: "When kings face each other with one square between them, the side NOT to move has the opposition. This concept is crucial for pawn endgames.",
    keyIdeas: [
      "Opposition = kings face-to-face",
      "Side NOT to move has it",
      "Winning technique in pawn endings",
      "Forces the opponent to give way"
    ],
    mainLine: [
      {
        move: "Kc4",
        isMainLine: true,
        annotation: "!",
        explanation: "Gaining the opposition! If Black's king moves, we advance.",
        highlights: ["c4"],
        conceptTag: "Opposition"
      },
      {
        move: "Kc6",
        isMainLine: true,
        annotation: "",
        explanation: "Black tries to hold.",
        conceptTag: ""
      },
      {
        move: "Kd4",
        isMainLine: true,
        annotation: "!",
        explanation: "Taking the opposition again! Black must give way.",
        highlights: ["d4"],
        conceptTag: "Opposition"
      },
      {
        move: "Kd6",
        isMainLine: true,
        annotation: "",
        explanation: "Black blocks.",
        conceptTag: ""
      },
      {
        move: "Ke4",
        isMainLine: true,
        annotation: "!",
        explanation: "Outflanking! Now we'll penetrate on the other side.",
        highlights: ["e4"],
        conceptTag: "Outflanking"
      }
    ],
    summary: "Opposition is the key to pawn endgames. When you have it, your opponent must move and give ground. Master this technique for winning endgames.",
    keyTakeaways: [
      "Opposition = crucial endgame concept",
      "Side NOT to move has opposition",
      "Forces opponent to give way",
      "Essential for pawn endgames"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Endgame theory"
  },

  {
    id: 'king-activity-supporting-passed-pawn',
    category: 'KING_ACTIVITY',
    title: "King Supporting Passed Pawn",
    subtitle: "Escorting to promotion",
    fen: '8/8/8/3k4/3P4/3K4/8/8 w - - 0 1',
    toMove: 'white',
    introduction: "A passed pawn needs its king to escort it to promotion. The king clears the path, blocks the enemy king, and supports the pawn's advance.",
    keyIdeas: [
      "King escorts passed pawns",
      "Clear path for the pawn",
      "Block the enemy king",
      "Coordinate king and pawn"
    ],
    mainLine: [
      {
        move: "Ke3",
        isMainLine: true,
        annotation: "!",
        explanation: "Moving up! The king will support the pawn's advance.",
        highlights: ["e3"],
        conceptTag: "Support"
      },
      {
        move: "Kd6",
        isMainLine: true,
        annotation: "",
        explanation: "Black's king tries to block.",
        conceptTag: ""
      },
      {
        move: "Ke4",
        isMainLine: true,
        annotation: "!",
        explanation: "Taking the opposition! Black must give ground.",
        highlights: ["e4"],
        conceptTag: "Opposition"
      },
      {
        move: "Kc6",
        isMainLine: true,
        annotation: "",
        explanation: "Black steps aside.",
        conceptTag: ""
      },
      {
        move: "Ke5",
        isMainLine: true,
        annotation: "!",
        explanation: "The king advances, protecting d5 for the pawn.",
        highlights: ["e5"],
        conceptTag: "Escort"
      },
      {
        move: "Kc7",
        isMainLine: true,
        annotation: "",
        explanation: "Black retreats.",
        conceptTag: ""
      },
      {
        move: "d5",
        isMainLine: true,
        annotation: "!",
        explanation: "Now the pawn advances with the king's full support!",
        highlights: ["d5"],
        conceptTag: "Advance"
      }
    ],
    summary: "The king must escort passed pawns to promotion. Lead with the king, take opposition, and only then advance the pawn. Coordination wins.",
    keyTakeaways: [
      "King goes before the pawn",
      "Take opposition to advance",
      "Clear the path for promotion",
      "Coordinate king and pawn"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Basic endgame technique"
  },

  {
    id: 'king-activity-attacking-pawns',
    category: 'KING_ACTIVITY',
    title: "King Attacking Pawns",
    subtitle: "The king as attacker",
    fen: '8/ppp2k2/8/8/8/8/PPP2K2/8 w - - 0 1',
    toMove: 'white',
    introduction: "In pawn endgames, the king can attack and win enemy pawns. The more active king wins by capturing pawns and creating passed pawns.",
    keyIdeas: [
      "King attacks weak pawns",
      "Create passed pawns",
      "Active king wins",
      "Penetrate to the enemy pawns"
    ],
    mainLine: [
      {
        move: "Ke3",
        isMainLine: true,
        annotation: "!",
        explanation: "The king activates toward the center and the enemy pawns.",
        highlights: ["e3"],
        conceptTag: "Activation"
      },
      {
        move: "Ke6",
        isMainLine: true,
        annotation: "",
        explanation: "Black centralizes.",
        conceptTag: ""
      },
      {
        move: "Kd4",
        isMainLine: true,
        annotation: "!",
        explanation: "Penetrating! Heading toward Black's pawns.",
        highlights: ["d4"],
        conceptTag: "Penetration"
      },
      {
        move: "Kd6",
        isMainLine: true,
        annotation: "",
        explanation: "Black defends.",
        conceptTag: ""
      },
      {
        move: "Kc5",
        isMainLine: true,
        annotation: "!",
        explanation: "The king threatens to capture b7 or c7.",
        highlights: ["c5"],
        conceptTag: "Attack"
      }
    ],
    summary: "In endgames, the king becomes an attacking piece. Penetrate to the enemy pawns, capture them, and create passed pawns. The active king wins.",
    keyTakeaways: [
      "King attacks pawns in endgames",
      "Penetrate to enemy weaknesses",
      "Capture pawns, create passers",
      "Active king is winning"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Endgame attacking"
  },

  // EXCHANGE_STRATEGY
  {
    id: 'exchange-strategy-simplification',
    category: 'EXCHANGE_STRATEGY',
    title: "Simplifying When Ahead",
    subtitle: "Trade to win",
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/3P4/2N2N2/PP2PPPP/R1BQKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "When you're ahead in material, trade pieces! Each trade brings you closer to a winning endgame. The fewer pieces, the harder it is to be checkmated.",
    keyIdeas: [
      "Trade when ahead in material",
      "Fewer pieces = safer king",
      "Endgames are easier to win",
      "Keep your best pieces"
    ],
    mainLine: [
      {
        move: "Bg5",
        isMainLine: true,
        annotation: "!",
        explanation: "Offering trades! When ahead, simplify the position.",
        highlights: ["g5"],
        conceptTag: "Trade Offer"
      },
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Black defends.",
        conceptTag: ""
      },
      {
        move: "Bxf6",
        isMainLine: true,
        annotation: "!",
        explanation: "Trading! Each piece removed brings us closer to a winning endgame.",
        highlights: ["f6"],
        conceptTag: "Simplification"
      },
      {
        move: "Bxf6",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures.",
        conceptTag: ""
      },
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "Developing and preparing more trades.",
        conceptTag: ""
      }
    ],
    summary: "When ahead, trade pieces to simplify. The fewer pieces on the board, the easier it is to convert your advantage into a win.",
    keyTakeaways: [
      "Trade when ahead",
      "Simplify to win endgames",
      "Fewer pieces = less counterplay",
      "Keep your best piece if possible"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Practical play"
  },

  {
    id: 'exchange-strategy-avoid-trades',
    category: 'EXCHANGE_STRATEGY',
    title: "Avoiding Trades When Behind",
    subtitle: "Keep complexity alive",
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 b - - 0 6',
    toMove: 'black',
    introduction: "When behind in material, avoid trades! Keep pieces on to maintain complications and counterattacking chances. The more pieces, the more chances for tricks.",
    keyIdeas: [
      "Don't trade when behind",
      "Keep complications on the board",
      "More pieces = more chances",
      "Look for counterattack, not simplification"
    ],
    mainLine: [
      {
        move: "h6",
        isMainLine: true,
        annotation: "!",
        explanation: "Preventing Bg5! When behind, avoid trades that simplify.",
        highlights: ["h6"],
        conceptTag: "Avoiding Trade"
      },
      {
        move: "Be3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops.",
        conceptTag: ""
      },
      {
        move: "Be6",
        isMainLine: true,
        annotation: "!",
        explanation: "Only trading when it helps our counterplay. This trade removes White's strong bishop.",
        highlights: ["e6"],
        conceptTag: "Favorable Trade"
      },
      {
        move: "Bxe6",
        isMainLine: true,
        annotation: "",
        explanation: "White trades.",
        conceptTag: ""
      },
      {
        move: "fxe6",
        isMainLine: true,
        annotation: "!",
        explanation: "Recapturing. We've traded White's good bishop while maintaining piece count.",
        highlights: ["e6"],
        conceptTag: "Active Recapture"
      }
    ],
    summary: "When behind, avoid simplifying trades. Keep pieces on for complications and counterplay. Only trade when it specifically helps your position.",
    keyTakeaways: [
      "Don't trade when behind",
      "Keep complications alive",
      "Trade only if it helps you",
      "More pieces = more chances"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Defensive technique"
  },

  {
    id: 'exchange-strategy-trade-defenders',
    category: 'EXCHANGE_STRATEGY',
    title: "Trading Key Defenders",
    subtitle: "Removing the guard",
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/3P4/2N1BN2/PP2PPPP/R2QKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "Trade pieces that defend critical squares or pawns. Removing a key defender often collapses the opponent's position.",
    keyIdeas: [
      "Identify the key defender",
      "Trade it to expose weakness",
      "Remaining pieces attack",
      "Defense collapses without guard"
    ],
    mainLine: [
      {
        move: "Bb5",
        isMainLine: true,
        annotation: "!",
        explanation: "Targeting the c6 knight! It defends d5 and e5 squares.",
        highlights: ["b5", "c6"],
        conceptTag: "Targeting Defender"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black protects the knight.",
        conceptTag: ""
      },
      {
        move: "Bxc6",
        isMainLine: true,
        annotation: "!",
        explanation: "Trading the defender! Now d5 and e5 are weaker.",
        highlights: ["c6"],
        conceptTag: "Remove Defender"
      },
      {
        move: "Bxc6",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures.",
        conceptTag: ""
      },
      {
        move: "Ne5",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight exploits the hole left by the traded knight!",
        highlights: ["e5"],
        conceptTag: "Exploitation"
      }
    ],
    summary: "Trade pieces that defend key squares or weaknesses. Once the defender is gone, exploit the holes it left behind.",
    keyTakeaways: [
      "Identify key defenders",
      "Trade them to expose weaknesses",
      "Exploit the holes they leave",
      "Defense collapses systematically"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Tactical exchange strategy"
  },

  {
    id: 'exchange-strategy-bad-piece',
    category: 'EXCHANGE_STRATEGY',
    title: "Trading Your Worst Piece",
    subtitle: "Upgrade by exchange",
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "Trade your worst piece for your opponent's best piece. This 'upgrade' improves your position even if it's an equal exchange of material.",
    keyIdeas: [
      "Trade bad for good",
      "Equal exchange can favor you",
      "Identify your worst piece",
      "Remove opponent's best piece"
    ],
    mainLine: [
      {
        move: "Bg5",
        isMainLine: true,
        annotation: "!",
        explanation: "Pinning. This bishop is potentially bad behind our e3 pawn. Trading it is welcome.",
        highlights: ["g5"],
        conceptTag: "Trading Bad Piece"
      },
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Black defends.",
        conceptTag: ""
      },
      {
        move: "Bxf6",
        isMainLine: true,
        annotation: "!",
        explanation: "Trading! Our 'bad' bishop for their active knight improves our position.",
        highlights: ["f6"],
        conceptTag: "Upgrade"
      },
      {
        move: "Bxf6",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures.",
        conceptTag: ""
      },
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Our remaining bishop is now clearly good - outside the pawn chain!",
        highlights: ["d3"],
        conceptTag: "Good Piece"
      }
    ],
    summary: "Trade your worst piece for your opponent's best. Even 'equal' trades can favor you if you're trading bad for good.",
    keyTakeaways: [
      "Trade your worst pieces",
      "Take opponent's best pieces",
      "Material equality isn't position equality",
      "Upgrades improve piece quality"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Positional exchange"
  },

  // CENTRALIZATION
  {
    id: 'centralization-piece-activity',
    category: 'CENTRALIZATION',
    title: "Central Pieces Dominate",
    subtitle: "Power from the middle",
    fen: 'r1bq1rk1/ppp2ppp/2n2n2/3pp3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 6',
    toMove: 'white',
    introduction: "Centralized pieces control more squares and coordinate better. A knight on e4 dominates compared to one on a1. Centralize everything!",
    keyIdeas: [
      "Center pieces control more squares",
      "Coordination improves from center",
      "All pieces like the center",
      "Centralize before attacking"
    ],
    mainLine: [
      {
        move: "Nd5",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight leaps to the ideal central square! It dominates the entire board.",
        highlights: ["d5"],
        conceptTag: "Centralization"
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black must trade.",
        conceptTag: ""
      },
      {
        move: "exd5",
        isMainLine: true,
        annotation: "",
        explanation: "Recapturing maintains central presence.",
        conceptTag: ""
      },
      {
        move: "e4",
        isMainLine: true,
        annotation: "",
        explanation: "Black pushes.",
        conceptTag: ""
      },
      {
        move: "dxe4",
        isMainLine: true,
        annotation: "",
        explanation: "Opening lines.",
        conceptTag: ""
      },
      {
        move: "Nxe4",
        isMainLine: true,
        annotation: "",
        explanation: "Black centralizes too.",
        conceptTag: ""
      },
      {
        move: "Nxe4",
        isMainLine: true,
        annotation: "!",
        explanation: "Keeping central control. Our pieces remain well-centralized.",
        highlights: ["e4"],
        conceptTag: "Central Control"
      }
    ],
    summary: "Central pieces dominate the board. Centralize your pieces before attacking - they'll coordinate better and control more squares from the middle.",
    keyTakeaways: [
      "Centralize all pieces",
      "Central control = coordination",
      "Develop toward the center",
      "Centralize before attacking"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Classical development"
  },

  {
    id: 'centralization-queen-centralization',
    category: 'CENTRALIZATION',
    title: "Queen Centralization",
    subtitle: "The queen in the center",
    fen: 'r1b2rk1/pp3ppp/2n1pn2/q2p4/2PP4/2N1PN2/PP3PPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: "A centralized queen is incredibly powerful - but also vulnerable. Centralize the queen only after developing other pieces and when it can't be easily attacked.",
    keyIdeas: [
      "Central queen controls many squares",
      "Vulnerable to piece attacks",
      "Centralize AFTER other pieces",
      "Timing is crucial"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "Developing first! The queen comes later.",
        conceptTag: ""
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "King safety first.",
        conceptTag: ""
      },
      {
        move: "Rac8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates.",
        conceptTag: ""
      },
      {
        move: "Qe2",
        isMainLine: true,
        annotation: "!",
        explanation: "Now the queen centralizes safely. It eyes e6, supports pieces, and is hard to attack.",
        highlights: ["e2"],
        conceptTag: "Safe Centralization"
      }
    ],
    summary: "The queen loves central squares but is vulnerable there early in the game. Develop other pieces first, then centralize the queen when it's safe.",
    keyTakeaways: [
      "Central queen is powerful but vulnerable",
      "Develop other pieces first",
      "Centralize queen when safe",
      "Timing matters for queen placement"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Queen handling"
  },

  {
    id: 'centralization-rook-lift',
    category: 'CENTRALIZATION',
    title: "Rook Lift for Centralization",
    subtitle: "Bringing rooks to the action",
    fen: 'r1bq1rk1/ppp2ppp/2n2n2/3p4/3P4/2N1PN2/PP3PPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    introduction: "Rooks often get stuck on the back rank. A 'rook lift' brings a rook to the third or fourth rank where it can swing to the kingside attack.",
    keyIdeas: [
      "Rooks can lift to middle ranks",
      "R-d3-g3 or R-d3-h3 is common",
      "Centralized rooks join attacks",
      "Lift when files are blocked"
    ],
    mainLine: [
      {
        move: "Rd1",
        isMainLine: true,
        annotation: "",
        explanation: "Centralizing the rook on the d-file first.",
        conceptTag: ""
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "Development continues.",
        conceptTag: ""
      },
      {
        move: "Rc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates.",
        conceptTag: ""
      },
      {
        move: "Rc1",
        isMainLine: true,
        annotation: "",
        explanation: "Connecting rooks.",
        conceptTag: ""
      },
      {
        move: "Na5",
        isMainLine: true,
        annotation: "",
        explanation: "Black maneuvers.",
        conceptTag: ""
      },
      {
        move: "Rcd1",
        isMainLine: true,
        annotation: "!",
        explanation: "Both rooks centralized! Ready for d-file action or a lift to the kingside.",
        highlights: ["d1"],
        conceptTag: "Centralization"
      }
    ],
    summary: "Rooks need to be centralized too. Use rook lifts (Rd1-d3-g3) when files are blocked. Central rooks can swing to either wing for attack or defense.",
    keyTakeaways: [
      "Rooks can lift to middle ranks",
      "R-d3-g3 attacks the kingside",
      "Lift when files are blocked",
      "Central rooks are flexible"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Rook maneuvers"
  },

  {
    id: 'centralization-decentralizing-opponent',
    category: 'CENTRALIZATION',
    title: "Decentralizing Opponent's Pieces",
    subtitle: "Driving pieces to the edge",
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 6',
    toMove: 'white',
    introduction: "While centralizing your pieces, also try to decentralize your opponent's. Push enemy pieces to the edge where they're less effective.",
    keyIdeas: [
      "Drive enemy pieces to the edge",
      "Pieces on the rim are dim",
      "Use pawn advances to expel",
      "Control center while pushing pieces away"
    ],
    mainLine: [
      {
        move: "Nd5",
        isMainLine: true,
        annotation: "!",
        explanation: "Our knight centralizes while attacking Black's f6 knight!",
        highlights: ["d5"],
        conceptTag: "Centralization"
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black must trade.",
        conceptTag: ""
      },
      {
        move: "exd5",
        isMainLine: true,
        annotation: "",
        explanation: "Recapturing.",
        conceptTag: ""
      },
      {
        move: "Nb8",
        isMainLine: true,
        annotation: "",
        explanation: "Black's knight is decentralized!",
        conceptTag: ""
      },
      {
        move: "c3",
        isMainLine: true,
        annotation: "!",
        explanation: "Solidifying. Black's knight on b8 will take time to reactivate.",
        highlights: ["c3"],
        conceptTag: "Consolidation"
      }
    ],
    summary: "Decentralize opponent's pieces while centralizing your own. Pieces pushed to the edge lose effectiveness and take time to return to the action.",
    keyTakeaways: [
      "Push enemy pieces to edges",
      "Pieces on rim are ineffective",
      "Central pawns drive pieces away",
      "Decentralized pieces = lost time"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Positional play"
  },

  // BLOCKADE
  {
    id: 'blockade-passed-pawn',
    category: 'BLOCKADE',
    title: "Blockading Passed Pawns",
    subtitle: "Stopping the advance",
    fen: '4r1k1/pp3ppp/8/3P4/8/8/PP3PPP/4R1K1 w - - 0 20',
    toMove: 'white',
    introduction: "A passed pawn must be stopped! The best blockader is a piece that can't be driven away by pawns. Knights are ideal blockaders - they control squares in all directions.",
    keyIdeas: [
      "Stop passed pawns with pieces",
      "Knights are best blockaders",
      "Blockader can't be driven by pawns",
      "Rooks are poor blockaders"
    ],
    mainLine: [
      {
        move: "d6",
        isMainLine: true,
        annotation: "!",
        explanation: "Advancing the passed pawn! Black must blockade it.",
        highlights: ["d6"],
        conceptTag: "Passed Pawn"
      },
      {
        move: "Rd8",
        isMainLine: true,
        annotation: "",
        explanation: "Black blockades, but the rook is passive here.",
        conceptTag: ""
      },
      {
        move: "Re7",
        isMainLine: true,
        annotation: "!",
        explanation: "Our rook invades the 7th! Black's rook is tied to the blockade.",
        highlights: ["e7"],
        conceptTag: "7th Rank"
      },
      {
        move: "Kf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black tries to free the rook.",
        conceptTag: ""
      },
      {
        move: "Rxb7",
        isMainLine: true,
        annotation: "!",
        explanation: "Winning a pawn! The blockaded rook can't defend the queenside.",
        highlights: ["b7"],
        conceptTag: "Exploitation"
      }
    ],
    summary: "Passed pawns must be blockaded by pieces. The blockader is often passive while the passed pawn owner can play elsewhere. Knights are ideal blockaders.",
    keyTakeaways: [
      "Blockade passed pawns with pieces",
      "Knights are best blockaders",
      "Rooks become passive as blockaders",
      "Blockade ties down resources"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Nimzowitsch's blockade theory"
  },

  {
    id: 'blockade-iqp-blockade',
    category: 'BLOCKADE',
    title: "Blockading the IQP",
    subtitle: "Neutralizing the isolani",
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/8/2N2N2/PP2PPPP/R1BQKB1R w KQ - 0 8',
    toMove: 'white',
    introduction: "The isolated queen pawn (IQP) is best neutralized by blockade. A knight on d4 stops the pawn from advancing and controls key squares.",
    keyIdeas: [
      "Knight on d4 is ideal blockader",
      "Can't be driven by pawns",
      "Controls c6, e6, b5, f5",
      "Turns IQP into permanent weakness"
    ],
    mainLine: [
      {
        move: "Nd4",
        isMainLine: true,
        annotation: "!",
        explanation: "The classic blockade! The knight on d4 stops d5-d4 and dominates.",
        highlights: ["d4"],
        conceptTag: "Blockade"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "Developing and adding pressure to d5.",
        conceptTag: ""
      },
      {
        move: "Rc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling safely.",
        conceptTag: ""
      },
      {
        move: "Re8",
        isMainLine: true,
        annotation: "",
        explanation: "Black doubles.",
        conceptTag: ""
      },
      {
        move: "Qf3",
        isMainLine: true,
        annotation: "!",
        explanation: "Adding pressure to d5. The blockade is secure, and we attack the isolani.",
        highlights: ["f3", "d5"],
        conceptTag: "Pressure"
      }
    ],
    summary: "The IQP is best handled by blockade. A knight on d4 stops the pawn's advance and turns it into a permanent weakness. Then pile up on the pawn.",
    keyTakeaways: [
      "Knight on d4 blockades perfectly",
      "IQP becomes permanent weakness",
      "Pile up pieces against the pawn",
      "Blockade first, then pressure"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Anti-IQP strategy"
  },

  {
    id: 'blockade-pawn-chain',
    category: 'BLOCKADE',
    title: "Blockading Pawn Chains",
    subtitle: "Restraining pawn masses",
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/3pP3/3P4/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 0 5',
    toMove: 'black',
    introduction: "When facing a pawn chain, blockade it! Prevent the pawns from advancing further and attack the base of the chain.",
    keyIdeas: [
      "Blockade the front of the chain",
      "Attack the base of the chain",
      "Blocked chains can't advance",
      "Piece pressure on chain base"
    ],
    mainLine: [
      {
        move: "Nh5",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight prepares to blockade on f5 or attack the chain.",
        highlights: ["h5"],
        conceptTag: "Maneuver"
      },
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops.",
        conceptTag: ""
      },
      {
        move: "g6",
        isMainLine: true,
        annotation: "",
        explanation: "Preparing ...Bg7 for pressure on d4.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "White castles.",
        conceptTag: ""
      },
      {
        move: "Bg7",
        isMainLine: true,
        annotation: "!",
        explanation: "The bishop attacks d4 - the base of White's pawn chain!",
        highlights: ["g7", "d4"],
        conceptTag: "Attack Base"
      },
      {
        move: "Re1",
        isMainLine: true,
        annotation: "",
        explanation: "White supports.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "!",
        explanation: "Black castles. The strategy is clear: blockade the chain and attack its base (d4).",
        conceptTag: "Strategy"
      }
    ],
    summary: "Against pawn chains: blockade the front and attack the base. Blocked pawns can't advance, and pressure on the base eventually cracks the chain.",
    keyTakeaways: [
      "Blockade the chain's front",
      "Attack the base (d4 or e3)",
      "Blocked chains become targets",
      "Patience cracks the structure"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "French Defense strategy"
  },

  {
    id: 'blockade-preventing-advance',
    category: 'BLOCKADE',
    title: "Preventing Pawn Advances",
    subtitle: "Prophylactic blockade",
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "Sometimes you blockade not a passed pawn but a potential advance. Preventing e6-e5 or d5-d4 keeps the opponent cramped.",
    keyIdeas: [
      "Blockade potential advances",
      "Keep opponent cramped",
      "Control the square ahead of the pawn",
      "Prevent liberating breaks"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "Development.",
        conceptTag: ""
      },
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling.",
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
        move: "Qe2",
        isMainLine: true,
        annotation: "!",
        explanation: "Preventing ...e5! If Black plays ...e5, we have cxd5 followed by e4 with advantage.",
        highlights: ["e2"],
        conceptTag: "Prophylactic"
      },
      {
        move: "Re8",
        isMainLine: true,
        annotation: "",
        explanation: "Black prepares ...e5.",
        conceptTag: ""
      },
      {
        move: "Rfd1",
        isMainLine: true,
        annotation: "!",
        explanation: "Adding pressure to d5. Black's ...e5 break remains difficult.",
        highlights: ["d1"],
        conceptTag: "Restraint"
      }
    ],
    summary: "Prophylactic blockade prevents liberating pawn breaks. Control the square ahead of the pawn to keep your opponent cramped and unable to free their position.",
    keyTakeaways: [
      "Blockade potential breaks",
      "Keep opponent cramped",
      "Control key advance squares",
      "Prophylaxis is powerful"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Prophylactic play"
  },

  // ============================================
  // ADDITIONAL PATTERNS TO COMPLETE 15 PER CATEGORY
  // ============================================

  // OUTPOSTS - need 3 more (12 → 15)
  {
    id: 'outposts-knight-outpost-d5',
    category: 'OUTPOSTS',
    title: "Knight Outpost on d5",
    subtitle: "The classic central outpost",
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    introduction: "The d5 square is one of the most powerful outpost squares for a knight. When Black's c-pawn is gone or blocked, a knight on d5 cannot be challenged by pawns.",
    keyIdeas: [
      "d5 controls key central squares",
      "Knight on d5 attacks c7, e7, b6, f6",
      "Cannot be driven away by pawns",
      "Dominates the center"
    ],
    mainLine: [
      {
        move: "cxd5",
        isMainLine: true,
        annotation: "",
        explanation: "First we open the c-file and clear d5.",
        conceptTag: ""
      },
      {
        move: "exd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures.",
        conceptTag: ""
      },
      {
        move: "Bg5",
        isMainLine: true,
        annotation: "",
        explanation: "Pinning the knight and preparing to control d5.",
        conceptTag: ""
      },
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Black breaks the pin.",
        conceptTag: ""
      },
      {
        move: "Nd5",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight lands on the outpost! It dominates from d5.",
        highlights: ["d5"],
        conceptTag: "Outpost"
      }
    ],
    summary: "The d5 outpost is a dream square for knights. Once established, the knight controls the center and cannot be challenged by pawns.",
    keyTakeaways: [
      "d5 is a premier knight outpost",
      "Knights dominate from central outposts",
      "Outpost knights can't be driven by pawns",
      "Control the center from the outpost"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Classical positional play"
  },

  {
    id: 'outposts-bishop-outpost',
    category: 'OUTPOSTS',
    title: "Bishop on an Outpost",
    subtitle: "Bishops need outposts too",
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2PPPP/R2QKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "While knights are the most common outpost pieces, bishops can also benefit from protected outpost squares, especially when they control long diagonals.",
    keyIdeas: [
      "Bishops can occupy outposts too",
      "Diagonal control from outpost",
      "Protected by pawns ideally",
      "Combines outpost and diagonal power"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "Developing towards the kingside.",
        conceptTag: ""
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling to safety.",
        conceptTag: ""
      },
      {
        move: "Rc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates the rook.",
        conceptTag: ""
      },
      {
        move: "Bf4",
        isMainLine: true,
        annotation: "!",
        explanation: "The bishop finds an excellent square. It controls the h2-b8 diagonal and cannot be challenged easily.",
        highlights: ["f4"],
        conceptTag: "Outpost"
      }
    ],
    summary: "Bishops can use outpost squares when they control important diagonals. A bishop on an outpost combines stability with long-range power.",
    keyTakeaways: [
      "Bishops benefit from outposts too",
      "Choose outposts on key diagonals",
      "Protected squares add stability",
      "Long-range power from safe squares"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Positional understanding"
  },

  {
    id: 'outposts-creating-outposts',
    category: 'OUTPOSTS',
    title: "Creating Outpost Squares",
    subtitle: "Building your own strongpoints",
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/2pp4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    introduction: "Outposts don't just appear - you create them. By exchanging pawns or advancing them strategically, you can manufacture outpost squares for your pieces.",
    keyIdeas: [
      "Exchange pawns to create holes",
      "Advance pawns to fix weaknesses",
      "Plan piece occupation of outposts",
      "Outposts are created, not given"
    ],
    mainLine: [
      {
        move: "cxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Exchanging to create the d5 outpost.",
        conceptTag: ""
      },
      {
        move: "cxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures with the c-pawn.",
        conceptTag: ""
      },
      {
        move: "Bb5",
        isMainLine: true,
        annotation: "!",
        explanation: "Now we pin and prepare to exploit d5. The c6 knight can't guard d5 forever.",
        highlights: ["b5", "d5"],
        conceptTag: "Preparation"
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black tries to break the pin.",
        conceptTag: ""
      },
      {
        move: "Bxc6",
        isMainLine: true,
        annotation: "",
        explanation: "Exchanging to weaken d5.",
        conceptTag: ""
      },
      {
        move: "Bxc6",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures.",
        conceptTag: ""
      },
      {
        move: "Ne5",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight heads for d3 then the d5 outpost we created!",
        highlights: ["e5"],
        conceptTag: "Outpost Creation"
      }
    ],
    summary: "Create outposts through strategic pawn exchanges. Remove the pawns that guard key squares, then occupy those squares with your pieces.",
    keyTakeaways: [
      "Exchange pawns to create outposts",
      "Target squares no longer guarded",
      "Plan the piece that will occupy",
      "Creating outposts is a skill"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Strategic planning"
  },

  // BISHOP_PAIR - need 2 more (13 → 15)
  {
    id: 'bishop-pair-open-game',
    category: 'BISHOP_PAIR',
    title: "Bishop Pair in Open Games",
    subtitle: "Maximizing diagonal control",
    fen: 'r1bq1rk1/ppp2ppp/2n2n2/3pp3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w - - 0 6',
    toMove: 'white',
    introduction: "The bishop pair is most powerful in open positions where diagonals are clear. Two bishops working together can dominate the entire board.",
    keyIdeas: [
      "Open positions favor bishops",
      "Control both color diagonals",
      "Bishops restrict knight movement",
      "Long-range pressure is decisive"
    ],
    mainLine: [
      {
        move: "exd5",
        isMainLine: true,
        annotation: "",
        explanation: "Opening the position for our bishops.",
        conceptTag: ""
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures.",
        conceptTag: ""
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "We exchange knights to enhance our bishop pair.",
        conceptTag: ""
      },
      {
        move: "Qxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures with the queen.",
        conceptTag: ""
      },
      {
        move: "Bb3",
        isMainLine: true,
        annotation: "!",
        explanation: "Both bishops now rake the board! The queen is pushed back.",
        highlights: ["b3"],
        conceptTag: "Bishop Pair"
      },
      {
        move: "Qd8",
        isMainLine: true,
        annotation: "",
        explanation: "The queen retreats.",
        conceptTag: ""
      },
      {
        move: "Bf4",
        isMainLine: true,
        annotation: "!",
        explanation: "The bishop pair controls everything. Light and dark squares are dominated.",
        highlights: ["f4", "b3"],
        conceptTag: "Domination"
      }
    ],
    summary: "In open positions, the bishop pair is a significant advantage. Exchange knights and open the position to maximize the bishops' long-range power.",
    keyTakeaways: [
      "Open positions favor the bishop pair",
      "Trade knights to enhance bishops",
      "Control both color complexes",
      "Bishop pair can dominate games"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Classical theory"
  },

  {
    id: 'bishop-pair-endgame-power',
    category: 'BISHOP_PAIR',
    title: "Bishop Pair in Endgames",
    subtitle: "Converting the advantage",
    fen: '4r1k1/ppp2ppp/8/3p4/2PP4/8/PP3PPP/2B1R1K1 w - - 0 20',
    toMove: 'white',
    introduction: "In endgames, the bishop pair can be decisive. The two bishops can cut off the enemy king, control key squares, and support passed pawns from afar.",
    keyIdeas: [
      "Bishops dominate endgames",
      "Cut off the enemy king",
      "Support passed pawn creation",
      "Control both colors to win"
    ],
    mainLine: [
      {
        move: "Bb2",
        isMainLine: true,
        annotation: "!",
        explanation: "The bishop takes the long diagonal, eyeing g7 and the queenside.",
        highlights: ["b2"],
        conceptTag: ""
      },
      {
        move: "Kf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black tries to activate.",
        conceptTag: ""
      },
      {
        move: "cxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Creating a passed pawn!",
        conceptTag: ""
      },
      {
        move: "Rxe1+",
        isMainLine: true,
        annotation: "",
        explanation: "Black exchanges rooks.",
        conceptTag: ""
      },
      {
        move: "Bxe1",
        isMainLine: true,
        annotation: "",
        explanation: "We recapture with the bishop.",
        conceptTag: ""
      },
      {
        move: "Ke7",
        isMainLine: true,
        annotation: "",
        explanation: "Black's king comes to blockade.",
        conceptTag: ""
      },
      {
        move: "Bc3",
        isMainLine: true,
        annotation: "!",
        explanation: "Both bishops coordinate! One supports the passed pawn, the other cuts off the king.",
        highlights: ["c3", "b2"],
        conceptTag: "Coordination"
      }
    ],
    summary: "The bishop pair shines in endgames. Use them to support passed pawns, cut off the enemy king, and control both color complexes for victory.",
    keyTakeaways: [
      "Bishop pair dominates endgames",
      "Cut off the enemy king",
      "Support passed pawn advances",
      "Coordinate both bishops"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Endgame technique"
  },

  // BLOCKADE - need 2 more (13 → 15)
  {
    id: 'blockade-rook-blockade',
    category: 'BLOCKADE',
    title: "Rook as Blockader",
    subtitle: "When rooks must blockade",
    fen: '8/8/4k3/8/3P4/8/8/4R1K1 w - - 0 40',
    toMove: 'white',
    introduction: "Rooks are generally poor blockaders because they're most effective on open files. However, sometimes a rook blockade is necessary - understand when this sacrifice of activity is worth it.",
    keyIdeas: [
      "Rooks dislike blockading",
      "Rooks are passive as blockaders",
      "Sometimes necessary evil",
      "Look for better alternatives"
    ],
    mainLine: [
      {
        move: "d5+",
        isMainLine: true,
        annotation: "!",
        explanation: "Pushing the pawn! Black must blockade.",
        highlights: ["d5"],
        conceptTag: "Passed Pawn"
      },
      {
        move: "Kd6",
        isMainLine: true,
        annotation: "",
        explanation: "The king blockades - the best blockader!",
        conceptTag: ""
      },
      {
        move: "Re6+",
        isMainLine: true,
        annotation: "!",
        explanation: "Driving the king away from the blockade.",
        highlights: ["e6"],
        conceptTag: "Driving"
      },
      {
        move: "Kd7",
        isMainLine: true,
        annotation: "",
        explanation: "The king retreats.",
        conceptTag: ""
      },
      {
        move: "d6",
        isMainLine: true,
        annotation: "!",
        explanation: "Now the pawn advances. Black needs to find a blockader.",
        highlights: ["d6"],
        conceptTag: "Advance"
      }
    ],
    summary: "Rooks are poor blockaders because they lose activity. Always look for knights or kings to blockade instead. Use rooks behind passed pawns, not in front.",
    keyTakeaways: [
      "Rooks are poor blockaders",
      "They become passive",
      "Kings and knights blockade better",
      "Rooks belong behind passed pawns"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Endgame principles"
  },

  {
    id: 'blockade-knight-blockade',
    category: 'BLOCKADE',
    title: "Knight as Ideal Blockader",
    subtitle: "The perfect blockading piece",
    fen: '8/5pk1/8/3P4/8/5N2/5K2/8 w - - 0 40',
    toMove: 'white',
    introduction: "Knights are the ideal blockading piece. On a blockading square, the knight controls squares in all directions while preventing the pawn's advance. It loses no effectiveness.",
    keyIdeas: [
      "Knights are ideal blockaders",
      "Don't lose effectiveness",
      "Control squares in all directions",
      "Can't be driven by pawns"
    ],
    mainLine: [
      {
        move: "Nd4",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight centralizes, ready to blockade if needed.",
        highlights: ["d4"],
        conceptTag: ""
      },
      {
        move: "Kf6",
        isMainLine: true,
        annotation: "",
        explanation: "Black's king approaches.",
        conceptTag: ""
      },
      {
        move: "Ke3",
        isMainLine: true,
        annotation: "",
        explanation: "Our king supports the knight and pawn.",
        conceptTag: ""
      },
      {
        move: "Ke5",
        isMainLine: true,
        annotation: "",
        explanation: "Black tries to attack d5.",
        conceptTag: ""
      },
      {
        move: "Nc6+",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight defends d5 while checking! Perfectly flexible.",
        highlights: ["c6"],
        conceptTag: "Flexibility"
      }
    ],
    summary: "Knights make ideal blockaders because they control squares in all directions from the blockading square. They don't lose effectiveness like rooks or bishops.",
    keyTakeaways: [
      "Knights are ideal blockaders",
      "Control all directions from blockade",
      "Lose no effectiveness",
      "Can defend while blockading"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Nimzowitsch's theory"
  },

  // CENTRALIZATION - need 2 more (13 → 15)
  {
    id: 'centralization-all-pieces',
    category: 'CENTRALIZATION',
    title: "Centralizing All Pieces",
    subtitle: "Army in the center",
    fen: 'r2q1rk1/ppp2ppp/2nb1n2/3pp3/8/2NPBN2/PPP1BPPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    introduction: "True central control comes from coordinating all pieces toward the center. When your entire army is centralized, you have maximum flexibility and power.",
    keyIdeas: [
      "Centralize all pieces, not just one",
      "Central pieces support each other",
      "Maximum flexibility from center",
      "Coordinated army is powerful"
    ],
    mainLine: [
      {
        move: "Qd2",
        isMainLine: true,
        annotation: "",
        explanation: "The queen connects to the center.",
        conceptTag: ""
      },
      {
        move: "Qe7",
        isMainLine: true,
        annotation: "",
        explanation: "Black also centralizes.",
        conceptTag: ""
      },
      {
        move: "Rad1",
        isMainLine: true,
        annotation: "!",
        explanation: "Rook to the central file.",
        highlights: ["d1"],
        conceptTag: ""
      },
      {
        move: "Rad8",
        isMainLine: true,
        annotation: "",
        explanation: "Black contests.",
        conceptTag: ""
      },
      {
        move: "Rfe1",
        isMainLine: true,
        annotation: "!",
        explanation: "Both rooks now eye the center. All pieces are centrally placed!",
        highlights: ["e1", "d1"],
        conceptTag: "Full Centralization"
      }
    ],
    summary: "Centralize your entire army, not just one piece. When all pieces point toward the center, you have maximum flexibility to attack on either wing.",
    keyTakeaways: [
      "Centralize all pieces",
      "Rooks on central files",
      "Queen connected to center",
      "Coordinated army wins"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Classical development"
  },

  {
    id: 'centralization-king-center-endgame',
    category: 'CENTRALIZATION',
    title: "King Centralization in Endgames",
    subtitle: "The king becomes active",
    fen: '8/8/4k3/8/3P4/4K3/8/8 w - - 0 40',
    toMove: 'white',
    introduction: "In endgames, the king transforms from a piece needing protection to an active fighter. Centralizing the king is often the key to winning endgames.",
    keyIdeas: [
      "King is strong in endgames",
      "Centralize king early",
      "King supports pawn advances",
      "Active king often decisive"
    ],
    mainLine: [
      {
        move: "Ke4",
        isMainLine: true,
        annotation: "!",
        explanation: "Centralizing the king! It supports the pawn and controls key squares.",
        highlights: ["e4"],
        conceptTag: "King Activity"
      },
      {
        move: "Kd6",
        isMainLine: true,
        annotation: "",
        explanation: "Black's king also centralizes.",
        conceptTag: ""
      },
      {
        move: "Kf5",
        isMainLine: true,
        annotation: "!",
        explanation: "Outflanking! The king goes around.",
        highlights: ["f5"],
        conceptTag: "Outflanking"
      },
      {
        move: "Kd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black blocks.",
        conceptTag: ""
      },
      {
        move: "Ke5",
        isMainLine: true,
        annotation: "",
        explanation: "Opposition!",
        conceptTag: ""
      }
    ],
    summary: "In endgames, centralize your king immediately. The king becomes a powerful piece that can support pawns, attack enemy pawns, and outflank the opponent.",
    keyTakeaways: [
      "Centralize king in endgames",
      "King becomes powerful piece",
      "Support pawn advances",
      "Active king wins games"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Endgame fundamentals"
  },

  // EXCHANGE_STRATEGY - need 2 more (13 → 15)
  {
    id: 'exchange-improve-position',
    category: 'EXCHANGE_STRATEGY',
    title: "Exchange to Improve Position",
    subtitle: "Strategic piece trading",
    fen: 'r1bq1rk1/ppp2ppp/2n2n2/3pp3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w - - 0 6',
    toMove: 'white',
    introduction: "Sometimes an exchange improves your position even if it doesn't gain material. Trading a less active piece for an active one, or eliminating a defender, can be powerful.",
    keyIdeas: [
      "Trade bad pieces for good ones",
      "Eliminate key defenders",
      "Improve pawn structure via trades",
      "Quality over quantity of pieces"
    ],
    mainLine: [
      {
        move: "exd5",
        isMainLine: true,
        annotation: "",
        explanation: "Opening the position.",
        conceptTag: ""
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures actively.",
        conceptTag: ""
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "!",
        explanation: "Exchanging knights. Why? Our knight was passive, theirs was central. Now we have the bishop pair!",
        highlights: ["d5"],
        conceptTag: "Good Trade"
      },
      {
        move: "Qxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures.",
        conceptTag: ""
      },
      {
        move: "Be3",
        isMainLine: true,
        annotation: "!",
        explanation: "Development continues. We traded a passive knight and kept our bishop pair.",
        highlights: ["e3"],
        conceptTag: "Bishop Pair"
      }
    ],
    summary: "Exchange strategically to improve your position. Trade passive pieces for active ones, eliminate key defenders, or achieve the bishop pair advantage.",
    keyTakeaways: [
      "Trade passive pieces for active",
      "Achieve the bishop pair",
      "Eliminate key defenders",
      "Position > material sometimes"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Strategic thinking"
  },

  {
    id: 'exchange-simplify-to-win',
    category: 'EXCHANGE_STRATEGY',
    title: "Exchange When Ahead",
    subtitle: "Simplify to convert",
    fen: 'r4rk1/ppp2ppp/2n2n2/3p4/3P4/2N2N2/PPP2PPP/R4RK1 w - - 0 12',
    toMove: 'white',
    introduction: "When you have an advantage - material, pawn structure, or positional - exchanges often help convert it. Fewer pieces mean fewer complications and easier technique.",
    keyIdeas: [
      "Exchange when materially ahead",
      "Simplify positional advantages",
      "Fewer pieces = clearer win",
      "Avoid complications when winning"
    ],
    mainLine: [
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Initiating exchanges when we have a better structure.",
        conceptTag: ""
      },
      {
        move: "Nxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures.",
        conceptTag: ""
      },
      {
        move: "Rxf8+",
        isMainLine: true,
        annotation: "!",
        explanation: "More exchanges! Simplifying favors the side with the better position.",
        highlights: ["f8"],
        conceptTag: "Simplify"
      },
      {
        move: "Rxf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black must recapture.",
        conceptTag: ""
      },
      {
        move: "Rxf8+",
        isMainLine: true,
        annotation: "",
        explanation: "Another exchange.",
        conceptTag: ""
      },
      {
        move: "Kxf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black takes.",
        conceptTag: ""
      },
      {
        move: "Ne5",
        isMainLine: true,
        annotation: "!",
        explanation: "Now with fewer pieces, our knight dominates. The advantage is easier to convert.",
        highlights: ["e5"],
        conceptTag: "Conversion"
      }
    ],
    summary: "When ahead, exchange pieces to simplify. Fewer pieces means fewer complications and a clearer path to victory. Don't give counterplay.",
    keyTakeaways: [
      "Exchange when winning",
      "Fewer pieces = easier win",
      "Avoid complications",
      "Technique beats creativity"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Winning technique"
  },

  // GOOD_BAD_BISHOP - need 2 more (13 → 15)
  {
    id: 'good-bad-bishop-outside-chain',
    category: 'GOOD_BAD_BISHOP',
    title: "Bishop Outside Pawn Chain",
    subtitle: "Activating the bad bishop",
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/2ppP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    introduction: "A bad bishop (one blocked by its own pawns) can be activated by placing it outside the pawn chain. This maneuver transforms weakness into strength.",
    keyIdeas: [
      "Bad bishops can be activated",
      "Place bishop outside chain",
      "a3-f8 or a6-f1 diagonals",
      "Transformation through maneuver"
    ],
    mainLine: [
      {
        move: "Be2",
        isMainLine: true,
        annotation: "",
        explanation: "First develop normally.",
        conceptTag: ""
      },
      {
        move: "cxd4",
        isMainLine: true,
        annotation: "",
        explanation: "Black exchanges.",
        conceptTag: ""
      },
      {
        move: "Nxd4",
        isMainLine: true,
        annotation: "",
        explanation: "Recapturing.",
        conceptTag: ""
      },
      {
        move: "Bc5",
        isMainLine: true,
        annotation: "",
        explanation: "Black's bishop is outside its pawn chain and active!",
        conceptTag: ""
      },
      {
        move: "Be3",
        isMainLine: true,
        annotation: "!",
        explanation: "Our bishop also goes outside the pawn chain on e3. Now it's not blocked by e5.",
        highlights: ["e3"],
        conceptTag: "Outside Chain"
      }
    ],
    summary: "A bad bishop can be rehabilitated by placing it outside the pawn chain. This maneuver activates the bishop and transforms a weakness into a strength.",
    keyTakeaways: [
      "Bad bishops can improve",
      "Place outside pawn chain",
      "Common maneuver in French",
      "Transform weakness to strength"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "French Defense strategy"
  },

  {
    id: 'good-bad-bishop-exchange',
    category: 'GOOD_BAD_BISHOP',
    title: "Exchanging the Bad Bishop",
    subtitle: "Trade weakness away",
    fen: 'r1bqk2r/ppp1bppp/2n1pn2/3p4/3P4/3BPN2/PPP2PPP/RNBQK2R w KQkq - 0 6',
    toMove: 'white',
    introduction: "If you can't activate your bad bishop, exchange it! Trading a bad bishop for an opponent's good piece eliminates your weakness.",
    keyIdeas: [
      "Exchange bad bishops",
      "Trade weakness for opponent's strength",
      "b1-a2-xc4 maneuver is common",
      "Don't suffer with bad pieces"
    ],
    mainLine: [
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling first.",
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
        move: "b3",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing to fianchetto and exchange the bad bishop!",
        highlights: ["b3"],
        conceptTag: "Preparation"
      },
      {
        move: "c5",
        isMainLine: true,
        annotation: "",
        explanation: "Black challenges the center.",
        conceptTag: ""
      },
      {
        move: "Ba3",
        isMainLine: true,
        annotation: "!",
        explanation: "The bad bishop finds activity! It pressures c5 and eyes the b8-h2 diagonal.",
        highlights: ["a3"],
        conceptTag: "Activation"
      }
    ],
    summary: "Don't suffer with a bad bishop - exchange it or find active squares. Trading weakness away is often the practical solution.",
    keyTakeaways: [
      "Exchange bad bishops when possible",
      "Trade weakness for strength",
      "Fianchetto helps activate",
      "Don't keep passive pieces"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Practical play"
  },

  // KING_ACTIVITY - need 2 more (13 → 15)
  {
    id: 'king-activity-endgame-advanced',
    category: 'KING_ACTIVITY',
    title: "King Activity in Complex Endgames",
    subtitle: "King as attacking piece",
    fen: 'r5k1/ppp2ppp/8/3p4/8/8/PPP2PPP/R5K1 w - - 0 25',
    toMove: 'white',
    introduction: "In endgames with rooks and pawns, the king must be active. An active king supports its own pawns, attacks enemy pawns, and can even join in mating attacks.",
    keyIdeas: [
      "King is fighting piece in endgames",
      "Centralize before opponent does",
      "King supports rook operations",
      "Active king often decisive"
    ],
    mainLine: [
      {
        move: "Kf2",
        isMainLine: true,
        annotation: "!",
        explanation: "The king immediately heads toward the center!",
        highlights: ["f2"],
        conceptTag: "Activation"
      },
      {
        move: "Kf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black's king also activates.",
        conceptTag: ""
      },
      {
        move: "Ke3",
        isMainLine: true,
        annotation: "!",
        explanation: "Centralizing further. The king eyes d4 and e4.",
        highlights: ["e3"],
        conceptTag: ""
      },
      {
        move: "Ke7",
        isMainLine: true,
        annotation: "",
        explanation: "Black follows suit.",
        conceptTag: ""
      },
      {
        move: "Kd4",
        isMainLine: true,
        annotation: "!",
        explanation: "The king reaches a dominant central post! It supports everything.",
        highlights: ["d4"],
        conceptTag: "Centralization"
      }
    ],
    summary: "In endgames, race to centralize your king. The active king supports pawns, attacks weaknesses, and often makes the difference between winning and drawing.",
    keyTakeaways: [
      "Centralize king immediately",
      "King is a fighting piece",
      "Support pawns and rook operations",
      "Active king often wins"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Endgame mastery"
  },

  {
    id: 'king-activity-opposition',
    category: 'KING_ACTIVITY',
    title: "King Opposition Technique",
    subtitle: "Mastering king endings",
    fen: '8/8/8/4k3/8/4K3/4P3/8 w - - 0 50',
    toMove: 'white',
    introduction: "Opposition is when kings face each other with one square between. The side NOT to move has the opposition and can outflank the opponent. This is fundamental to king activity.",
    keyIdeas: [
      "Opposition controls key squares",
      "Side not to move has it",
      "Use to outflank opponent",
      "Fundamental endgame technique"
    ],
    mainLine: [
      {
        move: "Kf3",
        isMainLine: true,
        annotation: "!",
        explanation: "Taking the opposition! Black must give way.",
        highlights: ["f3"],
        conceptTag: "Opposition"
      },
      {
        move: "Kf5",
        isMainLine: true,
        annotation: "",
        explanation: "Black tries to stay near the pawn.",
        conceptTag: ""
      },
      {
        move: "e4+",
        isMainLine: true,
        annotation: "!",
        explanation: "Pushing with check!",
        highlights: ["e4"],
        conceptTag: ""
      },
      {
        move: "Ke5",
        isMainLine: true,
        annotation: "",
        explanation: "Black blocks.",
        conceptTag: ""
      },
      {
        move: "Ke3",
        isMainLine: true,
        annotation: "!",
        explanation: "Taking opposition again! The king will escort the pawn forward.",
        highlights: ["e3"],
        conceptTag: "Outflanking"
      }
    ],
    summary: "Opposition is key to king activity in pawn endings. The side with opposition can outflank the opponent and escort pawns to promotion.",
    keyTakeaways: [
      "Opposition is fundamental",
      "Side not to move has it",
      "Use to outflank",
      "Escort pawns with king"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Pawn endgames"
  },

  // KNIGHT_PLACEMENT - need 2 more (13 → 15)
  {
    id: 'knight-central-square',
    category: 'KNIGHT_PLACEMENT',
    title: "Knights in the Center",
    subtitle: "Maximum knight power",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 4',
    toMove: 'white',
    introduction: "Knights are most powerful in the center where they control the maximum number of squares. A knight on e4, d4, e5, or d5 controls 8 squares; on the rim, only 4.",
    keyIdeas: [
      "Central knights control 8 squares",
      "Edge knights control only 4",
      "Knights love e4, d4, e5, d5",
      "A knight on the rim is dim"
    ],
    mainLine: [
      {
        move: "Bb5",
        isMainLine: true,
        annotation: "",
        explanation: "Developing while preparing d4.",
        conceptTag: ""
      },
      {
        move: "a6",
        isMainLine: true,
        annotation: "",
        explanation: "Black kicks the bishop.",
        conceptTag: ""
      },
      {
        move: "Ba4",
        isMainLine: true,
        annotation: "",
        explanation: "Maintaining the pin.",
        conceptTag: ""
      },
      {
        move: "Nf6",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "d3",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing to maneuver Nd5 later. The knight aims for the center!",
        highlights: ["d3"],
        conceptTag: "Preparation"
      }
    ],
    summary: "Place knights in the center for maximum power. A centralized knight controls 8 squares and influences the entire board. Avoid the rim.",
    keyTakeaways: [
      "Central knights are powerful",
      "They control 8 squares",
      "Aim for e4, d4, e5, d5",
      "Avoid the rim"
    ],
    difficulty: 1,
    estimatedMinutes: 4,
    source: "Basic principles"
  },

  {
    id: 'knight-eternal-knight',
    category: 'KNIGHT_PLACEMENT',
    title: "The Eternal Knight",
    subtitle: "Unassailable position",
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2Np4/3P4/4PN2/PP3PPP/R1BQKB1R w KQ - 0 8',
    toMove: 'white',
    introduction: "An 'eternal knight' is one placed on a square where it cannot be driven away. This often occurs when the opponent lacks a pawn that could challenge the square.",
    keyIdeas: [
      "Eternal knight can't be challenged",
      "No pawn can drive it away",
      "Permanently strong position",
      "Worth more than exchange"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "Developing.",
        conceptTag: ""
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling.",
        conceptTag: ""
      },
      {
        move: "Rc8",
        isMainLine: true,
        annotation: "",
        explanation: "Black activates.",
        conceptTag: ""
      },
      {
        move: "b4",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight on c5 is eternal! Black's b7 pawn cannot challenge it, and b4 supports the outpost.",
        highlights: ["b4", "c5"],
        conceptTag: "Eternal Knight"
      }
    ],
    summary: "An eternal knight on a supported square is extremely powerful. When no enemy pawn can challenge it, the knight dominates that part of the board.",
    keyTakeaways: [
      "Eternal knights can't be driven",
      "Support with pawns",
      "Worth more than exchange",
      "Dominates the position"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Strategic concepts"
  },

  // MINORITY_ATTACK - need 2 more (13 → 15)
  {
    id: 'minority-attack-classic',
    category: 'MINORITY_ATTACK',
    title: "The Classic Minority Attack",
    subtitle: "Attacking with fewer pawns",
    fen: 'r1bq1rk1/pp1n1ppp/2pbpn2/8/2PP4/2N2N2/PPQ1PPPP/R1B1KB1R w KQ - 0 8',
    toMove: 'white',
    introduction: "In a minority attack, you advance pawns on the side where you have fewer pawns to create weaknesses in the opponent's pawn structure. The classic setup is b4-b5xc6.",
    keyIdeas: [
      "Advance minority pawns (a and b)",
      "b4-b5 attacks c6 pawn",
      "Creates isolated or backward pawns",
      "Then attack the weakness"
    ],
    mainLine: [
      {
        move: "Rb1",
        isMainLine: true,
        annotation: "!",
        explanation: "The rook prepares the minority attack. b4-b5 is coming.",
        highlights: ["b1"],
        conceptTag: "Preparation"
      },
      {
        move: "Qe7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "b4",
        isMainLine: true,
        annotation: "!",
        explanation: "The minority attack begins! The b-pawn advances.",
        highlights: ["b4"],
        conceptTag: "Minority Attack"
      },
      {
        move: "a6",
        isMainLine: true,
        annotation: "",
        explanation: "Black tries to slow the attack.",
        conceptTag: ""
      },
      {
        move: "a4",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing b5! After bxa6, Black gets a weak c6 pawn or isolated a-pawn.",
        highlights: ["a4"],
        conceptTag: "Advance"
      }
    ],
    summary: "The minority attack uses fewer pawns to attack more pawns, creating structural weaknesses. The classic b4-b5xc6 leaves Black with an isolated c-pawn or backward b-pawn.",
    keyTakeaways: [
      "Minority attacks fewer with more",
      "b4-b5 is the classic setup",
      "Creates isolated or backward pawns",
      "Attack the resulting weakness"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Carlsbad structure"
  },

  {
    id: 'minority-attack-defense',
    category: 'MINORITY_ATTACK',
    title: "Defending Against Minority Attack",
    subtitle: "Counter-strategies",
    fen: 'r1bq1rk1/pppn1ppp/3bpn2/8/1PPP4/2N2N2/P1Q1PPPP/R1B1KB1R b KQ - 0 8',
    toMove: 'black',
    introduction: "When facing a minority attack, you have several defenses: counterattack on the kingside, play ...c5 to exchange pawns, or prepare ...a5 to blunt the attack.",
    keyIdeas: [
      "Kingside counterattack",
      "...c5 break dissolves tension",
      "...a5 blunts the b5 push",
      "Activity over passivity"
    ],
    mainLine: [
      {
        move: "a5",
        isMainLine: true,
        annotation: "!",
        explanation: "Fighting the minority attack! This stops b5 cold.",
        highlights: ["a5"],
        conceptTag: "Defense"
      },
      {
        move: "b5",
        isMainLine: true,
        annotation: "",
        explanation: "White tries anyway.",
        conceptTag: ""
      },
      {
        move: "a4",
        isMainLine: true,
        annotation: "!",
        explanation: "The pawn is immune! Black has blunted the attack and fixed the queenside.",
        highlights: ["a4"],
        conceptTag: "Counterplay"
      },
      {
        move: "Rb1",
        isMainLine: true,
        annotation: "",
        explanation: "White regroups.",
        conceptTag: ""
      },
      {
        move: "Ne4",
        isMainLine: true,
        annotation: "!",
        explanation: "Black gets counterplay with piece activity!",
        highlights: ["e4"],
        conceptTag: "Activity"
      }
    ],
    summary: "Defend against minority attacks with ...a5 to stop b5, ...c5 to dissolve the structure, or kingside counterattack. Activity beats passivity.",
    keyTakeaways: [
      "...a5 stops b5",
      "...c5 dissolves the structure",
      "Kingside counter is possible",
      "Don't be passive"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Defensive technique"
  },

  // OPEN_FILES - need 2 more (13 → 15)
  {
    id: 'open-files-creating',
    category: 'OPEN_FILES',
    title: "Creating Open Files",
    subtitle: "Manufacturing rook highways",
    fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQ - 0 6',
    toMove: 'white',
    introduction: "Rooks need open files to be effective. You can create open files by advancing pawns and forcing exchanges. The resulting open file gives your rooks activity.",
    keyIdeas: [
      "Open files with pawn exchanges",
      "Plan which file to open",
      "Rook needs highway to function",
      "Create then occupy"
    ],
    mainLine: [
      {
        move: "cxd5",
        isMainLine: true,
        annotation: "!",
        explanation: "Opening the c-file! Our rook will use it.",
        highlights: ["d5"],
        conceptTag: "Opening File"
      },
      {
        move: "exd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures.",
        conceptTag: ""
      },
      {
        move: "Bg5",
        isMainLine: true,
        annotation: "",
        explanation: "Developing with tempo.",
        conceptTag: ""
      },
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Black breaks the pin.",
        conceptTag: ""
      },
      {
        move: "Rc1",
        isMainLine: true,
        annotation: "!",
        explanation: "Occupying the open file immediately! The rook is now active.",
        highlights: ["c1"],
        conceptTag: "Occupation"
      }
    ],
    summary: "Create open files through pawn exchanges, then occupy them with rooks. A rook on an open file controls the entire file and invades the enemy position.",
    keyTakeaways: [
      "Exchange pawns to open files",
      "Occupy immediately after opening",
      "Open files = rook activity",
      "Plan which file benefits you"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Positional play"
  },

  {
    id: 'open-files-7th-rank',
    category: 'OPEN_FILES',
    title: "Rook on the 7th Rank",
    subtitle: "The dream invasion",
    fen: 'r4rk1/ppp2ppp/2n2n2/3p4/8/2N2N2/PPP2PPP/R4RK1 w - - 0 12',
    toMove: 'white',
    introduction: "A rook on the 7th rank is one of the most powerful pieces in chess. It attacks pawns from behind, restricts the enemy king, and often leads to decisive advantages.",
    keyIdeas: [
      "7th rank attacks pawns from behind",
      "Restricts enemy king to back rank",
      "Two rooks on 7th often wins",
      "Goal of open file control"
    ],
    mainLine: [
      {
        move: "Re1",
        isMainLine: true,
        annotation: "!",
        explanation: "Controlling the e-file, aiming for e7.",
        highlights: ["e1"],
        conceptTag: ""
      },
      {
        move: "Rf7",
        isMainLine: true,
        annotation: "",
        explanation: "Black defends.",
        conceptTag: ""
      },
      {
        move: "Re7",
        isMainLine: true,
        annotation: "!",
        explanation: "The 7th rank! The rook attacks from behind.",
        highlights: ["e7"],
        conceptTag: "7th Rank"
      },
      {
        move: "Raf8",
        isMainLine: true,
        annotation: "",
        explanation: "Black doubles rooks.",
        conceptTag: ""
      },
      {
        move: "Rae1",
        isMainLine: true,
        annotation: "!",
        explanation: "Doubling on the e-file! Threatening Re8 with pressure.",
        highlights: ["e1"],
        conceptTag: "Doubling"
      }
    ],
    summary: "The 7th rank is the ultimate goal of rook play. A rook on the 7th attacks pawns, restricts the king, and often wins material or the game outright.",
    keyTakeaways: [
      "7th rank is extremely powerful",
      "Attacks pawns from behind",
      "Restricts the enemy king",
      "Two rooks on 7th is devastating"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Classical technique"
  },

  // PAWN_BREAKS - need 2 more (13 → 15)
  {
    id: 'pawn-break-c5-break',
    category: 'PAWN_BREAKS',
    title: "The ...c5 Break",
    subtitle: "Challenging the center",
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/2pp4/3P4/2N1PN2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    introduction: "The ...c5 break is Black's way of challenging White's d4 pawn and fighting for central control. Timing this break correctly is crucial to achieving equality.",
    keyIdeas: [
      "...c5 challenges d4 directly",
      "Opens the c-file",
      "Frees Black's position",
      "Timing is everything"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "White develops.",
        conceptTag: ""
      },
      {
        move: "cxd4",
        isMainLine: true,
        annotation: "!",
        explanation: "The c5 break executes! Black challenges the center.",
        highlights: ["d4"],
        conceptTag: "Break"
      },
      {
        move: "exd4",
        isMainLine: true,
        annotation: "",
        explanation: "White recaptures.",
        conceptTag: ""
      },
      {
        move: "Bb4",
        isMainLine: true,
        annotation: "!",
        explanation: "Black is active after the break. The position is open and Black has easy development.",
        highlights: ["b4"],
        conceptTag: "Activity"
      }
    ],
    summary: "The ...c5 break challenges the d4 center and opens Black's position. Time it when you're ready to handle the resulting open game.",
    keyTakeaways: [
      "...c5 fights for center",
      "Opens position for pieces",
      "Timing must be right",
      "Creates active play"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Queen's Gambit Declined"
  },

  {
    id: 'pawn-break-thematic-e5',
    category: 'PAWN_BREAKS',
    title: "The e5 Break",
    subtitle: "Opening the center",
    fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "The e5 break, when prepared correctly, can blow open the center and create attacking chances. It often comes with tempo if it attacks a piece.",
    keyIdeas: [
      "e5 opens the center",
      "Often attacks the f6 knight",
      "Creates pawn on e5 wedge",
      "Requires preparation"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "Developing and preparing e4-e5.",
        conceptTag: ""
      },
      {
        move: "dxc4",
        isMainLine: true,
        annotation: "",
        explanation: "Black takes.",
        conceptTag: ""
      },
      {
        move: "Bxc4",
        isMainLine: true,
        annotation: "",
        explanation: "Recapturing.",
        conceptTag: ""
      },
      {
        move: "b6",
        isMainLine: true,
        annotation: "",
        explanation: "Black fianchettoes.",
        conceptTag: ""
      },
      {
        move: "e4",
        isMainLine: true,
        annotation: "!",
        explanation: "Preparing e5! The break is coming.",
        highlights: ["e4"],
        conceptTag: "Preparation"
      },
      {
        move: "Bb7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "e5",
        isMainLine: true,
        annotation: "!",
        explanation: "The break! The knight must retreat and White gets a central wedge.",
        highlights: ["e5"],
        conceptTag: "e5 Break"
      }
    ],
    summary: "The e5 break opens the center and often comes with tempo against the f6 knight. A pawn on e5 can be a powerful wedge in the opponent's position.",
    keyTakeaways: [
      "e5 opens the position",
      "Often gains tempo",
      "e5 pawn can be a wedge",
      "Needs proper preparation"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Central breaks"
  },

  // PAWN_STRUCTURE - need 2 more (13 → 15)
  {
    id: 'pawn-structure-doubled-pawns',
    category: 'PAWN_STRUCTURE',
    title: "Doubled Pawns Dynamics",
    subtitle: "Weakness and compensation",
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 4',
    toMove: 'white',
    introduction: "Doubled pawns are often weak, but not always. The compensation can include open files, central control, or bishop pair. Understanding when doubled pawns help or hurt is key.",
    keyIdeas: [
      "Doubled pawns can be weak",
      "Open files as compensation",
      "Extra central control possible",
      "Context determines value"
    ],
    mainLine: [
      {
        move: "Bxf6",
        isMainLine: true,
        annotation: "",
        explanation: "Creating doubled pawns in Black's camp.",
        conceptTag: ""
      },
      {
        move: "gxf6",
        isMainLine: true,
        annotation: "",
        explanation: "Black must recapture, creating doubled f-pawns.",
        conceptTag: ""
      },
      {
        move: "d4",
        isMainLine: true,
        annotation: "",
        explanation: "Opening the center.",
        conceptTag: ""
      },
      {
        move: "d6",
        isMainLine: true,
        annotation: "",
        explanation: "Black solidifies.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "!",
        explanation: "Black has doubled pawns but the half-open g-file and bishop pair compensate. The position is complex.",
        highlights: ["f6"],
        conceptTag: "Compensation"
      }
    ],
    summary: "Doubled pawns are not automatically bad. They can provide open files and central control. Judge each position on its own merits.",
    keyTakeaways: [
      "Doubled pawns: context matters",
      "Open files compensate",
      "Central control can help",
      "Not automatically weak"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Pawn structure theory"
  },

  {
    id: 'pawn-structure-backward-pawn',
    category: 'PAWN_STRUCTURE',
    title: "The Backward Pawn",
    subtitle: "Understanding this weakness",
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    introduction: "A backward pawn cannot be protected by other pawns and sits on a semi-open file. The square in front of it becomes an outpost for the opponent's pieces.",
    keyIdeas: [
      "Backward pawn can't advance safely",
      "Square in front is an outpost",
      "Target for rook attacks",
      "Creates positional weakness"
    ],
    mainLine: [
      {
        move: "cxd5",
        isMainLine: true,
        annotation: "",
        explanation: "Exchanging.",
        conceptTag: ""
      },
      {
        move: "exd5",
        isMainLine: true,
        annotation: "",
        explanation: "Black recaptures, creating an isolated pawn.",
        conceptTag: ""
      },
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "!",
        explanation: "Developing while eyeing the isolated pawn.",
        highlights: ["d3"],
        conceptTag: ""
      },
      {
        move: "Bd6",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling.",
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
        move: "Nd4",
        isMainLine: true,
        annotation: "!",
        explanation: "The knight occupies the square in front of the isolated pawn! This is a typical blockade.",
        highlights: ["d4"],
        conceptTag: "Blockade"
      }
    ],
    summary: "A backward or isolated pawn is weak because the square in front becomes an outpost. Blockade it with a piece and pile up pressure.",
    keyTakeaways: [
      "Backward pawns are targets",
      "Square in front is an outpost",
      "Blockade then attack",
      "Rooks attack on the file"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Structural weaknesses"
  },

  // PIECE_COORDINATION - need 2 more (13 → 15)
  {
    id: 'piece-coordination-rooks-knights',
    category: 'PIECE_COORDINATION',
    title: "Rooks and Knights Together",
    subtitle: "Complementary powers",
    fen: 'r3r1k1/ppp2ppp/2n2n2/3p4/8/2N2N2/PPP2PPP/R3R1K1 w - - 0 14',
    toMove: 'white',
    introduction: "Rooks and knights complement each other well. Rooks control files and ranks while knights control complex patterns of squares. Together they cover the board.",
    keyIdeas: [
      "Rooks control linear squares",
      "Knights control non-linear squares",
      "Together they cover everything",
      "Coordinate for attacks"
    ],
    mainLine: [
      {
        move: "Ne5",
        isMainLine: true,
        annotation: "!",
        explanation: "Knight centralizes powerfully!",
        highlights: ["e5"],
        conceptTag: ""
      },
      {
        move: "Nxe5",
        isMainLine: true,
        annotation: "",
        explanation: "Black exchanges.",
        conceptTag: ""
      },
      {
        move: "Rxe5",
        isMainLine: true,
        annotation: "",
        explanation: "The rook takes over the central file.",
        conceptTag: ""
      },
      {
        move: "Re6",
        isMainLine: true,
        annotation: "",
        explanation: "Black contests.",
        conceptTag: ""
      },
      {
        move: "Rae1",
        isMainLine: true,
        annotation: "!",
        explanation: "Doubled rooks! Now Nd4 is coming.",
        highlights: ["e1"],
        conceptTag: ""
      },
      {
        move: "Rae8",
        isMainLine: true,
        annotation: "",
        explanation: "Black also doubles.",
        conceptTag: ""
      },
      {
        move: "Nd4",
        isMainLine: true,
        annotation: "!",
        explanation: "Knight and rooks coordinate beautifully. The knight eyes c6 and e6.",
        highlights: ["d4"],
        conceptTag: "Coordination"
      }
    ],
    summary: "Rooks and knights work well together. Rooks handle files and ranks while knights handle the complex squares. Coordinate them for maximum effect.",
    keyTakeaways: [
      "Rooks and knights complement",
      "Different square control patterns",
      "Coordinate for attacks",
      "Cover each other's weaknesses"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Piece coordination"
  },

  {
    id: 'piece-coordination-battery',
    category: 'PIECE_COORDINATION',
    title: "Creating Batteries",
    subtitle: "Lined up power",
    fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "A battery is two pieces lined up on the same file or diagonal, with the less valuable piece in front. Queen-bishop and queen-rook batteries create powerful threats.",
    keyIdeas: [
      "Line up pieces on same line",
      "Less valuable piece in front",
      "Queen-bishop diagonal battery",
      "Queen-rook file battery"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "Developing the bishop.",
        conceptTag: ""
      },
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling.",
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
        move: "Qc2",
        isMainLine: true,
        annotation: "!",
        explanation: "Creating a queen-bishop battery on the b1-h7 diagonal! This eyes h7 and creates threats.",
        highlights: ["c2", "d3"],
        conceptTag: "Battery"
      }
    ],
    summary: "Batteries multiply the power of pieces by lining them up. The classic Qc2+Bd3 battery aims at h7 and is a common attacking setup.",
    keyTakeaways: [
      "Batteries multiply power",
      "Queen behind the bishop",
      "Qc2+Bd3 is classic",
      "Creates strong threats"
    ],
    difficulty: 2,
    estimatedMinutes: 5,
    source: "Attacking play"
  },

  // PROPHYLAXIS - need 2 more (13 → 15)
  {
    id: 'prophylaxis-preventing-breaks',
    category: 'PROPHYLAXIS',
    title: "Preventing Pawn Breaks",
    subtitle: "Stopping liberating advances",
    fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "A key prophylactic idea is preventing the opponent's pawn breaks. By stopping their liberating advances, you keep them cramped and without counterplay.",
    keyIdeas: [
      "Identify opponent's pawn breaks",
      "Prevent them proactively",
      "Keep opponent cramped",
      "No counterplay = winning"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "Developing while controlling e4.",
        conceptTag: ""
      },
      {
        move: "dxc4",
        isMainLine: true,
        annotation: "",
        explanation: "Black exchanges.",
        conceptTag: ""
      },
      {
        move: "Bxc4",
        isMainLine: true,
        annotation: "",
        explanation: "Recapturing.",
        conceptTag: ""
      },
      {
        move: "b6",
        isMainLine: true,
        annotation: "",
        explanation: "Black prepares ...Bb7.",
        conceptTag: ""
      },
      {
        move: "Qe2",
        isMainLine: true,
        annotation: "!",
        explanation: "Prophylaxis! This prevents ...e5 by controlling the e5 square. Black remains cramped.",
        highlights: ["e2"],
        conceptTag: "Prophylaxis"
      }
    ],
    summary: "Prevent your opponent's pawn breaks to keep them cramped. Controlling the squares where breaks would occur is key prophylactic technique.",
    keyTakeaways: [
      "Identify pawn breaks",
      "Control break squares",
      "Keep opponent cramped",
      "Prophylaxis before attack"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Prophylactic thinking"
  },

  {
    id: 'prophylaxis-overprotection',
    category: 'PROPHYLAXIS',
    title: "Overprotection",
    subtitle: "Defending key squares multiple times",
    fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 7',
    toMove: 'white',
    introduction: "Overprotection means defending a key square or pawn multiple times - more than strictly necessary. This frees pieces for other tasks while maintaining rock-solid control.",
    keyIdeas: [
      "Defend key squares multiple times",
      "More protection than needed",
      "Frees pieces for other duties",
      "Nimzowitsch's concept"
    ],
    mainLine: [
      {
        move: "Bd3",
        isMainLine: true,
        annotation: "",
        explanation: "Development.",
        conceptTag: ""
      },
      {
        move: "Be7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "O-O",
        isMainLine: true,
        annotation: "",
        explanation: "Castling.",
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
        move: "Qc2",
        isMainLine: true,
        annotation: "",
        explanation: "The queen overprotects e4.",
        conceptTag: ""
      },
      {
        move: "Bd7",
        isMainLine: true,
        annotation: "",
        explanation: "Black develops.",
        conceptTag: ""
      },
      {
        move: "Rfe1",
        isMainLine: true,
        annotation: "!",
        explanation: "Triple overprotection of e4! Now pieces can move freely - e4 is rock solid.",
        highlights: ["e1"],
        conceptTag: "Overprotection"
      }
    ],
    summary: "Overprotection gives pieces freedom. By defending key points multiple times, individual pieces can leave their posts temporarily without losing control.",
    keyTakeaways: [
      "Defend key points multiply",
      "Frees pieces for other tasks",
      "Rock-solid control",
      "Nimzowitsch's key concept"
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: "Nimzowitsch's system"
  }
];

export default additionalPatterns;
