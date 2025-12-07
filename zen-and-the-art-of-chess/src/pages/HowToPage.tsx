import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { BackButton } from '@/components/BackButton';

// ============================================
// HOW TO PAGE - Complete App Guide
// ============================================

interface GuideSection {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  items: {
    title: string;
    description: string;
    tip?: string;
    link?: string;
  }[];
}

const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: '🚀',
    color: '#a855f7',
    description: 'Begin your chess journey with these essentials',
    items: [
      {
        title: 'Home Dashboard',
        description: 'Your home screen shows your daily progress, streak, and quick access to all features. Start your day here to see what to focus on.',
        tip: 'Tap the Daily Challenge card for a fresh puzzle every day!',
        link: '/',
      },
      {
        title: 'Your Journey',
        description: 'The Journey page tracks your learning path through all of chess fundamentals. Progress through lessons in order for the best results.',
        tip: 'Complete lessons in order - each builds on previous concepts.',
        link: '/journey',
      },
      {
        title: 'Sign In Benefits',
        description: 'Create an account to sync your progress across devices, track your streak history, and access premium features.',
        link: '/auth',
      },
    ],
  },
  {
    id: 'learn',
    title: 'Learning & Courses',
    icon: '📚',
    color: '#3b82f6',
    description: 'Structured learning paths for all skill levels',
    items: [
      {
        title: 'Courses Library',
        description: 'Over 2,400 interactive lessons covering everything from basic rules to advanced strategy. Filter by topic, difficulty, or browse curated collections.',
        tip: 'Start with "The Basics" if you\'re new to chess.',
        link: '/courses',
      },
      {
        title: 'Interactive Lessons',
        description: 'Each lesson shows you positions on the board with step-by-step explanations. Use the Next/Previous buttons or swipe to navigate through steps.',
        tip: 'Pay attention to highlighted squares and arrows - they show key ideas.',
      },
      {
        title: 'Thinking System',
        description: 'Learn a systematic approach to chess thinking. This framework helps you evaluate positions and find the best moves consistently.',
        tip: 'Practice this system in every game until it becomes automatic.',
        link: '/thinking-system',
      },
      {
        title: 'Patterns Manual',
        description: 'Study tactical patterns that appear in real games. Recognition is the key to improvement - see it once, spot it forever.',
        link: '/patterns',
      },
    ],
  },
  {
    id: 'training',
    title: 'Training & Practice',
    icon: '🎯',
    color: '#22c55e',
    description: 'Sharpen your skills with interactive exercises',
    items: [
      {
        title: 'Puzzle Training',
        description: 'Solve tactical puzzles to improve pattern recognition. Puzzles adapt to your skill level. Tap a piece to see legal moves, then tap the destination.',
        tip: 'Don\'t rush - take time to calculate all variations.',
        link: '/train',
      },
      {
        title: 'Flash Training',
        description: 'Speed-based training for rapid pattern recognition. You have limited time per puzzle - this builds intuition.',
        tip: 'Trust your first instinct in flash mode.',
        link: '/flash-training',
      },
      {
        title: 'Spaced Repetition',
        description: 'Review positions you\'ve struggled with. The app remembers what you find difficult and quizzes you at optimal intervals.',
        tip: 'Do your daily reviews for maximum retention.',
        link: '/spaced-repetition',
      },
      {
        title: 'Daily Challenges',
        description: 'Fresh challenges every day covering different aspects of chess. Complete all three for streak bonuses.',
        tip: 'The difficulty increases through the week - weekend challenges are harder!',
        link: '/daily-challenges',
      },
    ],
  },
  {
    id: 'play',
    title: 'Playing Chess',
    icon: '♟️',
    color: '#f59e0b',
    description: 'Play against the computer or friends',
    items: [
      {
        title: 'Play vs Computer',
        description: 'Challenge the AI at various difficulty levels from beginner-friendly to grandmaster strength. Great for practice and experimentation.',
        tip: 'Start at a lower level and increase as you improve.',
        link: '/play',
      },
      {
        title: 'Play a Friend',
        description: 'Share a game link with friends to play online. Real-time gameplay with chat support.',
        link: '/play/friend',
      },
      {
        title: 'Calm Play Mode',
        description: 'A mindful playing experience with breathing exercises and tilt tracking. Perfect for staying composed in competitive games.',
        tip: 'Use this mode when you feel frustrated - it really helps!',
        link: '/calm-play',
      },
      {
        title: 'Legends & Greats',
        description: 'Play through famous games from chess history. Step into the shoes of Fischer, Kasparov, and other legends.',
        tip: 'Try to guess the master\'s moves before revealing them.',
        link: '/greats',
      },
    ],
  },
  {
    id: 'openings',
    title: 'Opening Study',
    icon: '📖',
    color: '#ec4899',
    description: 'Learn and practice chess openings',
    items: [
      {
        title: 'Opening Explorer',
        description: 'Browse popular openings for White and Black. See typical pawn structures, key ideas, and common variations.',
        link: '/openings',
      },
      {
        title: '365 Games Collection',
        description: 'One famous game for every day of the year. Study complete games with annotations and learn from the masters.',
        link: '/games',
      },
    ],
  },
  {
    id: 'ai-features',
    title: 'AI Genius Features',
    icon: '🧠',
    color: '#8b5cf6',
    description: 'Powered by advanced AI for personalized help',
    items: [
      {
        title: 'Ask Anything (Brain Button)',
        description: 'The floating brain button (🧠) gives you instant access to the Chess Genius. Ask any chess question and get a detailed, personalized answer.',
        tip: 'Try questions like "Why is this move good?" or "How do I improve?"',
      },
      {
        title: 'AI Coach',
        description: 'Your personal AI chess coach provides tailored advice based on your playing patterns, mistakes, and learning history.',
        link: '/coach',
      },
      {
        title: 'Genius Whispers',
        description: 'Subtle tips that appear contextually while you play or study. Disable them in Settings if you prefer uninterrupted focus.',
        tip: 'Click whispers to expand and see more detail.',
      },
      {
        title: 'Position Analysis',
        description: 'Get deep analysis of any position with the AI analyzing piece placement, threats, and suggested plans.',
      },
    ],
  },
  {
    id: 'mental-game',
    title: 'Mental Training',
    icon: '🧘',
    color: '#06b6d4',
    description: 'Train your mind for peak performance',
    items: [
      {
        title: 'Mind Training',
        description: 'Exercises for focus, visualization, and mental stamina. Chess is as much about the mind as the moves.',
        link: '/mind',
      },
      {
        title: 'Tilt Tracking',
        description: 'The app monitors your emotional state during play. When you\'re tilting (getting frustrated), you\'ll receive calming interventions.',
        tip: 'Take a break when the tilt indicator turns red.',
      },
      {
        title: 'Mistake Library',
        description: 'Review your past mistakes and learn from them. The best players study their losses more than their wins.',
        link: '/mistakes',
      },
    ],
  },
  {
    id: 'navigation',
    title: 'Navigation Tips',
    icon: '🧭',
    color: '#64748b',
    description: 'Getting around the app efficiently',
    items: [
      {
        title: 'Mobile Navigation',
        description: 'Tap the hamburger menu (☰) in the top-left to access all features. On tablets and desktops, the sidebar is always visible.',
      },
      {
        title: 'Swipe Gestures',
        description: 'In lessons and games, swipe left/right to navigate between moves. Swipe up to see analysis.',
      },
      {
        title: 'Keyboard Shortcuts',
        description: 'On desktop, press "?" to see all keyboard shortcuts. Arrow keys navigate moves, spacebar flips the board.',
        tip: 'Press "/" to quickly access search anywhere in the app.',
      },
      {
        title: 'Progress Saving',
        description: 'Your progress is saved automatically. Close the app anytime and pick up where you left off.',
      },
    ],
  },
  {
    id: 'settings',
    title: 'Customization',
    icon: '⚙️',
    color: '#71717a',
    description: 'Personalize your experience',
    items: [
      {
        title: 'Board Appearance',
        description: 'Change piece styles, board colors, and square highlights in Settings. Find a look that suits you.',
        link: '/settings',
      },
      {
        title: 'Sound & Notifications',
        description: 'Toggle move sounds, notification alerts, and AI whispers. Control your focus environment.',
        link: '/settings',
      },
      {
        title: 'Study Preferences',
        description: 'Set your daily study goals, preferred difficulty level, and focus areas.',
        link: '/settings',
      },
    ],
  },
];

