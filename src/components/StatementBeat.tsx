"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  children: React.ReactNode;
  highlight?: string;
  eyebrow?: string;
  align?: "left" | "right";
  size?: "lg" | "xl";
  id?: string;
};

export default function StatementBeat({
  children,
  highlight,
  eyebrow,
  align = "left",
  size = "xl",
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const words = ref.current!.querySelectorAll("[data-word]");
      const eb = ref.current!.querySelector("[data-eyebrow]");

      if (prefersReduced) {
        gsap.set([...Array.from(words), eb].filter(Boolean) as Element[], {
          opacity: 1,
          yPercent: 0,
          y: 0,
        });
        return;
      }

      gsap.set(words, { opacity: 0, y: 24 });
      if (eb) gsap.set(eb, { opacity: 0, y: 14 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
          once: true,
        },
      });

      if (eb) tl.to(eb, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0);
      tl.to(
        words,
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: "expo.out",
          stagger: 0.04,
        },
        0.05
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const text = typeof children === "string" ? children : "";
  let pre = text;
  let mid = "";
  let post = "";
  if (highlight && text.includes(highlight)) {
    const i = text.indexOf(highlight);
    pre = text.slice(0, i);
    mid = highlight;
    post = text.slice(i + highlight.length);
  }

  const wrapWords = (s: string, keyPrefix: string) =>
    s.split(/\s+/).filter(Boolean).map((w, i) => (
      <span
        key={`${keyPrefix}-${i}`}
        data-word
        className="inline-block will-change-transform"
      >{w}</span>
    ));

  const sizeStyle =
    size === "xl"
      ? { fontSize: "clamp(2.4rem, 9vw, 11rem)" }
      : { fontSize: "clamp(1.9rem, 6.5vw, 8rem)" };

  return (
    <section
      ref={ref}
      id={id}
      className={`relative w-full bg-bg-warm`}
      style={{ paddingTop: "7vw", paddingBottom: "7vw" }}
    >
      <div
        className={`mx-auto ${
          align === "right" ? "text-right" : "text-left"
        }`}
        style={{ paddingLeft: "4vw", paddingRight: "4vw", maxWidth: "100%" }}
      >
        {eyebrow && (
          <div
            data-eyebrow
            className="tag-text mb-[0.6vw] opacity-0"
            style={{ color: "var(--grey)" }}
          >
            {eyebrow}
          </div>
        )}
        <h2
          className="statement-peach"
          style={{
            ...sizeStyle,
            marginTop: "-0.12em",
            marginBottom: "-0.08em",
          }}
        >
          {wrapWords(pre, "pre")}
          {mid && (
            <span style={{ color: "var(--coral)" }}>
              {wrapWords(mid, "mid")}
            </span>
          )}
          {wrapWords(post, "post")}
        </h2>
      </div>
    </section>
  );
}
