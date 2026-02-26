import { Metadata } from "next";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { WebDevelopmentClient } from "@/components/services/WebDevelopmentClient";

const capabilities = [
  {
    title: "Full-Stack Architecture",
    description:
      "Next.js 16, React 19, TypeScript, server components, and edge-optimized rendering for blazing-fast applications.",
  },
  {
    title: "Responsive Design Systems",
    description:
      "Tailwind CSS v4 design systems with mobile-first responsive layouts and cross-browser compatibility.",
  },
  {
    title: "Database & Backend",
    description:
      "Supabase, PostgreSQL, REST/GraphQL APIs, and real-time data synchronization.",
  },
  {
    title: "Performance Optimization",
    description:
      "Sub-200ms load times, 90+ Lighthouse scores, lazy loading, and CDN-optimized asset delivery.",
  },
  {
    title: "CI/CD & DevOps",
    description:
      "Automated deployment pipelines, staging environments, and production monitoring with Vercel.",
  },
];

export const metadata: Metadata = {
  title: "Web Development | Quartermasters",
  description: "Full-stack web development with Next.js 16, React 19, TypeScript, responsive design systems, and performance optimization.",
  openGraph: {
    title: "Web Development | Quartermasters",
    description: "Full-stack web development with Next.js 16, React 19, TypeScript, responsive design systems, and performance optimization.",
    url: 'https://quartermasters.me/web-development',
  }
};

export default function WebDevelopmentPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Web Development",
        description: "Full-stack web development with modern architecture and performance optimization.",
        url: "https://quartermasters.me/web-development",
        image: "https://quartermasters.me/og-image.jpg"
      }} />
      <WebDevelopmentClient capabilities={capabilities} />
    </>
  );
}
