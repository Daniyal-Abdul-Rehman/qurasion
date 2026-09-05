import Link from 'next/link';
import { ArrowRight, HandCoins, Search, Filter, DollarSign, Calendar, Clock, FileText, GitCompare, CheckCircle, XCircle } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';
import { brokerOffers } from '../../../lib/broker-data';

const offerStatuses = [
  { name: 'All', count: brokerOffers.length },
  { name: 'Pending', count: brokerOffers.filter((o) => o.status === 'Pending').length },
  { name: 'Countered', count: brokerOffers.filter((o) => o.status === 'Countered').length },
  { name: 'Accepted', count: brokerOffers.filter((o) => o.status === 'Accepted').length },
];

export default function OffersPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Offers"
      description="Manage, compare, and negotiate offers from investors."
      action={null}
    >
      {/* Offer Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        {offerStatuses.map((status) => (
          <div key={status.name} className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">{status.name}</p>
              <p className="mt-2 font-display text-2xl">{status.count}</p>
            </div>
            <div className={`h-2 w-2 rounded-full ${status.name === 'Pending' ? 'bg-[#E8A838]' : status.name === 'Accepted' ? 'bg-[#B7D83D]' : 'bg-[#E8EBE8]'}`} />
          </div>
        ))}
      </section>

      {/* Search and Filters */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search offers by property or investor..."
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
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Pending</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Countered</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Accepted</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Cash Offers</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Above Asking</button>
      </section>

      {/* Offers Table */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Offer management</p>
            <h2 className="mt-2 font-display text-2xl">All offers</h2>
          </div>
          <p className="text-sm text-[#66706A]">{brokerOffers.length} offers</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8EBE8]">
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Property</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Investor</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Offer Price</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Financing</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Terms</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Status</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Submitted</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brokerOffers.map((offer) => (
                <tr key={offer.id} className="border-b border-[#E8EBE8] hover:bg-[#F7F8F6]">
                  <td className="py-3 px-4">
                    <Link href={`/broker/properties/${offer.property.replace(/\s+/g, '-').toLowerCase()}`} className="font-semibold text-sm">
                      {offer.property}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm">{offer.investor}</td>
                  <td className="py-3 px-4 font-display text-sm font-semibold">{offer.price}</td>
                  <td className="py-3 px-4 text-sm">{offer.financing}</td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{offer.inspection}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{offer.closing}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge 
                      tone={offer.status === 'Accepted' ? 'positive' : offer.status === 'Pending' ? 'warning' : 'neutral'}
                    >
                      {offer.status}
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">{offer.submitted}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/broker/offers/${offer.id}`} className="text-sm text-[#173D2B] hover:underline">
                        View
                      </Link>
                      {offer.status === 'Pending' && (
                        <>
                          <button className="text-sm text-[#66706A] hover:text-[#B7D83D]">
                            Counter
                          </button>
                          <button className="text-sm text-[#66706A] hover:text-[#B7D83D]">
                            Accept
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Offer Comparison Tool */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Analysis tools</p>
            <h2 className="mt-2 font-display text-2xl">Compare offers</h2>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm hover:border-[#173D2B]">
            <GitCompare size={16} />
            Select offers to compare
          </button>
        </div>
        <div className="text-center py-8 border-2 border-dashed border-[#DDE2DD] rounded-lg">
          <GitCompare size={32} className="mx-auto text-[#9AA8A0] mb-3" />
          <p className="text-sm text-[#66706A]">Select 2 or more offers to compare terms side by side</p>
        </div>
      </section>

      {/* Offer Insights */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <DollarSign size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Avg. offer price</p>
            <p className="font-display text-lg">$530K</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <CheckCircle size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Acceptance rate</p>
            <p className="font-display text-lg">33%</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <Clock size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Avg. response time</p>
            <p className="font-display text-lg">2.3 days</p>
          </div>
        </div>
      </section>
    </BrokerPageShell>
  );
}