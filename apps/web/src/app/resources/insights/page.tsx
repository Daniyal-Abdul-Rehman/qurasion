'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, DataNetwork3D } from '../../../components/3d';
import { ScrollTriggeredAnimation } from '../../../components/animations';
import { Calendar, Clock, ArrowRight, Tag, TrendingUp, BarChart3, Home, DollarSign, Lightbulb } from 'lucide-react';

export default function InsightsPage() {
  const featuredArticle = {
    title: 'The Future of Real Estate Intelligence: AI-Driven Decision Making',
    excerpt: 'How artificial intelligence is transforming the way investors analyze, evaluate, and acquire real estate properties.',
    date: 'Aug 28, 2026',
    readTime: '8 min read',
    category: 'Industry Trends',
    icon: <Lightbulb className="w-12 h-12 text-[#173D2B]" />
  };

  const articles = [
    {
      title: 'Understanding Property Valuation Models: A Technical Deep Dive',
      excerpt: 'Explore the machine learning techniques behind accurate property valuations and how they compare to traditional appraisal methods.',
      date: 'Aug 20, 2026',
      readTime: '12 min read',
      category: 'Technology',
      icon: <BarChart3 className="w-8 h-8 text-[#173D2B]" />
    },
    {
      title: 'Market Trends: Dallas-Fort Worth Investment Opportunities in 2026',
      excerpt: 'Analysis of the DFW market reveals emerging neighborhoods and investment strategies for the coming year.',
      date: 'Aug 15, 2026',
      readTime: '6 min read',
      category: 'Market Analysis',
      icon: <TrendingUp className="w-8 h-8 text-[#173D2B]" />
    },
    {
      title: 'Fix & Flip vs. Buy & Hold: Data-Driven Strategy Comparison',
      excerpt: 'We analyzed 10,000 transactions to understand which strategy performs better in different market conditions.',
      date: 'Aug 10, 2026',
      readTime: '10 min read',
      category: 'Investment Strategy',
      icon: <DollarSign className="w-8 h-8 text-[#173D2B]" />
    },
    {
      title: 'The Power of Geographic Intelligence in Real Estate',
      excerpt: 'How location data and neighborhood analytics can give investors a competitive edge in deal selection.',
      date: 'Aug 5, 2026',
      readTime: '7 min read',
      category: 'Data Intelligence',
      icon: <Home className="w-8 h-8 text-[#173D2B]" />
    },
    {
      title: 'Building Your Investment Pipeline: From 0 to 50 Deals',
      excerpt: 'A step-by-step guide to building a sustainable deal flow using technology and data-driven approaches.',
      date: 'Jul 30, 2026',
      readTime: '9 min read',
      category: 'Getting Started',
      icon: <TrendingUp className="w-8 h-8 text-[#173D2B]" />
    },
    {
      title: 'Understanding Cap Rates and Cash-on-Cash Returns',
      excerpt: 'A comprehensive guide to the financial metrics every real estate investor should understand.',
      date: 'Jul 25, 2026',
      readTime: '11 min read',
      category: 'Investment Basics',
      icon: <BarChart3 className="w-8 h-8 text-[#173D2B]" />
    }
  ];

  const categories = ['All', 'Industry Trends', 'Technology', 'Market Analysis', 'Investment Strategy', 'Data Intelligence', 'Getting Started'];

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
              Insights
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto leading-relaxed font-light"
            >
              Research, analysis, and perspectives on real estate intelligence and investment.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 border-y border-[#DDE2DD] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full text-sm font-medium bg-[#F7F8F6] text-[#66706A] border border-[#DDE2DD] hover:border-[#173D2B] hover:text-[#172019] transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="card bg-[#FFFFFF] hover:border-[#173D2B] transition-all cursor-pointer group">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="bg-[#F7F8F6] rounded-lg p-8 flex items-center justify-center">
                  {featuredArticle.icon}
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-[#173D2B]/10 text-[#173D2B] px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="bg-[#F7F8F6] text-[#66706A] px-3 py-1 rounded-full text-sm">
                      {featuredArticle.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-light text-[#172019] mb-4 group-hover:text-[#173D2B] transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-[#66706A] font-light mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-[#66706A]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredArticle.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredArticle.readTime}
                    </div>
                    <div className="flex items-center gap-2 text-[#173D2B] font-medium">
                      Read more <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-6 bg-[#F7F8F6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <ScrollTriggeredAnimation key={article.title} delay={index * 0.05} direction="up">
                <div className="card bg-[#FFFFFF] hover:border-[#173D2B] transition-all cursor-pointer group h-full">
                  <div className="mb-4">{article.icon}</div>
                  <div className="mb-4">
                    <span className="bg-[#F7F8F6] text-[#66706A] px-3 py-1 rounded-full text-sm">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-light text-[#172019] mb-3 group-hover:text-[#173D2B] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#66706A] font-light text-sm mb-6">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-[#66706A] mt-auto">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
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
              Stay informed
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Subscribe to our newsletter for the latest insights and market intelligence.
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
