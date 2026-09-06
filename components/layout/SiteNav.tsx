import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import styles from "./SiteNav.module.css";

type NavPage = "home" | "portfolio" | "estimator";

const LINKS: Record<NavPage, { href: string; label: string; variant: "outlined" | "filled" }[]> = {
  home: [
    { href: "/portfolio", label: "Portfolio", variant: "outlined" },
    { href: "/estimator", label: "Estimate", variant: "filled" },
  ],
  portfolio: [
    { href: "/", label: "Home", variant: "outlined" },
    { href: "/estimator", label: "Estimate", variant: "filled" },
  ],
  estimator: [
    { href: "/", label: "Home", variant: "outlined" },
    { href: "/portfolio", label: "Portfolio", variant: "outlined" },
  ],
};

export default function SiteNav({ page }: { page: NavPage }) {
  return (
    <nav className={`nav ${styles.nav}`}>
      <span className={`nav-brand ${styles.brand}`}>{SITE_NAME}</span>
      {LINKS[page].map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`btn ${link.variant === "outlined" ? "btn-secondary" : ""} ${styles.link} ${
            link.variant === "outlined" ? styles.linkOutlined : styles.linkFilled
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
