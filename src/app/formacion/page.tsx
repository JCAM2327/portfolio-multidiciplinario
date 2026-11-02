import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PendingNotice } from "@/components/ui/PendingNotice";
import { EducationStatusBadge } from "@/components/ui/StatusBadge";
import { getEducation } from "@/lib/content";

export const metadata: Metadata = {
  title: "Formación",
  description:
    "Formación académica y certificaciones presentadas con su estado real.",
};

export default function EducationPage() {
  const education = getEducation();

  return (
    <Container>
      <PageHeader
        eyebrow="Trayectoria"
        title="Formación"
        description="Estudios y certificaciones con su estado real. Los datos no verificados se marcan como pendientes."
      />

      <div className="pb-16">
        {education.length === 0 ? (
          <PendingNotice>
            Todavía no se ha registrado formación confirmada.
          </PendingNotice>
        ) : (
          <ul className="flex flex-col gap-4">
            {education.map((entry, index) => (
              <li key={`${entry.institution}-${entry.program}-${index}`}>
                <Card className="p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <EducationStatusBadge status={entry.status} />
                    {!entry.confirmed ? (
                      <span className="text-xs font-medium uppercase tracking-wide text-amber-700">
                        Sin confirmar
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-slate-900">
                    {entry.program}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {entry.institution} · {entry.level}
                  </p>
                  {entry.startDate || entry.endDate ? (
                    <p className="mt-1 text-xs text-slate-500">
                      {[entry.startDate, entry.endDate ?? "actualidad"]
                        .filter(Boolean)
                        .join(" — ")}
                    </p>
                  ) : null}
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}
