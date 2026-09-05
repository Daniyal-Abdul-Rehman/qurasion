import Link from 'next/link';
import { ArrowRight, Plus, MapPin, DollarSign, TrendingUp, Building2, Search, Filter } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';
import { brokerInvestors } from '../../../lib/broker-data';

export default function InvestorsPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Investors"
      description="Discover and connect with investors matching your properties."
      action={
        <Link href="/broker/investors/new" className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
          <Plus size={16} /> Add Investor
        </Link>
      }
    >
      {/* Investor Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Investors</p>
          <p className="mt-2 font-display text-2xl">{brokerInvestors.length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Active Investors</p>
          <p className="mt-2 font-display text-2xl">{brokerInvestors.filter((i) => i.status === 'Active').length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Deals</p>
          <p className="mt-2 font-display text-2xl">{brokerInvestors.reduce((sum, i) => sum + i.dealsCompleted, 0)}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Avg. Target Return</p>
          <p className="mt-2 font-display text-2xl">15%+</p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search investors by name, strategy, or market..."
            className="w-full rounded-lg border border-[#DDE2DD] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#173D2B] focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm hover:border-[#173D2B]">
          <Filter size={16} />
          Filters
        </button>
      </section>

      {/* Filter Tags */}
      <section className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-full bg-[#E8F5D3] px-3 py-1.5 text-xs font-semibold text-[#31551C]">All Strategies</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Fix & Flip</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Buy & Hold</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">BRRRR</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Development</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">$500K+</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Texas</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Florida</button>
      </section>

      {/* Investors Grid */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Investor directory</p>
            <h2 className="mt-2 font-display text-2xl">All investors</h2>
          </div>
          <p className="text-sm text-[#66706A]">{brokerInvestors.length} investors</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brokerInvestors.map((investor) => (
            <Link
              key={investor.id}
              href={`/broker/investors/${investor.id}`}
              className="rounded-lg border border-[#DDE2DD] bg-white p-5 hover:border-[#173D2B] transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-[#E7F0E5] flex items-center justify-center text-xs font-semibold text-[#173D2B]">
                    {investor.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{investor.name}</p>
                    <div className="mt-1">
                      <StatusBadge tone="positive">Active</StatusBadge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign size={14} className="text-[#66706A]" />
                  <span className="font-semibold">{investor.capital}</span>
                </div>
                
                <div>
                  <p className="text-xs text-[#9AA8A0] mb-1">Strategies</p>
                  <div className="flex flex-wrap gap-1">
                    {investor.strategies.map((strategy) => (
                      <span key={strategy} className="rounded-full bg-[#F7F8F6] px-2 py-0.5 text-xs">
                        {strategy}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-[#9AA8A0] mb-1">Markets</p>
                  <div className="flex flex-wrap gap-1">
                    {investor.markets.map((market) => (
                      <span key={market} className="rounded-full bg-[#F7F8F6] px-2 py-0.5 text-xs">
                        {market}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-[#E8EBE8]">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp size={14} className="text-[#B7D83D]" />
                    <span className="font-semibold">{investor.targetReturn}</span>
                  </div>
                  <p className="text-xs text-[#66706A]">{investor.dealsCompleted} deals</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </BrokerPageShell>
  );
}