// ============================================
// JOURNEY AGENT
// 365-day curriculum guide - zen, philosophical
// ============================================

import type { Agent, AgentTrigger, AgentOrchestratorState, AgentMessage } from '../agentTypes';
import { AGENT_PERSONALITIES, createMessage } from '../agentTypes';

interface JourneyMemory {
  currentDay: number;
  lastDayReminder: number;
  completedDays: number[];
  streakDays: number;
  currentPhase: number;
  favoriteTeachings: string[];
}

export function createJourneyAgent(): Agent {
  let memory: JourneyMemory = {
    currentDay: 1,
    lastDayReminder: 0,
    completedDays: [],
    streakDays: 0,
    currentPhase: 1,
    favoriteTeachings: [],
  };

  const PHASE_NAMES = [
    'Calm Mind & Blunder Prevention',
    'Pattern Recognition & Tactical Awareness',
    'Strategy, Planning & Quiet Moves',
    'Flow, Confidence & Intuition',
    'Ego Transcendence & Psychological Mastery',
    'Whole-Board Awareness & Effortless Action',
  ];

  return {
    id: 'journey',
    personality: AGENT_PERSONALITIES['journey'],

    initialize: () => {
      try {
        const saved = localStorage.getItem('zenChessJourneyMemory');
        if (saved) memory = JSON.parse(saved);

        // Sync with progress store
        const progress = localStorage.getItem('zen-chess-progress');
        if (progress) {
          const parsed = JSON.parse(progress);
          if (parsed.state?.progress) {
            memory.currentDay = parsed.state.progress.currentDay || 1;
            memory.completedDays = parsed.state.progress.completedDays || [];
            memory.streakDays = parsed.state.progress.streakDays || 0;
          }
        }

        // Calculate phase
        if (memory.currentDay <= 60) memory.currentPhase = 1;
        else if (memory.currentDay <= 120) memory.currentPhase = 2;
        else if (memory.currentDay <= 200) memory.currentPhase = 3;
        else if (memory.currentDay <= 260) memory.currentPhase = 4;
        else if (memory.currentDay <= 300) memory.currentPhase = 5;
        else memory.currentPhase = 6;
      } catch {
        // Use defaults
      }
    },

    handleTrigger: (trigger: AgentTrigger, state: AgentOrchestratorState): AgentMessage | null => {
      switch (trigger.type) {
        case 'SESSION_START': {
          // Once per day, remind about the journey
          const today = new Date().toDateString();
          const lastReminder = new Date(memory.lastDayReminder).toDateString();
          
          if (today !== lastReminder) {
            memory.lastDayReminder = Date.now();
            saveMemory();

            const phaseName = PHASE_NAMES[memory.currentPhase - 1];
            
            return createMessage('journey', {
              title: `Day ${memory.currentDay} Awaits`,
              body: `Today's teaching continues your journey through Phase ${memory.currentPhase}: ${phaseName}.`,
              subtext: memory.streakDays > 0 ? `🔥 ${memory.streakDays} day streak` : undefined,
              category: 'reminder',
              priority: 'low',
              primaryAction: {
                label: 'Begin Today',
                route: '/mind',
              },
              showAsToast: false,
            });
          }
          return null;
        }

        case 'DAY_CHANGE': {
          const newDay = trigger.newDay;
          
          // Phase transition
          const oldPhase = memory.currentPhase;
          let newPhase = oldPhase;
          
          if (newDay === 61) newPhase = 2;
          else if (newDay === 121) newPhase = 3;
          else if (newDay === 201) newPhase = 4;
          else if (newDay === 261) newPhase = 5;
          else if (newDay === 301) newPhase = 6;

          if (newPhase !== oldPhase) {
            memory.currentPhase = newPhase;
            memory.currentDay = newDay;
            saveMemory();

            return createMessage('journey', {
              title: `🌟 Phase ${newPhase} Begins`,
              body: `You've entered "${PHASE_NAMES[newPhase - 1]}". The path deepens.`,
              subtext: 'New teachings, new challenges, new growth.',
              category: 'celebration',
              priority: 'high',
              primaryAction: {
                label: 'Start Phase',
                route: '/mind',
              },
            });
          }

          // Milestone days
          if (newDay === 100) {
            return createMessage('journey', {
              title: '💯 Day 100!',
              body: "One hundred days of mindful chess. The master appears not through talent, but persistence.",
              category: 'celebration',
              priority: 'high',
            });
          }

          if (newDay === 200) {
            return createMessage('journey', {
              title: '🌟 Day 200!',
              body: "Two hundred days. You're in the top 1% of practitioners who make it this far.",
              category: 'celebration',
              priority: 'high',
            });
          }

          if (newDay === 300) {
            return createMessage('journey', {
              title: '👑 Day 300!',
              body: "Three hundred days. The end is in sight. What will you become when this journey completes?",
              category: 'celebration',
              priority: 'high',
            });
          }

          if (newDay === 365) {
            return createMessage('journey', {
              title: '🏆 Day 365 - Journey Complete',
              body: "A full year. 365 teachings. You are not the same player who started. You are not the same person.",
              category: 'celebration',
              priority: 'urgent',
              isPersistent: true,
            });
          }

          memory.currentDay = newDay;
          saveMemory();
          return null;
        }

        case 'STREAK_MILESTONE': {
          if (trigger.days === 7) {
            return createMessage('journey', {
              title: '🔥 7-Day Streak',
              body: "A week of consistent practice. 'Dripping water hollows out stone, not through force but through persistence.' — Ovid",
              category: 'celebration',
              priority: 'normal',
            });
          }
          return null;
        }

        default:
          return null;
      }
    },

    getProactiveMessage: (state: AgentOrchestratorState): AgentMessage | null => {
      // Evening reminder if day not completed
      const hour = new Date().getHours();
      const today = new Date().toDateString();
      const lastReminder = new Date(memory.lastDayReminder).toDateString();
      
      if (hour >= 20 && today !== lastReminder) {
        const dayCompleted = memory.completedDays.includes(memory.currentDay);
        
        if (!dayCompleted) {
          memory.lastDayReminder = Date.now();
          saveMemory();

          return createMessage('journey', {
            title: '🌙 Evening Reminder',
            body: `Day ${memory.currentDay}'s teaching awaits. End your day with wisdom.`,
            category: 'reminder',
            priority: 'normal',
            primaryAction: {
              label: 'Complete Day',
              route: '/mind',
            },
          });
        }
      }

      return null;
    },

    getMemory: () => memory as unknown as Record<string, unknown>,
    setMemory: (m) => {
      memory = m as unknown as JourneyMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 1440, // Once per day
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessJourneyMemory', JSON.stringify(memory));
    } catch {
      // Storage full or unavailable
    }
  }
}












