import type { Metadata } from "next";
import { AreaCard } from "@/components/ui/AreaCard";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PendingNotice } from "@/components/ui/PendingNotice";
import { getProfile } from "@/lib/content";
import { AREA_CHIPS, PORTFOLIO_COPY } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site";
import { chipClass, eyebrowClass, sectionTitleClass } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Perfil, enfoque y áreas de conocimiento.",
  alternates: { canonical: "/sobre-mi" },
};

function isPending(value: string): boolean {
  return /pendiente de confirmación/i.test(value);
}

export default function AboutPage() {
  const profile = getProfile();
  const pending =
    !profile || isPending(profile.headline) || isPending(profile.summary);
  const areas = profile?.areas ?? [];
  const { about } = PORTFOLIO_COPY;

  return (
    <Container>
      <PageHeader
        eyebrow="Perfil"
        title={profile?.name ?? "Sobre mí"}
        description={
          pending ? "Información pendiente de confirmación." : profile?.headline
        }
      />

      <div className="flex flex-col gap-12 pb-16 pt-10">
        <div className="grid gap-6 min-[941px]:grid-cols-[minmax(0,1fr)_280px] min-[941px]:items-start">
          <div className="flex flex-col gap-5">
            {pending ? (
              <>
                <div className="max-w-2xl text-[1.02rem] leading-relaxed text-muted [&>p+p]:mt-4">
                  <p>
                    Soy{" "}
                    <strong className="text-ink">
                      {profile?.name ?? siteConfig.name}
                    </strong>
                    . {about.paragraphs[0]}
                  </p>
                  <p>{about.paragraphs[1]}</p>
                </div>
                <PendingNotice>
                  La biografía y el enfoque están pendientes de confirmación. No
                  se publicará información personal hasta verificar los datos.
                </PendingNotice>
              </>
            ) : (
              <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted">
                {profile?.summary}
              </p>
            )}

            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Áreas de interés
              </p>
              <ul
                className="flex flex-wrap gap-2"
                aria-label="Áreas de interés declaradas"
              >
                {AREA_CHIPS.map((area) => (
                  <li key={area} className={chipClass}>
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {profile ? (
            <aside className="rounded-card border border-line bg-surface p-5 shadow-card">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Ficha del perfil
              </p>
              <dl className="mt-4 flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Actualizado</dt>
                  <dd className="font-medium text-ink">{profile.lastUpdated}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
                  <dt className="text-muted">Áreas registradas</dt>
                  <dd className="font-medium text-ink">{areas.length}</dd>
                </div>
              </dl>
            </aside>
          ) : null}
        </div>

        <section className="flex flex-col gap-6">
          <div className="max-w-2xl">
            <span className={eyebrowClass}>Disciplinas</span>
            <h2 className={`${sectionTitleClass} mt-3.5`}>Áreas</h2>
            <p className="mt-3.5 text-pretty text-[1.02rem] leading-relaxed text-muted">
              Disciplinas que declaro como áreas de interés. No equivalen a
              títulos, certificaciones ni experiencia verificada.
            </p>
          </div>

          {areas.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-2 min-[941px]:grid-cols-3">
              {areas.map((area) => (
                <li key={area}>
                  <AreaCard area={area} />
                </li>
              ))}
            </ul>
          ) : (
            <PendingNotice>
              Las áreas del perfil están pendientes de confirmación. Mientras
              tanto, estas son las áreas de interés declaradas.
            </PendingNotice>
          )}
        </section>

        <section className="max-w-2xl rounded-card border border-line bg-surface p-6 shadow-card">
          <span className={eyebrowClass}>Principio</span>
          <blockquote className="mt-4 text-pretty text-[clamp(1.15rem,1.8vw,1.45rem)] font-medium leading-relaxed text-ink">
            {about.principle}
          </blockquote>
          <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-muted">
            {about.principleNote}
          </p>
        </section>
      </div>
    </Container>
  );
}
