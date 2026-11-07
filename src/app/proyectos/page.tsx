import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getProjectSummaries } from "@/lib/content";
import { AREA_SLUGS, type AreaSlug } from "@/types/content";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos de desarrollo, datos, ciencia e ingeniería presentados con su estado real.",
  alternates: { canonical: "/proyectos" },
};

interface ProjectsPageProps {
  searchParams: Promise<{ area?: string | string[] }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const projects = getProjectSummaries();
  const { area } = await searchParams;
  const initialArea =
    typeof area === "string" && AREA_SLUGS.includes(area as AreaSlug)
      ? (area as AreaSlug)
      : undefined;

  return (
    <Container>
      <PageHeader
        eyebrow="Trabajo"
        title="Proyectos"
        description="Cada proyecto declara su estado real, desde ideas hasta publicados."
      />
      <ProjectExplorer projects={projects} initialArea={initialArea} />
    </Container>
  );
}
