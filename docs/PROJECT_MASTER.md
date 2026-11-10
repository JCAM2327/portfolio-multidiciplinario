# Documento maestro — Portfolio multidisciplinario

Especificación de referencia del sitio personal de **José Carlos Alayo Mondragón**.
Este documento es la fuente de verdad del alcance, el contenido y las reglas del
proyecto. Si el código o el contenido lo contradicen, prevalece este documento
hasta que se actualice de forma explícita.

> **Estado:** planificación inicial / scaffold en construcción.
> La aplicación todavía no está publicada y el contenido de perfil está pendiente
> de confirmación. Nada de lo aquí descrito debe presentarse como terminado sin
> evidencia verificable.

---

## 1. Propósito

Construir un portfolio personal que conecte la trayectoria académica, científica,
tecnológica y profesional, y que documente el proceso de aprendizaje mediante un
blog. El sitio debe comunicar con claridad qué sabe hacer la persona, cómo piensa
y qué está construyendo, sin exagerar logros ni inventar experiencia.

### Objetivos

1. Presentar perfil, áreas de conocimiento y proyectos con su estado real.
2. Enlazar a un blog externo que documenta avances y aprendizajes.
3. Servir como carta de presentación profesional ante reclutadores, docentes,
   colaboradores y clientes.
4. Mantener un coste operativo bajo: sitio estático, sin base de datos.

### No objetivos (primera versión)

- No es una red social ni una plataforma multiusuario.
- No incluye autenticación, pagos, comentarios ni panel de administración.
- No incorpora base de datos, Redis ni backend separado.
- No publica documentos académicos privados ni datos personales sensibles.

---

## 2. Público objetivo

- Reclutadores y equipos técnicos que evalúan perfil y proyectos.
- Docentes, investigadores y colaboradores académicos.
- Clientes o colaboradores interesados en proyectos interdisciplinarios.
- La propia persona autora, como registro de su avance profesional.

---

## 3. Principios y reglas de contenido (crítico)

Estas reglas son obligatorias y tienen prioridad sobre cualquier requisito estético.

1. **No inventar** formación, títulos, proyectos, resultados, métricas,
   certificaciones ni experiencia.
2. **No presentar estudios cursados o incompletos como títulos obtenidos.**
   Usar el estado real (`en curso`, `incompleto`, `pendiente de confirmación`).
3. **No presentar ideas o experimentos como proyectos terminados.** Todo proyecto
   debe declarar su estado (`idea`, `en desarrollo`, `MVP`, `publicado`, etc.).
4. **Marcar lo pendiente de confirmación** con la etiqueta
   `pendiente de confirmación` en el contenido o en el campo correspondiente.
5. **No publicar datos personales privados**: documentos de identidad,
   direcciones, teléfonos, notas académicas privadas, secretos o credenciales.
6. **Enlaces y email** provienen exclusivamente de variables `NEXT_PUBLIC_*`.
   Si una variable está vacía, el enlace no se renderiza.
7. Todo el contenido y la documentación se escriben **en español**.

---

## 4. Identidad y áreas

- **Nombre:** José Carlos Alayo Mondragón.
- **Enfoque:** ciencia, tecnología e ingeniería; conectar conocimientos para
  resolver problemas reales.
- **Tono:** claro, sobrio, técnico y honesto. Sin grandilocuencia.

### Áreas representadas

| # | Área | Slug previsto |
|---|---|---|
| 1 | Desarrollo Frontend | `frontend` |
| 2 | Desarrollo Backend | `backend` |
| 3 | Ciencia de Datos e Inteligencia Artificial | `datos-ia` |
| 4 | Química y Ciencias | `quimica-ciencias` |
| 5 | Ingeniería e Industria 4.0 | `ingenieria-industria` |
| 6 | Educación y Tecnología Educativa | `educacion-tecnologia` |
| 7 | Proyectos interdisciplinarios (transversal) | `interdisciplinario` |

Los slugs son estables y se usan en el frontmatter y en las rutas de filtrado.

---

## 5. Mapa del sitio

Rutas previstas de la primera versión:

| Ruta | Descripción | Estado |
|---|---|---|
| `/` | Inicio: presentación, áreas destacadas, proyectos y enlace al blog | Implementado; perfil pendiente |
| `/sobre-mi` | Perfil, enfoque y trayectoria resumida | Implementado; contenido pendiente |
| `/proyectos` | Listado de proyectos con filtros por área y estado | Implementado (21 proyectos) |
| `/proyectos/[slug]` | Detalle de proyecto en MDX | Implementado |
| Blog (externo) | Enlace configurable vía `NEXT_PUBLIC_BLOG_URL` | Enlace externo |
| `/formacion` | Formación académica y certificaciones confirmadas | Implementado; contenido pendiente |
| `/contacto` | Enlaces profesionales desde variables de entorno | Implementado; LinkedIn/email pendientes |

Reglas de rutas:

- Slugs en `kebab-case`, sin acentos ni caracteres especiales.
- Una ruta de detalle solo existe si su contenido existe y es válido.

---

## 6. Modelo de contenido

El contenido vive en `content/` como archivos `.mdx` con frontmatter YAML,
parseado con `gray-matter`.

### `content/perfil.md`

