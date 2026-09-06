// Client-side lead submission. Ported from the prototype's leads.js, with
// one change per the handoff's "Production hardening" #1: the write moves
// server-side (app/api/leads/route.ts) so the Supabase credentials never
// reach the browser bundle. Behaviour is otherwise identical — including
// the rule that a failed write never surfaces as an error to the visitor;
// it silently falls back to a prefilled WhatsApp deep link instead.

export type LeadInput = {
  name: string;
  phone: string;
  email: string;
  reference: string;
  message: string;
  whatsappOk: boolean;
  bhk?: string;
  finish?: string;
  priceRange?: string;
  context?: string;
  source: string;
  /** Honeypot — real visitors never fill this in. */
  company?: string;
};

export type SubmitLeadResult = {
  ok: boolean;
  /** Present when ok is false: a prefilled wa.me link so the lead is never lost. */
  whatsapp?: string;
};

export function whatsappLink(lead: LeadInput, whatsappNumber: string): string {
  const lines = [
    "Hi Ansuman Designs, I would like an estimate.",
    "",
    `Name: ${lead.name || "-"}`,
    `Phone: ${lead.phone || "-"}`,
  ];
  if (lead.email) lines.push(`Email: ${lead.email}`);
  if (lead.context) lines.push(`Interested in: ${lead.context}`);
  else if (lead.bhk) lines.push(`Interested in: ${lead.bhk} BHK`);
  if (lead.reference) lines.push(`Reference: ${lead.reference}`);
  if (lead.message) lines.push("", lead.message);
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export async function submitLead(
  lead: LeadInput,
  whatsappNumber: string,
): Promise<SubmitLeadResult> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(await res.text());
    return { ok: true };
  } catch {
    return { ok: false, whatsapp: whatsappLink(lead, whatsappNumber) };
  }
}
