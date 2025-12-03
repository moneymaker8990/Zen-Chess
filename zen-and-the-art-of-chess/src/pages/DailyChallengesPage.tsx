// ============================================
// ENHANCED DAILY CHALLENGES
// Themed daily content to keep players engaged
// Monday: Endgame | Tuesday: Tactics | Wednesday: Visualization
// Thursday: GM Analysis | Friday: Speed Rush | Weekend: Legends
// ============================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import { useNavigate } from 'react-router-dom';

// ============================================
// TYPES
// ============================================

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
type ChallengeType = 'endgame' | 'tactics' | 'visualization' | 'gm-analysis' | 'speed-rush' | 'legends' | 'mixed';

interface DailyChallenge {
  type: ChallengeType;
  title: string;
  description: string;
  icon: string;
  color: string;
  positions: ChallengePosition[];
}

interface ChallengePosition {
  fen: string;
  title: string;
  objective: string;
  solution?: string[];
  hints?: string[];
  explanation: string;
  difficulty: 1 | 2 | 3;
  theme?: string;
}

interface VisualizationChallenge {
  startFen: string;
  moves: string[];
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface DailyChallengeStats {
  completedDates: string[];
  currentStreak: number;
  longestStreak: number;
  totalChallenges: number;
  typeStats: Record<ChallengeType, { completed: number; total: number }>;
  lastCompleted: string | null;
  weeklyProgress: Record<string, boolean>;
}

// ============================================
// CHALLENGE DEFINITIONS BY DAY
// ============================================

const DAY_THEMES: Record<DayOfWeek, { type: ChallengeType; name: string; tagline: string; icon: string; color: string }> = {
  monday: { 
    type: 'endgame', 
    name: 'Endgame Monday', 
    tagline: 'Master the final phase',
    icon: '♔', 
    color: '#4ade80' 
  },
  tuesday: { 
    type: 'tactics', 
    name: 'Tactics Tuesday', 
    tagline: 'Sharpen your calculation',
    icon: '⚡', 
    color: '#f59e0b' 
  },
  wednesday: { 
    type: 'visualization', 
    name: 'Visualization Wednesday', 
    tagline: 'See the board in your mind',
    icon: '👁️', 
    color: '#8b5cf6' 
  },
  thursday: { 
    type: 'gm-analysis', 
    name: 'Think Like a GM Thursday', 
    tagline: 'Find the master move',
    icon: '🎓', 
    color: '#06b6d4' 
  },
  friday: { 
    type: 'speed-rush', 
    name: 'Speed Rush Friday', 
    tagline: 'Test your reflexes',
    icon: '🔥', 
    color: '#ef4444' 
  },
  saturday: { 
    type: 'legends', 
    name: 'Legendary Saturday', 
    tagline: 'Study the greats',
    icon: '👑', 
    color: '#ec4899' 
  },
  sunday: { 
    type: 'mixed', 
    name: 'Sunday Showdown', 
    tagline: 'Weekly best-of challenge',
    icon: '🏆', 
    color: '#a855f7' 
  }
};

// ============================================
// CHALLENGE CONTENT DATABASE
// Expanded to support 10+ challenges per day, rotating weekly
// ============================================

const ENDGAME_CHALLENGES: ChallengePosition[] = [
  // Week 1 - Basic King and Pawn
  {
    fen: '8/8/4k3/8/4PK2/8/8/8 w - - 0 1',
    title: 'King and Pawn Endgame',
    objective: 'White to play and win. Use the opposition!',
    solution: ['Ke4', 'Kd6', 'Kf5', 'Ke7', 'Ke5'],
    hints: ['Control the key squares in front of the pawn', 'Opposition is key'],
    explanation: 'With the opposition, White\'s king can shepherd the pawn to promotion.',
    difficulty: 1,
    theme: 'opposition'
  },
  {
    fen: '8/5k2/8/5PK1/8/8/8/8 w - - 0 1',
    title: 'The Outflanking Maneuver',
    objective: 'White to play. Can you find the winning technique?',
    solution: ['Kh6', 'Kf6', 'Kh7', 'Kf7', 'f6'],
    hints: ['The direct approach doesn\'t work', 'Go around!'],
    explanation: 'By outflanking via h6-h7, White gains the key squares.',
    difficulty: 2,
    theme: 'outflanking'
  },
  {
    fen: '4k3/8/4K3/4P3/8/8/8/8 w - - 0 1',
    title: 'The Critical Position',
    objective: 'White to move. What\'s the result?',
    solution: ['Kd6', 'Kd8', 'e6', 'Ke8', 'e7'],
    hints: ['Push the pawn at the right moment'],
    explanation: 'Key squares: d6, e6, f6. White controls them and wins!',
    difficulty: 1,
    theme: 'opposition'
  },
  {
    fen: '8/8/8/8/8/4k3/4P3/4K3 w - - 0 1',
    title: 'Rook Pawn Challenge',
    objective: 'White to move. Can White win?',
    solution: ['Kf1', 'Kf3', 'e3'],
    hints: ['Rook pawns are tricky', 'Think about stalemate'],
    explanation: 'Draw! The defending king just needs to reach the corner.',
    difficulty: 2,
    theme: 'rook-pawn'
  },
  {
    fen: '8/8/1k6/8/1PK5/8/8/8 w - - 0 1',
    title: 'Winning with Rook Pawn',
    objective: 'Can White win this rook pawn ending?',
    solution: ['Kc5', 'Ka6', 'Kc6', 'Ka7', 'b5'],
    hints: ['Cut off the black king', 'Control the key squares'],
    explanation: 'Yes! The key is keeping the black king from reaching a8.',
    difficulty: 2,
    theme: 'rook-pawn'
  },
  {
    fen: '8/8/8/3k4/8/3K4/3P4/8 w - - 0 1',
    title: 'Opposition Basics',
    objective: 'White to play and win',
    solution: ['Kc3', 'Kc5', 'd3'],
    hints: ['Gain the opposition first'],
    explanation: 'Ke3! gains the opposition and ensures promotion.',
    difficulty: 1,
    theme: 'opposition'
  },
  {
    fen: '8/p7/1k6/8/PK6/8/8/8 w - - 0 1',
    title: 'Pawn Race',
    objective: 'White to play. Who wins the race?',
    solution: ['a5+', 'Ka6', 'Kc5'],
    hints: ['Count the moves carefully'],
    explanation: 'White wins by one tempo with the check!',
    difficulty: 2,
    theme: 'pawn-race'
  },
  {
    fen: '8/8/8/8/4k3/8/4PK2/8 w - - 0 1',
    title: 'Triangulation',
    objective: 'White to play and win',
    solution: ['Ke1', 'Kd4', 'Kd2', 'Ke4', 'e3'],
    hints: ['Use triangulation to gain a tempo'],
    explanation: 'Triangulation allows White to reach the same position with Black to move.',
    difficulty: 3,
    theme: 'triangulation'
  },
  {
    fen: '8/8/4k3/3p4/3P4/4K3/8/8 w - - 0 1',
    title: 'Breakthrough Attempt',
    objective: 'White to play. What\'s the evaluation?',
    solution: ['Kd3', 'Kd6', 'Kc3'],
    hints: ['Neither side can break through'],
    explanation: 'Draw with best play - neither king can penetrate.',
    difficulty: 2,
    theme: 'fortress'
  },
  {
    fen: '8/8/8/1p6/1P6/K7/8/k7 w - - 0 1',
    title: 'Distant Opposition',
    objective: 'White to play and draw',
    solution: ['Kb3', 'Kb1', 'Ka3'],
    hints: ['Maintain distant opposition'],
    explanation: 'With correct opposition play, White holds the draw.',
    difficulty: 2,
    theme: 'opposition'
  },
  // Week 2 - Rook Endgames
  {
    fen: '8/8/8/8/8/4k3/r7/R3K3 w - - 0 1',
    title: 'Lucena Position Setup',
    objective: 'White to play and build a bridge',
    solution: ['Rd1+', 'Ke4', 'Rd4'],
    hints: ['Build a bridge with the rook'],
    explanation: 'The Lucena position is winning for the side with the pawn.',
    difficulty: 2,
    theme: 'lucena'
  },
  {
    fen: '1k6/1P6/1K6/8/8/8/r7/8 w - - 0 1',
    title: 'Philidor Position',
    objective: 'White to play and promote',
    solution: ['Ka6', 'Ra1+', 'Kb6'],
    hints: ['The king must shelter from checks'],
    explanation: 'White wins by using the pawn as shelter.',
    difficulty: 2,
    theme: 'philidor'
  },
  {
    fen: '8/8/8/8/4k3/R7/4P3/4K3 w - - 0 1',
    title: 'Rook Behind the Pawn',
    objective: 'White to play and win',
    solution: ['Ra8', 'Ke5', 'e3'],
    hints: ['Place the rook behind the passed pawn'],
    explanation: 'Tarrasch\'s rule: rooks belong behind passed pawns.',
    difficulty: 1,
    theme: 'rook-behind'
  },
  {
    fen: '8/8/8/8/8/4Pk2/8/4RK2 w - - 0 1',
    title: 'Active Rook Defense',
    objective: 'White to play and convert',
    solution: ['Rd1', 'Ke4', 'Ke2'],
    hints: ['Activate the king'],
    explanation: 'The active king helps escort the pawn.',
    difficulty: 2,
    theme: 'active-king'
  },
  {
    fen: '8/5k2/8/5P2/8/8/8/4K2R w - - 0 1',
    title: 'Cutting Off the King',
    objective: 'White to play and win',
    solution: ['Rh7+', 'Ke8', 'Ke2'],
    hints: ['Use the rook to cut off the enemy king'],
    explanation: 'Cutting off the king along the rank or file is key.',
    difficulty: 2,
    theme: 'cut-off'
  },
  // Week 3 - Queen Endgames
  {
    fen: '8/8/5k2/8/8/8/1Q6/4K3 w - - 0 1',
    title: 'Queen vs King',
    objective: 'White to mate in the fewest moves',
    solution: ['Qf4+', 'Ke6', 'Ke2'],
    hints: ['Drive the king to the edge'],
    explanation: 'The queen forces the king to the edge for mate.',
    difficulty: 1,
    theme: 'queen-mate'
  },
  {
    fen: '8/8/8/3k4/8/8/1PK5/8 w - - 0 1',
    title: 'Pawn to Queen',
    objective: 'White to play and promote',
    solution: ['b4', 'Kc6', 'b5'],
    hints: ['The pawn is unstoppable'],
    explanation: 'Simple pawn advance leads to promotion.',
    difficulty: 1,
    theme: 'promotion'
  },
  {
    fen: '8/8/8/2k5/8/8/1P6/1K6 w - - 0 1',
    title: 'The Square of the Pawn',
    objective: 'Can White promote?',
    solution: ['b4', 'Kc4', 'Kc2'],
    hints: ['Calculate if the king can catch the pawn'],
    explanation: 'Count the squares - if king is inside the square, it can catch the pawn.',
    difficulty: 1,
    theme: 'square-rule'
  },
  {
    fen: '3q4/8/8/8/8/3k4/3P4/3QK3 w - - 0 1',
    title: 'Queen Endgame Technique',
    objective: 'White to play and win',
    solution: ['Qg4', 'Qd4', 'Qe2+'],
    hints: ['Use checks to advance'],
    explanation: 'Queens excel at checking while supporting pawn advance.',
    difficulty: 2,
    theme: 'queen-technique'
  },
  {
    fen: '8/8/8/4k3/8/1Q6/3P4/3K4 w - - 0 1',
    title: 'Centralized Queen',
    objective: 'White to play and win',
    solution: ['Qc4', 'Ke6', 'd4'],
    hints: ['Centralize the queen'],
    explanation: 'A centralized queen controls the board.',
    difficulty: 2,
    theme: 'centralization'
  },
  // Week 4 - Bishop Endgames
  {
    fen: '8/8/4k3/8/2B5/8/4K3/8 w - - 0 1',
    title: 'Wrong Colored Bishop',
    objective: 'Can White win with a rook pawn?',
    solution: ['Kd3', 'Kd5', 'Bc3'],
    hints: ['Check the corner color'],
    explanation: 'If bishop cannot control promotion square, often a draw.',
    difficulty: 2,
    theme: 'wrong-bishop'
  },
  {
    fen: '8/8/8/4kB2/8/4P3/4K3/8 w - - 0 1',
    title: 'Bishop and Pawn',
    objective: 'White to play and win',
    solution: ['Kd3', 'Kf6', 'e4'],
    hints: ['Coordinate bishop and king'],
    explanation: 'The bishop covers key squares for pawn advance.',
    difficulty: 2,
    theme: 'bishop-pawn'
  },
  // Week 5 - Knight Endgames
  {
    fen: '8/8/4k3/8/8/3NK3/8/8 w - - 0 1',
    title: 'Knight and King',
    objective: 'White to coordinate for checkmate pattern',
    solution: ['Nf4+', 'Ke7', 'Ke4'],
    hints: ['Knights need the king nearby'],
    explanation: 'Knight endgames require close king coordination.',
    difficulty: 2,
    theme: 'knight-king'
  },
  {
    fen: '8/8/8/4k3/8/4P3/3NK3/8 w - - 0 1',
    title: 'Knight Escort',
    objective: 'White to play and promote',
    solution: ['Nc4+', 'Kf5', 'Kd3'],
    hints: ['Use the knight to shield the pawn'],
    explanation: 'The knight protects key squares for the pawn.',
    difficulty: 2,
    theme: 'knight-escort'
  },
  // Week 6 - Mixed Minor Piece
  {
    fen: '8/8/8/4k3/2B5/8/3NK3/8 w - - 0 1',
    title: 'Bishop vs Knight',
    objective: 'Evaluate this endgame',
    solution: ['Bc3', 'Kf5', 'Kf3'],
    hints: ['In open positions, bishop is often better'],
    explanation: 'The bishop\'s long-range capability gives an advantage.',
    difficulty: 2,
    theme: 'bishop-vs-knight'
  },
  {
    fen: '8/5k2/8/4N3/8/4K3/8/8 w - - 0 1',
    title: 'Knight Outpost',
    objective: 'Maintain knight dominance',
    solution: ['Ke4', 'Ke6', 'Nc6'],
    hints: ['Centralize both pieces'],
    explanation: 'Knight and king working together are powerful.',
    difficulty: 2,
    theme: 'knight-outpost'
  },
  // Week 7 - Complex Endgames
  {
    fen: '8/8/8/2k5/2P5/2K5/8/8 w - - 0 1',
    title: 'Pure Opposition',
    objective: 'White to play and win',
    solution: ['Kd3', 'Kd5', 'c5'],
    hints: ['Seize the opposition'],
    explanation: 'Direct opposition secures the win.',
    difficulty: 1,
    theme: 'opposition'
  },
  {
    fen: '8/8/8/8/k7/p7/8/KR6 w - - 0 1',
    title: 'Rook vs Pawn',
    objective: 'White to stop the pawn',
    solution: ['Rb4+', 'Ka5', 'Rb3'],
    hints: ['Use checks to gain time'],
    explanation: 'The rook can stop most pawns with active play.',
    difficulty: 2,
    theme: 'rook-vs-pawn'
  },
  {
    fen: '8/8/8/8/8/5k2/5p2/5K2 w - - 0 1',
    title: 'Stalemate Defense',
    objective: 'White to draw',
    solution: ['Ke2', 'Kg2', 'Ke1'],
    hints: ['Look for stalemate tricks'],
    explanation: 'Stalemate is the defender\'s best friend!',
    difficulty: 2,
    theme: 'stalemate'
  },
  {
    fen: '8/8/8/5k2/5P2/5K2/8/8 w - - 0 1',
    title: 'Key Square Control',
    objective: 'White to play and win',
    solution: ['Ke3', 'Ke6', 'Ke4'],
    hints: ['Occupy the key squares'],
    explanation: 'Controlling squares in front of the pawn wins.',
    difficulty: 1,
    theme: 'key-squares'
  }
];

const TACTICS_CHALLENGES: ChallengePosition[] = [
  // Week 1 - Forks and Pins
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    title: 'Knight Fork Setup',
    objective: 'White to play and win material',
    solution: ['Nxf7'],
    hints: ['The knight can attack multiple pieces', 'Look at what f7 attacks'],
    explanation: 'Nxf7! forks the queen and rook. A classic tactical pattern.',
    difficulty: 2,
    theme: 'fork'
  },
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    title: 'Scholar\'s Mate',
    objective: 'White threatens checkmate. Find it!',
    solution: ['Qxf7#'],
    hints: ['The f7 square is weak'],
    explanation: 'Qxf7# is checkmate! The bishop supports the queen.',
    difficulty: 1,
    theme: 'checkmate'
  },
  {
    fen: 'r1b1kb1r/pppp1ppp/2n2n2/4p1N1/2B1P2q/8/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    title: 'Counter-Attack!',
    objective: 'Black threatens Qxf2#. White plays and wins!',
    solution: ['Nxf7'],
    hints: ['Sometimes attack is the best defense', 'Ignore the threat!'],
    explanation: 'Nxf7! ignores the threat and creates bigger problems.',
    difficulty: 3,
    theme: 'counter-attack'
  },
  {
    fen: 'r2qkb1r/ppp2ppp/2n1bn2/3Np3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 6',
    title: 'The Fork Trick',
    objective: 'Find the winning move!',
    solution: ['Nxc7+'],
    hints: ['Royal fork incoming!'],
    explanation: 'Nxc7+! forks the king and rook. A beautiful family fork!',
    difficulty: 2,
    theme: 'fork'
  },
  {
    fen: '6k1/5ppp/8/8/8/8/r4PPP/4R1K1 w - - 0 1',
    title: 'Back Rank Tactics',
    objective: 'White to play and draw!',
    solution: ['Re8+'],
    hints: ['Use the weakness of Black\'s back rank', 'Perpetual check?'],
    explanation: 'Re8+! leads to perpetual check, saving a lost position.',
    difficulty: 2,
    theme: 'back-rank'
  },
  {
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 2 3',
    title: 'Mate in Two',
    objective: 'White to checkmate in two moves',
    solution: ['Qxf7+', 'Ke7', 'Qxe5#'],
    hints: ['Target the weak f7 square'],
    explanation: 'Classic attacking pattern against f7.',
    difficulty: 2,
    theme: 'checkmate'
  },
  {
    fen: 'rnbqkb1r/ppp2ppp/4pn2/3pN3/3P4/8/PPP1PPPP/RNBQKB1R w KQkq - 0 4',
    title: 'Discover Attack',
    objective: 'White to win a piece',
    solution: ['Bb5+'],
    hints: ['The knight on e5 is attacked - but can you attack something else?'],
    explanation: 'Bb5+! is a discovered attack winning the queen.',
    difficulty: 2,
    theme: 'discovered-attack'
  },
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b5/2BPP3/5N2/PPP2PPP/RNBQK2R b KQkq - 0 5',
    title: 'Pin the Knight',
    objective: 'Black to exploit the pin',
    solution: ['Bxd4'],
    hints: ['The knight on f3 is pinned!'],
    explanation: 'The knight cannot capture because it\'s pinned to the queen.',
    difficulty: 2,
    theme: 'pin'
  },
  {
    fen: 'r2qkbnr/ppp2ppp/2np4/4p3/2B1P1b1/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 5',
    title: 'Exploit the Pin',
    objective: 'White to take advantage of Black\'s last move',
    solution: ['Bxf7+'],
    hints: ['Black\'s bishop is pinning your knight - but f7 is weak!'],
    explanation: 'Bxf7+! exploits the weak f7 pawn. Black loses material.',
    difficulty: 2,
    theme: 'counter-pin'
  },
  {
    fen: 'r1bqk2r/ppppbppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 6 5',
    title: 'Double Attack',
    objective: 'White to create a double threat',
    solution: ['Qf3'],
    hints: ['Attack two things at once'],
    explanation: 'Qf3 threatens Qxf7# and the knight on c6.',
    difficulty: 2,
    theme: 'double-attack'
  },
  // Week 2 - Skewers and X-Rays
  {
    fen: '6k1/8/8/8/8/8/1K6/r5R1 w - - 0 1',
    title: 'Skewer the King',
    objective: 'White to win the rook',
    solution: ['Rg8+'],
    hints: ['Force the king to move, then take what\'s behind'],
    explanation: 'A skewer wins the enemy rook!',
    difficulty: 1,
    theme: 'skewer'
  },
  {
    fen: 'r4rk1/pp3ppp/2p1p3/8/3Pn3/4BN2/PP3PPP/R4RK1 w - - 0 1',
    title: 'Eliminate the Defender',
    objective: 'White to win material',
    solution: ['Bxe4'],
    hints: ['What is defending Black\'s position?'],
    explanation: 'Removing the knight opens up tactics.',
    difficulty: 2,
    theme: 'remove-defender'
  },
  {
    fen: 'r1bqk2r/pppp1Bpp/2n2n2/2b1p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 4',
    title: 'Zwischenzug',
    objective: 'Black to find the in-between move',
    solution: ['Bxf2+'],
    hints: ['Don\'t recapture immediately - find something better!'],
    explanation: 'The zwischenzug Bxf2+ wins material.',
    difficulty: 3,
    theme: 'zwischenzug'
  },
  {
    fen: '2rq1rk1/pp1bppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 10',
    title: 'Central Control',
    objective: 'White to take command of the center',
    solution: ['Nd5'],
    hints: ['The knight jumps to a powerful square'],
    explanation: 'Nd5! creates multiple threats and dominates.',
    difficulty: 2,
    theme: 'centralization'
  },
  {
    fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/1bPP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 7',
    title: 'Trapped Bishop',
    objective: 'White to trap Black\'s bishop',
    solution: ['a3'],
    hints: ['The bishop has nowhere to go!'],
    explanation: 'a3 wins the bishop - it has no safe squares.',
    difficulty: 2,
    theme: 'trapped-piece'
  },
  {
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    title: 'Quick Development',
    objective: 'What is White\'s best developing move?',
    solution: ['Bb5'],
    hints: ['Pin the knight!'],
    explanation: 'Bb5 pins the knight and develops with tempo.',
    difficulty: 1,
    theme: 'development'
  },
  {
    fen: 'r2qr1k1/ppp2ppp/2n5/3np1N1/2B5/8/PPPP1PPP/R1BQ1RK1 w - - 0 10',
    title: 'Greek Gift Sacrifice',
    objective: 'White to start a devastating attack',
    solution: ['Bxd5'],
    hints: ['Clear the diagonal!'],
    explanation: 'Sacrificing the bishop opens lines for attack.',
    difficulty: 3,
    theme: 'sacrifice'
  },
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1pN2/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    title: 'Fried Liver Attack',
    objective: 'White to continue the attack',
    solution: ['Nxf7'],
    hints: ['The knight strikes!'],
    explanation: 'The famous Fried Liver - chaos ensues!',
    difficulty: 2,
    theme: 'attack'
  },
  {
    fen: 'rnbqkb1r/pp2pppp/5n2/2pp4/3PP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4',
    title: 'Center Strike',
    objective: 'White to challenge the center',
    solution: ['e5'],
    hints: ['Attack the knight and gain space'],
    explanation: 'e5! attacks the knight and seizes the center.',
    difficulty: 1,
    theme: 'center-control'
  },
  {
    fen: 'r1bqk2r/ppp2ppp/2n2n2/3pp3/1bP5/2N1PN2/PP1P1PPP/R1BQKB1R w KQkq - 0 5',
    title: 'Nimzo-Indian Tactics',
    objective: 'White to win a pawn',
    solution: ['cxd5'],
    hints: ['Just take it!'],
    explanation: 'cxd5 wins a pawn - Black cannot recapture favorably.',
    difficulty: 2,
    theme: 'pawn-win'
  },
  // Week 3 - Sacrifices
  {
    fen: 'r1bqr1k1/ppp2ppp/2nb1n2/3p4/3P4/2NBPN2/PPP2PPP/R1BQ1RK1 w - - 0 8',
    title: 'Exchange Sacrifice',
    objective: 'White to play a positional exchange sacrifice',
    solution: ['Bxf6'],
    hints: ['Remove the defender of key squares'],
    explanation: 'Exchanging for the knight controls dark squares.',
    difficulty: 2,
    theme: 'exchange-sacrifice'
  },
  {
    fen: 'r2qkb1r/ppp1pppp/2n2n2/3p1b2/3P1B2/2N2N2/PPP1PPPP/R2QKB1R w KQkq - 4 5',
    title: 'Symmetry Breaker',
    objective: 'White to gain an advantage',
    solution: ['Ne5'],
    hints: ['Centralize with threat!'],
    explanation: 'Ne5! threatens the bishop and controls the center.',
    difficulty: 2,
    theme: 'centralization'
  },
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 4',
    title: 'Italian Game Tactics',
    objective: 'White to play the most active move',
    solution: ['Ng5'],
    hints: ['Threaten f7!'],
    explanation: 'Ng5 creates immediate threats against f7.',
    difficulty: 2,
    theme: 'attack'
  },
  {
    fen: 'r1bqk2r/ppppbppp/2n2n2/4p3/2BPP3/2N2N2/PPP2PPP/R1BQK2R b KQkq - 0 5',
    title: 'Pawn Break',
    objective: 'Black to challenge the center',
    solution: ['exd4'],
    hints: ['Open the position!'],
    explanation: 'exd4 opens lines for Black\'s pieces.',
    difficulty: 1,
    theme: 'pawn-break'
  },
  {
    fen: '2rq1rk1/pp2ppbp/2n3p1/2p5/4P3/2N1BP2/PPP1Q1PP/R4RK1 w - - 0 12',
    title: 'Piece Coordination',
    objective: 'White to improve piece placement',
    solution: ['Nd5'],
    hints: ['Knights love outposts!'],
    explanation: 'Nd5 is a dominant outpost - Black cannot remove it easily.',
    difficulty: 2,
    theme: 'outpost'
  },
  {
    fen: 'r1b1k2r/ppppqppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    title: 'King Safety',
    objective: 'White to castle and connect rooks',
    solution: ['O-O'],
    hints: ['Safety first!'],
    explanation: 'Castling secures the king and activates the rook.',
    difficulty: 1,
    theme: 'castling'
  },
  {
    fen: 'r1bqkb1r/ppppnppp/5n2/4p1N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    title: 'Traxler Counter-Gambit',
    objective: 'White to continue the attack',
    solution: ['Bxf7+'],
    hints: ['Sacrifice the bishop!'],
    explanation: 'Bxf7+ is a typical attacking sacrifice.',
    difficulty: 3,
    theme: 'sacrifice'
  },
  {
    fen: 'r1bqk2r/ppp2ppp/2n1pn2/3p4/1bPP4/2N2NP1/PP2PP1P/R1BQKB1R w KQkq - 0 6',
    title: 'Fianchetto Defense',
    objective: 'White to continue development',
    solution: ['Bg2'],
    hints: ['Complete the fianchetto'],
    explanation: 'Bg2 develops and eyes the long diagonal.',
    difficulty: 1,
    theme: 'fianchetto'
  },
  {
    fen: 'r2qk2r/ppp1bppp/2n1bn2/3pp3/8/1P2PN2/PBPPBPPP/RN1QK2R w KQkq - 0 7',
    title: 'd4 Break',
    objective: 'White to challenge Black\'s center',
    solution: ['d4'],
    hints: ['Strike at the center!'],
    explanation: 'd4 challenges Black\'s central pawns.',
    difficulty: 2,
    theme: 'center-break'
  },
  {
    fen: 'r1bqkbnr/pp2pppp/2n5/2pp4/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 4',
    title: 'Sicilian Response',
    objective: 'White to handle the Sicilian',
    solution: ['exd5'],
    hints: ['Capture and develop'],
    explanation: 'exd5 leads to good piece play for White.',
    difficulty: 1,
    theme: 'opening'
  },
  // Week 4 - Mating Patterns
  {
    fen: '6k1/5ppp/8/8/8/5N2/5PPP/6K1 w - - 0 1',
    title: 'Arabian Mate Setup',
    objective: 'White to create mating threats',
    solution: ['Nh4'],
    hints: ['Knight and rook coordinate for mate'],
    explanation: 'Positioning for the Arabian mate pattern.',
    difficulty: 2,
    theme: 'mating-pattern'
  },
  {
    fen: '6k1/ppp2ppp/8/4N3/8/8/PPP2PPP/6K1 w - - 0 1',
    title: 'Knight Dominance',
    objective: 'White to maximize knight activity',
    solution: ['Nd7'],
    hints: ['Fork threats!'],
    explanation: 'The knight creates multiple threats from d7.',
    difficulty: 2,
    theme: 'knight-activity'
  },
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bBPP3/2N2N2/PPP2PPP/R1BQK2R b KQkq - 0 5',
    title: 'Evans Gambit Accepted',
    objective: 'Black to handle the gambit',
    solution: ['Bxc3'],
    hints: ['Take the pawn!'],
    explanation: 'Accepting the gambit is the principled response.',
    difficulty: 2,
    theme: 'gambit'
  },
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4',
    title: 'Four Knights Opening',
    objective: 'White to play the main line',
    solution: ['Bb5'],
    hints: ['Spanish setup!'],
    explanation: 'Bb5 leads to the Spanish Four Knights.',
    difficulty: 1,
    theme: 'opening'
  },
  {
    fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    title: 'Petroff Defense',
    objective: 'White\'s best response',
    solution: ['Nxe5'],
    hints: ['Take the pawn!'],
    explanation: 'Nxe5 is the main line, leading to sharp play.',
    difficulty: 2,
    theme: 'opening'
  },
  {
    fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    title: 'Ruy Lopez Defense',
    objective: 'Black\'s most popular response',
    solution: ['a6'],
    hints: ['Challenge the bishop!'],
    explanation: 'a6 is the Morphy Defense, asking the bishop its intentions.',
    difficulty: 1,
    theme: 'opening'
  },
  {
    fen: 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2',
    title: 'Scandinavian Defense',
    objective: 'White to gain an advantage',
    solution: ['exd5'],
    hints: ['Just take it!'],
    explanation: 'exd5 leads to the main Scandinavian lines.',
    difficulty: 1,
    theme: 'opening'
  },
  {
    fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
    title: 'Sicilian Defense Move',
    objective: 'Black continues development',
    solution: ['d6'],
    hints: ['Support the pawn'],
    explanation: 'd6 prepares for the main Sicilian structures.',
    difficulty: 1,
    theme: 'opening'
  },
  // Week 5-7 - Advanced Tactics
  {
    fen: 'r1b1k2r/ppppnppp/2n5/1Bb1p3/4P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 0 5',
    title: 'Two Bishops Advantage',
    objective: 'White to maximize bishop pair',
    solution: ['d4'],
    hints: ['Open the position for the bishops'],
    explanation: 'd4 opens lines for both bishops.',
    difficulty: 2,
    theme: 'bishop-pair'
  },
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R b KQkq - 0 5',
    title: 'Italian Game Response',
    objective: 'Black\'s best continuation',
    solution: ['d6'],
    hints: ['Solid and flexible'],
    explanation: 'd6 keeps options open for Black.',
    difficulty: 1,
    theme: 'opening'
  },
  {
    fen: 'r2q1rk1/ppp1ppbp/2n3p1/3n4/3P4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 10',
    title: 'IQP Play',
    objective: 'White to use the isolated queen pawn',
    solution: ['Bc2'],
    hints: ['Prepare for the attack!'],
    explanation: 'Bc2 targets h7 and prepares piece coordination.',
    difficulty: 2,
    theme: 'isolated-pawn'
  },
  {
    fen: 'r1bqk2r/pp1pppbp/2n2np1/2p5/2P5/2N2NP1/PP1PPP1P/R1BQKB1R w KQkq - 0 5',
    title: 'Maroczy Bind',
    objective: 'White to establish the bind',
    solution: ['e4'],
    hints: ['Control the center!'],
    explanation: 'e4 establishes the powerful Maroczy Bind.',
    difficulty: 2,
    theme: 'pawn-structure'
  }
];

