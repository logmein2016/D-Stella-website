import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

// Background: a real D'Stella project photo, not an AI-generated image — this
// session has no image-generation tool available, and the brand's own real
// photography (measured better against "no stock/fake imagery") reads as the
// stronger choice anyway. Swap in a generated image here later if preferred.
export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgWrap}>
        <Image
          src="/photos/rooms/drawing-room.jpg"
          alt="D'Stella living room with a sectional sofa, gold pendant chandelier and skyline view"
          fill
          sizes="100vw"
          priority
          className={styles.bgImage}
        />
        <div className={styles.scrim} />
      </div>
      <div className={styles.content}>
        <h6 className={styles.kicker}>Bangalore &middot; 2 &amp; 3 BHK Interiors</h6>
        {/* Brand tagline, per DStella/brand_guide/Brand_Style_Guide.pptx. */}
        <h1 className={styles.heading}>
          Thoughtful Spaces.
          <br />
          Timeless Living.
        </h1>
        <p className={styles.body}>
          Most homes ready in 45&ndash;90 days. Designed and managed end to end by us.
        </p>
        <div className={styles.ctaWrap}>
          <Link href="/estimator" className={`btn btn-primary ${styles.cta}`}>
            See your estimated price
          </Link>
          <Link href="/portfolio" className={`btn btn-secondary ${styles.ctaSecondary}`}>
            View our work
          </Link>
        </div>
      </div>
    </section>
  );
}
