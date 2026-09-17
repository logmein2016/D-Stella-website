import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import LeadForm from "@/components/lead-form/LeadForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Why D'Stella Interiors exists — a former techie turned designer, building the interior design experience they wished they'd had.",
};

const promises = [
  "We tell you the real cost up front — no vague ballpark that grows once work starts.",
  "One team, start to finish — design, production and site execution, so nothing falls through the cracks between contractors.",
  "You see the design and the costing before anything is cut or built — no surprises halfway through.",
];

export default function AboutPage() {
  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      <SiteNav page="about" />

      <section className={styles.hero}>
        <h6 className={styles.kicker}>About D&rsquo;Stella</h6>
        <div className={styles.rule} />
        <h1 className={styles.heading}>We built the interior design experience we wished we&rsquo;d had.</h1>
      </section>

      <section className={styles.storySection}>
        <div className={styles.storyGrid}>
          <div className={styles.storyText}>
            <p>
              D&rsquo;Stella didn&rsquo;t start in a design studio. Our founder spent years in the fast-moving
              world of technology before making the switch to interiors &mdash; and brought a
              techie&rsquo;s obsession with process, timelines and getting the details right into a
              trade that badly needed it.
            </p>
            <p>
              Because here&rsquo;s the thing: we&rsquo;ve been through it ourselves. The vague quotes.
              The &ldquo;it&rsquo;ll take two more weeks&rdquo; that becomes two more months. The
              charges that show up after you&rsquo;ve already committed. We didn&rsquo;t want to run a
              company that did that to people, so we built D&rsquo;Stella around not doing it.
            </p>
            <p>
              That means clear costing before work begins, one accountable team instead of a
              revolving door of contractors, and a designer who actually picks up the phone. We&rsquo;re
              not the biggest name in Bangalore interiors. We&rsquo;d rather be the one our clients
              trust to get it right.
            </p>
          </div>

          <div className={styles.storyImage}>
            <Image
              src="/photos/gallery/drawing-room/living-tv-wall.jpg"
              alt="A D'Stella-designed living room with a wood-slat TV wall"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              className={styles.image}
            />
          </div>
        </div>
      </section>

      <hr className="hr" style={{ margin: 0 }} />

      <section className={styles.promiseSection}>
        <h6 className={styles.kicker}>What that means for you</h6>
        <div className={styles.rule} />
        <h2 className={styles.promiseHeading}>Reliability and predictability, in practice</h2>
        <div className={styles.promiseGrid}>
          {promises.map((text) => (
            <div key={text} className={`card elev-sm ${styles.promiseCard}`}>
              <CheckCircle2 size={22} strokeWidth={2} color="var(--color-emerald)" />
              <p className="card-body">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="hr" style={{ margin: 0 }} />

      <section style={{ padding: "var(--space-8) var(--space-4)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <LeadForm
            kicker="Let's talk"
            heading="Tell us about your home."
            subheading="A quick call is usually enough for us to understand what you need and give you a realistic starting point."
            source="about-page"
          />
        </div>
      </section>

      <hr className="hr" style={{ margin: 0 }} />

      <SiteFooter />
    </div>
  );
}
