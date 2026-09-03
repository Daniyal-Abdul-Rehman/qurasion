'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BarChart3, Bell, Bot, BriefcaseBusiness, Building2, ChevronLeft, FileSearch, GitCompare, LayoutDashboard, MessageSquare, Search, Settings, Sparkles, WalletCards } from 'lucide-react';
import { BrandMark, IconButton } from '../atoms';

const navigation = [
  { label: 'Dashboard', href: '/investor/dashboard', icon: LayoutDashboard },
  { label: 'Discover', href: '/investor/properties', icon: Search },
  { label: 'Matches', href: '/investor/matches', icon: Sparkles, count: 17 },
  { label: 'Saved', href: '/investor/saved', icon: Building2 },
  { label: 'Compare', href: '/investor/compare', icon: GitCompare },
  { label: 'Analyses', href: '/investor/analyses', icon: FileSearch, count: 8 },
  { label: 'Offers', href: '/investor/offers', icon: WalletCards, count: 4 },
  { label: 'Deals', href: '/investor/deals', icon: BriefcaseBusiness },
  { label: 'Portfolio', href: '/investor/portfolio', icon: BarChart3 },
  { label: 'AI Assistant', href: '/investor/assistant', icon: Bot },
];

export default function InvestorSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`${collapsed ? 'w-[76px]' : 'w-[248px]'} hidden shrink-0 border-r border-[#DDE2DD] bg-[#FBFCFA] px-3 py-5 transition-[width] duration-300 lg:flex lg:flex-col`}>
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-3`}>
        {collapsed ? <BrandMark /> : <Link href="/" className="flex items-center gap-2"><BrandMark /><span className="font-display text-xl text-[#172019]">qurasion</span></Link>}
        {!collapsed && <IconButton label="Collapse navigation" onClick={() => setCollapsed(true)} className="h-8 w-8"><ChevronLeft size={15} /></IconButton>}
      </div>
      <p className={`mb-3 mt-10 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9AA8A0] ${collapsed ? 'text-center' : ''}`}>{collapsed ? '·' : 'Investor workspace'}</p>
      <nav className="space-y-1">
        {navigation.map(({ label, href, icon: Icon, count }) => (
          <Link key={label} href={href} className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm ${label === 'Dashboard' ? 'bg-[#E8F5D3] font-semibold text-[#173D2B]' : 'text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#172019]'} ${collapsed ? 'justify-center' : ''}`}>
            <Icon size={17} strokeWidth={1.8} />
            {!collapsed && <><span className="flex-1">{label}</span>{count && <span className="font-mono text-[10px] text-[#8B9C8C]">{count}</span>}</>}
          </Link>
        ))}
      </nav>
      <div className="mt-auto space-y-1 border-t border-[#DDE2DD] pt-4">
        <Link href="/investor/messages" className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#172019] ${collapsed ? 'justify-center' : ''}`}><MessageSquare size={17} />{!collapsed && 'Messages'}</Link>
        <Link href="/investor/notifications" className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#172019] ${collapsed ? 'justify-center' : ''}`}><Bell size={17} />{!collapsed && 'Notifications'}</Link>
        <Link href="/investor/settings" className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#172019] ${collapsed ? 'justify-center' : ''}`}><Settings size={17} />{!collapsed && 'Settings'}</Link>
        {collapsed && <IconButton label="Expand navigation" onClick={() => setCollapsed(false)} className="mt-3"><ChevronLeft size={15} className="rotate-180" /></IconButton>}
        {!collapsed && <div className="mt-5 flex items-center gap-3 rounded-md bg-[#F0F2F0] p-3"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173D2B] text-xs font-semibold text-white">KM</div><div className="min-w-0"><p className="truncate text-xs font-semibold text-[#172019]">Kara Mitchell</p><p className="text-[11px] text-[#66706A]">Individual investor</p></div></div>}
      </div>
    </aside>
  );
}
