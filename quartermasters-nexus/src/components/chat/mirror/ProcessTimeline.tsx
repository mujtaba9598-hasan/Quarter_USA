"use client";

import { motion } from "framer-motion";

const SERVICE_PROCESSES: Record<string, { step: string; desc: string }[]> = {
    "web-development": [
        { step: "Discovery", desc: "Requirements deep-dive, stack assessment, architecture planning" },
        { step: "Build", desc: "Full-stack development with CI/CD pipeline on Next.js/React" },
        { step: "QA Gate", desc: "Automated testing, security audit, performance benchmarking" },
        { step: "Deploy", desc: "Production launch on Vercel edge network, monitoring setup" },
    ],
    "website-redesign": [
        { step: "Diagnostic", desc: "2-minute site audit: load speed, performance, SEO, accessibility" },
        { step: "Architect", desc: "New design system, modern stack migration plan, URL mapping" },
        { step: "Build", desc: "Ground-up rebuild on Next.js — zero legacy code touched" },
        { step: "Launch", desc: "Zero-downtime cutover, SEO preservation, analytics transfer" },
    ],
    "feature-injection": [
        { step: "Stack Check", desc: "Assess existing platform, identify integration points" },
        { step: "Subdomain Setup", desc: "Independent Next.js app on app.yoursite.com" },
        { step: "Build & Brand", desc: "Feature development matching your existing brand identity" },
        { step: "Connect", desc: "DNS configuration, menu link, seamless user experience" },
    ],
    "express-build": [
        { step: "Brief", desc: "Requirements capture, brand assets, content collection" },
        { step: "Draft", desc: "High-fidelity React build — not a template, custom code" },
        { step: "Review", desc: "Human QA team performs final quality check" },
        { step: "Deploy", desc: "Live on your domain within 24 hours (excluding Sundays)" },
    ],
    "ai-model-training": [
        { step: "Data Audit", desc: "Assess proprietary data volume, format, sovereignty requirements" },
        { step: "Architecture", desc: "Design Zero-Knowledge pipeline: RAG or fine-tuning tier" },
        { step: "Train", desc: "Private model training on isolated VPC infrastructure" },
        { step: "Deploy", desc: "Production API endpoint, monitoring, evaluation framework" },
    ],
};

interface ProcessTimelineProps {
    service: string;
}

export function ProcessTimeline({ service }: ProcessTimelineProps) {
    const steps = SERVICE_PROCESSES[service];
    if (!steps) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="my-4 rounded-xl border border-white/10 overflow-hidden"
        >
            <div className="px-4 py-3 bg-white/5 border-b border-white/10">
                <p className="text-xs uppercase tracking-wider text-white/50 font-medium">
                    Engagement Process
                </p>
            </div>

            <div className="p-4">
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[#C15A2C] via-[#C15A2C]/40 to-transparent" />

                    <div className="space-y-4">
                        {steps.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-3 relative"
                            >
                                {/* Node */}
                                <div className="relative z-10 mt-1 shrink-0">
                                    <div
                                        className="w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-bold"
                                        style={{
                                            background: `rgba(193, 90, 44, ${0.15 + i * 0.1})`,
                                            border: "1px solid rgba(193, 90, 44, 0.4)",
                                            color: "#C15A2C",
                                        }}
                                    >
                                        {i + 1}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-white leading-tight">{s.step}</p>
                                    <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{s.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
