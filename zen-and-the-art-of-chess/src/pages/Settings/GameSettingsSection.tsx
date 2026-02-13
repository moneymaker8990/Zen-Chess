interface GameSettingsSectionProps {
  settings: {
    engineStrength: number;
    calmPlayDelay: number;
    autoAnalysis: boolean;
    soundEnabled: boolean;
  };
  updateSettings: (updates: Partial<GameSettingsSectionProps['settings']>) => void;
}

export function GameSettingsSection({ settings, updateSettings }: GameSettingsSectionProps) {
  return (
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
            <div className="text-zen-300" id="auto-analysis-label">Auto Analysis</div>
            <div className="text-zen-600 text-sm">Analyze positions automatically in analysis mode</div>
          </div>
          <button
            onClick={() => updateSettings({ autoAnalysis: !settings.autoAnalysis })}
            role="switch"
            aria-checked={settings.autoAnalysis}
            aria-labelledby="auto-analysis-label"
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
            <div className="text-zen-300" id="sound-effects-label">Sound Effects</div>
            <div className="text-zen-600 text-sm">Play sounds for moves and notifications</div>
          </div>
          <button
            onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            role="switch"
            aria-checked={settings.soundEnabled}
            aria-labelledby="sound-effects-label"
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
  );
}
