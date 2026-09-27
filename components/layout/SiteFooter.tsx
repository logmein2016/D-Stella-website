import Link from "next/link";
import { Instagram } from "lucide-react";
import { INSTAGRAM_URL, SITE_NAME } from "@/lib/constants";
import styles from "./SiteFooter.module.css";

export default function SiteFooter({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer className={styles.footer}>
      {showCta ? (
        <div className={styles.cta}>
          <h2 className={styles.ctaHeading}>Ready to design your dream home?</h2>
          <p className={styles.ctaBody}>Book a free design consultation with our expert designers.</p>
          <Link href="/contact" className={`btn btn-primary ${styles.ctaBtn}`}>
            Book a free consultation
          </Link>
        </div>
      ) : null}

      <div className={styles.bottom}>
        <span>
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </span>
        <span className={styles.legal}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <span aria-hidden="true">|</span>
          <Link href="/terms-of-use">Terms of Use</Link>
        </span>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${SITE_NAME} on Instagram`}
          className={styles.social}
        >
          <Instagram size={18} strokeWidth={2} />
        </a>
      </div>
    </footer>
  );
}
