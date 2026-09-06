# Handoff: D'Stella Designs — Interior Design Marketing Site

## Overview

A three-page mobile-first marketing site for **D'Stella Designs**, an interior design firm in Bangalore. It targets mid-segment 2–3 BHK apartment owners with budgets in the ₹7–12L range.

The site's job is to establish design credibility, give a visitor a self-serve price range without gating it behind a form, and capture leads into a Supabase table with enough context that a sales call can be prepared before dialling.

Three pages:

| Page | File | Purpose |
| --- | --- | --- |
| Home | `Landing.dc.html` | Establish taste, explain the room-by-room offering and the delivery process, capture reference-led leads |
| Portfolio | `Portfolio.dc.html` | Show completed projects with real budgets, filterable by apartment size |
| Estimator | `Estimator.dc.html` | Two-click price range, then an escalation to a precise quote |

Plus one shared component, `LeadForm.dc.html`, used in three places, and `leads.js`, the Supabase submission layer.

---

## About the Design Files

**The files in this bundle are design references created in HTML.** They are working prototypes that demonstrate the intended look, copy, layout and interaction behaviour. They are **not production code to lift directly.**

The task is to **recreate these designs in the target codebase's existing environment** — React, Next.js, Vue, Astro, whatever the project uses — following that codebase's established component patterns, routing, styling approach and state conventions.

If no codebase exists yet, this is a small, content-led, SEO-relevant marketing site with three routes and one interactive form. **Next.js (App Router) with static generation** is a sensible default: it gives real URLs for SEO, server-side form handling if you later want to hide the Supabase write behind a route handler, and image optimisation for the photography this design leans on heavily. Astro is an equally good choice if you want less JavaScript on the page.

The prototypes are built on a custom in-house rendering runtime (`support.js`, `.dc.html` templates). **Do not port that runtime.** Read the templates as markup-and-intent, read the logic classes as state-and-behaviour specs, and rebuild in idiomatic framework code.

## Fidelity

**High-fidelity.** Colors, typography, spacing, copy, interaction states and responsive behaviour are all final and deliberate. Recreate the UI faithfully.

Two caveats:

1. **Photography is placeholder.** The hero and three of the six room cards use Unsplash stock; the portfolio project tiles are empty drop-targets. Real project photography is being supplied by the client and will replace all of it. Build the image components to accept real assets; don't hard-code the Unsplash URLs into production.
2. **The phone number is a placeholder.** `+91 90000 00000` appears in every footer and `919000000000` in `leads.js`. Both need the client's real number.

---

## Design System

The site is built on **Modernist**, a flat architectural design system. Its full source is in `_ds/modernist-2dd8c1d3-8f84-4c28-af2a-129625b7c657/` in this bundle — `styles.css` is the single stylesheet and the source of truth for every token.

Its non-negotiable rules, all of which this design follows:

- **Zero border radius anywhere.** `--radius-md` is `0` on purpose. The only exceptions in this design are deliberate: the three 112px process circles and the 44px success checkmark badge.
- **Everything flush left.** Headings, body copy, and — importantly — button labels. A button wider than its label starts its text at the left padding edge, never centered. This is why several buttons in the prototypes carry an explicit `justify-content:flex-start`.
- **2px rules, not hairlines.** Section dividers are `.hr` (2px, `--color-divider`). Don't soften them or replace them with whitespace.
- **Accent used sparingly.** The site is mostly ink-on-ground with red reserved for primary actions and small emphasis.
- **Archivo throughout**, for both headings and body.

Load the stylesheet and take every value from its CSS custom properties. Do not hard-code hexes the tokens already carry.

### Tokens actually used in this design

**Color**

