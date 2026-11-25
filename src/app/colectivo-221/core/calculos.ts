// ============================================================================
// COLECTIVO 221 — LÓGICA DE ESTIMACIÓN (core)
// Funciones puras: reciben datos como parámetros, no leen localStorage directamente.
// ============================================================================
import type { Reporte, Sentido, FiltroHorario, EstimacionLlegada } from "./types";
import { FILTRO_HORARIO_POR_DEFECTO } from "./types";

function enFranjaHoraria(fecha: string, filtro: FiltroHorario): boolean {
  const hora = new Date(fecha).getHours();
  if (hora >= 6 && hora < 12) return filtro.manana;
  if (hora >= 12 && hora < 18) return filtro.tarde;
  if (hora >= 18 && hora < 24) return filtro.noche;
  return filtro.madrugada; // 00:00 - 06:00
}

export function filtrarReportes(
  reportes: Reporte[],
  sentido?: Sentido,
  filtro: FiltroHorario = FILTRO_HORARIO_POR_DEFECTO
): Reporte[] {
  return reportes
    .filter((r) => (sentido ? r.sentido === sentido : true))
    .filter((r) => enFranjaHoraria(r.timestamp, filtro))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

/**
 * Promedio de minutos entre reportes consecutivos del mismo sentido y parada.
 * Ahora recibe la parada explícitamente para no mezclar tramos distintos.
 */
export function promedioMinutosEntreReportes(
  reportes: Reporte[],
  parada?: string,
  sentido?: Sentido,
  filtro: FiltroHorario = FILTRO_HORARIO_POR_DEFECTO
): number | null {
  const filtrados = filtrarReportes(reportes, sentido, filtro)
    .filter((r) => (parada ? r.parada.toLowerCase() === parada.toLowerCase() : true));

  if (filtrados.length < 2) return null;

  const diferencias: number[] = [];
  for (let i = 0; i < filtrados.length - 1; i++) {
    const t1 = new Date(filtrados[i].timestamp).getTime();
    const t2 = new Date(filtrados[i + 1].timestamp).getTime();
    const diffMin = Math.abs(t1 - t2) / (1000 * 60);
    if (diffMin > 0 && diffMin < 180) {
      diferencias.push(diffMin);
    }
  }

  if (diferencias.length === 0) return null;
  const suma = diferencias.reduce((a, b) => a + b, 0);
  return Math.round(suma / diferencias.length);
}

/**
 * Minutos transcurridos desde el último reporte en una parada y sentido dados.
 */
export function minutosDesdeUltimoReporte(
  reportes: Reporte[],
  parada: string,
  sentido: Sentido
): number | null {
  const filtrados = filtrarReportes(reportes, sentido);
  const ultimo = filtrados.find(
    (r) => r.parada.toLowerCase() === parada.toLowerCase()
  );
  if (!ultimo) return null;
  const diff = Date.now() - new Date(ultimo.timestamp).getTime();
  return Math.round(diff / (1000 * 60));
}

/**
 * Calcula el nivel de confianza basado en antigüedad y cantidad de reportes.
 */
export function calcularConfianza(
  minutosDesdeUltimo: number | null,
  totalReportes: number,
  desviacionEstandar: number
): EstimacionLlegada["confianza"] {
  if (!minutosDesdeUltimo || totalReportes === 0) return "ninguna";
  if (minutosDesdeUltimo < 10 && totalReportes >= 5 && desviacionEstandar < 15) {
    return "alta";
  }
  if (minutosDesdeUltimo < 30 && totalReportes >= 2) {
    return "media";
  }
  return "baja";
}

/**
 * Devuelve una estimación textual de llegada basada en el último reporte
 * y el promedio histórico de frecuencia.
 */
export function estimarLlegada(
  reportes: Reporte[],
  parada: string,
  sentido: Sentido
): EstimacionLlegada {
  const minutosDesdeUltimo = minutosDesdeUltimoReporte(reportes, parada, sentido);
  const promedioFrecuencia = promedioMinutosEntreReportes(reportes, parada, sentido);
  const reportesParadaSentido = reportes.filter(
    (r) => r.parada.toLowerCase() === parada.toLowerCase() && r.sentido === sentido
  );

  if (!minutosDesdeUltimo) {
    return {
      minutosDesdeUltimo: null,
      promedioFrecuencia,
      estimado: "No hay reportes recientes en esta parada.",
      confianza: "ninguna",
    };
  }

  const ultimoEstado = [
    ...reportesParadaSentido,
  ].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )[0]?.estado;

  let estimado: string;
  if (ultimoEstado === "Está llegando") {
    estimado = `Lleva ${minutosDesdeUltimo} minutos reportándose "Está llegando". Podría llegar en cualquier momento.`;
  } else if (ultimoEstado === "Estoy arriba") {
    estimado = `El colectivo pasó por esta parada hace ${minutosDesdeUltimo} minutos (alguien viajaba arriba).`;
  } else {
    estimado = `Último reporte: hace ${minutosDesdeUltimo} minutos ("${ultimoEstado}").`;
  }

  if (promedioFrecuencia) {
    estimado += ` Históricamente, los reportes en este sentido se espacian unos ${promedioFrecuencia} minutos en promedio.`;
  }

  const confianza = calcularConfianza(
    minutosDesdeUltimo,
    reportesParadaSentido.length,
    0 // Desviación estándar simplificada para MVP
  );

  return { minutosDesdeUltimo, promedioFrecuencia, estimado, confianza };
}