const VISUALIZATION_CHALLENGES: VisualizationChallenge[] = [
  // Week 1 - Opening Visualization
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'],
    question: 'After these moves, where is the White bishop?',
    options: ['c4', 'b5', 'e2', 'd3'],
    correctIndex: 1,
    explanation: 'The Ruy Lopez! The bishop goes to b5, pinning the knight.'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6', 'Ng5'],
    question: 'Which square is under immediate attack?',
    options: ['e5', 'f7', 'd5', 'c6'],
    correctIndex: 1,
    explanation: 'The Fried Liver setup! Knight and bishop target f7.'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5'],
    question: 'What opening is this?',
    options: ['Italian Game', 'Queen\'s Gambit Declined', 'Sicilian Defense', 'French Defense'],
    correctIndex: 1,
    explanation: 'The Queen\'s Gambit Declined with Bg5 pin!'
  },
  {
    startFen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    moves: ['Nf6', 'Ng5', 'd5', 'exd5'],
    question: 'After exd5, how many pieces attack f7?',
    options: ['1', '2', '3', '0'],
    correctIndex: 1,
    explanation: 'Two pieces attack f7: the bishop on c4 and knight on g5!'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4'],
    question: 'What is White\'s pawn structure in the center?',
    options: ['Pawns on e4 and d4', 'Only pawn on e4', 'Pawns on e4 and c4', 'No center pawns'],
    correctIndex: 1,
    explanation: 'Open Sicilian! White has a strong e4 pawn, Black traded c5 for d4.'
  },
  // Week 2 - Piece Placement
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3', 'Nf6', 'd4'],
    question: 'Where can Black\'s dark-squared bishop move to safely?',
    options: ['b6', 'e7', 'a7', 'd6'],
    correctIndex: 0,
    explanation: 'Bb6 keeps the bishop active on the a7-g1 diagonal.'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4'],
    question: 'What opening has Black played?',
    options: ['Queen\'s Indian', 'Nimzo-Indian', 'King\'s Indian', 'Bogo-Indian'],
    correctIndex: 1,
    explanation: 'The Nimzo-Indian Defense, pinning the knight!'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4'],
    question: 'How many White pieces are developed?',
    options: ['1', '2', '3', '0'],
    correctIndex: 0,
    explanation: 'Only one piece (knight on e4) is developed. The pawn pushes don\'t count!'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O'],
    question: 'Is White\'s king safe now?',
    options: ['No, the king is in the center', 'Yes, the king has castled kingside', 'No, Black is attacking', 'Yes, but needs Rd1'],
    correctIndex: 1,
    explanation: 'White castled kingside (O-O), so the king is tucked safely.'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5'],
    question: 'What is this opening called?',
    options: ['Caro-Kann', 'French Defense', 'Scandinavian', 'Pirc Defense'],
    correctIndex: 1,
    explanation: 'The French Defense! Black played e6 on move one.'
  },
  // Week 3 - Tactical Visualization
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6', 'd3', 'Be7', 'O-O', 'O-O'],
    question: 'Which castling did both sides complete?',
    options: ['Queenside', 'Kingside', 'White kingside, Black queenside', 'Neither'],
    correctIndex: 1,
    explanation: 'Both O-O means kingside castling for both players.'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['d4', 'd5', 'c4', 'c6', 'Nc3', 'Nf6', 'Nf3', 'e6'],
    question: 'What pawn structure has Black created?',
    options: ['Isolated Queen Pawn', 'Slav Triangle (c6, d5, e6)', 'Hedgehog', 'Stonewall'],
    correctIndex: 1,
    explanation: 'Black has the solid Slav triangle: pawns on c6, d5, and e6.'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'g6'],
    question: 'What is Black preparing?',
    options: ['Queenside castling', 'Bishop fianchetto on g7', 'f5 break', 'd5 break'],
    correctIndex: 1,
    explanation: 'g6 prepares Bg7, the Dragon variation fianchetto!'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'e5', 'Nf3', 'd6', 'd4', 'Nf6', 'Nc3'],
    question: 'What is this opening?',
    options: ['Ruy Lopez', 'Italian Game', 'Philidor Defense', 'Scotch Game'],
    correctIndex: 2,
    explanation: 'The Philidor Defense! Black played d6 instead of Nc6.'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6'],
    question: 'This is the Najdorf Sicilian. What characterizes it?',
    options: ['Early Bb5', 'The move a6', 'Fianchetto setup', 'Early d5'],
    correctIndex: 1,
    explanation: 'The Najdorf is characterized by the flexible move a6!'
  },
  // Week 4 - Complex Visualization
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6'],
    question: 'What opening is this?',
    options: ['Grünfeld Defense', 'King\'s Indian Defense', 'Benko Gambit', 'Dutch Defense'],
    correctIndex: 1,
    explanation: 'The King\'s Indian Defense with the characteristic g6-Bg7 setup.'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4'],
    question: 'What opening is this?',
    options: ['Italian Game', 'Ruy Lopez', 'Scotch Game', 'Four Knights'],
    correctIndex: 2,
    explanation: 'The Scotch Game! White played d4 early.'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['d4', 'Nf6', 'c4', 'e6', 'Nf3', 'b6'],
    question: 'This is the Queen\'s Indian. Where will Black\'s bishop go?',
    options: ['e7', 'b4', 'b7', 'd6'],
    correctIndex: 2,
    explanation: 'In the Queen\'s Indian, the bishop goes to b7!'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'c5', 'Nc3', 'Nc6', 'g3', 'g6', 'Bg2', 'Bg7'],
    question: 'What type of game is developing?',
    options: ['Open tactical', 'Closed Sicilian', 'Sharp attacking', 'Endgame focused'],
    correctIndex: 1,
    explanation: 'The Closed Sicilian with double fianchetto structure.'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'e5', 'Bc4', 'Nf6', 'd3', 'c6', 'Nf3', 'd5'],
    question: 'What just happened to White\'s bishop on c4?',
    options: ['It\'s trapped', 'It\'s attacked by the d5 pawn', 'It\'s pinned', 'Nothing'],
    correctIndex: 1,
    explanation: 'd5 attacks the bishop on c4 - it must move or capture.'
  },
  // Week 5-7 - Advanced Visualization
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['d4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'e3', 'e6', 'Bxc4'],
    question: 'What gambit has been played?',
    options: ['King\'s Gambit', 'Evans Gambit', 'Queen\'s Gambit Accepted', 'Blackmar-Diemer'],
    correctIndex: 2,
    explanation: 'Black accepted the Queen\'s Gambit with dxc4!'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1'],
    question: 'Why did White play Re1?',
    options: ['To trap the knight', 'To support the e4 pawn', 'To attack the king', 'To develop the rook'],
    correctIndex: 1,
    explanation: 'Re1 supports the e4 pawn and eyes the open e-file.'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'b4'],
    question: 'What gambit is this?',
    options: ['King\'s Gambit', 'Evans Gambit', 'Danish Gambit', 'Scotch Gambit'],
    correctIndex: 1,
    explanation: 'The Evans Gambit! White sacrifices a pawn with b4.'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'c5', 'Nf3', 'e6', 'd4', 'cxd4', 'Nxd4', 'a6', 'Bd3'],
    question: 'What Sicilian variation does a6 indicate?',
    options: ['Dragon', 'Najdorf', 'Scheveningen', 'Kan'],
    correctIndex: 3,
    explanation: 'The Kan/Paulsen variation, characterized by early a6 and e6.'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'd5'],
    question: 'What is this defense called?',
    options: ['King\'s Indian', 'Grünfeld', 'Benoni', 'Dutch'],
    correctIndex: 1,
    explanation: 'The Grünfeld Defense! Black challenges the center with d5.'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'e5', 'Nf3', 'Nf6'],
    question: 'What is this opening?',
    options: ['Italian Game', 'Petroff Defense', 'Philidor Defense', 'Scotch Game'],
    correctIndex: 1,
    explanation: 'The Petroff/Russian Defense! Black mirrors with Nf6.'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['e4', 'd6', 'd4', 'Nf6', 'Nc3', 'g6'],
    question: 'What defense is Black playing?',
    options: ['King\'s Indian', 'Pirc Defense', 'Modern Defense', 'Philidor'],
    correctIndex: 1,
    explanation: 'The Pirc Defense with d6, Nf6, and g6.'
  },
  {
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: ['c4', 'c5', 'Nc3', 'Nc6', 'g3', 'g6', 'Bg2', 'Bg7'],
    question: 'What is the character of this English Opening?',
    options: ['Sharp and tactical', 'Symmetrical and slow', 'Gambit play', 'King attack'],
    correctIndex: 1,
    explanation: 'Symmetrical English - both sides fianchetto, strategic battle.'
  }
];