```yaml
---
name: "José Carlos Alayo Mondragón"
headline: "Pendiente de confirmación"
summary: "Pendiente de confirmación"
areas:
  - frontend
  - backend
  - datos-ia
  - quimica-ciencias
  - ingenieria-industria
  - educacion-tecnologia
  - interdisciplinario
lastUpdated: "2026-01-01"
---
```

### `content/proyectos/*.mdx`

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| `title` | string | Sí | Nombre del proyecto |
| `summary` | string | Sí | Una o dos frases |
| `area` | slug de área | Sí | Ver tabla de áreas |
| `status` | enum | Sí | `idea`, `en desarrollo`, `MVP`, `prototipo`, `publicado`, `pausado`, `archivado` |
| `technologies` | string[] | Sí | Puede ser vacío si no aplica |
| `featured` | boolean | No | Destacar en inicio |
| `startDate` | `YYYY-MM` | No | Fecha de inicio |
| `lastUpdated` | `YYYY-MM-DD` | Sí | Última revisión del contenido |
| `repoUrl` | string | No | Solo si es público |
| `demoUrl` | string | No | Solo si existe |
| `cover` | string | No | Ruta dentro de `public/` |

### `content/formacion.md`

Lista de entradas con `institution`, `program`, `level`, `status`
(`completado`, `en curso`, `incompleto`, `pendiente de confirmación`),
`startDate`, `endDate` y `confirmed`. Ninguna entrada se publica como título
obtenido si `confirmed` no es `true`.

---

## 7. Stack técnico

| Capa | Tecnología | Notas |
|---|---|---|
| Framework | Next.js 15 (App Router) | Server Components por defecto |
| UI | React 19 + TypeScript | `strict: true` |
| Estilos | Tailwind CSS v4 | Plugin `@tailwindcss/postcss`, `@import "tailwindcss";` |
| Contenido | MDX + `gray-matter` + `next-mdx-remote/rsc` | Render en servidor |
| Iconos | `lucide-react` | Importar solo los usados |
| Hosting | Vercel (previsto) | Sin backend propio |

Restricciones:

- No introducir base de datos, Redis ni backend separado sin necesidad funcional
  demostrable.
- No usar la configuración de Tailwind v3 (`tailwind.config`, directivas
  `@tailwind base/components/utilities`).
- Alias de imports: `@/*` → `src/*`.

---

## 8. Estructura de carpetas

```text
content/            Contenido editable
  perfil.md
  formacion.md
  proyectos/        Un .mdx por proyecto
docs/               Documentación del proyecto
  PROJECT_MASTER.md Este documento
  ARCHITECTURE.md
  ROADMAP.md
  CONTRIBUTING.md
public/             Recursos estáticos
src/
  app/              Rutas y páginas (App Router)
  components/       UI, layout y secciones
  lib/              Carga de contenido, configuración y utilidades
  types/            Tipos compartidos
```

---

## 9. Variables de entorno

Definidas en `.env.example`; los valores reales nunca se commitean.

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública para metadatos y sitemap |
| `NEXT_PUBLIC_GITHUB_URL` | Enlace a GitHub (opcional) |
| `NEXT_PUBLIC_LINKEDIN_URL` | Enlace a LinkedIn (opcional) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email de contacto (opcional) |
| `NEXT_PUBLIC_BLOG_URL` | URL del blog externo (si está vacía, el enlace no se muestra) |

Si una variable opcional está vacía, el enlace correspondiente no se muestra.

---

## 10. Calidad, accesibilidad y SEO

- HTML semántico y jerarquía de encabezados correcta (`h1` único por página).
- Contraste suficiente y foco visible; navegación por teclado.
- Textos alternativos en imágenes y `aria-label` en iconos interactivos.
- Metadatos por página (`title`, `description`, Open Graph).
- `sitemap.xml` y `robots.txt` generados desde `NEXT_PUBLIC_SITE_URL`.
- Sin dependencias de cliente innecesarias; priorizar Server Components.

---

## 11. Privacidad y seguridad

- Ningún secreto en el repositorio; usar `.env.local` (ignorado por Git).
- No incluir documentos académicos, identificadores ni datos de terceros.
- Validar y sanear cualquier contenido externo antes de renderizarlo.
- Los enlaces externos abren con `rel="noopener noreferrer"`.

---

## 12. Flujo de trabajo y estados

1. El contenido se redacta en Markdown/MDX y se revisa contra las reglas del
   apartado 3.
2. Todo dato no verificado se marca `pendiente de confirmación`.
3. Los proyectos declaran su estado real; nunca se adelanta un estado.
4. Antes de publicar: `npm run typecheck` y `npm run build` deben pasar.

### Definición de terminado (por funcionalidad)

- Implementada y tipada, sin errores de `typecheck`.
- Build de producción correcto.
- Contenido revisado y sin datos inventados.
- Accesible por teclado y con metadatos definidos.
- Documentación actualizada si cambia el alcance.

---

## 13. Pendientes de confirmación

- [ ] Biografía y enfoque definitivos.
- [ ] Formación académica real (institución, programa, estado, fechas).
- [ ] Certificaciones y su verificabilidad.
- [x] Proyectos reales, su estado y enlaces públicos (21 proyectos; 11 portadas pendientes).
- [ ] Enlaces profesionales y email de contacto.
- [ ] URL del blog externo para `NEXT_PUBLIC_BLOG_URL`.
- [ ] Dominio de producción para `NEXT_PUBLIC_SITE_URL`.

Ninguno de estos puntos debe completarse con datos supuestos.
