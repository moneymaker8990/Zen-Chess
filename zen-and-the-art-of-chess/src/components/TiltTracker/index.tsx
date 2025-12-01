import { useState, useCallback } from 'react';
import type { TiltLevel, Tradition } from '@/lib/types';

// ============================================
// MINDFUL AWARENESS CHECK
// A gentle, supportive tool — not a judgment
// ============================================

const reframes: Record<Tradition, string[]> = {
  VIJNANA: [
    "The awareness that notices tension is not itself tense.",
    "Whatever arises, you are the space that holds it.",
  ],
  TAO: [
    "When you notice rushing, that noticing is stillness.",
    "The river does not hurry, yet it reaches the sea.",
  ],
  UPANISHADS: [
    "You are not the agitation. You are the witness.",
    "The Self remains untouched by the game.",
  ],
  GITA: [
    "You have the right to action, never to its fruits.",
    "Do your part with an even mind.",
  ],
  ASHTAVAKRA: [
    "You are already free. Nothing can bind you.",
    "Rest in your natural state.",
  ],
  YOGA_SUTRAS: [
    "The mind's fluctuations can be stilled.",
    "Return gently to the breath.",
  ],
  SHIVA_SUTRAS: [
    "Consciousness plays all roles. Enjoy the dance.",
    "Bliss is in the awareness, not the outcome.",
  ],
  ZEN: [
    "Just this moment. Just this move.",
    "Before thinking, what is this?",
  ],
  STOIC: [
    "Focus only on what you can control.",
    "This moment is enough.",
  ],
  ART_OF_WAR: [
    "Patience is the greatest weapon.",
    "Victory comes to those who wait.",
  ],
};

interface TiltTrackerProps {
  currentTradition?: Tradition;
  currentTilt: TiltLevel;
  tiltScore: number;
  autoTriggers?: string[];
  onTiltReport: (level: TiltLevel) => void;
  enabled?: boolean;
  onToggle?: (enabled: boolean) => void;
}

export function TiltTracker({ 
  currentTradition = 'TAO',
  currentTilt,
  tiltScore,
  autoTriggers = [],
  onTiltReport: _onTiltReport,
  enabled = true,
  onToggle,
}: TiltTrackerProps) {
  const [showReframe, setShowReframe] = useState(false);
  const [currentReframe, setCurrentReframe] = useState('');

  const getRandomReframe = useCallback((tradition: Tradition) => {
    const traditionReframes = reframes[tradition];
    return traditionReframes[Math.floor(Math.random() * traditionReframes.length)];
  }, []);

  const handleCheckIn = useCallback(() => {
    setCurrentReframe(getRandomReframe(currentTradition));
    setShowReframe(true);
  }, [currentTradition, getRandomReframe]);

  // If disabled, show minimal toggle
  if (!enabled) {
    return (
      <div className="glass-card-subtle p-4">
        <div className="flex items-center justify-between">
          <span className="text-zen-500 text-sm">Mindful Awareness</span>
          <button
            onClick={() => onToggle?.(true)}
            className="text-xs text-zen-600 hover:text-zen-400 transition-colors"
          >
            Enable
          </button>
        </div>
      </div>
    );
  }

  // Gentle awareness states
  const awarenessStates = {
    CALM: { 
      label: 'Present', 
      color: 'text-emerald-400/70',
      message: 'You are here.',
    },
    MILD: { 
      label: 'Notice', 
      color: 'text-zen-400',
      message: 'A gentle reminder to breathe.',
    },
    MODERATE: { 
      label: 'Pause', 
      color: 'text-amber-400/70',
      message: 'Consider taking a breath.',
    },
    HIGH: { 
      label: 'Rest', 
      color: 'text-rose-400/70',
      message: 'Your body may need a break.',
    },
  };

  const currentState = awarenessStates[currentTilt];

  return (
    <div className="glass-card-subtle p-5 animate-fade-in">
      {/* Header with toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-zen-400 font-medium">
          Mindful Awareness
        </h3>
        <button
          onClick={() => onToggle?.(false)}
          className="text-xs text-zen-600 hover:text-zen-400 transition-colors"
        >
          Hide
        </button>
      </div>

      {/* Gentle state indicator - no numbers, just presence */}
      <div className="text-center py-3">
        <div className={`text-lg font-serif ${currentState.color}`}>
          {currentState.label}
        </div>
        <p className="text-zen-500 text-xs mt-1 italic">
          {currentState.message}
        </p>
      </div>

      {/* Soft awareness nudge - only if there's something to notice */}
      {autoTriggers.length > 0 && tiltScore > 30 && (
        <div className="mt-4 p-3 rounded-lg bg-zen-800/30 border border-zen-700/20">
          <p className="text-zen-500 text-xs text-center">
            {autoTriggers[0] === 'Impulsive move (under 1 second)' 
              ? 'Moving quickly today. That\'s okay.'
              : autoTriggers[0] === 'Pattern of rushed moves'
              ? 'Notice the pace. No judgment.'
              : autoTriggers[0] === 'Blunder detected'
              ? 'A difficult moment. Breathe.'
              : 'Awareness is arising.'}
          </p>
        </div>
      )}

      {/* Check-in button */}
      <button
        onClick={handleCheckIn}
        className="w-full mt-4 py-2 text-sm text-zen-400 hover:text-zen-300 transition-colors"
      >
        ☯ Moment of stillness
      </button>

      {/* Wisdom reframe */}
      {showReframe && (
        <div className="mt-4 pt-4 border-t border-zen-700/20">
          <blockquote className="text-zen-300 font-serif italic text-sm text-center leading-relaxed">
            "{currentReframe}"
          </blockquote>
          <button
            onClick={() => setShowReframe(false)}
            className="w-full mt-3 text-xs text-zen-600 hover:text-zen-500"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default TiltTracker;
