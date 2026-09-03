'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, DealTimeline3D } from '../../../components/3d';
import { ScrollTriggeredAnimation } from '../../../components/animations';
import { BarChart3, CheckCircle, FileText, Users, Bell, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function DealsPage() {
  const [currentStage, setCurrentStage] = useState(3);
  const stages = ['DISCOVER', 'ANALYZE', 'OFFER', 'DUE DILIGENCE', 'CONTRACT', 'FINANCING', 'CLOSING'];

  const dealTasks = [
    { task: 'Offer accepted', completed: true },
    { task: 'Inspection completed', completed: true },
    { task: 'Documents reviewed', completed: true },
    { task: 'Title search', completed: true },
    { task: 'Financing secured', completed: false },
    { task: 'Closing scheduled', completed: false },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0 opacity-[0.42]">
          <Scene3D variant="timeline">
            <DealTimeline3D animated={true} currentStage={currentStage} stages={stages} />
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
              From first offer to final close.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              Complete deal management that tracks every step from discovery to closing.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Transaction Timeline Section */}
      <section className="py-24 px-6 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Transaction Timeline
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          {/* Interactive Timeline */}
          <div className="mb-12">
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg p-1">
                {stages.map((stage, index) => (
                  <button
                    key={stage}
                    onClick={() => setCurrentStage(index)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      currentStage === index
                        ? 'bg-[#173D2B] text-[#FFFFFF]'
                        : 'text-[#66706A] hover:text-[#172019]'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            {/* Stage Description */}
            <div className="text-center mb-8">
              <div className="text-[#173D2B] font-mono text-sm mb-2">
                Current Stage: {stages[currentStage]}
              </div>
              <div className="text-[#66706A]">
                {currentStage === 0 && 'Property identified and initial analysis complete'}
                {currentStage === 1 && 'Property intelligence gathered and valuation complete'}
                {currentStage === 2 && 'Offer submitted and under negotiation'}
                {currentStage === 3 && 'Due diligence in progress'}
                {currentStage === 4 && 'Purchase contract executed'}
                {currentStage === 5 && 'Financing arranged and approved'}
                {currentStage === 6 && 'Closing scheduled and final documentation'}
              </div>
            </div>
          </div>

          {/* Deal Room */}
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollTriggeredAnimation direction="left">
              <div className="card bg-[#F7F8F6]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-display-medium font-display font-light text-[#172019]">
                    123 Main Street
                  </h3>
                  <div className="bg-[#173D2B]/10 text-[#173D2B] px-3 py-1 rounded-full text-sm font-medium">
                    Due Diligence
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#66706A]">Progress</span>
                    <span className="text-[#173D2B] font-mono">72%</span>
                  </div>
                  <div className="h-2 bg-[#DDE2DD] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '72%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full bg-[#173D2B] rounded-full"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {dealTasks.map((item, index) => (
                    <div key={item.task} className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        item.completed ? 'bg-[#22C55E]' : 'bg-[#DDE2DD]'
                      }`}>
                        {item.completed && (
                          <svg className="w-4 h-4 text-[#FFFFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={item.completed ? 'text-[#172019]' : 'text-[#9AA8A0]'}>
                        {item.task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollTriggeredAnimation>

            <ScrollTriggeredAnimation direction="right">
              <div className="card bg-[#F7F8F6]">
                <h3 className="text-display-medium font-display font-light text-[#172019] mb-6">
                  Deal Details
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-[#DDE2DD]">
                    <span className="text-[#66706A]">Purchase Price</span>
                    <span className="text-[#172019] font-mono">$240,000</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#DDE2DD]">
                    <span className="text-[#66706A]">ARV</span>
                    <span className="text-[#173D2B] font-mono">$335,000</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#DDE2DD]">
                    <span className="text-[#66706A]">Strategy</span>
                    <span className="text-[#172019]">Fix & Flip</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#DDE2DD]">
                    <span className="text-[#66706A]">Projected ROI</span>
                    <span className="text-[#22C55E] font-mono">24.8%</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#DDE2DD]">
                    <span className="text-[#66706A]">Target Close</span>
                    <span className="text-[#172019] font-mono">Oct 15, 2024</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-[#66706A]">Days to Close</span>
                    <span className="text-[#173D2B] font-mono">14</span>
                  </div>
                </div>
              </div>
            </ScrollTriggeredAnimation>
          </div>
        </div>
      </section>

      {/* Workflow Stages Section */}
      <section className="py-24 px-6 bg-[#F7F8F6]">
        <div className="max-w-7xl mx-auto">
          <ScrollTriggeredAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-display-large font-display font-light text-[#172019] mb-6">
                Complete deal workflow
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-4 gap-6">
            {stages.map((stage, index) => (
              <ScrollTriggeredAnimation key={stage} delay={index * 0.1} direction="up">
                <div 
                  className={`card bg-[#FFFFFF] transition-all ${
                    index <= currentStage ? 'border-[#173D2B]' : 'border-[#DDE2DD]'
                  }`}
                >
                  <div className={`text-sm font-mono mb-3 ${
                    index <= currentStage ? 'text-[#173D2B]' : 'text-[#9AA8A0]'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-lg font-display font-light text-[#172019] mb-2">
                    {stage}
                  </h3>
                  <p className="text-[#66706A] text-sm font-light">
                    {index === 0 && 'Identify and analyze potential investment opportunities'}
                    {index === 1 && 'Gather property intelligence and run valuations'}
                    {index === 2 && 'Submit offers and negotiate terms'}
                    {index === 3 && 'Complete inspections, title work, and due diligence'}
                    {index === 4 && 'Execute purchase contracts and finalize terms'}
                    {index === 5 && 'Secure financing and satisfy contingencies'}
                    {index === 6 && 'Close the transaction and take ownership'}
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
                Deal management features
              </h2>
            </div>
          </ScrollTriggeredAnimation>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Pipeline Tracking',
                description: 'Visual pipeline showing all deals and their current stages',
                icon: <BarChart3 className="w-12 h-12 text-[#173D2B]" />
              },
              {
                title: 'Task Management',
                description: 'Checklists and deadlines for each stage of the deal',
                icon: <CheckCircle className="w-12 h-12 text-[#173D2B]" />
              },
              {
                title: 'Document Management',
                description: 'Centralized repository for all deal documents',
                icon: <FileText className="w-12 h-12 text-[#173D2B]" />
              },
              {
                title: 'Team Collaboration',
                description: 'Share deals with team members and assign tasks',
                icon: <Users className="w-12 h-12 text-[#173D2B]" />
              },
              {
                title: 'Automated Reminders',
                description: 'Get notified of upcoming deadlines and contingencies',
                icon: <Bell className="w-12 h-12 text-[#173D2B]" />
              },
              {
                title: 'Reporting & Analytics',
                description: 'Track deal velocity and conversion rates',
                icon: <TrendingUp className="w-12 h-12 text-[#173D2B]" />
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
              Move opportunities from analysis to action
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Never miss a deadline or lose track of a deal again.
            </p>
            <button className="bg-[#B7D83D] text-[#172019] px-8 py-4 rounded-full font-semibold hover:bg-[#A5C635] transition-all text-lg">
              Start managing deals →
            </button>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}