import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import ContactBar from "@/components/layout/ContactBar";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";
import "./globals.css";

// Brand's own type pairing, per DStella/brand_guide/Brand_Style_Guide.pptx:
// Bodoni Moda (editorial serif — logo, headings, hero text) + Manrope
// (secondary — UI, body copy, documents).
const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-bodoni",
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
    <html lang="en" className={`${bodoniModa.variable} ${manrope.variable}`}>
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
