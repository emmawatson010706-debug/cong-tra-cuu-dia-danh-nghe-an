-- Supabase schema for CỔNG TRA CỨU ĐỊA DANH XÃ PHƯỜNG NGHỆ AN
create extension if not exists "uuid-ossp";

create table if not exists public.places (
  id text primary key,
  slug text unique not null,
  name text not null,
  type text not null,
  old_district text,
  old_units jsonb default '[]'::jsonb,
  area_km2 numeric,
  population integer,
  density numeric,
  lat numeric,
  lng numeric,
  official_url text,
  legal_source text,
  local_source text,
  source_status text default 'draft',
  article_status text default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.place_articles (
  id uuid primary key default uuid_generate_v4(),
  place_id text references public.places(id) on delete cascade,
  title text not null,
  body text not null,
  status text default 'draft',
  author_email text,
  source_note text,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.place_images (
  id uuid primary key default uuid_generate_v4(),
  place_id text references public.places(id) on delete cascade,
  image_url text not null,
  caption text,
  credit text,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists public.sources (
  id uuid primary key default uuid_generate_v4(),
  place_id text references public.places(id) on delete set null,
  title text not null,
  url text,
  publisher text,
  source_type text,
  reliability_level text default 'official',
  created_at timestamptz default now()
);

create table if not exists public.community_submissions (
  id uuid primary key default uuid_generate_v4(),
  place_id text references public.places(id) on delete set null,
  sender_name text,
  sender_phone text,
  sender_email text,
  message text,
  image_url text,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists public.admin_users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  role text default 'admin',
  created_at timestamptz default now()
);

insert into public.admin_users (email, role)
values ('tinnhanhonline247@gmail.com', 'admin')
on conflict (email) do update set role = excluded.role;
