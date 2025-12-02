// ============================================
// COACH AGENT
// Main personality - warm, knowledgeable mentor
// ============================================

import type { Agent, AgentTrigger, AgentOrchestratorState, AgentMessage } from '../agentTypes';
import { AGENT_PERSONALITIES, createMessage, MESSAGE_TEMPLATES } from '../agentTypes';

interface CoachMemory {
  lastGreeting: number;
  gamesWatched: number;
  significantMoments: string[];
  userStrengths: string[];
  userWeaknesses: string[];
  personalNotes: string[];
  // Enhanced tracking
  bestAccuracy: number;
  totalWins: number;
  totalLosses: number;
  lastWinStreak: number;
  currentWinStreak: number;
  averageAccuracy: number;
  puzzlesSolvedToday: number;
  lastPraise: number;
  lastCritique: number;
  daysKnown: number;
  firstSessionDate: number;
}

export function createCoachAgent(): Agent {
  let memory: CoachMemory = {
    lastGreeting: 0,
    gamesWatched: 0,
    significantMoments: [],
    userStrengths: [],
    userWeaknesses: [],
    personalNotes: [],
    bestAccuracy: 0,
    totalWins: 0,
    totalLosses: 0,
    lastWinStreak: 0,
    currentWinStreak: 0,
    averageAccuracy: 0,
    puzzlesSolvedToday: 0,
    lastPraise: 0,
    lastCritique: 0,
    daysKnown: 0,
    firstSessionDate: Date.now(),
  };

  return {
    id: 'coach',
    personality: AGENT_PERSONALITIES['coach'],

    initialize: () => {
      // Load memory from storage if available
      try {
        const saved = localStorage.getItem('zenChessCoachMemory');
        if (saved) memory = JSON.parse(saved);
      } catch {
        // Use defaults
      }
    },

    handleTrigger: (trigger: AgentTrigger, state: AgentOrchestratorState): AgentMessage | null => {
      switch (trigger.type) {
        case 'SESSION_START': {
          const hour = new Date().getHours();
          const now = Date.now();
          
          // Calculate relationship duration
          const daysSinceFirst = Math.floor((now - memory.firstSessionDate) / (1000 * 60 * 60 * 24));
          memory.daysKnown = daysSinceFirst;
          
          // Time-based greeting
          let greeting = MESSAGE_TEMPLATES.greetings.morning('');
          if (hour >= 12 && hour < 17) greeting = MESSAGE_TEMPLATES.greetings.afternoon('');
          else if (hour >= 17 && hour < 21) greeting = MESSAGE_TEMPLATES.greetings.evening('');
          else if (hour >= 21 || hour < 5) greeting = MESSAGE_TEMPLATES.greetings.night('');

          // Highly personalized body based on accumulated knowledge
          let body = "Let's make today's training count.";
          
          if (daysSinceFirst === 0) {
            body = "Welcome to Zen Chess. I'm your AI coach. I'll learn your patterns, protect you from tilt, and guide your improvement. Let's begin.";
          } else if (daysSinceFirst < 7) {
            body = `Day ${daysSinceFirst + 1} together. Still learning your style - ${memory.gamesWatched} games watched so far. Each game teaches me how to help you better.`;
          } else if (daysSinceFirst < 30) {
            const winRate = memory.totalWins + memory.totalLosses > 0 
              ? Math.round((memory.totalWins / (memory.totalWins + memory.totalLosses)) * 100)
              : 0;
            body = `${memory.gamesWatched} games together. ${winRate}% win rate. ${memory.bestAccuracy > 0 ? `Best accuracy: ${memory.bestAccuracy}%.` : ''} Let's build on that today.`;
          } else {
            body = `${daysSinceFirst} days of training together. I've watched ${memory.gamesWatched} games. I know your patterns. Today, we refine.`;
          }
          
          // Add context based on time of day
          if (hour >= 22 || hour < 5) {
            body += " Late night chess can be risky - stay mindful of fatigue.";
          } else if (hour >= 5 && hour < 8) {
            body += " Morning sessions often produce the best play. Fresh mind, sharp calculation.";
          }
          
          // Add context based on recent performance
          if (memory.currentWinStreak >= 3) {
            body = `🔥 ${memory.currentWinStreak} game win streak! You're in the zone. Let's ride this wave carefully.`;
          }

          memory.lastGreeting = now;
          saveMemory();

          return createMessage('coach', {
            title: greeting,
            body,
            category: 'greeting',
            priority: 'low',
            primaryAction: {
              label: 'Start Training',
              route: '/hub',
            },
            showAsToast: false,
          });
        }

        case 'GAME_END': {
          const result = trigger.result as 'win' | 'loss' | 'draw';
          const accuracy = trigger.accuracy || 0;
          const now = Date.now();
          
          // Update stats
          memory.gamesWatched++;
          if (result === 'win') {
            memory.totalWins++;
            memory.currentWinStreak++;
            if (memory.currentWinStreak > memory.lastWinStreak) {
              memory.lastWinStreak = memory.currentWinStreak;
            }
          } else if (result === 'loss') {
            memory.totalLosses++;
            memory.currentWinStreak = 0;
          }
          
          if (accuracy > memory.bestAccuracy) {
            memory.bestAccuracy = accuracy;
          }
          
          // Update average accuracy
          if (accuracy > 0) {
            const totalGamesWithAccuracy = memory.gamesWatched;
            memory.averageAccuracy = Math.round(
              (memory.averageAccuracy * (totalGamesWithAccuracy - 1) + accuracy) / totalGamesWithAccuracy
            );
          }
          
          saveMemory();

          // NEW PERSONAL BEST
          if (accuracy > 0 && accuracy === memory.bestAccuracy && accuracy > 85) {
            memory.significantMoments.push(`New personal best: ${accuracy}%`);
            memory.lastPraise = now;
            saveMemory();

            return createMessage('coach', {
              title: '🏆 NEW PERSONAL BEST!',
              body: `${accuracy}% accuracy - your best game ever! This is the level you're capable of when focused.`,
              category: 'celebration',
              priority: 'high',
              primaryAction: {
                label: 'View Analysis',
                route: '/mistakes',
              },
            });
          }

          // High accuracy win
          if (result === 'win' && accuracy > 85) {
            // Don't over-praise
            if (now - memory.lastPraise > 30 * 60 * 1000) {
              memory.lastPraise = now;
              saveMemory();
              
              return createMessage('coach', {
                title: MESSAGE_TEMPLATES.celebration.accuracy(accuracy),
                body: "Calculated, controlled play. This is championship-level execution.",
                category: 'celebration',
                priority: 'normal',
              });
            }
          }
          
          // Win streak celebration
          if (memory.currentWinStreak === 5) {
            return createMessage('coach', {
              title: '🔥 5 Win Streak!',
              body: "Five in a row! You're in the zone. Stay humble but ride this wave.",
              category: 'celebration',
              priority: 'high',
            });
          }

          // Tough loss with low accuracy
          if (result === 'loss' && accuracy < 50 && accuracy > 0) {
            // Don't pile on too often
            if (now - memory.lastCritique > 20 * 60 * 1000) {
              memory.lastCritique = now;
              saveMemory();
              
              return createMessage('coach', {
                title: 'Rough Game',
                body: `${accuracy}% accuracy - well below your ${memory.averageAccuracy}% average. Let's look at what happened, not to criticize, but to learn.`,
                category: 'insight',
                priority: 'normal',
                primaryAction: {
                  label: 'Review Game',
                  route: '/mistakes',
                },
              });
            }
          }

          // Good loss (fought well but lost)
          if (result === 'loss' && accuracy >= 70) {
            return createMessage('coach', {
              title: 'Well Fought',
              body: `${accuracy}% accuracy in a loss. You played well - sometimes the opponent just plays better. Nothing to be ashamed of.`,
              category: 'insight',
              priority: 'low',
            });
          }

          return null;
        }

        case 'WINNING_STREAK': {
          if (trigger.count >= 3) {
            return createMessage('coach', {
              title: MESSAGE_TEMPLATES.celebration.winStreak(trigger.count),
              body: "Your focus is sharp. Keep this energy, but don't get overconfident.",
              category: 'celebration',
              priority: 'normal',
            });
          }
          return null;
        }

        case 'STREAK_MILESTONE': {
          if (trigger.days === 7) {
            return createMessage('coach', {
              title: '🔥 One Week Streak!',
              body: "Seven days of consistent practice. You're building something real here.",
              category: 'celebration',
              priority: 'high',
              primaryAction: {
                label: 'View Journey',
                route: '/journey',
              },
            });
          }
          if (trigger.days === 30) {
            return createMessage('coach', {
              title: '🏆 30 Days Strong!',
              body: "A month of dedication. Most people quit by now. You're different.",
              category: 'celebration',
              priority: 'high',
            });
          }
          return null;
        }

        case 'ACHIEVEMENT_UNLOCKED': {
          return createMessage('coach', {
            title: '🎉 Achievement Unlocked!',
            body: "Another milestone reached. Every step forward matters.",
            category: 'celebration',
            priority: 'normal',
          });
        }

        default:
          return null;
      }
    },

    getProactiveMessage: (state: AgentOrchestratorState): AgentMessage | null => {
      // Only proactive once per session
      if (Date.now() - memory.lastGreeting < 4 * 60 * 60 * 1000) {
        return null;
      }

      // Check if user has been idle for a while
      const idleMinutes = (Date.now() - state.lastInteractionTime) / 60000;
      
      if (idleMinutes > 30) {
        return createMessage('coach', {
          title: 'Still there?',
          body: "Take your time. Chess rewards patience. When you're ready, I'm here.",
          category: 'reminder',
          priority: 'low',
          showAsToast: false,
        });
      }

      return null;
    },

    getMemory: () => memory as unknown as Record<string, unknown>,
    setMemory: (m) => {
      memory = m as unknown as CoachMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 10,
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessCoachMemory', JSON.stringify(memory));
    } catch {
      // Storage full or unavailable
    }
  }
}

