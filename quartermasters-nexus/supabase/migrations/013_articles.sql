-- Sprint 13: The Verdict — Articles table for SEO content engine

CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Content
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,             -- Full article body (Markdown)
    verdict TEXT,                       -- "The Verdict" proprietary opinion section

    -- Categorization
    category TEXT NOT NULL DEFAULT 'technology',
    tags TEXT[] DEFAULT '{}',

    -- SEO
    seo_title TEXT,
    seo_description TEXT,
    og_image_url TEXT,

    -- Source tracking
    source_url TEXT,                    -- RSS source that inspired this article
    source_title TEXT,

    -- Publishing
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'published', 'archived')),
    published_at TIMESTAMPTZ,
    scheduled_for TIMESTAMPTZ,         -- Future publish date for velocity limiter

    -- Metrics
    reading_time_minutes INTEGER DEFAULT 5,
    word_count INTEGER DEFAULT 0,

    -- Originality
    originality_score NUMERIC(5,2),    -- 0-100 from Originality.ai
    originality_checked_at TIMESTAMPTZ,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for listing and SEO
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at DESC) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_scheduled ON articles(scheduled_for) WHERE status = 'review';
