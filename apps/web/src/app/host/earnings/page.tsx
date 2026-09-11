import Link from 'next/link';
import { ArrowRight, DollarSign, TrendingUp, Calendar, Download, CreditCard, Wallet, CheckCircle, AlertTriangle, Filter, Search } from 'lucide-react';
import HostPageShell from '../../../components/organisms/HostPageShell';
import { hostTransactions, hostAnalytics } from '../../../lib/host-data';

const payouts = [
  { id: 'payout-1', amount: '$3,850', date: 'Sep 01, 2026', status: 'Paid', property: 'Downtown Loft' },
  { id: 'payout-2', amount: '$2,700', date: 'Aug 15, 2026', status: 'Paid', property: 'Luxury Villa' },
  { id: 'payout-3', amount: '$1,150', date: 'Aug 01, 2026', status: 'Paid', property: 'Beach Condo' },
];

export default function HostEarningsPage() {
  const totalEarnings = hostTransactions.reduce((sum, t) => sum + parseInt(t.amount.replace(/[$,]/g, '')), 0);

  return (
    <HostPageShell
      eyebrow="Host workspace"
      title="Earnings"
      description="Track your revenue, payouts, and financial performance."
      action={
        <button className="btn-primary flex w-fit items-center gap-2 px-4 py-2.5 text-sm">
          <Download size={16} /> Export
        </button>
      }
    >
      {/* Earnings Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Earnings</p>
          <p className="mt-2 font-display text-2xl">{hostAnalytics.overview.totalRevenue}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Pending Payout</p>
          <p className="mt-2 font-display text-2xl">$2,250</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Avg. Nightly Rate</p>
          <p className="mt-2 font-display text-2xl">{hostAnalytics.overview.avgNightlyRate}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Occupancy Rate</p>
          <p className="mt-2 font-display text-2xl">{hostAnalytics.overview.occupancyRate}</p>
        </div>
      </section>

      {/* Period Selector */}
      <section className="mt-6 flex items-center gap-2">
        <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">This Month</button>
        <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">Last Month</button>
        <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">This Quarter</button>
        <button className="rounded-lg bg-[#E8F5D3] px-4 py-2 text-sm font-semibold text-[#31551C]">This Year</button>
        <button className="rounded-lg border border-[#DDE2DD] bg-white px-4 py-2 text-sm hover:border-[#173D2B]">All Time</button>
      </section>

      {/* Revenue Breakdown */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Revenue</p>
            <h2 className="mt-2 font-display text-2xl">Revenue breakdown</h2>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-[#E8F5D3] p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={16} className="text-[#31551C]" />
              <p className="text-xs text-[#9AA8A0]">Total Revenue</p>
            </div>
            <p className="font-display text-2xl text-[#31551C]">{hostAnalytics.overview.totalRevenue}</p>
            <p className="mt-1 text-xs text-[#31551C]">+15% vs last year</p>
          </div>
          <div className="rounded-lg bg-[#E7F0F4] p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wallet size={16} className="text-[#315A6B]" />
              <p className="text-xs text-[#9AA8A0]">Platform Fee</p>
            </div>
            <p className="font-display text-2xl text-[#315A6B]">$1,245</p>
            <p className="mt-1 text-xs text-[#315A6B]">10% of revenue</p>
          </div>
          <div className="rounded-lg bg-[#F3EBDD] p-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard size={16} className="text-[#745F35]" />
              <p className="text-xs text-[#9AA8A0]">Net Earnings</p>
            </div>
            <p className="font-display text-2xl text-[#745F35]">$11,205</p>
            <p className="mt-1 text-xs text-[#745F35]">After fees</p>
          </div>
          <div className="rounded-lg bg-[#F7F8F6] p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-[#66706A]" />
              <p className="text-xs text-[#9AA8A0]">Growth</p>
            </div>
            <p className="font-display text-2xl text-[#66706A]">+22%</p>
            <p className="mt-1 text-xs text-[#66706A]">YoY increase</p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full rounded-lg border border-[#DDE2DD] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[#173D2B] focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-[#DDE2DD] bg-white px-4 py-2.5 text-sm hover:border-[#173D2B]">
          <Filter size={16} />
          Filters
        </button>
      </section>

      {/* Payouts Table */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Payouts</p>
            <h2 className="mt-2 font-display text-2xl">Recent payouts</h2>
          </div>
          <p className="text-sm text-[#66706A]">{payouts.length} payouts</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8EBE8]">
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Amount</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Property</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Date</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Status</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout) => (
                <tr key={payout.id} className="border-b border-[#E8EBE8] hover:bg-[#F7F8F6]">
                  <td className="py-3 px-4 font-display text-sm font-semibold text-[#173D2B]">{payout.amount}</td>
                  <td className="py-3 px-4 text-sm">{payout.property}</td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">{payout.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <CheckCircle size={14} className="text-[#B7D83D]" />
                      <span className="text-sm font-semibold text-[#31551C]">{payout.status}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-sm text-[#173D2B] hover:underline">
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Transaction History */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Transactions</p>
            <h2 className="mt-2 font-display text-2xl">Transaction history</h2>
          </div>
        </div>
        <div className="space-y-3">
          {hostTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
                <DollarSign size={20} className="text-[#31551C]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{transaction.property}</p>
                <p className="text-sm text-[#66706A]">{transaction.guest} • {transaction.checkIn} - {transaction.checkOut}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-lg font-semibold text-[#173D2B]">{transaction.amount}</p>
                <div className="mt-1">
                  <div className="flex items-center gap-1">
                    <CheckCircle size={14} className="text-[#B7D83D]" />
                    <span className="text-xs font-semibold text-[#31551C]">{transaction.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Settings */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <CreditCard size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Payment method</p>
            <p className="font-display text-lg">Bank Transfer</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <Calendar size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Payout schedule</p>
            <p className="font-display text-lg">Monthly</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <Wallet size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Next payout</p>
            <p className="font-display text-lg">Oct 01, 2026</p>
          </div>
        </div>
      </section>
    </HostPageShell>
  );
}
