'use client';

import { motion } from 'framer-motion';

interface AuditMetric {
    value: number;
    display: string;
    rating: 'good' | 'needs-improvement' | 'poor';
}

interface AuditReportData {
    url: string;
    fetchedAt: string;
    scores: {
        performance: number;
        accessibility: number;
        bestPractices: number;
        seo: number;
    };
    metrics: {
        fcp: AuditMetric;
        lcp: AuditMetric;
        cls: AuditMetric;
        tti: AuditMetric;
        speedIndex: AuditMetric;
        tbt: AuditMetric;
    };
    loadTime: string;
    serverResponseTime: string;
    totalSize: string;
    requestCount: number;
}

interface AuditReportProps {
    data: AuditReportData;
}

const RATING_COLORS = {
    good: { bg: '#10B981', text: '#6EE7B7', label: 'PASS' },
    'needs-improvement': { bg: '#F59E0B', text: '#FCD34D', label: 'WARN' },
    poor: { bg: '#EF4444', text: '#FCA5A5', label: 'FAIL' },
};

const METRIC_LABELS: Record<string, string> = {
    fcp: 'First Contentful Paint',
    lcp: 'Largest Contentful Paint',
    cls: 'Cumulative Layout Shift',
    tti: 'Time to Interactive',
    speedIndex: 'Speed Index',
    tbt: 'Total Blocking Time',
};

function getScoreColor(score: number): string {
    if (score >= 90) return '#10B981';
    if (score >= 50) return '#F59E0B';
    return '#EF4444';
}

function ScoreGauge({ label, score, delay }: { label: string; score: number; delay: number }) {
    const color = getScoreColor(score);
    const circumference = 2 * Math.PI * 42;
    const offset = circumference * (1 - score / 100);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.4 }}
            className="flex flex-col items-center gap-2"
        >
            <div className="relative w-24 h-24">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                    <circle
                        cx="48" cy="48" r="42"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="5"
                    />
                    <motion.circle
                        cx="48" cy="48" r="42"
                        fill="none"
                        stroke={color}
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ delay: delay + 0.2, duration: 1, ease: 'easeOut' }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: delay + 0.5 }}
                        className="text-2xl font-bold"
                        style={{ color }}
                    >
                        {score}
                    </motion.span>
                </div>
            </div>
            <span className="text-[11px] text-white/50 uppercase tracking-wider text-center">
                {label}
            </span>
        </motion.div>
    );
}

function MetricRow({ name, metric, delay }: { name: string; metric: AuditMetric; delay: number }) {
    const rating = RATING_COLORS[metric.rating];

    return (
        <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.3 }}
            className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0"
        >
            <div className="flex items-center gap-3">
                <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: rating.bg }}
                />
                <span className="text-sm text-white/70">{METRIC_LABELS[name] || name}</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-sm font-mono font-semibold text-white">
                    {metric.display}
                </span>
                <span
                    className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                    style={{
                        color: rating.text,
                        backgroundColor: `${rating.bg}20`,
                    }}
                >
                    {rating.label}
                </span>
            </div>
        </motion.div>
    );
}

export function AuditReport({ data }: AuditReportProps) {
    const metricEntries = Object.entries(data.metrics) as [string, AuditMetric][];
    const passCount = metricEntries.filter(([, m]) => m.rating === 'good').length;
    const failCount = metricEntries.filter(([, m]) => m.rating === 'poor').length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-[#0a0f1a] border border-white/10 overflow-hidden"
        >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    <span className="text-sm font-semibold text-white tracking-wide">
                        AUDIT REPORT
                    </span>
                </div>
                <div className="text-xs text-white/30 font-mono">
                    {data.url}
                </div>
            </div>

            {/* Score Gauges */}
            <div className="px-5 py-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
                    <ScoreGauge label="Performance" score={data.scores.performance} delay={0} />
                    <ScoreGauge label="Accessibility" score={data.scores.accessibility} delay={0.15} />
                    <ScoreGauge label="Best Practices" score={data.scores.bestPractices} delay={0.3} />
                    <ScoreGauge label="SEO" score={data.scores.seo} delay={0.45} />
                </div>
            </div>

            {/* Core Web Vitals */}
            <div className="px-5 pb-4">
                <h3 className="text-xs text-white/40 uppercase tracking-wider mb-3 font-semibold">
                    Core Web Vitals & Metrics
                </h3>
                <div className="rounded-lg bg-white/[0.02] border border-white/5 px-4">
                    {metricEntries.map(([name, metric], i) => (
                        <MetricRow
                            key={name}
                            name={name}
                            metric={metric}
                            delay={0.6 + i * 0.08}
                        />
                    ))}
                </div>
            </div>

            {/* Summary Stats */}
            <div className="px-5 pb-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <SummaryBox label="Load Time" value={data.loadTime} delay={1.1} />
                    <SummaryBox label="Server Response" value={data.serverResponseTime} delay={1.15} />
                    <SummaryBox label="Total Size" value={data.totalSize} delay={1.2} />
                    <SummaryBox label="HTTP Requests" value={String(data.requestCount)} delay={1.25} />
                </div>
            </div>

            {/* Verdict bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="px-5 py-3 border-t border-white/5 flex items-center justify-between text-xs"
            >
                <span className="text-white/30">
                    Audited {new Date(data.fetchedAt).toLocaleString()}
                </span>
                <div className="flex gap-3">
                    <span className="text-[#10B981]">{passCount} passed</span>
                    {failCount > 0 && (
                        <span className="text-[#EF4444]">{failCount} failed</span>
                    )}
                    {metricEntries.length - passCount - failCount > 0 && (
                        <span className="text-[#F59E0B]">
                            {metricEntries.length - passCount - failCount} warnings
                        </span>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

function SummaryBox({ label, value, delay }: { label: string; value: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2.5 text-center"
        >
            <p className="text-[10px] text-white/35 uppercase tracking-wider">{label}</p>
            <p className="text-sm font-mono font-semibold text-white mt-0.5">{value}</p>
        </motion.div>
    );
}
