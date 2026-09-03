'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, DataNetwork3D } from '../../../components/3d';
import { ScrollTriggeredAnimation } from '../../../components/animations';
import { Check, Star, Zap, Building2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      description: 'For individual investors getting started',
      monthlyPrice: 99,
      annualPrice: 79,
      icon: <Zap className="w-8 h-8 text-[#173D2B]" />,
      features: [
        'Up to 50 property searches/month',
        'Basic AI valuation',
        'Market intelligence dashboard',
        'Email support',
        'Standard data sources',
        '1 user'
      ],
      cta: 'Start free trial',
      popular: false
    },
    {
      name: 'Professional',
      description: 'For active investors and small teams',
      monthlyPrice: 299,
      annualPrice: 249,
      icon: <Star className="w-8 h-8 text-[#173D2B]" />,
      features: [
        'Unlimited property searches',
        'Advanced AI valuation with confidence scores',
        'Full market intelligence',
        'Investor matching algorithm',
        'Deal management tools',
        'Priority support',
        'All data sources',
        'Up to 5 users'
      ],
      cta: 'Start free trial',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For organizations managing portfolios',
      monthlyPrice: 0,
      annualPrice: 0,
      icon: <Building2 className="w-8 h-8 text-[#173D2B]" />,
      features: [
        'Everything in Professional',
        'Custom integrations',
        'Dedicated account manager',
        'API access',
        'White-label options',
        'Custom reporting',
        'SSO & advanced security',
        'Unlimited users'
      ],
      cta: 'Contact sales',
      popular: false
    }
  ];

  const faqs = [
    {
      question: 'Is there a free trial?',
      answer: 'Yes, all plans include a 14-day free trial with full access to all features in that tier.'
    },
    {
      question: 'Can I change plans anytime?',
      answer: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately with prorated billing.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, ACH bank transfers, and wire transfers for annual Enterprise plans.'
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer: 'Yes, annual billing saves you 20% compared to monthly billing across all plans.'
    },
    {
      question: 'What is included in the Enterprise plan?',
      answer: 'Enterprise plans include custom integrations, dedicated support, API access, white-label options, and advanced security features. Contact our sales team for a custom quote.'
    },
    {
      question: 'How does the data accuracy compare to competitors?',
      answer: 'Our proprietary data pipeline achieves 99.2% accuracy through multi-source validation and continuous quality checks.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-[0.42]">
          <Scene3D variant="network">
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
              Simple, transparent pricing
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-8 leading-relaxed font-light"
            >
              Start with a free trial. Scale as you grow. No hidden fees.
            </motion.p>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4"
            >
              <span className={`text-sm ${!annual ? 'text-[#172019] font-medium' : 'text-[#66706A]'}`}>Monthly</span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative w-14 h-7 rounded-full transition-colors ${annual ? 'bg-[#173D2B]' : 'bg-[#DDE2DD]'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${annual ? 'left-8' : 'left-1'}`} />
              </button>
              <span className={`text-sm ${annual ? 'text-[#172019] font-medium' : 'text-[#66706A]'}`}>
                Annual <span className="text-[#22C55E]">Save 20%</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, index) => (
              <ScrollTriggeredAnimation key={plan.name} delay={index * 0.1} direction="up">
                <div className={`card bg-[#FFFFFF] relative ${plan.popular ? 'border-[#173D2B] border-2 shadow-lg' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#173D2B] text-[#FFFFFF] px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="mb-4">{plan.icon}</div>
                    <h3 className="text-2xl font-display font-light text-[#172019] mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-[#66706A] text-sm">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    {plan.monthlyPrice > 0 ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-display font-light text-[#172019]">
                          ${annual ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-[#66706A]">/month</span>
                      </div>
                    ) : (
                      <div className="text-4xl font-display font-light text-[#172019]">
                        Custom
                      </div>
                    )}
                    {annual && plan.monthlyPrice > 0 && (
                      <div className="text-[#66706A] text-sm mt-1">
                        Billed annually
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start text-[#66706A]">
                        <Check className="w-5 h-5 text-[#173D2B] mr-3 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    plan.popular
                      ? 'bg-[#173D2B] text-[#FFFFFF] hover:bg-[#0F2B1D]'
                      : 'bg-[#F7F8F6] text-[#173D2B] border border-[#DDE2DD] hover:border-[#173D2B]'
                  }`}>
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Enterprise features
              </h2>
              <p className="text-xl text-[#66706A] max-w-3xl mx-auto font-light">
                Advanced capabilities for organizations with complex needs.
              </p>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Custom Integrations', description: 'Connect Qurasion with your existing systems through our comprehensive API.' },
              { title: 'Dedicated Support', description: '24/7 priority support with a dedicated customer success manager.' },
              { title: 'Advanced Security', description: 'SOC 2 Type II compliant with SSO, RBAC, and audit logs.' },
              { title: 'White-label Options', description: 'Brand the platform as your own with custom domains and theming.' },
              { title: 'Custom Reporting', description: 'Build and schedule custom reports tailored to your organization.' },
              { title: 'On-premise Deployment', description: 'Deploy Qurasion on your own infrastructure for maximum control.' }
            ].map((feature, index) => (
              <ScrollTriggeredAnimation key={feature.title} delay={index * 0.05} direction="up">
                <div className="bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg p-6 hover:border-[#173D2B] transition-colors">
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

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-[#F7F8F6]">
        <div className="max-w-3xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Frequently asked questions
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <ScrollTriggeredAnimation key={faq.question} delay={index * 0.05} direction="up">
                <div className="card bg-[#FFFFFF]">
                  <h3 className="text-lg font-display font-light text-[#172019] mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-[#66706A] font-light">
                    {faq.answer}
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
              Start your free trial today
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              14 days free. No credit card required. Cancel anytime.
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
