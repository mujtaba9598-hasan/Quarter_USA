'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpansionEstimateProps {
    featureCount?: number;
    complexity?: 'single' | 'multi' | 'complex' | 'enterprise';
}

type Tier = {
    id: string;
    name: string;
    price: string;
    priceNum: number;
    timeline: string;
    description: string;
    deliverables: string[];
    recommended?: boolean;
};

const TIERS: Tier[] = [
    {
        id: 'express',
        name: 'Express',
        price: '$3,000',
        priceNum: 3000,
        timeline: '1 week',
        description: 'Single feature integration into existing codebase.',
        deliverables: [
            'Feature Implementation',
            'Integration Testing',
            'Documentation',
            'Deployment Support',
        ],
    },
    {
        id: 'standard',
        name: 'Standard',
        price: '$8,000',
        priceNum: 8000,
        timeline: '2-3 weeks',
        description: 'Multi-feature integration with API connections and auth hardening.',
        deliverables: [
            'Multiple Feature Implementations',
            'API Integrations',
            'Security Hardening',
            'Automated Testing',
            'CI/CD Updates',
        ],
        recommended: true,
    },
    {
        id: 'premium',
        name: 'Premium',
        price: '$20,000',
        priceNum: 20000,
        timeline: '4-6 weeks',
        description: 'Complex feature suite with AI capabilities, real-time systems, and analytics.',
        deliverables: [
            'AI Feature Integration',
            'Real-time Systems',
            'Custom Dashboard',
            'Performance Monitoring',
            'Load Testing',
            'Documentation',
        ],
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: '$40,000',
        priceNum: 40000,
        timeline: '8+ weeks',
        description: 'Enterprise feature platform with dedicated engineering.',
        deliverables: [
            'Feature Platform Architecture',
            'Microservices Integration',
            'Dedicated Engineer',
            'Ongoing Development',
            'Priority Support',
            'Monthly Reviews',
        ],
    },
];

function getRecommendedTier(featureCount?: number, complexity?: string): string {
    if (complexity === 'enterprise') return 'enterprise';
    if (complexity === 'complex' || (featureCount && featureCount >= 4)) return 'premium';
    if (complexity === 'multi' || (featureCount && featureCount >= 2)) return 'standard';
    return 'express';
}

export function ExpansionEstimate({ featureCount, complexity }: ExpansionEstimateProps) {
    const recommendedId = getRecommendedTier(featureCount, complexity);
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [showDisclaimer, setShowDisclaimer] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-[#0a0f1a] border border-white/10 overflow-hidden"
        >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    <span className="text-sm font-semibold text-white tracking-wide">
                        FEATURE INJECTION — SCOPE ASSESSMENT
                    </span>
                </div>
                {featureCount && (
                    <span className="text-xs text-white/30 font-mono">
                        {featureCount} feature{featureCount > 1 ? 's' : ''} identified
                    </span>
                )}
            </div>

            {/* Tier Cards */}
            <div className="p-5 space-y-3">
                {TIERS.map((tier, i) => {
                    const isRecommended = tier.id === recommendedId;
                    const isSelected = selectedTier === tier.id;

                    return (
                        <motion.button
                            key={tier.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setSelectedTier(isSelected ? null : tier.id)}
                            className={`w-full text-left rounded-lg border p-4 transition-all ${
                                isSelected
                                    ? 'border-[#10B981]/50 bg-[#10B981]/5'
                                    : isRecommended
                                    ? 'border-[#C15A2C]/30 bg-[#C15A2C]/5'
                                    : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-white">{tier.name}</span>
                                    {isRecommended && (
                                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#C15A2C]/20 text-[#C15A2C]">
                                            Recommended
                                        </span>
                                    )}
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-white font-mono">{tier.price}</span>
                                    <span className="text-[10px] text-white/30 ml-1">/ {tier.timeline}</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-white/40">{tier.description}</p>

                            <AnimatePresence>
                                {isSelected && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-3 pt-3 border-t border-white/5">
                                            <p className="text-[10px] text-white/30 uppercase tracking-wider font-semibold mb-2">
                                                Deliverables
                                            </p>
                                            <div className="space-y-1">
                                                {tier.deliverables.map(d => (
                                                    <div key={d} className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]/60 flex-shrink-0" />
                                                        <span className="text-[11px] text-white/50">{d}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}
            </div>

            {/* Enterprise handoff */}
            {(recommendedId === 'enterprise' || selectedTier === 'enterprise') && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mx-5 mb-4 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20 p-3"
                >
                    <p className="text-xs text-[#F59E0B] font-semibold mb-1">Executive Review Required</p>
                    <p className="text-[10px] text-white/50 leading-relaxed">
                        Enterprise-tier projects require a formal scope assessment with our Lead Architect.
                        Q will set up an Executive Review call to finalize requirements, timeline, and pricing.
                    </p>
                </motion.div>
            )}

            {/* Disclaimer toggle */}
            <div className="px-5 pb-4">
                <button
                    onClick={() => setShowDisclaimer(!showDisclaimer)}
                    className="w-full flex items-center justify-between text-left py-2"
                >
                    <span className="text-[10px] text-white/25 uppercase tracking-wider font-semibold">
                        Estimate Disclaimer
                    </span>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className={`transition-transform duration-200 ${showDisclaimer ? 'rotate-180' : ''}`}
                    >
                        <path d="M3 5L6 8L9 5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button>
                <AnimatePresence>
                    {showDisclaimer && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-1.5 text-[10px] text-white/20 leading-relaxed pb-2">
                                <p>This is a preliminary estimate. A formal quote requires a comprehensive scope assessment.</p>
                                <p>Prices listed in USD. Third-party service fees, domain costs, and taxes not included.</p>
                                <p>Quartermasters reserves the right to adjust pricing based on final scope and complexity.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
