import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { ProjectCover } from "@/components/projects/ProjectCover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { chipClass } from "@/lib/styles";
import { AREA_LABELS, type ProjectSummary } from "@/types/content";

interface ProjectCardProps {
  project: ProjectSummary;
}

const projectLinkClass =
  "relative z-20 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink shadow-sm transition-colors hover:border-line-strong hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg motion-reduce:transform-none">
      <Link
        href={`/proyectos/${project.slug}`}
        aria-label={`Ver detalle de ${project.title}`}
        className="absolute inset-0 z-10 rounded-card focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-2 focus-visible:ring-inset"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-20 h-0.5 bg-linear-to-r from-accent via-accent/60 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />

      <ProjectCover project={project} className="border-b border-line" />

      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            {AREA_LABELS[project.area]}
          </span>
        </div>
        <CardTitle className="transition-colors duration-200 group-hover:text-accent-strong">
          {project.title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {project.summary}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto flex flex-col gap-4">
        {project.technologies.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5">
            {project.technologies.map((technology) => (
              <li key={technology} className={chipClass}>
                {technology}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={projectLinkClass}
            >
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              Demo
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={projectLinkClass}
            >
              <Github aria-hidden="true" className="h-3.5 w-3.5" />
              Repo
            </a>
          ) : null}
        </div>

        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-accent-strong">
          Ver proyecto
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
          />
        </span>
      </CardContent>
    </Card>
  );
}
