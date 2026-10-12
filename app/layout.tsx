import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import ContactBar from "@/components/layout/ContactBar";
import { PHONE_DISPLAY, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";
import "./globals.css";

// Cormorant Garamond (headings — a specific, explicitly requested spec:
// 56-72px hero, 36-48px section headings, 26-32px project/card titles) +
// Manrope (nav/buttons 13-15px, body 16-18px, eyebrow labels 11-13px).
// Was Marcellus + Karla before this; before that, Cormorant + Jost; before
// that, Playfair Display + Manrope; before that, Fraunces, whose f/j have a
// pronounced ball-terminal descender hook baked into the base glyph outline
// at every weight/optical-size/wonk setting (confirmed by testing axes
// directly) — not fixable via font-variation-settings, so switched fonts
// instead.
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Interior Design in Bangalore`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Premium 2 & 3 BHK interior design in Bangalore. Room-by-room design, in-house production and on-site execution — most homes ready in 45–90 days.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Interior Design in Bangalore`,
    description: SITE_TAGLINE,
    url: SITE_URL,
    locale: "en_IN",
    images: [{ url: "/brand/icon.png", width: 512, height: 512, alt: `${SITE_NAME} logo` }],
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — Interior Design in Bangalore`,
    description: SITE_TAGLINE,
    images: ["/brand/icon.png"],
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: SITE_NAME,
  description:
    "Interior design firm serving 2 & 3 BHK apartment owners in Bangalore, with room-by-room design and end-to-end delivery.",
  areaServed: {
    "@type": "City",
    name: "Bangalore",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Whitefield, Bangalore",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  telephone: PHONE_DISPLAY,
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body>
        {children}
        <ContactBar />
      </body>
    </html>
  );
}
