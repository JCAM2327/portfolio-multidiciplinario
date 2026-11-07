import {
  Code2,
  Database,
  Factory,
  FlaskConical,
  GraduationCap,
  Layers,
  Server,
  type LucideIcon,
} from "lucide-react";
import { clsx } from "clsx";
import { AREA_LABELS, type AreaSlug } from "@/types/content";

const AREA_ICONS: Record<AreaSlug, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  "datos-ia": Database,
  "quimica-ciencias": FlaskConical,
  "ingenieria-industria": Factory,
  "educacion-tecnologia": GraduationCap,
  interdisciplinario: Layers,
};

interface AreaCardProps {
  area: AreaSlug;
  className?: string;
}

export function AreaCard({ area, className }: AreaCardProps) {
  const Icon = AREA_ICONS[area];

  return (
    <div
      className={clsx(
        "group flex h-full items-center gap-4 rounded-card border border-line bg-surface p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md motion-reduce:transform-none",
        className
      )}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-line bg-accent-soft text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-contrast">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <span className="text-sm font-semibold leading-snug text-ink">
        {AREA_LABELS[area]}
      </span>
    </div>
  );
}
