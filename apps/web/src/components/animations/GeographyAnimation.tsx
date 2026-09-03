'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GeographyAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function GeographyAnimation({ children, className = '', delay = 0 }: GeographyAnimationProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 1.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
}