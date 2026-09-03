'use client';

import Link from 'next/link';
import BrandLink from '../molecules/BrandLink';

const footerLinks = {
  platform: [
    { label: 'Property Intelligence', href: '/platform/intelligence' },
    { label: 'AI Valuation', href: '/platform/valuation' },
    { label: 'Investment Underwriting', href: '/platform/underwriting' },
    { label: 'Investor Marketplace', href: '/platform/marketplace' },
    { label: 'Investor Matching', href: '/platform/matching' },
    { label: 'Deal Management', href: '/platform/deals' },
  ],
  solutions: [
    { label: 'For Investors', href: '/solutions/investors' },
    { label: 'For Acquisitions Teams', href: '/solutions/acquisitions' },
    { label: 'For Analysts', href: '/solutions/analysts' },
    { label: 'Enterprise', href: '/solutions/enterprise' },
  ],
  company: [
    { label: 'About', href: '/company/about' },
    { label: 'Pricing', href: '/company/pricing' },
    { label: 'Contact', href: '/company/contact' },
    { label: 'Careers', href: '/company/careers' },
  ],
  resources: [
    { label: 'Insights', href: '/resources/insights' },
    { label: 'Reports', href: '/resources/reports' },
    { label: 'Guides', href: '/resources/guides' },
    { label: 'Documentation', href: '/resources/docs' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#FFFFFF] border-t border-[#DDE2DD] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4"><BrandLink /></div>
            <p className="text-[#66706A] text-sm">
              Real estate intelligence built for the modern investor.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-[#172019] font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#66706A] hover:text-[#172019] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-[#172019] font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#66706A] hover:text-[#172019] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[#172019] font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#66706A] hover:text-[#172019] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[#172019] font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#66706A] hover:text-[#172019] text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#DDE2DD] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#9AA8A0] text-sm">
            © 2024 Qurasion. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-[#9AA8A0] hover:text-[#66706A] text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[#9AA8A0] hover:text-[#66706A] text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/security" className="text-[#9AA8A0] hover:text-[#66706A] text-sm transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}