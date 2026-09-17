import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import ContactBar from "@/components/layout/ContactBar";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";
import "./globals.css";

// Playfair Display (headings — editorial, high-end) + Manrope (body/UI).
// Was Fraunces, but its f/j have a pronounced ball-terminal descender hook
// baked into the base glyph outline at every weight/optical-size/wonk
// setting (confirmed by testing axes directly) — not fixable via
// font-variation-settings, so switched fonts instead.
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-playfair",
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
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Interior Design in Bangalore`,
    description: SITE_TAGLINE,
    locale: "en_IN",
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
    addressLocality: "Whitefield",
    addressRegion: "Banglore",
    addressCountry: "IN",
  },
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${manrope.variable}`}>
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
