import Link from 'next/link';
import { ArrowRight, HandCoins, Search, Filter, MessageSquare, Clock, CheckCircle, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';
import { brokerOffers } from '../../../lib/broker-data';

const negotiations = [
  {
    id: 'neg-1',
    property: '1824 Oak Street',
    investor: 'Michael Roberts',
    sellerPosition: '$510K',
    currentOffer: '$485K',
    brokerRecommendation: '$500K',
    lastCounter: '$500K',
    status: 'Active',
    lastUpdate: '2 hours ago',
    rounds: 3,
  },
  {
    id: 'neg-2',
    property: '741 Pine Avenue',
    investor: 'Sarah Kim',
    sellerPosition: '$490K',
    currentOffer: '$495K',
    brokerRecommendation: '$492K',
    lastCounter: '$492K',
    status: 'Awaiting Seller',
    lastUpdate: '4 hours ago',
    rounds: 2,
  },
];

export default function NegotiationsPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Negotiations"
      description="Track and manage ongoing negotiations with investors and sellers."
      action={null}
    >
      {/* Negotiation Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Active Negotiations</p>
          <p className="mt-2 font-display text-2xl">{negotiations.length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Awaiting Seller</p>
          <p className="mt-2 font-display text-2xl">{negotiations.filter((n) => n.status === 'Awaiting Seller').length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Avg. Rounds</p>
          <p className="mt-2 font-display text-2xl">2.5</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Success Rate</p>
          <p className="mt-2 font-display text-2xl">78%</p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search negotiations by property or investor..."
            className="w-full rounded-lg border border-[#DDE2DD] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#173D2B] focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm hover:border-[#173D2B]">
          <Filter size={16} />
          Filters
        </button>
      </section>

      {/* Negotiations List */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Negotiation tracking</p>
            <h2 className="mt-2 font-display text-2xl">Active negotiations</h2>
          </div>
          <p className="text-sm text-[#66706A]">{negotiations.length} negotiations</p>
        </div>
        <div className="space-y-4">
          {negotiations.map((negotiation) => (
            <Link
              key={negotiation.id}
              href={`/broker/negotiations/${negotiation.id}`}
              className="block rounded-lg border border-[#DDE2DD] bg-white p-5 hover:border-[#173D2B] transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Link href={`/broker/properties/${negotiation.property.replace(/\s+/g, '-').toLowerCase()}`} className="font-semibold text-lg hover:text-[#173D2B]">
                      {negotiation.property}
                    </Link>
                    <StatusBadge 
                      tone={negotiation.status === 'Active' ? 'positive' : 'warning'}
                    >
                      {negotiation.status}
                    </StatusBadge>
                  </div>
                  <p className="text-sm text-[#66706A]">{negotiation.investor}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#9AA8A0]">Last update</p>
                  <p className="text-sm text-[#66706A]">{negotiation.lastUpdate}</p>
                </div>
              </div>
              
              {/* Price Position */}
              <div className="grid gap-4 sm:grid-cols-4 mb-4">
                <div className="rounded-lg bg-[#F7F8F6] p-3">
                  <p className="text-xs text-[#9AA8A0] mb-1">Seller Position</p>
                  <p className="font-display text-lg">{negotiation.sellerPosition}</p>
                </div>
                <div className="rounded-lg bg-[#E8F5D3] p-3">
                  <p className="text-xs text-[#9AA8A0] mb-1">Current Offer</p>
                  <p className="font-display text-lg text-[#31551C]">{negotiation.currentOffer}</p>
                </div>
                <div className="rounded-lg bg-[#E7F0F4] p-3">
                  <p className="text-xs text-[#9AA8A0] mb-1">Broker Rec.</p>
                  <p className="font-display text-lg text-[#315A6B]">{negotiation.brokerRecommendation}</p>
                </div>
                <div className="rounded-lg bg-[#F3EBDD] p-3">
                  <p className="text-xs text-[#9AA8A0] mb-1">Last Counter</p>
                  <p className="font-display text-lg text-[#745F35]">{negotiation.lastCounter}</p>
                </div>
              </div>
              
              {/* Negotiation History */}
              <div className="pt-4 border-t border-[#E8EBE8]">
                <p className="text-xs text-[#9AA8A0] mb-2">Negotiation history</p>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <TrendingUp size={14} className="text-[#66706A]" />
                    <span className="text-[#66706A]">{negotiation.rounds} rounds</span>
                  </div>
                  <div className="h-1 w-1 rounded-full bg-[#DDE2DD]" />
                  <div className="flex items-center gap-1 text-[#66706A]">
                    <Clock size={14} />
                    <span>Started 3 days ago</span>
                  </div>
                </div>
              </div>
              
              {/* Action Required */}
              {negotiation.status === 'Awaiting Seller' && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#FFF8E6] p-3">
                  <AlertTriangle size={16} className="text-[#B8860B]" />
                  <p className="text-sm text-[#745F35]">Seller approval required for counter offer</p>
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Negotiation Workflow */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Workflow</p>
            <h2 className="mt-2 font-display text-2xl">Negotiation stages</h2>
          </div>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            'Initial Offer',
            'Broker Review',
            'Seller Consultation',
            'Counter Offer',
            'Investor Response',
            'Final Terms',
            'Acceptance',
          ].map((stage, index) => (
            <div key={stage} className="flex items-center shrink-0">
              <div className={`rounded-full px-4 py-2 text-xs font-semibold ${index === 2 ? 'bg-[#E8F5D3] text-[#31551C]' : index < 2 ? 'bg-[#E7F0E5] text-[#173D2B]' : 'bg-[#F7F8F6] text-[#66706A]'}`}>
                {stage}
              </div>
              {index < 6 && <div className="w-8 h-0.5 bg-[#DDE2DD] mx-2" />}
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <Link href="/broker/offers" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <HandCoins size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="font-semibold">View offers</p>
            <p className="text-sm text-[#66706A]">Manage incoming offers</p>
          </div>
        </Link>
        <Link href="/broker/messages" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <MessageSquare size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="font-semibold">Send message</p>
            <p className="text-sm text-[#66706A]">Contact parties</p>
          </div>
        </Link>
        <Link href="/broker/deals" className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <CheckCircle size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="font-semibold">Create deal</p>
            <p className="text-sm text-[#66706A]">Move to transaction</p>
          </div>
        </Link>
      </section>
    </BrokerPageShell>
  );
}