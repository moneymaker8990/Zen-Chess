// ============================================
// LEGEND CURATOR AGENT
// Recommends master games based on your needs
// ============================================

import type { Agent, AgentTrigger, AgentOrchestratorState, AgentMessage } from '../agentTypes';
import { createMessage } from '../agentTypes';

interface LegendMemory {
  legendsStudied: string[];
  lastLegendStudy: number;
  preferredLegend: string | null;
  gamesWatched: number;
  recommendationHistory: string[];
  userWeaknesses: string[];
}

const LEGENDS_BY_STRENGTH: Record<string, { name: string; specialty: string; forWeakness: string[] }> = {
  'tal': { 
    name: 'Mikhail Tal', 
    specialty: 'Tactical brilliance and sacrifices',
    forWeakness: ['tactical', 'attacking', 'sacrifices'],
  },
  'capablanca': { 
    name: 'José Capablanca', 
    specialty: 'Endgame technique and simplicity',
    forWeakness: ['endgame', 'technique', 'simplification'],
  },
  'fischer': { 
    name: 'Bobby Fischer', 
    specialty: 'Perfect preparation and clarity',
    forWeakness: ['opening', 'preparation', 'accuracy'],
  },
  'kasparov': { 
    name: 'Garry Kasparov', 
    specialty: 'Dynamic attacking play',
    forWeakness: ['attacking', 'dynamics', 'initiative'],
  },
  'karpov': { 
    name: 'Anatoly Karpov', 
    specialty: 'Positional squeeze and prophylaxis',
    forWeakness: ['positional', 'prophylaxis', 'defense'],
  },
  'carlsen': { 
    name: 'Magnus Carlsen', 
    specialty: 'Universal style and grinding',
    forWeakness: ['endgame', 'technique', 'grinding'],
  },
  'alekhine': {
    name: 'Alexander Alekhine',
    specialty: 'Combinative genius',
    forWeakness: ['tactical', 'combinations', 'attacking'],
  },
  'petrosian': {
    name: 'Tigran Petrosian',
    specialty: 'Prophylaxis master',
    forWeakness: ['defense', 'prophylaxis', 'exchanges'],
  },
};

export function createLegendCuratorAgent(): Agent {
  let memory: LegendMemory = {
    legendsStudied: [],
    lastLegendStudy: 0,
    preferredLegend: null,
    gamesWatched: 0,
    recommendationHistory: [],
    userWeaknesses: [],
  };

  function getRecommendedLegend(): { legend: string; reason: string } | null {
    // Analyze user weaknesses from various sources
    try {
      const coachData = localStorage.getItem('zen-chess-coach');
      if (coachData) {
        const parsed = JSON.parse(coachData);
        const profile = parsed?.state?.state?.emotionalProfile?.chessProfile;
        
        if (profile) {
          const weakness = profile.weakestPhase?.toLowerCase() || '';
          
          // Match weakness to legend
          for (const [legendId, legend] of Object.entries(LEGENDS_BY_STRENGTH)) {
            if (legend.forWeakness.some(w => weakness.includes(w))) {
              if (!memory.recommendationHistory.slice(-3).includes(legendId)) {
                return {
                  legend: legendId,
                  reason: `${legend.name} is perfect for improving your ${weakness}. Study: ${legend.specialty}.`,
                };
              }
            }
          }
        }
      }
    } catch {
      // Silently fail
    }
    
    // Default recommendation rotation
    const legends = Object.keys(LEGENDS_BY_STRENGTH);
    const unrecommended = legends.filter(l => !memory.recommendationHistory.slice(-5).includes(l));
    const pick = unrecommended.length > 0 
      ? unrecommended[Math.floor(Math.random() * unrecommended.length)]
      : legends[Math.floor(Math.random() * legends.length)];
    
    const legend = LEGENDS_BY_STRENGTH[pick];
    return {
      legend: pick,
      reason: `Today's recommendation: ${legend.name}. ${legend.specialty}.`,
    };
  }

  return {
    id: 'legend' as any,
    personality: {
      id: 'legend' as any,
      name: 'Legend Curator',
      icon: '👑',
      color: '#eab308',
      voiceTone: 'warm' as const,
      description: 'Recommends master games for your growth',
    },

    initialize: () => {
      try {
        const saved = localStorage.getItem('zenChessLegendMemory');
        if (saved) memory = JSON.parse(saved);
      } catch {
        // Use defaults
      }
    },

    handleTrigger: (trigger: AgentTrigger, state: AgentOrchestratorState): AgentMessage | null => {
      switch (trigger.type) {
        case 'PAGE_ENTER': {
          if (trigger.page.includes('/greats')) {
            memory.lastLegendStudy = Date.now();
            saveMemory();
            
            const rec = getRecommendedLegend();
            if (rec) {
              memory.recommendationHistory.push(rec.legend);
              saveMemory();
              
              return createMessage('coach', {
                title: '👑 Legend Recommendation',
                body: rec.reason,
                category: 'recommendation',
                priority: 'low',
                showAsToast: false,
              });
            }
          }
          return null;
        }

        case 'GAME_END': {
          // After a particularly good or bad game, suggest legend study
          if (trigger.accuracy && trigger.accuracy < 50) {
            const rec = getRecommendedLegend();
            if (rec) {
              return createMessage('coach', {
                title: '👑 Learn from the Masters',
                body: `Tough game. ${rec.reason}`,
                category: 'recommendation',
                priority: 'low',
                primaryAction: {
                  label: 'Study Legends',
                  route: '/greats',
                },
                showAsToast: false,
              });
            }
          }
          return null;
        }

        case 'SESSION_START': {
          // Weekly legend study suggestion
          const daysSince = (Date.now() - memory.lastLegendStudy) / (1000 * 60 * 60 * 24);
          if (daysSince >= 7) {
            const rec = getRecommendedLegend();
            if (rec) {
              return createMessage('coach', {
                title: '👑 Master Game Study',
                body: `Study the greats to become great. ${rec.reason}`,
                category: 'recommendation',
                priority: 'low',
                primaryAction: {
                  label: 'Study Legends',
                  route: '/greats',
                },
                showAsToast: false,
              });
            }
          }
          return null;
        }

        default:
          return null;
      }
    },

    getProactiveMessage: (): AgentMessage | null => {
      return null; // Legend curator is reactive
    },

    getMemory: () => memory as unknown as Record<string, unknown>,
    setMemory: (m) => {
      memory = m as unknown as LegendMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 180,
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessLegendMemory', JSON.stringify(memory));
    } catch {
      // Storage full
    }
  }
}




