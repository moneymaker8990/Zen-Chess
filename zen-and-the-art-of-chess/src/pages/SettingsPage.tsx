import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '@/state/useStore';
import { useStudyStore, useNotesStore, useWeaknessStore } from '@/state/notesStore';
import { useMistakeLibraryStore, usePositionSparringStore } from '@/state/trainingStore';
import { useBoardSettingsStore, useBoardStyles } from '@/state/boardSettingsStore';
import { useAIPreferencesStore, type AIIntrusiveness, type WhisperFrequency, type InsightDetail } from '@/state/aiPreferencesStore';
import { useAuthStore } from '@/state/useAuthStore';
import { isSupabaseConfigured } from '@/lib/supabase';
import { BOARD_THEMES, PIECE_STYLES, MOVE_HINT_STYLES } from '@/lib/constants';
import type { BoardTheme, PieceStyle, MoveHintStyle } from '@/lib/constants';

// ============================================
// ACCOUNT SECTION COMPONENT
// ============================================

function AccountSection() {
  const navigate = useNavigate();
  const { user, profile, signOut, subscriptionTier, isLoading } = useAuthStore();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    setIsSigningOut(false);
  };

  // If Supabase isn't configured yet
  if (!isSupabaseConfigured) {
    return (
      <section className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">👤</span>
          <div>
            <h2 className="text-lg font-serif text-zen-200">Account</h2>
            <p className="text-zen-600 text-sm">Sign in to sync your progress</p>
          </div>
        </div>
        
        <div className="p-6 rounded-xl text-center" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
          <div className="text-4xl mb-3">🔧</div>
          <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Cloud Sync Coming Soon
          </h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
            Your progress is saved locally on this device. Cloud sync and user accounts are being set up.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Data safely stored in browser
          </div>
        </div>
      </section>
    );
  }

  // If not logged in
  if (!user) {
    return (
      <section className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">👤</span>
          <div>
            <h2 className="text-lg font-serif text-zen-200">Account</h2>
            <p className="text-zen-600 text-sm">Sign in to sync your progress across devices</p>
          </div>
        </div>
        
        <div className="p-6 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                Join Zen Chess
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                Create an account to save your progress, unlock premium features, and sync across all your devices.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => navigate('/auth?mode=signin')}
                className="px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105"
                style={{ 
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/auth?mode=signup')}
                className="px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105"
                style={{ 
                  background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                  color: 'white',
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
        
        {/* Benefits preview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {[
            { icon: '☁️', label: 'Cloud Sync' },
            { icon: '📊', label: 'Progress Tracking' },
            { icon: '🏆', label: 'Leaderboards' },
            { icon: '👑', label: 'Premium Access' },
          ].map((benefit, i) => (
            <div key={i} className="text-center p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
              <div className="text-xl mb-1">{benefit.icon}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{benefit.label}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Logged in - show user info
  const tierColors: Record<string, string> = {
    free: '#6b7280',
    premium: '#a855f7',
    lifetime: '#f59e0b',
  };

  const tierLabels: Record<string, string> = {
    free: 'Free',
    premium: 'Premium',
    lifetime: 'Lifetime',
  };

  return (
    <section className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">👤</span>
        <div>
          <h2 className="text-lg font-serif text-zen-200">Account</h2>
          <p className="text-zen-600 text-sm">Manage your account and subscription</p>
        </div>
      </div>
      
      {/* User Info Card */}
      <div className="p-5 rounded-xl mb-4" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0"
            style={{ 
              background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
              color: 'white',
            }}
          >
            {user.email?.[0]?.toUpperCase() || '?'}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>
              {profile?.display_name || user.email}
            </div>
            {profile?.display_name && (
              <div className="text-sm truncate" style={{ color: 'var(--text-muted)' }}>
                {user.email}
              </div>
            )}
            <div className="flex items-center gap-2 mt-1">
              <span 
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ 
                  background: `${tierColors[subscriptionTier]}20`,
                  color: tierColors[subscriptionTier],
                }}
              >
                {tierLabels[subscriptionTier]}
              </span>
              {subscriptionTier === 'free' && (
                <button
                  onClick={() => navigate('/pricing')}
                  className="text-xs font-medium"
                  style={{ color: '#a855f7' }}
                >
                  Upgrade →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Stats if logged in */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
          <div className="text-lg font-bold" style={{ color: '#4ade80' }}>☁️</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Synced</div>
        </div>
        <div className="text-center p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
          <div className="text-lg font-bold" style={{ color: '#f59e0b' }}>
            {subscriptionTier === 'free' ? '∞' : '∞'}
          </div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {subscriptionTier === 'free' ? 'Daily Puzzles' : 'Unlimited'}
          </div>
        </div>
        <div className="text-center p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
          <div className="text-lg font-bold" style={{ color: '#a855f7' }}>
            {subscriptionTier !== 'free' ? '✓' : '—'}
          </div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>AI Coach</div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {subscriptionTier === 'free' && (
          <button
            onClick={() => navigate('/pricing')}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              color: 'white',
            }}
          >
            ⭐ Upgrade to Premium
          </button>
        )}
        <button
          onClick={handleSignOut}
          disabled={isSigningOut || isLoading}
          className="px-4 py-2 rounded-lg text-sm transition-all hover:bg-[var(--bg-hover)] disabled:opacity-50"
          style={{ 
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)',
          }}
        >
          {isSigningOut ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    </section>
  );
}

// ============================================
// AI PREFERENCES SECTION COMPONENT
// ============================================

function AIPreferencesSection() {
  const {
    intrusiveness,
    insightDetail,
    whisperFrequency,
    showAskAnything,
    showWhispers,
    showPuzzleInsights,
    autoPuzzleAnalysis,
    showMoveExplanations,
    showOpeningInsights,
    showAgentPresence,
    setPreference,
    toggleFeature,
    setQuickProfile,
  } = useAIPreferencesStore();

  const intrusivenesOptions: { value: AIIntrusiveness; label: string; desc: string }[] = [
    { value: 'minimal', label: 'Minimal', desc: 'AI only when you ask' },
    { value: 'balanced', label: 'Balanced', desc: 'Helpful suggestions' },
    { value: 'proactive', label: 'Proactive', desc: 'Active coaching' },
  ];

  const whisperOptions: { value: WhisperFrequency; label: string }[] = [
    { value: 'off', label: 'Off' },
    { value: 'rare', label: 'Rare' },
    { value: 'occasional', label: 'Occasional' },
    { value: 'frequent', label: 'Frequent' },
  ];

  const detailOptions: { value: InsightDetail; label: string }[] = [
    { value: 'brief', label: 'Brief' },
    { value: 'standard', label: 'Standard' },
    { value: 'comprehensive', label: 'Detailed' },
  ];

  return (
    <section className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🧠</span>
        <div>
          <h2 className="text-lg font-serif text-zen-200">AI Coach Settings</h2>
          <p className="text-zen-600 text-sm">Control how the AI assists you</p>
        </div>
      </div>

      {/* Quick Profiles */}
      <div className="mb-6">
        <label className="block text-zen-400 text-sm mb-3">Quick Profiles</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setQuickProfile('minimal')}
            className={`p-3 rounded-lg border transition-all ${
              intrusiveness === 'minimal' && whisperFrequency === 'off'
                ? 'bg-gold-500/20 border-gold-500/50'
                : 'bg-zen-800/40 border-zen-700/30 hover:border-zen-600/50'
            }`}
          >
            <div className="text-xl mb-1">🤫</div>
            <div className="text-xs font-medium text-zen-300">Quiet Mode</div>
            <div className="text-xs text-zen-600">AI on demand</div>
          </button>
          <button
            onClick={() => setQuickProfile('balanced')}
            className={`p-3 rounded-lg border transition-all ${
              intrusiveness === 'balanced'
                ? 'bg-gold-500/20 border-gold-500/50'
                : 'bg-zen-800/40 border-zen-700/30 hover:border-zen-600/50'
            }`}
          >
            <div className="text-xl mb-1">⚖️</div>
            <div className="text-xs font-medium text-zen-300">Balanced</div>
            <div className="text-xs text-zen-600">Helpful tips</div>
          </button>
          <button
            onClick={() => setQuickProfile('immersive')}
            className={`p-3 rounded-lg border transition-all ${
              intrusiveness === 'proactive'
                ? 'bg-gold-500/20 border-gold-500/50'
                : 'bg-zen-800/40 border-zen-700/30 hover:border-zen-600/50'
            }`}
          >
            <div className="text-xl mb-1">🎓</div>
            <div className="text-xs font-medium text-zen-300">Immersive</div>
            <div className="text-xs text-zen-600">Active coaching</div>
          </button>
        </div>
      </div>

      {/* AI Intrusiveness */}
      <div className="mb-6">
        <label className="block text-zen-400 text-sm mb-3">AI Activity Level</label>
        <div className="flex gap-2">
          {intrusivenesOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPreference('intrusiveness', opt.value)}
              className={`flex-1 p-3 rounded-lg transition-all ${
                intrusiveness === opt.value
                  ? 'bg-gold-500/20 border border-gold-500/50'
                  : 'bg-zen-800/40 border border-zen-700/30 hover:border-zen-600/50'
              }`}
            >
              <div className="text-sm font-medium text-zen-300">{opt.label}</div>
              <div className="text-xs text-zen-500">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Whisper Frequency */}
      <div className="mb-6">
        <label className="block text-zen-400 text-sm mb-3">Contextual Whispers</label>
        <div className="flex gap-2">
          {whisperOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPreference('whisperFrequency', opt.value)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${
                whisperFrequency === opt.value
                  ? 'bg-gold-500/30 text-gold-300'
                  : 'bg-zen-800/40 text-zen-400 hover:bg-zen-700/40'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-zen-600 mt-2">
          Non-intrusive tips that appear when the AI notices something helpful
        </p>
      </div>

      {/* Insight Detail Level */}
      <div className="mb-6">
        <label className="block text-zen-400 text-sm mb-3">Explanation Detail</label>
        <div className="flex gap-2">
          {detailOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPreference('insightDetail', opt.value)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${
                insightDetail === opt.value
                  ? 'bg-violet-500/30 text-violet-300'
                  : 'bg-zen-800/40 text-zen-400 hover:bg-zen-700/40'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="space-y-4">
        <h3 className="text-sm text-zen-500 uppercase tracking-wider">Features</h3>
        
        {/* Ask Anything Button */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-zen-300">🧠 Ask Anything Button</div>
            <div className="text-zen-600 text-sm">Floating AI help available everywhere</div>
          </div>
          <button
            onClick={() => toggleFeature('showAskAnything')}
            className={`w-12 h-6 rounded-full transition-colors ${
              showAskAnything ? 'bg-gold-500' : 'bg-zen-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              showAskAnything ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {/* Whispers */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-zen-300">💭 Contextual Whispers</div>
            <div className="text-zen-600 text-sm">Subtle AI tips based on your activity</div>
          </div>
          <button
            onClick={() => toggleFeature('showWhispers')}
            className={`w-12 h-6 rounded-full transition-colors ${
              showWhispers ? 'bg-gold-500' : 'bg-zen-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              showWhispers ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {/* Puzzle Insights */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-zen-300">🧩 Puzzle Deep Insights</div>
            <div className="text-zen-600 text-sm">Genius-level explanations after puzzles</div>
          </div>
          <button
            onClick={() => toggleFeature('showPuzzleInsights')}
            className={`w-12 h-6 rounded-full transition-colors ${
              showPuzzleInsights ? 'bg-gold-500' : 'bg-zen-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              showPuzzleInsights ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {/* Auto Puzzle Analysis */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-zen-300">⚡ Auto-Analyze Puzzles</div>
            <div className="text-zen-600 text-sm">Automatically explain completed puzzles</div>
          </div>
          <button
            onClick={() => toggleFeature('autoPuzzleAnalysis')}
            className={`w-12 h-6 rounded-full transition-colors ${
              autoPuzzleAnalysis ? 'bg-gold-500' : 'bg-zen-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              autoPuzzleAnalysis ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {/* Move Explanations */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-zen-300">♟️ Move Explanations</div>
            <div className="text-zen-600 text-sm">AI explains moves during games</div>
          </div>
          <button
            onClick={() => toggleFeature('showMoveExplanations')}
            className={`w-12 h-6 rounded-full transition-colors ${
              showMoveExplanations ? 'bg-gold-500' : 'bg-zen-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              showMoveExplanations ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {/* Opening Insights */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-zen-300">📖 Opening Insights</div>
            <div className="text-zen-600 text-sm">Deep opening knowledge and ideas</div>
          </div>
          <button
            onClick={() => toggleFeature('showOpeningInsights')}
            className={`w-12 h-6 rounded-full transition-colors ${
              showOpeningInsights ? 'bg-gold-500' : 'bg-zen-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              showOpeningInsights ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        {/* Agent Presence */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-zen-300">👁️ Agent Presence</div>
            <div className="text-zen-600 text-sm">Show which AI agents are watching</div>
          </div>
          <button
            onClick={() => toggleFeature('showAgentPresence')}
            className={`w-12 h-6 rounded-full transition-colors ${
              showAgentPresence ? 'bg-gold-500' : 'bg-zen-700'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              showAgentPresence ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>
    </section>
  );
}

export function SettingsPage() {
  const { progress, updateSettings } = useProgressStore();
  const { sessions, notes } = { sessions: useStudyStore((s) => s.sessions), notes: useNotesStore((s) => s.notes) };
  const weaknesses = useWeaknessStore((s) => s.weaknesses);
  const mistakes = useMistakeLibraryStore((s) => s.mistakes);
  const sparringPositions = usePositionSparringStore((s) => s.positions);
  const { settings } = progress;
  
  // Board settings
  const { 
    settings: boardSettings, 
    setTheme, 
    setPieceStyle, 
    setMoveHintStyle,
    setShowCoordinates 
  } = useBoardSettingsStore();
  const boardStyles = useBoardStyles();

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-8 animate-fade-in px-2 sm:px-0">
      <div>
        <h1 className="text-2xl font-serif text-zen-100">Settings</h1>
        <p className="text-zen-500 text-sm">
          Customize your experience
        </p>
      </div>

      {/* Account section - FIRST for visibility */}
      <AccountSection />

      {/* Game settings */}
      <section className="glass-card p-6">
        <h2 className="text-lg font-serif text-zen-200 mb-6">Game Settings</h2>
        
        <div className="space-y-6">
          {/* Engine strength */}
          <div>
            <label className="block text-zen-400 text-sm mb-2">
              Engine Strength: {settings.engineStrength}
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={settings.engineStrength}
              onChange={(e) => updateSettings({ engineStrength: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-zen-600 mt-1">
              <span>Beginner</span>
              <span>Master</span>
            </div>
          </div>

          {/* Calm play delay */}
          <div>
            <label className="block text-zen-400 text-sm mb-2">
              Calm Play Delay: {settings.calmPlayDelay}s
            </label>
            <input
              type="range"
              min="2"
              max="10"
              value={settings.calmPlayDelay}
              onChange={(e) => updateSettings({ calmPlayDelay: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-zen-600 mt-1">
              <span>2 seconds</span>
              <span>10 seconds</span>
            </div>
          </div>

          {/* Auto analysis */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-zen-300">Auto Analysis</div>
              <div className="text-zen-600 text-sm">Analyze positions automatically in analysis mode</div>
            </div>
            <button
              onClick={() => updateSettings({ autoAnalysis: !settings.autoAnalysis })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.autoAnalysis ? 'bg-gold-500' : 'bg-zen-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.autoAnalysis ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* Sound */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-zen-300">Sound Effects</div>
              <div className="text-zen-600 text-sm">Play sounds for moves and notifications</div>
            </div>
            <button
              onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.soundEnabled ? 'bg-gold-500' : 'bg-zen-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </section>

      {/* Board Appearance */}
      <section className="glass-card p-6">
        <h2 className="text-lg font-serif text-zen-200 mb-6">♟️ Board Appearance</h2>
        
        <div className="space-y-6">
          {/* Board Preview */}
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-lg overflow-hidden shadow-lg">
              <Chessboard
                position="r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4"
                boardWidth={192}
                arePiecesDraggable={false}
                customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                customLightSquareStyle={boardStyles.customLightSquareStyle}
                showBoardNotation={boardSettings.showCoordinates}
              />
            </div>
          </div>

          {/* Board Color Theme */}
          <div>
            <label className="block text-zen-400 text-sm mb-3">Board Color Theme</label>
            <div className="grid grid-cols-4 gap-2">
              {(Object.entries(BOARD_THEMES) as [BoardTheme, typeof BOARD_THEMES[BoardTheme]][]).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={`p-2 rounded-lg transition-all ${
                    boardSettings.theme === key 
                      ? 'ring-2 ring-gold-500 ring-offset-2 ring-offset-zen-900' 
                      : 'hover:scale-105'
                  }`}
                >
                  <div className="flex gap-0.5 mb-1">
                    <div 
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: theme.light }}
                    />
                    <div 
                      className="w-4 h-4 rounded-sm"
                      style={{ backgroundColor: theme.dark }}
                    />
                  </div>
                  <div className="text-xs text-zen-400 truncate">{theme.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Piece Style */}
          <div>
            <label className="block text-zen-400 text-sm mb-3">Piece Style</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {(Object.entries(PIECE_STYLES).slice(0, 12) as [PieceStyle, typeof PIECE_STYLES[PieceStyle]][]).map(([key, style]) => (
                <button
                  key={key}
                  onClick={() => setPieceStyle(key)}
                  className={`p-2 rounded-lg transition-all text-left ${
                    boardSettings.pieceStyle === key 
                      ? 'bg-gold-500/20 border border-gold-500/50' 
                      : 'bg-zen-800/40 border border-zen-700/30 hover:border-zen-600/50'
                  }`}
                >
                  <div className="text-xs font-medium text-zen-300">{style.name}</div>
                </button>
              ))}
            </div>
            <p className="text-zen-600 text-xs mt-2">
              Currently using: <span className="text-zen-400">{PIECE_STYLES[boardSettings.pieceStyle].name}</span>
            </p>
          </div>

          {/* Move Hints */}
          <div>
            <label className="block text-zen-400 text-sm mb-3">Move Hints Style</label>
            <div className="flex gap-2">
              {(Object.entries(MOVE_HINT_STYLES) as [MoveHintStyle, typeof MOVE_HINT_STYLES[MoveHintStyle]][]).map(([key, style]) => (
                <button
                  key={key}
                  onClick={() => setMoveHintStyle(key)}
                  className={`flex-1 p-3 rounded-lg transition-all ${
                    boardSettings.moveHintStyle === key 
                      ? 'bg-gold-500/20 border border-gold-500/50' 
                      : 'bg-zen-800/40 border border-zen-700/30 hover:border-zen-600/50'
                  }`}
                >
                  <div className="text-sm font-medium text-zen-300">{style.name}</div>
                  <div className="text-xs text-zen-500 mt-1">{style.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Board Coordinates */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-zen-300">Show Coordinates</div>
              <div className="text-zen-600 text-sm">Display a-h and 1-8 on the board</div>
            </div>
            <button
              onClick={() => setShowCoordinates(!boardSettings.showCoordinates)}
              className={`w-12 h-6 rounded-full transition-colors ${
                boardSettings.showCoordinates ? 'bg-gold-500' : 'bg-zen-700'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                boardSettings.showCoordinates ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </section>

      {/* AI Coach Settings */}
      <AIPreferencesSection />

      {/* Progress section */}
      <section className="glass-card p-6">
        <h2 className="text-lg font-serif text-zen-200 mb-6">Progress</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-zen-800/40 rounded-lg p-4">
            <div className="text-3xl font-serif text-gold-400">{progress.currentDay}</div>
            <div className="text-zen-500 text-sm">Current Day</div>
          </div>
          <div className="bg-zen-800/40 rounded-lg p-4">
            <div className="text-3xl font-serif text-emerald-400">{progress.completedDays.length}</div>
            <div className="text-zen-500 text-sm">Days Completed</div>
          </div>
          <div className="bg-zen-800/40 rounded-lg p-4">
            <div className="text-3xl font-serif text-blue-400">{progress.puzzlesSolved}</div>
            <div className="text-zen-500 text-sm">Puzzles Solved</div>
          </div>
          <div className="bg-zen-800/40 rounded-lg p-4">
            <div className="text-3xl font-serif text-violet-400">{progress.meditationMinutes}</div>
            <div className="text-zen-500 text-sm">Minutes Meditated</div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => {
              if (confirm('Reset progress to Day 1? This cannot be undone.')) {
                useProgressStore.setState({
                  progress: {
                    ...progress,
                    currentDay: 1,
                    completedDays: [],
                    streakDays: 0,
                  }
                });
              }
            }}
            className="zen-button text-sm"
          >
            Reset Progress
          </button>
          <button
            onClick={() => {
              if (confirm('Clear all data including puzzles and meditation? This cannot be undone.')) {
                localStorage.removeItem('zen-chess-progress');
                window.location.reload();
              }
            }}
            className="zen-button text-sm text-red-400 border-red-500/30 hover:border-red-500/50"
          >
            Clear All Data
          </button>
        </div>
      </section>

      {/* Data Storage Info */}
      <section className="glass-card p-6">
        <h2 className="text-lg font-serif text-zen-200 mb-4">📦 Your Data</h2>
        <p className="text-zen-500 text-sm mb-4">
          All your data is stored locally in your browser. No account or database needed!
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          <div className="bg-zen-800/40 rounded-lg p-3 text-center">
            <div className="text-xl font-mono text-zen-200">{sessions.length}</div>
            <div className="text-zen-600 text-xs">Study Sessions</div>
          </div>
          <div className="bg-zen-800/40 rounded-lg p-3 text-center">
            <div className="text-xl font-mono text-zen-200">{notes.length}</div>
            <div className="text-zen-600 text-xs">Notes</div>
          </div>
          <div className="bg-zen-800/40 rounded-lg p-3 text-center">
            <div className="text-xl font-mono text-zen-200">{mistakes.length}</div>
            <div className="text-zen-600 text-xs">Mistakes</div>
          </div>
          <div className="bg-zen-800/40 rounded-lg p-3 text-center">
            <div className="text-xl font-mono text-zen-200">{weaknesses.length}</div>
            <div className="text-zen-600 text-xs">Weaknesses</div>
          </div>
          <div className="bg-zen-800/40 rounded-lg p-3 text-center">
            <div className="text-xl font-mono text-zen-200">{sparringPositions.length}</div>
            <div className="text-zen-600 text-xs">Spar Positions</div>
          </div>
          <div className="bg-zen-800/40 rounded-lg p-3 text-center">
            <div className="text-xl font-mono text-zen-200">{progress.streakDays}</div>
            <div className="text-zen-600 text-xs">Day Streak</div>
          </div>
        </div>

        <div className="text-xs text-zen-600 space-y-1">
          <p>⚠️ Data is stored in your browser's localStorage.</p>
          <p>• Clearing browser data will erase your progress</p>
          <p>• Using incognito/private mode won't save data</p>
          <p>• Data is specific to this browser on this device</p>
        </div>
      </section>

      {/* About section */}
      <section className="glass-card p-6">
        <h2 className="text-lg font-serif text-zen-200 mb-4">About</h2>
        <p className="text-zen-400 text-sm leading-relaxed">
          Zen and the Art of Chess is a 365-day journey combining spiritual wisdom, 
          chess mastery, and psychological insight. Each day brings a new teaching, 
          meditation, and chess exercise designed to develop both your game and your mind.
        </p>
        <p className="text-zen-500 text-sm mt-4 italic">
          "The chess board is the world, the pieces are the phenomena of the Universe, 
          the rules of the game are what we call the laws of Nature."
          <br />
          — Thomas Huxley
        </p>
      </section>
    </div>
  );
}

export default SettingsPage;