export function HowToPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter sections based on search
  const filteredSections = searchQuery.trim()
    ? GUIDE_SECTIONS.map(section => ({
        ...section,
        items: section.items.filter(
          item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(section => section.items.length > 0)
    : GUIDE_SECTIONS;

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="mb-6">
        <BackButton fallback="/" label="Home" />
        
        <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 
              className="text-2xl sm:text-3xl font-display font-bold flex items-center gap-3"
              style={{ color: 'var(--text-primary)' }}
            >
              <span className="text-3xl sm:text-4xl">📖</span>
              How to Use Zen Chess
            </h1>
            <p className="mt-2 text-sm sm:text-base" style={{ color: 'var(--text-tertiary)' }}>
              Everything you need to know to master the app
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-xl text-sm outline-none transition-all focus:ring-2"
            style={{
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
            }}
          />
          <svg 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            style={{ color: 'var(--text-muted)' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10"
              style={{ color: 'var(--text-muted)' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Quick Navigation */}
      {!searchQuery && (
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
            Jump to Section
          </h2>
          <div className="flex flex-wrap gap-2">
            {GUIDE_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(activeSection === section.id ? null : section.id);
                  // Scroll to section
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all hover:scale-[1.02]"
                style={{
                  background: activeSection === section.id ? `${section.color}20` : 'var(--bg-tertiary)',
                  color: activeSection === section.id ? section.color : 'var(--text-secondary)',
                  border: `1px solid ${activeSection === section.id ? section.color : 'var(--border-subtle)'}`,
                }}
              >
                <span>{section.icon}</span>
                <span className="hidden sm:inline">{section.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sections */}
      <div className="space-y-6">
        {filteredSections.map((section, sectionIndex) => (
          <motion.div
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.05 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {/* Section Header */}
            <button
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              className="w-full flex items-center gap-4 p-4 sm:p-5 text-left transition-colors hover:bg-[var(--bg-tertiary)]"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${section.color}20` }}
              >
                {section.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                  {section.title}
                </h2>
                <p className="text-sm truncate" style={{ color: 'var(--text-tertiary)' }}>
                  {section.description}
                </p>
              </div>
              <motion.svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: 'var(--text-muted)' }}
                animate={{ rotate: activeSection === section.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>

            {/* Section Content */}
            <AnimatePresence>
              {(activeSection === section.id || searchQuery) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div 
                    className="px-4 sm:px-5 pb-5 space-y-4"
                    style={{ borderTop: '1px solid var(--border-subtle)' }}
                  >
                    <div className="pt-4" />
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIndex * 0.05 }}
                        className="flex gap-4"
                      >
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5"
                          style={{ background: `${section.color}15`, color: section.color }}
                        >
                          {itemIndex + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                              {item.title}
                            </h3>
                            {item.link && (
                              <NavLink
                                to={item.link}
                                className="text-xs px-2 py-1 rounded-md flex items-center gap-1 flex-shrink-0 transition-colors hover:opacity-80"
                                style={{ background: `${section.color}20`, color: section.color }}
                              >
                                Go
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </NavLink>
                            )}
                          </div>
                          <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {item.description}
                          </p>
                          {item.tip && (
                            <div 
                              className="mt-2 px-3 py-2 rounded-lg text-xs flex items-start gap-2"
                              style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.2)' }}
                            >
                              <span className="text-amber-400">💡</span>
                              <span style={{ color: 'var(--text-primary)' }}>{item.tip}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {searchQuery && filteredSections.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            No results found
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Try different keywords or browse the sections above
          </p>
        </div>
      )}

      {/* Footer Help */}
      <div 
        className="mt-8 p-6 rounded-2xl text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1))',
          border: '1px solid rgba(168, 85, 247, 0.2)',
        }}
      >
        <div className="text-4xl mb-3">💬</div>
        <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
          Still have questions?
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Use the 🧠 button anywhere in the app to ask the Chess Genius for help
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Or reach out to us at support@zenchess.io
        </p>
      </div>
    </div>
  );
}

export default HowToPage;



