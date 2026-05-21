"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Juanmora.co's signature easings, extracted from their stylesheet.
// Spring overshoot — used on hover and interactive springs. Curves past 1 then settles.
export const EASE_SPRING = "spring(.275, 2.254, .281, .996)";
export const EASE_SPRING_CSS = "cubic-bezier(.275, 2.254, .281, .996)";

// Smooth premium quartOut — used on scroll-tied motion and transitions over 0.4-0.5s.
export const EASE_OUT_QUART = "power4.out";
export const EASE_OUT_QUART_CSS = "cubic-bezier(.165, .84, .44, 1)";

// GSAP "back.out(2.2)" approximates the bouncy spring overshoot for letter/word reveals.
export const EASE_BACK_OUT = "back.out(2.0)";

// Stagger that mirrors juanmora's letter/word entrances.
export const STAGGER_WORD = 0.045;
export const STAGGER_LETTER = 0.025;
export const STAGGER_TILE = 0.08;

gsap.registerPlugin(ScrollTrigger);

export function ensurePlugins() {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
}

type RevealOpts = {
  start?: string;
  stagger?: number;
  duration?: number;
  ease?: string;
  yPercent?: number;
  once?: boolean;
};

/**
 * Reveal child elements matching a selector when the trigger enters the viewport.
 * Mirrors juanmora's text-reveal: yPercent 110 -> 0, opacity 0 -> 1, expo/back ease.
 * Returns a cleanup function.
 */
export function revealWords(
  trigger: HTMLElement,
  selector = "[data-word]",
  opts: RevealOpts = {}
) {
  const {
    start = "top 78%",
    stagger = STAGGER_WORD,
    duration = 1.05,
    ease = "expo.out",
    yPercent = 110,
    once = true,
  } = opts;

  const targets = trigger.querySelectorAll(selector);
  if (!targets.length) return () => {};

  gsap.set(targets, { opacity: 0, yPercent });

  const tween = gsap.to(targets, {
    opacity: 1,
    yPercent: 0,
    duration,
    stagger,
    ease,
    scrollTrigger: {
      trigger,
      start,
      once,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

/**
 * Take a string and return JSX-ready word + char arrays for stagger reveal.
 * Each word is wrapped, then each character inside.
 * Use along with revealWords for a SplitText-style entrance.
 */
export function splitWords(text: string) {
  return text
    .split(" ")
    .filter(Boolean)
    .map((word, i) => ({ word, key: `w-${i}` }));
}

/**
 * Hook a stagger reveal onto a list of arbitrary elements.
 * Useful for chips, list items, cards.
 */
export function revealStagger(
  trigger: HTMLElement,
  selector: string,
  opts: RevealOpts & { x?: number; y?: number; scale?: number } = {}
) {
  const {
    start = "top 75%",
    stagger = 0.08,
    duration = 0.9,
    ease = "expo.out",
    once = true,
    x = 0,
    y = 28,
    scale = 1,
  } = opts;

  const targets = trigger.querySelectorAll(selector);
  if (!targets.length) return () => {};

  gsap.set(targets, { opacity: 0, x, y, scale });

  const tween = gsap.to(targets, {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    duration,
    stagger,
    ease,
    scrollTrigger: {
      trigger,
      start,
      once,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}
