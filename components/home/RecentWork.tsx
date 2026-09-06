"use client";

import { useState } from "react";
import Link from "next/link";
import { featuredProjects, workFilterOptions, type Bhk } from "@/lib/data/projects";
import SegmentedControl from "@/components/shared/SegmentedControl";
import ProjectCard from "@/components/shared/ProjectCard";
import styles from "./RecentWork.module.css";

type Filter = "all" | Bhk;

export default function RecentWork() {
  const [workFilter, setWorkFilter] = useState<Filter>("all");
  const visibleProjects = featuredProjects.filter(
    (p) => workFilter === "all" || p.bhk === workFilter,
  );

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h6 style={{ color: "var(--color-accent-700)" }}>Portfolio</h6>
          <h2 className={styles.headerHeading}>Recent work</h2>
        </div>
        <SegmentedControl
          name="workfilter-home"
          options={workFilterOptions}
          value={workFilter}
          onChange={setWorkFilter}
          aria-label="Filter recent work by apartment size"
        />
      </div>

      <div className={styles.grid}>
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} variant="home" />
        ))}
      </div>

      <div className={styles.footer}>
        <Link href="/portfolio" className="btn btn-secondary">
          View full portfolio &rarr;
        </Link>
      </div>
    </section>
  );
}
