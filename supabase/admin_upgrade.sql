-- Run this once after schema.sql and seed_places.sql to improve admin features.
-- It adds useful indexes and creates the public Storage bucket for place images.

create unique index if not exists idx_place_articles_place_id_unique on public.place_articles(place_id);
create index if not exists idx_place_images_place_id on public.place_images(place_id);
create index if not exists idx_sources_place_id on public.sources(place_id);
create index if not exists idx_community_submissions_place_id on public.community_submissions(place_id);

alter table public.place_articles add column if not exists updated_at timestamptz default now();
alter table public.places add column if not exists updated_at timestamptz default now();

insert into storage.buckets (id, name, public)
values ('place-images', 'place-images', true)
on conflict (id) do update set public = excluded.public;

-- If you later enable RLS, add proper policies before production hardening.
