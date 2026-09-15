import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import ProcessChevron from "@/components/process/ProcessChevron";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How a D'Stella project runs, from first consultation to handover — consultation, design, design lock, execution and handover.",
};

export default function ProcessPage() {
  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      <SiteNav page="process" />

      <section className={styles.hero}>
        <span className={styles.kicker}>How we work</span>
        <h1 className={styles.heading}>Five stages, one accountable team</h1>
        <p className={styles.intro}>
          Tap a stage to see what actually happens in it. No handoffs between separate
          contractors &mdash; the same team carries your project from the first call to the day
          you move in.
        </p>
      </section>

      <section className={styles.chevronSection}>
        <ProcessChevron />

        <div className={styles.ctaRow}>
          <Link href="/contact" className="btn btn-primary">
            Book free consultation
          </Link>
        </div>
      </section>

      <hr className="hr" style={{ margin: 0 }} />

      <SiteFooter />
    </div>
  );
}
