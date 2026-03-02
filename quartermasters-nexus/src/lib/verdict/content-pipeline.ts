/**
 * The Verdict — Content Pipeline
 *
 * Flow: RSS ingestion → fact extraction (Claude) → original article generation (Claude)
 * → post-processing (no-dash, verdict section) → originality check → publish/schedule.
 *
 * Velocity limit: max 3 articles per week.
 */

import { supabase } from '@/lib/supabase'
import { CATEGORY_MAP, type RSSSource } from './rss-sources'

export type ArticleDraft = {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    verdict: string;
    category: string;
    tags: string[];
    sourceUrl: string;
    sourceTitle: string;
    readingTimeMinutes: number;
    wordCount: number;
};

/**
 * Article generation system prompt — establishes Q's editorial voice.
 * Zero dashes in prose or titles. "The Verdict" section always appended.
 */
export const ARTICLE_SYSTEM_PROMPT = `You are Q, Senior Architect at Quartermasters, writing for "The Verdict" — our authoritative tech publication.

Voice: Sharp, opinionated, technically precise. You write like a seasoned CTO who has shipped production systems for 15 years. No fluff. No hedge words. Every sentence earns its place.

Rules:
1. NEVER use dashes (—, –, -) in prose or titles. Use commas, periods, semicolons, or restructure the sentence.
2. NEVER plagiarize. You receive facts from a source article. You write an ENTIRELY ORIGINAL piece inspired by those facts.
3. NEVER mention "AI generated" or "this article was written by AI." You are Q, a human architect.
4. ALWAYS end with "The Verdict" section: your proprietary architectural opinion on the topic. This is what makes the article valuable.
5. Write in Markdown format. Use ## for section headers, not #.
6. Target 800 to 1200 words. Quality over quantity.
7. Include concrete technical details: framework versions, performance numbers, architecture patterns.
8. Write for CTOs, technical leads, and senior engineers. Not beginners.

Tone: Authoritative, direct, occasionally dry wit. Never use the word "leverage" or "utilize." Say "use."

Company context: Quartermasters is a California-based web development and AI solutions firm. You may naturally reference the company's expertise where relevant, but do NOT make the article a sales pitch.`;

/**
 * Extract facts from a source article's content.
 * Returns structured facts for original article generation.
 */
export const FACT_EXTRACTION_PROMPT = `Extract the key technical facts from this article. Return a JSON object:
{
  "facts": ["fact1", "fact2", ...],
  "topic": "one-line topic summary",
  "technologies": ["tech1", "tech2"],
  "significance": "why this matters for enterprise web/AI teams"
}
Only extract verifiable facts. Do NOT include opinions from the source.`;

/**
 * Post-process generated article to enforce style rules.
 */
export function postProcessArticle(content: string): string {
    // Remove all dashes from prose (preserve code blocks)
    let processed = content;

    // Split by code blocks to preserve them
    const parts = processed.split(/(```[\s\S]*?```)/g);
    processed = parts.map((part, i) => {
        // Odd indices are code blocks — leave them alone
        if (i % 2 === 1) return part;
        // Replace em-dashes and en-dashes with commas or periods
        return part
            .replace(/\s*—\s*/g, ', ')
            .replace(/\s*–\s*/g, ', ')
            // Only replace hyphens that are used as dashes (surrounded by spaces)
            .replace(/\s+-\s+/g, ', ');
    }).join('');

    return processed;
}

/**
 * Generate a URL-safe slug from a title.
 */
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 80);
}

/**
 * Calculate reading time from word count.
 */
export function calculateReadingTime(content: string): { wordCount: number; minutes: number } {
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 250));
    return { wordCount, minutes };
}

/**
 * Check velocity limit: max 3 articles published per rolling 7-day window.
 * Returns true if under the limit.
 */
export async function checkVelocityLimit(): Promise<boolean> {
    if (!supabase) return false;

    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { count } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'published')
        .gte('published_at', weekAgo);

    return (count || 0) < 3;
}

/**
 * Save a draft article to Supabase.
 */
export async function saveDraft(draft: ArticleDraft): Promise<string | null> {
    if (!supabase) return null;

    const { data, error } = await supabase
        .from('articles')
        .insert({
            title: draft.title,
            slug: draft.slug,
            excerpt: draft.excerpt,
            content: draft.content,
            verdict: draft.verdict,
            category: draft.category,
            tags: draft.tags,
            source_url: draft.sourceUrl,
            source_title: draft.sourceTitle,
            reading_time_minutes: draft.readingTimeMinutes,
            word_count: draft.wordCount,
            status: 'draft',
        })
        .select('id')
        .single();

    if (error) {
        console.error('Failed to save article draft:', error);
        return null;
    }

    return data?.id || null;
}

/**
 * Publish an article (set status + published_at).
 */
export async function publishArticle(articleId: string): Promise<boolean> {
    if (!supabase) return false;

    const { error } = await supabase
        .from('articles')
        .update({
            status: 'published',
            published_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        })
        .eq('id', articleId);

    return !error;
}

/**
 * Get published articles for the listing page.
 */
export async function getPublishedArticles(options?: {
    category?: string;
    limit?: number;
    offset?: number;
}): Promise<any[]> {
    if (!supabase) return [];

    let query = supabase
        .from('articles')
        .select('id, title, slug, excerpt, category, tags, published_at, reading_time_minutes, og_image_url')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

    if (options?.category) query = query.eq('category', options.category);
    if (options?.limit) query = query.limit(options.limit);
    if (options?.offset) query = query.range(options.offset, options.offset + (options?.limit || 10) - 1);

    const { data } = await query;
    return data || [];
}

/**
 * Get a single article by slug.
 */
export async function getArticleBySlug(slug: string): Promise<any | null> {
    if (!supabase) return null;

    const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

    return data;
}
