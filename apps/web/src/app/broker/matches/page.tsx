import Link from 'next/link';
import { ArrowRight, Target, Search, Filter, MapPin, DollarSign, CheckCircle, MessageSquare, Calendar, TrendingUp } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';
import { brokerMatches } from '../../../lib/broker-data';

export default function MatchesPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Matches"
      description="View and manage investor-property matches based on compatibility."
      action={null}
    >
      {/* Match Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Matches</p>
          <p className="mt-2 font-display text-2xl">{brokerMatches.length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Highly Matched</p>
          <p className="mt-2 font-display text-2xl">{brokerMatches.filter((m) => m.matchScore >= 90).length}</p>
          <p className="mt-1 text-xs text-[#B7D83D]">90%+ score</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Contacted</p>
          <p className="mt-2 font-display text-2xl">{brokerMatches.filter((m) => m.status === 'Contacted').length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">New Matches</p>
          <p className="mt-2 font-display text-2xl">{brokerMatches.filter((m) => m.status === 'New').length}</p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search matches by property or investor..."
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
        <button className="rounded-full bg-[#E8F5D3] px-3 py-1.5 text-xs font-semibold text-[#31551C]">All Status</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">New</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Contacted</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Viewing Scheduled</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">90%+ Match</button>
      </section>

      {/* Matches List */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Investor matching</p>
            <h2 className="mt-2 font-display text-2xl">Property-investor matches</h2>
          </div>
          <p className="text-sm text-[#66706A]">{brokerMatches.length} matches</p>
        </div>
        <div className="space-y-4">
          {brokerMatches.map((match) => (
            <div key={match.id} className="rounded-lg border border-[#DDE2DD] bg-white p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Link href={`/broker/properties/${match.property.replace(/\s+/g, '-').toLowerCase()}`} className="font-semibold text-lg hover:text-[#173D2B]">
                      {match.property}
                    </Link>
                    <span className="text-[#9AA8A0]">→</span>
                    <Link href={`/broker/investors/${match.investor.replace(/\s+/g, '-').toLowerCase()}`} className="font-semibold text-lg hover:text-[#173D2B]">
                      {match.investor}
                    </Link>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#66706A]">
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} />
                      <span>{match.capital}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target size={14} />
                      <span>{match.strategy}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <TrendingUp size={16} className="text-[#B7D83D]" />
                    <span className="font-display text-2xl font-semibold text-[#B7D83D]">{match.matchScore}%</span>
                  </div>
                  <p className="text-xs text-[#66706A]">Match score</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-[#E8EBE8]">
                <StatusBadge 
                  tone={match.status === 'Contacted' ? 'positive' : match.status === 'New' ? 'neutral' : 'warning'}
                >
                  {match.status}
                </StatusBadge>
                <div className="flex items-center gap-2">
                  <Link href={`/broker/investors/${match.investor.replace(/\s+/g, '-').toLowerCase()}`} className="flex items-center gap-1 text-sm text-[#173D2B] hover:underline">
                    <Target size={14} />
                    View Profile
                  </Link>
                  <Link href={`/broker/messages?contact=${match.investor.replace(/\s+/g, '-').toLowerCase()}`} className="flex items-center gap-1 text-sm text-[#66706A] hover:text-[#173D2B]">
                    <MessageSquare size={14} />
                    Contact
                  </Link>
                  <button className="flex items-center gap-1 text-sm text-[#66706A] hover:text-[#173D2B]">
                    <Calendar size={14} />
                    Schedule Viewing
                  </button>
                </div>
              </div>
              
              {/* Match Breakdown */}
              <div className="mt-4 pt-4 border-t border-[#E8EBE8]">
                <p className="text-xs text-[#9AA8A0] mb-2">Why this is a strong match</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    '✓ Target market fit',
                    '✓ Investment strategy match',
                    '✓ Capital range alignment',
                    '✓ Property type preference',
                    '✓ Expected return compatibility',
                    '✓ Renovation appetite match',
                    '✓ Financing criteria met',
                    '✓ Risk profile alignment',
                  ].slice(0, 4).map((reason) => (
                    <div key={reason} className="flex items-center gap-2 text-xs text-[#66706A]">
                      <CheckCircle size={12} className="text-[#B7D83D]" />
                      <span>{reason.replace('✓ ', '')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Match Insights */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <TrendingUp size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Avg. match score</p>
            <p className="font-display text-lg">93%</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <Target size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Response rate</p>
            <p className="font-display text-lg">67%</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <CheckCircle size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Conversion to viewing</p>
            <p className="font-display text-lg">34%</p>
          </div>
        </div>
      </section>
    </BrokerPageShell>
  );
}