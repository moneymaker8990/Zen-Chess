import { useState, useEffect, useRef } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============================================
// TUTORIAL STORE - Track which tutorials seen
// ============================================

interface TutorialState {
  seenTutorials: Record<string, boolean>;
  markSeen: (id: string) => void;
  resetTutorials: () => void;
}

export const useTutorialStore = create<TutorialState>()(
  persist(
    (set) => ({
      seenTutorials: {},
      markSeen: (id) => set((state) => ({
        seenTutorials: { ...state.seenTutorials, [id]: true }
      })),
      resetTutorials: () => set({ seenTutorials: {} }),
    }),
    { name: 'zen-chess-tutorials' }
  )
);

// ============================================
// TUTORIAL CONTENT
// ============================================

export interface TutorialStep {
  title: string;
  content: string;
  tip?: string;
}

export interface TutorialData {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  steps: TutorialStep[];
  connections: { page: string; description: string }[];
  quickStart: string[];
}

export const tutorials: Record<string, TutorialData> = {
  home: {
    id: 'home',
    title: 'Welcome to Zen Chess',
    subtitle: 'Your integrated chess training system',
    icon: '☯',
    steps: [
      {
        title: 'This is Your Training Hub',
        content: 'Unlike Chess.com where everything is scattered, here everything connects. Your daily lesson, your mistakes, your training—all working together toward your improvement.',
        tip: 'Start each session here to see your progress and what needs attention.',
      },
      {
        title: 'The Daily System',
        content: 'Each day brings spiritual wisdom paired with chess training. Complete daily lessons to build both mental clarity and chess skill over 365 days.',
        tip: 'Consistency matters more than intensity. 15 minutes daily beats 2 hours weekly.',
      },
      {
        title: 'Everything Is Connected',
        content: 'When you make a mistake in a game, it goes to your Mistake Library. That generates Position Sparring drills. Your Notes capture insights. The Study Dashboard tracks it all.',
      },
    ],
    connections: [
      { page: 'Daily', description: 'Start your day with spiritual + chess training' },
      { page: 'Study', description: 'Track your training sessions and progress' },
      { page: 'Notes', description: 'Your personal chess knowledge base' },
    ],
    quickStart: [
      'Go to Daily to start today\'s lesson',
      'Play a game in Play mode',
      'Review your game and add mistakes to your library',
      'Practice those positions in Sparring mode',
    ],
  },

  beginner: {
    id: 'beginner',
    title: 'Welcome, Future Chess Master!',
    subtitle: 'Your chess journey starts here',
    icon: '🌱',
    steps: [
      {
        title: 'You\'re in the Right Place',
        content: 'This page is designed specifically for beginners. No jargon, no pressure—just a gentle introduction to the wonderful game of chess.',
        tip: 'Take your time! There\'s no rush to learn everything at once.',
      },
      {
        title: 'What is Chess Notation?',
        content: 'You might see things like "e4" or "Nf3" in chess. Don\'t worry! These are just ways to name squares (e4 = column e, row 4) and pieces (N = Knight). You\'ll learn naturally.',
        tip: 'The columns are letters a-h (left to right) and rows are numbers 1-8 (bottom to top).',
      },
      {
        title: 'Start with the Journey',
        content: 'Click "Start the Journey" to begin our structured lessons. Each lesson teaches one concept with visual examples. Start with "The Chessboard" and work your way up!',
      },
    ],
    connections: [
      { page: 'Journey', description: 'Step-by-step lessons from the basics' },
      { page: 'Play', description: 'Practice against a computer at your level' },
      { page: 'Puzzles', description: 'Fun tactical challenges to sharpen your skills' },
    ],
    quickStart: [
      'Read through the basics on this page',
      'Go to Journey to start your first lesson',
      'Try a game against an easy AI when ready',
      'Don\'t worry about winning—focus on learning!',
    ],
  },

  journey: {
    id: 'journey',
    title: 'Your Learning Journey',
    subtitle: 'Structured lessons from beginner to master',
    icon: '🎓',
    steps: [
      {
        title: 'Learn Step by Step',
        content: 'This is your curriculum—a structured path through chess mastery. Start with "The Basics" and progress through increasingly advanced topics.',
        tip: 'Complete lessons in order. Each builds on the previous ones.',
      },
      {
        title: 'Unlock New Sections',
        content: 'As you earn XP from puzzles and lessons, you\'ll unlock new sections. This ensures you have the foundation before tackling advanced material.',
        tip: 'Solve puzzles and complete lessons to earn XP faster.',
      },
      {
        title: 'Interactive Lessons',
        content: 'Each lesson includes chessboard positions to study. You\'ll see highlighted squares and arrows showing key ideas. Read, observe, understand.',
      },
    ],
    connections: [
      { page: 'Beginner', description: 'Quick intro if you\'re brand new to chess' },
      { page: 'Puzzles', description: 'Practice what you learn with tactical puzzles' },
      { page: 'Play', description: 'Apply your knowledge in real games' },
    ],
    quickStart: [
      'Click on "The Basics" section to expand it',
      'Start with the first lesson: "The Chessboard"',
      'Complete all steps in each lesson',
      'Move to the next lesson when ready',
    ],
  },

  courses: {
    id: 'courses',
    title: 'Zen Chess Courses',
    subtitle: 'Deep-dive training modules',
    icon: '📖',
    steps: [
      {
        title: 'Chessable-Style Learning',
        content: 'Our courses use spaced repetition—the scientifically proven method for long-term retention. Learn a concept, then review it at optimal intervals.',
        tip: 'Courses are more in-depth than Journey lessons. Great for focused improvement.',
      },
      {
        title: 'Choose Your Focus',
        content: 'We have courses on tactics, positional play, endgames, and more. Pick the area you want to improve and dive deep.',
        tip: 'One course at a time! Focus leads to faster improvement.',
      },
      {
        title: 'Track Your Progress',
        content: 'Each course tracks which chapters you\'ve completed and schedules reviews. Come back daily to reinforce what you\'ve learned.',
      },
    ],
    connections: [
      { page: 'Spaced Repetition', description: 'Review cards scheduled for today' },
      { page: 'Journey', description: 'Foundational lessons if courses feel advanced' },
      { page: 'Puzzles', description: 'Apply course concepts in puzzle form' },
    ],
    quickStart: [
      'Browse available courses',
      'Pick one that matches your goals',
      'Complete at least one chapter',
      'Check back for review cards',
    ],
  },

  'flash-training': {
    id: 'flash-training',
    title: 'Flash Training',
    subtitle: 'Build lightning-fast pattern recognition',
    icon: '⚡',
    steps: [
      {
        title: 'Speed = Intuition',
        content: 'Flash training shows you positions briefly and asks you to identify the best move. This builds the instant pattern recognition that grandmasters have.',
        tip: 'Don\'t think too hard—trust your instincts! Speed training is about rapid pattern matching.',
      },
      {
        title: 'Train Your Eyes',
        content: 'The more patterns you see, the faster you recognize them in real games. This is how you develop "chess vision."',
        tip: 'Do 5-10 minutes of flash training daily for best results.',
      },
    ],
    connections: [
      { page: 'Puzzles', description: 'Standard puzzles for deeper calculation' },
      { page: 'Intuition', description: 'Another form of pattern training' },
      { page: 'Daily Challenges', description: 'Test your skills with daily puzzles' },
    ],
    quickStart: [
      'Choose a theme or random positions',
      'Try to identify the best move quickly',
      'Review positions you got wrong',
      'Aim to improve your speed over time',
    ],
  },

  'thinking-system': {
    id: 'thinking-system',
    title: 'The Thinking System',
    subtitle: 'A structured approach to every move',
    icon: '🧠',
    steps: [
      {
        title: 'Why You Need a System',
        content: 'Amateurs think randomly. Masters follow a system. Our 5-step thinking framework ensures you consider all important factors before moving.',
        tip: 'At first, the system feels slow. With practice, it becomes automatic.',
      },
      {
        title: 'The 5 Steps',
        content: 'Threats, Checks, Captures, Imbalances, Candidate Moves. Every position, every time. This discipline prevents blunders and finds opportunities.',
        tip: 'Print out the checklist and use it during training games until it\'s memorized.',
      },
    ],
    connections: [
      { page: 'Play', description: 'Apply the system in real games' },
      { page: 'Puzzles', description: 'Practice systematic thinking on tactics' },
      { page: 'Mistakes', description: 'See where your thinking went wrong' },
    ],
    quickStart: [
      'Read through the 5-step system',
      'Practice on a few simple positions',
      'Play a slow game using the system',
      'Review to see if you missed any steps',
    ],
  },

  'daily-challenges': {
    id: 'daily-challenges',
    title: 'Daily Challenges',
    subtitle: 'Fresh puzzles every day',
    icon: '📅',
    steps: [
      {
        title: 'New Every Day',
        content: 'Each day brings new themed puzzles—endgames on Monday, tactics on Tuesday, visualization on Wednesday, and more!',
        tip: 'Complete daily challenges to maintain your streak!',
      },
      {
        title: 'Compete on Leaderboard',
        content: 'See how you rank against other players. Solve faster and more accurately to climb the leaderboard.',
        tip: 'Accuracy matters more than speed for the leaderboard.',
      },
    ],
    connections: [
      { page: 'Puzzles', description: 'Unlimited practice puzzles' },
      { page: 'Flash Training', description: 'Speed-focused training' },
      { page: 'Home', description: 'See your streak on the dashboard' },
    ],
    quickStart: [
      'Check today\'s theme',
      'Complete all daily puzzles',
      'See your rank on the leaderboard',
      'Come back tomorrow for new challenges!',
    ],
  },

  study: {
    id: 'study',
    title: 'Study Dashboard',
    subtitle: 'Your training log & performance tracker',
    icon: '📊',
    steps: [
      {
        title: 'Track Your Training Like a Pro Athlete',
        content: 'This is your training log. Every session you start here gets recorded—games played, puzzles solved, notes taken, time spent. Over time, you\'ll see patterns in your improvement.',
        tip: 'Start a Study Session before you begin training to track everything.',
      },
      {
        title: 'Mental Performance Matters',
        content: 'We track your mood, focus, and tilt rate. You\'ll discover insights like "You blunder more after your first loss" or "Your accuracy drops after 5 games."',
        tip: 'Log your mood honestly—self-awareness is the first step to improvement.',
      },
      {
        title: 'Focus Areas',
        content: 'Your weaknesses are automatically detected and shown here. These aren\'t just stats—they\'re actionable. Each weakness has drills to fix it.',
      },
    ],
    connections: [
      { page: 'Notes', description: 'Notes you create during sessions appear here' },
      { page: 'Mistakes', description: 'Weaknesses are detected from your mistake patterns' },
      { page: 'Sparring', description: 'Drills are created from your weaknesses' },
    ],
    quickStart: [
      'Click "Start Study Session" before training',
      'Do your training (games, puzzles, review)',
      'End session with notes about what you learned',
      'Check your mental performance trends weekly',
    ],
  },

  notes: {
    id: 'notes',
    title: 'Master Notebook',
    subtitle: 'Your personal chess bible',
    icon: '📝',
    steps: [
      {
        title: 'Chess.com Doesn\'t Have This',
        content: 'Every insight, pattern, and lesson you learn can be captured here. Unlike scattered game reviews, your notes are searchable, categorized, and permanent.',
        tip: 'The best players keep journals. This is your digital chess journal.',
      },
      {
        title: 'Rich Organization',
        content: 'Notes are categorized (Opening, Tactics, Psychology, etc.), tagged, and rated by importance. You can attach board positions, link related notes, and flag items for review.',
        tip: 'Use the "Needs Review" flag for insights you want to revisit.',
      },
      {
        title: 'From Games to Wisdom',
        content: 'When reviewing games, add key moments as notes. Over time, you\'ll build a personal database of patterns, mistakes, and lessons unique to YOUR chess journey.',
      },
    ],
    connections: [
      { page: 'Study', description: 'Notes created count toward your session stats' },
      { page: 'Mistakes', description: 'Mistakes can be linked to notes for deeper analysis' },
      { page: 'Games', description: 'Instructive game insights can become notes' },
    ],
    quickStart: [
      'Create your first note about something you learned today',
      'Add tags to make it searchable later',
      'Attach a position if relevant',
      'Review flagged notes weekly',
    ],
  },

  mistakes: {
    id: 'mistakes',
    title: 'Mistake Library',
    subtitle: 'Your personal weakness map',
    icon: '❌',
    steps: [
      {
        title: 'This Is Where Growth Happens',
        content: 'Every mistake is a lesson. Instead of letting them disappear after a game, we save them, categorize them, and turn them into training material.',
        tip: 'The goal isn\'t zero mistakes—it\'s understanding WHY you make them.',
      },
      {
        title: 'Root Cause Analysis',
        content: 'Each mistake gets tagged with its root cause: Was it calculation? Time pressure? Tunnel vision? Tilt? Over time, you\'ll see YOUR specific patterns.',
        tip: 'Be honest about the cause. "I was tilted" is more useful than "bad luck."',
      },
      {
        title: 'From Mistakes to Mastery',
        content: 'Mistakes become Position Sparring drills. Practice the exact position until you get it right. That\'s how real improvement happens—targeted repetition.',
      },
    ],
    connections: [
      { page: 'Sparring', description: 'Create drills from any mistake position' },
      { page: 'Study', description: 'Mistake patterns inform your weaknesses' },
      { page: 'Notes', description: 'Add deeper analysis as notes' },
    ],
    quickStart: [
      'After a game, review with engine analysis',
      'Add significant mistakes to your library',
      'Tag the root cause (calculation, time, tilt, etc.)',
      'Create a Sparring drill for positions you got wrong',
    ],
  },

  sparring: {
    id: 'sparring',
    title: 'Position Sparring',
    subtitle: 'Targeted practice from YOUR positions',
    icon: '⚔️',
    steps: [
      {
        title: 'This Is How You Actually Improve',
        content: 'Chess.com gives you random bots. We let you practice YOUR specific problem positions over and over until they\'re automatic. That\'s real training.',
        tip: 'Repetition builds intuition. Play each position at least 10 times.',
      },
      {
        title: 'From Weaknesses to Strengths',
        content: 'Positions come from your Mistake Library, endgame gaps, opening troubles, or any FEN you add. Set the engine strength, objective (win/draw/hold), and train.',
        tip: 'Start with engine strength 5, then increase as you master the position.',
      },
      {
        title: 'Track Your Progress',
        content: 'We track your success rate on each position. Struggling positions stay in rotation. Mastered positions can be reviewed less often.',
      },
    ],
    connections: [
      { page: 'Mistakes', description: 'Turn any mistake into a sparring position' },
      { page: 'Study', description: 'Sparring sessions count toward your training log' },
      { page: 'Openings', description: 'Practice opening positions you struggle with' },
    ],
    quickStart: [
      'Add a position from your Mistake Library or paste a FEN',
      'Set your color, objective, and engine strength',
      'Play the position repeatedly',
      'Increase difficulty as you improve',
    ],
  },

  train: {
    id: 'train',
    title: 'Tactical Training',
    subtitle: 'Pattern recognition drills',
    icon: '🎯',
    steps: [
      {
        title: 'See Patterns Faster',
        content: 'Tactics aren\'t about calculation—they\'re about pattern recognition. The more patterns you see, the faster you spot them in games.',
        tip: 'Speed matters. Set time limits to train quick pattern recognition.',
      },
      {
        title: 'Targeted by Theme',
        content: 'Practice specific themes: forks, pins, back rank mates. Focus on your weak patterns (shown in your Mistake Library) until they become strengths.',
      },
      {
        title: 'Track Your Patterns',
        content: 'We measure your solve time and success rate per pattern type. Over time, you\'ll see which patterns are instinctive and which need more work.',
      },
    ],
    connections: [
      { page: 'Mistakes', description: 'Your tactical blind spots become drills here' },
      { page: 'Study', description: 'Puzzle stats feed into your performance metrics' },
    ],
    quickStart: [
      'Choose a tactical theme or random puzzles',
      'Set a difficulty level',
      'Solve puzzles, tracking your time',
      'Focus extra time on patterns you miss often',
    ],
  },

  openings: {
    id: 'openings',
    title: 'Opening Trainer',
    subtitle: 'Build your repertoire with spaced repetition',
    icon: '📚',
    steps: [
      {
        title: 'Not Just Memorization',
        content: 'We have 30 essential opening lines that take you into the middlegame. But more importantly, you\'ll understand WHY each move is played.',
        tip: 'Understanding > Memorization. Know the ideas, not just the moves.',
      },
      {
        title: 'Play Both Sides',
        content: 'Practice as White or Black. The opponent\'s moves play automatically so you can focus on your responses.',
      },
      {
        title: 'Build Personal Repertoire',
        content: 'Save lines you want to master. Our spaced repetition system (like Anki) will quiz you at optimal intervals for long-term memory.',
      },
    ],
    connections: [
      { page: 'Sparring', description: 'Practice opening positions you struggle with' },
      { page: 'Games', description: 'See these openings in master games' },
      { page: 'Notes', description: 'Save key ideas and plans as notes' },
    ],
    quickStart: [
      'Browse openings by category (1.e4, 1.d4, etc.)',
      'Choose an opening and play through it as White or Black',
      'Use the hint feature when stuck',
      'Add key lines to your personal repertoire for review',
    ],
  },

  games: {
    id: 'games',
    title: 'Instructive Games',
    subtitle: '365 masterpieces from chess history',
    icon: '♔',
    steps: [
      {
        title: 'Learn From the Legends',
        content: 'Each day of the curriculum has a matching instructive game. These aren\'t random—they\'re carefully chosen to teach specific concepts.',
        tip: 'Watch the game first, THEN read the annotations. See if you can guess the ideas.',
      },
      {
        title: 'Deep Annotations',
        content: 'Every move has commentary explaining not just WHAT happened but WHY. Key moments are highlighted. You\'ll understand the thinking behind master play.',
      },
      {
        title: 'Historical Context',
        content: 'Chess has evolved. Understanding the era of a game helps you appreciate the ideas. Romantic, Classical, Soviet, Modern—each era has lessons.',
      },
    ],
    connections: [
      { page: 'Daily', description: 'Each day\'s game matches the daily lesson theme' },
      { page: 'Notes', description: 'Save insights from games to your notebook' },
      { page: 'Openings', description: 'See how masters handle these openings' },
    ],
    quickStart: [
      'Find today\'s game (matches your current day)',
      'Use keyboard arrows or buttons to step through',
      'Read the "Why This Game Matters" section',
      'Add key insights to your Notes',
    ],
  },

  play: {
    id: 'play',
    title: 'Play Chess',
    subtitle: 'Play against the engine with mindful awareness',
    icon: '♟',
    steps: [
      {
        title: 'Play With Intention',
        content: 'This isn\'t just a chessboard—it\'s integrated with your training. Games you play here can be reviewed, mistakes extracted, and weaknesses identified.',
        tip: 'Play fewer games, but review them more deeply.',
      },
      {
        title: 'Multiple Modes',
        content: 'Free play, analysis, vs. engine, or Calm Play mode. Choose based on your goal: practice, analysis, or mindful play.',
      },
      {
        title: 'After the Game',
        content: 'Review your game, add mistakes to your library, create sparring positions, and take notes. The game isn\'t over when it ends—learning begins then.',
      },
    ],
    connections: [
      { page: 'Mistakes', description: 'Add blunders to your Mistake Library' },
      { page: 'Sparring', description: 'Create drills from problem positions' },
      { page: 'Study', description: 'Games count toward your session stats' },
    ],
    quickStart: [
      'Choose engine strength for your level',
      'Play mindfully—pause before each move',
      'After the game, review with engine analysis',
      'Add 2-3 key mistakes to your library',
    ],
  },

  day: {
    id: 'day',
    title: 'Daily Lesson',
    subtitle: 'Spiritual wisdom meets chess mastery',
    icon: '📖',
    steps: [
      {
        title: 'The Heart of the App',
        content: 'Each of 365 days combines spiritual teachings (Tao, Vijnana, Stoicism, Zen) with practical chess training. Mind and board develop together.',
        tip: 'Don\'t rush. The daily lesson is meant to be absorbed, not consumed.',
      },
      {
        title: 'Three Parts',
        content: 'Each day has Wisdom (sacred texts + reflection), Chess (concepts + application), and Practice (meditation + exercise). Complete all three.',
      },
      {
        title: 'Chess as Meditation',
        content: 'The daily chess exercise isn\'t just practice—it\'s an opportunity to apply the day\'s spiritual teaching. Notice your mind while you play.',
      },
    ],
    connections: [
      { page: 'Games', description: 'Each day has a matching instructive game' },
      { page: 'Notes', description: 'Capture your reflections and insights' },
      { page: 'Study', description: 'Daily completion adds to your streak' },
    ],
    quickStart: [
      'Read the sacred texts slowly, contemplatively',
      'Complete the meditation exercise',
      'Do the chess practice with the day\'s theme in mind',
      'Mark the day complete when finished',
    ],
  },
};

