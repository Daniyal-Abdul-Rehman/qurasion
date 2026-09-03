'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, City3D } from '../../../components/3d';
import { ScrollTriggeredAnimation } from '../../../components/animations';
import { BarChart3, Search, CheckCircle, Lightbulb, Users, Target, Globe, Rocket } from 'lucide-react';

export default function CompanyAboutPage() {
  const values = [
    {
      title: 'Data-Driven',
      description: 'Every decision is backed by data, not intuition.',
      icon: <BarChart3 className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Transparent',
      description: 'Clear methodologies and explainable AI.',
      icon: <Search className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Reliable',
      description: 'Consistent, accurate results you can trust.',
      icon: <CheckCircle className="w-12 h-12 text-[#173D2B]" />
    },
    {
      title: 'Innovative',
      description: "Pushing the boundaries of what's possible.",
      icon: <Lightbulb className="w-12 h-12 text-[#173D2B]" />
    }
  ];

  const timeline = [
    { year: '2021', title: 'Founded', description: 'Qurasion was founded with a mission to transform real estate intelligence.' },
    { year: '2022', title: 'Product Launch', description: 'Launched our first platform with property intelligence and AI valuation.' },
    { year: '2023', title: 'Marketplace', description: 'Introduced the investor marketplace and matching algorithm.' },
    { year: '2024', title: 'Enterprise', description: 'Expanded to serve enterprise clients with custom integrations.' },
    { year: '2025', title: 'Scale', description: 'Processing over 5 million property records across 50 markets.' }
  ];

  const team = [
    { name: 'Sarah Chen', role: 'CEO & Co-Founder', initials: 'SC' },
    { name: 'Marcus Williams', role: 'CTO & Co-Founder', initials: 'MW' },
    { name: 'Elena Rodriguez', role: 'VP of Product', initials: 'ER' },
    { name: 'David Park', role: 'Head of Data Science', initials: 'DP' },
    { name: 'Lisa Thompson', role: 'VP of Sales', initials: 'LT' },
    { name: 'James Moore', role: 'Head of Engineering', initials: 'JM' }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <Scene3D>
            <City3D animated={true} dataStreams={true} />
          </Scene3D>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-display-hero font-display font-light text-[#172019] mb-6 leading-tight">
              Intelligence, reimagined.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              We&apos;re building the future of real estate intelligence with AI-powered tools that transform how investors and professionals make decisions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Our mission
              </h2>
            </div>
            <p className="text-xl text-[#66706A] text-center font-light leading-relaxed">
              To democratize access to sophisticated real estate intelligence, empowering every investor and professional to make data-driven decisions with confidence.
            </p>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-[#173D2B]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: '5M+', label: 'Properties Analyzed' },
              { stat: '50+', label: 'Markets Covered' },
              { stat: '2,000+', label: 'Active Investors' },
              { stat: '99.2%', label: 'Data Accuracy' }
            ].map((item, index) => (
              <ScrollTriggeredAnimation key={item.label} delay={index * 0.1} direction="up">
                <div>
                  <div className="text-4xl font-display font-light text-[#B7D83D] mb-2">{item.stat}</div>
                  <div className="text-[#E8E1D5] text-sm">{item.label}</div>
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-[#F7F8F6]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Our values
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ScrollTriggeredAnimation key={value.title} delay={index * 0.1} direction="up">
                <div className="card bg-[#FFFFFF] text-center">
                  <div className="mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-display font-light text-[#172019] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[#66706A] font-light">
                    {value.description}
                  </p>
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Our journey
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <ScrollTriggeredAnimation key={item.year} delay={index * 0.1} direction="up">
                <div className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="text-5xl font-display font-light text-[#173D2B]">
                      {item.year}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-light text-[#172019] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#66706A] font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollTriggeredAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-[#F7F8F6]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Our team
              </h2>
              <p className="text-xl text-[#66706A] max-w-3xl mx-auto font-light">
                Led by experienced professionals from real estate, technology, and data science.
              </p>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <ScrollTriggeredAnimation key={member.name} delay={index * 0.1} direction="up">
                <div className="card bg-[#FFFFFF] text-center">
                  <div className="w-20 h-20 bg-[#173D2B] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#FFFFFF] font-bold text-xl">{member.initials}</span>
                  </div>
                  <h3 className="text-xl font-display font-light text-[#172019] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#66706A] text-sm">
                    {member.role}
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
              Join our mission
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              We&apos;re always looking for talented people who share our vision.
            </p>
            <button className="bg-[#B7D83D] text-[#172019] px-8 py-4 rounded-full font-semibold hover:bg-[#A5C635] transition-all text-lg">
              View open positions →
            </button>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}
