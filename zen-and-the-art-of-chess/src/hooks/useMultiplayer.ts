// ============================================
// MULTIPLAYER HOOK
// Easy access to multiplayer functionality
// ============================================

import { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/state/useAuthStore';
import { useMultiplayerStore } from '@/state/multiplayerStore';
import {
  createInvite,
  getInviteLink,
  acceptInviteByCode,
  getReceivedInvites,
  getSentInvites,
  getActiveGames,
  getFriends,
  getPresence,
  subscribeToInvites,
  startPresenceHeartbeat,
  type CreateInviteOptions,
  type TimeControlType,
} from '@/lib/multiplayer';

// ============================================
// HOOK
// ============================================

export function useMultiplayer() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    receivedInvites,
    sentInvites,
    myGames,
    friends,
    onlineFriends,
    setReceivedInvites,
    setSentInvites,
    setMyGames,
    setFriends,
    setOnlineFriends,
    addReceivedInvite,
    removeInvite,
    setError,
  } = useMultiplayerStore();

  const cleanupRef = useRef<(() => void) | null>(null);

  // Initialize multiplayer system
  useEffect(() => {
    if (!user) return;

    const initialize = async () => {
      try {
        // Load all data in parallel
        const [receivedData, sentData, activeData, friendsData] = await Promise.all([
          getReceivedInvites(user.id),
          getSentInvites(user.id),
          getActiveGames(user.id),
          getFriends(user.id),
        ]);

        setReceivedInvites(receivedData);
        setSentInvites(sentData);
        setMyGames(activeData);
        setFriends(friendsData);

        // Get friend presence
        if (friendsData.length > 0) {
          const presenceMap = await getPresence(friendsData.map(f => f.id));
          setOnlineFriends(presenceMap);
        }

        // Start presence heartbeat
        const stopHeartbeat = startPresenceHeartbeat(user.id);

        // Subscribe to invites
        const unsubscribeInvites = subscribeToInvites(
          user.id,
          (invite) => addReceivedInvite(invite),
          (invite) => {
            // Handle invite updates (accepted, declined, etc.)
            if (invite.status === 'accepted' && invite.gameId) {
              removeInvite(invite.id);
              // Navigate to game if this was our sent invite
              if (invite.fromUserId === user.id) {
                navigate(`/play/live/${invite.gameId}`);
              }
            } else if (invite.status !== 'pending') {
              removeInvite(invite.id);
            }
          }
        );

        // Store cleanup functions
        cleanupRef.current = () => {
          stopHeartbeat();
          unsubscribeInvites();
        };
      } catch (error) {
        console.error('Failed to initialize multiplayer:', error);
        setError('Failed to connect to multiplayer');
      }
    };

    initialize();

    return () => {
      cleanupRef.current?.();
    };
  }, [user]);

  // Create a new challenge
  const createChallenge = useCallback(async (options: {
    timeControl: string;
    isRated?: boolean;
    color?: 'w' | 'b' | 'r';
    targetUserId?: string;
  }) => {
    if (!user) return null;

    // Parse time control
    const [type, initial, increment] = parseTimeControl(options.timeControl);

    const invite = await createInvite(user.id, {
      timeControlType: type,
      initialTimeSeconds: initial,
      incrementSeconds: increment,
      isRated: options.isRated ?? true,
      challengerColor: options.color ?? 'r',
      targetUserId: options.targetUserId,
    });

    if (invite) {
      // Update local state
      const currentSent = useMultiplayerStore.getState().sentInvites;
      setSentInvites([invite, ...currentSent]);
      return {
        invite,
        link: invite.inviteCode ? getInviteLink(invite.inviteCode) : null,
      };
    }

    return null;
  }, [user, setSentInvites]);

  // Join a game by invite code
  const joinByCode = useCallback(async (code: string) => {
    if (!user) {
      navigate('/auth', { state: { redirectTo: `/play/friend/${code}` } });
      return null;
    }

    const gameId = await acceptInviteByCode(code, user.id);
    if (gameId) {
      navigate(`/play/live/${gameId}`);
      return gameId;
    }
    return null;
  }, [user, navigate]);

  // Quick play helpers
  const quickPlayBullet = useCallback(() => 
    createChallenge({ timeControl: 'bullet_1_1' }), [createChallenge]);
  
  const quickPlayBlitz = useCallback(() => 
    createChallenge({ timeControl: 'blitz_5_0' }), [createChallenge]);
  
  const quickPlayRapid = useCallback(() => 
    createChallenge({ timeControl: 'rapid_10_0' }), [createChallenge]);

  return {
    // State
    receivedInvites,
    sentInvites,
    myGames,
    friends,
    onlineFriends,
    isAuthenticated: !!user,

    // Actions
    createChallenge,
    joinByCode,

    // Quick play
    quickPlayBullet,
    quickPlayBlitz,
    quickPlayRapid,

    // Computed
    hasInvites: receivedInvites.length > 0,
    inviteCount: receivedInvites.length,
  };
}

// ============================================
// HELPERS
// ============================================

function parseTimeControl(key: string): [TimeControlType, number, number] {
  // Parse formats like "bullet_1_0", "blitz_5_3", "rapid_10_5"
  const parts = key.split('_');
  const type = parts[0] as TimeControlType;
  const minutes = parseInt(parts[1]) || 10;
  const increment = parseInt(parts[2]) || 0;
  
  return [type, minutes * 60, increment];
}

// ============================================
// NOTIFICATION HOOK
// ============================================

export function useMultiplayerNotifications() {
  const { receivedInvites } = useMultiplayerStore();
  const prevCountRef = useRef(0);

  useEffect(() => {
    // Play notification sound when new invite arrives
    if (receivedInvites.length > prevCountRef.current) {
      // Could add sound notification here
      // playNotificationSound();
    }
    prevCountRef.current = receivedInvites.length;
  }, [receivedInvites.length]);

  return {
    hasNotifications: receivedInvites.length > 0,
    count: receivedInvites.length,
  };
}





