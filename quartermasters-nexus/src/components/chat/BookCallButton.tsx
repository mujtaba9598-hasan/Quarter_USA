'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface BookCallButtonProps {
    service?: string;
}

const EVENT_TYPE_MAP: Record<string, string> = {
    express: 'express',
    rebuild: 'discovery',
    expansion: 'strategy',
    webapp: 'executive',
    'ai-training': 'executive',
};

/**
 * Inline Cal.com booking button rendered in chat when Q reaches close stage
 * or Iron Grip floor rejection.
 */
export function BookCallButton({ service }: BookCallButtonProps) {
    const eventType = service ? EVENT_TYPE_MAP[service] || 'discovery' : 'discovery';
    const calUrl = `https://cal.com/quartermasters/${eventType}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="my-4 rounded-xl border border-[#C15A2C]/30 bg-[#C15A2C]/5 p-4"
        >
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#C15A2C]/20 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-[#C15A2C]" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">Book a Call with Our Lead Architect</p>
                    <p className="text-xs text-white/50 mt-1">
                        Select a time that works for you. We operate on Pacific / Eastern time.
                    </p>
                    <a
                        href={calUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-[#C15A2C] text-white text-sm font-medium hover:bg-[#a8492a] transition-colors"
                    >
                        <Calendar className="w-4 h-4" />
                        Select a Time
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
