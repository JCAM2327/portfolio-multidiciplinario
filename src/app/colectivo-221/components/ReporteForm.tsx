"use client";

import { useState, useCallback } from "react";
import { Bus, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { registrarReporte } from "@/app/colectivo-221/services/reportes";
import type { Sentido, EstadoReporte } from "@/app/colectivo-221/core/types";
import { ESTADOS_REPORTE, SENTIDOS } from "@/app/colectivo-221/core/types";
import { selectClass, buttonPrimary, buttonSecondary } from "@/lib/styles";

interface ReporteFormProps {
  onExito?: () => void;
}

export function ReporteForm({ onExito }: ReporteFormProps = {}) {
  const [parada, setParada] = useState("");
  const [sentido, setSentido] = useState<Sentido>(SENTIDOS[0].value);
  const [estado, setEstado] = useState<EstadoReporte>(ESTADOS_REPORTE[0].value);
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setEnviando(true);
      setError(null);

      try {
        if (!parada.trim()) {
          setError("Ingresá la parada donde estás.");
          setEnviando(false);
          return;
        }

        registrarReporte({ parada, sentido, estado });
        setExito(true);
        setParada("");
        onExito?.();
      } catch {
        setError("No se pudo guardar el reporte. Intentalo nuevamente.");
      } finally {
        setEnviando(false);
      }
    },
    [parada, sentido, estado, onExito]
  );

  if (exito) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-panel border border-line bg-accent-soft p-6 text-accent-contrast text-center">
        <CheckCircle2 className="h-8 w-8 mx-auto" aria-hidden="true" />
        <h3 className="text-lg font-bold">✅ Reporte enviado</h3>
        <p className="text-sm">
          Gracias por reportar. Tu reporte quedó registrado en este dispositivo.
        </p>
        <button
          onClick={() => setExito(false)}
          className={buttonSecondary}
        >
          Enviar otro reporte
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-ink">
          Parada donde estás
        </label>
        <input
          type="text"
          className="h-10 w-full rounded-control border border-line bg-surface pl-3 pr-9 text-sm font-medium text-ink shadow-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          placeholder="Ej. Plaza San Martín"
          value={parada}
          onChange={(e) => setParada(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-ink">
            Sentido del colectivo
          </label>
          <select
            className={selectClass}
            value={sentido}
            onChange={(e) => setSentido(e.target.value as Sentido)}
          >
            {SENTIDOS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-ink">
            Estado
          </label>
          <select
            className={selectClass}
            value={estado}
            onChange={(e) => setEstado(e.target.value as EstadoReporte)}
          >
            {ESTADOS_REPORTE.map((e) => (
              <option key={e.value} value={e.value}>
                {e.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="rounded-control border border-warning bg-warning/10 px-4 py-3 text-sm font-medium text-warning flex items-center gap-2">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={enviando}
        className={buttonPrimary}
      >
        {enviando ? (
          <>
            <Bus className="h-4 w-4 animate-spin" aria-hidden="true" />
            Enviando…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Enviar reporte
          </>
        )}
      </button>

      <p className="text-xs text-muted">
        Los datos se guardan solo en este navegador (localStorage). No se
        recolectan nombres, teléfonos ni ubicación precisa.
      </p>
    </form>
  );
}