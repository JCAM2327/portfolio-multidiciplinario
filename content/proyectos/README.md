# Proyectos

Cada proyecto se define en un archivo `<slug>.mdx`. El listado de `/proyectos`, los filtros y las tarjetas se generan automáticamente a partir de estos archivos. La portada (`/`) muestra solo los proyectos destacados; el catálogo completo vive en `/proyectos`.

## Imagen de portada

1. Crear la carpeta `public/proyectos/<slug>/`.
2. Guardar la imagen como `cover.png`, `cover.jpg`, `cover.jpeg` o `cover.webp`.
3. No hace falta declararla en el frontmatter: el sitio la detecta automáticamente.
4. Si no existe, la tarjeta muestra un placeholder con el nombre del proyecto.

Tamaño recomendado: 1200 × 750 px, relación 16:10, menos de 500 KB. Para capturas de sitios, usar una vista de escritorio legible y evitar datos personales.

## Proyectos destacados en la portada

La portada renderiza únicamente los archivos con `featured: true`, con un límite de 6 (`FEATURED_HOME_LIMIT` en `src/lib/content.ts`). Si ningún proyecto está marcado, la sección no se renderiza.

Para destacar un proyecto:

1. Abrir su `.mdx` en `content/proyectos/`.
2. Cambiar `featured: false` a `featured: true` (o añadir la línea si no existe).
3. Guardar. La portada lo mostrará en la sección "Destacados", ordenado por `lastUpdated` entre los destacados.

`/proyectos` no depende de este flag: siempre muestra el catálogo completo con sus filtros.

## Campos del frontmatter

- `title`: nombre visible del proyecto.
- `summary`: una o dos frases para la tarjeta.
- `area`: `frontend`, `backend`, `datos-ia`, `quimica-ciencias`, `ingenieria-industria`, `educacion-tecnologia` o `interdisciplinario`.
- `status`: `idea`, `en desarrollo`, `MVP`, `prototipo`, `publicado`, `pausado` o `archivado`.
- `technologies`: lista de tecnologías.
- `featured`: `true` para mostrar el proyecto en la sección de destacados de la portada. No afecta al catálogo `/proyectos`.
- `lastUpdated`: fecha en formato `YYYY-MM-DD`.
- `repoUrl`: enlace al repositorio público.
- `demoUrl`: enlace a la demo, si existe.

## Reglas de contenido

- Escribir en español.
- No inventar resultados, métricas, títulos ni funcionalidades.
- Distinguir entre idea, prototipo, MVP y proyecto publicado.
- Si el README del repositorio no alcanza para describir el proyecto, indicar que la descripción está pendiente de confirmación.
- No publicar datos personales, documentos privados ni secretos.
