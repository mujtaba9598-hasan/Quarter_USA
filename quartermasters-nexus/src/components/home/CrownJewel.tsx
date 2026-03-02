'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { staggerContainer, staggerItem } from '@/lib/animations';

const AI_CAPABILITIES = [
    {
        title: 'Custom Fine-Tuning',
        desc: 'Train models on your proprietary data. Your AI speaks your language, knows your processes, follows your rules.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        title: 'RAG Pipelines',
        desc: 'Retrieval-Augmented Generation over your documents, SOPs, and knowledge bases. Zero hallucination architecture.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                <path d="M7 8h2m4 0h4" />
                <path d="M7 12h10" />
            </svg>
        ),
    },
    {
        title: 'AI Agent Systems',
        desc: 'Multi-agent architectures that automate workflows, handle decisions, and operate 24/7 without human intervention.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v4m0 14v4M4.22 4.22l2.83 2.83m9.9 9.9l2.83 2.83M1 12h4m14 0h4M4.22 19.78l2.83-2.83m9.9-9.9l2.83-2.83" />
            </svg>
        ),
    },
    {
        title: 'Zero-Knowledge Architecture',
        desc: 'Your data never leaves your infrastructure. Private, secure, fully isolated model training and inference.',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
        ),
    },
];

const TIERS = [
    { label: 'Tier 1 — RAG Pipeline', price: 'From $15,000', desc: 'Document retrieval, knowledge base, prompt engineering' },
    { label: 'Tier 2 — Fine-Tuning', price: 'From $25,000', desc: 'Custom model training on your proprietary data' },
    { label: 'Tier 3 — Full Agent System', price: 'From $50,000', desc: 'Multi-agent orchestration with autonomous decision-making' },
];

/**
 * CrownJewel — The AI Model Training showcase section.
 * Visually dominates the homepage to position AI as the premium offering.
 */
export function CrownJewel() {
    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#C15A2C]/8 blur-[150px] rounded-full" />
                <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full" />
            </div>

            {/* Neural network SVG background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="neural-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                            <circle cx="40" cy="40" r="1" fill="#C15A2C" />
                            <circle cx="0" cy="0" r="1" fill="#C15A2C" />
                            <circle cx="80" cy="0" r="1" fill="#C15A2C" />
                            <circle cx="0" cy="80" r="1" fill="#C15A2C" />
                            <circle cx="80" cy="80" r="1" fill="#C15A2C" />
                            <line x1="0" y1="0" x2="40" y2="40" stroke="#C15A2C" strokeWidth="0.5" />
                            <line x1="80" y1="0" x2="40" y2="40" stroke="#C15A2C" strokeWidth="0.5" />
                            <line x1="0" y1="80" x2="40" y2="40" stroke="#C15A2C" strokeWidth="0.5" />
                            <line x1="80" y1="80" x2="40" y2="40" stroke="#C15A2C" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#neural-grid)" />
                </svg>
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Header */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="text-center mb-20"
                >
                    <motion.div variants={staggerItem} className="mb-6">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#C15A2C]/30 bg-[#C15A2C]/10 px-5 py-2 text-sm font-semibold text-[#C15A2C] backdrop-blur-sm">
                            <span className="h-2 w-2 rounded-full bg-[#C15A2C] animate-pulse" />
                            The Crown Jewel
                        </span>
                    </motion.div>
                    <motion.h2
                        variants={staggerItem}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6"
                    >
                        Custom AI Model Training
                    </motion.h2>
                    <motion.p
                        variants={staggerItem}
                        className="max-w-2xl mx-auto text-lg text-white/50 leading-relaxed"
                    >
                        Off-the-shelf AI is a toy. We train private, secure models on your proprietary data —
                        so it operates exactly like your best employee.
                    </motion.p>
                </motion.div>

                {/* Capabilities Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20"
                >
                    {AI_CAPABILITIES.map((cap) => (
                        <motion.div
                            key={cap.title}
                            variants={staggerItem}
                            className="group relative rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 hover:border-[#C15A2C]/20 hover:bg-white/[0.04] transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#C15A2C]/10 flex items-center justify-center shrink-0 text-[#C15A2C] group-hover:bg-[#C15A2C]/20 transition-colors">
                                    {cap.icon}
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-lg mb-2">{cap.title}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed">{cap.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Pricing Tiers */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="mb-16"
                >
                    <motion.h3
                        variants={staggerItem}
                        className="text-xs uppercase tracking-wider text-white/30 font-semibold text-center mb-8"
                    >
                        Investment Tiers
                    </motion.h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {TIERS.map((tier) => (
                            <motion.div
                                key={tier.label}
                                variants={staggerItem}
                                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center hover:border-[#C15A2C]/20 transition-colors"
                            >
                                <p className="text-sm font-semibold text-white/70 mb-2">{tier.label}</p>
                                <p className="text-2xl font-bold text-[#C15A2C] mb-2">{tier.price}</p>
                                <p className="text-xs text-white/30">{tier.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                >
                    <Link
                        href="/ai-model-training"
                        className="inline-flex items-center gap-2 rounded-full bg-[#C15A2C] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_rgba(193,90,44,0.4)] hover:bg-[#A04A24] hover:shadow-[0_0_60px_rgba(193,90,44,0.6)] transition-all"
                    >
                        Explore AI Training <span className="opacity-60">→</span>
                    </Link>
                    <p className="mt-4 text-xs text-white/25">
                        All AI training engagements require an Executive Review consultation.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
