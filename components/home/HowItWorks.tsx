import { Phone } from "lucide-react";
import ProcessChevron from "@/components/process/ProcessChevron";
import LeadForm from "@/components/lead-form/LeadForm";
import { PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/constants";
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
          <span className={styles.timelineFigure}>40 days</span>
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
          <div className={styles.contactActions}>
            <a href={`tel:${PHONE_DISPLAY}`} className={`btn btn-secondary ${styles.contactBtn}`}>
              <Phone size={17} strokeWidth={2} />
              Call {PHONE_DISPLAY}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.contactBtn} ${styles.whatsappBtn}`}
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.85.5 3.646 1.45 5.224L2 22l4.897-1.393A9.945 9.945 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.111a8.09 8.09 0 0 1-4.13-1.13l-.296-.176-3.06.871.863-3.05-.192-.31a8.09 8.09 0 0 1-1.238-4.316c0-4.474 3.639-8.111 8.114-8.111 4.474 0 8.11 3.637 8.11 8.111 0 4.474-3.636 8.111-8.171 8.111z" />
              </svg>
              WhatsApp us
            </a>
          </div>
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
