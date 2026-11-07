import type { Metadata } from "next";
import {
  ArrowUpRight,
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
import { PORTFOLIO_COPY } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Enlaces profesionales y medios de contacto.",
  alternates: { canonical: "/contacto" },
};

interface ContactChannel {
  href?: string;
  label: string;
  description: string;
  pendingDescription: string;
  icon: LucideIcon;
  external: boolean;
}

function getContactChannels(): ContactChannel[] {
  const channels: ContactChannel[] = [
    {
      href: siteConfig.links.github,
      label: "GitHub",
      description: "Repositorios y actividad pública.",
      pendingDescription: "Perfil público pendiente de configurar.",
      icon: Github,
      external: true,
    },
    {
      href: siteConfig.links.linkedin,
      label: "LinkedIn",
      description: "Trayectoria profesional.",
      pendingDescription: "Perfil pendiente de configurar.",
      icon: Linkedin,
      external: true,
    },
    {
      href: siteConfig.links.email
        ? `mailto:${siteConfig.links.email}`
        : undefined,
      label: "Email",
      description: "Contacto directo.",
      pendingDescription: "Dirección pendiente de configurar.",
      icon: Mail,
      external: false,
    },
  ];

  if (siteConfig.links.blog) {
    channels.push({
      href: siteConfig.links.blog,
      label: "Blog",
      description: "Avances y aprendizajes documentados.",
      pendingDescription: "URL pendiente de configurar.",
      icon: BookOpen,
      external: true,
    });
  }

  return channels;
}

export default function ContactPage() {
  const { contact } = PORTFOLIO_COPY;
  const channels = getContactChannels();
  const activeChannels = channels.filter((channel) => channel.href);

  return (
    <Container>
      <PageHeader
        eyebrow={contact.eyebrow}
        title={contact.title}
        description={contact.lead}
      />

      <div className="flex flex-col gap-6 pb-16 pt-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => {
            const Icon = channel.icon;

            if (!channel.href) {
              return (
                <li key={channel.label}>
                  <div className="flex h-full items-start gap-4 rounded-card border border-dashed border-line-strong bg-surface/60 p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-muted text-faint">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="text-sm font-semibold text-ink">
                        {channel.label}
                      </span>
                      <span className="text-sm leading-relaxed text-muted">
                        {channel.pendingDescription}
                      </span>
                      <span className="mt-1 w-fit rounded-full border border-line bg-surface-muted px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-[0.04em] text-faint">
                        {contact.pendingValue}
                      </span>
                    </span>
                  </div>
                </li>
              );
            }

            return (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group block h-full rounded-card focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                >
                  <Card className="flex h-full items-start gap-4 p-5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-accent/40 group-hover:shadow-md motion-reduce:transform-none">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-line bg-accent-soft text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-contrast">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-ink">
                          {channel.label}
                        </span>
                        {channel.external ? (
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent motion-reduce:transform-none"
                          />
                        ) : null}
                      </span>
                      <span className="text-sm leading-relaxed text-muted">
                        {channel.description}
                      </span>
                    </span>
                  </Card>
                </a>
              </li>
            );
          })}
        </ul>

        {activeChannels.length === 0 ? (
          <PendingNotice>
            Los enlaces de contacto están pendientes de confirmación. Se
            configuran con las variables `NEXT_PUBLIC_GITHUB_URL`,
            `NEXT_PUBLIC_LINKEDIN_URL` y `NEXT_PUBLIC_CONTACT_EMAIL`.
          </PendingNotice>
        ) : null}
      </div>
    </Container>
  );
}
