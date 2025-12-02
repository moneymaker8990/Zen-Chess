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
  | 'mindfulness';    // Meditation & breathing prompts

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
  | { type: 'PAGE_ENTER'; page: string }
  | { type: 'PAGE_LEAVE'; page: string }
  | { type: 'GAME_START' }
  | { type: 'GAME_END'; result: 'win' | 'loss' | 'draw'; accuracy?: number }
  | { type: 'PUZZLE_COMPLETE'; solved: boolean; time: number }
  | { type: 'PUZZLE_STREAK'; count: number }
  | { type: 'LOSING_STREAK'; count: number }
  | { type: 'WINNING_STREAK'; count: number }
  | { type: 'TILT_DETECTED'; severity: number }
  | { type: 'SESSION_LONG'; minutes: number }
  | { type: 'IDLE'; minutes: number }
  | { type: 'SESSION_START' }
  | { type: 'SESSION_END' }
  | { type: 'PATTERN_DUE'; count: number }
  | { type: 'DAY_CHANGE'; newDay: number }
  | { type: 'STREAK_MILESTONE'; days: number }
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

// Default cooldowns in minutes
export const AGENT_COOLDOWNS: Record<AgentId, number> = {
  'coach': 10,
  'training': 30,
  'tilt-guardian': 2,       // Can intervene frequently
  'opening': 60,
  'pattern': 120,           // Once every 2 hours
  'journey': 1440,          // Once per day
  'legend': 120,
  'mindfulness': 45,
};

// Message templates for consistent voice
export const MESSAGE_TEMPLATES = {
  greetings: {
    morning: (name: string) => `Good morning${name ? ', ' + name : ''}. Ready to train your mind?`,
    afternoon: (name: string) => `Good afternoon${name ? ', ' + name : ''}. Time for chess?`,
    evening: (name: string) => `Good evening${name ? ', ' + name : ''}. Wind down with some chess?`,
    night: (name: string) => `Late night chess${name ? ', ' + name : ''}? I'm here.`,
  },
  
  tiltPrevention: {
    warning: (losses: number) => `${losses} losses in a row. I can feel the tension building. Let's pause.`,
    intervention: () => `Stop. Breathe. The next game you play in this state will likely be your worst.`,
    recovery: () => `Take 5 minutes. When you return, you'll see the board with fresh eyes.`,
  },
  
  celebration: {
    winStreak: (count: number) => `${count} wins! You're in the zone. This is flow state.`,
    accuracy: (accuracy: number) => `${accuracy}% accuracy! That was precise play.`,
    improvement: (area: string) => `I see improvement in your ${area}. Keep building.`,
  },
  
  nudges: {
    pattern: (count: number) => `${count} pattern${count > 1 ? 's' : ''} due for review. Quick session?`,
    opening: () => `Haven't practiced your openings this week. 10 minutes would help.`,
    meditation: () => `Consider starting with a brief meditation to sharpen focus.`,
  },
};

