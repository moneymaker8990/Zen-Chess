// ============================================
// THE CALCULATION DOJO
// Pure calculation training for chess mastery
// Deep multi-move sequences with visualization exercises
// ============================================

import type { Course, CourseVariation } from './courseTypes';

// ============================================
// CHAPTER 1: CALCULATION FUNDAMENTALS
// ============================================

const calculationFundamentals: CourseVariation[] = [
  {
    id: 'fund-candidate-moves',
    title: 'Finding Candidate Moves',
    fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/1bPP4/2NBPN2/PP3PPP/R1BQK2R w KQ - 0 7',
    toMove: 'white',
    concept: 'Always identify candidate moves before calculating',
    keyTakeaway: 'List ALL reasonable moves before calculating deeply',
    difficulty: 2,
    introduction: 'Before calculating, list your candidate moves. Don\'t calculate the first move that comes to mind - survey the position first!',
    moves: [
      {
        move: 'cxd5',
        annotation: '!',
        explanation: 'Candidate 1: Take on d5. Opens the position, attacks the knight.',
        arrows: [{ from: 'c4', to: 'd5', color: 'green' }],
        alternatives: [
          { move: 'a3', evaluation: 'good', explanation: 'Candidate 2: Challenge the bishop.' },
          { move: 'O-O', evaluation: 'good', explanation: 'Candidate 3: Castle for safety.' },
          { move: 'Qc2', evaluation: 'good', explanation: 'Candidate 4: Develop queen, prepare e4.' },
          { move: 'e4', evaluation: 'dubious', explanation: 'Candidate 5: Aggressive but premature.' }
        ]
      },
      {
        move: 'exd5',
        explanation: 'Black recaptures.',
      },
      {
        move: 'O-O',
        annotation: '!',
        explanation: 'Now castle! We calculated that after cxd5, we can castle safely.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }],
      },
      {
        move: 'Be7',
        explanation: 'Black retreats the bishop.',
      },
      {
        move: 'b3',
        annotation: '!',
        explanation: 'Preparing Ba3 to trade the bishops. This was part of our plan.',
        arrows: [{ from: 'b2', to: 'b3', color: 'green' }],
      }
    ],
    commonMistakes: ['Calculating the first move that comes to mind', 'Not considering all options'],
    deeperPrinciple: 'Kotov\'s method: Identify candidates, calculate each ONCE, choose the best.',
  },
  {
    id: 'fund-forcing-first',
    title: 'Calculate Forcing Moves First',
    fen: 'r2q1rk1/pp2bppp/2n1p3/3pP3/3P4/2PB1N2/PP3PPP/R1BQ1RK1 w - - 0 11',
    toMove: 'white',
    concept: 'Checks, captures, and threats must be calculated first',
    keyTakeaway: 'CCT: Checks, Captures, Threats - in that order',
    difficulty: 2,
    introduction: 'Forcing moves limit opponent\'s options. Always calculate checks first, then captures, then threats.',
    moves: [
      {
        move: 'Bxh7+',
        annotation: '!!',
        explanation: 'A CHECK! This must be considered first. It\'s the Greek Gift sacrifice.',
        arrows: [{ from: 'd3', to: 'h7', color: 'red' }],
        highlights: ['h7'],
      },
      {
        move: 'Kxh7',
        explanation: 'King must take.',
      },
      {
        move: 'Ng5+',
        annotation: '!',
        explanation: 'Another CHECK! We continue calculating forcing moves.',
        arrows: [{ from: 'f3', to: 'g5', color: 'red' }],
      },
      {
        move: 'Kg8',
        explanation: 'Only safe square.',
        alternatives: [
          { move: 'Kg6', evaluation: 'bad', explanation: 'Qd3+ Kh5 Qh7+ and mate' }
        ]
      },
      {
        move: 'Qh5',
        annotation: '!',
        explanation: 'THREAT of Qh7#! Forcing move.',
        arrows: [{ from: 'd1', to: 'h5', color: 'red' }],
        highlights: ['h7'],
      },
      {
        move: 'Re8',
        explanation: 'Trying to defend.',
      },
      {
        move: 'Qxf7+',
        annotation: '!',
        explanation: 'CAPTURE with check! We collect material with the attack continuing.',
        arrows: [{ from: 'h5', to: 'f7', color: 'red' }],
      }
    ],
    commonMistakes: ['Calculating quiet moves before forcing moves', 'Missing checks and captures'],
    deeperPrinciple: 'CCT: Checks limit responses most, then captures, then threats.',
  },
  {
    id: 'fund-tree-calculation',
    title: 'Calculating Variations Tree',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Building a calculation tree with main line and variations',
    keyTakeaway: 'Calculate the main line deeply, then check critical alternatives',
    difficulty: 3,
    introduction: 'Deep calculation requires a tree: main line plus key alternatives. Don\'t jump between lines randomly!',
    moves: [
      {
        move: 'Ng5',
        annotation: '!',
        explanation: 'Main line starts. Now we calculate Black\'s responses.',
        arrows: [{ from: 'f3', to: 'g5', color: 'red' }],
        alternatives: [
          { move: 'O-O', evaluation: 'good', explanation: 'Alternative: Safe development' },
          { move: 'd3', evaluation: 'good', explanation: 'Alternative: Solid' }
        ]
      },
      {
        move: 'd5',
        explanation: 'Black\'s main response - counterattack!',
        alternatives: [
          { move: 'Bc5', evaluation: 'dubious', explanation: 'Allows Nxf7! Kxf7 Qf3+ wins' }
        ]
      },
      {
        move: 'exd5',
        explanation: 'We take. Now calculate Black\'s recaptures.',
      },
      {
        move: 'Na5',
        explanation: 'Black attacks our bishop - this is a key branch.',
        alternatives: [
          { move: 'Nxd5', evaluation: 'dubious', explanation: 'This leads to Fried Liver territory!' },
          { move: 'Nd4', evaluation: 'equal', explanation: 'Solid but passive' }
        ]
      },
      {
        move: 'Bb5+',
        annotation: '!',
        explanation: 'In-between move! We calculated this far and saw this check.',
        arrows: [{ from: 'c4', to: 'b5', color: 'green' }],
      },
      {
        move: 'c6',
        explanation: 'Forced block.',
      },
      {
        move: 'dxc6',
        explanation: 'Opening the position.',
      },
      {
        move: 'bxc6',
        explanation: 'Black recaptures.',
      },
      {
        move: 'Bd3',
        annotation: '!',
        explanation: 'Bishop retreats to safety with the attack continuing.',
      }
    ],
    commonMistakes: ['Jumping between variations', 'Not calculating opponent\'s best response'],
    deeperPrinciple: 'Calculate one line deeply, then go back and check alternatives.',
  },
];