const GM_ANALYSIS_CHALLENGES: ChallengePosition[] = [
  // Week 1 - Classical Masters
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    title: 'Morphy\'s Developing Wisdom',
    objective: 'What would Morphy play here?',
    solution: ['O-O'],
    hints: ['Rapid development is key', 'Safety first, then attack'],
    explanation: 'Morphy castles! Development and king safety before attack.',
    difficulty: 1,
    theme: 'development'
  },
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    title: 'Kasparov\'s Attack',
    objective: 'Kasparov loved the initiative. Find the aggressive move!',
    solution: ['Ng5'],
    hints: ['Attack is the best defense', 'Target the weakness'],
    explanation: 'Ng5! immediately threatens Nxf7. Kasparov\'s attacking spirit!',
    difficulty: 2,
    theme: 'attack'
  },
  {
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    title: 'Karpov\'s Prophylaxis',
    objective: 'What prophylactic move would Karpov choose?',
    solution: ['a3'],
    hints: ['Prevent Black\'s counterplay', 'Control before action'],
    explanation: 'a3! prevents ...Bb4 and prepares b4. Classic Karpov restraint.',
    difficulty: 2,
    theme: 'prophylaxis'
  },
  {
    fen: 'rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4',
    title: 'Botvinnik\'s System',
    objective: 'How would Botvinnik handle this position?',
    solution: ['Nf3'],
    hints: ['Systematic development', 'Control the center'],
    explanation: 'Nf3! Solid development - Botvinnik favored clear, logical play.',
    difficulty: 1,
    theme: 'systematic'
  },
  {
    fen: 'r1bqk2r/ppp2ppp/2n1pn2/3p4/1bPP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6',
    title: 'Capablanca\'s Simplicity',
    objective: 'Capablanca liked simple, strong moves. What\'s best?',
    solution: ['Bd3'],
    hints: ['Develop naturally', 'No complications needed'],
    explanation: 'Bd3! Simple and strong - develops while eyeing the kingside.',
    difficulty: 1,
    theme: 'simplicity'
  },
  // Week 2 - Modern Masters
  {
    fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 6',
    title: 'Carlsen\'s Grinding',
    objective: 'Carlsen excels at slow improvement. Find the move!',
    solution: ['h3'],
    hints: ['Prevent pins', 'Small improvements'],
    explanation: 'h3! prevents Bg4, a typical Carlsen prophylactic move.',
    difficulty: 2,
    theme: 'prophylaxis'
  },
  {
    fen: 'r2qkb1r/pp1npppp/2p2n2/3p1b2/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5',
    title: 'Tal\'s Magic',
    objective: 'Tal would sacrifice here. What\'s the attacking move?',
    solution: ['Qb3'],
    hints: ['Attack b7!', 'Create pressure'],
    explanation: 'Qb3! pressures b7 and d5 - classic Tal aggression.',
    difficulty: 2,
    theme: 'attack'
  },
  {
    fen: 'r1bqk2r/ppp2ppp/2n1pn2/3p4/1bPP4/2NBPN2/PP3PPP/R1BQK2R b KQkq - 0 6',
    title: 'Petrosian\'s Defense',
    objective: 'Petrosian was a defensive genius. Black to play safely.',
    solution: ['O-O'],
    hints: ['King safety first', 'Don\'t overextend'],
    explanation: 'O-O! Petrosian believed in securing the king before all else.',
    difficulty: 1,
    theme: 'defense'
  },
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 4',
    title: 'Fischer\'s Precision',
    objective: 'Fischer\'s accurate play. What\'s the best move?',
    solution: ['O-O'],
    hints: ['Complete development', 'Connect the rooks'],
    explanation: 'O-O! Fischer\'s play was characterized by precise development.',
    difficulty: 1,
    theme: 'development'
  },
  {
    fen: 'rnbqkb1r/pp1ppppp/5n2/2p5/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 0 3',
    title: 'Anand\'s Sicilian',
    objective: 'Anand\'s favorite Sicilian move here?',
    solution: ['cxd4'],
    hints: ['Exchange and develop', 'Open the position'],
    explanation: 'cxd4! Anand loved dynamic, open positions in the Sicilian.',
    difficulty: 1,
    theme: 'dynamics'
  },
  // Week 3 - Strategic Concepts
  {
    fen: 'r1bqr1k1/ppp2ppp/2nb1n2/3p4/3P4/2NBPN2/PPP2PPP/R1BQ1RK1 w - - 0 8',
    title: 'Kramnik\'s Solidity',
    objective: 'Kramnik was known for solid play. Best move?',
    solution: ['Qe2'],
    hints: ['Improve the queen', 'Connect everything'],
    explanation: 'Qe2! Solid, connects rooks, and keeps options open.',
    difficulty: 2,
    theme: 'solidity'
  },
  {
    fen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PPQ1BPPP/R1B2RK1 w - - 0 9',
    title: 'Smyslov\'s Harmony',
    objective: 'Smyslov emphasized piece harmony. What improves coordination?',
    solution: ['b3'],
    hints: ['Develop the bishop', 'Create a system'],
    explanation: 'b3! prepares Bb2, creating beautiful piece harmony.',
    difficulty: 2,
    theme: 'harmony'
  },
  {
    fen: 'r2qk2r/ppp1bppp/2n1bn2/3pp3/4P3/1NN1BP2/PPP1B1PP/R2QK2R w KQkq - 0 8',
    title: 'Spassky\'s Activity',
    objective: 'Spassky loved active play. Find the dynamic move!',
    solution: ['exd5'],
    hints: ['Open lines', 'Activate pieces'],
    explanation: 'exd5! Opens the position for active piece play.',
    difficulty: 2,
    theme: 'activity'
  },
  {
    fen: 'r1bqk2r/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQK2R w KQkq - 0 7',
    title: 'Lasker\'s Psychology',
    objective: 'Lasker often played unexpected moves. What\'s surprising here?',
    solution: ['O-O'],
    hints: ['Sometimes simple is unexpected', 'Complete development'],
    explanation: 'O-O! Lasker knew that sometimes the most practical move wins.',
    difficulty: 1,
    theme: 'practical'
  },
  {
    fen: 'r1bq1rk1/pppnbppp/4pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 8',
    title: 'Steinitz\'s Defense',
    objective: 'Steinitz pioneered modern defensive concepts. Best move?',
    solution: ['Qc2'],
    hints: ['Prepare the advance', 'Central control'],
    explanation: 'Qc2! Prepares e4, fighting for the center - classical Steinitz.',
    difficulty: 2,
    theme: 'center-control'
  },
  // Week 4-7 - Extended GM Analysis
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 4 4',
    title: 'Modern Response',
    objective: 'Black\'s most solid response?',
    solution: ['Bc5'],
    hints: ['Active development', 'Target f2'],
    explanation: 'Bc5! Actively develops while targeting the f2 pawn.',
    difficulty: 1,
    theme: 'active-development'
  },
  {
    fen: 'r2qkb1r/ppp1pppp/2n2n2/3p1b2/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
    title: 'White\'s Initiative',
    objective: 'How to gain space and initiative?',
    solution: ['e5'],
    hints: ['Push!', 'Gain space'],
    explanation: 'e5! Gains space and kicks the knight.',
    difficulty: 2,
    theme: 'space'
  },
  {
    fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3',
    title: 'Central Tension',
    objective: 'Maintain or release the tension?',
    solution: ['e5'],
    hints: ['Advance!', 'Gain space'],
    explanation: 'e5! The Advance variation - gain space, restrict Black.',
    difficulty: 2,
    theme: 'advance'
  },
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2BPP3/5N2/PPP2PPP/RNBQK2R b KQkq - 0 4',
    title: 'Defensive Precision',
    objective: 'Black to maintain equality',
    solution: ['exd4'],
    hints: ['Simplify the center'],
    explanation: 'exd4! Simplifies and keeps balance.',
    difficulty: 2,
    theme: 'simplification'
  },
  {
    fen: 'r1bqk2r/ppppbppp/2n2n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    title: 'Opening the Position',
    objective: 'White to open lines for the bishops',
    solution: ['dxe5'],
    hints: ['Open the center', 'Activate the bishops'],
    explanation: 'dxe5! Opens the position for the bishop pair.',
    difficulty: 2,
    theme: 'open-position'
  },
  {
    fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/1bPP4/2NBPN2/PP3PPP/R1BQ1RK1 b - - 0 7',
    title: 'Black\'s Plan',
    objective: 'Black\'s best plan in this position?',
    solution: ['dxc4'],
    hints: ['Resolve the tension', 'Create targets'],
    explanation: 'dxc4! Forces White to recapture, clarifying the position.',
    difficulty: 2,
    theme: 'pawn-structure'
  },
  {
    fen: 'r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 8',
    title: 'White\'s Breakthrough',
    objective: 'Find the key break!',
    solution: ['e4'],
    hints: ['Challenge the center', 'Open lines'],
    explanation: 'e4! The thematic break in this structure.',
    difficulty: 2,
    theme: 'breakthrough'
  },
  {
    fen: 'r2q1rk1/pppbbppp/2n1pn2/3p4/2PP4/2N1PN2/PPQ1BPPP/R1B2RK1 w - - 0 9',
    title: 'Improving Pieces',
    objective: 'Which piece needs improvement?',
    solution: ['Rd1'],
    hints: ['Activate the rook', 'Central control'],
    explanation: 'Rd1! The rook joins the game on the central file.',
    difficulty: 2,
    theme: 'activation'
  },
  {
    fen: 'r1bqk2r/ppp1bppp/2n1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQK2R w KQkq - 0 6',
    title: 'Classical Setup',
    objective: 'Complete the classical setup',
    solution: ['O-O'],
    hints: ['King safety', 'Connect rooks'],
    explanation: 'O-O! Classical play - develop, castle, then act.',
    difficulty: 1,
    theme: 'classical'
  },
  {
    fen: 'r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6',
    title: 'Flexible Play',
    objective: 'Maintain flexibility',
    solution: ['Bd3'],
    hints: ['Develop naturally', 'Keep options'],
    explanation: 'Bd3! Develops while keeping many plans available.',
    difficulty: 1,
    theme: 'flexibility'
  }
];

