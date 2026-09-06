// Site-wide constants. Two of these are placeholders pending real client
// data — see design_handoff_ansuman_designs_site/README.md "Fidelity".

/** Dark nav/footer fill. Themeable per the handoff: a single CSS custom
 * property set once on :root (see app/globals.css) so it can be changed in
 * one place. Alternates offered by the design: Espresso #241a14,
 * Deep Forest #1c2620, Plum #241522. */
export const TONE_DARK = "#1a1817";

export const SITE_NAME = "D'Stella Designs";
export const SITE_TAGLINE = "Where a House becomes a Home — Bangalore";

/** Placeholder — appears in every footer. Needs the client's real number. */
export const PHONE_DISPLAY = "+91 90000 00000";

export const SITE_URL = "https://ansumandesigns.com";

/** Digits only, with country code — used for the WhatsApp fallback link.
 * Placeholder until the client supplies their real number (matches
 * PHONE_DISPLAY above). Public: it only ever appears in a wa.me URL. */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919000000000";
