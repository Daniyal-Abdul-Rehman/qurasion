'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, Property3D } from '../../../components/3d';
import { ScrollTriggeredAnimation, AnimatedNumber } from '../../../components/animations';
import { useState, useEffect } from 'react';

export default function ValuationPage() {
  const [animateValue, setAnimateValue] = useState(false);

  useEffect(() => {
    setAnimateValue(true);
  }, []);

  const comparables = [
    { address: '124 Main St', price: 325000, distance: '0.3 mi', similarity: 92 },
    { address: '118 Oak Ave', price: 310000, distance: '0.4 mi', similarity: 88 },
    { address: '130 Elm St', price: 335000, distance: '0.5 mi', similarity: 85 },
    { address: '122 Pine Rd', price: 315000, distance: '0.6 mi', similarity: 82 },
    { address: '126 Maple Dr', price: 340000, distance: '0.7 mi', similarity: 79 },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <Scene3D>
            <Property3D animated={true} highlight={true} scale={1.2} />
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
              Know what a property could be worth.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              Data-driven valuation built from property characteristics, comparable sales, geography and market signals.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Valuation Result Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Valuation Card */}
              <div className="bg-[#F7F8F6] border border-[#DDE2DD] rounded-2xl p-8 shadow-sm">
                <div className="text-center mb-8">
                  <div className="text-[#66706A] text-sm uppercase tracking-widest mb-4">
                    Estimated Value
                  </div>
                  {animateValue && (
                    <div className="text-5xl md:text-6xl font-display font-light text-[#173D2B] mb-4">
                      <AnimatedNumber value={318000} prefix="$" decimals={0} />
                    </div>
                  )}
                  <div className="inline-flex items-center bg-[#22C55E]/10 text-[#22C55E] px-4 py-2 rounded-full text-sm font-medium">
                    <span className="mr-2">81%</span>
                    <span>Confidence</span>
                  </div>
                </div>

                <div className="space-y-4 border-t border-[#DDE2DD] pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[#66706A]">Model Version</span>
                    <span className="text-[#172019] font-mono text-sm">2026.08.1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#66706A]">Comparables Used</span>
                    <span className="text-[#172019] font-mono text-sm">17</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#66706A]">Search Radius</span>
                    <span className="text-[#172019] font-mono text-sm">1.0 mile</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#66706A]">Last Updated</span>
                    <span className="text-[#172019] font-mono text-sm">Today</span>
                  </div>
                </div>
              </div>

              {/* Model Transparency */}
              <div>
                <h2 className="text-display-medium font-display font-light text-[#172019] mb-6">
                  Model Transparency
                </h2>
                <p className="text-[#66706A] text-lg mb-8 font-light">
                  Our valuation models are built to be understood. See exactly what factors are driving the estimated value and how confident we are in the result.
                </p>

                <div className="space-y-4">
                  {[
                    { factor: 'Property Size', impact: 35, color: '#173D2B' },
                    { factor: 'Location', impact: 28, color: '#3B82F6' },
                    { factor: 'Condition', impact: 18, color: '#F59E0B' },
                    { factor: 'Market Trends', impact: 12, color: '#22C55E' },
                    { factor: 'Recent Sales', impact: 7, color: '#8B5CF6' },
                  ].map((item, index) => (
                    <div key={item.factor}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#172019]">{item.factor}</span>
                        <span className="text-[#66706A] text-sm">{item.impact}%</span>
                      </div>
                      <div className="h-2 bg-[#DDE2DD] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.impact}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      {/* Comparable Analysis Section */}
      <section className="py-24 px-6 bg-[#F7F8F6]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Comparable Analysis
              </h2>
              <p className="text-xl text-[#66706A] max-w-3xl mx-auto font-light">
                See the properties that informed this valuation, ranked by similarity and relevance.
              </p>
            </div>
          </ScrollTriggeredAnimation>

          <div className="bg-[#FFFFFF] border border-[#DDE2DD] rounded-xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#DDE2DD]">
                  <th className="text-left text-[#66706A] font-medium p-6">Address</th>
                  <th className="text-left text-[#66706A] font-medium p-6">Sale Price</th>
                  <th className="text-left text-[#66706A] font-medium p-6">Distance</th>
                  <th className="text-left text-[#66706A] font-medium p-6">Similarity</th>
                </tr>
              </thead>
              <tbody>
                {comparables.map((comp, index) => (
                  <tr key={comp.address} className="border-b border-[#DDE2DD] last:border-0 hover:bg-[#F7F8F6] transition-colors">
                    <td className="p-6 text-[#172019]">{comp.address}</td>
                    <td className="p-6 text-[#172019] font-mono">${comp.price.toLocaleString()}</td>
                    <td className="p-6 text-[#66706A]">{comp.distance}</td>
                    <td className="p-6">
                      <div className="flex items-center">
                        <div className="w-24 h-2 bg-[#DDE2DD] rounded-full overflow-hidden mr-3">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${comp.similarity}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="h-full bg-[#173D2B] rounded-full"
                          />
                        </div>
                        <span className="text-[#173D2B] font-mono text-sm">{comp.similarity}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Valuation Confidence Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Valuation Confidence
              </h2>
              <p className="text-xl text-[#66706A] max-w-3xl mx-auto font-light">
                We provide confidence scores based on data quality, comparable availability, and market stability.
              </p>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'High Confidence',
                range: '80-100%',
                description: 'Strong comparable support and recent market data',
                color: '#22C55E'
              },
              {
                title: 'Medium Confidence',
                range: '60-79%',
                description: 'Adequate comparables with some data limitations',
                color: '#F59E0B'
              },
              {
                title: 'Low Confidence',
                range: 'Below 60%',
                description: 'Limited comparables or unusual property characteristics',
                color: '#EF4444'
              }
            ].map((level, index) => (
              <ScrollTriggeredAnimation key={level.title} delay={index * 0.1} direction="up">
                <div 
                  className="card bg-[#F7F8F6]"
                  style={{ borderTopColor: level.color, borderTopWidth: '3px' }}
                >
                  <div className="text-display-medium font-display font-light text-[#172019] mb-2">
                    {level.title}
                  </div>
                  <div className="text-[#66706A] font-mono text-sm mb-4">{level.range}</div>
                  <p className="text-[#66706A] font-light">{level.description}</p>
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
              Build a valuation you can understand
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Start valuing properties with confidence using our AI-powered models.
            </p>
            <button className="bg-[#B7D83D] text-[#172019] px-8 py-4 rounded-full font-semibold hover:bg-[#A5C635] transition-all text-lg">
              Start valuing →
            </button>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}