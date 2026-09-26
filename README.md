# Ansuman Designs — Marketing Site

Next.js (App Router, TypeScript) port of the design handoff in
[`design_handoff_ansuman_designs_site/`](design_handoff_ansuman_designs_site/README.md).
Three static pages (Home, Portfolio, Estimator) plus one shared lead-capture
form that writes to Supabase through a server-side API route.

## Stack

- Next.js 15 / React 19, App Router, statically generated pages
- Plain CSS + CSS Modules — the Modernist design system's tokens live in
  [`app/globals.css`](app/globals.css), ported from the handoff's `styles.css`
- `lucide-react` for icons
- Supabase (`leads` table) for lead storage, written to via
  [`app/api/leads/route.ts`](app/api/leads/route.ts) so credentials never
  reach the browser

## Local setup

```bash
npm install
cp .env.local.example .env.local   # fill in the Supabase values below
npm run dev
```

## Supabase setup

Schema and RLS policies are tracked as numbered SQL files in
[`supabase/migrations/`](supabase/migrations/) — run them in order, once
each, in the Supabase SQL editor (Project → SQL Editor → New query). Every
file is idempotent (`if not exists` / `drop policy if exists` / etc.), so
re-running one is harmless.

- [`0001_initial_leads_table.sql`](supabase/migrations/0001_initial_leads_table.sql) —
  creates the `leads` table, enables RLS, and lets anonymous visitors insert
  (but not read) rows via the lead-capture forms.
- [`0002_add_project_name_column.sql`](supabase/migrations/0002_add_project_name_column.sql) —
  adds the `project_name` column the contact form's "project name" field
  writes to. **Required** — without it every lead submission fails silently
  and falls back to the WhatsApp link, since the insert can't find the
  column.
- [`0003_admin_panel.sql`](supabase/migrations/0003_admin_panel.sql) — the
  admin panel's schema: leads `status` column + admin read/update/delete
  policies, the `gallery_photos` table, and storage bucket policies. See
  [Admin panel](#admin-panel-admin) below before running this one — it
  depends on the `gallery` storage bucket existing first.

When adding new schema changes, add a new `NNNN_description.sql` file rather
than editing an existing one, so the folder stays an ordered history of what
ran and when.

`npm run test:leads` sends a real insert straight to Supabase's REST API with
every column the app writes — run it after any schema change to catch a
missing/renamed column immediately instead of finding out from a silent
WhatsApp-fallback in production (needs `SUPABASE_URL`/`SUPABASE_ANON_KEY` set,
see below).

Then, in Project Settings → API, copy the Project URL and the `anon` public
key into:

- `.env.local` for local dev (`SUPABASE_URL`, `SUPABASE_ANON_KEY`)
- Vercel → Project → Settings → Environment Variables, for production/preview

These two are read **only** by the server-side route handler
(`app/api/leads/route.ts`) — they're not `NEXT_PUBLIC_*` and never ship to
the client bundle.

## Deploying to Vercel

1. Push this repo to GitHub (see below).
2. Import it in Vercel — it's a standard Next.js app, no build config needed.
3. Add the environment variables above (`SUPABASE_URL`, `SUPABASE_ANON_KEY`,
   and optionally `NEXT_PUBLIC_WHATSAPP_NUMBER`) in the Vercel project
   settings, for both Production and Preview.
4. Deploy. Submitting any of the three lead forms on the live site will
   insert a row into the Supabase `leads` table; if the write ever fails for
   any reason, the visitor sees a success state with a prefilled WhatsApp
   link instead of an error (this fallback is intentional — see the handoff
   README's "WhatsApp fallback" section).

## Pushing to GitHub

```bash
git init
git add -A
git commit -m "Initial Next.js port of the D'Stella Designs marketing site"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Known placeholders (see the handoff README's "Fidelity" section)

- **Photography**: the hero and three room cards use Unsplash stock; the
  Kitchen/Study/Kids' Room cards and all eight portfolio tiles are empty.
  Every image goes through [`components/shared/ImageSlot.tsx`](components/shared/ImageSlot.tsx),
  so dropping in real photos means adding a `src`/`alt` (and removing the
  Unsplash `photoSrc`/`credit` fields) in [`lib/data/rooms.ts`](lib/data/rooms.ts)
  and [`lib/data/projects.ts`](lib/data/projects.ts) — no component code changes needed.
- **Portfolio project records**: currently in `lib/data/projects.ts`, ready
  to swap for a CMS or database later.
- **Social share image**: `app/layout.tsx`'s Open Graph/Twitter image is
  currently the square brand icon (`public/brand/icon.png`, 512×512). Swap
  in a real 1200×630 photo once one exists — link previews will look better
  with a landscape image than a centered square logo.

## Admin panel (`/admin`)

A password-protected area for managing leads and portfolio photos, built on
Supabase Auth + Storage (same Supabase project as the leads table).

**One-time setup:**

1. Create the photo storage bucket by hand first (SQL can't do this):
   Project → Storage → New bucket → name it `gallery` → **Public bucket: ON**.
2. Run [`supabase/migrations/0003_admin_panel.sql`](supabase/migrations/0003_admin_panel.sql)
   in the Supabase SQL Editor (Project → SQL Editor → New query). It's safe
   to re-run. This adds the bucket-access policies referencing `gallery`
   from step 1, so create the bucket first.
3. Create the admin login: Project → Authentication → Users → Add user →
   fill in email + password → tick **Auto Confirm User**. This is the only
   account the panel supports right now — there's no self-signup or
   password-reset flow.
4. Add two more environment variables (same project, just exposed to the
   browser this time — the admin area runs client-side and relies on
   Postgres RLS, not a hidden key, for access control):
   - `.env.local` for local dev: `NEXT_PUBLIC_SUPABASE_URL`,
     `NEXT_PUBLIC_SUPABASE_ANON_KEY` (same values as `SUPABASE_URL` /
     `SUPABASE_ANON_KEY` above)
   - Vercel → Project → Settings → Environment Variables, same two, for
     Production and Preview

**What it does:**

- **Leads dashboard** (`/admin`) — every lead from every form on the site,
  searchable/filterable, with a status field (New/Contacted/Quoted/Won/Lost),
  delete, and CSV export (opens fine in Excel).
- **Photos** (`/admin/photos`) — upload, delete and reorder photos per room
  tab (Living, Dining, Bedroom, Kitchen, Study, Kids' Room, Pooja). Uploads
  go to Supabase Storage and immediately replace that room's built-in photo
  set on the live site; a room with nothing uploaded yet keeps showing its
  original photos ([`lib/supabase/gallery.ts`](lib/supabase/gallery.ts)
  handles the fallback).
- **Email notifications / export-by-email**: not built yet — needs a
  transactional email provider (e.g. Resend) added first.

## Keeping Supabase awake (`vercel.json` cron)

Supabase's free tier pauses a project after 7 days with no API activity —
that would silently break lead capture (masked by the WhatsApp fallback).
[`vercel.json`](vercel.json) schedules a weekly hit to
[`/api/cron/keepalive`](app/api/cron/keepalive/route.ts), which does a
harmless read against `gallery_photos`. Optionally set `CRON_SECRET` (see
`.env.local.example`) in Vercel so only Vercel's own scheduler can trigger
it. Cron jobs only run once deployed to Vercel, not in local dev.
