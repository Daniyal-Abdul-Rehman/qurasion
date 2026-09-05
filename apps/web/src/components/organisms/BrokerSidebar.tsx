'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bell, Calendar, ChevronLeft, FileText, HandCoins, LayoutDashboard, MessageSquare, PieChart, Settings, Target, Users, WalletCards, Building2, Briefcase, ListTodo } from 'lucide-react';
import { BrandMark, IconButton } from '../atoms';

const navigation = [
  ['Dashboard', '/broker/dashboard', LayoutDashboard],
  ['Leads', '/broker/leads', Target],
  ['Contacts', '/broker/contacts', Users],
  ['Sellers', '/broker/sellers', Briefcase],
  ['Investors', '/broker/investors', Users],
  ['Properties', '/broker/properties', Building2],
  ['Listings', '/broker/listings', FileText],
  ['Investor Demand', '/broker/investor-demand', Target],
  ['Matches', '/broker/matches', Target],
  ['Offers', '/broker/offers', HandCoins],
  ['Negotiations', '/broker/negotiations', HandCoins],
  ['Deals', '/broker/deals', WalletCards],
  ['Transactions', '/broker/transactions', WalletCards],
  ['Tasks', '/broker/tasks', ListTodo],
  ['Calendar', '/broker/calendar', Calendar],
  ['Documents', '/broker/documents', FileText],
  ['Messages', '/broker/messages', MessageSquare],
  ['Analytics', '/broker/analytics', PieChart],
] as const;

export default function BrokerSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={`${collapsed ? 'w-[76px]' : 'w-[248px]'} hidden shrink-0 border-r border-[#DDE2DD] bg-[#FBFCFA] px-3 py-5 transition-[width] duration-300 lg:flex lg:flex-col`}>
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-3`}>
        {collapsed ? <BrandMark /> : <Link href="/" className="flex items-center gap-2"><BrandMark /><span className="font-display text-xl">qurasion</span></Link>}
        {!collapsed && <IconButton label="Collapse navigation" onClick={() => setCollapsed(true)} className="h-8 w-8"><ChevronLeft size={15} /></IconButton>}
      </div>
      <p className={`mb-3 mt-10 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9AA8A0] ${collapsed ? 'text-center' : ''}`}>{collapsed ? '·' : 'Broker workspace'}</p>
      <nav className="space-y-1">
        {navigation.map(([label, href, Icon]) => (
          <Link key={label} href={href} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm ${label === 'Dashboard' ? 'bg-[#E8F5D3] font-semibold text-[#173D2B]' : 'text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#172019]'} ${collapsed ? 'justify-center' : ''}`}>
            <Icon size={17} strokeWidth={1.8} />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
      <div className="mt-auto space-y-1 border-t border-[#DDE2DD] pt-4">
        <Link href="/broker/notifications" className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#66706A] hover:bg-[#F0F2F0] ${collapsed ? 'justify-center' : ''}`}>
          <Bell size={17} />
          {!collapsed && 'Notifications'}
        </Link>
        <Link href="/broker/settings" className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#66706A] hover:bg-[#F0F2F0] ${collapsed ? 'justify-center' : ''}`}>
          <Settings size={17} />
          {!collapsed && 'Settings'}
        </Link>
        {!collapsed && (
          <div className="mt-5 flex items-center gap-3 rounded-md bg-[#F0F2F0] p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173D2B] text-xs font-semibold text-white">DR</div>
            <div>
              <p className="text-xs font-semibold">Daniyal Rehman</p>
              <p className="text-[11px] text-[#66706A]">Real Estate Broker</p>
            </div>
          </div>
        )}
        {collapsed && <IconButton label="Expand navigation" onClick={() => setCollapsed(false)} className="mt-3"><ChevronLeft size={15} className="rotate-180" /></IconButton>}
      </div>
    </aside>
  );
}