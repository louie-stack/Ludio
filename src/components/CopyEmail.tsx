"use client";

import { useRef, useState } from "react";
import { CONTACT_EMAIL } from "@/config/site";

type Props = {
  className?: string;
  display?: string;
  showIcon?: boolean;
};

export default function CopyEmail({
  className = "",
  display,
  showIcon = false,
}: Props) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (typeof navigator === "undefined" || !navigator.clipboard) return;

    e.preventDefault();
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      onClick={handleClick}
      className={`relative inline-flex items-center gap-2 group ${className}`}
      aria-label={`Copy email ${CONTACT_EMAIL} to clipboard`}
    >
      <span>{display ?? CONTACT_EMAIL}</span>
      {showIcon && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden
          className="opacity-50 group-hover:opacity-100 transition-opacity"
        >
          <rect
            x="3.5"
            y="3.5"
            width="7"
            height="7"
            rx="1.25"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M1.5 8.5V2.5C1.5 1.95 1.95 1.5 2.5 1.5H8.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      )}
      <span className="copy-toast" data-show={copied} aria-hidden>
        Copied
      </span>
    </a>
  );
}
