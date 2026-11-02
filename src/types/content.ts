export type AreaSlug =
  | "frontend"
  | "backend"
  | "datos-ia"
  | "quimica-ciencias"
  | "ingenieria-industria"
  | "educacion-tecnologia"
  | "interdisciplinario";

export const AREA_LABELS: Record<AreaSlug, string> = {
  frontend: "Desarrollo Frontend",
  backend: "Desarrollo Backend",
  "datos-ia": "Ciencia de Datos e Inteligencia Artificial",
  "quimica-ciencias": "Química y Ciencias",
  "ingenieria-industria": "Ingeniería e Industria 4.0",
  "educacion-tecnologia": "Educación y Tecnología Educativa",
  interdisciplinario: "Proyectos interdisciplinarios",
};

export const AREA_SLUGS = Object.keys(AREA_LABELS) as AreaSlug[];

export type ProjectStatus =
  | "idea"
  | "en desarrollo"
  | "MVP"
  | "prototipo"
  | "publicado"
  | "pausado"
  | "archivado";

export const PROJECT_STATUSES: ProjectStatus[] = [
  "idea",
  "en desarrollo",
  "MVP",
  "prototipo",
  "publicado",
  "pausado",
  "archivado",
];

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  idea: "Idea",
  "en desarrollo": "En desarrollo",
  MVP: "MVP",
  prototipo: "Prototipo",
  publicado: "Publicado",
  pausado: "Pausado",
  archivado: "Archivado",
};

export type EducationStatus =
  | "completado"
  | "en curso"
  | "incompleto"
  | "pendiente de confirmación";

export interface Profile {
  name: string;
  headline: string;
  summary: string;
  areas: AreaSlug[];
  lastUpdated: string;
}

export interface EducationEntry {
  institution: string;
  program: string;
  level: string;
  status: EducationStatus;
  startDate?: string;
  endDate?: string;
  confirmed: boolean;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  area: AreaSlug;
  status: ProjectStatus;
  technologies: string[];
  featured: boolean;
  startDate?: string;
  lastUpdated: string;
  repoUrl?: string;
  demoUrl?: string;
  cover?: string;
  content: string;
}

export type ProjectSummary = Omit<Project, "content">;
