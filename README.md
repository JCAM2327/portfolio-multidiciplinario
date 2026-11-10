# Portfolio Multidisciplinario

Sitio personal de **José Carlos Alayo Mondragón** para presentar su trayectoria académica, científica, tecnológica y profesional, junto con un enlace a un blog externo que documenta el proceso de aprendizaje.

> Estado: sitio navegable con home, catálogo de 22 proyectos (listado y detalle), perfil, formación y contacto. La vista de una página está publicada en GitHub Pages: <https://jcam2327.github.io/portfolio-multidiciplinario/>. El sitio Next.js aún no está desplegado y el contenido de perfil está pendiente de confirmación.

## Enfoque

Ciencia, tecnología e ingeniería. Conectando conocimientos para resolver problemas reales.

Áreas representadas:

1. Desarrollo Frontend
2. Desarrollo Backend
3. Ciencia de Datos e Inteligencia Artificial
4. Química y Ciencias
5. Ingeniería e Industria 4.0
6. Educación y Tecnología Educativa
7. Proyectos interdisciplinarios (transversal)

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Contenido en Markdown/MDX con `gray-matter` y `next-mdx-remote`
- Iconos Lucide
- Hosting previsto: Vercel

No se incorporan bases de datos ni backend independiente en esta primera versión.

## Puesta en marcha

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

Comandos:

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run typecheck` | Verificación de tipos |

## Variables de entorno

Copiar `.env.example` a `.env.local` y completar los valores:

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (metadatos y sitemap) |
| `NEXT_PUBLIC_GITHUB_URL` | Enlace a GitHub (opcional) |
| `NEXT_PUBLIC_LINKEDIN_URL` | Enlace a LinkedIn (opcional) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email de contacto (opcional) |
| `NEXT_PUBLIC_BLOG_URL` | URL del blog externo (si está vacía, no se muestra el enlace) |

## Estructura

```text
content/    Contenido editable (perfil, proyectos, formación)
src/app/    Rutas y páginas (App Router)
src/components/  Componentes de UI, layout y secciones
src/lib/    Carga de contenido, configuración y utilidades
src/types/  Tipos compartidos
docs/       Documentación del proyecto y decisiones de arquitectura
public/     Recursos estáticos
```

## Documentación

- [Documento maestro](docs/PROJECT_MASTER.md)
- [Arquitectura](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [Contribución y convenciones](docs/CONTRIBUTING.md)

## Reglas de contenido

- No presentar estudios incompletos como títulos obtenidos.
- No presentar ideas o experimentos como proyectos terminados.
- No inventar proyectos, resultados ni certificaciones.
- No publicar datos personales ni documentos académicos privados.

Ver `docs/PROJECT_MASTER.md` para la especificación completa.
