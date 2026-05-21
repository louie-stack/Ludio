# Ludio

Creative studio website by Louie Hartley. A single, long-scrolling page with
scroll-driven storytelling, warm cream + peach palette, and one immersive dark
beat for contrast.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **React 19**
- **Tailwind CSS v4** (CSS-based theme via `@theme inline` in `globals.css`)
- **GSAP + ScrollTrigger** for scroll animations
- **Lenis** for smooth scroll
- **Framer Motion** for component-level motion
- **Clash Display + General Sans** (Fontshare) for type
- Targeted at **Vercel** for deploy

## Quick start

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Production build

```bash
npm run build
npm run start
```

## Deploy (Vercel)

1. Push the repo to GitHub.
2. In Vercel, click **Add New → Project** and import the repo.
3. Framework preset is auto-detected as Next.js. No env vars required.
4. Deploy. Subsequent pushes to `main` redeploy automatically.

## Project structure

```
src/
├── app/
│   ├── globals.css       # Tailwind v4 @theme + Fontshare imports + base CSS
│   ├── layout.tsx        # Root layout, mounts <SmoothScroll /> and <Nav />
│   └── page.tsx          # The whole site, composed of section components
├── components/
│   ├── SmoothScroll.tsx  # Lenis + GSAP ticker integration
│   ├── Nav.tsx           # Floating pill nav, logo in middle
│   ├── Hero.tsx          # Big Ludio wordmark, scroll cue
│   ├── Stats.tsx         # Count-up stats strip
│   ├── StatementBeat.tsx # Reusable scrollytelling line with peach pill highlight
│   ├── ServiceSection.tsx# Title + horizontal scrolling work row (reusable)
│   ├── ImmersiveSection.tsx # Dark "step into a new world" beat
│   ├── WhySection.tsx    # "Craft + sharp instincts" checkmark list
│   ├── StudioStack.tsx   # "Built using" flex row
│   ├── Reviews.tsx       # 3 sample-labelled testimonial cards
│   ├── About.tsx
│   ├── Contact.tsx       # Form opens mailto: with prefilled subject and body
│   └── Footer.tsx
├── config/
│   ├── site.ts           # SITE_NAME, tagline, nav links, socials, email
│   └── work.ts           # All work items, services copy, why points, stack, reviews
└── lib/
    └── useReducedMotion.ts
```

## Editing the studio name

The studio name lives in **one place**: `src/config/site.ts`.

```ts
export const SITE_NAME = "Ludio";
```

Change it there and it propagates through the nav, hero, about, footer, and
metadata.

## Swapping in real work imagery

Work thumbnails are gradient placeholders driven by a data array at
`src/config/work.ts`. Each item is `{ title, category, accent, image? }`. To
swap in real images:

1. Drop image files into `public/work/`.
2. Add `image: "/work/quickswap.jpg"` to the relevant items.
3. In `src/components/ServiceSection.tsx`, the `WorkCard` component currently
   renders a gradient background. Extend it to render an `<Image>` when
   `item.image` is set.

## Replacing the sample reviews

The reviews are clearly labelled `[Sample, to be replaced]` in
`src/config/work.ts` (`REVIEWS`). Replace each `quote`, `author`, `company`
with real testimonials.

## Animations and accessibility

- All scroll animations check `prefers-reduced-motion` and gracefully skip.
- Lenis smooth scroll is disabled for reduced-motion users; the page falls
  back to native scroll behavior.
- A global CSS rule also shortens any leftover transitions to ~0ms when
  reduced-motion is on.

## Notes

- This project is configured for AI coding agents. `AGENTS.md` instructs
  agents to read the bundled Next.js docs at `node_modules/next/dist/docs/`
  before making changes, since Next 16 / React 19 have meaningful API drift
  from prior versions.
- The folder name is lowercase `ludio` because npm package names cannot
  contain capital letters. The displayed studio name everywhere is "Ludio".
