// ============================================
// ALL COURSES - CUTTING-EDGE COMPREHENSIVE COURSES
// 3000+ total variations with deep multi-move sequences
// ============================================

import type { Course } from './courseTypes';

// Import bulk variations (volume)
import { 
  bulkOutpostVariations,
  bulkWeakPawnVariations,
  bulkPawnStructureVariations,
  bulkOpenFileVariations,
  bulkBishopPairVariations,
  bulkCoordinationVariations,
  bulkSpaceVariations,
  bulkProphylaxisVariations,
  bulkPieceActivityVariations,
  bulkKingSafetyVariations,
} from './variations/bulkPositionalVariations';

import {
  bulkPinVariations,
  bulkForkVariations,
  bulkDiscoveredVariations,
  bulkCheckmateVariations,
  bulkDeflectionVariations,
  bulkOverloadVariations,
  bulkZwischenzugVariations,
  bulkInterferenceVariations,
} from './variations/bulkTacticsVariations';

import {
  bulkKingPawnEndgames,
  bulkRookEndgames,
  bulkMinorPieceEndgames,
  bulkQueenEndgames,
  bulkPracticalEndgames,
} from './variations/bulkEndgameVariations';

// Import DEEP variations (quality - multi-move annotated sequences)
import {
  classicalSacrifices,
  deepPinVariations,
  deepForkVariations,
  deepDiscoveredVariations,
  deepCheckmateVariations,
  deepZwischenzugVariations,
} from './variations/deepTacticalVariations';

import {
  deepOutpostVariations,
  deepWeakPawnVariations,
  deepPawnStructureVariations,
  deepCoordinationVariations,
  deepSpaceVariations,
  deepProphylaxisVariations,
} from './variations/deepPositionalVariations';

import {
  deepKingPawnVariations,
  deepRookEndgameVariations,
  deepMinorPieceVariations,
  deepQueenEndgameVariations,
  deepPracticalEndgameVariations,
} from './variations/deepEndgameVariations';

// Import extra variations for volume
import {
  extraPinVariations,
  extraForkVariations,
  extraCheckmateVariations,
  extraPositionalVariations,
  extraEndgameVariations,
} from './variations/extraVariations';

// Import NEW courses
import { attackMasterclass } from './attackMasterclass';
import { defenseArtCourse } from './defenseArtCourse';
import { calculationDojo } from './calculationDojo';

