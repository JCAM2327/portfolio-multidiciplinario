import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Clock,
  Code2,
  FlaskConical,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { clsx } from "clsx";
import { Container } from "@/components/ui/Container";
import { Typewriter } from "@/components/Typewriter";
import {
  AREA_CHIPS,
  METRICS,
  PORTFOLIO_COPY,
  SITE_STATUS,
  SKILL_GROUPS,
  WORK_LINES,
  type SkillIcon,
  type Tone,
} from "@/lib/portfolio";
import { siteConfig } from "@/lib/site";
import {
  buttonGhostDark,
  buttonPrimary,
  chipClass,
  eyebrowClass,
  sectionLeadClass,
  sectionTitleClass,
  tagClass,
} from "@/lib/styles";

export const metadata: Metadata = {
  title: "Inicio",
  alternates: { canonical: "/" },
};

const skillIcons: Record<SkillIcon, LucideIcon> = {
  code: Code2,
  chart: BarChart3,
  flask: FlaskConical,
  tools: Wrench,
};

const statusToneClass: Record<Tone, string> = {
  neutral: "text-[#94a3b8]",
  warning: "text-warning",
  success: "text-success",
  info: "text-accent-2",
  accent: "text-accent",
};

const workToneClass: Record<Tone, string> = {
  neutral: "tone-neutral",
  warning: "tone-warning",
  success: "tone-success",
  info: "tone-info",
  accent: "tone-accent",
};

function SectionHead({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
}) {
  return (
    <div className={clsx("max-w-[680px]", className)}>
      <span className={eyebrowClass}>{eyebrow}</span>
      <h2 className={clsx(sectionTitleClass, "mt-3.5")}>{title}</h2>
      {lead ? <p className={clsx(sectionLeadClass, "mt-3.5")}>{lead}</p> : null}
    </div>
  );
}

