import type { Metadata } from "next";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import { PHONE_DISPLAY, SITE_NAME } from "@/lib/constants";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses and stores the information you share with us.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      <SiteNav page="home" />

      <section className={styles.section}>
        <h1>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: 27 September 2026</p>

        <p>
          This policy explains what information {SITE_NAME} collects through this website, why we
          collect it, and how it&rsquo;s used. We keep this simple on purpose — we only collect what
          we need to get back to you about your project.
        </p>

        <h2>What we collect</h2>
        <p>When you fill in a form on this site — the contact page, the cost estimator, or any of the enquiry forms — we collect:</p>
        <ul>
          <li>Your name and phone number (required, so we can call or WhatsApp you back)</li>
          <li>Your email address, if you choose to provide it</li>
          <li>
            Any project details you share — apartment/society name, BHK size, finish level, budget
            range, or a reference link/photo
          </li>
        </ul>
        <p>
          We don&rsquo;t use cookies or third-party analytics/advertising trackers on this site.
        </p>

        <h2>How we use it</h2>
        <p>
          We use the information you submit only to respond to your enquiry — to call, message or
          WhatsApp you about a costing or consultation. We don&rsquo;t sell your information, and we
          don&rsquo;t share it with third parties except the service providers who host our systems
          (our database and hosting providers), who process it only on our behalf.
        </p>

        <h2>WhatsApp fallback</h2>
        <p>
          If a form submission can&rsquo;t be saved for any reason, the site offers a pre-filled
          WhatsApp message as a fallback. Nothing is sent anywhere unless you choose to send that
          WhatsApp message yourself.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We retain enquiry details for as long as reasonably useful for following up on your
          project, or until you ask us to delete them.
        </p>

        <h2>Your choices</h2>
        <p>
          You can ask us what information we hold about you, or ask us to correct or delete it, at
          any time by reaching out on WhatsApp/phone at{" "}
          <a href={`tel:${PHONE_DISPLAY}`}>{PHONE_DISPLAY}</a> or through the{" "}
          <a href="/contact">contact form</a>.
        </p>

        <h2>Children&rsquo;s privacy</h2>
        <p>This site is intended for homeowners and is not directed at children.</p>

        <h2>Changes to this policy</h2>
        <p>
          If this policy changes, we&rsquo;ll update this page and the &ldquo;last updated&rdquo;
          date above.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about this policy? Reach us at{" "}
          <a href={`tel:${PHONE_DISPLAY}`}>{PHONE_DISPLAY}</a> or via the{" "}
          <a href="/contact">contact page</a>.
        </p>
      </section>

      <hr className="hr" style={{ margin: 0 }} />

      <SiteFooter showCta={false} />
    </div>
  );
}
