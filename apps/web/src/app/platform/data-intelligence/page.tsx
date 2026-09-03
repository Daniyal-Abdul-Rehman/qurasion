'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, DataNetwork3D } from '../../../components/3d';
import { ScrollTriggeredAnimation } from '../../../components/animations';
import { useState } from 'react';

export default function DataIntelligencePage() {
  const [pipelineStage, setPipelineStage] = useState<'chaos' | 'normalize' | 'resolve' | 'enrich' | 'verify'>('chaos');

  const stages = [
    { id: 'chaos', label: 'CHAOS', description: 'Fragmented data from multiple sources' },
    { id: 'normalize', label: 'NORMALIZE', description: 'Standardize formats and clean data' },
    { id: 'resolve', label: 'RESOLVE', description: 'Entity resolution and deduplication' },
    { id: 'enrich', label: 'ENRICH', description: 'Add context and calculated fields' },
    { id: 'verify', label: 'VERIFY', description: 'Quality checks and validation' },
  ];

  const dataSources = [
    { name: 'MLS', color: '#173D2B', volume: '850K records' },
    { name: 'TAX', color: '#3B82F6', volume: '1.2M records' },
    { name: 'PERMITS', color: '#F59E0B', volume: '340K records' },
    { name: 'GOVERNMENT', color: '#22C55E', volume: '560K records' },
    { name: 'GEOGRAPHY', color: '#8B5CF6', volume: '890K records' },
    { name: 'TRANSACTIONS', color: '#EF4444', volume: '420K records' },
  ];

  const addressVariants = [
    'Main St.',
    '123 Main St.',
    '123 MAIN STREET',
    '123 Main Street',
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <Scene3D>
            <DataNetwork3D animated={true} stage={pipelineStage} />
          </Scene3D>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-display-hero font-display font-light text-[#172019] mb-6 leading-tight">
              Millions of records.
            </h1>
            <h1 className="text-display-hero font-display font-light text-[#173D2B] mb-6 leading-tight">
              One source of truth.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              Our data infrastructure transforms fragmented real estate data into canonical property intelligence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pipeline Animation Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Data Pipeline
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          {/* Pipeline Stages */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {stages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setPipelineStage(stage.id as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  pipelineStage === stage.id
                    ? 'bg-[#173D2B] text-[#FFFFFF]'
                    : 'bg-[#F7F8F6] text-[#66706A] border border-[#DDE2DD] hover:border-[#173D2B]'
                }`}
              >
                {stage.label}
              </button>
            ))}
          </div>

          {/* Stage Description */}
          <div className="text-center mb-12">
            <div className="text-[#173D2B] font-mono text-sm mb-2">
              Current Stage: {stages.find(s => s.id === pipelineStage)?.label}
            </div>
            <div className="text-[#66706A]">
              {stages.find(s => s.id === pipelineStage)?.description}
            </div>
          </div>

          {/* Data Sources */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {dataSources.map((source, index) => (
              <ScrollTriggeredAnimation key={source.name} delay={index * 0.1} direction="up">
                <div 
                  className="bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg p-6 text-center"
                  style={{ borderTopColor: source.color, borderTopWidth: '3px' }}
                >
                  <div 
                    className="w-4 h-4 rounded-full mx-auto mb-3"
                    style={{ backgroundColor: source.color }}
                  />
                  <div className="text-[#172019] font-semibold mb-2">{source.name}</div>
                  <div className="text-[#66706A] text-sm">{source.volume}</div>
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>

          {/* Entity Resolution Example */}
          <div className="bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg p-8 shadow-sm">
            <h3 className="text-display-medium font-display font-light text-[#172019] mb-6 text-center">
              Entity Resolution Example
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-[#66706A] text-sm uppercase tracking-widest mb-4">
                  Before (Fragmented)
                </div>
                <div className="space-y-2">
                  {addressVariants.map((variant, index) => (
                    <div key={index} className="bg-[#FFFFFF] border border-[#DDE2DD] rounded-lg p-3 text-[#172019] font-mono text-sm">
                      {variant}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-4xl text-[#173D2B]">→</div>
              </div>

              <div>
                <div className="text-[#66706A] text-sm uppercase tracking-widest mb-4">
                  After (Canonical)
                </div>
                <div className="bg-[#173D2B]/10 border border-[#173D2B] rounded-lg p-4">
                  <div className="text-[#173D2B] font-mono text-lg mb-2">
                    123 Main Street
                  </div>
                  <div className="text-[#66706A] text-sm">
                    Property ID: P123456
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Infrastructure Section */}
      <section className="py-24 px-6 bg-[#F7F8F6]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Data Infrastructure
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollTriggeredAnimation direction="left">
              <div className="card bg-[#FFFFFF]">
                <h3 className="text-display-medium font-display font-light text-[#172019] mb-6">
                  Ingestion
                </h3>
                <ul className="space-y-4">
                  {[
                    'Multi-source data connectors',
                    'Real-time streaming ingestion',
                    'Automated quality checks',
                    'Schema normalization',
                    'Duplicate detection',
                    'Change data capture'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start text-[#66706A]">
                      <span className="text-[#173D2B] mr-3 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollTriggeredAnimation>

            <ScrollTriggeredAnimation direction="right">
              <div className="card bg-[#FFFFFF]">
                <h3 className="text-display-medium font-display font-light text-[#172019] mb-6">
                  Processing
                </h3>
                <ul className="space-y-4">
                  {[
                    'Entity resolution algorithms',
                    'Address standardization',
                    'Geocoding and enrichment',
                    'Data validation rules',
                    'Anomaly detection',
                    'Machine learning models'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start text-[#66706A]">
                      <span className="text-[#173D2B] mr-3 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollTriggeredAnimation>
          </div>
        </div>
      </section>

      {/* Data Quality Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Data Quality Metrics
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { metric: 'Accuracy', value: '99.2%', color: '#22C55E' },
              { metric: 'Completeness', value: '97.8%', color: '#3B82F6' },
              { metric: 'Consistency', value: '98.5%', color: '#F59E0B' },
              { metric: 'Timeliness', value: '99.9%', color: '#8B5CF6' },
            ].map((item, index) => (
              <ScrollTriggeredAnimation key={item.metric} delay={index * 0.1} direction="up">
                <div 
                  className="card bg-[#F7F8F6]"
                  style={{ borderBottomColor: item.color, borderBottomWidth: '3px' }}
                >
                  <div className="text-4xl font-display font-light mb-2" style={{ color: item.color }}>
                    {item.value}
                  </div>
                  <div className="text-[#66706A] text-sm uppercase tracking-wider">
                    {item.metric}
                  </div>
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#173D2B]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollTriggeredAnimation direction="up">
            <h2 className="text-display-large font-display font-light text-[#FFFFFF] mb-6">
              Build intelligence from better data
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Our canonical property intelligence is powered by industry-leading data infrastructure.
            </p>
            <button className="bg-[#B7D83D] text-[#172019] px-8 py-4 rounded-full font-semibold hover:bg-[#A5C635] transition-all text-lg">
              Learn about our data →
            </button>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}