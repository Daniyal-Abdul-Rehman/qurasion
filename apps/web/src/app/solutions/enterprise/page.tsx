'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, City3D } from '../../../components/3d';
import { ScrollTriggeredAnimation } from '../../../components/animations';
import { Users, BarChart3, Settings, TrendingUp, Zap, CheckCircle, Lock, Link, Tag, Eye } from 'lucide-react';

export default function EnterprisePage() {
  const capabilities = [
    {
      title: 'Enterprise-grade Security',
      description: 'SOC 2 Type II compliant with advanced security controls.',
      icon: <Lock className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Custom Integrations',
      description: 'API-first architecture for seamless system integration.',
      icon: <Link className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Dedicated Support',
      description: '24/7 support with dedicated customer success manager.',
      icon: <Users className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Advanced Analytics',
      description: 'Custom reporting and business intelligence tools.',
      icon: <BarChart3 className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Workflow Automation',
      description: 'Custom automated workflows tailored to your processes.',
      icon: <Settings className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'White-label Options',
      description: 'Brand the platform as your own with custom domains.',
      icon: <Tag className="w-12 h-12 text-[#173D2B]" />
    }
  ];

  const benefits = [
    {
      title: 'Scale',
      description: 'Handle increased deal volume without adding headcount.',
      stat: '5x',
      icon: <TrendingUp className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Efficiency',
      description: 'Reduce manual processes with automation.',
      stat: '60%',
      icon: <Zap className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Consistency',
      description: 'Standardized processes across teams and regions.',
      stat: '100%',
      icon: <CheckCircle className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Insight',
      description: 'Better visibility into portfolio performance.',
      stat: '3x',
      icon: <Eye className="w-12 h-12 text-[#173D2B]" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-[0.42]">
          <Scene3D variant="city">
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
              Real estate intelligence at scale.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              Enterprise-grade platform for organizations managing complex real estate portfolios.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="btn-primary-lime px-8 py-4 rounded-full font-semibold text-lg">
                Contact sales →
              </button>
              
              <button className="text-[#66706A] font-medium hover:text-[#172019] transition-colors">
                Schedule demo
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Enterprise capabilities
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <ScrollTriggeredAnimation key={capability.title} delay={index * 0.05} direction="up">
                <div className="card bg-[#F7F8F6]">
                  <div className="mb-4 flex justify-center">{capability.icon}</div>
                  <h3 className="text-xl font-display font-light text-[#172019] mb-3">
                    {capability.title}
                  </h3>
                  <p className="text-[#66706A] font-light">
                    {capability.description}
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
                Enterprise benefits
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
                Built for enterprise
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollTriggeredAnimation direction="left">
              <div className="card bg-[#F7F8F6]">
                <h3 className="text-display-medium font-display font-light text-[#172019] mb-6">
                  Security & Compliance
                </h3>
                <ul className="space-y-4">
                  {[
                    'SOC 2 Type II certified',
                    'SSO with SAML 2.0',
                    'Role-based access control',
                    'Audit logs and reporting',
                    'Data encryption at rest and in transit'
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
                  Integration & Scalability
                </h3>
                <ul className="space-y-4">
                  {[
                    'RESTful API with comprehensive documentation',
                    'Webhooks for real-time data sync',
                    'Custom data import/export',
                    'Multi-region deployment',
                    '99.9% uptime SLA'
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
              Ready to scale?
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Contact our enterprise team to discuss your specific requirements.
            </p>
            <button className="bg-[#B7D83D] text-[#172019] px-8 py-4 rounded-full font-semibold hover:bg-[#A5C635] transition-all text-lg">
              Contact sales →
            </button>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}