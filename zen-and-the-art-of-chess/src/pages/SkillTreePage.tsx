// ============================================
// SKILL TREE PAGE
// Visual skill progression with unlockable branches
// ============================================

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BackButton } from '@/components/BackButton';
import { useProgressStore } from '@/state/useStore';
import { loadPatternProgress } from '@/lib/spacedRepetition';

// ============================================
// SKILL TREE DATA STRUCTURE
// ============================================

interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredXP: number;
  category: SkillCategory;
  route?: string;
  prerequisite?: string;
}

type SkillCategory = 'tactics' | 'strategy' | 'endgames' | 'openings' | 'visualization' | 'mastery';

const SKILL_TREE: Skill[] = [
  // TACTICS BRANCH
  { id: 'tactics-1', name: 'Pattern Recognition', description: 'Learn to spot basic tactical patterns', icon: '👁️', requiredXP: 0, category: 'tactics', route: '/train' },
  { id: 'tactics-2', name: 'Fork & Pin', description: 'Master double attacks and pins', icon: '⚔️', requiredXP: 50, category: 'tactics', prerequisite: 'tactics-1', route: '/train' },
  { id: 'tactics-3', name: 'Discovered Attack', description: 'Unleash hidden attackers', icon: '💥', requiredXP: 150, category: 'tactics', prerequisite: 'tactics-2', route: '/train' },
  { id: 'tactics-4', name: 'Combination Play', description: 'Chain tactics together', icon: '🔗', requiredXP: 300, category: 'tactics', prerequisite: 'tactics-3', route: '/train' },
  { id: 'tactics-5', name: 'Tactical Master', description: 'Advanced tactical vision', icon: '🎯', requiredXP: 500, category: 'tactics', prerequisite: 'tactics-4', route: '/train' },

  // STRATEGY BRANCH
  { id: 'strategy-1', name: 'Piece Activity', description: 'Understand active vs passive pieces', icon: '♞', requiredXP: 25, category: 'strategy', route: '/patterns' },
  { id: 'strategy-2', name: 'Pawn Structure', description: 'Learn strong and weak pawns', icon: '♟️', requiredXP: 100, category: 'strategy', prerequisite: 'strategy-1', route: '/patterns' },
  { id: 'strategy-3', name: 'Positional Play', description: 'Control squares and space', icon: '📐', requiredXP: 200, category: 'strategy', prerequisite: 'strategy-2', route: '/patterns' },
  { id: 'strategy-4', name: 'Strategic Planning', description: 'Create and execute plans', icon: '🗺️', requiredXP: 350, category: 'strategy', prerequisite: 'strategy-3', route: '/patterns' },
  { id: 'strategy-5', name: 'Positional Master', description: 'Deep positional understanding', icon: '🏆', requiredXP: 550, category: 'strategy', prerequisite: 'strategy-4', route: '/patterns' },

  // ENDGAMES BRANCH
  { id: 'endgame-1', name: 'Basic Checkmates', description: 'King + Queen/Rook vs King', icon: '♔', requiredXP: 20, category: 'endgames', route: '/endgames' },
  { id: 'endgame-2', name: 'Pawn Endgames', description: 'Opposition and key squares', icon: '♙', requiredXP: 100, category: 'endgames', prerequisite: 'endgame-1', route: '/endgames' },
  { id: 'endgame-3', name: 'Rook Endgames', description: 'Lucena and Philidor positions', icon: '♖', requiredXP: 200, category: 'endgames', prerequisite: 'endgame-2', route: '/endgames' },
  { id: 'endgame-4', name: 'Minor Piece Endgames', description: 'Bishop vs Knight battles', icon: '♗', requiredXP: 350, category: 'endgames', prerequisite: 'endgame-3', route: '/endgames' },
  { id: 'endgame-5', name: 'Endgame Master', description: 'Convert any advantage', icon: '👑', requiredXP: 500, category: 'endgames', prerequisite: 'endgame-4', route: '/endgames' },

  // OPENINGS BRANCH
  { id: 'opening-1', name: 'Opening Principles', description: 'Development and center control', icon: '📖', requiredXP: 10, category: 'openings', route: '/openings' },
  { id: 'opening-2', name: 'Main Lines', description: 'Learn popular openings', icon: '🛤️', requiredXP: 75, category: 'openings', prerequisite: 'opening-1', route: '/openings' },
  { id: 'opening-3', name: 'Repertoire Building', description: 'Build your own opening set', icon: '🏗️', requiredXP: 175, category: 'openings', prerequisite: 'opening-2', route: '/openings' },
  { id: 'opening-4', name: 'Sidelines & Traps', description: 'Surprise your opponents', icon: '🪤', requiredXP: 300, category: 'openings', prerequisite: 'opening-3', route: '/openings' },
  { id: 'opening-5', name: 'Opening Theorist', description: 'Deep opening knowledge', icon: '📚', requiredXP: 450, category: 'openings', prerequisite: 'opening-4', route: '/openings' },

  // VISUALIZATION BRANCH
  { id: 'viz-1', name: 'Board Vision', description: 'See the whole board', icon: '👀', requiredXP: 50, category: 'visualization', route: '/blindfold' },
  { id: 'viz-2', name: 'Calculate 2 Moves', description: 'See two moves ahead', icon: '🔮', requiredXP: 150, category: 'visualization', prerequisite: 'viz-1', route: '/intuition' },
  { id: 'viz-3', name: 'Blindfold Basics', description: 'Play without seeing the board', icon: '🎭', requiredXP: 300, category: 'visualization', prerequisite: 'viz-2', route: '/blindfold' },
  { id: 'viz-4', name: 'Deep Calculation', description: 'Calculate complex lines', icon: '🧮', requiredXP: 450, category: 'visualization', prerequisite: 'viz-3', route: '/thinking-system' },
  { id: 'viz-5', name: 'Visualization Master', description: 'Grandmaster-level vision', icon: '🌟', requiredXP: 600, category: 'visualization', prerequisite: 'viz-4', route: '/blindfold' },

  // MASTERY BRANCH (unlocks after others)
  { id: 'mastery-1', name: 'Study Discipline', description: 'Consistent training habits', icon: '📅', requiredXP: 100, category: 'mastery', route: '/study-plan' },
  { id: 'mastery-2', name: 'Game Analysis', description: 'Learn from your games', icon: '🔍', requiredXP: 250, category: 'mastery', prerequisite: 'mastery-1', route: '/mistakes' },
  { id: 'mastery-3', name: 'Tournament Ready', description: 'Prepare for competition', icon: '🏅', requiredXP: 400, category: 'mastery', prerequisite: 'mastery-2', route: '/tournament' },
  { id: 'mastery-4', name: 'Mental Strength', description: 'Control your emotions', icon: '🧘', requiredXP: 550, category: 'mastery', prerequisite: 'mastery-3', route: '/mind' },
  { id: 'mastery-5', name: 'Chess Master', description: 'The path is complete', icon: '♚', requiredXP: 750, category: 'mastery', prerequisite: 'mastery-4', route: '/dashboard' },
];

