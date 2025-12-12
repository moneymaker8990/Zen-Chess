-- ============================================
-- PUZZLE SYSTEM SCHEMA
-- Chess.com-style adaptive puzzle system
-- Run this in your Supabase SQL Editor
-- ============================================

-- ============================================
-- PUZZLES TABLE
-- Stores Lichess puzzles with proper Elo ratings
-- ============================================

CREATE TABLE IF NOT EXISTS public.puzzles (
  id TEXT PRIMARY KEY,                    -- Lichess puzzle ID (e.g., "00008")
  fen TEXT NOT NULL,                      -- Position before first move
  solution_moves TEXT NOT NULL,           -- UCI format: "e2e4 e7e5 g1f3"
  rating INTEGER NOT NULL,                -- Puzzle difficulty (Elo-like, 100-3000)
  rating_deviation INTEGER DEFAULT 75,    -- Rating uncertainty
  themes TEXT[] DEFAULT '{}',             -- ['fork', 'middlegame', 'short']
  popularity INTEGER DEFAULT 0,           -- Lichess popularity score (-100 to 100)
  nb_plays INTEGER DEFAULT 0,             -- Number of times played on Lichess
  game_url TEXT,                          -- Original game URL
  opening_tags TEXT[] DEFAULT '{}',       -- Opening classification
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for fast puzzle selection
CREATE INDEX IF NOT EXISTS idx_puzzles_rating ON public.puzzles(rating);
CREATE INDEX IF NOT EXISTS idx_puzzles_themes ON public.puzzles USING GIN(themes);
CREATE INDEX IF NOT EXISTS idx_puzzles_rating_themes ON public.puzzles(rating, themes);
CREATE INDEX IF NOT EXISTS idx_puzzles_popularity ON public.puzzles(popularity DESC);

-- Enable RLS (puzzles are public read)
ALTER TABLE public.puzzles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Puzzles are publicly readable" ON public.puzzles;
CREATE POLICY "Puzzles are publicly readable"
  ON public.puzzles FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only service role can insert/update puzzles (via import script)
DROP POLICY IF EXISTS "Service role can manage puzzles" ON public.puzzles;
CREATE POLICY "Service role can manage puzzles"
  ON public.puzzles FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- USER PUZZLE RATINGS TABLE
-- Per-user puzzle Elo rating (separate from game rating)
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_puzzle_ratings (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL DEFAULT 1000,
  highest_rating INTEGER NOT NULL DEFAULT 1000,
  lowest_rating INTEGER NOT NULL DEFAULT 1000,
  games_played INTEGER NOT NULL DEFAULT 0,
  wins INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  best_streak INTEGER NOT NULL DEFAULT 0,
  last_themes TEXT[] DEFAULT '{}',        -- Last 5 themes seen (for variety)
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_puzzle_ratings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own puzzle rating" ON public.user_puzzle_ratings;
CREATE POLICY "Users can view their own puzzle rating"
  ON public.user_puzzle_ratings FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own puzzle rating" ON public.user_puzzle_ratings;
CREATE POLICY "Users can update their own puzzle rating"
  ON public.user_puzzle_ratings FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own puzzle rating" ON public.user_puzzle_ratings;
CREATE POLICY "Users can insert their own puzzle rating"
  ON public.user_puzzle_ratings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- USER PUZZLE HISTORY TABLE
-- Track every puzzle attempt (prevents repetition)
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_puzzle_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  puzzle_id TEXT NOT NULL REFERENCES public.puzzles(id) ON DELETE CASCADE,
  solved BOOLEAN NOT NULL,
  time_taken_ms INTEGER,                  -- How long user took
  hints_used INTEGER DEFAULT 0,           -- Number of hints requested
  user_rating_before INTEGER NOT NULL,
  user_rating_after INTEGER NOT NULL,
  puzzle_rating INTEGER NOT NULL,         -- Snapshot of puzzle rating at time of attempt
  mode TEXT DEFAULT 'rated',              -- 'rated', 'streak', 'rush', 'daily'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for fast history lookups
CREATE INDEX IF NOT EXISTS idx_puzzle_history_user ON public.user_puzzle_history(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_puzzle_history_puzzle ON public.user_puzzle_history(puzzle_id);
CREATE INDEX IF NOT EXISTS idx_puzzle_history_user_puzzle ON public.user_puzzle_history(user_id, puzzle_id);

-- Enable RLS
ALTER TABLE public.user_puzzle_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own puzzle history" ON public.user_puzzle_history;
CREATE POLICY "Users can view their own puzzle history"
  ON public.user_puzzle_history FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own puzzle history" ON public.user_puzzle_history;
CREATE POLICY "Users can insert their own puzzle history"
  ON public.user_puzzle_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to get next puzzle for a user (avoids repetition, matches rating)
CREATE OR REPLACE FUNCTION public.get_next_puzzle(
  p_user_id UUID,
  p_user_rating INTEGER DEFAULT 1000,
  p_rating_range INTEGER DEFAULT 200,
  p_excluded_themes TEXT[] DEFAULT '{}'
)
RETURNS TABLE (
  id TEXT,
  fen TEXT,
  solution_moves TEXT,
  rating INTEGER,
  themes TEXT[],
  popularity INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.fen,
    p.solution_moves,
    p.rating,
    p.themes,
    p.popularity
  FROM public.puzzles p
  WHERE 
    p.rating BETWEEN (p_user_rating - p_rating_range) AND (p_user_rating + p_rating_range)
    AND p.id NOT IN (
      SELECT h.puzzle_id 
      FROM public.user_puzzle_history h 
      WHERE h.user_id = p_user_id 
      ORDER BY h.created_at DESC 
      LIMIT 100
    )
    -- Avoid themes that were just seen (first theme of puzzle)
    AND (
      array_length(p_excluded_themes, 1) IS NULL 
      OR NOT (p.themes[1] = ANY(p_excluded_themes))
    )
  ORDER BY random()
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's recent puzzle IDs (for client-side filtering)
CREATE OR REPLACE FUNCTION public.get_recent_puzzle_ids(
  p_user_id UUID,
  p_limit INTEGER DEFAULT 100
)
RETURNS TEXT[] AS $$
BEGIN
  RETURN ARRAY(
    SELECT h.puzzle_id
    FROM public.user_puzzle_history h
    WHERE h.user_id = p_user_id
    ORDER BY h.created_at DESC
    LIMIT p_limit
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to record puzzle attempt and update rating
CREATE OR REPLACE FUNCTION public.record_puzzle_attempt(
  p_user_id UUID,
  p_puzzle_id TEXT,
  p_solved BOOLEAN,
  p_time_taken_ms INTEGER DEFAULT NULL,
  p_hints_used INTEGER DEFAULT 0,
  p_mode TEXT DEFAULT 'rated'
)
RETURNS TABLE (
  new_rating INTEGER,
  rating_change INTEGER,
  new_streak INTEGER
) AS $$
DECLARE
  v_user_rating INTEGER;
  v_puzzle_rating INTEGER;
  v_expected FLOAT;
  v_k INTEGER := 32;
  v_rating_change INTEGER;
  v_new_rating INTEGER;
  v_current_streak INTEGER;
  v_best_streak INTEGER;
BEGIN
  -- Get user's current rating (or create if doesn't exist)
  SELECT rating, current_streak, best_streak INTO v_user_rating, v_current_streak, v_best_streak
  FROM public.user_puzzle_ratings
  WHERE user_id = p_user_id;
  
  IF v_user_rating IS NULL THEN
    INSERT INTO public.user_puzzle_ratings (user_id)
    VALUES (p_user_id);
    v_user_rating := 1000;
    v_current_streak := 0;
    v_best_streak := 0;
  END IF;
  
  -- Get puzzle rating
  SELECT p.rating INTO v_puzzle_rating
  FROM public.puzzles p
  WHERE p.id = p_puzzle_id;
  
  IF v_puzzle_rating IS NULL THEN
    RAISE EXCEPTION 'Puzzle not found: %', p_puzzle_id;
  END IF;
  
  -- Calculate Elo change (only for rated mode)
  IF p_mode = 'rated' THEN
    v_expected := 1.0 / (1.0 + power(10, (v_puzzle_rating - v_user_rating)::float / 400));
    v_rating_change := round(v_k * (CASE WHEN p_solved THEN 1 ELSE 0 END - v_expected));
    v_new_rating := GREATEST(100, v_user_rating + v_rating_change);
  ELSE
    v_rating_change := 0;
    v_new_rating := v_user_rating;
  END IF;
  
  -- Update streak
  IF p_solved THEN
    v_current_streak := v_current_streak + 1;
    v_best_streak := GREATEST(v_best_streak, v_current_streak);
  ELSE
    v_current_streak := 0;
  END IF;
  
  -- Record the attempt
  INSERT INTO public.user_puzzle_history (
    user_id, puzzle_id, solved, time_taken_ms, hints_used,
    user_rating_before, user_rating_after, puzzle_rating, mode
  ) VALUES (
    p_user_id, p_puzzle_id, p_solved, p_time_taken_ms, p_hints_used,
    v_user_rating, v_new_rating, v_puzzle_rating, p_mode
  );
  
  -- Update user rating
  UPDATE public.user_puzzle_ratings
  SET 
    rating = v_new_rating,
    highest_rating = GREATEST(highest_rating, v_new_rating),
    lowest_rating = LEAST(lowest_rating, v_new_rating),
    games_played = games_played + 1,
    wins = wins + CASE WHEN p_solved THEN 1 ELSE 0 END,
    losses = losses + CASE WHEN p_solved THEN 0 ELSE 1 END,
    current_streak = v_current_streak,
    best_streak = v_best_streak,
    updated_at = now()
  WHERE user_id = p_user_id;
  
  RETURN QUERY SELECT v_new_rating, v_rating_change, v_current_streak;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- TRIGGERS
-- ============================================

-- Update timestamp trigger for user_puzzle_ratings
DROP TRIGGER IF EXISTS update_user_puzzle_ratings_updated_at ON public.user_puzzle_ratings;
CREATE TRIGGER update_user_puzzle_ratings_updated_at
  BEFORE UPDATE ON public.user_puzzle_ratings
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at();

-- ============================================
-- GRANTS
-- ============================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.puzzles TO anon, authenticated;
GRANT ALL ON public.user_puzzle_ratings TO authenticated;
GRANT ALL ON public.user_puzzle_history TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_next_puzzle TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_recent_puzzle_ids TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_puzzle_attempt TO authenticated;