| Token | Value | Used for |
| --- | --- | --- |
| `--color-bg` | `#f3f2f2` | Page ground |
| `--color-text` | `#201e1d` | Body text |
| `--color-accent` | `#ec3013` | Primary buttons, nav bottom border, kickers, form-card left rule, success badge |
| `--color-accent-100` | tint | Process-circle fill, context-chip background, "45–90 days" callout background |
| `--color-accent-200` | tint | Process-circle border |
| `--color-accent-300` | tint | Selected segmented-control fill, hero CTA fill, connector arrows |
| `--color-accent-700` | deep | Section kickers, paragraph-size accent text, error text, portfolio card meta |
| `--color-accent-900` | deepest | Text on accent-tinted fills |
| `--color-surface` | — | Card and form-card fill |
| `--color-divider` | — | 2px rules, form-card border |
| `--color-neutral-100` | — | Text on the dark nav/footer, portfolio card fill |
| `--color-neutral-300` | — | Portfolio card border |

**Spacing** — the `--space-*` scale is `1:4px 2:8px 3:12px 4:16px 6:24px 8:32px`.

⚠️ **There is no `--space-5` or `--space-7`.** This bit us during the build: an invalid custom property silently voids the entire CSS shorthand it appears in, so `padding: var(--space-6) var(--space-5)` produced **no padding at all**. If you're porting these inline styles by hand, only use 1, 2, 3, 4, 6, 8.

**Typography** — `--font-heading` and `--font-body` are both Archivo. Fluid sizes used:

| Element | Size |
| --- | --- |
| Hero H1 | `clamp(32px, 7vw, 56px)` |
| Page H1 | `clamp(30px, 6vw, 44px)` — estimator; `clamp(32px, 6vw, 56px)` — portfolio |
| Form heading (h3) | `clamp(22px, 4vw, 30px)`, weight 800, `letter-spacing:-0.01em` |
| Price figure | `clamp(30px, 6vw, 44px)`, weight 800 |
| "45–90 days" figure | `clamp(22px, 4vw, 30px)`, weight 700 |
| Kicker / eyebrow | 12px, weight 700, `letter-spacing:0.12em`, uppercase |
| Body | 14–15px |
| Nav brand | `clamp(15px, 4vw, 18px)` |
| Fine print | 12–13px at 50–60% opacity |

**Shadows** — `--shadow-sm` / `-md` via the `.elev-sm` / `.elev-md` utilities. Room cards use `.elev-sm`, the estimator price card uses `.elev-md`.

---

## Screens / Views

### Shared chrome

**Navigation bar** — `.nav`, dark fill (see *Luxury tone* below), `border-bottom: 2px solid var(--color-accent)`. Contains the brand wordmark plus two buttons. Flex with `flex-wrap: wrap` and `row-gap: var(--space-2)` so that on narrow phones the brand sits on its own line with the buttons wrapping beneath — this was an explicit fix, keep it.

Nav buttons are 13px with `8px 12px` padding. Outlined variants get `border-color` and `color` overridden to `--color-neutral-100` to read against the dark bar; the filled variant is `--color-accent` with `--color-neutral-100` text.

Per-page nav links:
- Home → Portfolio (outlined), Estimate (filled)
- Portfolio → Home (outlined), Estimate (filled)
- Estimator → Home (outlined), Portfolio (outlined)

**Footer** — dark fill matching the nav, `var(--space-6) var(--space-4)` padding, vertical flex with `var(--space-3)` gap. Brand wordmark in `--color-neutral-100`, then two 13px lines at 75% opacity: the tagline "Where a House becomes a Home — Bangalore" and the WhatsApp number.

**Luxury tone** — the dark nav/footer color is a themeable value, defaulting to `#1a1817` (near-black "Onyx"), with three alternates offered: `#241a14` (Espresso), `#1c2620` (Deep Forest), `#241522` (Plum). In the prototypes this is a component prop; in production, expose it as a single CSS custom property (e.g. `--tone-dark`) set once on `:root` so it can be changed in one place. On the portfolio page this same value also draws the 64×3px rule under the H1 and the 2px top border on each project card's caption block.

---

### 1. Home (`Landing.dc.html`)

**Purpose:** establish taste first, price second. The estimator deliberately lives on its own page so it doesn't compete with the imagery for attention here.

**Layout:** single column, full-bleed sections separated by 2px `.hr` rules, each section `var(--space-8) var(--space-4)`.

#### Hero
Full-bleed photographic hero, `min-height: min(92vh, 760px)`, content bottom-aligned (`justify-content: flex-end`).

