// ============================================
// MULTIPLAYER MODULE
// Export all multiplayer functionality
// ============================================

// Types
export * from './types';

// Game engine
export { 
  MultiplayerGameEngine,
  createGame,
  joinGame,
  joinGameByCode,
  getActiveGames,
  getGameHistory
} from './gameEngine';

// Invite service
export {
  createInvite,
  getInviteLink,
  acceptInvite,
  acceptInviteByCode,
  declineInvite,
  cancelInvite,
  getReceivedInvites,
  getSentInvites,
  getInviteByCode,
  subscribeToInvites
} from './inviteService';

// Friend service
export {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
  blockUser,
  getFriends,
  getPendingRequests,
  getSentRequests,
  areFriends,
  searchUsers,
  updatePresence,
  getPresence,
  getOnlineFriends,
  startPresenceHeartbeat,
  subscribeToPresence,
  subscribeToFriendRequests
} from './friendService';