const LEGENDS_CHALLENGES: ChallengePosition[] = [
  // Week 1 - Romantic Era
  {
    fen: 'r1bqkb1r/pppp1Npp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4',
    title: 'The Fried Liver Attack',
    objective: 'A position from countless master games. Black to defend.',
    solution: ['Ke7'],
    hints: ['The king must move', 'Ke7 or Kxf7?'],
    explanation: 'This razor-sharp position has been played for centuries!',
    difficulty: 2,
    theme: 'fried-liver'
  },
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R b KQkq b3 0 4',
    title: 'The Evans Gambit',
    objective: 'A legendary romantic gambit. Black must decide.',
    solution: ['Bxb4'],
    hints: ['Accept or decline?', 'Taking opens the position'],
    explanation: 'The Evans Gambit sacrifices a pawn for rapid development.',
    difficulty: 2,
    theme: 'evans-gambit'
  },
  {
    fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4',
    title: 'Queen\'s Gambit Classical',
    objective: 'How did Capablanca handle this position?',
    solution: ['Bg5'],
    hints: ['Pin the knight', 'Classical development'],
    explanation: 'Bg5! The classical approach, used by Capablanca countless times.',
    difficulty: 1,
    theme: 'queens-gambit'
  },
  {
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 3',
    title: 'Morphy\'s Favorite',
    objective: 'Morphy played this opening countless times. What\'s next?',
    solution: ['Bc4'],
    hints: ['Target the weakness!', 'f7 is vulnerable'],
    explanation: 'The Italian Game - Morphy\'s weapon of choice.',
    difficulty: 1,
    theme: 'italian-game'
  },
  {
    fen: 'r1bqk1nr/ppppbppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    title: 'King\'s Gambit Spirit',
    objective: 'Play in the spirit of the King\'s Gambit attackers!',
    solution: ['d4'],
    hints: ['Open the center!', 'Attack before Black castles'],
    explanation: 'd4! Opening lines while Black\'s king is in the center.',
    difficulty: 2,
    theme: 'kings-gambit'
  },
  // Week 2 - World Champions
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    title: 'Fischer\'s Favorite',
    objective: 'Fischer loved this position. What would he play?',
    solution: ['Bb5'],
    hints: ['The Ruy Lopez!', 'Pin the knight'],
    explanation: 'Bb5! The Ruy Lopez was Fischer\'s main weapon.',
    difficulty: 1,
    theme: 'ruy-lopez'
  },
  {
    fen: 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2',
    title: 'Steinitz\'s Defense',
    objective: 'How would Steinitz handle this Scandinavian?',
    solution: ['exd5'],
    hints: ['Take the pawn!', 'Then develop'],
    explanation: 'exd5! Steinitz believed in concrete play.',
    difficulty: 1,
    theme: 'scandinavian'
  },
  {
    fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    title: 'Lasker\'s Counter',
    objective: 'Lasker often played a surprising defense here.',
    solution: ['a6'],
    hints: ['Challenge the bishop!', 'Morphy Defense'],
    explanation: 'a6! Asking the bishop to clarify its intentions.',
    difficulty: 1,
    theme: 'morphy-defense'
  },
  {
    fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    title: 'Tal\'s Sharp Play',
    objective: 'Tal loved complications. What leads to sharp play?',
    solution: ['Nxe5'],
    hints: ['Take the pawn!', 'The Petroff counterattack'],
    explanation: 'Nxe5! Leads to tactical complications Tal excelled at.',
    difficulty: 2,
    theme: 'petroff'
  },
  {
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2',
    title: 'King\'s Gambit Accepted',
    objective: 'Accept the romantic gambit!',
    solution: ['exf4'],
    hints: ['Take it!', 'The King\'s Gambit spirit'],
    explanation: 'exf4! The romantic era accepted such gambits.',
    difficulty: 1,
    theme: 'kings-gambit'
  },
  // Week 3 - Positional Masters
  {
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 3',
    title: 'Italian Giuoco Piano',
    objective: 'The "Quiet Game" - find the thematic move',
    solution: ['c3'],
    hints: ['Prepare d4', 'Solid development'],
    explanation: 'c3! Preparing the central advance d4.',
    difficulty: 1,
    theme: 'italian'
  },
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    title: 'Slow Italian',
    objective: 'White\'s patient approach in the Italian',
    solution: ['Nc3'],
    hints: ['Develop the knight', 'Classical approach'],
    explanation: 'Nc3! Natural development in the Giuoco Piano.',
    difficulty: 1,
    theme: 'giuoco-piano'
  },
  {
    fen: 'r1bqk2r/ppp1bppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6',
    title: 'Carlsen\'s Approach',
    objective: 'How does Carlsen handle this typical position?',
    solution: ['Bd3'],
    hints: ['Simple and strong', 'Develop with purpose'],
    explanation: 'Bd3! Simple development - Carlsen\'s trademark.',
    difficulty: 1,
    theme: 'carlsen'
  },
  {
    fen: 'r1bqkb1r/pp1ppppp/2n2n2/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    title: 'Kasparov\'s Sicilian',
    objective: 'Kasparov dominated with White against the Sicilian.',
    solution: ['d4'],
    hints: ['Open the position!', 'Main line'],
    explanation: 'd4! The Open Sicilian - Kasparov\'s battlefield.',
    difficulty: 1,
    theme: 'sicilian'
  },
  {
    fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2',
    title: 'Queen\'s Gambit Decision',
    objective: 'Accept or Decline the Queen\'s Gambit?',
    solution: ['e6'],
    hints: ['The classical response', 'Solid and reliable'],
    explanation: 'e6! The Queen\'s Gambit Declined - solid as a rock.',
    difficulty: 1,
    theme: 'qgd'
  },
  // Week 4 - Tactical Geniuses
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    title: 'Two Knights Defense',
    objective: 'White\'s most aggressive continuation',
    solution: ['Ng5'],
    hints: ['Attack f7!', 'The Fried Liver beckons'],
    explanation: 'Ng5! Heading for the famous Fried Liver Attack.',
    difficulty: 2,
    theme: 'two-knights'
  },
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1PP2/5N2/PPPP2PP/RNBQK2R b KQkq f3 0 4',
    title: 'King\'s Gambit in the Italian',
    objective: 'White sacrifices a pawn for attack!',
    solution: ['exf4'],
    hints: ['Accept the challenge!'],
    explanation: 'exf4! Accepting the gambit is the sharpest response.',
    difficulty: 2,
    theme: 'gambit'
  },
  {
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 2 3',
    title: 'Bishop\'s Opening',
    objective: 'Develop with an eye on f7',
    solution: ['Qf3'],
    hints: ['Threaten Scholar\'s Mate!', 'Put pressure early'],
    explanation: 'Qf3! Threatens Qxf7# - Black must be careful.',
    difficulty: 2,
    theme: 'scholars-threat'
  },
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/4P3/2P2N2/PP1P1PPP/RNBQKB1R w KQkq - 0 5',
    title: 'c3 Italian Setup',
    objective: 'White prepares the center strike',
    solution: ['d4'],
    hints: ['Open the center!', 'Challenge Black\'s bishop'],
    explanation: 'd4! The thematic center break.',
    difficulty: 1,
    theme: 'center-strike'
  },
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2NP1N2/PPP2PPP/R1BQK2R b KQkq - 0 5',
    title: 'Nimzo Style Pin',
    objective: 'Black pins the knight - typical Nimzo-Indian idea',
    solution: ['O-O'],
    hints: ['Castle and develop', 'The pin isn\'t dangerous'],
    explanation: 'O-O! Don\'t worry about the pin - development first.',
    difficulty: 1,
    theme: 'nimzo-idea'
  },
  // Week 5-7 - Mixed Legends
  {
    fen: 'rnbqkbnr/ppp1pppp/3p4/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    title: 'Philidor\'s Defense',
    objective: 'Against the Philidor, White develops actively',
    solution: ['d4'],
    hints: ['Claim the center!'],
    explanation: 'd4! Classical central control.',
    difficulty: 1,
    theme: 'philidor'
  },
  {
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2',
    title: 'Vienna Game',
    objective: 'Black\'s most solid response to the Vienna',
    solution: ['Nf6'],
    hints: ['Attack the pawn!', 'Development'],
    explanation: 'Nf6! Challenges White\'s center immediately.',
    difficulty: 1,
    theme: 'vienna'
  },
  {
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    title: 'Open Game Crossroads',
    objective: 'White\'s main choices here lead to different openings',
    solution: ['Bc4'],
    hints: ['Italian Game!', 'Target f7'],
    explanation: 'Bc4! The Italian Game - a timeless classic.',
    difficulty: 1,
    theme: 'italian'
  },
  {
    fen: 'rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2',
    title: 'Alekhine\'s Defense',
    objective: 'White chases the knight and gains space',
    solution: ['e5'],
    hints: ['Push!', 'Gain territory'],
    explanation: 'e5! White gains space while Black\'s knight runs.',
    difficulty: 1,
    theme: 'alekhine'
  },
  {
    fen: 'rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    title: 'French Defense Setup',
    objective: 'White\'s main continuation against the French',
    solution: ['d4'],
    hints: ['Control the center', 'Build a pawn chain'],
    explanation: 'd4! The classical approach against the French.',
    difficulty: 1,
    theme: 'french'
  },
  {
    fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2',
    title: 'Sicilian Dragon Path',
    objective: 'White enters the Open Sicilian',
    solution: ['Nf3'],
    hints: ['Develop!', 'Prepare d4'],
    explanation: 'Nf3! Standard development preparing d4.',
    difficulty: 1,
    theme: 'sicilian'
  },
  {
    fen: 'rnbqkbnr/ppp1pppp/8/3pP3/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 2',
    title: 'Advance French',
    objective: 'Black\'s typical counter in the Advance French',
    solution: ['c5'],
    hints: ['Attack the chain!', 'Classical break'],
    explanation: 'c5! The thematic break against the pawn chain.',
    difficulty: 2,
    theme: 'french-advance'
  },
  {
    fen: 'rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2',
    title: 'Queen\'s Pawn Opening',
    objective: 'Black\'s most flexible response',
    solution: ['e6'],
    hints: ['Keep options open', 'Solid'],
    explanation: 'e6! Flexible - can transpose to many openings.',
    difficulty: 1,
    theme: 'flexibility'
  },
  {
    fen: 'rnbqkb1r/pppp1ppp/4pn2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
    title: 'Indian Defense Choice',
    objective: 'White\'s most common continuation',
    solution: ['Nc3'],
    hints: ['Natural development', 'Control d5'],
    explanation: 'Nc3! Develops and fights for the center.',
    difficulty: 1,
    theme: 'indian'
  },
  {
    fen: 'rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
    title: 'King\'s Indian Setup',
    objective: 'White builds a powerful center',
    solution: ['Nc3'],
    hints: ['Develop!', 'Prepare e4'],
    explanation: 'Nc3! Preparing the big center with e4.',
    difficulty: 1,
    theme: 'kings-indian'
  }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getDayOfWeek(): DayOfWeek {
  const days: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
}

