'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    plan: 'professional'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const plans = [
    { id: 'starter', name: 'Starter', price: '$99/mo' },
    { id: 'professional', name: 'Professional', price: '$299/mo', popular: true },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom' }
  ];

  const features = [
    '14-day free trial',
    'No credit card required',
    'Cancel anytime',
    'Full platform access'
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F6] blueprint-overlay flex flex-col">
      {/* Minimal Header */}
      <header className="py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#173D2B] rounded-lg flex items-center justify-center">
              <span className="text-[#FFFFFF] font-bold text-lg">Q</span>
            </div>
            <span className="text-[#172019] font-display font-semibold text-xl">Qurasion</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-display font-light text-[#172019] mb-4">
                Start your free trial
              </h1>
              <p className="text-[#66706A] font-light">
                Get access to the full Qurasion platform for 14 days.
              </p>
            </div>

            {/* Features Banner */}
            <div className="bg-[#173D2B] rounded-xl p-6 mb-8">
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-[#FFFFFF]">
                    <Check className="w-4 h-4 text-[#B7D83D]" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signup Form */}
            <div className="card bg-[#FFFFFF]">
              <form onSubmit={handleSubmit}>
                {/* Plan Selection */}
                <div className="mb-6">
                  <label className="text-[#66706A] text-sm mb-3 block">Select your plan</label>
                  <div className="grid grid-cols-3 gap-3">
                    {plans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, plan: plan.id })}
                        className={`p-3 rounded-lg border text-center transition-all relative ${
                          formData.plan === plan.id
                            ? 'border-[#173D2B] bg-[#173D2B]/5'
                            : 'border-[#DDE2DD] hover:border-[#173D2B]'
                        }`}
                      >
                        {plan.popular && (
                          <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#B7D83D] text-[#172019] px-2 py-0.5 rounded text-xs font-medium">
                            Popular
                          </span>
                        )}
                        <div className="text-[#172019] font-medium text-sm">{plan.name}</div>
                        <div className="text-[#66706A] text-xs mt-1">{plan.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-[#66706A] text-sm mb-2 block">Full name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg px-4 py-3 text-[#172019] focus:border-[#173D2B] outline-none"
                    placeholder="John Smith"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="text-[#66706A] text-sm mb-2 block">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg px-4 py-3 text-[#172019] focus:border-[#173D2B] outline-none"
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="text-[#66706A] text-sm mb-2 block">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg px-4 py-3 text-[#172019] focus:border-[#173D2B] outline-none"
                    placeholder="Your company (optional)"
                  />
                </div>

                <div className="mb-8">
                  <label className="text-[#66706A] text-sm mb-2 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg px-4 py-3 text-[#172019] focus:border-[#173D2B] outline-none pr-12"
                      placeholder="Create a password"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#66706A] hover:text-[#172019]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-[#66706A] text-xs mt-2">Must be at least 8 characters</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#173D2B] text-[#FFFFFF] py-3 rounded-full font-semibold hover:bg-[#0F2B1D] transition-all flex items-center justify-center gap-2"
                >
                  Start free trial
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[#66706A] text-xs text-center mt-4">
                  By signing up, you agree to our{' '}
                  <Link href="/terms" className="text-[#173D2B] hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-[#173D2B] hover:underline">Privacy Policy</Link>
                </p>
              </form>
            </div>

            {/* Login Link */}
            <div className="text-center mt-8">
              <p className="text-[#66706A]">
                Already have an account?{' '}
                <Link href="/login" className="text-[#173D2B] font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-[#DDE2DD]">
        <div className="max-w-7xl mx-auto text-center text-[#66706A] text-sm">
          © 2026 Qurasion. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