export default function HomePage() {
  const { hero, about, work, education, skills, contact } = PORTFOLIO_COPY;

  const contactEntries = [
    {
      label: "GitHub",
      meta: "Perfil público",
      pendingMeta: "Perfil público (por confirmar)",
      href: siteConfig.links.github,
      external: true,
    },
    {
      label: "LinkedIn",
      meta: "Perfil profesional",
      pendingMeta: "Perfil pendiente de configurar",
      href: siteConfig.links.linkedin,
      external: true,
    },
    {
      label: "Email",
      meta: "Contacto directo",
      pendingMeta: "Dirección pendiente de configurar",
      href: siteConfig.links.email
        ? `mailto:${siteConfig.links.email}`
        : undefined,
      external: false,
    },
  ];

  return (
    <div>
      <section
        id="inicio"
        aria-labelledby="hero-title"
        className="relative overflow-hidden bg-deep py-[clamp(56px,9vw,104px)] pb-[clamp(56px,8vw,92px)] text-deep-ink"
      >
        <div aria-hidden="true" className="deep-surface absolute inset-0" />
        <div aria-hidden="true" className="deep-grid absolute inset-0" />

        <Container className="relative">
          <div className="grid items-center gap-[clamp(32px,5vw,64px)] min-[941px]:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]">
            <div>
              <span className="inline-flex items-center gap-[9px] rounded-full border border-white/[0.16] bg-white/[0.04] px-3.5 py-[7px] text-[0.78rem] font-semibold tracking-[0.02em] text-deep-muted">
                <span
                  aria-hidden="true"
                  className="pulse-dot h-2 w-2 rounded-full bg-[#f59e0b]"
                />
                {hero.badge}
              </span>

              <h1
                id="hero-title"
                className="mt-[22px] text-[clamp(2.6rem,6.4vw,4.6rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-deep-ink"
              >
                {hero.titleLead}
                <br />
                <span className="text-deep-muted">{hero.titleAccent}</span>
              </h1>

              <p className="mt-[18px] flex min-h-[1.6em] flex-wrap items-baseline gap-2.5 text-[clamp(1.05rem,2vw,1.32rem)] font-semibold text-[#e8edf3]">
                <span className="font-medium text-deep-muted">
                  {hero.rolePrefix}
                </span>
                <Typewriter
                  phrases={hero.phrases}
                  className="border-b border-dashed border-[#5eead4]/35 text-[#5eead4]"
                />
              </p>

              <p className="mt-[22px] max-w-[58ch] text-[1.02rem] leading-relaxed text-deep-muted">
                {hero.leadBefore}
                <strong className="font-semibold text-deep-ink">
                  {hero.leadName}
                </strong>
                {hero.leadAfter}
              </p>

              <div className="mt-[30px] flex flex-wrap gap-3">
                <Link
                  href={hero.primaryCta.href}
                  className={`${buttonPrimary} max-[620px]:w-full`}
                >
                  {hero.primaryCta.label}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link
                  href={hero.secondaryCta.href}
                  className={`${buttonGhostDark} max-[620px]:w-full`}
                >
                  {hero.secondaryCta.label}
                </Link>
              </div>
            </div>

            <aside
              aria-label="Estado actual del sitio"
              className="relative max-w-[520px] rounded-[20px] border border-deep-line bg-white/[0.035] p-[22px] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8)] backdrop-blur-[6px]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-deep-line pb-3.5">
                <h2 className="text-[0.82rem] font-bold uppercase tracking-[0.1em] text-deep-muted">
                  {hero.statusTitle}
                </h2>
                <span className="rounded-full border border-deep-line px-[9px] py-[3px] font-mono text-[0.72rem] text-deep-muted">
                  {hero.statusVersion}
                </span>
              </div>

              <ul className="mt-1.5">
                {SITE_STATUS.map((entry) => (
                  <li
                    key={entry.label}
                    className="flex items-start justify-between gap-3.5 border-b border-dashed border-white/[0.09] py-3 text-[0.9rem] last:border-b-0"
                  >
                    <span className="font-semibold text-[#dbe3ec]">
                      {entry.label}
                    </span>
                    <span
                      className={clsx(
                        "inline-flex flex-none items-center gap-[7px] whitespace-nowrap text-[0.74rem] font-bold tracking-[0.03em] before:h-[7px] before:w-[7px] before:rounded-full before:bg-current before:content-['']",
                        statusToneClass[entry.tone],
                      )}
                    >
                      {entry.value}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-3.5 text-[0.78rem] leading-normal text-deep-muted">
                {hero.statusNote}
              </p>
            </aside>
          </div>
        </Container>
      </section>

      <section
        aria-label="Datos del sitio"
        className="border-b border-line bg-surface"
      >
        <Container>
          <div className="grid grid-cols-2 gap-px bg-line min-[821px]:grid-cols-4">
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                className="bg-surface px-4 py-[18px] first:pl-0 min-[821px]:px-[22px] min-[821px]:py-[26px] min-[821px]:first:pl-0"
              >
                <span className="block text-[clamp(1.7rem,3vw,2.2rem)] font-extrabold leading-none tracking-[-0.03em] text-ink">
                  {metric.value}
                </span>
                <span className="mt-2 block text-[0.82rem] font-semibold text-faint">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="sobre-mi"
        aria-labelledby="sobre-mi-title"
        className="py-[clamp(56px,8vw,92px)]"
      >
        <Container>
          <div className="grid items-start gap-[clamp(24px,4vw,48px)] min-[821px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div>
              <div className="max-w-[680px]">
                <span className={eyebrowClass}>{about.eyebrow}</span>
                <h2 id="sobre-mi-title" className={clsx(sectionTitleClass, "mt-3.5")}>
                  {about.title}
                </h2>
              </div>

              <div className="mt-[22px] text-[1.02rem] leading-relaxed text-muted [&>p+p]:mt-4">
                <p>
                  Soy <strong className="text-ink">{siteConfig.name}</strong>.{" "}
                  {about.paragraphs[0]}
                </p>
                <p>{about.paragraphs[1]}</p>
              </div>

              <div
                role="note"
                className="notice-warning mt-6 flex gap-3 rounded-control px-[18px] py-4 text-[0.88rem] leading-normal"
              >
                <AlertTriangle
                  aria-hidden="true"
                  className="mt-0.5 h-[18px] w-[18px] flex-none text-[var(--tone-warning)]"
                />
                <span>
                  <strong className="text-ink">{about.noteTitle}</strong>{" "}
                  {about.noteBody}
                </span>
              </div>

              <ul className="mt-[22px] flex flex-wrap gap-2" aria-label="Áreas de interés">
                {AREA_CHIPS.map((area) => (
                  <li key={area} className={chipClass}>
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card border border-line bg-surface p-6 shadow-card">
              <span className={eyebrowClass}>{about.principleEyebrow}</span>
              <blockquote className="mt-[18px] text-[1.16rem] leading-normal text-ink">
                {about.principle}
              </blockquote>
              <p className="mt-4 text-[0.84rem] text-faint">
                {about.principleNote}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="enfoque"
        aria-labelledby="enfoque-title"
        className="border-y border-line bg-canvas-soft py-[clamp(56px,8vw,92px)]"
      >
        <Container>
          <SectionHead
            eyebrow={work.eyebrow}
            title={work.title}
            lead={work.lead}
            className="mb-[clamp(30px,4vw,46px)]"
          />

          <div className="grid gap-5 min-[621px]:grid-cols-2 min-[941px]:grid-cols-3">
            {WORK_LINES.map((line) => {
              const cardClassName =
                "group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface p-6 shadow-card transition-[transform,border-color] duration-150 hover:-translate-y-[3px] hover:border-line-strong before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-linear-to-r before:from-accent before:to-accent-2 before:opacity-75";
              const cardContent = (
                <>
                  <span className="font-mono text-[0.78rem] tracking-[0.08em] text-faint">
                    {line.index}
                  </span>
                  <h3 className="mt-3 text-[1.18rem] font-semibold text-ink">
                    {line.title}
                  </h3>
                  <p className="mt-2.5 text-[0.93rem] italic text-muted">
                    {line.question}
                  </p>
                  <div className="mt-[18px] flex flex-wrap gap-1.5">
                    {line.tags.map((tag) => (
                      <span key={tag} className={tagClass}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2.5 pt-5 text-[0.76rem] font-semibold text-faint">
                    <span
                      className={clsx(
                        "rounded-full border px-[9px] py-[3px]",
                        workToneClass[line.statusTone],
                      )}
                    >
                      {line.status}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      {line.cta ? line.cta : null}
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </>
              );

              return line.href ? (
                <Link
                  key={line.index}
                  href={line.href}
                  aria-label={`${line.cta ?? "Ver proyectos"}: ${line.title}`}
                  className={`${cardClassName} focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`}
                >
                  {cardContent}
                </Link>
              ) : (
                <article key={line.index} className={cardClassName}>
                  {cardContent}
                </article>
              );
            })}
          </div>

          <p className="mt-5 text-[0.82rem] text-faint">{work.note}</p>
        </Container>
      </section>

      <section
        id="formacion"
        aria-labelledby="formacion-title"
        className="py-[clamp(56px,8vw,92px)]"
      >
        <Container>
          <div className="grid items-start gap-[clamp(24px,4vw,48px)] min-[821px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
            <div>
              <div className="max-w-[680px]">
                <span className={eyebrowClass}>{education.eyebrow}</span>
                <h2
                  id="formacion-title"
                  className={clsx(sectionTitleClass, "mt-3.5")}
                >
                  {education.title}
                </h2>
                <p className={clsx(sectionLeadClass, "mt-3.5")}>
                  {education.lead}
                </p>
              </div>

              <p className="mt-5 text-[1.02rem] leading-relaxed text-muted">
                {education.body}
              </p>
            </div>

            <div className="rounded-card border border-line bg-surface p-6 shadow-card">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b]/[0.14] px-[11px] py-[5px] text-[0.74rem] font-bold uppercase tracking-[0.03em] text-[var(--tone-warning)]">
                <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                {education.status}
              </span>
              <h3 className="mt-4 text-[1.2rem] font-semibold text-ink">
                {education.pendingTitle}
              </h3>
              <p className="mt-2.5 text-[0.93rem] leading-relaxed text-muted">
                {education.pendingBody}
              </p>
              <dl className="mt-5 grid gap-2.5 border-t border-line pt-[18px]">
                {education.meta.map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between gap-4 text-[0.85rem]"
                  >
                    <dt className="font-semibold text-faint">{item.label}</dt>
                    <dd className="text-right text-muted">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="habilidades"
        aria-labelledby="habilidades-title"
        className="border-y border-line bg-canvas-soft py-[clamp(56px,8vw,92px)]"
      >
        <Container>
          <SectionHead
            eyebrow={skills.eyebrow}
            title={skills.title}
            lead={skills.lead}
            className="mb-[clamp(30px,4vw,46px)]"
          />

          <div className="grid gap-5 min-[821px]:grid-cols-2">
            {SKILL_GROUPS.map((group) => {
              const Icon = skillIcons[group.icon];

              return (
                <article
                  key={group.title}
                  className="rounded-card border border-line bg-surface p-6 shadow-card"
                >
                  <div className="flex items-center gap-2.5 border-b border-line pb-4">
                    <Icon aria-hidden="true" className="h-[18px] w-[18px] text-accent" />
                    <h3 className="text-base font-semibold text-ink">
                      {group.title}
                    </h3>
                    <span className="ml-auto rounded-full border border-line bg-surface-muted px-[9px] py-[3px] text-[0.68rem] font-bold uppercase tracking-[0.04em] text-faint">
                      {group.badge}
                    </span>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg bg-surface-muted px-[11px] py-[5px] text-[0.8rem] font-semibold text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        id="contacto"
        aria-labelledby="contacto-title"
        className="py-[clamp(56px,8vw,92px)]"
      >
        <Container>
          <div className="relative grid items-center gap-[clamp(26px,4vw,48px)] overflow-hidden rounded-panel border border-deep-line bg-deep p-[clamp(26px,4vw,44px)] text-deep-ink min-[821px]:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <div aria-hidden="true" className="deep-surface absolute inset-0" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 text-[0.76rem] font-bold uppercase tracking-[0.12em] text-[#5eead4] before:h-[2px] before:w-[22px] before:rounded-full before:bg-current before:content-['']">
                {contact.eyebrow}
              </span>
              <h2
                id="contacto-title"
                className="mt-3.5 text-[clamp(1.8rem,3.4vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.02em]"
              >
                {contact.title}
              </h2>
              <p className="mt-3.5 max-w-[48ch] text-deep-muted">
                {contact.lead}
              </p>
            </div>

            <div className="relative grid gap-2.5">
              {contactEntries.map((entry) => {
                if (!entry.href) {
                  return (
                    <div
                      key={entry.label}
                      className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-deep-line bg-white/[0.04] px-4 py-[13px] text-[0.9rem] font-semibold text-deep-muted"
                    >
                      <span>
                        {entry.label}
                        <span className="mt-0.5 block text-[0.72rem] font-medium text-deep-muted">
                          {entry.pendingMeta}
                        </span>
                      </span>
                      <span className="flex-none rounded-full border border-deep-line px-[9px] py-[3px] text-[0.68rem] font-bold uppercase tracking-[0.04em]">
                        {contact.pendingValue}
                      </span>
                    </div>
                  );
                }

                return (
                  <a
                    key={entry.label}
                    href={entry.href}
                    {...(entry.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center justify-between gap-3 rounded-xl border border-deep-line bg-white/[0.04] px-4 py-[13px] text-[0.9rem] font-semibold text-deep-ink transition-colors hover:border-white/30 hover:bg-white/[0.1]"
                  >
                    <span>
                      {entry.label}
                      <span className="mt-0.5 block text-[0.72rem] font-medium text-deep-muted">
                        {entry.meta}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 flex-none text-deep-muted"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
