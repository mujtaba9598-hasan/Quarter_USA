"use client";

import { motion } from "framer-motion";
import { Code, RefreshCw, Puzzle, Zap, Brain, Shield } from "lucide-react";
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
    headline: "Web Development",
    description:
      "Full-stack Next.js applications with server components, TypeScript, and sub-200ms response times.",
    sector: "Web Development",
    icon: Code,
    accent: "var(--sector-tech)",
  },
  {
    headline: "Website Redesign",
    description:
      "Migrate from WordPress/Wix to modern Next.js. Zero downtime, SEO preserved.",
    sector: "Website Redesign",
    icon: RefreshCw,
    accent: "var(--sector-it)",
  },
  {
    headline: "Feature Injection",
    description:
      "Add AI chatbots, payment systems, real-time dashboards to existing codebases.",
    sector: "Feature Injection",
    icon: Puzzle,
    accent: "var(--sector-tech)",
  },
  {
    headline: "Express Build",
    description:
      "Landing pages in 72 hours. MVPs in a week. Built for speed.",
    sector: "Express Build",
    icon: Zap,
    accent: "var(--sector-it)",
  },
  {
    headline: "Custom AI Models",
    description:
      "Fine-tune models on your data. RAG pipelines, prompt engineering, agent architectures.",
    sector: "AI Model Training",
    icon: Brain,
    accent: "var(--sector-tech)",
  },
  {
    headline: "Security & Compliance",
    description:
      "OWASP-hardened codebases, SOC 2 preparation, zero-trust architecture.",
    sector: "Security",
    icon: Shield,
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
