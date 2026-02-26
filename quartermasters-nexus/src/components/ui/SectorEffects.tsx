"use client";

import { motion } from "framer-motion";

/**
 * Tech — "Focus" effect.
 * Clean blue border with subtle lift.
 */
export function GlitchEffect({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="glass rounded-xl p-6"
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "transparent",
      }}
      whileHover={{
        borderColor: "var(--sector-tech)",
        boxShadow: "0 4px 25px rgba(59, 130, 196, 0.15)",
        y: -2,
      }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
