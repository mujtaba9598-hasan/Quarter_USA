'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteAuditScanner } from './SiteAuditScanner';
import { AuditReport } from './AuditReport';

interface RebuildDiagnosticProps {
    url: string;
}

/**
 * RebuildDiagnostic — Complete audit flow for The Rebuild module.
 *
 * Phase 1: SiteAuditScanner (2-min timer + log stream + real PSI data)
 * Phase 2: AuditReport (score gauges + metrics)
 * Phase 3: No-Legacy Pledge card
 */
export function RebuildDiagnostic({ url }: RebuildDiagnosticProps) {
    const [phase, setPhase] = useState<'scanning' | 'report'>('scanning');
    const [auditData, setAuditData] = useState<any>(null);

    return (
        <div className="space-y-4">
            {phase === 'scanning' && (
                <SiteAuditScanner
                    url={url}
                    onComplete={(result) => {
                        setAuditData(result);
                        setPhase('report');
                    }}
                />
            )}

            <AnimatePresence>
                {phase === 'report' && auditData && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                    >
                        <AuditReport data={auditData} />
                        <DesignDirection />
                        <NoLegacyPledge />
                        <EstimateDisclaimer />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const DESIGN_TRENDS = [
    { label: 'Glassmorphism', desc: 'Frosted glass cards with backdrop blur and translucent borders', color: '#60A5FA' },
    { label: 'Dark Mode First', desc: 'Deep navy/slate palettes with high-contrast typography', color: '#A78BFA' },
    { label: 'Micro-interactions', desc: 'Hover effects, scroll-triggered animations, smooth transitions', color: '#34D399' },
    { label: 'Variable Fonts', desc: 'Modern typography with weight/width axes for dynamic hierarchy', color: '#FBBF24' },
    { label: 'Edge-first SSR', desc: 'Server components with sub-200ms TTFB, zero layout shift', color: '#F87171' },
    { label: 'Accessible by Default', desc: 'WCAG 2.1 AA, semantic HTML, keyboard navigation, screen reader optimized', color: '#2DD4BF' },
];

/**
 * DesignDirection — Shows modern design trends that will be applied to the rebuild.
 * Appears after the audit report to set expectations for the new build quality.
 */
function DesignDirection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl bg-[#0a0f1a] border border-white/10 p-5"
        >
            <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#C15A2C] animate-pulse" />
                <h3 className="text-xs uppercase tracking-wider text-white/50 font-semibold">
                    Your Rebuild Design Direction
                </h3>
            </div>
            <p className="text-xs text-white/40 mb-4 leading-relaxed">
                Your new site will be built with current design standards. Here is the architectural direction:
            </p>
            <div className="grid grid-cols-2 gap-2">
                {DESIGN_TRENDS.map((trend, i) => (
                    <motion.div
                        key={trend.label}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className="rounded-lg bg-white/[0.03] border border-white/5 p-3"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: trend.color }} />
                            <span className="text-[11px] font-medium text-white/80">{trend.label}</span>
                        </div>
                        <p className="text-[10px] text-white/30 leading-relaxed">{trend.desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

/**
 * No-Legacy Pledge — Reinforces the "we don't patch legacy code" position.
 * Visitor must check the box to acknowledge before Q proceeds to estimate.
 */
function NoLegacyPledge() {
    const [checked, setChecked] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl bg-[#0a0f1a] border border-white/10 p-5"
        >
            <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#C15A2C]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1L10 6H15L11 9.5L12.5 15L8 11.5L3.5 15L5 9.5L1 6H6L8 1Z" fill="#C15A2C" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-white mb-1">The Quartermasters Rebuild Pledge</h3>
                    <p className="text-xs text-white/50 leading-relaxed">
                        We do not patch, modify, or maintain legacy code. Our methodology is a clean-slate rebuild
                        using modern, high-performance architecture. Your existing site content and brand identity
                        will be preserved, but the codebase will be entirely new.
                    </p>
                </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        className="sr-only"
                    />
                    <div
                        className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                            checked
                                ? 'bg-[#C15A2C] border-[#C15A2C]'
                                : 'border-white/20 group-hover:border-white/40'
                        }`}
                    >
                        {checked && (
                            <motion.svg
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                            >
                                <path
                                    d="M2 6L5 9L10 3"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </motion.svg>
                        )}
                    </div>
                </div>
                <span className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
                    I understand this is a full rebuild, not a patch on my existing site.
                </span>
            </label>

            {checked && (
                <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-[10px] text-[#10B981] mt-3 pl-8"
                >
                    Acknowledged. Q will now prepare your preliminary estimate.
                </motion.p>
            )}
        </motion.div>
    );
}

/**
 * EstimateDisclaimer — Legal/scope disclaimer for preliminary estimates.
 */
function EstimateDisclaimer() {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl bg-white/[0.02] border border-white/5 px-4 py-3"
        >
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between text-left"
            >
                <span className="text-[10px] text-white/30 uppercase tracking-wider font-semibold">
                    Preliminary Estimate Disclaimer
                </span>
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                >
                    <path d="M3 5L6 8L9 5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-3 space-y-2 text-[10px] text-white/25 leading-relaxed">
                            <p>
                                This estimate is preliminary and based solely on the information shared during this
                                conversation. It is not a binding quote, contract, or commitment.
                            </p>
                            <p>
                                A formal, binding proposal will only be issued after a comprehensive scope assessment
                                conducted by our team during a scheduled consultation.
                            </p>
                            <p>
                                Quartermasters reserves the right to adjust pricing based on final scope, complexity,
                                integrations, and timeline requirements.
                            </p>
                            <p>
                                All prices are listed in USD. Taxes, domain costs, and third-party service fees
                                are not included.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
