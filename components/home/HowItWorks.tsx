import ProcessChevron from "@/components/process/ProcessChevron";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <h6 className={styles.kicker}>How it works</h6>
      <h2 className={styles.heading}>From first call to move-in</h2>

      <ProcessChevron />

      <div className={styles.callout}>
        <span className={styles.calloutFigure}>40 days</span>
        <span className={styles.calloutLabel}>from design lock to handover*</span>
      </div>
      <p className={styles.footnote}>*Timeline depends on design complexity and material sourcing.</p>
    </section>
  );
}
