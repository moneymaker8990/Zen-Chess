// ============================================
// INSIGHT ENGINE AGENT
// Deep pattern analysis - runs silently, surfaces gems
// ============================================

import type { Agent, AgentTrigger, AgentOrchestratorState, AgentMessage } from '../agentTypes';
import { AGENT_PERSONALITIES, createMessage } from '../agentTypes';

interface InsightMemory {
  lastAnalysis: number;
  discoveredInsights: string[];
  accuracyTrend: number[];
  timeOfDayPerformance: Record<string, number>;
  weeklyPatterns: Record<string, number>;
  currentStrengths: string[];
  currentWeaknesses: string[];
  breakthroughsPending: string[];
  lastBreakthrough: number;
}

export function createInsightEngineAgent(): Agent {
  let memory: InsightMemory = {
    lastAnalysis: 0,
    discoveredInsights: [],
    accuracyTrend: [],
    timeOfDayPerformance: {},
    weeklyPatterns: {},
    currentStrengths: [],
    currentWeaknesses: [],
    breakthroughsPending: [],
    lastBreakthrough: 0,
  };

  // Background analysis runs silently
  function runBackgroundAnalysis(): string | null {
    try {
      // Analyze coach data
      const coachData = localStorage.getItem('zen-chess-coach');
      if (!coachData) return null;
      
      const parsed = JSON.parse(coachData);
      const recentGames = parsed?.state?.state?.recentGames || [];
      
      if (recentGames.length < 5) return null;
      
      // Analyze accuracy trend
      const last10 = recentGames.slice(0, 10);
      const avgAccuracy = last10.reduce((sum: number, g: any) => sum + (g.accuracy?.overall || 0), 0) / last10.length;
      
      memory.accuracyTrend.push(avgAccuracy);
      if (memory.accuracyTrend.length > 20) memory.accuracyTrend.shift();
      
      // Detect improvement
      if (memory.accuracyTrend.length >= 10) {
        const firstHalf = memory.accuracyTrend.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
        const secondHalf = memory.accuracyTrend.slice(-5).reduce((a, b) => a + b, 0) / 5;
        
        if (secondHalf - firstHalf > 5) {
          return `Your accuracy has improved by ${(secondHalf - firstHalf).toFixed(1)}% over your last sessions. Keep building on this momentum.`;
        }
        
        if (firstHalf - secondHalf > 5) {
          return `I've noticed a slight dip in accuracy lately. This might indicate fatigue or distraction. Consider shorter, more focused sessions.`;
        }
      }
      
      // Analyze time patterns
      const timeGroups: Record<string, number[]> = {};
      recentGames.forEach((g: any) => {
        const time = g.timeOfDay || 'UNKNOWN';
        if (!timeGroups[time]) timeGroups[time] = [];
        timeGroups[time].push(g.accuracy?.overall || 0);
      });
      
      let bestTime = '';
      let bestAvg = 0;
      Object.entries(timeGroups).forEach(([time, accuracies]) => {
        const avg = accuracies.reduce((a, b) => a + b, 0) / accuracies.length;
        if (avg > bestAvg) {
          bestAvg = avg;
          bestTime = time;
        }
      });
      
      if (bestTime && !memory.discoveredInsights.includes(`best_time_${bestTime}`)) {
        memory.discoveredInsights.push(`best_time_${bestTime}`);
        const timeLabels: Record<string, string> = {
          EARLY_MORNING: 'early morning',
          MORNING: 'morning',
          AFTERNOON: 'afternoon',
          EVENING: 'evening',
          NIGHT: 'night',
          LATE_NIGHT: 'late night',
        };
        return `Discovery: Your sharpest play happens during ${timeLabels[bestTime] || bestTime}. Consider scheduling important games then.`;
      }
      
      // Analyze phase weaknesses
      const openingAvg = recentGames.reduce((s: number, g: any) => s + (g.accuracy?.opening || 0), 0) / recentGames.length;
      const middleAvg = recentGames.reduce((s: number, g: any) => s + (g.accuracy?.middlegame || 0), 0) / recentGames.length;
      const endgameAvg = recentGames.reduce((s: number, g: any) => s + (g.accuracy?.endgame || 0), 0) / recentGames.length;
      
      const phases = [
        { name: 'opening', avg: openingAvg },
        { name: 'middlegame', avg: middleAvg },
        { name: 'endgame', avg: endgameAvg },
      ].sort((a, b) => a.avg - b.avg);
      
      if (phases[2].avg - phases[0].avg > 15 && !memory.discoveredInsights.includes(`phase_gap_${phases[0].name}`)) {
        memory.discoveredInsights.push(`phase_gap_${phases[0].name}`);
        return `Significant finding: Your ${phases[0].name} needs work (${phases[0].avg.toFixed(0)}% accuracy) while your ${phases[2].name} is strong (${phases[2].avg.toFixed(0)}%). Focused training could add 50+ rating points.`;
      }
      
      return null;
    } catch {
      return null;
    }
  }

  return {
    id: 'insight-engine' as any,
    personality: {
      id: 'insight-engine' as any,
      name: 'Insight Engine',
      icon: '🔮',
      color: '#8b5cf6',
      voiceTone: 'analytical' as const,
      description: 'Discovers hidden patterns in your play',
    },

    initialize: () => {
      try {
        const saved = localStorage.getItem('zenChessInsightMemory');
        if (saved) memory = JSON.parse(saved);
      } catch {
        // Use defaults
      }
      
      // Run initial background analysis
      setTimeout(() => {
        runBackgroundAnalysis();
        saveMemory();
      }, 5000);
    },

    handleTrigger: (trigger: AgentTrigger, state: AgentOrchestratorState): AgentMessage | null => {
      switch (trigger.type) {
        case 'GAME_END': {
          // Silently update analysis
          const insight = runBackgroundAnalysis();
          saveMemory();
          
          // Only surface insights occasionally
          if (insight && Date.now() - memory.lastBreakthrough > 30 * 60 * 1000) {
            memory.lastBreakthrough = Date.now();
            saveMemory();
            
            return createMessage('coach', {
              title: '🔮 Pattern Discovered',
              body: insight,
              category: 'insight',
              priority: 'normal',
              showAsToast: true,
            });
          }
          return null;
        }

        case 'SESSION_START': {
          // Run background analysis silently
          runBackgroundAnalysis();
          saveMemory();
          return null;
        }

        default:
          return null;
      }
    },

    getProactiveMessage: (state: AgentOrchestratorState): AgentMessage | null => {
      // Periodically surface an insight
      if (Date.now() - memory.lastAnalysis > 2 * 60 * 60 * 1000) {
        memory.lastAnalysis = Date.now();
        const insight = runBackgroundAnalysis();
        saveMemory();
        
        if (insight) {
          return createMessage('coach', {
            title: '🔮 Insight',
            body: insight,
            category: 'insight',
            priority: 'low',
            showAsToast: false,
          });
        }
      }
      return null;
    },

    getMemory: () => memory as unknown as Record<string, unknown>,
    setMemory: (m) => {
      memory = m as unknown as InsightMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 60,
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessInsightMemory', JSON.stringify(memory));
    } catch {
      // Storage full or unavailable
    }
  }
}