// ============================================
// POSITIONAL CHESS PATTERNS MANUAL
// Deep strategic variations + bulk patterns
// ============================================
export const positionalMasterclass: Course = {
  id: 'positional-masterclass',
  title: 'The Positional Chess Patterns Manual',
  author: 'Zen Chess Academy',
  description: 'Master positional chess through deep multi-move variations. Each pattern includes complete strategic plans with 5-12 annotated moves, alternative analysis, and visual arrows.',
  coverImage: '♟️',
  coverColor: 'from-emerald-500 to-teal-600',
  totalMinutes: 280,
  difficulty: 'intermediate',
  tags: ['positional', 'strategy', 'pawn structure', 'piece placement', 'deep analysis'],
  chapters: [
    {
      id: 'ch-outposts-deep',
      title: 'The Art of Outposts',
      subtitle: 'Complete Strategic Plans',
      description: 'Master outpost creation with deep multi-move sequences showing complete plans.',
      estimatedMinutes: 30,
      variations: [...deepOutpostVariations, ...bulkOutpostVariations],
      keyLessons: ['Create outposts through pawn exchanges', 'Transfer pieces to occupy outposts', 'Use outposts as attack launching pads'],
    },
    {
      id: 'ch-weak-pawns-deep',
      title: 'Exploiting Weak Pawns',
      subtitle: 'IQP, Doubled Pawns, Backward Pawns',
      description: 'Deep analysis of weak pawn exploitation with complete winning plans.',
      estimatedMinutes: 35,
      variations: [...deepWeakPawnVariations, ...bulkWeakPawnVariations],
      keyLessons: ['IQP gives activity but is a target', 'Blockade then attack', 'Exchange pieces to expose weaknesses'],
    },
    {
      id: 'ch-pawn-structure-deep',
      title: 'Pawn Structure Transformations',
      subtitle: 'Carlsbad, French, Sicilian, Maroczy',
      description: 'Master major pawn structures with complete strategic plans.',
      estimatedMinutes: 25,
      variations: [...deepPawnStructureVariations, ...bulkPawnStructureVariations],
      keyLessons: ['Minority attack in Carlsbad', 'Chain attacks in French', 'Space control in Maroczy Bind'],
    },
    {
      id: 'ch-open-files-deep',
      title: 'Rooks on Open Files',
      subtitle: 'Seizing and Exploiting Files',
      description: 'Complete techniques for dominating open files and penetrating.',
      estimatedMinutes: 20,
      variations: bulkOpenFileVariations,
      keyLessons: ['First to the file', 'Double rooks', '7th rank penetration'],
    },
    {
      id: 'ch-coordination-deep',
      title: 'Piece Coordination',
      subtitle: 'Rook Lifts, Queen+Knight, Batteries',
      description: 'Deep analysis of how pieces work together in attacks.',
      estimatedMinutes: 25,
      variations: [...deepCoordinationVariations, ...bulkCoordinationVariations],
      keyLessons: ['Rook lift to attack', 'Queen + Knight is best duo', 'Battery attacks'],
    },
    {
      id: 'ch-space-deep',
      title: 'Space Advantage',
      subtitle: 'Restriction and Conversion',
      description: 'Using space to restrict and then attack.',
      estimatedMinutes: 20,
      variations: [...deepSpaceVariations, ...bulkSpaceVariations],
      keyLessons: ['Space restricts pieces', 'Trade dark-squared bishops to weaken king', 'Convert space to attack'],
    },
    {
      id: 'ch-prophylaxis-deep',
      title: 'Prophylactic Thinking',
      subtitle: 'The Karpov Method',
      description: 'Think like Karpov - prevent before you attack.',
      estimatedMinutes: 20,
      variations: [...deepProphylaxisVariations, ...bulkProphylaxisVariations],
      keyLessons: ['What does opponent want?', 'Prevent then execute', 'Restriction'],
    },
    {
      id: 'ch-bishop-pair-deep',
      title: 'The Bishop Pair',
      subtitle: 'Two Bishops Domination',
      description: 'When and how to use the bishop pair advantage.',
      estimatedMinutes: 15,
      variations: bulkBishopPairVariations,
      keyLessons: ['Open positions', 'Worth ~0.5 pawns', 'Endgame power'],
    },
    {
      id: 'ch-activity-deep',
      title: 'Piece Activity & King Safety',
      subtitle: 'Dynamic Play',
      description: 'Maximizing piece activity and exploiting unsafe kings.',
      estimatedMinutes: 25,
      variations: [...bulkPieceActivityVariations, ...bulkKingSafetyVariations, ...extraPositionalVariations],
      keyLessons: ['Active pieces', 'Castle early', 'Attack the stuck king'],
    },
  ],
};

