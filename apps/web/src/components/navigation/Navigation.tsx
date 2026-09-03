'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLink from '../molecules/BrandLink';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navigationStructure: NavItem[] = [
  {
    label: 'Platform',
    href: '/platform',
    children: [
      { label: 'Property Intelligence', href: '/platform/intelligence' },
      { label: 'AI Valuation', href: '/platform/valuation' },
      { label: 'Investment Underwriting', href: '/platform/underwriting' },
      { label: 'Investor Marketplace', href: '/platform/marketplace' },
      { label: 'Investor Matching', href: '/platform/matching' },
      { label: 'Deal Management', href: '/platform/deals' },
      { label: 'Market Intelligence', href: '/platform/market-intelligence' },
      { label: 'Data Intelligence', href: '/platform/data-intelligence' },
      { label: 'AI Assistant', href: '/platform/ai-assistant' },
    ]
  },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'For Investors', href: '/solutions/investors' },
      { label: 'For Acquisitions Teams', href: '/solutions/acquisitions' },
      { label: 'For Analysts', href: '/solutions/analysts' },
      { label: 'Enterprise', href: '/solutions/enterprise' },
    ]
  },
  {
    label: 'Company',
    href: '/company',
    children: [
      { label: 'About', href: '/company/about' },
      { label: 'Pricing', href: '/company/pricing' },
      { label: 'Contact', href: '/company/contact' },
    ]
  },
  {
    label: 'Resources',
    href: '/resources',
    children: [
      { label: 'Insights', href: '/resources/insights' },
      { label: 'Reports', href: '/resources/reports' },
      { label: 'Guides', href: '/resources/guides' },
      { label: 'Documentation', href: '/resources/docs' },
    ]
  }
];

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F8F6]/80 backdrop-blur-lg border-b border-[#DDE2DD]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <BrandLink />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationStructure.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="text-[#66706A] font-medium hover:text-[#172019] transition-colors relative group">
                  {item.label}
                  <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-[#173D2B] transition-all group-hover:w-full"></span>
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {activeDropdown === item.label && item.children && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-[#FFFFFF]/95 backdrop-blur-lg border border-[#DDE2DD] rounded-lg overflow-hidden shadow-lg"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-3 text-[#66706A] hover:text-[#172019] hover:bg-[#F7F8F6] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-[#66706A] font-medium hover:text-[#172019] transition-colors">
              Sign in
            </Link>
            <Link 
              href="/signup" 
              className="bg-[#173D2B] text-[#FFFFFF] px-6 py-2 rounded-full font-semibold hover:bg-[#0F2B1D] transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#66706A]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#DDE2DD] bg-[#F7F8F6]"
          >
            <div className="px-6 py-4 space-y-4">
              {navigationStructure.map((item) => (
                <div key={item.label}>
                  <button
                    className="w-full text-left text-[#66706A] font-medium py-2"
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                  </button>
                  {activeDropdown === item.label && item.children && (
                    <div className="pl-4 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block py-2 text-[#9AA8A0] hover:text-[#172019]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-[#DDE2DD] space-y-3">
                <Link href="/login" className="block text-center text-[#66706A] font-medium py-2">
                  Sign in
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-[#173D2B] text-[#FFFFFF] px-6 py-2 rounded-full font-semibold hover:bg-[#0F2B1D] transition-all w-full text-center block"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}