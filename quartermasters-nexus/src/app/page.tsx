import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PhaseGate } from "@/components/home/PhaseGate";
import { GlobeSection } from "@/components/home/GlobeSection";
import { SearchBar } from "@/components/home/SearchBar";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABanner } from "@/components/home/CTABanner";
import { FlowConnector } from "@/components/home/FlowConnector";
import { HomePageClient } from "@/components/home/HomePageClient";

export const metadata: Metadata = {
  title:
    "Quartermasters — Technology Consulting & IT Services",
  description:
    "Premium technology consulting and IT services. Digital transformation, software development, cloud infrastructure, and AI integration. California-based, globally connected.",
  keywords: [
    "technology consulting",
    "IT services",
    "software development",
    "digital transformation",
    "cloud infrastructure",
    "AI integration",
    "web application development",
    "California tech consulting",
    "enterprise technology",
  ],
  authors: [{ name: "Quartermasters" }],
  openGraph: {
    title: "Quartermasters — Technology Consulting & IT Services",
    description:
      "Premium technology consulting and IT services. California-based, globally connected.",
    type: "website",
    locale: "en_US",
  },
};

/**
 * Homepage — Server Component.
 *
 * Static text renders on server for SEO. Interactive behaviour
 * (animations, smooth scroll, 3D globe) hydrates via client islands.
 */
export default function HomePage() {
  return (
    <HomePageClient>
      <Header />
      <main>
        {/* SEO-critical static content — sr-only for crawlers */}
        <section className="sr-only" aria-label="Company overview">
          <h1>
            Quartermasters — Technology Consulting & IT Services
          </h1>
          <p>
            Premium technology consulting firm delivering digital
            transformation, software development, cloud infrastructure,
            and AI-driven innovation.
          </p>
          <h2>Our Service Verticals</h2>
          <ul>
            <li>
              Technology & Innovation — Digital transformation, technology
              strategy, and R&D advisory.
            </li>
            <li>
              IT Services — Software development, web applications,
              and technology infrastructure solutions.
            </li>
          </ul>
          <h2>Our Approach</h2>
          <ol>
            <li>Discovery — Initial assessment and scope definition.</li>
            <li>Strategy — Research-driven planning and roadmapping.</li>
            <li>Execution — Operational deployment with progress tracking.</li>
            <li>Review — Post-engagement assessment and optimization.</li>
          </ol>
          <p>
            California, United States. Serving clients globally.
          </p>
        </section>

        {/* Visual sections — client islands with animations */}
        <HeroSection />
        <FlowConnector />
        <GlobeSection />
        <FlowConnector />
        <Testimonials />
        <FlowConnector />
        <PhaseGate />
        <FlowConnector />
        <SearchBar />
        <CTABanner />
      </main>
      <Footer />
    </HomePageClient>
  );
}
