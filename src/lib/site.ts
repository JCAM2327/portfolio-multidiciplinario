export const siteConfig = {
  name: "José Carlos Alayo Mondragón",
  description:
    "Portfolio multidisciplinario: ciencia, tecnología e ingeniería para resolver problemas reales.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  links: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || undefined,
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || undefined,
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
    blog: process.env.NEXT_PUBLIC_BLOG_URL || undefined,
  },
} as const;
