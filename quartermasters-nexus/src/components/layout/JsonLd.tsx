export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Quartermasters",
    url: "https://quartermasters.me", // TODO: Replace with final domain
    logo: "/og-image.jpg",
    description:
      "Premium strategic consulting across two verticals: Technology & Innovation and IT Services.",
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
      "Premium consulting firm operating across two integrated verticals: Technology & Innovation and IT Services.",
    priceRange: "$$$$",
  };

  const services = [
    {
      name: "Technology & Innovation Consulting",
      description:
        "Digital transformation, technology strategy, R&D advisory, and emerging technology assessment.",
    },
    {
      name: "IT Services",
      description:
        "Custom software development, web application engineering, SaaS platform architecture, and digital product strategy.",
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
          text: "Quartermasters provides two integrated consulting services: Technology & Innovation and IT Services.",
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
          text: "Quartermasters serves a wide range of industries including finance, technology, healthcare, events, and enterprise organizations seeking strategic consulting and advisory services.",
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
