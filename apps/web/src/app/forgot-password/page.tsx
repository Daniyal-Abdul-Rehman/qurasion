'use client';

import { motion } from 'framer-motion';
import { Scene3D } from '../../components/3d';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Mail, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';

type RecoveryStep = 'request' | 'loading' | 'sent' | 'error';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<RecoveryStep>('request');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setStep('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, show success
    setStep('sent');
  };

  return (
    <div className="relative min-h-screen bg-[#F7F8F6] blueprint-overlay flex flex-col">
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-[0.42]">
        <Scene3D variant="network">{null}</Scene3D>
      </div>
      
      {/* Header */}
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
            {/* Request Step */}
            {step === 'request' && (
              <>
                {/* Title */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#173D2B] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-[#B7D83D]" />
                  </div>
                  <h1 className="text-3xl font-display font-light text-[#172019] mb-4">
                    Reset your password
                  </h1>
                  <p className="text-[#66706A] font-light">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                {/* Form */}
                <div className="card bg-[#FFFFFF]">
                  {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label className="text-[#66706A] text-sm mb-2 block font-medium">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input w-full"
                        placeholder="you@company.com"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary flex w-full items-center justify-center gap-2"
                    >
                      Send reset link
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                {/* Back to Sign In */}
                <div className="text-center mt-8">
                  <Link 
                    href="/login" 
                    className="text-[#66706A] hover:text-[#172019] transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to sign in
                  </Link>
                </div>
              </>
            )}

            {/* Loading State */}
            {step === 'loading' && (
              <div className="card bg-[#FFFFFF] py-12">
                <div className="flex flex-col items-center justify-center">
                  <Loader2 className="w-12 h-12 text-[#173D2B] animate-spin mb-4" />
                  <p className="text-[#66706A]">Sending reset link...</p>
                </div>
              </div>
            )}

            {/* Sent State */}
            {step === 'sent' && (
              <div className="card bg-[#FFFFFF] py-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-[#B7D83D] rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#172019]" />
                  </div>
                  <h2 className="text-2xl font-display font-light text-[#172019] mb-2">
                    Check your email
                  </h2>
                  <p className="text-[#66706A] mb-6 max-w-sm">
                    We've sent a password reset link to <strong>{email}</strong>. The link will expire in 24 hours.
                  </p>
                  
                  <div className="space-y-3 w-full">
                    <button
                      onClick={() => setStep('request')}
                      className="btn-secondary w-full"
                    >
                      Try another email
                    </button>
                    <Link 
                      href="/login" 
                      className="text-[#173D2B] text-sm hover:underline font-medium block"
                    >
                      Return to sign in
                    </Link>
                  </div>
                </div>
              </div>
            )}
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