// ============================================
// THE ART OF DEFENSE
// Learn to defend like Petrosian & Carlsen
// The neglected skill that separates masters from amateurs
// ============================================

import type { Course, CourseVariation } from './courseTypes';

// ============================================
// CHAPTER 1: DEFENSIVE MINDSET
// ============================================

const defensiveMindset: CourseVariation[] = [];

// ============================================
// CHAPTER 2: PROPHYLAXIS
// ============================================

const prophylaxis: CourseVariation[] = [];

// ============================================
// CHAPTER 3: DEFENSIVE RESOURCES
// ============================================

const defensiveResources: CourseVariation[] = [];

// ============================================
// CHAPTER 4: HANDLING ATTACKS
// ============================================

const handlingAttacks: CourseVariation[] = [];

// ============================================
// CHAPTER 5: PETROSIAN'S DEFENSIVE GENIUS
// ============================================

const petrosianDefense: CourseVariation[] = [];

// ============================================
// EXPORT THE COURSE
// ============================================

export const defenseArtCourse: Course = {
  id: 'defense-art',
  title: 'The Art of Defense',
  author: 'Zen Chess Academy',
  description: 'Master the neglected art of defense! Learn to defend like Petrosian and Carlsen. Understand prophylaxis, find defensive resources, and turn lost positions into draws or even wins.',
  coverImage: '🛡️',
  coverColor: 'from-blue-600 to-indigo-500',
  totalMinutes: 200,
  difficulty: 'intermediate',
  tags: ['defense', 'prophylaxis', 'fortress', 'counterattack', 'Petrosian'],
  chapters: [
    {
      id: 'ch-defense-mindset',
      title: 'The Defensive Mindset',
      subtitle: 'Staying Calm and Finding Resources',
      description: 'Learn the psychology of defense: staying calm, assessing objectively, and finding counterattacking opportunities.',
      estimatedMinutes: 35,
      variations: defensiveMindset,
      keyLessons: [
        'Don\'t panic - the best defense includes counterattack',
        'Assess objectively before defending',
        'Create your own threats while defending'
      ],
    },
    {
      id: 'ch-prophylaxis',
      title: 'Prophylaxis',
      subtitle: 'The Karpov Method',
      description: 'Learn to prevent opponent\'s ideas before they happen. Prophylactic thinking separates masters from amateurs.',
      estimatedMinutes: 40,
      variations: prophylaxis,
      keyLessons: [
        'Ask: What does my opponent want to do?',
        'Restrict opponent\'s pieces',
        'Control key squares prophylactically'
      ],
    },
    {
      id: 'ch-defensive-resources',
      title: 'Defensive Resources',
      subtitle: 'Perpetual, Fortress, Only Moves',
      description: 'Master the defensive toolkit: perpetual check, fortresses, finding the only saving move.',
      estimatedMinutes: 40,
      variations: defensiveResources,
      keyLessons: [
        'Always check for perpetual before resigning',
        'Learn fortress patterns to draw lost positions',
        'In critical positions, one move often saves'
      ],
    },
    {
      id: 'ch-handling-attacks',
      title: 'Handling Attacks',
      subtitle: 'Pawn Storms, Piece Attacks, Sacrifices',
      description: 'Learn to handle all types of attacks: pawn storms, piece pressure, and sacrificial assaults.',
      estimatedMinutes: 40,
      variations: handlingAttacks,
      keyLessons: [
        'Counter flank attacks with central play',
        'Challenge aggressive pieces',
        'Calculate whether to accept sacrifices'
      ],
    },
    {
      id: 'ch-petrosian',
      title: 'Petrosian\'s Defensive Genius',
      subtitle: 'Exchange Sacrifices and Restriction',
      description: 'Study the defensive techniques of Tigran Petrosian, the greatest defensive player in history.',
      estimatedMinutes: 45,
      variations: petrosianDefense,
      keyLessons: [
        'Exchange sacrifices can be defensive',
        'Restriction makes opponent helpless',
        'Prophylaxis + restriction = victory'
      ],
    }
],
};

export default defenseArtCourse;












