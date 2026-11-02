import { clsx } from "clsx";

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
    <header className={clsx("flex flex-col gap-3 py-12 sm:py-16", className)}>
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-2xl text-lg text-slate-600">{description}</p>
      ) : null}
    </header>
  );
}
