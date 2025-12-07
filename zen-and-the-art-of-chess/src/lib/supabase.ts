// ============================================
// SUPABASE CLIENT CONFIGURATION
// ============================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { logger } from './logger';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  logger.info(
    'Supabase credentials not configured. Auth and cloud sync features will be disabled. ' +
    'To enable: Create a Supabase project and add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env'
  );
}

// Create client only if configured, otherwise create a non-functional stub
export const supabase: SupabaseClient<Database> = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : createClient<Database>('https://placeholder.supabase.co', 'placeholder', {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    });


