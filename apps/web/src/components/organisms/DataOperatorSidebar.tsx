'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft, Database, LayoutDashboard, Settings, FileText, CheckCircle, AlertTriangle, Activity, HardDrive, Layers, Server, BarChart3, Clock, Wrench, Zap, Bell } from 'lucide-react';
import { BrandMark, IconButton } from '../atoms';
import { notificationData } from '../../lib/data-operator-data';

const navigation = [
  ['Dashboard', '/data-operator/dashboard', LayoutDashboard],
  ['Data Providers', '/data-operator/providers', Database],
  ['Data Ingestion', '/data-operator/ingestion', Activity],
  ['Entity Resolution', '/data-operator/entity-resolution', Layers],
  ['Data Quality', '/data-operator/quality', CheckCircle],
  ['Background Jobs', '/data-operator/jobs', Clock],
  ['Raw Data Storage', '/data-operator/storage', HardDrive],
  ['Search Index', '/data-operator/search-index', Server],
  ['Valuation Jobs', '/data-operator/valuation', BarChart3],
  ['Normalization', '/data-operator/normalization', FileText],
  ['Data Pipelines', '/data-operator/pipelines', Wrench],
  ['System Health', '/data-operator/health', AlertTriangle],
  ['Notifications', '/data-operator/notifications', Bell],
] as const;

export default function DataOperatorSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={`${collapsed ? 'w-[76px]' : 'w-[248px]'} hidden shrink-0 border-r border-[var(--border)] bg-[var(--surface-2)] px-3 py-5 transition-[width] duration-300 lg:flex lg:flex-col`}>
      <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-3`}>
        {collapsed ? <BrandMark /> : <Link href="/" className="flex items-center gap-2"><BrandMark /><span className="font-display text-xl">qurasion</span></Link>}
        {!collapsed && <IconButton label="Collapse navigation" onClick={() => setCollapsed(true)} className="h-8 w-8"><ChevronLeft size={15} /></IconButton>}
      </div>
      <p className={`mb-3 mt-10 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)] ${collapsed ? 'text-center' : ''}`}>{collapsed ? '·' : 'Data Operations'}</p>
      <nav className="space-y-1">
        {navigation.map(([label, href, Icon]) => (
          <Link key={label} href={href} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm ${label === 'Dashboard' ? 'bg-[#E8F5D3] font-semibold text-[#173D2B]' : 'text-[#66706A] hover:bg-[#F0F2F0] hover:text-[#172019]'} ${collapsed ? 'justify-center' : ''}`}>
            <div className="relative">
              <Icon size={17} strokeWidth={1.8} />
              {label === 'Notifications' && notificationData.unread > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#DC2626] text-[10px] font-semibold text-white">
                  {notificationData.unread > 9 ? '9+' : notificationData.unread}
                </span>
              )}
            </div>
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
      <div className="mt-auto space-y-1 border-t border-[#DDE2DD] pt-4">
        <Link href="/data-operator/settings" className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-[#66706A] hover:bg-[#F0F2F0] ${collapsed ? 'justify-center' : ''}`}>
          <Settings size={17} />
          {!collapsed && 'Settings'}
        </Link>
        {!collapsed && (
          <div className="mt-5 flex items-center gap-3 rounded-md bg-[#F0F2F0] p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#173D2B] text-xs font-semibold text-white">DO</div>
            <div>
              <p className="text-xs font-semibold">Data Operator</p>
              <p className="text-[11px] text-[#66706A]">Platform Admin</p>
            </div>
          </div>
        )}
        {collapsed && <IconButton label="Expand navigation" onClick={() => setCollapsed(false)} className="mt-3"><ChevronLeft size={15} className="rotate-180" /></IconButton>}
      </div>
    </aside>
  );
}
