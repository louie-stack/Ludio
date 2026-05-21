"use client";

import { useEffect, useState } from "react";
import { SITE_NAME, NAV_LINKS } from "@/config/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredHero, setHoveredHero] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHoveredHero(y < window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHeroDark = hoveredHero;

  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
      style={{
        color: onHeroDark ? "var(--peach)" : "var(--ink)",
        padding: "1.6vw 4vw",
      }}
    >
      <div className="flex items-center justify-between gap-6">
        <a
          href="#hero"
          className="flex items-center gap-2 group"
          aria-label={`${SITE_NAME} home`}
        >
          <span
            aria-hidden
            className="inline-block rounded-full transition-colors duration-500"
            style={{
              width: "0.45rem",
              height: "0.45rem",
              backgroundColor: "var(--blue)",
            }}
          />
          <span
            className="font-display font-semibold text-[1.1rem] leading-none tracking-tight"
          >
            {SITE_NAME}
            <span className="opacity-50">.studio</span>
          </span>
        </a>

        <ul className="flex items-center gap-6 sm:gap-8">
          {NAV_LINKS.filter((l) => l.href !== "#hero").map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-display font-semibold text-[0.95rem] leading-none hover:opacity-60 transition-opacity"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        aria-hidden
        className={`absolute inset-0 -z-10 transition-opacity duration-500 pointer-events-none ${
          scrolled && !onHeroDark ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(250,246,239,0.92), rgba(250,246,239,0))",
          backdropFilter: "blur(6px)",
        }}
      />
    </nav>
  );
}
