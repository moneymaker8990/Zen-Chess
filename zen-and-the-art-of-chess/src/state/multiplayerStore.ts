// ============================================
// MULTIPLAYER STORE
// Central state for real-time multiplayer games
// ============================================

import { create } from 'zustand';
import type { 
  MultiplayerGame, 
  GameInvite, 
  PlayerProfile,
  UserPresence 
} from '@/lib/multiplayer/types';

// ============================================
// TYPES
// ============================================

interface MultiplayerState {
  // Current game
  activeGame: MultiplayerGame | null;
  isInGame: boolean;
  
  // Game list
  myGames: MultiplayerGame[];
  gameHistory: MultiplayerGame[];
  
  // Invites
  receivedInvites: GameInvite[];
  sentInvites: GameInvite[];
  
  // Friends
  friends: PlayerProfile[];
  pendingRequests: PlayerProfile[];
  onlineFriends: Map<string, UserPresence>;
  
  // UI State
  isCreatingGame: boolean;
  isJoiningGame: boolean;
  error: string | null;
  
  // Actions
  setActiveGame: (game: MultiplayerGame | null) => void;
  updateActiveGame: (game: MultiplayerGame) => void;
  setMyGames: (games: MultiplayerGame[]) => void;
  setGameHistory: (games: MultiplayerGame[]) => void;
  
  setReceivedInvites: (invites: GameInvite[]) => void;
  setSentInvites: (invites: GameInvite[]) => void;
  addReceivedInvite: (invite: GameInvite) => void;
  removeInvite: (inviteId: string) => void;
  
  setFriends: (friends: PlayerProfile[]) => void;
  setPendingRequests: (requests: PlayerProfile[]) => void;
  updateFriendPresence: (userId: string, presence: UserPresence) => void;
  setOnlineFriends: (presences: Map<string, UserPresence>) => void;
  
  setCreatingGame: (creating: boolean) => void;
  setJoiningGame: (joining: boolean) => void;
  setError: (error: string | null) => void;
  
  reset: () => void;
}

// ============================================
// INITIAL STATE
// ============================================

const initialState = {
  activeGame: null,
  isInGame: false,
  myGames: [],
  gameHistory: [],
  receivedInvites: [],
  sentInvites: [],
  friends: [],
  pendingRequests: [],
  onlineFriends: new Map<string, UserPresence>(),
  isCreatingGame: false,
  isJoiningGame: false,
  error: null,
};

// ============================================
// STORE
// ============================================

export const useMultiplayerStore = create<MultiplayerState>((set, get) => ({
  ...initialState,
  
  setActiveGame: (game) => set({ 
    activeGame: game, 
    isInGame: !!game 
  }),
  
  updateActiveGame: (game) => set((state) => ({
    activeGame: state.activeGame?.id === game.id ? game : state.activeGame
  })),
  
  setMyGames: (games) => set({ myGames: games }),
  
  setGameHistory: (games) => set({ gameHistory: games }),
  
  setReceivedInvites: (invites) => set({ receivedInvites: invites }),
  
  setSentInvites: (invites) => set({ sentInvites: invites }),
  
  addReceivedInvite: (invite) => set((state) => ({
    receivedInvites: [invite, ...state.receivedInvites]
  })),
  
  removeInvite: (inviteId) => set((state) => ({
    receivedInvites: state.receivedInvites.filter(i => i.id !== inviteId),
    sentInvites: state.sentInvites.filter(i => i.id !== inviteId)
  })),
  
  setFriends: (friends) => set({ friends }),
  
  setPendingRequests: (requests) => set({ pendingRequests: requests }),
  
  updateFriendPresence: (userId, presence) => set((state) => {
    const newOnlineFriends = new Map(state.onlineFriends);
    newOnlineFriends.set(userId, presence);
    return { onlineFriends: newOnlineFriends };
  }),
  
  setOnlineFriends: (presences) => set({ onlineFriends: presences }),
  
  setCreatingGame: (creating) => set({ isCreatingGame: creating }),
  
  setJoiningGame: (joining) => set({ isJoiningGame: joining }),
  
  setError: (error) => set({ error }),
  
  reset: () => set(initialState),
}));

// ============================================
// SELECTORS
// ============================================

export const selectActiveGame = (state: MultiplayerState) => state.activeGame;
export const selectIsInGame = (state: MultiplayerState) => state.isInGame;
export const selectReceivedInvites = (state: MultiplayerState) => state.receivedInvites;
export const selectOnlineFriends = (state: MultiplayerState) => 
  state.friends.filter(f => {
    const presence = state.onlineFriends.get(f.id);
    return presence && presence.status !== 'offline';
  });





