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
import { CrownJewel } from "@/components/home/CrownJewel";
import { HomePageClient } from "@/components/home/HomePageClient";

export const metadata: Metadata = {
  title:
    "Quartermasters — Web Development & AI Solutions",
  description:
    "Premium web development, AI integration, website redesign, express builds, and custom AI model training. California-based tech firm.",
  keywords: [
    "web development",
    "AI integration",
    "website redesign",
    "feature injection",
    "express build",
    "custom AI models",
    "Next.js agency",
    "California web development",
    "AI model training",
  ],
  authors: [{ name: "Quartermasters" }],
  openGraph: {
    title: "Quartermasters — Web Development & AI Solutions",
    description:
      "Premium web development, AI integration, website redesign, express builds, and custom AI model training. California-based tech firm.",
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
            Quartermasters — Web Development & AI Solutions
          </h1>
          <p>
            Premium web development, AI integration, website redesign,
            express builds, and custom AI model training. California-based
            tech firm.
          </p>
          <h2>Our Services</h2>
          <ul>
            <li>
              Web Development — Full-stack Next.js/React/TypeScript
              applications with enterprise-grade architecture.
            </li>
            <li>
              Website Redesign — Migration from legacy platforms to modern
              Next.js architecture with SEO preservation.
            </li>
            <li>
              Feature Injection — Add AI, payments, auth, and real-time
              capabilities to existing codebases.
            </li>
            <li>
              Express Build — Landing pages in 72 hours, MVPs in a week,
              campaign sites on demand.
            </li>
            <li>
              Custom AI Model Training — Fine-tuning, RAG pipelines, prompt
              engineering, and AI agent architectures.
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
        <CrownJewel />
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
