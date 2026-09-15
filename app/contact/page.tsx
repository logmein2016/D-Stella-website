import type { Metadata } from "next";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import ContactForm from "@/components/contact/ContactForm";
import { PHONE_DISPLAY } from "@/lib/constants";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with D'Stella Interiors for a free consultation on your 2 or 3 BHK home.",
};

export default function ContactPage() {
  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      <SiteNav page="contact" />

      <section className={styles.section}>
        <div className={styles.intro}>
          <span className={styles.kicker}>Get in touch</span>
          <h1 className={styles.heading}>Let&rsquo;s talk about your home</h1>
          <p className={styles.body}>
            Share a few details and one of our designers will call you within one working day.
            Prefer to chat directly? Reach us on WhatsApp at {PHONE_DISPLAY}.
          </p>
        </div>

        <div className={styles.formWrap}>
          <ContactForm />
        </div>
      </section>

      <hr className="hr" style={{ margin: 0 }} />

      <SiteFooter />
    </div>
  );
}
