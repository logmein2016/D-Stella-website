// ---------------------------------------------------------------------------
// Lead capture config. Fill these two values in from your Supabase project
// (Project Settings → API). Until then, submissions fall back to WhatsApp.
// ---------------------------------------------------------------------------
export const SUPABASE_URL = 'https://aobvuidsqgllybwckdsn.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvYnZ1aWRzcWdsbHlid2NrZHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0MTg2OTcsImV4cCI6MjEwMjk5NDY5N30.fhg5_XPxbsNnRV4Fjk-n5vsMhhxbwkN7Ol5GJ7kcIGU';
export const LEADS_TABLE = 'leads';

// Used for the WhatsApp fallback and the footer. Digits only, with country code.
export const WHATSAPP_NUMBER = '919000000000';

/*
  Supabase setup — run this once in the SQL editor:

    create table public.leads (
      id          bigint generated always as identity primary key,
      created_at  timestamptz not null default now(),
      name        text not null,
      email       text,
      phone       text not null,
      whatsapp_ok boolean not null default true,
      message     text,
      reference   text,
      bhk         text,
      finish      text,
      price_range text,
      context     text,
      source      text
    );

  Leads from the estimator also carry what they actually clicked, in their own
  columns so you can filter and group on them:
    bhk         '2' or '3'
    finish      'value', 'premium' or 'luxury'
    price_range the range they were shown, e.g. '₹9.5L – ₹11.5L'

  So you can ask questions like "how many 3 BHK luxury enquiries this month":
    select bhk, finish, count(*) from leads group by bhk, finish order by 3 desc;

  The `source` column tells you which form the lead came from:
    'home-pinterest-reference' — home page, "Already have a look in mind?"
    'portfolio-page'           — portfolio page, below the project grid
    'estimator-page'           — estimator page, after the price result
                                 (its `context` column also carries the
                                  BHK / finish / price range they selected)

    alter table public.leads enable row level security;

    create policy "anon can insert leads"
      on public.leads for insert to anon with check (true);

  Insert-only for the anon role: the public site can add leads but cannot read
  them back. View them in the Supabase table editor or your own dashboard.
*/

export function whatsappLink(lead) {
  const lines = [
    'Hi Ansuman Designs, I would like an estimate.',
    '',
    `Name: ${lead.name || '-'}`,
    `Phone: ${lead.phone || '-'}`,
  ];
  if (lead.email) lines.push(`Email: ${lead.email}`);
  if (lead.context) lines.push(`Interested in: ${lead.context}`);
  else if (lead.bhk) lines.push(`Interested in: ${lead.bhk} BHK`);
  if (lead.reference) lines.push(`Reference: ${lead.reference}`);
  if (lead.message) lines.push('', lead.message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export const isConfigured = () => Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export async function submitLead(lead) {
  const row = {
    name: lead.name,
    email: lead.email || null,
    phone: lead.phone,
    whatsapp_ok: lead.whatsappOk !== false,
    message: lead.message || null,
    reference: lead.reference || null,
    bhk: lead.bhk || null,
    finish: lead.finish || null,
    price_range: lead.priceRange || null,
    context: lead.context || null,
    source: lead.source || 'website',
  };

  if (!isConfigured()) return { ok: false, mode: 'unconfigured', whatsapp: whatsappLink(lead) };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${LEADS_TABLE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) throw new Error(await res.text());
    return { ok: true, mode: 'supabase' };
  } catch (err) {
    return { ok: false, mode: 'error', error: String(err), whatsapp: whatsappLink(lead) };
  }
}
