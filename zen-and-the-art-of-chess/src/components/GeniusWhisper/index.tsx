// ============================================
// GENIUS WHISPER COMPONENT
// Non-intrusive AI tips that appear contextually
// ============================================

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChessGenius } from '@/hooks/useChessGenius';
import { useCoachStore } from '@/state/coachStore';
import type { GeniusWhisper as WhisperType } from '@/lib/chessGenius';

interface GeniusWhisperProps {
  /** Current activity context */
  activity?: 'puzzle' | 'game' | 'opening' | 'study' | 'idle';
  /** Current position FEN (optional, for position-aware whispers) */
  position?: string;
  /** Recent events for context */
  recentEvents?: string[];
  /** Whether to show whispers (respects user preference) */
  enabled?: boolean;
  /** Position on screen */
  position_screen?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
  /** Custom class name */
  className?: string;
}

const WHISPER_ICONS: Record<WhisperType['type'], string> = {
  tip: '💡',
  encouragement: '✨',
  warning: '⚡',
  insight: '🔮',
  question: '🤔',
};

const WHISPER_COLORS: Record<WhisperType['type'], { bg: string; border: string; text: string }> = {
  tip: { bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.3)', text: '#fbbf24' },
  encouragement: { bg: 'rgba(74, 222, 128, 0.1)', border: 'rgba(74, 222, 128, 0.3)', text: '#4ade80' },
  warning: { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', text: '#ef4444' },
  insight: { bg: 'rgba(139, 92, 246, 0.1)', border: 'rgba(139, 92, 246, 0.3)', text: '#8b5cf6' },
  question: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', text: '#3b82f6' },
};

const POSITION_CLASSES: Record<NonNullable<GeniusWhisperProps['position_screen']>, string> = {
  'top-right': 'top-4 right-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-left': 'top-4 left-4',
};

export function GeniusWhisper({
  activity = 'idle',
  position,
  recentEvents = [],
  enabled = true,
  position_screen = 'bottom-right',
  className = '',
}: GeniusWhisperProps) {
  const [whisper, setWhisper] = useState<WhisperType | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  const { currentWhisper, dismissWhisper } = useChessGenius({ autoWhisper: enabled });
  const coachState = useCoachStore((s) => s.state);
  
  // Sync with hook's whisper
  useEffect(() => {
    if (currentWhisper && enabled) {
      setWhisper(currentWhisper);
      setIsDismissed(false);
    }
  }, [currentWhisper, enabled]);
  
  // Auto-dismiss after delay
  useEffect(() => {
    if (!whisper || isDismissed) return;
    
    const timeout = setTimeout(() => {
      if (whisper.priority === 'low') {
        setIsDismissed(true);
      }
    }, whisper.priority === 'high' ? 15000 : 8000);
    
    return () => clearTimeout(timeout);
  }, [whisper, isDismissed]);
  
  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
    dismissWhisper();
    setTimeout(() => setWhisper(null), 300);
  }, [dismissWhisper]);
  
  const handleAction = useCallback(() => {
    // Could navigate or trigger action based on whisper.actionable
    console.log('Whisper action:', whisper?.actionable);
    handleDismiss();
  }, [whisper, handleDismiss]);
  
  if (!enabled || !whisper || isDismissed) return null;
  
  const colors = WHISPER_COLORS[whisper.type];
  const icon = WHISPER_ICONS[whisper.type];
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`fixed ${POSITION_CLASSES[position_screen]} z-50 max-w-sm ${className}`}
      >
        <div
          className="rounded-2xl backdrop-blur-xl shadow-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: colors.bg,
            border: `1px solid ${colors.border}`,
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Compact View */}
          <div className="flex items-start gap-3 p-4">
            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-2xl flex-shrink-0"
            >
              {icon}
            </motion.div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <p 
                className="text-sm font-medium leading-relaxed"
                style={{ color: 'var(--text-primary)' }}
              >
                {whisper.content}
              </p>
              
              {/* Expanded content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t"
                    style={{ borderColor: colors.border }}
                  >
                    {whisper.actionable && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction();
                        }}
                        className="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                        style={{ 
                          background: colors.bg,
                          color: colors.text,
                          border: `1px solid ${colors.border}`,
                        }}
                      >
                        {whisper.actionable}
                      </button>
                    )}
                    
                    <p 
                      className="text-xs mt-2 opacity-60"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {whisper.context}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Dismiss button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDismiss();
              }}
              className="flex-shrink-0 p-1 rounded-full opacity-50 hover:opacity-100 transition-opacity"
              style={{ color: 'var(--text-muted)' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Priority indicator */}
          {whisper.priority === 'high' && (
            <div 
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse"
              style={{ background: colors.text }}
            />
          )}
        </div>
        
        {/* Expand hint */}
        {!isExpanded && whisper.actionable && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="text-xs text-center mt-1"
            style={{ color: 'var(--text-muted)' }}
          >
            Click to expand
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================
// INLINE WHISPER (for embedding in content)
// ============================================

interface InlineWhisperProps {
  type: WhisperType['type'];
  content: string;
  onDismiss?: () => void;
  className?: string;
}

export function InlineWhisper({ type, content, onDismiss, className = '' }: InlineWhisperProps) {
  const colors = WHISPER_COLORS[type];
  const icon = WHISPER_ICONS[type];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex items-start gap-3 p-4 rounded-xl ${className}`}
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
      }}
    >
      <span className="text-xl">{icon}</span>
      <p className="text-sm flex-1" style={{ color: 'var(--text-primary)' }}>
        {content}
      </p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 opacity-50 hover:opacity-100 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </motion.div>
  );
}

export default GeniusWhisper;






