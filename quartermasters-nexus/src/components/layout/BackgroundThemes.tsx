import React from 'react';
import { ServiceTheme } from '@/hooks/useConversationContext';

// Tech R&D Theme
export const TechRnDTheme = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none fade-in">
        <div className="absolute inset-0 bg-[#020813]/90" />
        {/* Circuit/Matrix feel */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,200,0.3)_25%,rgba(0,255,200,0.3)_26%,transparent_27%,transparent_74%,rgba(0,255,200,0.3)_75%,rgba(0,255,200,0.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(0,255,200,0.3)_25%,rgba(0,255,200,0.3)_26%,transparent_27%,transparent_74%,rgba(0,255,200,0.3)_75%,rgba(0,255,200,0.3)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
        {/* Cyan glow */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] animate-[pulse_5s_ease-in-out_infinite]" />
    </div>
);

// IT Services Theme
export const ITServicesTheme = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none fade-in">
        <div className="absolute inset-0 bg-[#05110f]/90" />
        {/* Hexagonal Mesh or terminal rivers (using simple dash array representation via css bg) */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #10b981 0, #10b981 1px, transparent 1px, transparent 50%)', backgroundSize: '20px 20px' }} />
        {/* Emerald Glow */}
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse" />
    </div>
);

// Theme Mapper
export const ThemeRenderer = ({ theme }: { theme: ServiceTheme }) => {
    switch (theme) {
        case 'tech-rnd': return <TechRnDTheme />;
        case 'it-services': return <ITServicesTheme />;
        case 'idle':
        default:
            return null; // Let SilkBackground show underneath
    }
};

export const GlobalThemeStyles = () => (
    <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slideUp {
            0% { background-position: 0 100vh; }
            100% { background-position: 0 -100vh; }
        }
        .fade-in {
            animation: fadeInTheme 1.5s ease forwards;
        }
        @keyframes fadeInTheme {
            from { opacity: 0; }
            to { opacity: 0.15; } /* Max opacity constraint */
        }
    `}} />
);
