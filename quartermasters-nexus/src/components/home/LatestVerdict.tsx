'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { staggerContainer, staggerItem } from '@/lib/animations';

type Article = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    published_at: string;
    reading_time_minutes: number;
};

/**
 * LatestVerdict — Shows the 3 most recent articles from The Verdict on the homepage.
 * Gracefully renders nothing if no articles are published yet.
 */
export function LatestVerdict() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetch('/api/verdict/articles?limit=3')
            .then(res => res.json())
            .then(data => setArticles(data.articles || []))
            .catch(() => {});
    }, []);

    // Don't render the section if no articles exist
    if (articles.length === 0) return null;

    return (
        <section className="py-24">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {/* Header */}
                    <motion.div variants={staggerItem} className="flex items-center justify-between mb-12">
                        <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#C15A2C] font-semibold">
                                The Verdict
                            </span>
                            <h2 className="text-3xl font-bold text-white mt-2">Latest Insights</h2>
                        </div>
                        <Link
                            href="/verdict"
                            className="text-sm text-white/40 hover:text-white/70 transition-colors"
                        >
                            View all →
                        </Link>
                    </motion.div>

                    {/* Article cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <motion.article key={article.id} variants={staggerItem}>
                                <Link
                                    href={`/verdict/${article.slug}`}
                                    className="block group rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-[#C15A2C]/20 hover:bg-white/[0.04] transition-all h-full"
                                >
                                    <span className="text-[10px] uppercase tracking-wider text-[#C15A2C] font-semibold">
                                        {article.category}
                                    </span>
                                    <h3 className="text-lg font-semibold text-white mt-3 mb-2 leading-snug group-hover:text-[#C15A2C] transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-white/40 leading-relaxed line-clamp-2 mb-4">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-white/25">
                                        <time>
                                            {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </time>
                                        <span className="w-1 h-1 rounded-full bg-white/15" />
                                        <span>{article.reading_time_minutes} min</span>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
