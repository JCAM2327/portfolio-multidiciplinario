"use client";

import { useState, useCallback, useMemo } from "react";
import { Bus, ArrowRight, Filter } from "lucide-react";
import type { Reporte, Sentido, FiltroHorario } from "@/app/colectivo-221/core/types";
import { FILTRO_HORARIO_POR_DEFECTO } from "@/app/colectivo-221/core/types";
import { listarReportes } from "@/app/colectivo-221/services/reportes";
import { filtrarReportes } from "@/app/colectivo-221/core/calculos";
import { estimarLlegadaParaParada } from "@/app/colectivo-221/services/reportes";
import { ParadaCard } from "./ParadaCard";
import { chipClass } from "@/lib/styles";

export function TableroLlegadas() {
  const [sentidoSeleccionado, setSentidoSeleccionado] = useState<Sentido | "todos">("todos");
  const [filtro, setFiltro] = useState<FiltroHorario>(FILTRO_HORARIO_POR_DEFECTO);

  const todosReportes = listarReportes();
  const reportesFiltrados = useMemo(() => {
    const sentido = sentidoSeleccionado === "todos" ? undefined : sentidoSeleccionado;
    return filtrarReportes(todosReportes, sentido, filtro);
  }, [todosReportes, sentidoSeleccionado, filtro]);

  // Agrupar por parada y sentido
  const paradasAgrupadas = useMemo(() => {
    const mapa = new Map<string, Reporte[]>();
    for (const reporte of reportesFiltrados) {
      const clave = `${reporte.parada.toLowerCase()}::${reporte.sentido}`;
      const existente = mapa.get(clave) ?? [];
      existente.push(reporte);
      mapa.set(clave, existente);
    }
    return Array.from(mapa.entries()).map(([clave, reportes]) => {
      const [parada, sentido] = clave.split("::") as [string, Sentido];
      return { parada, sentido, reportes };
    });
  }, [reportesFiltrados]);

  const toggleFranja = useCallback(
    (clave: keyof FiltroHorario) => {
      setFiltro((prev) => ({ ...prev, [clave]: !prev[clave] }));
    },
    []
  );

  if (paradasAgrupadas.length === 0) {
    return (
      <div className="rounded-panel border border-line bg-surface p-8 text-center text-muted">
        <Bus className="h-8 w-8 mx-auto mb-3 opacity-40" aria-hidden="true" />
        <p>No hay reportes aún. Sé el primero en reportar una parada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Filter className="h-4 w-4" aria-hidden="true" />
          Sentido:
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={() => setSentidoSeleccionado("todos")}
            className={chipClass}
          >
            Todos
          </button>
          {[
            "Mar del Plata → Santa Clara",
            "Santa Clara → Mar del Plata",
          ].map((s) => (
            <button
              key={s}
              onClick={() => setSentidoSeleccionado(s as Sentido)}
              className={chipClass}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 sm:flex-wrap">
        {[
          { clave: "manana", label: "Mañana (6–12)" },
          { clave: "tarde", label: "Tarde (12–18)" },
          { clave: "noche", label: "Noche (18–24)" },
          { clave: "madrugada", label: "Madrugada (0–6)" },
        ].map((f) => (
          <button
            key={f.clave}
            onClick={() => toggleFranja(f.clave as keyof FiltroHorario)}
            className={`inline-flex items-center gap-1.5 rounded-control border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-muted transition-colors ${
              filtro[f.clave as keyof FiltroHorario]
                ? "border-accent bg-accent-soft text-accent-contrast"
                : "hover:border-line-strong hover:bg-surface-muted"
            }`}
          >
            {filtro[f.clave as keyof FiltroHorario] ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />{" "}
                {f.label} ✓
              </>
            ) : (
              f.label
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {paradasAgrupadas.map(({ parada, sentido, reportes }) => {
          const ultimo = reportes[0];
          const { estimado } = estimarLlegadaParaParada(parada, sentido);
          return (
            <ParadaCard
              key={`${parada}::${sentido}`}
              parada={parada}
              sentido={sentido}
            />
          );
        })}
      </div>

      <p className="text-xs text-muted">
        {paradasAgrupadas.length} parada{paradasAgrupadas.length === 1 ? "" : "s"} con reporte en el filtro seleccionado.
        en el filtro seleccionado.
      </p>
    </div>
  );
}