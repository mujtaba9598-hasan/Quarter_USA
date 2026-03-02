'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface RevisionFormProps {
    projectId: string;
    clientEmail: string;
    clientName?: string;
}

/**
 * RevisionForm — Client-facing form to submit change requests.
 * Validates against 30-day revision window server-side.
 */
export function RevisionForm({ projectId, clientEmail, clientName }: RevisionFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'low' | 'normal' | 'urgent'>('normal');
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<'success' | 'expired' | 'error' | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        setSubmitting(true);
        setResult(null);

        try {
            const res = await fetch('/api/revisions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectId,
                    clientEmail,
                    clientName,
                    title: title.trim(),
                    description: description.trim(),
                    priority,
                }),
            });

            if (res.status === 410) {
                setResult('expired');
            } else if (res.ok) {
                setResult('success');
                setTitle('');
                setDescription('');
                setPriority('normal');
            } else {
                setResult('error');
            }
        } catch {
            setResult('error');
        }

        setSubmitting(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
        >
            <h3 className="text-lg font-semibold text-white mb-1">Submit a Change Request</h3>
            <p className="text-xs text-white/40 mb-6">
                Free revisions are available within 30 days of project delivery.
            </p>

            {result === 'success' && (
                <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                    Your change request has been submitted. We'll begin processing it shortly.
                </div>
            )}

            {result === 'expired' && (
                <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
                    The 30-day revision window for this project has expired. Please contact us directly for additional changes.
                </div>
            )}

            {result === 'error' && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    Something went wrong. Please try again or email complaints@quartermasters.me.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs text-white/50 mb-1.5 font-medium">Change Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Update hero section headline"
                        required
                        className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C15A2C]/50 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-xs text-white/50 mb-1.5 font-medium">Describe the Change</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Please describe exactly what you'd like changed, including any specific text, colors, or layout adjustments..."
                        required
                        rows={4}
                        className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C15A2C]/50 transition-colors resize-none"
                    />
                </div>

                <div>
                    <label className="block text-xs text-white/50 mb-1.5 font-medium">Priority</label>
                    <div className="flex items-center gap-2">
                        {(['low', 'normal', 'urgent'] as const).map(p => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setPriority(p)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                    priority === p
                                        ? p === 'urgent' ? 'bg-red-500/20 text-red-400' : p === 'normal' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-white/60'
                                        : 'bg-white/5 text-white/30 hover:text-white/50'
                                }`}
                            >
                                {p.charAt(0).toUpperCase() + p.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={submitting || !title.trim() || !description.trim()}
                    className="w-full py-3 rounded-lg bg-[#C15A2C] text-white text-sm font-semibold hover:bg-[#a8492a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {submitting ? 'Submitting...' : 'Submit Change Request'}
                </button>
            </form>
        </motion.div>
    );
}
