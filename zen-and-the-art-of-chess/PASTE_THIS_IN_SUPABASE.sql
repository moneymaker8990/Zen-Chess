-- =============================================
-- PUZZLE TABLES FOR ZEN CHESS
-- Copy this entire file and paste into Supabase SQL Editor
-- Then click "Run"
-- =============================================

-- 1. PUZZLES TABLE (stores all puzzles)
CREATE TABLE IF NOT EXISTS public.puzzles (
  id TEXT PRIMARY KEY,
  fen TEXT NOT NULL,
  solution_moves TEXT NOT NULL,
  rating INTEGER NOT NULL,
  rating_deviation INTEGER DEFAULT 75,
  themes TEXT[] DEFAULT '{}',
  popularity INTEGER DEFAULT 0,
  nb_plays INTEGER DEFAULT 0,
  game_url TEXT,
  opening_tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_puzzles_rating ON public.puzzles(rating);
CREATE INDEX IF NOT EXISTS idx_puzzles_themes ON public.puzzles USING GIN(themes);

ALTER TABLE public.puzzles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Puzzles are publicly readable" ON public.puzzles;
CREATE POLICY "Puzzles are publicly readable" ON public.puzzles FOR SELECT TO anon, authenticated USING (true);

-- 2. USER PUZZLE RATINGS (per-user Elo)
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
  last_themes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.user_puzzle_ratings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own puzzle rating" ON public.user_puzzle_ratings;
CREATE POLICY "Users can view own puzzle rating" ON public.user_puzzle_ratings FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own puzzle rating" ON public.user_puzzle_ratings;
CREATE POLICY "Users can update own puzzle rating" ON public.user_puzzle_ratings FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own puzzle rating" ON public.user_puzzle_ratings;
CREATE POLICY "Users can insert own puzzle rating" ON public.user_puzzle_ratings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. GRANTS
GRANT SELECT ON public.puzzles TO anon, authenticated;
GRANT ALL ON public.user_puzzle_ratings TO authenticated;

-- Done! The puzzle system is now ready.
-- The local puzzle pool (~100+ puzzles) will work immediately.
-- To add 50K+ Lichess puzzles, run: npx ts-node scripts/import-lichess-puzzles.ts

