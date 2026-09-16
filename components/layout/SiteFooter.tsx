import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.cta}>
        <h2 className={styles.ctaHeading}>Ready to design your dream home?</h2>
        <p className={styles.ctaBody}>Book a free design consultation with our expert designers.</p>
        <Link href="/contact" className={`btn btn-primary ${styles.ctaBtn}`}>
          Book a free consultation
        </Link>
      </div>

      <div className={styles.bottom}>
        <span>
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </span>
        <span className={styles.legal}>
          <span>Privacy Policy</span>
          <span aria-hidden="true">|</span>
          <span>Terms of Use</span>
        </span>
      </div>
    </footer>
  );
}
