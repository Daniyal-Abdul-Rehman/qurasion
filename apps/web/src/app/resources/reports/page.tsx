'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, DataNetwork3D } from '../../../components/3d';
import { ScrollTriggeredAnimation } from '../../../components/animations';
import { FileText, Download, Calendar, TrendingUp, BarChart3, Home, Map, DollarSign } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    {
      title: 'Q3 2026 Market Intelligence Report',
      description: 'Comprehensive analysis of national real estate market trends, investment opportunities, and risk indicators.',
      date: 'Sep 1, 2026',
      pages: '48 pages',
      category: 'Market Report',
      icon: <TrendingUp className="w-12 h-12 text-[#173D2B]" />,
      featured: true
    },
    {
      title: 'Dallas-Fort Worth Investment Landscape',
      description: 'Deep dive into DFW market dynamics, emerging neighborhoods, and investment strategies.',
      date: 'Aug 15, 2026',
      pages: '32 pages',
      category: 'Regional Analysis',
      icon: <Map className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Fix & Flip Performance Analysis',
      description: 'Data-driven analysis of fix and flip returns across 50 major markets.',
      date: 'Aug 1, 2026',
      pages: '24 pages',
      category: 'Strategy Report',
      icon: <DollarSign className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Property Valuation Accuracy Report',
      description: 'How our AI models compare to traditional appraisals across different property types.',
      date: 'Jul 15, 2026',
      pages: '18 pages',
      category: 'Technology Report',
      icon: <BarChart3 className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Austin Market Opportunity Brief',
      description: 'Key indicators and emerging opportunities in the Austin real estate market.',
      date: 'Jul 1, 2026',
      pages: '12 pages',
      category: 'Regional Analysis',
      icon: <Home className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Investor Sentiment Survey Results',
      description: 'Insights from 500+ active real estate investors on market outlook and strategy preferences.',
      date: 'Jun 15, 2026',
      pages: '28 pages',
      category: 'Survey Report',
      icon: <FileText className="w-12 h-12 text-[#173D2B]" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.42]">
          <Scene3D variant="graph">
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
              Reports
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto leading-relaxed font-light"
            >
              In-depth research and analysis for data-driven investment decisions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Report */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="card bg-[#FFFFFF] border-[#173D2B] border-2 hover:shadow-lg transition-all">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-[#F7F8F6] rounded-lg p-12 flex items-center justify-center">
                  {reports[0].icon}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#B7D83D] text-[#172019] px-3 py-1 rounded-full text-sm font-medium">
                      Latest Report
                    </span>
                    <span className="bg-[#F7F8F6] text-[#66706A] px-3 py-1 rounded-full text-sm">
                      {reports[0].category}
                    </span>
                  </div>
                  <h2 className="text-3xl font-display font-light text-[#172019] mb-4">
                    {reports[0].title}
                  </h2>
                  <p className="text-[#66706A] font-light mb-6">
                    {reports[0].description}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-[#66706A] mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {reports[0].date}
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {reports[0].pages}
                    </div>
                  </div>
                  <button className="bg-[#173D2B] text-[#FFFFFF] px-8 py-3 rounded-full font-semibold hover:bg-[#0F2B1D] transition-all flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="py-16 px-6 bg-[#F7F8F6]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                All Reports
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.slice(1).map((report, index) => (
              <ScrollTriggeredAnimation key={report.title} delay={index * 0.05} direction="up">
                <div className="card bg-[#FFFFFF] hover:border-[#173D2B] transition-all cursor-pointer group h-full">
                  <div className="mb-4">{report.icon}</div>
                  <div className="mb-4">
                    <span className="bg-[#F7F8F6] text-[#66706A] px-3 py-1 rounded-full text-sm">
                      {report.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-light text-[#172019] mb-3 group-hover:text-[#173D2B] transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-[#66706A] font-light text-sm mb-6">
                    {report.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-[#66706A] mt-auto pt-4 border-t border-[#DDE2DD]">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {report.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        {report.pages}
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-[#173D2B]" />
                  </div>
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-24 px-6 bg-[#173D2B]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollTriggeredAnimation direction="up">
            <h2 className="text-display-large font-display font-light text-[#FFFFFF] mb-6">
              Get reports delivered
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Subscribe to receive new reports and market analysis directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:flex-1 bg-[#0F2B1D] border border-[#173D2B] rounded-full px-6 py-4 text-[#FFFFFF] placeholder-[#9AA8A0] focus:outline-none focus:border-[#B7D83D]"
              />
              <button className="bg-[#B7D83D] text-[#172019] px-8 py-4 rounded-full font-semibold hover:bg-[#A5C635] transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}
