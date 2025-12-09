// ============================================
// UPDATE PROMPT
// Shows when a new app version is available
// ============================================

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function UpdatePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      console.log('SW Registered:', swUrl);
      // Check for updates every 5 minutes
      if (r) {
        setInterval(() => {
          r.update();
        }, 5 * 60 * 1000);
      }
    },
    onRegisterError(error) {
      console.error('SW registration error', error);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      setShowPrompt(true);
    }
  }, [needRefresh]);

  const handleUpdate = () => {
    updateServiceWorker(true);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setNeedRefresh(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-[100] p-4 rounded-2xl shadow-2xl"
          style={{ 
            background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))',
            border: '1px solid var(--accent-primary)',
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.3)'
          }}
        >
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{ background: 'linear-gradient(135deg, #a855f7, #7c3aed)' }}
            >
              ✨
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-base mb-1" style={{ color: 'var(--text-primary)' }}>
                New Version Available
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
                Refresh to get the latest features and improvements.
              </p>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleUpdate}
                  className="btn-primary text-sm py-2 px-4"
                >
                  🔄 Update Now
                </button>
                <button
                  onClick={handleDismiss}
                  className="btn-ghost text-sm py-2 px-4"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UpdatePrompt;