- **Image layer** (z-index 0): three stacked images cross-fading. Each is absolutely positioned at `inset: 0`, `object-fit: cover`, with `opacity` toggling between 1 and 0 on a `transition: opacity 1.2s ease`. A timer advances the active index every **4500ms**, wrapping modulo 3. All three sit inside the `.grayscale` wrapper — **hero photography prints pure black and white**, per the design system.
- **Scrim** (z-index 1): `linear-gradient(180deg, rgba(32,30,29,0.15) 0%, rgba(32,30,29,0.55) 75%, rgba(32,30,29,0.75) 100%)`, `pointer-events: none`. This is what makes the white text legible — keep it.
- **Content** (z-index 2): `var(--space-6) var(--space-4) var(--space-8)` padding, `var(--space-3)` gap.
  - Kicker: "Bangalore · 2 & 3 BHK Interiors" — `#f3f2f2` at 85% opacity
  - H1: "Premium interiors for your home." — `#f3f2f2`, `clamp(32px,7vw,56px)`, `max-width: 14ch`
  - Body: "Most homes ready in 45–60 days. Designed and managed end to end by us." — `#f3f2f2` at 90%, `clamp(15px,3.5vw,18px)`, `max-width: 38ch`
  - CTA: "See your estimated price" → estimator. `--color-accent-300` fill, `--color-accent-900` text, 15px, `14px 22px` padding.

> **Copy note:** "Designed and managed end to end by us" is deliberate. Earlier drafts named contractors and vendor relationships; that was removed on purpose. Do not reintroduce supply-chain language on the public site.

#### Room by room
Kicker "Room by room" (`--color-accent-700`), H2 "Every room, planned around how you live".

Grid: `repeat(auto-fit, minmax(240px, 1fr))`, `gap: var(--space-4)`. Six cards, each `.card .elev-sm` with `padding: 0; overflow: hidden; gap: 0`:

- Image: full width, **220px** tall, inside `.grayscale`
- Caption: `var(--space-3)` padding, vertical flex, `var(--space-2)` gap — `.card-kicker`, `.card-title`, `.card-body`

| Room | Kicker | Body |
| --- | --- | --- |
| Drawing Room | Living & entertaining | Seating, storage and lighting planned for how your family actually gathers. |
| Dining | Everyday & festive | Compact dining setups that expand comfortably for guests and celebrations. |
| Kitchen | Modular & durable | Modular kitchens built for Indian cooking, with easy-to-clean, long-lasting finishes. |
| Bedroom | Rest & storage | Wardrobes and layouts that maximise storage without crowding the room. |
| Study | Focus & work from home | A dedicated work corner with proper lighting and cable-free desks. |
| Kids' Room | Play & grow | Durable, playful designs that adapt as your children grow older. |

> **Why rooms and not styles:** this section previously offered named aesthetic themes (Japandi, Scandinavian Warm, etc.). It was replaced because that vocabulary doesn't land with buyers in this market — they think in rooms. Don't revert to style names.

#### How it works
Kicker "How it works", H2 "From first call to move-in".

Three steps laid out in a **left-aligned** horizontal flex row (`justify-content: flex-start`) with `gap: var(--space-4)`, arrow connectors between them.

Each step:
- A **112×112px circle**, `border-radius: 50%`, `--color-accent-100` fill, `1px solid var(--color-accent-200)` border. Inside, vertically centered with `6px` gap: a **28px Lucide icon** and the step name at 15px/700 with `letter-spacing: 0.02em`. Icon color `--color-accent-700`.
- Below the circle, `var(--space-3)` away: a `.card-body` description. The step column is **180px wide**, `text-align: center`.

| Step | Lucide icon | Description |
| --- | --- | --- |
| Design | `pencil` | Talk to our designer, get an estimate, and approve your detailed drawings. |
| Production | `factory` | Your furniture and finishes are built to spec at our own factories. |
| Execution | `truck` | Material is delivered on-site, installed, and handed over on time. |

**Connectors:** between steps (not after the last), a 32×112px flex box containing a 28×16px right-arrow SVG in `--color-accent-300`, vertically centered against the circle.

