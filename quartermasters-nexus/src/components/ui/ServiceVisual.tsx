"use client";

import React from "react";
import "./ServiceVisual.css";

interface ServiceVisualProps {
    type: "tech" | "it";
    accent: string;
}

export default function ServiceVisual({ type, accent }: ServiceVisualProps) {
    switch (type) {
        case "tech":
            return <TechVisual accent={accent} />;
        case "it":
            return <ITVisual accent={accent} />;
        default:
            return null;
    }
}

// TECHNOLOGY: Circuit Pulse Board
function TechVisual({ accent }: { accent: string }) {
    // Main path points: (20,50) -> (60,50) -> (60,20) -> (140,20) -> (140,80) -> (180,80)
    const mainPath = "M20,50 L60,50 L60,20 L140,20 L140,80 L180,80";

    // Nodes at key junctions
    const nodes = [
        { cx: 60, cy: 50, delay: 0.8 },
        { cx: 60, cy: 20, delay: 1.2 },
        { cx: 140, cy: 20, delay: 2.8 },
        { cx: 140, cy: 80, delay: 4.0 },
    ];

    return (
        <div className="w-full h-[100px] relative overflow-hidden pointer-events-none">
            <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">

                {/* Decoration circuits */}
                <g stroke={accent} strokeOpacity="0.15" strokeWidth="1.5" fill="none">
                    <path d={mainPath} />
                    <path d="M40,20 L40,70 L80,70" />
                    <path d="M120,50 L180,50" />
                    <path d="M100,20 L100,50" />
                </g>

                {/* The traveling pulse */}
                <circle r="3" fill={accent}>
                    <animateMotion dur="5s" repeatCount="indefinite" path={mainPath} />
                </circle>

                {/* Nodes and their ping effect */}
                {nodes.map((n, i) => (
                    <g key={`tech-node-${i}`}>
                        {/* Base diamond */}
                        <rect
                            x={n.cx - 3}
                            y={n.cy - 3}
                            width="6"
                            height="6"
                            fill={accent}
                            opacity="0.5"
                            transform={`rotate(45 ${n.cx} ${n.cy})`}
                        />
                        {/* Flash animation */}
                        <rect
                            x={n.cx - 3}
                            y={n.cy - 3}
                            width="6"
                            height="6"
                            fill={accent}
                            opacity="0"
                            transform={`rotate(45 ${n.cx} ${n.cy})`}
                        >
                            <animate
                                attributeName="opacity"
                                values="0; 1; 0"
                                dur="5s"
                                keyTimes={`0; ${n.delay / 5}; ${(n.delay + 0.6) / 5}`}
                                repeatCount="indefinite"
                            />
                        </rect>
                        {/* Expanding ping ring */}
                        <circle cx={n.cx} cy={n.cy} r="3" fill={accent} style={{ animation: `ping-ring 5s infinite ease-out ${n.delay}s`, transformOrigin: `${n.cx}px ${n.cy}px` }} opacity="0" />
                    </g>
                ))}
            </svg>
        </div>
    );
}

// IT SERVICES: Code Deploy Pipeline
function ITVisual({ accent }: { accent: string }) {
    return (
        <div className="w-full h-[100px] relative overflow-hidden pointer-events-none">
            <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">

                {/* Stage 1: Code Block */}
                <g>
                    {[30, 45, 25, 40].map((w, i) => (
                        <rect
                            key={`code-${i}`}
                            x="20"
                            y={35 + i * 8}
                            width={w}
                            height="2"
                            fill={accent}
                            style={{ animation: `blink-line 1.5s infinite ease-in-out ${i * 0.2}s` }}
                        />
                    ))}
                </g>

                {/* Sub-Flow Arrows 1 -> 2 */}
                <g fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {[0, 1, 2].map(i => (
                        <polyline
                            key={`chev1-${i}`}
                            points="65,46 69,50 65,54"
                            style={{ animation: `flowRight 1.5s infinite ease-in-out ${i * 0.2}s` }}
                        />
                    ))}
                </g>

                {/* Stage 2: Build Hexagon */}
                <g transform="translate(100, 50)" className="sv-rotate-hex">
                    {/* Hexagon polygon points (r=15 approx) */}
                    <polygon
                        points="0,-15 13,-7.5 13,7.5 0,15 -13,7.5 -13,-7.5"
                        fill="none"
                        stroke={accent}
                        strokeWidth="1.5"
                    />
                </g>

                {/* Sub-Flow Arrows 2 -> 3 */}
                <g fill="none" stroke={accent} strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {[0, 1, 2].map(i => (
                        <polyline
                            key={`chev2-${i}`}
                            points="125,46 129,50 125,54"
                            style={{ animation: `flowRight 1.5s infinite ease-in-out ${0.6 + i * 0.2}s` }}
                        />
                    ))}
                </g>

                {/* Stage 3: Browser Window */}
                <g transform="translate(145, 32)">
                    <rect x="0" y="0" width="45" height="35" rx="3" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="1" />
                    <line x1="0" y1="10" x2="45" y2="10" stroke={accent} strokeOpacity="0.4" strokeWidth="1" />
                    <circle cx="6" cy="5" r="1.5" fill={accent} fillOpacity="0.4" />
                    <circle cx="11" cy="5" r="1.5" fill={accent} fillOpacity="0.4" />
                    <circle cx="16" cy="5" r="1.5" fill={accent} fillOpacity="0.4" />

                    {/* Animated payload filling the window */}
                    <rect x="0" y="35" width="45" height="25" fill={accent} fillOpacity="0.3" transform="scale(1, -1)">
                        <animate
                            attributeName="height"
                            values="0; 25; 25; 0"
                            keyTimes="0; 0.2; 0.8; 1"
                            dur="4s"
                            repeatCount="indefinite"
                        />
                    </rect>
                </g>

            </svg>
        </div>
    );
}