function getDateString(): string {
  return new Date().toISOString().split('T')[0];
}

function getDailySeed(): number {
  const dateStr = getDateString();
  return dateStr.split('-').reduce((acc, n) => acc + parseInt(n), 0);
}

// Get the week number of the year (0-51)
function getWeekNumber(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek);
}

// Select challenges for a day with weekly rotation
// Returns 10 challenges that change each week
function selectWeeklyChallenges<T>(challenges: T[], count: number = 10): T[] {
  const weekNum = getWeekNumber();
  const totalChallenges = challenges.length;
  const result: T[] = [];
  
  // Use week number as seed for selection
  const startOffset = (weekNum * count) % totalChallenges;
  
  for (let i = 0; i < count && i < totalChallenges; i++) {
    const idx = (startOffset + i) % totalChallenges;
    result.push(challenges[idx]);
  }
  
  return result;
}

const DEFAULT_STATS: DailyChallengeStats = {
  completedDates: [],
  currentStreak: 0,
  longestStreak: 0,
  totalChallenges: 0,
  typeStats: {
    endgame: { completed: 0, total: 0 },
    tactics: { completed: 0, total: 0 },
    visualization: { completed: 0, total: 0 },
    'gm-analysis': { completed: 0, total: 0 },
    'speed-rush': { completed: 0, total: 0 },
    legends: { completed: 0, total: 0 },
    mixed: { completed: 0, total: 0 }
  },
  lastCompleted: null,
  weeklyProgress: {}
};

