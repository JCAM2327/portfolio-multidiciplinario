# Proyectos

Cada proyecto se define en un archivo `<slug>.mdx`. El listado de `/proyectos`, los filtros y las tarjetas se generan automáticamente a partir de estos archivos.

## Imagen de portada

1. Crear la carpeta `public/proyectos/<slug>/`.
2. Guardar la imagen como `cover.png`, `cover.jpg`, `cover.jpeg` o `cover.webp`.
3. No hace falta declararla en el frontmatter: el sitio la detecta automáticamente.
4. Si no existe, la tarjeta muestra un placeholder con el nombre del proyecto.

Tamaño recomendado: 1200 × 750 px, relación 16:10, menos de 500 KB. Para capturas de sitios, usar una vista de escritorio legible y evitar datos personales.

## Campos del frontmatter

- `title`: nombre visible del proyecto.
- `summary`: una o dos frases para la tarjeta.
- `area`: `frontend`, `backend`, `datos-ia`, `quimica-ciencias`, `ingenieria-industria`, `educacion-tecnologia` o `interdisciplinario`.
- `status`: `idea`, `en desarrollo`, `MVP`, `prototipo`, `publicado`, `pausado` o `archivado`.
- `technologies`: lista de tecnologías.
- `featured`: `true` para priorizar el proyecto en el listado.
- `lastUpdated`: fecha en formato `YYYY-MM-DD`.
- `repoUrl`: enlace al repositorio público.
- `demoUrl`: enlace a la demo, si existe.

## Reglas de contenido

- Escribir en español.
- No inventar resultados, métricas, títulos ni funcionalidades.
- Distinguir entre idea, prototipo, MVP y proyecto publicado.
- Si el README del repositorio no alcanza para describir el proyecto, indicar que la descripción está pendiente de confirmación.
- No publicar datos personales, documentos privados ni secretos.
