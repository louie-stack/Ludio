"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STUDIO_STACK } from "@/config/work";

gsap.registerPlugin(ScrollTrigger);

export default function StudioStack() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const words = section.querySelectorAll("[data-word]");
      const tags = section.querySelectorAll("[data-tag]");
      const chips = section.querySelectorAll("[data-chip]");

      if (prefersReduced) {
        gsap.set([...Array.from(words), ...Array.from(tags), ...Array.from(chips)], {
          opacity: 1,
          yPercent: 0,
          y: 0,
          scale: 1,
        });
        return;
      }

      gsap.set(words, { opacity: 0, y: 24 });
      gsap.set(tags, { opacity: 0, y: 12 });
      gsap.set(chips, { opacity: 0, y: 14, scale: 0.92 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });

      tl.to(tags, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "expo.out",
      });
      tl.to(
        words,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.045,
          ease: "expo.out",
        },
        "-=0.3"
      );
      tl.to(
        chips,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.05,
          ease: "back.out(2.0)",
        },
        "-=0.4"
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const titleWords = "Built using.".split(" ").filter(Boolean);

  return (
    <section
      ref={ref}
      className="relative w-full bg-bg-warm"
      style={{
        paddingTop: "4vw",
        paddingBottom: "4vw",
        paddingLeft: "4vw",
        paddingRight: "4vw",
        borderTop: "1px solid rgba(49,49,49,0.08)",
      }}
    >
      <div className="flex items-start justify-between mb-[2vw]">
        <div data-tag className="flex items-center gap-3 opacity-0">
          <span
            aria-hidden
            className="inline-block rounded-full"
            style={{
              width: "0.4rem",
              height: "0.4rem",
              backgroundColor: "var(--blue)",
            }}
          />
          <span className="tag-text" style={{ color: "var(--grey)" }}>
            06 / Studio stack
          </span>
        </div>
        <span
          data-tag
          className="tag-text opacity-0"
          style={{ color: "var(--grey)" }}
        >
          AI-native workflow
        </span>
      </div>

      <h3
        className="section-title-grey mb-[2vw]"
        style={{
          fontSize: "clamp(2rem, 4.5vw, 5rem)",
          color: "var(--ink)",
        }}
      >
        {titleWords.map((w, i) => (
          <span
            key={i}
            className="inline-block align-top"
            style={{ paddingBottom: "0.06em" }}
          >
            <span
              data-word
              className="inline-block will-change-transform"
            >
              {w}
            </span>
          </span>
        ))}
      </h3>

      <ul className="flex flex-wrap gap-3">
        {STUDIO_STACK.map((s) => (
          <li
            key={s}
            data-chip
            className="stack-chip px-4 py-2.5 rounded-full text-[0.95rem] font-medium font-display opacity-0"
            style={{
              border: "1px solid rgba(49,49,49,0.18)",
              color: "var(--ink)",
              backgroundColor: "rgba(255,255,255,0.5)",
            }}
          >
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
