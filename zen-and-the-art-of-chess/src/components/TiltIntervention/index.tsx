import { useState, useEffect } from 'react';
import type { TiltLevel, Tradition } from '@/lib/types';

// ============================================
// GENTLE INTERVENTION
// Supportive pause, not punishment
// ============================================

interface TiltInterventionProps {
  level: TiltLevel;
  triggers: string[];
  interventionType: 'GENTLE_REMINDER' | 'BREATHE' | 'PAUSE' | 'BREAK';
  tradition?: Tradition;
  onComplete: () => void;
  onExit?: () => void;
}

const wisdom: Record<Tradition, string> = {
  VIJNANA: 'The awareness that sees this moment is completely still.',
  TAO: 'The river does not fight the rocks. It flows around them.',
  UPANISHADS: 'You are the witness, not the storm.',
  GITA: 'Do your part. Release the outcome.',
  ASHTAVAKRA: 'You are already free.',
  YOGA_SUTRAS: 'Return gently to the breath.',
  SHIVA_SUTRAS: 'Rest in the space between thoughts.',
  ZEN: 'Just this. Just here.',
  STOIC: 'Control what you can. Accept what you cannot.',
  ART_OF_WAR: 'Patience is the greatest strength.',
};

export function TiltIntervention({
  level: _level,
  interventionType,
  tradition = 'TAO',
  onComplete,
  onExit,
}: TiltInterventionProps) {
  const [breathCount, setBreathCount] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [canContinue, setCanContinue] = useState(interventionType === 'GENTLE_REMINDER');

  const requiredBreaths = interventionType === 'BREATHE' ? 3 : 
                          interventionType === 'PAUSE' ? 5 : 3;

  // Breathing cycle
  useEffect(() => {
    if (interventionType === 'GENTLE_REMINDER' || canContinue) return;

    const phases: Array<{ phase: 'inhale' | 'hold' | 'exhale'; duration: number }> = [
      { phase: 'inhale', duration: 4000 },
      { phase: 'hold', duration: 2000 },
      { phase: 'exhale', duration: 4000 },
    ];
    let currentIndex = 0;

    const cycle = () => {
      const currentPhase = phases[currentIndex];
      setBreathPhase(currentPhase.phase);
      
      currentIndex++;
      if (currentIndex >= phases.length) {
        currentIndex = 0;
        setBreathCount(prev => {
          const newCount = prev + 1;
          if (newCount >= requiredBreaths) {
            setCanContinue(true);
          }
          return newCount;
        });
      }
    };

    cycle();
    const interval = setInterval(cycle, currentIndex === 1 ? 2000 : 4000);
    return () => clearInterval(interval);
  }, [interventionType, requiredBreaths, canContinue]);

  const getBreathInstruction = () => {
    switch (breathPhase) {
      case 'inhale': return 'Breathe in...';
      case 'hold': return 'Hold gently...';
      case 'exhale': return 'Let go...';
    }
  };

  // Gentle reminder - just a soft overlay
  if (interventionType === 'GENTLE_REMINDER') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-zen-950/80 backdrop-blur-sm animate-fade-in">
        <div className="max-w-md w-full mx-4 p-8 rounded-2xl bg-zen-900/90 border border-zen-700/30 text-center">
          <p className="text-zen-400 text-sm mb-4">A gentle reminder</p>
          
          <blockquote className="text-xl font-serif text-zen-200 italic leading-relaxed mb-6">
            "{wisdom[tradition]}"
          </blockquote>

          <button
            onClick={onComplete}
            className="zen-button"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Break suggestion
  if (interventionType === 'BREAK') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-zen-950/90 backdrop-blur-md animate-fade-in">
        <div className="max-w-md w-full mx-4 p-8 rounded-2xl bg-zen-900/90 border border-zen-700/30 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-zen-800/50 flex items-center justify-center">
            <span className="text-2xl">☯</span>
          </div>

          <h2 className="text-xl font-serif text-zen-200 mb-3">
            Time for a pause?
          </h2>
          
          <p className="text-zen-400 text-sm mb-6">
            Your body and mind may benefit from stepping away for a few minutes. 
            There's no rush. The board will be here.
          </p>

          <div className="space-y-3">
            <button
              onClick={onExit}
              className="w-full py-3 rounded-lg bg-zen-800/50 text-zen-300 hover:bg-zen-700/50 transition-colors"
            >
              Take a break
            </button>
            <button
              onClick={onComplete}
              className="w-full py-2 text-zen-500 text-sm hover:text-zen-400"
            >
              I'd like to continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Breathing intervention
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zen-950/90 backdrop-blur-md animate-fade-in">
      <div className="max-w-md w-full mx-4 p-8 rounded-2xl bg-zen-900/90 border border-zen-700/30 text-center">
        
        {!canContinue ? (
          <>
            <p className="text-zen-500 text-sm mb-2">
              Take a moment
            </p>
            <p className="text-zen-400 text-xs mb-8">
              {requiredBreaths - breathCount} breaths remaining
            </p>

            {/* Breathing circle */}
            <div className={`relative w-40 h-40 mx-auto mb-8 transition-transform duration-[4000ms] ease-in-out ${
              breathPhase === 'inhale' ? 'scale-110' : 
              breathPhase === 'exhale' ? 'scale-90' : 'scale-100'
            }`}>
              <div className="absolute inset-0 rounded-full border border-zen-600/30" />
              <div className="absolute inset-4 rounded-full border border-zen-600/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-zen-300 font-serif">
                  {getBreathInstruction()}
                </span>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2">
              {Array.from({ length: requiredBreaths }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i < breathCount ? 'bg-zen-400' : 'bg-zen-700'
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <span className="text-emerald-400/70 text-xl">✓</span>
            </div>

            <blockquote className="text-lg font-serif text-zen-200 italic leading-relaxed mb-6">
              "{wisdom[tradition]}"
            </blockquote>

            <button
              onClick={onComplete}
              className="zen-button"
            >
              Continue with awareness
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TiltIntervention;
