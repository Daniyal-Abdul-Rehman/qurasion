'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bell, Calendar, ChevronLeft, FileText, HandCoins, LayoutDashboard, MessageSquare, PieChart, Settings, Target, Users, WalletCards, Building2, Briefcase, ListTodo, Home, Star, DollarSign } from 'lucide-react';
import { BrandMark, IconButton } from '../atoms';

const navigation = [
  ['Dashboard', '/host/dashboard', LayoutDashboard],
  ['Listings', '/host/listings', Home],
  ['Calendar', '/host/calendar', Calendar],
  ['Bookings', '/host/bookings', FileText],
  ['Messages', '/host/messages', MessageSquare],
  ['Reviews', '/host/reviews', Star],
  ['Earnings', '/host/earnings', DollarSign],
  ['Tasks', '/host/tasks', ListTodo],
  ['Analytics', '/host/analytics', PieChart],
] as const;

export default function HostSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={`${collapsed ? 'w-[76px]' : 'w-[248px]'} hidden shrink-0 border-r border-[var(--border)] bg-[var(--surface-2)] px-3 py-5 transition-[width] duration-300 lg:flex lg:flex-col`}>
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-3`}>
        {collapsed ? <BrandMark /> : <Link href="/" className="flex items-center gap-2"><BrandMark /><span className="font-display text-xl">qurasion</span></Link>}
        {!collapsed && <IconButton label="Collapse navigation" onClick={() => setCollapsed(true)} className="h-8 w-8"><ChevronLeft size={15} /></IconButton>}
      </div>
      <p className={`mb-3 mt-10 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)] ${collapsed ? 'text-center' : ''}`}>{collapsed ? '·' : 'Host workspace'}</p>
      <nav className="space-y-1">
        {navigation.map(([label, href, Icon]) => (
          <Link key={label} href={href} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm ${label === 'Dashboard' ? 'bg-[var(--lime)] font-semibold text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-3)] hover:text-[var(--text-primary)]'} ${collapsed ? 'justify-center' : ''}`}>
            <Icon size={17} strokeWidth={1.8} />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
      <div className="mt-auto space-y-1 border-t border-[var(--border)] pt-4">
        <Link href="/host/notifications" className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-3)] ${collapsed ? 'justify-center' : ''}`}>
          <Bell size={17} />
          {!collapsed && 'Notifications'}
        </Link>
        <Link href="/host/settings" className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-3)] ${collapsed ? 'justify-center' : ''}`}>
          <Settings size={17} />
          {!collapsed && 'Settings'}
        </Link>
        {!collapsed && (
          <div className="mt-5 flex items-center gap-3 rounded-md bg-[var(--surface-3)] p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-semibold text-white">HS</div>
            <div>
              <p className="text-xs font-semibold">Host Sarah</p>
              <p className="text-[11px] text-[var(--text-secondary)]">Superhost</p>
            </div>
          </div>
        )}
        {collapsed && <IconButton label="Expand navigation" onClick={() => setCollapsed(false)} className="mt-3"><ChevronLeft size={15} className="rotate-180" /></IconButton>}
      </div>
    </aside>
  );
}
