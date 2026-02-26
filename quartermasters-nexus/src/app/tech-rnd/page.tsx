import { Metadata } from "next";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { TechRndClient } from "@/components/services/TechRndClient";

const capabilities = [
  {
    title: "Custom Web Architecture",
    description:
      "Enterprise-grade Next.js applications with server components, edge computing, and sub-200ms response times.",
  },
  {
    title: "AI Integration & Automation",
    description:
      "Claude API, OpenAI, custom model fine-tuning, RAG pipelines, and intelligent automation.",
  },
  {
    title: "Cloud Infrastructure",
    description:
      "Vercel, AWS, and hybrid cloud architectures optimized for performance and cost.",
  },
  {
    title: "Real-time Systems",
    description:
      "WebSocket implementations, live collaboration tools, and streaming AI interfaces.",
  },
  {
    title: "Security & Compliance",
    description:
      "SOC 2 preparation, OWASP-hardened codebases, and zero-trust architecture.",
  },
];

export const metadata: Metadata = {
  title: "Technology & R&D Services | Quartermasters",
  description: "Custom web architecture, AI integration, cloud infrastructure, real-time systems, and security compliance.",
  openGraph: {
    title: "Technology & R&D Services | Quartermasters",
    description: "Custom web architecture, AI integration, cloud infrastructure, real-time systems, and security compliance.",
    url: 'https://quartermasters.me/tech-rnd',
  }
};

export default function TechRndPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Technology & R&D Services",
        description: "Innovation Infrastructure & Technical Operations.",
        url: "https://quartermasters.me/tech-rnd",
        image: "https://quartermasters.me/og-image.jpg"
      }} />
      <TechRndClient capabilities={capabilities} />
    </>
  );
}
