"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import type { NavItem } from "@/lib/navigation";
import { navLinkActiveClass } from "@/lib/styles";

interface NavLinkProps {
  item: NavItem;
  className?: string;
  activeClassName?: string;
  onNavigate?: () => void;
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({
  item,
  className,
  activeClassName = navLinkActiveClass,
  onNavigate,
}: NavLinkProps) {
  const pathname = usePathname();
  const [sectionActive, setSectionActive] = useState(false);
  const onHome = pathname === "/";
  const active = item.sectionId
    ? onHome && sectionActive
    : !item.external && isActivePath(pathname, item.href);

  useEffect(() => {
    if (!item.sectionId || !onHome) {
      setSectionActive(false);
      return;
    }

    const section = document.getElementById(item.sectionId);

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSectionActive(true);
        else setSectionActive(false);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [item.sectionId, onHome]);

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
        className={clsx("inline-flex items-center gap-1", className)}
      >
        {item.label}
        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? (item.sectionId ? "location" : "page") : undefined}
      className={clsx(className, active && activeClassName)}
    >
      {item.label}
    </Link>
  );
}
