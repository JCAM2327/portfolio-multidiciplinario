// ============================================================================
// COLECTIVO 221 — SERVICIO DE REPORTES (services)
// Capa de aplicación: orquesta core/store + core/calculos para la UI.
// ============================================================================
import type { Reporte, EstadoReporte, Sentido, EstimacionLlegada } from "../core/types";
import {
  agregarReporte,
  obtenerReportes,
  obtenerReportesPorParadaYSentido,
  obtenerUltimoReporte,
} from "../core/store";
import {
  estimarLlegada,
  promedioMinutosEntreReportes,
  minutosDesdeUltimoReporte,
} from "../core/calculos";

export function registrarReporte({
  parada,
  sentido,
  estado,
}: {
  parada: string;
  sentido: Sentido;
  estado: EstadoReporte;
}): Reporte {
  return agregarReporte({ parada, sentido, estado });
}

export function listarReportes(): Reporte[] {
  return obtenerReportes();
}

export function obtenerReporteUltimo(
  parada: string,
  sentido: Sentido
): Reporte | null {
  return obtenerUltimoReporte(parada, sentido);
}

export function obtenerEstadisticaFrecuencia(
  parada: string,
  sentido: Sentido
): { promedio: number | null; totalReportes: number } {
  const reportes = obtenerReportes();
  const promedio = promedioMinutosEntreReportes(reportes, parada, sentido);
  const total = reportes.filter(
    (r) => r.parada.toLowerCase() === parada.toLowerCase() && r.sentido === sentido
  ).length;
  return { promedio, totalReportes: total };
}

export function estimarLlegadaParaParada(
  parada: string,
  sentido: Sentido
): EstimacionLlegada {
  const reportes = obtenerReportes();
  return estimarLlegada(reportes, parada, sentido);
}

export function minutosDesdeUltimo(
  parada: string,
  sentido: Sentido
): number | null {
  const reportes = obtenerReportes();
  return minutosDesdeUltimoReporte(reportes, parada, sentido);
}