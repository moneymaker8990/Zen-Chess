// ============================================
// ACHIEVEMENTS PAGE
// Display all achievements and progress
// ============================================

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackButton } from '@/components/BackButton';
import {
  ACHIEVEMENTS,
  useAchievements,
  getAchievementsByCategory,
  getRarityColor,
  getRarityLabel,
  type Achievement,
} from '@/lib/achievementSystem';
import { AchievementBadge } from '@/components/AchievementNotification';

// ============================================
// TYPES
// ============================================

type CategoryFilter = 'all' | 'progress' | 'performance' | 'streak' | 'mastery' | 'mindfulness' | 'social';
type RarityFilter = 'all' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

const CATEGORY_INFO: Record<CategoryFilter, { name: string; icon: string; color: string }> = {
  all: { name: 'All', icon: '🏆', color: '#eab308' },
  progress: { name: 'Progress', icon: '📈', color: '#3b82f6' },
  performance: { name: 'Performance', icon: '🎯', color: '#22c55e' },
  streak: { name: 'Streaks', icon: '🔥', color: '#f97316' },
  mastery: { name: 'Mastery', icon: '📚', color: '#8b5cf6' },
  mindfulness: { name: 'Mindfulness', icon: '🧘', color: '#06b6d4' },
  social: { name: 'Social', icon: '👥', color: '#ec4899' },
};

// ============================================
// MAIN COMPONENT
// ============================================

