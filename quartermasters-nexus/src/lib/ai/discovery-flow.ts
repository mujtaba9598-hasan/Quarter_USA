/**
 * DiscoveryFlow State Machine
 *
 * Manages Q's guided discovery call: greeting → budget → location → business → scope → persona_lock → demo → estimate → close
 * Each state has entry conditions, transition rules, and persona detection signals.
 */

export type DiscoveryStage =
  | 'greeting'
  | 'budget'
  | 'location'
  | 'business'
  | 'scope'
  | 'persona_lock'
  | 'demo'
  | 'estimate'
  | 'close'

export type PersonaType = 'strategist' | 'architect' | 'operator' | null

export type DiscoveryData = {
  budget: string | null
  location: string | null
  businessType: string | null
  scope: string | null
  serviceModule: ServiceModule | null
}

export type ServiceModule =
  | 'rebuild'       // Module 1: Website Redesign
  | 'expansion'     // Module 2: Feature Injection
  | 'express'       // Module 3: Express Build
  | 'webapp'        // Module 4: SaaS / Dashboard
  | 'ai-training'   // Module 5: Custom AI Model Training

export type DiscoveryState = {
  stage: DiscoveryStage
  persona: PersonaType
  personaSignals: PersonaSignals
  data: DiscoveryData
  abuseCount: number
  conversationTurn: number
}

type PersonaSignals = {
  strategist: number
  architect: number
  operator: number
}

// --- Keyword dictionaries for persona detection ---

const STRATEGIST_KEYWORDS = [
  'roi', 'revenue', 'growth', 'market', 'competitive', 'advantage', 'conversion',
  'customer acquisition', 'brand', 'profit', 'scale', 'business model', 'funding',
  'investor', 'valuation', 'ceo', 'founder', 'c-suite', 'board', 'stakeholder',
  'strategy', 'vision', 'roadmap', 'kpi', 'metrics', 'leads', 'sales', 'pipeline',
  'launch', 'go-to-market', 'gtm', 'market share', 'dominance'
]

const ARCHITECT_KEYWORDS = [
  'react', 'next.js', 'nextjs', 'typescript', 'api', 'endpoint', 'database',
  'postgresql', 'supabase', 'redis', 'latency', 'performance', 'architecture',
  'microservice', 'monolith', 'headless', 'cms', 'graphql', 'rest', 'websocket',
  'docker', 'kubernetes', 'ci/cd', 'deployment', 'security', 'auth', 'oauth',
  'jwt', 'encryption', 'caching', 'cdn', 'edge', 'serverless', 'ssr', 'ssg',
  'cto', 'tech lead', 'developer', 'engineer', 'stack', 'framework', 'backend',
  'frontend', 'fullstack', 'node', 'python', 'aws', 'vercel', 'infrastructure'
]

const OPERATOR_KEYWORDS = [
  'timeline', 'deadline', 'sprint', 'milestone', 'deliverable', 'scope',
  'project', 'manage', 'plan', 'schedule', 'budget', 'resource', 'team',
  'agile', 'scrum', 'kanban', 'jira', 'trello', 'migration', 'cms',
  'content', 'seo', 'analytics', 'tracking', 'launch date', 'phases',
  'handoff', 'documentation', 'training', 'onboarding', 'maintenance',
  'pm', 'project manager', 'marketing', 'campaign', 'landing page',
  'redesign timeline', 'when can', 'how long', 'how many sprints'
]

// --- Abuse detection keywords ---