// ============================================
// TUTORIAL MODAL COMPONENT
// ============================================

interface TutorialModalProps {
  tutorialId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function TutorialModal({ tutorialId, isOpen, onClose }: TutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { markSeen } = useTutorialStore();
  const tutorial = tutorials[tutorialId];

  if (!isOpen || !tutorial) return null;

  const handleClose = () => {
    markSeen(tutorialId);
    onClose();
  };

  const isLastStep = currentStep === tutorial.steps.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm animate-fade-in" style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)' }}>
      <div className="card p-8 max-w-xl w-full mx-4 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{tutorial.icon}</span>
          <div>
            <h2 className="text-xl font-serif" style={{ color: 'var(--text-primary)' }}>{tutorial.title}</h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{tutorial.subtitle}</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex gap-2 mb-6">
          {tutorial.steps.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full"
              style={{ backgroundColor: i <= currentStep ? 'var(--accent-gold)' : 'var(--bg-tertiary)' }}
            />
          ))}
        </div>

        {/* Current step */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            {tutorial.steps[currentStep].title}
          </h3>
          <p className="leading-relaxed mb-4 text-base" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            {tutorial.steps[currentStep].content}
          </p>
          {tutorial.steps[currentStep].tip && (
            <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(251, 191, 36, 0.15)', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
              <p className="text-sm" style={{ color: 'var(--accent-gold)', lineHeight: '1.6' }}>
                💡 <span className="font-semibold">Tip:</span> {tutorial.steps[currentStep].tip}
              </p>
            </div>
          )}
        </div>

        {/* Show connections on last step */}
        {isLastStep && (
          <>
            <div className="mb-6">
              <h4 className="text-sm uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                How This Connects
              </h4>
              <div className="space-y-2">
                {tutorial.connections.map((conn, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span style={{ color: 'var(--accent-gold)' }}>→</span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      <strong>{conn.page}:</strong> {conn.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                Quick Start
              </h4>
              <ol className="space-y-3">
                {tutorial.quickStart.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    <span className="font-mono font-bold" style={{ color: 'var(--accent-gold)' }}>{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={handleClose}
            className="text-sm transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            Skip tutorial
          </button>
          
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="btn-secondary"
              >
                Back
              </button>
            )}
            {!isLastStep ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="btn-primary"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="btn-primary"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// TUTORIAL BUTTON COMPONENT
// ============================================

interface TutorialButtonProps {
  tutorialId: string;
}

export function TutorialButton({ tutorialId }: TutorialButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm flex items-center gap-1 transition-colors"
        style={{ color: isHovered ? 'var(--accent-gold)' : 'var(--text-muted)' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="How to use this page"
      >
        <span>?</span>
        <span className="hidden sm:inline">Tutorial</span>
      </button>
      <TutorialModal
        tutorialId={tutorialId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

// ============================================
// AUTO-SHOW TUTORIAL HOOK
// ============================================

export function useAutoTutorial(tutorialId: string) {
  const [showTutorial, setShowTutorial] = useState(false);
  const { seenTutorials, markSeen } = useTutorialStore();
  // Track if we've already attempted to show this tutorial in this session
  const hasChecked = useRef(false);
  // Track if the tutorial has been closed this session (prevents re-showing)
  const closedThisSession = useRef(false);

  useEffect(() => {
    // Only check once per mount, and only if not already closed this session
    if (hasChecked.current || closedThisSession.current) {
      return;
    }
    hasChecked.current = true;

    // Show tutorial if not seen before
    if (!seenTutorials[tutorialId]) {
      // Small delay to let page render first
      const timer = setTimeout(() => {
        // Double-check it wasn't closed while waiting
        if (!closedThisSession.current) {
          setShowTutorial(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [tutorialId, seenTutorials]);

  const closeTutorial = () => {
    closedThisSession.current = true;
    setShowTutorial(false);
    markSeen(tutorialId);
  };

  return { showTutorial, closeTutorial };
}

// ============================================
// PAGE HEADER WITH TUTORIAL
// ============================================

interface PageHeaderProps {
  tutorialId: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageHeader({ tutorialId, title, subtitle, children }: PageHeaderProps) {
  const { showTutorial, closeTutorial } = useAutoTutorial(tutorialId);

  return (
    <>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-serif" style={{ color: 'var(--text-primary)' }}>{title}</h1>
            <TutorialButton tutorialId={tutorialId} />
          </div>
          {subtitle && (
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
          )}
        </div>
        {children}
      </div>

      <TutorialModal
        tutorialId={tutorialId}
        isOpen={showTutorial}
        onClose={closeTutorial}
      />
    </>
  );
}

// ============================================
// INTEGRATION HINT COMPONENT
// ============================================

interface IntegrationHintProps {
  from: string;
  to: string;
  action: string;
}

export function IntegrationHint({ from, to, action }: IntegrationHintProps) {
  return (
    <div className="rounded-lg p-3 flex items-start gap-3" style={{ backgroundColor: 'rgba(251, 191, 36, 0.05)', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
      <span style={{ color: 'var(--accent-gold)' }}>🔗</span>
      <div className="text-sm">
        <p className="font-medium" style={{ color: 'var(--accent-gold)' }}>Integration Tip</p>
        <p style={{ color: 'var(--text-tertiary)' }}>
          {action} <span style={{ color: 'var(--text-secondary)' }}>{from}</span> → <span style={{ color: 'var(--text-secondary)' }}>{to}</span>
        </p>
      </div>
    </div>
  );
}

export default TutorialModal;







