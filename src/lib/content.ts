import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  AREA_LABELS,
  PROJECT_STATUSES,
  type AreaSlug,
  type EducationEntry,
  type EducationStatus,
  type Profile,
  type Project,
  type ProjectStatus,
  type ProjectSummary,
} from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "proyectos");

type Frontmatter = Record<string, unknown>;

interface RawEntry {
  slug: string;
  data: Frontmatter;
  body: string;
}

const EDUCATION_STATUSES: EducationStatus[] = [
  "completado",
  "en curso",
  "incompleto",
  "pendiente de confirmación",
];

function readEntries(dir: string): RawEntry[] {
  if (!existsSync(dir)) {
    return [];
  }

  return readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = readFileSync(path.join(dir, file), "utf8");
      const parsed = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        data: parsed.data as Frontmatter,
        body: parsed.content,
      };
    });
}

function requireString(data: Frontmatter, key: string, source: string): string {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Frontmatter inválido en "${source}": falta el campo "${key}".`);
  }
  return value;
}

function optionalString(data: Frontmatter, key: string): string | undefined {
  const value = data[key];
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

function stringList(data: Frontmatter, key: string): string[] {
  const value = data[key];
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function isAreaSlug(value: unknown): value is AreaSlug {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(AREA_LABELS, value)
  );
}

function isProjectStatus(value: unknown): value is ProjectStatus {
  return typeof value === "string" && PROJECT_STATUSES.includes(value as ProjectStatus);
}

function toProject(entry: RawEntry): Project {
  const source = `content/proyectos/${entry.slug}.mdx`;
  const area = entry.data.area;
  const status = entry.data.status;

  if (!isAreaSlug(area)) {
    throw new Error(`Frontmatter inválido en "${source}": "area" no es un área válida.`);
  }
  if (!isProjectStatus(status)) {
    throw new Error(`Frontmatter inválido en "${source}": "status" no es un estado válido.`);
  }

  return {
    slug: entry.slug,
    title: requireString(entry.data, "title", source),
    summary: requireString(entry.data, "summary", source),
    area,
    status,
    technologies: stringList(entry.data, "technologies"),
    featured: entry.data.featured === true,
    startDate: optionalString(entry.data, "startDate"),
    lastUpdated: requireString(entry.data, "lastUpdated", source),
    repoUrl: optionalString(entry.data, "repoUrl"),
    demoUrl: optionalString(entry.data, "demoUrl"),
    cover: optionalString(entry.data, "cover"),
    content: entry.body,
  };
}

function toEducationEntry(value: unknown, index: number): EducationEntry {
  const source = `content/formacion.md (entries[${index}])`;
  if (typeof value !== "object" || value === null) {
    throw new Error(`Entrada de formación inválida en "${source}".`);
  }

  const data = value as Frontmatter;
  const status = data.status;
  if (
    typeof status !== "string" ||
    !EDUCATION_STATUSES.includes(status as EducationStatus)
  ) {
    throw new Error(`Estado de formación inválido en "${source}".`);
  }

  return {
    institution: requireString(data, "institution", source),
    program: requireString(data, "program", source),
    level: requireString(data, "level", source),
    status: status as EducationStatus,
    startDate: optionalString(data, "startDate"),
    endDate: optionalString(data, "endDate"),
    confirmed: data.confirmed === true,
  };
}

export function getProfile(): Profile | null {
  const file = path.join(CONTENT_DIR, "perfil.md");
  if (!existsSync(file)) {
    return null;
  }

  const source = "content/perfil.md";
  const { data } = matter(readFileSync(file, "utf8"));
  const frontmatter = data as Frontmatter;

  return {
    name: requireString(frontmatter, "name", source),
    headline: requireString(frontmatter, "headline", source),
    summary: requireString(frontmatter, "summary", source),
    areas: stringList(frontmatter, "areas").filter(isAreaSlug),
    lastUpdated: requireString(frontmatter, "lastUpdated", source),
  };
}

export function getEducation(): EducationEntry[] {
  const file = path.join(CONTENT_DIR, "formacion.md");
  if (!existsSync(file)) {
    return [];
  }

  const { data } = matter(readFileSync(file, "utf8"));
  const entries = (data as Frontmatter).entries;
  if (!Array.isArray(entries)) {
    return [];
  }

  return entries.map(toEducationEntry);
}

export function getProjects(): Project[] {
  return readEntries(PROJECTS_DIR)
    .map(toProject)
    .sort((a, b) => {
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }
      return b.lastUpdated.localeCompare(a.lastUpdated);
    });
}

export function getProjectBySlug(slug: string): Project | null {
  return getProjects().find((project) => project.slug === slug) ?? null;
}

export function getProjectSummaries(): ProjectSummary[] {
  return getProjects().map(({ content: _content, ...summary }) => summary);
}