const CATEGORY_INFO: Record<SkillCategory, { name: string; color: string; gradient: string; bgGlow: string }> = {
  tactics: { name: 'Tactics', color: '#f43f5e', gradient: 'from-rose-500 to-red-600', bgGlow: 'rgba(244, 63, 94, 0.15)' },
  strategy: { name: 'Strategy', color: '#8b5cf6', gradient: 'from-violet-500 to-purple-600', bgGlow: 'rgba(139, 92, 246, 0.15)' },
  endgames: { name: 'Endgames', color: '#f59e0b', gradient: 'from-amber-500 to-orange-600', bgGlow: 'rgba(245, 158, 11, 0.15)' },
  openings: { name: 'Openings', color: '#3b82f6', gradient: 'from-blue-500 to-indigo-600', bgGlow: 'rgba(59, 130, 246, 0.15)' },
  visualization: { name: 'Visualization', color: '#06b6d4', gradient: 'from-cyan-500 to-teal-600', bgGlow: 'rgba(6, 182, 212, 0.15)' },
  mastery: { name: 'Mastery', color: '#22c55e', gradient: 'from-green-500 to-emerald-600', bgGlow: 'rgba(34, 197, 94, 0.15)' },
};

// ============================================
// MAIN COMPONENT
// ============================================

