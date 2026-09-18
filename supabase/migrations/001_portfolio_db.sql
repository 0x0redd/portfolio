-- Portfolio database schema for Supabase
-- Apply in SQL Editor, or via: node scripts/setup-supabase-db.mjs

create extension if not exists "pgcrypto";

-- Catalog of media in Storage bucket "portfolio"
create table if not exists public.images (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  album text not null,
  filename text not null,
  content_type text,
  sort_order integer not null default 0,
  published boolean not null default false,
  featured boolean not null default false,
  width integer,
  height integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists images_album_published_idx
  on public.images (album, published, sort_order);

-- Key/value portfolio stats (Unsplash + site)
create table if not exists public.stats (
  key text primary key,
  value numeric not null default 0,
  label text,
  hint text,
  meta jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Visitor comments / testimonials
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  comment text not null,
  created_at timestamptz not null default now()
);

create index if not exists comments_created_at_idx
  on public.comments (created_at desc);

-- Device / visit logs (replaces Google Sheets "views" tab)
create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  ip text,
  user_agent text,
  page text not null default '/',
  created_at timestamptz not null default now()
);

create index if not exists page_views_created_at_idx
  on public.page_views (created_at desc);

-- Seed baseline stats
insert into public.stats (key, value, label, hint) values
  ('site_views_offset', 2000, 'Portfolio visits offset', 'Added to raw page_views count for display'),
  ('unsplash_views', 0, 'Unsplash views', 'Total impressions across published photos.'),
  ('unsplash_downloads', 0, 'Unsplash downloads', 'Free downloads by creators worldwide.'),
  ('unsplash_photos', 0, 'Photos published', 'Free photos shared on Unsplash.'),
  ('unsplash_likes', 0, 'Photo likes', 'Community appreciation across the library.'),
  ('unsplash_collections', 0, 'Collections', 'Curated sets of work on Unsplash.')
on conflict (key) do nothing;

-- RLS
alter table public.images enable row level security;
alter table public.stats enable row level security;
alter table public.comments enable row level security;
alter table public.page_views enable row level security;

-- Public read for published catalog + stats + comments
drop policy if exists "Public read published images" on public.images;
create policy "Public read published images"
  on public.images for select
  using (published = true);

drop policy if exists "Public read stats" on public.stats;
create policy "Public read stats"
  on public.stats for select
  using (true);

drop policy if exists "Public read comments" on public.comments;
create policy "Public read comments"
  on public.comments for select
  using (true);

-- Inserts go through service role in API routes (bypasses RLS).
-- Optional anon insert for comments if you want direct client writes later:
drop policy if exists "Public insert comments" on public.comments;
create policy "Public insert comments"
  on public.comments for insert
  with check (
    char_length(trim(name)) > 0
    and char_length(trim(comment)) > 0
    and char_length(name) <= 120
    and char_length(comment) <= 2000
  );

drop policy if exists "Public insert page_views" on public.page_views;
create policy "Public insert page_views"
  on public.page_views for insert
  with check (true);

-- page_views stay private (no select for anon) — only service role reads counts
