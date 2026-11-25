"use client";

import { Bus, Clock, CheckCircle2 } from "lucide-react";
import type { EstadoReporte, Sentido } from "@/app/colectivo-221/core/types";
import { obtenerReportesPorParadaYSentido } from "@/app/colectivo-221/core/store";
import { estimarLlegadaParaParada, minutosDesdeUltimo } from "@/app/colectivo-221/services/reportes";
import { tagClass } from "@/lib/styles";

function iconoPorEstado(estado: EstadoReporte | null) {
  switch (estado) {
    case "Está llegando":
      return <Bus className="h-4 w-4" aria-hidden="true" />;
    case "Estoy arriba":
      return <CheckCircle2 className="h-4 w-4" aria-hidden="true" />;
    case "Recién pasó":
      return <Clock className="h-4 w-4" aria-hidden="true" />;
    default:
      return <Clock className="h-4 w-4" aria-hidden="true" />;
  }
}

function tonoEstado(estado: EstadoReporte | null) {
  switch (estado) {
    case "Está llegando":
      return "border-warning bg-warning/10 text-warning";
    case "Estoy arriba":
      return "border-success bg-success/10 text-success";
    default:
      return "border-line bg-surface-muted text-muted";
  }
}

interface ParadaCardProps {
  parada: string;
  sentido: Sentido;
}

export function ParadaCard({ parada, sentido }: ParadaCardProps) {
  const reportes = obtenerReportesPorParadaYSentido(parada, sentido);
  const ultimo = reportes[0];
  const estado = ultimo?.estado ?? null;
  const minutos = minutosDesdeUltimo(parada, sentido);
  const { estimado } = estimarLlegadaParaParada(parada, sentido);

  return (
    <article className={tagClass} style={{ padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius-card)" }}>
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold text-ink">{parada}</span>
        <span className={tonoEstado(estado)}>{estado ?? "Sin reportes"}</span>
      </div>

      {estado ? (
        <div className="flex items-center gap-2 text-sm text-muted">
          {iconoPorEstado(estado)}
          <span>
            {minutos === null
              ? "Sin reporte reciente"
              : minutos === 0
              ? "Ahora mismo"
              : `Hace ${minutos} min`}
          </span>
        </div>
      ) : (
        <p className="text-sm text-muted">Sin reportes en esta parada.</p>
      )}

      <p className="text-[0.82rem] leading-relaxed text-muted">{estimado}</p>
    </article>
  );
}