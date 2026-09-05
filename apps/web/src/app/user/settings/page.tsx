'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  User, Shield, Bell, Lock, Globe, CreditCard, HelpCircle, 
  LogOut, ChevronRight, ToggleRight, ToggleLeft
} from 'lucide-react';
import BuyerPageShell from '../../../components/organisms/BuyerPageShell';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showActivity: true,
    allowContact: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy({ ...privacy, [key]: !privacy[key] });
  };

  return (
    <BuyerPageShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl">Settings</h1>
          <p className="mt-1 text-[#66706A]">Manage your account preferences</p>
        </div>

        {/* Account */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white">
          <div className="flex items-center justify-between p-4 border-b border-[#E8EBE8]">
            <div className="flex items-center gap-3">
              <User size={20} className="text-[#66706A]" />
              <span className="font-medium">Account</span>
            </div>
          </div>
          <div className="divide-y divide-[#E8EBE8]">
            <Link
              href="/user/profile"
              className="flex items-center justify-between p-4 hover:bg-[#F0F2F0] transition-colors"
            >
              <span className="text-sm">Profile information</span>
              <ChevronRight size={16} className="text-[#9AA8A0]" />
            </Link>
            <Link
              href="/user/settings/security"
              className="flex items-center justify-between p-4 hover:bg-[#F0F2F0] transition-colors"
            >
              <span className="text-sm">Security</span>
              <ChevronRight size={16} className="text-[#9AA8A0]" />
            </Link>
            <Link
              href="/user/settings/payment"
              className="flex items-center justify-between p-4 hover:bg-[#F0F2F0] transition-colors"
            >
              <span className="text-sm">Payment methods</span>
              <ChevronRight size={16} className="text-[#9AA8A0]" />
            </Link>
          </div>
        </section>

        {/* Notifications */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white">
          <div className="flex items-center justify-between p-4 border-b border-[#E8EBE8]">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-[#66706A]" />
              <span className="font-medium">Notifications</span>
            </div>
          </div>
          <div className="divide-y divide-[#E8EBE8]">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">Email notifications</p>
                <p className="text-xs text-[#66706A]">Receive updates about your properties via email</p>
              </div>
              <button
                onClick={() => toggleNotification('email')}
                className="text-[#173D2B]"
              >
                {notifications.email ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-[#DDE2DD]" />}
              </button>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">Push notifications</p>
                <p className="text-xs text-[#66706A]">Receive push notifications on your device</p>
              </div>
              <button
                onClick={() => toggleNotification('push')}
                className="text-[#173D2B]"
              >
                {notifications.push ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-[#DDE2DD]" />}
              </button>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">SMS notifications</p>
                <p className="text-xs text-[#66706A]">Receive text message updates</p>
              </div>
              <button
                onClick={() => toggleNotification('sms')}
                className="text-[#173D2B]"
              >
                {notifications.sms ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-[#DDE2DD]" />}
              </button>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">Marketing emails</p>
                <p className="text-xs text-[#66706A]">Receive promotional content and recommendations</p>
              </div>
              <button
                onClick={() => toggleNotification('marketing')}
                className="text-[#173D2B]"
              >
                {notifications.marketing ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-[#DDE2DD]" />}
              </button>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white">
          <div className="flex items-center justify-between p-4 border-b border-[#E8EBE8]">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-[#66706A]" />
              <span className="font-medium">Privacy</span>
            </div>
          </div>
          <div className="divide-y divide-[#E8EBE8]">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">Profile visibility</p>
                <p className="text-xs text-[#66706A]">Allow others to see your profile</p>
              </div>
              <button
                onClick={() => togglePrivacy('profileVisible')}
                className="text-[#173D2B]"
              >
                {privacy.profileVisible ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-[#DDE2DD]" />}
              </button>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">Show activity</p>
                <p className="text-xs text-[#66706A]">Display your recent activity on your profile</p>
              </div>
              <button
                onClick={() => togglePrivacy('showActivity')}
                className="text-[#173D2B]"
              >
                {privacy.showActivity ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-[#DDE2DD]" />}
              </button>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">Allow contact</p>
                <p className="text-xs text-[#66706A]">Allow brokers and hosts to contact you</p>
              </div>
              <button
                onClick={() => togglePrivacy('allowContact')}
                className="text-[#173D2B]"
              >
                {privacy.allowContact ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-[#DDE2DD]" />}
              </button>
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white">
          <div className="flex items-center justify-between p-4 border-b border-[#E8EBE8]">
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-[#66706A]" />
              <span className="font-medium">Preferences</span>
            </div>
          </div>
          <div className="divide-y divide-[#E8EBE8]">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">Language</p>
                <p className="text-xs text-[#66706A]">Select your preferred language</p>
              </div>
              <select className="rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">Currency</p>
                <p className="text-xs text-[#66706A]">Select your preferred currency</p>
              </div>
              <select className="rounded-md border border-[#DDE2DD] px-3 py-2 text-sm focus:border-[#173D2B] focus:outline-none focus:ring-1 focus:ring-[#173D2B]">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>CAD ($)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white">
          <div className="flex items-center justify-between p-4 border-b border-[#E8EBE8]">
            <div className="flex items-center gap-3">
              <HelpCircle size={20} className="text-[#66706A]" />
              <span className="font-medium">Support</span>
            </div>
          </div>
          <div className="divide-y divide-[#E8EBE8]">
            <Link
              href="/help"
              className="flex items-center justify-between p-4 hover:bg-[#F0F2F0] transition-colors"
            >
              <span className="text-sm">Help center</span>
              <ChevronRight size={16} className="text-[#9AA8A0]" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-between p-4 hover:bg-[#F0F2F0] transition-colors"
            >
              <span className="text-sm">Contact us</span>
              <ChevronRight size={16} className="text-[#9AA8A0]" />
            </Link>
            <Link
              href="/terms"
              className="flex items-center justify-between p-4 hover:bg-[#F0F2F0] transition-colors"
            >
              <span className="text-sm">Terms of service</span>
              <ChevronRight size={16} className="text-[#9AA8A0]" />
            </Link>
            <Link
              href="/privacy"
              className="flex items-center justify-between p-4 hover:bg-[#F0F2F0] transition-colors"
            >
              <span className="text-sm">Privacy policy</span>
              <ChevronRight size={16} className="text-[#9AA8A0]" />
            </Link>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="rounded-lg border border-[#C41E3A] bg-white">
          <div className="flex items-center justify-between p-4 border-b border-[#E8EBE8]">
            <div className="flex items-center gap-3">
              <LogOut size={20} className="text-[#C41E3A]" />
              <span className="font-medium text-[#C41E3A]">Account</span>
            </div>
          </div>
          <div className="divide-y divide-[#E8EBE8]">
            <button className="flex items-center justify-between w-full p-4 hover:bg-[#FDE8E8] transition-colors text-left">
              <span className="text-sm text-[#C41E3A]">Log out</span>
            </button>
            <button className="flex items-center justify-between w-full p-4 hover:bg-[#FDE8E8] transition-colors text-left">
              <span className="text-sm text-[#C41E3A]">Delete account</span>
            </button>
          </div>
        </section>
      </div>
    </BuyerPageShell>
  );
}
