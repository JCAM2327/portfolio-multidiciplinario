"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  phrases: readonly string[];
  className?: string;
}

export function Typewriter({ phrases, className }: TypewriterProps) {
  const [text, setText] = useState(phrases[0] ?? "");

  useEffect(() => {
    if (phrases.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setText(phrases[0]);
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId = 0;

    setText("");

    function tick() {
      const phrase = phrases[phraseIndex];

      charIndex += deleting ? -1 : 1;
      setText(phrase.slice(0, Math.max(charIndex, 0)));

      let delay = deleting ? 38 : 72;

      if (!deleting && charIndex === phrase.length) {
        deleting = true;
        delay = 2100;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 380;
      }

      timeoutId = window.setTimeout(tick, delay);
    }

    timeoutId = window.setTimeout(tick, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [phrases]);

  return (
    <span className={className}>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true" className="caret-blink ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] rounded-full bg-accent" />
      <span className="sr-only">{phrases[0]}</span>
    </span>
  );
}
