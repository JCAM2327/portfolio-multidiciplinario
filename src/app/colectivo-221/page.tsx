import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Bus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { ReporteForm } from "./components/ReporteForm";
import { TableroLlegadas } from "./components/TableroLlegadas";
import { ConsultaHorarios } from "./components/ConsultaHorarios";
import { VistaRecorrido } from "./components/VistaRecorrido";
import { buttonPrimary } from "@/lib/styles";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Colectivo 221 — Llegada estimada",
  description:
    "Aplicativo para estimar la llegada del colectivo de la línea 221 (Mar del Plata ↔ Santa Clara) a partir de reportes ciudadanos y tiempos promedio históricos.",
  alternates: { canonical: "/colectivo-221" },
};

export default function Colectivo221Page() {
  return (
    <Container className="py-10 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink mb-6"
      >
        <ArrowLeft
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transform-none"
        />
        Volver al inicio
      </Link>

      <section className="max-w-[680px]">
        <SectionHead
          eyebrow="Transporte público · Proyecto personal"
          title="Colectivo 221: ¿cuándo llega?"
          lead={
            "Esta aplicación es un experimento para estimar la llegada del colectivo de la línea 221 (Mar del Plata ↔ Santa Clara) a partir de reportes de pasajeros y tiempos promedio entre paradas."
          }
          titleId="colectivo-221-title"
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_1fr]">
          <div className="rounded-panel border border-line bg-surface p-6 sm:p-8 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <Bus className="h-5 w-5 text-accent" aria-hidden="true" />
              <h3 className="text-lg font-bold text-ink">Reportar una parada</h3>
            </div>
            <p className="text-sm text-muted mb-4">
              Si estás en una parada y viste el colectivo, contanos el estado.
              Tu reporte ayuda a quien viene detrás.
            </p>
            <ReporteForm />
          </div>

          <div className="rounded-panel border border-line bg-surface p-6 sm:p-8 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <Bus className="h-5 w-5 text-accent" aria-hidden="true" />
              <h3 className="text-lg font-bold text-ink">Tablero de llegadas</h3>
            </div>
            <p className="text-sm text-muted mb-4">
              Último reporte conocido por parada, tiempo transcurrido y una
              estimación basada en el historial de este navegador.
            </p>
            <TableroLlegadas />
          </div>
        </div>

        <div className="mt-8">
          <div className="rounded-panel border border-line bg-surface p-6 sm:p-8 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <Bus className="h-5 w-5 text-accent" aria-hidden="true" />
              <h3 className="text-lg font-bold text-ink">Consultar horarios programados</h3>
            </div>
            <p className="text-sm text-muted mb-4">
              Consulta los horarios de referencia de la línea 221 por sentido,
              tipo de día y parada.
            </p>
            <ConsultaHorarios />
          </div>
        </div>
      </section>

      <VistaRecorrido />

      <section className="mt-12 sm:mt-16 max-w-[680px] rounded-panel border border-line bg-surface p-6 sm:p-8 shadow-card">
        <h2 className="text-lg font-bold text-ink mb-3">¿Cómo se calcula la llegada?</h2>
        <ul className="list-disc list-inside text-sm text-muted space-y-2">
          <li>
            Cada pasajero reporta la parada, el sentido y el estado del
            colectivo ("Recién pasó", "Está llegando" o "Estoy arriba").
          </li>
          <li>
            La app guarda el último reporte por parada y sentido en tu
            navegador (localStorage).
          </li>
          <li>
            Calcula el promedio de minutos entre reportes consecutivos del
            mismo sentido para dar una referencia de frecuencia.
          </li>
          <li>
            La llegada estimada se expresa como tiempo transcurrido desde el
            último reporte, no como una hora exacta garantizada.
          </li>
        </ul>

        <div className="mt-6 rounded-control border border-line bg-surface-muted p-4 text-sm text-muted">
          <p className="font-semibold text-ink mb-1">Limitaciones importantes</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Los datos solo se guardan en este dispositivo. Si cambias de
              navegador o borras el caché, se pierden los reportes.
            </li>
            <li>
              No hay datos oficiales de horarios ni GPS de los colectivos, así
              que cualquier estimación es una aproximación basada en lo que los
              usuarios reportan.
            </li>
            <li>
              No se recolectan nombres, teléfonos, correos ni ubicación
              precisa de nadie.
            </li>
          </ul>
        </div>
      </section>

      <div className="mt-10 sm:mt-14 text-center">
        <Link
          href={siteConfig.links.github || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonPrimary}
        >
          Ver código en GitHub
          <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
        </Link>
      </div>
    </Container>
  );
}