// ============================================
// CHAPTER 2: VISUALIZATION TRAINING
// ============================================

const visualizationTraining: CourseVariation[] = [
  {
    id: 'vis-3-moves',
    title: '3-Move Visualization',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    toMove: 'white',
    concept: 'Visualize 3 moves ahead without moving pieces',
    keyTakeaway: 'See the position after 3 moves in your mind',
    difficulty: 2,
    introduction: 'Visualization is seeing future positions without moving pieces. Start with 3 moves (6 half-moves). Close your eyes and try to see the final position.',
    moves: [
      {
        move: 'Bc4',
        annotation: '!',
        explanation: 'Move 1: Bishop to c4. Visualize: Bishop on c4, pointing at f7.',
        arrows: [{ from: 'f1', to: 'c4', color: 'green' }],
      },
      {
        move: 'Bc5',
        explanation: 'Move 2: Black plays Bc5. Visualize: Black bishop on c5.',
      },
      {
        move: 'c3',
        annotation: '!',
        explanation: 'Move 3: c3 preparing d4. Visualize: Pawn on c3, d4 coming.',
        arrows: [{ from: 'c2', to: 'c3', color: 'green' }],
      },
      {
        move: 'Nf6',
        explanation: 'Move 4: Black develops Nf6. Can you see the position now?',
      },
      {
        move: 'd4',
        annotation: '!',
        explanation: 'Move 5: d4! Striking the center. The position you visualized!',
        arrows: [{ from: 'd2', to: 'd4', color: 'green' }],
      },
      {
        move: 'exd4',
        explanation: 'Move 6: Black takes. Now verify - did you see this position 3 moves ago?',
      }
    ],
    commonMistakes: ['Not practicing visualization regularly', 'Moving pieces mentally instead of seeing whole position'],
    deeperPrinciple: 'Close your eyes and see the position. This is how masters calculate.',
  },
  {
    id: 'vis-5-moves',
    title: '5-Move Visualization',
    fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQ - 0 5',
    toMove: 'white',
    concept: 'Visualize 5 moves ahead for deeper calculation',
    keyTakeaway: 'Hold 10 half-moves in your mind',
    difficulty: 3,
    introduction: 'Now let\'s go deeper: 5 moves ahead. This requires holding more pieces in your mental image. Practice!',
    moves: [
      {
        move: 'c3',
        explanation: 'Move 1: c3, preparing d4.',
      },
      {
        move: 'a6',
        explanation: 'Move 2: Black plays a6.',
      },
      {
        move: 'd4',
        explanation: 'Move 3: d4, striking the center.',
        arrows: [{ from: 'd3', to: 'd4', color: 'green' }],
      },
      {
        move: 'exd4',
        explanation: 'Move 4: Black takes.',
      },
      {
        move: 'cxd4',
        explanation: 'Move 5: We recapture.',
      },
      {
        move: 'Ba7',
        explanation: 'Move 6: Bishop retreats.',
      },
      {
        move: 'O-O',
        annotation: '!',
        explanation: 'Move 7: Castle! Can you see this position from move 1?',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }],
      },
      {
        move: 'd6',
        explanation: 'Move 8: Black plays d6.',
      },
      {
        move: 'Nc3',
        annotation: '!',
        explanation: 'Move 9: Develop the knight.',
      },
      {
        move: 'Bg4',
        explanation: 'Move 10: Black pins the knight. Did you visualize this far?',
      }
    ],
    commonMistakes: ['Losing track of piece positions', 'Not rebuilding the mental image regularly'],
    deeperPrinciple: 'Practice makes perfect. Start with 3 moves, work up to 5, then 7.',
  },
  {
    id: 'vis-forcing-sequence',
    title: 'Visualizing Forcing Sequences',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQ - 0 6',
    toMove: 'white',
    concept: 'Forcing moves are easier to visualize - fewer branches',
    keyTakeaway: 'Forcing sequences have limited responses - visualize them!',
    difficulty: 3,
    introduction: 'Forcing sequences are easier to visualize because opponent\'s responses are limited. Practice seeing checks and captures.',
    moves: [
      {
        move: 'Bxf7+',
        annotation: '!',
        explanation: 'CHECK! Only response is to take. Visualize the king on f7.',
        arrows: [{ from: 'c4', to: 'f7', color: 'red' }],
      },
      {
        move: 'Kxf7',
        explanation: 'Forced. King is now on f7.',
      },
      {
        move: 'Ng5+',
        annotation: '!',
        explanation: 'CHECK! King must move. Visualize: Where can it go?',
        arrows: [{ from: 'f3', to: 'g5', color: 'red' }],
      },
      {
        move: 'Kg8',
        explanation: 'Back to g8 (Ke8, Ke7, or Kg6 lose faster).',
        alternatives: [
          { move: 'Ke8', evaluation: 'bad', explanation: 'Ne6 wins the queen' },
          { move: 'Kg6', evaluation: 'bad', explanation: 'Qf3 threatening Qf7#' }
        ]
      },
      {
        move: 'Qb3+',
        annotation: '!',
        explanation: 'CHECK! Visualize: Black must block or move king.',
        arrows: [{ from: 'd1', to: 'b3', color: 'red' }],
      },
      {
        move: 'd5',
        explanation: 'Block with the pawn.',
      },
      {
        move: 'Nxd5',
        annotation: '!',
        explanation: 'CAPTURE! Removing the defender of c7.',
        arrows: [{ from: 'c3', to: 'd5', color: 'red' }],
      },
      {
        move: 'Qxg5',
        explanation: 'Black takes the knight.',
      },
      {
        move: 'Nf6+',
        annotation: '!',
        explanation: 'Discovered CHECK from bishop! King moves, then Nxg8.',
        arrows: [{ from: 'd5', to: 'f6', color: 'red' }],
      }
    ],
    commonMistakes: ['Not seeing all forcing responses', 'Missing intermediate moves'],
    deeperPrinciple: 'Forcing sequences compress the calculation tree - master them!',
  },
];