// ============================================
// MAIN COMPONENT
// ============================================

type ViewMode = 'overview' | 'challenge' | 'visualization' | 'speed-rush' | 'complete';

export function DailyChallengesPage() {
  const navigate = useNavigate();
  const today = getDayOfWeek();
  const todayTheme = DAY_THEMES[today];
  const dateString = getDateString();
  
  // State
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [stats, setStats] = useState<DailyChallengeStats>(() => {
    const saved = localStorage.getItem('zenChessDailyChallengeStats');
    return saved ? { ...DEFAULT_STATS, ...JSON.parse(saved) } : DEFAULT_STATS;
  });
  
  // Challenge state
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, { backgroundColor: string }>>({});
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState(false);
  const [moveIndex, setMoveIndex] = useState(0);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [showCorrectFeedback, setShowCorrectFeedback] = useState(false);
  const [showIncorrectShake, setShowIncorrectShake] = useState(false);
  
  // Visualization state
  const [visIndex, setVisIndex] = useState(0);
  const [visAnswer, setVisAnswer] = useState<number | null>(null);
  const [showVisResult, setShowVisResult] = useState(false);
  
  // Speed rush state
  const [rushTimer, setRushTimer] = useState(60);
  const [rushScore, setRushScore] = useState(0);
  const [rushActive, setRushActive] = useState(false);
  
  // Check if today is completed
  const todayCompleted = stats.completedDates.includes(dateString);
  
  // Save stats
  useEffect(() => {
    localStorage.setItem('zenChessDailyChallengeStats', JSON.stringify(stats));
  }, [stats]);
  
  // Get today's challenges based on weekly rotation - 10 challenges per day
  const todayChallenges = useMemo(() => {
    switch (todayTheme.type) {
      case 'endgame':
        return selectWeeklyChallenges(ENDGAME_CHALLENGES, 10);
      case 'tactics':
        return selectWeeklyChallenges(TACTICS_CHALLENGES, 10);
      case 'gm-analysis':
        return selectWeeklyChallenges(GM_ANALYSIS_CHALLENGES, 10);
      case 'legends':
        return selectWeeklyChallenges(LEGENDS_CHALLENGES, 10);
      case 'mixed':
        // Sunday gets a mix of all challenge types
        const mixed = [
          ...selectWeeklyChallenges(ENDGAME_CHALLENGES, 2),
          ...selectWeeklyChallenges(TACTICS_CHALLENGES, 3),
          ...selectWeeklyChallenges(GM_ANALYSIS_CHALLENGES, 2),
          ...selectWeeklyChallenges(LEGENDS_CHALLENGES, 3),
        ];
        return mixed;
      default:
        return selectWeeklyChallenges(TACTICS_CHALLENGES, 10);
    }
  }, [todayTheme.type]);
  
  // Get today's visualization challenges - 10 per day with weekly rotation
  const todayVisualization = useMemo(() => {
    return selectWeeklyChallenges(VISUALIZATION_CHALLENGES, 10);
  }, []);
  
  // Start challenge
  const startChallenge = useCallback(() => {
    setChallengeIndex(0);
    setMoveIndex(0);
    setShowHint(false);
    setSolved(false);
    setMoveFrom(null);
    setOptionSquares({});
    
    if (todayChallenges[0]) {
      setGame(new Chess(todayChallenges[0].fen));
    }
    
    if (todayTheme.type === 'visualization') {
      setViewMode('visualization');
      setVisIndex(0);
      setVisAnswer(null);
      setShowVisResult(false);
    } else if (todayTheme.type === 'speed-rush') {
      setViewMode('speed-rush');
      setRushTimer(60);
      setRushScore(0);
      setRushActive(true);
    } else {
      setViewMode('challenge');
    }
  }, [todayChallenges, todayTheme.type]);
  
  // Speed rush timer
  useEffect(() => {
    if (!rushActive || rushTimer <= 0) return;
    
    const timer = setInterval(() => {
      setRushTimer(prev => {
        if (prev <= 1) {
          setRushActive(false);
          completeChallenge();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [rushActive, rushTimer]);
  
  // Complete challenge and update stats
  const completeChallenge = useCallback(() => {
    setStats(prev => {
      const newCompletedDates = [...prev.completedDates, dateString];
      const newStreak = prev.lastCompleted === getYesterday() ? prev.currentStreak + 1 : 1;
      
      return {
        ...prev,
        completedDates: newCompletedDates,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        totalChallenges: prev.totalChallenges + 1,
        typeStats: {
          ...prev.typeStats,
          [todayTheme.type]: {
            completed: (prev.typeStats[todayTheme.type]?.completed || 0) + 1,
            total: (prev.typeStats[todayTheme.type]?.total || 0) + 1
          }
        },
        lastCompleted: dateString,
        weeklyProgress: {
          ...prev.weeklyProgress,
          [dateString]: true
        }
      };
    });
    setViewMode('complete');
  }, [dateString, todayTheme.type]);
  
  // Get yesterday's date string
  function getYesterday(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  }
  
  // Handle move in puzzle
  const handleMove = useCallback((from: Square, to: Square) => {
    const currentChallenge = todayChallenges[challengeIndex];
    if (!currentChallenge?.solution || solved) return false;
    
    const gameCopy = new Chess(game.fen());
    try {
      const result = gameCopy.move({ from, to, promotion: 'q' });
      if (!result) return false;
      
      const expectedMove = currentChallenge.solution[moveIndex];
      const isCorrect = result.san === expectedMove || 
        `${from}${to}` === expectedMove ||
        result.san.replace(/[+#]/g, '') === expectedMove?.replace(/[+#]/g, '');
      
      if (isCorrect) {
        setGame(gameCopy);
        setLastMove({ from, to });
        setShowCorrectFeedback(true);
        setTimeout(() => setShowCorrectFeedback(false), 800);
        
        if (moveIndex + 1 >= currentChallenge.solution.length) {
          // Puzzle solved
          setSolved(true);
          if (todayTheme.type === 'speed-rush') {
            setRushScore(prev => prev + 1);
            // Load next puzzle
            setTimeout(() => {
              const nextIdx = (challengeIndex + 1) % TACTICS_CHALLENGES.length;
              setChallengeIndex(nextIdx);
              setGame(new Chess(TACTICS_CHALLENGES[nextIdx].fen));
              setMoveIndex(0);
              setSolved(false);
              setLastMove(null);
            }, 300);
          } else if (challengeIndex + 1 < todayChallenges.length) {
            // More challenges
            setTimeout(() => {
              setChallengeIndex(prev => prev + 1);
              setGame(new Chess(todayChallenges[challengeIndex + 1].fen));
              setMoveIndex(0);
              setSolved(false);
              setShowHint(false);
              setLastMove(null);
            }, 1500);
          } else {
            // All done
            setTimeout(() => completeChallenge(), 1500);
          }
        } else {
          // Play opponent's response if applicable
          setMoveIndex(prev => prev + 1);
          if (currentChallenge.solution?.[moveIndex + 1]) {
            setTimeout(() => {
              const opponentMove = currentChallenge.solution?.[moveIndex + 1];
              if (opponentMove) {
                const responseGame = new Chess(gameCopy.fen());
                try {
                  const response = responseGame.move(opponentMove);
                  if (response) {
                    setGame(responseGame);
                    setLastMove({ from: response.from as Square, to: response.to as Square });
                    setMoveIndex(prev => prev + 1);
                  }
                } catch {
                  // Invalid move
                }
              }
            }, 500);
          }
        }
        return true;
      } else {
        // Incorrect move - show shake feedback
        setShowIncorrectShake(true);
        setTimeout(() => setShowIncorrectShake(false), 500);
        return false;
      }
    } catch {
      return false;
    }
    return false;
  }, [game, todayChallenges, challengeIndex, moveIndex, solved, todayTheme.type, completeChallenge]);
  
  // Square click handler
  const onSquareClick = useCallback((square: Square) => {
    if (solved) return;
    
    if (!moveFrom) {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
        const moves = game.moves({ square, verbose: true });
        const newSquares: Record<string, { backgroundColor: string }> = {};
        moves.forEach(move => {
          newSquares[move.to] = { backgroundColor: 'rgba(129, 182, 76, 0.4)' };
        });
        newSquares[square] = { backgroundColor: 'rgba(129, 182, 76, 0.5)' };
        setOptionSquares(newSquares);
      }
      return;
    }
    
    handleMove(moveFrom, square);
    setMoveFrom(null);
    setOptionSquares({});
  }, [game, moveFrom, solved, handleMove]);
  
  // Handle visualization answer
  const handleVisAnswer = useCallback((index: number) => {
    if (visAnswer !== null) return;
    
    setVisAnswer(index);
    setShowVisResult(true);
    
    setTimeout(() => {
      if (visIndex + 1 < todayVisualization.length) {
        setVisIndex(prev => prev + 1);
        setVisAnswer(null);
        setShowVisResult(false);
      } else {
        completeChallenge();
      }
    }, 2000);
  }, [visAnswer, visIndex, todayVisualization.length, completeChallenge]);
  
  // Get week progress
  const weekProgress = useMemo(() => {
    const days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    
    return days.map((day, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      return {
        day,
        date: dateStr,
        completed: stats.completedDates.includes(dateStr),
        isFuture: date > today,
        isToday: dateStr === dateString
      };
    });
  }, [stats.completedDates, dateString]);
  
  // ============================================
  // RENDER: OVERVIEW
  // ============================================
  if (viewMode === 'overview') {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <header>
          <div className="flex items-center gap-2 text-sm mb-4">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>
              Home
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-secondary)' }}>Daily Challenges</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            📅 Daily Challenges
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
            A new themed challenge every day of the week
          </p>
        </header>
        
        {/* Today's Challenge Hero */}
        <div 
          className="card p-8 text-center"
          style={{ background: `linear-gradient(135deg, ${todayTheme.color}20, transparent)` }}
        >
          <div className="text-6xl mb-4">{todayTheme.icon}</div>
          <h2 className="text-2xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
            {todayTheme.name}
          </h2>
          <p className="text-lg mb-6" style={{ color: todayTheme.color }}>
            {todayTheme.tagline}
          </p>
          
          {todayCompleted ? (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: '#4ade8030' }}>
                <span className="text-xl">✅</span>
                <span style={{ color: '#4ade80' }}>Completed Today!</span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Come back tomorrow for a new challenge
              </p>
            </div>
          ) : (
            <button onClick={startChallenge} className="btn-primary text-lg px-8 py-3">
              Start Today's Challenge
            </button>
          )}
        </div>
        
        {/* Week Progress */}
        <div className="card p-6">
          <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
            This Week's Progress
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {weekProgress.map(({ day, completed, isFuture, isToday }) => {
              const dayTheme = DAY_THEMES[day];
              return (
                <div
                  key={day}
                  className={`p-3 rounded-xl text-center transition-all ${isToday ? 'ring-2 ring-purple-500' : ''}`}
                  style={{ 
                    background: completed ? dayTheme.color + '30' : 'var(--bg-tertiary)',
                    opacity: isFuture ? 0.5 : 1,
                  }}
                >
                  <div className="text-2xl mb-1">{completed ? '✅' : dayTheme.icon}</div>
                  <div className="text-xs font-medium capitalize" style={{ color: completed ? dayTheme.color : 'var(--text-muted)' }}>
                    {day.slice(0, 3)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#f59e0b' }}>🔥 {stats.currentStreak}</div>
            <div className="stat-label">Current Streak</div>
          </div>
          <div className="stat-card">
            <div className="stat-value text-gradient">{stats.longestStreak}</div>
            <div className="stat-label">Longest Streak</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#4ade80' }}>{stats.totalChallenges}</div>
            <div className="stat-label">Total Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#ec4899' }}>{weekProgress.filter(d => d.completed).length}/7</div>
            <div className="stat-label">This Week</div>
          </div>
        </div>
        
        {/* Weekly Schedule */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Weekly Schedule
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {(Object.entries(DAY_THEMES) as [DayOfWeek, typeof DAY_THEMES[DayOfWeek]][]).slice(0, 4).map(([day, theme]) => (
              <div 
                key={day}
                className="card p-4 flex items-center gap-3"
                style={{ background: day === today ? theme.color + '15' : undefined }}
              >
                <span className="text-2xl">{theme.icon}</span>
                <div>
                  <div className="font-medium capitalize" style={{ color: theme.color }}>
                    {day}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {theme.name.replace(day.charAt(0).toUpperCase() + day.slice(1), '').trim()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {(Object.entries(DAY_THEMES) as [DayOfWeek, typeof DAY_THEMES[DayOfWeek]][]).slice(4).map(([day, theme]) => (
              <div 
                key={day}
                className="card p-4 flex items-center gap-3"
                style={{ background: day === today ? theme.color + '15' : undefined }}
              >
                <span className="text-2xl">{theme.icon}</span>
                <div>
                  <div className="font-medium capitalize" style={{ color: theme.color }}>
                    {day}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {theme.name.replace(day.charAt(0).toUpperCase() + day.slice(1), '').trim()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // ============================================
  // RENDER: CHALLENGE (Puzzles/Endgame/GM Analysis/Legends)
  // ============================================
  if (viewMode === 'challenge' && todayChallenges[challengeIndex]) {
    const currentChallenge = todayChallenges[challengeIndex];
    
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{todayTheme.icon}</span>
            <div>
              <h2 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                {todayTheme.name}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Challenge {challengeIndex + 1} of {todayChallenges.length}
              </p>
            </div>
          </div>
          <button onClick={() => setViewMode('overview')} className="btn-ghost">
            Exit
          </button>
        </div>
        
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Board */}
          <div className={`chessboard-container relative ${showIncorrectShake ? 'animate-shake' : ''}`}>
            <Chessboard
              position={game.fen()}
              onSquareClick={onSquareClick}
              boardOrientation={game.turn() === 'w' ? 'white' : 'black'}
              customDarkSquareStyle={{ backgroundColor: '#779556' }}
              customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
              customSquareStyles={{
                ...optionSquares,
                ...(lastMove && {
                  [lastMove.from]: { backgroundColor: 'rgba(147, 112, 219, 0.25)' },
                  [lastMove.to]: { backgroundColor: showCorrectFeedback ? 'rgba(34, 197, 94, 0.6)' : 'rgba(147, 112, 219, 0.4)' },
                }),
                ...(solved && lastMove && {
                  [lastMove.to]: { backgroundColor: 'rgba(34, 197, 94, 0.5)' },
                })
              }}
              arePiecesDraggable={!solved}
              onPieceDrop={(from, to) => handleMove(from as Square, to as Square)}
              boardWidth={480}
            />
            
            {/* Correct Move Feedback Overlay */}
            {showCorrectFeedback && !solved && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full animate-bounce-in" 
                   style={{ background: 'rgba(34, 197, 94, 0.9)', boxShadow: '0 4px 20px rgba(34, 197, 94, 0.5)' }}>
                <span className="text-white font-bold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  Correct!
                </span>
              </div>
            )}
            
            {/* Puzzle Complete Overlay */}
            {solved && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg" style={{ background: 'rgba(0,0,0,0.7)' }}>
                <div className="text-center p-6 animate-scale-in">
                  <div className="text-5xl mb-3">✨</div>
                  <h3 className="text-xl font-display font-bold mb-1" style={{ color: '#4ade80' }}>Excellent!</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {challengeIndex + 1 < todayChallenges.length ? 'Next challenge loading...' : 'All challenges complete!'}
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Info Panel */}
          <div className="space-y-4">
            <div className="card p-6">
              <h3 className="text-xl font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                {currentChallenge.title}
              </h3>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                {currentChallenge.objective}
              </p>
              
              {/* Difficulty */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Difficulty:</span>
                <span style={{ color: '#f59e0b' }}>
                  {'★'.repeat(currentChallenge.difficulty)}{'☆'.repeat(3 - currentChallenge.difficulty)}
                </span>
              </div>
              
              {/* Hint */}
              {!solved && currentChallenge.hints && (
                <div>
                  {showHint ? (
                    <div className="p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                      <p className="text-sm" style={{ color: '#f59e0b' }}>
                        💡 {currentChallenge.hints[Math.min(moveIndex, currentChallenge.hints.length - 1)]}
                      </p>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setShowHint(true)}
                      className="btn-secondary w-full"
                    >
                      Show Hint
                    </button>
                  )}
                </div>
              )}
              
              {/* Solved */}
              {solved && (
                <div className="p-4 rounded-lg" style={{ background: 'rgba(74, 222, 128, 0.1)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">✅</span>
                    <span className="font-medium" style={{ color: '#4ade80' }}>Excellent!</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {currentChallenge.explanation}
                  </p>
                </div>
              )}
            </div>
            
            {/* Progress */}
            <div className="flex gap-2">
              {todayChallenges.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-2 rounded-full"
                  style={{ 
                    background: i < challengeIndex || (i === challengeIndex && solved) 
                      ? '#4ade80' 
                      : i === challengeIndex 
                        ? todayTheme.color 
                        : 'var(--bg-tertiary)' 
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // ============================================
  // RENDER: VISUALIZATION CHALLENGE
  // ============================================
  if (viewMode === 'visualization' && todayVisualization[visIndex]) {
    const currentVis = todayVisualization[visIndex];
    
    return (
      <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">👁️</span>
            <div>
              <h2 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                Visualization Wednesday
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Challenge {visIndex + 1} of {todayVisualization.length}
              </p>
            </div>
          </div>
          <button onClick={() => setViewMode('overview')} className="btn-ghost">
            Exit
          </button>
        </div>
        
        {/* Challenge */}
        <div className="card p-8 text-center">
          <h3 className="text-xl font-medium mb-6" style={{ color: 'var(--text-primary)' }}>
            Starting from the initial position, play these moves in your mind:
          </h3>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {currentVis.moves.map((move, i) => (
              <span
                key={i}
                className="px-3 py-2 rounded-lg font-mono"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
              >
                {Math.floor(i/2) + 1}{i % 2 === 0 ? '.' : '...'} {move}
              </span>
            ))}
          </div>
          
          <h4 className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
            {currentVis.question}
          </h4>
          
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {currentVis.options.map((option, index) => {
              let buttonStyle = 'var(--bg-tertiary)';
              let textColor = 'var(--text-secondary)';
              
              if (showVisResult) {
                if (index === currentVis.correctIndex) {
                  buttonStyle = 'rgba(74, 222, 128, 0.3)';
                  textColor = '#4ade80';
                } else if (index === visAnswer) {
                  buttonStyle = 'rgba(239, 68, 68, 0.3)';
                  textColor = '#ef4444';
                }
              }
              
              return (
                <button
                  key={index}
                  onClick={() => handleVisAnswer(index)}
                  disabled={showVisResult}
                  className="p-4 rounded-xl text-lg font-medium transition-all hover:scale-105"
                  style={{ background: buttonStyle, color: textColor }}
                >
                  {option}
                </button>
              );
            })}
          </div>
          
          {showVisResult && (
            <div className="mt-6 p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>
                {currentVis.explanation}
              </p>
            </div>
          )}
        </div>
        
        {/* Progress */}
        <div className="flex gap-2">
          {todayVisualization.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-2 rounded-full"
              style={{ 
                background: i < visIndex || (i === visIndex && showVisResult) 
                  ? '#4ade80' 
                  : i === visIndex 
                    ? '#8b5cf6' 
                    : 'var(--bg-tertiary)' 
              }}
            />
          ))}
        </div>
      </div>
    );
  }
  
  // ============================================
  // RENDER: SPEED RUSH
  // ============================================
  if (viewMode === 'speed-rush') {
    const currentTactic = TACTICS_CHALLENGES[challengeIndex % TACTICS_CHALLENGES.length];
    
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔥</span>
            <div>
              <h2 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                Speed Rush Friday
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Solve as many as you can in 60 seconds!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-mono font-bold" style={{ color: rushTimer <= 10 ? '#ef4444' : 'var(--text-primary)' }}>
                {rushTimer}s
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-mono font-bold" style={{ color: '#4ade80' }}>
                {rushScore}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Score</div>
            </div>
          </div>
        </div>
        
        {/* Timer Bar */}
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
          <div 
            className="h-full rounded-full transition-all"
            style={{ 
              width: `${(rushTimer / 60) * 100}%`,
              background: rushTimer <= 10 ? '#ef4444' : '#f59e0b'
            }}
          />
        </div>
        
        {/* Board */}
        <div className="flex justify-center">
          <div className={`chessboard-container relative ${showIncorrectShake ? 'animate-shake' : ''}`}>
            <Chessboard
              position={game.fen()}
              onSquareClick={onSquareClick}
              boardOrientation={game.turn() === 'w' ? 'white' : 'black'}
              customDarkSquareStyle={{ backgroundColor: '#779556' }}
              customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
              customSquareStyles={{
                ...optionSquares,
                ...(lastMove && {
                  [lastMove.from]: { backgroundColor: 'rgba(147, 112, 219, 0.25)' },
                  [lastMove.to]: { backgroundColor: showCorrectFeedback ? 'rgba(34, 197, 94, 0.6)' : 'rgba(147, 112, 219, 0.4)' },
                }),
              }}
              arePiecesDraggable={rushActive}
              onPieceDrop={(from, to) => handleMove(from as Square, to as Square)}
              boardWidth={480}
            />
            
            {/* Correct Move Feedback */}
            {showCorrectFeedback && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full animate-bounce-in" 
                   style={{ background: 'rgba(34, 197, 94, 0.9)', boxShadow: '0 4px 20px rgba(34, 197, 94, 0.5)' }}>
                <span className="text-white font-bold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  +1
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Current puzzle hint */}
        <div className="text-center">
          <p style={{ color: 'var(--text-secondary)' }}>
            {currentTactic.objective}
          </p>
        </div>
      </div>
    );
  }
  
  // ============================================
  // RENDER: COMPLETE
  // ============================================
  if (viewMode === 'complete') {
    return (
      <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
        <div className="card p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
            Challenge Complete!
          </h2>
          <p className="text-lg mb-2" style={{ color: todayTheme.color }}>
            {todayTheme.name}
          </p>
          
          {todayTheme.type === 'speed-rush' && (
            <div className="my-6">
              <div className="text-5xl font-mono font-bold" style={{ color: '#4ade80' }}>
                {rushScore}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Puzzles Solved
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-6 my-8">
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: '#f59e0b' }}>
                🔥 {stats.currentStreak}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: '#a855f7' }}>
                {stats.totalChallenges}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Total Completed</div>
            </div>
          </div>
          
          <p className="mb-6" style={{ color: 'var(--text-tertiary)' }}>
            Come back tomorrow for a new challenge!
          </p>
          
          <div className="flex gap-4 justify-center">
            <button onClick={() => navigate('/')} className="btn-primary">
              Back to Home
            </button>
            <button onClick={() => setViewMode('overview')} className="btn-secondary">
              View Schedule
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
}

export default DailyChallengesPage;

