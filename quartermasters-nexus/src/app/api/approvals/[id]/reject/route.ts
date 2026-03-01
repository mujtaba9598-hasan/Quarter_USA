import { NextResponse } from 'next/server'
import { processApproval } from '@/lib/email/approval-gate'

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    if (!id) {
        return NextResponse.json({ error: 'Missing approval ID' }, { status: 400 })
    }

    const success = await processApproval(id, 'rejected')

    if (success) {
        return new Response(
            `<!DOCTYPE html><html><body style="background:#0a0f1a;color:#f0f0f0;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
            <div style="text-align:center;"><h1 style="color:#F59E0B;">Rejected</h1><p>The email will not be sent.</p></div>
            </body></html>`,
            { headers: { 'Content-Type': 'text/html' } }
        )
    }

    return new Response(
        `<!DOCTYPE html><html><body style="background:#0a0f1a;color:#f0f0f0;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
        <div style="text-align:center;"><h1 style="color:#EF4444;">Error</h1><p>Approval not found or already processed.</p></div>
        </body></html>`,
        { status: 404, headers: { 'Content-Type': 'text/html' } }
    )
}
