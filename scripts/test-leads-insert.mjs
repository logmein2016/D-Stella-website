#!/usr/bin/env node
// Integration test for the leads insert path. Sends a POST containing every
// column app/api/leads/route.ts writes (including project_name) straight to
// Supabase's REST endpoint, the same way that route does. Exists to catch
// schema/insert mismatches before they reach production — a column missing
// from the database (like project_name once was) fails silently in the app
// (falls back to the WhatsApp link) but fails loudly here.
//
// Usage: node scripts/test-leads-insert.mjs
// Reads SUPABASE_URL / SUPABASE_ANON_KEY from the environment, falling back
// to .env.local if present.

import { readFileSync } from "node:fs";

function loadEnvLocal() {
  try {
    const text = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    for (const line of text.split("\n")) {
      const match = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
      if (match && !(match[1] in process.env)) {
        process.env[match[1]] = match[2];
      }
    }
  } catch {
    // .env.local is optional — CI will set real env vars instead.
  }
}

loadEnvLocal();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing SUPABASE_URL / SUPABASE_ANON_KEY. Set them in the environment or .env.local.",
  );
  process.exit(1);
}

const marker = `integration-test-${Date.now()}`;
const row = {
  name: "Integration Test",
  phone: marker,
  email: null,
  whatsapp_ok: true,
  message: "Automated test row from scripts/test-leads-insert.mjs — safe to delete.",
  reference: null,
  bhk: "2bhk",
  finish: "premium",
  price_range: null,
  context: null,
  project_name: "Integration Test Project",
  source: "integration-test",
};

const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
    Prefer: "return=representation",
  },
  body: JSON.stringify(row),
});

if (!res.ok) {
  const text = await res.text();
  console.error(`FAIL: insert rejected (${res.status}): ${text}`);
  process.exit(1);
}

const [inserted] = await res.json();
const missing = Object.keys(row).filter((key) => !(key in (inserted ?? {})));
if (missing.length > 0) {
  console.error(`FAIL: inserted row is missing column(s): ${missing.join(", ")}`);
  process.exit(1);
}

console.log(`PASS: lead insert accepted all columns (id ${inserted.id}).`);
console.log(
  `Note: the anon key can only insert, not delete, so this left one test row ` +
    `(source=integration-test, phone=${marker}) in the leads table — delete it ` +
    `from the admin dashboard whenever convenient.`,
);
