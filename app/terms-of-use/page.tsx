import type { Metadata } from "next";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import { PHONE_DISPLAY, SITE_NAME } from "@/lib/constants";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms that apply to using the ${SITE_NAME} website.`,
};

export default function TermsOfUsePage() {
  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      <SiteNav page="home" />

      <section className={styles.section}>
        <h1>Terms of Use</h1>
        <p className={styles.updated}>Last updated: 27 September 2026</p>

        <p>
          These terms cover your use of this website. By using it, you agree to them. If you don&rsquo;t
          agree, please don&rsquo;t use the site.
        </p>

        <h2>What this website is for</h2>
        <p>
          This site is here to show our work and let you get in touch — through the contact form,
          the cost estimator, or WhatsApp/phone. It&rsquo;s informational, not a binding offer or
          contract.
        </p>

        <h2>The cost estimator</h2>
        <p>
          Figures shown by the cost estimator are indicative starting ranges only, based on
          apartment size and finish level. They are not a quote. Your actual costing depends on
          your layout, material choices and site conditions, and is only confirmed after a
          consultation.
        </p>

        <h2>Content and photos</h2>
        <p>
          The project photos, text and branding on this site belong to {SITE_NAME} (or are used
          with permission) and are protected by copyright. Please don&rsquo;t copy, redistribute or
          reuse them without our written permission.
        </p>

        <h2>No warranty on the website itself</h2>
        <p>
          We try to keep this site accurate and available, but we make no guarantee that it will be
          error-free, uninterrupted, or perfectly up to date at all times. Terms for an actual
          interior design project — pricing, timelines, warranty — are set out separately once you
          sign on as a client, not on this website.
        </p>

        <h2>Third-party links</h2>
        <p>
          This site links out to WhatsApp for messaging. We&rsquo;re not responsible for the content
          or practices of that or any other third-party service.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the extent permitted by law, {SITE_NAME} is not liable for any loss or damage arising
          from your use of this website or reliance on estimator figures shown on it.
        </p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws of India, with courts in Bangalore, Karnataka having jurisdiction.</p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the site after a change
          means you accept the updated terms.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about these terms? Reach us at{" "}
          <a href={`tel:${PHONE_DISPLAY}`}>{PHONE_DISPLAY}</a> or via the{" "}
          <a href="/contact">contact page</a>.
        </p>
      </section>

      <hr className="hr" style={{ margin: 0 }} />

      <SiteFooter showCta={false} />
    </div>
  );
}
