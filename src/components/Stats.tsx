"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  isText?: boolean;
  textValue?: string;
};

const STATS: Stat[] = [
  { value: 4, suffix: "+", label: "years experience" },
  { value: 30, suffix: "+", label: "projects delivered" },
  { value: 0, suffix: "", label: "AI-native studio", isText: true, textValue: "∞" },
];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setValue(to);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const duration = 1600;
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 4);
              setValue(Math.round(to * eased));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const tags = section.querySelectorAll("[data-tag]");
      const cells = section.querySelectorAll("[data-stat]");
      if (prefersReduced) {
        gsap.set([...Array.from(tags), ...Array.from(cells)], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.set(tags, { opacity: 0, y: 10 });
      gsap.set(cells, { opacity: 0, y: 28 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });
      tl.to(tags, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "expo.out",
      });
      tl.to(
        cells,
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "expo.out",
        },
        "-=0.3"
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="stats"
      className="relative w-full bg-bg-warm"
      style={{
        paddingTop: "var(--section-py-sm)",
        paddingBottom: "var(--section-py-sm)",
        paddingLeft: "var(--gutter-x)",
        paddingRight: "var(--gutter-x)",
        borderTop: "1px solid rgba(49,49,49,0.08)",
        borderBottom: "1px solid rgba(49,49,49,0.08)",
      }}
    >
      <div className="flex items-start justify-between mb-[2.5vw]">
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
            00 / Studio
          </span>
        </div>
        <span
          data-tag
          className="tag-text text-right opacity-0"
          style={{ color: "var(--grey)" }}
        >
          MMXXVI
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[3vw]">
        {STATS.map((s) => (
          <div
            key={s.label}
            data-stat
            className="flex flex-col items-start gap-2 opacity-0"
          >
            <div
              className="font-display font-semibold leading-none tracking-tight"
              style={{
                fontSize: "clamp(3.5rem, 7vw, 8rem)",
                color: "var(--ink)",
                letterSpacing: "-0.04em",
              }}
            >
              {s.isText ? (
                <span>{s.textValue ?? "∞"}</span>
              ) : (
                <CountUp to={s.value} suffix={s.suffix} />
              )}
            </div>
            <div className="tag-text" style={{ color: "var(--grey)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
