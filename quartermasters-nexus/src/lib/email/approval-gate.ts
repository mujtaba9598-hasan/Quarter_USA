import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

let resend: Resend | null = null
function getResend(): Resend | null {
    if (!process.env.RESEND_API_KEY) return null
    if (!resend) resend = new Resend(process.env.RESEND_API_KEY)
    return resend
}

const FROM_ADDRESS = 'Quartermasters <hello@quartermasters.me>'
const FOUNDER_EMAIL = 'ceocli@quartermasters.me'

interface PendingEmail {
    conversationId: string | null
    type: 'quote' | 'invoice' | 'confirmation' | 'lead_alert'
    recipientEmail: string
    subject: string
    htmlBody: string
    metadata?: Record<string, unknown>
}

/**
 * Queue an email for founder approval instead of sending it directly.
 * Creates a pending_approvals record and notifies founder via email with approve/reject links.
 */
export async function queueForApproval(email: PendingEmail): Promise<string | null> {
    if (!supabase) return null

    // Insert pending approval
    const { data, error } = await supabase
        .from('pending_approvals')
        .insert({
            conversation_id: email.conversationId,
            type: email.type,
            status: 'pending',
            recipient_email: email.recipientEmail,
            subject: email.subject,
            html_body: email.htmlBody,
            metadata: email.metadata || {},
        })
        .select('id')
        .single()

    if (error || !data) {
        console.error('Failed to create pending approval:', error)
        return null
    }

    const approvalId = data.id
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quartermasters.me'

    // Notify founder
    const r = getResend()
    if (r) {
        const approveUrl = `${baseUrl}/api/approvals/${approvalId}/approve`
        const rejectUrl = `${baseUrl}/api/approvals/${approvalId}/reject`

        const notificationHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0a0f1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:12px;overflow:hidden;">
        <tr><td style="height:4px;background:#C15A2C;"></td></tr>
        <tr><td style="padding:32px 40px 8px;">
          <h2 style="margin:0;color:#C15A2C;font-size:14px;text-transform:uppercase;letter-spacing:2px;">Approval Required</h2>
        </td></tr>
        <tr><td style="padding:8px 40px 32px;">
          <h1 style="margin:0 0 24px;color:#f0f0f0;font-size:22px;">Q wants to send: ${email.type.toUpperCase()}</h1>
          <table style="width:100%;margin:12px 0;" cellpadding="8" cellspacing="0">
            <tr><td style="color:#9ca3af;width:120px;">To</td><td style="color:#f0f0f0;font-weight:600;">${email.recipientEmail}</td></tr>
            <tr><td style="color:#9ca3af;">Subject</td><td style="color:#f0f0f0;">${email.subject}</td></tr>
            <tr><td style="color:#9ca3af;">Type</td><td style="color:#f0f0f0;">${email.type}</td></tr>
          </table>
          <div style="margin:24px 0;">
            <a href="${approveUrl}" style="display:inline-block;padding:14px 32px;background:#10B981;color:#fff;text-decoration:none;border-radius:8px;font-weight:700;font-size:16px;margin-right:12px;">APPROVE</a>
            <a href="${rejectUrl}" style="display:inline-block;padding:14px 32px;background:#EF4444;color:#fff;text-decoration:none;border-radius:8px;font-weight:700;font-size:16px;">REJECT</a>
          </div>
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid #1f2937;">
          <p style="margin:0;color:#6b7280;font-size:12px;">Approval ID: ${approvalId}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

        await r.emails.send({
            from: FROM_ADDRESS,
            to: FOUNDER_EMAIL,
            subject: `[APPROVAL NEEDED] ${email.type}: ${email.subject}`,
            html: notificationHtml,
        }).catch(err => console.error('Failed to send approval notification:', err))
    }

    return approvalId
}

/**
 * Process an approval decision.
 * If approved, sends the queued email. If rejected, marks as rejected.
 */
export async function processApproval(
    approvalId: string,
    decision: 'approved' | 'rejected'
): Promise<boolean> {
    if (!supabase) return false

    // Fetch the pending approval
    const { data: approval, error: fetchError } = await supabase
        .from('pending_approvals')
        .select('*')
        .eq('id', approvalId)
        .eq('status', 'pending')
        .single()

    if (fetchError || !approval) {
        console.error('Approval not found or already processed:', fetchError)
        return false
    }

    // Update status
    await supabase
        .from('pending_approvals')
        .update({
            status: decision,
            resolved_at: new Date().toISOString(),
            resolved_by: 'founder',
        })
        .eq('id', approvalId)

    // If approved, send the email
    if (decision === 'approved' && approval.recipient_email && approval.html_body) {
        const r = getResend()
        if (r) {
            await r.emails.send({
                from: FROM_ADDRESS,
                to: approval.recipient_email,
                subject: approval.subject || 'Quartermasters',
                html: approval.html_body,
            }).catch(err => console.error('Failed to send approved email:', err))
        }
    }

    return true
}
