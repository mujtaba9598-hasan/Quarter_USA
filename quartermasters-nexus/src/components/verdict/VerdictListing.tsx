'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Article = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    tags: string[];
    published_at: string;
    reading_time_minutes: number;
    og_image_url: string | null;
};

const CATEGORIES = ['All', 'Web Development', 'AI & Machine Learning', 'Infrastructure', 'Technology'];

/**
 * VerdictListing — Article listing with category filters and pagination.
 */
export function VerdictListing() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        fetchArticles();
    }, [activeCategory]);

    const fetchArticles = async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (activeCategory !== 'All') params.set('category', activeCategory.toLowerCase());
        params.set('limit', '12');

        try {
            const res = await fetch(`/api/verdict/articles?${params}`);
            const data = await res.json();
            setArticles(data.articles || []);
        } catch {
            setArticles([]);
        }
        setLoading(false);
    };

    return (
        <div>
            {/* Category filters */}
            <div className="flex items-center gap-2 flex-wrap mb-10">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeCategory === cat
                                ? 'bg-[#C15A2C] text-white'
                                : 'bg-white/5 text-white/50 hover:text-white/80'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Articles grid */}
            {loading ? (
                <div className="text-center py-20 text-white/30">Loading articles...</div>
            ) : articles.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-white/30 text-lg mb-2">No articles published yet.</p>
                    <p className="text-white/20 text-sm">The Verdict is coming soon. Check back shortly.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, i) => (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link
                                href={`/verdict/${article.slug}`}
                                className="block group rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-[#C15A2C]/20 hover:bg-white/[0.04] transition-all"
                            >
                                {/* Category + reading time */}
                                <div className="p-5 pb-0 flex items-center justify-between">
                                    <span className="text-[10px] uppercase tracking-wider text-[#C15A2C] font-semibold">
                                        {article.category}
                                    </span>
                                    <span className="text-[10px] text-white/30">
                                        {article.reading_time_minutes} min read
                                    </span>
                                </div>

                                {/* Title + excerpt */}
                                <div className="p-5">
                                    <h2 className="text-lg font-semibold text-white mb-2 leading-snug group-hover:text-[#C15A2C] transition-colors">
                                        {article.title}
                                    </h2>
                                    <p className="text-sm text-white/40 leading-relaxed line-clamp-3">
                                        {article.excerpt}
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="px-5 pb-5 flex items-center justify-between">
                                    <time className="text-xs text-white/25">
                                        {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </time>
                                    <span className="text-xs text-[#C15A2C] opacity-0 group-hover:opacity-100 transition-opacity">
                                        Read article →
                                    </span>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            )}
        </div>
    );
}
