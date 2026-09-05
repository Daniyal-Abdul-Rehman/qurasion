'use client';

import { motion } from 'framer-motion';
import { Scene3D } from '../../components/3d';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Shield, Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

type AuthStep = 'credentials' | 'mfa' | 'loading' | 'success' | 'error';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [authStep, setAuthStep] = useState<AuthStep>('credentials');
  const [mfaCode, setMfaCode] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Simulate API call
    setAuthStep('loading');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, proceed to MFA
    setAuthStep('mfa');
  };

  const handleMFASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (mfaCode.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setAuthStep('loading');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, show success
    setAuthStep('success');
  };

  const handleResendCode = async () => {
    setError('');
    setAuthStep('loading');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAuthStep('mfa');
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
            {/* Credentials Step */}
            {authStep === 'credentials' && (
              <>
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
                  {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleCredentialsSubmit}>
                    <div className="mb-5">
                      <label className="text-[#66706A] text-sm mb-2 block font-medium">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input w-full"
                        placeholder="you@company.com"
                        required
                      />
                    </div>

                    <div className="mb-5">
                      <label className="text-[#66706A] text-sm mb-2 block font-medium">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="input w-full pr-12"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#66706A] hover:text-[#172019] transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="mr-2 accent-[#173D2B] w-4 h-4" 
                        />
                        <span className="text-[#66706A] text-sm">Remember me</span>
                      </label>
                  <Link href="/forgot-password" className="text-[#173D2B] text-sm hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn-primary flex w-full items-center justify-center gap-2"
                >
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-[#DDE2DD]" />
                <span className="px-4 text-[#66706A] text-sm">or continue with</span>
                <div className="flex-1 border-t border-[#DDE2DD]" />
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg py-3 font-medium text-[#172019] hover:border-[#173D2B] transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="bg-[#F7F8F6] border border-[#DDE2DD] rounded-lg py-3 font-medium text-[#172019] hover:border-[#173D2B] transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00A4EF">
                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
                  </svg>
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
          </>
        )}

        {/* MFA Step */}
        {authStep === 'mfa' && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#173D2B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#B7D83D]" />
              </div>
              <h1 className="text-3xl font-display font-light text-[#172019] mb-4">
                Two-factor authentication
              </h1>
              <p className="text-[#66706A] font-light">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            <div className="card bg-[#FFFFFF]">
              {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleMFASubmit}>
                <div className="mb-6">
                  <div className="flex gap-2 justify-center mb-4">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={mfaCode[index] || ''}
                        onChange={(e) => {
                          const newCode = mfaCode.split('');
                          newCode[index] = e.target.value;
                          setMfaCode(newCode.join(''));
                          
                          // Auto-focus next input
                          if (e.target.value && index < 5) {
                            const nextInput = document.getElementById(`mfa-${index + 1}`);
                            nextInput?.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !mfaCode[index] && index > 0) {
                            const prevInput = document.getElementById(`mfa-${index - 1}`);
                            prevInput?.focus();
                          }
                        }}
                        id={`mfa-${index}`}
                        className="w-12 h-14 text-center text-2xl font-bold border-2 border-[#DDE2DD] rounded-lg focus:border-[#173D2B] outline-none transition-colors"
                        required
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary flex w-full items-center justify-center gap-2"
                >
                  Verify
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-6 text-center">
                <button 
                  onClick={handleResendCode}
                  className="text-[#173D2B] text-sm hover:underline font-medium"
                >
                  Resend code
                </button>
              </div>
            </div>

            <div className="text-center mt-6">
              <button 
                onClick={() => setAuthStep('credentials')}
                className="text-[#66706A] text-sm hover:text-[#172019] transition-colors"
              >
                ← Back to sign in
              </button>
            </div>
          </>
        )}

        {/* Loading State */}
        {authStep === 'loading' && (
          <div className="card bg-[#FFFFFF] py-12">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-[#173D2B] animate-spin mb-4" />
              <p className="text-[#66706A]">Verifying your credentials...</p>
            </div>
          </div>
        )}

        {/* Success State */}
        {authStep === 'success' && (
          <div className="card bg-[#FFFFFF] py-12">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-[#B7D83D] rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#172019]" />
              </div>
              <h2 className="text-2xl font-display font-light text-[#172019] mb-2">
                Sign in successful
              </h2>
              <p className="text-[#66706A] mb-6">Redirecting to your dashboard...</p>
              <Loader2 className="w-6 h-6 text-[#173D2B] animate-spin" />
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
