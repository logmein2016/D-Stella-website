import { ArrowRight } from "lucide-react";
import { workflowSteps } from "@/lib/data/workflow-steps";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <h6 className={styles.kicker}>How it works</h6>
      <h2 className={styles.heading}>From first call to move-in</h2>

      <div className={styles.row}>
        {workflowSteps.map((step, i) => {
          const Icon = step.icon;
          const hasLine = i < workflowSteps.length - 1;
          return (
            <div key={step.title} className={styles.item}>
              <div className={styles.stepCol}>
                <div className={styles.circle}>
                  <Icon size={28} strokeWidth={2} />
                  <span className={styles.stepLabel}>{step.title}</span>
                </div>
                <p className="card-body" style={{ margin: 0 }}>
                  {step.desc}
                </p>
              </div>
              {hasLine ? (
                <div className={styles.arrow}>
                  {/* 28x16, per the handoff's Assets section — not lucide's
                      default square sizing. */}
                  <ArrowRight width={28} height={16} strokeWidth={2} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className={styles.callout}>
        <span className={styles.calloutFigure}>45&ndash;90 days</span>
        <span className={styles.calloutLabel}>from your first design call to handover*</span>
      </div>
      <p className={styles.footnote}>*Timeline depends on design complexity and material sourcing.</p>
    </section>
  );
}
