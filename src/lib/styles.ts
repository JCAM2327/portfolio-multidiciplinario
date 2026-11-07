const focusRing =
  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

export const buttonBase = `inline-flex items-center justify-center gap-2 rounded-control px-5 py-3 text-sm font-bold transition-all duration-150 ${focusRing} disabled:pointer-events-none disabled:opacity-50`;

export const buttonPrimary = `${buttonBase} bg-accent text-accent-contrast shadow-sm hover:bg-accent-strong active:translate-y-px`;

export const buttonSecondary = `${buttonBase} border border-line bg-surface text-ink shadow-sm hover:border-line-strong hover:bg-surface-muted active:translate-y-px`;

export const buttonGhostDark = `${buttonBase} border border-deep-line bg-white/[0.03] text-deep-ink hover:bg-white/[0.09] active:translate-y-px`;

export const buttonOnDark = `${buttonBase} bg-white text-ink hover:bg-slate-100 active:translate-y-px`;

export const textLink =
  "font-semibold text-accent underline-offset-4 transition-colors hover:text-accent-strong hover:underline";

export const iconButtonClass =
  "grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-line bg-surface text-ink transition-colors hover:border-line-strong hover:bg-surface-muted";

export const navLinkClass =
  "inline-block rounded-[9px] px-3 py-2 text-sm font-semibold text-muted transition-colors hover:bg-surface-muted hover:text-ink";

export const navLinkActiveClass = "nav-active";

export const eyebrowClass =
  "inline-flex items-center gap-2 text-[0.76rem] font-bold uppercase tracking-[0.12em] text-accent before:h-[2px] before:w-[22px] before:rounded-full before:bg-current before:content-['']";

export const sectionTitleClass =
  "text-balance text-[clamp(1.9rem,3.8vw,2.7rem)] font-bold leading-[1.12] tracking-[-0.02em] text-ink";

export const sectionLeadClass =
  "text-pretty text-[1.02rem] leading-relaxed text-muted";

export const cardClass =
  "rounded-card border border-line bg-surface shadow-card";

export const chipClass =
  "inline-flex items-center rounded-full border border-line bg-surface px-3 py-1.5 text-[0.79rem] font-semibold text-muted";

export const tagClass =
  "inline-flex items-center rounded-md border border-line bg-surface-muted px-2 py-1 text-[0.72rem] font-semibold text-muted";

export const selectClass =
  "h-10 w-full appearance-none rounded-control border border-line bg-surface pl-3 pr-9 text-sm font-medium text-ink shadow-sm transition-colors hover:border-line-strong focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 sm:w-56";
