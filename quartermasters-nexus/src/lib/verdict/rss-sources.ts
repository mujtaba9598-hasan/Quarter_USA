/**
 * The Verdict — RSS Feed Sources
 *
 * Monitored feeds for content inspiration. Articles are generated
 * from extracted facts, NOT copied. Each source is categorized
 * for topic routing.
 */

export type RSSSource = {
    name: string;
    url: string;
    category: 'web-dev' | 'ai' | 'infrastructure' | 'general-tech';
};

export const RSS_SOURCES: RSSSource[] = [
    // Web Development
    { name: 'Vercel Blog', url: 'https://vercel.com/atom', category: 'web-dev' },
    { name: 'Next.js Blog', url: 'https://nextjs.org/feed.xml', category: 'web-dev' },
    { name: 'React Blog', url: 'https://react.dev/rss.xml', category: 'web-dev' },
    { name: 'Smashing Magazine', url: 'https://www.smashingmagazine.com/feed/', category: 'web-dev' },
    { name: 'CSS Tricks', url: 'https://css-tricks.com/feed/', category: 'web-dev' },

    // AI & Machine Learning
    { name: 'Anthropic Blog', url: 'https://www.anthropic.com/rss.xml', category: 'ai' },
    { name: 'OpenAI Blog', url: 'https://openai.com/blog/rss.xml', category: 'ai' },
    { name: 'Hugging Face Blog', url: 'https://huggingface.co/blog/feed.xml', category: 'ai' },

    // Infrastructure & Cloud
    { name: 'AWS Blog', url: 'https://aws.amazon.com/blogs/aws/feed/', category: 'infrastructure' },
    { name: 'Supabase Blog', url: 'https://supabase.com/blog/rss.xml', category: 'infrastructure' },

    // General Tech (Enterprise)
    { name: 'TechCrunch', url: 'https://techcrunch.com/feed/', category: 'general-tech' },
    { name: 'The Verge Tech', url: 'https://www.theverge.com/rss/index.xml', category: 'general-tech' },
];

/**
 * Map RSS categories to article categories for the site.
 */
export const CATEGORY_MAP: Record<RSSSource['category'], string> = {
    'web-dev': 'Web Development',
    'ai': 'AI & Machine Learning',
    'infrastructure': 'Infrastructure',
    'general-tech': 'Technology',
};
