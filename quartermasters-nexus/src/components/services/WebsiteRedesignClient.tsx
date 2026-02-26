"use client";

import { RefreshCw } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import GlareHover from "@/components/ui/GlareHover";
import { GlitchEffect } from "@/components/ui/SectorEffects";
import { WireframePattern } from "@/components/ui/HexagonalPattern";

interface WebsiteRedesignClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function WebsiteRedesignClient({ capabilities }: WebsiteRedesignClientProps) {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <GlareHover glareColor="#F59E0B" borderRadius="16px" background="transparent" width="100%" height="auto">
            <GlitchEffect>{children}</GlitchEffect>
        </GlareHover>
    );

    return (
        <ServicePageLayout
            overline="Website Redesign"
            title="Website Redesign."
            subtitle="Transform Legacy Sites into Modern Experiences."
            description="Migrate from outdated platforms to blazing-fast modern architecture. Zero downtime, preserved SEO rankings, and a design language that converts."
            accent="var(--sector-it)"
            glow="rgba(245, 158, 11, 0.15)"
            icon={RefreshCw}
            metaphor="The Forge"
            capabilities={capabilities}
            CardWrapper={Wrapper}
            backgroundPattern={<WireframePattern />}
            sectorKey="it"
            visualType="it"
        />
    );
}
