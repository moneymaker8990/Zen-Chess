// ============================================
// AI AMBIENCE COMPONENTS
// Subtle, non-intrusive AI presence throughout the app
// No popups - just ambient intelligence indicators
// ============================================

import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  useAIIntelligence, 
  usePredictiveNavigation,
  useSessionMomentum,
  useFlowState,
} from '@/lib/aiIntelligence';

// ============================================
// SUBTLE MOMENTUM INDICATOR
// A tiny visual that shows session momentum
// ============================================

export function MomentumIndicator() {
  const momentum = useSessionMomentum();
  const isInFlow = useFlowState();
  
  // Don't show anything at low momentum - invisible by default
  if (momentum === 'low') return null;
  
  const colors = {
    building: 'rgba(251, 191, 36, 0.6)', // Amber
    peak: 'rgba(74, 222, 128, 0.8)', // Green
    cooling: 'rgba(156, 163, 175, 0.5)', // Gray
    low: 'transparent',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed bottom-4 left-4 z-40 pointer-events-none"
    >
      <div className="flex items-center gap-2">
        {/* Pulsing dot for flow state */}
        {isInFlow && (
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-2 h-2 rounded-full"
            style={{ background: colors.peak }}
          />
        )}
        
        {/* Momentum bar - very subtle */}
        <div 
          className="h-1 rounded-full transition-all duration-1000"
          style={{ 
            width: momentum === 'peak' ? 32 : momentum === 'building' ? 24 : 16,
            background: colors[momentum],
          }}
        />
      </div>
    </motion.div>
  );
}

// ============================================
// PREDICTIVE NAV HINT
// Subtle suggestion for next action
// Only shows when AI is confident
// ============================================

export function PredictiveNavHint() {
  const navigate = useNavigate();
  const location = useLocation();
  const prediction = usePredictiveNavigation();
  const [dismissed, setDismissed] = useState(false);
  const [lastPath, setLastPath] = useState(location.pathname);
  
  // Reset dismissed state on navigation
  useEffect(() => {
    if (location.pathname !== lastPath) {
      setDismissed(false);
      setLastPath(location.pathname);
    }
  }, [location.pathname, lastPath]);
  
  // Don't show if dismissed or no prediction or low confidence
  if (dismissed || !prediction || prediction.confidence < 0.6) return null;
  
  // Don't show on the predicted destination
  if (location.pathname === prediction.destination) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-20 right-4 z-40"
      >
        <button
          onClick={() => navigate(prediction.destination)}
          className="group flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm transition-all hover:scale-[1.02]"
          style={{ 
            background: 'rgba(139, 92, 246, 0.1)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
          }}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            style={{ background: 'rgba(139, 92, 246, 0.2)' }}>
            ✨
          </div>
          <div className="text-left">
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Suggested next
            </div>
            <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {prediction.reason}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDismissed(true);
            }}
            className="p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: 'var(--text-muted)' }}
          >
            ✕
          </button>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================
// SMART BREAK REMINDER
// Appears only when truly needed, very subtle
// ============================================

export function SmartBreakReminder() {
  const { shouldSuggestBreak, session, patterns } = useAIIntelligence();
  const [dismissed, setDismissed] = useState(false);
  const [lastDismissTime, setLastDismissTime] = useState(0);
  
  const shouldShow = useMemo(() => {
    // Don't show if dismissed recently (within 10 minutes)
    if (Date.now() - lastDismissTime < 600000) return false;
    
    // Only show if AI really thinks we need a break
    return shouldSuggestBreak() && session.minutesActive > 20;
  }, [shouldSuggestBreak, session.minutesActive, lastDismissTime]);
  
  if (!shouldShow || dismissed) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
      >
        <div 
          className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm"
          style={{ 
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
          }}
        >
          <span className="text-base">☕</span>
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {session.minutesActive}+ minutes strong. Short break?
          </span>
          <button
            onClick={() => {
              setDismissed(true);
              setLastDismissTime(Date.now());
            }}
            className="text-xs px-2 py-1 rounded-full transition-colors hover:bg-white/10"
            style={{ color: 'var(--text-muted)' }}
          >
            Later
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================
// AI CONFIDENCE INDICATOR
// Shows how well AI knows the user (very subtle)
// ============================================

export function AIConfidenceIndicator() {
  const { confidenceLevel, totalInteractions } = useAIIntelligence();
  
  // Only show after some interactions, and briefly
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Show briefly when confidence level changes
    if (totalInteractions > 10 && totalInteractions % 50 === 0) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [totalInteractions, confidenceLevel]);
  
  if (!visible) return null;
  
  const messages = {
    learning: 'AI is learning your style...',
    developing: 'AI is getting to know you better',
    confident: 'AI is tuned to your playstyle',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-4 right-4 z-30 pointer-events-none"
    >
      <div 
        className="text-xs px-3 py-1.5 rounded-full"
        style={{ 
          background: 'rgba(139, 92, 246, 0.1)',
          color: 'var(--text-muted)',
        }}
      >
        {messages[confidenceLevel]}
      </div>
    </motion.div>
  );
}

// ============================================
// ACTIVITY TRANSITION SUGGESTION
// When AI detects declining performance, subtle switch suggestion
// ============================================

export function ActivityTransitionHint() {
  const navigate = useNavigate();
  const location = useLocation();
  const { shouldSuggestActivityChange, session } = useAIIntelligence();
  const [dismissed, setDismissed] = useState(false);
  
  const suggestion = useMemo(() => {
    if (dismissed) return null;
    return shouldSuggestActivityChange();
  }, [shouldSuggestActivityChange, dismissed]);
  
  // Reset on location change
  useEffect(() => {
    setDismissed(false);
  }, [location.pathname]);
  
  if (!suggestion || session.accuracyTrend !== 'declining') return null;
  
  const routes: Record<string, string> = {
    study: '/study',
    game: '/play',
    puzzle: '/train',
    opening: '/openings',
    review: '/spaced-repetition',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40"
    >
      <button
        onClick={() => routes[suggestion] && navigate(routes[suggestion])}
        className="p-3 rounded-xl backdrop-blur-sm transition-all hover:scale-105"
        style={{ 
          background: 'rgba(251, 191, 36, 0.1)',
          border: '1px solid rgba(251, 191, 36, 0.2)',
        }}
      >
        <div className="text-center">
          <div className="text-xl mb-1">💡</div>
          <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            Try {suggestion}?
          </div>
        </div>
      </button>
      <button
        onClick={() => setDismissed(true)}
        className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
        style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
      >
        ✕
      </button>
    </motion.div>
  );
}

// ============================================
// MASTER AMBIENT AI COMPONENT
// Combines all ambient AI features
// ============================================

export function AIAmbience() {
  const { smartPacingEnabled, predictiveNavigationEnabled } = useAIIntelligence();
  
  return (
    <>
      {/* Momentum indicator - always visible when momentum is building */}
      <MomentumIndicator />
      
      {/* Predictive navigation - when AI is confident about next step */}
      {predictiveNavigationEnabled && <PredictiveNavHint />}
      
      {/* Smart break reminder - only when truly needed */}
      {smartPacingEnabled && <SmartBreakReminder />}
      
      {/* Activity transition hints - when struggling */}
      {smartPacingEnabled && <ActivityTransitionHint />}
      
      {/* Confidence indicator - shows briefly as AI learns */}
      <AIConfidenceIndicator />
    </>
  );
}

export default AIAmbience;









