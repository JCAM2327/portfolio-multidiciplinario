"use client";

import { BusFront } from "lucide-react";
import type { Parada } from "@/app/colectivo-221/core/types";

interface PanelParadaSeleccionadaProps {
  parada: Parada | null;
}

function etiquetaValidacion(valida: boolean): string {
  return valida ? "validada en campo" : "no validada en campo";
}

export function PanelParadaSeleccionada({ parada }: PanelParadaSeleccionadaProps) {
  if (!parada) {
    return (
      <div className="rounded-panel border border-line bg-surface p-5 sm:p-6 shadow-card">
        <h3 className="text-sm font-bold text-ink mb-3 flex items-center gap-2">
          <BusFront className="h-4 w-4 text-accent" aria-hidden="true" />
          Seleccioná una parada
        </h3>
        <div className="rounded-control border border-line bg-surface-muted p-8 text-center text-muted space-y-3">
          <span className="text-muted" aria-hidden="true">
            📍
          </span>
          <p className="text-sm">No hay ninguna parada seleccionada.</p>
          <p className="text-[0.8rem]">
            Tocá una parada de la lista para ver su información.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-panel border border-line bg-surface p-5 sm:p-6 shadow-card">
      <h3 className="text-sm font-bold text-ink mb-3 flex items-center gap-2">
        <BusFront className="h-4 w-4 text-accent" aria-hidden="true" />
        Información de la parada
      </h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 rounded-control border border-accent bg-accent/5 p-2">
            <BusFront className="h-5 w-5 text-accent" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-ink">{parada.nombre}</p>
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">
              {etiquetaValidacion(parada.validadaCampo)}
            </span>
            <p className="mt-1 text-sm text-muted">
              Orden {parada.orden} en el sentido{" "}
              {parada.sentido} · variante {parada.variante}
            </p>
          </div>
        </div>

        <div className="rounded-control border border-line bg-surface-muted p-4">
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
            Estado del servicio
          </p>
          <p className="text-sm text-ink">
            Sin datos de tiempo real disponibles. Esta parada proviene del
            catálogo de referencia; no hay reportes ni horarios asociados.
          </p>
        </div>

        <div className="rounded-control border border-line-strong bg-surface p-3">
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
            Trazabilidad
          </p>
          <ul className="list-disc list-inside text-sm text-muted space-y-1">
            <li>
              Variante: <span className="font-semibold">{parada.variante}</span>
            </li>
            <li>
              Validación:{" "}
              <span className={parada.validadaCampo ? "text-success" : "text-warning"}>
                {etiquetaValidacion(parada.validadaCampo)}
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-control border border-line-strong bg-surface p-3">
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
            Próximos pasos
          </p>
          <ul className="list-disc list-inside text-sm text-muted space-y-1">
            <li>Validar parada en campo</li>
            <li>Integrar mapa interactivo del recorrido</li>
            <li>Conectar reportes ciudadanos a esta vista</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
