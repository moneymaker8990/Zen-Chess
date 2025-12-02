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
          
          if (count === 2) {
            // Warning
            return createMessage('tilt-guardian', {
              title: '⚠️ Two in a Row',
              body: MESSAGE_TEMPLATES.tiltPrevention.warning(count),
              subtext: 'This is when tilt usually starts.',
              category: 'intervention',
              priority: 'high',
              primaryAction: {
                label: 'Take a Break',
                route: '/mind',
              },
              secondaryAction: {
                label: 'I\'m Fine',
              },
              showAsToast: true,
            });
          }

          if (count >= 3) {
            memory.interventionCount++;
            memory.lastIntervention = Date.now();
            saveMemory();

            // Strong intervention
            return createMessage('tilt-guardian', {
              title: '🛑 STOP',
              body: MESSAGE_TEMPLATES.tiltPrevention.intervention(),
              subtext: MESSAGE_TEMPLATES.tiltPrevention.recovery(),
              category: 'intervention',
              priority: 'urgent',
              primaryAction: {
                label: 'Breathing Exercise',
                route: '/mind',
              },
              isPersistent: true,
              showAsToast: true,
            });
          }

          return null;
        }

        case 'TILT_DETECTED': {
          memory.lastTiltSeverity = trigger.severity;
          memory.interventionCount++;
          memory.lastIntervention = Date.now();
          saveMemory();

          if (trigger.severity >= 7) {
            return createMessage('tilt-guardian', {
              title: '🚨 Emotional Alert',
              body: "I'm detecting high emotional signals in your play. Rapid moves, cascading mistakes. This isn't you at your best.",
              subtext: "The next game will likely be worse. Let's reset.",
              category: 'intervention',
              priority: 'urgent',
              primaryAction: {
                label: '5-Minute Reset',
                route: '/mind',
              },
              isPersistent: true,
            });
          }

          if (trigger.severity >= 4) {
            return createMessage('tilt-guardian', {
              title: '😤 Tension Rising',
              body: "I notice some frustration creeping in. This is normal, but dangerous if ignored.",
              category: 'intervention',
              priority: 'high',
              primaryAction: {
                label: 'Quick Breathe',
                route: '/mind',
              },
            });
          }

          return null;
        }

        case 'SESSION_LONG': {
          if (trigger.minutes > 90) {
            return createMessage('tilt-guardian', {
              title: '⏰ Long Session',
              body: `You've been at it for ${Math.floor(trigger.minutes / 60)} hours. Decision quality drops after 60-90 minutes.`,
              subtext: 'Even short breaks help restore focus.',
              category: 'reminder',
              priority: 'normal',
              primaryAction: {
                label: 'Take a Break',
                route: '/mind',
              },
            });
          }
          return null;
        }

        case 'ACCURACY_LOW': {
          if (trigger.accuracy < 40) {
            return createMessage('tilt-guardian', {
              title: '📉 Accuracy Alert',
              body: `${trigger.accuracy}% accuracy that game. Something's off. Rushed moves? Distracted?`,
              category: 'insight',
              priority: 'normal',
              primaryAction: {
                label: 'Reset Focus',
                route: '/mind',
              },
            });
          }
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

          // LEVEL 1: Revenge gaming detection (most critical)
          if (memory.rapidGamesCount >= 2) {
            memory.lastIntervention = now;
            memory.interventionCount++;
            saveMemory();
            
            return createMessage('tilt-guardian', {
              title: '🛑 REVENGE GAMING',
              body: "You're queuing instantly after losses. This is the #1 sign of tilt. Your next game is almost guaranteed to be worse. Stop.",
              category: 'intervention',
              priority: 'urgent',
              primaryAction: {
                label: 'Cool Down Now',
                route: '/mind',
              },
              isPersistent: true,
              showAsToast: true,
            });
          }

          // LEVEL 2: They ignored previous warning and lost again
          if (result === 'loss' && now - memory.lastIntervention < 10 * 60 * 1000) {
            memory.interventionCount++;
            saveMemory();
            
            return createMessage('tilt-guardian', {
              title: '⚠️ Told You So',
              body: "That loss was predictable. Not because you're bad - because no one plays well when tilted. Please take a break now.",
              category: 'intervention',
              priority: 'high',
              primaryAction: {
                label: 'Okay, I\'ll Rest',
                route: '/mind',
              },
              isPersistent: true,
            });
          }

          // LEVEL 3: Severe accuracy drop
          if (accuracy > 0 && accuracy < 40 && result === 'loss') {
            return createMessage('tilt-guardian', {
              title: '📉 Performance Warning',
              body: `${accuracy}% accuracy is way below your baseline. Frustration is clouding your calculation. Please pause.`,
              category: 'intervention',
              priority: 'high',
              primaryAction: {
                label: 'Take Break',
                route: '/mind',
              },
              showAsToast: true,
            });
          }
          
          // LEVEL 4: Blunder spike
          if (blunders >= 3) {
            return createMessage('tilt-guardian', {
              title: '🛡️ Blunder Alert',
              body: `${blunders} blunders this game. That's not normal for you. Mental fatigue or frustration may be affecting your play.`,
              category: 'insight',
              priority: 'normal',
            });
          }

          // Mild accuracy warning
          if (accuracy > 0 && accuracy < 55 && result === 'loss' && now - memory.lastIntervention > 15 * 60 * 1000) {
            return createMessage('tilt-guardian', {
              title: '🛡️ Quality Check',
              body: `${accuracy}% accuracy – below your usual standard. Consider reviewing before the next game.`,
              category: 'insight',
              priority: 'low',
            });
          }

          return null;
        }

        default:
          return null;
      }
    },

    getProactiveMessage: (state: AgentOrchestratorState): AgentMessage | null => {
      // Check session length
      const sessionMinutes = (Date.now() - state.sessionStartTime) / 60000;
      
      if (sessionMinutes > 120) {
        return createMessage('tilt-guardian', {
          title: 'Extended Session Check',
          body: "You've been playing for over 2 hours. How are you feeling? Mental fatigue is sneaky.",
          category: 'question',
          priority: 'normal',
          primaryAction: {
            label: 'I Need a Break',
            route: '/mind',
          },
          secondaryAction: {
            label: 'Feeling Good',
          },
        });
      }

      return null;
    },

    getMemory: () => memory as unknown as Record<string, unknown>,
    setMemory: (m) => {
      memory = m as unknown as TiltGuardianMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 2, // Can intervene frequently
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessTiltGuardianMemory', JSON.stringify(memory));
    } catch {
      // Storage full or unavailable
    }
  }
}

