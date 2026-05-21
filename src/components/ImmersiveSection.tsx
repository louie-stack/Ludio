"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ImmersiveSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const blobs = ref.current!.querySelectorAll("[data-blob]");
      const text = ref.current!.querySelectorAll("[data-immersive-line]");

      if (prefersReduced) {
        gsap.set(text, { opacity: 1, y: 0 });
        return;
      }

      blobs.forEach((b, i) => {
        gsap.to(b, {
          yPercent: i % 2 === 0 ? -25 : 30,
          xPercent: i % 2 === 0 ? 10 : -8,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      gsap.fromTo(
        text,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 65%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-espresso-deep text-cream"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 60% at 20% 10%, rgba(232,130,90,0.20) 0%, rgba(232,130,90,0) 55%), radial-gradient(80% 60% at 90% 90%, rgba(245,184,154,0.10) 0%, rgba(245,184,154,0) 60%), linear-gradient(180deg, #0e0805 0%, #1c1410 100%)",
        }}
      />

      <div
        data-blob
        aria-hidden
        className="absolute -top-40 -left-32 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(245,184,154,0.7), transparent 60%)",
        }}
      />
      <div
        data-blob
        aria-hidden
        className="absolute -bottom-32 -right-40 w-[48rem] h-[48rem] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(232,130,90,0.65), transparent 60%)",
        }}
      />
      <div
        data-blob
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(43,79,255,0.45), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-10 py-40 sm:py-52 text-center">
        <div
          data-immersive-line
          className="eyebrow opacity-0 mb-8"
          style={{ color: "rgba(250,246,240,0.55)" }}
        >
          Step into the studio
        </div>
        <h2
          data-immersive-line
          className="font-display text-[clamp(2.6rem,8vw,7.2rem)] font-semibold leading-[0.98] tracking-tight opacity-0"
        >
          A studio that
          <br />
          <span className="italic" style={{ color: "#f5b89a" }}>
            builds worlds.
          </span>
        </h2>
        <p
          data-immersive-line
          className="mt-10 max-w-2xl mx-auto text-lg sm:text-xl text-cream/70 leading-relaxed opacity-0"
        >
          Not just websites. Not just decks. A complete creative system, brand,
          web, content and video, designed to make your business unmistakable.
        </p>
      </div>
    </section>
  );
}
