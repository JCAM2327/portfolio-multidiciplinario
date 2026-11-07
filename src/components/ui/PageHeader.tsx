import { clsx } from "clsx";
import { eyebrowClass, sectionLeadClass } from "@/lib/styles";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={clsx(
        "flex flex-col gap-4 border-b border-line py-[clamp(48px,7vw,80px)]",
        className,
      )}
    >
      {eyebrow ? <p className={eyebrowClass}>{eyebrow}</p> : null}
      <h1 className="max-w-3xl text-balance text-[clamp(2.1rem,4.6vw,3.4rem)] font-bold leading-[1.1] tracking-[-0.025em] text-ink">
        {title}
      </h1>
      {description ? (
        <p className={clsx("max-w-2xl text-pretty", sectionLeadClass)}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
