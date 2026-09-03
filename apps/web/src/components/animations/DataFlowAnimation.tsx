'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface DataFlowAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function DataFlowAnimation({ children, className = '', delay = 0 }: DataFlowAnimationProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
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