// ============================================
// CHAPTER 3: DEEP CALCULATION
// ============================================

const deepCalculation: CourseVariation[] = [
  {
    id: 'deep-6-move-combo',
    title: '6-Move Combination',
    fen: 'r2q1rk1/ppp1bppp/2n1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    concept: 'Calculate a 6-move tactical sequence',
    keyTakeaway: 'Deep calculation requires systematic approach',
    difficulty: 4,
    introduction: 'Let\'s calculate a 6-move combination. Take your time, visualize each position, and find the win.',
    moves: [
      {
        move: 'cxd5',
        explanation: 'Step 1: Open the position.',
      },
      {
        move: 'exd5',
        explanation: 'Black recaptures.',
      },
      {
        move: 'Nxd5',
        annotation: '!',
        explanation: 'Step 2: Sacrifice! Calculate if Black takes...',
        arrows: [{ from: 'c3', to: 'd5', color: 'red' }],
      },
      {
        move: 'Nxd5',
        explanation: 'Black takes the knight.',
      },
      {
        move: 'Bxh7+',
        annotation: '!!',
        explanation: 'Step 3: Greek Gift! Now calculate Kg8, Kxh7, Kf8...',
        arrows: [{ from: 'd3', to: 'h7', color: 'red' }],
      },
      {
        move: 'Kxh7',
        explanation: 'King takes.',
      },
      {
        move: 'Ng5+',
        annotation: '!',
        explanation: 'Step 4: Knight joins. King positions?',
        arrows: [{ from: 'f3', to: 'g5', color: 'red' }],
      },
      {
        move: 'Kg8',
        explanation: 'Only safe square.',
      },
      {
        move: 'Qh5',
        annotation: '!',
        explanation: 'Step 5: Queen attacks. Calculate defenses...',
        arrows: [{ from: 'd1', to: 'h5', color: 'red' }],
      },
      {
        move: 'Nf6',
        explanation: 'Blocking.',
      },
      {
        move: 'Qxf7+',
        annotation: '!',
        explanation: 'Step 6: Winning material with check!',
        arrows: [{ from: 'h5', to: 'f7', color: 'red' }],
      },
      {
        move: 'Kh8',
        explanation: 'King retreats.',
      },
      {
        move: 'Qxe7',
        annotation: '!',
        explanation: 'We calculated 6 moves deep and won a piece plus pawns!',
      }
    ],
    commonMistakes: ['Stopping calculation too early', 'Missing defensive resources'],
    deeperPrinciple: 'Calculate until the position is quiet or you see a clear result.',
  },
  {
    id: 'deep-defensive-calc',
    title: 'Calculating Defensive Resources',
    fen: 'r1b2rk1/pp3ppp/2n1p3/q1ppP3/3P4/2PB1N2/PP2QPPP/R1B2RK1 b - - 0 11',
    toMove: 'black',
    concept: 'Calculate not just attacks, but all opponent\'s defenses',
    keyTakeaway: 'Good calculation finds opponent\'s best defense',
    difficulty: 4,
    introduction: 'When calculating your attack, you must also calculate opponent\'s best defense. Find and refute their resources!',
    moves: [
      {
        move: 'c4',
        annotation: '!',
        explanation: 'Black attacks the bishop. Calculate: Where does it go?',
        arrows: [{ from: 'c5', to: 'c4', color: 'green' }],
      },
      {
        move: 'Bc2',
        explanation: 'Defense 1: Bishop retreats. Is this good enough?',
        alternatives: [
          { move: 'Bxh7+', evaluation: 'dubious', explanation: 'Calculate: Kxh7 Ng5+ Kg8 Qh5 defense works' }
        ]
      },
      {
        move: 'Nb4',
        annotation: '!',
        explanation: 'Black attacks the bishop again! Calculate further...',
        arrows: [{ from: 'c6', to: 'b4', color: 'green' }],
      },
      {
        move: 'Bb1',
        explanation: 'Bishop retreats further.',
      },
      {
        move: 'Nd3',
        annotation: '!!',
        explanation: 'Centralized knight! Calculate White\'s options...',
        arrows: [{ from: 'b4', to: 'd3', color: 'green' }],
        highlights: ['d3'],
      },
      {
        move: 'Bxd3',
        explanation: 'White must take.',
      },
      {
        move: 'Qxd3',
        explanation: 'Now Black has the initiative. We calculated through White\'s defenses!',
      }
    ],
    commonMistakes: ['Only calculating your own moves', 'Assuming opponent plays badly'],
    deeperPrinciple: 'Calculate opponent\'s BEST moves, not their worst.',
  },
  {
    id: 'deep-quiet-move',
    title: 'The Quiet Killer Move',
    fen: 'r1b2rk1/ppq1bppp/2n1pn2/3pP3/3P4/2NB1N2/PP2QPPP/R1B2RK1 w - - 0 10',
    toMove: 'white',
    concept: 'Sometimes the winning move isn\'t forcing',
    keyTakeaway: 'After forcing moves, look for quiet improvements',
    difficulty: 5,
    introduction: 'Not all winning moves are checks and captures. Sometimes the strongest move is a quiet improvement. Calculate these!',
    moves: [
      {
        move: 'Bg5',
        annotation: '!!',
        explanation: 'A QUIET move! No check, no capture, but devastating.',
        arrows: [{ from: 'c1', to: 'g5', color: 'green' }],
        highlights: ['g5'],
      },
      {
        move: 'h6',
        explanation: 'Black tries to chase the bishop. Calculate...',
      },
      {
        move: 'Bxf6',
        annotation: '!',
        explanation: 'Now we take! The point of the quiet Bg5.',
        arrows: [{ from: 'g5', to: 'f6', color: 'red' }],
      },
      {
        move: 'Bxf6',
        explanation: 'Black recaptures.',
      },
      {
        move: 'exf6',
        annotation: '!',
        explanation: 'Passed pawn on f6! Permanent weakness on g7.',
        arrows: [{ from: 'e5', to: 'f6', color: 'green' }],
        highlights: ['f6'],
      },
      {
        move: 'Qd6',
        explanation: 'Black tries to blockade.',
      },
      {
        move: 'Qe7',
        annotation: '!',
        explanation: 'Trading queens into a winning endgame!',
        arrows: [{ from: 'e2', to: 'e7', color: 'green' }],
      },
      {
        move: 'Qxe7',
        explanation: 'Forced trade.',
      },
      {
        move: 'fxe7',
        annotation: '!',
        explanation: 'Pawn on e7! The quiet Bg5 led to this crushing advantage.',
        arrows: [{ from: 'f6', to: 'e7', color: 'green' }],
        highlights: ['e7'],
      }
    ],
    commonMistakes: ['Only looking at forcing moves', 'Missing quiet improvements'],
    deeperPrinciple: 'Quiet moves that improve your position are often the strongest.',
  },
];

