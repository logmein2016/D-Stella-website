import type { Metadata } from "next";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import EstimatorForm from "@/components/estimator/EstimatorForm";

export const metadata: Metadata = {
  title: "Interior Design Cost Estimator",
  alternates: { canonical: "/estimator" },
  description:
    "Two quick selections and no forms — see your 2, 3 or 4 BHK interior design price range for Bangalore instantly.",
};

export default function EstimatorPage() {
  return (
    <div className="page-shell">
      <SiteNav page="estimator" />

      <EstimatorForm />

      <hr className="hr" style={{ margin: 0 }} />

      <SiteFooter showCta={false} />
    </div>
  );
}
