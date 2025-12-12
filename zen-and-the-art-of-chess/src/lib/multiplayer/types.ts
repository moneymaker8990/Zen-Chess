// ============================================
// MULTIPLAYER TYPE DEFINITIONS
// Professional-level real-time chess
// ============================================

export type GameStatus = 'waiting' | 'active' | 'completed' | 'abandoned' | 'aborted';
export type GameResult = 'white_wins' | 'black_wins' | 'draw' | 'aborted';
export type GameTermination = 
  | 'checkmate' 
  | 'resignation' 
  | 'timeout' 
  | 'stalemate' 
  | 'insufficient_material'
  | 'fifty_move_rule'
  | 'threefold_repetition'
  | 'agreement'
  | 'abandonment'
  | 'aborted';

export type TimeControlType = 'bullet' | 'blitz' | 'rapid' | 'classical' | 'correspondence' | 'unlimited';
export type InviteStatus = 'pending' | 'accepted' | 'declined' | 'expired' | 'cancelled';
export type FriendStatus = 'pending' | 'accepted' | 'blocked';
export type PlayerColor = 'w' | 'b';
export type OnlineStatus = 'online' | 'away' | 'in_game' | 'offline';

// ============================================
// TIME CONTROL PRESETS
// ============================================

export interface TimeControl {
  type: TimeControlType;
  initialSeconds: number;
  incrementSeconds: number;
  label: string;
  description: string;
}

export const TIME_CONTROLS: Record<string, TimeControl> = {
  // Bullet
  'bullet_1_0': {
    type: 'bullet',
    initialSeconds: 60,
    incrementSeconds: 0,
    label: '1+0',
    description: '1 minute'
  },
  'bullet_1_1': {
    type: 'bullet',
    initialSeconds: 60,
    incrementSeconds: 1,
    label: '1+1',
    description: '1 minute + 1 second'
  },
  'bullet_2_1': {
    type: 'bullet',
    initialSeconds: 120,
    incrementSeconds: 1,
    label: '2+1',
    description: '2 minutes + 1 second'
  },
  // Blitz
  'blitz_3_0': {
    type: 'blitz',
    initialSeconds: 180,
    incrementSeconds: 0,
    label: '3+0',
    description: '3 minutes'
  },
  'blitz_3_2': {
    type: 'blitz',
    initialSeconds: 180,
    incrementSeconds: 2,
    label: '3+2',
    description: '3 minutes + 2 seconds'
  },
  'blitz_5_0': {
    type: 'blitz',
    initialSeconds: 300,
    incrementSeconds: 0,
    label: '5+0',
    description: '5 minutes'
  },
  'blitz_5_3': {
    type: 'blitz',
    initialSeconds: 300,
    incrementSeconds: 3,
    label: '5+3',
    description: '5 minutes + 3 seconds'
  },
  // Rapid
  'rapid_10_0': {
    type: 'rapid',
    initialSeconds: 600,
    incrementSeconds: 0,
    label: '10+0',
    description: '10 minutes'
  },
  'rapid_10_5': {
    type: 'rapid',
    initialSeconds: 600,
    incrementSeconds: 5,
    label: '10+5',
    description: '10 minutes + 5 seconds'
  },
  'rapid_15_10': {
    type: 'rapid',
    initialSeconds: 900,
    incrementSeconds: 10,
    label: '15+10',
    description: '15 minutes + 10 seconds'
  },
  'rapid_30_0': {
    type: 'rapid',
    initialSeconds: 1800,
    incrementSeconds: 0,
    label: '30+0',
    description: '30 minutes'
  },
  // Classical
  'classical_60_0': {
    type: 'classical',
    initialSeconds: 3600,
    incrementSeconds: 0,
    label: '60+0',
    description: '1 hour'
  },
  // Unlimited
  'unlimited': {
    type: 'unlimited',
    initialSeconds: 0,
    incrementSeconds: 0,
    label: '∞',
    description: 'No time limit'
  }
};

// ============================================
// GAME TYPES
// ============================================

export interface GameMove {
  from: string;
  to: string;
  san: string;
  promotion?: string;
  timestamp: number;
  timeRemainingMs: number;
}

export interface MultiplayerGame {
  id: string;
  
