import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AREA_LABELS, type ProjectSummary } from "@/types/content";

interface ProjectCardProps {
  project: ProjectSummary;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/proyectos/${project.slug}`} className="block h-full rounded-lg">
      <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={project.status} />
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {AREA_LABELS[project.area]}
            </span>
          </div>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.summary}</CardDescription>
        </CardHeader>

        <CardContent className="mt-auto flex flex-col gap-3">
          {project.technologies.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600"
                >
                  {technology}
                </li>
              ))}
            </ul>
          ) : null}
          <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-900">
            Ver proyecto
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
