"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT_EMAIL, SITE_NAME } from "@/config/site";
import { SERVICE_SECTIONS } from "@/config/work";
import CopyEmail from "@/components/CopyEmail";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const words = section.querySelectorAll("[data-word]");
      const tags = section.querySelectorAll("[data-tag]");
      const rows = section.querySelectorAll("[data-row]");

      if (prefersReduced) {
        gsap.set([...Array.from(words), ...Array.from(tags), ...Array.from(rows)], {
          opacity: 1,
          yPercent: 0,
          y: 0,
        });
        return;
      }

      gsap.set(words, { opacity: 0, y: 24 });
      gsap.set(tags, { opacity: 0, y: 12 });
      gsap.set(rows, { opacity: 0, y: 22 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });
      tl.to(tags, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.05,
        ease: "expo.out",
      });
      tl.to(
        words,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.045,
          ease: "expo.out",
        },
        "-=0.35"
      );
      tl.to(
        rows,
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "expo.out",
        },
        "-=0.55"
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(
      `${SITE_NAME} enquiry from ${data.get("name") || "Unknown"}`
    );
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nService: ${data.get(
        "service"
      )}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const pre = "Let's build something";
  const hi = "worth remembering.";

  const renderWords = (text: string, keyPrefix: string, color?: string) => {
    const ws = text.split(" ").filter(Boolean);
    return (
      <span style={color ? { color } : undefined}>
        {ws.map((w, i) => (
          <span
            key={`${keyPrefix}-${i}`}
            className="inline-block align-top"
            style={{ paddingBottom: "0.06em" }}
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
      id="contact"
      className="relative w-full bg-bg-warm"
      style={{ paddingLeft: "var(--gutter-x)", paddingRight: "var(--gutter-x)", paddingTop: "var(--section-py-md)" }}
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
            09 / Contact
          </span>
        </div>
        <span
          data-tag
          className="tag-text text-right opacity-0"
          style={{ color: "var(--grey)" }}
        >
          Reply within 24h
        </span>
      </div>

      <div className="mb-[3vw]">
        <h2
          className="section-title-grey max-w-[18ch]"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 8.5rem)",
            color: "var(--ink)",
            marginTop: "-0.12em",
          }}
        >
          {renderWords(pre, "p")}
          {renderWords(hi, "h", "var(--coral)")}
        </h2>
        <p
          data-row
          className="mt-6 text-[1.1rem] leading-relaxed max-w-[36rem] opacity-0"
          style={{ color: "var(--grey-deep)" }}
        >
          Tell me about your project. I&apos;ll get back to you within 24
          hours. Or email me directly anytime.
        </p>
        <div data-row className="mt-6 opacity-0">
          <CopyEmail
            className="font-display text-[1.4rem] sm:text-[1.8rem] font-semibold underline underline-offset-4"
            showIcon
          />
        </div>
      </div>

      <button
        type="button"
        data-row
        onClick={() => setOpen((v) => !v)}
        className="cta-button opacity-0"
        aria-expanded={open}
        aria-controls="contact-form-panel"
      >
        <span className="text-left">
          {open ? "Close form" : "Start a project"}
        </span>
        <span className="cta-arrow" aria-hidden>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            style={{
              transform: open ? "rotate(45deg)" : "none",
              transition: "transform 0.45s cubic-bezier(.275, 2.254, .281, .996)",
            }}
          >
            <path
              d="M5 17L17 5M17 5H7M17 5V15"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        id="contact-form-panel"
        className="overflow-hidden transition-[max-height,opacity] duration-700 ease-out"
        style={{
          maxHeight: open ? "1200px" : "0px",
          opacity: open ? 1 : 0,
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mt-[3vw] mb-[5vw]"
        >
          <Field name="name" label="Name" required />
          <Field name="email" label="Email" type="email" required />
          <div className="sm:col-span-2">
            <label
              className="tag-text block mb-2"
              htmlFor="service"
              style={{ color: "var(--grey)" }}
            >
              What you need
            </label>
            <select
              id="service"
              name="service"
              defaultValue=""
              className="w-full border rounded-2xl px-5 py-4 text-base focus:outline-none transition-colors appearance-none"
              style={{
                backgroundColor: "rgba(255,255,255,0.5)",
                borderColor: "rgba(49,49,49,0.18)",
                color: "var(--ink)",
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1.5L6 6.5L11 1.5' stroke='%23313131' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 20px center",
              }}
            >
              <option value="" disabled>
                Select a service
              </option>
              {SERVICE_SECTIONS.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Other / Multiple">Other / Multiple</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label
              className="tag-text block mb-2"
              htmlFor="message"
              style={{ color: "var(--grey)" }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full border rounded-2xl px-5 py-4 text-base focus:outline-none transition-colors resize-none"
              style={{
                backgroundColor: "rgba(255,255,255,0.5)",
                borderColor: "rgba(49,49,49,0.18)",
                color: "var(--ink)",
              }}
              placeholder="A few words about your project, timeline, and budget."
            />
          </div>
          <div className="sm:col-span-2 flex items-center justify-between gap-4 mt-2">
            <p className="tag-text" style={{ color: "var(--grey)" }}>
              {submitted ? "Opening your mail client…" : ""}
            </p>
            <button
              type="submit"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-full font-display font-semibold transition-colors"
              style={{
                backgroundColor: "var(--ink)",
                color: "var(--bg-warm)",
              }}
            >
              Send message
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M3 11L11 3M11 3H4.5M11 3V9.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        className="tag-text block mb-2"
        htmlFor={name}
        style={{ color: "var(--grey)" }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full border rounded-2xl px-5 py-4 text-base focus:outline-none transition-colors"
        style={{
          backgroundColor: "rgba(255,255,255,0.5)",
          borderColor: "rgba(49,49,49,0.18)",
          color: "var(--ink)",
        }}
      />
    </div>
  );
}
