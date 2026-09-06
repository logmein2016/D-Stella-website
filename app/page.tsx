import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Hero from "@/components/home/Hero";
import RoomGrid from "@/components/home/RoomGrid";
import HowItWorks from "@/components/home/HowItWorks";
import RecentWork from "@/components/home/RecentWork";
import LeadForm from "@/components/lead-form/LeadForm";

export default function HomePage() {
  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      <SiteNav page="home" />

      <Hero />

      <hr className="hr" style={{ margin: 0 }} />

      <RoomGrid />

      <hr className="hr" style={{ margin: 0 }} />

      <HowItWorks />

      <hr className="hr" style={{ margin: 0 }} />

      <section style={{ padding: "var(--space-8) var(--space-4)" }}>
        <div style={{ maxWidth: 760 }}>
          <LeadForm
            kicker="Already have a look in mind?"
            heading="Share your Pinterest link or reference photos."
            subheading="We'll take it from there — manufacturing, fabrication and on-site construction, managed end to end."
            submitLabel="Send it over"
            showReference
            source="home-pinterest-reference"
          />
        </div>
      </section>

      <hr className="hr" style={{ margin: 0 }} />

      <RecentWork />

      <hr className="hr" style={{ margin: 0 }} />

      <SiteFooter />
    </div>
  );
}
