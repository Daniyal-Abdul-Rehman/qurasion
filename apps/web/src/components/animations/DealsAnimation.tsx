'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface DealsAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stage?: number;
  totalStages?: number;
}

export default function DealsAnimation({ 
  children, 
  className = '', 
  delay = 0,
  stage = 0,
  totalStages = 5
}: DealsAnimationProps) {
  const progress = stage / totalStages;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        scale: 1 + (progress * 0.1)
      }}
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