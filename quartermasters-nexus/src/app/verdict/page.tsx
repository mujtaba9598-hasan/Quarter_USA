import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { VerdictListing } from '@/components/verdict/VerdictListing';

export const metadata: Metadata = {
    title: 'The Verdict — Quartermasters Tech Insights',
    description: 'Authoritative architectural opinions on web development, AI, and enterprise infrastructure. Written by senior engineers who ship production systems.',
    openGraph: {
        title: 'The Verdict — Quartermasters Tech Insights',
        description: 'Authoritative architectural opinions on web development, AI, and enterprise infrastructure.',
        type: 'website',
    },
};

export default function VerdictPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-slate-950 pt-24 pb-16">
                <div className="mx-auto max-w-5xl px-6">
                    {/* Hero */}
                    <div className="mb-16 text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#C15A2C]/30 bg-[#C15A2C]/10 px-4 py-1.5 text-sm font-medium text-[#C15A2C] mb-6">
                            <span className="h-2 w-2 rounded-full bg-[#C15A2C] animate-pulse" />
                            The Verdict
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                            Architectural Opinions.<br />Not Hot Takes.
                        </h1>
                        <p className="text-lg text-white/50 max-w-2xl mx-auto">
                            Deep technical analysis on web development, AI integration, and enterprise infrastructure.
                            Written by engineers who ship production systems.
                        </p>
                    </div>

                    {/* Article listing — client component for filtering */}
                    <VerdictListing />
                </div>
            </main>
            <Footer />
        </>
    );
}
