"use client";

import { Zap } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import GlareHover from "@/components/ui/GlareHover";
import { GlitchEffect } from "@/components/ui/SectorEffects";
import { WireframePattern } from "@/components/ui/HexagonalPattern";

interface ExpressBuildClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function ExpressBuildClient({ capabilities }: ExpressBuildClientProps) {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <GlareHover glareColor="#EF4444" borderRadius="16px" background="transparent" width="100%" height="auto">
            <GlitchEffect>{children}</GlitchEffect>
        </GlareHover>
    );

    return (
        <ServicePageLayout
            overline="Express Build"
            title="Express Build."
            subtitle="Ship in Days, Not Months."
            description="Landing pages in 72 hours. MVPs in a week. Campaign sites on demand. When speed is the priority, we deliver production-ready code at startup velocity."
            accent="var(--sector-it)"
            glow="rgba(239, 68, 68, 0.15)"
            icon={Zap}
            metaphor="The Forge"
            capabilities={capabilities}
            CardWrapper={Wrapper}
            backgroundPattern={<WireframePattern />}
            sectorKey="it"
            visualType="it"
        />
    );
}
