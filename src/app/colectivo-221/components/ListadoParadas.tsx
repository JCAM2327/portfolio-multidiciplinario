"use client";

import { BusFront, MapPin, ChevronRight } from "lucide-react";
import type { Parada, Sentido } from "@/app/colectivo-221/core/types";
import {
  obtenerParadasPorSentido,
  obtenerFuenteParadas,
  VARIANTE_POR_DEFECTO,
} from "@/app/colectivo-221/core/datos";

interface ListadoParadasProps {
  sentido: Sentido;
  onSeleccionar: (parada: Parada) => void;
  paradaSeleccionadaId: string | null;
}

function etiquetaValidacion(valida: boolean): string {
  return valida ? "validada" : "no validada en campo";
}

export function ListadoParadas({
  sentido,
  onSeleccionar,
  paradaSeleccionadaId,
}: ListadoParadasProps) {
  const paradas = obtenerParadasPorSentido(sentido, VARIANTE_POR_DEFECTO);
  const fuente = obtenerFuenteParadas();

  if (paradas.length === 0) {
    return (
      <div className="rounded-panel border border-line bg-surface p-5 sm:p-6 shadow-card">
        <h3 className="text-sm font-bold text-ink mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
          Paradas del recorrido
        </h3>
        <div className="rounded-control border border-line bg-surface-muted p-6 text-center text-muted">
          <BusFront className="h-6 w-6 mx-auto mb-2 opacity-40" aria-hidden="true" />
          <p className="text-sm">No hay paradas cargadas para este sentido.</p>
          <p className="text-[0.8rem] mt-1">
            El tramo {VARIANTE_POR_DEFECTO} todavía no tiene paradas en este
            sentido.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-panel border border-line bg-surface p-5 sm:p-6 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
        <h3 className="text-sm font-bold text-ink flex items-center gap-2">
          <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
          Paradas del recorrido
        </h3>
        <div className="text-right hidden sm:block">
          <p className="text-[0.7rem] font-semibold text-muted">
            Fuente: {fuente.nombre}
          </p>
          <p className="text-[0.7rem] text-muted">
            {fuente.tipo} · {etiquetaValidacion(paradas[0].validadaCampo)}
          </p>
        </div>
      </div>
      <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {paradas.map((p) => {
          const estaSeleccionada = paradaSeleccionadaId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSeleccionar(p)}
              className={`w-full flex items-center justify-between gap-3 rounded-control border px-3 py-2.5 text-sm transition-colors ${
                estaSeleccionada
                  ? "border-accent bg-accent-soft text-accent-contrast"
                  : "border-line bg-surface text-ink hover:border-line-strong hover:bg-surface-muted"
              }`}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-[0.72rem] font-medium text-muted block">
                  {p.orden}°
                </span>
                <span className="font-medium truncate">{p.nombre}</span>
                <span className="ml-auto text-[0.68rem] font-semibold text-muted">
                  {etiquetaValidacion(p.validadaCampo)}
                </span>
              </div>
              <ChevronRight
                className={`h-3.5 w-3.5 transition-transform ${estaSeleccionada ? "rotate-90" : ""}`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </ul>
      <p className="mt-3 text-[0.8rem] text-muted">
        {paradas.length} parada{paradas.length === 1 ? "" : "s"} · tramo{" "}
        {VARIANTE_POR_DEFECTO} · {fuente.tipo} ·{" "}
        <a
          href={fuente.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline"
        >
          ver fuente
        </a>
        · {fuente.observaciones ?? ""}
      </p>
    </div>
  );
}
