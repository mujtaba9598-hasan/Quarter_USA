'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface QStats {
    totalConversations: number;
    activeSessions: number;
    totalLeads: number;
    highValueLeads: number;
    leadsToday: number;
    leadsThisWeek: number;
    leadsThisMonth: number;
    totalMessages: number;
    avgMessagesPerConversation: number;
    conversionRate: string;
    pendingApprovals: number;
    moduleDistribution: Record<string, number>;
    personaDistribution: Record<string, number>;
    stageDistribution: Record<string, number>;
}

const MODULE_LABELS: Record<string, string> = {
    rebuild: 'Website Redesign',
    expansion: 'Feature Injection',
    express: 'Express Build',
    webapp: 'Web App / SaaS',
    'ai-training': 'AI Model Training',
    unidentified: 'Unidentified',
};

const PERSONA_LABELS: Record<string, string> = {
    strategist: 'Strategist',
    architect: 'Architect',
    operator: 'Operator',
    unlocked: 'Not Locked',
};

const STAGE_LABELS: Record<string, string> = {
    greeting: 'Greeting',
    budget: 'Budget',
    location: 'Location',
    business: 'Business',
    scope: 'Scope',
    persona_lock: 'Persona Lock',
    demo: 'Demo',
    estimate: 'Estimate',
    close: 'Close',
};

export function QActivityDashboard() {
    const [stats, setStats] = useState<QStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/q-stats')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-[#C15A2C] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!stats) {
        return <p className="text-white/40 text-center py-8">Failed to load Q activity data.</p>;
    }

    return (
        <div className="space-y-8">
            {/* Top Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total Conversations" value={stats.totalConversations} />
                <StatCard label="Active Now" value={stats.activeSessions} highlight />
                <StatCard label="Total Leads" value={stats.totalLeads} />
                <StatCard label="High-Value Leads" value={stats.highValueLeads} accent="#D4A017" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Leads Today" value={stats.leadsToday} />
                <StatCard label="Leads This Week" value={stats.leadsThisWeek} />
                <StatCard label="Leads This Month" value={stats.leadsThisMonth} />
                <StatCard label="Conversion Rate" value={stats.conversionRate} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatCard label="Total Messages" value={stats.totalMessages} />
                <StatCard label="Avg Msgs / Conv" value={stats.avgMessagesPerConversation} />
                <StatCard label="Pending Approvals" value={stats.pendingApprovals} accent={stats.pendingApprovals > 0 ? '#EF4444' : undefined} />
            </div>

            {/* Distribution Charts */}
            <div className="grid md:grid-cols-3 gap-6">
                <DistributionCard
                    title="Service Modules"
                    data={stats.moduleDistribution}
                    labels={MODULE_LABELS}
                />
                <DistributionCard
                    title="Personas"
                    data={stats.personaDistribution}
                    labels={PERSONA_LABELS}
                />
                <DistributionCard
                    title="Discovery Stages Reached"
                    data={stats.stageDistribution}
                    labels={STAGE_LABELS}
                />
            </div>
        </div>
    );
}

function StatCard({
    label,
    value,
    highlight,
    accent,
}: {
    label: string;
    value: number | string;
    highlight?: boolean;
    accent?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white/5 border border-white/10 p-4"
        >
            <p className="text-[11px] text-white/40 uppercase tracking-wider">{label}</p>
            <p
                className="text-2xl font-bold mt-1"
                style={{
                    color: accent || (highlight ? '#10B981' : '#f0f0f0'),
                    fontFamily: 'var(--font-heading)',
                }}
            >
                {value}
            </p>
        </motion.div>
    );
}

function DistributionCard({
    title,
    data,
    labels,
}: {
    title: string;
    data: Record<string, number>;
    labels: Record<string, string>;
}) {
    const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const total = entries.reduce((sum, [, v]) => sum + v, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-white/5 border border-white/10 p-5"
        >
            <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
            {entries.length === 0 ? (
                <p className="text-xs text-white/30">No data yet</p>
            ) : (
                <div className="space-y-3">
                    {entries.map(([key, count]) => {
                        const pct = total > 0 ? (count / total) * 100 : 0;
                        return (
                            <div key={key}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-white/70">{labels[key] || key}</span>
                                    <span className="text-white/40">{count} ({pct.toFixed(0)}%)</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${pct}%` }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                        className="h-full rounded-full bg-[#C15A2C]"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </motion.div>
    );
}
