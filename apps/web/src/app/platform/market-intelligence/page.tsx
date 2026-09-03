'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, City3D } from '../../../components/3d';
import { ScrollTriggeredAnimation, AnimatedNumber } from '../../../components/animations';
import { useState } from 'react';
import { TrendingUp, Map, DollarSign, BarChart3, Sparkles, Zap } from 'lucide-react';

export default function MarketIntelligencePage() {
  const [selectedMarket, setSelectedMarket] = useState('Dallas');
  const [activeLayer, setActiveLayer] = useState('property-prices');
  const [selectedYear, setSelectedYear] = useState(2024);

  const marketData = {
    Dallas: {
      medianPrice: 318000,
      priceGrowth: 8.4,
      rentGrowth: 5.7,
      investorDemand: 'HIGH',
      inventory: 2400,
      daysOnMarket: 28,
      population: 1.3
    },
    Austin: {
      medianPrice: 425000,
      priceGrowth: 12.1,
      rentGrowth: 8.3,
      investorDemand: 'VERY HIGH',
      inventory: 1800,
      daysOnMarket: 22,
      population: 0.9
    },
    Houston: {
      medianPrice: 285000,
      priceGrowth: 6.2,
      rentGrowth: 4.8,
      investorDemand: 'MEDIUM',
      inventory: 3200,
      daysOnMarket: 35,
      population: 2.3
    },
    Phoenix: {
      medianPrice: 395000,
      priceGrowth: 9.8,
      rentGrowth: 7.2,
      investorDemand: 'HIGH',
      inventory: 2100,
      daysOnMarket: 25,
      population: 1.6
    },
    Miami: {
      medianPrice: 450000,
      priceGrowth: 11.5,
      rentGrowth: 9.1,
      investorDemand: 'VERY HIGH',
      inventory: 1500,
      daysOnMarket: 20,
      population: 0.5
    },
  };

  const dataLayers = [
    { id: 'property-prices', label: 'Property Prices', color: '#173D2B' },
    { id: 'rent', label: 'Rent', color: '#3B82F6' },
    { id: 'transactions', label: 'Transactions', color: '#F59E0B' },
    { id: 'investor-demand', label: 'Investor Demand', color: '#22C55E' },
    { id: 'roi', label: 'ROI', color: '#8B5CF6' },
    { id: 'supply', label: 'Supply', color: '#EF4444' },
  ];

  const years = [2021, 2022, 2023, 2024, 2025, 2026];

  const currentMarket = marketData[selectedMarket as keyof typeof marketData];

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
              See where the market is moving.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              Market-level analytics with historical trends, predictive indicators, and investment opportunities.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Interactive Market Map
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          {/* Map Controls */}
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            {/* Market Selection */}
            <div className="flex flex-wrap justify-center gap-2">
              {Object.keys(marketData).map((market) => (
                <button
                  key={market}
                  onClick={() => setSelectedMarket(market)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedMarket === market
                      ? 'bg-[#173D2B] text-[#FFFFFF]'
                      : 'bg-[#F7F8F6] text-[#66706A] border border-[#DDE2DD] hover:border-[#173D2B]'
                  }`}
                >
                  {market}
                </button>
              ))}
            </div>
          </div>

          {/* Data Layer Toggle */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {dataLayers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  activeLayer === layer.id
                    ? 'bg-[#173D2B] text-[#FFFFFF]'
                    : 'bg-[#F7F8F6] text-[#66706A] border border-[#DDE2DD] hover:border-[#173D2B]'
                }`}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: layer.color }}
                />
                {layer.label}
              </button>
            ))}
          </div>

          {/* Time Slider */}
          <div className="mb-12">
            <div className="flex justify-center gap-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedYear === year
                      ? 'bg-[#173D2B] text-[#FFFFFF]'
                      : 'bg-[#F7F8F6] text-[#66706A] border border-[#DDE2DD] hover:border-[#173D2B]'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Market Data Display */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollTriggeredAnimation direction="up" delay={0.1}>
              <div className="card bg-[#F7F8F6] text-center">
                <div className="text-[#66706A] text-sm uppercase tracking-widest mb-2">
                  Median Price
                </div>
                <div className="text-3xl font-display font-light text-[#173D2B]">
                  <AnimatedNumber value={currentMarket.medianPrice} prefix="$" decimals={0} />
                </div>
              </div>
            </ScrollTriggeredAnimation>

            <ScrollTriggeredAnimation direction="up" delay={0.2}>
              <div className="card bg-[#F7F8F6] text-center">
                <div className="text-[#66706A] text-sm uppercase tracking-widest mb-2">
                  Price Growth
                </div>
                <div className="text-3xl font-display font-light text-[#22C55E]">
                  <AnimatedNumber value={currentMarket.priceGrowth} decimals={1} suffix="%" />
                </div>
              </div>
            </ScrollTriggeredAnimation>

            <ScrollTriggeredAnimation direction="up" delay={0.3}>
              <div className="card bg-[#F7F8F6] text-center">
                <div className="text-[#66706A] text-sm uppercase tracking-widest mb-2">
                  Rent Growth
                </div>
                <div className="text-3xl font-display font-light text-[#3B82F6]">
                  <AnimatedNumber value={currentMarket.rentGrowth} decimals={1} suffix="%" />
                </div>
              </div>
            </ScrollTriggeredAnimation>

            <ScrollTriggeredAnimation direction="up" delay={0.4}>
              <div className="card bg-[#F7F8F6] text-center">
                <div className="text-[#66706A] text-sm uppercase tracking-widest mb-2">
                  Investor Demand
                </div>
                <div className="text-3xl font-display font-light text-[#F59E0B]">
                  {currentMarket.investorDemand}
                </div>
              </div>
            </ScrollTriggeredAnimation>
          </div>
        </div>
      </section>

      {/* Market Comparison Section */}
      <section className="py-24 px-6 bg-[#F7F8F6]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Market Comparison
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="bg-[#FFFFFF] border border-[#DDE2DD] rounded-xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#DDE2DD]">
                  <th className="text-left text-[#66706A] font-medium p-6">Market</th>
                  <th className="text-left text-[#66706A] font-medium p-6">Median Price</th>
                  <th className="text-left text-[#66706A] font-medium p-6">Price Growth</th>
                  <th className="text-left text-[#66706A] font-medium p-6">Rent Growth</th>
                  <th className="text-left text-[#66706A] font-medium p-6">Investor Demand</th>
                  <th className="text-left text-[#66706A] font-medium p-6">Days on Market</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(marketData).map(([market, data], index) => (
                  <tr 
                    key={market} 
                    className={`border-b border-[#DDE2DD] last:border-0 hover:bg-[#F7F8F6] transition-colors ${
                      selectedMarket === market ? 'bg-[#173D2B]/10' : ''
                    }`}
                  >
                    <td className="p-6 text-[#172019] font-medium">{market}</td>
                    <td className="p-6 text-[#172019] font-mono">${data.medianPrice.toLocaleString()}</td>
                    <td className="p-6 text-[#22C55E] font-mono">{data.priceGrowth}%</td>
                    <td className="p-6 text-[#3B82F6] font-mono">{data.rentGrowth}%</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        data.investorDemand === 'VERY HIGH' ? 'bg-[#EF4444]/10 text-[#EF4444]' :
                        data.investorDemand === 'HIGH' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                        'bg-[#22C55E]/10 text-[#22C55E]'
                      }`}>
                        {data.investorDemand}
                      </span>
                    </td>
                    <td className="p-6 text-[#66706A] font-mono">{data.daysOnMarket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Market intelligence features
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Historical Trends',
                description: 'Track market performance over time with historical data going back decades.',
                icon: <TrendingUp className="w-12 h-12 text-[#173D2B]" />
              },
              {
                title: 'Predictive Analytics',
                description: 'AI-powered forecasts for price movements and market conditions.',
                icon: <Sparkles className="w-12 h-12 text-[#173D2B]" />
              },
              {
                title: 'Real-time Data',
                description: 'Live market data updated continuously as transactions occur.',
                icon: <Zap className="w-12 h-12 text-[#173D2B]" />
              },
              {
                title: 'Geographic Analysis',
                description: 'Drill down from national to neighborhood-level insights.',
                icon: <Map className="w-12 h-12 text-[#173D2B]" />
              },
              {
                title: 'Investment Metrics',
                description: 'ROI, cap rates, and investment scores for every market.',
                icon: <DollarSign className="w-12 h-12 text-[#173D2B]" />
              },
              {
                title: 'Custom Reports',
                description: 'Generate detailed market reports for any geography or time period.',
                icon: <BarChart3 className="w-12 h-12 text-[#173D2B]" />
              }
            ].map((feature, index) => (
              <ScrollTriggeredAnimation key={feature.title} delay={index * 0.05} direction="up">
                <div className="card bg-[#F7F8F6]">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-display font-light text-[#172019] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#66706A] font-light">
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
              Explore market intelligence
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Make informed investment decisions with comprehensive market intelligence.
            </p>
            <button className="bg-[#B7D83D] text-[#172019] px-8 py-4 rounded-full font-semibold hover:bg-[#A5C635] transition-all text-lg">
              Explore markets →
            </button>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}