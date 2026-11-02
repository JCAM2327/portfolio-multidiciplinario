import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PendingNotice } from "@/components/ui/PendingNotice";
import { Section } from "@/components/ui/Section";
import { getProfile, getProjectSummaries } from "@/lib/content";
import { buttonPrimary, buttonSecondary } from "@/lib/styles";
import { siteConfig } from "@/lib/site";
import { AREA_LABELS, AREA_SLUGS } from "@/types/content";

function isPending(value: string): boolean {
  return /pendiente de confirmación/i.test(value);
}

export default function HomePage() {
  const profile = getProfile();
  const projects = getProjectSummaries().slice(0, 4);
  const blogUrl = siteConfig.links.blog;
  const name = profile?.name ?? siteConfig.name;
  const headline = profile?.headline ?? siteConfig.description;
  const pendingProfile = !profile || isPending(headline);

  return (
    <Container>
      <section className="flex flex-col gap-6 py-16 sm:py-20 lg:py-24">
        <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
          Portfolio
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          {name}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
          {headline}
        </p>

        {pendingProfile ? (
          <PendingNotice>
            Sitio en construcción. El contenido de perfil está pendiente de
            confirmación.
          </PendingNotice>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Link href="/proyectos" className={buttonPrimary}>
            Ver proyectos
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          {blogUrl ? (
            <a
              href={blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonSecondary}
            >
              Visitar el blog
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </section>

      <Section id="areas" className="border-t border-slate-200">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Áreas
          </h2>
          <p className="mt-2 text-slate-600">
            Ciencia, tecnología e ingeniería conectadas para resolver problemas
            reales.
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AREA_SLUGS.map((area) => (
            <li key={area}>
              <Card className="h-full p-4">
                <p className="text-sm font-medium text-slate-800">
                  {AREA_LABELS[area]}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="proyectos" className="border-t border-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Proyectos
            </h2>
            <p className="mt-2 text-slate-600">
              Trabajos presentados con su estado real, desde ideas hasta
              publicados.
            </p>
          </div>
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-900 hover:text-slate-600"
          >
            Ver todos
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8">
          {projects.length === 0 ? (
            <PendingNotice>
              Todavía no hay proyectos publicados.
            </PendingNotice>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      {blogUrl ? (
        <Section id="blog" className="border-t border-slate-200">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Blog
            </h2>
            <p className="mt-2 text-slate-600">
              Avances y aprendizajes documentados en un blog externo.
            </p>
          </div>

          <Card className="mt-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              El blog se abre fuera de este portfolio, en una pestaña nueva.
            </p>
            <a
              href={blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonPrimary}
            >
              Visitar el blog
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </Card>
        </Section>
      ) : null}
    </Container>
  );
}
