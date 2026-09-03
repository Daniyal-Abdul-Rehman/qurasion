'use client';

import { motion } from 'framer-motion';
import TelemetryOverlay from './TelemetryOverlay';

export default function HeroSection() {
  const telemetryData = [
    { label: 'INGEST STREAMS', value: '14 ACTIVE' },
    { label: 'RAW RECORDS', value: '2.4M' },
    { label: 'ENTITY RESOLUTION', value: 'PENDING' },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-8 relative">
      <TelemetryOverlay 
        data={telemetryData} 
        position="left" 
        isVisible={true} 
      />
      
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight text-warm-white mb-6">
            RAW DATA. LIVING ARCHITECTURE.
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-warm-white/90 leading-relaxed max-w-4xl mx-auto mb-12"
          >
            Institutional-grade property intelligence built on canonical entity resolution, 
            real-time valuation modeling, and algorithmic deal matching. From fragmented 
            data streams to structured investment outcomes.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="px-8 py-4 border border-warm-white text-warm-white font-semibold rounded-full hover:bg-warm-white hover:text-navy transition-all duration-300">
              REQUEST INSTITUTIONAL ACCESS
            </button>
            
            <button className="px-8 py-4 text-warm-white/80 font-semibold rounded-full hover:text-warm-white transition-all duration-300 flex items-center gap-2">
              VIEW THE ARCHITECTURE
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ↓
              </motion.span>
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Secondary CTA positioned upper-left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute top-8 left-8 z-10"
      >
        <button className="text-sm text-warm-white/70 hover:text-warm-white transition-colors flex items-center gap-2">
          <span>VIEW THE ARCHITECTURE</span>
          <motion.span
            animate={{ y: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ↓
          </motion.span>
        </button>
      </motion.div>
    </section>
  );
}