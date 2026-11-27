// ============================================================================
// COLECTIVO 221 — DATOS DE REFERENCIA (core)
// Datos estáticos del catálogo de la línea 221.
// Los arrays son privados; se accede mediante funciones para evitar mutación
// accidental desde cualquier componente.
// ============================================================================
import type {
  Parada,
  Servicio,
  Fuente,
  FuenteParada,
  Horario,
  TipoDia,
  Sentido,
  Variante,
} from "./types";
import { PARADAS_221 } from "./datos/paradas";

// Trazabilidad del catálogo de paradas. Vive acá (no en paradas.ts) porque
// paradas.ts lo genera scripts/extraer_paradas.py y se pisa en cada corrida.
export const FUENTE_PARADAS: FuenteParada = {
  id: "moovit-linea-221",
  nombre: "Moovit — Línea 221",
  url: "https://moovitapp.com/index/es-419/transporte_p%C3%BAblico-line-221-Mar_del_Plata-5055-1149591-720498-5",
  fechaConsulta: "2026-11-27T00:00:00Z",
  tipo: "tercero",
  observaciones:
    "Datos extraídos de PDF de Moovit (terceros). No son información oficial ni validados en campo. Requieren verificación antes de usarse en producción.",
};

// Catálogo de paradas extraído de un PDF de Moovit (terceros). No es
// información oficial ni validada en campo: ver Parada.validadaCampo.
const paradas221: Parada[] = PARADAS_221;

// Variante de tramo que muestra la UI por defecto. El PDF publica 6 tramos
// (3 variantes x 2 sentidos); hasta que no se elija otra, se usa (SC),
// que es la única cuyo destino es Santa Clara del Mar.
export const VARIANTE_POR_DEFECTO: Variante = "SC";

// Tipos de servicios disponibles
const servicios221: Servicio[] = [];

// Fuentes de información consultadas
const fuentes221: Fuente[] = [];

// Horarios registrados
const horarios221: Horario[] = [];

export function obtenerParadas(): Parada[] {
  return [...paradas221];
}

export function obtenerFuenteParadas(): FuenteParada {
  return { ...FUENTE_PARADAS };
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
 * Devuelve paradas filtradas por sentido y variante, ordenadas por `orden`.
 * `variante` es opcional: sin ella se mezclan los 3 tramos de ese sentido.
 */
export function obtenerParadasPorSentido(
  sentido: Sentido,
  variante?: Variante
): Parada[] {
  return paradas221
    .filter((p) => p.sentido === sentido && (!variante || p.variante === variante))
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