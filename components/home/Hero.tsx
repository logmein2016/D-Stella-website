"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

const SLIDES = [
  {
    src: "/photos/rooms/HomePage_Living_Final.png",
    alt: "D'Stella double-height living room with a sectional sofa, ring chandelier and floating staircase",
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
    src: "/photos/carousel/Wardrobe_Dstella.png",
    alt: "Sage green walk-in wardrobe with a mirrored door and open display shelving",
  },
  {
    src: "/photos/carousel/Living_4_DStella.png",
    alt: "Lobby seating nook with dome pendant lights and a textured stone feature wall",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.bgWrap}>
        {SLIDES.map((slide, i) => (
          <div key={slide.src} className={`${styles.slide} ${i === index ? styles.slideActive : ""}`}>
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              className={styles.bgImage}
            />
          </div>
        ))}
        <div className={styles.scrim} />
      </div>
      <div className={styles.content}>
        <h6 className={styles.kicker}>Bangalore &middot; Home Interiors</h6>
        {/* Brand tagline, per DStella/brand_guide/Brand_Style_Guide.pptx. */}
        <h1 className={styles.heading}>
          Thoughtful Spaces.
          <br />
          Timeless Living.
        </h1>
        <div className={styles.ctaWrap}>
          <Link href="/estimator" className={`btn btn-primary ${styles.cta}`}>
            See your estimated price
          </Link>
          <Link href="/portfolio" className={`btn btn-secondary ${styles.ctaSecondary}`}>
            View our work
          </Link>
        </div>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Hero slides">
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
    </section>
  );
}
