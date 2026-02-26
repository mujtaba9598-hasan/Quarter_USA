"use client";

import { Code2 } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import GlareHover from "@/components/ui/GlareHover";
import { GlitchEffect } from "@/components/ui/SectorEffects";
import { WireframePattern } from "@/components/ui/HexagonalPattern";

interface WebDevelopmentClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function WebDevelopmentClient({ capabilities }: WebDevelopmentClientProps) {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <GlareHover glareColor="#10B981" borderRadius="16px" background="transparent" width="100%" height="auto">
            <GlitchEffect>{children}</GlitchEffect>
        </GlareHover>
    );

    return (
        <ServicePageLayout
            overline="Web Development"
            title="Web Development."
            subtitle="Full-Stack Applications Built to Scale."
            description="Enterprise-grade web applications powered by Next.js, React, and TypeScript. From single-page apps to complex platforms, we build fast, secure, and maintainable software."
            accent="var(--sector-it)"
            glow="rgba(16, 185, 129, 0.15)"
            icon={Code2}
            metaphor="The Forge"
            capabilities={capabilities}
            CardWrapper={Wrapper}
            backgroundPattern={<WireframePattern />}
            sectorKey="it"
            visualType="it"
        />
    );
}
