'use client';

/**
 * Wireframe pattern for Technology & AI (The Observatory) theme.
 */
export function WireframePattern() {
    return (
        <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0"
        >
            <defs>
                <pattern
                    id="wireframe"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                >
                    <rect width="40" height="40" fill="none" stroke="var(--sector-tech)" strokeWidth="0.5" opacity="0.08" />
                    <line x1="0" y1="20" x2="40" y2="20" stroke="var(--sector-tech)" strokeWidth="0.3" opacity="0.05" />
                    <line x1="20" y1="0" x2="20" y2="40" stroke="var(--sector-tech)" strokeWidth="0.3" opacity="0.05" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wireframe)" />
        </svg>
    );
}
