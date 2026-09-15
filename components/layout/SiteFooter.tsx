import Link from "next/link";
import Image from "next/image";
import { PHONE_DISPLAY, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import styles from "./SiteFooter.module.css";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact Us" },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brandCol}>
          <span className={styles.brand}>
            <Image src="/brand/icon-mark.png" alt="" width={30} height={30} className={styles.mark} />
            {SITE_NAME}
          </span>
          <p className={styles.tagline}>{SITE_TAGLINE}</p>
        </div>

        <nav className={styles.linkCol} aria-label="Footer">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.contactCol}>
          <span className={styles.contactLabel}>Talk to us</span>
          <a href={`https://wa.me/${PHONE_DISPLAY.replace(/\D/g, "")}`} className={styles.contactValue}>
            WhatsApp: {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span>
      </div>
    </footer>
  );
}
