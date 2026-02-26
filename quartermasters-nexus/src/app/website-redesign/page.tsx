import { Metadata } from "next";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { WebsiteRedesignClient } from "@/components/services/WebsiteRedesignClient";

const capabilities = [
  {
    title: "UX Audit & Strategy",
    description:
      "Comprehensive analysis of existing site performance, user flows, and conversion bottlenecks.",
  },
  {
    title: "Modern Stack Migration",
    description:
      "Move from legacy platforms (WordPress, Wix, Squarespace) to modern Next.js architecture.",
  },
  {
    title: "Visual Identity Refresh",
    description:
      "Updated design language, typography, color systems, and brand-aligned component libraries.",
  },
  {
    title: "SEO Preservation",
    description:
      "Zero-downtime migration with URL mapping, redirect chains, and search ranking protection.",
  },
  {
    title: "Performance Uplift",
    description:
      "Transform slow legacy sites into sub-second loading experiences with modern optimization.",
  },
];

export const metadata: Metadata = {
  title: "Website Redesign | Quartermasters",
  description: "UX audits, modern stack migration, visual identity refresh, SEO preservation, and performance optimization for legacy websites.",
  openGraph: {
    title: "Website Redesign | Quartermasters",
    description: "UX audits, modern stack migration, visual identity refresh, SEO preservation, and performance optimization for legacy websites.",
    url: 'https://quartermasters.me/website-redesign',
  }
};

export default function WebsiteRedesignPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Website Redesign",
        description: "Transform legacy websites into modern, high-performance digital experiences.",
        url: "https://quartermasters.me/website-redesign",
        image: "https://quartermasters.me/og-image.jpg"
      }} />
      <WebsiteRedesignClient capabilities={capabilities} />
    </>
  );
}
