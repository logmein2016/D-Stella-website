import { NextRequest, NextResponse } from "next/server";

// Supabase's free tier pauses a project after 7 days with no API activity,
// which would silently break lead capture (masked by the WhatsApp fallback —
// see app/api/leads/route.ts). Vercel Cron hits this route weekly so the
// project never goes quiet. A plain read is enough to count as activity, so
// this reads gallery_photos (already public via RLS) rather than writing and
// cleaning up a row — no extra permissions needed.

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/gallery_photos?select=id&limit=1`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Keepalive ping failed:", res.status, text);
    return NextResponse.json({ error: "Supabase ping failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() });
}
