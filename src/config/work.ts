export type WorkItem = {
  title: string;
  category: string;
  image?: string;
  accent?: string;
};

// PLACEHOLDER IMAGES — replace with real project imagery.
// Format: drop /public/work/quickswap-1.jpg etc, then update `image` to "/work/quickswap-1.jpg".
const u = (id: string, w = 900, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const WORK_ITEMS: Record<string, WorkItem[]> = {
  brand: [
    { title: "QuickSwap", category: "Brand & Identity", image: u("1517292987719-0369a794ec0f"), accent: "#f5b89a" },
    { title: "StratEx", category: "Brand System", image: u("1542435503-956c469947f6"), accent: "#e8825a" },
    { title: "LitVM", category: "Visual Identity", image: u("1455390582262-044cdead277a"), accent: "#d99b75" },
    { title: "MatterFi", category: "Logo & Guidelines", image: u("1551845041-63e8e76836ea"), accent: "#c87a4a" },
    { title: "KalqiX", category: "Brand & Identity", image: u("1626785774573-4b799315345d"), accent: "#a35a32" },
  ],
  content: [
    { title: "QuickSwap", category: "Social System", image: u("1487014679447-9f8336841d58"), accent: "#f5b89a" },
    { title: "SparkDEX", category: "Content Series", image: u("1493612276216-ee3925520721"), accent: "#e8825a" },
    { title: "StratEx", category: "Graphics & Posts", image: u("1556761175-5973dc0f32e7"), accent: "#d99b75" },
    { title: "MatterFi", category: "Reply / Meme", image: u("1518770660439-4636190af475"), accent: "#c87a4a" },
    { title: "DataWing", category: "Written Content", image: u("1626197031507-c17099753214"), accent: "#a35a32" },
  ],
  web: [
    { title: "American Fortress", category: "Website Design", image: u("1497366216548-37526070297c"), accent: "#f5b89a" },
    { title: "StratEx", category: "Landing Page", image: u("1611162617474-5b21e879e113"), accent: "#e8825a" },
    { title: "QuickSwap", category: "Product UI", image: u("1469022563428-aa04fef9f5a2"), accent: "#d99b75" },
    { title: "SparkDEX", category: "Website Design", image: u("1467810563316-b5476525c0f9"), accent: "#c87a4a" },
    { title: "DataWing", category: "Web + Product", image: u("1485827404703-89b55fcc595e"), accent: "#a35a32" },
  ],
  video: [
    { title: "LitVM", category: "Explainer Video", image: u("1490481651871-ab68de25d43d"), accent: "#f5b89a" },
    { title: "MatterFi", category: "Announcement", image: u("1432888622747-4eb9a8efeb07"), accent: "#e8825a" },
    { title: "SparkDEX", category: "Product Video", image: u("1611348586804-61bf6c080437"), accent: "#d99b75" },
    { title: "KalqiX", category: "Pitch Deck", image: u("1626785774573-4b799315345d"), accent: "#c87a4a" },
    { title: "American Fortress", category: "Proposal", image: u("1497366216548-37526070297c"), accent: "#a35a32" },
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

export const REVIEWS = [
  {
    quote: "[Sample testimonial, to be replaced]",
    author: "Client Name",
    company: "Company",
  },
  {
    quote: "[Sample testimonial, to be replaced]",
    author: "Client Name",
    company: "Company",
  },
  {
    quote: "[Sample testimonial, to be replaced]",
    author: "Client Name",
    company: "Company",
  },
];

export const SERVICE_SECTIONS = [
  {
    id: "brand",
    number: "01",
    title: "Brand & Identity",
    line: "Distinctive visual identities, logos, and brand systems that make you unmistakable.",
    includes: ["Branding", "Visual identity", "Brand systems", "Guidelines"],
  },
  {
    id: "content",
    number: "02",
    title: "Social & Content",
    line: "Scroll-stopping social content, graphics, and written posts that build presence.",
    includes: [
      "Social media management",
      "Graphics",
      "Written content",
      "Meme / reply content",
    ],
  },
  {
    id: "web",
    number: "03",
    title: "Web & Product",
    line: "High-end websites and interfaces built to look incredible and convert.",
    includes: ["Website design", "UI/UX", "Landing pages", "Product design"],
  },
  {
    id: "video",
    number: "04",
    title: "Video & Decks",
    line: "Explainer videos, announcements, pitch decks and proposals that land.",
    includes: [
      "Explainer video",
      "Product video",
      "Announcement video",
      "Pitch decks",
      "Proposals",
    ],
  },
] as const;
