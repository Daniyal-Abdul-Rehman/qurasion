import Link from 'next/link';
import { ArrowRight, PieChart, TrendingUp, DollarSign, Users, Target, HandCoins, Calendar, FileText, Activity } from 'lucide-react';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';

export default function AnalyticsPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Analytics"
      description="Track your brokerage performance, metrics, and business insights."
      action={null}
    >
      {/* Period Selector */}
      <section className="flex items-center gap-2">
        <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">7 Days</button>
        <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">30 Days</button>
        <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">90 Days</button>
        <button className="rounded-lg bg-[#E8F5D3] px-4 py-2 text-sm font-semibold text-[#31551C]">This Year</button>
        <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">All Time</button>
      </section>

      {/* Sales Overview */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Sales performance</p>
            <h2 className="mt-2 font-display text-2xl">Sales overview</h2>
          </div>
          <Link href="/broker/transactions" className="text-sm font-semibold text-[#173D2B]">
            View transactions <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-[#E8F5D3] p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={16} className="text-[#31551C]" />
              <p className="text-xs text-[#9AA8A0]">Total Volume</p>
            </div>
            <p className="font-display text-2xl text-[#31551C]">$12.8M</p>
            <p className="mt-1 text-xs text-[#31551C]">+18% vs last year</p>
          </div>
          <div className="rounded-lg bg-[#E7F0F4] p-4">
            <div className="flex items-center gap-2 mb-2">
              <HandCoins size={16} className="text-[#315A6B]" />
              <p className="text-xs text-[#9AA8A0]">Closed Deals</p>
            </div>
            <p className="font-display text-2xl text-[#315A6B]">24</p>
            <p className="mt-1 text-xs text-[#315A6B]">+12% vs last year</p>
          </div>
          <div className="rounded-lg bg-[#F3EBDD] p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-[#745F35]" />
              <p className="text-xs text-[#9AA8A0]">Average Deal</p>
            </div>
            <p className="font-display text-2xl text-[#745F35]">$533K</p>
            <p className="mt-1 text-xs text-[#745F35]">+5% vs last year</p>
          </div>
          <div className="rounded-lg bg-[#F7F8F6] p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-[#66706A]" />
              <p className="text-xs text-[#9AA8A0]">Days to Close</p>
            </div>
            <p className="font-display text-2xl text-[#66706A]">42</p>
            <p className="mt-1 text-xs text-[#66706A]">-3 days vs last year</p>
          </div>
        </div>
      </section>

      {/* Listings Performance */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Listing metrics</p>
            <h2 className="mt-2 font-display text-2xl">Listings performance</h2>
          </div>
          <Link href="/broker/listings" className="text-sm font-semibold text-[#173D2B]">
            View listings <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Active Listings</p>
            <p className="font-display text-2xl">32</p>
            <p className="mt-1 text-xs text-[#B7D83D]">+8% this month</p>
          </div>
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Avg. Days Listed</p>
            <p className="font-display text-2xl">21</p>
            <p className="mt-1 text-xs text-[#B7D83D]">-5 days vs avg</p>
          </div>
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Listing Conversion</p>
            <p className="font-display text-2xl">18%</p>
            <p className="mt-1 text-xs text-[#B7D83D]">+3% vs market</p>
          </div>
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Total Views</p>
            <p className="font-display text-2xl">125K</p>
            <p className="mt-1 text-xs text-[#B7D83D]">+24% this quarter</p>
          </div>
        </div>
      </section>

      {/* Lead Analytics */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Lead metrics</p>
            <h2 className="mt-2 font-display text-2xl">Lead performance</h2>
          </div>
          <Link href="/broker/leads" className="text-sm font-semibold text-[#173D2B]">
            View leads <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">New Leads</p>
            <p className="font-display text-2xl">184</p>
            <p className="mt-1 text-xs text-[#B7D83D]">+22% this quarter</p>
          </div>
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Qualified</p>
            <p className="font-display text-2xl">92</p>
            <p className="mt-1 text-xs text-[#66706A]">50% qualification rate</p>
          </div>
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Converted</p>
            <p className="font-display text-2xl">31</p>
            <p className="mt-1 text-xs text-[#B7D83D]">34% conversion rate</p>
          </div>
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Avg. Lead Score</p>
            <p className="font-display text-2xl">87</p>
            <p className="mt-1 text-xs text-[#B7D83D]">+5 points vs avg</p>
          </div>
        </div>
      </section>

      {/* Offer Analytics */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Offer metrics</p>
            <h2 className="mt-2 font-display text-2xl">Offer performance</h2>
          </div>
          <Link href="/broker/offers" className="text-sm font-semibold text-[#173D2B]">
            View offers <ArrowRight className="ml-1 inline" size={15} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Offers Received</p>
            <p className="font-display text-2xl">67</p>
            <p className="mt-1 text-xs text-[#B7D83D]">+18% this quarter</p>
          </div>
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Accepted</p>
            <p className="font-display text-2xl">24</p>
            <p className="mt-1 text-xs text-[#66706A]">36% acceptance rate</p>
          </div>
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Avg. Offer Price</p>
            <p className="font-display text-2xl">$518K</p>
            <p className="mt-1 text-xs text-[#B7D83D]">98% of asking</p>
          </div>
          <div>
            <p className="text-xs text-[#9AA8A0] mb-1">Avg. Response Time</p>
            <p className="font-display text-2xl">2.3 days</p>
            <p className="mt-1 text-xs text-[#B7D83D]">-0.5 days vs avg</p>
          </div>
        </div>
      </section>

      {/* Revenue / Commission */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Revenue</p>
            <h2 className="mt-2 font-display text-2xl">Commission overview</h2>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-[#E8F5D3] p-4">
            <p className="text-xs text-[#9AA8A0] mb-1">Pending Commission</p>
            <p className="font-display text-2xl text-[#31551C]">$84,000</p>
            <p className="mt-1 text-xs text-[#31551C]">4 deals pending</p>
          </div>
          <div className="rounded-lg bg-[#E7F0F4] p-4">
            <p className="text-xs text-[#9AA8A0] mb-1">Closed Commission</p>
            <p className="font-display text-2xl text-[#315A6B]">$312,000</p>
            <p className="mt-1 text-xs text-[#315A6B]">24 deals closed</p>
          </div>
          <div className="rounded-lg bg-[#F3EBDD] p-4">
            <p className="text-xs text-[#9AA8A0] mb-1">Expected Commission</p>
            <p className="font-display text-2xl text-[#745F35]">$126,000</p>
            <p className="mt-1 text-xs text-[#745F35]">6 in pipeline</p>
          </div>
        </div>
      </section>

      {/* Performance Trends */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Trends</p>
            <h2 className="mt-2 font-display text-2xl">Performance trends</h2>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-lg border border-[#DDE2DD] bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">Monthly Volume</p>
              <div className="flex items-center gap-1 text-xs text-[#B7D83D]">
                <TrendingUp size={12} />
                <span>+12%</span>
              </div>
            </div>
            <div className="flex items-end gap-1 h-24">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#E8F5D3] rounded-t"
                  style={{ height: `${30 + Math.random() * 70}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-[#9AA8A0]">
              <span>Jan</span>
              <span>Dec</span>
            </div>
          </div>
          <div className="rounded-lg border border-[#DDE2DD] bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">Lead Conversion</p>
              <div className="flex items-center gap-1 text-xs text-[#B7D83D]">
                <TrendingUp size={12} />
                <span>+8%</span>
              </div>
            </div>
            <div className="flex items-end gap-1 h-24">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#E7F0F4] rounded-t"
                  style={{ height: `${20 + Math.random() * 60}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-[#9AA8A0]">
              <span>Jan</span>
              <span>Dec</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Insights</p>
            <h2 className="mt-2 font-display text-2xl">Key insights</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start gap-3 rounded-lg bg-[#E8F5D3] p-4">
            <Activity size={20} className="text-[#31551C] shrink-0" />
            <div>
              <p className="font-semibold text-sm">Strong listing performance</p>
              <p className="mt-1 text-xs text-[#66706A]">Your listings are converting 18% faster than market average.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-[#E7F0F4] p-4">
            <Target size={20} className="text-[#315A6B] shrink-0" />
            <div>
              <p className="font-semibold text-sm">Lead quality improving</p>
              <p className="mt-1 text-xs text-[#66706A]">Average lead score increased 5 points this quarter.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-[#F3EBDD] p-4">
            <DollarSign size={20} className="text-[#745F35] shrink-0" />
            <div>
              <p className="font-semibold text-sm">Commission growth</p>
              <p className="mt-1 text-xs text-[#66706A]">On track for 15% commission growth vs last year.</p>
            </div>
          </div>
        </div>
      </section>
    </BrokerPageShell>
  );
}