// ============================================================================
// COLECTIVO 221 — TIPOS DE DOMINIO (core)
// ============================================================================
// Todos los tipos del proyecto viven aquí para tener una única fuente de verdad.

/** Sentido del recorrido de la línea 221 */
export type Sentido = "Mar del Plata → Santa Clara" | "Santa Clara → Mar del Plata";

/** Tipo de día para horarios de referencia */
export type TipoDia = "habil" | "sabado" | "domingo_feriado";

/** Estado que reporta un pasajero en una parada */
export type EstadoReporte = "Recién pasó" | "Está llegando" | "Estoy arriba";

/** Filtro opcional por franja horaria para análisis de frecuencia */
export interface FiltroHorario {
  manana: boolean;    // 06:00 - 12:00
  tarde: boolean;     // 12:00 - 18:00
  noche: boolean;     // 18:00 - 00:00
  madrugada: boolean; // 00:00 - 06:00
}

export const FILTRO_HORARIO_POR_DEFECTO: FiltroHorario = {
  manana: true,
  tarde: true,
  noche: true,
  madrugada: true,
};

/** Reporte ciudadano guardado en localStorage */
export interface Reporte {
  id: string;
  parada: string;
  sentido: Sentido;
  estado: EstadoReporte;
  timestamp: string; // ISO 8601
  usuarioId: string; // ID anónimo del dispositivo
}

/** Variante de tramo publicada por la fuente (MCo / SC / MCh) */
export type Variante = "MCo" | "SC" | "MCh";

/** Parada del catálogo de referencia (datos oficiales o manuales) */
export interface Parada {
  id: string;
  nombre: string;
  sentido: Sentido;
  orden: number;
  /** Variante de tramo a la que pertenece (los 6 tramos del PDF de Moovit) */
  variante: Variante;
  /** false = tomado de un PDF de terceros, aún sin validación en campo */
  validadaCampo: boolean;
}

/** Tipo de servicio (ej. "Diurno", "Nocturno") vinculado a un sentido y tipo de día */
export interface Servicio {
  id: string;
  sentido: Sentido;
  tipoDia: TipoDia;
  descripcion: string;
}

/** Horario registrado de referencia (no GPS en tiempo real) */
export interface Horario {
  id: string;
  paradaId: string;
  servicioId: string;
  hora: string; // HH:mm
}

/** Fuente de información de un horario */
export interface Fuente {
  id: string;
  nombre: string;
  tipo: "municipal" | "ciudadana" | "oficial" | "tercero";
}

/** Estado de validación de una parada del catálogo */
export type EstadoValidacion = "no_validada" | "pendiente" | "validada";

/** Trazabilidad de la fuente de datos de paradas */
export interface FuenteParada {
  id: string;
  nombre: string;
  url: string;
  fechaConsulta: string; // ISO 8601
  tipo: "municipal" | "ciudadana" | "oficial" | "tercero";
  observaciones?: string;
}

/** Recorrido completo de la línea 221: una variante en un sentido con sus paradas ordenadas */
export interface RecorridoParadas {
  id: string; // ej: "221-MCo-MDP-SC"
  variante: Variante;
  sentido: Sentido;
  paradas: Parada[]; // ordenadas por `orden`
  fuente: FuenteParada;
  totalParadas: number;
  estadoValidacion: EstadoValidacion;
  observaciones?: string;
}

/** Resultado de una estimación de llegada */
export interface EstimacionLlegada {
  minutosDesdeUltimo: number | null;
  promedioFrecuencia: number | null;
  estimado: string;
  confianza: "alta" | "media" | "baja" | "ninguna";
}

/** Opciones de estado para el form de reporte (value/label/tono para UI) */
export const ESTADOS_REPORTE: {
  value: EstadoReporte;
  label: string;
  tono: "info" | "warning" | "success";
}[] = [
  { value: "Recién pasó", label: "Recién pasó", tono: "info" },
  { value: "Está llegando", label: "Está llegando", tono: "warning" },
  { value: "Estoy arriba", label: "Estoy arriba", tono: "success" },
];

/** Opciones de sentido del recorrido para selects */
export const SENTIDOS: { value: Sentido; label: string }[] = [
  { value: "Mar del Plata → Santa Clara", label: "Mar del Plata → Santa Clara" },
  { value: "Santa Clara → Mar del Plata", label: "Santa Clara → Mar del Plata" },
];