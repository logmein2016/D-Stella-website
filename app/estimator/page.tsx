import type { Metadata } from "next";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import EstimatorForm from "@/components/estimator/EstimatorForm";

export const metadata: Metadata = {
  title: "Cost Estimator",
  description:
    "Two quick selections and no forms — see your 2 or 3 BHK interior design price range for Bhubaneswar instantly.",
};

export default function EstimatorPage() {
  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      <SiteNav page="estimator" />

      <EstimatorForm />

      <hr className="hr" style={{ margin: 0 }} />

      <SiteFooter />
    </div>
  );
}
