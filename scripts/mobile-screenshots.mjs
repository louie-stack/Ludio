import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = process.env.URL ?? "http://localhost:3000/";
const OUT = process.env.OUT ?? "./screenshots";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "iphone-se-375", width: 375, height: 667 },
  { name: "iphone-14-390", width: 390, height: 844 },
  { name: "iphone-plus-414", width: 414, height: 896 },
  { name: "tablet-768", width: 768, height: 1024 },
];

const browser = await chromium.launch();
try {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: vp.width < 768,
      hasTouch: vp.width < 768,
      // Force reduced-motion so GSAP intros render content immediately
      // instead of leaving everything at opacity:0 during a static screenshot.
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
    // Wait a bit for GSAP intros + lazy images
    await page.waitForTimeout(1200);
    const path = `${OUT}/${vp.name}-full.png`;
    await page.screenshot({ path, fullPage: true });
    console.log(`Wrote ${path}`);
    await ctx.close();
  }
} finally {
  await browser.close();
}
