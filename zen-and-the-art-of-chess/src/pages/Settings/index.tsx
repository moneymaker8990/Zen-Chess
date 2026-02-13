import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '@/state/useStore';
import { useStudyStore, useNotesStore, useWeaknessStore } from '@/state/notesStore';
import { useMistakeLibraryStore, usePositionSparringStore } from '@/state/trainingStore';
import { useAIPreferencesStore, type AIIntrusiveness, type WhisperFrequency, type InsightDetail } from '@/state/aiPreferencesStore';
import { useAuthStore } from '@/state/useAuthStore';
import { useAgentStore } from '@/lib/agents/agentOrchestrator';
import { isSupabaseConfigured } from '@/lib/supabase';

import { GameSettingsSection } from './GameSettingsSection';
import { BoardAppearanceSection } from './BoardAppearanceSection';
import { ProgressSection } from './ProgressSection';
import { DataStorageSection } from './DataStorageSection';
import { AboutSection } from './AboutSection';
import { LegalSection } from './LegalSection';

// ============================================
// AGENT VERBOSITY SECTION COMPONENT
// ============================================

function AgentVerbositySection() {
  const agentVerbosity = useAgentStore((state) => state.state.agentVerbosity);
  const setVerbosity = useAgentStore((state) => state.setVerbosity);

  const verbosityOptions: Array<{
    value: 'quiet' | 'normal' | 'chatty';
    label: string;
    desc: string;
    icon: string;
  }> = [
    { value: 'quiet', label: 'Quiet', desc: 'Critical messages only', icon: '🤫' },
    { value: 'normal', label: 'Normal', desc: 'Helpful insights', icon: '💬' },
    { value: 'chatty', label: 'Chatty', desc: 'All agent messages', icon: '🗣️' },
  ];

  return (
    <div className="mb-6">
      <label className="block text-zen-400 text-sm mb-3">Agent Communication</label>
      <div className="flex gap-2">
        {verbosityOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setVerbosity(opt.value)}
            className={`flex-1 p-3 rounded-lg transition-all ${
              agentVerbosity === opt.value
                ? 'bg-purple-500/20 border border-purple-500/50'
                : 'bg-zen-800/40 border border-zen-700/30 hover:border-zen-600/50'
            }`}
          >
            <div className="text-xl mb-1">{opt.icon}</div>
            <div className="text-sm font-medium text-zen-300">{opt.label}</div>
            <div className="text-xs text-zen-400">{opt.desc}</div>
          </button>
        ))}
      </div>
      <p className="text-xs text-zen-600 mt-2">
        Control how frequently agents message you during your practice sessions
      </p>
    </div>
  );
}

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
          <div className="text-4xl mb-3">☁️</div>
          <h3 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Local Storage Mode
          </h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
            Your progress is saved locally on this device. Sign in to sync across devices.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Data safely stored in browser
          </div>
        </div>
      </section>
    );
  }

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

      <div className="p-5 rounded-xl mb-4" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)' }}>
        <div className="flex items-center gap-4">
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
              <div className="text-xs text-zen-400">{opt.desc}</div>
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

      {/* Agent Verbosity */}
      <AgentVerbositySection />

      {/* Feature Toggles */}
      <div className="space-y-4">
        <h3 className="text-sm text-zen-400 uppercase tracking-wider">Features</h3>

        <FeatureToggle
          id="ask-anything-label"
          icon="🧠"
          label="Ask Anything Button"
          description="Floating AI help available everywhere"
          enabled={showAskAnything}
          onToggle={() => toggleFeature('showAskAnything')}
        />
        <FeatureToggle
          id="whispers-label"
          icon="💭"
          label="Contextual Whispers"
          description="Subtle AI tips based on your activity"
          enabled={showWhispers}
          onToggle={() => toggleFeature('showWhispers')}
        />
        <FeatureToggle
          id="puzzle-insights-label"
          icon="🧩"
          label="Puzzle Deep Insights"
          description="Genius-level explanations after puzzles"
          enabled={showPuzzleInsights}
          onToggle={() => toggleFeature('showPuzzleInsights')}
        />
        <FeatureToggle
          id="auto-analyze-label"
          icon="⚡"
          label="Auto-Analyze Puzzles"
          description="Automatically explain completed puzzles"
          enabled={autoPuzzleAnalysis}
          onToggle={() => toggleFeature('autoPuzzleAnalysis')}
        />
        <FeatureToggle
          id="move-explain-label"
          icon="♟️"
          label="Move Explanations"
          description="AI explains moves during games"
          enabled={showMoveExplanations}
          onToggle={() => toggleFeature('showMoveExplanations')}
        />
        <FeatureToggle
          id="opening-insights-label"
          icon="📖"
          label="Opening Insights"
          description="Deep opening knowledge and ideas"
          enabled={showOpeningInsights}
          onToggle={() => toggleFeature('showOpeningInsights')}
        />
        <FeatureToggle
          id="agent-presence-label"
          icon="👁️"
          label="Agent Presence"
          description="Show which AI agents are watching"
          enabled={showAgentPresence}
          onToggle={() => toggleFeature('showAgentPresence')}
        />
      </div>
    </section>
  );
}

function FeatureToggle({ id, icon, label, description, enabled, onToggle }: {
  id: string;
  icon: string;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-zen-300" id={id}>{icon} {label}</div>
        <div className="text-zen-600 text-sm">{description}</div>
      </div>
      <button
        onClick={onToggle}
        role="switch"
        aria-checked={enabled}
        aria-labelledby={id}
        className={`w-12 h-6 rounded-full transition-colors ${
          enabled ? 'bg-gold-500' : 'bg-zen-700'
        }`}
      >
        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-0.5'
        }`} />
      </button>
    </div>
  );
}

// ============================================
// MAIN SETTINGS PAGE
// ============================================

export function SettingsPage() {
  const { progress, updateSettings } = useProgressStore();
  const sessions = useStudyStore((s) => s.sessions);
  const notes = useNotesStore((s) => s.notes);
  const weaknesses = useWeaknessStore((s) => s.weaknesses);
  const mistakes = useMistakeLibraryStore((s) => s.mistakes);
  const sparringPositions = usePositionSparringStore((s) => s.positions);
  const { settings } = progress;

  return (
    <div className="max-w-2xl mx-auto space-y-4 sm:space-y-8 animate-fade-in px-2 sm:px-0">
      <div>
        <h1 className="text-2xl font-serif text-zen-100">Settings</h1>
        <p className="text-zen-400 text-sm">
          Customize your experience
        </p>
      </div>

      <AccountSection />
      <GameSettingsSection settings={settings} updateSettings={updateSettings} />
      <BoardAppearanceSection />
      <AIPreferencesSection />
      <ProgressSection />
      <DataStorageSection
        sessionCount={sessions.length}
        noteCount={notes.length}
        mistakeCount={mistakes.length}
        weaknessCount={weaknesses.length}
        sparringCount={sparringPositions.length}
        streakDays={progress.streakDays}
      />
      <AboutSection />
      <LegalSection />
    </div>
  );
}

export default SettingsPage;
