import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { Container } from "@/components/ui/Container";
import { PendingNotice } from "@/components/ui/PendingNotice";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getProjectBySlug, getProjects } from "@/lib/content";
import { buttonPrimary, buttonSecondary, chipClass } from "@/lib/styles";
import { AREA_LABELS } from "@/types/content";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Proyecto no encontrado" };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/proyectos/${project.slug}` },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <Container>
      <article className="py-10 sm:py-14">
        <Link
          href="/proyectos"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transform-none"
          />
          Volver a proyectos
        </Link>

        {project.cover ? (
          <ProjectCover
            project={project}
            priority
            sizes="(min-width: 1120px) 1076px, 100vw"
            className="mt-6 rounded-panel border border-line shadow-card"
          />
        ) : null}

        <header className="hero-surface relative mt-6 overflow-hidden rounded-panel border border-line p-6 sm:p-10">
          <div
            aria-hidden="true"
            className="hero-grid absolute inset-0 opacity-60"
          />
          <div className="relative flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                {AREA_LABELS[project.area]}
              </span>
            </div>

            <h1 className="max-w-3xl text-balance text-[clamp(2.1rem,4.6vw,3.4rem)] font-bold leading-[1.1] tracking-[-0.025em] text-ink">
              {project.title}
            </h1>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              {project.summary}
            </p>

            <dl className="grid gap-4 border-t border-line/80 pt-5 sm:grid-cols-2">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Última actualización
                </dt>
                <dd className="mt-1 text-sm font-medium text-ink">
                  {project.lastUpdated}
                </dd>
              </div>
              {project.startDate ? (
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Inicio
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-ink">
                    {project.startDate}
                  </dd>
                </div>
              ) : null}
            </dl>

            {project.technologies.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5">
                {project.technologies.map((technology) => (
                  <li key={technology} className={chipClass}>
                    {technology}
                  </li>
                ))}
              </ul>
            ) : null}

            {project.repoUrl || project.demoUrl ? (
              <div className="flex flex-wrap gap-3">
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonSecondary}
                  >
                    Repositorio
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                ) : null}
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonPrimary}
                  >
                    Demo
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </header>

        <div className="mt-10 max-w-3xl">
          {project.content.trim() ? (
            <div className="mdx-content">
              <MDXRemote source={project.content} />
            </div>
          ) : (
            <PendingNotice>Contenido pendiente de redacción.</PendingNotice>
          )}
        </div>
      </article>
    </Container>
  );
}
