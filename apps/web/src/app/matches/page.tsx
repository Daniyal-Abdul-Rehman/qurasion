'use client';

import { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { OpportunityCard } from '../../components/molecules';
import { PrimaryButton, StatusBadge } from '../../components/atoms';
import InvestorPageShell from '../../components/organisms/InvestorPageShell';
import { investorProperties } from '../../lib/investor-data';

export default function MatchesPage() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visible = investorProperties.filter(({ address }) => !dismissed.includes(address));
  return <InvestorPageShell eyebrow="Personalized feed" title="Your matches" description="Opportunities ranked against your markets, capital range, strategy, returns, and risk preferences." action={<PrimaryButton className="w-fit px-4 py-2.5 text-sm">Edit criteria</PrimaryButton>}><div className="mb-5 flex flex-wrap gap-2"><StatusBadge tone="positive">17 new</StatusBadge><StatusBadge>94%+ match</StatusBadge><StatusBadge>Dallas + Austin</StatusBadge></div><div className="grid gap-5 xl:grid-cols-[1fr_300px]"><section className="grid gap-4 md:grid-cols-2">{visible.map((property) => <div key={property.address} className="relative"><OpportunityCard property={property} /><div className="mt-2 flex justify-end gap-3"><button type="button" onClick={() => setDismissed([...dismissed, property.address])} className="flex items-center gap-1 text-xs text-[#66706A]"><X size={13} /> Dismiss</button><button type="button" className="flex items-center gap-1 text-xs font-semibold text-[#173D2B]"><Check size={13} /> Save match</button></div></div>)}</section><aside className="h-fit rounded-lg border border-[#DDE2DD] bg-white p-5"><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Match breakdown</p><h2 className="mt-2 font-display text-2xl">What drives your score?</h2><div className="mt-5 space-y-4">{[['Geography', 'Dallas + Austin', '30%'], ['Capital range', '$200k–$500k', '25%'], ['Strategy', 'Fix & Flip', '20%'], ['Return target', '15%+ ROI', '15%'], ['Risk tolerance', 'Moderate', '10%']].map(([label, value, weight]) => <div key={label}><div className="flex justify-between text-sm"><span className="font-semibold">{label}</span><span className="text-xs text-[#66706A]">{weight}</span></div><p className="mt-1 text-xs text-[#66706A]">{value}</p><div className="mt-2 h-1 rounded-full bg-[#E8EBE8]"><div className="h-1 rounded-full bg-[#B7D83D]" style={{ width: weight }} /></div></div>)}</div><button type="button" className="mt-6 flex items-center gap-1 text-sm font-semibold text-[#173D2B]">Tune your profile <ArrowRight size={15} /></button></aside></div></InvestorPageShell>;
}
