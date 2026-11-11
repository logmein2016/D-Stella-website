import type { Metadata } from "next";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import ContactForm from "@/components/contact/ContactForm";
import ContactIcons from "@/components/shared/ContactIcons";
import { INSTAGRAM_URL, PHONE_DISPLAY, PHONE_PRETTY, SERVICE_AREA, WHATSAPP_NUMBER } from "@/lib/constants";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Book a free interior design consultation in Bangalore. Call, WhatsApp or share a few details and a D'Stella designer will call you within one working day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="page-shell">
      <SiteNav page="contact" />

      <section className={styles.section}>
        {/* Direct contact details on the left, the call-back form on the right. */}
        <div className={styles.intro}>
          <span className={styles.kicker}>Get in touch</span>
          <h1 className={styles.heading}>Let&rsquo;s talk about your home</h1>
          <p className={styles.body}>
            Share a few details and one of our designers will call you within one working day
            &mdash; or reach us directly, we usually reply within the hour.
          </p>

          <ul className={styles.details}>
            <li>
              <span className={styles.label}>Call</span>
              <a href={`tel:${PHONE_DISPLAY}`}>{PHONE_PRETTY}</a>
            </li>
            <li>
              <span className={styles.label}>WhatsApp</span>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                {PHONE_PRETTY}
              </a>
            </li>
            <li>
              <span className={styles.label}>Instagram</span>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                @dstellainteriors
              </a>
            </li>
            <li>
              <span className={styles.label}>Studio</span>
              {SERVICE_AREA} &middot; serving homes across Bangalore
            </li>
          </ul>

          <ContactIcons />
        </div>

        <div className={styles.formWrap}>
          <ContactForm />
        </div>
      </section>

      <SiteFooter showCta={false} />
    </div>
  );
}
