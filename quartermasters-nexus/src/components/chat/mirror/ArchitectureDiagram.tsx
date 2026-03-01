"use client";

import { motion } from "framer-motion";

type DiagramVariant = "subdomain" | "zero-knowledge" | "system";

interface ArchitectureDiagramProps {
    variant: DiagramVariant;
}

/**
 * Renders architecture diagrams for:
 * - subdomain: Feature Injection (Box A → DNS → Box B)
 * - zero-knowledge: Digital Twin / AI Training (Private Data → VPC → Isolated Model)
 * - system: Generic system architecture for Web App module
 */
export function ArchitectureDiagram({ variant }: ArchitectureDiagramProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="my-4 rounded-xl border border-white/10 overflow-hidden"
        >
            <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C15A2C] animate-pulse" />
                <p className="text-xs uppercase tracking-wider text-white/50 font-medium">
                    {DIAGRAM_TITLES[variant]}
                </p>
            </div>

            <div className="p-6">
                {variant === "subdomain" && <SubdomainDiagram />}
                {variant === "zero-knowledge" && <ZeroKnowledgeDiagram />}
                {variant === "system" && <SystemDiagram />}
            </div>
        </motion.div>
    );
}

const DIAGRAM_TITLES: Record<DiagramVariant, string> = {
    subdomain: "Subdomain Integration Architecture",
    "zero-knowledge": "Zero-Knowledge Data Architecture",
    system: "System Architecture Overview",
};

// --- Shared primitives ---

function DiagramBox({
    label,
    sublabel,
    color = "#C15A2C",
    delay = 0,
}: {
    label: string;
    sublabel?: string;
    color?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.3 }}
            className="flex flex-col items-center justify-center px-4 py-3 rounded-lg border min-w-[120px]"
            style={{
                borderColor: `${color}40`,
                background: `${color}10`,
            }}
        >
            <p className="text-xs font-semibold text-white">{label}</p>
            {sublabel && (
                <p className="text-[10px] mt-0.5" style={{ color: `${color}CC` }}>
                    {sublabel}
                </p>
            )}
        </motion.div>
    );
}

function Arrow({ delay = 0, label }: { delay?: number; label?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay, duration: 0.2 }}
            className="flex flex-col items-center justify-center px-2"
        >
            <div className="w-8 h-px bg-gradient-to-r from-white/20 to-white/40 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[5px] border-l-white/40 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent" />
            </div>
            {label && (
                <p className="text-[8px] text-white/30 mt-1 uppercase tracking-wider">{label}</p>
            )}
        </motion.div>
    );
}

function DownArrow({ delay = 0, label }: { delay?: number; label?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay, duration: 0.2 }}
            className="flex flex-col items-center py-1"
        >
            <div className="h-6 w-px bg-gradient-to-b from-white/20 to-white/40 relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-t-[5px] border-t-white/40 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent" />
            </div>
            {label && (
                <p className="text-[8px] text-white/30 mt-1 uppercase tracking-wider">{label}</p>
            )}
        </motion.div>
    );
}

// --- Diagram Variants ---

function SubdomainDiagram() {
    return (
        <div className="flex flex-col items-center gap-1">
            {/* Top row: existing site + new app */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
                <DiagramBox
                    label="Your Website"
                    sublabel="www.yoursite.com"
                    color="#6366F1"
                    delay={0}
                />
                <Arrow delay={0.2} label="Menu Link" />
                <DiagramBox
                    label="New QM App"
                    sublabel="app.yoursite.com"
                    color="#C15A2C"
                    delay={0.1}
                />
            </div>

            {/* DNS row */}
            <DownArrow delay={0.3} />
            <DiagramBox
                label="DNS / CNAME"
                sublabel="Points subdomain to QM infra"
                color="#3B82C4"
                delay={0.4}
            />
            <DownArrow delay={0.5} />

            {/* Infrastructure */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
                <DiagramBox
                    label="Vercel Edge"
                    sublabel="Global CDN"
                    color="#10B981"
                    delay={0.6}
                />
                <Arrow delay={0.7} />
                <DiagramBox
                    label="Supabase"
                    sublabel="PostgreSQL + Auth"
                    color="#3B82C4"
                    delay={0.7}
                />
            </div>

            <p className="text-[10px] text-white/20 mt-4 text-center">
                Your existing site is never modified. The new app runs on independent infrastructure.
            </p>
        </div>
    );
}

function ZeroKnowledgeDiagram() {
    return (
        <div className="flex flex-col items-center gap-1">
            {/* Data source */}
            <DiagramBox
                label="Your Company Data"
                sublabel="SOPs, HR docs, knowledge base"
                color="#F59E0B"
                delay={0}
            />
            <DownArrow delay={0.15} label="Encrypted Transfer" />

            {/* VPC */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="rounded-xl border-2 border-dashed border-[#C15A2C]/30 p-4 w-full max-w-xs"
            >
                <p className="text-[10px] text-[#C15A2C] uppercase tracking-wider font-semibold text-center mb-3">
                    Quartermasters Secure VPC
                </p>
                <div className="flex flex-col items-center gap-1">
                    <DiagramBox
                        label="Data Ingestion"
                        sublabel="RAG Pipeline"
                        color="#3B82C4"
                        delay={0.4}
                    />
                    <DownArrow delay={0.5} />
                    <DiagramBox
                        label="Private Model"
                        sublabel="Fine-tuned on your data"
                        color="#C15A2C"
                        delay={0.6}
                    />
                </div>
            </motion.div>

            <DownArrow delay={0.7} label="API Endpoint" />

            {/* Output */}
            <DiagramBox
                label="Your Digital Twin"
                sublabel="Customer-facing or internal"
                color="#10B981"
                delay={0.8}
            />

            <p className="text-[10px] text-white/20 mt-4 text-center">
                Completely isolated from public models. Your data never leaves the secure VPC.
            </p>
        </div>
    );
}

function SystemDiagram() {
    return (
        <div className="flex flex-col items-center gap-1">
            {/* Client */}
            <DiagramBox
                label="Client Browser"
                sublabel="React 19 + Next.js 16"
                color="#3B82C4"
                delay={0}
            />
            <DownArrow delay={0.15} label="HTTPS" />

            {/* Edge */}
            <DiagramBox
                label="Vercel Edge Network"
                sublabel="Global CDN, SSR, ISR"
                color="#10B981"
                delay={0.2}
            />
            <DownArrow delay={0.3} />

            {/* API Layer */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
                <DiagramBox
                    label="API Routes"
                    sublabel="Server Actions"
                    color="#6366F1"
                    delay={0.4}
                />
                <Arrow delay={0.5} />
                <DiagramBox
                    label="Auth Layer"
                    sublabel="JWT + RLS"
                    color="#F59E0B"
                    delay={0.5}
                />
            </div>
            <DownArrow delay={0.6} />

            {/* Data Layer */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
                <DiagramBox
                    label="Supabase"
                    sublabel="PostgreSQL + pgvector"
                    color="#3B82C4"
                    delay={0.7}
                />
                <Arrow delay={0.8} />
                <DiagramBox
                    label="Redis"
                    sublabel="Caching + Rate Limits"
                    color="#C15A2C"
                    delay={0.8}
                />
            </div>
        </div>
    );
}
