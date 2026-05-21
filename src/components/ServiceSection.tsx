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

export default function ServiceSection({
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
      const tiles = section.querySelectorAll("[data-tile]");
      const tileImgs = section.querySelectorAll("[data-tile-img]");

      if (prefersReduced) {
        gsap.set(
          [
            ...Array.from(titleWordEls),
            ...Array.from(meta),
            ...Array.from(tiles),
            ...Array.from(tileImgs),
          ].filter(Boolean) as Element[],
          { opacity: 1, y: 0, yPercent: 0, scale: 1 }
        );
        return;
      }

      gsap.set(titleWordEls, { opacity: 0, y: 24 });
      gsap.set(meta, { opacity: 0, y: 12 });
      gsap.set(tiles, { opacity: 0, y: 36 });
      gsap.set(tileImgs, { scale: 1.16, yPercent: -5 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      tl.to(meta, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.05,
        ease: "expo.out",
      });
      tl.to(
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

      tiles.forEach((tile, i) => {
        const img = tile.querySelector("[data-tile-img]");
        const tileTl = gsap.timeline({
          scrollTrigger: {
            trigger: tile,
            start: "top 90%",
            once: true,
          },
          delay: i * 0.07,
        });
        tileTl.to(tile, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
        });
        if (img) {
          tileTl.to(
            img,
            {
              scale: 1,
              yPercent: 0,
              duration: 1.4,
              ease: "expo.out",
            },
            "<"
          );
        }
      });

      // parallax-within-mask: image drifts up as tile scrolls past
      tileImgs.forEach((img) => {
        const tile = (img as HTMLElement).closest("[data-tile]");
        if (!tile) return;
        gsap.to(img, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: tile,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = title.split(" ").filter(Boolean);

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
          {items.length} recent works
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
              <span
                data-word
                className="inline-block will-change-transform"
              >
                {w}
              </span>
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
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[0.6vw]"
        style={{ perspective: "1560px" }}
      >
        {items.slice(0, 5).map((item, idx) => (
          <ImageTile
            key={`${item.title}-${idx}`}
            item={item}
            hiddenOn={idx === 4 ? "below-sm" : undefined}
          />
        ))}
      </div>
    </section>
  );
}

function ImageTile({
  item,
  hiddenOn,
}: {
  item: WorkItem;
  hiddenOn?: "below-sm";
}) {
  const accent = item.accent ?? "#ffbc95";
  const visibilityClass =
    hiddenOn === "below-sm" ? "hidden sm:block" : "block";

  return (
    <figure
      data-tile
      className={`${visibilityClass} group cursor-pointer opacity-0 will-change-transform`}
      style={{
        transform: "translateY(36px)",
      }}
    >
      <div
        className="relative rounded-[6px] overflow-hidden"
        style={{
          backgroundColor: accent,
          aspectRatio: "3 / 4",
        }}
      >
        {item.image ? (
          <div
            data-tile-img
            className="absolute inset-0 will-change-transform"
            style={{
              backgroundImage: `url("${item.image}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "scale(1.16) translateY(-5%)",
            }}
            aria-hidden
          />
        ) : (
          <div
            data-tile-img
            className="absolute inset-0 will-change-transform"
            style={{
              background: `linear-gradient(155deg, ${accent} 0%, ${shade(
                accent,
                -32
              )} 100%)`,
              transform: "scale(1.16) translateY(-5%)",
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
