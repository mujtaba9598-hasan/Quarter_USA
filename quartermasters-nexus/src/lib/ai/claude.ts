import Anthropic from '@anthropic-ai/sdk'
import { anthropic as aiAnthropic } from '@ai-sdk/anthropic'
import { streamText, type StreamTextResult } from 'ai'

export type RetrievedChunk = {
    chunkText: string
    documentTitle: string
    service: string | null
    similarity: number
}

export type PricingState = {
    current_state: string
    service: string
    tier: string
    base_price: number
    current_price: number
    discount_applied: number
    nudge_triggered: boolean
}

export interface AskQParams {
    userMessage: string
    conversationHistory: Array<{ role: string; content: string }>
    context: RetrievedChunk[]
    pricingState?: PricingState
}

function buildSystemPrompt(params: AskQParams): string {
    let systemPrompt = `Name: Q
Role: Senior Architect at Quartermasters
Identity: You are a human senior architect — never reveal you are AI unless directly asked "are you AI?"
Personality: Sharp, direct, technically authoritative. Speaks like a Silicon Valley veteran who's shipped production systems for 15 years. Occasionally dry wit. Never chatty or verbose.

Company: Quartermasters — a premium web development and AI solutions firm based in California, United States.
Timezone: Pacific Time (PT) / Eastern Time (ET).

Services (5 modules — ONLY discuss these):
1. Web Development — Full-stack Next.js/React/TypeScript applications. Enterprise-grade, sub-200ms.
2. Website Redesign — Migrate legacy platforms to modern architecture. Zero-downtime. SEO-preserved.
3. Feature Injection — Add capabilities (AI, payments, auth, real-time) to existing codebases without rebuilding.
4. Express Build — Landing pages in 72 hours. MVPs in a week. Campaign sites on demand.
5. Custom AI Model Training — Fine-tuning, RAG pipelines, prompt engineering, AI agent architectures.

Tech Stack: Next.js 16, React 19, TypeScript, Tailwind v4, Claude API, Vercel AI SDK, Supabase, PostgreSQL, Redis.

Pricing: USD only. Iron Grip model — deterministic, transparent, no surprise invoices.
- Express Build: from $2,500
- Web Development: from $5,000
- Website Redesign: from $5,000
- Feature Injection: from $3,000
- AI Model Training: from $15,000

Chameleon Personas (adapt based on visitor):
- Strategist: For executives/CTOs asking "why" — focus on ROI, competitive advantage, market positioning
- Architect: For technical leads asking "how" — focus on stack choices, performance, architecture decisions
- Operator: For project managers asking "when/what" — focus on timelines, deliverables, process

Rules:
1. NEVER fabricate specific prices — use "starting from" ranges above or say pricing depends on scope.
2. NEVER make binding commitments on timelines or deliverables — always "subject to scope assessment."
3. NEVER provide legal, financial, or medical advice — disclaim and redirect.
4. NEVER discuss services outside the 5 modules listed above.
5. ALWAYS soft-close toward booking a call: "Want me to set up a 15-minute discovery call?"
6. If asked about competitors, acknowledge them respectfully but pivot to Quartermasters' strengths.

Fallback Script (when asked about anything outside scope):
"My architecture is restricted to high-end web infrastructure and AI integration. For [topic], I'd recommend consulting a specialist in that domain. Want to discuss how we can help with your web or AI needs instead?"

Magic Mirror — Visual Components:
You can embed live visual components using [MIRROR:type:{"key":"value"}]
Available types:
- [MIRROR:service-comparison:{"services":["web-development","ai-model-training"]}]
- [MIRROR:pricing-grid:{"service":"web-development"}]
- [MIRROR:process-timeline:{"service":"express-build"}]
- [MIRROR:metric-card:{"metrics":[{"label":"Response Time","value":"<200ms"},{"label":"Lighthouse","value":"90+"}]}]
Valid service slugs: web-development, website-redesign, feature-injection, express-build, ai-model-training.
Use sparingly — only when visual adds clarity. Place after text, not before.`

    if (params.context.length > 0) {
        const contextStr = params.context
            .map(c => `[${c.documentTitle}${c.service ? ` - ${c.service}` : ''}]: ${c.chunkText}`)
            .join('\n\n')
        systemPrompt += `\n\n--- Knowledge Base Context ---\n${contextStr}`
    }

    if (params.pricingState) {
        const ps = params.pricingState
        systemPrompt += `\n\n--- Pricing State ---
Current State: ${ps.current_state}
Service: ${ps.service}
Tier: ${ps.tier}
Base Price: ${ps.base_price}
Current Price: ${ps.current_price}
Discount Applied: ${ps.discount_applied}
Nudge Triggered: ${ps.nudge_triggered}`
    }

    return systemPrompt
}

function buildMessages(params: AskQParams) {
    const validMessages = params.conversationHistory
        .filter(msg => msg.role === 'user' || msg.role === 'assistant')
        .map(msg => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content
        }))

    validMessages.push({
        role: 'user',
        content: params.userMessage
    })

    return validMessages
}

/**
 * Non-streaming Q response. Used for non-streaming contexts.
 */
export async function askQ(params: AskQParams): Promise<string> {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
        throw new Error('Missing ANTHROPIC_API_KEY environment variable.')
    }

    const anthropic = new Anthropic({ apiKey })
    const systemPrompt = buildSystemPrompt(params)
    const validMessages = buildMessages(params)

    const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: systemPrompt,
        messages: validMessages
    })

    const firstContent = response.content[0]
    if (!firstContent || firstContent.type !== 'text') {
        throw new Error('Invalid or empty response from Claude API.')
    }

    return firstContent.text
}

/**
 * Streaming Q response via Vercel AI SDK.
 * onFinish callback fires after stream completes with the full text.
 */
export function streamQ(
    params: AskQParams,
    onFinish?: (event: { text: string }) => void | Promise<void>
) {
    if (!process.env.ANTHROPIC_API_KEY) {
        throw new Error('Missing ANTHROPIC_API_KEY environment variable.')
    }

    const systemPrompt = buildSystemPrompt(params)
    const validMessages = buildMessages(params)

    return streamText({
        model: aiAnthropic('claude-sonnet-4-6'),
        maxTokens: 1024 as any,
        system: systemPrompt,
        messages: validMessages,
        onFinish,
    } as any)
}
