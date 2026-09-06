import { PHONE_DISPLAY, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <span className={`nav-brand ${styles.brand}`}>{SITE_NAME}</span>
      <p className={styles.line}>{SITE_TAGLINE}</p>
      <p className={styles.line}>WhatsApp: {PHONE_DISPLAY}</p>
    </footer>
  );
}
