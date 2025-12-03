// ============================================
// ZEN CHESS AGENT SYSTEM - TYPE DEFINITIONS
// Multi-agent architecture for proactive coaching
// ============================================

// ============================================
// CORE AGENT TYPES
// ============================================

export type AgentId = 
  | 'coach'           // Main personality, overall guidance
  | 'training'        // What to practice, training plans
  | 'tilt-guardian'   // Emotional monitoring and intervention
  | 'opening'         // Opening repertoire management
  | 'pattern'         // Pattern memory & spaced repetition
  | 'journey'         // 365-day curriculum guide
  | 'legend'          // Legend game study curator
  | 'mindfulness'     // Meditation & breathing prompts
  // Background agents
  | 'insight-engine'  // Deep pattern analysis
  | 'motivator'       // Celebrations and encouragement
  | 'focus-guardian'  // Distraction monitoring
  | 'session-manager';// Session quality tracking

export interface AgentPersonality {
  id: AgentId;
  name: string;
  icon: string;
  color: string;
  voiceTone: 'warm' | 'analytical' | 'zen' | 'encouraging' | 'protective';
  description: string;
}

export const AGENT_PERSONALITIES: Record<AgentId, AgentPersonality> = {
  'coach': {
    id: 'coach',
    name: 'Your Coach',
    icon: '♔',
    color: '#a855f7',
    voiceTone: 'warm',
    description: 'Your personal chess mentor who knows your patterns and guides your journey',
  },
  'training': {
    id: 'training',
    name: 'Training Architect',
    icon: '🎯',
    color: '#3b82f6',
    voiceTone: 'analytical',
    description: 'Designs optimal training plans based on your weaknesses',
  },
  'tilt-guardian': {
    id: 'tilt-guardian',
    name: 'Tilt Guardian',
    icon: '🛡️',
    color: '#ef4444',
    voiceTone: 'protective',
    description: 'Watches your emotional state and protects you from yourself',
  },
  'opening': {
    id: 'opening',
    name: 'Opening Sage',
    icon: '📖',
    color: '#f59e0b',
    voiceTone: 'analytical',
    description: 'Curates and maintains your opening repertoire',
  },
  'pattern': {
    id: 'pattern',
    name: 'Pattern Memory',
    icon: '🧠',
    color: '#06b6d4',
    voiceTone: 'encouraging',
    description: 'Tracks patterns you\'ve learned and schedules reviews',
  },
  'journey': {
    id: 'journey',
    name: 'Journey Guide',
    icon: '🧭',
    color: '#8b5cf6',
    voiceTone: 'zen',
    description: 'Guides you through the 365-day mindful chess journey',
  },
  'legend': {
    id: 'legend',
    name: 'Legend Curator',
    icon: '👑',
    color: '#eab308',
    voiceTone: 'warm',
    description: 'Selects master games that match your learning needs',
  },
  'mindfulness': {
    id: 'mindfulness',
    name: 'Inner Peace',
    icon: '☯',
    color: '#4ade80',
    voiceTone: 'zen',
    description: 'Guides meditation and breathing for chess clarity',
  },
  // Background agents - work silently, surface insights
  'insight-engine': {
    id: 'insight-engine',
    name: 'Insight Engine',
    icon: '🔮',
    color: '#8b5cf6',
    voiceTone: 'analytical',
    description: 'Discovers hidden patterns in your play',
  },
  'motivator': {
    id: 'motivator',
    name: 'Motivator',
    icon: '💪',
    color: '#f59e0b',
    voiceTone: 'encouraging',
    description: 'Celebrates wins and lifts you through losses',
  },
  'focus-guardian': {
    id: 'focus-guardian',
    name: 'Focus Guardian',
    icon: '🎯',
    color: '#06b6d4',
    voiceTone: 'analytical',
    description: 'Protects your deep work and monitors focus',
  },
  'session-manager': {
    id: 'session-manager',
    name: 'Session Manager',
    icon: '⏱️',
    color: '#64748b',
    voiceTone: 'analytical',
    description: 'Optimizes your training sessions',
  },
};

// ============================================
// AGENT MESSAGES
// ============================================

export type MessagePriority = 'urgent' | 'high' | 'normal' | 'low';
export type MessageCategory = 
  | 'intervention'    // Stop what you're doing!
  | 'recommendation'  // You should try this
  | 'insight'         // I noticed something
  | 'celebration'     // You achieved something!
  | 'reminder'        // Don't forget
  | 'question'        // Asking for input
  | 'greeting';       // Hello messages

