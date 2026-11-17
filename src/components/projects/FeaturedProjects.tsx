import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { SectionHead } from "@/components/ui/SectionHead";
import { Container } from "@/components/ui/Container";
import { PORTFOLIO_COPY } from "@/lib/portfolio";
import { buttonSecondary } from "@/lib/styles";
import type { ProjectSummary } from "@/types/content";

interface FeaturedProjectsProps {
  projects: ProjectSummary[];
}

/**
 * Sección de la portada con los proyectos marcados como destacados.
 * Recibe ya filtrados y limitados desde la página (server component)
 * para que este componente solo se encargue de la presentación.
 */
export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const copy = PORTFOLIO_COPY.featuredWork;

  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      id="destacados"
      aria-labelledby="destacados-title"
      className="border-y border-line bg-canvas-soft py-[clamp(56px,8vw,92px)]"
    >
      <Container>
        <SectionHead
          eyebrow={copy.eyebrow}
          title={copy.title}
          lead={copy.lead}
          titleId="destacados-title"
          className="mb-[clamp(30px,4vw,46px)]"
        />

        <ProjectGrid
          projects={projects}
          className="min-[941px]:grid-cols-3"
          coverSizes="(min-width: 941px) 33vw, (min-width: 640px) 50vw, 100vw"
        />

        <div className="mt-8">
          <Link href="/proyectos" className={buttonSecondary}>
            {copy.cta}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
