import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PORTFOLIO_COPY } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface py-[30px]">
      <Container className="flex flex-wrap items-center justify-between gap-[14px] text-[0.82rem] text-faint">
        <p>
          © {year} {siteConfig.name}. {PORTFOLIO_COPY.footer.note}
        </p>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>{PORTFOLIO_COPY.footer.pending}</span>
          <span aria-hidden="true">·</span>
          <Link
            href="/proyectos"
            className="font-semibold text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
          >
            Proyectos
          </Link>
          <span aria-hidden="true">·</span>
          <Link
            href="/#inicio"
            className="font-semibold text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
          >
            {PORTFOLIO_COPY.footer.backToTop}
          </Link>
        </p>
      </Container>
    </footer>
  );
}
