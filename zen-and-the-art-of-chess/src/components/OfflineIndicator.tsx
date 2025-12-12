// ============================================
// OFFLINE INDICATOR
// Shows when app is offline and what works
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(() => 
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [showDetails, setShowDetails] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setDismissed(false); // Reset dismissed state when coming back online
    };
    const handleOffline = () => {
      setIsOnline(false);
      setDismissed(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Don't show if online or dismissed
  if (isOnline || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div 
          className="mx-4 mt-4 p-4 rounded-xl shadow-lg"
          style={{ 
            background: 'linear-gradient(135deg, #f59e0b20, #dc262620)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📡</span>
              <div>
                <h3 className="font-medium" style={{ color: '#f59e0b' }}>
                  You're Offline
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Some features may be limited
                </p>
              </div>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Expand/collapse details */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-3 text-sm flex items-center gap-1 hover:underline"
            style={{ color: 'var(--text-muted)' }}
          >
            {showDetails ? 'Hide details' : 'What works offline?'}
            <svg 
              className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {/* Works offline */}
                  <div className="p-3 rounded-lg" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
                    <h4 className="text-sm font-medium mb-2" style={{ color: '#4ade80' }}>
                      ✅ Works Offline
                    </h4>
                    <ul className="text-xs space-y-1" style={{ color: 'var(--text-tertiary)' }}>
                      <li>• Puzzles (cached)</li>
                      <li>• Play vs Engine</li>
                      <li>• Daily lessons</li>
                      <li>• Your progress</li>
                      <li>• Settings</li>
                    </ul>
                  </div>

                  {/* Needs internet */}
                  <div className="p-3 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                    <h4 className="text-sm font-medium mb-2" style={{ color: '#ef4444' }}>
                      ❌ Needs Internet
                    </h4>
                    <ul className="text-xs space-y-1" style={{ color: 'var(--text-tertiary)' }}>
                      <li>• Play with friends</li>
                      <li>• Cloud sync</li>
                      <li>• AI coaching</li>
                      <li>• Sound effects*</li>
                    </ul>
                  </div>
                </div>

                <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                  *Sounds may work if previously loaded
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================
// OFFLINE HOOK
// Use in components that need offline awareness
// ============================================

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(() => 
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

export default OfflineIndicator;