> **Design history worth respecting:** this section went through several rounds. It started as plain text (too heavy), then gained large `01 / 02 / 03` numerals *beside* the step name (redundant — the label appeared twice), and the numerals were at one point set in `--color-accent-200`, which was effectively invisible on the light ground. The resolved design puts the label **inside** the circle and drops the numerals entirely. Don't add numbers back.

**Timeline callout**, `var(--space-6)` below the steps: `--color-accent-100` background, `var(--space-4) var(--space-6)` padding, baseline-aligned wrapping flex.
- "45–90 days" — `clamp(22px,4vw,30px)`, weight 700, `--color-accent-900`
- "from your first design call to handover*" — 14px at 75% opacity
- Below the block: "*Timeline depends on design complexity and material sourcing." — 12px at 50% opacity

> This is the **only** place the delivery timeline is called out. It was deliberately moved here out of the reference/Pinterest section so it reads as a company-wide commitment rather than a footnote on one offer.

#### Reference / Pinterest capture
A `LeadForm` (see below) with the reference-link field enabled.
- Kicker: "Already have a look in mind?"
- Heading: "Share your Pinterest link or reference photos."
- Sub: "We'll take it from there — manufacturing, fabrication and on-site construction, managed end to end."
- Submit: "Send it over"
- Lead source: `home-pinterest-reference`

Constrained to `max-width: 760px`.

#### Recent work
Header row: kicker "Portfolio" + H2 "Recent work" on the left, a segmented filter on the right. `justify-content: space-between`, `align-items: flex-end`, wrapping with `var(--space-3)` gap.

Filter: `.seg` with three `.seg-opt` radios — All / 2 BHK / 3 BHK. Selected option gets `--color-accent-300` background and `--color-accent-900` text; unselected is `transparent` on `--color-text`.

Grid: `repeat(auto-fit, minmax(260px, 1fr))`, `gap: var(--space-4)`. Cards show a **300px** grayscale image plus name and "· "-joined BHK/budget meta at 12px muted. Four projects here (the full set of eight is on the portfolio page).

Closing: an outlined "View full portfolio →" button, left-aligned.

---

### 2. Portfolio (`Portfolio.dc.html`)

**Purpose:** proof. Real projects with real budgets, so a visitor can locate themselves.

**This page intentionally departs from the rest of the site in two ways**, both requested:
1. **Project images are full color** — the `.grayscale` wrapper is *not* applied here. Finished-work photography is the one place the site shows color; the neutral ground makes it pop. Keep hero and room imagery grayscale, keep portfolio imagery color.
2. **Higher contrast, more editorial header treatment.**

**Header block:**
- Kicker "Portfolio" in `--color-accent`, 12px, `letter-spacing: 0.12em`, uppercase, weight 700
- H1 "Real homes, real budgets" — `clamp(32px,6vw,56px)`, weight 800, `letter-spacing: -0.01em`, `margin: 0 0 var(--space-3)`
- A **64×3px** rule in the luxury-tone color, `margin-bottom: var(--space-4)`
- Body: "Every project below is a 2 or 3 BHK apartment executed in Bangalore, at mid-segment budgets." — 75% opacity, `max-width: 48ch`

**Filter:** same three-option segmented control, left-aligned, `var(--space-6)` below the intro.

**Project grid:** `repeat(auto-fit, minmax(260px, 1fr))`, `gap: var(--space-4)`. Each card:
- `1px solid var(--color-neutral-300)` border, `--color-neutral-100` fill, `padding: 0`, `overflow: hidden`
- Image area **300px** tall, full color
- Caption block with a **2px top border in the luxury-tone color**, `var(--space-3)` padding, `6px` gap:
  - Name at 17px/700
  - Meta at 12px, `letter-spacing: 0.06em`, uppercase, `--color-accent-700`, weight 600

| Project | Size | Budget |
| --- | --- | --- |
| Candeure Signature | 2 BHK | ₹11.2L |
| Brigade Utopia | 3 BHK | ₹30.5L |
| Spectra Raaya | 2 BHK | ₹12L |
| Divyashree  | 3 BHK | ₹19.8L |
| SBB Residences | 3 BHK | ₹14.4L |
| Candure Landmark | 2 BHK | ₹11.9L |
| Spectra palmwoods | 2 BHK | ₹15.3L |
| Prestige Lakeside Habitat | 3 BHK | ₹31.1L |

