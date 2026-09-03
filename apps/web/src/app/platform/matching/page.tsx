'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, DataNetwork3D } from '../../../components/3d';
import { ScrollTriggeredAnimation, AnimatedNumber } from '../../../components/animations';
import { useState } from 'react';
import { MapPin, DollarSign, Target, TrendingUp, Home, User, Search, Bot, Handshake } from 'lucide-react';

export default function MatchingPage() {
  const [isMatching, setIsMatching] = useState(false);
  const [matchScore, setMatchScore] = useState(0);

  const handleMatch = () => {
    setIsMatching(true);
    let score = 0;
    const interval = setInterval(() => {
      score += Math.random() * 15;
      if (score >= 93) {
        score = 93;
        clearInterval(interval);
        setIsMatching(false);
      }
      setMatchScore(Math.round(score));
    }, 100);
  };

  const propertyData = {
    address: '123 Main Street',
    city: 'Dallas',
    state: 'TX',
    strategy: 'Fix & Flip',
    capitalRequired: 96000,
    projectedRoi: 24,
    purchasePrice: 240000,
    arv: 335000
  };

  const investorData = {
    name: 'Apex Investments',
    city: 'Dallas',
    state: 'TX',
    strategy: 'Fix & Flip',
    capitalRange: '$50K–$150K',
    targetRoi: 15,
    type: 'Individual Investor'
  };

  const matchReasons = [
    { reason: 'Geography matches', icon: <MapPin className="w-5 h-5" /> },
    { reason: 'Capital requirement matches', icon: <DollarSign className="w-5 h-5" /> },
    { reason: 'Strategy matches', icon: <Target className="w-5 h-5" /> },
    { reason: 'ROI exceeds target', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <Scene3D>
            <DataNetwork3D animated={true} stage="enrich" />
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
              The right property.
            </h1>
            <h1 className="text-display-hero font-display font-light text-[#173D2B] mb-6 leading-tight">
              The right investor.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              Algorithmic matching that connects investment opportunities with the right capital partners.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Matching Animation Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                See matching in action
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Property Card */}
            <ScrollTriggeredAnimation direction="left">
              <div className="card bg-[#F7F8F6]">
                <div className="mb-4 flex justify-center"><Home className="w-12 h-12 text-[#173D2B]" /></div>
                <h3 className="text-xl font-display font-light text-[#172019] mb-4">
                  PROPERTY
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#66706A]">Address</span>
                    <span className="text-[#172019]">{propertyData.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#66706A]">Location</span>
                    <span className="text-[#172019]">{propertyData.city}, {propertyData.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#66706A]">Strategy</span>
                    <span className="text-[#173D2B]">{propertyData.strategy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#66706A]">Capital Required</span>
                    <span className="text-[#172019]">${propertyData.capitalRequired.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#66706A]">Projected ROI</span>
                    <span className="text-[#22C55E]">{propertyData.projectedRoi}%</span>
                  </div>
                </div>
              </div>
            </ScrollTriggeredAnimation>

            {/* Match Animation */}
            <ScrollTriggeredAnimation direction="up">
              <div className="text-center">
                <button
                  onClick={handleMatch}
                  disabled={isMatching}
                  className="btn-primary-lime px-8 py-4 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed mb-8"
                >
                  {isMatching ? 'Matching...' : 'Find Match →'}
                </button>

                <div className="text-8xl font-display font-light text-[#173D2B] mb-4">
                  {matchScore}%
                </div>
                <div className="text-[#66706A] uppercase tracking-widest text-sm">
                  Match Score
                </div>

                {matchScore > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 space-y-2"
                  >
                    {matchReasons.map((reason, index) => (
                      <motion.div
                        key={reason.reason}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-center text-[#22C55E]"
                      >
                        <span className="mr-2 flex items-center">{reason.icon}</span>
                        <span>✓ {reason.reason}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </ScrollTriggeredAnimation>

            {/* Investor Card */}
            <ScrollTriggeredAnimation direction="right">
              <div className="card bg-[#F7F8F6]">
                <div className="mb-4 flex justify-center"><User className="w-12 h-12 text-[#173D2B]" /></div>
                <h3 className="text-xl font-display font-light text-[#172019] mb-4">
                  INVESTOR
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#66706A]">Name</span>
                    <span className="text-[#172019]">{investorData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#66706A]">Location</span>
                    <span className="text-[#172019]">{investorData.city}, {investorData.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#66706A]">Strategy</span>
                    <span className="text-[#173D2B]">{investorData.strategy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#66706A]">Capital Range</span>
                    <span className="text-[#172019]">{investorData.capitalRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#66706A]">Target ROI</span>
                    <span className="text-[#172019]">{investorData.targetRoi}%+</span>
                  </div>
                </div>
              </div>
            </ScrollTriggeredAnimation>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-[#F7F8F6]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                How matching works
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Property Analysis',
                description: 'We analyze every property for investment potential, risk factors, and capital requirements.',
                icon: <Search className="w-12 h-12 text-[#173D2B]" />
              },
              {
                step: '02',
                title: 'Investor Profiling',
                description: 'Investors specify their criteria: geography, capital range, strategy, and return targets.',
                icon: <User className="w-12 h-12 text-[#173D2B]" />
              },
              {
                step: '03',
                title: 'Algorithmic Matching',
                description: 'Our AI matches properties to investors based on weighted compatibility scores.',
                icon: <Bot className="w-12 h-12 text-[#173D2B]" />
              },
              {
                step: '04',
                title: 'Deal Introduction',
                description: 'High-confidence matches are introduced with full due diligence packages.',
                icon: <Handshake className="w-12 h-12 text-[#173D2B]" />
              }
            ].map((step, index) => (
              <ScrollTriggeredAnimation key={step.step} delay={index * 0.1} direction="up">
                <div className="card bg-[#FFFFFF]">
                  <div className="text-[#173D2B] font-mono text-sm mb-4">{step.step}</div>
                  <div className="mb-4 flex justify-center">{step.icon}</div>
                  <h3 className="text-lg font-display font-light text-[#172019] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#66706A] text-sm font-light">
                    {step.description}
                  </p>
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Matching Criteria Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Matching criteria
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card bg-[#F7F8F6]">
              <h3 className="text-display-medium font-display font-light text-[#172019] mb-6">
                Property Factors
              </h3>
              <ul className="space-y-4">
                {[
                  'Geographic location and market conditions',
                  'Investment strategy compatibility',
                  'Capital requirements vs. investor capacity',
                  'Projected ROI vs. investor targets',
                  'Risk profile and deal complexity',
                  'Timeline and holding period',
                  'Property type and condition',
                  'Exit strategy alignment'
                ].map((factor, index) => (
                  <li key={index} className="flex items-start text-[#66706A]">
                    <span className="text-[#173D2B] mr-3 mt-1">•</span>
                    {factor}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card bg-[#F7F8F6]">
              <h3 className="text-display-medium font-display font-light text-[#172019] mb-6">
                Investor Factors
              </h3>
              <ul className="space-y-4">
                {[
                  'Geographic focus and market preferences',
                  'Capital availability and range',
                  'Investment strategy preferences',
                  'Return requirements and risk tolerance',
                  'Experience level and deal history',
                  'Preferred timeline and holding period',
                  'Property type preferences',
                  'Team capabilities and resources'
                ].map((factor, index) => (
                  <li key={index} className="flex items-start text-[#66706A]">
                    <span className="text-[#173D2B] mr-3 mt-1">•</span>
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#173D2B]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollTriggeredAnimation direction="up">
            <h2 className="text-display-large font-display font-light text-[#FFFFFF] mb-6">
              Find your next opportunity
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Let our algorithm find the perfect match for your investment criteria.
            </p>
            <button className="bg-[#B7D83D] text-[#172019] px-8 py-4 rounded-full font-semibold hover:bg-[#A5C635] transition-all text-lg">
              Start matching →
            </button>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}