// ============================================
// THE ATTACK MASTERCLASS
// Learn to crush your opponents like Tal & Alekhine
// Deep attacking variations with sacrifices and combinations
// ============================================

import type { Course, CourseVariation } from './courseTypes';

// ============================================
// CHAPTER 1: ATTACKING PREREQUISITES
// ============================================

const attackPrerequisites: CourseVariation[] = [];

// ============================================
// CHAPTER 2: CLASSIC SACRIFICES
// ============================================

const classicSacrifices: CourseVariation[] = [];

// ============================================
// CHAPTER 3: ATTACKING PATTERNS
// ============================================

const attackingPatterns: CourseVariation[] = [];

// ============================================
// CHAPTER 4: THE KING HUNT
// ============================================

const kingHunt: CourseVariation[] = [];

// ============================================
// CHAPTER 5: PRACTICAL ATTACKS
// ============================================

const practicalAttacks: CourseVariation[] = [];

// ============================================
// EXPORT THE COURSE
// ============================================

export const attackMasterclass: Course = {
  id: 'attack-masterclass',
  title: 'The Attack Masterclass',
  author: 'Zen Chess Academy',
  description: 'Learn to attack like Tal and Alekhine! Master sacrifices, king hunts, and crushing attacks through deep multi-move variations. Every great player must know how to attack.',
  coverImage: '⚔️',
  coverColor: 'from-red-600 to-orange-500',
  totalMinutes: 240,
  difficulty: 'intermediate',
  tags: ['attack', 'tactics', 'sacrifices', 'king hunt', 'combinations'],
  chapters: [
    {
      id: 'ch-attack-prereq',
      title: 'When to Attack',
      subtitle: 'Prerequisites for a Successful Attack',
      description: 'Learn the conditions that justify an attack: development lead, unsafe king, and damaged pawn shields.',
      estimatedMinutes: 35,
      variations: attackPrerequisites,
      keyLessons: [
        'Attack when you have 2+ more pieces developed',
        'Open the center against an uncastled king',
        'Exploit weakened pawn shields (h6, g6 moves)'
      ],
    },
    {
      id: 'ch-classic-sacs',
      title: 'Classic Sacrifices',
      subtitle: 'Greek Gift, Double Bishop, Fried Liver',
      description: 'Master the immortal sacrificial patterns that have won millions of games.',
      estimatedMinutes: 45,
      variations: classicSacrifices,
      keyLessons: [
        'Greek Gift: Bxh7+ requires Ng5+ and Qh5 follow-up',
        'Double Bishop Sac destroys the entire pawn shield',
        'Knight sacrifices on f7 drag the king out'
      ],
    },
    {
      id: 'ch-attack-patterns',
      title: 'Attacking Patterns',
      subtitle: 'Batteries, Rook Lifts, Piece Coordination',
      description: 'Learn the building blocks of every successful attack.',
      estimatedMinutes: 40,
      variations: attackingPatterns,
      keyLessons: [
        'Queen-Bishop battery on b1-h7 diagonal',
        'Rook lifts bring h1 rook to the attack',
        'All pieces must participate in the attack'
      ],
    },
    {
      id: 'ch-king-hunt',
      title: 'The King Hunt',
      subtitle: 'Chasing the King Across the Board',
      description: 'Study the most spectacular king hunts in chess history.',
      estimatedMinutes: 50,
      variations: kingHunt,
      keyLessons: [
        'Once the king leaves safety, keep checking',
        'Every check must lead somewhere',
        'Material doesn\'t matter in a successful hunt'
      ],
    },
    {
      id: 'ch-practical-attacks',
      title: 'Practical Attacking',
      subtitle: 'Real-Game Attack Techniques',
      description: 'Attacks you can use in your own games: minority attacks, pawn storms, exchange sacrifices.',
      estimatedMinutes: 50,
      variations: practicalAttacks,
      keyLessons: [
        'Minority attacks create permanent weaknesses',
        'h-file pawn storms open lines to the king',
        'Exchange sacrifices can fuel devastating attacks'
      ],
    }
],
};

export default attackMasterclass;




