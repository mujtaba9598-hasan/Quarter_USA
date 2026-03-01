'use client';

import React, { useRef, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, MeshPhysicalMaterial, Color } from 'three';
import type { PersonaType } from '@/lib/ai/discovery-flow';

// Persona color palettes
const PERSONA_COLORS: Record<string, { emissive: string; point: string }> = {
    default:    { emissive: '#C15A2C', point: '#C15A2C' },   // Burnt Copper
    strategist: { emissive: '#D4A017', point: '#F5C542' },   // Gold / Amber
    architect:  { emissive: '#1E90FF', point: '#00BFFF' },   // Blue / Cyan
    operator:   { emissive: '#2ECC71', point: '#27AE60' },   // Green / Emerald
};

interface QAvatar3DProps {
    chatState: 'idle' | 'thinking' | 'speaking' | 'presenting';
    persona?: PersonaType;
    className?: string;
}

function CopperQFallback({ className = '', persona }: { className?: string; persona?: PersonaType }) {
    const colors = PERSONA_COLORS[persona || 'default'];
    return (
        <div
            className={`flex items-center justify-center rounded-full ${className}`}
            style={{
                background: `linear-gradient(135deg, ${colors.emissive}33, ${colors.emissive}0D)`,
                border: `1.5px solid ${colors.emissive}66`,
            }}
        >
            <span
                style={{
                    color: colors.emissive,
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '50%',
                    lineHeight: 1,
                }}
            >
                Q
            </span>
        </div>
    );
}

class WebGLErrorBoundary extends Component<
    { children: React.ReactNode; fallback: React.ReactNode },
    { hasError: boolean }
> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}

function Polyhedron({
    chatState,
    persona,
}: {
    chatState: 'idle' | 'thinking' | 'speaking' | 'presenting';
    persona?: PersonaType;
}) {
    const meshRef = useRef<Mesh>(null);
    const materialRef = useRef<MeshPhysicalMaterial>(null);
    const targetColor = useRef(new Color(PERSONA_COLORS.default.emissive));

    useFrame((state, rawDelta) => {
        const delta = Math.min(rawDelta, 0.1);

        if (!meshRef.current || !materialRef.current) return;

        const time = state.clock.getElapsedTime();

        // Smooth color transition toward target persona color
        const colors = PERSONA_COLORS[persona || 'default'];
        targetColor.current.set(colors.emissive);
        materialRef.current.emissive.lerp(targetColor.current, 3 * delta);

        let rotSpeed = 0.3;
        let emissiveIntensity = 1.0;

        switch (chatState) {
            case 'idle':
                rotSpeed = 0.3;
                const idleScale = 1.0 + Math.sin(time * 0.5) * 0.02;
                meshRef.current.scale.lerp({ x: idleScale, y: idleScale, z: idleScale } as any, 5 * delta);
                emissiveIntensity = 0.5 + Math.sin(time * 0.5) * 0.2;
                break;
            case 'thinking':
                rotSpeed = 1.2;
                meshRef.current.scale.set(
                    1.0 + Math.sin(time * 15) * 0.03,
                    1.0 + Math.cos(time * 14) * 0.03,
                    1.0 + Math.sin(time * 13) * 0.03
                );
                emissiveIntensity = 1.5 + Math.sin(time * 4) * 0.5;
                break;
            case 'speaking':
                rotSpeed = 0.6;
                const speakScale = 1.0 + Math.abs(Math.sin(time * Math.PI * 4)) * 0.08;
                meshRef.current.scale.lerp({ x: speakScale, y: speakScale, z: speakScale } as any, 8 * delta);
                emissiveIntensity = 1.0 + Math.abs(Math.sin(time * Math.PI * 4)) * 1.5;
                break;
            case 'presenting':
                rotSpeed = 0.15;
                meshRef.current.scale.lerp({ x: 1.15, y: 1.15, z: 1.15 } as any, 5 * delta);
                emissiveIntensity = 2.0;
                break;
        }

        meshRef.current.rotation.y += rotSpeed * delta;
        meshRef.current.rotation.x += (rotSpeed * 0.5) * delta;
        materialRef.current.emissiveIntensity += (emissiveIntensity - materialRef.current.emissiveIntensity) * 5 * delta;
    });

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
                ref={materialRef}
                color="#0A1628"
                emissive="#C15A2C"
                emissiveIntensity={1}
                roughness={0.1}
                metalness={0.3}
                transmission={0.6}
                thickness={1.5}
            />
        </mesh>
    );
}

function PersonaPointLight({ persona }: { persona?: PersonaType }) {
    const lightRef = useRef<any>(null);
    const targetColor = useRef(new Color(PERSONA_COLORS.default.point));

    useFrame((_state, rawDelta) => {
        const delta = Math.min(rawDelta, 0.1);
        if (!lightRef.current) return;
        const colors = PERSONA_COLORS[persona || 'default'];
        targetColor.current.set(colors.point);
        lightRef.current.color.lerp(targetColor.current, 3 * delta);
    });

    return (
        <pointLight ref={lightRef} position={[5, 5, 5]} color="#C15A2C" intensity={0.8} />
    );
}

export function QAvatar3D({ chatState, persona, className = '' }: QAvatar3DProps) {
    return (
        <div className={className}>
            <WebGLErrorBoundary fallback={<CopperQFallback className={className} persona={persona} />}>
                <React.Suspense fallback={<CopperQFallback className={className} persona={persona} />}>
                    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ antialias: true, alpha: true }}>
                        <ambientLight intensity={0.4} />
                        <PersonaPointLight persona={persona} />
                        <Polyhedron chatState={chatState} persona={persona} />
                    </Canvas>
                </React.Suspense>
            </WebGLErrorBoundary>
        </div>
    );
}
