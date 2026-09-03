'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, Property3D } from '../../../components/3d';
import { ScrollTriggeredAnimation, AnimatedText } from '../../../components/animations';
import { FileText, DollarSign, Home, Search, ClipboardList, Wrench, Ruler, AlertTriangle } from 'lucide-react';

export default function PropertyIntelligencePage() {
  const dataLayers = [
    { label: 'OWNERSHIP', color: '#173D2B' },
    { label: 'SALES', color: '#3B82F6' },
    { label: 'MORTGAGE', color: '#F59E0B' },
    { label: 'TAX', color: '#22C55E' },
    { label: 'PERMITS', color: '#EF4444' },
    { label: 'GEOGRAPHY', color: '#8B5CF6' },
    { label: 'MARKET', color: '#EC4899' },
    { label: 'DOCUMENTS', color: '#06B6D4' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-[0.42]">
          <Scene3D variant="property">
            <Property3D animated={true} highlight={false} scale={1.5} />
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
              Every property has a story.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              We bring the signals together so you can understand what is happening behind the address.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="btn-primary-lime px-8 py-4 text-lg"
            >
              Understand any property in seconds.
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Data Layers Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                One property, one intelligence profile
              </h2>
              <p className="text-xl text-[#66706A] max-w-3xl mx-auto font-light">
                Multiple sources, one canonical record
              </p>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {dataLayers.map((layer, index) => (
              <ScrollTriggeredAnimation key={layer.label} delay={index * 0.05} direction="up">
                <div 
                  className="bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg p-6 text-center hover:border-[#173D2B] transition-all group"
                  style={{ borderTopColor: layer.color, borderTopWidth: '3px' }}
                >
                  <div 
                    className="w-3 h-3 rounded-full mx-auto mb-4"
                    style={{ backgroundColor: layer.color }}
                  />
                  <div className="text-[#172019] font-semibold group-hover:text-[#173D2B] transition-colors">
                    {layer.label}
                  </div>
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollTriggeredAnimation direction="left">
              <div>
                <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                  Historical timeline
                </h2>
                <p className="text-[#66706A] text-lg mb-6 font-light">
                  Track every event that has shaped a property's value — from ownership changes and sales to renovations and market shifts.
                </p>
                <ul className="space-y-4">
                  {['Complete ownership history', 'Transaction records', 'Permit history', 'Market trends'].map((item) => (
                    <li key={item} className="flex items-center text-[#66706A]">
                      <span className="text-[#173D2B] mr-3">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollTriggeredAnimation>

            <ScrollTriggeredAnimation direction="right">
              <div className="bg-[#FFFFFF] border border-[#DDE2DD] rounded-lg p-8 shadow-sm">
                <div className="space-y-4">
                  {[
                    { year: '2024', event: 'Sold for $425,000', type: 'SALE' },
                    { year: '2023', event: 'Renovation completed', type: 'PERMIT' },
                    { year: '2021', event: 'Purchased for $380,000', type: 'SALE' },
                    { year: '2019', event: 'Tax assessment updated', type: 'TAX' },
                    { year: '2018', event: 'Original construction', type: 'PERMIT' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 pb-4 border-b border-[#DDE2DD] last:border-0">
                      <div className="text-[#173D2B] font-mono text-sm whitespace-nowrap">
                        {item.year}
                      </div>
                      <div>
                        <div className="text-[#172019] font-medium">{item.event}</div>
                        <div className="text-[#9AA8A0] text-sm">{item.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollTriggeredAnimation>
          </div>
        </div>
      </section>

      {/* Geographic Context Section */}
      <section className="py-24 px-6 bg-[#F7F8F6]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Geographic context
              </h2>
              <p className="text-xl text-[#66706A] max-w-3xl mx-auto font-light">
                Understand how location influences value with neighborhood analytics, market trends, and comparable properties.
              </p>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Neighborhood Analytics',
                description: 'Demographics, school ratings, crime statistics, and amenities that drive local demand.',
                metric: '140+ data points'
              },
              {
                title: 'Market Trends',
                description: 'Price appreciation rates, inventory levels, and days on market for the surrounding area.',
                metric: 'Real-time updates'
              },
              {
                title: 'Comparable Properties',
                description: 'Recently sold and active listings with similar characteristics for accurate comparison.',
                metric: '17 comparables found'
              }
            ].map((feature, index) => (
              <ScrollTriggeredAnimation key={feature.title} delay={index * 0.1} direction="up">
                <div className="card bg-[#FFFFFF]">
                  <h3 className="text-display-medium font-display font-light text-[#172019] mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-[#66706A] mb-6 font-light">
                    {feature.description}
                  </p>
                  <div className="text-[#173D2B] font-mono text-sm">
                    {feature.metric}
                  </div>
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Documents and evidence
              </h2>
              <p className="text-xl text-[#66706A] max-w-3xl mx-auto font-light">
                Access all the documents you need for due diligence in one place.
              </p>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { type: 'Deed', icon: <FileText className="w-12 h-12 text-[#173D2B]" /> },
              { type: 'Title Report', icon: <ClipboardList className="w-12 h-12 text-[#173D2B]" /> },
              { type: 'Tax Records', icon: <DollarSign className="w-12 h-12 text-[#173D2B]" /> },
              { type: 'Permits', icon: <Wrench className="w-12 h-12 text-[#173D2B]" /> },
              { type: 'Surveys', icon: <Ruler className="w-12 h-12 text-[#173D2B]" /> },
              { type: 'HOA Docs', icon: <Home className="w-12 h-12 text-[#173D2B]" /> },
              { type: 'Inspections', icon: <Search className="w-12 h-12 text-[#173D2B]" /> },
              { type: 'Disclosures', icon: <AlertTriangle className="w-12 h-12 text-[#173D2B]" /> },
            ].map((doc, index) => (
              <ScrollTriggeredAnimation key={doc.type} delay={index * 0.05} direction="up">
                <div className="bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg p-6 text-center hover:border-[#173D2B] transition-all cursor-pointer group">
                  <div className="mb-3 flex justify-center">{doc.icon}</div>
                  <div className="text-[#172019] font-medium group-hover:text-[#173D2B] transition-colors">
                    {doc.type}
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
              Understand any property in seconds
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Start building comprehensive property intelligence profiles today.
            </p>
            <button className="bg-[#B7D83D] text-[#172019] px-8 py-4 rounded-full font-semibold hover:bg-[#A5C635] transition-all text-lg">
              Get started free →
            </button>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}