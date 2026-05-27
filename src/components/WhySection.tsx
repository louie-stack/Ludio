"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHY_POINTS } from "@/config/work";

gsap.registerPlugin(ScrollTrigger);

const TITLE = "Businesses partner with Ludio because of";
const TITLE_HIGHLIGHT = "craft + sharp instincts.";

export default function WhySection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const words = section.querySelectorAll("[data-word]");
      const items = section.querySelectorAll("[data-why-item]");
      const tags = section.querySelectorAll("[data-tag]");

      if (prefersReduced) {
        gsap.set([...Array.from(words), ...Array.from(items), ...Array.from(tags)], {
          opacity: 1,
          yPercent: 0,
          x: 0,
          y: 0,
        });
        return;
      }

      gsap.set(words, { opacity: 0, y: 24 });
      gsap.set(tags, { opacity: 0, y: 12 });
      gsap.set(items, { opacity: 0, x: -28 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });

      tl.to(tags, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "expo.out",
      });
      tl.to(
        words,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.045,
          ease: "expo.out",
        },
        "-=0.4"
      );
      tl.to(
        items,
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
        },
        "-=0.5"
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const titleWords = TITLE.split(" ").filter(Boolean);
  const highlightWords = TITLE_HIGHLIGHT.split(" ").filter(Boolean);

  return (
    <section
      ref={ref}
      className="relative w-full bg-bg-warm"
      style={{
        paddingTop: "var(--section-py-md)",
        paddingBottom: "var(--section-py-md)",
        paddingLeft: "var(--gutter-x)",
        paddingRight: "var(--gutter-x)",
      }}
    >
      <div className="flex items-start justify-between mb-[1vw]">
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
            05 / Why Ludio
          </span>
        </div>
        <span
          data-tag
          className="tag-text opacity-0"
          style={{ color: "var(--grey)" }}
        >
          Perspective + instincts
        </span>
      </div>

      <h2
        className="section-title-grey mb-[2vw] max-w-[20ch]"
        style={{
          fontSize: "clamp(2.8rem, 7vw, 8.5rem)",
          color: "var(--ink)",
          marginTop: "-0.12em",
        }}
      >
        {titleWords.map((w, i) => (
          <span
            key={`t-${i}`}
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
        <span style={{ color: "var(--coral)" }}>
          {highlightWords.map((w, i) => (
            <span
              key={`h-${i}`}
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
        </span>
      </h2>

      <ul className="flex flex-col">
        {WHY_POINTS.map((p, i) => (
          <li
            key={p}
            data-why-item
            className="flex items-start gap-3 sm:gap-6 opacity-0"
            style={{
              borderTop: i === 0 ? "1px solid rgba(49,49,49,0.12)" : undefined,
              borderBottom: "1px solid rgba(49,49,49,0.12)",
              paddingTop: "clamp(1rem, 1.6vw, 2rem)",
              paddingBottom: "clamp(1rem, 1.6vw, 2rem)",
            }}
          >
            <span
              className="tag-text flex-shrink-0 tabular-nums pt-1"
              style={{ color: "var(--grey)", minWidth: "1.75rem" }}
            >
              0{i + 1}
            </span>
            <div className="flex-1 flex items-start gap-3 sm:gap-4">
              <span
                aria-hidden
                className="flex-shrink-0 mt-1"
                style={{ color: "var(--coral)" }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M4 11.5L9 16.5L18 6.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p
                className="font-display font-medium leading-[1.05]"
                style={{
                  fontSize: "clamp(1.4rem, 2.6vw, 3rem)",
                  color: "var(--ink)",
                  letterSpacing: "-0.015em",
                }}
              >
                {p}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
