import type { ReactNode } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { ProjectSummary } from "@/types/content";

interface ProjectGridProps {
  projects: ProjectSummary[];
  /** Clases extra para ajustar columnas según el contexto (portada vs catálogo). */
  className?: string;
  /** `sizes` de las portadas; debe coherente con las columnas del contexto. */
  coverSizes?: string;
}

const BASE_GRID_CLASS = "grid gap-5 sm:grid-cols-2";

/**
 * Rejilla de tarjetas de proyecto usada tanto por la portada
 * como por el catálogo `/proyectos`.
 */
export function ProjectGrid({
  projects,
  className,
  coverSizes,
}: ProjectGridProps) {
  return (
    <ul className={className ? `${BASE_GRID_CLASS} ${className}` : BASE_GRID_CLASS}>
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} coverSizes={coverSizes} />
        </li>
      ))}
    </ul>
  );
}
