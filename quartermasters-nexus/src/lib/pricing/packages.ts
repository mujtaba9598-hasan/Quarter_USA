export type PackageDetails = {
    service: string
    tier: string
    basePrice: number
    description: string
    deliverables: string[]
    timeline: string
}

export const PRICING_TABLE: Record<string, Record<string, PackageDetails>> = {
    'tech-rnd': {
        'express': {
            service: 'tech-rnd',
            tier: 'express',
            basePrice: 1600,
            description: 'Initial technology stack audit and feasibility study.',
            deliverables: ['Current Architecture Review', 'Competitor Tech Analysis', 'Feasibility Report'],
            timeline: '2 weeks'
        },
        'standard': {
            service: 'tech-rnd',
            tier: 'standard',
            basePrice: 20000,
            description: 'Prototype design and technology roadmap development.',
            deliverables: ['Proof of Concept Design', 'Technology Selection Matrix', 'Development Roadmap', 'Security Assessment'],
            timeline: '4 weeks'
        },
        'premium': {
            service: 'tech-rnd',
            tier: 'premium',
            basePrice: 42000,
            description: 'Advanced R&D planning, AI integration strategy, and scalability architecture.',
            deliverables: ['AI/ML Integration Plan', 'Cloud Architecture Design', 'Data Pipeline Strategy', 'Innovation Workshop'],
            timeline: '2-3 months'
        },
        'enterprise': {
            service: 'tech-rnd',
            tier: 'enterprise',
            basePrice: 90000,
            description: 'End-to-end proprietary technology development advisory and outsourced CTO.',
            deliverables: ['Custom Algorithm Design Review', 'IP Strategy Alignment', 'Vendor Management', 'Fractional CTO Engagement'],
            timeline: '6+ months'
        }
    }
}

/**
 * Retrieves package details from the PRICING_TABLE.
 */
export function getPackageDetails(service: string, tier: string): PackageDetails | null {
    if (PRICING_TABLE[service] && PRICING_TABLE[service][tier]) {
        return PRICING_TABLE[service][tier]
    }
    return null
}
