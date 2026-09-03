'use client';

import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  type?: 'fadeIn' | 'slideUp' | 'streamIn' | 'typewriter';
}

export default function AnimatedText({ 
  text, 
  className = '', 
  delay = 0,
  duration = 0.5,
  type = 'fadeIn'
}: AnimatedTextProps) {
  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay, duration }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration }
    },
    streamIn: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { delay, duration }
    },
    typewriter: {
      initial: { width: 0 },
      animate: { width: '100%' },
      transition: { delay, duration: duration * 2 }
    }
  };

  const animation = animations[type];

  if (type === 'typewriter') {
    return (
      <div className={`overflow-hidden whitespace-nowrap ${className}`}>
        <motion.span
          {...animation}
          style={{ display: 'inline-block' }}
        >
          {text}
        </motion.span>
      </div>
    );
  }

  return (
    <motion.span className={className} {...animation}>
      {text}
    </motion.span>
  );
}