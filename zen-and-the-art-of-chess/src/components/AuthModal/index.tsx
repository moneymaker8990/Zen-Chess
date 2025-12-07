// ============================================
// AUTHENTICATION MODAL
// Beautiful sign in/up experience
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/state/useAuthStore';
import { isSupabaseConfigured } from '@/lib/supabase';

type AuthMode = 'signin' | 'signup' | 'forgot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: AuthMode;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, defaultMode = 'signin', onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuthStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    
    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          onSuccess?.();
          onClose();
        }
      } else if (mode === 'signup') {
        const { error } = await signUp(email, password);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Check your email to confirm your account!');
        }
      } else if (mode === 'forgot') {
        const { error } = await resetPassword(email);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Password reset email sent!');
        }
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setError(null);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
    }
  };
  
  if (!isSupabaseConfigured) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md p-8 rounded-2xl text-center"
              style={{ background: 'var(--bg-secondary)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-4xl mb-4">👤</div>
              <h2 className="text-xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
                Guest Mode Active
              </h2>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                You're using Zen Chess offline. Your progress is safely stored on this device.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-2xl overflow-hidden"
            style={{ background: 'var(--bg-secondary)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div 
              className="p-8 pb-6 text-center"
              style={{ 
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.1))',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <div className="text-4xl mb-3">♔</div>
              <h2 className="text-2xl font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
                {mode === 'signin' && 'Welcome Back'}
                {mode === 'signup' && 'Begin Your Journey'}
                {mode === 'forgot' && 'Reset Password'}
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>
                {mode === 'signin' && 'Continue your chess mastery'}
                {mode === 'signup' && 'Join thousands of mindful chess players'}
                {mode === 'forgot' && "We'll send you a reset link"}
              </p>
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Google Sign In */}
              {mode !== 'forgot' && (
                <>
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-medium transition-all hover:bg-white/10"
                    style={{ 
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>or</span>
                    <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
                  </div>
                </>
              )}
              
              {/* Email */}
              <div>
                <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                  style={{ 
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="you@example.com"
                />
              </div>
              
              {/* Password */}
              {mode !== 'forgot' && (
                <div>
                  <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all focus:ring-2 focus:ring-purple-500/50"
                    style={{ 
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                    placeholder="••••••••"
                  />
                </div>
              )}
              
              {/* Error/Success Messages */}
              {error && (
                <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80' }}>
                  {success}
                </div>
              )}
              
              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                style={{ 
                  background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                  color: 'white',
                }}
              >
                {isLoading ? 'Loading...' : (
                  mode === 'signin' ? 'Sign In' :
                  mode === 'signup' ? 'Create Account' :
                  'Send Reset Link'
                )}
              </button>
              
              {/* Mode Switchers */}
              <div className="flex items-center justify-center gap-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                {mode === 'signin' && (
                  <>
                    <span>Don't have an account?</span>
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      style={{ color: '#a855f7' }}
                    >
                      Sign up
                    </button>
                  </>
                )}
                {mode === 'signup' && (
                  <>
                    <span>Already have an account?</span>
                    <button
                      type="button"
                      onClick={() => setMode('signin')}
                      style={{ color: '#a855f7' }}
                    >
                      Sign in
                    </button>
                  </>
                )}
                {mode === 'forgot' && (
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    style={{ color: '#a855f7' }}
                  >
                    Back to sign in
                  </button>
                )}
              </div>
              
              {mode === 'signin' && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </form>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ color: 'var(--text-muted)' }}
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// AUTH BUTTON COMPONENT
// Shows sign in or user menu
// ============================================

interface AuthButtonProps {
  className?: string;
}

export function AuthButton({ className = '' }: AuthButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, profile, signOut, isPremium } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  
  if (!user) {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${className}`}
          style={{ 
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            color: 'white',
          }}
        >
          Sign In
        </button>
        <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    );
  }
  
  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-white/5 ${className}`}
      >
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
          style={{ 
            background: isPremium() ? 'linear-gradient(135deg, #a855f7, #ec4899)' : 'var(--bg-tertiary)',
            color: 'white',
          }}
        >
          {profile?.display_name?.[0] || user.email?.[0]?.toUpperCase() || '?'}
        </div>
        {isPremium() && (
          <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}>
            PRO
          </span>
        )}
      </button>
      
      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div 
            className="absolute right-0 top-full mt-2 w-48 rounded-xl overflow-hidden z-50"
            style={{ 
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div className="p-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                {profile?.display_name || 'Chess Player'}
              </div>
              <div className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                {user.email}
              </div>
            </div>
            <div className="p-2">
              <button
                onClick={() => { setShowMenu(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5"
                style={{ color: 'var(--text-secondary)' }}
              >
                Settings
              </button>
              <button
                onClick={() => { signOut(); setShowMenu(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/5"
                style={{ color: '#ef4444' }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}





