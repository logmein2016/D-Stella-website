import { NextRequest, NextResponse } from "next/server";

// Server-side proxy to Supabase's REST endpoint. Keeps SUPABASE_URL /
// SUPABASE_ANON_KEY out of the client bundle (handoff "Production
// hardening" #1) and re-validates required fields server-side (#4) — client
// validation in LeadForm is UX only.
//
// Requires the table + RLS policy from the handoff README:
//   create table public.leads (...);
//   alter table public.leads enable row level security;
//   create policy "anon can insert leads" on public.leads for insert to anon with check (true);
//   grant usage on schema public to anon;
//   grant insert on public.leads to anon;
// Both grants are required — the policy alone is not sufficient.

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  reference?: string;
  message?: string;
  whatsappOk?: boolean;
  bhk?: string;
  finish?: string;
  priceRange?: string;
  context?: string;
  source?: string;
  /** Honeypot: real visitors never populate this hidden field. */
  company?: string;
};

const nullIfEmpty = (v: string | undefined) => {
  const trimmed = (v ?? "").trim();
  return trimmed === "" ? null : trimmed;
};

export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot: silently accept-and-drop so a bot gets no signal its
  // submission was rejected.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  if (!name || !phone) {
    return NextResponse.json(
      { error: "Name and phone number are required." },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    // Unconfigured — let the client fall back to WhatsApp without treating
    // it as an unexpected error server-side.
    return NextResponse.json(
      { error: "Lead storage is not configured." },
      { status: 503 },
    );
  }

  const row = {
    name,
    phone,
    email: nullIfEmpty(body.email),
    whatsapp_ok: body.whatsappOk !== false,
    message: nullIfEmpty(body.message),
    reference: nullIfEmpty(body.reference),
    bhk: nullIfEmpty(body.bhk),
    finish: nullIfEmpty(body.finish),
    price_range: nullIfEmpty(body.priceRange),
    context: nullIfEmpty(body.context),
    source: nullIfEmpty(body.source) ?? "website",
  };

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Supabase lead insert failed:", res.status, text);
      return NextResponse.json({ error: "Could not save lead." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Supabase lead insert threw:", err);
    return NextResponse.json({ error: "Could not save lead." }, { status: 502 });
  }
}
