import Link from "next/link";
import ContactIcons from "@/components/shared/ContactIcons";
import {
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_PRETTY,
  SERVICE_AREA,
  SITE_NAME,
  SITE_TAGLINE,
  WHATSAPP_NUMBER,
} from "@/lib/constants";
import styles from "./SiteFooter.module.css";

const EXPLORE = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Our Process" },
  { href: "/estimator", label: "Price Estimate" },
  { href: "/contact", label: "Contact Us" },
];

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

      <div className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.brandCol}>
            <p className={styles.brandName}>{SITE_NAME}</p>
            <p className={styles.tagline}>{SITE_TAGLINE}</p>
            <ContactIcons className={styles.icons} />
          </div>

          <nav className={styles.col} aria-label="Footer">
            <h2 className={styles.colTitle}>Explore</h2>
            <ul className={styles.list}>
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <h2 className={styles.colTitle}>Get in touch</h2>
            <ul className={styles.list}>
              <li>
                <span className={styles.label}>Call</span>
                <a href={`tel:${PHONE_DISPLAY}`}>{PHONE_PRETTY}</a>
              </li>
              <li>
                <span className={styles.label}>WhatsApp</span>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  {PHONE_PRETTY}
                </a>
              </li>
              <li>
                <span className={styles.label}>Instagram</span>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  @dstellainteriors
                </a>
              </li>
              <li>
                <span className={styles.label}>Studio</span>
                {SERVICE_AREA}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </span>
        <span className={styles.legal}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <span aria-hidden="true">|</span>
          <Link href="/terms-of-use">Terms of Use</Link>
        </span>
      </div>
    </footer>
  );
}
