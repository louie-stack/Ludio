import { PrismaHero } from "@/components/ui/prisma-hero";
import Stats from "@/components/Stats";
import StatementBeat from "@/components/StatementBeat";
import WebShowcase from "@/components/WebShowcase";
import VideoShowcase from "@/components/VideoShowcase";
import ContentBento from "@/components/ContentBento";
import WorkCarousel from "@/components/WorkCarousel";
import WhySection from "@/components/WhySection";
import StudioStack from "@/components/StudioStack";
import Reviews from "@/components/Reviews";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { SERVICE_SECTIONS, WORK_ITEMS } from "@/config/work";

export default function Home() {
  return (
    <main className="relative bg-bg-warm">
      <PrismaHero />

      <Stats />

      <StatementBeat
        eyebrow="01 / What we do"
        size="lg"
        highlight="show up and stand out"
      >
        We help businesses show up and stand out online, across everything.
      </StatementBeat>

      <div id="work">
        <WebShowcase {...SERVICE_SECTIONS[0]} items={WORK_ITEMS.web} />
        <VideoShowcase {...SERVICE_SECTIONS[1]} items={WORK_ITEMS.videos} />
        <ContentBento {...SERVICE_SECTIONS[2]} items={WORK_ITEMS.content} />
        <WorkCarousel {...SERVICE_SECTIONS[3]} items={WORK_ITEMS.decks} />
      </div>

      <WhySection />
      <StudioStack />
      <Reviews />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
