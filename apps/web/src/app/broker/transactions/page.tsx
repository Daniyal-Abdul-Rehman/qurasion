import Link from 'next/link';
import { ArrowRight, WalletCards, Search, Filter, Calendar, CheckCircle, DollarSign, FileText, TrendingUp, AlertTriangle } from 'lucide-react';
import { StatusBadge } from '../../../components/atoms';
import BrokerPageShell from '../../../components/organisms/BrokerPageShell';

const transactions = [
  {
    id: 'txn-1',
    property: '1824 Oak Street',
    seller: 'John Smith',
    investor: 'Michael Roberts',
    price: '$500,000',
    status: 'Closing',
    closingDate: 'Oct 04, 2026',
    commission: '$15,000',
    documents: 12,
  },
  {
    id: 'txn-2',
    property: '741 Pine Avenue',
    seller: 'Sarah Williams',
    investor: 'David Martinez',
    price: '$610,000',
    status: 'Financing',
    closingDate: 'Oct 15, 2026',
    commission: '$18,300',
    documents: 8,
  },
  {
    id: 'txn-3',
    property: '310 Lake Drive',
    seller: 'John Smith',
    investor: 'Sarah Kim',
    price: '$545,000',
    status: 'Contract Signed',
    closingDate: 'Sep 28, 2026',
    commission: '$16,350',
    documents: 15,
  },
  {
    id: 'txn-4',
    property: '92 Market Street',
    seller: 'Robert Davis',
    investor: 'James Wilson',
    price: '$425,000',
    status: 'Closed',
    closingDate: 'Aug 15, 2026',
    commission: '$12,750',
    documents: 20,
  },
];

export default function TransactionsPage() {
  return (
    <BrokerPageShell
      eyebrow="Broker workspace"
      title="Transactions"
      description="Monitor and manage closed and pending transactions."
      action={null}
    >
      {/* Transaction Overview Stats */}
      <section className="grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Active Transactions</p>
          <p className="mt-2 font-display text-2xl">{transactions.filter((t) => t.status !== 'Closed').length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Closed This Month</p>
          <p className="mt-2 font-display text-2xl">{transactions.filter((t) => t.status === 'Closed').length}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Pending Commission</p>
          <p className="mt-2 font-display text-2xl">$49,650</p>
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA8A0]">Total Volume</p>
          <p className="mt-2 font-display text-2xl">$2.1M</p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="mt-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA8A0]" />
          <input
            type="text"
            placeholder="Search transactions by property or client..."
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
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Closing</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Financing</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Contract Signed</button>
        <button className="rounded-full border border-[#DDE2DD] bg-white px-3 py-1.5 text-xs text-[#66706A] hover:border-[#173D2B]">Closed</button>
      </section>

      {/* Transactions Table */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Transaction management</p>
            <h2 className="mt-2 font-display text-2xl">All transactions</h2>
          </div>
          <p className="text-sm text-[#66706A]">{transactions.length} transactions</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8EBE8]">
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Property</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Seller</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Investor</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Price</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Commission</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Status</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Closing Date</th>
                <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-[#E8EBE8] hover:bg-[#F7F8F6]">
                  <td className="py-3 px-4">
                    <Link href={`/broker/transactions/${transaction.id}`} className="font-semibold text-sm">
                      {transaction.property}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm">{transaction.seller}</td>
                  <td className="py-3 px-4 text-sm">{transaction.investor}</td>
                  <td className="py-3 px-4 font-display text-sm font-semibold">{transaction.price}</td>
                  <td className="py-3 px-4 font-display text-sm font-semibold text-[#173D2B]">{transaction.commission}</td>
                  <td className="py-3 px-4">
                    <StatusBadge 
                      tone={transaction.status === 'Closed' ? 'positive' : transaction.status === 'Closing' ? 'warning' : 'neutral'}
                    >
                      {transaction.status}
                    </StatusBadge>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#66706A]">{transaction.closingDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/broker/transactions/${transaction.id}`} className="text-sm text-[#173D2B] hover:underline">
                        View
                      </Link>
                      <Link href={`/broker/documents?transaction=${transaction.id}`} className="text-sm text-[#66706A] hover:text-[#173D2B]">
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

      {/* Closing Timeline */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Upcoming closings</p>
            <h2 className="mt-2 font-display text-2xl">Closing calendar</h2>
          </div>
        </div>
        <div className="space-y-4">
          {transactions.filter((t) => t.status !== 'Closed').slice(0, 3).map((transaction) => (
            <div key={transaction.id} className="flex items-center gap-4 rounded-lg border border-[#DDE2DD] bg-white p-4">
              <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-[#E8F5D3] p-3">
                <Calendar size={20} className="text-[#31551C]" />
                <p className="mt-1 text-xs font-semibold text-[#31551C]">{transaction.closingDate.split(',')[0]}</p>
              </div>
              <div className="flex-1">
                <p className="font-semibold">{transaction.property}</p>
                <p className="text-sm text-[#66706A]">{transaction.seller} → {transaction.investor}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-lg font-semibold">{transaction.price}</p>
                <div className="mt-1">
                  <StatusBadge tone={transaction.status === 'Closing' ? 'warning' : 'neutral'}>
                    {transaction.status}
                  </StatusBadge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transaction Alerts */}
      <section className="mt-6 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#9AA8A0]">Alerts</p>
            <h2 className="mt-2 font-display text-2xl">Action required</h2>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg bg-[#FFF8E6] p-4">
            <AlertTriangle size={16} className="mt-0.5 text-[#B8860B]" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Closing deadline approaching - 310 Lake Drive</p>
              <p className="mt-1 text-xs text-[#66706A]">Closing in 5 days. Ensure all documents are submitted and financing is confirmed.</p>
              <div className="mt-2 flex items-center gap-2">
                <Link href={`/broker/transactions/txn-3`} className="text-xs font-semibold text-[#173D2B] hover:underline">
                  View transaction
                </Link>
                <Link href={`/broker/documents?transaction=txn-3`} className="text-xs text-[#66706A] hover:text-[#173D2B]">
                  Review documents
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Overview */}
      <section className="mt-6 grid gap-5 rounded-lg border border-[#DDE2DD] bg-white p-5 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F5D3]">
            <DollarSign size={20} className="text-[#31551C]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Pending commission</p>
            <p className="font-display text-lg">$49,650</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7F0F4]">
            <CheckCircle size={20} className="text-[#315A6B]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">Earned this month</p>
            <p className="font-display text-lg">$12,750</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD]">
            <TrendingUp size={20} className="text-[#745F35]" />
          </div>
          <div>
            <p className="text-sm text-[#66706A]">YTD commission</p>
            <p className="font-display text-lg">$156,000</p>
          </div>
        </div>
      </section>
    </BrokerPageShell>
  );
}