import { NextResponse } from 'next/server'
import { runSiteAudit } from '@/lib/audit/site-audit'

export async function POST(req: Request) {
    try {
        const { url } = await req.json()

        if (!url || typeof url !== 'string') {
            return NextResponse.json({ error: 'Missing or invalid URL' }, { status: 400 })
        }

        // Basic URL validation
        const urlPattern = /^(https?:\/\/)?[\w.-]+\.\w{2,}/i
        if (!urlPattern.test(url)) {
            return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
        }

        const result = await runSiteAudit(url)
        return NextResponse.json(result)
    } catch (error: any) {
        console.error('Audit API error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to run audit' },
            { status: 500 }
        )
    }
}
