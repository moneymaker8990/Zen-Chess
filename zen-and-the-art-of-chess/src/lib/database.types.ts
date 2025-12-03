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
      // ============================================
      // MULTIPLAYER TABLES
      // ============================================
      games: {
        Row: {
          id: string;
          white_player_id: string | null;
          black_player_id: string | null;
          status: 'waiting' | 'active' | 'completed' | 'abandoned' | 'aborted';
          result: 'white_wins' | 'black_wins' | 'draw' | 'aborted' | null;
          termination: string | null;
          winner_id: string | null;
          fen: string;
          pgn: string;
          moves: Json;
          move_count: number;
          turn: 'w' | 'b';
          time_control_type: 'bullet' | 'blitz' | 'rapid' | 'classical' | 'correspondence' | 'unlimited';
          initial_time_seconds: number;
          increment_seconds: number;
          white_time_remaining_ms: number | null;
          black_time_remaining_ms: number | null;
          last_move_at: string | null;
          draw_offer_from: string | null;
          rematch_game_id: string | null;
          rematch_offered_by: string | null;
          is_rated: boolean;
          white_rating_before: number | null;
          black_rating_before: number | null;
          white_rating_after: number | null;
          black_rating_after: number | null;
          invite_code: string | null;
          created_at: string;
          started_at: string | null;
          ended_at: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          white_player_id?: string | null;
          black_player_id?: string | null;
          status?: 'waiting' | 'active' | 'completed' | 'abandoned' | 'aborted';
          fen?: string;
          pgn?: string;
          moves?: Json;
          time_control_type?: 'bullet' | 'blitz' | 'rapid' | 'classical' | 'correspondence' | 'unlimited';
          initial_time_seconds?: number;
          increment_seconds?: number;
          white_time_remaining_ms?: number | null;
          black_time_remaining_ms?: number | null;
          is_rated?: boolean;
          invite_code?: string | null;
        };
        Update: {
          status?: 'waiting' | 'active' | 'completed' | 'abandoned' | 'aborted';
          result?: 'white_wins' | 'black_wins' | 'draw' | 'aborted' | null;
          termination?: string | null;
          winner_id?: string | null;
          fen?: string;
          pgn?: string;
          moves?: Json;
          move_count?: number;
          turn?: 'w' | 'b';
          white_time_remaining_ms?: number | null;
          black_time_remaining_ms?: number | null;
          last_move_at?: string | null;
          draw_offer_from?: string | null;
          rematch_game_id?: string | null;
          rematch_offered_by?: string | null;
          white_rating_after?: number | null;
          black_rating_after?: number | null;
          ended_at?: string | null;
          updated_at?: string;
        };
      };
      game_invites: {
        Row: {
          id: string;
          from_user_id: string;
          to_user_id: string | null;
          status: 'pending' | 'accepted' | 'declined' | 'expired' | 'cancelled';
          time_control_type: 'bullet' | 'blitz' | 'rapid' | 'classical' | 'correspondence' | 'unlimited';
          initial_time_seconds: number;
          increment_seconds: number;
          is_rated: boolean;
          challenger_color: 'w' | 'b' | 'r';
          invite_code: string | null;
          game_id: string | null;
          created_at: string;
          expires_at: string;
          responded_at: string | null;
        };
        Insert: {
          id?: string;
          from_user_id: string;
          to_user_id?: string | null;
          time_control_type?: 'bullet' | 'blitz' | 'rapid' | 'classical' | 'correspondence' | 'unlimited';
          initial_time_seconds?: number;
          increment_seconds?: number;
          is_rated?: boolean;
          challenger_color?: 'w' | 'b' | 'r';
          invite_code?: string | null;
        };
        Update: {
          status?: 'pending' | 'accepted' | 'declined' | 'expired' | 'cancelled';
          game_id?: string | null;
          responded_at?: string | null;
        };
      };
      friends: {
        Row: {
          id: string;
          user_id: string;
          friend_id: string;
          status: 'pending' | 'accepted' | 'blocked';
          created_at: string;
          accepted_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          friend_id: string;
          status?: 'pending' | 'accepted' | 'blocked';
        };
        Update: {
          status?: 'pending' | 'accepted' | 'blocked';
          accepted_at?: string | null;
        };
      };
      presence: {
        Row: {
          user_id: string;
          status: 'online' | 'away' | 'in_game' | 'offline';
          current_game_id: string | null;
          last_seen_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          status?: 'online' | 'away' | 'in_game' | 'offline';
          current_game_id?: string | null;
        };
        Update: {
          status?: 'online' | 'away' | 'in_game' | 'offline';
          current_game_id?: string | null;
          last_seen_at?: string;
          updated_at?: string;
        };
      };
      game_chat: {
        Row: {
          id: string;
          game_id: string;
          user_id: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          game_id: string;
          user_id: string;
          message: string;
        };
        Update: never;
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
      game_status: 'waiting' | 'active' | 'completed' | 'abandoned' | 'aborted';
      game_result: 'white_wins' | 'black_wins' | 'draw' | 'aborted';
      time_control_type: 'bullet' | 'blitz' | 'rapid' | 'classical' | 'correspondence' | 'unlimited';
      invite_status: 'pending' | 'accepted' | 'declined' | 'expired' | 'cancelled';
      friend_status: 'pending' | 'accepted' | 'blocked';
      online_status: 'online' | 'away' | 'in_game' | 'offline';
    };
  };
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type UserProgress = Database['public']['Tables']['user_progress']['Row'];
export type Subscription = Database['public']['Tables']['subscriptions']['Row'];
export type Game = Database['public']['Tables']['games']['Row'];
export type GameInvite = Database['public']['Tables']['game_invites']['Row'];
export type Friendship = Database['public']['Tables']['friends']['Row'];
export type Presence = Database['public']['Tables']['presence']['Row'];
export type GameChat = Database['public']['Tables']['game_chat']['Row'];