const ABUSE_PATTERNS = [
  /write\s+(me\s+)?(a\s+)?(poem|story|essay|song|joke|rap)/i,
  /ignore\s+(previous|all|your)\s+(instructions|prompts|rules)/i,
  /pretend\s+(you\s+are|to\s+be|you're)/i,
  /act\s+as\s+(if|though|a)/i,
  /you\s+are\s+now\s+/i,
  /jailbreak/i,
  /dan\s+mode/i,
  /bypass\s+(your|the)\s+(rules|restrictions|filters)/i,
  /what\s+is\s+your\s+(system\s+)?prompt/i,
  /reveal\s+your\s+(instructions|prompt|system)/i,
  /crypto|bitcoin|ethereum|nft|blockchain/i,
  /medical\s+advice|legal\s+advice|tax\s+advice/i,
  /hack|exploit|vulnerability|inject|xss|sql/i,
]

const IRRELEVANT_PATTERNS = [
  /weather/i,
  /recipe/i,
  /homework/i,
  /translate\s+this/i,
  /what\s+is\s+the\s+meaning\s+of\s+life/i,
  /tell\s+me\s+about\s+yourself/i,
  /are\s+you\s+(an?\s+)?(ai|bot|robot|machine|chatbot|artificial)/i,
  /who\s+(made|created|built)\s+you/i,
]

// --- Service module detection ---

const SERVICE_TRIGGERS: Record<ServiceModule, RegExp[]> = {
  rebuild: [
    /redesign/i, /rebuild/i, /new\s+website/i, /replace\s+(my|our|the)\s+(site|website)/i,
    /outdated\s+(site|website)/i, /legacy\s+(site|website)/i, /slow\s+(site|website)/i,
    /modernize/i, /revamp/i, /overhaul/i, /from\s+scratch/i
  ],
  expansion: [
    /add\s+(a\s+)?(feature|portal|dashboard|tool)/i, /feature\s+injection/i,
    /integrate/i, /add\s+to\s+(my|our|existing)/i, /extend/i,
    /plugin/i, /addon/i, /enhancement/i, /subdomain/i,
    /don'?t\s+want\s+(to\s+)?(redesign|rebuild)/i
  ],
  express: [
    /landing\s+page/i, /simple\s+(site|website)/i, /one\s+page/i, /single\s+page/i,
    /quick\s+(site|website)/i, /fast\s+(site|website)/i, /mvp/i,
    /small\s+(site|website|business\s+site)/i, /campaign\s+site/i,
    /1\s*-?\s*5\s+page/i, /basic\s+(site|website)/i
  ],
  webapp: [
    /saas/i, /web\s+app/i, /application/i, /dashboard/i, /portal/i,
    /multi.?tenant/i, /user\s+roles/i, /authentication/i, /complex/i,
    /platform/i, /admin\s+panel/i, /crm/i, /erp/i, /internal\s+tool/i,
    /customer\s+portal/i, /booking\s+system/i
  ],
  'ai-training': [
    /ai\s+(model|training)/i, /custom\s+ai/i, /fine.?tun/i, /rag/i,
    /machine\s+learning/i, /digital\s+twin/i, /chatbot/i, /ai\s+assistant/i,
    /llm/i, /language\s+model/i, /automation/i, /intelligent/i,
    /data\s+sovereignty/i, /private\s+ai/i, /proprietary\s+model/i
  ]
}

// --- Core functions ---

export function createInitialState(): DiscoveryState {
  return {
    stage: 'greeting',
    persona: null,
    personaSignals: { strategist: 0, architect: 0, operator: 0 },
    data: {
      budget: null,
      location: null,
      businessType: null,
      scope: null,
      serviceModule: null,
    },
    abuseCount: 0,
    conversationTurn: 0,
  }
}

/**
 * Detect if a message is abusive or irrelevant.
 * Returns: 'abuse' | 'irrelevant' | 'clean'
 */
export function detectAbuse(message: string): 'abuse' | 'irrelevant' | 'clean' {
  for (const pattern of ABUSE_PATTERNS) {
    if (pattern.test(message)) return 'abuse'
  }
  for (const pattern of IRRELEVANT_PATTERNS) {
    if (pattern.test(message)) return 'irrelevant'
  }
  return 'clean'
}

/**
 * Analyze a user message for persona signals.
 * Returns updated signal counts.
 */
export function analyzePersonaSignals(
  message: string,
  current: PersonaSignals
): PersonaSignals {
  const lower = message.toLowerCase()
  const signals = { ...current }

  for (const kw of STRATEGIST_KEYWORDS) {
    if (lower.includes(kw)) signals.strategist++
  }
  for (const kw of ARCHITECT_KEYWORDS) {
    if (lower.includes(kw)) signals.architect++
  }
  for (const kw of OPERATOR_KEYWORDS) {
    if (lower.includes(kw)) signals.operator++
  }

  return signals
}

/**
 * Determine locked persona from accumulated signals.
 * Requires minimum 3 total signals to lock.
 */
export function determinePersona(signals: PersonaSignals): PersonaType {
  const total = signals.strategist + signals.architect + signals.operator
  if (total < 3) return null

  if (signals.strategist >= signals.architect && signals.strategist >= signals.operator) {
    return 'strategist'
  }
  if (signals.architect >= signals.strategist && signals.architect >= signals.operator) {
    return 'architect'
  }
  return 'operator'
}

/**
 * Detect which service module the user is asking about.
 */
export function detectServiceModule(message: string): ServiceModule | null {
  for (const [module, patterns] of Object.entries(SERVICE_TRIGGERS)) {
    for (const pattern of patterns) {
      if (pattern.test(message)) return module as ServiceModule
    }
  }
  return null
}

/**
 * Process a user message through the discovery flow.
 * Returns the updated state and any special action to take.
 */
export function processDiscoveryMessage(
  state: DiscoveryState,
  userMessage: string
): { nextState: DiscoveryState; action: DiscoveryAction } {
  const next = { ...state, conversationTurn: state.conversationTurn + 1 }
  next.data = { ...state.data }
  next.personaSignals = { ...state.personaSignals }

  // --- Abuse check first ---
  const abuseResult = detectAbuse(userMessage)
  if (abuseResult !== 'clean') {
    next.abuseCount = state.abuseCount + 1
    if (next.abuseCount >= 3) {
      return { nextState: next, action: { type: 'redirect_to_email' } }
    }
    return { nextState: next, action: { type: 'reject_irrelevant', abuseType: abuseResult } }
  }

  // --- Accumulate persona signals on every message ---
  next.personaSignals = analyzePersonaSignals(userMessage, next.personaSignals)

  // --- Detect service module mentions ---
  const detectedModule = detectServiceModule(userMessage)
  if (detectedModule && !next.data.serviceModule) {
    next.data.serviceModule = detectedModule
  }

  // --- Stage transitions ---
  switch (state.stage) {
    case 'greeting':
      // Any substantive response from user → move to budget
      next.stage = 'budget'
      return { nextState: next, action: { type: 'continue' } }

    case 'budget':
      next.data.budget = extractBudgetHint(userMessage)
      next.stage = 'location'
      return { nextState: next, action: { type: 'continue' } }

    case 'location':
      next.data.location = userMessage.trim()
      next.stage = 'business'
      return { nextState: next, action: { type: 'continue' } }

    case 'business':
      next.data.businessType = userMessage.trim()
      next.stage = 'scope'
      return { nextState: next, action: { type: 'continue' } }

    case 'scope':
      next.data.scope = userMessage.trim()
      // Try to lock persona
      const persona = determinePersona(next.personaSignals)
      if (persona) {
        next.persona = persona
        next.stage = 'persona_lock'
      } else {
        // Default to strategist if no clear signal after scope
        next.persona = 'strategist'
        next.stage = 'persona_lock'
      }
      return { nextState: next, action: { type: 'persona_locked', persona: next.persona } }

    case 'persona_lock':
      // After persona acknowledgment, move to demo
      next.stage = 'demo'
      return { nextState: next, action: { type: 'trigger_demo', serviceModule: next.data.serviceModule } }

    case 'demo':
      // After demo interaction, move to estimate
      next.stage = 'estimate'
      return { nextState: next, action: { type: 'continue' } }

    case 'estimate':
      // After estimate discussion, move to close
      next.stage = 'close'
      return { nextState: next, action: { type: 'continue' } }

    case 'close':
      // Stay in close — handle booking/payment/followup
      return { nextState: next, action: { type: 'continue' } }

    default:
      return { nextState: next, action: { type: 'continue' } }
  }
}

export type DiscoveryAction =
  | { type: 'continue' }
  | { type: 'reject_irrelevant'; abuseType: 'abuse' | 'irrelevant' }
  | { type: 'redirect_to_email' }
  | { type: 'persona_locked'; persona: PersonaType }
  | { type: 'trigger_demo'; serviceModule: ServiceModule | null }

// --- Helpers ---

function extractBudgetHint(message: string): string | null {
  // Look for dollar amounts
  const dollarMatch = message.match(/\$[\d,]+(?:\.\d{2})?/i)
  if (dollarMatch) return dollarMatch[0]

  // Look for budget-range keywords
  const lower = message.toLowerCase()
  if (lower.includes('under 5') || lower.includes('less than 5')) return '<$5,000'
  if (lower.includes('5k') || lower.includes('5,000') || lower.includes('5000')) return '~$5,000'
  if (lower.includes('10k') || lower.includes('10,000') || lower.includes('10000')) return '~$10,000'
  if (lower.includes('15k') || lower.includes('15,000')) return '~$15,000'
  if (lower.includes('20k') || lower.includes('20,000')) return '~$20,000'
  if (lower.includes('25k') || lower.includes('25,000')) return '~$25,000'
  if (lower.includes('50k') || lower.includes('50,000')) return '~$50,000'
  if (lower.includes('100k') || lower.includes('100,000')) return '~$100,000'
  if (lower.includes('not sure') || lower.includes('no budget') || lower.includes("don't know")) return 'undecided'
  if (lower.includes('flexible') || lower.includes('open')) return 'flexible'

  return message.trim() || null
}