export interface AgentMessage {
  id: string;
  agentId: AgentId;
  timestamp: number;
  
  // Content
  title: string;
  body: string;
  subtext?: string;         // Additional context
  
  // Classification
  priority: MessagePriority;
  category: MessageCategory;
  
  // Actions
  primaryAction?: {
    label: string;
    route?: string;
    callback?: string;      // Function name to call
  };
  secondaryAction?: {
    label: string;
    route?: string;
    callback?: string;
  };
  
  // Lifecycle
  expiresAt?: number;
  dismissedAt?: number;
  actedOnAt?: number;
  readAt?: number;
  
  // Context
  triggerEvent?: string;    // What triggered this message
  contextData?: Record<string, unknown>;
  
  // Display
  showInNotificationCenter: boolean;
  showAsToast: boolean;
  isPersistent: boolean;    // Stays until acted on
}

// ============================================
// AGENT STATE
// ============================================

export interface AgentMemory {
  // User preferences learned over time
  preferredTrainingTime: string | null;
  preferredSessionLength: number | null;
  respondsWellTo: string[];           // Types of messages they engage with
  ignoresOften: string[];             // Types they dismiss
  
  // Interaction history
  totalMessages: number;
  messagesByAgent: Record<AgentId, number>;
  engagementRate: number;             // % of messages acted on
  
  // Learning about the user
  lastNoteworthy: string[];           // Recent observations
  predictedNextAction: string | null;
  userGoals: string[];                // What they want to achieve
  
  // Agent-specific memories
  agentMemories: Record<AgentId, Record<string, unknown>>;
}

export interface AgentQueueItem {
  message: AgentMessage;
  scheduledFor: number;               // When to show
  conditions?: AgentCondition[];      // Only show if conditions met
}

export interface AgentCondition {
  type: 'page' | 'time' | 'activity' | 'mood' | 'streak' | 'custom';
  operator: 'equals' | 'contains' | 'gt' | 'lt' | 'between';
  value: unknown;
}

export interface AgentOrchestratorState {
  // Active messages
  activeMessages: AgentMessage[];
  messageQueue: AgentQueueItem[];
  
  // Message history
  recentMessages: AgentMessage[];     // Last 50 messages
  
  // Agent states
  agentLastActive: Record<AgentId, number>;
  agentCooldowns: Record<AgentId, number>;
  
  // User memory
  memory: AgentMemory;
  
  // Session
  currentPage: string;
  sessionStartTime: number;
  lastInteractionTime: number;
  
  // Settings
  notificationsEnabled: boolean;
  agentVerbosity: 'quiet' | 'normal' | 'chatty';
  enabledAgents: AgentId[];
}

// ============================================
// AGENT TRIGGERS
// Events that can trigger agent responses
// ============================================

export type AgentTrigger =
  // Navigation
  | { type: 'PAGE_ENTER'; page: string; previousPage?: string }
  | { type: 'PAGE_LEAVE'; page: string; timeSpent?: number; interactions?: number }
  // Games
  | { type: 'GAME_START'; mode?: string; timestamp?: number }
  | { type: 'GAME_END'; result: 'win' | 'loss' | 'draw'; accuracy?: number; duration?: number; moveCount?: number; blunders?: number }
  | { type: 'MOVE_MADE'; fen?: string; move?: string; moveTime?: number; totalMoves?: number }
  | { type: 'BLUNDER_MADE'; evaluation?: number; count?: number; move?: string | number }
  // Puzzles
  | { type: 'PUZZLE_START'; puzzleId?: string; difficulty?: string; themes?: string[] }
  | { type: 'PUZZLE_COMPLETE'; solved: boolean; time: number; hintUsed?: boolean; difficulty?: number }
  | { type: 'PUZZLE_STREAK'; count: number }
  | { type: 'HINT_USED' }
  // Streaks & Detection
  | { type: 'LOSING_STREAK'; count: number }
  | { type: 'WINNING_STREAK'; count: number }
  | { type: 'TILT_DETECTED'; severity: number }
  // Session
  | { type: 'SESSION_LONG'; minutes: number }
  | { type: 'IDLE'; minutes: number }
  | { type: 'SESSION_START' }
  | { type: 'SESSION_END' }
  // Study
  | { type: 'STUDY_START'; topic?: string; studyType?: string; topicId?: string }
  | { type: 'STUDY_END'; topic?: string; duration?: number; completed?: boolean }
  // Progress
  | { type: 'PATTERN_DUE'; count: number }
  | { type: 'DAY_CHANGE'; newDay: number }
  | { type: 'STREAK_MILESTONE'; days: number }
  | { type: 'MEDITATION_COMPLETE'; duration: number }
  | { type: 'LESSON_COMPLETE'; lessonId?: string }
  // Custom
  | { type: 'CUSTOM'; eventName: string; data?: Record<string, unknown> }
  | { type: 'ACHIEVEMENT_UNLOCKED'; achievementId: string }
  | { type: 'ACCURACY_LOW'; accuracy: number }
  | { type: 'ACCURACY_HIGH'; accuracy: number }
  | { type: 'CUSTOM'; event: string; data?: unknown };

