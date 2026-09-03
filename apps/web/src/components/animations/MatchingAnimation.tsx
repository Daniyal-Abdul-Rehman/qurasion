'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MatchingAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function MatchingAnimation({ children, className = '', delay = 0 }: MatchingAnimationProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
}