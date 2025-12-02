// ============================================
// KEYBOARD SHORTCUTS HELP MODAL
// ============================================

import { motion, AnimatePresence } from 'framer-motion';
import { useShortcutsStore, SHORTCUT_CATEGORIES, useGlobalShortcuts } from '@/hooks/useKeyboardShortcuts';

export function KeyboardShortcutsHelp() {
  const { showHelp, setShowHelp } = useShortcutsStore();
  const { shortcuts } = useGlobalShortcuts();

  // Group shortcuts by category
  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, typeof shortcuts>);

  if (!showHelp) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.8)' }}
        onClick={() => setShowHelp(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-lg rounded-2xl overflow-hidden"
          style={{ background: 'var(--bg-secondary)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div 
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: '1px solid var(--border-subtle)' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⌨️</span>
              <div>
                <h2 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  Keyboard Shortcuts
                </h2>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Press Shift+? to toggle
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowHelp(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-auto">
            {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
              <div key={category}>
                <h3 className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                  {SHORTCUT_CATEGORIES[category as keyof typeof SHORTCUT_CATEGORIES]}
                </h3>
                <div className="space-y-2">
                  {categoryShortcuts.map((shortcut) => (
                    <div 
                      key={shortcut.key + shortcut.description}
                      className="flex items-center justify-between p-2 rounded-lg"
                      style={{ background: 'var(--bg-tertiary)' }}
                    >
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {shortcut.description}
                      </span>
                      <kbd 
                        className="px-2 py-1 rounded text-xs font-mono"
                        style={{ 
                          background: 'var(--bg-primary)',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        {shortcut.ctrl && <span>Ctrl+</span>}
                        {shortcut.shift && <span>Shift+</span>}
                        {shortcut.alt && <span>Alt+</span>}
                        {shortcut.key.toUpperCase()}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div 
            className="px-6 py-4 text-center text-xs"
            style={{ 
              background: 'var(--bg-tertiary)',
              color: 'var(--text-muted)',
            }}
          >
            Shortcuts can be disabled in Settings
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


