'use client';

import { motion } from 'framer-motion';
import { Navigation, Footer } from '../../../components/navigation';
import { Scene3D, City3D } from '../../../components/3d';
import { ScrollTriggeredAnimation } from '../../../components/animations';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    { icon: <Mail className="w-6 h-6 text-[#173D2B]" />, label: 'Email', value: 'hello@qurasion.com', href: 'mailto:hello@qurasion.com' },
    { icon: <Phone className="w-6 h-6 text-[#173D2B]" />, label: 'Phone', value: '(555) 123-4567', href: 'tel:+15551234567' },
    { icon: <MapPin className="w-6 h-6 text-[#173D2B]" />, label: 'Office', value: 'Dallas, TX', href: '#' },
    { icon: <Clock className="w-6 h-6 text-[#173D2B]" />, label: 'Hours', value: 'Mon-Fri 9am-6pm CST', href: '#' }
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <Scene3D>
            <City3D animated={true} />
          </Scene3D>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-display-hero font-display font-light text-[#172019] mb-6 leading-tight">
              Let&apos;s talk
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-[#66706A] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              Have a question, need a demo, or want to discuss enterprise solutions? We&apos;d love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <ScrollTriggeredAnimation direction="left">
              <div>
                <h2 className="text-display-medium font-display font-light text-[#172019] mb-8">
                  Get in touch
                </h2>

                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg flex items-center justify-center group-hover:border-[#173D2B] transition-colors">
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-[#66706A] text-sm mb-1">{info.label}</div>
                        <div className="text-[#172019] font-medium">{info.value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-[#DDE2DD]">
                  <h3 className="text-lg font-display font-light text-[#172019] mb-4">
                    Follow us
                  </h3>
                  <div className="flex gap-4">
                    {['LinkedIn', 'Twitter', 'GitHub'].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="text-[#66706A] hover:text-[#173D2B] transition-colors text-sm"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollTriggeredAnimation>

            {/* Contact Form */}
            <ScrollTriggeredAnimation direction="right">
              <div className="lg:col-span-2">
                <div className="card bg-[#FFFFFF]">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-8 h-8 text-[#22C55E]" />
                      </div>
                      <h3 className="text-2xl font-display font-light text-[#172019] mb-2">
                        Message sent
                      </h3>
                      <p className="text-[#66706A]">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="text-[#66706A] text-sm mb-2 block">Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg px-4 py-3 text-[#172019] focus:border-[#173D2B] outline-none"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="text-[#66706A] text-sm mb-2 block">Email *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg px-4 py-3 text-[#172019] focus:border-[#173D2B] outline-none"
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="text-[#66706A] text-sm mb-2 block">Company</label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg px-4 py-3 text-[#172019] focus:border-[#173D2B] outline-none"
                            placeholder="Your company"
                          />
                        </div>
                        <div>
                          <label className="text-[#66706A] text-sm mb-2 block">Subject *</label>
                          <select
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg px-4 py-3 text-[#172019] focus:border-[#173D2B] outline-none"
                          >
                            <option value="">Select a topic</option>
                            <option value="general">General inquiry</option>
                            <option value="demo">Request a demo</option>
                            <option value="enterprise">Enterprise sales</option>
                            <option value="support">Technical support</option>
                            <option value="partnership">Partnership</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="text-[#66706A] text-sm mb-2 block">Message *</label>
                        <textarea
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={5}
                          className="w-full bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg px-4 py-3 text-[#172019] focus:border-[#173D2B] outline-none resize-none"
                          placeholder="Tell us how we can help..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-[#173D2B] text-[#FFFFFF] px-8 py-3 rounded-full font-semibold hover:bg-[#0F2B1D] transition-all flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Send message
                      </button>
                    </form>
                  )}
                </div>
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
              Prefer to talk directly?
            </h2>
            <p className="text-xl text-[#E8E1D5] mb-8 font-light">
              Schedule a call with our team to discuss your needs.
            </p>
            <button className="bg-[#B7D83D] text-[#172019] px-8 py-4 rounded-full font-semibold hover:bg-[#A5C635] transition-all text-lg">
              Schedule a call →
            </button>
          </ScrollTriggeredAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
}
