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
  }
];

export default additionalPatterns;
