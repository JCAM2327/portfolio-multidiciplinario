import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PendingNotice } from "@/components/ui/PendingNotice";
import { getProfile } from "@/lib/content";
import { AREA_LABELS } from "@/types/content";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Perfil, enfoque y áreas de conocimiento.",
};

function isPending(value: string): boolean {
  return /pendiente de confirmación/i.test(value);
}

export default function AboutPage() {
  const profile = getProfile();
  const pending =
    !profile || isPending(profile.headline) || isPending(profile.summary);

  return (
    <Container>
      <PageHeader
        eyebrow="Perfil"
        title={profile?.name ?? "Sobre mí"}
        description={
          pending
            ? "Información pendiente de confirmación."
            : profile?.headline
        }
      />

      <div className="flex flex-col gap-10 pb-16">
        {pending ? (
          <PendingNotice>
            La biografía y el enfoque están pendientes de confirmación. No se
            publicará información personal hasta verificar los datos.
          </PendingNotice>
        ) : (
          <p className="max-w-2xl text-slate-600">{profile?.summary}</p>
        )}

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Áreas
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(profile?.areas ?? []).map((area) => (
              <li key={area}>
                <Card className="h-full p-4">
                  <p className="text-sm font-medium text-slate-800">
                    {AREA_LABELS[area]}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}
