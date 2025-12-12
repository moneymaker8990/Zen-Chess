// ============================================
// PAYWALL COMPONENT
// Beautiful upsell modal for premium features
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/state/useAuthStore';
import type { PremiumFeature } from '@/lib/premium';
import { UPSELL_MESSAGES, PRICING_PLANS } from '@/lib/premium';

interface PaywallProps {
  feature: PremiumFeature;
  isOpen: boolean;
  onClose: () => void;
}

export function Paywall({ feature, isOpen, onClose }: PaywallProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const message = UPSELL_MESSAGES[feature];
  
  const handleUpgrade = () => {
    onClose();
    if (!user) {
      navigate('/auth?redirect=/pricing');
    } else {
      navigate('/pricing');
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg rounded-2xl overflow-hidden"
            style={{ background: 'var(--bg-secondary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Premium gradient header */}
            <div 
              className="p-8 text-center"
              style={{ 
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, rgba(251, 191, 36, 0.2) 100%)',
                borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
              }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>
                ✨
              </div>
              <h2 className="text-2xl font-display font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {message.title}
              </h2>
              <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                {message.description}
              </p>
            </div>
            
            {/* Features preview */}
            <div className="p-6 space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Included with Premium
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {PRICING_PLANS[1].features.slice(0, 6).map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: '#4ade80' }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA */}
            <div className="p-6 pt-0 space-y-3">
              <button
                onClick={handleUpgrade}
                className="w-full py-4 rounded-xl text-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ 
                  background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(168, 85, 247, 0.4)',
                }}
              >
                Upgrade to Premium
              </button>
              
              <div className="flex items-center justify-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                <span>Starting at $9.99/month</span>
                <span>•</span>
                <span>Cancel anytime</span>
              </div>
              
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl text-sm transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Maybe later
              </button>
            </div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ color: 'var(--text-muted)' }}
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// PAYWALL HOOK
// Easy-to-use hook for gating features
// ============================================

import { useCallback } from 'react';
import { usePremium } from '@/state/useAuthStore';

export function usePaywall() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<PremiumFeature>('hasUnlimitedPuzzles');
  const { canUseFeature, isPremium } = usePremium();
  
  const checkAccess = useCallback((feature: PremiumFeature): boolean => {
    if (isPremium) return true;
    if (canUseFeature(feature)) return true;
    
    setCurrentFeature(feature);
    setIsOpen(true);
    return false;
  }, [isPremium, canUseFeature]);
  
  const PaywallModal = useCallback(() => (
    <Paywall
      feature={currentFeature}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  ), [currentFeature, isOpen]);
  
  return {
    checkAccess,
    PaywallModal,
    isPaywallOpen: isOpen,
    closePaywall: () => setIsOpen(false),
  };
}

// ============================================
// INLINE UPGRADE PROMPT
// For showing upgrade prompts in-context
// ============================================

interface UpgradePromptProps {
  feature: PremiumFeature;
  variant?: 'card' | 'banner' | 'minimal';
  className?: string;
}

export function UpgradePrompt({ feature, variant = 'card', className = '' }: UpgradePromptProps) {
  const navigate = useNavigate();
  const message = UPSELL_MESSAGES[feature];
  
  if (variant === 'minimal') {
    return (
      <button
        onClick={() => navigate('/pricing')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 ${className}`}
        style={{ 
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          color: '#a855f7',
        }}
      >
        <span>✨</span>
        <span className="text-sm font-medium">Upgrade</span>
      </button>
    );
  }
  
  if (variant === 'banner') {
    return (
      <div 
        className={`flex items-center justify-between p-4 rounded-xl ${className}`}
        style={{ 
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.1))',
          border: '1px solid rgba(168, 85, 247, 0.2)',
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">✨</span>
          <div>
            <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>{message.title}</h4>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{message.description}</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/pricing')}
          className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
          style={{ background: '#a855f7', color: 'white' }}
        >
          Upgrade
        </button>
      </div>
    );
  }
  
  // Card variant (default)
  return (
    <div 
      className={`p-6 rounded-2xl text-center ${className}`}
      style={{ 
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.05))',
        border: '1px solid rgba(168, 85, 247, 0.2)',
      }}
    >
      <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center text-2xl"
        style={{ background: 'rgba(168, 85, 247, 0.2)' }}>
        ✨
      </div>
      <h3 className="text-lg font-display font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
        {message.title}
      </h3>
      <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
        {message.description}
      </p>
      <button
        onClick={() => navigate('/pricing')}
        className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
        style={{ 
          background: 'linear-gradient(135deg, #a855f7, #ec4899)',
          color: 'white',
        }}
      >
        Upgrade to Premium
      </button>
    </div>
  );
}










