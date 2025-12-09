// ============================================
// FRIEND SERVICE
// Manage friendships and online status
// ============================================

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { 
  Friendship, 
  FriendStatus, 
  UserPresence,
  OnlineStatus,
  PlayerProfile 
} from './types';

// ============================================
// FRIEND REQUESTS
// ============================================

/**
 * Send a friend request
 */
export async function sendFriendRequest(
  userId: string,
  friendId: string
): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  if (userId === friendId) return false;

  // Check if friendship already exists
  const { data: existing } = await supabase
    .from('friends')
    .select('id, status')
    .or(`and(user_id.eq.${userId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${userId})`)
    .single();

  if (existing) {
    // Already friends or request pending
    return false;
  }

  const { error } = await supabase
    .from('friends')
    .insert({
      user_id: userId,
      friend_id: friendId,
      status: 'pending'
    });

  return !error;
}

/**
 * Accept a friend request
 */
export async function acceptFriendRequest(friendshipId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase
    .from('friends')
    .update({
      status: 'accepted',
      accepted_at: new Date().toISOString()
    })
    .eq('id', friendshipId);

  return !error;
}

/**
 * Decline/reject a friend request
 */
export async function declineFriendRequest(friendshipId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase
    .from('friends')
    .delete()
    .eq('id', friendshipId);

  return !error;
}

/**
 * Remove a friend
 */
export async function removeFriend(
  userId: string,
  friendId: string
): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase
    .from('friends')
    .delete()
    .or(`and(user_id.eq.${userId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${userId})`);

  return !error;
}

/**
 * Block a user
 */
export async function blockUser(
  userId: string,
  blockedUserId: string
): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  // Remove existing friendship if any
  await removeFriend(userId, blockedUserId);

  // Create blocked relationship
  const { error } = await supabase
    .from('friends')
    .insert({
      user_id: userId,
      friend_id: blockedUserId,
      status: 'blocked'
    });

  return !error;
}

// ============================================
// FETCH FRIENDS
// ============================================

/**
 * Get all accepted friends
 */
export async function getFriends(userId: string): Promise<PlayerProfile[]> {
  if (!isSupabaseConfigured) return [];

  const { data } = await supabase
    .from('friends')
    .select(`
      id,
      user_id,
      friend_id,
      status,
      user:profiles!friends_user_id_fkey(id, username, display_name, avatar_url, rating),
      friend:profiles!friends_friend_id_fkey(id, username, display_name, avatar_url, rating)
    `)
    .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
    .eq('status', 'accepted');

  if (!data) return [];

  // Map to friend profiles (the other person in the friendship)
  return data.map(f => {
    const isSender = f.user_id === userId;
    const friendProfile = isSender ? f.friend : f.user;
    return {
      id: friendProfile.id,
      username: friendProfile.username,
      displayName: friendProfile.display_name,
      avatarUrl: friendProfile.avatar_url,
      rating: friendProfile.rating
    };
  });
}

/**
 * Get pending friend requests (received)
 */
export async function getPendingRequests(userId: string): Promise<Friendship[]> {
  if (!isSupabaseConfigured) return [];

  const { data } = await supabase
    .from('friends')
    .select(`
      *,
      user:profiles!friends_user_id_fkey(id, username, display_name, avatar_url, rating)
    `)
    .eq('friend_id', userId)
    .eq('status', 'pending');

  return data?.map(mapFriendshipFromDb) || [];
}

/**
 * Get sent friend requests
 */
export async function getSentRequests(userId: string): Promise<Friendship[]> {
  if (!isSupabaseConfigured) return [];

  const { data } = await supabase
    .from('friends')
    .select(`
      *,
      friend:profiles!friends_friend_id_fkey(id, username, display_name, avatar_url, rating)
    `)
    .eq('user_id', userId)
    .eq('status', 'pending');

  return data?.map(mapFriendshipFromDb) || [];
}

/**
 * Check if two users are friends
 */
export async function areFriends(userId: string, otherUserId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { data } = await supabase
    .from('friends')
    .select('id')
    .or(`and(user_id.eq.${userId},friend_id.eq.${otherUserId}),and(user_id.eq.${otherUserId},friend_id.eq.${userId})`)
    .eq('status', 'accepted')
    .single();

  return !!data;
}

/**
 * Search users by username
 */
export async function searchUsers(query: string, currentUserId: string): Promise<PlayerProfile[]> {
  if (!isSupabaseConfigured || query.length < 2) return [];

  const { data } = await supabase
    .from('profiles')
    .select('id, username, display_name, avatar_url, rating')
    .neq('id', currentUserId)
    .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
    .limit(10);

  return data?.map(p => ({
    id: p.id,
    username: p.username,
    displayName: p.display_name,
    avatarUrl: p.avatar_url,
    rating: p.rating
  })) || [];
}

// ============================================
// PRESENCE MANAGEMENT
// ============================================

/**
 * Update user's online status
 */
