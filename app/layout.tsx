import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Interior Design in Bhubaneswar`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Premium 2 & 3 BHK interior design in Bhubaneswar, Odisha. Room-by-room design, in-house production and on-site execution — most homes ready in 45–60 days.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Interior Design in Bhubaneswar`,
    description: SITE_TAGLINE,
    locale: "en_IN",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: SITE_NAME,
  description:
    "Interior design firm serving 2 & 3 BHK apartment owners in Bhubaneswar, Odisha, with room-by-room design and end-to-end delivery.",
  areaServed: {
    "@type": "City",
    name: "Bhubaneswar",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhubaneswar",
    addressRegion: "Odisha",
    addressCountry: "IN",
  },
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={archivo.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
