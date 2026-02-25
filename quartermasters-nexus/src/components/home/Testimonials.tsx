"use client";

import { motion } from "framer-motion";
import { Lightbulb, Code, Cloud, Cpu, Shield, Workflow } from "lucide-react";
import {
  staggerContainer,
  staggerItem,
  scrollViewport,
} from "@/lib/animations";

/*
 * COMPLIANCE NOTE (S1-07)
 * ========================
 * This section uses a forward-looking "What to Expect" format that
 * communicates service value without fabricating endorsements.
 *
 * When real, verifiable client testimonials are available, they may be
 * added back provided each one:
 *   - Names a real person (with their written consent)
 *   - Identifies a real organisation
 *   - Reflects the person's genuine experience
 *   - Includes a "results may vary" disclaimer if specific metrics are cited
 */

const expectations = [
  {
    headline: "Technology Roadmapping",
    description:
      "Our technology team partners with CTOs and engineering leaders to evaluate stack decisions, architect scalable infrastructure, and de-risk digital transformation initiatives.",
    sector: "Technology & Innovation",
    icon: Lightbulb,
    accent: "var(--sector-tech)",
  },
  {
    headline: "Digital Product Delivery",
    description:
      "From web applications to enterprise platforms, our engineering team delivers production-grade software using modern frameworks, CI/CD pipelines, and test-driven development.",
    sector: "IT Services",
    icon: Code,
    accent: "var(--sector-it)",
  },
  {
    headline: "Cloud Infrastructure",
    description:
      "We design, deploy, and manage cloud-native architectures across AWS, Azure, and GCP — optimizing for performance, cost efficiency, and operational resilience at scale.",
    sector: "Cloud & DevOps",
    icon: Cloud,
    accent: "var(--sector-tech)",
  },
  {
    headline: "AI & Automation",
    description:
      "From intelligent automation to custom ML pipelines, we integrate AI into your workflows to accelerate decision-making, reduce manual overhead, and unlock new capabilities.",
    sector: "AI & Machine Learning",
    icon: Cpu,
    accent: "var(--sector-it)",
  },
  {
    headline: "Cybersecurity & Compliance",
    description:
      "Our security team conducts threat assessments, implements zero-trust architectures, and ensures your infrastructure meets SOC 2, GDPR, and industry-specific compliance standards.",
    sector: "Security",
    icon: Shield,
    accent: "var(--sector-tech)",
  },
  {
    headline: "Systems Integration",
    description:
      "We connect disparate platforms, APIs, and data sources into unified workflows — eliminating silos and enabling real-time data flow across your entire technology ecosystem.",
    sector: "Integration & Architecture",
    icon: Workflow,
    accent: "var(--sector-it)",
  },
];

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={staggerContainer}
        >
          <motion.p variants={staggerItem} className="text-overline mb-4">
            What to Expect
          </motion.p>
          <motion.h2 variants={staggerItem} className="heading-2 mb-12">
            Built for Decision-Makers.
            <br />
            <span style={{ color: "var(--text-muted)" }}>
              Designed Around Results.
            </span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {expectations.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="glass glass-hover relative rounded-xl p-8 overflow-hidden"
                  style={{ borderLeft: `2px solid ${item.accent}40` }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Icon
                    size={28}
                    style={{ color: item.accent }}
                    className="mb-4"
                  />
                  <h3
                    className="mb-3 text-base font-semibold"
                    style={{ fontFamily: "var(--font-heading)", color: "#FFFFFF" }}
                  >
                    {item.headline}
                  </h3>
                  <p
                    className="mb-6 text-sm leading-relaxed"
                    style={{ color: "rgba(255, 255, 255, 0.85)" }}
                  >
                    {item.description}
                  </p>
                  <div
                    className="border-t pt-4"
                    style={{ borderColor: "var(--glass-border)" }}
                  >
                    <p
                      className="text-xs font-medium uppercase tracking-wider"
                      style={{ color: item.accent }}
                    >
                      {item.sector}
                    </p>
                  </div>
                  {/* Accent left border */}
                  <div
                    className="absolute top-0 left-0 h-full w-1 rounded-l-xl"
                    style={{ background: item.accent, opacity: 0.7 }}
                  />
                  {/* Accent top bar */}
                  <div
                    className="absolute top-0 left-0 h-0.5 w-full rounded-t-xl"
                    style={{ background: item.accent, opacity: 0.6 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
