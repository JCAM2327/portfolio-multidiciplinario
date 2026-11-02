# Contribución y convenciones

Guía para trabajar en el repositorio. Aplica a código, contenido y documentación.

## Comandos

| Comando | Uso |
|---|---|
| `npm install` | Instalar dependencias |
| `npm run dev` | Servidor en `http://localhost:3000` |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run typecheck` | Verificación de tipos (`tsc --noEmit`) |

No existen scripts de lint ni de tests. No inventar comandos que no estén en
`package.json`.

## Idioma

- Contenido, documentación, comentarios de producto y textos de UI en **español**.
- Código (nombres de variables, funciones, tipos) en inglés.
- Slugs y rutas en `kebab-case` sin acentos.

## Código

- TypeScript estricto. Evitar `any`; preferir tipos de `src/types/`.
- Server Components por defecto. `"use client"` solo cuando sea necesario.
- Imports con alias `@/` (→ `src/`).
- Iconos de `lucide-react`, importando solo los usados.
- Tailwind v4: `@import "tailwindcss";`. No usar `@tailwind base/components/utilities`
  ni crear `tailwind.config`.
- Composición de clases con `clsx`.
- No añadir dependencias sin justificar la necesidad.

## Estructura

- `src/app/` para rutas y layouts.
- `src/components/` para UI reutilizable.
- `src/lib/` para lógica sin JSX y acceso a contenido.
- `src/types/` para contratos compartidos.
- `content/` para contenido editable; nunca lógica.

## Contenido (obligatorio)

Antes de añadir o editar contenido, leer las reglas de
`docs/PROJECT_MASTER.md` (apartado 3). En resumen:

- No inventar formación, títulos, proyectos, resultados ni certificaciones.
- No presentar estudios incompletos como títulos obtenidos.
- Declarar el estado real de cada proyecto.
- Marcar lo no verificado como `pendiente de confirmación`.
- No publicar datos personales ni documentos privados.
- Enlaces y email solo desde variables `NEXT_PUBLIC_*`.

El blog es un enlace externo configurable (`NEXT_PUBLIC_BLOG_URL`). No se
gestiona contenido de blog en este repositorio ni se crean rutas `/blog`.

Cada archivo de contenido debe incluir `lastUpdated` con la fecha de revisión.

## Frontmatter

Respetar los campos definidos en `docs/PROJECT_MASTER.md` (apartado 6). Un
contenido con frontmatter inválido no debe buildear.

## Convención de commits

Mensajes concisos en español, en imperativo, con prefijo de ámbito:

```text
feat: añadir listado de proyectos
fix: corregir estado de proyecto sin confirmar
docs: actualizar roadmap
content: completar perfil confirmado
chore: instalar dependencias
```

Un commit debe agrupar un cambio coherente. No mezclar refactors con contenido.

## Antes de dar algo por terminado

1. `npm run typecheck` sin errores.
2. `npm run build` correcto (cuando exista build funcional).
3. Contenido revisado contra las reglas de honestidad y privacidad.
4. Documentación actualizada si cambió el alcance.

## Qué no hacer

- No commitear `.env`, `.env.local`, secretos ni credenciales.
- No publicar documentos académicos privados.
- No introducir base de datos, Redis o backend separado sin necesidad demostrable.
- No escribir en las carpetas heredadas de la organización anterior
  (`Front End/`, `Back End/`, etc.); la estructura vigente es `src/` + `content/`.
