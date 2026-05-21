import { SITE_NAME, SITE_YEAR, SOCIALS } from "@/config/site";
import CopyEmail from "@/components/CopyEmail";

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "var(--bg-warm)",
        paddingTop: "4vw",
        paddingBottom: "1.5vw",
        paddingLeft: "4vw",
        paddingRight: "4vw",
      }}
    >
      <div
        className="grid lg:grid-cols-12 gap-[3vw] mb-[2vw]"
        style={{
          borderTop: "1px solid rgba(49,49,49,0.12)",
          paddingTop: "3vw",
        }}
      >
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-5">
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
              Get in touch
            </span>
          </div>
          <CopyEmail
            className="font-display text-[1.4rem] sm:text-[1.6rem] font-semibold underline underline-offset-4"
            showIcon
          />
          <p
            className="mt-6 max-w-md text-[0.95rem] leading-relaxed"
            style={{ color: "var(--grey-deep)" }}
          >
            A creative studio building brand, web, content and video for
            modern businesses. Based in Isle of Man, working worldwide.
          </p>
        </div>

        <div className="lg:col-span-3">
          <div className="tag-text mb-4" style={{ color: "var(--grey)" }}>
            Studio
          </div>
          <ul className="flex flex-col gap-2.5">
            <li>
              <a
                href="#work"
                className="font-display font-medium hover:opacity-60 transition-opacity"
                style={{ color: "var(--ink)" }}
              >
                Work
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="font-display font-medium hover:opacity-60 transition-opacity"
                style={{ color: "var(--ink)" }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="font-display font-medium hover:opacity-60 transition-opacity"
                style={{ color: "var(--ink)" }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <div className="tag-text mb-4" style={{ color: "var(--grey)" }}>
            Elsewhere
          </div>
          <ul className="flex flex-col gap-2.5">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="font-display font-medium hover:opacity-60 transition-opacity"
                  style={{ color: "var(--ink)" }}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        aria-hidden
        className="font-display font-semibold select-none leading-[0.78] text-right"
        style={{
          fontSize: "clamp(7rem, 22vw, 30rem)",
          color: "var(--peach)",
          letterSpacing: "-0.04em",
          marginTop: "1vw",
          marginBottom: "-0.05em",
        }}
      >
        {SITE_NAME}<span style={{ color: "var(--coral)" }}>.</span>
      </div>

      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3"
        style={{
          borderTop: "1px solid rgba(49,49,49,0.12)",
        }}
      >
        <div className="tag-text" style={{ color: "var(--grey)" }}>
          {SITE_NAME} &copy; {SITE_YEAR} &middot; Built by {SITE_NAME}
        </div>
        <div className="tag-text" style={{ color: "var(--grey)" }}>
          Isle of Man &middot; MMXXVI
        </div>
      </div>
    </footer>
  );
}
