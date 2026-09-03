'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface IntelligenceAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function IntelligenceAnimation({ children, className = '', delay = 0 }: IntelligenceAnimationProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
}