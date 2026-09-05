import Link from 'next/link';
import { ArrowRight, Bell, CheckCircle2, Eye, FileText, HandCoins, Plus, Users, Target, AlertTriangle } from 'lucide-react';
import { MetricCard } from '../../../components/molecules';
import { PrimaryButton, StatusBadge } from '../../../components/atoms';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';
import { brokerProperties, brokerOffers, brokerDeals, brokerLeads } from '../../../lib/broker-data';

export default function BrokerDashboardPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Good morning, Daniyal."
      description="Here's what's happening with your brokerage today."
      action={
        <div className="flex gap-3">
          <Link href="/broker/properties/new" className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <Plus size={16} /> Add Property
          </Link>
          <Link href="/broker/sellers/new" className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <Plus size={16} /> Add Seller
          </Link>
          <Link href="/broker/listings/new" className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
            <Plus size={16} /> Add Listing
          </Link>
        </div>
      }
    >
      {/* Primary KPIs */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-5 lg:p-6">
        <MetricCard label="Active Listings" value="24" detail="3 pending review" icon={FileText} />
        <MetricCard label="Active Buyers / Investors" value="187" detail="32 recently active" icon={Users} accent="sand" />
        <MetricCard label="New Leads" value="16" detail="12 high priority" icon={Target} accent="blue" />
        <MetricCard label="Pending Offers" value="7" detail="3 awaiting response" icon={HandCoins} accent="blue" />
        <MetricCard label="Active Deals" value="11" detail="4 closing this month" icon={CheckCircle2} />
      </section>

      {/* Additional Metrics */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Listing Views</p>
          <p className="mt-2 font-display text-2xl">12,842</p>
          <p className="mt-1 text-xs text-[#66706A]">+24% this week</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Investor Inquiries</p>
          <p className="mt-2 font-display text-2xl">143</p>
          <p className="mt-1 text-xs text-[#66706A]">+31% this week</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Offers Received</p>
          <p className="mt-2 font-display text-2xl">31</p>
          <p className="mt-1 text-xs text-[#66706A]">28% acceptance rate</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Pipeline Value</p>
          <p className="mt-2 font-display text-2xl">$8.4M</p>
          <p className="mt-1 text-xs text-[#66706A]">Estimated</p>
        </div>
      </section>

      <div className="mt-8 grid gap-5 xl:grid-cols-[1.25fr_1fr]">
        {/* Property Performance */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Your inventory</p>
              <h2 className="mt-2 font-display text-2xl">Property performance</h2>
            </div>
            <Link href="/broker/properties" className="text-sm font-semibold text-[#173D2B]">
              Manage all <ArrowRight className="ml-1 inline" size={15} />
            </Link>
          </div>
          <div className="mt-5 divide-y divide-[#E8EBE8]">
            {brokerProperties.slice(0, 3).map((property) => (
              <div key={property.id} className="flex items-center gap-3 py-4 first:pt-0">
                <div className="h-10 w-10 shrink-0 rounded-md bg-[#E7F0E5]" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{property.address}</p>
                  <p className="mt-1 text-xs text-[#66706A]">{property.seller}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg">{property.price}</p>
                  <StatusBadge tone={property.status === 'Active' ? 'positive' : property.status === 'Pending' ? 'warning' : 'neutral'}>
                    {property.status}
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Action Center */}
        <section className="rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Needs attention</p>
              <h2 className="mt-2 font-display text-2xl">Action center</h2>
            </div>
            <Link href="/broker/tasks" className="text-sm font-semibold text-[#173D2B]">
              View all <ArrowRight className="ml-1 inline" size={15} />
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            <div className="flex items-start gap-3 rounded-md bg-[#FFF8E6] p-3">
              <AlertTriangle size={16} className="mt-0.5 text-[#B8860B]" />
              <div className="flex-1">
                <p className="text-sm font-semibold">7 investor inquiries</p>
                <p className="mt-1 text-xs text-[#66706A]">Awaiting your response</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-md bg-[#E8F5D3] p-3">
              <HandCoins size={16} className="mt-0.5 text-[#31551C]" />
              <div className="flex-1">
                <p className="text-sm font-semibold">3 offers awaiting response</p>
                <p className="mt-1 text-xs text-[#66706A]">Seller approval required</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-md bg-[#E7F0F4] p-3">
              <Bell size={16} className="mt-0.5 text-[#315A6B]" />
              <div className="flex-1">
                <p className="text-sm font-semibold">4 document requests</p>
                <p className="mt-1 text-xs text-[#66706A]">From buyers and lenders</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-md bg-[#F3EBDD] p-3">
              <Target size={16} className="mt-0.5 text-[#745F35]" />
              <div className="flex-1">
                <p className="text-sm font-semibold">3 follow-ups due today</p>
                <p className="mt-1 text-xs text-[#66706A]">High-priority leads</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Activity Feed */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Recent activity</p>
            <h2 className="mt-2 font-display text-2xl">Activity feed</h2>
          </div>
          <Link href="/broker/notifications" className="text-sm font-semibold text-[#173D2B]">
            View all <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="mt-5 space-y-4">
          <div className="flex items-start gap-3 pb-4 border-b border-[#E8EBE8]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
              <HandCoins size={15} className="text-[#31551C]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Investor submitted offer</p>
              <p className="mt-1 text-xs text-[#66706A]">Property: 1824 Oak Street</p>
              <p className="mt-1 text-xs font-semibold text-[#173D2B]">$485,000</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">2 hours ago</p>
          </div>
          <div className="flex items-start gap-3 pb-4 border-b border-[#E8EBE8]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
              <CheckCircle2 size={15} className="text-[#315A6B]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Seller accepted counter offer</p>
              <p className="mt-1 text-xs text-[#66706A]">Property: 741 Pine Avenue</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">4 hours ago</p>
          </div>
          <div className="flex items-start gap-3 pb-4 border-b border-[#E8EBE8]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
              <Users size={15} className="text-[#745F35]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">New investor matched</p>
              <p className="mt-1 text-xs text-[#66706A]">Property: 92 Market Street</p>
              <p className="mt-1 text-xs text-[#66706A]">96% match score</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">Yesterday</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
              <FileText size={15} className="text-[#31551C]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Document uploaded</p>
              <p className="mt-1 text-xs text-[#66706A]">Property: 1824 Oak Street</p>
              <p className="mt-1 text-xs text-[#66706A]">Inspection report</p>
            </div>
            <p className="text-xs text-[#9AA8A0]">Yesterday</p>
          </div>
        </div>
      </section>
    </BrokerPageShell>
  );
}