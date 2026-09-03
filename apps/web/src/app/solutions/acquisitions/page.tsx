'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, City3D } from '../../../components/3d';
import { ScrollTriggeredAnimation } from '../../../components/animations';
import { Search, BarChart3, TrendingUp, Zap, Users, Pen, Gem, Shield } from 'lucide-react';

export default function AcquisitionsPage() {
  const workflow = [
    {
      step: 'DISCOVER',
      title: 'Find opportunities',
      description: 'AI-powered property discovery surfaces off-market deals and undervalued properties.',
      icon: <Search className="w-12 h-12 text-[#173D2B]" />
    },
    {
      step: 'EVALUATE',
      title: 'Analyze potential',
      description: 'Instant valuations, underwriting tools, and comprehensive due diligence.',
      icon: <BarChart3 className="w-12 h-12 text-[#173D2B]" />
    },
    {
      step: 'ACQUIRE',
      title: 'Close deals faster',
      description: 'Streamlined offer management and automated document generation.',
      icon: <Pen className="w-12 h-12 text-[#173D2B]" />
    },
    {
      step: 'TRACK',
      title: 'Manage portfolio',
      description: 'Complete portfolio tracking and performance analytics.',
      icon: <TrendingUp className="w-12 h-12 text-[#173D2B]" />
    }
  ];

  const benefits = [
    {
      title: 'Deal Velocity',
      description: 'Close deals 3x faster with automated workflows.',
      stat: '3x',
      icon: <Zap className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Deal Quality',
      description: 'Access off-market opportunities before competitors.',
      stat: '40%',
      icon: <Gem className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Risk Reduction',
      description: 'Data-driven decisions with comprehensive due diligence.',
      stat: '50%',
      icon: <Shield className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Team Efficiency',
      description: 'Collaboration tools for your acquisition team.',
      stat: '2x',
      icon: <Users className="w-12 h-12 text-[#173D2B]" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <Scene3D>
            <City3D animated={true} dataStreams={true} />
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
              Build your portfolio faster.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              AI-powered acquisition tools for finding, evaluating, and closing real estate deals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="btn-primary-lime px-8 py-4 rounded-full font-semibold text-lg">
                Start acquiring →
              </button>
              
              <button className="text-[#66706A] font-medium hover:text-[#172019] transition-colors">
                See how it works
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                The acquisition workflow
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-4 gap-6">
            {workflow.map((item, index) => (
              <ScrollTriggeredAnimation key={item.step} delay={index * 0.1} direction="up">
                <div className="card bg-[#F7F8F6] h-full">
                  <div className="text-[#173D2B] font-mono text-sm mb-4">
                    {item.step}
                  </div>
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="text-lg font-display font-light text-[#172019] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#66706A] text-sm font-light">
                    {item.description}
                  </p>
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-[#F7F8F6]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Why acquisition teams choose Qurasion
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <ScrollTriggeredAnimation key={benefit.title} delay={index * 0.1} direction="up">
                <div className="card bg-[#FFFFFF] text-center">
                  <div className="mb-4 flex justify-center">{benefit.icon}</div>
                  <div className="text-5xl font-display font-light text-[#173D2B] mb-2">
                    {benefit.stat}
                  </div>
                  <h3 className="text-xl font-display font-light text-[#172019] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-[#66706A] font-light">
                    {benefit.description}
                  </p>
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Built for acquisition teams
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollTriggeredAnimation direction="left">
              <div className="card bg-[#F7F8F6]">
                <h3 className="text-display-medium font-display font-light text-[#172019] mb-6">
                  Deal Sourcing
                </h3>
                <ul className="space-y-4">
                  {[
                    'Off-market opportunity discovery',
                    'AI-powered property matching',
                    'Custom deal alerts and notifications',
                    'Market trend analysis',
                    'Competitor tracking'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start text-[#66706A]">
                      <span className="text-[#173D2B] mr-3 mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollTriggeredAnimation>

            <ScrollTriggeredAnimation direction="right">
              <div className="card bg-[#F7F8F6]">
                <h3 className="text-display-medium font-display font-light text-[#172019] mb-6">
                  Deal Execution
                </h3>
                <ul className="space-y-4">
                  {[
                    'Automated underwriting and analysis',
                    'Document generation and management',
                    'Deal pipeline tracking',
                    'Team collaboration tools',
                    'Integration with title and closing services'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start text-[#66706A]">
                      <span className="text-[#173D2B] mr-3 mt-1">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollTriggeredAnimation>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#173D2B]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollTriggeredAnimation direction="up">
            <h2 className="text-display-large font-display font-light text-[#FFFFFF] mb-6">
              Start acquiring smarter →
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Transform your acquisition workflow with AI-powered tools.
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