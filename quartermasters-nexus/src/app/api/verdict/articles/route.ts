import { NextResponse } from 'next/server'
import { getPublishedArticles, publishArticle } from '@/lib/verdict/content-pipeline'
import { supabase } from '@/lib/supabase'

/**
 * GET /api/verdict/articles — List published articles.
 * Query params: ?category=&limit=&offset=
 */
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') || undefined
    const limit = parseInt(searchParams.get('limit') || '12')
    const offset = parseInt(searchParams.get('offset') || '0')

    const articles = await getPublishedArticles({ category, limit, offset })

    return NextResponse.json({ articles })
}

/**
 * PATCH /api/verdict/articles — Publish or archive an article.
 * Body: { id, action: 'publish' | 'archive' }
 */
export async function PATCH(req: Request) {
    if (!supabase) {
        return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
    }

    try {
        const body = await req.json()
        const { id, action } = body

        if (!id || !action) {
            return NextResponse.json({ error: 'Missing id or action' }, { status: 400 })
        }

        if (action === 'publish') {
            const success = await publishArticle(id)
            if (!success) {
                return NextResponse.json({ error: 'Failed to publish' }, { status: 500 })
            }
            return NextResponse.json({ success: true })
        }

        if (action === 'archive') {
            const { error } = await supabase
                .from('articles')
                .update({ status: 'archived', updated_at: new Date().toISOString() })
                .eq('id', id)

            if (error) {
                return NextResponse.json({ error: 'Failed to archive' }, { status: 500 })
            }
            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
