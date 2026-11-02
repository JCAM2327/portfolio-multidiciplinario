# AGENTS.md

Portfolio personal multidisciplinario (José Carlos Alayo Mondragón). Next.js App Router + TypeScript + Tailwind CSS v4 + contenido MDX. Sitio en español.

## Estado actual

- Estructura creada: configs raíz + `src/` (`app/`, `components/`, `lib/`, `types/`), `content/`, `docs/` y `public/`.
- `docs/` contiene `PROJECT_MASTER.md`, `ARCHITECTURE.md`, `ROADMAP.md`, `CONTRIBUTING.md`, `index.html` (portfolio de una página en HTML/CSS/JS vanilla, autocontenido, pensado para GitHub Pages desde `/docs`) y `.nojekyll`. Este `index.html` es una pieza independiente del sitio Next.js y debe respetar las mismas reglas de contenido; está publicado en `https://jcam2327.github.io/portfolio/`. El enlace de GitHub se toma de `NEXT_PUBLIC_GITHUB_URL`, mientras LinkedIn y email siguen pendientes.
- `content/` contiene placeholders honestos: perfil y formación están **pendientes de confirmación**; `proyectos/` está vacío. No inventar datos para rellenarlos.
- Rutas existentes: home, `/sobre-mi`, `/proyectos` (filtros por área y estado), `/proyectos/[slug]` (render MDX), `/formacion`, `/contacto` y 404 personalizada. El blog es un **enlace externo** (`NEXT_PUBLIC_BLOG_URL`); no hay contenido ni rutas de blog internas.
- SEO: `src/app/sitemap.ts` y `src/app/robots.ts`; metadatos por página. Navegación con `aria-current`; enlaces externos con `rel="noopener noreferrer"`.
- Diseño: tokens en `globals.css` (`@theme inline`), utilidades compartidas en `src/lib/styles.ts`; header/footer, hero, tarjetas de área y proyecto, filtros y prosa MDX renovados.
- `tests/` y `scripts/` no existen. Hay lockfile (`package-lock.json`) y dependencias instaladas; no hay lint, tests ni CI. El directorio ya es un repositorio Git (rama `main`, remoto `https://github.com/JCAM2327/portfolio.git`) con un commit inicial; `docs/index.html` aún no está commiteado.
- `npm run typecheck` y `npm run build` no se han podido ejecutar en el entorno del agente; deben verificarse localmente antes de dar una fase por cerrada.
- Las carpetas vacías `Front End/`, `Back End/`, `Ciencia de Datos/`, `Física/`, `Full Stack/`, `Quimica _(Ing_Lic_ Prof)/`, `Blog_de_avance_profesional/` y `Aplicación_conjunta_de_todo/` son restos de la organización anterior. No escribir en ellas; la estructura vigente es `content/` + `src/`.

## Comandos

- `npm install` — instala dependencias; ya existe `package-lock.json`.
- `npm run dev` — servidor en `http://localhost:3000`.
- `npm run build` — build de producción.
- `npm run typecheck` — única verificación disponible (`tsc --noEmit`). No hay script de lint ni de tests; no inventar comandos.

## Convenciones técnicas

- Tailwind es **v4**: plugin `@tailwindcss/postcss` en `postcss.config.mjs` y `@import "tailwindcss";` en el CSS global. No usar `@tailwind base/components/utilities` ni `tailwind.config` estilo v3.
- Contenido previsto: `.mdx` bajo `content/`, parseado con `gray-matter` y renderizado con `next-mdx-remote/rsc`. Mantener esa ruta. El blog no usa MDX local: es un enlace externo configurable por `NEXT_PUBLIC_BLOG_URL`.
- Alias de imports: `@/*` → `src/*`. Iconos: `lucide-react`.
- No introducir base de datos, Redis ni backend separado sin una necesidad funcional demostrable.

## Contenido y privacidad (crítico)

- Escribir contenido y documentación en español.
- No inventar formación, títulos, proyectos, resultados, certificaciones ni experiencia.
- No presentar estudios cursados/incompletos como títulos obtenidos, ni ideas como proyectos terminados. Usar los estados del proyecto (`idea`, `en desarrollo`, `MVP`, etc.) y marcar lo pendiente de confirmación.
- No publicar datos personales, documentos académicos privados ni secretos. URLs y email provienen de variables `NEXT_PUBLIC_*`.
- La especificación completa está en `docs/PROJECT_MASTER.md`.
