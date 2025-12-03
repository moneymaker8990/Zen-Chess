// ============================================
// PLAY FRIEND PAGE
// Challenge friends to real-time chess games
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/state/useAuthStore';
import { useMultiplayerStore } from '@/state/multiplayerStore';
import {
  TIME_CONTROLS,
  getTimeControlLabel,
  createInvite,
  getInviteLink,
  acceptInviteByCode,
  getReceivedInvites,
  getSentInvites,
  getActiveGames,
  getFriends,
  getOnlineFriends,
  getPresence,
  subscribeToInvites,
  startPresenceHeartbeat,
  type TimeControl,
  type GameInvite,
  type PlayerProfile,
} from '@/lib/multiplayer';

// ============================================
// COMPONENT
// ============================================

export function PlayFriendPage() {
  const navigate = useNavigate();
  const { inviteCode } = useParams<{ inviteCode?: string }>();
  const { user, profile } = useAuthStore();
  
  const {
    receivedInvites,
    sentInvites,
    friends,
    onlineFriends,
    setReceivedInvites,
    setSentInvites,
    setFriends,
    setOnlineFriends,
    addReceivedInvite,
  } = useMultiplayerStore();

  // UI State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createdInvite, setCreatedInvite] = useState<GameInvite | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [joiningInvite, setJoiningInvite] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Load initial data
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      setIsLoading(true);
      try {
        const [receivedData, sentData, friendsData] = await Promise.all([
          getReceivedInvites(user.id),
          getSentInvites(user.id),
          getFriends(user.id),
        ]);
        
        setReceivedInvites(receivedData);
        setSentInvites(sentData);
        setFriends(friendsData);

        // Get presence for friends
        if (friendsData.length > 0) {
          const presenceMap = await getPresence(friendsData.map(f => f.id));
          setOnlineFriends(presenceMap);
        }
      } catch (e) {
        console.error('Failed to load data:', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    // Start presence heartbeat
    const stopHeartbeat = startPresenceHeartbeat(user.id);

    // Subscribe to invites
    const unsubscribe = subscribeToInvites(
      user.id,
      (invite) => addReceivedInvite(invite),
      () => {} // Handle invite updates if needed
    );

    return () => {
      stopHeartbeat();
      unsubscribe();
    };
  }, [user]);

  // Handle invite code from URL
  useEffect(() => {
    if (inviteCode && user) {
      handleJoinByCode(inviteCode);
    }
  }, [inviteCode, user]);

  const handleJoinByCode = async (code: string) => {
    if (!user) {
      navigate('/auth', { state: { redirectTo: `/play/friend/${code}` } });
      return;
    }

    setJoiningInvite(true);
    setError(null);

    try {
      const gameId = await acceptInviteByCode(code, user.id);
      if (gameId) {
        navigate(`/play/live/${gameId}`);
      } else {
        setError('Invalid or expired invite link');
      }
    } catch (e) {
      setError('Failed to join game');
    } finally {
      setJoiningInvite(false);
    }
  };

  const handleCopyLink = useCallback(async () => {
    if (!createdInvite?.inviteCode) return;
    
    const link = getInviteLink(createdInvite.inviteCode);
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [createdInvite]);

  // Require auth
  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">👥</div>
          <h2 className="text-2xl font-display" style={{ color: 'var(--text-primary)' }}>
            Sign in to play with friends
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Create an account to challenge friends and play rated games
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="btn-primary px-8"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
            Play a Friend
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Challenge friends to real-time chess games
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <span className="text-xl">⚔️</span>
          Create Challenge
        </button>
      </section>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl border"
          style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }}
        >
          <p style={{ color: '#ef4444' }}>{error}</p>
        </motion.div>
      )}

      {/* Quick Actions */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Create Game Card */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="card p-6 text-left hover:scale-[1.02] transition-transform group"
          style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(139, 92, 246, 0.05))' }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: 'linear-gradient(135deg, #a855f7, #7c3aed)' }}
            >
              🔗
            </div>
            <div>
              <h3 className="font-medium text-lg" style={{ color: 'var(--text-primary)' }}>
                Share Invite Link
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Anyone with the link can play
              </p>
            </div>
          </div>
        </button>

        {/* Join by Code */}
        <JoinByCodeCard onJoin={handleJoinByCode} isLoading={joiningInvite} />

        {/* Random Opponent (Future) */}
        <div
          className="card p-6 opacity-60"
          style={{ background: 'var(--bg-secondary)' }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              🎲
            </div>
            <div>
              <h3 className="font-medium text-lg" style={{ color: 'var(--text-secondary)' }}>
                Random Opponent
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Coming soon...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pending Invites */}
      {receivedInvites.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-medium flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <span className="text-xl">📩</span>
            Incoming Challenges
            <span className="badge badge-primary">{receivedInvites.length}</span>
          </h2>
          <div className="space-y-3">
            {receivedInvites.map((invite) => (
              <InviteCard
                key={invite.id}
                invite={invite}
                type="received"
                onAccept={async () => {
                  const gameId = await acceptInviteByCode(invite.inviteCode!, user.id);
                  if (gameId) navigate(`/play/live/${gameId}`);
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Sent Invites */}
      {sentInvites.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-medium flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <span className="text-xl">📤</span>
            Your Challenges
          </h2>
          <div className="space-y-3">
            {sentInvites.map((invite) => (
              <InviteCard
                key={invite.id}
                invite={invite}
                type="sent"
                onCopy={() => {
                  if (invite.inviteCode) {
                    navigator.clipboard.writeText(getInviteLink(invite.inviteCode));
                  }
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Online Friends */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span className="text-xl">👥</span>
          Friends
          <span 
            className="w-2 h-2 rounded-full"
            style={{ background: '#4ade80' }}
          />
        </h2>
        
        {friends.length === 0 ? (
          <div className="card p-8 text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
              No friends yet
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              Add friends to challenge them directly
            </p>
            <button 
              onClick={() => navigate('/social')}
              className="btn-secondary"
            >
              Find Friends
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {friends.map((friend) => {
              const presence = onlineFriends.get(friend.id);
              const isOnline = presence && presence.status !== 'offline';
              
              return (
                <FriendCard
                  key={friend.id}
                  friend={friend}
                  isOnline={isOnline || false}
                  status={presence?.status || 'offline'}
                  onChallenge={() => {
                    // TODO: Open challenge modal for this friend
                    setShowCreateModal(true);
                  }}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Create Game Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateGameModal
            onClose={() => setShowCreateModal(false)}
            onCreated={(invite) => {
              setCreatedInvite(invite);
              setShowCreateModal(false);
            }}
            userId={user.id}
          />
        )}
      </AnimatePresence>

      {/* Share Link Modal */}
      <AnimatePresence>
        {createdInvite && (
          <ShareLinkModal
            invite={createdInvite}
            onClose={() => setCreatedInvite(null)}
            onCopy={handleCopyLink}
            copied={copied}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// SUB-COMPONENTS
// ============================================

function JoinByCodeCard({ onJoin, isLoading }: { onJoin: (code: string) => void; isLoading: boolean }) {
  const [code, setCode] = useState('');
  const [showInput, setShowInput] = useState(false);

  if (!showInput) {
    return (
      <button
        onClick={() => setShowInput(true)}
        className="card p-6 text-left hover:scale-[1.02] transition-transform"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            🎯
          </div>
          <div>
            <h3 className="font-medium text-lg" style={{ color: 'var(--text-primary)' }}>
              Join by Code
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Enter an invite code
            </p>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="card p-4 space-y-3" style={{ background: 'var(--bg-secondary)' }}>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.trim())}
          placeholder="Enter invite code..."
          className="flex-1 px-4 py-2 rounded-lg text-sm"
          style={{ 
            background: 'var(--bg-elevated)', 
            border: '1px solid var(--border-default)',
            color: 'var(--text-primary)'
          }}
          autoFocus
        />
        <button
          onClick={() => code && onJoin(code)}
          disabled={!code || isLoading}
          className="btn-primary px-4"
        >
          {isLoading ? '...' : 'Join'}
        </button>
      </div>
      <button
        onClick={() => setShowInput(false)}
        className="text-sm"
        style={{ color: 'var(--text-muted)' }}
      >
        Cancel
      </button>
    </div>
  );
}

function InviteCard({ 
  invite, 
  type, 
  onAccept, 
  onCopy 
}: { 
  invite: GameInvite; 
  type: 'received' | 'sent';
  onAccept?: () => void;
  onCopy?: () => void;
}) {
  const timeControl = Object.values(TIME_CONTROLS).find(
    tc => tc.type === invite.timeControlType && 
         tc.initialSeconds === invite.initialTimeSeconds
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
          style={{ 
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            color: 'white'
          }}
        >
          {type === 'received' 
            ? invite.fromUser?.username?.[0]?.toUpperCase() || '?' 
            : invite.toUser?.username?.[0]?.toUpperCase() || '🔗'}
        </div>
        
        {/* Info */}
        <div>
          <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
            {type === 'received' 
              ? invite.fromUser?.displayName || invite.fromUser?.username || 'Anonymous'
              : invite.toUser?.displayName || 'Open Challenge'}
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            <span>{getTimeControlLabel(invite.timeControlType)}</span>
            <span>•</span>
            <span>{timeControl?.label || `${Math.floor(invite.initialTimeSeconds / 60)}+${invite.incrementSeconds}`}</span>
            {invite.isRated && (
              <>
                <span>•</span>
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--bg-tertiary)' }}>
                  Rated
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {type === 'received' && onAccept && (
          <button onClick={onAccept} className="btn-primary">
            Accept
          </button>
        )}
        {type === 'sent' && onCopy && (
          <button onClick={onCopy} className="btn-secondary">
            📋 Copy Link
          </button>
        )}
      </div>
    </motion.div>
  );
}

function FriendCard({ 
  friend, 
  isOnline, 
  status,
  onChallenge 
}: { 
  friend: PlayerProfile; 
  isOnline: boolean;
  status: string;
  onChallenge: () => void;
}) {
  return (
    <div className="card p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Avatar with status */}
        <div className="relative">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
            style={{ 
              background: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)'
            }}
          >
            {friend.username?.[0]?.toUpperCase() || friend.displayName?.[0]?.toUpperCase() || '?'}
          </div>
          <div 
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
            style={{ 
              background: isOnline ? '#4ade80' : 'var(--text-muted)',
              borderColor: 'var(--bg-secondary)'
            }}
          />
        </div>
        
        {/* Info */}
        <div>
          <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
            {friend.displayName || friend.username || 'Anonymous'}
          </div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {friend.rating} • {isOnline ? (status === 'in_game' ? 'In Game' : 'Online') : 'Offline'}
          </div>
        </div>
      </div>

      <button
        onClick={onChallenge}
        disabled={!isOnline}
        className="btn-secondary text-sm py-1.5 px-3 disabled:opacity-50"
      >
        ⚔️
      </button>
    </div>
  );
}

function CreateGameModal({ 
  onClose, 
  onCreated,
  userId 
}: { 
  onClose: () => void; 
  onCreated: (invite: GameInvite) => void;
  userId: string;
}) {
  const [selectedTimeControl, setSelectedTimeControl] = useState('rapid_10_0');
  const [isRated, setIsRated] = useState(true);
  const [color, setColor] = useState<'w' | 'b' | 'r'>('r');
  const [isCreating, setIsCreating] = useState(false);

  const timeControlGroups = {
    bullet: Object.entries(TIME_CONTROLS).filter(([, tc]) => tc.type === 'bullet'),
    blitz: Object.entries(TIME_CONTROLS).filter(([, tc]) => tc.type === 'blitz'),
    rapid: Object.entries(TIME_CONTROLS).filter(([, tc]) => tc.type === 'rapid'),
    classical: Object.entries(TIME_CONTROLS).filter(([, tc]) => tc.type === 'classical'),
  };

  const handleCreate = async () => {
    setIsCreating(true);
    const tc = TIME_CONTROLS[selectedTimeControl];
    
    const invite = await createInvite(userId, {
      timeControlType: tc.type,
      initialTimeSeconds: tc.initialSeconds,
      incrementSeconds: tc.incrementSeconds,
      isRated,
      challengerColor: color,
    });

    setIsCreating(false);
    
    if (invite) {
      onCreated(invite);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="card p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
            Create Challenge
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg">
            ✕
          </button>
        </div>

        {/* Time Control */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Time Control
          </h3>
          
          {Object.entries(timeControlGroups).map(([type, controls]) => (
            <div key={type} className="space-y-2">
              <div className="text-xs font-medium capitalize" style={{ color: 'var(--text-secondary)' }}>
                {getTimeControlLabel(type as any)}
              </div>
              <div className="flex flex-wrap gap-2">
                {controls.map(([key, tc]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTimeControl(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedTimeControl === key 
                        ? 'ring-2' 
                        : 'hover:bg-[var(--bg-tertiary)]'
                    }`}
                    style={{ 
                      background: selectedTimeControl === key 
                        ? 'rgba(168, 85, 247, 0.2)' 
                        : 'var(--bg-secondary)',
                      color: selectedTimeControl === key 
                        ? 'var(--accent-primary)' 
                        : 'var(--text-primary)',
                      borderColor: selectedTimeControl === key ? 'var(--accent-primary)' : 'transparent'
                    }}
                  >
                    {tc.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Color Selection */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Your Color
          </h3>
          <div className="flex gap-3">
            {[
              { value: 'r', label: 'Random', icon: '🎲' },
              { value: 'w', label: 'White', icon: '⬜' },
              { value: 'b', label: 'Black', icon: '⬛' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setColor(option.value as 'w' | 'b' | 'r')}
                className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                  color === option.value ? 'ring-2' : ''
                }`}
                style={{ 
                  background: color === option.value 
                    ? 'rgba(168, 85, 247, 0.2)' 
                    : 'var(--bg-secondary)',
                  borderColor: color === option.value ? 'var(--accent-primary)' : 'transparent'
                }}
              >
                <span className="text-lg">{option.icon}</span>
                <span style={{ color: color === option.value ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Rated Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl mb-6" style={{ background: 'var(--bg-secondary)' }}>
          <div>
            <div className="font-medium" style={{ color: 'var(--text-primary)' }}>Rated Game</div>
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Affects your rating
            </div>
          </div>
          <button
            onClick={() => setIsRated(!isRated)}
            className="w-12 h-7 rounded-full transition-all relative"
            style={{ 
              background: isRated ? 'var(--accent-primary)' : 'var(--bg-tertiary)'
            }}
          >
            <div 
              className="absolute top-1 w-5 h-5 rounded-full bg-white transition-all"
              style={{ left: isRated ? '26px' : '4px' }}
            />
          </button>
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          disabled={isCreating}
          className="btn-primary w-full py-3 text-lg"
        >
          {isCreating ? 'Creating...' : '⚔️ Create Challenge'}
        </button>
      </motion.div>
    </motion.div>
  );
}

function ShareLinkModal({ 
  invite, 
  onClose, 
  onCopy,
  copied 
}: { 
  invite: GameInvite; 
  onClose: () => void;
  onCopy: () => void;
  copied: boolean;
}) {
  const link = invite.inviteCode ? getInviteLink(invite.inviteCode) : '';
  const tc = Object.values(TIME_CONTROLS).find(
    t => t.type === invite.timeControlType && t.initialSeconds === invite.initialTimeSeconds
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="card p-6 w-full max-w-md text-center"
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="text-5xl mb-4">🔗</div>
        <h2 className="text-xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Challenge Created!
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          Share this link with your friend to start playing
        </p>

        {/* Game Info */}
        <div className="flex justify-center gap-3 mb-6">
          <span className="badge badge-primary">
            {tc?.label || `${Math.floor(invite.initialTimeSeconds / 60)}+${invite.incrementSeconds}`}
          </span>
          {invite.isRated && <span className="badge">Rated</span>}
        </div>

        {/* Link */}
        <div 
          className="p-4 rounded-xl mb-4 font-mono text-sm break-all"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
        >
          {link}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCopy}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            {copied ? '✓ Copied!' : '📋 Copy Link'}
          </button>
          <button onClick={onClose} className="btn-ghost">
            Close
          </button>
        </div>

        {/* Waiting indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent-primary)' }} />
          Waiting for opponent...
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PlayFriendPage;

