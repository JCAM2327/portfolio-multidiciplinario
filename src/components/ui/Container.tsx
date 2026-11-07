import type { ReactNode } from "react";
import { clsx } from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx("mx-auto w-full max-w-[1120px] px-[22px]", className)}>
      {children}
    </div>
  );
}
