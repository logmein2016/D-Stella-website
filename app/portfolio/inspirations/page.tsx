import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Design Inspirations",
  description: "Concept boards and design inspiration D'Stella is curating for upcoming styles.",
};

export default function InspirationsPage() {
  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      <SiteNav page="portfolio" />

      <section className={styles.section}>
        <Link href="/portfolio" className={styles.back}>
          <ArrowLeft size={16} strokeWidth={2} />
          Back to portfolio
        </Link>
        <h6 className={styles.kicker}>Portfolio</h6>
        <h1 className={styles.heading}>Design Inspirations</h1>

        <div className={styles.empty}>
          <Sparkles size={32} strokeWidth={1.6} color="var(--color-gold-ink)" />
          <p className={styles.emptyText}>
            This is where we&rsquo;ll add curated concept boards for upcoming styles &mdash; check
            back soon.
          </p>
        </div>
      </section>

      <hr className="hr" style={{ margin: 0 }} />

      <SiteFooter />
    </div>
  );
}