  // Players
  whitePlayerId: string | null;
  blackPlayerId: string | null;
  whitePlayer?: PlayerProfile;
  blackPlayer?: PlayerProfile;
  
  // Game state
  status: GameStatus;
  result: GameResult | null;
  termination: GameTermination | null;
  winnerId: string | null;
  
  // Position
  fen: string;
  pgn: string;
  moves: GameMove[];
  moveCount: number;
  turn: PlayerColor;
  
  // Time control
  timeControlType: TimeControlType;
  initialTimeSeconds: number;
  incrementSeconds: number;
  whiteTimeRemainingMs: number | null;
  blackTimeRemainingMs: number | null;
  lastMoveAt: string | null;
  
  // Draw/Rematch
  drawOfferFrom: string | null;
  rematchGameId: string | null;
  rematchOfferedBy: string | null;
  
  // Rating
  isRated: boolean;
  whiteRatingBefore: number | null;
  blackRatingBefore: number | null;
  whiteRatingAfter: number | null;
  blackRatingAfter: number | null;
  
  // Invite
  inviteCode: string | null;
  
  // Timestamps
  createdAt: string;
  startedAt: string | null;
  endedAt: string | null;
}

export interface GameInvite {
  id: string;
  fromUserId: string;
  toUserId: string | null;
  fromUser?: PlayerProfile;
  toUser?: PlayerProfile;
  
  status: InviteStatus;
  
  timeControlType: TimeControlType;
  initialTimeSeconds: number;
  incrementSeconds: number;
  isRated: boolean;
  challengerColor: 'w' | 'b' | 'r'; // r = random
  
  inviteCode: string | null;
  gameId: string | null;
  
  createdAt: string;
  expiresAt: string;
  respondedAt: string | null;
}

export interface PlayerProfile {
  id: string;
  username: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  rating: number;
}

export interface Friendship {
  id: string;
  userId: string;
  friendId: string;
  status: FriendStatus;
  user?: PlayerProfile;
  friend?: PlayerProfile;
  createdAt: string;
  acceptedAt: string | null;
}

export interface UserPresence {
  userId: string;
  status: OnlineStatus;
  currentGameId: string | null;
  lastSeenAt: string;
}

export interface GameChatMessage {
  id: string;
  gameId: string;
  userId: string;
  user?: PlayerProfile;
  message: string;
  createdAt: string;
}

// ============================================
// REALTIME EVENT TYPES
// ============================================

export interface GameUpdateEvent {
  type: 'move' | 'game_over' | 'draw_offer' | 'draw_decline' | 'rematch_offer' | 'player_joined' | 'time_update';
  game: MultiplayerGame;
  move?: GameMove;
}

export interface PresenceEvent {
  type: 'join' | 'leave' | 'sync';
  userId: string;
  presence: UserPresence;
}

// ============================================
// CREATE GAME OPTIONS
// ============================================

export interface CreateGameOptions {
  timeControl: string; // Key from TIME_CONTROLS
  isRated: boolean;
  color: 'w' | 'b' | 'r'; // w=white, b=black, r=random
}

export interface ChallengeOptions extends CreateGameOptions {
  targetUserId?: string; // Direct challenge to specific user
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getTimeControlLabel(type: TimeControlType): string {
  const labels: Record<TimeControlType, string> = {
    bullet: '⚡ Bullet',
    blitz: '🔥 Blitz',
    rapid: '⏱️ Rapid',
    classical: '🎯 Classical',
    correspondence: '📬 Correspondence',
    unlimited: '♾️ Unlimited'
  };
  return labels[type];
}

export function formatTime(ms: number): string {
  if (ms <= 0) return '0:00';
  
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function formatTimeWithTenths(ms: number): string {
  if (ms <= 0) return '0:00.0';
  
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const tenths = Math.floor((totalSeconds % 1) * 10);
  
  if (minutes === 0 && seconds < 20) {
    // Show tenths when under 20 seconds
    return `${seconds}.${tenths}`;
  }
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function getColorName(color: PlayerColor): string {
  return color === 'w' ? 'White' : 'Black';
}

export function getOpponentColor(color: PlayerColor): PlayerColor {
  return color === 'w' ? 'b' : 'w';
}









