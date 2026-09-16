"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryRooms } from "@/lib/data/gallery";
import styles from "./PortfolioGallery.module.css";

const TABS: { slug: string; label: string }[] = [
  { slug: "drawing-room", label: "Living" },
  { slug: "dining", label: "Dining" },
  { slug: "bedroom", label: "Bedroom" },
  { slug: "kitchen", label: "Kitchen" },
  { slug: "study", label: "Study" },
  { slug: "kids-room", label: "Kids Bedroom" },
];

export default function PortfolioGallery() {
  const [active, setActive] = useState<string>("drawing-room");
  const room = galleryRooms.find((r) => r.slug === active);

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

      <div className={styles.grid}>
        {room?.photos.map((photo) => (
          <div key={photo.src} className={styles.photo}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className={styles.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
