// ============================================
// AUTH PAGE
// Standalone authentication page
// ============================================

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/state/useAuthStore';
import { isSupabaseConfigured } from '@/lib/supabase';

type AuthMode = 'signin' | 'signup';

export function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, signIn, signUp, signInWithGoogle } = useAuthStore();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);
  
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
          navigate(redirect);
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Check your email to confirm your account!');
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
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔧</div>
          <h1 className="text-2xl font-display font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Coming Soon
          </h1>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            Cloud sync and user accounts are being set up. Your progress is saved locally on this device.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-xl font-medium"
            style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
          >
            Continue as Guest
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">♔</div>
            <h1 className="text-3xl font-display font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {mode === 'signin' ? 'Welcome Back' : 'Begin Your Journey'}
            </h1>
            <p style={{ color: 'var(--text-tertiary)' }}>
              {mode === 'signin' 
                ? 'Continue your path to chess mastery' 
                : 'Join thousands of mindful chess players'}
            </p>
          </div>
          
          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3 mb-4 rounded-xl font-medium transition-all hover:bg-white/10"
            style={{ 
              background: 'var(--bg-secondary)',
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
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>or continue with email</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-subtle)' }} />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
                placeholder="you@example.com"
              />
            </div>
            
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
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
                placeholder="••••••••"
              />
            </div>
            
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
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              style={{ 
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                color: 'white',
              }}
            >
              {isLoading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <span style={{ color: 'var(--text-muted)' }}>
              {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <button
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="font-medium"
              style={{ color: '#a855f7' }}
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Right side - Features showcase */}
      <div 
        className="hidden lg:flex flex-1 items-center justify-center p-12"
        style={{ 
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(251, 191, 36, 0.05) 100%)',
          borderLeft: '1px solid var(--border-subtle)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md"
        >
          <h2 className="text-2xl font-display font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            Why Zen Chess?
          </h2>
          
          <div className="space-y-6">
            {[
              { icon: '🧠', title: 'AI-Powered Coaching', desc: '12 specialized agents guide every aspect of your game' },
              { icon: '☯️', title: 'Mindfulness Integration', desc: 'The only chess app that trains your mind and emotions' },
              { icon: '📅', title: '365-Day Journey', desc: 'Structured path from beginner to master' },
              { icon: '🛡️', title: 'Tilt Prevention', desc: 'AI that protects you from emotional mistakes' },
              { icon: '👑', title: 'Learn from Legends', desc: 'Study games from Kasparov, Fischer, Carlsen and more' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 p-4 rounded-xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center gap-1 mb-2">
              {[1,2,3,4,5].map(star => (
                <span key={star} style={{ color: '#f59e0b' }}>★</span>
              ))}
            </div>
            <blockquote className="text-sm font-serif italic mb-2" style={{ color: 'var(--text-secondary)' }}>
              "Finally, an app that understands chess is as much mental as it is tactical."
            </blockquote>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>— Sarah M., 1600 rated player</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AuthPage;


