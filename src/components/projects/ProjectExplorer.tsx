"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ChevronDown, RotateCcw, SearchX } from "lucide-react";
import { ProjectCard } from "@/components/projects/ProjectCard";
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
  initialArea?: AreaFilter;
}

const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted";

export function ProjectExplorer({
  projects,
  initialArea = "todas",
}: ProjectExplorerProps) {
  const [area, setArea] = useState<AreaFilter>(initialArea);
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

  function resetFilters() {
    setArea("todas");
    setStatus("todos");
  }

  return (
    <div className="flex flex-col gap-8 pb-16 pt-8 sm:pt-10">
      {projects.length > 0 ? (
        <div className="rounded-card border border-line bg-surface p-4 shadow-card sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
              <div className="flex w-full flex-col gap-1.5 sm:w-56">
                <label htmlFor="filtro-area" className={labelClass}>
                  Área
                </label>
                <div className="relative">
                  <select
                    id="filtro-area"
                    value={area}
                    onChange={(event) =>
                      setArea(event.target.value as AreaFilter)
                    }
                    className={selectClass}
                  >
                    <option value="todas">Todas las áreas</option>
                    {AREA_SLUGS.map((areaSlug) => (
                      <option key={areaSlug} value={areaSlug}>
                        {AREA_LABELS[areaSlug]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col gap-1.5 sm:w-56">
                <label htmlFor="filtro-estado" className={labelClass}>
                  Estado
                </label>
                <div className="relative">
                  <select
                    id="filtro-estado"
                    value={status}
                    onChange={(event) =>
                      setStatus(event.target.value as StatusFilter)
                    }
                    className={selectClass}
                  >
                    <option value="todos">Todos los estados</option>
                    {PROJECT_STATUSES.map((projectStatus) => (
                      <option key={projectStatus} value={projectStatus}>
                        {PROJECT_STATUS_LABELS[projectStatus]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                  />
                </div>
              </div>

              {hasFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className={buttonSecondary}
                >
                  <RotateCcw aria-hidden="true" className="h-4 w-4" />
                  Limpiar filtros
                </button>
              ) : null}
            </div>

            <p
              aria-live="polite"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface-muted px-3 py-1.5 text-xs font-semibold text-muted"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1 ? "proyecto" : "proyectos"}
            </p>
          </div>
        </div>
      ) : null}

      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-line-strong bg-surface/60 px-6 py-14 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-muted shadow-sm">
            <SearchX aria-hidden="true" className="h-5 w-5" />
          </span>
          <p className="text-sm font-semibold text-ink">
            {projects.length === 0
              ? "Todavía no hay proyectos publicados."
              : "No hay proyectos que coincidan con los filtros seleccionados."}
          </p>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            {projects.length === 0
              ? "Los proyectos aparecerán aquí a medida que se publiquen y confirmen sus datos."
              : "Probá con otra área o estado para ampliar los resultados."}
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className={buttonSecondary}
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Limpiar filtros
            </button>
          ) : null}
          {projects.length === 0 ? (
            <Link href="/#enfoque" className={buttonSecondary}>
              Ver líneas de trabajo
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2">
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
