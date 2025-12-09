-- ============================================
-- MULTIPLAYER CHESS SCHEMA
-- Professional-level real-time multiplayer
-- Run this in your Supabase SQL Editor
-- ============================================

-- ============================================
-- ENUMS FOR MULTIPLAYER
-- ============================================

DO $$ BEGIN
  CREATE TYPE game_status AS ENUM (
    'waiting',      -- Waiting for opponent
    'active',       -- Game in progress
    'completed',    -- Game finished normally
    'abandoned',    -- Player left without resigning
    'aborted'       -- Game cancelled before meaningful moves
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE game_result AS ENUM (
    'white_wins',
    'black_wins', 
    'draw',
    'aborted'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE game_termination AS ENUM (
    'checkmate',
    'resignation',
    'timeout',
    'stalemate',
    'insufficient_material',
    'fifty_move_rule',
    'threefold_repetition',
    'agreement',      -- Draw by agreement
    'abandonment',
    'aborted'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE time_control_type AS ENUM (
    'bullet',       -- < 3 min
    'blitz',        -- 3-10 min
    'rapid',        -- 10-30 min
    'classical',    -- > 30 min
    'correspondence', -- Days per move
    'unlimited'     -- No time control
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE invite_status AS ENUM (
    'pending',
    'accepted',
    'declined',
    'expired',
    'cancelled'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE friend_status AS ENUM (
    'pending',
    'accepted',
    'blocked'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- GAMES TABLE
-- Stores all multiplayer games
-- ============================================

CREATE TABLE IF NOT EXISTS public.games (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Players
  white_player_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  black_player_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  
  -- Game state
  status game_status DEFAULT 'waiting' NOT NULL,
  result game_result,
  termination game_termination,
  winner_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  
  -- Position and moves
  fen text DEFAULT 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' NOT NULL,
  pgn text DEFAULT '' NOT NULL,
  moves jsonb DEFAULT '[]'::jsonb NOT NULL,
  move_count integer DEFAULT 0 NOT NULL,
  
  -- Time control
  time_control_type time_control_type DEFAULT 'rapid' NOT NULL,
  initial_time_seconds integer DEFAULT 600 NOT NULL,  -- 10 minutes
  increment_seconds integer DEFAULT 0 NOT NULL,
  white_time_remaining_ms integer,
  black_time_remaining_ms integer,
  last_move_at timestamp with time zone,
  
  -- Turn tracking
  turn char(1) DEFAULT 'w' NOT NULL CHECK (turn IN ('w', 'b')),
  
  -- Draw offers
  draw_offer_from uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  
  -- Rematch
  rematch_game_id uuid REFERENCES public.games(id) ON DELETE SET NULL,
  rematch_offered_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  
  -- Rated game
  is_rated boolean DEFAULT true NOT NULL,
  white_rating_before integer,
  black_rating_before integer,
  white_rating_after integer,
  black_rating_after integer,
  
  -- Invite code for link sharing
  invite_code text UNIQUE,
  
  -- Timestamps
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  started_at timestamp with time zone,
  ended_at timestamp with time zone,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for games
CREATE INDEX IF NOT EXISTS idx_games_white_player ON public.games(white_player_id);
CREATE INDEX IF NOT EXISTS idx_games_black_player ON public.games(black_player_id);
CREATE INDEX IF NOT EXISTS idx_games_status ON public.games(status);
CREATE INDEX IF NOT EXISTS idx_games_invite_code ON public.games(invite_code);
CREATE INDEX IF NOT EXISTS idx_games_created_at ON public.games(created_at DESC);

-- Enable RLS on games
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

-- Game policies
DROP POLICY IF EXISTS "Users can view games they're part of" ON public.games;
CREATE POLICY "Users can view games they're part of"
  ON public.games FOR SELECT
  USING (
    auth.uid() = white_player_id OR 
    auth.uid() = black_player_id OR
    status = 'waiting' -- Can see open games
  );

DROP POLICY IF EXISTS "Users can create games" ON public.games;
CREATE POLICY "Users can create games"
  ON public.games FOR INSERT
  WITH CHECK (auth.uid() = white_player_id OR auth.uid() = black_player_id);

DROP POLICY IF EXISTS "Players can update their games" ON public.games;
CREATE POLICY "Players can update their games"
  ON public.games FOR UPDATE
  USING (auth.uid() = white_player_id OR auth.uid() = black_player_id);

-- ============================================
-- GAME INVITES TABLE
-- Direct challenges to specific users
-- ============================================

CREATE TABLE IF NOT EXISTS public.game_invites (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Challenger and challenged
  from_user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  to_user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Invite details
  status invite_status DEFAULT 'pending' NOT NULL,
  
  -- Game settings
  time_control_type time_control_type DEFAULT 'rapid' NOT NULL,
  initial_time_seconds integer DEFAULT 600 NOT NULL,
  increment_seconds integer DEFAULT 0 NOT NULL,
  is_rated boolean DEFAULT true NOT NULL,
  challenger_color char(1) CHECK (challenger_color IN ('w', 'b', 'r')), -- w=white, b=black, r=random
  
  -- Link invite (for sharing)
  invite_code text UNIQUE,
  
  -- Created game (when accepted)
  game_id uuid REFERENCES public.games(id) ON DELETE SET NULL,
  
  -- Timestamps
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  expires_at timestamp with time zone DEFAULT (timezone('utc'::text, now()) + interval '24 hours') NOT NULL,
  responded_at timestamp with time zone
);

-- Indexes for invites
CREATE INDEX IF NOT EXISTS idx_invites_from_user ON public.game_invites(from_user_id);
CREATE INDEX IF NOT EXISTS idx_invites_to_user ON public.game_invites(to_user_id);
CREATE INDEX IF NOT EXISTS idx_invites_status ON public.game_invites(status);
CREATE INDEX IF NOT EXISTS idx_invites_code ON public.game_invites(invite_code);

-- Enable RLS on invites
ALTER TABLE public.game_invites ENABLE ROW LEVEL SECURITY;

-- Invite policies
DROP POLICY IF EXISTS "Users can view their invites" ON public.game_invites;
CREATE POLICY "Users can view their invites"
  ON public.game_invites FOR SELECT
  USING (
    auth.uid() = from_user_id OR 
    auth.uid() = to_user_id OR
    (invite_code IS NOT NULL AND to_user_id IS NULL) -- Public link invites
  );

DROP POLICY IF EXISTS "Users can create invites" ON public.game_invites;
CREATE POLICY "Users can create invites"
  ON public.game_invites FOR INSERT
  WITH CHECK (auth.uid() = from_user_id);

DROP POLICY IF EXISTS "Users can update their invites" ON public.game_invites;
CREATE POLICY "Users can update their invites"
  ON public.game_invites FOR UPDATE
  USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

-- ============================================
-- FRIENDS TABLE
-- Friend relationships
-- ============================================

CREATE TABLE IF NOT EXISTS public.friends (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Users (user_id sent request to friend_id)
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  friend_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  
  status friend_status DEFAULT 'pending' NOT NULL,
  
  -- Timestamps
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  accepted_at timestamp with time zone,
  
  -- Prevent duplicate friendships
  CONSTRAINT unique_friendship UNIQUE (user_id, friend_id),
  CONSTRAINT no_self_friendship CHECK (user_id != friend_id)
);

-- Indexes for friends
CREATE INDEX IF NOT EXISTS idx_friends_user ON public.friends(user_id);
CREATE INDEX IF NOT EXISTS idx_friends_friend ON public.friends(friend_id);
CREATE INDEX IF NOT EXISTS idx_friends_status ON public.friends(status);

-- Enable RLS on friends
ALTER TABLE public.friends ENABLE ROW LEVEL SECURITY;

-- Friend policies
DROP POLICY IF EXISTS "Users can view their friendships" ON public.friends;
CREATE POLICY "Users can view their friendships"
  ON public.friends FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

DROP POLICY IF EXISTS "Users can create friend requests" ON public.friends;
CREATE POLICY "Users can create friend requests"
  ON public.friends FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update friendships they're part of" ON public.friends;
CREATE POLICY "Users can update friendships they're part of"
  ON public.friends FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

DROP POLICY IF EXISTS "Users can delete their friendships" ON public.friends;
CREATE POLICY "Users can delete their friendships"
  ON public.friends FOR DELETE
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- ============================================
-- PRESENCE TABLE
-- Online status tracking
-- ============================================

CREATE TABLE IF NOT EXISTS public.presence (
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  
  status text DEFAULT 'offline' NOT NULL CHECK (status IN ('online', 'away', 'in_game', 'offline')),
  current_game_id uuid REFERENCES public.games(id) ON DELETE SET NULL,
  
  last_seen_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on presence
ALTER TABLE public.presence ENABLE ROW LEVEL SECURITY;

-- Presence policies - everyone can see online status
DROP POLICY IF EXISTS "Anyone can view presence" ON public.presence;
CREATE POLICY "Anyone can view presence"
  ON public.presence FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can update their presence" ON public.presence;
CREATE POLICY "Users can update their presence"
  ON public.presence FOR ALL
  USING (auth.uid() = user_id);

-- ============================================
-- GAME CHAT TABLE
-- In-game messages
-- ============================================

CREATE TABLE IF NOT EXISTS public.game_chat (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  game_id uuid REFERENCES public.games(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL NOT NULL,
  
  message text NOT NULL CHECK (length(message) <= 500),
  
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for chat
CREATE INDEX IF NOT EXISTS idx_game_chat_game ON public.game_chat(game_id);
CREATE INDEX IF NOT EXISTS idx_game_chat_created ON public.game_chat(created_at);

-- Enable RLS on chat
ALTER TABLE public.game_chat ENABLE ROW LEVEL SECURITY;

-- Chat policies
DROP POLICY IF EXISTS "Players can view game chat" ON public.game_chat;
CREATE POLICY "Players can view game chat"
  ON public.game_chat FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.games 
      WHERE id = game_id 
      AND (white_player_id = auth.uid() OR black_player_id = auth.uid())
    )
  );

DROP POLICY IF EXISTS "Players can send chat" ON public.game_chat;
CREATE POLICY "Players can send chat"
  ON public.game_chat FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.games 
      WHERE id = game_id 
      AND (white_player_id = auth.uid() OR black_player_id = auth.uid())
    )
  );

-- ============================================
-- FUNCTIONS FOR MULTIPLAYER
-- ============================================

-- Function to generate unique invite code
CREATE OR REPLACE FUNCTION generate_invite_code()
RETURNS text AS $$
DECLARE
  chars text := 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result text := '';
  i integer;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to create a game from invite
CREATE OR REPLACE FUNCTION accept_game_invite(p_invite_id uuid, p_accepting_user_id uuid)
RETURNS uuid AS $$
DECLARE
  v_invite public.game_invites%ROWTYPE;
  v_game_id uuid;
  v_white_id uuid;
  v_black_id uuid;
BEGIN
  -- Get the invite
  SELECT * INTO v_invite FROM public.game_invites WHERE id = p_invite_id;
  
  IF v_invite IS NULL THEN
    RAISE EXCEPTION 'Invite not found';
  END IF;
  
  IF v_invite.status != 'pending' THEN
    RAISE EXCEPTION 'Invite is no longer pending';
  END IF;
  
  IF v_invite.expires_at < now() THEN
    UPDATE public.game_invites SET status = 'expired' WHERE id = p_invite_id;
    RAISE EXCEPTION 'Invite has expired';
  END IF;
  
  -- Determine colors
  IF v_invite.challenger_color = 'w' THEN
    v_white_id := v_invite.from_user_id;
    v_black_id := p_accepting_user_id;
  ELSIF v_invite.challenger_color = 'b' THEN
    v_white_id := p_accepting_user_id;
    v_black_id := v_invite.from_user_id;
  ELSE
    -- Random
    IF random() < 0.5 THEN
      v_white_id := v_invite.from_user_id;
      v_black_id := p_accepting_user_id;
    ELSE
      v_white_id := p_accepting_user_id;
      v_black_id := v_invite.from_user_id;
    END IF;
  END IF;
  
  -- Create the game
  INSERT INTO public.games (
    white_player_id,
    black_player_id,
    status,
    time_control_type,
    initial_time_seconds,
    increment_seconds,
    white_time_remaining_ms,
    black_time_remaining_ms,
    is_rated,
    started_at
  ) VALUES (
    v_white_id,
    v_black_id,
    'active',
    v_invite.time_control_type,
    v_invite.initial_time_seconds,
    v_invite.increment_seconds,
    v_invite.initial_time_seconds * 1000,
    v_invite.initial_time_seconds * 1000,
    v_invite.is_rated,
    now()
  ) RETURNING id INTO v_game_id;
  
  -- Update the invite
  UPDATE public.game_invites 
  SET status = 'accepted', game_id = v_game_id, responded_at = now()
  WHERE id = p_invite_id;
  
  RETURN v_game_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update ELO ratings after game
CREATE OR REPLACE FUNCTION update_ratings_after_game(p_game_id uuid)
RETURNS void AS $$
DECLARE
  v_game public.games%ROWTYPE;
  v_white_rating integer;
  v_black_rating integer;
  v_k_factor integer := 32;
  v_expected_white float;
  v_expected_black float;
  v_score_white float;
  v_score_black float;
  v_new_white_rating integer;
  v_new_black_rating integer;
BEGIN
  SELECT * INTO v_game FROM public.games WHERE id = p_game_id;
  
  IF NOT v_game.is_rated THEN
    RETURN;
  END IF;
  
  IF v_game.result IS NULL OR v_game.result = 'aborted' THEN
    RETURN;
  END IF;
  
  -- Get current ratings
  SELECT COALESCE(rating, 1000) INTO v_white_rating FROM public.profiles WHERE id = v_game.white_player_id;
  SELECT COALESCE(rating, 1000) INTO v_black_rating FROM public.profiles WHERE id = v_game.black_player_id;
  
  -- Calculate expected scores
  v_expected_white := 1.0 / (1.0 + pow(10, (v_black_rating - v_white_rating) / 400.0));
  v_expected_black := 1.0 - v_expected_white;
  
  -- Determine actual scores
  IF v_game.result = 'white_wins' THEN
    v_score_white := 1.0;
    v_score_black := 0.0;
  ELSIF v_game.result = 'black_wins' THEN
    v_score_white := 0.0;
    v_score_black := 1.0;
  ELSE -- draw
    v_score_white := 0.5;
    v_score_black := 0.5;
  END IF;
  
  -- Calculate new ratings
  v_new_white_rating := v_white_rating + round(v_k_factor * (v_score_white - v_expected_white));
  v_new_black_rating := v_black_rating + round(v_k_factor * (v_score_black - v_expected_black));
  
  -- Ensure minimum rating
  v_new_white_rating := GREATEST(v_new_white_rating, 100);
  v_new_black_rating := GREATEST(v_new_black_rating, 100);
  
  -- Update game with rating changes
  UPDATE public.games SET
    white_rating_before = v_white_rating,
    black_rating_before = v_black_rating,
    white_rating_after = v_new_white_rating,
    black_rating_after = v_new_black_rating
  WHERE id = p_game_id;
  
  -- Update player ratings
  UPDATE public.profiles SET rating = v_new_white_rating WHERE id = v_game.white_player_id;
  UPDATE public.profiles SET rating = v_new_black_rating WHERE id = v_game.black_player_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- REALTIME SUBSCRIPTIONS
-- Enable realtime for multiplayer tables
-- ============================================

-- Enable realtime for games table
ALTER PUBLICATION supabase_realtime ADD TABLE public.games;

-- Enable realtime for presence
ALTER PUBLICATION supabase_realtime ADD TABLE public.presence;

-- Enable realtime for game_chat
ALTER PUBLICATION supabase_realtime ADD TABLE public.game_chat;

-- Enable realtime for game_invites
ALTER PUBLICATION supabase_realtime ADD TABLE public.game_invites;

-- ============================================
-- GRANTS
-- ============================================

GRANT ALL ON public.games TO anon, authenticated;
GRANT ALL ON public.game_invites TO anon, authenticated;
GRANT ALL ON public.friends TO anon, authenticated;
GRANT ALL ON public.presence TO anon, authenticated;
GRANT ALL ON public.game_chat TO anon, authenticated;
GRANT EXECUTE ON FUNCTION accept_game_invite TO authenticated;
GRANT EXECUTE ON FUNCTION update_ratings_after_game TO authenticated;
GRANT EXECUTE ON FUNCTION generate_invite_code TO authenticated;