// ============================================
// CHAPTER 4: PRACTICAL CALCULATION
// ============================================

const practicalCalculation: CourseVariation[] = [
  {
    id: 'prac-time-pressure',
    title: 'Calculating Under Time Pressure',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'When time is short, calculate forcing moves only',
    keyTakeaway: 'In time trouble, focus on CCT - checks, captures, threats',
    difficulty: 3,
    introduction: 'When you\'re low on time, you can\'t calculate everything. Focus on forcing moves and simple plans.',
    moves: [
      {
        move: 'O-O-O',
        annotation: '!',
        explanation: 'Simple developing move. In time trouble, don\'t overthink.',
        arrows: [{ from: 'e1', to: 'c1', color: 'green' }],
      },
      {
        move: 'a6',
        explanation: 'Black prepares queenside expansion.',
      },
      {
        move: 'h4',
        annotation: '!',
        explanation: 'Direct attack! One idea, easy to calculate: push h5, attack.',
        arrows: [{ from: 'h2', to: 'h4', color: 'red' }],
      },
      {
        move: 'b5',
        explanation: 'Black counter-attacks.',
      },
      {
        move: 'h5',
        annotation: '!',
        explanation: 'Continue the plan. Don\'t change direction!',
        arrows: [{ from: 'h4', to: 'h5', color: 'red' }],
      },
      {
        move: 'b4',
        explanation: 'Black attacks your knight.',
      },
      {
        move: 'hxg6',
        annotation: '!',
        explanation: 'Open the h-file! Simple, forcing chess.',
        arrows: [{ from: 'h5', to: 'g6', color: 'red' }],
      },
      {
        move: 'hxg6',
        explanation: 'Black takes.',
      },
      {
        move: 'Nd5',
        annotation: '!',
        explanation: 'Centralize with tempo! The knight is immune.',
        arrows: [{ from: 'c3', to: 'd5', color: 'green' }],
        highlights: ['d5'],
      }
    ],
    commonMistakes: ['Calculating too deeply in time trouble', 'Changing plans mid-game'],
    deeperPrinciple: 'In time trouble: one plan, forcing moves, no second-guessing.',
  },
  {
    id: 'prac-complex-position',
    title: 'Calculating in Complex Positions',
    fen: 'r1bq1rk1/pp3ppp/2nbpn2/3p4/2PP4/1PN1PN2/PB3PPP/R2QKB1R w KQ - 0 8',
    toMove: 'white',
    concept: 'In complex positions, use elimination',
    keyTakeaway: 'Eliminate bad moves first, then calculate the rest',
    difficulty: 4,
    introduction: 'When positions are complex, start by eliminating obviously bad moves. Then calculate what\'s left.',
    moves: [
      {
        move: 'cxd5',
        annotation: '!',
        explanation: 'Eliminate: c5? loses pawn. cxd5 opens position - let\'s calculate.',
        arrows: [{ from: 'c4', to: 'd5', color: 'green' }],
        alternatives: [
          { move: 'c5', evaluation: 'bad', explanation: 'Eliminated: loses the c5 pawn' },
          { move: 'Bd3', evaluation: 'equal', explanation: 'Solid but doesn\'t challenge' },
          { move: 'Rc1', evaluation: 'equal', explanation: 'Also reasonable' }
        ]
      },
      {
        move: 'exd5',
        explanation: 'Black takes. Now: Bd3, Bb5, or something else?',
      },
      {
        move: 'Bd3',
        annotation: '!',
        explanation: 'Develop toward kingside. Eliminate: Bb5 allows a6.',
        arrows: [{ from: 'f1', to: 'd3', color: 'green' }],
      },
      {
        move: 'Ne4',
        explanation: 'Black centralizes. Calculate the response.',
      },
      {
        move: 'Nxe4',
        annotation: '!',
        explanation: 'Trade! After elimination: keeping tension doesn\'t help.',
        arrows: [{ from: 'f3', to: 'e4', color: 'green' }],
      },
      {
        move: 'Bxe4',
        explanation: 'Bishop takes.',
      },
      {
        move: 'O-O',
        annotation: '!',
        explanation: 'Simple, safe, good. Don\'t overcomplicate!',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }],
      }
    ],
    commonMistakes: ['Calculating every possible move', 'Not eliminating bad options first'],
    deeperPrinciple: 'Elimination simplifies calculation. Remove bad moves, analyze the rest.',
  },
  {
    id: 'prac-critical-moment',
    title: 'Critical Moment Calculation',
    fen: 'r1b2rk1/ppq1ppbp/2np1np1/8/2PNP3/2N1BP2/PP4PP/R2QKB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Recognize and invest time in critical positions',
    keyTakeaway: 'Some positions deserve more calculation time than others',
    difficulty: 4,
    introduction: 'Not all positions need deep calculation. Learn to recognize CRITICAL moments where calculation matters most.',
    moves: [
      {
        move: 'Be2',
        annotation: '?!',
        explanation: 'Natural but misses the critical moment! This was a key position.',
        alternatives: [
          { move: 'Nc2', evaluation: 'best', explanation: 'The key move! Preparing Nd5 without allowing tactics.' },
          { move: 'Nb3', evaluation: 'good', explanation: 'Also solid.' }
        ]
      },
      {
        move: 'e5',
        annotation: '!',
        explanation: 'Black seizes the moment! Now the position changes character.',
        arrows: [{ from: 'e7', to: 'e5', color: 'red' }],
      },
      {
        move: 'Nc2',
        explanation: 'Now we\'re worse - should have calculated this earlier.',
      },
      {
        move: 'Ne8',
        explanation: 'Black repositions.',
      },
      {
        move: 'O-O',
        explanation: 'We castle, but Black has achieved their goals.',
      }
    ],
    commonMistakes: ['Not recognizing critical moments', 'Investing time in unimportant positions'],
    deeperPrinciple: 'Critical moments: when the position can change drastically. STOP and calculate!',
  },
];

