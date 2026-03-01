import { Resend } from 'resend'
import type { DiscoveryState } from '@/lib/ai/discovery-flow'
import { supabase } from '@/lib/supabase'

let resend: Resend | null = null
function getResend(): Resend | null {
    if (!process.env.RESEND_API_KEY) return null
    if (!resend) resend = new Resend(process.env.RESEND_API_KEY)
    return resend
}

const FROM_ADDRESS = 'Quartermasters <hello@quartermasters.me>'
const FOUNDER_EMAIL = 'ceocli@quartermasters.me'

const SERVICE_LABELS: Record<string, string> = {
    rebuild: 'Website Redesign',
    expansion: 'Feature Injection',
    express: 'Express Build',
    webapp: 'Web App / SaaS',
    'ai-training': 'Custom AI Model Training',
}

const PERSONA_LABELS: Record<string, string> = {
    strategist: 'Strategist (CEO/Founder)',
    architect: 'Architect (CTO/Tech Lead)',
    operator: 'Operator (PM/Marketing)',
}

/**
 * Send high-value lead alert to founder.
 * Triggered when: budget > $10K, AI training detected, or discovery reaches close stage.
 */
export async function sendLeadAlert(
    conversationId: string,
    discoveryState: DiscoveryState,
    reason: 'high_budget' | 'ai_training' | 'discovery_complete'
): Promise<boolean> {
    const r = getResend()
    if (!r) {
        console.warn('RESEND_API_KEY not set — skipping lead alert')
        return false
    }

    // Fetch conversation transcript
    let transcript = 'Transcript unavailable'
    if (supabase) {
        const { data: messages } = await supabase
            .from('messages')
            .select('role, content, created_at')
            .eq('conversation_id', conversationId)
            .order('created_at', { ascending: true })

        if (messages && messages.length > 0) {
            transcript = messages
                .map(m => `[${m.role.toUpperCase()}] ${m.content}`)
                .join('\n\n')
        }
    }

    const { data, persona } = discoveryState
    const reasonLabel = reason === 'high_budget' ? 'High Budget Detected'
        : reason === 'ai_training' ? 'AI Training Inquiry'
        : 'Discovery Complete'

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0a0f1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:12px;overflow:hidden;">
        <tr><td style="height:4px;background:#C15A2C;"></td></tr>
        <tr><td style="padding:32px 40px 8px;">
          <h2 style="margin:0;color:#C15A2C;font-size:14px;text-transform:uppercase;letter-spacing:2px;">Q Lead Alert</h2>
        </td></tr>
        <tr><td style="padding:8px 40px 32px;">
          <h1 style="margin:0 0 24px;color:#f0f0f0;font-size:22px;">${reasonLabel}</h1>

          <table style="width:100%;margin:12px 0;" cellpadding="8" cellspacing="0">
            <tr><td style="color:#9ca3af;width:140px;">Budget</td><td style="color:#f0f0f0;font-weight:600;">${data.budget || 'Not disclosed'}</td></tr>
            <tr><td style="color:#9ca3af;">Location</td><td style="color:#f0f0f0;">${data.location || 'Not disclosed'}</td></tr>
            <tr><td style="color:#9ca3af;">Business</td><td style="color:#f0f0f0;">${data.businessType || 'Not disclosed'}</td></tr>
            <tr><td style="color:#9ca3af;">Scope</td><td style="color:#f0f0f0;">${data.scope || 'Not disclosed'}</td></tr>
            <tr><td style="color:#9ca3af;">Service Module</td><td style="color:#f0f0f0;">${data.serviceModule ? SERVICE_LABELS[data.serviceModule] || data.serviceModule : 'Not identified'}</td></tr>
            <tr><td style="color:#9ca3af;">Persona</td><td style="color:#f0f0f0;">${persona ? PERSONA_LABELS[persona] || persona : 'Not locked'}</td></tr>
            <tr><td style="color:#9ca3af;">Stage Reached</td><td style="color:#f0f0f0;">${discoveryState.stage}</td></tr>
            <tr><td style="color:#9ca3af;">Conversation Turns</td><td style="color:#f0f0f0;">${discoveryState.conversationTurn}</td></tr>
          </table>

          <h3 style="margin:32px 0 12px;color:#f0f0f0;font-size:16px;">Full Transcript</h3>
          <div style="background:#0a0f1a;border-radius:8px;padding:16px;max-height:400px;overflow:auto;">
            <pre style="margin:0;color:#d1d5db;font-size:13px;line-height:1.8;white-space:pre-wrap;word-wrap:break-word;">${transcript}</pre>
          </div>
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid #1f2937;">
          <p style="margin:0;color:#6b7280;font-size:12px;">Quartermasters Q Activity Alert &mdash; Conversation ${conversationId}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

    try {
        await r.emails.send({
            from: FROM_ADDRESS,
            to: FOUNDER_EMAIL,
            subject: `[Q Alert] ${reasonLabel} — ${data.serviceModule ? SERVICE_LABELS[data.serviceModule] : 'Unknown Service'}`,
            html,
        })
        return true
    } catch (err) {
        console.error('Failed to send lead alert:', err)
        return false
    }
}
