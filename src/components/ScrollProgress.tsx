'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowDown, ChevronDown } from 'lucide-react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [percentage, setPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setPercentage(Math.round(latest * 100));
      setIsVisible(latest > 0.02);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTopOrBottom = () => {
    if (percentage > 85) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Scroll progress tracker"
      className="fixed right-1.5 md:right-2.5 top-0 bottom-0 z-40 w-5 pointer-events-none flex flex-col items-center justify-between py-10"
    >
      {/* Background Vertical Guide Track */}
      <div className="absolute top-12 bottom-12 w-0.5 bg-zinc-200/50 dark:bg-zinc-800/60 rounded-full" />

      {/* Dynamic Active Progress Fill Track */}
      <motion.div
        className="absolute top-12 w-0.5 rounded-full origin-top"
        style={{
          scaleY: smoothProgress,
          bottom: '3rem',
          backgroundColor: 'var(--primary)',
        }}
      />

      {/* Moving Scroll Pointer / Needle Marker */}
      <motion.button
        onClick={scrollToTopOrBottom}
        className={`pointer-events-auto absolute w-7 h-7 -left-[9px] rounded-full flex items-center justify-center shadow-lg transition-opacity duration-300 backdrop-blur-sm cursor-pointer ${
          isVisible ? 'opacity-100' : 'opacity-40 hover:opacity-100'
        }`}
        style={{
          top: `calc(3rem + ${percentage}% * 0.78)`,
          backgroundColor: 'var(--primary)',
          color: 'var(--text-contrast)',
          boxShadow: '0 4px 15px -2px rgba(0,0,0,0.3)',
          border: '2px solid rgba(255,255,255,0.7)',
        }}
        whileHover={{ scale: 1.25 }}
        whileTap={{ scale: 0.9 }}
        title={`Page progress: ${percentage}% (Click to ${percentage > 85 ? 'scroll to top' : 'scroll down'})`}
      >
        <motion.div
          animate={{ rotate: percentage > 85 ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 stroke-[2.5]" />
        </motion.div>
      </motion.button>

      {/* Bottom Percentage Pill (Appears while scrolling) */}
      <div
        className={`absolute bottom-3 text-[9px] font-mono font-bold px-1 py-0.5 rounded bg-zinc-900/80 text-zinc-200 transition-opacity duration-200 ${
          isVisible ? 'opacity-90' : 'opacity-0'
        }`}
      >
        {percentage}%
      </div>
    </aside>
  );
}
