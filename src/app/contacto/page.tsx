import type { Metadata } from "next";
import {
  BookOpen,
  Github,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PendingNotice } from "@/components/ui/PendingNotice";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Enlaces profesionales y medios de contacto.",
};

interface ContactLink {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  external: boolean;
}

function getContactLinks(): ContactLink[] {
  const links: ContactLink[] = [];

  if (siteConfig.links.github) {
    links.push({
      href: siteConfig.links.github,
      label: "GitHub",
      description: "Repositorios y actividad pública.",
      icon: Github,
      external: true,
    });
  }

  if (siteConfig.links.linkedin) {
    links.push({
      href: siteConfig.links.linkedin,
      label: "LinkedIn",
      description: "Trayectoria profesional.",
      icon: Linkedin,
      external: true,
    });
  }

  if (siteConfig.links.email) {
    links.push({
      href: `mailto:${siteConfig.links.email}`,
      label: "Email",
      description: "Contacto directo.",
      icon: Mail,
      external: false,
    });
  }

  if (siteConfig.links.blog) {
    links.push({
      href: siteConfig.links.blog,
      label: "Blog",
      description: "Avances y aprendizajes documentados.",
      icon: BookOpen,
      external: true,
    });
  }

  return links;
}

export default function ContactPage() {
  const links = getContactLinks();

  return (
    <Container>
      <PageHeader
        eyebrow="Contacto"
        title="Contacto"
        description="Enlaces profesionales configurados desde variables de entorno."
      />

      <div className="pb-16">
        {links.length === 0 ? (
          <PendingNotice>
            Los enlaces de contacto están pendientes de confirmación. Se
            configuran con las variables `NEXT_PUBLIC_GITHUB_URL`,
            `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_CONTACT_EMAIL` y
            `NEXT_PUBLIC_BLOG_URL`.
          </PendingNotice>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="block h-full rounded-lg"
                  >
                    <Card className="flex h-full items-start gap-4 p-5 transition-shadow hover:shadow-md">
                      <Icon
                        aria-hidden="true"
                        className="mt-0.5 h-5 w-5 shrink-0 text-slate-500"
                      />
                      <span className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-slate-900">
                          {link.label}
                        </span>
                        <span className="text-sm text-slate-600">
                          {link.description}
                        </span>
                      </span>
                    </Card>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Container>
  );
}
