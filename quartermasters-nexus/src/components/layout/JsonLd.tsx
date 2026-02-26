export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Quartermasters",
    url: "https://quartermasters.me", // TODO: Replace with final domain
    logo: "/og-image.jpg",
    description:
      "Premium web development, AI integration, and custom digital solutions. California-based, globally connected.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "California",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Quartermasters",
    image: "/og-image.jpg",
    address: {
      "@type": "PostalAddress",
      addressRegion: "California",
      addressCountry: "US",
    },
    description:
      "Web development, AI integration, website redesign, feature injection, express builds, and custom AI model training.",
    priceRange: "$$$$",
  };

  const services = [
    {
      name: "Web Development",
      description:
        "Full-stack Next.js/React/TypeScript applications with enterprise-grade architecture.",
    },
    {
      name: "Website Redesign",
      description:
        "Migration from legacy platforms to modern Next.js architecture with SEO preservation.",
    },
    {
      name: "Feature Injection",
      description:
        "Add AI, payments, auth, and real-time capabilities to existing codebases.",
    },
    {
      name: "Express Build",
      description:
        "Landing pages in 72 hours, MVPs in a week, campaign sites on demand.",
    },
    {
      name: "Custom AI Model Training",
      description:
        "Fine-tuning, RAG pipelines, prompt engineering, and AI agent architectures.",
    },
  ];

  const serviceSchema = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "Quartermasters",
    },
    name: s.name,
    description: s.description,
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does Quartermasters offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Quartermasters offers five core services: Web Development, Website Redesign, Feature Injection, Express Build, and Custom AI Model Training.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Quartermasters based?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Quartermasters is based in California, United States, serving clients globally.",
        },
      },
      {
        "@type": "Question",
        name: "What industries does Quartermasters serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Quartermasters serves startups, scale-ups, and enterprises across all industries seeking premium web development, AI integration, and custom digital infrastructure.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      {serviceSchema.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
