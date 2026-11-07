import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  buttonPrimary,
  buttonSecondary,
  eyebrowClass,
} from "@/lib/styles";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="hero-surface absolute inset-x-0 top-0 h-[560px]"
      />
      <div
        aria-hidden="true"
        className="hero-grid absolute inset-x-0 top-0 h-[560px]"
      />

      <Container className="relative z-10">
        <div className="flex min-h-[64vh] flex-col items-start justify-center gap-5 py-[clamp(56px,9vw,104px)]">
          <p className={eyebrowClass}>Error 404</p>
          <h1 className="max-w-2xl text-balance text-[clamp(2.6rem,6vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-ink">
            Página no encontrada
          </h1>
          <p className="max-w-xl text-pretty text-[1.02rem] leading-relaxed text-muted">
            El contenido que buscas no existe o todavía no se ha publicado.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link href="/" className={buttonPrimary}>
              Volver al inicio
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link href="/proyectos" className={buttonSecondary}>
              Ver proyectos
            </Link>
          </div>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 select-none text-[16rem] font-semibold leading-none tracking-tighter text-ink/[0.04] md:block"
          >
            404
          </span>
        </div>
      </Container>
    </div>
  );
}
