"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GalleryRoom } from "@/lib/data/gallery";
import styles from "./RoomGrid.module.css";

const PREVIEW_COUNT = 4;

const TABS: { slug: string; label: string }[] = [
  { slug: "drawing-room", label: "Living" },
  { slug: "dining", label: "Dining" },
  { slug: "bedroom", label: "Bedroom" },
  { slug: "kitchen", label: "Kitchen" },
  { slug: "study", label: "Study" },
  { slug: "kids-room", label: "Kids Bedroom" },
];

export default function RoomGrid({ rooms }: { rooms: GalleryRoom[] }) {
  const [active, setActive] = useState("drawing-room");
  const room = rooms.find((r) => r.slug === active);

  return (
    <section className={styles.section}>
      <div className={styles.headRow}>
        <h6 className={styles.heading}>Portfolio</h6>

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
        {room?.photos.slice(0, PREVIEW_COUNT).map((photo) => (
          <div key={photo.src} className={styles.photo}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className={styles.image}
            />
          </div>
        ))}
      </div>

      <Link href="/portfolio" className={`btn btn-primary ${styles.viewAllBtn}`}>
        View full portfolio
        <ArrowRight size={16} strokeWidth={2} />
      </Link>
    </section>
  );
}
