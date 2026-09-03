'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../components/navigation';
import { Scene3D, City3D } from '../components/3d';
import { ScrollTriggeredAnimation } from '../components/animations';
import { Home, Brain, DollarSign, Handshake } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* 3D Scene - Fixed dimensions that worked */}
        <div className="absolute inset-0 z-0 w-full h-full opacity-[0.42]">
          <Scene3D variant="city">
            <City3D animated={true} />
          </Scene3D>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-[#173D2B] font-mono text-sm tracking-widest uppercase">
                Real Estate Intelligence Platform
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-display-hero font-display font-light text-[#172019] mb-8">
              See the opportunity before everyone else.
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-4xl mx-auto mb-12 leading-relaxed font-light"
            >
              Turn fragmented real-estate data into investment intelligence. Discover properties, understand their potential, underwrite opportunities, find aligned investors, and move from analysis to acquisition.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="btn-primary-lime px-8 py-4 text-lg">
                Explore the platform →
              </button>
              
              <button className="text-[#66706A] font-medium hover:text-[#172019] transition-colors flex items-center gap-2">
                See how it works
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-[#DDE2DD] rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-[#B7D83D] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Data Strip */}
      <section className="py-8 px-6 border-y border-[#DDE2DD] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-mono text-[#66706A]">
            <span>PROPERTY DATA</span>
            <span>·</span>
            <span>MARKET DATA</span>
            <span>·</span>
            <span>TAX RECORDS</span>
            <span>·</span>
            <span>PERMITS</span>
            <span>·</span>
            <span>TRANSACTIONS</span>
            <span>·</span>
            <span>GEOSPATIAL</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Real estate data is everywhere. The intelligence isn't.
              </h2>
              <p className="text-xl text-[#66706A] max-w-3xl mx-auto font-light">
                Fragmented sources, disconnected tools, manual analysis, slow decisions.
              </p>
            </div>
          </ScrollTriggeredAnimation>

          {/* Transformation Flow */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              'RAW DATA',
              '→',
              'NORMALIZE',
              '→',
              'RESOLVE',
              '→',
              'ENRICH',
              '→',
              'ANALYZE',
              '→',
              'INTELLIGENCE'
            ].map((item, index) => (
              <ScrollTriggeredAnimation key={item} delay={index * 0.1} direction="up">
                <div className={`text-center py-4 px-2 rounded-lg ${
                  item === '→' 
                    ? 'text-[#B7D83D] text-2xl flex items-center justify-center' 
                    : 'bg-[#FFFFFF] border border-[#DDE2DD] hover:border-[#173D2B] transition-colors'
                }`}>
                  <span className={`font-mono text-sm ${item !== '→' ? 'text-[#66706A]' : ''}`}>
                    {item}
                  </span>
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Overview Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                From data to deals
              </h2>
              <p className="text-xl text-[#66706A] max-w-3xl mx-auto font-light">
                One platform that transforms raw property information into investment opportunities
              </p>
            </div>
          </ScrollTriggeredAnimation>

          {/* Flow visualization */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { step: 'PROPERTY', icon: <Home className="w-12 h-12 text-[#173D2B]" />, desc: 'Discover' },
              { step: 'INTELLIGENCE', icon: <Brain className="w-12 h-12 text-[#173D2B]" />, desc: 'Analyze' },
              { step: 'INVESTMENT', icon: <DollarSign className="w-12 h-12 text-[#173D2B]" />, desc: 'Match' },
              { step: 'DEAL', icon: <Handshake className="w-12 h-12 text-[#173D2B]" />, desc: 'Execute' }
            ].map((item, index) => (
              <ScrollTriggeredAnimation key={item.step} delay={index * 0.1} direction="up">
                <div className="bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg p-6 text-center hover:border-[#173D2B] transition-colors">
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <div className="text-[#172019] font-semibold mb-1">{item.step}</div>
                  <div className="text-[#66706A] text-sm">{item.desc}</div>
                  {index < 3 && (
                    <div className="hidden md:block text-[#B7D83D] text-2xl mt-2">↓</div>
                  )}
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Built for every stage of investment
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Property Intelligence',
                description: 'Every property has a story. We bring the signals together so you can understand what is happening behind the address.',
                href: '/platform/intelligence'
              },
              {
                title: 'AI Valuation',
                description: 'Data-driven valuation built from property characteristics, comparable sales, geography and market signals.',
                href: '/platform/valuation'
              },
              {
                title: 'Investor Matching',
                description: 'The right property. The right investor. Algorithmic matching based on geography, capital requirements, and investment strategy.',
                href: '/platform/matching'
              }
            ].map((feature, index) => (
              <ScrollTriggeredAnimation key={feature.title} delay={index * 0.1} direction="up">
                <div className="card bg-[#FFFFFF]">
                  <h3 className="text-display-medium font-display font-light text-[#172019] mb-4 group-hover:text-[#173D2B] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[#66706A] mb-6 font-light">
                    {feature.description}
                  </p>
                  <a href={feature.href} className="text-[#173D2B] font-medium hover:underline inline-flex items-center gap-2">
                    Learn more 
                    <span>→</span>
                  </a>
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
              Stop searching for properties. Start finding opportunities.
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Join the investors who are already using Qurasion to find better deals, faster.
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