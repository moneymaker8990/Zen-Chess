// ============================================
// GAME INVITE SERVICE
// Challenge friends with shareable links
// ============================================

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { 
  GameInvite, 
  TimeControlType, 
  InviteStatus,
  PlayerProfile 
} from './types';

// ============================================
// CREATE INVITES
// ============================================

export interface CreateInviteOptions {
  timeControlType: TimeControlType;
  initialTimeSeconds: number;
  incrementSeconds: number;
  isRated: boolean;
  challengerColor: 'w' | 'b' | 'r';
  targetUserId?: string; // For direct challenges
}

/**
 * Create a game invite (link or direct challenge)
 */
export async function createInvite(
  fromUserId: string,
  options: CreateInviteOptions
): Promise<GameInvite | null> {
  if (!isSupabaseConfigured) return null;

  // Generate invite code for link sharing
  const inviteCode = generateInviteCode();

  const { data, error } = await supabase
    .from('game_invites')
    .insert({
      from_user_id: fromUserId,
      to_user_id: options.targetUserId || null,
      time_control_type: options.timeControlType,
      initial_time_seconds: options.initialTimeSeconds,
      increment_seconds: options.incrementSeconds,
      is_rated: options.isRated,
      challenger_color: options.challengerColor,
      invite_code: inviteCode,
      status: 'pending'
    })
    .select(`
      *,
      from_user:profiles!game_invites_from_user_id_fkey(id, username, display_name, avatar_url, rating)
    `)
    .single();

  if (error || !data) {
    console.error('Failed to create invite:', error);
    return null;
  }

  return mapInviteFromDb(data);
}

/**
 * Get the shareable link for an invite
 */
export function getInviteLink(inviteCode: string): string {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://yourapp.com';
  return `${baseUrl}/play/friend/${inviteCode}`;
}

// ============================================
// ACCEPT / DECLINE INVITES
// ============================================

/**
 * Accept an invite and create a game
 */
export async function acceptInvite(
  inviteId: string,
  acceptingUserId: string
): Promise<string | null> {
  if (!isSupabaseConfigured) return null;

  try {
    // Use the database function to handle race conditions
    const { data, error } = await supabase
      .rpc('accept_game_invite', {
        p_invite_id: inviteId,
        p_accepting_user_id: acceptingUserId
      });

    if (error) {
      console.error('Failed to accept invite:', error);
      return null;
    }

    return data as string;
  } catch (e) {
    console.error('Error accepting invite:', e);
    return null;
  }
}

/**
 * Accept an invite by code (from shared link)
 */
export async function acceptInviteByCode(
  inviteCode: string,
  acceptingUserId: string
): Promise<string | null> {
  if (!isSupabaseConfigured) return null;

  // Find the invite
  const { data: invite } = await supabase
    .from('game_invites')
    .select('id, from_user_id')
    .eq('invite_code', inviteCode)
    .eq('status', 'pending')
    .single();

  if (!invite) {
    console.error('Invite not found or already used');
    return null;
  }

  // Can't accept your own invite
  if (invite.from_user_id === acceptingUserId) {
    console.error('Cannot accept your own invite');
    return null;
  }

  return acceptInvite(invite.id, acceptingUserId);
}

/**
 * Decline an invite
 */
export async function declineInvite(inviteId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase
    .from('game_invites')
    .update({
      status: 'declined',
      responded_at: new Date().toISOString()
    })
    .eq('id', inviteId);

  return !error;
}

/**
 * Cancel an invite (by the creator)
 */
export async function cancelInvite(inviteId: string, userId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await supabase
    .from('game_invites')
    .update({
      status: 'cancelled',
      responded_at: new Date().toISOString()
    })
    .eq('id', inviteId)
    .eq('from_user_id', userId);

  return !error;
}

// ============================================
// FETCH INVITES
// ============================================

/**
 * Get pending invites sent to the user
 */
export async function getReceivedInvites(userId: string): Promise<GameInvite[]> {
  if (!isSupabaseConfigured) return [];

  const { data } = await supabase
    .from('game_invites')
    .select(`
      *,
      from_user:profiles!game_invites_from_user_id_fkey(id, username, display_name, avatar_url, rating)
    `)
    .eq('to_user_id', userId)
    .eq('status', 'pending')
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false });

  return data?.map(mapInviteFromDb) || [];
}

/**
 * Get pending invites created by the user
 */
export async function getSentInvites(userId: string): Promise<GameInvite[]> {
  if (!isSupabaseConfigured) return [];

  const { data } = await supabase
    .from('game_invites')
    .select(`
      *,
      to_user:profiles!game_invites_to_user_id_fkey(id, username, display_name, avatar_url, rating)
    `)
    .eq('from_user_id', userId)
    .eq('status', 'pending')
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false });

  return data?.map(mapInviteFromDb) || [];
}

/**
 * Get invite by code (for accepting via link)
 */
export async function getInviteByCode(inviteCode: string): Promise<GameInvite | null> {
  if (!isSupabaseConfigured) return null;

  const { data } = await supabase
    .from('game_invites')
    .select(`
      *,
      from_user:profiles!game_invites_from_user_id_fkey(id, username, display_name, avatar_url, rating)
    `)
    .eq('invite_code', inviteCode)
    .single();

  if (!data) return null;

  return mapInviteFromDb(data);
}

// ============================================
// REALTIME SUBSCRIPTION
// ============================================

/**
 * Subscribe to incoming invites
 */
export function subscribeToInvites(
  userId: string,
  onNewInvite: (invite: GameInvite) => void,
  onInviteUpdate: (invite: GameInvite) => void
) {
  const channel = supabase
    .channel(`invites:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'game_invites',
        filter: `to_user_id=eq.${userId}`
      },
      async (payload) => {
        // Fetch full invite with user data
        const invite = await getInviteById(payload.new.id);
        if (invite) onNewInvite(invite);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'game_invites',
        filter: `from_user_id=eq.${userId}`
      },
      async (payload) => {
        const invite = await getInviteById(payload.new.id);
        if (invite) onInviteUpdate(invite);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

async function getInviteById(id: string): Promise<GameInvite | null> {
  const { data } = await supabase
    .from('game_invites')
    .select(`
      *,
      from_user:profiles!game_invites_from_user_id_fkey(id, username, display_name, avatar_url, rating),
      to_user:profiles!game_invites_to_user_id_fkey(id, username, display_name, avatar_url, rating)
    `)
    .eq('id', id)
    .single();

  return data ? mapInviteFromDb(data) : null;
}

// ============================================
// UTILITIES
// ============================================

function generateInviteCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function mapInviteFromDb(data: any): GameInvite {
  return {
    id: data.id,
    fromUserId: data.from_user_id,
    toUserId: data.to_user_id,
    fromUser: data.from_user ? {
      id: data.from_user.id,
      username: data.from_user.username,
      displayName: data.from_user.display_name,
      avatarUrl: data.from_user.avatar_url,
      rating: data.from_user.rating
    } : undefined,
    toUser: data.to_user ? {
      id: data.to_user.id,
      username: data.to_user.username,
      displayName: data.to_user.display_name,
      avatarUrl: data.to_user.avatar_url,
      rating: data.to_user.rating
    } : undefined,
    status: data.status as InviteStatus,
    timeControlType: data.time_control_type,
    initialTimeSeconds: data.initial_time_seconds,
    incrementSeconds: data.increment_seconds,
    isRated: data.is_rated,
    challengerColor: data.challenger_color,
    inviteCode: data.invite_code,
    gameId: data.game_id,
    createdAt: data.created_at,
    expiresAt: data.expires_at,
    respondedAt: data.responded_at
  };
}






