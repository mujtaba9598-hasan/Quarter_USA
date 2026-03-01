"use client";

import { type MirrorBlock } from "./MirrorRegistry";
import { ServiceComparison } from "./ServiceComparison";
import { PricingGrid } from "./PricingGrid";
import { ProcessTimeline } from "./ProcessTimeline";
import { MetricCard } from "./MetricCard";
import { WireframePreview } from "./WireframePreview";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { SiteAuditScanner } from "./SiteAuditScanner";
import { AuditReport } from "./AuditReport";
import { RebuildDiagnostic } from "./RebuildDiagnostic";
import { SubdomainPitch } from "./SubdomainPitch";
import { ExpansionEstimate } from "./ExpansionEstimate";

interface MirrorRendererProps {
    blocks: MirrorBlock[];
}

/**
 * Renders Magic Mirror blocks extracted from Q's response.
 * Each block maps to a live React component rendered inline in the chat.
 */
export function MirrorRenderer({ blocks }: MirrorRendererProps) {
    if (blocks.length === 0) return null;

    return (
        <>
            {blocks.map((block, i) => {
                switch (block.type) {
                    case "service-comparison":
                        return (
                            <ServiceComparison
                                key={`mirror-${i}`}
                                services={block.params.services as string[]}
                            />
                        );
                    case "pricing-grid":
                        return (
                            <PricingGrid
                                key={`mirror-${i}`}
                                service={block.params.service as string}
                            />
                        );
                    case "process-timeline":
                        return (
                            <ProcessTimeline
                                key={`mirror-${i}`}
                                service={block.params.service as string}
                            />
                        );
                    case "metric-card":
                        return (
                            <MetricCard
                                key={`mirror-${i}`}
                                metrics={block.params.metrics as { label: string; value: string; suffix?: string }[]}
                            />
                        );
                    case "feature-showcase":
                        return (
                            <PricingGrid
                                key={`mirror-${i}`}
                                service={block.params.service as string}
                            />
                        );
                    case "wireframe-preview":
                        return (
                            <WireframePreview
                                key={`mirror-${i}`}
                                service={block.params.service as string}
                            />
                        );
                    case "architecture-diagram":
                        return (
                            <ArchitectureDiagram
                                key={`mirror-${i}`}
                                variant={block.params.variant as "subdomain" | "zero-knowledge" | "system"}
                            />
                        );
                    case "site-audit-scanner":
                        return (
                            <SiteAuditScanner
                                key={`mirror-${i}`}
                                url={block.params.url as string}
                            />
                        );
                    case "audit-report":
                        return (
                            <AuditReport
                                key={`mirror-${i}`}
                                data={block.params.data as any}
                            />
                        );
                    case "rebuild-diagnostic":
                        return (
                            <RebuildDiagnostic
                                key={`mirror-${i}`}
                                url={block.params.url as string}
                            />
                        );
                    case "subdomain-pitch":
                        return (
                            <SubdomainPitch
                                key={`mirror-${i}`}
                                domain={block.params.domain as string | undefined}
                            />
                        );
                    case "expansion-estimate":
                        return (
                            <ExpansionEstimate
                                key={`mirror-${i}`}
                                featureCount={block.params.featureCount as number | undefined}
                                complexity={block.params.complexity as any}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </>
    );
}
