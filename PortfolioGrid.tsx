"use client";

import { useState } from "react";
import { projects, workFilterOptions, type Bhk } from "@/lib/data/projects";
import SegmentedControl from "@/components/shared/SegmentedControl";
import ProjectCard from "@/components/shared/ProjectCard";
import styles from "./PortfolioGrid.module.css";

type Filter = "all" | Bhk;

export default function PortfolioGrid() {
  const [workFilter, setWorkFilter] = useState<Filter>("all");
  const visibleProjects = projects.filter(
    (p) => workFilter === "all" || p.bhk === workFilter,
  );

  return (
    <section className={styles.section}>
      <h6 className={styles.kicker}>Complete homes</h6>
      <h2 className={styles.heading}>Full-home projects</h2>
      <div className={styles.rule} />
      <p className={styles.intro}>
        Every project below is a 2 or 3 BHK apartment executed in Bangalore, at mid-segment budgets.
      </p>

      <div className={styles.filterRow}>
        <SegmentedControl
          name="workfilter-portfolio"
          options={workFilterOptions}
          value={workFilter}
          onChange={setWorkFilter}
          aria-label="Filter projects by apartment size"
        />
      </div>

      <div className={styles.grid}>
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} variant="portfolio" />
        ))}
      </div>
      <p className={styles.footnote}>*Indicative budget range for a comparable home — final costing depends on layout, carpentry choices and site conditions.</p>
    </section>
  );
}
