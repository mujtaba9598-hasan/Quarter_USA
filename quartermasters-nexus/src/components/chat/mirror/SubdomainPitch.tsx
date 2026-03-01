'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SubdomainPitchProps {
    domain?: string;
}

const PLATFORMS = [
    { id: 'wordpress', label: 'WordPress', color: '#21759B' },
    { id: 'shopify', label: 'Shopify', color: '#96BF48' },
    { id: 'squarespace', label: 'Squarespace', color: '#999999' },
    { id: 'wix', label: 'Wix', color: '#0C6EFC' },
    { id: 'webflow', label: 'Webflow', color: '#4353FF' },
    { id: 'custom', label: 'Custom / Other', color: '#8B5CF6' },
    { id: 'none', label: 'No site yet', color: '#6B7280' },
];

const FEATURE_OPTIONS = [
    { id: 'ai-chat', label: 'AI Chat / Assistant', icon: '🧠' },
    { id: 'payments', label: 'Payments / Checkout', icon: '💳' },
    { id: 'auth', label: 'User Auth / Portal', icon: '🔐' },
    { id: 'dashboard', label: 'Analytics Dashboard', icon: '📊' },
    { id: 'booking', label: 'Booking / Scheduling', icon: '📅' },
    { id: 'realtime', label: 'Real-time Features', icon: '⚡' },
    { id: 'cms', label: 'Custom CMS / Admin', icon: '📝' },
    { id: 'api', label: 'API / Integration', icon: '🔗' },
];

type Phase = 'stack-check' | 'features' | 'diagram';

