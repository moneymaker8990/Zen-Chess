import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/state/useAuthStore';
import { logger } from '@/lib/logger';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

type CallbackState = 'loading' | 'email_verified' | 'error';

/**
 * Auth callback page - handles email confirmation and OAuth redirects
 */
export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { initialize } = useAuthStore();
  const [state, setState] = useState<CallbackState>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the hash fragment from URL (contains tokens)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type'); // 'signup', 'recovery', 'invite', etc.
        const error = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');

        if (error) {
          logger.error('Auth error:', error, errorDescription);
          setState('error');
          setErrorMessage(errorDescription || error);
          return;
        }

        // If we have tokens, Supabase will handle the session automatically
        if (accessToken && refreshToken) {
          // Set the session manually
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (sessionError) {
            logger.error('Session error:', sessionError);
            setState('error');
            setErrorMessage(sessionError.message);
            return;
          }

          // Initialize auth store to sync session
          await initialize();

          // If this was email verification (signup type), show success screen
          if (type === 'signup') {
            trackEvent(AnalyticsEvents.SIGNUP_COMPLETED);
            setState('email_verified');
            // Auto-redirect after 3 seconds
            setTimeout(() => {
              navigate('/');
            }, 3000);
            return;
          }

          // Redirect to home or return URL
          const returnTo = searchParams.get('returnTo') || '/';
          navigate(returnTo);
        } else {
          // No tokens in URL - might be a direct visit or email link expired
          // Check if user is already logged in
          const { data: { session } } = await supabase.auth.getSession();

          if (session) {
            await initialize();
            navigate('/');
          } else {
            setState('error');
            setErrorMessage('Invalid or expired confirmation link');
          }
        }
      } catch (err) {
        logger.error('Auth callback error:', err);
        setState('error');
        setErrorMessage('An error occurred during authentication');
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams, initialize]);

  // Email verified success state
  if (state === 'email_verified') {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl"
            style={{ background: 'rgba(74, 222, 128, 0.2)' }}
          >
            ✓
          </motion.div>
          <h1
            className="text-2xl font-display font-bold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Email Verified!
          </h1>
          <p
            className="mb-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            Your account has been confirmed. Welcome to Zen Chess!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}
          >
            Start Your Journey
          </button>
          <p
            className="mt-4 text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            Redirecting automatically...
          </p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (state === 'error') {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl"
            style={{ background: 'rgba(239, 68, 68, 0.2)' }}
          >
            ✕
          </div>
          <h1
            className="text-2xl font-display font-bold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Verification Failed
          </h1>
          <p
            className="mb-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            {errorMessage || 'Something went wrong. Please try again.'}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/auth')}
              className="px-6 py-3 rounded-xl font-medium transition-all hover:bg-white/10"
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
              }}
            >
              Back to Sign In
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-xl font-medium"
              style={{
                background: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
              }}
            >
              Go Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Loading state
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}
    >
      <div className="text-center">
        <div
          className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4"
          style={{ borderColor: '#a855f7' }}
        />
        <p style={{ color: 'var(--text-secondary)' }}>Confirming your account...</p>
      </div>
    </div>
  );
}

