import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import {
    ARTICLE_SYSTEM_PROMPT,
    FACT_EXTRACTION_PROMPT,
    postProcessArticle,
    generateSlug,
    calculateReadingTime,
    checkVelocityLimit,
    saveDraft,
} from '@/lib/verdict/content-pipeline'
import { CATEGORY_MAP, type RSSSource } from '@/lib/verdict/rss-sources'

/**
 * POST /api/verdict/generate — Generate an article from source facts.
 *
 * Body: { sourceUrl, sourceTitle, sourceContent, category }
 * Flow: Extract facts → Generate article → Post-process → Save draft
 */
export async function POST(req: Request) {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
        return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 503 })
    }

    try {
        const body = await req.json()
        const { sourceUrl, sourceTitle, sourceContent, category } = body

        if (!sourceContent || !sourceTitle) {
            return NextResponse.json({ error: 'Missing sourceContent or sourceTitle' }, { status: 400 })
        }

        // Check velocity limit
        const withinLimit = await checkVelocityLimit()
        if (!withinLimit) {
            return NextResponse.json(
                { error: 'Velocity limit reached (3 articles/week). Try again later.' },
                { status: 429 }
            )
        }

        const anthropic = new Anthropic({ apiKey })

        // Step 1: Extract facts from source
        const factResponse = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 1024,
            system: 'You are a fact extraction system. Return only valid JSON.',
            messages: [{
                role: 'user',
                content: `${FACT_EXTRACTION_PROMPT}\n\n---\nSource: ${sourceTitle}\n\n${sourceContent.slice(0, 4000)}`
            }]
        })

        const factText = factResponse.content[0]?.type === 'text' ? factResponse.content[0].text : ''
        let facts: { facts: string[]; topic: string; technologies: string[]; significance: string }

        try {
            // Extract JSON from response (may have markdown wrapping)
            const jsonMatch = factText.match(/\{[\s\S]*\}/)
            facts = jsonMatch ? JSON.parse(jsonMatch[0]) : { facts: [], topic: sourceTitle, technologies: [], significance: '' }
        } catch {
            facts = { facts: [sourceTitle], topic: sourceTitle, technologies: [], significance: '' }
        }

        // Step 2: Generate original article
        const articleResponse = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 4096,
            system: ARTICLE_SYSTEM_PROMPT,
            messages: [{
                role: 'user',
                content: `Write an original article for "The Verdict" based on these extracted facts:

Topic: ${facts.topic}
Key facts:
${facts.facts.map((f, i) => `${i + 1}. ${f}`).join('\n')}

Technologies mentioned: ${facts.technologies.join(', ')}
Why it matters: ${facts.significance}

Category: ${category || 'Technology'}

Requirements:
- Write an ENTIRELY ORIGINAL article. Do NOT copy the source.
- Include a "## The Verdict" section at the end with your proprietary architectural opinion.
- No dashes in prose or titles.
- 800 to 1200 words.
- Return in this exact format:

TITLE: [your title]
EXCERPT: [2-3 sentence summary for listing page]
TAGS: [comma separated tags]

---

[article body in Markdown]`
            }]
        })

        const rawArticle = articleResponse.content[0]?.type === 'text' ? articleResponse.content[0].text : ''

        // Step 3: Parse the response
        const titleMatch = rawArticle.match(/^TITLE:\s*(.+)$/m)
        const excerptMatch = rawArticle.match(/^EXCERPT:\s*(.+)$/m)
        const tagsMatch = rawArticle.match(/^TAGS:\s*(.+)$/m)
        const bodyMatch = rawArticle.split(/^---\s*$/m)

        const title = titleMatch?.[1]?.trim() || facts.topic
        const excerpt = excerptMatch?.[1]?.trim() || facts.significance
        const tags = tagsMatch?.[1]?.split(',').map(t => t.trim()).filter(Boolean) || facts.technologies
        const articleBody = bodyMatch.length > 1 ? bodyMatch.slice(1).join('---').trim() : rawArticle

        // Step 4: Post-process (no-dash enforcement)
        const processedContent = postProcessArticle(articleBody)

        // Extract verdict section
        const verdictMatch = processedContent.match(/## The Verdict\s*([\s\S]*?)(?=##|$)/)
        const verdict = verdictMatch?.[1]?.trim() || ''

        // Step 5: Calculate metrics
        const { wordCount, minutes } = calculateReadingTime(processedContent)

        // Step 6: Save as draft
        const slug = generateSlug(title)
        const articleId = await saveDraft({
            title,
            slug,
            excerpt,
            content: processedContent,
            verdict,
            category: category || 'technology',
            tags,
            sourceUrl: sourceUrl || '',
            sourceTitle: sourceTitle || '',
            readingTimeMinutes: minutes,
            wordCount,
        })

        return NextResponse.json({
            success: true,
            articleId,
            title,
            slug,
            wordCount,
            readingTimeMinutes: minutes,
            status: 'draft',
        })

    } catch (err: any) {
        console.error('Article generation error:', err)
        return NextResponse.json({ error: err.message || 'Generation failed' }, { status: 500 })
    }
}
