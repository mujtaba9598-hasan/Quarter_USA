import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * GET /api/admin/revisions — List all change requests for admin dashboard
 * Supports ?status=submitted|in_progress|completed|rejected
 */
export async function GET(req: Request) {
    if (!supabase) {
        return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')

    let query = supabase
        .from('change_requests')
        .select('*')
        .eq('is_archived', false)
        .order('created_at', { ascending: false })

    if (status) {
        query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
        return NextResponse.json({ error: 'Failed to fetch revisions' }, { status: 500 })
    }

    return NextResponse.json({ revisions: data })
}

/**
 * PATCH /api/admin/revisions — Update a change request status
 * Body: { id, status, assignedTo?, resolutionNotes? }
 */
export async function PATCH(req: Request) {
    if (!supabase) {
        return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
    }

    try {
        const body = await req.json()
        const { id, status, assignedTo, resolutionNotes } = body

        if (!id || !status) {
            return NextResponse.json({ error: 'Missing id or status' }, { status: 400 })
        }

        const updates: Record<string, any> = {
            status,
            updated_at: new Date().toISOString(),
        }

        if (assignedTo !== undefined) updates.assigned_to = assignedTo
        if (resolutionNotes !== undefined) updates.resolution_notes = resolutionNotes
        if (status === 'completed') updates.completed_at = new Date().toISOString()

        const { data, error } = await supabase
            .from('change_requests')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) {
            return NextResponse.json({ error: 'Failed to update revision' }, { status: 500 })
        }

        return NextResponse.json({ revision: data })
    } catch (err: any) {
        console.error('Admin revision update error:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
