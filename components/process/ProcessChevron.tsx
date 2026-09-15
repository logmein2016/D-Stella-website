"use client";

import { useState } from "react";
import { processSteps } from "@/lib/data/process-steps";
import styles from "./ProcessChevron.module.css";

export default function ProcessChevron() {
  const [active, setActive] = useState(0);
  const step = processSteps[active];
  if (!step) return null;
  const Icon = step.icon;

  return (
    <div className={styles.wrap}>
      <div className={styles.row} role="tablist" aria-label="Our design process">
        {processSteps.map((s, i) => {
          const StepIcon = s.icon;
          const isActive = i === active;
          return (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.chevron} ${isActive ? styles.chevronActive : ""}`}
              onClick={() => setActive(i)}
            >
              <span className={styles.chevronNum}>0{i + 1}</span>
              <StepIcon size={20} strokeWidth={2} className={styles.chevronIcon} />
              <span className={styles.chevronLabel}>{s.title}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.panel} role="tabpanel">
        <div className={styles.panelIcon}>
          <Icon size={26} strokeWidth={2} />
        </div>
        <div>
          <h3 className={styles.panelTitle}>{step.title}</h3>
          <p className={styles.panelDesc}>{step.desc}</p>
        </div>
      </div>
    </div>
  );
}
