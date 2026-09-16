"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./InteriorCarousel.module.css";

const SLIDES = [
  {
    src: "/photos/rooms/HomePage_Living_Final.png",
    alt: "Double-height living room with a sectional sofa and a floating staircase",
  },
  {
    src: "/photos/carousel/Living_2_DStella.png",
    alt: "Living room with a marble fireplace and olive velvet armchairs",
  },
  {
    src: "/photos/rooms/Kicthen_Final.png",
    alt: "Parallel modular kitchen with olive cabinetry and a marble backsplash",
  },
  {
    src: "/photos/carousel/Kitchen_4_DStella.jpg",
    alt: "Farmhouse-style kitchen with a large island and warm wood floors",
  },
  {
    src: "/photos/carousel/Wardrobe_Dstella.png",
    alt: "Sage green walk-in wardrobe with a mirrored door and open display shelving",
  },
  {
    src: "/photos/carousel/Living_4_DStella.png",
    alt: "Lobby seating nook with dome pendant lights and a textured stone feature wall",
  },
];

export default function InteriorCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section className={styles.section}>
      <h6 className={styles.kicker}>Our work</h6>
      <h2 className={styles.heading}>Signature interiors, in detail</h2>

      <div
        className={styles.stage}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {SLIDES.map((slide, i) => (
          <div key={slide.src} className={`${styles.slide} ${i === index ? styles.slideActive : ""}`}>
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              className={styles.image}
            />
          </div>
        ))}

        <button type="button" className={`${styles.nav} ${styles.navPrev}`} onClick={prev} aria-label="Previous slide">
          <ChevronLeft size={22} strokeWidth={2} />
        </button>
        <button type="button" className={`${styles.nav} ${styles.navNext}`} onClick={next} aria-label="Next slide">
          <ChevronRight size={22} strokeWidth={2} />
        </button>

        <div className={styles.dots} role="tablist" aria-label="Slides">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