These are placeholder project records pending real client data. In production they should come from a CMS or a data file, not be hard-coded in the view.

**Then:** a `LeadForm` — kicker "Enquire", heading "Like what you see? Ask for your own price.", sub "Tell us which apartment you're doing up and we'll come back with a costing built around it.", source `portfolio-page`. No reference field. `max-width: 760px`.

---

### 3. Estimator (`Estimator.dc.html`)

**Purpose:** give a real number with zero friction, then convert the warm ones.

`max-width: 920px`, centered (`margin: 0 auto`).

- Kicker "Cost estimator"
- H1 "What will your home cost?" — `clamp(30px,6vw,44px)`
- Body "Two quick selections. No forms, no email required." — 75% opacity, `max-width: 48ch`

Then a `display: grid` with `gap: var(--space-6)`:

**Selection 1 — Apartment size.** `.field` with label "Apartment size", then a full-width `.seg` (`display: flex`) with two `.seg-opt` radios flexed 1:1, labels centered: **2 BHK**, **3 BHK**.

**Selection 2 — Finish level.** Same pattern, three options flexed 1:1: **Value**, **Premium**, **Luxury**. Below, a 12px muted description that swaps with the selection:

| Finish | Description |
| --- | --- |
| *(none selected)* | Choose a finish level to see what's included. |
| Value | Laminate finishes, factory-made wardrobes, standard fittings. Durable and budget-first. |
| Premium | Richer laminates and veneers, semi-modular kitchen, branded fittings. Balanced quality and look. |
| Luxury | Premium veneers and acrylic, fully modular kitchen, designer lighting and hardware. |

> **Both selectors start unselected**, by design. The naming (Value/Premium/Luxury, each with a materials description) replaced an earlier abstract tier scheme so buyers understand what they're actually paying for.

Selected-state styling for both controls: `--color-accent-300` background, `--color-accent-900` text. Unselected: `transparent` on `--color-text`.

**Price card.** Two mutually exclusive states, both `.card` with `padding: var(--space-6)`, `align-items: flex-start`, `gap: var(--space-1)`:

- *Nothing selected yet* — `--color-surface` fill, `.card-kicker` "Estimated range", then "Pick your apartment size and finish level above to see your range."
- *Both selected* — `.elev-md`, `.card-kicker` "Estimated range", then the range at `clamp(30px,6vw,44px)`/800 in `--color-text`, then "Final quote depends on layout, carpentry choices and site conditions." at 70% opacity.

**Price matrix** (rupees):

| | Value | Premium | Luxury |
| --- | --- | --- | --- |
| **2 BHK** | 650,000 – 750,000 | 750,000 – 900,000 | 900,000 – 1,100,000 |
| **3 BHK** | 800,000 – 950,000 | 950,000 – 1,150,000 | 1,150,000 – 1,400,000 |

**Formatting:** divide by 100,000, one decimal place, strip a trailing `.0`, prefix `₹`, suffix `L`. Join the two ends with an en dash and spaces. So `[900000, 1100000]` → `₹9L – ₹11L`, and `[1150000, 1400000]` → `₹11.5L – ₹14L`.

**Escalation.** Below the price card, a full-width outlined button: "Get a more precise number →". Clicking it replaces the button in place with a `LeadForm`:
- Kicker "Get a precise quote", heading "We'll size this to your exact home.", sub "Share your details and a designer will call you with a costing for your apartment.", submit "Send me my precise quote"
- Source `estimator-page`
- **Carries the selection through**: `bhk`, `finish` and `priceRange` are passed as discrete values, plus a human-readable `context` string formatted `"3 BHK · Premium finish · ₹9.5L – ₹11.5L"`.

The form renders a **context chip** when it receives that string: `--color-accent-100` background, `3px solid var(--color-accent)` left border, `var(--space-2) var(--space-3)` padding, 13px/600 text in `--color-accent-900`. It reassures the visitor that the enquiry knows what they were looking at.

---

## Component: LeadForm

