"use client";

import { useState } from "react";
import Link from "next/link";
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
          {/* Pre-sized, sharpened PNGs served as-is: next/image's lossy
              re-encode of the 4856px master blurred the thin serif strokes. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo/dstella-logo-400.png"
            srcSet="/images/logo/dstella-logo-200.png 200w, /images/logo/dstella-logo-400.png 400w, /images/logo/dstella-logo-600.png 600w, /images/logo/dstella-logo-800.png 800w"
            sizes="(max-width: 760px) 115px, clamp(127px, 19vw, 191px)"
            alt="D'Stella Interiors"
            width={400}
            height={126}
            fetchPriority="high"
            className={styles.logoImg}
          />
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
