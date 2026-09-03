'use client';

import { useState } from 'react';
import { Bookmark, FolderPlus, Grid2X2, List } from 'lucide-react';
import { OpportunityCard } from '../../components/molecules';
import { PrimaryButton, StatusBadge } from '../../components/atoms';
import InvestorPageShell from '../../components/organisms/InvestorPageShell';
import { investorProperties } from '../../lib/investor-data';

export default function SavedPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  return <InvestorPageShell eyebrow="Your opportunity library" title="Saved properties" description="Keep your shortlist organized with private notes, tags, and collections." action={<PrimaryButton className="w-fit px-4 py-2.5 text-sm"><FolderPlus size={16} /> New collection</PrimaryButton>}><div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DDE2DD] pb-4"><div className="flex gap-2"><button type="button" className="rounded-full bg-[#173D2B] px-4 py-2 text-sm text-white">All 42</button><button type="button" className="rounded-full border border-[#DDE2DD] px-4 py-2 text-sm text-[#66706A]">Potential deals 12</button><button type="button" className="rounded-full border border-[#DDE2DD] px-4 py-2 text-sm text-[#66706A]">Needs review 5</button></div><div className="flex gap-1"><button type="button" aria-label="Grid view" onClick={() => setView('grid')} className={`rounded-md p-2 ${view === 'grid' ? 'bg-[#E8F5D3]' : ''}`}><Grid2X2 size={16} /></button><button type="button" aria-label="List view" onClick={() => setView('list')} className={`rounded-md p-2 ${view === 'list' ? 'bg-[#E8F5D3]' : ''}`}><List size={16} /></button></div></div>{view === 'grid' ? <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{investorProperties.map((property) => <OpportunityCard key={property.address} property={property} saved />)}</div> : <div className="mt-5 divide-y divide-[#E8EBE8] rounded-lg border border-[#DDE2DD] bg-white">{investorProperties.map((property) => <div key={property.address} className="flex items-center gap-4 p-4"><Bookmark className="text-[#173D2B]" size={17} fill="currentColor" /><div className="flex-1"><p className="font-semibold">{property.address}</p><p className="text-xs text-[#66706A]">{property.location}</p></div><StatusBadge tone="positive">{property.match}% match</StatusBadge><p className="font-display text-xl">{property.price}</p></div>)}</div>}</InvestorPageShell>;
}
