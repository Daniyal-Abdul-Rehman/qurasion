import Link from 'next/link';
import { ArrowRight, WalletCards, Search, Filter, Calendar, CheckCircle, DollarSign, FileText, TrendingUp } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import HostPageShell from '../../../components/organisms/HostPageShell';
import { hostTransactions } from '../../../lib/host-data';

export default function HostTransactionsPage() {
  return (
    <HostPageShell
      eyebrow="Host workspace"
      title="Transactions"
      description="View your completed stays and payment history."
      action={null}
    >
      {/* Transaction Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Transactions</p>
          <p className="mt-2 font-display text-2xl">{hostTransactions.length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Completed This Month</p>
          <p className="mt-2 font-display text-2xl">{hostTransactions.filter((t) => t.status === 'Completed').length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Revenue</p>
          <p className="mt-2 font-display text-2xl">{hostTransactions.reduce((sum, t) => sum + parseInt(t.amount.replace(/[$,]/g, '')), 0).toLocaleString()}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Avg. Transaction</p>
          <p className="mt-2 font-display text-2xl">{(hostTransactions.reduce((sum, t) => sum + parseInt(t.amount.replace(/[$,]/g, '')), 0) / hostTransactions.length).toLocaleString()}</p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search transactions by property or guest..."
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
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Completed</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Pending</button>
      </section>

      {/* Transactions Table */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Transaction management</p>
            <h2 className="mt-2 font-display text-2xl">All transactions</h2>
          </div>
          <p className="text-sm text-[#66706A]">{hostTransactions.length} transactions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8EBE8]">
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Property</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Guest</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Check-in</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Check-out</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Amount</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Status</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hostTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-[#E8EBE8] hover:bg-[#F7F8F6]">
                  <td className="py-3 px-4">
                    <Link href={`/host/transactions/${transaction.id}`} className="font-semibold text-sm">
                      {transaction.property}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm">{transaction.guest}</td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">{transaction.checkIn}</td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">{transaction.checkOut}</td>
                  <td className="py-3 px-4 font-display text-sm font-semibold text-[#173D2B]">{transaction.amount}</td>
                  <td className="py-3 px-4">
                    <StatusBadge 
                      tone={transaction.status === 'Completed' ? 'positive' : 'neutral'}
                    >
                      {transaction.status}
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/host/transactions/${transaction.id}`} className="text-sm text-[#173D2B] hover:underline">
                        View
                      </Link>
                      <Link href={`/host/bookings`} className="text-sm text-[#66706A] hover:text-[#173D2B]">
                        Booking
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Revenue Overview */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <DollarSign size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Total revenue</p>
            <p className="font-display text-lg">{hostTransactions.reduce((sum, t) => sum + parseInt(t.amount.replace(/[$,]/g, '')), 0).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <CheckCircle size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Avg. stay value</p>
            <p className="font-display text-lg">{(hostTransactions.reduce((sum, t) => sum + parseInt(t.amount.replace(/[$,]/g, '')), 0) / hostTransactions.length).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <TrendingUp size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Revenue trend</p>
            <p className="font-display text-lg">+15%</p>
          </div>
        </div>
      </section>
    </HostPageShell>
  );
}
