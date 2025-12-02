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
}

export function createTiltGuardianAgent(): Agent {
  let memory: TiltGuardianMemory = {
    interventionCount: 0,
    lastIntervention: 0,
    tiltEpisodesPreventedToday: 0,
    userRespondsWellToInterventions: true,
    averageRecoveryMinutes: 5,
    lastTiltSeverity: 0,
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
          // After a loss following intervention, check if they took the advice
          if (trigger.result === 'loss' && 
              Date.now() - memory.lastIntervention < 10 * 60 * 1000) {
            // They didn't take the break...
            return createMessage('tilt-guardian', {
              title: 'I Tried to Warn You',
              body: "That loss was predictable. Not because you're bad, but because no one plays well when tilted. Please - take a break now.",
              category: 'intervention',
              priority: 'high',
              primaryAction: {
                label: 'Okay, I\'ll Rest',
                route: '/mind',
              },
              isPersistent: true,
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

