"use client";

import { useState } from "react";
import type { Bhk } from "@/lib/data/projects";
import {
  finishDescriptions,
  finishLabels,
  finishOptions,
  formatPriceRange,
  type Finish,
} from "@/lib/data/finishes";
import SegmentedControl from "@/components/shared/SegmentedControl";
import LeadForm from "@/components/lead-form/LeadForm";
import styles from "./EstimatorForm.module.css";

const bhkOptions: { value: Bhk; label: string }[] = [
  { value: "2", label: "2 BHK" },
  { value: "3", label: "3 BHK" },
];

export default function EstimatorForm() {
  const [bhk, setBhk] = useState<Bhk | null>(null);
  const [finish, setFinish] = useState<Finish | null>(null);
  const [showStage2, setShowStage2] = useState(false);

  // hasSelection is computed here as an explicit boolean, not templated as a
  // negated conditional — the handoff calls out that its prototype runtime
  // (`<sc-if value="{{ !hasSelection }}">`) doesn't evaluate that reliably,
  // and asks the port to verify the empty-state prompt shows on first load.
  const hasSelection = Boolean(bhk && finish);
  const priceRangeText = hasSelection ? formatPriceRange(bhk!, finish!) : "";
  const finishDesc = finish ? finishDescriptions[finish] : "Choose a finish level to see what’s included.";
  const estimateContext = hasSelection
    ? `${bhk} BHK · ${finishLabels[finish!]} finish · ${priceRangeText}`
    : "";

  return (
    <section className={styles.section}>
      <h6 className={styles.kicker}>Cost estimator</h6>
      <h1 className={styles.heading}>What will your home cost?</h1>
      <p className={styles.intro}>Two quick selections. No forms, no email required.</p>

      <div className={styles.stage}>
        <div className="field">
          <label>Apartment size</label>
          <SegmentedControl
            name="bhk"
            options={bhkOptions}
            value={bhk}
            onChange={setBhk}
            fullWidth
            aria-label="Apartment size"
          />
        </div>

        <div className="field">
          <label>Finish level</label>
          <SegmentedControl
            name="finish"
            options={finishOptions}
            value={finish}
            onChange={setFinish}
            fullWidth
            aria-label="Finish level"
          />
          <p className={`text-muted ${styles.finishDesc}`}>{finishDesc}</p>
        </div>

        {hasSelection ? (
          <div className={`card elev-md ${styles.priceCard}`}>
            <span className="card-kicker">Estimated range</span>
            <div className={styles.priceFigure}>{priceRangeText}</div>
            <p className={`card-body ${styles.priceCaption}`}>
              Final quote depends on layout, carpentry choices and site conditions.
            </p>
          </div>
        ) : (
          <div className={`card ${styles.priceCard} ${styles.priceCardEmpty}`}>
            <span className="card-kicker">Estimated range</span>
            <p className={`card-body ${styles.priceCaption}`}>
              Pick your apartment size and finish level above to see your range.
            </p>
          </div>
        )}

        {showStage2 ? (
          <LeadForm
            kicker="Get a precise quote"
            heading="We'll size this to your exact home."
            subheading="Share your details and a designer will call you with a costing for your apartment."
            submitLabel="Send me my precise quote"
            context={estimateContext}
            bhk={bhk ?? ""}
            finish={finish ?? ""}
            priceRange={priceRangeText}
            source="estimator-page"
          />
        ) : (
          <button
            type="button"
            className="btn btn-secondary btn-block"
            onClick={() => setShowStage2(true)}
          >
            Get a more precise number &rarr;
          </button>
        )}
      </div>
    </section>
  );
}
