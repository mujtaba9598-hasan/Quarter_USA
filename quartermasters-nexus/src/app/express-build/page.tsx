import { Metadata } from "next";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { ExpressBuildClient } from "@/components/services/ExpressBuildClient";

const capabilities = [
  {
    title: "72-Hour Landing Pages",
    description:
      "High-converting single-page sites with lead capture, analytics, and mobile optimization.",
  },
  {
    title: "MVP Prototyping",
    description:
      "Functional minimum viable products to validate ideas before full investment.",
  },
  {
    title: "Event & Campaign Sites",
    description:
      "Time-sensitive microsites for product launches, conferences, and marketing campaigns.",
  },
  {
    title: "Portfolio & Personal Sites",
    description:
      "Professional showcase sites for individuals, agencies, and creative professionals.",
  },
  {
    title: "Rapid Iteration",
    description:
      "Deploy, test, measure, and iterate. Built for speed without sacrificing quality.",
  },
];

export const metadata: Metadata = {
  title: "Express Build | Quartermasters",
  description: "72-hour landing pages, MVP prototyping, event sites, portfolio builds, and rapid iteration for fast-moving teams.",
  openGraph: {
    title: "Express Build | Quartermasters",
    description: "72-hour landing pages, MVP prototyping, event sites, portfolio builds, and rapid iteration for fast-moving teams.",
    url: 'https://quartermasters.me/express-build',
  }
};

export default function ExpressBuildPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Express Build",
        description: "Rapid website and application builds for teams that need to ship fast.",
        url: "https://quartermasters.me/express-build",
        image: "https://quartermasters.me/og-image.jpg"
      }} />
      <ExpressBuildClient capabilities={capabilities} />
    </>
  );
}
