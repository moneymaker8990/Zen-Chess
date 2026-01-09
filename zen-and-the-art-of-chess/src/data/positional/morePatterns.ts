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
  }
];

export default additionalPatterns;
