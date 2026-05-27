import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = process.env.URL ?? "http://localhost:3000/";
const OUT = process.env.OUT ?? "./screenshots";
mkdirSync(OUT, { recursive: true });

const W = 375;
const H = 667;

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1000);

  const docHeight = await page.evaluate(
    () => document.documentElement.scrollHeight
  );
  const viewHeight = H;
  const steps = Math.ceil(docHeight / viewHeight);
  console.log(`doc=${docHeight}px / view=${viewHeight}px → ${steps} shots`);

  for (let i = 0; i < steps; i++) {
    const y = i * viewHeight;
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(400);
    const path = `${OUT}/m375-${String(i).padStart(2, "0")}-y${y}.png`;
    await page.screenshot({ path, fullPage: false });
    console.log(`Wrote ${path}`);
  }
  await ctx.close();
} finally {
  await browser.close();
}