export function SubdomainPitch({ domain }: SubdomainPitchProps) {
    const [phase, setPhase] = useState<Phase>('stack-check');
    const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const visitorDomain = domain || 'yoursite.com';

    const toggleFeature = (id: string) => {
        setSelectedFeatures(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-[#0a0f1a] border border-white/10 overflow-hidden"
        >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="text-sm font-semibold text-white tracking-wide">
                        FEATURE INJECTION — SUBDOMAIN STRATEGY
                    </span>
                </div>
                <div className="flex gap-1">
                    {(['stack-check', 'features', 'diagram'] as Phase[]).map((p, i) => (
                        <div
                            key={p}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                phase === p ? 'bg-[#10B981]' :
                                i < (['stack-check', 'features', 'diagram'] as Phase[]).indexOf(phase)
                                    ? 'bg-[#10B981]/40' : 'bg-white/10'
                            }`}
                        />
                    ))}
                </div>
            </div>

            <div className="p-5">
                <AnimatePresence mode="wait">
                    {phase === 'stack-check' && (
                        <motion.div
                            key="stack"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h3 className="text-sm font-semibold text-white mb-1">
                                What platform is your current site built on?
                            </h3>
                            <p className="text-xs text-white/40 mb-4">
                                This helps us understand the integration approach.
                            </p>

                            <div className="grid grid-cols-2 gap-2">
                                {PLATFORMS.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => setSelectedPlatform(p.id)}
                                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-all text-xs ${
                                            selectedPlatform === p.id
                                                ? 'border-[#10B981]/50 bg-[#10B981]/10 text-white'
                                                : 'border-white/5 bg-white/[0.02] text-white/60 hover:border-white/15'
                                        }`}
                                    >
                                        <div
                                            className="w-2 h-2 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: p.color }}
                                        />
                                        {p.label}
                                    </button>
                                ))}
                            </div>

                            {selectedPlatform && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4"
                                >
                                    {/* No-patch boundary */}
                                    <div className="rounded-lg bg-[#C15A2C]/10 border border-[#C15A2C]/20 p-3 mb-4">
                                        <p className="text-xs text-[#C15A2C] font-semibold mb-1">
                                            Boundary Statement
                                        </p>
                                        <p className="text-[11px] text-white/60 leading-relaxed">
                                            {selectedPlatform === 'none'
                                                ? 'Since you don\'t have a site yet, we\'ll build the new feature as a standalone app that you can later link from any domain.'
                                                : `We do not edit, patch, or modify your existing ${PLATFORMS.find(p => p.id === selectedPlatform)?.label} site. Instead, we build a brand-new, independent application on a subdomain (app.${visitorDomain}) that integrates seamlessly with your existing site via a simple menu link.`
                                            }
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setPhase('features')}
                                        className="w-full py-2.5 rounded-lg bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] text-xs font-semibold hover:bg-[#10B981]/30 transition-colors"
                                    >
                                        Continue — Select Features
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {phase === 'features' && (
                        <motion.div
                            key="features"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <h3 className="text-sm font-semibold text-white mb-1">
                                What capabilities do you need?
                            </h3>
                            <p className="text-xs text-white/40 mb-4">
                                Select all that apply. This shapes the architecture.
                            </p>

                            <div className="grid grid-cols-2 gap-2">
                                {FEATURE_OPTIONS.map(f => (
                                    <button
                                        key={f.id}
                                        onClick={() => toggleFeature(f.id)}
                                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-all text-xs ${
                                            selectedFeatures.includes(f.id)
                                                ? 'border-[#10B981]/50 bg-[#10B981]/10 text-white'
                                                : 'border-white/5 bg-white/[0.02] text-white/60 hover:border-white/15'
                                        }`}
                                    >
                                        <span className="text-sm">{f.icon}</span>
                                        {f.label}
                                    </button>
                                ))}
                            </div>

                            {selectedFeatures.length > 0 && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onClick={() => setPhase('diagram')}
                                    className="w-full mt-4 py-2.5 rounded-lg bg-[#10B981]/20 border border-[#10B981]/30 text-[#10B981] text-xs font-semibold hover:bg-[#10B981]/30 transition-colors"
                                >
                                    View Architecture — {selectedFeatures.length} feature{selectedFeatures.length > 1 ? 's' : ''} selected
                                </motion.button>
                            )}
                        </motion.div>
                    )}

                    {phase === 'diagram' && (
                        <motion.div
                            key="diagram"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <InteractiveSubdomainDiagram
                                domain={visitorDomain}
                                platform={PLATFORMS.find(p => p.id === selectedPlatform)?.label || 'Current Site'}
                                features={selectedFeatures.map(id => FEATURE_OPTIONS.find(f => f.id === id)!)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

function InteractiveSubdomainDiagram({
    domain,
    platform,
    features,
}: {
    domain: string;
    platform: string;
    features: { id: string; label: string; icon: string }[];
}) {
    return (
        <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-2">
                Your Integration Architecture
            </p>

            {/* Existing site */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center px-5 py-3 rounded-lg border border-[#6366F1]/40 bg-[#6366F1]/10 w-full max-w-[240px]"
            >
                <p className="text-xs font-semibold text-white">{platform}</p>
                <p className="text-[10px] text-[#6366F1]">www.{domain}</p>
            </motion.div>

            {/* Arrow + menu link label */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center py-1"
            >
                <div className="h-6 w-px bg-gradient-to-b from-[#6366F1]/40 to-[#10B981]/40 relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-t-[5px] border-t-[#10B981]/40 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent" />
                </div>
                <p className="text-[8px] text-white/30 mt-1 uppercase tracking-wider">Menu Link</p>
            </motion.div>

            {/* QM App */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border-2 border-dashed border-[#10B981]/30 p-4 w-full"
            >
                <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] text-[#10B981] uppercase tracking-wider font-semibold">
                        New QM Application
                    </p>
                    <p className="text-[10px] text-white/30 font-mono">
                        app.{domain}
                    </p>
                </div>

                {/* Feature badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {features.map((f, i) => (
                        <motion.span
                            key={f.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + i * 0.08 }}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#10B981]/10 border border-[#10B981]/20 text-[10px] text-[#10B981]"
                        >
                            <span>{f.icon}</span>
                            {f.label}
                        </motion.span>
                    ))}
                </div>

                {/* Infrastructure stack */}
                <div className="flex items-center gap-2 justify-center">
                    <InfraBox label="Next.js 16" sublabel="React 19" color="#C15A2C" delay={0.6} />
                    <InfraBox label="Vercel Edge" sublabel="Global CDN" color="#10B981" delay={0.7} />
                    <InfraBox label="Supabase" sublabel="PostgreSQL" color="#3B82C4" delay={0.8} />
                </div>
            </motion.div>

            {/* DNS layer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-2 mt-2"
            >
                <div className="h-px w-8 bg-white/10" />
                <p className="text-[9px] text-white/20 uppercase tracking-wider">
                    DNS / CNAME — Zero modification to your existing site
                </p>
                <div className="h-px w-8 bg-white/10" />
            </motion.div>

            {/* Key points */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="mt-3 space-y-1.5 w-full"
            >
                {[
                    'Your existing site stays exactly as it is — we never touch it.',
                    'Users click a menu link on your site and land on the new app.',
                    'Same branding, same look — visitors won\'t know the difference.',
                    'Independent infrastructure means no performance impact on your main site.',
                ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]/60 mt-1 flex-shrink-0" />
                        <p className="text-[10px] text-white/40 leading-relaxed">{point}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

function InfraBox({
    label,
    sublabel,
    color,
    delay,
}: {
    label: string;
    sublabel: string;
    color: string;
    delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            className="flex flex-col items-center px-3 py-2 rounded-md border"
            style={{
                borderColor: `${color}30`,
                background: `${color}08`,
            }}
        >
            <p className="text-[10px] font-semibold text-white">{label}</p>
            <p className="text-[8px]" style={{ color: `${color}99` }}>{sublabel}</p>
        </motion.div>
    );
}
