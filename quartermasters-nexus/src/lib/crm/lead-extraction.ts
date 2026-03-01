import { supabase } from '@/lib/supabase'
import type { DiscoveryState } from '@/lib/ai/discovery-flow'

/**
 * Extract lead data from a completed discovery conversation.
 * Called when discovery reaches estimate or close stage.
 */
export async function extractLeadFromDiscovery(
    conversationId: string,
    visitorId: string,
    discoveryState: DiscoveryState
): Promise<string | null> {
    if (!supabase) return null

    const { data, persona, data: dData } = discoveryState
    const isHighValue = isHighValueLead(data.budget, data.serviceModule)

    // Upsert lead into leads table
    const { data: lead, error } = await supabase
        .from('leads')
        .upsert(
            {
                conversation_id: conversationId,
                visitor_id: visitorId,
                budget_range: data.budget,
                location: data.location,
                business_type: data.businessType,
                scope: data.scope,
                service_module: data.serviceModule,
                persona: persona,
                stage_reached: discoveryState.stage,
                is_high_value: isHighValue,
                metadata: {
                    persona_signals: discoveryState.personaSignals,
                    conversation_turn: discoveryState.conversationTurn,
                    abuse_count: discoveryState.abuseCount,
                },
                created_at: new Date().toISOString(),
            },
            { onConflict: 'conversation_id' }
        )
        .select('id')
        .single()

    if (error) {
        console.error('Lead extraction error:', error)
        return null
    }

    return lead?.id || null
}

/**
 * Determine if a lead is high-value based on budget and service module.
 * High-value: budget > $10K or AI training module.
 */
export function isHighValueLead(
    budget: string | null,
    serviceModule: string | null
): boolean {
    // AI training is always high-value
    if (serviceModule === 'ai-training') return true

    if (!budget) return false

    // Parse budget for numeric value
    const numericMatch = budget.replace(/[^0-9]/g, '')
    if (numericMatch) {
        const amount = parseInt(numericMatch, 10)
        if (amount >= 10000) return true
    }

    // Check for known high-value ranges
    const lower = budget.toLowerCase()
    if (
        lower.includes('50k') || lower.includes('50,000') ||
        lower.includes('100k') || lower.includes('100,000') ||
        lower.includes('25k') || lower.includes('25,000') ||
        lower.includes('20k') || lower.includes('20,000') ||
        lower.includes('15k') || lower.includes('15,000') ||
        lower.includes('10k') || lower.includes('10,000')
    ) {
        return true
    }

    return false
}
