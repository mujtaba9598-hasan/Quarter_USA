import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * POST /api/revisions — Submit a change request
 * Client-facing endpoint for submitting revision requests.
 */
export async function POST(req: Request) {
    if (!supabase) {
        return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
    }

    try {
        const body = await req.json()
        const { projectId, clientEmail, clientName, title, description, priority } = body

        if (!projectId || !clientEmail || !title || !description) {
            return NextResponse.json(
                { error: 'Missing required fields: projectId, clientEmail, title, description' },
                { status: 400 }
            )
        }

        // Verify project exists and is within revision window
        const { data: project, error: projectError } = await supabase
            .from('projects')
            .select('*')
            .eq('id', projectId)
            .single()

        if (projectError || !project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 })
        }

        if (project.status === 'archived') {
            return NextResponse.json(
                { error: 'This project has been archived. The 30-day revision window has expired.' },
                { status: 410 }
            )
        }

        if (project.revision_window_ends) {
            const windowEnd = new Date(project.revision_window_ends)
            if (new Date() > windowEnd) {
                return NextResponse.json(
                    { error: 'The 30-day revision window for this project has expired.' },
                    { status: 410 }
                )
            }
        }

        // Create change request
        const { data: changeRequest, error: insertError } = await supabase
            .from('change_requests')
            .insert({
                project_id: projectId,
                client_email: clientEmail,
                client_name: clientName || null,
                title,
                description,
                priority: priority || 'normal',
                delivered_at: project.delivered_at,
                expires_at: project.revision_window_ends,
            })
            .select()
            .single()

        if (insertError) {
            console.error('Failed to create change request:', insertError)
            return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
        }

        return NextResponse.json({ success: true, changeRequest }, { status: 201 })
    } catch (err: any) {
        console.error('Revision API error:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

/**
 * GET /api/revisions?email=client@example.com — List client's change requests
 */
export async function GET(req: Request) {
    if (!supabase) {
        return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
    }

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
        return NextResponse.json({ error: 'Missing email parameter' }, { status: 400 })
    }

    const { data, error } = await supabase
        .from('change_requests')
        .select('*')
        .eq('client_email', email)
        .eq('is_archived', false)
        .order('created_at', { ascending: false })

    if (error) {
        return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 })
    }

    return NextResponse.json({ changeRequests: data })
}
