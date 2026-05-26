"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

export default function ContentBento({
  id,
  number,
  title,
  line,
  includes,
  items,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const titleWordEls = section.querySelectorAll("[data-word]");
      const meta = section.querySelectorAll("[data-meta]");
      const tiles = Array.from(
        grid.querySelectorAll("[data-flip-tile]")
      ) as HTMLElement[];

      if (prefersReduced) {
        gsap.set(
          [
            ...Array.from(titleWordEls),
            ...Array.from(meta),
            ...tiles,
          ] as Element[],
          { opacity: 1, y: 0 }
        );
        return;
      }

      // Intro: meta + title
      gsap.set(titleWordEls, { opacity: 0, y: 24 });
      gsap.set(meta, { opacity: 0, y: 12 });

      const intro = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 65%", once: true },
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

      // Tile rise on first view
      gsap.set(tiles, { opacity: 0, y: 28 });
      gsap.to(tiles, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: { trigger: grid, start: "top 80%", once: true },
      });
    }, sectionRef);

    // Constant-time image rotation per tile. Each tile cycles through its
    // own image stack on a timer, staggered so the grid keeps shimmering
    // without all tiles flipping at the same moment.
    const tiles = Array.from(
      grid.querySelectorAll("[data-flip-tile]")
    ) as HTMLElement[];

    const intervals: ReturnType<typeof setInterval>[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    if (!prefersReduced) {
      const CYCLE_MS = 4400;
      const STAGGER_MS = 550;

      tiles.forEach((tile, tileIdx) => {
        const layers = Array.from(
          tile.querySelectorAll("[data-layer]")
        ) as HTMLElement[];
        if (layers.length < 2) return;

        let current = 0;
        const advance = () => {
          const next = (current + 1) % layers.length;
          const outLayer = layers[current];
          const inLayer = layers[next];

          gsap.to(outLayer, {
            opacity: 0,
            rotateY: 90,
            duration: 0.6,
            ease: "power3.in",
          });
          gsap.fromTo(
            inLayer,
            { opacity: 0, rotateY: -90 },
            {
              opacity: 1,
              rotateY: 0,
              duration: 0.6,
              ease: "power3.out",
              delay: 0.18,
            }
          );

          current = next;
        };

        const startDelay = tileIdx * STAGGER_MS;
        const t = setTimeout(() => {
          advance();
          const i = setInterval(advance, CYCLE_MS);
          intervals.push(i);
        }, startDelay);
        timeouts.push(t);
      });
    }

    return () => {
      intervals.forEach(clearInterval);
      timeouts.forEach(clearTimeout);
      ctx.revert();
    };
  }, []);

  const titleWords = title.split(" ").filter(Boolean);
  const totalPieces = items.reduce(
    (n, it) => n + (it.images?.length ?? 1),
    0
  );

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
          {totalPieces} pieces
        </span>
      </div>

      <div className="flex flex-col items-center gap-[1.2vw] mx-auto max-w-[42rem] text-center mb-[3vw]">
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 4.5vw, 5.5rem)",
            color: "var(--ink)",
            fontWeight: 600,
            lineHeight: "1.05",
            letterSpacing: "-0.025em",
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
          className="text-[0.9rem] leading-[1.5] font-semibold max-w-[34ch] opacity-0"
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

      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-12 gap-[0.6vw] auto-rows-min"
        style={{ perspective: "1600px" }}
      >
        {items.map((item, idx) => {
          const span = item.span ?? 6;
          return (
            <div
              key={`${item.title}-${idx}`}
              style={{
                gridColumn: `span ${Math.min(Math.max(span, 1), 12)} / span ${Math.min(Math.max(span, 1), 12)}`,
              }}
            >
              <FlipTile item={item} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FlipTile({ item }: { item: WorkItem }) {
  const accent = item.accent ?? "#ffbc95";
  const aspect = item.aspect ?? "16/9";
  const images =
    item.images && item.images.length
      ? item.images
      : item.image
      ? [item.image]
      : [];

  return (
    <figure data-flip-tile className="group will-change-transform">
      <div
        className="relative rounded-[6px] overflow-hidden"
        style={{
          backgroundColor: accent,
          aspectRatio: aspect.replace("/", " / "),
          transformStyle: "preserve-3d",
        }}
      >
        {images.length ? (
          images.map((src, i) => (
            <div
              key={src + i}
              data-layer={i}
              className="absolute inset-0 will-change-transform"
              style={{
                backgroundImage: `url("${src}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backfaceVisibility: "hidden",
                opacity: i === 0 ? 1 : 0,
                transformOrigin: "center center",
              }}
              aria-hidden
            />
          ))
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(155deg, ${accent} 0%, ${shade(
                accent,
                -32
              )} 100%)`,
            }}
            aria-hidden
          />
        )}

        <div
          aria-hidden
          className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      </div>
      <figcaption className="mt-2 flex items-baseline justify-between gap-2">
        <span
          className="font-display font-semibold text-[0.78rem]"
          style={{ color: "var(--ink)" }}
        >
          {item.title}
        </span>
        <span
          className="font-display"
          style={{
            color: "var(--grey)",
            fontSize: "0.68rem",
            fontWeight: 500,
          }}
        >
          {item.category}
        </span>
      </figcaption>
    </figure>
  );
}

function shade(hex: string, percent: number) {
  if (!hex.startsWith("#")) return hex;
  const f = parseInt(hex.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = Math.abs(percent) / 100;
  const R = f >> 16;
  const G = (f >> 8) & 0x00ff;
  const B = f & 0x0000ff;
  const nR = Math.round((t - R) * p) + R;
  const nG = Math.round((t - G) * p) + G;
  const nB = Math.round((t - B) * p) + B;
  return `rgb(${nR}, ${nG}, ${nB})`;
}
