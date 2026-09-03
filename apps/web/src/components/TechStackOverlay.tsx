'use client';

import { motion } from 'framer-motion';

interface TechStackOverlayProps {
  title: string;
  items: string[];
  position: 'left' | 'right';
  isVisible: boolean;
}

export default function TechStackOverlay({ title, items, position, isVisible }: TechStackOverlayProps) {
  const positionClasses = position === 'left' 
    ? 'left-8 top-1/2 -translate-y-1/2' 
    : 'right-8 top-1/2 -translate-y-1/2';

  return (
    <motion.div
      initial={{ opacity: 0, x: position === 'left' ? -50 : 50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : (position === 'left' ? -50 : 50)
      }}
      transition={{ duration: 0.5 }}
      className={`fixed ${positionClasses} glass-panel p-4 w-64 z-10`}
    >
      <h4 className="text-xs font-mono text-cyan-400 mb-2 opacity-80">{title}</h4>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-xs font-mono text-gray-300 flex items-center gap-2">
            <span className="text-green-400">├─</span>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}