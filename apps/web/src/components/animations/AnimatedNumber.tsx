'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedNumberProps {
  value: number;
  className?: string;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export default function AnimatedNumber({ 
  value, 
  className = '', 
  duration = 1,
  prefix = '',
  suffix = '',
  decimals = 0
}: AnimatedNumberProps) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { 
    duration: duration * 1000,
    bounce: 0 
  });
  
  const displayValue = useTransform(spring, (latest) => {
    return prefix + latest.toFixed(decimals) + suffix;
  });

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return (
    <motion.span className={className}>
      {displayValue}
    </motion.span>
  );
}