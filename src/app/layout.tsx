import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/config/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,600,700,800&f[]=general-sans@400,500,600&display=swap"
        />
      </head>
      <body
        className="min-h-full"
        style={{
          backgroundColor: "var(--bg-warm)",
          color: "var(--ink)",
          fontFamily: "var(--font-sans)",
        }}
      >
        <SmoothScroll />
        <Nav />
        {children}
      </body>
    </html>
  );
}
