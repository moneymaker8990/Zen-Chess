// ============================================
// ACHIEVEMENT NOTIFICATION
// Toast notification for unlocked achievements
// ============================================

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  useAchievementStore, 
  getAchievementById, 
  getRarityColor 
} from '@/lib/achievementSystem';
import type { Achievement } from '@/lib/achievementSystem';

export function AchievementNotificationContainer() {
  const { newlyUnlocked, clearNewlyUnlocked } = useAchievementStore();
  const [displayed, setDisplayed] = useState<Achievement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // When new achievements are unlocked, add them to display queue
  useEffect(() => {
    if (newlyUnlocked.length > 0) {
      const achievements = newlyUnlocked
        .map(id => getAchievementById(id))
        .filter((a): a is Achievement => !!a);
      
      setDisplayed(prev => [...prev, ...achievements]);
      clearNewlyUnlocked();
    }
  }, [newlyUnlocked, clearNewlyUnlocked]);

  // Auto-advance through achievements
  useEffect(() => {
    if (displayed.length > 0 && currentIndex < displayed.length) {
      const timer = setTimeout(() => {
        if (currentIndex === displayed.length - 1) {
          // Reset after showing all
          setDisplayed([]);
          setCurrentIndex(0);
        } else {
          setCurrentIndex(prev => prev + 1);
        }
      }, 4000); // Show each for 4 seconds

      return () => clearTimeout(timer);
    }
  }, [currentIndex, displayed.length]);

  const currentAchievement = displayed[currentIndex];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <AnimatePresence mode="wait">
        {currentAchievement && (
          <AchievementToast
            key={currentAchievement.id}
            achievement={currentAchievement}
            onDismiss={() => {
              if (currentIndex === displayed.length - 1) {
                setDisplayed([]);
                setCurrentIndex(0);
              } else {
                setCurrentIndex(prev => prev + 1);
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function AchievementToast({ 
  achievement, 
  onDismiss 
}: { 
  achievement: Achievement;
  onDismiss: () => void;
}) {
  const rarityColor = getRarityColor(achievement.rarity);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="pointer-events-auto"
    >
      <div 
        className="flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl"
        style={{ 
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 27, 75, 0.95))',
          border: `2px solid ${rarityColor}`,
          boxShadow: `0 10px 40px ${rarityColor}40`,
        }}
        onClick={onDismiss}
      >
        {/* Icon with glow */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl relative"
          style={{ background: `${rarityColor}30` }}
        >
          {/* Glow effect */}
          <div 
            className="absolute inset-0 rounded-xl animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${rarityColor}40 0%, transparent 70%)`,
            }}
          />
          <span className="relative">{achievement.icon}</span>
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 mb-1"
          >
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#fbbf24' }}>
              Achievement Unlocked!
            </span>
            <span 
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: `${rarityColor}30`, color: rarityColor }}
            >
              {achievement.rarity}
            </span>
          </motion.div>
          
          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display font-medium text-lg"
            style={{ color: 'var(--text-primary)' }}
          >
            {achievement.name}
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            {achievement.description}
          </motion.p>
        </div>

        {/* XP Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.4 }}
          className="text-right"
        >
          <div className="text-xl font-bold" style={{ color: '#fbbf24' }}>
            +{achievement.xp}
          </div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
            XP
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================
// ACHIEVEMENT BADGE COMPONENT
// For displaying in profiles, lists, etc.
// ============================================

export function AchievementBadge({ 
  achievement,
  unlocked = false,
  showProgress = false,
  stats,
  size = 'medium',
}: { 
  achievement: Achievement;
  unlocked?: boolean;
  showProgress?: boolean;
  stats?: any;
  size?: 'small' | 'medium' | 'large';
}) {
  const rarityColor = unlocked ? getRarityColor(achievement.rarity) : '#374151';
  const progress = showProgress && achievement.progress && stats
    ? achievement.progress(stats)
    : null;

  const sizeClasses = {
    small: 'w-10 h-10 text-lg',
    medium: 'w-14 h-14 text-2xl',
    large: 'w-20 h-20 text-3xl',
  };

  return (
    <div className="relative group">
      <div
        className={`${sizeClasses[size]} rounded-xl flex items-center justify-center transition-all ${
          unlocked ? 'hover:scale-110' : 'opacity-50'
        }`}
        style={{ 
          background: `${rarityColor}20`,
          border: `2px solid ${rarityColor}`,
        }}
      >
        <span className={unlocked ? '' : 'grayscale'}>
          {unlocked || !achievement.secret ? achievement.icon : '❓'}
        </span>
      </div>

      {/* Progress bar */}
      {progress && !unlocked && (
        <div className="absolute -bottom-1 left-0 right-0 h-1 rounded-full overflow-hidden bg-gray-700">
          <div 
            className="h-full transition-all"
            style={{ 
              width: `${Math.min(100, (progress.current / progress.target) * 100)}%`,
              background: rarityColor,
            }}
          />
        </div>
      )}

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        <div 
          className="px-3 py-2 rounded-lg text-center whitespace-nowrap"
          style={{ 
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
            {unlocked || !achievement.secret ? achievement.name : '???'}
          </div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {unlocked || !achievement.secret ? achievement.description : 'Secret achievement'}
          </div>
          {progress && !unlocked && (
            <div className="text-xs mt-1" style={{ color: rarityColor }}>
              {progress.current}/{progress.target}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


