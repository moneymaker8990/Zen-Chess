import { useState, useCallback, useRef } from 'react';
import type { TiltLevel } from '@/lib/types';

// ============================================
// GENTLE AWARENESS SYSTEM
// Supportive, not judgmental
// ============================================

interface TiltMetrics {
  moveTimes: number[];
  averageMoveTime: number;
  blunderCount: number;
  consecutiveFastMoves: number;
  lastMoveTime: number;
}

interface TiltState {
  level: TiltLevel;
  score: number;
  triggers: string[];
  interventionRequired: boolean;
  interventionType: 'NONE' | 'GENTLE_REMINDER' | 'BREATHE' | 'PAUSE' | 'BREAK';
}

// More forgiving thresholds
const FAST_MOVE_THRESHOLD = 1500;      // Under 1.5 seconds
const VERY_FAST_THRESHOLD = 800;       // Under 0.8 seconds
const BLUNDER_TILT_INCREASE = 10;      // Reduced from 15
const FAST_MOVE_TILT_INCREASE = 3;     // Reduced from 5
const TILT_DECAY_RATE = 5;             // Faster decay (was 2)

export function useTiltDetection() {
  const [enabled, setEnabled] = useState(true);
  const [tiltState, setTiltState] = useState<TiltState>({
    level: 'CALM',
    score: 0,
    triggers: [],
    interventionRequired: false,
    interventionType: 'NONE',
  });

  const metricsRef = useRef<TiltMetrics>({
    moveTimes: [],
    averageMoveTime: 10000,
    blunderCount: 0,
    consecutiveFastMoves: 0,
    lastMoveTime: Date.now(),
  });

  const interventionShownRef = useRef(false);

  const scoreToLevel = (score: number): TiltLevel => {
    if (score < 25) return 'CALM';
    if (score < 50) return 'MILD';
    if (score < 75) return 'MODERATE';
    return 'HIGH';
  };

  // Gentler intervention thresholds - only intervene at higher levels
  const getInterventionType = (score: number): TiltState['interventionType'] => {
    if (score < 50) return 'NONE';              // No intervention for mild
    if (score < 65) return 'GENTLE_REMINDER';   // Just a soft nudge
    if (score < 80) return 'BREATHE';           // Breathing suggested
    if (score < 90) return 'PAUSE';             // Short pause
    return 'BREAK';                              // Suggest break
  };

  const recordMove = useCallback((moveTimeMs: number, wasBlunder: boolean = false) => {
    if (!enabled) return;

    const metrics = metricsRef.current;
    const triggers: string[] = [];
    let scoreChange = 0;

    // Track move time
    metrics.moveTimes.push(moveTimeMs);
    if (metrics.moveTimes.length > 20) {
      metrics.moveTimes.shift();
    }

    metrics.averageMoveTime = metrics.moveTimes.reduce((a, b) => a + b, 0) / metrics.moveTimes.length;

    // Check for fast moves - more forgiving
    if (moveTimeMs < VERY_FAST_THRESHOLD) {
      metrics.consecutiveFastMoves++;
      scoreChange += FAST_MOVE_TILT_INCREASE * 1.5;
      if (metrics.consecutiveFastMoves >= 4) { // More moves needed to trigger
        triggers.push('Pattern of rushed moves');
      }
    } else if (moveTimeMs < FAST_MOVE_THRESHOLD) {
      metrics.consecutiveFastMoves++;
      scoreChange += FAST_MOVE_TILT_INCREASE;
    } else {
      // Good pace - faster decay
      metrics.consecutiveFastMoves = 0;
      scoreChange -= TILT_DECAY_RATE;
    }

    // Blunders - gentler response
    if (wasBlunder) {
      metrics.blunderCount++;
      scoreChange += BLUNDER_TILT_INCREASE;
      if (metrics.blunderCount >= 3) {
        triggers.push('Blunder detected');
      }
    }

    metrics.lastMoveTime = Date.now();

    setTiltState(prev => {
      const newScore = Math.max(0, Math.min(100, prev.score + scoreChange));
      const newLevel = scoreToLevel(newScore);
      const interventionType = getInterventionType(newScore);
      
      // Only require intervention at MODERATE or HIGH, and only once per session
      const shouldIntervene = 
        interventionType !== 'NONE' && 
        interventionType !== 'GENTLE_REMINDER' &&
        !interventionShownRef.current &&
        (newLevel === 'MODERATE' || newLevel === 'HIGH');

      return {
        level: newLevel,
        score: newScore,
        triggers: triggers.length > 0 ? triggers : prev.triggers,
        interventionRequired: shouldIntervene,
        interventionType,
      };
    });
  }, [enabled]);

  const recordImpulseClick = useCallback(() => {
    if (!enabled) return;
    // Gentle - just a small nudge, no trigger message
    setTiltState(prev => {
      const newScore = Math.min(100, prev.score + 1);
      return {
        ...prev,
        score: newScore,
        level: scoreToLevel(newScore),
      };
    });
  }, [enabled]);

  const completeIntervention = useCallback(() => {
    interventionShownRef.current = true;
    setTiltState(prev => ({
      ...prev,
      score: Math.max(0, prev.score - 30), // Bigger reduction after intervention
      level: scoreToLevel(Math.max(0, prev.score - 30)),
      interventionRequired: false,
    }));

    // Reset intervention flag after 5 minutes
    setTimeout(() => {
      interventionShownRef.current = false;
    }, 300000);
  }, []);

  const reportTilt = useCallback((level: TiltLevel) => {
    if (!enabled) return;
    
    const scoreMap: Record<TiltLevel, number> = {
      CALM: 0,
      MILD: 30,
      MODERATE: 55,
      HIGH: 80,
    };

    setTiltState(prev => {
      const newScore = Math.max(prev.score, scoreMap[level]);
      const interventionType = getInterventionType(newScore);
      
      return {
        level,
        score: newScore,
        triggers: level !== 'CALM' ? ['Self-check'] : [],
        interventionRequired: level === 'HIGH' && !interventionShownRef.current,
        interventionType,
      };
    });
  }, [enabled]);

  const resetSession = useCallback(() => {
    metricsRef.current = {
      moveTimes: [],
      averageMoveTime: 10000,
      blunderCount: 0,
      consecutiveFastMoves: 0,
      lastMoveTime: Date.now(),
    };
    interventionShownRef.current = false;
    
    setTiltState({
      level: 'CALM',
      score: 0,
      triggers: [],
      interventionRequired: false,
      interventionType: 'NONE',
    });
  }, []);

  const toggleEnabled = useCallback((value: boolean) => {
    setEnabled(value);
    if (!value) {
      // Reset when disabling
      setTiltState({
        level: 'CALM',
        score: 0,
        triggers: [],
        interventionRequired: false,
        interventionType: 'NONE',
      });
    }
  }, []);

  return {
    tiltState,
    enabled,
    toggleEnabled,
    recordMove,
    recordImpulseClick,
    reportTilt,
    completeIntervention,
    resetSession,
  };
}

export default useTiltDetection;
