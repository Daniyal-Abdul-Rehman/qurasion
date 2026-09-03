'use client';

import { motion } from 'framer-motion';

interface ScrollytellingSectionProps {
  header: string;
  subheader: string;
  description: string;
  stage: number;
  currentStage: number;
  lightTheme?: boolean;
  children?: React.ReactNode;
}

export default function ScrollytellingSection({ 
  header, 
  subheader, 
  description, 
  stage, 
  currentStage,
  lightTheme = false,
  children 
}: ScrollytellingSectionProps) {
  const isActive = currentStage === stage;
  const isPast = currentStage > stage;

  const textColor = lightTheme ? 'text-warm-white' : 'text-gray-50';
  const subTextColor = lightTheme ? 'text-royal-blue' : 'text-cyan-400';
  const descTextColor = lightTheme ? 'text-warm-white/90' : 'text-gray-300';

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center px-8 py-20 relative"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: isActive ? 1 : isPast ? 0.5 : 0.3,
            scale: isActive ? 1 : 0.95
          }}
          transition={{ duration: 0.4 }}
        >
          <h2 className={`text-4xl md:text-5xl font-bold font-display tracking-tight ${textColor} mb-4`}>
            {header}
          </h2>
          <h3 className={`text-2xl md:text-3xl font-semibold ${subTextColor} mb-6`}>
            {subheader}
          </h3>
          <p className={`text-lg ${descTextColor} leading-relaxed max-w-3xl mx-auto mb-8`}>
            {description}
          </p>
        </motion.div>
        
        {children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}