export type PricingState = {
    current_state: string
    service: string
    tier: string
    base_price: number
    current_price: number
    discount_applied: number
    nudge_triggered: boolean
}

export type ValidationResult = {
    valid: boolean
    cleaned: string
    flags: string[]
}

const COMMITMENT_REGEX = /we guarantee|we promise|within \d+ days|100%|we will deliver|guaranteed|absolutely certain/i
const PRICE_REGEX = /\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?/g
const SCOPE_TERMS = ['cryptocurrency', 'medical', 'legal advice', 'immigration', 'visa', 'insurance', 'banking', 'human resources consultancy', 'event management', 'management consultancy', 'hr consulting']

/**
 * Validates and sanitizes the AI response against business rule guardrails.
 * 
 * @param response The raw AI output text
 * @param pricingState Optional current pricing state context
 * @returns Object with validation status, sanitized text, and triggered flags
 */
export function validateResponse(
    response: string,
    pricingState?: PricingState
): ValidationResult {
    let cleaned = response
    const flags: string[] = []

    // 1. Commitment Scanner
    if (COMMITMENT_REGEX.test(cleaned)) {
        flags.push('commitment_detected')
        cleaned += '\n\n*Subject to formal engagement terms.*'
    }

    // 2. Price Scanner
    const priceMatches = cleaned.match(PRICE_REGEX)
    if (priceMatches && priceMatches.length > 0) {
        let replacedPrices = false

        // Replace all prices individually based on validation
        cleaned = cleaned.replace(PRICE_REGEX, (match) => {
            // Remove $ and commas to parse number
            const numericValue = parseFloat(match.replace(/[\$,]/g, ''))

            if (!pricingState) {
                replacedPrices = true
                return '[pricing available upon qualification]'
            }

            // Check within 1% tolerance
            const currentPrice = pricingState.current_price
            const diff = Math.abs(numericValue - currentPrice)
            const tolerance = currentPrice * 0.01

            if (diff > tolerance) {
                replacedPrices = true
                return '[pricing available upon qualification]'
            }

            return match // Valid price
        })

        if (replacedPrices) {
            flags.push('unauthorized_price_replaced')
        }
    }

    // 3. Scope Scanner
    const lowercaseCleaned = cleaned.toLowerCase()
    const includesOutOfScope = SCOPE_TERMS.some(term => lowercaseCleaned.includes(term))
    if (includesOutOfScope) {
        flags.push('potential_scope_violation')
    }

    return {
        valid: flags.length === 0,
        cleaned,
        flags
    }
}

// Air Gap — Silicon Valley Shield
const AIR_GAP_TERMS = [
  /\buae\b/i, /\bdubai\b/i, /\bajman\b/i, /\bafza\b/i, /\bf\.?z\.?c\b/i,
  /\bfree\s*zone\b/i, /\briyadh\b/i, /\bmiddle\s*east\b/i, /\baed\b/i,
  /\bdirham\b/i, /\bemirati\b/i, /\bgulf\b/i, /\bgcc\b/i,
];

export function checkAirGap(input: string): { blocked: boolean; response: string } {
  const triggered = AIR_GAP_TERMS.some(regex => regex.test(input));
  if (triggered) {
    return {
      blocked: true,
      response: "I believe you may have the wrong firm. Quartermasters is a California-based web development and AI solutions company. We don't have any operations or affiliations in that region. How can I help you with your web or AI project?"
    };
  }
  return { blocked: false, response: '' };
}
