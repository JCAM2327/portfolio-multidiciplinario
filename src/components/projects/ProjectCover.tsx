import Image from "next/image";
import { clsx } from "clsx";
import { ImageOff } from "lucide-react";
import { AREA_LABELS, type ProjectSummary } from "@/types/content";

interface ProjectCoverProps {
  project: ProjectSummary;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function ProjectCover({
  project,
  className,
  priority = false,
  sizes = "(min-width: 640px) 50vw, 100vw",
}: ProjectCoverProps) {
  return (
    <div
      className={clsx(
        "relative aspect-[16/10] overflow-hidden bg-surface-muted",
        className
      )}
    >
      {project.cover ? (
        <Image
          src={project.cover}
          alt={`Portada de ${project.title}`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-linear-to-br from-surface-muted via-surface to-canvas-soft px-6 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted shadow-sm">
            <ImageOff aria-hidden="true" className="h-4 w-4" />
          </span>
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-faint">
            Portada pendiente
          </span>
          <span className="text-sm font-semibold text-muted">
            {project.title}
          </span>
          <span className="text-[0.7rem] font-medium text-faint">
            {AREA_LABELS[project.area]}
          </span>
        </div>
      )}
    </div>
  );
}
