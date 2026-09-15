// Site-wide constants.

/** Dark nav/footer fill — set to the brand's navy (from the logo mark and
 * pitch deck), replacing the earlier generic near-black placeholder. A
 * single CSS custom property set once on :root (see app/globals.css) so it
 * can be changed in one place. Alternates offered by the design: Espresso
 * #241a14, Deep Forest #1c2620, Plum #241522. */
export const TONE_DARK = "#20222c";

export const SITE_NAME = "D'Stella Designs";
export const SITE_TAGLINE = "Where a House becomes a Home — Bangalore";

/** Appears in every footer. Falls back to the brand's published landline
 * (from the letterhead) if the env var isn't set. */
export const PHONE_DISPLAY = `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918088035075"}`;

export const SITE_URL = "https://www.dstellainteriors.com";

/** Digits only, with country code — used for the WhatsApp fallback link.
 * Falls back to the brand's published number (from the letterhead) if the
 * env var isn't set. Public: it only ever appears in a wa.me URL. */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918088035075";
