import type { Metadata } from "next";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getProjectSummaries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos de desarrollo, datos, ciencia e ingeniería presentados con su estado real.",
};

export default function ProjectsPage() {
  const projects = getProjectSummaries();

  return (
    <Container>
      <PageHeader
        eyebrow="Trabajo"
        title="Proyectos"
        description="Cada proyecto declara su estado real, desde ideas hasta publicados."
      />
      <ProjectExplorer projects={projects} />
    </Container>
  );
}
