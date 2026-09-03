'use client';

import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      
      setScrollProgress(progress);
      
      // Determine stage based on scroll progress
      if (progress < 0.15) {
        setStage(0); // Hero
      } else if (progress < 0.3) {
        setStage(1); // Ingestion
      } else if (progress < 0.45) {
        setStage(2); // Entity Resolution
      } else if (progress < 0.6) {
        setStage(3); // Indexing & Valuation
      } else if (progress < 0.75) {
        setStage(4); // Strategy & Matching
      } else {
        setStage(5); // Transactions
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollProgress, stage };
}