import { siteConfig } from "@/lib/site";

export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

export function getNavItems(): NavItem[] {
  const items: NavItem[] = [
    { href: "/sobre-mi", label: "Sobre mí" },
    { href: "/proyectos", label: "Proyectos" },
    { href: "/formacion", label: "Formación" },
  ];

  if (siteConfig.links.blog) {
    items.push({ href: siteConfig.links.blog, label: "Blog", external: true });
  }

  items.push({ href: "/contacto", label: "Contacto" });

  return items;
}
