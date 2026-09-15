import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import LeadForm from "@/components/lead-form/LeadForm";
import { galleryRooms, findGalleryRoom } from "@/lib/data/gallery";
import styles from "./page.module.css";

export function generateStaticParams() {
  return galleryRooms.map((room) => ({ room: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ room: string }>;
}): Promise<Metadata> {
  const { room: slug } = await params;
  const room = findGalleryRoom(slug);
  if (!room) return {};
  return {
    title: `${room.name} — Portfolio`,
    description: `Real D'Stella ${room.name.toLowerCase()} photography from completed 2 & 3 BHK homes in Bangalore.`,
  };
}

export default async function GalleryRoomPage({
  params,
}: {
  params: Promise<{ room: string }>;
}) {
  const { room: slug } = await params;
  const room = findGalleryRoom(slug);
  if (!room) notFound();

  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      <SiteNav page="portfolio" />

      <section className={styles.section}>
        <Link href="/portfolio" className={styles.back}>
          <ArrowLeft size={16} strokeWidth={2} />
          Back to portfolio
        </Link>
        <h6 className={styles.kicker}>Portfolio</h6>
        <h1 className={styles.heading}>{room.name}</h1>
        <p className={styles.desc}>{room.desc}</p>

        <div className={styles.grid}>
          {room.photos.map((photo) => (
            <div key={photo.src} className={styles.photo}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={styles.image}
              />
            </div>
          ))}
        </div>
      </section>

      <hr className="hr" style={{ margin: 0 }} />

      <section style={{ padding: "var(--space-8) var(--space-4)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <LeadForm
            kicker="Enquire"
            heading={`Want a ${room.name.toLowerCase()} like this?`}
            subheading="Tell us about your apartment and we'll come back with a costing built around it."
            source={`portfolio-${room.slug}`}
          />
        </div>
      </section>

      <hr className="hr" style={{ margin: 0 }} />

      <SiteFooter />
    </div>
  );
}
