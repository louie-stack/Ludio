export type WorkItem = {
  title: string;
  category: string;
  image?: string;
  /** Optional list of images. The flipping bento cycles through these. */
  images?: string[];
  /** If set, the tile is rendered as a link (e.g. opens a deck PDF). */
  href?: string;
  accent?: string;
  /** Tile aspect ratio override. Defaults to the section's aspect. */
  aspect?: string;
  /** Bento column span (1–6). Used only by "bento" layout. */
  span?: number;
  /** Path to local .mp4 (autoplays muted+looped in VideoShowcase). */
  video?: string;
  /** Optional poster image shown until the video frame is ready. */
  poster?: string;
};

const u = (id: string, w = 900, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const WORK_ITEMS: Record<string, WorkItem[]> = {
  // Bento mix of 16:9 landscape social cards and 1:1 squares. Spans sum to 12
  // per row. Each tile cycles through its `images` array during the pinned
  // flip animation, so every PNG in /public/work/social/ ends up on screen.
  content: [
    {
      title: "Dogechain",
      category: "Brand Campaign",
      images: [
        "/work/social/dogechain-gas-can.png",
        "/work/social/dogechain-memes-need-rails-too.png",
        "/work/social/dogechain-gas-station-meme.png",
        "/work/social/fortune-cookie.png",
      ],
      accent: "#f5b89a",
      aspect: "16/9",
      span: 8,
    },
    {
      title: "KalqiX",
      category: "Meme / Reply",
      images: [
        "/work/social/kalqix-saruman-meme.png",
        "/work/social/menu.png",
      ],
      accent: "#e8825a",
      aspect: "1/1",
      span: 4,
    },
    {
      title: "Lester Labs",
      category: "Partnership",
      images: [
        "/work/social/lester-labs-x-onmifun-partnership.png",
        "/work/social/kalqix-the-best-of-both-worlds.png",
      ],
      accent: "#d99b75",
      aspect: "16/9",
      span: 6,
    },
    {
      title: "StratEx",
      category: "Brand Launch",
      images: [
        "/work/social/stratex-introducing-stratex.png",
        "/work/social/stratex-third-generation-stablecoins.png",
      ],
      accent: "#c87a4a",
      aspect: "16/9",
      span: 6,
    },
    {
      title: "American Fortress",
      category: "Speaking Event",
      images: [
        "/work/social/house-of-ai-mehow-speaking-event.png",
        "/work/social/the-capital-summit-mehow-speaking-event.png",
      ],
      accent: "#a35a32",
      aspect: "16/9",
      span: 8,
    },
    {
      title: "StratEx",
      category: "Launch / Announcement",
      images: [
        "/work/social/stratex-polygon-launch-finalized.png",
        "/work/social/stratex-calling-all-builders-finalized.png",
        "/work/social/what-is-stratex-finalized.png",
      ],
      accent: "#f5b89a",
      aspect: "1/1",
      span: 4,
    },
    {
      title: "KalqiX",
      category: "Marketing Card",
      images: [
        "/work/social/kalqix-cheque.png",
        "/work/social/kalqix-pr-image-mainnet.png",
        "/work/social/kalqix-launch-your-own-exchange-v2.png",
        "/work/social/kalqix-trading-infra.png",
        "/work/social/kalqix-what-defi-is-missing.png",
      ],
      accent: "#e8825a",
      aspect: "16/9",
      span: 6,
    },
    {
      title: "LitVM",
      category: "Community Space",
      images: [
        "/work/social/spaces.png",
        "/work/social/kalqix-0-3-eth-swap-meme.png",
      ],
      accent: "#d99b75",
      aspect: "16/9",
      span: 6,
    },
    {
      title: "BNB Chain",
      category: "Brand Campaign",
      images: [
        "/work/social/bnb-what-is-liquid-staking.png",
        "/work/social/stkbnb-alpaca-finance.png",
        "/work/social/stkbnb-current-progress-milestones.png",
      ],
      accent: "#c87a4a",
      aspect: "16/9",
      span: 8,
    },
    {
      title: "KalqiX",
      category: "Static Ad",
      images: ["/work/social/kalqix-kalqix-trade-ad-static.png"],
      accent: "#a35a32",
      aspect: "1/1",
      span: 4,
    },
    {
      title: "LDA × Cyber Arena",
      category: "Editorial / Content",
      images: [
        "/work/social/lda-powerhouse-the-blockopedia-new-4.png",
        "/work/social/cyber-arena-pitch-deck-5.png",
      ],
      accent: "#f5b89a",
      aspect: "16/9",
      span: 6,
    },
    {
      title: "Press & PR",
      category: "Media / Podcast",
      images: [
        "/work/social/press-release-header.png",
        "/work/social/the-aggregated-100th-episode-pr-3.png",
      ],
      accent: "#e8825a",
      aspect: "16/9",
      span: 6,
    },
  ],
  // 16:9 landscape — live hero captures of shipped sites. Each card opens
  // the live site in a new tab. Rendered in a uniform 3-col grid.
  web: [
    { title: "Velocity Forge", category: "Website Design", image: "/work/web/velocity-forge.png", href: "https://www.velocityforge.co/", accent: "#f5b89a" },
    { title: "LitVM", category: "Website Design", image: "/work/web/litvm.png", href: "https://www.litvm.com/", accent: "#e8825a" },
    { title: "American Fortress", category: "Website Design", image: "/work/web/american-fortress.png", href: "https://www.americanfortress.io", accent: "#d99b75" },
    { title: "ISSA", category: "Product / Command Centre", image: "/work/web/issa-command-centre.png", href: "https://issa-command-centre.vercel.app/", accent: "#c87a4a" },
    { title: "LitVM Testnet", category: "Product / dApp", image: "/work/web/litvm-testnet.png", href: "https://testnet.litvm.com/", accent: "#a35a32" },
    { title: "Lester Labs", category: "Web + Product", image: "/work/web/lester-labs.png", href: "https://www.lester-labs.com/", accent: "#f5b89a" },
    { title: "Cardinal Painting", category: "Website Design", image: "/work/web/cardinal-painting.png", href: "https://cardinal-painting.vercel.app/", accent: "#e8825a" },
  ],
  // 16:9 video reels — local MP4s in /public/work/videos/. Rendered by
  // VideoShowcase: a hero player on top, smaller thumbnails below; click a
  // thumbnail to swap it into the hero spot. Replace the placeholder paths
  // below with the real filenames as you drop them in.
  videos: [
    {
      title: "0Gai × American Fortress",
      category: "Partnership Announcement",
      video: "/work/videos/0gai-americanfortress-partnership.mp4",
      accent: "#f5b89a",
    },
    {
      title: "KalqiX",
      category: "Mainnet Stats Reel",
      video: "/work/videos/kalqix-mainnet-stats.mp4",
      accent: "#e8825a",
    },
    {
      title: "KalqiX",
      category: "Testnet Stats Reel",
      video: "/work/videos/kalqix-testnet-stats.mp4",
      accent: "#d99b75",
    },
    {
      title: "Lester Labs",
      category: "Launch Reel",
      video: "/work/videos/lester-labs-launch.mp4",
      accent: "#c87a4a",
    },
  ],
  // 16:9 pitch deck covers — rendered as a horizontal pinned carousel.
  // Each card opens the matching PDF deck in a new tab.
  decks: [
    { title: "StratEx", category: "Pitch Deck", image: "/work/stratex-pitch-deck.png", href: "/work/decks/stratex-pitch-deck.pdf", accent: "#f5b89a" },
    { title: "LitVM", category: "Pitch Deck", image: "/work/litvm-pitch-deck.png", href: "/work/decks/litvm-pitch-deck.pdf", accent: "#e8825a" },
    { title: "KalqiX", category: "Pitch Deck", image: "/work/kalqix-pitch-deck.png", href: "/work/decks/kalqix-pitch-deck.pdf", accent: "#d99b75" },
    { title: "MatterFi", category: "Pitch Deck", image: "/work/matterfi-pitch-deck.png", href: "/work/decks/matterfi-pitch-deck.pdf", accent: "#c87a4a" },
    { title: "DataWing", category: "Pitch Deck", image: "/work/datawing-pitch-deck.png", href: "/work/decks/datawing-pitch-deck.pdf", accent: "#a35a32" },
    { title: "LDA", category: "Pitch Deck", image: "/work/lda-pitch-deck.png", href: "/work/decks/lda-pitch-deck.pdf", accent: "#f5b89a" },
    { title: "Base × Tesseract", category: "Pitch Deck", image: "/work/lda-base-tesseract-pitch-deck.png", href: "/work/decks/lda-base-tesseract-pitch-deck.pdf", accent: "#e8825a" },
    { title: "StratEx × Flare", category: "Proposal", image: "/work/stratex-flare-proposal.png", href: "/work/decks/stratex-flare-proposal.pdf", accent: "#d99b75" },
    { title: "QuickSwap", category: "Growth Packages", image: "/work/quickswap-marketing-growth-packages.png", href: "/work/decks/quickswap-marketing-growth-packages.pdf", accent: "#c87a4a" },
  ],
};

export const STUDIO_STACK = [
  "Figma",
  "Adobe Suite",
  "Claude Code",
  "Codex",
  "Custom AI agents",
  "Remotion",
  "After Effects",
  "Capcut",
];

export const STATS = [
  { value: 4, suffix: "+", label: "years experience" },
  { value: 30, suffix: "+", label: "projects delivered" },
  { value: 0, suffix: "", label: "AI-native studio", isText: true },
] as const;

export const WHY_POINTS = [
  "A premium, distinctive visual direction that makes your brand stand out.",
  "Care for the craft, from first idea to final delivery.",
  "An AI-native workflow that ships faster without cutting corners.",
  "One studio for everything: brand, web, content, and video.",
];

export type Review = {
  quote: string;
  author: string;
  company: string;
  rating: number;
};

export const REVIEWS: Review[] = [
  {
    quote:
      "Louie has been doing an excellent job with our social media creatives. His graphics and videos are consistently high quality, visually engaging, and aligned with our brand identity. He is responsive to feedback, quick with revisions, and always brings creative ideas that elevate our content. A reliable designer who delivers great work and is a pleasure to collaborate with.",
    author: "Prateek",
    company: "CMO, KalqiX",
    rating: 5,
  },
  {
    quote:
      "Louie has built multiple websites for us to a high standard, delivered quality work and met tight deadlines. His work always reflects our brand standards across multiple clients, and he utilises a strong sense of direction and creative skill to take simple concepts into finalised published assets.",
    author: "Jack",
    company: "CLO, Lunar Digital Assets",
    rating: 5,
  },
  {
    quote:
      "I've worked with Louie across multiple projects, building AI command centres for client facing agent systems. His work is always exemplary, delivered on time and to a high standard. His creative expertise helps us craft engaging front ends, and always wow's the clients.",
    author: "Mau",
    company: "Founder, MauPan Studios",
    rating: 5,
  },
];

export type ServiceLayout =
  | "portrait-row"
  | "bento"
  | "landscape-row"
  | "carousel"
  | "web-showcase"
  | "video-showcase";

export type ServiceSectionConfig = {
  id: string;
  number: string;
  title: string;
  line: string;
  includes: readonly string[];
  layout: ServiceLayout;
};

export const SERVICE_SECTIONS: readonly ServiceSectionConfig[] = [
  {
    id: "web",
    number: "01",
    title: "Websites built to convert.",
    line: "Premium websites and interfaces, shipped fast. From landing pages that close leads to full product UIs people sign up on.",
    includes: [
      "Website design",
      "UI / UX",
      "Landing pages",
      "Product design",
      "Webflow / Next.js",
    ],
    layout: "web-showcase",
  },
  {
    id: "videos",
    number: "02",
    title: "Video & Motion",
    line: "Brand films, product motion, and social cutdowns. Cinematic work that earns the scroll-stop.",
    includes: [
      "Brand films",
      "Product motion",
      "Explainers",
      "Social cutdowns",
      "After Effects / Remotion",
    ],
    layout: "video-showcase",
  },
  {
    id: "content",
    number: "03",
    title: "Social & Content",
    line: "Scroll-stopping social content, graphics, and written posts that build presence.",
    includes: [
      "Social media management",
      "Graphics",
      "Written content",
      "Meme / reply content",
    ],
    layout: "bento",
  },
  {
    id: "decks",
    number: "04",
    title: "Pitch Decks & Presentations",
    line: "Pitch decks, proposals, and one-pagers that land with investors and partners.",
    includes: [
      "Pitch decks",
      "Proposals",
      "One-pagers",
      "Investor materials",
      "Partner decks",
    ],
    layout: "carousel",
  },
] as const;