One component, three placements. This is the highest-value thing to get right — it's the site's only conversion surface.

### Props

| Prop | Type | Purpose |
| --- | --- | --- |
| `kicker` | string | Eyebrow label |
| `heading` | string | H3 |
| `subheading` | string | Supporting line |
| `submitLabel` | string | Button text |
| `showReference` | boolean | Show the reference-link field (home page only) |
| `context` | string | Human-readable selection summary; renders the context chip when non-empty |
| `bhk` | string | `'2'` / `'3'` — written to its own column |
| `finish` | string | `'value'` / `'premium'` / `'luxury'` — own column |
| `priceRange` | string | The range shown — own column |
| `source` | string | **Which form this is.** Written to the `source` column |

### Container

`.lf-card`: full width, `box-sizing: border-box`, `--color-surface` fill, `2px solid var(--color-divider)` border, `var(--space-6)` padding — dropping to `var(--space-4)` at ≤760px. Zero radius.

Inner stack is a vertical flex with `var(--space-4)` gap.

### Fields

Two-column pairs use `.lf-grid`: `grid-template-columns: 1fr 1fr`, `gap: var(--space-4)`, `align-items: start`, and `min-width: 0` on children so long values can't blow the grid out. Collapses to one column with `var(--space-3)` gap at ≤760px.

| Field | Type | Required | Placeholder |
| --- | --- | --- | --- |
| Your name | text | **yes** | Full name |
| Phone number | tel | **yes** | +91 98765 43210 |
| Email | email | no | you@example.com |
| Reference link | url | no | Pinterest board or design link |
| Anything you'd like to tell us | textarea, 3 rows | no | Apartment name, possession date, rooms you want done first… |

