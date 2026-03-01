'use client';

import React, { useRef, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, MeshPhysicalMaterial, Color } from 'three';
import type { PersonaType } from '@/lib/ai/discovery-flow';

// Persona visual profiles: color + geometry + material
const PERSONA_PROFILES: Record<string, {
    emissive: string; point: string;
    geometry: 'icosahedron' | 'dodecahedron' | 'octahedron';
    detail: number;
    roughness: number; metalness: number; transmission: number; thickness: number;
    wireframe: boolean;
}> = {
    default: {
        emissive: '#C15A2C', point: '#C15A2C',
        geometry: 'icosahedron', detail: 0,
        roughness: 0.1, metalness: 0.3, transmission: 0.6, thickness: 1.5,
        wireframe: false,
    },
    strategist: {
        emissive: '#D4A017', point: '#F5C542',
        geometry: 'dodecahedron', detail: 0,
        roughness: 0.05, metalness: 0.7, transmission: 0.4, thickness: 2.0,
        wireframe: false,
    },
    architect: {
        emissive: '#1E90FF', point: '#00BFFF',
        geometry: 'icosahedron', detail: 1,
        roughness: 0.15, metalness: 0.2, transmission: 0.7, thickness: 1.0,
        wireframe: false,
    },
    operator: {
        emissive: '#2ECC71', point: '#27AE60',
        geometry: 'octahedron', detail: 0,
        roughness: 0.02, metalness: 0.5, transmission: 0.5, thickness: 1.2,
        wireframe: false,
    },
};

interface QAvatar3DProps {
    chatState: 'idle' | 'thinking' | 'speaking' | 'presenting';
    persona?: PersonaType;
    className?: string;
}

function CopperQFallback({ className = '', persona }: { className?: string; persona?: PersonaType }) {
    const profile = PERSONA_PROFILES[persona || 'default'];
    return (
        <div
            className={`flex items-center justify-center rounded-full ${className}`}
            style={{
                background: `linear-gradient(135deg, ${profile.emissive}33, ${profile.emissive}0D)`,
                border: `1.5px solid ${profile.emissive}66`,
            }}
        >
            <span
                style={{
                    color: profile.emissive,
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

function PersonaGeometry({ geometry, detail }: { geometry: string; detail: number }) {
    switch (geometry) {
        case 'dodecahedron': return <dodecahedronGeometry args={[1, detail]} />;
        case 'octahedron': return <octahedronGeometry args={[1, detail]} />;
        default: return <icosahedronGeometry args={[1, detail]} />;
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
    const wireframeRef = useRef<Mesh>(null);
    const materialRef = useRef<MeshPhysicalMaterial>(null);
    const targetColor = useRef(new Color(PERSONA_PROFILES.default.emissive));

    const profile = PERSONA_PROFILES[persona || 'default'];

    useFrame((state, rawDelta) => {
        const delta = Math.min(rawDelta, 0.1);

        if (!meshRef.current || !materialRef.current) return;

        const time = state.clock.getElapsedTime();

        // Smooth color transition toward target persona color
        targetColor.current.set(profile.emissive);
        materialRef.current.emissive.lerp(targetColor.current, 3 * delta);

        // Smoothly lerp material properties toward target persona
        materialRef.current.roughness += (profile.roughness - materialRef.current.roughness) * 2 * delta;
        materialRef.current.metalness += (profile.metalness - materialRef.current.metalness) * 2 * delta;

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

        // Sync wireframe overlay rotation
        if (wireframeRef.current) {
            wireframeRef.current.rotation.copy(meshRef.current.rotation);
            wireframeRef.current.scale.copy(meshRef.current.scale);
        }
    });

    return (
        <group>
            <mesh ref={meshRef}>
                <PersonaGeometry geometry={profile.geometry} detail={profile.detail} />
                <meshPhysicalMaterial
                    ref={materialRef}
                    color="#0A1628"
                    emissive={profile.emissive}
                    emissiveIntensity={1}
                    roughness={profile.roughness}
                    metalness={profile.metalness}
                    transmission={profile.transmission}
                    thickness={profile.thickness}
                />
            </mesh>
            {/* Architect wireframe overlay — visible only for architect persona */}
            {persona === 'architect' && (
                <mesh ref={wireframeRef}>
                    <PersonaGeometry geometry={profile.geometry} detail={profile.detail} />
                    <meshBasicMaterial color="#00BFFF" wireframe transparent opacity={0.15} />
                </mesh>
            )}
        </group>
    );
}

function PersonaPointLight({ persona }: { persona?: PersonaType }) {
    const lightRef = useRef<any>(null);
    const targetColor = useRef(new Color(PERSONA_PROFILES.default.point));

    useFrame((_state, rawDelta) => {
        const delta = Math.min(rawDelta, 0.1);
        if (!lightRef.current) return;
        const profile = PERSONA_PROFILES[persona || 'default'];
        targetColor.current.set(profile.point);
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
