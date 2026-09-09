"use client";

import { motion } from "framer-motion";

export default function Reveal({ children, className = "", delay = 0, variant = "slide" }) {
  const variants = {
    slide: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 }
    },
    flip: {
      initial: { opacity: 0, rotateX: -90, transformPerspective: 1000 },
      animate: { opacity: 1, rotateX: 0, transformPerspective: 1000 }
    }
  };

  const selectedVariant = variants[variant] || variants.slide;

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-40px" }}
      variants={selectedVariant}
      transition={{ 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
