import Link from "next/link";
import { NavLink } from "@/components/NavLink";
import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { getNavItems } from "@/lib/navigation";
import { getInitials, siteConfig } from "@/lib/site";
import { navLinkClass } from "@/lib/styles";
import { PORTFOLIO_COPY } from "@/lib/portfolio";

export function SiteHeader() {
  const items = getNavItems();
  const initials = getInitials(siteConfig.shortName);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <Container className="flex h-[68px] items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`Inicio — ${siteConfig.name}`}
          className="group flex min-w-0 items-center gap-[11px] rounded-lg focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <span
            aria-hidden="true"
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-accent text-[0.82rem] font-extrabold tracking-normal text-accent-contrast transition-colors group-hover:bg-accent-strong"
          >
            {initials}
          </span>
          <span className="min-w-0 truncate text-base font-extrabold tracking-[-0.02em] text-ink">
            {siteConfig.shortName}
            <small className="hidden truncate text-[0.7rem] font-semibold tracking-[0.02em] text-faint min-[621px]:block">
              {PORTFOLIO_COPY.brandSubtitle}
            </small>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav
            aria-label="Navegación principal"
            className="hidden shrink-0 items-center gap-1 min-[821px]:flex"
          >
            {items.map((item) => (
              <NavLink
                key={`${item.href}-${item.label}`}
                item={item}
                className={navLinkClass}
              />
            ))}
          </nav>

          <ThemeToggle />
          <MobileMenu items={items} />
        </div>
      </Container>
    </header>
  );
}
