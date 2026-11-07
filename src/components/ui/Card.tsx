import type { ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-card border border-line bg-surface shadow-card",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return (
    <header className={clsx("flex flex-col gap-2 p-6 pb-4", className)}>
      {children}
    </header>
  );
}

export function CardContent({ children, className }: CardProps) {
  return <div className={clsx("px-6 pb-6", className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return (
    <h3
      className={clsx(
        "text-lg font-semibold tracking-tight text-ink",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: CardProps) {
  return (
    <p className={clsx("text-sm leading-relaxed text-muted", className)}>
      {children}
    </p>
  );
}
