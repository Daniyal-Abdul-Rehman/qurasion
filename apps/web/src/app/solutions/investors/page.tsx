'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, InvestmentGraph3D } from '../../../components/3d';
import { ScrollTriggeredAnimation } from '../../../components/animations';
import { Search, BarChart3, Target, TrendingUp, DollarSign, Pen, Timer, Shield, Rocket } from 'lucide-react';

export default function InvestorsPage() {
  const workflow = [
    {
      step: 'DISCOVER',
      title: 'Find opportunities',
      description: 'AI-powered property discovery matches your criteria and alerts you to new deals.',
      icon: <Search className="w-12 h-12 text-[#173D2B]" />
    },
    {
      step: 'ANALYZE',
      title: 'Understand the numbers',
      description: 'Instant valuations, underwriting tools, and comparable analysis.',
      icon: <BarChart3 className="w-12 h-12 text-[#173D2B]" />
    },
    {
      step: 'MATCH',
      title: 'Find relevant deals',
      description: 'Algorithmic matching connects you with properties that fit your strategy.',
      icon: <Target className="w-12 h-12 text-[#173D2B]" />
    },
    {
      step: 'ACT',
      title: 'Submit offers',
      description: 'Streamlined offer management and document generation.',
      icon: <Pen className="w-12 h-12 text-[#173D2B]" />
    },
    {
      step: 'TRACK',
      title: 'Manage your investments',
      description: 'Complete deal tracking from offer to closing.',
      icon: <TrendingUp className="w-12 h-12 text-[#173D2B]" />
    }
  ];

  const benefits = [
    {
      title: 'Save Time',
      description: 'Reduce research time by 80% with AI-powered property intelligence.',
      stat: '80%',
      icon: <Timer className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Better Deals',
      description: 'Find off-market opportunities and identify undervalued properties.',
      stat: '3x',
      icon: <DollarSign className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Reduce Risk',
      description: 'Data-driven decisions with comprehensive due diligence.',
      stat: '60%',
      icon: <Shield className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Scale Faster',
      description: 'Pipeline management tools to handle more deals efficiently.',
      stat: '5x',
      icon: <Rocket className="w-12 h-12 text-[#173D2B]" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-[0.42]">
          <Scene3D variant="graph">
            <InvestmentGraph3D animated={true} scenario="base" showLabels={true} />
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
              Your next investment shouldn't start with a spreadsheet.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              Discover, evaluate and act on opportunities matched to your strategy and capital.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="btn-primary-lime px-8 py-4 rounded-full font-semibold text-lg">
                Start investing smarter →
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
                The investor workflow
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-5 gap-6">
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
                Why investors choose Qurasion
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
                Built for serious investors
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollTriggeredAnimation direction="left">
              <div className="card bg-[#F7F8F6]">
                <h3 className="text-display-medium font-display font-light text-[#172019] mb-6">
                  Property Intelligence
                </h3>
                <ul className="space-y-4">
                  {[
                    'Complete property profiles with ownership history',
                    'Automated valuations with confidence scores',
                    'Comparable analysis and market context',
                    'Document aggregation and organization',
                    'Risk assessment and red flag detection'
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
                  Investment Tools
                </h3>
                <ul className="space-y-4">
                  {[
                    'Interactive underwriting calculators',
                    'Sensitivity analysis for multiple scenarios',
                    'Investor matching and deal introduction',
                    'Pipeline management and tracking',
                    'AI-powered natural language queries'
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

      {/* Testimonial Section */}
      <section className="py-24 px-6 bg-[#F7F8F6]">
        <div className="max-w-4xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="card bg-[#FFFFFF] p-8 text-center">
              <div className="text-6xl mb-6">"</div>
              <p className="text-2xl font-display font-light text-[#172019] mb-6">
                Qurasion has completely transformed how I find and evaluate deals. What used to take days now takes minutes.
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-[#173D2B] rounded-full flex items-center justify-center text-[#FFFFFF] font-bold">
                  JD
                </div>
                <div className="text-left">
                  <div className="text-[#172019] font-medium">James Davidson</div>
                  <div className="text-[#66706A] text-sm">Real Estate Investor, Dallas</div>
                </div>
              </div>
            </div>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#173D2B]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollTriggeredAnimation direction="up">
            <h2 className="text-display-large font-display font-light text-[#FFFFFF] mb-6">
              Start investing smarter →
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Join thousands of investors who have transformed their deal flow with Qurasion.
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