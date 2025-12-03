-- ============================================
-- ZEN CHESS DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- ============================================
-- ENUMS (with IF NOT EXISTS handling)
-- ============================================

DO $$ BEGIN
  CREATE TYPE subscription_tier AS ENUM ('free', 'premium', 'lifetime');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing', 'incomplete');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- PROFILES TABLE
-- User profiles with chess-specific data
-- ============================================

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  username text unique,
  display_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Chess progress
  rating integer default 1000,
  puzzles_solved integer default 0,
  current_day integer default 1,
  streak_days integer default 0,
  meditation_minutes integer default 0,
  
  -- Subscription
  subscription_tier subscription_tier default 'free',
  subscription_status subscription_status,
  subscription_end_date timestamp with time zone,
  stripe_customer_id text unique,
  
  -- Settings (synced from client)
  settings jsonb default '{}'::jsonb
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies (drop first if exists)
drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "Profiles are created on signup" on public.profiles;
create policy "Profiles are created on signup"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ============================================
-- USER PROGRESS TABLE
-- Detailed progress data (larger JSON blobs)
-- ============================================

create table if not exists public.user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  
  -- Progress arrays/objects
  completed_days integer[] default '{}',
  tilt_events jsonb default '[]'::jsonb,
  mistake_library jsonb default '[]'::jsonb,
  notes jsonb default '[]'::jsonb,
  opening_repertoire jsonb,
  spaced_repetition_data jsonb,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  constraint unique_user_progress unique (user_id)
);

-- Enable RLS
alter table public.user_progress enable row level security;

-- Policies (drop first if exists)
drop policy if exists "Users can view their own progress" on public.user_progress;
create policy "Users can view their own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

drop policy if exists "Users can update their own progress" on public.user_progress;
create policy "Users can update their own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own progress" on public.user_progress;
create policy "Users can insert their own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

-- ============================================
-- SUBSCRIPTIONS TABLE
-- Stripe subscription tracking
-- ============================================

create table if not exists public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  
  stripe_subscription_id text unique,
  stripe_price_id text,
  status subscription_status default 'incomplete',
  
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean default false,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.subscriptions enable row level security;

-- Policies (drop first if exists)
drop policy if exists "Users can view their own subscriptions" on public.subscriptions;
create policy "Users can view their own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Only service role can modify subscriptions (via webhooks)
drop policy if exists "Service role can manage subscriptions" on public.subscriptions;
create policy "Service role can manage subscriptions"
  on public.subscriptions for all
  using (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  
  insert into public.user_progress (user_id)
  values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Update timestamp function
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Update timestamp triggers
drop trigger if exists update_profiles_updated_at on public.profiles;
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at();

drop trigger if exists update_user_progress_updated_at on public.user_progress;
create trigger update_user_progress_updated_at
  before update on public.user_progress
  for each row execute procedure public.update_updated_at();

drop trigger if exists update_subscriptions_updated_at on public.subscriptions;
create trigger update_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute procedure public.update_updated_at();

-- ============================================
-- FUNCTION: Update subscription from Stripe webhook
-- ============================================

create or replace function public.update_user_subscription(
  p_stripe_customer_id text,
  p_subscription_tier subscription_tier,
  p_subscription_status subscription_status,
  p_subscription_end_date timestamp with time zone
)
returns void as $$
begin
  update public.profiles
  set
    subscription_tier = p_subscription_tier,
    subscription_status = p_subscription_status,
    subscription_end_date = p_subscription_end_date,
    updated_at = timezone('utc'::text, now())
  where stripe_customer_id = p_stripe_customer_id;
end;
$$ language plpgsql security definer;

-- ============================================
-- INDEXES
-- ============================================

create index if not exists idx_profiles_stripe_customer on public.profiles(stripe_customer_id);
create index if not exists idx_profiles_subscription_tier on public.profiles(subscription_tier);
create index if not exists idx_subscriptions_user on public.subscriptions(user_id);
create index if not exists idx_subscriptions_stripe on public.subscriptions(stripe_subscription_id);

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

grant usage on schema public to anon, authenticated;
grant all on public.profiles to anon, authenticated;
grant all on public.user_progress to anon, authenticated;
grant all on public.subscriptions to anon, authenticated;


