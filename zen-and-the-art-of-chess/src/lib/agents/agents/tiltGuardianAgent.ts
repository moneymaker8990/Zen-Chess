// ============================================
// TILT GUARDIAN AGENT
// Emotional protection - protective, urgent when needed
// ============================================

import type { Agent, AgentTrigger, AgentOrchestratorState, AgentMessage } from '../agentTypes';
import { AGENT_PERSONALITIES, createMessage, MESSAGE_TEMPLATES } from '../agentTypes';

interface TiltGuardianMemory {
  interventionCount: number;
  lastIntervention: number;
  tiltEpisodesPreventedToday: number;
  userRespondsWellToInterventions: boolean;
  averageRecoveryMinutes: number;
  lastTiltSeverity: number;
  consecutiveLosses: number;
  lastGameResult: 'win' | 'loss' | 'draw' | null;
  rapidGamesCount: number;
  lastGameTime: number;
  blunderCountSession: number;
}

export function createTiltGuardianAgent(): Agent {
  let memory: TiltGuardianMemory = {
    interventionCount: 0,
    lastIntervention: 0,
    tiltEpisodesPreventedToday: 0,
    userRespondsWellToInterventions: true,
    averageRecoveryMinutes: 5,
    lastTiltSeverity: 0,
    consecutiveLosses: 0,
    lastGameResult: null,
    rapidGamesCount: 0,
    lastGameTime: 0,
    blunderCountSession: 0,
  };

  return {
    id: 'tilt-guardian',
    personality: AGENT_PERSONALITIES['tilt-guardian'],

    initialize: () => {
      try {
        const saved = localStorage.getItem('zenChessTiltGuardianMemory');
        if (saved) memory = JSON.parse(saved);
        
        // Reset daily counter
        const lastDate = localStorage.getItem('zenChessTiltGuardianDate');
        const today = new Date().toDateString();
        if (lastDate !== today) {
          memory.tiltEpisodesPreventedToday = 0;
          localStorage.setItem('zenChessTiltGuardianDate', today);
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

            return createMessage('tilt-guardian', {
              title: 'Tough stretch',
              body: `${count} losses in a row. Sometimes stepping away for a few minutes helps reset your focus.`,
              category: 'insight',
              priority: 'normal',
              primaryAction: {
                label: 'Take a Break',
                route: '/mind',
              },
              secondaryAction: {
                label: 'Keep Playing',
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
          
          memory.lastTiltSeverity = trigger.severity;

          // Only intervene on very high severity
          if (trigger.severity >= 8) {
            memory.interventionCount++;
            memory.lastIntervention = now;
            saveMemory();
            
            return createMessage('tilt-guardian', {
              title: 'Time for a break?',
              body: "Your play pattern suggests you might benefit from stepping away briefly.",
              category: 'insight',
              priority: 'normal',
              primaryAction: {
                label: 'Take 5',
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
            
            return createMessage('tilt-guardian', {
              title: 'Long session',
              body: `${Math.floor(trigger.minutes / 60)}+ hours of play. Breaks can help maintain focus.`,
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
          const accuracy = trigger.accuracy || 0;
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
            
            return createMessage('tilt-guardian', {
              title: 'Quick games piling up',
              body: "A few minutes away from the board often helps more than grinding through.",
              category: 'insight',
              priority: 'normal',
              primaryAction: {
                label: 'Take a break',
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
      memory = m as unknown as TiltGuardianMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 20, // Intervene sparingly - respect the user
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessTiltGuardianMemory', JSON.stringify(memory));
    } catch {
      // Storage full or unavailable
    }
  }
}

