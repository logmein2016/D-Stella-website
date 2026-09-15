"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label={`${SITE_NAME} — home`}>
          {/* Brandmark/Icon per the brand style guide ("use the icon alone...
              on light or busy backgrounds") — the full dark lockup
              (Dstell_logos-15) is built for a navy panel and doesn't read on
              this light nav, so the icon carries the color and the wordmark
              is set in ink beside it. */}
          <Image src="/brand/icon-mark.png" alt="" width={56} height={56} priority className={styles.mark} />
          <span className={styles.wordmark}>D&rsquo;Stella</span>
        </Link>

        <div className={`${styles.links} ${open ? styles.linksOpen : ""}`}>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${page === link.page ? styles.linkActive : ""}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/estimator"
            className={`btn btn-primary ${styles.estimateBtn}`}
            onClick={() => setOpen(false)}
          >
            Get an estimate
          </Link>
        </div>

        <Link href="/estimator" className={styles.estimateBadge} aria-label="Get an estimate">
          <span>
            Get an
            <br />
            Estimate
          </span>
        </Link>

        <button
          type="button"
          className={styles.menuToggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
        </button>
      </div>
    </nav>
  );
}
