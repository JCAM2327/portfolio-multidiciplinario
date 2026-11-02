"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import type { NavItem } from "@/lib/navigation";

interface NavLinkProps {
  item: NavItem;
  className?: string;
  onNavigate?: () => void;
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({ item, className, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const active = !item.external && isActivePath(pathname, item.href);
  const activeClass =
    "underline decoration-blue-600 decoration-2 underline-offset-4";

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
      aria-current={active ? "page" : undefined}
      className={clsx(className, active && activeClass)}
    >
      {item.label}
    </Link>
  );
}
