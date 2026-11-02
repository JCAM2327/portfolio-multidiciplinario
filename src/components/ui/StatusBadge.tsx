import { clsx } from "clsx";
import {
  PROJECT_STATUS_LABELS,
  type EducationStatus,
  type ProjectStatus,
} from "@/types/content";

const STATUS_STYLES: Record<ProjectStatus, string> = {
  idea: "border-slate-300 bg-slate-50 text-slate-700",
  "en desarrollo": "border-amber-300 bg-amber-50 text-amber-900",
  MVP: "border-emerald-300 bg-emerald-50 text-emerald-900",
  prototipo: "border-sky-300 bg-sky-50 text-sky-900",
  publicado: "border-green-300 bg-green-50 text-green-900",
  pausado: "border-orange-300 bg-orange-50 text-orange-900",
  archivado: "border-slate-300 bg-slate-100 text-slate-600",
};

const EDUCATION_LABELS: Record<EducationStatus, string> = {
  completado: "Completado",
  "en curso": "En curso",
  incompleto: "Incompleto",
  "pendiente de confirmación": "Pendiente de confirmación",
};

const EDUCATION_STYLES: Record<EducationStatus, string> = {
  completado: "border-green-300 bg-green-50 text-green-900",
  "en curso": "border-sky-300 bg-sky-50 text-sky-900",
  incompleto: "border-orange-300 bg-orange-50 text-orange-900",
  "pendiente de confirmación": "border-amber-300 bg-amber-50 text-amber-900",
};

const badgeBase =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium";

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={clsx(badgeBase, STATUS_STYLES[status], className)}>
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
      {EDUCATION_LABELS[status]}
    </span>
  );
}
