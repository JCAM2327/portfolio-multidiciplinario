import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buttonPrimary } from "@/lib/styles";

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-start gap-4 py-24">
        <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
          404
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Página no encontrada
        </h1>
        <p className="max-w-xl text-slate-600">
          El contenido que buscas no existe o todavía no se ha publicado.
        </p>
        <Link href="/" className={buttonPrimary}>
          Volver al inicio
        </Link>
      </div>
    </Container>
  );
}
