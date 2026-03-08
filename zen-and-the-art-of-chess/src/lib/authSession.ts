import { supabase } from '@/lib/supabase';
import type { Profile } from '@/lib/database.types';

export async function fetchUserProfile(userId: string): Promise<Profile | null> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  return profile ?? null;
}

export function getSubscriptionState(profile: Profile | null) {
  return {
    subscriptionTier: profile?.subscription_tier || 'free',
    subscriptionStatus: profile?.subscription_status || null,
    subscriptionEndDate: profile?.subscription_end_date || null,
  };
}
