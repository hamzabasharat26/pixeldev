"use client";

import { motion } from "framer-motion";

export default function Bracket({ active = false, children, className = "" }) {
  const bracketVariants = {
    inactive: { opacity: 0, scale: 0.95 },
    active: { opacity: 1, scale: 1, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Top Left */}
      <motion.div
        initial="inactive"
        animate={active ? "active" : "inactive"}
        variants={bracketVariants}
        className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-signal pointer-events-none z-10"
      />
      {/* Top Right */}
      <motion.div
        initial="inactive"
        animate={active ? "active" : "inactive"}
        variants={bracketVariants}
        className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-signal pointer-events-none z-10"
      />
      {/* Bottom Left */}
      <motion.div
        initial="inactive"
        animate={active ? "active" : "inactive"}
        variants={bracketVariants}
        className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-signal pointer-events-none z-10"
      />
      {/* Bottom Right */}
      <motion.div
        initial="inactive"
        animate={active ? "active" : "inactive"}
        variants={bracketVariants}
        className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-signal pointer-events-none z-10"
      />
      
      {children}
    </div>
  );
}
