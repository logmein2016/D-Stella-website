import { createClient } from "@supabase/supabase-js";

// Browser client for the admin area (auth, leads dashboard, photo uploads).
// Uses the anon/publishable key — safe to expose to the browser by design.
// Actual access control is enforced by Postgres RLS policies keyed off the
// signed-in user (see supabase/admin-setup.sql), not by this key.
export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
