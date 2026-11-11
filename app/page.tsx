import type { Metadata } from "next";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Hero from "@/components/home/Hero";
import ContactPopup from "@/components/home/ContactPopup";
import RoomGrid from "@/components/home/RoomGrid";
import HowItWorks from "@/components/home/HowItWorks";
import Services from "@/components/home/Services";
import { getGalleryRooms } from "@/lib/supabase/gallery";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const galleryRooms = await getGalleryRooms();

  return (
    <div className="page-shell">
      <SiteNav page="home" />

      <ContactPopup />

      <Hero />

      <hr className="hr" style={{ margin: 0 }} />

      <RoomGrid rooms={galleryRooms} />

      <hr className="hr" style={{ margin: 0 }} />

      <Services />

      <hr className="hr" style={{ margin: 0 }} />

      {/* Ends with the consultation form (inside HowItWorks), so the footer's
          CTA banner would only repeat it. */}
      <HowItWorks />
      <SiteFooter showCta={false} />
    </div>
  );
}
