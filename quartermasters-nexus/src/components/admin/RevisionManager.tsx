'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ChangeRequest = {
    id: string;
    project_id: string;
    client_email: string;
    client_name: string | null;
    title: string;
    description: string;
    priority: 'low' | 'normal' | 'urgent';
    status: 'submitted' | 'in_progress' | 'completed' | 'rejected';
    assigned_to: string | null;
    resolution_notes: string | null;
    expires_at: string | null;
    created_at: string;
    updated_at: string;
    completed_at: string | null;
};

type FilterStatus = 'all' | 'submitted' | 'in_progress' | 'completed' | 'rejected';

const STATUS_COLORS: Record<string, string> = {
    submitted: '#FBBF24',
    in_progress: '#3B82F6',
    completed: '#10B981',
    rejected: '#EF4444',
};

const STATUS_LABELS: Record<string, string> = {
    submitted: 'Submitted',
    in_progress: 'In Progress',
    completed: 'Completed',
    rejected: 'Rejected',
};

const PRIORITY_COLORS: Record<string, string> = {
    low: '#6B7280',
    normal: '#3B82F6',
    urgent: '#EF4444',
};

/**
 * RevisionManager — Admin dashboard tab for managing client change requests.
 * Shows all requests with status, priority, client info, and action buttons.
 */
export function RevisionManager() {
    const [revisions, setRevisions] = useState<ChangeRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<FilterStatus>('all');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const fetchRevisions = async () => {
        setLoading(true);
        try {
            const params = filter !== 'all' ? `?status=${filter}` : '';
            const res = await fetch(`/api/admin/revisions${params}`);
            const data = await res.json();
            setRevisions(data.revisions || []);
        } catch {
            setRevisions([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchRevisions();
    }, [filter]);

    const updateStatus = async (id: string, status: string, resolutionNotes?: string) => {
        try {
            await fetch('/api/admin/revisions', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status, resolutionNotes }),
            });
            fetchRevisions();
        } catch (err) {
            console.error('Failed to update revision:', err);
        }
    };

    const counts = {
        all: revisions.length,
        submitted: revisions.filter(r => r.status === 'submitted').length,
        in_progress: revisions.filter(r => r.status === 'in_progress').length,
        completed: revisions.filter(r => r.status === 'completed').length,
        rejected: revisions.filter(r => r.status === 'rejected').length,
    };

    return (
        <div className="space-y-6">
            {/* Filter tabs */}
            <div className="flex items-center gap-2 flex-wrap">
                {(['all', 'submitted', 'in_progress', 'completed', 'rejected'] as FilterStatus[]).map(s => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            filter === s
                                ? 'bg-[#C15A2C] text-white'
                                : 'bg-white/5 text-white/50 hover:text-white/80'
                        }`}
                    >
                        {s === 'all' ? 'All' : STATUS_LABELS[s]} ({counts[s] || 0})
                    </button>
                ))}
            </div>

            {/* Revision list */}
            {loading ? (
                <div className="text-center py-12 text-white/30 text-sm">Loading revisions...</div>
            ) : revisions.length === 0 ? (
                <div className="text-center py-12 text-white/30 text-sm">
                    No change requests {filter !== 'all' ? `with status "${filter}"` : 'yet'}.
                </div>
            ) : (
                <div className="space-y-3">
                    {revisions.map(rev => (
                        <motion.div
                            key={rev.id}
                            layout
                            className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden"
                        >
                            {/* Header row */}
                            <button
                                onClick={() => setExpandedId(expandedId === rev.id ? null : rev.id)}
                                className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/[0.02] transition-colors"
                            >
                                {/* Status dot */}
                                <div
                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                    style={{ backgroundColor: STATUS_COLORS[rev.status] }}
                                />

                                {/* Title + client */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">{rev.title}</p>
                                    <p className="text-xs text-white/40 truncate">
                                        {rev.client_name || rev.client_email}
                                    </p>
                                </div>

                                {/* Priority badge */}
                                <span
                                    className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider"
                                    style={{ color: PRIORITY_COLORS[rev.priority], backgroundColor: `${PRIORITY_COLORS[rev.priority]}15` }}
                                >
                                    {rev.priority}
                                </span>

                                {/* Date */}
                                <span className="text-xs text-white/25 shrink-0 hidden sm:block">
                                    {new Date(rev.created_at).toLocaleDateString()}
                                </span>

                                {/* Chevron */}
                                <svg
                                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    className={`shrink-0 transition-transform ${expandedId === rev.id ? 'rotate-180' : ''}`}
                                >
                                    <path d="M4 6L8 10L12 6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>

                            {/* Expanded detail */}
                            <AnimatePresence>
                                {expandedId === rev.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                                            <p className="text-xs text-white/50 leading-relaxed">{rev.description}</p>

                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <div>
                                                    <span className="text-white/30">Email:</span>{' '}
                                                    <span className="text-white/60">{rev.client_email}</span>
                                                </div>
                                                <div>
                                                    <span className="text-white/30">Status:</span>{' '}
                                                    <span style={{ color: STATUS_COLORS[rev.status] }}>{STATUS_LABELS[rev.status]}</span>
                                                </div>
                                                {rev.expires_at && (
                                                    <div>
                                                        <span className="text-white/30">Window expires:</span>{' '}
                                                        <span className="text-white/60">{new Date(rev.expires_at).toLocaleDateString()}</span>
                                                    </div>
                                                )}
                                                {rev.resolution_notes && (
                                                    <div className="col-span-2">
                                                        <span className="text-white/30">Notes:</span>{' '}
                                                        <span className="text-white/60">{rev.resolution_notes}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action buttons */}
                                            <div className="flex items-center gap-2 pt-2">
                                                {rev.status === 'submitted' && (
                                                    <>
                                                        <button
                                                            onClick={() => updateStatus(rev.id, 'in_progress')}
                                                            className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-medium hover:bg-blue-500/30 transition-colors"
                                                        >
                                                            Start Work
                                                        </button>
                                                        <button
                                                            onClick={() => updateStatus(rev.id, 'rejected', 'Out of scope for revision window.')}
                                                            className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                {rev.status === 'in_progress' && (
                                                    <button
                                                        onClick={() => updateStatus(rev.id, 'completed', 'Changes deployed.')}
                                                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-medium hover:bg-emerald-500/30 transition-colors"
                                                    >
                                                        Mark Complete
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
