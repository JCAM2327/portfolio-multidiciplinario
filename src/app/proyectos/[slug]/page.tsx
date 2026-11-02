import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getProjectBySlug, getProjects } from "@/lib/content";
import { buttonSecondary } from "@/lib/styles";
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
      <article className="py-12 sm:py-16">
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Volver a proyectos
        </Link>

        <header className="mt-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={project.status} />
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {AREA_LABELS[project.area]}
            </span>
          </div>

          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-lg text-slate-600">{project.summary}</p>

          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            <span>Última actualización: {project.lastUpdated}</span>
            {project.startDate ? <span>Inicio: {project.startDate}</span> : null}
          </div>

          {project.technologies.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-600"
                >
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
                  className={buttonSecondary}
                >
                  Demo
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          ) : null}
        </header>

        <div className="mdx-content mt-10 max-w-3xl">
          {project.content.trim() ? (
            <MDXRemote source={project.content} />
          ) : (
            <p className="text-sm text-slate-600">
              Contenido pendiente de redacción.
            </p>
          )}
        </div>
      </article>
    </Container>
  );
}
