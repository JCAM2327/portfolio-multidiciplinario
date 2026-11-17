import { clsx } from "clsx";
import { eyebrowClass, sectionLeadClass, sectionTitleClass } from "@/lib/styles";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Id del `h2`, necesario cuando la sección usa `aria-labelledby`. */
  titleId?: string;
  className?: string;
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  titleId,
  className,
}: SectionHeadProps) {
  return (
    <div className={clsx("max-w-[680px]", className)}>
      <span className={eyebrowClass}>{eyebrow}</span>
      <h2 id={titleId} className={clsx(sectionTitleClass, "mt-3.5")}>
        {title}
      </h2>
      {lead ? <p className={clsx(sectionLeadClass, "mt-3.5")}>{lead}</p> : null}
    </div>
  );
}
