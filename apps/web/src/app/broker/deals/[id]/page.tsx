import Link from 'next/link';
import { ArrowRight, WalletCards, FileText, Calendar, CheckCircle2, AlertTriangle, Clock, Users, MessageSquare, Building2, DollarSign, HandCoins } from 'lucide-react';
import { PrimaryButton, StatusBadge } from '../../../../components/atoms';
import BrokerPageShell from '../../../../components/organisms/BrokerPageShell';
import { brokerDeals } from '../../../../lib/broker-data';

const dealTimeline = [
  { stage: 'Offer Accepted', date: 'Sep 05, 2026', status: 'completed' },
  { stage: 'Contract Signed', date: 'Sep 08, 2026', status: 'completed' },
  { stage: 'Inspection', date: 'Sep 12, 2026', status: 'completed' },
  { stage: 'Appraisal', date: 'Sep 15, 2026', status: 'in_progress' },
  { stage: 'Title', date: 'Sep 18, 2026', status: 'pending' },
  { stage: 'Financing', date: 'Sep 22, 2026', status: 'pending' },
  { stage: 'Final Approval', date: 'Sep 28, 2026', status: 'pending' },
  { stage: 'Closing', date: 'Oct 04, 2026', status: 'pending' },
];

export default function BrokerDealDetailPage({ params }: { params: { id: string } }) {
  const deal = brokerDeals.find(d => d.id === params.id) || brokerDeals[0];

  return (
    <BrokerPageShell
      eyebrow="Deal workspace"
      title={`Deal #${deal.id.slice(-5)}`}
      description={`${deal.property} • ${deal.status}`}
      action={
        <div className="flex gap-3">
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm">
            <MessageSquare size={16} /> Message All Parties
          </PrimaryButton>
          <PrimaryButton className="w-fit px-4 py-2.5 text-sm bg-white border border-[#DDE2DD] text-[#172019]">
            <FileText size={16} /> View Documents
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_350px]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Deal Overview */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-xl">Deal Overview</h2>
              <StatusBadge tone={deal.status === 'Closed' ? 'positive' : deal.status === 'Closing' ? 'warning' : 'neutral'}>
                {deal.status}
              </StatusBadge>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Building2 size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Property</p>
                  <Link href={`/broker/properties/${deal.property}`} className="text-sm font-semibold text-[#173D2B]">
                    {deal.property}
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Purchase Price</p>
                  <p className="text-sm font-display text-lg">{deal.price}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Expected Closing</p>
                  <p className="text-sm">{deal.expectedClosing}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users size={16} className="mt-1 text-[#66706A]" />
                <div>
                  <p className="text-xs text-[#9AA8A0]">Broker</p>
                  <p className="text-sm">Daniyal Rehman</p>
                </div>
              </div>
            </div>
          </section>

          {/* Deal Timeline */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl">Deal Timeline</h2>
            <div className="mt-4 space-y-3">
              {dealTimeline.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    item.status === 'completed' ? 'bg-[#E8F5D3]' : item.status === 'in_progress' ? 'bg-[#173D2B]' : 'bg-[#E8EBE8]'
                  }`}>
                    {item.status === 'completed' ? (
                      <CheckCircle2 size={14} className="text-[#31551C]" />
                    ) : item.status === 'in_progress' ? (
                      <Clock size={14} className="text-white" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-[#9AA8A0]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-semibold ${item.status === 'in_progress' ? 'text-[#173D2B]' : ''}`}>{item.stage}</p>
                      <p className="text-xs text-[#9AA8A0]">{item.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Participants */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
            <h2 className="font-display text-xl">Deal Participants</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-md border border-[#E8EBE8] p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#173D2B] text-xs font-semibold text-white">DR</div>
                <div>
                  <p className="text-sm font-semibold">Daniyal Rehman</p>
                  <p className="text-xs text-[#66706A]">Broker</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md border border-[#E8EBE8] p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F0E5] text-xs font-semibold text-[#31551C]">JS</div>
                <div>
                  <Link href={`/broker/sellers/${deal.seller}`} className="text-sm font-semibold text-[#173D2B]">{deal.seller}</Link>
                  <p className="text-xs text-[#66706A]">Seller</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md border border-[#E8EBE8] p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F0F4] text-xs font-semibold text-[#315A6B]">MR</div>
                <div>
                  <Link href={`/broker/investors/${deal.investor}`} className="text-sm font-semibold text-[#173D2B]">{deal.investor}</Link>
                  <p className="text-xs text-[#66706A]">Investor</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-md border border-[#E8EBE8] p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EBDD] text-xs font-semibold text-[#745F35]">TC</div>
                <div>
                  <p className="text-sm font-semibold">Title Company</p>
                  <p className="text-xs text-[#66706A]">Service Provider</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Deal Health */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Deal Health</h3>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">72/100</span>
                <span className="text-xs text-[#B8860B]">Moderate Risk</span>
              </div>
              <div className="h-2 rounded-full bg-[#E8EBE8]">
                <div className="h-2 rounded-full bg-[#F3EBDD]" style={{ width: '72%' }} />
              </div>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-[#31551C]" />
                  <span>Contract signed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-[#31551C]" />
                  <span>Inspection completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={12} className="text-[#B8860B]" />
                  <span>Financing pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={12} className="text-[#B8860B]" />
                  <span>Closing deadline approaching</span>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Quick Actions</h3>
            <div className="mt-4 space-y-2">
              <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#173D2B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#122E20]">
                <MessageSquare size={14} /> Message All Parties
              </button>
              <Link href="/broker/documents" className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <FileText size={14} /> View Documents
              </Link>
              <Link href="/broker/tasks" className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <Calendar size={14} /> Schedule Closing
              </Link>
              <Link href="/broker/calendar" className="flex w-full items-center justify-center gap-2 rounded-md border border-[#DDE2DD] px-4 py-2.5 text-sm font-semibold text-[#172019] hover:bg-[#F7F8F6]">
                <HandCoins size={14} /> View Commission
              </Link>
            </div>
          </section>

          {/* Tasks */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg">Tasks</h3>
              <Link href="/broker/tasks" className="text-xs font-semibold text-[#173D2B]">
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-2 text-xs">
                <input type="checkbox" className="mt-1" />
                <span>Review appraisal report</span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <input type="checkbox" className="mt-1" />
                <span>Coordinate title search</span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <input type="checkbox" className="mt-1" />
                <span>Follow up on financing</span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <input type="checkbox" className="mt-1" checked />
                <span className="line-through text-[#9AA8A0]">Schedule inspection</span>
              </div>
            </div>
          </section>

          {/* Notes */}
          <section className="rounded-lg border border-[#DDE2DD] bg-white p-5">
            <h3 className="font-display text-lg">Notes</h3>
            <div className="mt-4">
              <textarea
                className="w-full rounded-md border border-[#DDE2DD] p-3 text-sm"
                rows={4}
                placeholder="Add notes about this deal..."
              />
              <button className="mt-2 w-full rounded-md bg-[#173D2B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#122E20]">
                Save Note
              </button>
            </div>
          </section>
        </div>
      </div>
    </BrokerPageShell>
  );
}