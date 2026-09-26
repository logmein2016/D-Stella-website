-- Bug fix. The contact page's "project name" field was added to the code
-- (app/api/leads/route.ts, lib/leads.ts) without a matching column here,
-- so EVERY lead submission on the site failed to save and silently fell
-- back to the WhatsApp link. This is the fix — safe to re-run.
alter table public.leads add column if not exists project_name text;
