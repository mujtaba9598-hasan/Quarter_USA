"use client";

import { Brain } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import GlareHover from "@/components/ui/GlareHover";
import { GlitchEffect } from "@/components/ui/SectorEffects";
import { WireframePattern } from "@/components/ui/HexagonalPattern";

interface AIModelTrainingClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function AIModelTrainingClient({ capabilities }: AIModelTrainingClientProps) {
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <GlareHover glareColor="#3B82C4" borderRadius="16px" background="transparent" width="100%" height="auto">
            <GlitchEffect>{children}</GlitchEffect>
        </GlareHover>
    );

    return (
        <ServicePageLayout
            overline="Custom AI Model Training"
            title="AI Model Training."
            subtitle="Your Data. Your Model. Your Advantage."
            description="Fine-tune language models on your proprietary data. Build RAG pipelines, prompt engineering frameworks, and AI agent architectures that give you capabilities no off-the-shelf solution can match."
            accent="var(--sector-tech)"
            glow="rgba(59, 130, 196, 0.15)"
            icon={Brain}
            metaphor="The Observatory"
            capabilities={capabilities}
            CardWrapper={Wrapper}
            backgroundPattern={<WireframePattern />}
            sectorKey="tech"
            visualType="tech"
        />
    );
}
