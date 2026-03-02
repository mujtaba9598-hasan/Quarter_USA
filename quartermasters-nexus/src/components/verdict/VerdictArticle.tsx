'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

type Article = {
    title: string;
    slug: string;
    content: string;
    verdict: string;
    excerpt: string;
    category: string;
    tags: string[];
    published_at: string;
    reading_time_minutes: number;
    word_count: number;
};

/**
 * VerdictArticle — Individual article page with reading time, share buttons, clean layout.
 */
export function VerdictArticle({ article }: { article: Article }) {
    const publishDate = new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const shareUrl = typeof window !== 'undefined'
        ? window.location.href
        : `https://quartermasters.me/verdict/${article.slug}`;

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl px-6"
        >
            {/* Breadcrumb */}
            <nav className="mb-8">
                <Link href="/verdict" className="text-sm text-white/40 hover:text-white/60 transition-colors">
                    ← Back to The Verdict
                </Link>
            </nav>

            {/* Header */}
            <header className="mb-12">
                <span className="inline-block text-[10px] uppercase tracking-wider text-[#C15A2C] font-semibold mb-4">
                    {article.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-6">
                    {article.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-white/40">
                    <time>{publishDate}</time>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{article.reading_time_minutes} min read</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{article.word_count.toLocaleString()} words</span>
                </div>
            </header>

            {/* Article body */}
            <div
                className="prose prose-invert prose-lg max-w-none
                    prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                    prose-p:text-white/70 prose-p:leading-relaxed
                    prose-a:text-[#C15A2C] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-white
                    prose-code:text-[#C15A2C] prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-[#0a0f1a] prose-pre:border prose-pre:border-white/5
                    prose-blockquote:border-[#C15A2C] prose-blockquote:text-white/50
                    prose-li:text-white/70
                    mb-16"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mb-12 pt-8 border-t border-white/5">
                    {article.tags.map(tag => (
                        <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/40 font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Share buttons */}
            <div className="flex items-center gap-4 mb-16 pt-8 border-t border-white/5">
                <span className="text-xs text-white/30 uppercase tracking-wider font-semibold">Share</span>
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-white/5 text-xs text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                    X / Twitter
                </a>
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-white/5 text-xs text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                    LinkedIn
                </a>
                <button
                    onClick={() => navigator.clipboard?.writeText(shareUrl)}
                    className="px-4 py-2 rounded-lg bg-white/5 text-xs text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                    Copy Link
                </button>
            </div>

            {/* CTA */}
            <div className="rounded-2xl border border-[#C15A2C]/20 bg-[#C15A2C]/5 p-8 text-center mb-16">
                <h3 className="text-xl font-bold text-white mb-2">Need This Built?</h3>
                <p className="text-sm text-white/50 mb-6">
                    Quartermasters builds the infrastructure discussed in these articles. Talk to our team.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[#C15A2C] px-6 py-3 text-sm font-semibold text-white hover:bg-[#a8492a] transition-colors"
                >
                    Book a Consultation →
                </Link>
            </div>
        </motion.article>
    );
}

/**
 * Simple Markdown to HTML conversion for article rendering.
 * Handles: headings, paragraphs, bold, italic, code blocks, inline code, links, lists.
 */
function markdownToHtml(md: string): string {
    let html = md
        // Code blocks (``` ... ```)
        .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
        // Headings
        .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        // Bold
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        // Unordered lists
        .replace(/^\- (.+)$/gm, '<li>$1</li>')
        // Ordered lists
        .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
        // Blockquotes
        .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
        // Paragraphs (double newline)
        .replace(/\n\n/g, '</p><p>')
        // Single newlines within paragraphs
        .replace(/\n/g, '<br/>');

    // Wrap in paragraph tags
    html = `<p>${html}</p>`;

    // Wrap consecutive <li> elements in <ul>
    html = html.replace(/(<li>[\s\S]*?<\/li>)+/g, '<ul>$&</ul>');

    // Clean up empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, '');
    html = html.replace(/<p>\s*(<h[234]>)/g, '$1');
    html = html.replace(/(<\/h[234]>)\s*<\/p>/g, '$1');
    html = html.replace(/<p>\s*(<pre>)/g, '$1');
    html = html.replace(/(<\/pre>)\s*<\/p>/g, '$1');
    html = html.replace(/<p>\s*(<ul>)/g, '$1');
    html = html.replace(/(<\/ul>)\s*<\/p>/g, '$1');
    html = html.replace(/<p>\s*(<blockquote>)/g, '$1');
    html = html.replace(/(<\/blockquote>)\s*<\/p>/g, '$1');

    return html;
}