// ============================================
// TACTICAL PATTERN TRAINING - TACTICAL TRAINING
// Deep combinations + bulk patterns for repetition
// ============================================
export const woodpeckerTactics: Course = {
  id: 'woodpecker-tactics',
  title: 'Tactical Pattern Training',
  author: 'Zen Chess Academy',
  description: 'Sharpen your tactical vision with deep multi-move combinations. Each tactic shows the complete sequence with annotations, alternatives, and visual arrows.',
  coverImage: '⚔️',
  coverColor: 'from-red-500 to-orange-600',
  totalMinutes: 200,
  difficulty: 'intermediate',
  tags: ['tactics', 'combinations', 'calculation', 'deep analysis', 'sacrifices'],
  chapters: [
    {
      id: 'ch-classical-sacs',
      title: 'Classical Sacrifices',
      subtitle: 'Greek Gift, Double Bishop, Smothered Mate',
      description: 'Master the immortal sacrificial patterns with complete sequences.',
      estimatedMinutes: 35,
      variations: classicalSacrifices,
      keyLessons: ['Greek Gift requires Ng5 and Qh5', 'Double bishop destroys kingside', 'Smothered mate with queen sacrifice'],
    },
    {
      id: 'ch-pins-deep',
      title: 'Pins & Skewers Mastery',
      subtitle: 'Absolute, Relative, and X-Ray',
      description: 'Deep pin exploitation with complete winning sequences.',
      estimatedMinutes: 30,
      variations: [...deepPinVariations, ...bulkPinVariations, ...extraPinVariations],
      keyLessons: ['Pile on pinned pieces', 'Create pins through sacrifice', 'Pin + pawn break'],
    },
    {
      id: 'ch-forks-deep',
      title: 'Forks & Double Attacks',
      subtitle: 'Knight Forks, Queen Forks, Royal Forks',
      description: 'Setting up and executing devastating forks.',
      estimatedMinutes: 30,
      variations: [...deepForkVariations, ...bulkForkVariations, ...extraForkVariations],
      keyLessons: ['Force pieces to forkable squares', 'Royal fork wins queens', 'Pawn forks are decisive'],
    },
    {
      id: 'ch-discovered-deep',
      title: 'Discovered Attacks',
      subtitle: 'Single and Double Check Devastation',
      description: 'The most powerful tactical motif - discovered and double check.',
      estimatedMinutes: 25,
      variations: [...deepDiscoveredVariations, ...bulkDiscoveredVariations],
      keyLessons: ['Moving piece can do anything', 'Double check is most forcing', 'Build discovery batteries'],
    },
    {
      id: 'ch-checkmates-deep',
      title: 'Checkmate Patterns',
      subtitle: 'Boden, Anastasia, Opera, Epaulette',
      description: 'Master all classical checkmate patterns with setup moves.',
      estimatedMinutes: 35,
      variations: [...deepCheckmateVariations, ...bulkCheckmateVariations, ...extraCheckmateVariations],
      keyLessons: ['Back rank weakness', 'Smothered mate', 'Bishop + rook combinations'],
    },
    {
      id: 'ch-deflection-deep',
      title: 'Deflection & Decoy',
      subtitle: 'Removing Defenders',
      description: 'Force defenders away from their duties.',
      estimatedMinutes: 20,
      variations: bulkDeflectionVariations,
      keyLessons: ['Deflect the defender', 'Lure to bad squares', 'Sacrifice to deflect'],
    },
    {
      id: 'ch-zwischenzug-deep',
      title: 'Zwischenzug & Interference',
      subtitle: 'Intermediate Moves',
      description: 'Master the art of the in-between move.',
      estimatedMinutes: 20,
      variations: [...deepZwischenzugVariations, ...bulkZwischenzugVariations, ...bulkInterferenceVariations],
      keyLessons: ['Check before recapture', 'Bigger threat first', 'Block enemy coordination'],
    },
    {
      id: 'ch-overload-deep',
      title: 'Overloading',
      subtitle: 'Exploiting Busy Defenders',
      description: 'Find and exploit overloaded pieces.',
      estimatedMinutes: 15,
      variations: bulkOverloadVariations,
      keyLessons: ['Too many jobs = failure', 'Create multiple threats', 'Attack the weakest link'],
    },
  ],
};

// ============================================
// ESSENTIAL ENDGAME MASTERY
// Deep endgame technique with precise moves
// ============================================
export const endgameEssentials: Course = {
  id: 'endgame-essentials',
  title: "Essential Endgame Mastery",
  author: 'Zen Chess Academy',
  description: 'Master endgame technique with deep variations showing precise calculation. Each pattern demonstrates complete winning or drawing technique.',
  coverImage: '♚',
  coverColor: 'from-purple-500 to-indigo-600',
  totalMinutes: 150,
  difficulty: 'intermediate',
  tags: ['endgame', 'technique', 'king activity', 'deep analysis', 'precision'],
  chapters: [
    {
      id: 'ch-kp-deep',
      title: 'King & Pawn Mastery',
      subtitle: 'Opposition, Triangulation, Breakthrough',
      description: 'Complete K+P technique with precise move sequences.',
      estimatedMinutes: 35,
      variations: [...deepKingPawnVariations, ...bulkKingPawnEndgames],
      keyLessons: ['Opposition controls squares', 'Triangulation loses tempo', 'Breakthrough sacrifices'],
    },
    {
      id: 'ch-rook-deep',
      title: 'Rook Endgame Mastery',
      subtitle: 'Lucena, Philidor, Tarrasch Rule',
      description: 'Essential rook endgame patterns with complete technique.',
      estimatedMinutes: 35,
      variations: [...deepRookEndgameVariations, ...bulkRookEndgames],
      keyLessons: ['Lucena: build the bridge', 'Philidor: 6th rank then back rank', 'Rook behind passers'],
    },
    {
      id: 'ch-minor-deep',
      title: 'Minor Piece Endgames',
      subtitle: 'Bishop vs Knight, Two Bishops, Opposite Colors',
      description: 'When bishops beat knights and vice versa.',
      estimatedMinutes: 25,
      variations: [...deepMinorPieceVariations, ...bulkMinorPieceEndgames],
      keyLessons: ['Open = bishop better', 'Closed = knight better', 'Opposite colors often draw'],
    },
    {
      id: 'ch-queen-deep',
      title: 'Queen Endgames',
      subtitle: 'Queen vs Pawn, Perpetual Check',
      description: 'Mastering the most powerful piece in endgames.',
      estimatedMinutes: 20,
      variations: [...deepQueenEndgameVariations, ...bulkQueenEndgames],
      keyLessons: ['Queen vs pawn technique', 'Perpetual from anywhere', 'Centralization'],
    },
    {
      id: 'ch-practical-deep',
      title: 'Practical Endgames',
      subtitle: 'Converting Advantages, Fortress',
      description: 'Real-game situations and techniques.',
      estimatedMinutes: 30,
      variations: [...deepPracticalEndgameVariations, ...bulkPracticalEndgames, ...extraEndgameVariations],
      keyLessons: ['Convert extra pawn', 'Create passers', 'Recognize fortresses'],
    },
  ],
};

