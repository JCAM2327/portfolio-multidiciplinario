"use client";

import { Bus } from "lucide-react";
import type { Sentido } from "@/app/colectivo-221/core/types";
import { SENTIDOS } from "@/app/colectivo-221/core/types";

interface SelectorSentidoProps {
  sentido: Sentido;
  onCambio: (sentido: Sentido) => void;
}

export function SelectorSentido({ sentido, onCambio }: SelectorSentidoProps) {
  return (
    <div className="rounded-panel border border-line bg-surface p-5 sm:p-6 shadow-card">
      <h3 className="text-sm font-bold text-ink mb-3 flex items-center gap-2">
        <Bus className="h-4 w-4 text-accent" aria-hidden="true" />
        Seleccioná el sentido
      </h3>
      <div className="flex gap-2">
        {SENTIDOS.map((s) => (
          <button
            key={s.value}
            onClick={() => onCambio(s.value)}
            className={`flex-1 rounded-control border px-3 py-2 text-sm font-semibold transition-colors ${
              sentido === s.value
                ? "border-accent bg-accent-soft text-accent-contrast"
                : "border-line bg-surface text-ink hover:border-line-strong hover:bg-surface-muted"
            }`}
          >
            {s.value === "Mar del Plata → Santa Clara" ? "MDP → SC" : "SC → MDP"}
          </button>
        ))}
      </div>
      <p className="mt-3 text-[0.8rem] text-muted">
        Este selector define en qué dirección circula el colectivo. Las paradas
        se ordenan según ese sentido.
      </p>
    </div>
  );
}
