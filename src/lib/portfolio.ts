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
    leadBefore:
      "Portfolio personal de ",
    leadAfter:
      ". Reúne las áreas que quiero conectar —desarrollo web, datos e inteligencia artificial, ciencias, ingeniería e industria, y educación con tecnología— mientras el contenido se verifica y se publica de forma honesta.",
    primaryCta: { label: "Ver proyectos", href: "/proyectos" },
    secondaryCta: { label: "Contacto", href: "/#contacto" },
    statusTitle: "Estado del sitio",
    statusVersion: "v0.2",
    statusNote:
      "Nada se presenta como terminado sin evidencia verificable. Los proyectos ya están en el catálogo con su estado real; las portadas que faltan se irán agregando.",
  },
  about: {
    eyebrow: "Sobre mí",
    title: "Una trayectoria en construcción, contada sin atajos.",
    paragraphs: [
      "Este espacio nace para conectar la formación académica, la práctica técnica y el aprendizaje continuo en un mismo lugar: un portfolio que explique qué sé hacer, cómo pienso y qué estoy construyendo.",
      "La biografía definitiva y los detalles de mi trayectoria están pendientes de confirmación. No publico logros, títulos ni experiencia hasta poder respaldarlos con información verificada.",
    ],
    noteTitle: "Contenido pendiente de confirmación.",
    noteBody:
      "Esta sección se completará con información verificada y con el nivel de detalle que la persona autora decida hacer público.",
    principleEyebrow: "Principio de trabajo",
    principle:
      "“Conectar conocimientos para resolver problemas reales, sin exagerar lo que todavía está en proceso.”",
    principleNote:
      "Regla del proyecto: nada de datos inventados. Cada afirmación debe poder verificarse o marcarse como pendiente.",
  },
  work: {
    eyebrow: "Enfoque",
    title: "Líneas de trabajo que conectan disciplinas.",
    lead:
      "Estas preguntas guían mi aprendizaje y mi práctica. Los proyectos concretos están en el catálogo, con su estado real y sus enlaces públicos.",
    note:
      "Cada proyecto declara si es una idea, un prototipo, un MVP o un proyecto publicado. Las portadas que faltan se agregarán cuando existan imágenes verificables.",
  },
  education: {
    eyebrow: "Formación",
    title: "Datos académicos pendientes de verificación.",
    lead:
      "La formación se publicará con institución, programa, nivel, estado y fechas reales. Los estudios incompletos o en curso se mostrarán como tales, nunca como títulos obtenidos.",
    body:
      "Si necesitás información académica antes de que esta sección esté completa, el canal correcto será el de contacto profesional cuando esté configurado.",
    status: "Pendiente de confirmación",
    pendingTitle: "Formación académica",
    pendingBody:
      "No se presentan títulos, certificaciones ni instituciones hasta contar con la información verificada y la autorización para publicarla.",
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
      "Sin porcentajes ni niveles inventados. Esta lista describe el entorno de trabajo y los temas que quiero seguir profundizando.",
  },
  contact: {
    eyebrow: "Contacto",
    title: "Hablemos cuando los canales estén listos.",
    lead:
      "Podés explorar el trabajo público en GitHub. LinkedIn y email siguen pendientes de configuración y verificación: no se publican perfiles ni direcciones sin confirmación.",
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
  { label: "Proyectos en catálogo", value: "21", tone: "success" },
  { label: "Blog externo", value: "Sin URL", tone: "neutral" },
];

export const METRICS: Metric[] = [
  { value: 7, label: "áreas de interés declaradas" },
  { value: 21, label: "proyectos en el catálogo" },
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