// ============================================
// THE STRATEGIC MIND
// Strategic thinking with imbalances
// ============================================
export const amateursMind: Course = {
  id: 'amateurs-mind',
  title: "The Strategic Mind",
  author: 'Zen Chess Academy',
  description: 'Transform your chess thinking with deep strategic analysis. Learn to identify and exploit imbalances like a master.',
  coverImage: '🧠',
  coverColor: 'from-blue-500 to-cyan-600',
  totalMinutes: 180,
  difficulty: 'intermediate',
  tags: ['strategy', 'thinking', 'imbalances', 'planning', 'deep analysis'],
  chapters: [
    {
      id: 'ch-imbalances-deep',
      title: 'Recognizing Imbalances',
      subtitle: 'Material, Space, Structure',
      description: 'Learn to identify positional differences and exploit them.',
      estimatedMinutes: 30,
      variations: [...deepOutpostVariations, ...deepWeakPawnVariations, ...bulkOutpostVariations.slice(0, 30)],
      keyLessons: ['Material imbalances', 'Pawn structure differences', 'Piece activity gaps'],
    },
    {
      id: 'ch-planning-deep',
      title: 'Making Plans',
      subtitle: 'From Position to Action',
      description: 'Create and execute plans based on imbalances.',
      estimatedMinutes: 30,
      variations: [...deepPawnStructureVariations, ...deepSpaceVariations, ...bulkPawnStructureVariations, ...bulkSpaceVariations.slice(0, 30)],
      keyLessons: ['Plans from structure', 'Short vs long term', 'Flexible planning'],
    },
    {
      id: 'ch-piece-play-deep',
      title: 'Piece Coordination',
      subtitle: 'Harmony in Action',
      description: 'Make your pieces work together as a team.',
      estimatedMinutes: 30,
      variations: [...deepCoordinationVariations, ...bulkCoordinationVariations, ...bulkPieceActivityVariations],
      keyLessons: ['Coordinated pieces are stronger', 'Rook lifts', 'Piece batteries'],
    },
    {
      id: 'ch-weakness-deep',
      title: 'Attacking Weaknesses',
      subtitle: 'Systematic Exploitation',
      description: 'Identify and systematically attack opponent weaknesses.',
      estimatedMinutes: 30,
      variations: [...deepWeakPawnVariations, ...bulkWeakPawnVariations, ...bulkOpenFileVariations],
      keyLessons: ['Weak squares', 'Weak pawns', 'Pile on weaknesses'],
    },
    {
      id: 'ch-prophylaxis-mind',
      title: 'Prophylactic Thinking',
      subtitle: 'Prevent Then Attack',
      description: 'Learn to stop opponent\'s plans before executing your own.',
      estimatedMinutes: 30,
      variations: [...deepProphylaxisVariations, ...bulkProphylaxisVariations, ...bulkKingSafetyVariations],
      keyLessons: ['What does opponent want?', 'Prevent then attack', 'Restrict counterplay'],
    },
    {
      id: 'ch-calculation-mind',
      title: 'Calculation & Evaluation',
      subtitle: 'Think Like a Master',
      description: 'Improve your calculation and position evaluation skills.',
      estimatedMinutes: 30,
      variations: [...deepForkVariations, ...deepPinVariations, ...bulkBishopPairVariations],
      keyLessons: ['Calculate forcing moves first', 'Evaluate key factors', 'Pattern recognition'],
    },
  ],
};

// ============================================
// ALL COURSES EXPORT
// ============================================
export const allCourses: Course[] = [
  positionalMasterclass,
  amateursMind,
  endgameEssentials,
  woodpeckerTactics,
  // NEW COURSES
  attackMasterclass,
  defenseArtCourse,
  calculationDojo,
];

// Export new courses individually
export { attackMasterclass, defenseArtCourse, calculationDojo };

export function getCourseById(id: string): Course | undefined {
  return allCourses.find(c => c.id === id);
}

export function getTotalVariations(): number {
  return allCourses.reduce((total, course) => {
    return total + course.chapters.reduce((chTotal, ch) => chTotal + ch.variations.length, 0);
  }, 0);
}

export default allCourses;
