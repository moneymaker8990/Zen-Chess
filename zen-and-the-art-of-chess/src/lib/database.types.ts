// ============================================
// SUPABASE DATABASE TYPES
// Auto-generated types for type safety
// ============================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          username: string | null;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
          // Chess-specific
          rating: number;
          puzzles_solved: number;
          current_day: number;
          streak_days: number;
          meditation_minutes: number;
          // Subscription
          subscription_tier: 'free' | 'premium' | 'lifetime';
          subscription_status: 'active' | 'canceled' | 'past_due' | 'trialing' | null;
          subscription_end_date: string | null;
          stripe_customer_id: string | null;
          // Preferences synced
          settings: Json | null;
        };
        Insert: {
          id: string;
          email?: string | null;
          username?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          rating?: number;
          puzzles_solved?: number;
          current_day?: number;
          streak_days?: number;
          meditation_minutes?: number;
          subscription_tier?: 'free' | 'premium' | 'lifetime';
          subscription_status?: 'active' | 'canceled' | 'past_due' | 'trialing' | null;
          subscription_end_date?: string | null;
          stripe_customer_id?: string | null;
          settings?: Json | null;
        };
        Update: {
          id?: string;
          email?: string | null;
          username?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
          rating?: number;
          puzzles_solved?: number;
          current_day?: number;
          streak_days?: number;
          meditation_minutes?: number;
          subscription_tier?: 'free' | 'premium' | 'lifetime';
          subscription_status?: 'active' | 'canceled' | 'past_due' | 'trialing' | null;
          subscription_end_date?: string | null;
          stripe_customer_id?: string | null;
          settings?: Json | null;
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          completed_days: number[];
          tilt_events: Json[];
          mistake_library: Json[];
          notes: Json[];
          opening_repertoire: Json | null;
          spaced_repetition_data: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          completed_days?: number[];
          tilt_events?: Json[];
          mistake_library?: Json[];
          notes?: Json[];
          opening_repertoire?: Json | null;
          spaced_repetition_data?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          completed_days?: number[];
          tilt_events?: Json[];
          mistake_library?: Json[];
          notes?: Json[];
          opening_repertoire?: Json | null;
          spaced_repetition_data?: Json | null;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_subscription_id: string | null;
          stripe_price_id: string | null;
          status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
          current_period_start: string | null;
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_subscription_id?: string | null;
          stripe_price_id?: string | null;
          status?: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          stripe_subscription_id?: string | null;
          stripe_price_id?: string | null;
          status?: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
          current_period_start?: string | null;
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      subscription_tier: 'free' | 'premium' | 'lifetime';
      subscription_status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';
    };
  };
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type UserProgress = Database['public']['Tables']['user_progress']['Row'];
export type Subscription = Database['public']['Tables']['subscriptions']['Row'];

