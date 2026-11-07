"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { iconButtonClass } from "@/lib/styles";

type Theme = "light" | "dark";

function syncThemeColor(theme: Theme) {
  const color = theme === "dark" ? "#060a0e" : "#f7f7f4";

  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute("content", color));
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";

    setTheme(current);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = next;

    try {
      localStorage.setItem("theme", next);
    } catch {
      /* almacenamiento no disponible */
    }

    syncThemeColor(next);
    setTheme(next);
  }

  const label =
    theme === "dark" ? "Activar tema claro" : "Activar tema oscuro";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={iconButtonClass}
    >
      {theme === "dark" ? (
        <Moon aria-hidden="true" className="h-[18px] w-[18px]" />
      ) : (
        <Sun aria-hidden="true" className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
