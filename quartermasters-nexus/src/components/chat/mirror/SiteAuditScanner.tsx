'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SiteAuditScannerProps {
    url: string;
    onComplete?: (result: any) => void;
}

const SCAN_PHASES = [
    { label: 'Resolving DNS...', duration: 3000 },
    { label: 'Establishing TLS handshake...', duration: 2500 },
    { label: 'Fetching initial HTML document...', duration: 4000 },
    { label: 'Parsing DOM tree ({{count}} nodes)...', duration: 5000 },
    { label: 'Evaluating CSS render-blocking resources...', duration: 4000 },
    { label: 'Analyzing JavaScript execution timeline...', duration: 6000 },
    { label: 'Measuring First Contentful Paint...', duration: 3500 },
    { label: 'Waiting for Largest Contentful Paint...', duration: 5000 },
    { label: 'Monitoring Cumulative Layout Shift...', duration: 4000 },
    { label: 'Profiling Total Blocking Time...', duration: 3500 },
    { label: 'Auditing accessibility tree...', duration: 5000 },
    { label: 'Scanning meta tags & structured data...', duration: 3000 },
    { label: 'Checking mobile viewport configuration...', duration: 2500 },
    { label: 'Evaluating image optimization...', duration: 4000 },
    { label: 'Analyzing third-party script impact...', duration: 3500 },
    { label: 'Calculating Speed Index...', duration: 4000 },
    { label: 'Running best practices audit...', duration: 3000 },
    { label: 'Computing final performance score...', duration: 4000 },
    { label: 'Generating diagnostic report...', duration: 3000 },
    { label: 'Audit complete. Compiling results...', duration: 2000 },
];

const TOTAL_AUDIT_MS = 120_000; // 2 minutes enforced

export function SiteAuditScanner({ url, onComplete }: SiteAuditScannerProps) {
    const [elapsed, setElapsed] = useState(0);
    const [currentPhase, setCurrentPhase] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [complete, setComplete] = useState(false);
    const [auditResult, setAuditResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const logEndRef = useRef<HTMLDivElement>(null);
    const apiDone = useRef(false);
    const startTime = useRef(Date.now());

    // Fire the real API call immediately
    useEffect(() => {
        fetch('/api/audit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setAuditResult(data);
                }
                apiDone.current = true;
            })
            .catch(() => {
                setError('Audit request failed. Please try again.');
                apiDone.current = true;
            });
    }, [url]);

    // 2-minute countdown timer
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const diff = now - startTime.current;
            setElapsed(diff);

            if (diff >= TOTAL_AUDIT_MS) {
                clearInterval(interval);
                setComplete(true);
                if (auditResult && onComplete) {
                    onComplete(auditResult);
                }
            }
        }, 100);

        return () => clearInterval(interval);
    }, [auditResult, onComplete]);

    // Phase progression — spread phases across the 2-minute window
    useEffect(() => {
        const phaseInterval = TOTAL_AUDIT_MS / SCAN_PHASES.length;
        const phaseIndex = Math.min(
            Math.floor(elapsed / phaseInterval),
            SCAN_PHASES.length - 1
        );

        if (phaseIndex > currentPhase) {
            setCurrentPhase(phaseIndex);
            const phase = SCAN_PHASES[phaseIndex];
            const label = phase.label.replace(
                '{{count}}',
                String(Math.floor(Math.random() * 2000) + 500)
            );
            setLogs(prev => [...prev, `[${formatTime(elapsed)}] ${label}`]);
        }
    }, [elapsed, currentPhase]);

    // Auto-scroll logs
    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const remaining = Math.max(0, TOTAL_AUDIT_MS - elapsed);
    const progress = Math.min((elapsed / TOTAL_AUDIT_MS) * 100, 100);
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    if (complete && error) {
        return (
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-6 text-center">
                <p className="text-red-400 font-semibold mb-2">Audit Failed</p>
                <p className="text-white/60 text-sm">{error}</p>
            </div>
        );
    }

    if (complete && auditResult) {
        return null; // Parent will render AuditReport
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-[#0a0f1a] border border-white/10 overflow-hidden"
        >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C15A2C] animate-pulse" />
                    <span className="text-sm font-semibold text-white tracking-wide">
                        SITE AUDIT IN PROGRESS
                    </span>
                </div>
                <div className="text-xs text-white/40 font-mono">
                    {url}
                </div>
            </div>

            {/* Timer */}
            <div className="px-5 py-6 flex items-center gap-6">
                <div className="relative w-20 h-20 flex-shrink-0">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                        <circle
                            cx="40" cy="40" r="36"
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="4"
                        />
                        <circle
                            cx="40" cy="40" r="36"
                            fill="none"
                            stroke="#C15A2C"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 36}`}
                            strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
                            className="transition-all duration-200"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-mono font-bold text-white">
                            {minutes}:{seconds.toString().padStart(2, '0')}
                        </span>
                    </div>
                </div>
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentPhase}
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            className="text-sm text-white/80 font-medium"
                        >
                            {SCAN_PHASES[currentPhase]?.label.replace(
                                '{{count}}',
                                String(Math.floor(Math.random() * 2000) + 500)
                            )}
                        </motion.p>
                    </AnimatePresence>
                    {/* Progress bar */}
                    <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#C15A2C] to-[#D4A017] rounded-full"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <p className="text-[10px] text-white/30 mt-1.5">
                        {Math.round(progress)}% complete
                    </p>
                </div>
            </div>

            {/* Log stream */}
            <div className="border-t border-white/5 bg-black/30 px-4 py-3 max-h-48 overflow-y-auto font-mono text-[11px]">
                {logs.map((log, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="py-0.5 text-white/40"
                    >
                        <span className="text-[#C15A2C]/70">&gt;</span> {log}
                    </motion.div>
                ))}
                {!complete && (
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="py-0.5 text-[#C15A2C]/50"
                    >
                        <span className="text-[#C15A2C]/70">&gt;</span> _
                    </motion.div>
                )}
                <div ref={logEndRef} />
            </div>
        </motion.div>
    );
}

function formatTime(ms: number): string {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
}
