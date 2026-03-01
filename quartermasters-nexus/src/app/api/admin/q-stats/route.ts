import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
    if (!supabase) {
        return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
    }

    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

    // Total conversations
    const { count: totalConversations } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })

    // Active conversations (last 30 min)
    const thirtyMinAgo = new Date(now.getTime() - 30 * 60 * 1000).toISOString()
    const { count: activeSessions } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')
        .gte('updated_at', thirtyMinAgo)

    // Total leads
    const { count: totalLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })

    // Leads today
    const { count: leadsToday } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', todayStart)

    // Leads this week
    const { count: leadsThisWeek } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekStart)

    // Leads this month
    const { count: leadsThisMonth } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', monthStart)

    // High-value leads
    const { count: highValueLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('is_high_value', true)

    // Service module distribution
    const { data: moduleData } = await supabase
        .from('leads')
        .select('service_module')

    const moduleDistribution: Record<string, number> = {}
    if (moduleData) {
        for (const row of moduleData) {
            const mod = row.service_module || 'unidentified'
            moduleDistribution[mod] = (moduleDistribution[mod] || 0) + 1
        }
    }

    // Persona distribution
    const { data: personaData } = await supabase
        .from('leads')
        .select('persona')

    const personaDistribution: Record<string, number> = {}
    if (personaData) {
        for (const row of personaData) {
            const p = row.persona || 'unlocked'
            personaDistribution[p] = (personaDistribution[p] || 0) + 1
        }
    }

    // Stage distribution (how far visitors get)
    const { data: stageData } = await supabase
        .from('leads')
        .select('stage_reached')

    const stageDistribution: Record<string, number> = {}
    if (stageData) {
        for (const row of stageData) {
            const s = row.stage_reached || 'unknown'
            stageDistribution[s] = (stageDistribution[s] || 0) + 1
        }
    }

    // Total messages (to calculate avg per conversation)
    const { count: totalMessages } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })

    // Pending approvals
    const { count: pendingApprovals } = await supabase
        .from('pending_approvals')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')

    // Conversion rate: leads that reached close / total conversations
    const closedLeads = stageDistribution['close'] || 0
    const conversionRate = totalConversations && totalConversations > 0
        ? ((closedLeads / totalConversations) * 100).toFixed(1)
        : '0.0'

    return NextResponse.json({
        totalConversations: totalConversations || 0,
        activeSessions: activeSessions || 0,
        totalLeads: totalLeads || 0,
        highValueLeads: highValueLeads || 0,
        leadsToday: leadsToday || 0,
        leadsThisWeek: leadsThisWeek || 0,
        leadsThisMonth: leadsThisMonth || 0,
        totalMessages: totalMessages || 0,
        avgMessagesPerConversation: totalConversations && totalConversations > 0
            ? Math.round((totalMessages || 0) / totalConversations)
            : 0,
        conversionRate: `${conversionRate}%`,
        pendingApprovals: pendingApprovals || 0,
        moduleDistribution,
        personaDistribution,
        stageDistribution,
    })
}
