"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function MetricCounter({ endValue, duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  
  useEffect(() => {
    if (isInView && ref.current) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easeOut * endValue);
        
        if (ref.current) {
          ref.current.textContent = currentValue;
        }
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else if (ref.current) {
          ref.current.textContent = endValue;
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [isInView, endValue, duration]);

  return <span ref={ref} className="metric">0</span>;
}
