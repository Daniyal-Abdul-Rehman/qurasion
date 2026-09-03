'use client';

import { motion } from 'framer-motion';

interface TelemetryOverlayProps {
  data: { label: string; value: string }[];
  position: 'left' | 'right';
  isVisible: boolean;
}

export default function TelemetryOverlay({ data, position, isVisible }: TelemetryOverlayProps) {
  const positionClasses = position === 'left' 
    ? 'left-8 top-20' 
    : 'right-8 top-20';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 0.6 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed ${positionClasses} font-mono text-xs space-y-1 z-10`}
    >
      {data.map((item, index) => (
        <div key={index} className="text-gray-400">
          {item.label}: <span className="text-cyan-400">{item.value}</span>
        </div>
      ))}
    </motion.div>
  );
}