"use client";

import { Bus, MapPin } from "lucide-react";

export function SeccionMapa() {
  return (
    <div className="rounded-panel border border-line bg-surface p-5 sm:p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-ink flex items-center gap-2">
          <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
          Mapa del recorrido
        </h3>
        <span className="text-[0.7rem] font-bold text-warning uppercase tracking-wider">
          Placeholder
        </span>
      </div>
      <div className="aspect-[4/3] rounded-control border-2 border-dashed border-line bg-surface-muted flex flex-col items-center justify-center text-muted relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
          <Bus className="h-12 w-12" aria-hidden="true" />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="text-sm font-semibold text-ink mb-1">
            Mapa del recorrido — línea 221
          </p>
          <p className="text-xs">
            Integración futura: sin coordenadas verificadas aún.
          </p>
          <p className="text-[0.72rem] mt-2 text-warning">
            ⚠ Esta área se completará cuando existan datos de ruta oficiales.
            No se muestran coordenadas inventadas.
          </p>
        </div>
      </div>
    </div>
  );
}
