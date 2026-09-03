'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, City3D } from '../../../components/3d';
import { ScrollTriggeredAnimation } from '../../../components/animations';
import { useState } from 'react';
import { Home, Search, Map, Settings, Heart, Bell, BarChart3, TrendingUp, DollarSign } from 'lucide-react';

export default function MarketplacePage() {
  const [selectedMarket, setSelectedMarket] = useState('Dallas');
  const [priceRange, setPriceRange] = useState([200000, 400000]);
  const [strategy, setStrategy] = useState('fix-flip');

  const opportunities = [
    {
      id: 1,
      address: '123 Main Street',
      city: 'Dallas',
      state: 'TX',
      purchase: 240000,
      arv: 335000,
      investmentScore: 82.4,
      projectedRoi: 24.8,
      strategy: 'Fix & Flip',
      capitalRequired: 96000,
      image: <Home className="w-16 h-16 text-[#173D2B]" />
    },
    {
      id: 2,
      address: '456 Oak Avenue',
      city: 'Austin',
      state: 'TX',
      purchase: 285000,
      arv: 395000,
      investmentScore: 78.9,
      projectedRoi: 21.2,
      strategy: 'Buy & Hold',
      capitalRequired: 114000,
      image: <Home className="w-16 h-16 text-[#173D2B]" />
    },
    {
      id: 3,
      address: '789 Pine Road',
      city: 'Houston',
      state: 'TX',
      purchase: 195000,
      arv: 275000,
      investmentScore: 75.3,
      projectedRoi: 18.9,
      strategy: 'Fix & Flip',
      capitalRequired: 78000,
      image: <Home className="w-16 h-16 text-[#173D2B]" />
    },
    {
      id: 4,
      address: '321 Elm Street',
      city: 'San Antonio',
      state: 'TX',
      purchase: 220000,
      arv: 310000,
      investmentScore: 80.1,
      projectedRoi: 22.5,
      strategy: 'Wholesale',
      capitalRequired: 88000,
      image: <Home className="w-16 h-16 text-[#173D2B]" />
    },
  ];

  const markets = ['Dallas', 'Austin', 'Houston', 'San Antonio', 'Phoenix', 'Miami'];
  const strategies = ['Fix & Flip', 'Buy & Hold', 'Wholesale'];

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
              Stop searching listings.
            </h1>
            <h1 className="text-display-hero font-display font-light text-[#173D2B] mb-6 leading-tight">
              Start discovering opportunities.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              AI-powered opportunity discovery that matches properties to your investment criteria.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Marketplace Interface */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Interactive Marketplace
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg p-6 sticky top-24 shadow-sm">
                <h3 className="text-lg font-display font-light text-[#172019] mb-6">Filters</h3>
                
                {/* Market Filter */}
                <div className="mb-6">
                  <label className="text-[#66706A] text-sm mb-2 block">Market</label>
                  <select 
                    value={selectedMarket}
                    onChange={(e) => setSelectedMarket(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#DDE2DD] rounded-lg px-4 py-2 text-[#172019] focus:border-[#173D2B] outline-none"
                  >
                    {markets.map(market => (
                      <option key={market} value={market}>{market}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="text-[#66706A] text-sm mb-2 block">Price Range</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full bg-[#FFFFFF] border border-[#DDE2DD] rounded-lg px-3 py-2 text-[#172019] focus:border-[#173D2B] outline-none"
                      placeholder="Min"
                    />
                    <span className="text-[#66706A]">-</span>
                    <input 
                      type="number" 
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full bg-[#FFFFFF] border border-[#DDE2DD] rounded-lg px-3 py-2 text-[#172019] focus:border-[#173D2B] outline-none"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Strategy Filter */}
                <div className="mb-6">
                  <label className="text-[#66706A] text-sm mb-2 block">Strategy</label>
                  <div className="space-y-2">
                    {strategies.map(strat => (
                      <label key={strat} className="flex items-center cursor-pointer">
                        <input 
                          type="radio"
                          value={strat}
                          checked={strategy === strat}
                          onChange={(e) => setStrategy(e.target.value)}
                          className="mr-2 accent-[#173D2B]"
                        />
                        <span className="text-[#172019]">{strat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* ROI Filter */}
                <div className="mb-6">
                  <label className="text-[#66706A] text-sm mb-2 block">Min ROI</label>
                  <input 
                    type="range" 
                    min="10" 
                    max="30" 
                    defaultValue="15"
                    className="w-full accent-[#173D2B]"
                  />
                  <div className="text-[#173D2B] text-sm mt-1">15%+</div>
                </div>

                <button className="w-full btn-primary-lime py-3 rounded-lg font-semibold">
                  Apply Filters
                </button>
              </div>
            </div>

            {/* Opportunity Cards */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6">
                {opportunities.map((opp, index) => (
                  <ScrollTriggeredAnimation key={opp.id} delay={index * 0.05} direction="up">
                    <div className="property-intelligence-card bg-[#FFFFFF] hover:border-[#173D2B] transition-all group cursor-pointer">
                      {/* Property Image Placeholder */}
                      <div className="h-48 bg-[#F7F8F6] flex items-center justify-center">
                        {opp.image}
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-display font-light text-[#172019] mb-1">
                              {opp.address}
                            </h3>
                            <p className="text-[#66706A] text-sm">
                              {opp.city}, {opp.state}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-[#173D2B] font-light text-lg">
                              {opp.investmentScore}
                            </div>
                            <div className="text-[#66706A] text-xs">Investment Score</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-[#66706A] text-xs uppercase tracking-wider mb-1">Purchase</div>
                            <div className="text-[#172019] font-mono font-light">
                              ${opp.purchase.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-[#66706A] text-xs uppercase tracking-wider mb-1">ARV</div>
                            <div className="text-[#173D2B] font-mono font-light">
                              ${opp.arv.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-[#DDE2DD]">
                          <div>
                            <div className="text-[#66706A] text-xs uppercase tracking-wider mb-1">Projected ROI</div>
                            <div className="text-[#22C55E] font-light">
                              {opp.projectedRoi}%
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[#66706A] text-xs uppercase tracking-wider mb-1">Capital Required</div>
                            <div className="text-[#172019] font-mono font-light">
                              ${opp.capitalRequired.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <button className="w-full mt-4 bg-[#F7F8F6] text-[#173D2B] py-3 rounded-lg font-light hover:bg-[#173D2B] hover:text-[#FFFFFF] transition-all group-hover:bg-[#173D2B] group-hover:text-[#FFFFFF]">
                          View opportunity →
                        </button>
                      </div>
                    </div>
                  </ScrollTriggeredAnimation>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-[#F7F8F6]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Smart discovery features
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Smart Search', description: 'Natural language search to find properties matching your criteria', icon: <Search className="w-12 h-12 text-[#173D2B]" /> },
              { title: 'Map-Based Discovery', description: 'Interactive map to explore opportunities geographically', icon: <Map className="w-12 h-12 text-[#173D2B]" /> },
              { title: 'Investment Filters', description: 'Filter by ROI, capital requirements, and investment strategy', icon: <Settings className="w-12 h-12 text-[#173D2B]" /> },
              { title: 'Saved Opportunities', description: 'Save and track properties that match your criteria', icon: <Heart className="w-12 h-12 text-[#173D2B]" /> },
              { title: 'Custom Alerts', description: 'Get notified when new properties match your criteria', icon: <Bell className="w-12 h-12 text-[#173D2B]" /> },
              { title: 'Opportunity Ranking', description: 'AI-powered investment scores to prioritize deals', icon: <BarChart3 className="w-12 h-12 text-[#173D2B]" /> },
              { title: 'Market Analytics', description: 'Understand market conditions before investing', icon: <TrendingUp className="w-12 h-12 text-[#173D2B]" /> },
              { title: 'Quick Underwriting', description: 'Run financial scenarios with one click', icon: <DollarSign className="w-12 h-12 text-[#173D2B]" /> },
            ].map((feature, index) => (
              <ScrollTriggeredAnimation key={feature.title} delay={index * 0.05} direction="up">
                <div className="card bg-[#FFFFFF] text-center">
                  <div className="mb-3 flex justify-center">{feature.icon}</div>
                  <h3 className="text-lg font-display font-light text-[#172019] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#66706A] text-sm font-light">
                    {feature.description}
                  </p>
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
              Explore opportunities →
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Join thousands of investors using AI-powered property discovery.
            </p>
            <button className="bg-[#B7D83D] text-[#172019] px-8 py-4 rounded-full font-semibold hover:bg-[#A5C635] transition-all text-lg">
              Browse marketplace →
            </button>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}