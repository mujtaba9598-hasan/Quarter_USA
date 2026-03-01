'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PersonaType } from '@/lib/ai/discovery-flow';

const PERSONA_COLORS: Record<string, string> = {
    default:    '193,90,44',   // Burnt Copper
    strategist: '212,160,23',  // Gold
    architect:  '30,144,255',  // Blue
    operator:   '46,204,113',  // Green
};

interface QAvatar2DProps {
    chatState: 'idle' | 'thinking' | 'speaking' | 'presenting';
    persona?: PersonaType;
    className?: string;
}

export function QAvatar2D({ chatState, persona, className = '' }: QAvatar2DProps) {
    const rgb = PERSONA_COLORS[persona || 'default'];

    const animationVariants: any = useMemo(() => {
        return {
            idle: {
                scale: [1.0, 1.03, 1.0],
                boxShadow: [
                    `0 0 10px rgba(${rgb},0.1)`,
                    `0 0 20px rgba(${rgb},0.4)`,
                    `0 0 10px rgba(${rgb},0.1)`
                ],
                transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            },
            thinking: {
                scale: [1.0, 1.05, 1.0],
                boxShadow: [
                    `0 0 15px rgba(${rgb},0.2)`,
                    `0 0 30px rgba(${rgb},0.6)`,
                    `0 0 15px rgba(${rgb},0.2)`
                ],
                transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
            },
            speaking: {
                scale: [1.0, 1.06, 1.0],
                boxShadow: [
                    `0 0 10px rgba(${rgb},0.3)`,
                    `0 0 35px rgba(${rgb},0.8)`,
                    `0 0 10px rgba(${rgb},0.3)`
                ],
                transition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
            },
            presenting: {
                scale: 1.1,
                boxShadow: `0 0 40px rgba(${rgb},0.5)`,
                transition: { duration: 0.8, ease: 'easeOut' }
            }
        };
    }, [rgb]);

    const hexColor = persona === 'strategist' ? '#D4A017'
        : persona === 'architect' ? '#1E90FF'
        : persona === 'operator' ? '#2ECC71'
        : '#C15A2C';

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="relative w-24 h-24">
                {/* Rotating Border for Thinking State */}
                <AnimatePresence>
                    {chatState === 'thinking' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, rotate: 360 }}
                            exit={{ opacity: 0 }}
                            transition={{ rotate: { duration: 2, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.3 } }}
                            className="absolute inset-[-4px] rounded-full border-t-2 border-r-2 opacity-80"
                            style={{ borderColor: hexColor }}
                        />
                    )}
                </AnimatePresence>

                <motion.div
                    animate={chatState}
                    variants={animationVariants}
                    className="w-full h-full rounded-full bg-slate-900/50 backdrop-blur-xl flex items-center justify-center"
                    style={{ border: `2px solid ${hexColor}4D` }}
                >
                    <span className="font-bold text-4xl" style={{ color: hexColor }}>
                        Q
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
