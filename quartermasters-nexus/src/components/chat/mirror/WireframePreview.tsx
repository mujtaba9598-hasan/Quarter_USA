"use client";

import { motion } from "framer-motion";

interface WireframePreviewProps {
    service: string;
}

/**
 * Renders a wireframe-style preview of what Quartermasters would build.
 * Used during the demo stage of discovery for Express Build and Website Redesign.
 */
export function WireframePreview({ service }: WireframePreviewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="my-4 rounded-xl border border-white/10 overflow-hidden bg-[#0a0f1a]"
        >
            {/* Header */}
            <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C15A2C] animate-pulse" />
                <p className="text-xs uppercase tracking-wider text-white/50 font-medium">
                    Live Wireframe Draft
                </p>
            </div>

            {/* Browser Chrome */}
            <div className="mx-4 mt-4 rounded-t-lg border border-white/10 overflow-hidden">
                {/* Title Bar */}
                <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border-b border-white/10">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <div className="flex-1 mx-4">
                        <div className="bg-white/10 rounded px-3 py-1 text-[10px] text-white/30 text-center">
                            yoursite.com
                        </div>
                    </div>
                </div>

                {/* Wireframe Content */}
                <div className="bg-[#080c16] p-4 space-y-3">
                    {/* Nav Block */}
                    <WireframeBlock label="Navigation" height="h-8">
                        <div className="flex items-center justify-between h-full px-3">
                            <div className="w-16 h-3 rounded bg-white/20" />
                            <div className="flex gap-3">
                                <div className="w-10 h-2 rounded bg-white/10" />
                                <div className="w-10 h-2 rounded bg-white/10" />
                                <div className="w-10 h-2 rounded bg-white/10" />
                                <div className="w-14 h-4 rounded bg-[#C15A2C]/40" />
                            </div>
                        </div>
                    </WireframeBlock>

                    {/* Hero Block */}
                    <WireframeBlock label="Hero Section" height="h-28">
                        <div className="flex flex-col items-center justify-center h-full gap-2">
                            <div className="w-48 h-4 rounded bg-white/15" />
                            <div className="w-36 h-3 rounded bg-white/8" />
                            <div className="flex gap-2 mt-1">
                                <div className="w-20 h-5 rounded bg-[#C15A2C]/40" />
                                <div className="w-20 h-5 rounded bg-white/10" />
                            </div>
                        </div>
                    </WireframeBlock>

                    {service === "express-build" ? (
                        <>
                            {/* Features Grid */}
                            <WireframeBlock label="Features" height="h-20">
                                <div className="grid grid-cols-3 gap-2 h-full p-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex flex-col items-center justify-center gap-1 rounded bg-white/5 p-2">
                                            <div className="w-6 h-6 rounded-full bg-[#C15A2C]/20" />
                                            <div className="w-12 h-2 rounded bg-white/10" />
                                        </div>
                                    ))}
                                </div>
                            </WireframeBlock>

                            {/* Contact Form Block */}
                            <WireframeBlock label="Contact Form" height="h-24">
                                <div className="flex flex-col gap-1.5 h-full p-2">
                                    <div className="flex gap-2">
                                        <div className="flex-1 h-4 rounded bg-white/8 border border-white/10" />
                                        <div className="flex-1 h-4 rounded bg-white/8 border border-white/10" />
                                    </div>
                                    <div className="w-full h-4 rounded bg-white/8 border border-white/10" />
                                    <div className="w-full h-8 rounded bg-white/5 border border-white/10" />
                                    <div className="w-20 h-4 rounded bg-[#C15A2C]/40 self-end" />
                                </div>
                            </WireframeBlock>

                            {/* CTA Block */}
                            <WireframeBlock label="Call to Action" height="h-16">
                                <div className="flex flex-col items-center justify-center h-full gap-1.5">
                                    <div className="w-32 h-3 rounded bg-white/12" />
                                    <div className="w-24 h-5 rounded bg-[#C15A2C]/50" />
                                </div>
                            </WireframeBlock>
                        </>
                    ) : (
                        <>
                            {/* Services Grid */}
                            <WireframeBlock label="Services Grid" height="h-24">
                                <div className="grid grid-cols-2 gap-2 h-full p-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="rounded bg-white/5 p-2 flex flex-col gap-1">
                                            <div className="w-full h-2 rounded bg-white/10" />
                                            <div className="w-3/4 h-1.5 rounded bg-white/5" />
                                        </div>
                                    ))}
                                </div>
                            </WireframeBlock>

                            {/* Pricing Table */}
                            <WireframeBlock label="Pricing Table" height="h-24">
                                <div className="grid grid-cols-3 gap-2 h-full p-2">
                                    {['Starter', 'Growth', 'Enterprise'].map(tier => (
                                        <div key={tier} className="rounded bg-white/5 p-1.5 flex flex-col items-center gap-1 border border-white/5">
                                            <div className="w-12 h-1.5 rounded bg-white/15" />
                                            <div className="w-8 h-3 rounded bg-[#C15A2C]/30" />
                                            <div className="w-full space-y-0.5 mt-0.5">
                                                <div className="w-full h-1 rounded bg-white/8" />
                                                <div className="w-full h-1 rounded bg-white/5" />
                                                <div className="w-full h-1 rounded bg-white/8" />
                                            </div>
                                            <div className="w-10 h-3 rounded bg-white/10 mt-auto" />
                                        </div>
                                    ))}
                                </div>
                            </WireframeBlock>

                            {/* Testimonials */}
                            <WireframeBlock label="Testimonials" height="h-14">
                                <div className="flex gap-2 h-full p-2">
                                    {[1, 2].map(i => (
                                        <div key={i} className="flex-1 rounded bg-white/5 p-2 flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-white/10 shrink-0" />
                                            <div className="flex-1 space-y-1">
                                                <div className="w-full h-1.5 rounded bg-white/8" />
                                                <div className="w-2/3 h-1.5 rounded bg-white/5" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </WireframeBlock>
                        </>
                    )}

                    {/* Footer Block */}
                    <WireframeBlock label="Footer" height="h-10">
                        <div className="flex items-center justify-between h-full px-3">
                            <div className="w-20 h-2 rounded bg-white/10" />
                            <div className="flex gap-2">
                                <div className="w-4 h-4 rounded-full bg-white/10" />
                                <div className="w-4 h-4 rounded-full bg-white/10" />
                                <div className="w-4 h-4 rounded-full bg-white/10" />
                            </div>
                        </div>
                    </WireframeBlock>
                </div>
            </div>

            {/* Footer info */}
            <div className="px-4 py-3 text-center">
                <p className="text-[10px] text-white/30">
                    Built on React + Next.js — Not a template
                </p>
            </div>
        </motion.div>
    );
}

function WireframeBlock({
    label,
    height,
    children,
}: {
    label: string;
    height: string;
    children: React.ReactNode;
}) {
    return (
        <div className="relative group">
            <div className={`${height} rounded border border-dashed border-white/10 overflow-hidden`}>
                {children}
            </div>
            <span className="absolute top-0.5 right-1 text-[8px] text-white/20 uppercase tracking-wider">
                {label}
            </span>
        </div>
    );
}
