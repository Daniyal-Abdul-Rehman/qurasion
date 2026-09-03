'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, InvestmentGraph3D } from '../../../components/3d';
import { ScrollTriggeredAnimation, AnimatedNumber } from '../../../components/animations';
import { useState } from 'react';
import { BarChart3, Home, DollarSign, FileText, Zap, RefreshCw } from 'lucide-react';

export default function UnderwritingPage() {
  const [strategy, setStrategy] = useState<'fix-flip' | 'buy-hold' | 'wholesale' | 'custom'>('fix-flip');
  const [scenario, setScenario] = useState<'bear' | 'base' | 'bull'>('base');

  const strategies = {
    'fix-flip': {
      label: 'Fix & Flip',
      purchase: 240000,
      renovation: 38000,
      financing: 180000,
      hold: 6,
      arv: 335000,
      totalCost: 291000,
      netProfit: 44000,
      roi: 15.1
    },
    'buy-hold': {
      label: 'Buy & Hold',
      purchase: 280000,
      renovation: 25000,
      financing: 200000,
      hold: 36,
      arv: 380000,
      totalCost: 310000,
      netProfit: 70000,
      roi: 22.6
    },
    'wholesale': {
      label: 'Wholesale',
      purchase: 200000,
      renovation: 5000,
      financing: 0,
      hold: 1,
      arv: 235000,
      totalCost: 205000,
      netProfit: 30000,
      roi: 14.6
    },
    'custom': {
      label: 'Custom',
      purchase: 260000,
      renovation: 42000,
      financing: 190000,
      hold: 12,
      arv: 345000,
      totalCost: 305000,
      netProfit: 40000,
      roi: 13.1
    }
  };

  const scenarios = {
    bear: { multiplier: 0.85, label: 'Bear' },
    base: { multiplier: 1.0, label: 'Base' },
    bull: { multiplier: 1.15, label: 'Bull' }
  };

  const currentStrategy = strategies[strategy];
  const currentScenario = scenarios[scenario];
  const adjustedARV = Math.round(currentStrategy.arv * currentScenario.multiplier);
  const adjustedProfit = Math.round(currentStrategy.netProfit * currentScenario.multiplier);
  const adjustedROI = ((adjustedProfit / currentStrategy.totalCost) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <Scene3D>
            <InvestmentGraph3D animated={true} scenario={scenario} showLabels={true} />
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
              Don't just find properties.
            </h1>
            <h1 className="text-display-hero font-display font-light text-[#173D2B] mb-6 leading-tight">
              Find properties that make financial sense.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              Interactive underwriting terminal that runs financial scenarios in real-time.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Underwriting Terminal */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Interactive Underwriting Terminal
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          {/* Strategy Switcher */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {(Object.keys(strategies) as Array<keyof typeof strategies>).map((key) => (
              <button
                key={key}
                onClick={() => setStrategy(key)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  strategy === key
                    ? 'bg-[#173D2B] text-[#FFFFFF]'
                    : 'bg-[#F7F8F6] text-[#66706A] border border-[#DDE2DD] hover:border-[#173D2B]'
                }`}
              >
                {strategies[key].label}
              </button>
            ))}
          </div>

          {/* Terminal Interface */}
          <div className="bg-[#F7F8F6] border border-[#DDE2DD] rounded-2xl p-8 mb-12 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                <h3 className="text-xl font-display font-light text-[#172019] mb-6">Inputs</h3>
                
                {[
                  { label: 'Purchase', value: currentStrategy.purchase, prefix: '$' },
                  { label: 'Renovation', value: currentStrategy.renovation, prefix: '$' },
                  { label: 'Financing', value: currentStrategy.financing, prefix: '$' },
                  { label: 'Hold Period', value: currentStrategy.hold, suffix: ' months' },
                ].map((input) => (
                  <div key={input.label} className="flex justify-between items-center py-3 border-b border-[#DDE2DD]">
                    <span className="text-[#66706A]">{input.label}</span>
                    <span className="text-[#172019] font-mono">
                      {input.prefix}{input.value.toLocaleString()}{input.suffix}
                    </span>
                  </div>
                ))}
              </div>

              {/* Outputs */}
              <div className="space-y-6">
                <h3 className="text-xl font-display font-light text-[#172019] mb-6">Outputs</h3>
                
                <div className="bg-[#FFFFFF] rounded-xl p-6 border border-[#DDE2DD]">
                  <div className="text-[#66706A] text-sm uppercase tracking-widest mb-2">
                    After-Repair Value (ARV)
                  </div>
                  <div className="text-4xl font-display font-light text-[#173D2B]">
                    <AnimatedNumber value={adjustedARV} prefix="$" decimals={0} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#FFFFFF] rounded-xl p-4 border border-[#DDE2DD]">
                    <div className="text-[#66706A] text-xs uppercase tracking-widest mb-1">
                      Total Cost
                    </div>
                    <div className="text-2xl font-light text-[#172019]">
                      <AnimatedNumber value={currentStrategy.totalCost} prefix="$" decimals={0} />
                    </div>
                  </div>
                  <div className="bg-[#FFFFFF] rounded-xl p-4 border border-[#DDE2DD]">
                    <div className="text-[#66706A] text-xs uppercase tracking-widest mb-1">
                      Net Profit
                    </div>
                    <div className="text-2xl font-light text-[#22C55E]">
                      <AnimatedNumber value={adjustedProfit} prefix="$" decimals={0} />
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] rounded-xl p-4 border border-[#DDE2DD]">
                  <div className="text-[#66706A] text-xs uppercase tracking-widest mb-1">
                    Return on Investment
                  </div>
                  <div className="text-3xl font-light text-[#173D2B]">
                    <AnimatedNumber value={parseFloat(adjustedROI)} decimals={1} suffix="%" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sensitivity Analysis */}
          <div className="mb-12">
            <h3 className="text-xl font-display font-light text-[#172019] mb-6 text-center">
              Sensitivity Analysis
            </h3>
            <div className="flex justify-center gap-4">
              {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => (
                <button
                  key={key}
                  onClick={() => setScenario(key)}
                  className={`px-8 py-4 rounded-xl font-medium transition-all ${
                    scenario === key
                      ? 'bg-[#173D2B] text-[#FFFFFF]'
                      : 'bg-[#F7F8F6] text-[#66706A] border border-[#DDE2DD] hover:border-[#173D2B]'
                  }`}
                >
                  {scenarios[key].label}
                </button>
              ))}
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
                Built for serious investors
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-time Calculations',
                description: 'Update any input and see instant results across all financial metrics.',
                icon: <Zap className="w-12 h-12 text-[#173D2B]" />
              },
              {
                title: 'Multiple Strategies',
                description: 'Switch between Fix & Flip, Buy & Hold, Wholesale, or custom scenarios.',
                icon: <RefreshCw className="w-12 h-12 text-[#173D2B]" />
              },
              {
                title: 'Sensitivity Analysis',
                description: 'Test bear, base, and bull cases to understand risk and reward.',
                icon: <BarChart3 className="w-12 h-12 text-[#173D2B]" />
              },
              {
                title: 'Comparable Integration',
                description: 'Pull actual comparable sales to validate your ARV assumptions.',
                icon: <Home className="w-12 h-12 text-[#173D2B]" />
              },
              {
                title: 'Financing Scenarios',
                description: 'Model different loan terms, LTV ratios, and interest rates.',
                icon: <DollarSign className="w-12 h-12 text-[#173D2B]" />
              },
              {
                title: 'Export & Share',
                description: 'Generate professional PDF reports to share with partners or lenders.',
                icon: <FileText className="w-12 h-12 text-[#173D2B]" />
              }
            ].map((feature, index) => (
              <ScrollTriggeredAnimation key={feature.title} delay={index * 0.05} direction="up">
                <div className="card bg-[#FFFFFF]">
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
              Underwrite the opportunity before committing capital
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Start making data-driven investment decisions today.
            </p>
            <button className="bg-[#B7D83D] text-[#172019] px-8 py-4 rounded-full font-semibold hover:bg-[#A5C635] transition-all text-lg">
              Start underwriting →
            </button>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}