// ============================================
// CHAPTER 5: CALCULATION EXERCISES
// ============================================

const calculationExercises: CourseVariation[] = [
  {
    id: 'calc-ex-1',
    title: 'Exercise: 4-Move Checkmate',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 4',
    toMove: 'white',
    concept: 'Find the 4-move checkmate sequence',
    keyTakeaway: 'Calculate all forcing moves to find the mate',
    difficulty: 3,
    introduction: 'EXERCISE: White to play and mate in 4. Calculate the forcing sequence!',
    moves: [
      {
        move: 'Bxf7+',
        annotation: '!',
        explanation: 'Move 1: Sacrifice! Calculate Black\'s responses.',
        arrows: [{ from: 'c4', to: 'f7', color: 'red' }],
      },
      {
        move: 'Ke7',
        explanation: 'Best defense. Kxf7 allows Ng5+ and Qf3+.',
        alternatives: [
          { move: 'Kxf7', evaluation: 'bad', explanation: 'Ng5+ Ke8 Qh5+ and mate follows' }
        ]
      },
      {
        move: 'Bg5',
        annotation: '!',
        explanation: 'Move 2: Pinning the knight and preparing...',
        arrows: [{ from: 'c1', to: 'g5', color: 'green' }],
      },
      {
        move: 'Rf8',
        explanation: 'Black tries to defend.',
      },
      {
        move: 'Bg8+',
        annotation: '!!',
        explanation: 'Move 3: Quiet bishop move opens discovered check next!',
        arrows: [{ from: 'f7', to: 'g8', color: 'red' }],
      },
      {
        move: 'Rxg8',
        explanation: 'Only move.',
      },
      {
        move: 'Nd5#',
        annotation: '!!',
        explanation: 'Move 4: CHECKMATE! The knight delivers the final blow.',
        arrows: [{ from: 'b1', to: 'd5', color: 'red' }],
        highlights: ['e7'],
      }
    ],
    commonMistakes: ['Missing the quiet Bg8+ move', 'Not calculating all Black responses'],
    deeperPrinciple: 'Checkmates often require quiet moves to set up the final blow.',
  },
  {
    id: 'calc-ex-2',
    title: 'Exercise: Win Material',
    fen: 'r1bq1rk1/pp2nppp/2n1p3/3pP3/3P4/P1NB1N2/1P3PPP/R1BQK2R w KQ - 0 10',
    toMove: 'white',
    concept: 'Calculate the sequence that wins material',
    keyTakeaway: 'Look for sacrifices that regain material with interest',
    difficulty: 3,
    introduction: 'EXERCISE: White can win material with accurate calculation. Find the sequence!',
    moves: [
      {
        move: 'Bxh7+',
        annotation: '!',
        explanation: 'Step 1: Greek Gift! Calculate Black\'s responses.',
        arrows: [{ from: 'd3', to: 'h7', color: 'red' }],
      },
      {
        move: 'Kxh7',
        explanation: 'Black takes. Now what?',
      },
      {
        move: 'Ng5+',
        annotation: '!',
        explanation: 'Step 2: Knight check! Where does the king go?',
        arrows: [{ from: 'f3', to: 'g5', color: 'red' }],
      },
      {
        move: 'Kg8',
        explanation: 'Safe square. Kg6 loses to Qd3+.',
        alternatives: [
          { move: 'Kg6', evaluation: 'bad', explanation: 'Qd3+ Kf5 g4+ Kxg4 Qe2+ and mate' }
        ]
      },
      {
        move: 'Qh5',
        annotation: '!',
        explanation: 'Step 3: Threatening Qh7# and Qxf7+.',
        arrows: [{ from: 'd1', to: 'h5', color: 'red' }],
        highlights: ['h7', 'f7'],
      },
      {
        move: 'Nf5',
        explanation: 'Best defense - blocking.',
      },
      {
        move: 'Qxf7+',
        annotation: '!',
        explanation: 'Step 4: Collect material! The attack continues.',
        arrows: [{ from: 'h5', to: 'f7', color: 'red' }],
      },
      {
        move: 'Kh8',
        explanation: 'King runs.',
      },
      {
        move: 'Qh5+',
        annotation: '!',
        explanation: 'We\'ve won a pawn with a continuing attack. Calculation complete!',
        arrows: [{ from: 'f7', to: 'h5', color: 'red' }],
      }
    ],
    commonMistakes: ['Stopping calculation after Qh5', 'Not seeing Qxf7+ continuation'],
    deeperPrinciple: 'Calculate until you\'ve secured concrete gains.',
  },
  {
    id: 'calc-ex-3',
    title: 'Exercise: Complex Combination',
    fen: 'r1b2rk1/ppq1bppp/2n1pn2/3pP3/3P4/2NB1N2/PPQ2PPP/R1B1K2R w KQ - 0 10',
    toMove: 'white',
    concept: 'Find the complex winning combination',
    keyTakeaway: 'Multi-piece combinations require precise calculation',
    difficulty: 5,
    introduction: 'EXERCISE: White has a crushing combination. Calculate accurately!',
    moves: [
      {
        move: 'Bxh7+',
        annotation: '!',
        explanation: 'Step 1: Greek Gift! This is the start.',
        arrows: [{ from: 'd3', to: 'h7', color: 'red' }],
      },
      {
        move: 'Kxh7',
        explanation: 'Taking.',
      },
      {
        move: 'Ng5+',
        annotation: '!',
        explanation: 'Step 2: Knight joins.',
        arrows: [{ from: 'f3', to: 'g5', color: 'red' }],
      },
      {
        move: 'Kh6',
        explanation: 'Black tries Kh6! Different from usual. Calculate!',
        alternatives: [
          { move: 'Kg8', evaluation: 'bad', explanation: 'Qh7+ Kf8 Qh8#' },
          { move: 'Kg6', evaluation: 'bad', explanation: 'Qg2+ Kh6 Qh3+ and Ne4+ wins' }
        ]
      },
      {
        move: 'Qd3',
        annotation: '!!',
        explanation: 'Step 3: QUIET MOVE! Threatening Qh3# and Qh7#.',
        arrows: [{ from: 'c2', to: 'd3', color: 'green' }],
        highlights: ['h3', 'h7'],
      },
      {
        move: 'g6',
        explanation: 'Only defense.',
      },
      {
        move: 'Qh3+',
        annotation: '!',
        explanation: 'Step 4: Check! Driving the king out.',
        arrows: [{ from: 'd3', to: 'h3', color: 'red' }],
      },
      {
        move: 'Kg7',
        explanation: 'Running.',
      },
      {
        move: 'Qh7+',
        annotation: '!',
        explanation: 'Step 5: Chase continues.',
        arrows: [{ from: 'h3', to: 'h7', color: 'red' }],
      },
      {
        move: 'Kf8',
        explanation: 'King flees.',
      },
      {
        move: 'Qh8+',
        annotation: '!',
        explanation: 'Step 6: Pick up material!',
        arrows: [{ from: 'h7', to: 'h8', color: 'red' }],
      }
    ],
    commonMistakes: ['Not finding Qd3!', 'Miscalculating Kh6 variation'],
    deeperPrinciple: 'Complex combinations often hinge on finding one quiet move.',
  },
];

