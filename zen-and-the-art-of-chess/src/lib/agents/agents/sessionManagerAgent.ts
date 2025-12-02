// ============================================
// SESSION MANAGER AGENT
// Background agent - tracks session quality, suggests breaks
// Runs silently but surfaces when needed
// ============================================

import type { Agent, AgentTrigger, AgentOrchestratorState, AgentMessage } from '../agentTypes';
import { createMessage } from '../agentTypes';

interface SessionMemory {
  sessionsToday: number;
  totalMinutesToday: number;
  currentSessionStart: number;
  gamesThisSession: number;
  puzzlesThisSession: number;
  breaksTaken: number;
  lastBreak: number;
  productiveMinutes: number;
  qualityScore: number;
  optimalSessionLength: number;
  
  // Weekly tracking
  weeklyMinutes: number;
  weekStart: number;
  bestSessionDay: string | null;
  
  // Fatigue tracking
  fatigueLevel: number;
  lastFatigueWarning: number;
}

export function createSessionManagerAgent(): Agent {
  let memory: SessionMemory = {
    sessionsToday: 0,
    totalMinutesToday: 0,
    currentSessionStart: Date.now(),
    gamesThisSession: 0,
    puzzlesThisSession: 0,
    breaksTaken: 0,
    lastBreak: 0,
    productiveMinutes: 0,
    qualityScore: 100,
    optimalSessionLength: 45,
    weeklyMinutes: 0,
    weekStart: Date.now(),
    bestSessionDay: null,
    fatigueLevel: 0,
    lastFatigueWarning: 0,
  };

  function calculateFatigue(): number {
    const sessionMinutes = (Date.now() - memory.currentSessionStart) / 60000;
    const minutesSinceBreak = (Date.now() - memory.lastBreak) / 60000;
    
    let fatigue = 0;
    
    // Session length fatigue
    if (sessionMinutes > 30) fatigue += 10;
    if (sessionMinutes > 60) fatigue += 20;
    if (sessionMinutes > 90) fatigue += 30;
    
    // No break fatigue
    if (minutesSinceBreak > 30) fatigue += 15;
    if (minutesSinceBreak > 60) fatigue += 25;
    
    // Game count fatigue
    if (memory.gamesThisSession > 5) fatigue += 10;
    if (memory.gamesThisSession > 10) fatigue += 20;
    
    return Math.min(100, fatigue);
  }

  function getSessionQuality(): number {
    const fatigue = calculateFatigue();
    const focusBonus = memory.puzzlesThisSession * 2;
    
    return Math.max(0, Math.min(100, 100 - fatigue + focusBonus));
  }

  return {
    id: 'session-manager' as any,
    personality: {
      id: 'session-manager' as any,
      name: 'Session Manager',
      icon: '⏱️',
      color: '#64748b',
      voiceTone: 'analytical' as const,
      description: 'Optimizes your training sessions',
    },

    initialize: () => {
      try {
        const saved = localStorage.getItem('zenChessSessionMemory');
        if (saved) {
          const parsed = JSON.parse(saved);
          memory = { ...memory, ...parsed };
        }
        
        // Reset daily counters
        const lastDate = localStorage.getItem('zenChessSessionDate');
        const today = new Date().toDateString();
        if (lastDate !== today) {
          memory.sessionsToday = 1;
          memory.totalMinutesToday = 0;
          memory.gamesThisSession = 0;
          memory.puzzlesThisSession = 0;
          localStorage.setItem('zenChessSessionDate', today);
        }
        
        // Reset weekly
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        if (memory.weekStart < weekAgo) {
          memory.weeklyMinutes = 0;
          memory.weekStart = Date.now();
        }
        
        memory.currentSessionStart = Date.now();
        memory.fatigueLevel = 0;
      } catch {
        // Use defaults
      }
    },

    handleTrigger: (trigger: AgentTrigger, state: AgentOrchestratorState): AgentMessage | null => {
      switch (trigger.type) {
        case 'SESSION_START': {
          memory.currentSessionStart = Date.now();
          memory.sessionsToday++;
          memory.gamesThisSession = 0;
          memory.puzzlesThisSession = 0;
          memory.fatigueLevel = 0;
          saveMemory();
          return null;
        }

        case 'GAME_END': {
          memory.gamesThisSession++;
          memory.fatigueLevel = calculateFatigue();
          memory.qualityScore = getSessionQuality();
          saveMemory();
          
          // Fatigue warning
          if (memory.fatigueLevel > 60 && Date.now() - memory.lastFatigueWarning > 20 * 60 * 1000) {
            memory.lastFatigueWarning = Date.now();
            saveMemory();
            
            return createMessage('coach', {
              title: '⏱️ Session Quality Dropping',
              body: `${memory.gamesThisSession} games this session. Quality naturally declines after prolonged play. A 5-minute break would help.`,
              category: 'recommendation',
              priority: 'normal',
              primaryAction: {
                label: 'Take Break',
                route: '/mind',
              },
            });
          }
          
          return null;
        }

        case 'PUZZLE_COMPLETE': {
          memory.puzzlesThisSession++;
          memory.productiveMinutes += trigger.time / 60;
          memory.qualityScore = getSessionQuality();
          saveMemory();
          return null;
        }

        case 'SESSION_LONG': {
          memory.fatigueLevel = calculateFatigue();
          memory.qualityScore = getSessionQuality();
          saveMemory();
          
          if (trigger.minutes > 60 && memory.breaksTaken === 0) {
            return createMessage('coach', {
              title: '⏱️ Extended Session',
              body: `${Math.round(trigger.minutes)} minutes without a break. Even world champions take breaks. Your next game will be sharper after rest.`,
              category: 'reminder',
              priority: 'normal',
              primaryAction: {
                label: 'Quick Break',
                route: '/mind',
              },
            });
          }
          
          return null;
        }

        case 'PAGE_ENTER': {
          // Track break taking
          if (trigger.page.includes('/mind')) {
            memory.breaksTaken++;
            memory.lastBreak = Date.now();
            memory.fatigueLevel = Math.max(0, memory.fatigueLevel - 20);
            saveMemory();
          }
          
          return null;
        }

        default:
          return null;
      }
    },

    getProactiveMessage: (state: AgentOrchestratorState): AgentMessage | null => {
      // Track session duration
      const sessionMinutes = (Date.now() - memory.currentSessionStart) / 60000;
      memory.totalMinutesToday = sessionMinutes;
      memory.weeklyMinutes += 0.1; // Approximate
      saveMemory();
      
      // 2+ hour session warning
      if (sessionMinutes > 120 && memory.breaksTaken < 2) {
        return createMessage('coach', {
          title: '⏱️ Long Session Alert',
          body: `Over 2 hours. Diminishing returns are real. Rest is part of training.`,
          category: 'reminder',
          priority: 'high',
          primaryAction: {
            label: 'End Session',
            route: '/',
          },
        });
      }
      
      return null;
    },

    getMemory: () => memory as unknown as Record<string, unknown>,
    setMemory: (m) => {
      memory = m as unknown as SessionMemory;
      saveMemory();
    },

    getCooldownMinutes: () => 30,
  };

  function saveMemory() {
    try {
      localStorage.setItem('zenChessSessionMemory', JSON.stringify(memory));
    } catch {
      // Storage full
    }
  }
}



