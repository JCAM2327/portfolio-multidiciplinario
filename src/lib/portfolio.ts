export type Tone = "neutral" | "warning" | "success" | "info" | "accent";

export interface Metric {
  value: number;
  label: string;
}

export interface StatusEntry {
  label: string;
  value: string;
  tone: Tone;
}

export interface WorkLine {
  index: string;
  title: string;
  question: string;
  tags: string[];
  status: string;
  statusTone: Tone;
  href?: string;
  cta?: string;
}

export type SkillIcon = "code" | "chart" | "flask" | "tools";

export interface SkillGroup {
  title: string;
  badge: string;
  icon: SkillIcon;
  items: string[];
}

export const PORTFOLIO_COPY = {
  brandShortName: "José Alayo",
  brandSubtitle: "Portfolio en construcción",
  hero: {
    badge: "Sitio en construcción · contenido pendiente de confirmación",
    titleLead: "Hola, soy José.",
    titleAccent: "Construyo puentes entre disciplinas.",
    rolePrefix: "Explorando",
    phrases: [
      "ciencia, datos y tecnología",
      "desarrollo web claro",
      "análisis con criterio",
      "química e ingeniería",
      "aprendizaje documentado",
    ],
    leadName: "José Carlos Alayo Mondragón",
    leadBefore: "Soy ",
    leadAfter:
      ". Este es mi espacio para conectar lo que estudio y construyo —desarrollo web, datos e inteligencia artificial, ciencias, ingeniería e industria, y educación con tecnología— con la misma honestidad con la que trabajo: sin adornos que no pueda respaldar.",
    primaryCta: { label: "Ver proyectos", href: "/proyectos" },
    secondaryCta: { label: "Contacto", href: "/#contacto" },
    statusTitle: "Estado del sitio",
    statusVersion: "v0.2",
    statusNote:
      "No doy por terminado nada sin evidencia verificable. Mis proyectos ya están en el catálogo con su estado real; las portadas que faltan las iré agregando a medida que tenga imágenes que pueda mostrar.",
  },
  about: {
    eyebrow: "Sobre mí",
    title: "Una trayectoria en construcción, contada sin atajos.",
    paragraphs: [
      "Quiero unir en un solo lugar la formación académica, la práctica técnica y el aprendizaje continuo: un portfolio que explique qué sé hacer, cómo pienso y qué estoy construyendo.",
      "La biografía y los detalles de mi trayectoria están pendientes de confirmación. Prefiero no publicar logros, títulos ni experiencia hasta poder respaldarlos con información verificada.",
    ],
    noteTitle: "Contenido pendiente de confirmación.",
    noteBody:
      "Voy a completar esta sección con información verificada y con el nivel de detalle que yo decida hacer público, sin apurar datos que aún no puedo respaldar.",
    principleEyebrow: "Principio de trabajo",
    principle:
      "“Conectar conocimientos para resolver problemas reales, sin exagerar lo que todavía está en proceso.”",
    principleNote:
      "Mi regla: nada de datos inventados. Cada afirmación debe poder verificarse o quedar marcada como pendiente.",
  },
  work: {
    eyebrow: "Enfoque",
    title: "Líneas de trabajo que conectan disciplinas.",
    lead:
      "Estas preguntas guían mi aprendizaje y mi práctica. Los proyectos concretos están en el catálogo, con su estado real y sus enlaces públicos.",
    note:
      "Cada proyecto declara si es una idea, un prototipo, un MVP o un proyecto publicado. Iré agregando las portadas que faltan cuando tenga imágenes verificables.",
  },
  featuredWork: {
    eyebrow: "Destacados",
    title: "Proyectos que quiero que veas primero.",
    lead:
      "Una selección de proyectos con su estado real y sus enlaces públicos. El catálogo completo, con filtros por área y estado, está en la página de proyectos.",
    cta: "Ver todos los proyectos",
  },
  education: {
    eyebrow: "Formación",
    title: "Datos académicos pendientes de verificación.",
    lead:
      "Publicaré mi formación con institución, programa, nivel, estado y fechas reales. Si algo está incompleto o en curso, lo mostraré como tal: nunca como un título obtenido.",
    body:
      "Si necesitas información académica antes de que esta sección esté completa, puedes escribirme cuando el canal de contacto esté configurado.",
    status: "Pendiente de confirmación",
    pendingTitle: "Formación académica",
    pendingBody:
      "Prefiero no mostrar títulos, certificaciones ni instituciones hasta tener la información verificada y la autorización para publicarla.",
    meta: [
      { label: "Institución", value: "Por confirmar" },
      { label: "Programa", value: "Por confirmar" },
      { label: "Nivel / estado", value: "Por confirmar" },
      { label: "Fechas", value: "Por confirmar" },
    ],
  },
  skills: {
    eyebrow: "Habilidades",
    title: "Herramientas y temas de interés.",
    lead:
      "Sin porcentajes ni niveles inventados. Esta lista resume mi entorno de trabajo y los temas que quiero seguir profundizando.",
  },
  contact: {
    eyebrow: "Contacto",
    title: "Hablemos cuando los canales estén listos.",
    lead:
      "Puedes explorar mi trabajo público en GitHub. LinkedIn y email siguen pendientes de configuración y verificación: no publico perfiles ni direcciones sin confirmarlos antes.",
    pendingValue: "Por confirmar",
  },
  footer: {
    note: "Sitio en construcción.",
    pending: "Contenido pendiente de confirmación",
    backToTop: "Volver arriba",
  },
} as const;

