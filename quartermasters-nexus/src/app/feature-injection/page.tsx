import { Metadata } from "next";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { FeatureInjectionClient } from "@/components/services/FeatureInjectionClient";

const capabilities = [
  {
    title: "API Integration",
    description:
      "Connect third-party services (Stripe, Twilio, SendGrid, HubSpot) into existing codebases.",
  },
  {
    title: "AI Feature Embedding",
    description:
      "Add chatbots, recommendation engines, content generation, and intelligent search to any platform.",
  },
  {
    title: "Real-time Capabilities",
    description:
      "WebSocket implementations, live dashboards, collaborative editing, and push notifications.",
  },
  {
    title: "Authentication & Security",
    description:
      "OAuth 2.0, SSO, role-based access control, and security hardening for existing applications.",
  },
  {
    title: "Analytics & Monitoring",
    description:
      "Custom dashboards, event tracking, error monitoring, and performance instrumentation.",
  },
];

export const metadata: Metadata = {
  title: "Feature Injection | Quartermasters",
  description: "API integrations, AI feature embedding, real-time capabilities, authentication, and analytics for existing applications.",
  openGraph: {
    title: "Feature Injection | Quartermasters",
    description: "API integrations, AI feature embedding, real-time capabilities, authentication, and analytics for existing applications.",
    url: 'https://quartermasters.me/feature-injection',
  }
};

export default function FeatureInjectionPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Feature Injection",
        description: "Add powerful capabilities to existing applications without full rebuilds.",
        url: "https://quartermasters.me/feature-injection",
        image: "https://quartermasters.me/og-image.jpg"
      }} />
      <FeatureInjectionClient capabilities={capabilities} />
    </>
  );
}
