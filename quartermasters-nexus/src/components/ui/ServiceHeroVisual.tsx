"use client";

import React from "react";
import "./ServiceHeroVisual.css";

interface ServiceHeroVisualProps {
    type: "tech" | "it";
    accent: string;
}

export default function ServiceHeroVisual({ type, accent }: ServiceHeroVisualProps) {
    switch (type) {
        case "tech":
            return <TechHero accent={accent} />;
        case "it":
            return <ITHero accent={accent} />;
        default:
            return null;
    }
}

// TECHNOLOGY: The Observatory
function TechHero({ accent }: { accent: string }) {
    const stars = [
        { id: 0, x: 80, y: 60 }, { id: 1, x: 150, y: 40 }, { id: 2, x: 250, y: 50 }, { id: 3, x: 340, y: 70 },
        { id: 4, x: 60, y: 120 }, { id: 5, x: 130, y: 100 }, { id: 6, x: 200, y: 80 }, { id: 7, x: 280, y: 110 }, { id: 8, x: 350, y: 140 },
        { id: 9, x: 100, y: 170 }, { id: 10, x: 220, y: 160 }, { id: 11, x: 310, y: 190 }
    ];

    const edges = [
        [0, 1], [1, 2], [2, 3], [1, 6], [6, 2], [4, 5], [5, 6], [6, 7], [7, 8], [4, 9], [9, 10], [10, 7], [10, 11], [11, 8], [5, 1]
    ];

    const particles = [
        { path: [1, 6], dur: "3s", delay: 0 },
        { path: [6, 2], dur: "3s", delay: 0.5 },
        { path: [4, 5], dur: "3s", delay: 1.0 },
        { path: [5, 6], dur: "3s", delay: 1.5 },
        { path: [10, 7], dur: "3s", delay: 2.0 },
        { path: [11, 8], dur: "3s", delay: 2.5 },
    ];

    return (
        <div className="w-full h-[300px] relative overflow-hidden pointer-events-none">
            <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">

                {/* Binary Rain */}
                {[90, 200, 310].map((x, i) => (
                    <g key={`rain-${i}`} fontSize="8" fill={accent} fillOpacity="0.05" fontFamily="monospace">
                        {Array.from({ length: 8 }).map((_, j) => (
                            <text key={`r-${i}-${j}`} x={x} y={0} style={{ animation: `shv-slide-up 10s linear infinite ${(i * 2) + j}s`, opacity: 0 }}>
                                {Math.random() > 0.5 ? "1" : "0"}
                            </text>
                        ))}
                    </g>
                ))}

                <defs>
                    <linearGradient id="tech-beam-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={accent} stopOpacity="0" />
                        <stop offset="100%" stopColor={accent} stopOpacity="0.08" />
                    </linearGradient>
                </defs>

                {/* Scanning Beam */}
                <g style={{ transformOrigin: `200px 230px` }} className="shv-pendulum">
                    <polygon points="200,230 100,0 300,0" fill="url(#tech-beam-grad)" />
                </g>

                {/* Constellation Edges */}
                <g stroke={accent} strokeOpacity="0.15" strokeWidth="1">
                    {edges.map((e, i) => {
                        const p1 = stars[e[0]];
                        const p2 = stars[e[1]];
                        return <path key={`edge-${i}`} id={`tech-path-${i}`} d={`M${p1.x},${p1.y} L${p2.x},${p2.y}`} fill="none" />;
                    })}
                </g>

                {/* Data Particles */}
                {particles.map((p, i) => {
                    const p1 = stars[p.path[0]];
                    const p2 = stars[p.path[1]];
                    return (
                        <circle key={`particle-${i}`} r="2" fill={accent}>
                            <animateMotion dur={p.dur} repeatCount="indefinite" begin={`${p.delay}s`} path={`M${p1.x},${p1.y} L${p2.x},${p2.y}`} />
                        </circle>
                    );
                })}

                {/* Constellation Nodes */}
                {stars.map((s) => (
                    <g key={`star-${s.id}`}>
                        <circle cx={s.x} cy={s.y} r="6" fill={accent} fillOpacity="0.2" />
                        <circle cx={s.x} cy={s.y} r="3" fill={accent} />
                    </g>
                ))}

                {/* Dome Silhouette */}
                <clipPath id="dome-clip">
                    <rect x="0" y="230" width="400" height="70" />
                </clipPath>
                <g clipPath="url(#dome-clip)">
                    <ellipse cx="200" cy="300" rx="120" ry="70" fill={accent} fillOpacity="0.08" stroke={accent} strokeOpacity="0.2" strokeWidth="1.5" />
                    <rect x="198" y="230" width="4" height="20" fill={accent} fillOpacity="0.4" />
                </g>

            </svg>
        </div>
    );
}

