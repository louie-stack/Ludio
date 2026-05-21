"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVIEWS } from "@/config/work";

gsap.registerPlugin(ScrollTrigger);

const TITLE = "From the people we've built with.";

export default function Reviews() {
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
      const cards = section.querySelectorAll("[data-review-card]");

      if (prefersReduced) {
        gsap.set([...Array.from(words), ...Array.from(tags), ...Array.from(cards)], {
          opacity: 1,
          yPercent: 0,
          y: 0,
        });
        return;
      }

      gsap.set(words, { opacity: 0, y: 24 });
      gsap.set(tags, { opacity: 0, y: 12 });
      gsap.set(cards, { opacity: 0, y: 32 });

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
        cards,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "expo.out",
        },
        "-=0.5"
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const titleWords = TITLE.split(" ").filter(Boolean);

  return (
    <section
      ref={ref}
      className="relative w-full bg-bg-warm"
      style={{
        paddingTop: "5vw",
        paddingBottom: "5vw",
        paddingLeft: "4vw",
        paddingRight: "4vw",
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
            07 / Words
          </span>
        </div>
        <span
          data-tag
          className="tag-text text-right opacity-0"
          style={{ color: "var(--grey)" }}
        >
          [Sample, replace with real client testimonials]
        </span>
      </div>

      <h3
        className="section-title-grey mb-[2vw] max-w-[18ch]"
        style={{
          fontSize: "clamp(2.8rem, 7vw, 8.5rem)",
          color: "var(--ink)",
          marginTop: "-0.12em",
        }}
      >
        {titleWords.map((w, i) => (
          <span
            key={`r-${i}`}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.5vw]">
        {REVIEWS.map((r, i) => (
          <article
            key={i}
            data-review-card
            className="relative rounded-[12px] flex flex-col gap-8 opacity-0"
            style={{
              padding: "2.4vw 2vw",
              backgroundColor:
                i === 1 ? "var(--ink)" : "rgba(255,255,255,0.5)",
              border:
                i === 1
                  ? "1px solid transparent"
                  : "1px solid rgba(49,49,49,0.1)",
              color: i === 1 ? "var(--bg-warm)" : "var(--ink)",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden
              style={{ color: "var(--coral)" }}
            >
              <path
                d="M11 22C7 22 4 19 4 15c0-5 4-9 9-10v3c-3 1-5 4-5 7h3v7H11zm14 0c-4 0-7-3-7-7 0-5 4-9 9-10v3c-3 1-5 4-5 7h3v7h0z"
                fill="currentColor"
              />
            </svg>

            <p
              className="font-display font-medium leading-[1.15]"
              style={{
                fontSize: "clamp(1.1rem, 1.5vw, 1.6rem)",
                letterSpacing: "-0.01em",
              }}
            >
              {r.quote}
            </p>

            <div className="mt-auto">
              <div className="font-display font-semibold">{r.author}</div>
              <div
                className="tag-text mt-1"
                style={{
                  color: i === 1 ? "rgba(250,246,239,0.55)" : "var(--grey)",
                }}
              >
                {r.company}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
