"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryRoom } from "@/lib/data/gallery";
import styles from "./PortfolioGallery.module.css";

const TABS: { slug: string; label: string }[] = [
  { slug: "drawing-room", label: "Living" },
  { slug: "dining", label: "Dining" },
  { slug: "bedroom", label: "Bedroom" },
  { slug: "kitchen", label: "Kitchen" },
  { slug: "study", label: "Study" },
  { slug: "kids-room", label: "Kids Bedroom" },
];

export default function PortfolioGallery({ rooms }: { rooms: GalleryRoom[] }) {
  const [active, setActive] = useState<string>("drawing-room");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const room = rooms.find((r) => r.slug === active);
  const photos = room?.photos ?? [];

  useEffect(() => {
    if (lightbox === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightbox, photos.length]);

  const current = lightbox !== null ? photos[lightbox] : undefined;

  return (
    <section className={styles.section}>
      <div className={styles.headRow}>
        <h1 className={styles.heading}>Portfolio</h1>

        <div className={styles.tabs} role="tablist" aria-label="Browse by room">
          {TABS.map((tab) => (
            <button
              key={tab.slug}
              type="button"
              role="tab"
              aria-selected={active === tab.slug}
              className={`${styles.tab} ${active === tab.slug ? styles.tabActive : ""}`}
              onClick={() => setActive(tab.slug)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {photos.length > 0 ? (
        <div key={active} className={styles.grid}>
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              className={styles.photo}
              onClick={() => setLightbox(i)}
              aria-label={`View photo ${i + 1} of ${photos.length}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={styles.image}
              />
            </button>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>More photos of this room are on the way.</p>
      )}

      {current ? (
        <div className={styles.lightbox} role="dialog" aria-modal="true" onClick={() => setLightbox(null)}>
          <button type="button" className={styles.lightboxClose} aria-label="Close">
            <X size={22} strokeWidth={2} />
          </button>

          {photos.length > 1 ? (
            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
              }}
            >
              <ChevronLeft size={28} strokeWidth={2} />
            </button>
          ) : null}

          <div className={styles.lightboxImageWrap} onClick={(e) => e.stopPropagation()}>
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="90vw"
              className={styles.lightboxImage}
              priority
            />
          </div>

          {photos.length > 1 ? (
            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((i) => (i === null ? i : (i + 1) % photos.length));
              }}
            >
              <ChevronRight size={28} strokeWidth={2} />
            </button>
          ) : null}

          <span className={styles.lightboxCount}>
            {lightbox !== null ? lightbox + 1 : 0} / {photos.length}
          </span>
        </div>
      ) : null}
    </section>
  );
}
