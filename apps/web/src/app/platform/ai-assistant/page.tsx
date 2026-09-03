'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, DataNetwork3D } from '../../../components/3d';
import { ScrollTriggeredAnimation } from '../../../components/animations';
import { useState } from 'react';
import { Home, BarChart3, DollarSign, TrendingUp, Search, TrendingDown, AlertTriangle } from 'lucide-react';

export default function AIAssistantPage() {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const sampleQuery = "Which properties in Dallas have the strongest fix-and-flip potential under $300K?";

  const handleQuery = async () => {
    if (!query.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setResponse({
        count: 47,
        topOpportunity: {
          address: '123 Main Street',
          investmentScore: 82.4,
          estimatedValue: 318000,
          projectedRoi: 24.8,
          purchasePrice: 240000,
          arv: 335000
        },
        reasons: [
          'Strong comparable support',
          'Capital requirement matches',
          'Target geography',
          'ROI exceeds investor threshold'
        ]
      });
      setIsProcessing(false);
    }, 2000);
  };

  const handleSampleQuery = () => {
    setQuery(sampleQuery);
    handleQuery();
  };

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
              Ask the market anything.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              AI makes complex real-estate intelligence easier to understand.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* AI Interface Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Try it yourself
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          {/* Query Input */}
          <div className="card bg-[#F7F8F6] mb-8">
            <div className="mb-6">
              <label className="text-[#66706A] text-sm uppercase tracking-widest mb-2 block">
                Ask about properties, markets, or investments
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., Which properties in Dallas have the strongest fix-and-flip potential under $300K?"
                  className="flex-1 bg-[#FFFFFF] border border-[#DDE2DD] rounded-lg px-4 py-3 text-[#172019] focus:border-[#173D2B] outline-none"
                />
                <button
                  onClick={handleQuery}
                  disabled={isProcessing || !query.trim()}
                  className="btn-primary-lime px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Ask'}
                </button>
              </div>
            </div>

            {/* Sample Query */}
            <button
              onClick={handleSampleQuery}
              className="text-[#173D2B] text-sm hover:underline"
            >
              Try sample query: "{sampleQuery}"
            </button>
          </div>

          {/* AI Response */}
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card bg-[#F7F8F6]"
            >
              <div className="mb-6">
                <div className="text-[#173D2B] font-mono text-sm mb-2">
                  {response.count} properties match.
                </div>
                <div className="text-[#66706A]">
                  Top opportunity:
                </div>
              </div>

              {/* Top Opportunity Card */}
              <div className="bg-[#FFFFFF] border border-[#DDE2DD] rounded-lg p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-display font-light text-[#172019] mb-1">
                      {response.topOpportunity.address}
                    </h3>
                    <p className="text-[#66706A] text-sm">Dallas, TX</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[#173D2B] font-light text-lg">
                      {response.topOpportunity.investmentScore}
                    </div>
                    <div className="text-[#66706A] text-xs">Investment Score</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-[#66706A] text-xs uppercase tracking-wider mb-1">Estimated Value</div>
                    <div className="text-[#172019] font-mono font-light">
                      ${response.topOpportunity.estimatedValue.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#66706A] text-xs uppercase tracking-wider mb-1">Projected ROI</div>
                    <div className="text-[#22C55E] font-light">
                      {response.topOpportunity.projectedRoi}%
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#DDE2DD]">
                  <div>
                    <div className="text-[#66706A] text-xs uppercase tracking-wider mb-1">Purchase</div>
                    <div className="text-[#172019] font-mono font-light">
                      ${response.topOpportunity.purchasePrice.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#66706A] text-xs uppercase tracking-wider mb-1">ARV</div>
                    <div className="text-[#173D2B] font-mono font-light">
                      ${response.topOpportunity.arv.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Section */}
              <div>
                <div className="text-[#66706A] mb-4">WHY?</div>
                <div className="space-y-2">
                  {response.reasons.map((reason: string, index: number) => (
                    <motion.div
                      key={reason}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-[#22C55E]"
                    >
                      <span className="mr-2">✓</span>
                      {reason}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 px-6 bg-[#F7F8F6]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                What you can ask
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                category: 'Property Search',
                questions: [
                  'Show me properties under $300K in Dallas',
                  'Find fix-and-flip opportunities in Austin',
                  'What rentals have the highest cap rates?'
                ],
                icon: <Home className="w-12 h-12 text-[#173D2B]" />
              },
              {
                category: 'Market Analysis',
                questions: [
                  'How is the Phoenix market performing?',
                  'Compare Dallas vs Houston investment potential',
                  'What are the fastest-growing neighborhoods?'
                ],
                icon: <BarChart3 className="w-12 h-12 text-[#173D2B]" />
              },
              {
                category: 'Investment Analysis',
                questions: [
                  'Calculate ROI for 123 Main Street',
                  'What\'s the best strategy for this property?',
                  'Show me comparable properties'
                ],
                icon: <DollarSign className="w-12 h-12 text-[#173D2B]" />
              },
              {
                category: 'Valuation',
                questions: [
                  'What is this property worth?',
                  'Explain the valuation model',
                  'Show me the comparables used'
                ],
                icon: <TrendingUp className="w-12 h-12 text-[#173D2B]" />
              },
              {
                category: 'Due Diligence',
                questions: [
                  'What are the risks for this property?',
                  'Show me the permit history',
                  'Are there any title issues?'
                ],
                icon: <Search className="w-12 h-12 text-[#173D2B]" />
              },
              {
                category: 'Market Trends',
                questions: [
                  'Where are prices heading?',
                  'What\'s driving demand in this area?',
                  'Show me historical price trends'
                ],
                icon: <TrendingDown className="w-12 h-12 text-[#173D2B]" />
              }
            ].map((category, index) => (
              <ScrollTriggeredAnimation key={category.category} delay={index * 0.05} direction="up">
                <div className="card bg-[#FFFFFF]">
                  <div className="mb-4 flex justify-center">{category.icon}</div>
                  <h3 className="text-lg font-display font-light text-[#172019] mb-4">
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.questions.map((question, qIndex) => (
                      <li key={qIndex} className="text-[#66706A] text-sm flex items-start">
                        <span className="text-[#173D2B] mr-2 mt-1">•</span>
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Important Positioning Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="card bg-[#F7F8F6]">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex items-center"><AlertTriangle className="w-12 h-12 text-[#173D2B]" /></div>
                <div>
                  <h3 className="text-display-medium font-display font-light text-[#172019] mb-4">
                    Important Positioning
                  </h3>
                  <p className="text-[#66706A] text-lg mb-4 font-light">
                    Our AI doesn't predict the future. It makes complex real-estate intelligence easier to understand.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-[#22C55E] mr-3 mt-1">✓</span>
                  <div>
                    <div className="text-[#172019] font-medium">Explains validated results</div>
                    <div className="text-[#66706A] text-sm">AI interprets data and models, but doesn't invent prices, costs, or returns</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-[#22C55E] mr-3 mt-1">✓</span>
                  <div>
                    <div className="text-[#172019] font-medium">Provides context and insights</div>
                    <div className="text-[#66706A] text-sm">Helps you understand what the data means and why it matters</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-[#22C55E] mr-3 mt-1">✓</span>
                  <div>
                    <div className="text-[#172019] font-medium">Accelerates research</div>
                    <div className="text-[#66706A] text-sm">Natural language interface saves time on manual analysis</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-[#EF4444] mr-3 mt-1">✗</span>
                  <div>
                    <div className="text-[#172019] font-medium">Does not predict future prices</div>
                    <div className="text-[#66706A] text-sm">All projections are based on historical data and current market conditions</div>
                  </div>
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
              Ask your first question →
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Transform how you research and analyze real estate investments.
            </p>
            <button className="bg-[#B7D83D] text-[#172019] px-8 py-4 rounded-full font-semibold hover:bg-[#A5C635] transition-all text-lg">
              Try AI Assistant →
            </button>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}