export function SkillTreePage() {
  const navigate = useNavigate();
  const { progress } = useProgressStore();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Calculate total XP from multiple sources
  const patternProgress = useMemo(() => loadPatternProgress(), []);
  const endgameProgress = useMemo(() => {
    try {
      const data = localStorage.getItem('zen-chess-srs-endgames');
      return data ? JSON.parse(data) : { totalXP: 0 };
    } catch {
      return { totalXP: 0 };
    }
  }, []);

  const totalXP = useMemo(() => {
    return (
      progress.puzzlesSolved * 2 +
      progress.currentDay * 5 +
      (progress.completedOpenings?.size ?? 0) * 10 +
      (patternProgress.totalXP || 0) +
      (endgameProgress.totalXP || 0)
    );
  }, [progress, patternProgress, endgameProgress]);

  // Calculate skill unlock status
  const getSkillStatus = (skill: Skill) => {
    const isUnlocked = totalXP >= skill.requiredXP;
    const prerequisiteMet = !skill.prerequisite || totalXP >= (SKILL_TREE.find(s => s.id === skill.prerequisite)?.requiredXP || 0);
    const isAvailable = isUnlocked && prerequisiteMet;
    const progressToUnlock = Math.min(100, (totalXP / skill.requiredXP) * 100);
    return { isUnlocked, prerequisiteMet, isAvailable, progressToUnlock };
  };

  // Get skills by category
  const getSkillsByCategory = (category: SkillCategory) => {
    return SKILL_TREE.filter(s => s.category === category);
  };

  // Calculate category progress
  const getCategoryProgress = (category: SkillCategory) => {
    const skills = getSkillsByCategory(category);
    const unlockedCount = skills.filter(s => getSkillStatus(s).isAvailable).length;
    return { unlocked: unlockedCount, total: skills.length };
  };

  // Get total unlocked skills
  const totalUnlocked = SKILL_TREE.filter(s => getSkillStatus(s).isAvailable).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton fallback="/" className="mb-4" />

      {/* Header */}
      <section className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30">
            🌳
          </div>
          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
              Skill Tree
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Master chess skills and unlock new abilities
            </p>
          </div>
        </div>

        {/* XP Display */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full" style={{ background: 'var(--bg-elevated)' }}>
            <span>⭐</span>
            <span className="font-bold text-xl" style={{ color: '#eab308' }}>{totalXP}</span>
            <span style={{ color: 'var(--text-muted)' }}>XP</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full" style={{ background: 'var(--bg-elevated)' }}>
            <span>🏆</span>
            <span className="font-bold" style={{ color: '#22c55e' }}>{totalUnlocked}</span>
            <span style={{ color: 'var(--text-muted)' }}>/ {SKILL_TREE.length} skills</span>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(CATEGORY_INFO).map(([category, info]) => {
          const catProgress = getCategoryProgress(category as SkillCategory);
          const isSelected = selectedCategory === category;

          return (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(isSelected ? null : category as SkillCategory)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`card p-5 text-left transition-all duration-300 ${isSelected ? 'ring-2' : ''}`}
              style={{
                background: `linear-gradient(135deg, ${info.bgGlow}, transparent)`,
                borderColor: isSelected ? info.color : 'transparent',
                // Ring color is set via --tw-ring-color custom property (Tailwind)
                '--tw-ring-color': info.color,
              } as React.CSSProperties}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${info.gradient} shadow-lg`}
                >
                  {getSkillsByCategory(category as SkillCategory)[0]?.icon}
                </div>
                <span className="text-sm font-medium px-2 py-1 rounded" style={{
                  background: 'var(--bg-elevated)',
                  color: info.color,
                }}>
                  {catProgress.unlocked}/{catProgress.total}
                </span>
              </div>

              <h3 className="font-display font-medium text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
                {info.name}
              </h3>

              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(catProgress.unlocked / catProgress.total) * 100}%` }}
                  className={`h-full rounded-full bg-gradient-to-r ${info.gradient}`}
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Expanded Category Skills */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="card p-6">
              <h3 className="font-display font-medium text-xl mb-4" style={{ color: CATEGORY_INFO[selectedCategory].color }}>
                {CATEGORY_INFO[selectedCategory].name} Skills
              </h3>

              <div className="space-y-3">
                {getSkillsByCategory(selectedCategory).map((skill, index) => {
                  const status = getSkillStatus(skill);
                  const categoryInfo = CATEGORY_INFO[selectedCategory];

                  return (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                        status.isAvailable ? 'hover:scale-[1.02]' : 'opacity-50'
                      }`}
                      style={{
                        background: status.isAvailable ? `${categoryInfo.bgGlow}` : 'var(--bg-tertiary)',
                        border: `1px solid ${status.isAvailable ? categoryInfo.color + '33' : 'transparent'}`,
                      }}
                      onClick={() => {
                        if (status.isAvailable && skill.route) {
                          navigate(skill.route);
                        } else {
                          setSelectedSkill(skill);
                        }
                      }}
                    >
                      {/* Connection Line */}
                      {index > 0 && (
                        <div className="absolute left-8 -top-3 w-0.5 h-3" style={{
                          background: status.isAvailable ? categoryInfo.color : 'var(--border-subtle)',
                        }} />
                      )}

                      {/* Skill Icon */}
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                          status.isAvailable ? `bg-gradient-to-br ${categoryInfo.gradient}` : 'bg-gray-600'
                        }`}
                      >
                        {status.isAvailable ? skill.icon : '🔒'}
                      </div>

                      {/* Skill Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium" style={{ color: status.isAvailable ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                            {skill.name}
                          </h4>
                          {status.isAvailable && (
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{
                              background: 'rgba(34, 197, 94, 0.2)',
                              color: '#22c55e',
                            }}>
                              Unlocked
                            </span>
                          )}
                        </div>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {skill.description}
                        </p>

                        {/* Progress to unlock */}
                        {!status.isAvailable && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span style={{ color: 'var(--text-muted)' }}>Progress</span>
                              <span style={{ color: categoryInfo.color }}>
                                {totalXP}/{skill.requiredXP} XP
                              </span>
                            </div>
                            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${categoryInfo.gradient}`}
                                style={{ width: `${status.progressToUnlock}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Arrow for available skills */}
                      {status.isAvailable && (
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: categoryInfo.color }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && !getSkillStatus(selectedSkill).isAvailable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)' }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="card p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🔒</div>
                <h3 className="text-xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  {selectedSkill.name}
                </h3>
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {selectedSkill.description}
                </p>
                <div className="p-4 rounded-xl mb-4" style={{ background: 'var(--bg-tertiary)' }}>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Required XP</div>
                  <div className="text-2xl font-bold" style={{ color: CATEGORY_INFO[selectedSkill.category].color }}>
                    {selectedSkill.requiredXP} XP
                  </div>
                  <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                    You have {totalXP} XP ({selectedSkill.requiredXP - totalXP} more needed)
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="btn-ghost w-full"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* How to Earn XP */}
      <div className="card p-6">
        <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
          How to Earn XP
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <XPSource icon="🧩" label="Solve Puzzles" xp="+2 XP" />
          <XPSource icon="📚" label="Study Patterns" xp="+10-20 XP" />
          <XPSource icon="📖" label="Complete Openings" xp="+10 XP" />
          <XPSource icon="📅" label="Daily Practice" xp="+5 XP" />
        </div>
      </div>
    </div>
  );
}

function XPSource({ icon, label, xp }: { icon: string; label: string; xp: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{label}</div>
        <div className="text-sm" style={{ color: '#22c55e' }}>{xp}</div>
      </div>
    </div>
  );
}

export default SkillTreePage;