export async function updatePresence(
  userId: string,
  status: OnlineStatus,
  currentGameId?: string | null
): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase
    .from('presence')
    .upsert({
      user_id: userId,
      status,
      current_game_id: currentGameId || null,
      last_seen_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

  return !error;
}

/**
 * Get presence for multiple users
 */
export async function getPresence(userIds: string[]): Promise<Map<string, UserPresence>> {
  if (!isSupabaseConfigured || userIds.length === 0) return new Map();

  const { data } = await supabase
    .from('presence')
    .select('*')
    .in('user_id', userIds);

  const presenceMap = new Map<string, UserPresence>();
  
  data?.forEach(p => {
    presenceMap.set(p.user_id, {
      userId: p.user_id,
      status: p.status as OnlineStatus,
      currentGameId: p.current_game_id,
      lastSeenAt: p.last_seen_at
    });
  });

  // Add offline status for users not in presence table
  userIds.forEach(id => {
    if (!presenceMap.has(id)) {
      presenceMap.set(id, {
        userId: id,
        status: 'offline',
        currentGameId: null,
        lastSeenAt: ''
      });
    }
  });

  return presenceMap;
}

/**
 * Get online friends
 */
export async function getOnlineFriends(userId: string): Promise<PlayerProfile[]> {
  const friends = await getFriends(userId);
  if (friends.length === 0) return [];

  const friendIds = friends.map(f => f.id);
  const presenceMap = await getPresence(friendIds);

  return friends.filter(f => {
    const presence = presenceMap.get(f.id);
    return presence && presence.status !== 'offline';
  });
}

// ============================================
// PRESENCE HEARTBEAT
// ============================================

let heartbeatInterval: number | null = null;

/**
 * Start presence heartbeat (call on app mount)
 */
export function startPresenceHeartbeat(userId: string) {
  // Initial update
  updatePresence(userId, 'online');

  // Set up interval (every 30 seconds)
  heartbeatInterval = window.setInterval(() => {
    updatePresence(userId, 'online');
  }, 30000);

  // Handle visibility change
  const handleVisibilityChange = () => {
    if (document.hidden) {
      updatePresence(userId, 'away');
    } else {
      updatePresence(userId, 'online');
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Handle page unload
  const handleUnload = () => {
    // Use sendBeacon for reliable offline status
    const data = JSON.stringify({
      user_id: userId,
      status: 'offline'
    });
    navigator.sendBeacon?.('/api/presence-offline', data);
    updatePresence(userId, 'offline');
  };

  window.addEventListener('beforeunload', handleUnload);

  return () => {
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('beforeunload', handleUnload);
    updatePresence(userId, 'offline');
  };
}

// ============================================
// REALTIME SUBSCRIPTIONS
// ============================================

/**
 * Subscribe to presence changes for specific users
 */
export function subscribeToPresence(
  userIds: string[],
  onPresenceChange: (presence: UserPresence) => void
) {
  if (userIds.length === 0) return () => {};

  const channel = supabase
    .channel('presence-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'presence',
        filter: `user_id=in.(${userIds.join(',')})`
      },
      (payload) => {
        if (payload.new) {
          const p = payload.new as any;
          onPresenceChange({
            userId: p.user_id,
            status: p.status,
            currentGameId: p.current_game_id,
            lastSeenAt: p.last_seen_at
          });
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Subscribe to friend request changes
 */
export function subscribeToFriendRequests(
  userId: string,
  onNewRequest: (friendship: Friendship) => void,
  onRequestUpdate: (friendship: Friendship) => void
) {
  const channel = supabase
    .channel(`friends:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'friends',
        filter: `friend_id=eq.${userId}`
      },
      async (payload) => {
        const friendship = await getFriendshipById(payload.new.id);
        if (friendship) onNewRequest(friendship);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'friends',
        filter: `user_id=eq.${userId}`
      },
      async (payload) => {
        const friendship = await getFriendshipById(payload.new.id);
        if (friendship) onRequestUpdate(friendship);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

async function getFriendshipById(id: string): Promise<Friendship | null> {
  const { data } = await supabase
    .from('friends')
    .select(`
      *,
      user:profiles!friends_user_id_fkey(id, username, display_name, avatar_url, rating),
      friend:profiles!friends_friend_id_fkey(id, username, display_name, avatar_url, rating)
    `)
    .eq('id', id)
    .single();

  return data ? mapFriendshipFromDb(data) : null;
}

// ============================================
// UTILITIES
// ============================================

function mapFriendshipFromDb(data: any): Friendship {
  return {
    id: data.id,
    userId: data.user_id,
    friendId: data.friend_id,
    status: data.status as FriendStatus,
    user: data.user ? {
      id: data.user.id,
      username: data.user.username,
      displayName: data.user.display_name,
      avatarUrl: data.user.avatar_url,
      rating: data.user.rating
    } : undefined,
    friend: data.friend ? {
      id: data.friend.id,
      username: data.friend.username,
      displayName: data.friend.display_name,
      avatarUrl: data.friend.avatar_url,
      rating: data.friend.rating
    } : undefined,
    createdAt: data.created_at,
    acceptedAt: data.accepted_at
  };
}






