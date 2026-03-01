'use client';

import React, { useRef } from 'react';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'framer-motion';
import { X, GripHorizontal } from 'lucide-react';
import { type MirrorBlock } from './mirror/MirrorRegistry';
import { MirrorRenderer } from './mirror/MirrorRenderer';

interface MobileBottomSheetProps {
    blocks: MirrorBlock[];
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Mobile-only bottom sheet for Mirror content.
 * Slides up from bottom, drag-to-dismiss.
 * Used on screens < 768px as a fallback for split-screen.
 */
export function MobileBottomSheet({ blocks, isOpen, onClose }: MobileBottomSheetProps) {
    const dragControls = useDragControls();
    const sheetRef = useRef<HTMLDivElement>(null);

    const handleDragEnd = (_: any, info: PanInfo) => {
        // If dragged down > 100px or fast downward velocity, close
        if (info.offset.y > 100 || info.velocity.y > 500) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && blocks.length > 0 && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Sheet */}
                    <motion.div
                        ref={sheetRef}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        drag="y"
                        dragControls={dragControls}
                        dragConstraints={{ top: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        className="fixed bottom-0 left-0 right-0 z-[61] max-h-[75vh] rounded-t-2xl bg-slate-950 border-t border-white/10 shadow-2xl flex flex-col"
                        style={{ touchAction: 'none' }}
                    >
                        {/* Drag Handle */}
                        <div
                            className="flex justify-center py-3 cursor-grab active:cursor-grabbing shrink-0"
                            onPointerDown={(e) => dragControls.start(e)}
                        >
                            <GripHorizontal className="w-8 h-1.5 text-white/30" />
                        </div>

                        {/* Header */}
                        <div className="flex items-center justify-between px-4 pb-3 border-b border-white/10 shrink-0">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#C15A2C] animate-pulse" />
                                <p className="text-xs uppercase tracking-wider text-white/50 font-medium">
                                    Live Preview
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                aria-label="Close preview"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <MirrorRenderer blocks={blocks} />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
