import type { Project } from "@/lib/data/projects";
import ImageSlot from "./ImageSlot";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  /** Home's "Recent work" cards have no border; the portfolio page adds a
   * bordered card and a luxury-tone rule under the caption. Both are now
   * full-color — real project photography reads better in color than the
   * design system's original grayscale treatment. */
  variant: "home" | "portfolio";
};

export default function ProjectCard({ project, variant }: ProjectCardProps) {
  const meta = `${project.bhk} BHK · ${project.budget}`;

  return (
    <div className={`card ${styles.card} ${variant === "portfolio" ? styles.portfolioCard : ""}`}>
      <div className={styles.imageWrap}>
        <ImageSlot
          src={project.photoSrc}
          alt={project.photoAlt}
          placeholder={`${project.name} — ${project.bhk} BHK`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className={variant === "portfolio" ? styles.captionPortfolio : styles.captionHome}>
        <span className={`card-title ${variant === "portfolio" ? styles.namePortfolio : styles.nameHome}`}>
          {project.name}
        </span>
        <span className={variant === "portfolio" ? styles.metaPortfolio : `text-muted ${styles.metaHome}`}>
          {meta}
        </span>
      </div>
    </div>
  );
}
