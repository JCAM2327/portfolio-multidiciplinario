import Link from "next/link";
import { NavLink } from "@/components/NavLink";
import { MobileMenu } from "@/components/MobileMenu";
import { Container } from "@/components/ui/Container";
import { getNavItems } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";

const navLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900";

export function SiteHeader() {
  const items = getNavItems();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="truncate text-sm font-semibold tracking-tight text-slate-900 sm:text-base"
        >
          {siteConfig.name}
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-1 md:flex"
        >
          {items.map((item) => (
            <NavLink
              key={`${item.href}-${item.label}`}
              item={item}
              className={navLinkClass}
            />
          ))}
        </nav>

        <MobileMenu items={items} />
      </Container>
    </header>
  );
}
