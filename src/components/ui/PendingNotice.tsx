import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { clsx } from "clsx";

interface PendingNoticeProps {
  children: ReactNode;
  className?: string;
}

export function PendingNotice({ children, className }: PendingNoticeProps) {
  return (
    <div
      role="note"
      className={clsx(
        "notice-warning flex items-start gap-3 rounded-control p-4 text-sm leading-relaxed shadow-sm",
        className,
      )}
    >
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f59e0b]/15 text-[var(--tone-warning)]">
        <Info aria-hidden="true" className="h-4 w-4" />
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
