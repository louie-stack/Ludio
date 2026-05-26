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

export default function WorkCarousel({
  id,
  number,
  title,
  line,
  includes,
  items,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const trackWrap = trackWrapRef.current;
    if (!section || !track || !trackWrap) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const titleWordEls = section.querySelectorAll("[data-word]");
      const meta = section.querySelectorAll("[data-meta]");

      if (!prefersReduced) {
        gsap.set(titleWordEls, { opacity: 0, y: 24 });
        gsap.set(meta, { opacity: 0, y: 12 });

        const intro = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
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
      }

      // Horizontal pinned scroll. Pin the WHOLE section so the title stays
      // visible alongside the carousel; translate the inner track left as the
      // user scrolls vertically.
      let tween: gsap.core.Tween | null = null;
      const setUp = () => {
        const trackWidth = track.scrollWidth;
        const viewWidth = trackWrap.clientWidth;
        const distance = Math.max(0, trackWidth - viewWidth);
        if (distance < 4) return null;
        return gsap.to(track, {
          x: () => -distance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      };
      tween = setUp();

      const onResize = () => {
        if (tween) {
          tween.scrollTrigger?.kill();
          tween.kill();
        }
        tween = setUp();
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = title.split(" ").filter(Boolean);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full bg-bg-warm overflow-hidden"
      style={{
        height: "100svh",
        minHeight: "640px",
      }}
    >
      <div className="absolute inset-0 flex flex-col">
        {/* Header — pinned with the section, sits above the carousel */}
        <div
          className="shrink-0"
          style={{
            paddingTop: "3.5vw",
            paddingLeft: "4vw",
            paddingRight: "4vw",
          }}
        >
          <div className="flex items-start justify-between mb-[1.5vw]">
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

          <div className="flex flex-col items-center gap-[0.9vw] mx-auto max-w-[42rem] text-center">
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 4.6rem)",
                color: "var(--ink)",
                fontWeight: 600,
                lineHeight: "1.02",
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
              className="text-[0.88rem] leading-[1.45] font-semibold max-w-[34ch] opacity-0"
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
        </div>

        {/* Carousel viewport — takes the rest of the section's height */}
        <div
          ref={trackWrapRef}
          className="relative w-full flex-1 overflow-hidden"
        >
          <div
            ref={trackRef}
            className="absolute inset-y-0 left-0 flex items-center will-change-transform"
            style={{
              gap: "1.2vw",
              paddingLeft: "4vw",
              paddingRight: "10vw",
              width: "max-content",
            }}
          >
            {items.map((item, idx) => (
              <CarouselCard
                key={`${item.title}-${idx}`}
                item={item}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselCard({ item, index }: { item: WorkItem; index: number }) {
  const accent = item.accent ?? "#ffbc95";
  const Wrapper: React.ElementType = item.href ? "a" : "figure";
  const wrapperProps: React.ComponentPropsWithoutRef<"a"> = item.href
    ? {
        href: item.href,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `Open ${item.title} ${item.category} (PDF, new tab)`,
      }
    : {};
  return (
    <Wrapper
      {...wrapperProps}
      className={`group flex-shrink-0 flex flex-col will-change-transform ${
        item.href ? "cursor-pointer" : ""
      }`}
      style={{
        height: "62%",
      }}
    >
      <div
        className="relative rounded-[10px] overflow-hidden shadow-[0_30px_60px_-30px_rgba(20,15,12,0.35)] transition-transform duration-500 group-hover:-translate-y-1"
        style={{
          backgroundColor: accent,
          aspectRatio: item.aspect ? item.aspect.replace("/", " / ") : "16 / 9",
          height: "100%",
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
              "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        {item.href ? (
          <div
            aria-hidden
            className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur transition-all duration-500 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
            style={{
              backgroundColor: "rgba(20,15,12,0.55)",
              color: "rgba(255,255,255,0.92)",
              fontFamily: "var(--font-display)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            View PDF
            <ArrowUpRight size={12} strokeWidth={2.4} />
          </div>
        ) : null}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3 px-1 shrink-0">
        <span
          className="font-display font-semibold text-[0.9rem]"
          style={{ color: "var(--ink)" }}
        >
          <span style={{ color: "var(--grey)", marginRight: "0.6rem" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
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
    </Wrapper>
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
