import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/state/useAuthStore';

/**
 * Auth callback page - handles email confirmation and OAuth redirects
 */
export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { initialize } = useAuthStore();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the hash fragment from URL (contains tokens)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const error = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');

        if (error) {
          console.error('Auth error:', error, errorDescription);
          navigate('/auth?error=' + encodeURIComponent(errorDescription || error));
          return;
        }

        // If we have tokens, Supabase will handle the session automatically
        if (accessToken && refreshToken) {
          // Set the session manually
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (sessionError) {
            console.error('Session error:', sessionError);
            navigate('/auth?error=' + encodeURIComponent(sessionError.message));
            return;
          }

          // Initialize auth store to sync session
          await initialize();

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
            navigate('/auth?error=' + encodeURIComponent('Invalid or expired confirmation link'));
          }
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        navigate('/auth?error=' + encodeURIComponent('An error occurred during authentication'));
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams, initialize]);

  // Show loading state while processing
  return (
    <div className="min-h-screen flex items-center justify-center bg-zen-900">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500 mb-4"></div>
        <p className="text-zen-300">Confirming your account...</p>
      </div>
    </div>
  );
}