// ============================================
// AGENT INTERFACE
// What each agent must implement
// ============================================

export interface Agent {
  id: AgentId;
  personality: AgentPersonality;
  
  // Core methods
  initialize: () => void;
  handleTrigger: (trigger: AgentTrigger, state: AgentOrchestratorState) => AgentMessage | null;
  getProactiveMessage: (state: AgentOrchestratorState) => AgentMessage | null;
  
  // Memory
  getMemory: () => Record<string, unknown>;
  setMemory: (memory: Record<string, unknown>) => void;
  
  // Cooldown management
  getCooldownMinutes: () => number;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function createMessage(
  agentId: AgentId,
  params: {
    title: string;
    body: string;
    subtext?: string;
    priority?: MessagePriority;
    category?: MessageCategory;
    primaryAction?: AgentMessage['primaryAction'];
    secondaryAction?: AgentMessage['secondaryAction'];
    showAsToast?: boolean;
    isPersistent?: boolean;
    expiresInMinutes?: number;
    contextData?: Record<string, unknown>;
  }
): AgentMessage {
  return {
    id: `${agentId}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    agentId,
    timestamp: Date.now(),
    title: params.title,
    body: params.body,
    subtext: params.subtext,
    priority: params.priority || 'normal',
    category: params.category || 'recommendation',
    primaryAction: params.primaryAction,
    secondaryAction: params.secondaryAction,
    showInNotificationCenter: true,
    showAsToast: params.showAsToast ?? true,
    isPersistent: params.isPersistent ?? false,
    expiresAt: params.expiresInMinutes 
      ? Date.now() + params.expiresInMinutes * 60 * 1000 
      : undefined,
    contextData: params.contextData,
  };
}

export function getAgentPersonality(agentId: AgentId): AgentPersonality {
  return AGENT_PERSONALITIES[agentId];
}

// Default cooldowns in minutes - respect user's space
export const AGENT_COOLDOWNS: Record<AgentId, number> = {
  'coach': 15,
  'training': 45,
  'tilt-guardian': 20,       // Give space between interventions
  'opening': 90,
  'pattern': 180,            // Once every 3 hours
  'journey': 1440,           // Once per day
  'legend': 180,
  'mindfulness': 60,
  // Background agents
  'insight-engine': 240,     // Less frequent, deeper analysis
  'motivator': 15,           // Not too frequent
  'focus-guardian': 30,      // Not too intrusive
  'session-manager': 45,     // Session optimization
};

// Message templates for consistent voice - natural, not preachy
export const MESSAGE_TEMPLATES = {
  greetings: {
    morning: (name: string) => `Morning${name ? ', ' + name : ''}.`,
    afternoon: (name: string) => `Hey${name ? ' ' + name : ''}.`,
    evening: (name: string) => `Evening${name ? ', ' + name : ''}.`,
    night: (name: string) => `Up late${name ? ', ' + name : ''}?`,
  },
  
  tiltPrevention: {
    warning: (losses: number) => `${losses} in a row. Might be worth a quick break.`,
    intervention: () => `Consider stepping away for a few minutes.`,
    recovery: () => `A short break often helps more than pushing through.`,
  },
  
  celebration: {
    winStreak: (count: number) => `${count} wins. Nice run.`,
    accuracy: (accuracy: number) => `${accuracy}% accuracy. Clean game.`,
    improvement: (area: string) => `Solid progress on ${area}.`,
  },
  
  nudges: {
    pattern: (count: number) => `${count} pattern${count > 1 ? 's' : ''} ready to review.`,
    opening: () => `Opening review available if you're interested.`,
    meditation: () => `Breathing exercises available.`,
  },
};

