'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, DataNetwork3D } from '../../../components/3d';
import { ScrollTriggeredAnimation } from '../../../components/animations';
import { BarChart3, CheckCircle, Lightbulb, TrendingUp, Download, Microscope, Radio, Timer } from 'lucide-react';

export default function AnalystsPage() {
  const workflow = [
    {
      step: 'GATHER',
      title: 'Collect data',
      description: 'Automated data aggregation from multiple sources.',
      icon: <Download className="w-12 h-12 text-[#173D2B]" />
    },
    {
      step: 'ANALYZE',
      title: 'Generate insights',
      description: 'AI-powered analysis and market intelligence.',
      icon: <Microscope className="w-12 h-12 text-[#173D2B]" />
    },
    {
      step: 'REPORT',
      title: 'Share findings',
      description: 'Automated report generation and distribution.',
      icon: <BarChart3 className="w-12 h-12 text-[#173D2B]" />
    },
    {
      step: 'MONITOR',
      title: 'Track changes',
      description: 'Real-time monitoring and alert systems.',
      icon: <Radio className="w-12 h-12 text-[#173D2B]" />
    }
  ];

  const benefits = [
    {
      title: 'Time Savings',
      description: 'Reduce research time by 70% with automated workflows.',
      stat: '70%',
      icon: <Timer className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Data Quality',
      description: 'Higher quality data with automated validation.',
      stat: '95%',
      icon: <CheckCircle className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Insight Depth',
      description: 'Deeper insights with AI-powered analysis.',
      stat: '3x',
      icon: <Lightbulb className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Report Speed',
      description: 'Generate reports in minutes instead of hours.',
      stat: '10x',
      icon: <TrendingUp className="w-12 h-12 text-[#173D2B]" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-[0.42]">
          <Scene3D variant="network">
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
              Turn data into decisions.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              AI-powered market intelligence for real estate analysts and researchers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="btn-primary-lime px-8 py-4 rounded-full font-semibold text-lg">
                Start analyzing →
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
                The analyst workflow
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
                Why analysts choose Qurasion
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
                Built for analysts
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollTriggeredAnimation direction="left">
              <div className="card bg-[#F7F8F6]">
                <h3 className="text-display-medium font-display font-light text-[#172019] mb-6">
                  Data Collection
                </h3>
                <ul className="space-y-4">
                  {[
                    'Automated data aggregation from multiple sources',
                    'Real-time market data feeds',
                    'Historical data access',
                    'Custom data integrations',
                    'API access for custom workflows'
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
                  Analysis & Reporting
                </h3>
                <ul className="space-y-4">
                  {[
                    'AI-powered market analysis',
                    'Automated report generation',
                    'Custom dashboard creation',
                    'Collaborative workspaces',
                    'Export to multiple formats'
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
              Analyze smarter, not harder →
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Transform your research workflow with AI-powered market intelligence.
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