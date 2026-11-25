// ============================================================================
// COLECTIVO 221 — DATOS DE REFERENCIA (core)
// Datos estáticos del catálogo de la línea 221.
// Los arrays son privados; se accede mediante funciones para evitar mutación
// accidental desde cualquier componente.
// ============================================================================
import type { Parada, Servicio, Fuente, Horario, TipoDia, Sentido } from "./types";

// Paradas conocidas de la línea 221 (vacías hasta cargar datos reales)
const paradas221: Parada[] = [];

// Tipos de servicios disponibles
const servicios221: Servicio[] = [];

// Fuentes de información consultadas
const fuentes221: Fuente[] = [];

// Horarios registrados
const horarios221: Horario[] = [];

export function obtenerParadas(): Parada[] {
  return [...paradas221];
}

export function obtenerServicios(): Servicio[] {
  return [...servicios221];
}

export function obtenerFuentes(): Fuente[] {
  return [...fuentes221];
}

export function obtenerHorarios(): Horario[] {
  return [...horarios221];
}

/**
 * Devuelve paradas filtradas por sentido, ordenadas por `orden`.
 * Equivalente a la lógica de consultas.ts pero con acceso controlado.
 */
export function obtenerParadasPorSentido(sentido: Sentido): Parada[] {
  return paradas221
    .filter((p) => p.sentido === sentido)
    .sort((a, b) => a.orden - b.orden);
}

/**
 * Busca un servicio por sentido y tipo de día.
 */
export function obtenerServicioPorSentidoYTipoDia(
  sentido: Sentido,
  tipoDia: TipoDia
): Servicio | undefined {
  return servicios221.find(
    (s) => s.sentido === sentido && s.tipoDia === tipoDia
  );
}

/**
 * Devuelve horarios filtrados por parada y servicio, ordenados por hora.
 */
export function obtenerHorariosPorParadaYServicio(
  paradaId: string,
  servicioId: string
): Horario[] {
  return horarios221
    .filter((h) => h.paradaId === paradaId && h.servicioId === servicioId)
    .sort((a, b) => a.hora.localeCompare(b.hora));
}

/**
 * Busca una parada por su id.
 */
export function obtenerParadaPorId(paradaId: string): Parada | undefined {
  return paradas221.find((p) => p.id === paradaId);
}

/**
 * Busca un servicio por su id.
 */
export function obtenerServicioPorId(servicioId: string): Servicio | undefined {
  return servicios221.find((s) => s.id === servicioId);
}