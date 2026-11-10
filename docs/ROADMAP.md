# Roadmap

Plan de trabajo por fases. El estado refleja la realidad del repositorio, no una
intención. No se marca una tarea como completada sin verificación.

## Fase 0 — Fundaciones (en curso)

- [x] Configuración raíz de Next.js, TypeScript y Tailwind v4.
- [x] `.env.example` y `.gitignore`.
- [x] Documento maestro y documentación base.
- [x] Estructura `src/`, `content/`, `docs/`, `public/`.
- [x] Tipos de contenido y acceso a contenido.
- [x] Instalar dependencias (`npm install`) y generar lockfile.
- [x] Inicializar repositorio Git (`main`, remoto `JCAM2327/portfolio`).
- [ ] Verificar `npm run typecheck` y `npm run build` (pendiente: el entorno de ejecución de la herramienta no permite lanzar procesos).

## Fase 1 — Shell de la aplicación

- [x] Layout global con cabecera, navegación y pie.
- [x] Página de inicio con secciones (presentación, áreas, destacados).
- [x] Estilos base y tokens de tema.
- [x] Componentes de UI reutilizables (contenedor, tarjeta, insignia de estado).
- [x] Navegación móvil accesible.
- [x] Metadatos globales y Open Graph.
- [x] Adaptar el home de Next.js al sistema visual de `docs/index.html` (hero oscuro, métricas, secciones y contacto).
- [x] Tema claro/oscuro con `data-theme`, `ThemeToggle` y `Typewriter` accesible.
- [x] Utilidades compartidas: estilos (`src/lib/styles.ts`), navegación (`src/lib/navigation.ts`) y copy/datos (`src/lib/portfolio.ts`).

## Fase 2 — Contenido y rutas

- [ ] Completar `content/perfil.md` con datos confirmados.
- [ ] Completar `content/formacion.md` con datos confirmados.
- [x] Cargar proyectos reales con su estado y enlaces verificados (21 proyectos; 9 demos vivas y 12 portadas pendientes).
- [x] `/proyectos` con filtros por área y estado.
- [x] `/proyectos/[slug]` con render MDX.
- [x] Enlace al blog externo (`NEXT_PUBLIC_BLOG_URL`) en la home.
- [x] `/sobre-mi` y `/formacion`.
- [x] `/contacto` desde variables de entorno.
- [x] Página 404 personalizada.

## Fase 3 — Calidad

- [ ] Revisión de accesibilidad (teclado, foco, contraste, semántica) y de paridad visual Next.js ↔ `docs/index.html`. Revisión de código hecha: skip link, foco visible, `aria-current`, menú con Escape, tema persistente y `typecheck`/`build` correctos; falta prueba manual en navegador.
- [x] SEO: `sitemap.xml`, `robots.txt`, favicon (`src/app/icon.svg`), canonical y metadatos por página.
- [ ] Rendimiento: portadas WebP agregadas y JS de cliente limitado a menú, navegación, filtros, tema y typewriter. Falta medir Lighthouse y completar las 12 portadas restantes.
- [x] Revisión de contenido contra las reglas de privacidad y honestidad.
- [x] Enlaces externos con `rel="noopener noreferrer"`.

## Fase 4 — Publicación

- [x] Crear `docs/index.html`: portfolio de una página, autocontenido, publicable con GitHub Pages desde `/docs` (`docs/.nojekyll` incluido). Incluye catálogo de 21 proyectos, portadas disponibles y estados reales; perfil, formación, LinkedIn y email siguen pendientes.
- [x] Publicar la vista de una página en GitHub Pages: <https://jcam2327.github.io/portfolio-multidiciplinario/>.
- [ ] Configurar proyecto en Vercel (sitio Next.js); decidir si GitHub Pages desde `/docs` será el canal definitivo o solo una vista previa.
- [ ] Definir dominio y `NEXT_PUBLIC_SITE_URL` de producción.
- [ ] Configurar variables de entorno en el hosting.
- [ ] Verificación posterior al despliegue.

## Fase 5 — Evolución (opcional)

Solo con necesidad funcional demostrable:

- [ ] Búsqueda de contenido.
- [ ] Analítica respetuosa con la privacidad.
- [ ] Internacionalización (solo si se requiere).

## Bloqueos conocidos

- Falta confirmar biografía, formación, certificaciones y enlaces profesionales.
- Quedan 14 proyectos sin portada propia; usan un placeholder hasta que exista una imagen verificable.
- La demo de The Spotify Project Models devuelve 404; se retiró su enlace y quedó como MVP. Automatización de rendimiento en reacciones tiene demo pública en Vercel.
- La paridad visual y la accesibilidad todavía requieren una prueba manual en navegador.
