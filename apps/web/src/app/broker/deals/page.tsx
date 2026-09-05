import Link from 'next/link';
import { ArrowRight, WalletCards, Search, Filter, Calendar, AlertTriangle, CheckCircle, Clock, DollarSign, FileText, Users } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';
import { brokerDeals } from '../../../lib/broker-data';

const dealStages = [
  { name: 'Due Diligence', count: 1 },
  { name: 'Contracted', count: 1 },
  { name: 'Financing', count: 1 },
  { name: 'Closing', count: 0 },
  { name: 'Closed', count: 0 },
];

export default function DealsPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Deals"
      description="Track and manage deals from accepted offers through closing."
      action={null}
    >
      {/* Deal Pipeline Overview */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-5 lg:p-6">
        {dealStages.map((stage) => (
          <div key={stage.name} className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">{stage.name}</p>
              <p className="mt-2 font-display text-2xl">{stage.count}</p>
            </div>
            <div className={`h-2 w-2 rounded-full ${stage.name === 'Due Diligence' || stage.name === 'Contracted' ? 'bg-[#E8A838]' : stage.name === 'Closing' ? 'bg-[#B7D83D]' : 'bg-[#E8EBE8]'}`} />
          </div>
        ))}
      </section>

      {/* Search and Filters */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search deals by property or client..."
            className="w-full rounded-lg border border-[#DDE2DD] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#173D2B] focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm hover:border-[#173D2B]">
          <Filter size={16} />
          Filters
        </button>
      </section>

      {/* Kanban Pipeline */}
      <section className="mt-6 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {dealStages.map((stage) => (
            <div key={stage.name} className="w-80 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg">{stage.name}</h3>
                <span className="text-sm text-[#9AA8A0]">{stage.count}</span>
              </div>
              <div className="space-y-3">
                {brokerDeals
                  .filter((deal) => deal.status === stage.name)
                  .map((deal) => (
                    <Link
                      key={deal.id}
                      href={`/broker/deals/${deal.id}`}
                      className="block rounded-lg border border-[#DDE2DD] bg-white p-4 hover:border-[#173D2B] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{deal.property}</p>
                          <p className="text-xs text-[#66706A] mt-1">{deal.seller} → {deal.investor}</p>
                        </div>
                        <p className="font-display text-lg font-semibold">{deal.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-[#66706A] mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{deal.expectedClosing}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-[#E8EBE8]">
                        <StatusBadge 
                          tone={deal.status === 'Closing' ? 'positive' : deal.status === 'Due Diligence' ? 'warning' : 'neutral'}
                        >
                          {deal.status}
                        </StatusBadge>
                        <div className="flex items-center gap-1 text-xs text-[#66706A]">
                          <Clock size={12} />
                          <span>View details</span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deals Table */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Deal management</p>
            <h2 className="mt-2 font-display text-2xl">All deals</h2>
          </div>
          <p className="text-sm text-[#66706A]">{brokerDeals.length} active deals</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8EBE8]">
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Property</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Seller</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Investor</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Price</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Status</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Expected Closing</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brokerDeals.map((deal) => (
                <tr key={deal.id} className="border-b border-[#E8EBE8] hover:bg-[#F7F8F6]">
                  <td className="py-3 px-4">
                    <Link href={`/broker/deals/${deal.id}`} className="font-semibold text-sm">
                      {deal.property}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm">{deal.seller}</td>
                  <td className="py-3 px-4 text-sm">{deal.investor}</td>
                  <td className="py-3 px-4 font-display text-sm font-semibold">{deal.price}</td>
                  <td className="py-3 px-4">
                    <StatusBadge 
                      tone={deal.status === 'Closing' ? 'positive' : deal.status === 'Due Diligence' ? 'warning' : 'neutral'}
                    >
                      {deal.status}
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">{deal.expectedClosing}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/broker/deals/${deal.id}`} className="text-sm text-[#173D2B] hover:underline">
                        View
                      </Link>
                      <Link href={`/broker/documents?deal=${deal.id}`} className="text-sm text-[#66706A] hover:text-[#173D2B]">
                        Documents
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Deal Health Alerts */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Risk monitoring</p>
            <h2 className="mt-2 font-display text-2xl">Deal health alerts</h2>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg bg-[#FFF8E6] p-4">
            <AlertTriangle size={16} className="mt-0.5 text-[#B8860B]" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Financing delay - 1824 Oak Street</p>
              <p className="mt-1 text-xs text-[#66706A]">Investor financing has not been updated for 5 days. May impact closing timeline.</p>
              <div className="mt-2 flex items-center gap-2">
                <Link href={`/broker/deals/deal-1`} className="text-xs font-semibold text-[#173D2B] hover:underline">
                  View deal
                </Link>
                <Link href={`/broker/messages?contact=michael-roberts`} className="text-xs text-[#66706A] hover:text-[#173D2B]">
                  Contact investor
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-[#E8F5D3] p-4">
            <CheckCircle size={16} className="mt-0.5 text-[#31551C]" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Inspection completed - 741 Pine Avenue</p>
              <p className="mt-1 text-xs text-[#66706A]">All inspection items resolved. Ready to proceed to financing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deal Pipeline Metrics */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <DollarSign size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Pipeline value</p>
            <p className="font-display text-lg">$1.8M</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <Clock size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Avg. days to close</p>
            <p className="font-display text-lg">42</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <CheckCircle size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Close rate</p>
            <p className="font-display text-lg">87%</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F7F8F6]">
            <FileText size={20} className="text-[#66706A]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Docs pending</p>
            <p className="font-display text-lg">12</p>
          </div>
        </div>
      </section>
    </BrokerPageShell>
  );
}