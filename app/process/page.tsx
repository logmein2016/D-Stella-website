import type { Metadata } from "next";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import ProcessChevron from "@/components/process/ProcessChevron";
import ProcessFaq from "@/components/process/ProcessFaq";
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
      </section>

      <div className={styles.timelineWrap}>
        <div className={styles.timelinePill}>
          <span className={styles.timelineKicker}>Typical project timeline</span>
          <span className={styles.timelineFigure}>40 days</span>
          <span className={styles.timelineLabel}>from design lock to handover*</span>
        </div>
      </div>
      <p className={styles.footnote}>*Timeline depends on design complexity and material sourcing.</p>

      <section className={styles.faqSection}>
        <h2 className={styles.faqHeading}>Questions people ask before they start</h2>
        <ProcessFaq />
      </section>

      <hr className="hr" style={{ margin: 0 }} />

      <SiteFooter />
    </div>
  );
}