Row structure:
1. **Name + Phone** — always a 2-up pair.
2. **WhatsApp consent** — a checkbox row directly beneath, 18×18px box with `accent-color: var(--color-accent)`, label "This number is on WhatsApp — reach me there". Default **checked**. Whole row is a `<label>` so the text is clickable.
3. **Email (+ Reference)** — ⚠️ **conditional layout.** When `showReference` is true, Email and Reference sit as a 2-up pair. When false, Email renders as a **single full-width field, not in a grid.** This matters: leaving Email in a half-width grid cell with nothing beside it left an obvious dead gap on the Portfolio and Estimator pages. Two distinct layouts, not one grid with a hidden cell.
4. **Message** — full width, `resize: vertical`, `font-family: var(--font-body)` (textareas don't inherit it).

Optional fields mark themselves in the label with `<span>` at 50% opacity, weight 400: `Email (optional)`.

All inputs: `width: 100%`, `box-sizing: border-box`, `display: block`. Each `.field` is a vertical flex with a **6px** label-to-input gap.

### Actions

`.lf-actions`: horizontal flex, `gap: var(--space-3)`, `align-items: center`, `margin-top: var(--space-1)`. Primary button plus a 12px/60% reassurance line, "Name and phone are all we need."

At ≤760px this becomes a **column**, `align-items: flex-start`, `gap: var(--space-2)`, and the **button goes full width** — a wide comfortable tap target with the helper text stacked below rather than crowding it.

### Validation & states

- **Validation is on submit only.** No live/blur validation — it reads as nagging on a five-field form. If name or phone is empty: render "Please add your name and phone number." at 13px/600 in `--color-accent-700`, immediately above the actions row.
- **Sending:** button label becomes "Sending…" and the button disables.
- **Success:** the entire form is **replaced** (not appended to) by a confirmation block, `var(--space-3)` gap, left-aligned:
  - A **44×44px** square `--color-accent` badge with a white 24px Lucide `check` at `stroke-width: 2.5`
  - H3 "Thanks, {firstName}." — `clamp(20px,4vw,26px)`, weight 800. First name only, split on whitespace, falling back to "there".
  - "We've got your details. One of our designers will call you within one working day." — 14px/75%, `max-width: 48ch`
  - **Conditionally**, a "Continue on WhatsApp" primary button (see fallback below)

Note the success state shows even when the database write fails — the visitor should never be told the site is broken. See below.

---

## Lead submission (`leads.js`)

Leads POST directly to Supabase's REST endpoint from the browser.

```
POST {SUPABASE_URL}/rest/v1/leads
  apikey:        {SUPABASE_ANON_KEY}
  Authorization: Bearer {SUPABASE_ANON_KEY}
  Content-Type:  application/json
  Prefer:        return=minimal
```

### Schema

```sql
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

alter table public.leads enable row level security;

create policy "anon can insert leads"
  on public.leads for insert to anon with check (true);

grant usage on schema public to anon;
grant insert on public.leads to anon;
```

⚠️ **Both grants are required.** The RLS policy alone is not sufficient — without the table-level `grant insert`, every write fails. This cost us a debugging cycle; the policy looks correct in the dashboard while nothing can actually be written.

Insert-only for `anon`: the public site can add leads but cannot read them back.

### The `source` column

Every form tags itself so you know where a lead came from:

| Value | Placement |
| --- | --- |
| `home-pinterest-reference` | Home — "Already have a look in mind?" |
| `portfolio-page` | Portfolio — below the project grid |
| `estimator-page` | Estimator — after the price result |

Estimator leads additionally populate `bhk`, `finish` and `price_range` as **separate columns** rather than only inside the `context` blob, so they're groupable:

```sql
select bhk, finish, count(*) from leads group by bhk, finish order by 3 desc;
```

Empty strings are normalised to `null` before insert.

### WhatsApp fallback

If credentials are absent or the request fails, the component does **not** show an error. It shows the success state plus a "Continue on WhatsApp" button linking to a `wa.me` deep link pre-filled with everything the visitor typed:

```
Hi D'Stella Designs, I would like an estimate.

Name: {name}
Phone: {phone}
Email: {email}          ← if provided
Interested in: {context} ← or "{bhk} BHK" if no context
Reference: {reference}   ← if provided

{message}                ← if provided
```

The lead is never lost, and the visitor never sees a failure. Preserve this behaviour.

### Production hardening

The prototype writes from the browser with the anon key, which is what that key is for — but for production consider:

1. **Move the write server-side.** A route handler / edge function keeps the key off the client and gives you a place to add spam protection, notification emails and rate limiting.
2. **Add spam protection.** There is none right now. A public insert-only endpoint will attract junk. A honeypot field plus a timing check is the cheap version; Turnstile or hCaptcha the robust one.
3. **Notify on new leads.** A Supabase database webhook or trigger → email/WhatsApp, so the client isn't polling the dashboard.
4. **Server-side validation.** Client validation is UX only; validate again wherever the write lands.
5. **Environment variables.** `SUPABASE_URL` and `SUPABASE_ANON_KEY` are currently literals in `leads.js`. Move them to env config.

> **Note for the GitHub push:** `leads.js` in this bundle contains the live project URL and anon key. The anon key is designed to be publicly visible and is safe in a public repo *provided* RLS stays enabled and insert-only — which it is. Even so, move both to environment variables as part of the port. Never commit a `service_role` key.

---

## State

Small and local; no global store needed.

**Home** — `activeHero: number` (0–2, advanced by a 4500ms interval; clear the timer on unmount), `workFilter: 'all' | '2' | '3'`.

**Portfolio** — `workFilter: 'all' | '2' | '3'`.

**Estimator** — `bhk: '2' | '3' | null`, `finish: 'value' | 'premium' | 'luxury' | null`, `showStage2: boolean`. Price is **derived**, never stored.

**LeadForm** — `name`, `phone`, `email`, `reference`, `message` (strings), `whatsappOk: boolean` (default true), `sending`, `done`, `error`, `whatsappHref`.

No data fetching anywhere. The only network call is the lead POST.

---

## Responsive

Mobile-first. Verified at phone, tablet and desktop widths.

| Breakpoint | Behaviour |
| --- | --- |
| **≤640px** | Process steps stack vertically, left-aligned; connector arrows hidden (they read as broken when stacked). Nav wraps to brand-then-buttons. |
| **≤760px** | LeadForm collapses to one column, padding tightens to `var(--space-4)`, actions stack with a full-width button. |
| **Fluid** | All card grids use `auto-fit` + `minmax`, so column counts fall out of available width — no per-breakpoint rules. Type scales via `clamp()`. |

`overflow-x: hidden` on `body` guards against the full-bleed hero causing horizontal scroll.

**Minimum tap target: 44px.** The nav buttons at 13px with `8px 12px` padding are below that — worth increasing during the port.

---

## Assets

**Icons** — Lucide (https://lucide.dev). Used: `pencil`, `factory`, `truck`, `arrow-right`, `check`. Inline SVG at 28px in the process circles, 24px for the success check, 28×16 for the connector arrow. Use the project's Lucide package rather than pasting path data.

**Photography** — all placeholder, all Unsplash, pending real client photography:

| Slot | Photographer |
| --- | --- |
| Hero 1 / Drawing Room | Franco Debartolo |
| Hero 2 / Dining | rawkkim |
| Hero 3 / Bedroom | tommao wang |

Kitchen, Study and Kids' Room have no image yet. All eight portfolio tiles are empty. Build these as proper image components with sensible empty states — and note that Unsplash attribution should not ship to production; replace the images.

**Fonts** — Archivo, via the design system stylesheet.

---

## Files in this bundle

| Path | What it is |
| --- | --- |
| `Landing.dc.html` | Home page prototype |
| `Portfolio.dc.html` | Portfolio page prototype |
| `Estimator.dc.html` | Estimator prototype |
| `LeadForm.dc.html` | Shared lead-capture component |
| `leads.js` | Supabase submission layer, schema SQL, WhatsApp fallback |
| `image-slot.js` | The placeholder-image web component the prototypes use. **Prototype tooling — do not port**; replace with the codebase's image component. |
| `support.js` | The prototype rendering runtime. **Do not port.** |
| `_ds/modernist-.../` | The Modernist design system — `styles.css` is the token source of truth, `readme.md` the full guidance |
| `export/` | Self-contained single-file builds of all three pages, for reviewing behaviour in a browser with no build step |

**To see the designs working:** open `export/index.html` in a browser. No server or install needed; nav links between the three pages work. The forms in those files write to the live Supabase table, so use obvious test data.

---

## Reading the prototypes

Each `.dc.html` file has two parts:

1. **The template** — markup between `<x-dc>` and `</x-dc>`. `{{ name }}` are value holes. `<sc-for list="{{ items }}" as="item">` is a loop; `<sc-if value="{{ flag }}">` a conditional; `<dc-import name="LeadForm" …>` mounts the shared component. `hint-*` attributes are streaming-placeholder hints — ignore them.
2. **The logic** — a `class Component` in the trailing `<script>`. `state` is component state, `renderVals()` returns the values the template consumes. Read this as the behaviour spec.

Styles are inline by design in this runtime. When porting, consolidate them into the target codebase's styling approach — but keep every *value* (they're all design-system tokens) and keep the two `<style>` blocks' media queries, which carry the responsive rules.

---

## Known issues to fix during the port

1. **Nav tap targets** are under the 44px minimum (13px text, `8px 12px` padding). Increase.
2. **No spam protection** on the lead endpoint. Add before launch.
3. **Placeholder content**: the WhatsApp number (`+91 90000 00000` in three footers, `919000000000` in `leads.js`), all photography, and the eight portfolio project records.
4. **Hero carousel has no controls** and no `prefers-reduced-motion` handling. It auto-advances every 4.5s with no pause, no dots, no manual advance. Either add controls, or honour reduced-motion by holding on the first image — currently it does neither.
5. **Project data is hard-coded** in the views. Move to a CMS or data layer; the client will want to add projects without a deploy.
6. **No page metadata** — the prototypes have no titles, descriptions, Open Graph tags or structured data. For a local business site that's doing real SEO work, add them, including `LocalBusiness` structured data.
7. **Images have no alt text** in the prototypes (the placeholder component takes a description prop instead). Write real alt text during the port.
8. **The estimator's empty-state card** uses a negated conditional that this runtime doesn't evaluate reliably (`<sc-if value="{{ !hasSelection }}">`). In the port, compute the negation explicitly and verify the "Pick your apartment size…" prompt actually appears on first load.
