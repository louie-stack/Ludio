"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import type { WorkItem } from "@/config/work";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  id: string;
  number: string;
  title: string;
  line: string;
  includes: readonly string[];
  items: WorkItem[];
};

export default function WebShowcase({
  id,
  number,
  title,
  line,
  includes,
  items,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const titleWordEls = section.querySelectorAll("[data-word]");
      const meta = section.querySelectorAll("[data-meta]");
      const cards = section.querySelectorAll("[data-web-card]");
      const cta = section.querySelector("[data-web-cta]");

      if (prefersReduced) {
        gsap.set(
          [
            ...Array.from(titleWordEls),
            ...Array.from(meta),
            ...Array.from(cards),
            ...(cta ? [cta] : []),
          ] as Element[],
          { opacity: 1, y: 0 }
        );
        return;
      }

      gsap.set(titleWordEls, { opacity: 0, y: 24 });
      gsap.set(meta, { opacity: 0, y: 12 });
      gsap.set(cards, { opacity: 0, y: 36 });
      if (cta) gsap.set(cta, { opacity: 0, y: 18 });

      const intro = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });
      intro.to(meta, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.05,
        ease: "expo.out",
      });
      intro.to(
        titleWordEls,
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.05,
          ease: "expo.out",
        },
        "-=0.3"
      );

      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        });
      });

      if (cta) {
        gsap.to(cta, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: { trigger: cta, start: "top 92%", once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = title.split(" ").filter(Boolean);
  const cards = items;

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full bg-bg-warm"
      style={{
        paddingTop: "5vw",
        paddingBottom: "5vw",
        paddingLeft: "4vw",
        paddingRight: "4vw",
      }}
    >
      <div className="flex items-start justify-between mb-[2.5vw]">
        <div data-meta className="flex items-center gap-3 opacity-0">
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
            {number} / Services
          </span>
        </div>
        <span
          data-meta
          className="tag-text text-right opacity-0"
          style={{ color: "var(--grey)" }}
        >
          {items.length} shipped · click any site to view live
        </span>
      </div>

      <div className="flex flex-col items-center gap-[1.2vw] mx-auto max-w-[46rem] text-center mb-[3vw]">
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.6rem, 5.2vw, 6.5rem)",
            color: "var(--ink)",
            fontWeight: 600,
            lineHeight: "1.02",
            letterSpacing: "-0.028em",
          }}
        >
          {titleWords.map((w, i) => (
            <span
              key={i}
              className="inline-block align-top"
              style={{ paddingBottom: "0.08em" }}
            >
              <span data-word className="inline-block will-change-transform">
                {w}
              </span>
              {i < titleWords.length - 1 ? " " : ""}
            </span>
          ))}
        </h3>
        <p
          data-meta
          className="text-[0.95rem] leading-[1.5] font-semibold max-w-[42ch] opacity-0"
          style={{ color: "var(--grey)" }}
        >
          {line}
        </p>
        <ul
          data-meta
          className="flex flex-wrap justify-center gap-1.5 opacity-0"
        >
          {includes.map((i) => (
            <li
              key={i}
              className="px-2.5 py-1 rounded-full text-[0.72rem] font-medium"
              style={{
                border: "1px solid rgba(150,144,140,0.4)",
                color: "var(--grey-deep)",
                backgroundColor: "rgba(255,255,255,0.4)",
                fontFamily: "var(--font-display)",
              }}
            >
              {i}
            </li>
          ))}
        </ul>
      </div>

      {/* Uniform 3-col grid of browser-chrome cards. The CTA tile sits as
          one cell of the same size as the website cards. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.4vw]">
        {cards.map((item, i) => (
          <BrowserCard key={`${item.title}-${i}`} item={item} />
        ))}
        <CtaCard />
      </div>
    </section>
  );
}

function BrowserCard({ item }: { item: WorkItem }) {
  const domain = (() => {
    if (!item.href) return "";
    try {
      const u = new URL(item.href);
      return u.hostname.replace(/^www\./, "");
    } catch {
      return item.href;
    }
  })();

  const accent = item.accent ?? "#ffbc95";

  return (
    <a
      data-web-card
      href={item.href ?? "#"}
      target={item.href ? "_blank" : undefined}
      rel={item.href ? "noopener noreferrer" : undefined}
      className="group block opacity-0 will-change-transform"
      aria-label={`Open ${item.title} in a new tab`}
    >
      <div
        className="relative rounded-[14px] overflow-hidden transition-transform duration-500 group-hover:-translate-y-1"
        style={{
          backgroundColor: "rgba(255,255,255,0.6)",
          border: "1px solid rgba(150,144,140,0.22)",
          boxShadow:
            "0 30px 60px -32px rgba(20,15,12,0.28), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        {/* Browser chrome */}
        <div
          className="flex items-center gap-3 px-3 py-2 border-b"
          style={{
            borderColor: "rgba(150,144,140,0.18)",
            backgroundColor: "rgba(255,255,255,0.55)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="inline-block rounded-full"
              style={{ width: 9, height: 9, backgroundColor: "#ff5f57" }}
            />
            <span
              aria-hidden
              className="inline-block rounded-full"
              style={{ width: 9, height: 9, backgroundColor: "#febc2e" }}
            />
            <span
              aria-hidden
              className="inline-block rounded-full"
              style={{ width: 9, height: 9, backgroundColor: "#28c840" }}
            />
          </div>
          <div
            className="flex-1 rounded-full px-3 py-1 text-center truncate font-display"
            style={{
              fontSize: "0.72rem",
              color: "var(--grey-deep)",
              backgroundColor: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(150,144,140,0.16)",
              fontWeight: 500,
              letterSpacing: "0.005em",
            }}
          >
            {domain}
          </div>
          <ArrowUpRight
            size={14}
            strokeWidth={2.2}
            style={{ color: "var(--grey)" }}
            className="opacity-50 group-hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Screenshot */}
        <div
          className="relative"
          style={{
            backgroundColor: accent,
            aspectRatio: "16 / 9",
          }}
        >
          {item.image ? (
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.025]"
              style={{
                backgroundImage: `url("${item.image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
              aria-hidden
            />
          ) : null}

          {/* Hover overlay with "Visit live" pill */}
          <div
            aria-hidden
            className="absolute inset-0 flex items-end p-4 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)",
            }}
          >
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur font-display font-semibold"
              style={{
                fontSize: "0.74rem",
                backgroundColor: "rgba(255,255,255,0.92)",
                color: "var(--ink)",
                letterSpacing: "0.02em",
              }}
            >
              Visit live
              <ArrowUpRight size={12} strokeWidth={2.4} />
            </span>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-3 flex items-baseline justify-between gap-3 px-1">
        <span
          className="font-display font-semibold text-[0.9rem]"
          style={{ color: "var(--ink)" }}
        >
          {item.title}
        </span>
        <span
          className="font-display"
          style={{
            color: "var(--grey)",
            fontSize: "0.74rem",
            fontWeight: 500,
          }}
        >
          {item.category}
        </span>
      </div>
    </a>
  );
}

function CtaCard() {
  return (
    <a
      data-web-cta
      href="#contact"
      className="group block opacity-0 will-change-transform"
      aria-label="Start a project with Ludio"
    >
      <div
        className="relative rounded-[14px] overflow-hidden transition-transform duration-500 group-hover:-translate-y-1"
        style={{
          border: "1px solid rgba(150,144,140,0.22)",
          boxShadow:
            "0 30px 60px -32px rgba(20,15,12,0.28), inset 0 1px 0 rgba(255,255,255,0.6)",
          background:
            "linear-gradient(135deg, rgba(255,188,149,0.55) 0%, rgba(249,158,118,0.45) 100%)",
        }}
      >
        {/* Match the browser chrome bar so heights line up with site cards */}
        <div
          className="flex items-center gap-3 px-3 py-2 border-b"
          style={{
            borderColor: "rgba(150,144,140,0.22)",
            backgroundColor: "rgba(255,255,255,0.45)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="inline-block rounded-full"
              style={{ width: 9, height: 9, backgroundColor: "#ff5f57" }}
            />
            <span
              aria-hidden
              className="inline-block rounded-full"
              style={{ width: 9, height: 9, backgroundColor: "#febc2e" }}
            />
            <span
              aria-hidden
              className="inline-block rounded-full"
              style={{ width: 9, height: 9, backgroundColor: "#28c840" }}
            />
          </div>
          <div
            className="flex-1 rounded-full px-3 py-1 text-center truncate font-display"
            style={{
              fontSize: "0.72rem",
              color: "var(--ink)",
              backgroundColor: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(150,144,140,0.18)",
              fontWeight: 600,
              letterSpacing: "0.005em",
            }}
          >
            ludio.studio/start
          </div>
          <ArrowUpRight
            size={14}
            strokeWidth={2.2}
            style={{ color: "var(--ink)" }}
            className="opacity-70 group-hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Body — matches the 16:9 screenshot area exactly */}
        <div
          className="relative flex items-end p-[1.4vw]"
          style={{ aspectRatio: "16 / 9" }}
        >
          <div
            className="font-display font-semibold"
            style={{
              fontSize: "clamp(1.4rem, 2.1vw, 2.4rem)",
              color: "var(--ink)",
              lineHeight: "1.02",
              letterSpacing: "-0.018em",
            }}
          >
            Build
            <br />
            mine.
          </div>
          <span
            className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105 group-hover:-rotate-12"
            style={{ backgroundColor: "var(--ink)", color: "var(--peach)" }}
          >
            <ArrowUpRight size={20} strokeWidth={2.4} />
          </span>
        </div>
      </div>

      {/* Caption row, same layout as site cards */}
      <div className="mt-3 flex items-baseline justify-between gap-3 px-1">
        <span
          className="font-display font-semibold text-[0.9rem]"
          style={{ color: "var(--ink)" }}
        >
          Start a project
        </span>
        <span
          className="font-display"
          style={{
            color: "var(--grey)",
            fontSize: "0.74rem",
            fontWeight: 500,
          }}
        >
          24h scope &amp; quote
        </span>
      </div>
    </a>
  );
}
