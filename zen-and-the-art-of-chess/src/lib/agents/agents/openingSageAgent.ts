// ============================================
// OPENING SAGE AGENT
// Manages opening repertoire, suggests study
// ============================================

import type { Agent, AgentTrigger, AgentOrchestratorState, AgentMessage } from '../agentTypes';
import { createMessage } from '../agentTypes';

interface OpeningMemory {
  repertoireSize: number;
  lastOpeningStudy: number;
  openingsPlayed: Record<string, number>;
  openingSuccessRate: Record<string, number>;
  weakestOpening: string | null;
  strongestOpening: string | null;
  suggestedNextOpening: string | null;
  daysWithoutOpeningStudy: number;
}

export function createOpeningSageAgent(): Agent {
  let memory: OpeningMemory = {
    repertoireSize: 0,
    lastOpeningStudy: 0,
    openingsPlayed: {},
    openingSuccessRate: {},
    weakestOpening: null,
    strongestOpening: null,
    suggestedNextOpening: null,
    daysWithoutOpeningStudy: 0,
  };

  function analyzeOpenings(): void {
    try {
      // Check course progress for opening study
      const courseProgress = localStorage.getItem('zenChessCourseProgress');
      if (courseProgress) {
        const parsed = JSON.parse(courseProgress);
        const openingCourses = Object.keys(parsed).filter(k => 
          k.includes('caro') || k.includes('sicilian') || k.includes('london') || 
          k.includes('french') || k.includes('kings-indian') || k.includes('queens-gambit')
        );
        memory.repertoireSize = openingCourses.length;
      }
      
      // Analyze games for opening performance
      const coachData = localStorage.getItem('zen-chess-coach');
      if (coachData) {
        const parsed = JSON.parse(coachData);
        const games = parsed?.state?.state?.recentGames || [];
        
        games.forEach((game: any) => {
          const openingAccuracy = game.accuracy?.opening || 50;
          // Track opening performance (simplified - would need actual opening detection)
          if (openingAccuracy < 60 && !memory.weakestOpening) {
            memory.weakestOpening = 'Opening Phase';
          }
          if (openingAccuracy > 80) {
            memory.strongestOpening = 'Opening Phase';
          }
        });
      }
    } catch {
      // Silently fail
    }
  }

  return {
    id: 'opening' as any,
    personality: {
      id: 'opening' as any,
      name: 'Opening Sage',
      icon: '📖',
      color: '#f59e0b',
      voiceTone: 'analytical' as const,
      description: 'Guards your opening repertoire',
    },

    initialize: () => {
      try {
        const saved = localStorage.getItem('zenChessOpeningSageMemory');
        if (saved) memory = JSON.parse(saved);
        
        // Calculate days without opening study
        const daysSince = (Date.now() - memory.lastOpeningStudy) / (1000 * 60 * 60 * 24);
        memory.daysWithoutOpeningStudy = Math.floor(daysSince);
        
        analyzeOpenings();
      } catch {
        // Use defaults
      }
    },

    handleTrigger: (trigger: AgentTrigger, state: AgentOrchestratorState): AgentMessage | null => {
      switch (trigger.type) {
        case 'PAGE_ENTER': {
          if (trigger.page.includes('/openings')) {
            memory.lastOpeningStudy = Date.now();
            memory.daysWithoutOpeningStudy = 0;
            saveMemory();
            
            if (memory.weakestOpening) {
              return createMessage('coach', {
                title: '📖 Opening Focus',
                body: `Your ${memory.weakestOpening} could use attention. Focused study here will pay dividends.`,
                category: 'recommendation',
                priority: 'low',
                showAsToast: false,
              });
            }
          }
          return null;
        }

        case 'GAME_END': {
          analyzeOpenings();
          saveMemory();
          
          // After a loss, suggest opening review if relevant
          if (trigger.result === 'loss' && trigger.accuracy && trigger.accuracy < 70) {
            return createMessage('coach', {
              title: '📖 Opening Review',
              body: "Consider reviewing the opening. Many games are decided by preparation.",
              category: 'recommendation',
              priority: 'low',
              showAsToast: false,
              primaryAction: {
                label: 'Study Openings',
                route: '/openings',
              },
            });
          }
          return null;
        }

        case 'SESSION_START': {
          // Remind about opening study after 3+ days
          if (memory.daysWithoutOpeningStudy >= 3) {
            return createMessage('coach', {
              title: '📖 Opening Knowledge Fading',
              body: `${memory.daysWithoutOpeningStudy} days since you studied openings. Even 5 minutes keeps your repertoire fresh.`,
              category: 'reminder',
              priority: 'low',
              primaryAction: {
                label: 'Quick Review',
                route: '/openings',
              },
              showAsToast: false,
            });
          }
          return null;
        }

        default:
          return null;
      }
    },

    getProactiveMessage: (state: AgentOrchestratorState): AgentMessage | null => {
      // Weekly opening nudge
      if (memory.daysWithoutOpeningStudy >= 7) {
        return createMessage('coach', {
          title: '📖 Repertoire Reminder',
          body: "A week without opening study. Your lines might be getting rusty.",
          category: 'reminder',
          priority: 'low',
          primaryAction: {
            label: 'Refresh Memory',
            route: '/openings',
          },
        });
      }
      return null;
    },

    getMemory: () => memory as unknown as Record<string, unknown>,
    setMemory: (m) => {
      memory = m as unknown as OpeningMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 120,
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessOpeningSageMemory', JSON.stringify(memory));
    } catch {
      // Storage full
    }
  }
}




