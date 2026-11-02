import type { ReactNode } from "react";
import { clsx } from "clsx";

interface PendingNoticeProps {
  children: ReactNode;
  className?: string;
}

export function PendingNotice({ children, className }: PendingNoticeProps) {
  return (
    <p
      className={clsx(
        "rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900",
        className
      )}
    >
      {children}
    </p>
  );
}
