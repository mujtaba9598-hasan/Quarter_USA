'use client';

import { motion } from 'framer-motion';
import { CreditCard, Zap } from 'lucide-react';

interface ExpressCheckoutButtonProps {
    service?: string;
    tier?: string;
}

const SERVICE_LABELS: Record<string, string> = {
    express: 'Express Build',
    rebuild: 'Website Redesign',
    expansion: 'Feature Injection',
    webapp: 'Web Application',
    'ai-training': 'AI Model Training',
};

/**
 * ExpressCheckoutButton — Inline checkout CTA rendered in chat
 * when Q detects a ready-to-buy signal or estimate acceptance.
 *
 * Redirects to /checkout which handles Stripe session creation.
 * Gracefully falls back to Cal.com booking if Stripe is not configured.
 */
export function ExpressCheckoutButton({ service = 'express', tier = 'standard' }: ExpressCheckoutButtonProps) {
    const label = SERVICE_LABELS[service] || 'Service Package';
    const checkoutUrl = `/checkout?service=${encodeURIComponent(service)}&tier=${encodeURIComponent(tier)}`;
    const calFallback = `https://cal.com/quartermasters/discovery`;

    const handleClick = () => {
        // Try checkout page first — it will handle Stripe availability
        window.open(checkoutUrl, '_blank');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="my-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4"
        >
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white">Secure Checkout</p>
                        <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <p className="text-xs text-white/50 mt-1">
                        {label} — {tier.charAt(0).toUpperCase() + tier.slice(1)} tier. Stripe-secured payment.
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                        <button
                            onClick={handleClick}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
                        >
                            <CreditCard className="w-4 h-4" />
                            Proceed to Checkout
                        </button>
                        <a
                            href={calFallback}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-white/40 hover:text-white/60 transition-colors underline"
                        >
                            or book a call first
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
