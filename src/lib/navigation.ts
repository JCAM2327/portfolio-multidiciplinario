import { siteConfig } from "@/lib/site";

export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
  sectionId?: string;
}

export type SocialKind = "github" | "linkedin" | "email" | "blog";

export interface SocialLink {
  href: string;
  label: string;
  kind: SocialKind;
  external: boolean;
}

export const SECTION_NAV: NavItem[] = [
  { href: "/#sobre-mi", label: "Sobre mí", sectionId: "sobre-mi" },
  { href: "/#enfoque", label: "Enfoque", sectionId: "enfoque" },
  { href: "/#formacion", label: "Formación", sectionId: "formacion" },
  { href: "/#habilidades", label: "Habilidades", sectionId: "habilidades" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/#contacto", label: "Contacto", sectionId: "contacto" },
];

export const ROUTE_NAV: NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/sobre-mi", label: "Perfil" },
  { href: "/formacion", label: "Formación" },
  { href: "/contacto", label: "Contacto" },
];

export function getNavItems(): NavItem[] {
  const items = [...SECTION_NAV];

  if (siteConfig.links.blog) {
    items.push({ href: siteConfig.links.blog, label: "Blog", external: true });
  }

  return items;
}

export function getFooterNavItems(): NavItem[] {
  return ROUTE_NAV;
}

export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [];

  if (siteConfig.links.github) {
    links.push({
      href: siteConfig.links.github,
      label: "GitHub",
      kind: "github",
      external: true,
    });
  }

  if (siteConfig.links.linkedin) {
    links.push({
      href: siteConfig.links.linkedin,
      label: "LinkedIn",
      kind: "linkedin",
      external: true,
    });
  }

  if (siteConfig.links.email) {
    links.push({
      href: `mailto:${siteConfig.links.email}`,
      label: "Email",
      kind: "email",
      external: false,
    });
  }

  if (siteConfig.links.blog) {
    links.push({
      href: siteConfig.links.blog,
      label: "Blog",
      kind: "blog",
      external: true,
    });
  }

  return links;
}