// IT SERVICES: The Forge
function ITHero({ accent }: { accent: string }) {
    const cx = 200;

    return (
        <div className="w-full h-[300px] relative overflow-hidden pointer-events-none">
            <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">

                {/* Cooling Stream */}
                <path d="M0,275 Q50,265 100,275 T200,275 T300,275 T400,275" fill="none" stroke={accent} strokeOpacity="0.15" strokeWidth="2" strokeDasharray="10 5" className="shv-flow" />

                {/* Circuit Traces Radiating */}
                <g fill="none" stroke={accent} strokeOpacity="0.1" strokeWidth="1">
                    <path d={`M${cx - 20},220 L100,220 L100,100 L40,100`} />
                    <path d={`M${cx + 20},220 L300,220 L300,80 L360,80`} />
                    <path d={`M${cx - 10},240 L120,240 L120,290 L80,290`} />
                    <path d={`M${cx + 10},240 L280,240 L280,290 L320,290`} />
                    <path d={`M${cx - 30},200 L60,200 L60,40 L20,40`} />
                    <path d={`M${cx + 30},200 L340,200 L340,60 L380,60`} />
                </g>
                {/* Circuit Nodes */}
                <g fill={accent} fillOpacity="0.2">
                    <circle cx="100" cy="100" r="2" />
                    <circle cx="300" cy="80" r="2" />
                    <circle cx="120" cy="290" r="2" />
                    <circle cx="280" cy="290" r="2" />
                    <circle cx="60" cy="40" r="2" />
                    <circle cx="340" cy="60" r="2" />
                </g>

                {/* Anvil */}
                <g fill={accent} fillOpacity="0.2" stroke={accent} strokeOpacity="0.4" strokeWidth="1.5">
                    <path d={`M${cx - 30},200 Q${cx},198 ${cx + 30},200 L${cx + 20},240 L${cx - 20},240 Z`} />
                    <polygon points={`${cx - 30},200 ${cx - 50},210 ${cx - 30},220`} />
                    <rect x={cx - 25} y={240} width="50" height="15" rx="2" />
                </g>

                {/* The Hammer */}
                <g style={{ transformOrigin: `${cx}px 120px` }} className="shv-hammer-strike">
                    <line x1={cx} y1="120" x2={cx} y2="180" stroke={accent} strokeWidth="3" />
                    <rect x={cx - 15} y="180" width="30" height="15" rx="2" fill={accent} />
                </g>

                {/* Spark Burst (Synced with Hammer) */}
                <g style={{ transformOrigin: `${cx}px 200px` }} className="shv-spark-burst">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <circle
                            key={`spark-${i}`}
                            cx={cx + Math.cos(i * 45 * Math.PI / 180) * 30}
                            cy={200 + Math.sin(i * 45 * Math.PI / 180) * 30}
                            r="2"
                            fill={accent}
                        />
                    ))}
                </g>

                {/* Code Brackets rising */}
                {[-30, 0, 30].map((dx, i) => (
                    <text
                        key={`code-${i}`}
                        x={cx + dx - 10}
                        y={200}
                        fontSize="14"
                        fontWeight="bold"
                        fill={accent}
                        style={{ animation: `shv-code-rise 4s infinite linear ${i * 1.3}s`, opacity: 0 }}
                    >
                        {"< />"}
                    </text>
                ))}

            </svg>
        </div>
    );
}
