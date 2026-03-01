import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { retrieveContext } from '@/lib/rag/retrieve'
import { streamQ } from '@/lib/ai/claude'
import { validateResponse, checkAirGap } from '@/lib/ai/guardrails'
import { rateLimit } from '@/lib/redis'
import {
    type DiscoveryState,
    processDiscoveryMessage,
    createInitialState,
} from '@/lib/ai/discovery-flow'
import { getAbuseResponse } from '@/lib/ai/discovery-prompts'
import { extractLeadFromDiscovery, isHighValueLead } from '@/lib/crm/lead-extraction'
import { sendLeadAlert } from '@/lib/email/lead-alerts'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { message, visitorId, conversationId, discoveryState: clientDiscoveryState } = body

        if (!message || !visitorId) {
            return NextResponse.json({ error: 'Missing message or visitorId' }, { status: 400 })
        }

        // Air Gap — block UAE/Middle East probes before any processing
        const airGapResult = checkAirGap(message)
        if (airGapResult.blocked) {
            return NextResponse.json({
                response: airGapResult.response,
                conversationId: conversationId || null
            })
        }

        const rateLimitResult = await rateLimit(visitorId, 10, 60_000)
        if (!rateLimitResult.allowed) {
            return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
                status: 429,
                headers: {
                    'Content-Type': 'application/json',
                    'X-RateLimit-Remaining': '0'
                }
            })
        }

        if (!supabase) {
            return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
        }

        let currentConversationId = conversationId

        // a. If conversationId provided, fetch it. Otherwise create new one.
        if (!currentConversationId) {
            const { data: convData, error: convError } = await supabase
                .from('conversations')
                .insert({ visitor_id: visitorId, status: 'active', flow_type: 'discovery' })
                .select('id')
                .single()

            if (convError || !convData) {
                console.error('Error creating conversation:', convError)
                return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 })
            }
            currentConversationId = convData.id
        }

        // b. Fetch conversation history
        const { data: messagesData, error: messagesError } = await supabase
            .from('messages')
            .select('role, content')
            .eq('conversation_id', currentConversationId)
            .order('created_at', { ascending: true })

        if (messagesError) {
            console.error('Error fetching messages:', messagesError)
            return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
        }

        const conversationHistory = messagesData || []

        // c. Call retrieveContext for RAG context
        const context = await retrieveContext(message)

        // d. Fetch current pricing_state
        const { data: pricingData, error: pricingError } = await supabase
            .from('pricing_states')
            .select('*')
            .eq('conversation_id', currentConversationId)
            .single()

        if (pricingError && pricingError.code !== 'PGRST116') {
            console.error('Error fetching pricing state:', pricingError)
        }

        // e. Discovery Flow Processing
        const discoveryState: DiscoveryState = clientDiscoveryState || createInitialState()
        const { nextState, action } = processDiscoveryMessage(discoveryState, message)

        // Handle abuse/irrelevant actions — return canned response, no LLM call
        if (action.type === 'reject_irrelevant' || action.type === 'redirect_to_email') {
            const abuseType = action.type === 'reject_irrelevant' ? action.abuseType : 'abuse'
            const abuseResponse = getAbuseResponse(abuseType, nextState.abuseCount)

            // Store both messages
            await supabase.from('messages').insert([
                { conversation_id: currentConversationId, role: 'user', content: message },
                { conversation_id: currentConversationId, role: 'assistant', content: abuseResponse }
            ])

            return NextResponse.json({
                response: abuseResponse,
                discoveryState: nextState,
            }, {
                headers: {
                    'X-Conversation-Id': currentConversationId,
                    'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
                    'X-Discovery-State': JSON.stringify(nextState),
                }
            })
        }

        // f. Store user message BEFORE streaming starts
        const { error: insertUserError } = await supabase.from('messages').insert([
            { conversation_id: currentConversationId, role: 'user', content: message }
        ])

        if (insertUserError) {
            console.error('Error inserting user message:', insertUserError)
            return NextResponse.json({ error: 'Failed to save message' }, { status: 500 })
        }

        // g. Stream Q response — with discovery stage injected into system prompt
        const result = streamQ(
            {
                userMessage: message,
                conversationHistory,
                context,
                pricingState: pricingData || undefined,
                discoveryStage: nextState.stage,
                persona: nextState.persona,
                discoveryData: nextState.data,
            },
            async ({ text }) => {
                const validationResult = validateResponse(text, pricingData || undefined)

                if (validationResult.flags.length > 0) {
                    console.warn(`Guardrail flags in conv ${currentConversationId}:`, validationResult.flags)
                }

                const { error: insertError } = await supabase.from('messages').insert([
                    { conversation_id: currentConversationId, role: 'assistant', content: validationResult.cleaned }
                ])

                if (insertError) {
                    console.error('Error inserting assistant message:', insertError)
                }

                // Lead extraction — trigger when reaching estimate or close stage
                if (nextState.stage === 'estimate' || nextState.stage === 'close') {
                    extractLeadFromDiscovery(currentConversationId, visitorId, nextState)
                        .catch(err => console.error('Lead extraction failed:', err))
                }

                // High-value lead alerts
                if (nextState.stage === 'close') {
                    sendLeadAlert(currentConversationId, nextState, 'discovery_complete')
                        .catch(err => console.error('Lead alert failed:', err))
                } else if (isHighValueLead(nextState.data.budget, nextState.data.serviceModule)) {
                    const reason = nextState.data.serviceModule === 'ai-training' ? 'ai_training' : 'high_budget'
                    sendLeadAlert(currentConversationId, nextState, reason)
                        .catch(err => console.error('Lead alert failed:', err))
                }
            }
        )

        // h. Return streaming response with conversation ID + discovery state headers
        return result.toUIMessageStreamResponse({
            headers: {
                'X-Conversation-Id': currentConversationId,
                'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
                'X-Discovery-State': JSON.stringify(nextState),
            }
        })

    } catch (error: any) {
        console.error('Error in /api/chat:', error)
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
    }
}
