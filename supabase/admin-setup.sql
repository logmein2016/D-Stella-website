-- D'Stella admin area setup. Run this once in the Supabase SQL Editor
-- (Project -> SQL Editor -> New query), then run it. Safe to re-run —
-- every statement is idempotent (IF NOT EXISTS / OR REPLACE / drop-first).

-- ============================================================
-- 0. Bug fix, unrelated to the admin area: the contact page's "project
--    name" field was added to the code (app/api/leads/route.ts,
--    lib/leads.ts) without ever adding the matching column here, so
--    EVERY lead submission on the site has been failing to save and
--    silently falling back to the WhatsApp link. Fixes that.
-- ============================================================
alter table public.leads add column if not exists project_name text;

-- ============================================================
-- 1. Leads table: add a status column, and let signed-in admins
--    read/update/delete (the existing "anon can insert" policy from the
--    contact/lead forms is untouched).
-- ============================================================
alter table public.leads add column if not exists status text not null default 'new';
alter table public.leads add constraint leads_status_check
  check (status in ('new', 'contacted', 'quoted', 'won', 'lost'))
  not valid;
alter table public.leads validate constraint leads_status_check;

drop policy if exists "authenticated can read leads" on public.leads;
create policy "authenticated can read leads" on public.leads
  for select to authenticated using (true);

drop policy if exists "authenticated can update leads" on public.leads;
create policy "authenticated can update leads" on public.leads
  for update to authenticated using (true) with check (true);

drop policy if exists "authenticated can delete leads" on public.leads;
create policy "authenticated can delete leads" on public.leads
  for delete to authenticated using (true);

-- ============================================================
-- 2. Gallery photos table: one row per photo, grouped by room slug
--    (drawing-room, dining, bedroom, kitchen, study, kids-room, pooja).
--    Replaces the static list in lib/data/gallery.ts as the source of
--    truth once the admin panel is wired up.
-- ============================================================
create table if not exists public.gallery_photos (
  id uuid primary key default gen_random_uuid(),
  room_slug text not null,
  src text not null,
  alt text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.gallery_photos enable row level security;

drop policy if exists "anyone can read gallery photos" on public.gallery_photos;
create policy "anyone can read gallery photos" on public.gallery_photos
  for select to anon, authenticated using (true);

drop policy if exists "authenticated can manage gallery photos" on public.gallery_photos;
create policy "authenticated can manage gallery photos" on public.gallery_photos
  for all to authenticated using (true) with check (true);

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.gallery_photos to authenticated;
grant select on public.gallery_photos to anon;
grant select, update, delete on public.leads to authenticated;

-- ============================================================
-- 3. Storage bucket for uploaded photos.
--    The bucket itself can't be created by SQL — do this first:
--      Project -> Storage -> New bucket -> name it "gallery" -> Public bucket: ON
--    Then run the policies below.
-- ============================================================
drop policy if exists "anyone can view gallery files" on storage.objects;
create policy "anyone can view gallery files" on storage.objects
  for select to anon, authenticated using (bucket_id = 'gallery');

drop policy if exists "authenticated can upload gallery files" on storage.objects;
create policy "authenticated can upload gallery files" on storage.objects
  for insert to authenticated with check (bucket_id = 'gallery');

drop policy if exists "authenticated can delete gallery files" on storage.objects;
create policy "authenticated can delete gallery files" on storage.objects
  for delete to authenticated using (bucket_id = 'gallery');

-- ============================================================
-- 4. Create the admin login.
--    Do this in the dashboard, not SQL (so the password is never typed
--    anywhere else): Project -> Authentication -> Users -> Add user ->
--    fill in email + password -> tick "Auto Confirm User".
--    That's the only admin account this panel supports for now.
-- ============================================================
