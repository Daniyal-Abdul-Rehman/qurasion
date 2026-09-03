'use client';

import { motion } from 'framer-motion';
import { Scene3D, DataNetwork3D } from '../../components/3d';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="relative min-h-screen bg-[#F7F8F6] blueprint-overlay flex flex-col">
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-[0.42]">
        <Scene3D variant="network">{null}</Scene3D>
      </div>
      {/* Minimal Header */}
      <header className="relative z-10 py-6 px-6">
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
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-display font-light text-[#172019] mb-4">
                Welcome back
              </h1>
              <p className="text-[#66706A] font-light">
                Sign in to access your investment intelligence.
              </p>
            </div>

            {/* Login Form */}
            <div className="card bg-[#FFFFFF]">
              <form onSubmit={handleSubmit}>
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
                  <label className="text-[#66706A] text-sm mb-2 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg px-4 py-3 text-[#172019] focus:border-[#173D2B] outline-none pr-12"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#66706A] hover:text-[#172019]"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="mr-2 accent-[#173D2B]" />
                    <span className="text-[#66706A] text-sm">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-[#173D2B] text-sm hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#173D2B] text-[#FFFFFF] py-3 rounded-full font-semibold hover:bg-[#0F2B1D] transition-all flex items-center justify-center gap-2"
                >
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Divider */}
              <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-[#DDE2DD]" />
                <span className="px-4 text-[#66706A] text-sm">or continue with</span>
                <div className="flex-1 border-t border-[#DDE2DD]" />
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg py-3 font-medium text-[#172019] hover:border-[#173D2B] transition-colors">
                  Google
                </button>
                <button className="bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg py-3 font-medium text-[#172019] hover:border-[#173D2B] transition-colors">
                  Microsoft
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <p className="text-[#66706A]">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-[#173D2B] font-medium hover:underline">
                  Start free trial
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
