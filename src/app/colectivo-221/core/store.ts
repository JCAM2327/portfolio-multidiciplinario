// ============================================================================
// COLECTIVO 221 — PERSISTENCIA (core)
// Único punto de escritura/lectura de reportes ciudadanos en localStorage.
// ============================================================================
import type { Reporte, EstadoReporte, Sentido } from "./types";

const STORAGE_KEY = "colectivo-221-reportes";
const USUARIO_ID_KEY = "colectivo-221-usuario-id";

function generarId(): string {
  return crypto.randomUUID();
}

function obtenerUsuarioId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(USUARIO_ID_KEY);
  if (!id) {
    id = generarId();
    localStorage.setItem(USUARIO_ID_KEY, id);
  }
  return id;
}

function leerReportes(): Reporte[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parseados = JSON.parse(raw);
    if (!Array.isArray(parseados)) return [];
    return parseados as Reporte[];
  } catch {
    return [];
  }
}

function guardarReportes(reportes: Reporte[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reportes));
  } catch {
    // Cuota de localStorage excedida: se ignora silenciosamente
    // para no romper la experiencia del usuario.
  }
}

export function agregarReporte({
  parada,
  sentido,
  estado,
}: {
  parada: string;
  sentido: Sentido;
  estado: EstadoReporte;
}): Reporte {
  const reportes = leerReportes();
  const reporte: Reporte = {
    id: generarId(),
    parada: parada.trim(),
    sentido,
    estado,
    timestamp: new Date().toISOString(),
    usuarioId: obtenerUsuarioId(),
  };
  const siguiente = [reporte, ...reportes].slice(0, 500); // límite razonable
  guardarReportes(siguiente);
  return reporte;
}

export function obtenerReportes(): Reporte[] {
  return leerReportes();
}

export function obtenerReportesPorParadaYSentido(
  parada: string,
  sentido: Sentido
): Reporte[] {
  return leerReportes().filter(
    (r) => r.parada.toLowerCase() === parada.toLowerCase() && r.sentido === sentido
  );
}

export function obtenerUltimoReporte(
  parada: string,
  sentido: Sentido
): Reporte | null {
  const reportes = obtenerReportesPorParadaYSentido(parada, sentido);
  if (reportes.length === 0) return null;
  return [
    ...reportes,
  ].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )[0];
}

export function limpiarReportes(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function obtenerUsuarioIdAnonimo(): string {
  return obtenerUsuarioId();
}