'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, DataNetwork3D } from '../../../components/3d';
import { ScrollTriggeredAnimation } from '../../../components/animations';
import { Book, Code, FileText, Search, ArrowRight, Terminal, Database, Globe, Shield, Zap } from 'lucide-react';
import { useState } from 'react';

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      title: 'Getting Started',
      description: 'Quick start guides and onboarding tutorials',
      icon: <Zap className="w-8 h-8 text-[#173D2B]" />,
      articles: ['Platform Overview', 'Creating Your Account', 'First Property Search', 'Understanding Dashboards', 'Setting Up Alerts']
    },
    {
      title: 'Property Intelligence',
      description: 'Working with property data and analytics',
      icon: <Database className="w-8 h-8 text-[#173D2B]" />,
      articles: ['Property Profiles', 'Data Layers', 'Historical Timeline', 'Comparable Analysis', 'Document Access']
    },
    {
      title: 'AI Valuation',
      description: 'Understanding and using valuation models',
      icon: <Search className="w-8 h-8 text-[#173D2B]" />,
      articles: ['How Valuations Work', 'Confidence Scores', 'Model Transparency', 'Comparable Selection', 'Custom Adjustments']
    },
    {
      title: 'Investment Tools',
      description: 'Underwriting, matching, and deal management',
      icon: <FileText className="w-8 h-8 text-[#173D2B]" />,
      articles: ['Underwriting Terminal', 'Sensitivity Analysis', 'Investor Matching', 'Deal Pipeline', 'Document Generation']
    },
    {
      title: 'API Reference',
      description: 'Technical documentation for developers',
      icon: <Code className="w-8 h-8 text-[#173D2B]" />,
      articles: ['Authentication', 'Property Endpoints', 'Valuation API', 'Market Data API', 'Webhooks']
    },
    {
      title: 'Data Sources',
      description: 'Understanding our data infrastructure',
      icon: <Globe className="w-8 h-8 text-[#173D2B]" />,
      articles: ['Data Coverage', 'Update Frequency', 'Accuracy Metrics', 'Source Partners', 'Data Methodology']
    }
  ];

  const popularArticles = [
    'Getting Started with Qurasion',
    'Understanding Property Valuations',
    'API Authentication Guide',
    'Creating Investment Alerts',
    'Using the Underwriting Terminal'
  ];

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
              Documentation
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-8 leading-relaxed font-light"
            >
              Everything you need to use the Qurasion platform effectively.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#66706A]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search documentation..."
                  className="w-full bg-[#FFFFFF] border border-[#DDE2DD] rounded-full pl-12 pr-6 py-4 text-[#172019] focus:border-[#173D2B] outline-none shadow-sm"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 px-6 bg-[#FFFFFF] border-y border-[#DDE2DD]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {popularArticles.map((article) => (
              <button
                key={article}
                className="px-4 py-2 rounded-full text-sm font-medium bg-[#F7F8F6] text-[#66706A] border border-[#DDE2DD] hover:border-[#173D2B] hover:text-[#172019] transition-all"
              >
                {article}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <ScrollTriggeredAnimation key={category.title} delay={index * 0.05} direction="up">
                <div className="card bg-[#FFFFFF] hover:border-[#173D2B] transition-all cursor-pointer group h-full">
                  <div className="mb-4">{category.icon}</div>
                  <h3 className="text-xl font-display font-light text-[#172019] mb-2 group-hover:text-[#173D2B] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-[#66706A] font-light text-sm mb-6">
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.articles.map((article) => (
                      <li key={article} className="flex items-center text-[#66706A] text-sm hover:text-[#173D2B] transition-colors">
                        <ArrowRight className="w-4 h-4 mr-2 text-[#173D2B] opacity-0 group-hover:opacity-100 transition-opacity" />
                        {article}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* API Preview */}
      <section className="py-16 px-6 bg-[#F7F8F6]">
        <div className="max-w-4xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                API Quick Start
              </h2>
              <p className="text-xl text-[#66706A] font-light">
                Get started with the Qurasion API in minutes.
              </p>
            </div>
          </ScrollTriggeredAnimation>

          <ScrollTriggeredAnimation direction="up">
            <div className="bg-[#172019] rounded-2xl p-8 overflow-x-auto">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                <span className="text-[#9AA8A0] text-sm ml-4 font-mono">Terminal</span>
              </div>
              <pre className="text-[#B7D83D] font-mono text-sm leading-relaxed">
{`# Install the Qurasion SDK
npm install @qurasion/sdk

# Initialize the client
import { Qurasion } from '@qurasion/sdk';

const client = new Qurasion({
  apiKey: 'your-api-key'
});

# Search for properties
const properties = await client.properties.search({
  market: 'Dallas',
  minPrice: 200000,
  maxPrice: 400000,
  strategy: 'fix-flip'
});

console.log(properties);`}
              </pre>
            </div>
          </ScrollTriggeredAnimation>

          <div className="mt-8 text-center">
            <button className="bg-[#173D2B] text-[#FFFFFF] px-8 py-3 rounded-full font-semibold hover:bg-[#0F2B1D] transition-all inline-flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              View full API reference
            </button>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-24 px-6 bg-[#173D2B]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollTriggeredAnimation direction="up">
            <h2 className="text-display-large font-display font-light text-[#FFFFFF] mb-6">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-[#B7D83D] text-[#172019] px-8 py-4 rounded-full font-semibold hover:bg-[#A5C635] transition-all text-lg">
                Contact support →
              </button>
              <button className="text-[#E8E1D5] font-medium hover:text-[#FFFFFF] transition-colors">
                Join community
              </button>
            </div>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}
