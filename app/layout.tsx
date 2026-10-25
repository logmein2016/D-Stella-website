import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import ContactBar from "@/components/layout/ContactBar";
import { INSTAGRAM_URL, PHONE_DISPLAY, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";
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
    default: `${SITE_NAME} — Interior Designers in Bangalore`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Interior designers in Bangalore for 2 & 3 BHK apartments and villas. Room-by-room design, in-house production and on-site execution — most homes ready in 45–90 days.",
  applicationName: SITE_NAME,
  category: "Interior design",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  // No og:url here: it would point every page's share link at the homepage.
  // Each page sets its own canonical via `alternates`.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Interior Designers in Bangalore`,
    description: SITE_TAGLINE,
    locale: "en_IN",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${SITE_NAME} — a completed living room in Bangalore` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Interior Designers in Bangalore`,
    description: SITE_TAGLINE,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  logo: `${SITE_URL}/brand/icon.png`,
  image: `${SITE_URL}/og-image.jpg`,
  sameAs: [INSTAGRAM_URL],
  knowsAbout: ["Interior design", "Modular kitchens", "Wardrobes", "Home renovation"],
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

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#business` },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${cormorantGaramond.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessJsonLd, websiteJsonLd]) }}
        />
      </head>
      <body>
        {children}
        <ContactBar />
      </body>
    </html>
  );
}
