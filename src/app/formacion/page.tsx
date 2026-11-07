import type { Metadata } from "next";
import {
  Building2,
  CalendarDays,
  Clock,
  GraduationCap,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { EducationStatusBadge } from "@/components/ui/StatusBadge";
import { PORTFOLIO_COPY } from "@/lib/portfolio";
import { getEducation } from "@/lib/content";

export const metadata: Metadata = {
  title: "Formación",
  description:
    "Formación académica y certificaciones presentadas con su estado real.",
  alternates: { canonical: "/formacion" },
};

export default function EducationPage() {
  const education = getEducation();
  const pending = PORTFOLIO_COPY.education;

  return (
    <Container>
      <PageHeader
        eyebrow="Trayectoria"
        title="Formación"
        description="Estudios y certificaciones con su estado real. Los datos no verificados se marcan como pendientes."
      />

      <div className="pb-16 pt-10">
        {education.length === 0 ? (
          <Card className="max-w-2xl p-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b]/[0.14] px-[11px] py-[5px] text-[0.74rem] font-bold uppercase tracking-[0.03em] text-[var(--tone-warning)]">
              <Clock aria-hidden="true" className="h-3.5 w-3.5" />
              {pending.status}
            </span>
            <h2 className="mt-4 text-[1.2rem] font-semibold text-ink">
              {pending.pendingTitle}
            </h2>
            <p className="mt-2.5 text-[0.93rem] leading-relaxed text-muted">
              {pending.pendingBody}
            </p>
            <dl className="mt-5 grid gap-2.5 border-t border-line pt-[18px]">
              {pending.meta.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between gap-4 text-[0.85rem]"
                >
                  <dt className="font-semibold text-faint">{item.label}</dt>
                  <dd className="text-right text-muted">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        ) : (
          <ul className="flex flex-col gap-4">
            {education.map((entry, index) => (
              <li key={`${entry.institution}-${entry.program}-${index}`}>
                <Card className="p-6 transition-colors duration-200 hover:border-line-strong">
                  <div className="flex items-start gap-4">
                    <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-line bg-accent-soft text-accent sm:flex">
                      <GraduationCap aria-hidden="true" className="h-5 w-5" />
                    </span>

                    <div className="flex min-w-0 flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <EducationStatusBadge status={entry.status} />
                        {!entry.confirmed ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--tone-warning)]">
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]"
                            />
                            Sin confirmar
                          </span>
                        ) : null}
                      </div>

                      <div>
                        <h2 className="text-balance text-lg font-semibold tracking-tight text-ink">
                          {entry.program}
                        </h2>
                        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                          <Building2
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-muted"
                          />
                          <span>{entry.institution}</span>
                          <span aria-hidden="true" className="text-line-strong">
                            ·
                          </span>
                          <span>{entry.level}</span>
                        </p>
                        {entry.startDate || entry.endDate ? (
                          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted">
                            <CalendarDays
                              aria-hidden="true"
                              className="h-3.5 w-3.5 shrink-0"
                            />
                            {[entry.startDate, entry.endDate ?? "actualidad"]
                              .filter(Boolean)
                              .join(" — ")}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}
