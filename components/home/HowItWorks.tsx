import ProcessChevron from "@/components/process/ProcessChevron";
import LeadForm from "@/components/lead-form/LeadForm";
import ContactIcons from "@/components/shared/ContactIcons";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <h6 className={styles.kicker}>How it works</h6>
      <h2 className={styles.heading}>From first call to move-in</h2>

      <ProcessChevron />

      <div className={styles.timelineWrap}>
        <div className={styles.timelinePill}>
          <span className={styles.timelineKicker}>Typical project timeline</span>
          <span className={styles.timelineFigure}>
            40 <span className={styles.timelineUnit}>days</span>
          </span>
          <span className={styles.timelineLabel}>from design lock to handover*</span>
        </div>
      </div>
      <p className={styles.footnote}>*Timeline depends on design complexity and material sourcing.</p>

      <div className={styles.contact}>
        <div className={styles.contactIntro}>
          <h3 className={styles.contactHeading}>Ready to start your project?</h3>
          <p className={styles.contactBody}>
            Book a free consultation below, or reach us directly &mdash; we usually reply within
            the hour.
          </p>
          <ContactIcons className={styles.contactActions} />
        </div>

        <div className={styles.contactFormWrap}>
          <LeadForm
            kicker="Get in touch"
            heading="Book a free consultation"
            subheading="Share a few details and a designer will call you within one working day."
            submitLabel="Book my consultation"
            source="home-how-it-works"
          />
        </div>
      </div>
    </section>
  );
}
