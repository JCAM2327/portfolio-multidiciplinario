"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import type { NavItem } from "@/lib/navigation";
import { iconButtonClass, navLinkClass } from "@/lib/styles";

interface MobileMenuProps {
  items: NavItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 821px)");

    function handleDesktopChange(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    desktop.addEventListener("change", handleDesktopChange);

    return () => desktop.removeEventListener("change", handleDesktopChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="min-[821px]:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className={iconButtonClass}
      >
        {open ? (
          <X aria-hidden="true" className="h-[18px] w-[18px]" />
        ) : (
          <Menu aria-hidden="true" className="h-[18px] w-[18px]" />
        )}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute left-4 right-4 top-[calc(100%+8px)] max-h-[calc(100vh-88px)] overflow-y-auto rounded-[14px] border border-line bg-surface p-2.5 shadow-card"
      >
        <nav aria-label="Navegación móvil" className="flex flex-col gap-1">
          {items.map((item) => (
            <NavLink
              key={`${item.href}-${item.label}`}
              item={item}
              onNavigate={() => setOpen(false)}
              className={`${navLinkClass} px-3 py-[11px]`}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
