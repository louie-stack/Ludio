"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_NAME } from "@/config/site";

gsap.registerPlugin(ScrollTrigger);

// PLACEHOLDER IMAGE — replace with real photo of Louie / brand visual.
// Drop final asset at /public/hero.jpg and change HERO_IMAGE to "/hero.jpg".
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=85";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const wordmark = wordmarkRef.current;
    if (!section || !image || !content || !wordmark) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const letters = wordmark.querySelectorAll("[data-letter]");

    const ctx = gsap.context(() => {
      const labels = [
        topLeftRef.current,
        topRightRef.current,
        sublineRef.current,
      ].filter(Boolean) as HTMLElement[];

      if (prefersReduced) {
        gsap.set([image, ...labels, ...Array.from(letters)], {
          opacity: 1,
          y: 0,
          yPercent: 0,
          scale: 1,
        });
        highlightRef.current?.setAttribute("data-visible", "true");
        return;
      }

      gsap.set(image, { scale: 1.08 });
      gsap.set(labels, { opacity: 0, y: 18 });
      gsap.set(letters, { opacity: 0, yPercent: 100 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(image, { scale: 1, duration: 1.8, ease: "expo.out" }, 0)
        .to(topLeftRef.current, { opacity: 1, y: 0, duration: 0.75 }, 0.25)
        .to(topRightRef.current, { opacity: 1, y: 0, duration: 0.75 }, 0.3)
        .to(
          letters,
          {
            opacity: 1,
            yPercent: 0,
            duration: 1.1,
            stagger: 0.06,
            ease: "expo.out",
          },
          0.45
        )
        .to(sublineRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.75)
        .add(() => {
          highlightRef.current?.setAttribute("data-visible", "true");
        }, 1.0);

      gsap.fromTo(
        content,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -56,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        image,
        { yPercent: 0 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const letters = SITE_NAME.split("");

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden"
      style={{ backgroundColor: "var(--peach)" }}
    >
      {/* PLACEHOLDER IMAGE — replace with real photo of Louie / brand visual.
          Drop final asset at /public/hero.jpg and change HERO_IMAGE in src/components/Hero.tsx. */}
      <div
        ref={imageRef}
        aria-hidden
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url("${HERO_IMAGE}")`,
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,188,149,0.18) 0%, rgba(20,12,8,0.18) 35%, rgba(20,12,8,0.55) 75%, rgba(8,4,2,0.85) 100%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch' seed='4'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.65'/></svg>\")",
          backgroundSize: "260px 260px",
        }}
      />

      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-between"
        style={{ padding: "4vw" }}
      >
        <div className="flex items-start justify-between gap-6">
          <div
            ref={topLeftRef}
            className="will-change-transform"
            style={{ color: "var(--peach)" }}
          >
            <div className="tag-text mb-1 leading-snug">
              Brand, Web &amp; Content
            </div>
            <div
              className="tag-text leading-snug"
              style={{ opacity: 0.65 }}
            >
              Creative Studio
            </div>
          </div>

          <div
            ref={topRightRef}
            className="text-right hidden sm:block will-change-transform"
            style={{ color: "var(--peach)" }}
          >
            <div className="tag-text mb-1 leading-snug">
              Multidisciplinary
            </div>
            <div
              className="tag-text leading-snug"
              style={{ opacity: 0.65 }}
            >
              Isle of Man &middot; MMXXVI
            </div>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-[2vw]">
          <p
            ref={sublineRef}
            className="max-w-[22rem] sm:max-w-[34rem] text-[0.95rem] sm:text-[1.05rem] leading-relaxed font-medium will-change-transform"
            style={{ color: "var(--peach)" }}
          >
            Brand, web, content &amp; AI. Building{" "}
            <span
              ref={highlightRef}
              data-visible="false"
              className="relative inline-block font-semibold"
              style={{ color: "#ffd8b8" }}
            >
              creative worlds
              <span
                aria-hidden
                className="hero-underline absolute left-0 right-0 -bottom-[0.08em] h-[0.14em] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,188,149,0.95), rgba(249,158,118,0.95))",
                  transformOrigin: "left center",
                }}
              />
            </span>{" "}
            for modern businesses.
          </p>

          <h1
            ref={wordmarkRef}
            className="wordmark-peach select-none will-change-transform text-left"
            style={{
              fontSize: "clamp(5rem, 17vw, 22rem)",
              letterSpacing: "-0.04em",
              lineHeight: "0.75",
              color: "var(--peach)",
              marginTop: "-0.05em",
              marginBottom: "-0.1em",
            }}
          >
            <span className="inline-block">
              {letters.map((l, i) => (
                <span
                  key={i}
                  data-letter
                  className="inline-block will-change-transform"
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {l}
                </span>
              ))}
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
