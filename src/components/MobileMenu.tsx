"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import type { NavItem } from "@/lib/navigation";

interface MobileMenuProps {
  items: NavItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-100"
      >
        {open ? (
          <X aria-hidden="true" className="h-5 w-5" />
        ) : (
          <Menu aria-hidden="true" className="h-5 w-5" />
        )}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-slate-200 bg-white shadow-sm"
      >
        <nav aria-label="Navegación móvil" className="flex flex-col gap-1 p-4">
          {items.map((item) => (
            <NavLink
              key={`${item.href}-${item.label}`}
              item={item}
              onNavigate={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
