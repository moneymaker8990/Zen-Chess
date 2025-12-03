// ============================================
// PREMIUM GATE HOOK
// Easy feature gating throughout the app
// ============================================

import { useState, useCallback } from 'react';
import { useAuthStore } from '@/state/useAuthStore';
import type { PremiumFeature } from '@/lib/premium';
import { TIER_LIMITS, UPSELL_MESSAGES } from '@/lib/premium';

interface UsePremiumGateReturn {
  // Check if user can access a feature
  canAccess: (feature: PremiumFeature) => boolean;
  
  // Check access and show paywall if needed, returns true if allowed
  requireAccess: (feature: PremiumFeature) => boolean;
  
  // Check if user has remaining daily usage
  hasRemainingUsage: (type: 'puzzles' | 'games' | 'analysis') => boolean;
  
  // Get remaining count for daily limits
  getRemainingCount: (type: 'puzzles' | 'games' | 'analysis') => number;
  
  // Paywall state
  isPaywallOpen: boolean;
  paywallFeature: PremiumFeature | null;
  closePaywall: () => void;
  
  // User state
  isPremium: boolean;
  tier: 'free' | 'premium' | 'lifetime';
}

export function usePremiumGate(): UsePremiumGateReturn {
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [paywallFeature, setPaywallFeature] = useState<PremiumFeature | null>(null);
  
  const {
    subscriptionTier,
    isPremium,
    canUseFeature,
    getRemainingPuzzles,
    getRemainingGames,
    getRemainingAnalysis,
  } = useAuthStore();
  
  const canAccess = useCallback((feature: PremiumFeature): boolean => {
    return canUseFeature(feature);
  }, [canUseFeature]);
  
  const requireAccess = useCallback((feature: PremiumFeature): boolean => {
    if (canUseFeature(feature)) {
      return true;
    }
    
    setPaywallFeature(feature);
    setIsPaywallOpen(true);
    return false;
  }, [canUseFeature]);
  
  const hasRemainingUsage = useCallback((type: 'puzzles' | 'games' | 'analysis'): boolean => {
    if (isPremium()) return true;
    
    switch (type) {
      case 'puzzles':
        return getRemainingPuzzles() > 0;
      case 'games':
        return getRemainingGames() > 0;
      case 'analysis':
        return getRemainingAnalysis() > 0;
      default:
        return true;
    }
  }, [isPremium, getRemainingPuzzles, getRemainingGames, getRemainingAnalysis]);
  
  const getRemainingCount = useCallback((type: 'puzzles' | 'games' | 'analysis'): number => {
    switch (type) {
      case 'puzzles':
        return getRemainingPuzzles();
      case 'games':
        return getRemainingGames();
      case 'analysis':
        return getRemainingAnalysis();
      default:
        return Infinity;
    }
  }, [getRemainingPuzzles, getRemainingGames, getRemainingAnalysis]);
  
  const closePaywall = useCallback(() => {
    setIsPaywallOpen(false);
    setPaywallFeature(null);
  }, []);
  
  return {
    canAccess,
    requireAccess,
    hasRemainingUsage,
    getRemainingCount,
    isPaywallOpen,
    paywallFeature,
    closePaywall,
    isPremium: isPremium(),
    tier: subscriptionTier,
  };
}

// ============================================
// PREMIUM FEATURE WRAPPER COMPONENT
// Wraps content and shows upgrade prompt if locked
// ============================================

import type { ReactNode } from 'react';
import { UpgradePrompt } from '@/components/Paywall';

interface PremiumFeatureProps {
  feature: PremiumFeature;
  children: ReactNode;
  fallback?: ReactNode;
  showUpgradePrompt?: boolean;
}

export function PremiumFeature({ 
  feature, 
  children, 
  fallback,
  showUpgradePrompt = true 
}: PremiumFeatureProps) {
  const { canAccess } = usePremiumGate();
  
  if (canAccess(feature)) {
    return <>{children}</>;
  }
  
  if (fallback) {
    return <>{fallback}</>;
  }
  
  if (showUpgradePrompt) {
    return <UpgradePrompt feature={feature} />;
  }
  
  return null;
}

// ============================================
// USAGE LIMIT INDICATOR
// Shows remaining daily usage for free users
// ============================================

interface UsageLimitIndicatorProps {
  type: 'puzzles' | 'games' | 'analysis';
  className?: string;
}

export function UsageLimitIndicator({ type, className = '' }: UsageLimitIndicatorProps) {
  const { isPremium, tier, getRemainingCount } = usePremiumGate();
  
  if (isPremium) return null;
  
  const remaining = getRemainingCount(type);
  const total = TIER_LIMITS[tier][
    type === 'puzzles' ? 'puzzlesPerDay' : 
    type === 'games' ? 'gamesPerDay' : 'analysisPerDay'
  ];
  
  const labels = {
    puzzles: 'puzzles',
    games: 'games',
    analysis: 'analyses',
  };
  
  const isLow = remaining <= 1;
  const isEmpty = remaining === 0;
  
  return (
    <div 
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${className}`}
      style={{ 
        background: isEmpty ? 'rgba(239, 68, 68, 0.1)' : isLow ? 'rgba(251, 191, 36, 0.1)' : 'var(--bg-tertiary)',
        color: isEmpty ? '#ef4444' : isLow ? '#fbbf24' : 'var(--text-secondary)',
      }}
    >
      <span>
        {isEmpty ? (
          `No ${labels[type]} left today`
        ) : (
          `${remaining}/${total} ${labels[type]} left`
        )}
      </span>
      {isEmpty && (
        <a href="/pricing" className="font-medium underline" style={{ color: '#a855f7' }}>
          Upgrade
        </a>
      )}
    </div>
  );
}

// ============================================
// FEATURE LOCK BADGE
// Small badge to indicate premium features
// ============================================

interface FeatureLockBadgeProps {
  feature: PremiumFeature;
  className?: string;
}

export function FeatureLockBadge({ feature, className = '' }: FeatureLockBadgeProps) {
  const { canAccess } = usePremiumGate();
  
  if (canAccess(feature)) return null;
  
  return (
    <span 
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${className}`}
      style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}
    >
      <span>✨</span>
      <span>PRO</span>
    </span>
  );
}


