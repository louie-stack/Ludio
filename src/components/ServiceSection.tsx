"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { WorkItem, ServiceLayout } from "@/config/work";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  id: string;
  number: string;
  title: string;
  line: string;
  includes: readonly string[];
  items: WorkItem[];
  layout?: ServiceLayout;
};

export default function ServiceSection({
  id,
  number,
  title,
  line,
  includes,
  items,
  layout = "portrait-row",
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
      const tiles = Array.from(
        section.querySelectorAll("[data-tile]")
      ) as HTMLElement[];

      if (prefersReduced) {
        gsap.set(
          [
            ...Array.from(titleWordEls),
            ...Array.from(meta),
            ...tiles,
          ].filter(Boolean) as Element[],
          { opacity: 1, y: 0, yPercent: 0, scale: 1, rotateX: 0 }
        );
        return;
      }

      gsap.set(titleWordEls, { opacity: 0, y: 24 });
      gsap.set(meta, { opacity: 0, y: 12 });

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

      if (layout === "portrait-row" && tiles.length) {
        // "Flat to standing" entrance: cards lie back (rotateX), hinged at
        // their bottom edge, and rise up to face the camera. The section is
        // pinned to the viewport so the row stays frozen in place while the
        // wave plays out across the 5 tiles.
        gsap.set(tiles, {
          rotateX: 70,
          yPercent: 18,
          opacity: 0,
          transformOrigin: "50% 100%",
          transformPerspective: 1400,
        });

        const standUp = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=600",
            pin: true,
            pinSpacing: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tiles.forEach((tile) => {
          standUp.to(
            tile,
            {
              rotateX: 0,
              yPercent: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            },
            0
          );
        });
      } else {
        // Default tile entrance: slide-up + fade (one-shot per tile)
        gsap.set(tiles, { opacity: 0, y: 36 });
        tiles.forEach((tile, i) => {
          gsap.to(tile, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            delay: i * 0.07,
            scrollTrigger: {
              trigger: tile,
              start: "top 90%",
              once: true,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
    // layout is a static prop set once per section; intentionally not in deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        ...(layout === "portrait-row"
          ? {
              minHeight: "100svh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }
          : null),
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

      {layout === "bento" ? (
        <BentoGrid items={items} />
      ) : layout === "landscape-row" ? (
        <LandscapeRow items={items} />
      ) : (
        <PortraitRow items={items} />
      )}
    </section>
  );
}

function PortraitRow({ items }: { items: WorkItem[] }) {
  return (
    <div
      className="relative w-full"
      style={{
        padding: "1.4vw 1.4vw 1.1vw",
        borderRadius: "18px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,188,149,0.05) 100%)",
        border: "1px solid rgba(150,144,140,0.18)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.65), 0 22px 60px -40px rgba(50,36,28,0.28)",
      }}
    >
      <div
        aria-hidden
        className="flex items-center justify-between mb-[0.9vw] px-[0.2vw]"
        style={{ color: "var(--grey)" }}
      >
        <span className="tag-text">Selected — Brand & Identity</span>
        <span className="tag-text" style={{ opacity: 0.7 }}>
          {String(items.slice(0, 5).length).padStart(2, "0")} pieces
        </span>
      </div>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[0.6vw]"
        style={{ perspective: "1560px" }}
      >
        {items.slice(0, 5).map((item, idx) => (
          <ImageTile
            key={`${item.title}-${idx}`}
            item={item}
            aspect={item.aspect ?? "3/4"}
            hiddenOn={idx === 4 ? "below-sm" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function LandscapeRow({ items }: { items: WorkItem[] }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[0.6vw]"
      style={{ perspective: "1560px" }}
    >
      {items.slice(0, 6).map((item, idx) => (
        <ImageTile
          key={`${item.title}-${idx}`}
          item={item}
          aspect={item.aspect ?? "16/9"}
        />
      ))}
    </div>
  );
}

function BentoGrid({ items }: { items: WorkItem[] }) {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-12 gap-[0.6vw] auto-rows-min"
      style={{ perspective: "1560px" }}
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
            <ImageTile item={item} aspect={item.aspect ?? "16/9"} />
          </div>
        );
      })}
    </div>
  );
}

function ImageTile({
  item,
  aspect,
  hiddenOn,
}: {
  item: WorkItem;
  aspect: string;
  hiddenOn?: "below-sm";
}) {
  const accent = item.accent ?? "#ffbc95";
  const visibilityClass =
    hiddenOn === "below-sm" ? "hidden sm:block" : "block";

  return (
    <figure
      data-tile
      className={`${visibilityClass} group cursor-pointer will-change-transform`}
    >
      <div
        className="relative rounded-[6px] overflow-hidden"
        style={{
          backgroundColor: accent,
          aspectRatio: aspect.replace("/", " / "),
        }}
      >
        {item.image ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${item.image}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden
          />
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
