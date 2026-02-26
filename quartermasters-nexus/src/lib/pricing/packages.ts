export type PackageDetails = {
    service: string
    tier: string
    basePrice: number
    description: string
    deliverables: string[]
    timeline: string
}

export const PRICING_TABLE: Record<string, Record<string, PackageDetails>> = {
    'web-development': {
        'express': {
            service: 'web-development',
            tier: 'express',
            basePrice: 5000,
            description: 'Multi-page marketing site with responsive design and CMS.',
            deliverables: ['Multi-Page Website', 'Responsive Design', 'CMS Integration', 'SEO Setup', 'Vercel Deployment'],
            timeline: '2 weeks'
        },
        'standard': {
            service: 'web-development',
            tier: 'standard',
            basePrice: 15000,
            description: 'Full-stack application with authentication, database, and API integrations.',
            deliverables: ['Full-Stack Application', 'Authentication System', 'Database Architecture', 'API Integrations', 'CI/CD Pipeline', 'Analytics'],
            timeline: '4 weeks'
        },
        'premium': {
            service: 'web-development',
            tier: 'premium',
            basePrice: 35000,
            description: 'Enterprise platform with real-time features, AI integration, and multi-region deployment.',
            deliverables: ['Enterprise Platform', 'Real-time Features', 'AI Integration', 'Multi-Region Deployment', 'Load Testing', 'Security Audit'],
            timeline: '8 weeks'
        },
        'enterprise': {
            service: 'web-development',
            tier: 'enterprise',
            basePrice: 75000,
            description: 'Complex SaaS platform with custom infrastructure, fractional CTO, and ongoing engineering.',
            deliverables: ['SaaS Platform Architecture', 'Custom Infrastructure', 'Fractional CTO Engagement', 'Dedicated Engineering Team', 'SOC 2 Preparation', 'Ongoing Support'],
            timeline: '12+ weeks'
        }
    },
    'website-redesign': {
        'express': {
            service: 'website-redesign',
            tier: 'express',
            basePrice: 5000,
            description: 'Visual refresh with modern design system on existing architecture.',
            deliverables: ['UX Audit Report', 'Visual Redesign', 'Responsive Overhaul', 'Performance Optimization'],
            timeline: '2 weeks'
        },
        'standard': {
            service: 'website-redesign',
            tier: 'standard',
            basePrice: 12000,
            description: 'Full platform migration from legacy CMS to modern Next.js stack.',
            deliverables: ['Platform Migration', 'Content Transfer', 'URL Redirect Mapping', 'SEO Preservation', 'New Design System', 'Analytics Setup'],
            timeline: '4 weeks'
        },
        'premium': {
            service: 'website-redesign',
            tier: 'premium',
            basePrice: 25000,
            description: 'Enterprise redesign with custom components, AI features, and conversion optimization.',
            deliverables: ['Enterprise Redesign', 'Custom Component Library', 'AI Chat Integration', 'A/B Testing Framework', 'Conversion Optimization', 'Performance Guarantee'],
            timeline: '6 weeks'
        },
        'enterprise': {
            service: 'website-redesign',
            tier: 'enterprise',
            basePrice: 50000,
            description: 'Full digital transformation with multi-language support and ongoing optimization.',
            deliverables: ['Digital Transformation', 'Multi-Language Support', 'Custom CMS', 'Ongoing A/B Testing', 'Dedicated Account Manager', 'Quarterly Architecture Reviews'],
            timeline: '10+ weeks'
        }
    },
    'feature-injection': {
        'express': {
            service: 'feature-injection',
            tier: 'express',
            basePrice: 3000,
            description: 'Single feature integration into existing codebase.',
            deliverables: ['Feature Implementation', 'Integration Testing', 'Documentation', 'Deployment Support'],
            timeline: '1 week'
        },
        'standard': {
            service: 'feature-injection',
            tier: 'standard',
            basePrice: 8000,
            description: 'Multi-feature integration with API connections and auth hardening.',
            deliverables: ['Multiple Feature Implementations', 'API Integrations', 'Security Hardening', 'Automated Testing', 'CI/CD Updates'],
            timeline: '2-3 weeks'
        },
        'premium': {
            service: 'feature-injection',
            tier: 'premium',
            basePrice: 20000,
            description: 'Complex feature suite with AI capabilities, real-time systems, and analytics.',
            deliverables: ['AI Feature Integration', 'Real-time Systems', 'Custom Dashboard', 'Performance Monitoring', 'Load Testing', 'Documentation'],
            timeline: '4-6 weeks'
        },
        'enterprise': {
            service: 'feature-injection',
            tier: 'enterprise',
            basePrice: 40000,
            description: 'Enterprise feature platform with ongoing development and dedicated engineering.',
            deliverables: ['Feature Platform Architecture', 'Microservices Integration', 'Dedicated Engineer', 'Ongoing Feature Development', 'Priority Support', 'Monthly Reviews'],
            timeline: '8+ weeks'
        }
    },
    'express-build': {
        'express': {
            service: 'express-build',
            tier: 'express',
            basePrice: 2500,
            description: 'High-converting landing page with lead capture. 72-hour delivery.',
            deliverables: ['Landing Page', 'Lead Capture Form', 'Mobile Optimization', 'Analytics Integration', 'Vercel Deployment'],
            timeline: '72 hours'
        },
        'standard': {
            service: 'express-build',
            tier: 'standard',
            basePrice: 5000,
            description: 'Multi-page campaign site or portfolio with CMS.',
            deliverables: ['Campaign Microsite', 'CMS Integration', 'Responsive Design', 'SEO Setup', 'Social Media Tags'],
            timeline: '1 week'
        },
        'premium': {
            service: 'express-build',
            tier: 'premium',
            basePrice: 10000,
            description: 'Functional MVP with authentication, database, and core business logic.',
            deliverables: ['MVP Application', 'User Authentication', 'Database Setup', 'Core Business Logic', 'Deployment Pipeline', 'Feedback Integration'],
            timeline: '2 weeks'
        },
        'enterprise': {
            service: 'express-build',
            tier: 'enterprise',
            basePrice: 20000,
            description: 'Production-ready rapid build with AI features and scalable architecture.',
            deliverables: ['Production Application', 'AI Integration', 'Scalable Architecture', 'Automated Testing', 'Monitoring Setup', 'Launch Support'],
            timeline: '3-4 weeks'
        }
    },
    'ai-model-training': {
        'express': {
            service: 'ai-model-training',
            tier: 'express',
            basePrice: 15000,
            description: 'Prompt engineering framework and RAG pipeline for existing knowledge base.',
            deliverables: ['Prompt Engineering Framework', 'RAG Pipeline Setup', 'Evaluation Metrics', 'Documentation'],
            timeline: '2 weeks'
        },
        'standard': {
            service: 'ai-model-training',
            tier: 'standard',
            basePrice: 30000,
            description: 'Custom model fine-tuning on proprietary data with evaluation pipeline.',
            deliverables: ['Custom Fine-Tuned Model', 'Training Data Pipeline', 'Evaluation Framework', 'A/B Testing Setup', 'Deployment Guide'],
            timeline: '4-6 weeks'
        },
        'premium': {
            service: 'ai-model-training',
            tier: 'premium',
            basePrice: 60000,
            description: 'Multi-agent AI system with tool-use, autonomous workflows, and monitoring.',
            deliverables: ['Multi-Agent Architecture', 'Tool-Use Integration', 'Autonomous Workflows', 'Hallucination Detection', 'Performance Monitoring', 'Human-in-the-Loop Controls'],
            timeline: '8-10 weeks'
        },
        'enterprise': {
            service: 'ai-model-training',
            tier: 'enterprise',
            basePrice: 120000,
            description: 'Enterprise AI platform with dedicated ML engineering and ongoing model optimization.',
            deliverables: ['Enterprise AI Platform', 'Dedicated ML Engineer', 'Continuous Model Training', 'Custom Evaluation Suite', 'SOC 2 Compliance', 'Quarterly Model Reviews'],
            timeline: '12+ weeks'
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
