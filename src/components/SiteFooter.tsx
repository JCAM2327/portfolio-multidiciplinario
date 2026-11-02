import { Github, Linkedin, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

const linkClass =
  "inline-flex items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-slate-900";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          © {year} {siteConfig.name}. Sitio en construcción.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {siteConfig.links.github ? (
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <Github aria-hidden="true" className="h-4 w-4" />
              GitHub
            </a>
          ) : null}

          {siteConfig.links.linkedin ? (
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <Linkedin aria-hidden="true" className="h-4 w-4" />
              LinkedIn
            </a>
          ) : null}

          {siteConfig.links.email ? (
            <a href={`mailto:${siteConfig.links.email}`} className={linkClass}>
              <Mail aria-hidden="true" className="h-4 w-4" />
              Contacto
            </a>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
