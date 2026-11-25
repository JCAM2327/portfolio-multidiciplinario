// ============================================================================
// COLECTIVO 221 — SERVICIO DE HORARIOS (services)
// Capa de aplicación: consulta sobre datos de referencia (core/datos).
// Estos datos NO son GPS en tiempo real, son referencia programada.
// ============================================================================
import type { Sentido, TipoDia, Parada, Servicio, Horario } from "../core/types";
import {
  obtenerParadasPorSentido,
  obtenerServicioPorSentidoYTipoDia,
  obtenerHorariosPorParadaYServicio,
  obtenerParadaPorId,
  obtenerServicioPorId,
} from "../core/datos";

export function listarParadasPorSentido(sentido: Sentido): Parada[] {
  return obtenerParadasPorSentido(sentido);
}

export function buscarServicio(
  sentido: Sentido,
  tipoDia: TipoDia
): Servicio | undefined {
  return obtenerServicioPorSentidoYTipoDia(sentido, tipoDia);
}

export function listarHorariosParaParada(
  paradaId: string,
  servicioId: string
): Horario[] {
  return obtenerHorariosPorParadaYServicio(paradaId, servicioId);
}

export function obtenerParada(paradaId: string): Parada | undefined {
  return obtenerParadaPorId(paradaId);
}

export function obtenerServicio(servicioId: string): Servicio | undefined {
  return obtenerServicioPorId(servicioId);
}