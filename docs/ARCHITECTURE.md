# Arquitectura

Decisiones técnicas del portfolio. Complementa `docs/PROJECT_MASTER.md`.

## 1. Visión general

Sitio estático generado con Next.js App Router. El contenido se lee del sistema
de archivos en build time y se renderiza en el servidor. No hay base de datos ni
API propia; el "backend" es el propio proceso de build de Next.js.

```text
content/*.mdx ──gray-matter──▶ src/lib/content.ts ──▶ Server Components
                                                          │
                                                          ▼
                                              HTML estático + islas cliente
                                                          │
                                                          ▼
                                                       Vercel
```

**Nota:** El blog es un enlace externo configurable vía `NEXT_PUBLIC_BLOG_URL`.
No existe contenido de blog ni rutas `/blog` en este repositorio.

## 2. Estrategia de renderizado

- **Server Components por defecto.** Solo se marca `"use client"` en componentes
  que necesitan estado, efectos o APIs del navegador (p. ej. filtros, menú móvil).
- **Generación estática.** Las páginas de contenido se generan en build time.
  Se puede añadir `generateStaticParams` para rutas dinámicas.
- **Sin fetching en cliente.** El contenido y la configuración se resuelven en
  el servidor.

## 3. Capas

| Capa | Ubicación | Responsabilidad |
|---|---|---|
| Contenido | `content/` | Datos editables en Markdown/MDX |
| Acceso a datos | `src/lib/content.ts` | Leer, parsear, validar y ordenar contenido |
| Configuración | `src/lib/site.ts` | Identidad del sitio y enlaces desde env |
| Tipos | `src/types/` | Contratos compartidos de contenido |
| Presentación | `src/components/` | UI reutilizable (layout, tarjetas, secciones) |
| Rutas | `src/app/` | Páginas, layouts, metadatos y rutas dinámicas |

Regla de dependencia: `app` → `components` → `lib`/`types`. `lib` no importa de
`app` ni de `components`. El acceso al sistema de archivos queda confinado a
`src/lib/content.ts`, que solo debe usarse desde el servidor.

## 4. Pipeline de contenido

1. `src/lib/content.ts` resuelve la ruta de `content/` con `process.cwd()`.
2. Lee los `.mdx`, separa frontmatter con `gray-matter`.
3. Valida los campos obligatorios y descarta borradores en producción.
4. Ordena los proyectos por `featured`/`lastUpdated`.
5. Devuelve objetos tipados; el cuerpo MDX se renderiza con
   `next-mdx-remote/rsc`.

Los errores de frontmatter deben fallar de forma explícita durante el build, no
silenciarse. Un contenido inválido no debe publicarse.

## 5. Enrutamiento

- App Router con carpetas por segmento.
- Rutas dinámicas (`/proyectos/[slug]`) usan `generateStaticParams` para
  prerenderizar cada entrada.
- Cada página exporta `metadata` (o `generateMetadata`) con título, descripción
  y Open Graph.

## 6. Estilos

- Tailwind CSS v4 mediante `@tailwindcss/postcss`.
- `src/app/globals.css` contiene `@import "tailwindcss";` y, si hace falta,
  tokens de tema con `@theme`.
- No existe `tailwind.config.js` (estilo v3 prohibido).
- Utilidades de composición de clases con `clsx`.

## 7. Componentes cliente

Se limitan a lo imprescindible:

- Menú de navegación móvil.
- Filtros de proyectos.
- Cualquier interacción que no pueda resolverse con CSS.

Los componentes cliente reciben datos ya resueltos como props; no leen archivos.

## 8. Tipos

`src/types/content.ts` define los contratos del contenido:

- `AreaSlug` — unión de los slugs de área.
- `ProjectStatus` — estados permitidos de proyecto.
- `Project`, `Profile`, `EducationEntry`.
- Tipos de frontmatter en crudo, separados de los tipos de dominio.

## 9. Configuración y secretos

- `src/lib/site.ts` centraliza nombre, descripción, URL y enlaces externos
  (incluido el blog).
- Los enlaces profesionales y el blog se leen de `NEXT_PUBLIC_*`; si están
  vacíos, no se renderizan.
- Secretos solo en `.env.local` (ignorado). Nunca en `content/` ni en el código.

## 10. Despliegue

- Vercel, build estático.
- `NEXT_PUBLIC_SITE_URL` configurada por entorno.
- Sin variables de servidor en la primera versión.

## 11. Decisiones y alternativas descartadas

| Decisión | Alternativa descartada | Motivo |
|---|---|---|
| MDX en archivos | CMS headless | Simplicidad, versionado en Git, sin coste |
| Server Components | SPA con fetching | Menos JS, mejor SEO y rendimiento |
| Static generation | SSR dinámico | Contenido cambia poco; no hace falta servidor |
| Sin base de datos | Postgres/SQLite | No hay necesidad funcional demostrable |
| Blog externo | Blog interno en MDX | Se enlaza el blog existente; no hace falta duplicarlo |
