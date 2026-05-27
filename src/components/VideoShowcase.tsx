"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX } from "lucide-react";
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

export default function VideoShowcase({
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
      const tiles = section.querySelectorAll("[data-video-tile]");

      if (prefersReduced) {
        gsap.set(
          [
            ...Array.from(titleWordEls),
            ...Array.from(meta),
            ...Array.from(tiles),
          ] as Element[],
          { opacity: 1, y: 0 }
        );
        return;
      }

      gsap.set(titleWordEls, { opacity: 0, y: 24 });
      gsap.set(meta, { opacity: 0, y: 12 });
      gsap.set(tiles, { opacity: 0, y: 36 });

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

      tiles.forEach((tile, i) => {
        gsap.to(tile, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: tile, start: "top 90%", once: true },
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
        paddingTop: "var(--section-py-md)",
        paddingBottom: "var(--section-py-md)",
        paddingLeft: "var(--gutter-x)",
        paddingRight: "var(--gutter-x)",
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
          {items.length} reels · tap any to unmute
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

      {/* Uniform grid of video tiles, full section width. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.4vw]">
        {items.map((item, i) => (
          <VideoCard key={`${item.title}-${i}`} item={item} />
        ))}
      </div>
    </section>
  );
}

function VideoCard({ item }: { item: WorkItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const accent = item.accent ?? "#ffbc95";

  const toggleMute = () => {
    setMuted((m) => {
      const next = !m;
      const v = videoRef.current;
      if (v && !next) {
        // unmuting requires a user gesture — make sure we're playing
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      }
      return next;
    });
  };

  return (
    <div
      data-video-tile
      className="group block opacity-0 will-change-transform"
    >
      <div
        className="relative overflow-hidden rounded-[14px] transition-transform duration-500 group-hover:-translate-y-1"
        style={{
          backgroundColor: accent,
          aspectRatio: "16 / 9",
          border: "1px solid rgba(150,144,140,0.22)",
          boxShadow:
            "0 30px 60px -32px rgba(20,15,12,0.28), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        {item.video ? (
          <video
            ref={videoRef}
            src={item.video}
            poster={item.poster}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="tag-text"
              style={{ color: "rgba(20,15,12,0.7)" }}
            >
              Drop a .mp4 into /public/work/videos/
            </span>
          </div>
        )}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition-transform hover:scale-105"
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            color: "var(--ink)",
          }}
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

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
    </div>
  );
}
