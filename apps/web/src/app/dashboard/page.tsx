'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Bell, CheckCircle2, ChevronDown, CircleDollarSign, Clock3, FileCheck2, Menu, Plus, Search, Sparkles, TrendingUp } from 'lucide-react';
import { IconButton, PrimaryButton, StatusBadge } from '../../components/atoms';
import { MetricCard, OpportunityCard, type Opportunity } from '../../components/molecules';
import InvestorSidebar from '../../components/organisms/InvestorSidebar';

const opportunities: Opportunity[] = [
  { address: '4812 Elm Street', location: 'Oak Lawn, Dallas TX', price: '$328,000', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80', score: 91, match: 96, profit: '$56,400', roi: '18.2%', beds: 3, baths: 2, sqft: '1,840 sf', tag: 'High fit' },
  { address: '2709 Maple Avenue', location: 'Eastwood, Houston TX', price: '$294,500', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80', score: 86, match: 89, profit: '$44,800', roi: '15.7%', beds: 4, baths: 2, sqft: '2,110 sf', tag: 'New today' },
  { address: '1630 W 6th Street', location: 'Zilker, Austin TX', price: '$412,000', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80', score: 84, match: 87, profit: '$62,100', roi: '14.9%', beds: 3, baths: 2, sqft: '1,970 sf', tag: 'High fit' },
];

const actions = [
  { label: 'Review counter offer', detail: '4812 Elm Street', time: 'Due today', icon: CircleDollarSign, tone: 'warning' as const },
  { label: 'Upload inspection report', detail: 'Cedar Ridge Duplex', time: 'Due Sep 05', icon: FileCheck2, tone: 'neutral' as const },
  { label: 'Complete due diligence', detail: '901 South Lamar', time: 'Due Sep 08', icon: Clock3, tone: 'neutral' as const },
];

export default function InvestorDashboard() {
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const [showAllActions, setShowAllActions] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F7F8F6] text-[#172019]">
      <InvestorSidebar />
      <main className="min-w-0 flex-1">
        <header className="flex h-[76px] items-center justify-between border-b border-[#DDE2DD] bg-[#FBFCFA] px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3"><button type="button" aria-label="Open navigation" className="rounded-md p-2 text-[#66706A] lg:hidden"><Menu size={20} /></button><div className="hidden items-center gap-2 text-xs text-[#9AA8A0] sm:flex"><span>Workspace</span><span>/</span><span className="text-[#172019]">Dashboard</span></div></div>
          <div className="flex items-center gap-3"><Link href="/properties" className="hidden items-center gap-2 text-sm font-semibold text-[#173D2B] sm:flex"><Search size={16} /> Discover properties</Link><IconButton label="Notifications" className="relative"><Bell size={17} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#B7D83D]" /></IconButton><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#173D2B] text-xs font-semibold text-white">KM</div></div>
        </header>
        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10">
          <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9AA8A0]">Tuesday, September 3, 2026</p><h1 className="mt-2 font-display text-4xl text-[#172019] sm:text-5xl">Good morning, Kara.</h1><p className="mt-2 text-sm text-[#66706A]">Here is what is moving across your investment pipeline.</p></div><Link href="/investor/analyses/new" className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm"><Plus size={16} /> New analysis</Link></section>
          <section className="mt-8 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-5 lg:p-6"><MetricCard label="New matches" value="17" detail="+4 since yesterday" icon={Sparkles} /><MetricCard label="Saved properties" value="42" detail="6 added this week" icon={TrendingUp} accent="blue" /><MetricCard label="Active analyses" value="8" detail="3 need your review" icon={FileCheck2} accent="sand" /><MetricCard label="Open offers" value="4" detail="1 counter offer" icon={CircleDollarSign} accent="blue" /><MetricCard label="Active deals" value="3" detail="$1.2M invested" icon={CheckCircle2} /></section>
          <section className="mt-10"><div className="flex items-end justify-between"><div><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9AA8A0]">Personalized for you</p><h2 className="mt-2 font-display text-3xl text-[#172019]">Recommended opportunities</h2></div><Link href="/properties" className="hidden items-center gap-1 text-sm font-semibold text-[#173D2B] sm:flex">View all <ArrowRight size={15} /></Link></div><div className="mt-5 grid gap-4 overflow-x-auto pb-2 md:grid-cols-2 xl:grid-cols-3">{opportunities.map((property) => <OpportunityCard key={property.address} property={property} saved={savedProperties.includes(property.address)} onSave={() => setSavedProperties((current) => current.includes(property.address) ? current.filter((address) => address !== property.address) : [...current, property.address])} />)}</div></section>
          <section className="mt-10 grid gap-5 xl:grid-cols-[1.35fr_1fr]">
            <div className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6"><div className="flex items-start justify-between"><div><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9AA8A0]">Pipeline</p><h2 className="mt-2 font-display text-2xl text-[#172019]">Active deals</h2></div><Link href="/deals" className="text-sm font-semibold text-[#173D2B]">Manage <ArrowRight className="ml-1 inline" size={15} /></Link></div><div className="mt-5 divide-y divide-[#E8EBE8]">{[['Cedar Ridge Duplex', 'Austin, TX', '$485,000', 'Due diligence'], ['901 South Lamar', 'Austin, TX', '$390,000', 'Offer accepted'], ['1178 Briarwood Lane', 'Dallas, TX', '$362,500', 'Closing soon']].map(([name, location, price, status], index) => <div key={name} className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${index === 0 ? 'bg-[#E8F5D3] text-[#31551C]' : 'bg-[#E7F0F4] text-[#315A6B]'}`}><BuildingIcon /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{name}</p><p className="mt-1 text-xs text-[#66706A]">{location} <span className="mx-1 text-[#DDE2DD]">|</span> {status}</p></div><p className="font-display text-lg">{price}</p></div>)}</div></div>
            <div className="rounded-lg border border-[#DDE2DD] bg-[#173D2B] p-5 text-white sm:p-6"><div className="flex items-start justify-between"><div><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B7D83D]">Needs attention</p><h2 className="mt-2 font-display text-2xl">Pending actions</h2></div><span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[10px]">{actions.length} OPEN</span></div><div className="mt-5 divide-y divide-white/15">{actions.slice(0, showAllActions ? actions.length : 2).map(({ label, detail, time, icon: Icon, tone }) => <button type="button" key={label} className="flex w-full items-center gap-3 py-4 text-left first:pt-0"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10"><Icon size={16} /></span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{label}</span><span className="mt-1 block text-xs text-white/60">{detail}</span></span><StatusBadge tone={tone}>{time}</StatusBadge></button>)}</div><button type="button" onClick={() => setShowAllActions(!showAllActions)} className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#B7D83D]">{showAllActions ? 'Show less' : 'View all actions'} <ChevronDown size={14} className={showAllActions ? 'rotate-180' : ''} /></button></div>
          </section>
        </div>
      </main>
    </div>
  );
}

function BuildingIcon() {
  return <span className="text-sm font-semibold">01</span>;
}
