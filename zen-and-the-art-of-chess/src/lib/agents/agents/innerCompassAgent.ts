// ============================================
// INNER COMPASS AGENT
// Emotional centering - guides you back when emotions run high
// ============================================

import type { Agent, AgentTrigger, AgentOrchestratorState, AgentMessage } from '../agentTypes';
import { AGENT_PERSONALITIES, createMessage } from '../agentTypes';

interface InnerCompassMemory {
  interventionCount: number;
  lastIntervention: number;
  emotionalResetsPrevented: number;
  userRespondsWellToGuidance: boolean;
  averageRecoveryMinutes: number;
  lastEmotionalIntensity: number;
  consecutiveLosses: number;
  lastGameResult: 'win' | 'loss' | 'draw' | null;
  rapidGamesCount: number;
  lastGameTime: number;
  blunderCountSession: number;
}

export function createInnerCompassAgent(): Agent {
  let memory: InnerCompassMemory = {
    interventionCount: 0,
    lastIntervention: 0,
    emotionalResetsPrevented: 0,
    userRespondsWellToGuidance: true,
    averageRecoveryMinutes: 5,
    lastEmotionalIntensity: 0,
    consecutiveLosses: 0,
    lastGameResult: null,
    rapidGamesCount: 0,
    lastGameTime: 0,
    blunderCountSession: 0,
  };

  return {
    id: 'inner-compass',
    personality: AGENT_PERSONALITIES['inner-compass'],

    initialize: () => {
      try {
        const saved = localStorage.getItem('zenChessInnerCompassMemory');
        if (saved) memory = JSON.parse(saved);
        
        // Reset daily counter
        const lastDate = localStorage.getItem('zenChessInnerCompassDate');
        const today = new Date().toDateString();
        if (lastDate !== today) {
          memory.emotionalResetsPrevented = 0;
          localStorage.setItem('zenChessInnerCompassDate', today);
        }
      } catch {
        // Use defaults
      }
    },

    handleTrigger: (trigger: AgentTrigger, state: AgentOrchestratorState): AgentMessage | null => {
      switch (trigger.type) {
        case 'LOSING_STREAK': {
          const count = trigger.count;
          const now = Date.now();
          
          // Only intervene if we haven't recently (at least 15 min gap)
          if (now - memory.lastIntervention < 15 * 60 * 1000) {
            return null;
          }
          
          // Only intervene on 3+ losses, and keep it gentle
          if (count >= 3) {
            memory.interventionCount++;
            memory.lastIntervention = now;
            saveMemory();

            return createMessage('inner-compass', {
              title: 'Finding center',
              body: `${count} games pointing the same direction. Sometimes the path forward begins with a pause.`,
              category: 'insight',
              priority: 'normal',
              primaryAction: {
                label: 'Breathe',
                route: '/mind',
              },
              secondaryAction: {
                label: 'Continue',
              },
            });
          }

          return null;
        }

        case 'TILT_DETECTED': {
          const now = Date.now();
          
          // Don't spam - only intervene if 20+ minutes since last
          if (now - memory.lastIntervention < 20 * 60 * 1000) {
            return null;
          }
          
          memory.lastEmotionalIntensity = trigger.severity;

          // Only intervene on very high severity
          if (trigger.severity >= 8) {
            memory.interventionCount++;
            memory.lastIntervention = now;
            saveMemory();
            
            return createMessage('inner-compass', {
              title: 'The compass is spinning',
              body: "Your inner game is calling for attention. A few breaths can reset everything.",
              category: 'insight',
              priority: 'normal',
              primaryAction: {
                label: 'Find Center',
                route: '/mind',
              },
              secondaryAction: {
                label: 'I\'m okay',
              },
            });
          }

          return null;
        }

        case 'SESSION_LONG': {
          // Only notify on very long sessions (2+ hours), and only once
          if (trigger.minutes > 120 && Date.now() - memory.lastIntervention > 60 * 60 * 1000) {
            memory.lastIntervention = Date.now();
            saveMemory();
            
            return createMessage('inner-compass', {
              title: 'Long journey',
              body: `${Math.floor(trigger.minutes / 60)}+ hours of travel. Even the greatest masters rest.`,
              category: 'insight',
              priority: 'low',
            });
          }
          return null;
        }

        case 'ACCURACY_LOW': {
          // Don't spam about accuracy
          return null;
        }

        case 'GAME_END': {
          const result = trigger.result as 'win' | 'loss' | 'draw';
          const blunders = trigger.blunders || 0;
          const now = Date.now();
          
          // Track consecutive losses
          if (result === 'loss') {
            memory.consecutiveLosses++;
          } else {
            memory.consecutiveLosses = 0;
          }
          memory.lastGameResult = result;
          memory.blunderCountSession += blunders;
          
          // Detect rapid re-queue (revenge gaming)
          const timeSinceLastGame = now - memory.lastGameTime;
          memory.lastGameTime = now;
          
          if (timeSinceLastGame < 30000 && result === 'loss') {
            memory.rapidGamesCount++;
          } else if (result !== 'loss') {
            memory.rapidGamesCount = 0;
          }
          
          saveMemory();

          // Only intervene on rapid revenge-gaming after 3+ quick losses
          if (memory.rapidGamesCount >= 3 && now - memory.lastIntervention > 20 * 60 * 1000) {
            memory.lastIntervention = now;
            memory.interventionCount++;
            saveMemory();
            
            return createMessage('inner-compass', {
              title: 'Rushing north',
              body: "The compass settles when we're still. A moment of stillness often reveals the clearer path.",
              category: 'insight',
              priority: 'normal',
              primaryAction: {
                label: 'Be still',
                route: '/mind',
              },
              secondaryAction: {
                label: 'Continue',
              },
            });
          }

          return null;
        }

        default:
          return null;
      }
    },

    getProactiveMessage: (_state: AgentOrchestratorState): AgentMessage | null => {
      // Don't proactively message - let the user play in peace
      return null;
    },

    getMemory: () => memory as unknown as Record<string, unknown>,
    setMemory: (m) => {
      memory = m as unknown as InnerCompassMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 20, // Intervene sparingly - respect the user
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessInnerCompassMemory', JSON.stringify(memory));
    } catch {
      // Storage full or unavailable
    }
  }
}




