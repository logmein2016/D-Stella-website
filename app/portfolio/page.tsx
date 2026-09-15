import type { Metadata } from "next";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import PortfolioFolders from "@/components/portfolio/PortfolioFolders";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import LeadForm from "@/components/lead-form/LeadForm";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Real 2 & 3 BHK apartment interiors completed in Bangalore, browsable by room — plus full-home projects with indicative budgets.",
};

export default function PortfolioPage() {
  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      <SiteNav page="portfolio" />

      <PortfolioFolders />

      <hr className="hr" style={{ margin: 0 }} />

      <PortfolioGrid />

      <hr className="hr" style={{ margin: 0 }} />

      <section style={{ padding: "var(--space-8) var(--space-4)" }}>
        <div style={{ maxWidth: 760 }}>
          <LeadForm
            kicker="Enquire"
            heading="Like what you see? Ask for your own price."
            subheading="Tell us which apartment you're doing up and we'll come back with a costing built around it."
            source="portfolio-page"
          />
        </div>
      </section>

      <hr className="hr" style={{ margin: 0 }} />

      <SiteFooter />
    </div>
  );
}
