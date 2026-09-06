"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { heroSlides } from "@/lib/data/rooms";
import ImageSlot from "@/components/shared/ImageSlot";
import styles from "./Hero.module.css";

const ADVANCE_MS = 4500;

export default function Hero() {
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    // Known issue fixed during the port: honour prefers-reduced-motion by
    // holding on the first image instead of auto-advancing with no control.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const timer = setInterval(() => {
      setActiveHero((i) => (i + 1) % heroSlides.length);
    }, ADVANCE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={`grayscale ${styles.slides}`}>
        {heroSlides.map((slide, i) => (
          <div key={slide.id} className={styles.slide} style={{ opacity: i === activeHero ? 1 : 0 }}>
            <ImageSlot
              src={slide.photoSrc}
              alt={slide.photoAlt ?? slide.name}
              credit={slide.photoCredit}
              creditHref={slide.photoCreditHref}
              placeholder={slide.name}
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      <div className={styles.scrim} />
      <div className={styles.content}>
        <h6 className={styles.kicker}>Bangalore &middot; 2 &amp; 3 BHK Interiors</h6>
        <h1 className={styles.heading}>Premium interiors for your home.</h1>
        <p className={styles.body}>
          Most homes ready in 45&ndash;60 days. Designed and managed end to end by us.
        </p>
        <div className={styles.ctaWrap}>
          <Link href="/estimator" className={`btn ${styles.cta}`}>
            See your estimated price
          </Link>
        </div>
      </div>
    </section>
  );
}
