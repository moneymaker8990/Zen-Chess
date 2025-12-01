import { useState, useEffect, useCallback } from 'react';
import type { BreathingPattern } from '@/lib/types';

interface MeditationPanelProps {
  title: string;
  steps: string[];
  purpose: string;
  duration?: number;
  breathingPattern?: BreathingPattern;
  onComplete?: () => void;
}

export function MeditationPanel({
  title,
  steps,
  purpose,
  duration = 5,
  breathingPattern,
  onComplete,
}: MeditationPanelProps) {
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdEmpty'>('inhale');

  // Timer effect
  useEffect(() => {
    if (!isActive || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeRemaining, onComplete]);

  // Breathing cycle effect
  useEffect(() => {
    if (!isActive || !breathingPattern) return;

    const { inhale, hold = 0, exhale, holdEmpty = 0 } = breathingPattern;
    const phases = [
      { phase: 'inhale' as const, duration: inhale },
      { phase: 'hold' as const, duration: hold },
      { phase: 'exhale' as const, duration: exhale },
      { phase: 'holdEmpty' as const, duration: holdEmpty },
    ].filter(p => p.duration > 0);

    let currentIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const nextPhase = () => {
      if (!isActive) return;
      
      const current = phases[currentIndex];
      setBreathPhase(current.phase);
      
      currentIndex = (currentIndex + 1) % phases.length;
      timeoutId = setTimeout(nextPhase, current.duration * 1000);
    };

    nextPhase();

    return () => clearTimeout(timeoutId);
  }, [isActive, breathingPattern]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const getBreathInstruction = () => {
    switch (breathPhase) {
      case 'inhale': return 'Breathe in...';
      case 'hold': return 'Hold gently...';
      case 'exhale': return 'Breathe out...';
      case 'holdEmpty': return 'Rest empty...';
    }
  };

  const handleStart = () => {
    setIsActive(true);
    setTimeRemaining(duration * 60);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-serif text-zen-200 mb-2">{title}</h3>
        <p className="text-zen-500 text-sm italic">{purpose}</p>
      </div>

      {/* Instructions - always visible as a guide */}
      <div className="space-y-4 mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-zen-800/60 text-zen-500 text-sm flex items-center justify-center">
              {index + 1}
            </span>
            <p className="text-zen-300 text-sm leading-relaxed pt-0.5">
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* Active meditation state */}
      {isActive && (
        <div className="mb-6 p-6 rounded-xl bg-zen-900/50 border border-zen-700/30">
          {/* Timer */}
          <div className="text-center mb-4">
            <div className="text-3xl font-mono text-gold-400/80">
              {formatTime(timeRemaining)}
            </div>
            <p className="text-zen-600 text-xs mt-1">remaining</p>
          </div>
          
          {/* Breathing guide */}
          {breathingPattern && (
            <div className="text-center">
              <div className={`relative w-28 h-28 mx-auto transition-transform duration-[4000ms] ease-in-out ${
                breathPhase === 'inhale' ? 'scale-110' :
                breathPhase === 'exhale' ? 'scale-90' :
                'scale-100'
              }`}>
                <div className="absolute inset-0 rounded-full border border-zen-600/40" />
                <div className="absolute inset-3 rounded-full border border-zen-600/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-zen-400 font-serif italic text-sm">
                    {getBreathInstruction()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Simple start/pause control */}
      {!isActive && timeRemaining > 0 && timeRemaining < duration * 60 ? (
        // Paused state
        <div className="flex gap-3">
          <button onClick={handleStart} className="zen-button flex-1">
            Resume
          </button>
          <button 
            onClick={() => setTimeRemaining(duration * 60)} 
            className="zen-button-ghost"
          >
            Reset
          </button>
        </div>
      ) : !isActive ? (
        // Not started
        <button onClick={handleStart} className="zen-button-primary w-full">
          Begin ({duration} min)
        </button>
      ) : (
        // Active
        <button onClick={handlePause} className="zen-button w-full">
          Pause
        </button>
      )}

      {/* Completion state */}
      {timeRemaining === 0 && (
        <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
          <p className="text-emerald-400 font-serif">
            ✓ Meditation Complete
          </p>
          <p className="text-zen-500 text-xs mt-1 italic">
            Carry this stillness into your practice.
          </p>
        </div>
      )}
    </div>
  );
}

export default MeditationPanel;