export function AchievementsPage() {
  const { unlockedAchievements, stats, unlockedCount, totalCount, progress, totalXP } = useAchievements();
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Filter achievements
  const filteredAchievements = useMemo(() => {
    return ACHIEVEMENTS.filter(achievement => {
      if (categoryFilter !== 'all' && achievement.category !== categoryFilter) return false;
      if (rarityFilter !== 'all' && achievement.rarity !== rarityFilter) return false;
      if (showUnlockedOnly && !unlockedAchievements.includes(achievement.id)) return false;
      if (achievement.secret && !unlockedAchievements.includes(achievement.id)) return false;
      return true;
    });
  }, [categoryFilter, rarityFilter, showUnlockedOnly, unlockedAchievements]);

  // Group by category for display
  const groupedAchievements = useMemo(() => {
    if (categoryFilter !== 'all') {
      return { [categoryFilter]: filteredAchievements };
    }
    const groups: Record<string, Achievement[]> = {};
    filteredAchievements.forEach(a => {
      if (!groups[a.category]) groups[a.category] = [];
      groups[a.category].push(a);
    });
    return groups;
  }, [filteredAchievements, categoryFilter]);

  // Calculate category stats
  const categoryStats = useMemo(() => {
    const stats: Record<string, { unlocked: number; total: number }> = {};
    Object.keys(CATEGORY_INFO).forEach(cat => {
      if (cat === 'all') return;
      const achievements = getAchievementsByCategory(cat as Achievement['category']);
      const unlocked = achievements.filter(a => unlockedAchievements.includes(a.id)).length;
      stats[cat] = { unlocked, total: achievements.length };
    });
    return stats;
  }, [unlockedAchievements]);

  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton fallback="/" className="mb-4" />

      {/* Header */}
      <section className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-3xl shadow-lg shadow-yellow-500/30">
            🏆
          </div>
          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
              Achievements
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Track your chess journey milestones
            </p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="max-w-md mx-auto mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span style={{ color: 'var(--text-muted)' }}>Progress</span>
            <span style={{ color: '#eab308' }}>{unlockedCount} / {totalCount} unlocked</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-500"
            />
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#eab308' }}>{totalXP}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#22c55e' }}>{progress}%</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Complete</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {Object.entries(CATEGORY_INFO).map(([cat, info]) => {
          const isSelected = categoryFilter === cat;
          const catStat = cat === 'all' ? null : categoryStats[cat];

          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat as CategoryFilter)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                isSelected ? 'scale-105' : 'hover:scale-102'
              }`}
              style={{
                background: isSelected ? `${info.color}20` : 'var(--bg-tertiary)',
                color: isSelected ? info.color : 'var(--text-muted)',
                border: `1px solid ${isSelected ? info.color : 'transparent'}`,
              }}
            >
              <span>{info.icon}</span>
              <span>{info.name}</span>
              {catStat && (
                <span className="text-xs opacity-70">
                  {catStat.unlocked}/{catStat.total}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* Rarity Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Rarity:</span>
          <select
            value={rarityFilter}
            onChange={(e) => setRarityFilter(e.target.value as RarityFilter)}
            className="px-3 py-1.5 rounded-lg text-sm"
            style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
          >
            <option value="all">All Rarities</option>
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
            <option value="epic">Epic</option>
            <option value="legendary">Legendary</option>
          </select>
        </div>

        {/* Unlocked Only Toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showUnlockedOnly}
            onChange={(e) => setShowUnlockedOnly(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Show unlocked only</span>
        </label>
      </div>

      {/* Achievements Grid */}
      {Object.entries(groupedAchievements).map(([category, achievements]) => (
        <div key={category} className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{CATEGORY_INFO[category as CategoryFilter]?.icon || '🏆'}</span>
            <h2 className="text-xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
              {CATEGORY_INFO[category as CategoryFilter]?.name || category}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {achievements.map((achievement) => {
              const isUnlocked = unlockedAchievements.includes(achievement.id);
              const rarityColor = getRarityColor(achievement.rarity);

              return (
                <motion.button
                  key={achievement.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedAchievement(achievement)}
                  className={`p-4 rounded-xl text-center transition-all ${
                    isUnlocked ? 'hover:shadow-lg' : 'opacity-60'
                  }`}
                  style={{
                    background: isUnlocked ? `${rarityColor}15` : 'var(--bg-tertiary)',
                    border: `2px solid ${isUnlocked ? rarityColor : 'transparent'}`,
                  }}
                >
                  <div className="text-4xl mb-2">
                    {isUnlocked ? achievement.icon : '🔒'}
                  </div>
                  <div className="font-medium text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                    {achievement.name}
                  </div>
                  <div className="text-xs mt-1" style={{ color: rarityColor }}>
                    {getRarityLabel(achievement.rarity)}
                  </div>
                  {!isUnlocked && achievement.progress && (
                    <div className="mt-2">
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(100, (achievement.progress(stats).current / achievement.progress(stats).target) * 100)}%`,
                            background: rarityColor,
                          }}
                        />
                      </div>
                      <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        {achievement.progress(stats).current}/{achievement.progress(stats).target}
                      </div>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <div className="card p-12 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            No achievements found
          </h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Try adjusting your filters to see more achievements.
          </p>
        </div>
      )}

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)' }}
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="card p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <AchievementDetail
                achievement={selectedAchievement}
                isUnlocked={unlockedAchievements.includes(selectedAchievement.id)}
                stats={stats}
                onClose={() => setSelectedAchievement(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rarity Legend */}
      <div className="card p-4">
        <h3 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>Rarity Legend</h3>
        <div className="flex flex-wrap gap-4">
          {(['common', 'uncommon', 'rare', 'epic', 'legendary'] as const).map(rarity => (
            <div key={rarity} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ background: getRarityColor(rarity) }}
              />
              <span className="text-sm capitalize" style={{ color: 'var(--text-secondary)' }}>
                {rarity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// ACHIEVEMENT DETAIL COMPONENT
// ============================================

function AchievementDetail({
  achievement,
  isUnlocked,
  stats,
  onClose,
}: {
  achievement: Achievement;
  isUnlocked: boolean;
  stats: any;
  onClose: () => void;
}) {
  const rarityColor = getRarityColor(achievement.rarity);
  const progress = achievement.progress ? achievement.progress(stats) : null;

  return (
    <div className="text-center">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-5xl mb-4"
        style={{
          background: `${rarityColor}20`,
          border: `3px solid ${rarityColor}`,
        }}
      >
        {isUnlocked ? achievement.icon : '🔒'}
      </motion.div>

      {/* Rarity Badge */}
      <div
        className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
        style={{ background: `${rarityColor}20`, color: rarityColor }}
      >
        {getRarityLabel(achievement.rarity)}
      </div>

      {/* Name & Description */}
      <h3 className="text-2xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
        {achievement.name}
      </h3>
      <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
        {achievement.description}
      </p>

      {/* XP Reward */}
      <div className="p-4 rounded-xl mb-4" style={{ background: 'var(--bg-tertiary)' }}>
        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>XP Reward</div>
        <div className="text-3xl font-bold" style={{ color: '#eab308' }}>+{achievement.xp}</div>
      </div>

      {/* Progress (if not unlocked) */}
      {!isUnlocked && progress && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span style={{ color: 'var(--text-muted)' }}>Progress</span>
            <span style={{ color: rarityColor }}>{progress.current}/{progress.target}</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min(100, (progress.current / progress.target) * 100)}%`,
                background: rarityColor,
              }}
            />
          </div>
        </div>
      )}

      {/* Status */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {isUnlocked ? (
          <>
            <span style={{ color: '#22c55e' }}>Unlocked</span>
          </>
        ) : (
          <>
            <span style={{ color: 'var(--text-muted)' }}>Locked</span>
          </>
        )}
      </div>

      <button onClick={onClose} className="btn-ghost w-full">
        Close
      </button>
    </div>
  );
}

export default AchievementsPage;
