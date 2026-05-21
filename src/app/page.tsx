import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import StatementBeat from "@/components/StatementBeat";
import ServiceSection from "@/components/ServiceSection";
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
      <Hero />

      <Stats />

      <StatementBeat eyebrow="01 / What we do" size="lg" highlight="show up and stand out">
        We help businesses show up and stand out online, across everything.
      </StatementBeat>

      <div id="work">
        <ServiceSection {...SERVICE_SECTIONS[0]} items={WORK_ITEMS.brand} />
        <ServiceSection {...SERVICE_SECTIONS[1]} items={WORK_ITEMS.content} />

        <StatementBeat
          eyebrow="A working principle"
          size="xl"
          highlight="saves it"
        >
          Good design takes time. Working with Ludio saves it.
        </StatementBeat>

        <ServiceSection {...SERVICE_SECTIONS[2]} items={WORK_ITEMS.web} />
        <ServiceSection {...SERVICE_SECTIONS[3]} items={WORK_ITEMS.video} />
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
