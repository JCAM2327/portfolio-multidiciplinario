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
        "rounded-lg border border-slate-200 bg-white shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <header className={clsx("flex flex-col gap-2 p-6 pb-4", className)}>{children}</header>;
}

export function CardContent({ children, className }: CardProps) {
  return <div className={clsx("px-6 pb-6", className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return <h3 className={clsx("text-lg font-semibold tracking-tight", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: CardProps) {
  return <p className={clsx("text-sm text-slate-600", className)}>{children}</p>;
}
