-- Historical record of the leads table's original creation, run manually
-- in the Supabase SQL Editor early in the project (documented in
-- README.md at the time). Included here retroactively so the migrations
-- folder has the full, ordered history — safe to re-run.

create table if not exists public.leads (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text,
  phone        text not null,
  whatsapp_ok  boolean not null default true,
  message      text,
  reference    text,
  bhk          text,
  finish       text,
  price_range  text,
  context      text,
  source       text
);

alter table public.leads enable row level security;

drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads"
  on public.leads for insert to anon with check (true);

grant usage on schema public to anon;
grant insert on public.leads to anon;