export const SITE_STATUS: StatusEntry[] = [
  { label: "Estructura y diseño", value: "Listo", tone: "success" },
  { label: "Perfil y biografía", value: "Por confirmar", tone: "warning" },
  { label: "Formación académica", value: "Por confirmar", tone: "warning" },
  { label: "Proyectos en catálogo", value: "20", tone: "success" },
  { label: "Blog externo", value: "Sin URL", tone: "neutral" },
];

export const METRICS: Metric[] = [
  { value: 7, label: "áreas de interés declaradas" },
  { value: 20, label: "proyectos en el catálogo" },
  { value: 9, label: "demos y sitios publicados" },
  { value: 2, label: "datos clave pendientes: perfil y formación" },
];

export const WORK_LINES: WorkLine[] = [
  {
    index: "01 / datos",
    title: "Datos que ayuden a decidir",
    question: "¿Cómo pasar de datos dispersos a decisiones defendibles?",
    tags: ["Python", "SQL", "Visualización"],
    status: "En exploración",
    statusTone: "accent",
    href: "/proyectos?area=datos-ia",
    cta: "Ver proyectos",
  },
  {
    index: "02 / web",
    title: "Herramientas web claras",
    question: "¿Cómo construir interfaces que expliquen lo complejo sin ruido?",
    tags: ["Next.js", "TypeScript", "Accesibilidad"],
    status: "En uso en este sitio",
    statusTone: "success",
    href: "/proyectos?area=frontend",
    cta: "Ver proyectos",
  },
  {
    index: "03 / ciencia",
    title: "Ciencia aplicada a la industria",
    question: "¿Cómo conectar química, física e ingeniería con software útil?",
    tags: ["Modelado", "Procesos", "Automatización"],
    status: "En exploración",
    statusTone: "accent",
    href: "/proyectos?area=quimica-ciencias",
    cta: "Ver proyectos",
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Desarrollo web",
    badge: "En uso",
    icon: "code",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    title: "Datos e IA",
    badge: "Interés",
    icon: "chart",
    items: [
      "Python",
      "SQL",
      "Análisis de datos",
      "Visualización",
      "Aprendizaje automático",
    ],
  },
  {
    title: "Ciencias",
    badge: "Interés",
    icon: "flask",
    items: ["Química", "Física", "Matemáticas", "Método científico"],
  },
  {
    title: "Entorno y práctica",
    badge: "Base",
    icon: "tools",
    items: ["Git", "GitHub", "VS Code", "Markdown / MDX", "Documentación"],
  },
];

export const AREA_CHIPS: string[] = [
  "Desarrollo frontend",
  "Desarrollo backend",
  "Datos e IA",
  "Química y ciencias",
  "Ingeniería e industria",
  "Educación y tecnología",
  "Proyectos interdisciplinarios",
];
