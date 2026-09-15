import Link from "next/link";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";
import styles from "./SiteNav.module.css";

export type NavPage = "home" | "about" | "portfolio" | "process" | "contact" | "estimator";

const LINKS: { page: NavPage; href: string; label: string }[] = [
  { page: "home", href: "/", label: "Home" },
  { page: "about", href: "/about", label: "About Us" },
  { page: "portfolio", href: "/portfolio", label: "Portfolio" },
  { page: "process", href: "/process", label: "Process" },
  { page: "contact", href: "/contact", label: "Contact Us" },
];

export default function SiteNav({ page }: { page: NavPage }) {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.brand} aria-label={`${SITE_NAME} — home`}>
        {/* Brandmark/Icon per the brand style guide ("use the icon alone...
            on light or busy backgrounds") — the full dark lockup
            (Dstell_logos-15) is built for a navy panel and doesn't read on
            this light nav, so the icon carries the color and the wordmark
            is set in ink beside it. */}
        <Image src="/brand/icon.png" alt="" width={36} height={36} priority className={styles.mark} />
        <span className={styles.wordmark}>D&rsquo;Stella</span>
      </Link>

      <div className={styles.links}>
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.link} ${page === link.page ? styles.linkActive : ""}`}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/estimator" className={`btn btn-primary ${styles.estimateBtn}`}>
          Get an estimate
        </Link>
      </div>
    </nav>
  );
}
