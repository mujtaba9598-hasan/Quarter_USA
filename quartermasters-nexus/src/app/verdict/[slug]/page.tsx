import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { VerdictArticle } from '@/components/verdict/VerdictArticle';
import { getArticleBySlug } from '@/lib/verdict/content-pipeline';

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) return { title: 'Article Not Found' };

    return {
        title: `${article.seo_title || article.title} — The Verdict`,
        description: article.seo_description || article.excerpt,
        openGraph: {
            title: article.seo_title || article.title,
            description: article.seo_description || article.excerpt,
            type: 'article',
            publishedTime: article.published_at,
            images: article.og_image_url ? [article.og_image_url] : undefined,
        },
    };
}

export default async function VerdictArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) notFound();

    // JSON-LD Article schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        datePublished: article.published_at,
        dateModified: article.updated_at,
        author: {
            '@type': 'Organization',
            name: 'Quartermasters',
            url: 'https://quartermasters.me',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Quartermasters',
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://quartermasters.me/verdict/${slug}`,
        },
        wordCount: article.word_count,
        articleSection: article.category,
        keywords: article.tags?.join(', '),
    };

    return (
        <>
            <Header />
            <main className="min-h-screen bg-slate-950 pt-24 pb-16">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <VerdictArticle article={article} />
            </main>
            <Footer />
        </>
    );
}
