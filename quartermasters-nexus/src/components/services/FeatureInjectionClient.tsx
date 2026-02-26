"use client";

import { Puzzle } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import GlareHover from "@/components/ui/GlareHover";
import { GlitchEffect } from "@/components/ui/SectorEffects";
import { WireframePattern } from "@/components/ui/HexagonalPattern";

interface FeatureInjectionClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function FeatureInjectionClient({ capabilities }: FeatureInjectionClientProps) {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <GlareHover glareColor="#8B5CF6" borderRadius="16px" background="transparent" width="100%" height="auto">
            <GlitchEffect>{children}</GlitchEffect>
        </GlareHover>
    );

    return (
        <ServicePageLayout
            overline="Feature Injection"
            title="Feature Injection."
            subtitle="Add Capabilities Without Rebuilding."
            description="Inject new features — AI chatbots, payment systems, real-time dashboards, authentication — directly into your existing codebase. Minimal disruption, maximum impact."
            accent="var(--sector-it)"
            glow="rgba(139, 92, 246, 0.15)"
            icon={Puzzle}
            metaphor="The Forge"
            capabilities={capabilities}
            CardWrapper={Wrapper}
            backgroundPattern={<WireframePattern />}
            sectorKey="it"
            visualType="it"
        />
    );
}
