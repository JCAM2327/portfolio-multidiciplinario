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

## Fase 2 — Contenido y rutas

- [ ] Completar `content/perfil.md` con datos confirmados.
- [ ] Completar `content/formacion.md` con datos confirmados.
- [ ] Cargar proyectos reales con su estado y enlaces verificados.
- [x] `/proyectos` con filtros por área y estado.
- [x] `/proyectos/[slug]` con render MDX.
- [x] Enlace al blog externo (`NEXT_PUBLIC_BLOG_URL`) en la home.
- [x] `/sobre-mi` y `/formacion`.
- [x] `/contacto` desde variables de entorno.
- [x] Página 404 personalizada.

## Fase 3 — Calidad

- [ ] Revisión de accesibilidad (teclado, foco, contraste, semántica). Revisión de código hecha: skip link, foco visible, `aria-current` y menú con Escape; falta prueba manual en navegador.
- [x] SEO: `sitemap.xml`, `robots.txt`, metadatos por página.
- [ ] Rendimiento: imágenes optimizadas, JS de cliente mínimo. No hay imágenes; islas cliente limitadas a menú, navegación y filtros. Falta medir.
- [x] Revisión de contenido contra las reglas de privacidad y honestidad.
- [x] Enlaces externos con `rel="noopener noreferrer"`.

## Fase 4 — Publicación

- [x] Crear `docs/index.html`: portfolio de una página, autocontenido, publicable con GitHub Pages desde `/docs` (`docs/.nojekyll` incluido). Contenido honesto: perfil, formación y proyectos marcados como pendientes; GitHub enlazado desde `NEXT_PUBLIC_GITHUB_URL`, LinkedIn y email pendientes.
- [x] Publicar la vista de una página en GitHub Pages: <https://jcam2327.github.io/portfolio/>.
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

- Falta confirmar biografía, formación, certificaciones, proyectos y enlaces.
- `npm run typecheck` y `npm run build` no se han podido ejecutar en el entorno de la herramienta; deben verificarse localmente.
- La herramienta de terminal (`bash`) no está disponible en esta sesión, así que no se pudo validar el HTML ni ejecutar Git; las comprobaciones deben hacerse localmente.
