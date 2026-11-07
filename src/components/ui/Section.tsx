import type { ReactNode } from "react";
import { clsx } from "clsx";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={clsx("py-[clamp(56px,8vw,92px)]", className)}>
      {children}
    </section>
  );
}
