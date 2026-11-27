"use client";

import { useState, useMemo } from "react";
import { AlertTriangle } from "lucide-react";
import type { Sentido } from "@/app/colectivo-221/core/types";
import { SENTIDOS } from "@/app/colectivo-221/core/types";
import { obtenerParadaPorId } from "@/app/colectivo-221/core/datos";
import { SelectorSentido } from "./SelectorSentido";
import { ListadoParadas } from "./ListadoParadas";
import { PanelParadaSeleccionada } from "./PanelParadaSeleccionada";
import { SeccionMapa } from "./SeccionMapa";

export function VistaRecorrido() {
  const [sentidoSeleccionado, setSentidoSeleccionado] = useState<Sentido>(
    SENTIDOS[0].value
  );
  const [paradaSeleccionadaId, setParadaSeleccionadaId] = useState<
    string | null
  >(null);

  const paradaSeleccionada = useMemo(() => {
    if (!paradaSeleccionadaId) return null;
    return obtenerParadaPorId(paradaSeleccionadaId) ?? null;
  }, [paradaSeleccionadaId]);

  return (
    <section className="mt-12 sm:mt-16">
      <div
        className="rounded-panel border border-line bg-surface p-6 sm:p-8 shadow-card flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
      >
        <div className="flex flex-col gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-2.5 py-0.5 text-[0.7rem] font-bold text-accent">
            Línea 221
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/20 bg-warning/5 px-2.5 py-0.5 text-[0.7rem] font-bold text-warning">
            <AlertTriangle className="h-3 w-3" aria-hidden="true" />
            Prototipo experimental
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm font-semibold text-ink">
          <span className="text-muted">Mar del Plata</span>
          <span className="text-muted">→</span>
          <span className="text-muted">Santa Clara del Mar</span>
        </div>
      </div>

      <div className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-12">
        <div className="sm:col-span-4 lg:col-span-5 space-y-4">
          <SelectorSentido
            sentido={sentidoSeleccionado}
            onCambio={(s) => {
              setSentidoSeleccionado(s);
              setParadaSeleccionadaId(null);
            }}
          />
          <ListadoParadas
            sentido={sentidoSeleccionado}
            onSeleccionar={(p) => setParadaSeleccionadaId(p.id)}
            paradaSeleccionadaId={paradaSeleccionadaId}
          />
        </div>

        <div className="sm:col-span-8 lg:col-span-7 space-y-4">
          <PanelParadaSeleccionada parada={paradaSeleccionada} />
          <SeccionMapa />
        </div>
      </div>

      <div className="mt-8 sm:mt-10 rounded-control border border-warning/30 bg-warning/5 p-4 text-sm text-warning text-center">
        <AlertTriangle className="h-4 w-4 mx-auto mb-2" aria-hidden="true" />
        <p className="font-medium">Datos de referencia — no oficiales</p>
        <p className="text-[0.8rem] mt-1">
          Las paradas se extraen del catálogo de referencia de la línea 221
          (PDF de Moovit, terceros). No son información oficial ni han sido
          validadas en campo. Cada parada muestra su estado de validación.
          Fuente:{" "}
          <a
            href="https://moovitapp.com/index/es-419/transporte_p%C3%BAblico-line-221-Mar_del_Plata-5055-1149591-720498-5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline"
          >
            Moovit
          </a>
          .
        </p>
      </div>
    </section>
  );
}