// ============================================
// EXPORT THE COURSE
// ============================================

export const calculationDojo: Course = {
  id: 'calculation-dojo',
  title: 'The Calculation Dojo',
  author: 'Zen Chess Academy',
  description: 'Transform your calculation ability! Master deep multi-move sequences through systematic training. Visualization exercises, forcing move calculation, and complex combinations.',
  coverImage: '🧮',
  coverColor: 'from-violet-600 to-purple-500',
  totalMinutes: 220,
  difficulty: 'intermediate',
  tags: ['calculation', 'visualization', 'tactics', 'combinations', 'deep analysis'],
  chapters: [
    {
      id: 'ch-calc-fundamentals',
      title: 'Calculation Fundamentals',
      subtitle: 'Candidate Moves, Forcing Moves, Trees',
      description: 'Learn the systematic approach to calculation: find candidates, calculate forcing moves first, build variation trees.',
      estimatedMinutes: 40,
      variations: calculationFundamentals,
      keyLessons: [
        'List all candidate moves before calculating',
        'CCT: Checks, Captures, Threats - in that order',
        'Build a tree: main line plus alternatives'
      ],
    },
    {
      id: 'ch-visualization',
      title: 'Visualization Training',
      subtitle: 'See the Board in Your Mind',
      description: 'Develop the ability to visualize positions 3, 5, and more moves ahead without moving pieces.',
      estimatedMinutes: 40,
      variations: visualizationTraining,
      keyLessons: [
        'Start with 3-move visualization',
        'Work up to 5+ moves',
        'Forcing sequences are easier to visualize'
      ],
    },
    {
      id: 'ch-deep-calc',
      title: 'Deep Calculation',
      subtitle: 'Multi-Move Combinations',
      description: 'Calculate 6+ move sequences, including defensive resources and quiet killer moves.',
      estimatedMinutes: 50,
      variations: deepCalculation,
      keyLessons: [
        'Calculate until the position is quiet',
        'Include opponent\'s best defenses',
        'Don\'t miss quiet improvements'
      ],
    },
    {
      id: 'ch-practical-calc',
      title: 'Practical Calculation',
      subtitle: 'Time Pressure, Complex Positions, Critical Moments',
      description: 'Apply calculation skills to real-game situations: time trouble, complex positions, and critical moments.',
      estimatedMinutes: 45,
      variations: practicalCalculation,
      keyLessons: [
        'In time trouble: one plan, forcing moves only',
        'Use elimination to simplify complex positions',
        'Invest time in critical moments'
      ],
    },
    {
      id: 'ch-calc-exercises',
      title: 'Calculation Exercises',
      subtitle: 'Test Your Skills',
      description: 'Practice what you\'ve learned with challenging exercises: checkmates, material wins, complex combinations.',
      estimatedMinutes: 45,
      variations: calculationExercises,
      keyLessons: [
        'Apply systematic calculation',
        'Don\'t stop until you find the win',
        'Complex combinations often need quiet moves'
      ],
    },
  ],
};

export default calculationDojo;




