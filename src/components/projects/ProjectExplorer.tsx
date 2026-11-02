"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Card } from "@/components/ui/Card";
import { buttonSecondary, selectClass } from "@/lib/styles";
import {
  AREA_LABELS,
  AREA_SLUGS,
  PROJECT_STATUSES,
  PROJECT_STATUS_LABELS,
  type AreaSlug,
  type ProjectStatus,
  type ProjectSummary,
} from "@/types/content";

type AreaFilter = AreaSlug | "todas";
type StatusFilter = ProjectStatus | "todos";

interface ProjectExplorerProps {
  projects: ProjectSummary[];
}

export function ProjectExplorer({ projects }: ProjectExplorerProps) {
  const [area, setArea] = useState<AreaFilter>("todas");
  const [status, setStatus] = useState<StatusFilter>("todos");

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          (area === "todas" || project.area === area) &&
          (status === "todos" || project.status === status)
      ),
    [projects, area, status]
  );

  const hasFilters = area !== "todas" || status !== "todos";

  return (
    <div className="flex flex-col gap-8 pb-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="filtro-area"
            className="text-sm font-medium text-slate-700"
          >
            Área
          </label>
          <select
            id="filtro-area"
            value={area}
            onChange={(event) => setArea(event.target.value as AreaFilter)}
            className={selectClass}
          >
            <option value="todas">Todas las áreas</option>
            {AREA_SLUGS.map((areaSlug) => (
              <option key={areaSlug} value={areaSlug}>
                {AREA_LABELS[areaSlug]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="filtro-estado"
            className="text-sm font-medium text-slate-700"
          >
            Estado
          </label>
          <select
            id="filtro-estado"
            value={status}
            onChange={(event) => setStatus(event.target.value as StatusFilter)}
            className={selectClass}
          >
            <option value="todos">Todos los estados</option>
            {PROJECT_STATUSES.map((projectStatus) => (
              <option key={projectStatus} value={projectStatus}>
                {PROJECT_STATUS_LABELS[projectStatus]}
              </option>
            ))}
          </select>
        </div>

        {hasFilters ? (
          <button
            type="button"
            onClick={() => {
              setArea("todas");
              setStatus("todos");
            }}
            className={buttonSecondary}
          >
            Limpiar filtros
          </button>
        ) : null}
      </div>

      <p aria-live="polite" className="text-sm text-slate-600">
        {filteredProjects.length}{" "}
        {filteredProjects.length === 1 ? "proyecto" : "proyectos"}
      </p>

      {filteredProjects.length === 0 ? (
        <Card className="p-6">
          <p className="text-sm text-slate-600">
            {projects.length === 0
              ? "Todavía no hay proyectos publicados."
              : "No hay proyectos que coincidan con los filtros seleccionados."}
          </p>
        </Card>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filteredProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
