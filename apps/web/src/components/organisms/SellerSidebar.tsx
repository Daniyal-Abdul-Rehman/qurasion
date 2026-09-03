'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bell, Building2, ChevronLeft, FileText, HandCoins, LayoutDashboard, MessageSquare, PieChart, Settings, Users, WalletCards } from 'lucide-react';
import { BrandMark, IconButton } from '../atoms';

const navigation = [
  ['Dashboard', '/seller/dashboard', LayoutDashboard],
  ['My Properties', '/seller/properties', Building2],
  ['Listings', '/seller/listings', FileText],
  ['Investor Interest', '/seller/investor-interest', Users],
  ['Offers', '/seller/offers', HandCoins],
  ['Deals', '/seller/deals', WalletCards],
  ['Documents', '/seller/documents', FileText],
  ['Analytics', '/seller/analytics', PieChart],
] as const;

export default function SellerSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return <aside className={`${collapsed ? 'w-[76px]' : 'w-[248px]'} hidden shrink-0 border-r border-[#DDE2DD] bg-[#FBFCFA] px-3 py-5 transition-[width] duration-300 lg:flex lg:flex-col`}>
    <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-3`}>
      {collapsed ? <BrandMark /> : <Link href="/" className="flex items-center gap-2"><BrandMark /><span className="font-display text-xl">qurasion</span></Link>}
      {!collapsed && <IconButton label="Collapse navigation" onClick={() => setCollapsed(true)} className="h-8 w-8"><ChevronLeft size={15} /></IconButton>}
    </div>
    <p className={`mb-3 mt-10 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9AA8A0] ${collapsed ? 'text-center' : ''}`}>{collapsed ? '·' : 'Seller workspace'}</p>
    <nav className="space-y-1">{navigation.map(([label, href, Icon]) => <Link key={label} href={href} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm ${label === 'Dashboard' ? 'bg-[#E8F5D3] font-semibold text-[#173D2B]' : 'text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#172019]'} ${collapsed ? 'justify-center' : ''}`}><Icon size={17} strokeWidth={1.8} />{!collapsed && <span>{label}</span>}</Link>)}</nav>
    <div className="mt-auto space-y-1 border-t border-[#DDE2DD] pt-4">
      <Link href="/seller/messages" className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#66706A] hover:bg-[#F0F2F0] ${collapsed ? 'justify-center' : ''}`}><MessageSquare size={17} />{!collapsed && 'Messages'}</Link>
      <Link href="/seller/notifications" className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#66706A] hover:bg-[#F0F2F0] ${collapsed ? 'justify-center' : ''}`}><Bell size={17} />{!collapsed && 'Notifications'}</Link>
      <Link href="/seller/settings" className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#66706A] hover:bg-[#F0F2F0] ${collapsed ? 'justify-center' : ''}`}><Settings size={17} />{!collapsed && 'Settings'}</Link>
      {!collapsed && <div className="mt-5 flex items-center gap-3 rounded-md bg-[#F0F2F0] p-3"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173D2B] text-xs font-semibold text-white">JM</div><div><p className="text-xs font-semibold">Jordan Miller</p><p className="text-[11px] text-[#66706A]">Property owner</p></div></div>}
      {collapsed && <IconButton label="Expand navigation" onClick={() => setCollapsed(false)} className="mt-3"><ChevronLeft size={15} className="rotate-180" /></IconButton>}
    </div>
  </aside>;
}
