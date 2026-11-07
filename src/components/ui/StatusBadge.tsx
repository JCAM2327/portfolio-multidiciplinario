import { clsx } from "clsx";
import {
  PROJECT_STATUS_LABELS,
  type EducationStatus,
  type ProjectStatus,
} from "@/types/content";

const STATUS_STYLES: Record<ProjectStatus, string> = {
  idea: "tone-neutral",
  "en desarrollo": "tone-warning",
  MVP: "tone-success",
  prototipo: "tone-info",
  publicado: "tone-accent",
  pausado: "tone-orange",
  archivado: "tone-neutral",
};

const EDUCATION_LABELS: Record<EducationStatus, string> = {
  completado: "Completado",
  "en curso": "En curso",
  incompleto: "Incompleto",
  "pendiente de confirmación": "Pendiente de confirmación",
};

const EDUCATION_STYLES: Record<EducationStatus, string> = {
  completado: "tone-success",
  "en curso": "tone-info",
  incompleto: "tone-orange",
  "pendiente de confirmación": "tone-warning",
};

const badgeBase =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold";

const dotClass = "h-1.5 w-1.5 shrink-0 rounded-full bg-current";

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={clsx(badgeBase, STATUS_STYLES[status], className)}>
      <span aria-hidden="true" className={dotClass} />
      {PROJECT_STATUS_LABELS[status]}
    </span>
  );
}

interface EducationStatusBadgeProps {
  status: EducationStatus;
  className?: string;
}

export function EducationStatusBadge({
  status,
  className,
}: EducationStatusBadgeProps) {
  return (
    <span className={clsx(badgeBase, EDUCATION_STYLES[status], className)}>
      <span aria-hidden="true" className={dotClass} />
      {EDUCATION_LABELS[status]}
    </span>
  );
}
