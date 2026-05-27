"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_NAME } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_IMAGE = "/about.png";

export default function About() {
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
      const paras = section.querySelectorAll("[data-para]");
      const imgWrap = section.querySelector("[data-about-img-wrap]");
      const img = section.querySelector("[data-about-img]");

      if (prefersReduced) {
        const targets: Element[] = [
          ...Array.from(words),
          ...Array.from(tags),
          ...Array.from(paras),
        ];
        if (imgWrap) targets.push(imgWrap);
        if (img) targets.push(img);
        gsap.set(targets, { opacity: 1, yPercent: 0, y: 0, scale: 1 });
        return;
      }

      gsap.set(words, { opacity: 0, y: 24 });
      gsap.set(tags, { opacity: 0, y: 12 });
      gsap.set(paras, { opacity: 0, y: 24 });
      if (imgWrap) gsap.set(imgWrap, { opacity: 0, y: 36 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });

      tl.to(tags, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.05,
        ease: "expo.out",
      });
      if (imgWrap) {
        tl.to(
          imgWrap,
          { opacity: 1, y: 0, duration: 1, ease: "expo.out" },
          "-=0.3"
        );
      }
      tl.to(
        words,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.045,
          ease: "expo.out",
        },
        "-=1.0"
      );
      tl.to(
        paras,
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "expo.out",
        },
        "-=0.5"
      );

    }, ref);

    return () => ctx.revert();
  }, []);

  const linePre = "The Studio of";
  const lineHi = "Louie H.";
  const linePost = "Multidisciplinary Designer & Creative.";

  const renderWords = (text: string, keyPrefix: string, color?: string) => {
    const ws = text.split(" ").filter(Boolean);
    return (
      <span style={color ? { color } : undefined}>
        {ws.map((w, i) => (
          <span
            key={`${keyPrefix}-${i}`}
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
      </span>
    );
  };

  return (
    <section
      ref={ref}
      id="about"
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
            08 / About
          </span>
        </div>
        <span
          data-tag
          className="tag-text text-right opacity-0"
          style={{ color: "var(--grey)" }}
        >
          Louie H. &middot; Isle of Man
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-[2vw] lg:gap-[2.5vw] items-start">
        <div
          data-about-img-wrap
          className="lg:col-span-5 will-change-transform"
        >
          <div
            className="relative rounded-[6px] overflow-hidden"
            style={{
              aspectRatio: "1 / 1",
              backgroundColor: "#1a1310",
            }}
          >
            <div
              data-about-img
              aria-hidden
              className="absolute inset-0 will-change-transform"
              style={{
                backgroundImage: `url("${ABOUT_IMAGE}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.32) 100%)",
              }}
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-cream">
              <div>
                <div
                  className="font-display font-semibold text-[0.78rem]"
                  style={{ color: "var(--peach)" }}
                >
                  Louie H.
                </div>
                <div
                  className="font-display"
                  style={{
                    color: "rgba(255,188,149,0.7)",
                    fontSize: "0.68rem",
                    fontWeight: 500,
                  }}
                >
                  Founder &middot; Designer
                </div>
              </div>
              <span
                className="font-display"
                style={{
                  color: "rgba(255,188,149,0.6)",
                  fontSize: "0.68rem",
                  fontWeight: 500,
                }}
              >
                MMXXVI
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-[1.5vw]">
          <h2
            className="section-title-grey"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 6rem)",
              color: "var(--ink)",
              marginTop: "-0.12em",
            }}
          >
            {renderWords(linePre, "p")}
            {renderWords(lineHi, "h", "var(--coral)")}
            {renderWords(linePost, "x")}
          </h2>
          <p
            data-para
            className="text-[1.05rem] leading-relaxed opacity-0 max-w-[44ch]"
            style={{ color: "var(--grey-deep)" }}
          >
            Four years crafting brands, websites, content, and pitch decks for
            clients across fintech, Web3, and digital assets.
          </p>
          <p
            data-para
            className="text-[1.05rem] leading-relaxed opacity-0 max-w-[44ch]"
            style={{ color: "var(--grey-deep)" }}
          >
            {SITE_NAME} blends strong visual craft with an AI-native workflow,
            moving from idea to finished work faster, without losing the
            quality that makes it land.
          </p>
        </div>
      </div>
    </section>
  );
}
