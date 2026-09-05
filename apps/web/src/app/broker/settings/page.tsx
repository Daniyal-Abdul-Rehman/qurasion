import Link from 'next/link';
import { ArrowRight, Settings, User, Building2, Bell, Shield, Calendar, Users, CreditCard, Zap, Lock, ChevronRight, MessageSquare, Book } from 'lucide-react';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';

const settingsSections = [
  { name: 'Profile', icon: User, description: 'Manage your personal information' },
  { name: 'Brokerage', icon: Building2, description: 'Brokerage details and settings' },
  { name: 'Notifications', icon: Bell, description: 'Configure notification preferences' },
  { name: 'Privacy', icon: Shield, description: 'Privacy and data settings' },
  { name: 'Communication', icon: User, description: 'Email and contact preferences' },
  { name: 'Calendar', icon: Calendar, description: 'Calendar integration and settings' },
  { name: 'Team', icon: Users, description: 'Team management and permissions' },
  { name: 'Permissions', icon: Lock, description: 'Access and permission settings' },
  { name: 'Billing', icon: CreditCard, description: 'Subscription and payment settings' },
  { name: 'Integrations', icon: Zap, description: 'Third-party integrations' },
  { name: 'Security', icon: Lock, description: 'Security and authentication' },
];

export default function SettingsPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Settings"
      description="Manage your account, preferences, and workspace configuration."
      action={null}
    >
      {/* Profile Overview */}
      <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start gap-6">
          <div className="h-20 w-20 shrink-0 rounded-full bg-[#173D2B] flex items-center justify-center text-2xl font-semibold text-white">
            DR
          </div>
          <div className="flex-1">
            <h2 className="font-display text-2xl">Daniyal Rehman</h2>
            <p className="text-sm text-[#66706A] mt-1">Real Estate Broker</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-[#66706A]">
              <span>daniyal.rehman@email.com</span>
              <span>•</span>
              <span>(214) 555-0123</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Link href="/broker/settings/profile" className="btn-primary px-4 py-2 text-sm">
                Edit Profile
              </Link>
              <Link href="/broker/profile" className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">
                View Public Profile
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Settings Navigation */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Configuration</p>
            <h2 className="mt-2 font-display text-2xl">Settings</h2>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.name}
                href={`/broker/settings/${section.name.toLowerCase()}`}
                className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0E5]">
                  <Icon size={20} className="text-[#173D2B]" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{section.name}</p>
                  <p className="text-sm text-[#66706A]">{section.description}</p>
                </div>
                <ChevronRight size={16} className="text-[#9AA8A0]" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Settings */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Quick actions</p>
            <h2 className="mt-2 font-display text-2xl">Common settings</h2>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-[#E8EBE8]">
            <div>
              <p className="font-semibold text-sm">Email notifications</p>
              <p className="text-xs text-[#66706A]">Receive email updates for important activity</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-[#DDE2DD] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#173D2B]" />
            </label>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-[#E8EBE8]">
            <div>
              <p className="font-semibold text-sm">Push notifications</p>
              <p className="text-xs text-[#66706A]">Receive push notifications on your devices</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-[#DDE2DD] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#173D2B]" />
            </label>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-[#E8EBE8]">
            <div>
              <p className="font-semibold text-sm">Two-factor authentication</p>
              <p className="text-xs text-[#66706A]">Add an extra layer of security to your account</p>
            </div>
            <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">
              Enable
            </button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-semibold text-sm">Calendar sync</p>
              <p className="text-xs text-[#66706A]">Sync your calendar with external providers</p>
            </div>
            <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">
              Connect
            </button>
          </div>
        </div>
      </section>

      {/* Account Status */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Account</p>
            <h2 className="mt-2 font-display text-2xl">Account status</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-[#E8F5D3] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-[#B7D83D]" />
              <p className="text-xs text-[#9AA8A0]">Verification Status</p>
            </div>
            <p className="font-semibold text-sm">Verified</p>
            <p className="text-xs text-[#66706A] mt-1">Identity and license verified</p>
          </div>
          <div className="rounded-lg bg-[#E7F0F4] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-[#315A6B]" />
              <p className="text-xs text-[#9AA8A0]">Subscription</p>
            </div>
            <p className="font-semibold text-sm">Professional Plan</p>
            <p className="text-xs text-[#66706A] mt-1">Renews Oct 15, 2026</p>
          </div>
          <div className="rounded-lg bg-[#F3EBDD] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-[#745F35]" />
              <p className="text-xs text-[#9AA8A0]">Brokerage</p>
            </div>
            <p className="font-semibold text-sm">Qurasion Realty</p>
            <p className="text-xs text-[#66706A] mt-1">Dallas, TX</p>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Support</p>
            <h2 className="mt-2 font-display text-2xl">Help & support</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="#" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0E5]">
              <User size={20} className="text-[#173D2B]" />
            </div>
            <div>
              <p className="font-semibold">Help Center</p>
              <p className="text-sm text-[#66706A]">Get help with using Qurasion</p>
            </div>
          </Link>
          <Link href="#" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
              <MessageSquare size={20} className="text-[#315A6B]" />
            </div>
            <div>
              <p className="font-semibold">Contact Support</p>
              <p className="text-sm text-[#66706A]">Reach our support team</p>
            </div>
          </Link>
          <Link href="#" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
              <Book size={20} className="text-[#745F35]" />
            </div>
            <div>
              <p className="font-semibold">Documentation</p>
              <p className="text-sm text-[#66706A]">View detailed guides</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="mt-6 rounded-lg border border-[#E83838] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#E83838]">Danger zone</p>
            <h2 className="mt-2 font-display text-2xl">Account actions</h2>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-[#E8EBE8]">
            <div>
              <p className="font-semibold text-sm">Export data</p>
              <p className="text-xs text-[#66706A]">Download all your data from Qurasion</p>
            </div>
            <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">
              Export
            </button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-semibold text-sm text-[#E83838]">Delete account</p>
              <p className="text-xs text-[#66706A]">Permanently delete your account and all data</p>
            </div>
            <button className="rounded-lg border border-[#E83838] bg-white px-4 py-2 text-sm text-[#E83838] hover:bg-[#E83838] hover:text-white">
              Delete Account
            </button>
          </div>
        </div>
      </section>
    </BrokerPageShell>
  );
}