'use client';

import { motion } from 'framer-motion';
import { Scene3D } from '../../components/3d';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, Loader2, Lock, ShieldCheck } from 'lucide-react';

type ResetStep = 'form' | 'loading' | 'success' | 'error';

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState<ResetStep>('form');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    return { strength, label: labels[strength] };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setStep('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, show success
    setStep('success');
  };

  const passwordStrength = getPasswordStrength(formData.password);

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
            {/* Form Step */}
            {step === 'form' && (
              <>
                {/* Title */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-[#173D2B] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-[#B7D83D]" />
                  </div>
                  <h1 className="text-3xl font-display font-light text-[#172019] mb-4">
                    Set new password
                  </h1>
                  <p className="text-[#66706A] font-light">
                    Create a strong password with at least 8 characters.
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
                    <div className="mb-5">
                      <label className="text-[#66706A] text-sm mb-2 block font-medium">New password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="input w-full pr-12"
                          placeholder="At least 8 characters"
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
                      
                      {/* Password Strength Indicator */}
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`h-1 flex-1 rounded-full transition-colors ${
                                  level <= passwordStrength.strength
                                    ? passwordStrength.strength <= 2
                                      ? 'bg-red-500'
                                      : passwordStrength.strength <= 3
                                      ? 'bg-yellow-500'
                                      : 'bg-green-500'
                                    : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-[#66706A]">
                            Password strength: <span className={`font-medium ${
                              passwordStrength.strength <= 2 ? 'text-red-600' : 
                              passwordStrength.strength <= 3 ? 'text-yellow-600' : 'text-green-600'
                            }`}>{passwordStrength.label || 'Enter password'}</span>
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="text-[#66706A] text-sm mb-2 block font-medium">Confirm password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="input w-full pr-12"
                          placeholder="Confirm your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#66706A] hover:text-[#172019] transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      
                      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Passwords do not match
                        </p>
                      )}
                    </div>

                    {/* Password Requirements */}
                    <div className="mb-6 p-4 bg-[#F7F8F6] rounded-lg">
                      <p className="text-xs font-semibold text-[#66706A] mb-2">Password requirements:</p>
                      <ul className="space-y-1 text-xs text-[#66706A]">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className={`w-3 h-3 ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-300'}`} />
                          At least 8 characters
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className={`w-3 h-3 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-300'}`} />
                          One uppercase letter
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className={`w-3 h-3 ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-300'}`} />
                          One number
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className={`w-3 h-3 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-300'}`} />
                          One special character
                        </li>
                      </ul>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary flex w-full items-center justify-center gap-2"
                    >
                      Reset password
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                {/* Back to Sign In */}
                <div className="text-center mt-8">
                  <Link 
                    href="/login" 
                    className="text-[#66706A] hover:text-[#172019] transition-colors"
                  >
                    Return to sign in
                  </Link>
                </div>
              </>
            )}

            {/* Loading State */}
            {step === 'loading' && (
              <div className="card bg-[#FFFFFF] py-12">
                <div className="flex flex-col items-center justify-center">
                  <Loader2 className="w-12 h-12 text-[#173D2B] animate-spin mb-4" />
                  <p className="text-[#66706A]">Resetting your password...</p>
                </div>
              </div>
            )}

            {/* Success State */}
            {step === 'success' && (
              <div className="card bg-[#FFFFFF] py-12">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-[#B7D83D] rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="w-8 h-8 text-[#172019]" />
                  </div>
                  <h2 className="text-2xl font-display font-light text-[#172019] mb-2">
                    Password reset successful
                  </h2>
                  <p className="text-[#66706A] mb-6">
                    Your password has been successfully reset. You can now sign in with your new password.
                  </p>
                  
                  <Link 
                    href="/login" 
                    className="btn-primary flex items-center justify-center gap-2 w-full max-w-xs"
                  >
                    Sign in with new password
                    <ArrowRight className="w-4 h-4" />
                  </Link>
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