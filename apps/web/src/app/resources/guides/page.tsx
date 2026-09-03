'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, DataNetwork3D } from '../../../components/3d';
import { ScrollTriggeredAnimation } from '../../../components/animations';
import { BookOpen, Clock, ArrowRight, Home, DollarSign, TrendingUp, BarChart3, Users, Search } from 'lucide-react';

export default function GuidesPage() {
  const guides = [
    {
      title: 'The Complete Guide to Real Estate Investing',
      description: 'Everything you need to know to start investing in real estate, from basic concepts to advanced strategies.',
      readTime: '25 min read',
      level: 'Beginner',
      icon: <Home className="w-12 h-12 text-[#173D2B]" />,
      chapters: ['Getting Started', 'Market Analysis', 'Property Evaluation', 'Financing Options', 'Due Diligence', 'Closing & Management']
    },
    {
      title: 'Fix & Flip Masterclass',
      description: 'A deep dive into the fix and flip strategy, including project management, budgeting, and exit strategies.',
      readTime: '30 min read',
      level: 'Intermediate',
      icon: <DollarSign className="w-12 h-12 text-[#173D2B]" />,
      chapters: ['Finding Deals', 'Budgeting Renovations', 'Project Management', 'Exit Strategies', 'Tax Considerations']
    },
    {
      title: 'Understanding Property Valuation',
      description: 'Learn how properties are valued, from traditional appraisals to AI-powered models.',
      readTime: '20 min read',
      level: 'Intermediate',
      icon: <BarChart3 className="w-12 h-12 text-[#173D2B]" />,
      chapters: ['Valuation Methods', 'Comparable Sales', 'Income Approach', 'AI Valuations', 'Confidence Scores']
    },
    {
      title: 'Market Analysis for Investors',
      description: 'How to evaluate real estate markets and identify the best investment opportunities.',
      readTime: '18 min read',
      level: 'Intermediate',
      icon: <TrendingUp className="w-12 h-12 text-[#173D2B]" />,
      chapters: ['Market Indicators', 'Economic Factors', 'Demographic Trends', 'Supply & Demand', 'Risk Assessment']
    },
    {
      title: 'Building Your Investment Team',
      description: 'The key relationships and professionals every real estate investor needs.',
      readTime: '15 min read',
      level: 'Beginner',
      icon: <Users className="w-12 h-12 text-[#173D2B]" />,
      chapters: ['Key Roles', 'Finding Partners', 'Working with Agents', 'Legal & Tax', 'Building Relationships']
    },
    {
      title: 'Due Diligence Checklist',
      description: 'A comprehensive guide to evaluating properties before making an investment decision.',
      readTime: '22 min read',
      level: 'Advanced',
      icon: <Search className="w-12 h-12 text-[#173D2B]" />,
      chapters: ['Physical Inspection', 'Financial Analysis', 'Legal Review', 'Environmental', 'Title & Insurance']
    }
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <Scene3D>
            <DataNetwork3D animated={true} stage="enrich" />
          </Scene3D>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-display-hero font-display font-light text-[#172019] mb-6 leading-tight">
              Guides
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto leading-relaxed font-light"
            >
              Comprehensive guides to help you master real estate investing with data-driven insights.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Level Filter */}
      <section className="py-8 px-6 border-y border-[#DDE2DD] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {levels.map((level) => (
              <button
                key={level}
                className="px-4 py-2 rounded-full text-sm font-medium bg-[#F7F8F6] text-[#66706A] border border-[#DDE2DD] hover:border-[#173D2B] hover:text-[#172019] transition-all"
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <ScrollTriggeredAnimation key={guide.title} delay={index * 0.05} direction="up">
                <div className="card bg-[#FFFFFF] hover:border-[#173D2B] transition-all cursor-pointer group h-full flex flex-col">
                  <div className="mb-4">{guide.icon}</div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      guide.level === 'Beginner' ? 'bg-[#22C55E]/10 text-[#22C55E]' :
                      guide.level === 'Intermediate' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                      'bg-[#EF4444]/10 text-[#EF4444]'
                    }`}>
                      {guide.level}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-[#66706A]">
                      <Clock className="w-4 h-4" />
                      {guide.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-light text-[#172019] mb-3 group-hover:text-[#173D2B] transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-[#66706A] font-light text-sm mb-6">
                    {guide.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-[#DDE2DD]">
                    <div className="text-[#66706A] text-sm mb-3">Chapters:</div>
                    <div className="flex flex-wrap gap-2">
                      {guide.chapters.map((chapter) => (
                        <span key={chapter} className="bg-[#F7F8F6] text-[#66706A] px-2 py-1 rounded text-xs">
                          {chapter}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-[#173D2B] font-medium text-sm group-hover:gap-2 transition-all">
                    Read guide <ArrowRight className="w-4 h-4 ml-1" />
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
              Ready to start investing?
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Put your knowledge into practice with our AI-powered platform.
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
